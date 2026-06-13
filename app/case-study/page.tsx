import Link from "next/link"
import { ArrowRight, Check, X, AlertTriangle, Lightbulb } from "lucide-react"
import { CaseSection } from "@/components/case-section"
import { UserFlow } from "@/components/user-flow"
import { ReadingProgress } from "@/components/reading-progress"
import { BackToTop } from "@/components/back-to-top"

export const metadata = {
  title: "Mistakes Review Feature for Airlearn - Case Study | M Krishna",
  description:
    "A product case study on improving language-learning retention through personalized mistake review, spaced repetition, and feedback loops.",
}

export default function CaseStudyPage() {
  return (
    <main>
      <ReadingProgress />
      <BackToTop />
      {/* Hero */}
      <section className="relative border-b border-border">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-1/3 size-[50vw] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />
        </div>
        <div className="mx-auto max-w-[1400px] px-6 pb-20 pt-40 md:px-10 md:pt-48">
          <p className="inline-flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.24em] text-primary">
            <span className="h-px w-8 bg-primary" />
            Main Case Study | Language Learning / EdTech
          </p>
          <h1 className="mt-8 max-w-5xl font-serif text-[clamp(48px,9vw,128px)] font-medium leading-[0.95] tracking-[-0.025em] text-foreground">
            Mistakes Review Feature
            <br />
            <span className="italic">for Airlearn</span>
          </h1>
          <p className="mt-8 max-w-2xl font-serif text-2xl leading-[1.35] tracking-tight text-muted-foreground md:text-3xl">
            Improving language-learning retention by helping learners revisit, retry, and correct
            their mistakes.
          </p>

          <div className="mt-16 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {[
              { k: "Role", v: "Product thinking, user journey analysis, feature proposal" },
              { k: "Domain", v: "Language learning / EdTech" },
              { k: "Product area", v: "Learning retention, feedback loop, mistake correction" },
              { k: "Output", v: "MVP feature proposal, metrics, A/B test hypothesis" },
            ].map((item) => (
              <div key={item.k} className="flex flex-col justify-between bg-background p-6">
                <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-muted-foreground">
                  {item.k}
                </p>
                <p className="mt-6 text-sm leading-snug text-foreground">{item.v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        {/* 1. Context */}
        <CaseSection number="1" title="Context" variant="problem">
          <p>
            Airlearn is an AI-enabled language-learning product under Unacademy Group. My work
            involves reviewing Figma lesson flows, scripts, app-ready modules, learner journey
            quality, content consistency, and release readiness before modules go live.
          </p>
          <p>
            This means I sit close to the learner experience - looking at how a lesson is sequenced,
            how feedback is worded, and whether a module is genuinely ready to ship. That vantage
            point is what led me to the problem behind this case study.
          </p>
        </CaseSection>

        {/* 2. Problem */}
        <CaseSection number="2" title="Problem" variant="problem">
          <p>
            Learners make mistakes while learning a language, but if those mistakes are not saved,
            reviewed, and repeated at the right time, the learning loop becomes incomplete.
          </p>
          <div className="rounded-xl border border-border bg-secondary/60 p-5">
            <p className="font-medium text-foreground">Current learning issue</p>
            <p className="mt-2">
              Lesson completed does not always mean concept mastered. If a learner gets a word,
              grammar pattern, or sentence wrong, they need a structured way to revisit it.
            </p>
          </div>
          <div className="rounded-xl border border-primary/25 bg-accent p-5">
            <p className="font-medium text-accent-foreground">Problem statement</p>
            <p className="mt-2 text-accent-foreground/90">
              How might we help language learners turn their mistakes into a personalized review
              path so they can retain better, feel progress, and return to the app more often?
            </p>
          </div>
        </CaseSection>

        {/* 3. Why this matters */}
        <CaseSection number="3" title="Why this matters" variant="problem">
          <p>If this loop works, the product impact compounds:</p>
          <ul className="grid gap-3 sm:grid-cols-2">
            {[
              "Better retention",
              "Better learning outcomes",
              "Higher repeat engagement",
              "Stronger habit formation",
              "More user confidence",
              "Reduced repeated errors",
            ].map((item) => (
              <li
                key={item}
                className="flex items-center gap-2.5 rounded-lg border border-border bg-card px-4 py-3 text-foreground"
              >
                <Check className="size-4 shrink-0 text-primary" />
                <span className="text-sm">{item}</span>
              </li>
            ))}
          </ul>
        </CaseSection>

        {/* 4. User insight */}
        <CaseSection number="4" title="User insight" variant="insight">
          <p>
            During lesson-flow and module review work, I noticed that small gaps in sequencing,
            feedback clarity, content formatting, or highlight placement can affect how easily a
            learner understands and remembers the content. This made me think beyond lesson
            completion and focus on what happens after a learner makes a mistake.
          </p>
          <div className="flex items-start gap-3 rounded-xl border border-border bg-secondary/60 p-5">
            <Lightbulb className="mt-0.5 size-5 shrink-0 text-primary" />
            <div>
              <p className="font-medium text-foreground">Key insight</p>
              <p className="mt-1">
                Mistakes are not failure points. They are high-value learning signals.
              </p>
            </div>
          </div>
        </CaseSection>

        {/* 5. Research backing */}
        <CaseSection number="5" title="Research backing" variant="insight">
          <p>A few well-established learning-science ideas back this direction:</p>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                t: "Forgetting curve",
                d: "Learners forget content quickly if they do not revisit it.",
              },
              {
                t: "Spaced repetition",
                d: "Reviewing at increasing intervals improves long-term memory.",
              },
              {
                t: "Active recall",
                d: "Retrying from memory is stronger than passively rereading.",
              },
              {
                t: "Error-based learning",
                d: "Correcting mistakes helps learners understand what they misunderstood.",
              },
            ].map((r) => (
              <div key={r.t} className="rounded-xl border border-border bg-card p-5">
                <p className="font-medium text-foreground">{r.t}</p>
                <p className="mt-1.5 text-sm">{r.d}</p>
              </div>
            ))}
          </div>
        </CaseSection>

        {/* 6. Competitor teardown */}
        <CaseSection number="6" title="Competitor teardown">
          <p>
            Comparing how leading products handle mistakes makes Airlearn&apos;s opportunity clear.
          </p>
          <div className="-mx-6 overflow-x-auto px-6 md:mx-0 md:px-0">
            <table className="w-full min-w-[720px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-border text-left">
                  {["Product", "How mistakes are handled", "Strength", "Gap", "Opportunity for Airlearn"].map(
                    (h) => (
                      <th
                        key={h}
                        scope="col"
                        className="py-3 pr-4 align-top text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground"
                      >
                        {h}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody className="text-foreground">
                {[
                  {
                    p: "Duolingo",
                    h: "Mistakes feed streak/XP and occasional review lessons.",
                    s: "Strong gamification and habit loops.",
                    g: "Mistake review is generic, not deeply personalized.",
                    o: "Tie review directly to a learner's own errors.",
                  },
                  {
                    p: "Babbel",
                    h: "Review Manager surfaces items for spaced repetition.",
                    s: "Structured, vocabulary-focused review.",
                    g: "Less focused on contextual sentence/grammar mistakes.",
                    o: "Group mistakes by concept, not just vocabulary.",
                  },
                  {
                    p: "Airlearn",
                    h: "Mistakes are not yet captured into a dedicated review path.",
                    s: "Clean lesson structure and AI-enabled content.",
                    g: "No personalized mistake bank or retry loop today.",
                    o: "Build a lightweight, personalized Mistakes Review tied to lesson structure.",
                  },
                ].map((row) => (
                  <tr
                    key={row.p}
                    className={
                      row.p === "Airlearn"
                        ? "border-b border-border bg-accent/50 align-top"
                        : "border-b border-border align-top"
                    }
                  >
                    <td className="py-4 pr-4 font-medium">{row.p}</td>
                    <td className="py-4 pr-4 text-muted-foreground">{row.h}</td>
                    <td className="py-4 pr-4 text-muted-foreground">{row.s}</td>
                    <td className="py-4 pr-4 text-muted-foreground">{row.g}</td>
                    <td className="py-4 pr-4 text-muted-foreground">{row.o}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="rounded-lg bg-secondary/60 px-4 py-3 text-foreground">
            <span className="font-medium">Opportunity:</span> Airlearn can build a lightweight,
            personalized Mistakes Review system connected to its existing lesson structure.
          </p>
        </CaseSection>

        {/* 7. Feature proposal */}
        <CaseSection number="7" title="Feature proposal" variant="solution">
          <div className="rounded-xl border border-primary/25 bg-accent p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-accent-foreground">
              Feature name
            </p>
            <p className="mt-1 font-serif text-2xl font-medium text-foreground">Mistakes Review</p>
            <p className="mt-4 leading-relaxed text-accent-foreground/90">
              Whenever a learner answers incorrectly, the app saves that mistake into a personal
              review bank. The learner can revisit mistakes, retry them, see simple explanations,
              and get spaced reminders until the mistake is corrected consistently.
            </p>
          </div>
        </CaseSection>

        {/* 8. User flow */}
        <CaseSection number="8" title="User flow" variant="solution">
          <p>A simple, end-to-end loop from a wrong answer to corrected progress:</p>
          <UserFlow />
        </CaseSection>

        {/* 9 & 10. MVP scope + out of scope */}
        <CaseSection number="9" title="MVP scope" variant="solution">
          <p>The first version stays deliberately lean:</p>
          <div className="grid gap-5 md:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-5">
              <p className="mb-3 flex items-center gap-2 font-medium text-foreground">
                <Check className="size-4 text-primary" /> In scope (v1)
              </p>
              <ul className="space-y-2 text-sm">
                {[
                  "Save incorrect answers",
                  "Create mistake list",
                  "Retry mistake questions",
                  "Show correct answer and short explanation",
                  "Track corrected vs repeated mistakes",
                  "Daily review card",
                  "Basic progress indicator",
                ].map((i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="mt-0.5 size-3.5 shrink-0 text-primary" />
                    <span>{i}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-border bg-secondary/50 p-5">
              <p className="mb-3 flex items-center gap-2 font-medium text-foreground">
                <X className="size-4 text-muted-foreground" /> Out of scope (for MVP)
              </p>
              <ul className="space-y-2 text-sm">
                {[
                  "Advanced AI tutor",
                  "Voice-based correction",
                  "Full personalization engine",
                  "Complex gamification",
                  "Social leaderboard",
                ].map((i) => (
                  <li key={i} className="flex items-start gap-2">
                    <X className="mt-0.5 size-3.5 shrink-0 text-muted-foreground" />
                    <span>{i}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CaseSection>

        {/* 11. Metrics */}
        <CaseSection number="11" title="Metrics" variant="metrics">
          <p>How I&apos;d measure whether Mistakes Review is working:</p>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { k: "Activation", v: "Open rate", pct: "64%", color: "bg-primary" },
              { k: "Engagement", v: "Review completion", pct: "52%", color: "bg-emerald-500" },
              { k: "Retention", v: "D7/D14 lift", pct: "38%", color: "bg-amber-500" },
            ].map((metric) => (
              <div key={metric.k} className="hover-pop glass-surface rounded-xl border border-border p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                  {metric.k}
                </p>
                <p className="mt-1 font-medium text-foreground">{metric.v}</p>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-secondary">
                  <div className={`${metric.color} h-full animate-grow-bar rounded-full`} style={{ width: metric.pct }} />
                </div>
              </div>
            ))}
          </div>
          <div className="-mx-6 overflow-x-auto px-6 md:mx-0 md:px-0">
            <table className="w-full min-w-[640px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-border text-left">
                  {["Category", "Metric", "Why it matters"].map((h) => (
                    <th
                      key={h}
                      scope="col"
                      className="py-3 pr-4 text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-foreground">
                {[
                  {
                    c: "Activation",
                    m: "% of users opening Mistakes Review",
                    w: "Shows whether the entry point is discoverable and compelling.",
                  },
                  {
                    c: "Engagement",
                    m: "Weekly mistake review completion rate",
                    w: "Indicates the feature is used, not just opened.",
                  },
                  {
                    c: "Learning outcome",
                    m: "Corrected mistake percentage",
                    w: "Measures whether learners actually improve.",
                  },
                  {
                    c: "Quality",
                    m: "Repeat mistake rate",
                    w: "Flags whether explanations and retries are effective.",
                  },
                  {
                    c: "Retention",
                    m: "D7 / D14 retention of Mistakes Review users",
                    w: "Connects the feature to the core business goal.",
                  },
                  {
                    c: "Habit",
                    m: "Number of review sessions per week",
                    w: "Captures whether a repeat behavior is forming.",
                  },
                ].map((row) => (
                  <tr key={row.c} className="border-b border-border align-top">
                    <td className="py-4 pr-4 font-medium">{row.c}</td>
                    <td className="py-4 pr-4 text-muted-foreground">{row.m}</td>
                    <td className="py-4 pr-4 text-muted-foreground">{row.w}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CaseSection>

        {/* 12. Prioritization */}
        <CaseSection number="12" title="Prioritization" variant="metrics">
          <p>Why this should be built before bigger features:</p>
          <ul className="grid gap-3 sm:grid-cols-2">
            {[
              "Directly improves the learning loop",
              "Uses existing mistake / question data",
              "Easier MVP than a full AI tutor",
              "Strong connection to retention",
              "Can be tested quickly",
              "Helps users feel visible progress",
            ].map((i) => (
              <li
                key={i}
                className="flex items-start gap-2.5 rounded-lg border border-border bg-card px-4 py-3 text-foreground"
              >
                <ArrowRight className="mt-0.5 size-4 shrink-0 text-primary" />
                <span className="text-sm">{i}</span>
              </li>
            ))}
          </ul>
        </CaseSection>

        {/* 13. Risks */}
        <CaseSection number="13" title="Risks and trade-offs">
          <ul className="space-y-3">
            {[
              "Too many mistakes may overwhelm learners",
              "Review may feel repetitive",
              "Poor explanations may reduce trust",
              "Extra reminders may annoy users",
              "Needs careful UX to feel motivating, not negative",
            ].map((i) => (
              <li
                key={i}
                className="flex items-start gap-2.5 rounded-lg border border-border bg-secondary/50 px-4 py-3 text-foreground"
              >
                <AlertTriangle className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                <span className="text-sm">{i}</span>
              </li>
            ))}
          </ul>
        </CaseSection>

        {/* 14. A/B test */}
        <CaseSection number="14" title="A/B test hypothesis" variant="metrics">
          <div className="rounded-xl border border-primary/25 bg-accent p-6 text-accent-foreground/90">
            <p className="leading-relaxed">
              <span className="font-medium text-foreground">If</span> learners who make mistakes are
              shown a personalized Mistakes Review entry point after lesson completion,{" "}
              <span className="font-medium text-foreground">then</span> weekly retention and lesson
              completion will improve,{" "}
              <span className="font-medium text-foreground">because</span> learners get a clear
              reason to return and fix weak areas.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-5">
              <p className="font-medium text-foreground">Test setup</p>
              <ul className="mt-2 space-y-1.5 text-sm">
                <li>
                  <span className="font-medium text-foreground">Control:</span> normal lesson flow
                </li>
                <li>
                  <span className="font-medium text-foreground">Variant:</span> lesson flow +
                  Mistakes Review card
                </li>
              </ul>
            </div>
            <div className="rounded-xl border border-border bg-card p-5">
              <p className="font-medium text-foreground">Success metrics</p>
              <ul className="mt-2 space-y-1.5 text-sm">
                {[
                  "Mistakes Review open rate",
                  "Review completion rate",
                  "D7 retention",
                  "Repeat mistake reduction",
                  "Next lesson start rate",
                ].map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </div>
          </div>
        </CaseSection>

        {/* 15. What I'd do next */}
        <CaseSection number="15" title="What I'd do next">
          <ol className="space-y-3">
            {[
              "Test with one course / language first",
              "Interview learners who repeat mistakes",
              "Track the most common mistake types",
              "Improve explanation quality",
              "Add spaced repetition timing",
              "Explore AI-generated hints after MVP validation",
            ].map((i, idx) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-secondary font-mono text-xs text-foreground">
                  {idx + 1}
                </span>
                <span className="text-foreground">{i}</span>
              </li>
            ))}
          </ol>
        </CaseSection>

        {/* 16. Takeaway */}
        <CaseSection number="16" title="Product takeaway">
          <p className="rounded-xl border border-border bg-secondary/60 p-6 text-foreground">
            This case study shows that I can observe workflow gaps, convert them into product
            problems, use research-backed thinking, compare competitors, define MVP scope, choose
            metrics, and think through trade-offs.
          </p>
        </CaseSection>
      </div>

      {/* Bottom CTA */}
      <section className="border-t border-border">
        <div className="mx-auto flex max-w-[1400px] flex-col items-start gap-8 px-6 py-20 sm:flex-row sm:items-center sm:justify-between md:px-10">
          <p className="max-w-md font-serif text-2xl leading-[1.3] tracking-tight text-foreground md:text-3xl">
            Want to see the supporting AI and research work behind this{" "}
            <span className="italic text-primary">thinking?</span>
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
