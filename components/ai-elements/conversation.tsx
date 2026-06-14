"use client"

import { ArrowDown } from "lucide-react"
import { type ComponentProps, useCallback } from "react"
import { StickToBottom, useStickToBottomContext } from "use-stick-to-bottom"
import { cn } from "@/lib/utils"

export type ConversationProps = ComponentProps<typeof StickToBottom>

export function Conversation({ className, ...props }: ConversationProps) {
  return (
    <StickToBottom
      className={cn("relative flex-1 overflow-y-hidden", className)}
      initial="smooth"
      resize="smooth"
      role="log"
      {...props}
    />
  )
}

export type ConversationContentProps = ComponentProps<typeof StickToBottom.Content>

export function ConversationContent({ className, ...props }: ConversationContentProps) {
  return (
    <StickToBottom.Content
      className={cn("flex flex-col gap-5 px-5 py-5", className)}
      {...props}
    />
  )
}

export function ConversationScrollButton() {
  const { isAtBottom, scrollToBottom } = useStickToBottomContext()
  const handleClick = useCallback(() => scrollToBottom(), [scrollToBottom])

  if (isAtBottom) return null

  return (
    <button
      type="button"
      onClick={handleClick}
      className="hover-pop absolute bottom-3 left-1/2 inline-flex size-9 -translate-x-1/2 items-center justify-center border border-border bg-background text-foreground shadow-lg"
      aria-label="Scroll to latest message"
      title="Scroll to latest message"
    >
      <ArrowDown className="size-4" />
    </button>
  )
}
