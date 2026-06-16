import { openai, type OpenAILanguageModelResponsesOptions } from "@ai-sdk/openai"
import {
  convertToModelMessages,
  createUIMessageStream,
  createUIMessageStreamResponse,
  streamText,
  type UIMessage,
} from "ai"
import {
  getLocalPortfolioAnswer,
  isLikelyUnsafeQuestion,
  isPortfolioQuestion,
  OUT_OF_SCOPE_RESPONSE,
  PORTFOLIO_MODEL_SYSTEM_PROMPT,
  UNSAFE_RESPONSE,
} from "@/lib/portfolio-knowledge"

export const runtime = "nodejs"
export const maxDuration = 30

const MAX_MESSAGES = 10
const MAX_MESSAGE_LENGTH = 600
const MAX_REQUESTS = 12
const RATE_WINDOW_MS = 10 * 60 * 1000
const PORTFOLIO_ASSISTANT_MODEL = process.env.PORTFOLIO_ASSISTANT_MODEL || "gpt-5.4-nano"

type RateEntry = {
  count: number
  resetAt: number
}

const globalRateState = globalThis as typeof globalThis & {
  portfolioChatRates?: Map<string, RateEntry>
}

const rates = globalRateState.portfolioChatRates ?? new Map<string, RateEntry>()
globalRateState.portfolioChatRates = rates

function getText(message: UIMessage) {
  return message.parts
    .filter((part) => part.type === "text")
    .map((part) => part.text)
    .join("")
    .trim()
}

function fixedMessageResponse(text: string, status = 200) {
  const stream = createUIMessageStream({
    execute({ writer }) {
      const id = crypto.randomUUID()
      writer.write({ type: "text-start", id })
      writer.write({ type: "text-delta", id, delta: text })
      writer.write({ type: "text-end", id })
    },
  })

  return createUIMessageStreamResponse({
    stream,
    status,
  })
}

function checkRateLimit(sessionId: string) {
  const now = Date.now()
  const current = rates.get(sessionId)

  if (!current || current.resetAt <= now) {
    rates.set(sessionId, { count: 1, resetAt: now + RATE_WINDOW_MS })
    return true
  }

  if (current.count >= MAX_REQUESTS) return false
  current.count += 1
  return true
}

async function isUnsafe(text: string) {
  if (isLikelyUnsafeQuestion(text)) return true
  if (!process.env.OPENAI_API_KEY) return false

  const response = await fetch("https://api.openai.com/v1/moderations", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "omni-moderation-latest",
      input: text,
    }),
  })

  if (!response.ok) return false
  const payload = (await response.json()) as { results?: Array<{ flagged?: boolean }> }
  return payload.results?.[0]?.flagged === true
}

export async function POST(request: Request) {
  const sessionId = request.headers.get("x-portfolio-session")?.slice(0, 80)
  if (!sessionId) {
    return Response.json({ error: "Missing session identifier." }, { status: 400 })
  }

  let body: { messages?: UIMessage[] }
  try {
    body = (await request.json()) as { messages?: UIMessage[] }
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 })
  }

  const messages = Array.isArray(body.messages) ? body.messages.slice(-MAX_MESSAGES) : []
  const latestUserMessage = [...messages].reverse().find((message) => message.role === "user")
  const latestText = latestUserMessage ? getText(latestUserMessage) : ""

  if (!latestText || latestText.length > MAX_MESSAGE_LENGTH) {
    return Response.json(
      { error: `Questions must be between 1 and ${MAX_MESSAGE_LENGTH} characters.` },
      { status: 400 },
    )
  }

  if (!checkRateLimit(sessionId)) {
    return fixedMessageResponse(
      "You've reached the chat limit for this session. You can still explore Krishna's case study, supporting work, skills, and CV directly from the portfolio.",
      429,
    )
  }

  if (!isPortfolioQuestion(latestText)) {
    return fixedMessageResponse(OUT_OF_SCOPE_RESPONSE)
  }

  const localAnswer = getLocalPortfolioAnswer(latestText)

  try {
    if (await isUnsafe(latestText)) {
      return fixedMessageResponse(UNSAFE_RESPONSE)
    }

    if (!process.env.OPENAI_API_KEY) return fixedMessageResponse(localAnswer)

    const modelMessages = await convertToModelMessages(messages)
    const result = streamText({
      model: openai.responses(PORTFOLIO_ASSISTANT_MODEL),
      system: PORTFOLIO_MODEL_SYSTEM_PROMPT,
      messages: modelMessages,
      maxOutputTokens: 180,
      providerOptions: {
        openai: {
          store: false,
          reasoningEffort: "low",
          textVerbosity: "low",
          safetyIdentifier: sessionId,
          promptCacheKey: "krishna-portfolio-assistant-v1",
        } satisfies OpenAILanguageModelResponsesOptions,
      },
      abortSignal: request.signal,
    })

    return result.toUIMessageStreamResponse({
      sendReasoning: false,
      onError: () => "Krishna's portfolio assistant is temporarily unavailable. Please try again.",
    })
  } catch (error) {
    console.error(
      "Portfolio chat error:",
      error instanceof Error ? error.message : "Unknown provider error",
    )

    return fixedMessageResponse(localAnswer)
  }
}
