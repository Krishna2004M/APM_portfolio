import { ArrowDown, ArrowRight } from "lucide-react"

const steps = [
  "Learner attempts lesson",
  "Gets answer wrong",
  "Mistake saved",
  "Grouped by word / grammar / concept",
  "Learner opens Mistakes Review",
  "Learner retries",
  "Gets explanation",
  "Mistake scheduled again",
  "Progress improves",
]

export function UserFlow() {
  return (
    <div className="rounded-xl border border-border bg-card p-5 md:p-6">
      <div className="flex flex-wrap items-stretch gap-2">
        {steps.map((step, i) => {
          const highlight = i === 0 || i === steps.length - 1
          return (
            <div key={step} className="flex items-center gap-2">
              <div
                className={
                  highlight
                    ? "rounded-lg border border-primary/30 bg-accent px-3 py-2 text-sm font-medium text-accent-foreground"
                    : "rounded-lg border border-border bg-secondary px-3 py-2 text-sm text-secondary-foreground"
                }
              >
                {step}
              </div>
              {i < steps.length - 1 && (
                <>
                  <ArrowRight className="hidden size-4 shrink-0 text-muted-foreground sm:block" />
                  <ArrowDown className="size-4 shrink-0 text-muted-foreground sm:hidden" />
                </>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
