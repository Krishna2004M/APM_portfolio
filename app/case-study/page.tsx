import Link from "next/link"
import { ArrowRight, AlertTriangle, Check, Lightbulb, X } from "lucide-react"
import { CaseSection } from "@/components/case-section"
import { ReadingProgress } from "@/components/reading-progress"
import { BackToTop } from "@/components/back-to-top"

export const metadata = {
  title: "Emoline Journaling App Case Study, M Krishna",
  description:
    "A product case study on taking Emoline, a simple emotion journaling app, from PRD to Google Play closed testing.",
}

const mvpItems = [
  "One emotion check-in per day",
  "One sentence reflection",
  "Private journal history",
  "Lightweight onboarding",
  "Simple completion signal",
  "Closed testing feedback loop",
]

const outOfScopeItems = [
  "AI chat",
  "Mood diagnosis",
  "Social sharing",
  "Complex habit gamification",
  "Therapy-style recommendations",
]

export default function CaseStudyPage() {
  return (
    <main>
      <ReadingProgress />
      <BackToTop />

      <section className="relative overflow-hidden border-b border-border">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-1/3 size-[50vw] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />
        </div>
        <div className="mx-auto w-full max-w-[1400px] px-6 pb-20 pt-32 sm:pt-36 md:px-10 md:pt-48">
          <p className="inline-flex max-w-full flex-wrap items-center text-[11px] font-medium uppercase leading-relaxed tracking-[0.24em] text-primary">
            Main Product Case Study
          </p>
          <h1 className="mt-8 max-w-full text-balance font-serif text-[clamp(42px,9vw,128px)] font-medium leading-[0.95] tracking-[-0.025em] text-foreground">
            Emoline
            <br />
            <span className="italic">Journaling App</span>
          </h1>
          <p className="mt-8 max-w-3xl text-pretty font-serif text-xl leading-[1.45] tracking-tight text-muted-foreground sm:text-2xl md:text-3xl">
            Taking a consumer journaling product from problem framing and PRD to build, Google Play
            closed testing, and post-launch iteration.
          </p>

          <div className="mt-16 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {[
              { k: "Role", v: "Problem framing, PRD, MVP scope, build direction" },
              { k: "Product", v: "Consumer emotion journaling app" },
              { k: "Launch", v: "Google Play closed testing, Aug 2026" },
              { k: "Output", v: "v1.0.0 launch and v1.0.1 feedback iteration" },
            ].map((item) => (
              <div key={item.k} className="case-panel flex min-w-0 flex-col justify-between bg-background p-6">
                <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-muted-foreground">
                  {item.k}
                </p>
                <p className="mt-6 break-words text-sm leading-snug text-foreground">{item.v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <CaseSection number="1" title="Context" variant="problem">
          <p>
            Emoline is a consumer journaling app built around a deliberately small behavior: choose
            one emotion and write one sentence each day. The goal was to test whether a low-friction
            emotional check-in could create repeat engagement without overwhelming users.
          </p>
          <p>
            I treated it as a product loop, not just an app build. I defined the problem, wrote the
            PRD, selected the stack, directed implementation, shipped v1.0.0 to Google Play closed
            testing, and released v1.0.1 after tester feedback.
          </p>
        </CaseSection>

        <CaseSection number="2" title="Problem" variant="problem">
          <p>
            Many journaling products ask users to write too much, think too deeply, or commit to a
            habit before they feel the reward. That creates friction at the exact moment a user is
            supposed to start.
          </p>
          <div className="case-panel rounded-xl border border-primary/25 bg-accent p-5">
            <p className="font-medium text-accent-foreground">Problem statement</p>
            <p className="mt-2 text-accent-foreground/90">
              How might we help users build an emotional reflection habit with the smallest useful
              daily action?
            </p>
          </div>
        </CaseSection>

        <CaseSection number="3" title="Product hypothesis" variant="insight">
          <div className="case-panel flex items-start gap-3 rounded-xl border border-border bg-secondary/60 p-5">
            <Lightbulb className="mt-0.5 size-5 shrink-0 text-primary" />
            <div>
              <p className="font-medium text-foreground">Core hypothesis</p>
              <p className="mt-1">
                If journaling is reduced to one emotion and one sentence, more users will complete
                the first entry and return because the product feels easy, private, and emotionally
                useful.
              </p>
            </div>
          </div>
        </CaseSection>

        <CaseSection number="4" title="Product decisions" variant="solution">
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                t: "Scoped AI out of V1",
                d: "AI and chat were deliberately excluded so the first test could isolate the core behavioral loop.",
              },
              {
                t: "Reduced input friction",
                d: "The product asks for one emotion plus one sentence instead of a long journal entry.",
              },
              {
                t: "Built for iteration",
                d: "Closed testing gave a practical feedback cycle before wider release.",
              },
              {
                t: "Chose a pragmatic stack",
                d: "React Native, Expo, and Supabase supported fast mobile delivery and backend flexibility.",
              },
            ].map((item) => (
              <div key={item.t} className="case-panel rounded-xl border border-border bg-card p-5">
                <p className="font-medium text-foreground">{item.t}</p>
                <p className="mt-1.5 text-sm text-muted-foreground">{item.d}</p>
              </div>
            ))}
          </div>
        </CaseSection>

        <CaseSection number="5" title="End-to-end flow" variant="solution">
          <div className="grid gap-px border border-border bg-border md:grid-cols-5">
            {[
              "Define problem",
              "Write PRD",
              "Direct build",
              "Closed testing",
              "v1.0.1 iteration",
            ].map((step, index) => (
              <div key={step} className="case-panel bg-card p-5">
                <p className="font-mono text-xs text-primary">{String(index + 1).padStart(2, "0")}</p>
                <p className="mt-5 text-sm font-medium leading-snug text-foreground">{step}</p>
              </div>
            ))}
          </div>
        </CaseSection>

        <CaseSection number="6" title="MVP scope" variant="solution">
          <div className="grid gap-5 md:grid-cols-2">
            <div className="case-panel rounded-xl border border-border bg-card p-5">
              <p className="mb-3 flex items-center gap-2 font-medium text-foreground">
                <Check className="size-4 text-primary" /> In scope for V1
              </p>
              <ul className="space-y-2 text-sm">
                {mvpItems.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <Check className="mt-0.5 size-3.5 shrink-0 text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="case-panel rounded-xl border border-border bg-secondary/50 p-5">
              <p className="mb-3 flex items-center gap-2 font-medium text-foreground">
                <X className="size-4 text-muted-foreground" /> Scoped out of V1
              </p>
              <ul className="space-y-2 text-sm">
                {outOfScopeItems.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <X className="mt-0.5 size-3.5 shrink-0 text-muted-foreground" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CaseSection>

        <CaseSection number="7" title="Metrics" variant="metrics">
          <p>How I would judge whether Emoline is working:</p>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { k: "Activation", v: "First-entry completion" },
              { k: "Retention", v: "D1, D7, and D30 return rate" },
              { k: "Engagement", v: "Daily entry completion frequency" },
            ].map((metric) => (
              <div key={metric.k} className="case-panel glass-surface rounded-xl border border-border p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                  {metric.k}
                </p>
                <p className="mt-3 font-medium text-foreground">{metric.v}</p>
              </div>
            ))}
          </div>
        </CaseSection>

        <CaseSection number="8" title="Iteration" variant="metrics">
          <p>
            Emoline shipped to Google Play closed testing as v1.0.0. Feedback from that test cycle
            was incorporated into v1.0.1, completing a spec-to-launch-to-post-launch loop.
          </p>
          <div className="case-panel rounded-xl border border-border bg-secondary/60 p-6 text-foreground">
            <span className="font-medium">APM takeaway:</span> the release was not treated as the
            finish line. The product was scoped to learn quickly, gather feedback, and make a
            follow-up release within the same testing cycle.
          </div>
        </CaseSection>

        <CaseSection number="9" title="Risks and trade-offs">
          <ul className="space-y-3">
            {[
              "The product may be too minimal for users who expect long-form journaling.",
              "Retention may depend on timing, reminders, and emotional payoff after the first few entries.",
              "Adding AI too early could blur the core behavior and increase privacy concerns.",
              "Closed testing feedback may not fully represent a wider consumer audience.",
            ].map((item) => (
              <li
                key={item}
                className="case-panel flex items-start gap-2.5 rounded-lg border border-border bg-secondary/50 px-4 py-3 text-foreground"
              >
                <AlertTriangle className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                <span className="text-sm">{item}</span>
              </li>
            ))}
          </ul>
        </CaseSection>

        <CaseSection number="10" title="What I would do next">
          <ol className="space-y-3">
            {[
              "Review closed-testing retention by cohort and first-entry completion.",
              "Interview testers who completed one entry but did not return.",
              "Improve reminder timing and empty-state copy.",
              "Test whether weekly reflection summaries increase D7 retention.",
              "Only add AI after the basic habit loop proves useful.",
            ].map((item, index) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-secondary font-mono text-xs text-foreground">
                  {index + 1}
                </span>
                <span className="text-foreground">{item}</span>
              </li>
            ))}
          </ol>
        </CaseSection>

        <CaseSection number="11" title="Product takeaway">
          <p className="case-panel rounded-xl border border-border bg-secondary/60 p-6 text-foreground">
            Emoline shows how I approach product work as an APM candidate: identify a clear user
            problem, reduce scope to a testable MVP, write requirements, direct cross-functional
            build work, ship to real testers, and use feedback plus metrics to decide the next
            iteration.
          </p>
        </CaseSection>
      </div>

      <section className="border-t border-border">
        <div className="mx-auto flex max-w-[1400px] flex-col items-start gap-8 px-6 py-20 sm:flex-row sm:items-center sm:justify-between md:px-10">
          <p className="max-w-md font-serif text-2xl leading-[1.3] tracking-tight text-foreground md:text-3xl">
            Want to see the AI and research work behind this{" "}
            <span className="italic text-primary">product judgment?</span>
          </p>
          <Link
            href="/work"
            className="hover-pop group inline-flex items-center gap-3 border border-primary bg-primary px-6 py-3.5 text-[11px] font-medium uppercase tracking-[0.22em] text-primary-foreground hover:bg-primary/90"
          >
            View supporting work
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </main>
  )
}
