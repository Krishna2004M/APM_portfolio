"use client"

import type { ReactNode, Ref } from "react"
import { cn } from "@/lib/utils"
import { useInView } from "@/hooks/use-in-view"

export function Reveal({
  as: Comp = "div",
  className,
  delay,
  children,
}: {
  as?: "div" | "section" | "article" | "header"
  className?: string
  delay?: 100 | 200 | 300 | 400
  children: ReactNode
}) {
  const [ref, isInView] = useInView<HTMLElement>()

  return (
    <Comp
      ref={ref as Ref<any>}
      className={cn(
        "opacity-0",
        isInView && "animate-fade-in-up",
        isInView && delay === 100 && "animation-delay-100",
        isInView && delay === 200 && "animation-delay-200",
        isInView && delay === 300 && "animation-delay-300",
        isInView && delay === 400 && "animation-delay-400",
        className,
      )}
    >
      {children}
    </Comp>
  )
}
