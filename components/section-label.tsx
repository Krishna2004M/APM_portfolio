import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

export function SectionLabel({
  children,
  className,
  accent = false,
}: {
  children: ReactNode
  className?: string
  accent?: boolean
}) {
  return (
    <span
      className={cn(
        "inline-flex max-w-full flex-wrap items-center text-[11px] font-medium uppercase leading-relaxed tracking-[0.24em]",
        accent ? "text-primary" : "text-muted-foreground",
        className,
      )}
    >
      {children}
    </span>
  )
}
