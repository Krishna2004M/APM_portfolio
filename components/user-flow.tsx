import { ArrowDown, ArrowRight } from "lucide-react"

const steps = [
  "Learner attempts lesson",
  "Gets answer wrong",
  "Mistake saved",
  "Grouped by word, grammar, and concept",
  "Learner opens Mistakes Review",
  "Learner retries",
  "Gets explanation",
  "Mistake scheduled again",
  "Progress improves",
]

export function UserFlow() {
  return (
    <div className="glass-surface border border-border p-6 md:p-8">
      <div className="flex flex-wrap items-stretch gap-3">
        {steps.map((step, i) => {
          const highlight = i === 0 || i === steps.length - 1
          return (
            <div key={step} className="flex items-center gap-3">
              <div
                className={
                  highlight
                    ? "hover-pop border border-primary bg-primary/10 px-4 py-2.5 text-sm font-medium text-primary"
                    : "hover-pop glass-surface border border-border px-4 py-2.5 text-sm text-foreground"
                }
              >
                <span className="mb-1 block font-mono text-[10px] text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {step}
              </div>
              {i < steps.length - 1 && (
                <>
                  <ArrowRight className="hidden size-4 shrink-0 text-primary sm:block" />
                  <ArrowDown className="size-4 shrink-0 text-primary sm:hidden" />
                </>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
