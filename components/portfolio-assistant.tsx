"use client"

import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport, type UIMessage } from "ai"
import {
  ArrowRight,
  Bot,
  BriefcaseBusiness,
  FileText,
  GraduationCap,
  MessageCircle,
  Send,
  Sparkles,
  Square,
  X,
} from "lucide-react"
import Link from "next/link"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation"
import {
  Message,
  MessageContent,
  MessageResponse,
} from "@/components/ai-elements/message"
import { cn } from "@/lib/utils"

const STORAGE_KEY = "krishna-portfolio-chat"
const OPENED_KEY = "krishna-portfolio-chat-opened"
const SESSION_KEY = "krishna-portfolio-chat-session"
const REQUEST_COUNT_KEY = "krishna-portfolio-chat-count"
const MAX_CLIENT_REQUESTS = 12

const welcomeMessage: UIMessage = {
  id: "welcome",
  role: "assistant",
  parts: [
    {
      type: "text",
      text: "Welcome to Krishna's portfolio. I can help you explore his product work, case study, skills, experience, education, and CV.",
    },
  ],
}

const suggestions = [
  "Summarize Krishna's profile",
  "Explain the main case study",
  "What are Krishna's PM skills?",
  "Show supporting work",
  "View CV and contact details",
]

type NavAction = {
  label: string
  href: string
  icon: typeof ArrowRight
  download?: string
}

function getActions(prompt: string): NavAction[] {
  const value = prompt.toLowerCase()

  if (value.includes("summar")) {
    return [
      { label: "Main case study", href: "/case-study", icon: FileText },
      { label: "Supporting work", href: "/work", icon: BriefcaseBusiness },
      { label: "Skills", href: "/about#skills", icon: Sparkles },
      { label: "Contact", href: "/about#contact", icon: MessageCircle },
    ]
  }

  if (value.includes("case study") || value.includes("mistakes")) {
    return [{ label: "Open case study", href: "/case-study", icon: FileText }]
  }

  if (value.includes("skill")) {
    return [{ label: "Explore skills", href: "/about#skills", icon: Sparkles }]
  }

  if (value.includes("support") || value.includes("project") || value.includes("work")) {
    return [{ label: "View supporting work", href: "/work", icon: BriefcaseBusiness }]
  }

  if (value.includes("education")) {
    return [{ label: "About Krishna", href: "/about", icon: GraduationCap }]
  }

  if (value.includes("cv") || value.includes("resume") || value.includes("contact")) {
    return [
      {
        label: "Download CV",
        href: "/M_Krishna_Product_APM_CV.pdf",
        icon: FileText,
        download: "M_Krishna_Product_APM_CV.pdf",
      },
      { label: "Contact Krishna", href: "/about#contact", icon: MessageCircle },
    ]
  }

  return []
}

