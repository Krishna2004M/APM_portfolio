import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

type CaseVariant = "problem" | "insight" | "solution" | "metrics"

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
        "relative border-t border-border py-12 sm:py-16 md:py-20",
        variant && "scroll-mt-24",
      )}
      id={`section-${number}`}
    >
      <div className="grid gap-7 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-4">
          <div className="flex items-center gap-3">
            <span className="flex size-7 items-center justify-center rounded-full border border-primary/35 bg-primary/10 font-mono text-[11px] text-primary">
              {number.padStart(2, "0")}
            </span>
            <span className="text-[10px] font-medium uppercase tracking-[0.24em] text-muted-foreground">
              Section
            </span>
          </div>
          <h2 className="mt-4 max-w-full text-balance font-serif text-3xl font-medium leading-[1.05] tracking-tight text-foreground sm:text-4xl">
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
