import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

type CaseVariant = "problem" | "insight" | "solution" | "metrics"

const variantAccent: Record<CaseVariant, string> = {
  problem: "before:bg-rose-400/70",
  insight: "before:bg-primary",
  solution: "before:bg-emerald-400/80",
  metrics: "before:bg-amber-300/80",
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
      className={cn(
        "relative border-t border-border py-16 md:py-24",
        variant &&
          `before:absolute before:left-0 before:top-16 before:h-12 before:w-px md:before:top-24 ${variantAccent[variant]}`,
      )}
      id={`section-${number}`}
    >
      <div className="grid gap-10 md:grid-cols-12">
        <div className="md:col-span-4">
          <div className="flex items-baseline gap-4">
            <span className="font-mono text-xs text-primary">
              {number.padStart(2, "0")}
            </span>
            <span className="text-[10px] font-medium uppercase tracking-[0.24em] text-muted-foreground">
              Section
            </span>
          </div>
          <h2 className="mt-4 font-serif text-3xl font-medium leading-[1.05] tracking-tight text-foreground md:text-4xl">
            {title}
          </h2>
        </div>
        <div className="space-y-5 text-pretty leading-relaxed text-muted-foreground md:col-span-8">
          {children}
        </div>
      </div>
    </section>
  )
}