export function PortfolioAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState("")
  const [isReady, setIsReady] = useState(false)
  const [requestCount, setRequestCount] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const sessionIdRef = useRef("")

  const getSessionId = useCallback(() => {
    if (sessionIdRef.current) return sessionIdRef.current

    const stored = window.sessionStorage.getItem(SESSION_KEY)
    sessionIdRef.current = stored || crypto.randomUUID()
    window.sessionStorage.setItem(SESSION_KEY, sessionIdRef.current)

    return sessionIdRef.current
  }, [])

  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: "/api/chat",
        headers: () => ({
          "x-portfolio-session": getSessionId(),
        }),
      }),
    [getSessionId],
  )

  const {
    messages,
    sendMessage,
    setMessages,
    status,
    stop,
    error,
    clearError,
  } = useChat({
    transport,
    messages: [welcomeMessage],
    experimental_throttle: 40,
  })

  const isBusy = status === "submitted" || status === "streaming"
  const lastUserPrompt =
    [...messages].reverse().find((message) => message.role === "user")?.parts
      .filter((part) => part.type === "text")
      .map((part) => part.text)
      .join("") ?? ""
  const latestActions = getActions(lastUserPrompt)

  useEffect(() => {
    try {
      getSessionId()
      const saved = window.sessionStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved) as UIMessage[]
        if (Array.isArray(parsed) && parsed.length > 0) setMessages(parsed)
      }

      const savedCount = Number(window.sessionStorage.getItem(REQUEST_COUNT_KEY) || "0")
      setRequestCount(Number.isFinite(savedCount) ? savedCount : 0)

      if (!window.sessionStorage.getItem(OPENED_KEY)) {
        setIsOpen(true)
        window.sessionStorage.setItem(OPENED_KEY, "true")
      }
    } catch {
      setMessages([welcomeMessage])
    } finally {
      setIsReady(true)
    }
  }, [getSessionId, setMessages])

  useEffect(() => {
    if (!isReady) return
    try {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages))
    } catch {
      // The assistant still works when browser storage is unavailable.
    }
  }, [isReady, messages])

  useEffect(() => {
    if (!isOpen) return

    const focusTimer = window.setTimeout(() => inputRef.current?.focus(), 180)
    return () => window.clearTimeout(focusTimer)
  }, [isOpen])

  async function submit(text: string) {
    const next = text.trim()
    if (!next || isBusy || requestCount >= MAX_CLIENT_REQUESTS) return

    clearError()
    setInput("")
    const nextCount = requestCount + 1
    setRequestCount(nextCount)
    window.sessionStorage.setItem(REQUEST_COUNT_KEY, String(nextCount))
    await sendMessage({ text: next })
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    void submit(input)
  }

  const hasConversation = messages.some((message) => message.role === "user")

  return (
    <div className="fixed bottom-4 right-4 z-[80] sm:bottom-6 sm:right-6">
      <section
        aria-label="Krishna portfolio assistant"
        aria-hidden={!isOpen}
        className={cn(
          "chat-glass-panel fixed inset-x-3 bottom-3 flex h-[min(720px,calc(100dvh-24px))] flex-col overflow-hidden border border-border transition-all duration-300 sm:inset-x-auto sm:bottom-20 sm:right-6 sm:h-[min(650px,calc(100dvh-112px))] sm:w-[420px]",
          isOpen
            ? "pointer-events-auto translate-y-0 opacity-100 animate-glass-float-in"
            : "pointer-events-none translate-y-4 opacity-0",
        )}
      >
        <header className="flex min-h-16 items-center justify-between border-b border-border px-5">
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex size-9 shrink-0 items-center justify-center border border-primary/40 bg-primary/10 text-primary">
              <Bot className="size-4" />
            </span>
              <span className="min-w-0">
                <span className="block truncate text-sm font-medium text-foreground">
                  Krishna Portfolio Assistant
                </span>
                <span className="mt-1 flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                  <span className="size-1.5 rounded-full bg-primary animate-pulse-dot" />
                  Ready for portfolio questions
                </span>
              </span>
          </div>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="hover-pop inline-flex size-9 items-center justify-center border border-border text-foreground hover:border-primary hover:text-primary"
            aria-label="Close portfolio assistant"
            title="Close"
          >
            <X className="size-4" />
          </button>
        </header>

        <Conversation>
          <ConversationContent>
            {messages.map((message, messageIndex) => {
              const isLastAssistant =
                message.role === "assistant" &&
                messageIndex === messages.length - 1 &&
                latestActions.length > 0 &&
                !isBusy

              return (
                <Message from={message.role} key={message.id}>
                  <MessageContent className="chat-copy-pop">
                    {message.parts.map((part, partIndex) =>
                      part.type === "text" ? (
                        <MessageResponse
                          key={`${message.id}-${partIndex}`}
                          isAnimating={isBusy && messageIndex === messages.length - 1}
                        >
                          {part.text}
                        </MessageResponse>
                      ) : null,
                    )}
                  </MessageContent>

                  {isLastAssistant && (
                    <div className="flex flex-wrap gap-2 pt-1">
                      {latestActions.map((action) => {
                        const Icon = action.icon
                        return (
                          <Link
                            key={action.label}
                            href={action.href}
                            download={action.download}
                            onClick={() => setIsOpen(false)}
                            className="chat-suggestion inline-flex items-center gap-2 border border-border bg-background/80 px-3 py-2 text-[10px] font-medium uppercase tracking-[0.16em] text-foreground hover:border-primary hover:text-primary"
                          >
                            <Icon className="size-3.5" />
                            {action.label}
                          </Link>
                        )
                      })}
                    </div>
                  )}
                </Message>
              )
            })}

            {isBusy && messages.at(-1)?.role === "user" && (
              <div className="flex w-fit items-center gap-2 border border-border bg-background/80 px-3 py-2 text-xs text-muted-foreground shadow-lg">
                <span className="flex gap-1">
                  <span className="size-1.5 rounded-full bg-primary animate-pulse-dot" />
                  <span className="size-1.5 rounded-full bg-primary/70 animate-pulse-dot [animation-delay:120ms]" />
                  <span className="size-1.5 rounded-full bg-primary/40 animate-pulse-dot [animation-delay:240ms]" />
                </span>
                Reading approved portfolio notes
              </div>
            )}

            {error && (
              <div role="alert" className="border border-primary/35 bg-primary/10 p-3 text-sm text-foreground">
                The assistant is using portfolio notes. Try one of the suggested prompts or ask about Krishna&apos;s case study, skills, work, CV, or contact details.
              </div>
            )}

            {!hasConversation && (
              <div className="grid gap-2 pt-1">
                <p className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                  <Sparkles className="size-3 text-primary" />
                  Suggested questions
                </p>
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => void submit(suggestion)}
                    disabled={isBusy || requestCount >= MAX_CLIENT_REQUESTS}
                    className="chat-suggestion flex min-h-11 items-center justify-between gap-3 border border-border bg-background/80 px-4 py-2 text-left text-sm text-foreground hover:border-primary hover:text-primary disabled:pointer-events-none disabled:opacity-50"
                  >
                    <span>{suggestion}</span>
                    <ArrowRight className="size-4 shrink-0" />
                  </button>
                ))}
              </div>
            )}
          </ConversationContent>
          <ConversationScrollButton />
        </Conversation>

        <footer className="border-t border-border bg-background/85 p-4 backdrop-blur-xl">
          {requestCount >= MAX_CLIENT_REQUESTS ? (
            <p className="text-center text-xs leading-relaxed text-muted-foreground">
              Session chat limit reached. Continue exploring the portfolio using the navigation.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="flex items-end gap-2">
              <label className="sr-only" htmlFor="portfolio-question">
                Ask about Krishna&apos;s portfolio
              </label>
              <input
                ref={inputRef}
                id="portfolio-question"
                value={input}
                maxLength={600}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask about Krishna..."
                disabled={isBusy}
                className="min-h-11 min-w-0 flex-1 border border-border bg-background/85 px-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary disabled:opacity-60"
              />
              {isBusy ? (
                <button
                  type="button"
                  onClick={stop}
                  className="hover-pop inline-flex size-11 shrink-0 items-center justify-center border border-border bg-background text-foreground hover:border-primary hover:text-primary"
                  aria-label="Stop response"
                  title="Stop"
                >
                  <Square className="size-4 fill-current" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="hover-pop inline-flex size-11 shrink-0 items-center justify-center border border-primary bg-primary text-primary-foreground disabled:pointer-events-none disabled:opacity-40"
                  aria-label="Send question"
                  title="Send"
                >
                  <Send className="size-4" />
                </button>
              )}
            </form>
          )}
          <p className="mt-2 text-center text-[10px] leading-relaxed text-muted-foreground">
            Answers use approved portfolio and CV information only.
          </p>
        </footer>
      </section>

      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className={cn(
          "hover-pop glass-surface relative size-14 items-center justify-center border border-primary bg-background text-primary shadow-xl",
          isOpen ? "hidden" : "inline-flex",
        )}
        aria-label={isOpen ? "Close portfolio assistant" : "Open portfolio assistant"}
        aria-expanded={isOpen}
        title={isOpen ? "Close assistant" : "Ask about Krishna"}
      >
        {isOpen ? <X className="size-5" /> : <MessageCircle className="size-5" />}
        {!isOpen && (
          <span className="absolute right-1 top-1 size-2 rounded-full bg-primary animate-pulse-dot" />
        )}
      </button>
    </div>
  )
}
