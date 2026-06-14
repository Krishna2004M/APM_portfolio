import { openai, type OpenAILanguageModelResponsesOptions } from "@ai-sdk/openai"
import {
  convertToModelMessages,
  createUIMessageStream,
  createUIMessageStreamResponse,
  generateText,
  Output,
  streamText,
  type UIMessage,
} from "ai"
import { z } from "zod"
import {
  OUT_OF_SCOPE_RESPONSE,
  PORTFOLIO_ASSISTANT_INSTRUCTIONS,
  SCOPE_CLASSIFIER_INSTRUCTIONS,
  UNSAFE_RESPONSE,
} from "@/lib/portfolio-knowledge"

export const runtime = "nodejs"
export const maxDuration = 30

const MAX_MESSAGES = 10
const MAX_MESSAGE_LENGTH = 600
const MAX_REQUESTS = 12
const RATE_WINDOW_MS = 10 * 60 * 1000

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
  if (!process.env.OPENAI_API_KEY) {
    return Response.json({ error: "Assistant is not configured." }, { status: 503 })
  }

  const sessionId = request.headers.get("x-portfolio-session")?.slice(0, 80)
  if (!sessionId) {
    return Response.json({ error: "Missing session identifier." }, { status: 400 })
  }

  if (!checkRateLimit(sessionId)) {
    return fixedMessageResponse(
      "You've reached the chat limit for this session. You can still explore Krishna's case study, supporting work, skills, and CV directly from the portfolio.",
      429,
    )
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

  try {
    if (await isUnsafe(latestText)) {
      return fixedMessageResponse(UNSAFE_RESPONSE)
    }

    const { output: scope } = await generateText({
      model: openai.responses("gpt-5.4-nano"),
      output: Output.object({
        schema: z.object({
          inScope: z.boolean(),
        }),
      }),
      system: SCOPE_CLASSIFIER_INSTRUCTIONS,
      prompt: latestText,
      maxOutputTokens: 40,
      providerOptions: {
        openai: {
          store: false,
          reasoningEffort: "none",
          textVerbosity: "low",
        } satisfies OpenAILanguageModelResponsesOptions,
      },
      abortSignal: request.signal,
    })

    if (!scope.inScope) {
      return fixedMessageResponse(OUT_OF_SCOPE_RESPONSE)
    }

    const modelMessages = await convertToModelMessages(messages)
    const result = streamText({
      model: openai.responses("gpt-5.4-mini"),
      system: PORTFOLIO_ASSISTANT_INSTRUCTIONS,
      messages: modelMessages,
      maxOutputTokens: 300,
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

    return Response.json(
      { error: "Krishna's portfolio assistant is temporarily unavailable." },
      { status: 503 },
    )
  }
}
