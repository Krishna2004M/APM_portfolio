import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

type CaseVariant = "problem" | "insight" | "solution" | "metrics"

const variantClassName: Record<CaseVariant, string> = {
  problem: "border-l-4 border-l-destructive/60 pl-5",
  insight: "border-l-4 border-l-primary/60 pl-5",
  solution: "border-l-4 border-l-emerald-500/60 pl-5",
  metrics: "border-l-4 border-l-amber-500/60 pl-5",
}

export function CaseSection({
  number,
  title,
  children,
  variant,
}: {
  number: string
  title: string
  children: ReactNode
  variant?: CaseVariant
}) {
  return (
    <section
      className={cn("border-t border-border py-10 md:py-12", variant && variantClassName[variant])}
      id={`section-${number}`}
    >
      <div className="mb-5 flex items-baseline gap-3">
        <span className="font-mono text-sm text-primary">{number.padStart(2, "0")}</span>
        <h2 className="font-serif text-2xl font-medium tracking-tight md:text-3xl">{title}</h2>
      </div>
      <div className="max-w-3xl space-y-4 text-pretty leading-relaxed text-muted-foreground">
        {children}
      </div>
    </section>
  )
}
