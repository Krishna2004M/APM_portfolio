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
        "inline-flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.24em]",
        accent ? "text-primary" : "text-muted-foreground",
        className,
      )}
    >
      <span
        className={cn(
          "inline-block h-px w-8",
          accent ? "bg-primary" : "bg-muted-foreground/40",
        )}
      />
      {children}
    </span>
  )
}
