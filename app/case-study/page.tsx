import Link from "next/link"
import {
  ArrowRight,
  BarChart3,
  Check,
  ExternalLink,
  FileText,
  Lightbulb,
  Rocket,
  Route,
  X,
} from "lucide-react"
import { CaseSection } from "@/components/case-section"
import { ReadingProgress } from "@/components/reading-progress"
import { BackToTop } from "@/components/back-to-top"

export const metadata = {
  title: "Emoline Journaling App Case Study, M Krishna",
  description:
    "A product case study on taking Emoline from PRD and user flow to closed testing, production launch on Google Play, metrics, and next experiments.",
}

const playStoreUrl = "https://play.google.com/store/apps/details?id=com.emoline.app&hl=en"

const screenshots = [
  {
    src: "/emoline/emoline-01-start.png",
    title: "Landing",
    note: "The product promise is reduced to one mood, one honest sentence, every day.",
  },
  {
    src: "/emoline/emoline-02-create-account.png",
    title: "Account creation",
    note: "Users create a private account so memories can stay available across devices.",
  },
  {
    src: "/emoline/emoline-03-daily-entry.png",
    title: "Daily entry",
    note: "The core action asks for a mood and a short memory instead of a long journal entry.",
  },
  {
    src: "/emoline/emoline-04-calendar.png",
    title: "Calendar history",
    note: "Saved days become a lightweight personal archive users can revisit later.",
  },
  {
    src: "/emoline/emoline-05-memory.png",
    title: "Memory detail",
    note: "Past entries preserve what felt true that day and keep old memories read-only.",
  },
  {
    src: "/emoline/emoline-06-insights.png",
    title: "Mood insights",
    note: "Early patterns help users reflect on mood rhythm without turning the product into diagnosis.",
  },
]

const userFlow = [
  "Open Emoline",
  "Create account or sign in",
  "Choose today's mood",
  "Write one memory",
  "Save the day",
  "Revisit calendar or insights",
]

const metrics = [
  {
    k: "Activation",
    v: "First memory completion",
    d: "The clearest sign that users understand the core product and reach the first value moment.",
  },
  {
    k: "Engagement",
    v: "Weekly active memory creators",
    d: "More useful than installs because Emoline creates value only when people record their days.",
  },
  {
    k: "Retention",
    v: "D1, D7, and D30 return rate",
    d: "Shows whether the lightweight loop becomes a repeated reflection habit.",
  },
  {
    k: "History value",
    v: "Calendar and memory revisit rate",
    d: "Measures whether accumulated memories become valuable after the first entry.",
  },
]

const nextExperiments = [
  "Test a lightweight evening reminder and measure whether it improves return behavior without feeling noisy.",
  "Introduce a consistency indicator only if it increases meaningful entries, not just screen visits.",
  "Experiment with resurfacing older memories after users build enough history.",
  "Prioritize PDF export only when users have enough saved memories and show demand for a permanent archive.",
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
        <div className="mx-auto grid w-full max-w-[1400px] gap-12 px-6 pb-20 pt-32 sm:pt-36 md:px-10 md:pt-48 lg:grid-cols-[1fr_360px] lg:items-end">
          <div>
            <p className="inline-flex max-w-full flex-wrap items-center text-[11px] font-medium uppercase leading-relaxed tracking-[0.24em] text-primary">
              Main Product Case Study
            </p>
            <h1 className="mt-8 max-w-full text-balance font-serif text-[clamp(42px,9vw,128px)] font-medium leading-[0.95] tracking-[-0.025em] text-foreground">
              Emoline
              <br />
              <span className="italic">Journaling App</span>
            </h1>
            <p className="mt-8 max-w-3xl text-pretty font-serif text-xl leading-[1.45] tracking-tight text-muted-foreground sm:text-2xl md:text-3xl">
              From problem definition and PRD to closed-user testing, production launch on Google
              Play, and a learning roadmap for retention.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href={playStoreUrl}
                target="_blank"
                rel="noreferrer"
                className="hover-pop inline-flex items-center gap-3 border border-primary bg-primary px-5 py-3 text-[11px] font-medium uppercase tracking-[0.2em] text-primary-foreground hover:bg-primary/90"
              >
                Try Emoline
                <ExternalLink className="size-4" />
              </a>
              <a
                href="/emoline/PRD-Emoline.pdf"
                className="hover-pop inline-flex items-center gap-3 border border-border bg-card px-5 py-3 text-[11px] font-medium uppercase tracking-[0.2em] text-foreground hover:border-primary"
              >
                Original PRD
                <FileText className="size-4" />
              </a>
            </div>
          </div>

          <div className="case-panel mx-auto w-full max-w-[360px] border border-border bg-card p-5 shadow-2xl">
            <div className="overflow-hidden border border-border bg-secondary/40 p-4">
              <img
                src="/emoline/app-logo.png"
                alt="Emoline app logo"
                className="h-auto w-full"
              />
            </div>
          </div>
        </div>

        <div className="mx-auto grid max-w-[1400px] gap-px border-y border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {[
            { k: "Role", v: "Product owner and builder" },
            { k: "Platform", v: "Android" },
            { k: "Timeline", v: "About 3 months" },
            { k: "Status", v: "Live on Google Play" },
          ].map((item) => (
            <div key={item.k} className="case-panel flex min-w-0 flex-col justify-between bg-background p-6">
              <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-muted-foreground">
                {item.k}
              </p>
              <p className="mt-6 break-words text-sm leading-snug text-foreground">{item.v}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <CaseSection number="1" title="Problem" variant="problem">
          <p>
            Wanting to remember your life and consistently maintaining a diary are two different
            things. Traditional journaling often starts with an empty page and asks users to produce
            a meaningful entry, which creates friction before the habit can form.
          </p>
          <div className="case-panel rounded-xl border border-primary/25 bg-accent p-5">
            <p className="font-medium text-accent-foreground">Problem statement from the PRD</p>
            <p className="mt-2 text-accent-foreground/90">
              People want to preserve and reflect on their daily experiences, but traditional
              journaling requires too much time and effort to maintain consistently.
            </p>
          </div>
          <p>
            I reframed the product around one question: can the act of remembering one day be made
            light enough to complete in under a minute?
          </p>
        </CaseSection>

        <CaseSection number="2" title="Audience and JTBD" variant="insight">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="case-panel rounded-xl border border-border bg-card p-5">
              <p className="font-medium text-foreground">Initial audience</p>
              <p className="mt-2 text-sm">
                College students and young working professionals who want to reflect on life but
                struggle to maintain traditional journaling consistently.
              </p>
            </div>
            <div className="case-panel rounded-xl border border-border bg-card p-5">
              <p className="font-medium text-foreground">Job to be done</p>
              <p className="mt-2 text-sm">
                When my day ends, I want a quick way to capture how I felt and something I want to
                remember, so I can look back later without maintaining a full diary.
              </p>
            </div>
          </div>
        </CaseSection>

        <CaseSection number="3" title="Research and hypothesis" variant="insight">
          <p>
            I looked at the broader mood-tracking and journaling space before treating the idea as
            unique. Mature products such as Daylio validate demand for low-effort mood logging, but
            they also show how quickly the category can expand into habits, goals, media, analytics,
            reminders, exports, and customization.
          </p>
          <div className="case-panel flex items-start gap-3 rounded-xl border border-border bg-secondary/60 p-5">
            <Lightbulb className="mt-0.5 size-5 shrink-0 text-primary" />
            <div>
              <p className="font-medium text-foreground">Working hypothesis</p>
              <p className="mt-1">
                If daily reflection is reduced to choosing a mood and capturing one meaningful
                memory, people may record their days more consistently than they would with
                long-form journal entries.
              </p>
            </div>
          </div>
        </CaseSection>

        <CaseSection number="4" title="Product experience" variant="solution">
          <p>
            The core product idea is deliberately simple: choose a mood, capture one memory, save,
            and revisit later. Emoline starts with a choice instead of a blank page.
          </p>
          <div className="grid gap-px border border-border bg-border md:grid-cols-6">
            {userFlow.map((step, index) => (
              <div key={step} className="case-panel bg-card p-5">
                <p className="font-mono text-xs text-primary">{String(index + 1).padStart(2, "0")}</p>
                <p className="mt-5 text-sm font-medium leading-snug text-foreground">{step}</p>
              </div>
            ))}
          </div>
        </CaseSection>

        <CaseSection number="5" title="App screenshots" variant="solution">
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {screenshots.map((screen) => (
              <figure key={screen.src} className="case-panel overflow-hidden rounded-xl border border-border bg-card">
                <div className="bg-secondary/40 p-3">
                  <img src={screen.src} alt={`Emoline ${screen.title} screen`} className="h-auto w-full" />
                </div>
                <figcaption className="border-t border-border p-4">
                  <p className="font-medium text-foreground">{screen.title}</p>
                  <p className="mt-1.5 text-sm text-muted-foreground">{screen.note}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </CaseSection>

        <CaseSection number="6" title="Prioritization decision" variant="solution">
          <div className="grid gap-5 md:grid-cols-2">
            <div className="case-panel rounded-xl border border-border bg-card p-5">
              <p className="mb-3 flex items-center gap-2 font-medium text-foreground">
                <Check className="size-4 text-primary" /> Kept in the first release
              </p>
              <ul className="space-y-2 text-sm">
                {[
                  "Mood selection",
                  "One short memory",
                  "Saved daily history",
                  "Calendar revisit flow",
                  "Mood insights",
                  "Account-based persistence",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <Check className="mt-0.5 size-3.5 shrink-0 text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="case-panel rounded-xl border border-border bg-secondary/50 p-5">
              <p className="mb-3 flex items-center gap-2 font-medium text-foreground">
                <X className="size-4 text-muted-foreground" /> Deliberately scoped out
              </p>
              <ul className="space-y-2 text-sm">
                {[
                  "AI chat and automated long-form writing",
                  "PDF export in the first release",
                  "Heavy gamification",
                  "Social sharing",
                  "Therapy-style recommendations",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <X className="mt-0.5 size-3.5 shrink-0 text-muted-foreground" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="case-panel rounded-xl border border-primary/25 bg-accent p-5 text-accent-foreground/90">
            <p>
              The clearest trade-off was PDF export. It was useful eventually, but not useful enough
              for a first release where new users had little history to export. I prioritized
              creating history before exporting history.
            </p>
          </div>
        </CaseSection>

        <CaseSection number="7" title="Build, testing, launch" variant="metrics">
          <div className="grid gap-px border border-border bg-border md:grid-cols-5">
            {[
              { icon: FileText, label: "PRD", text: "Defined the problem, user need, scope, and core requirements." },
              { icon: Route, label: "Flow", text: "Mapped onboarding, daily entry, saved state, calendar, insights, and settings." },
              { icon: Check, label: "Build", text: "Connected the app to a live backend so accounts and memories persist." },
              { icon: BarChart3, label: "Testing", text: "Ran a 15-day Google Play closed test with 12 testers." },
              { icon: Rocket, label: "Launch", text: "Released the first production version on Google Play." },
            ].map(({ icon: Icon, label, text }) => (
              <div key={label} className="case-panel bg-card p-5">
                <Icon className="size-5 text-primary" />
                <p className="mt-5 text-sm font-medium text-foreground">{label}</p>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{text}</p>
              </div>
            ))}
          </div>
        </CaseSection>

        <CaseSection number="8" title="Metrics and early signals" variant="metrics">
          <p>
            After launch, the product question shifts from "Can I build this?" to "Who returns, why
            do they return, and what prevents others from returning?"
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            {metrics.map((metric) => (
              <div key={metric.k} className="case-panel glass-surface rounded-xl border border-border p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                  {metric.k}
                </p>
                <p className="mt-3 font-medium text-foreground">{metric.v}</p>
                <p className="mt-2 text-sm text-muted-foreground">{metric.d}</p>
              </div>
            ))}
          </div>
          <p className="case-panel rounded-xl border border-border bg-secondary/60 p-5 text-foreground">
            North-star behavior: users build a meaningful personal history by recording memories
            consistently. Downloads and accounts matter less than repeated saved entries.
          </p>
        </CaseSection>

        <CaseSection number="9" title="Next experiments">
          <ol className="space-y-3">
            {nextExperiments.map((item, index) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-secondary font-mono text-xs text-foreground">
                  {index + 1}
                </span>
                <span className="text-foreground">{item}</span>
              </li>
            ))}
          </ol>
        </CaseSection>

        <CaseSection number="10" title="Product takeaway">
          <p className="case-panel rounded-xl border border-border bg-secondary/60 p-6 text-foreground">
            Emoline turned a product idea into something measurable: PRD, scope decisions, user
            flow, working app, live backend, closed-user testing, production release, and real-user
            learning. The next stage is less about adding more features and more about discovering
            what creates lasting value.
          </p>
        </CaseSection>
      </div>

      <section className="border-t border-border">
        <div className="mx-auto flex max-w-[1400px] flex-col items-start gap-8 px-6 py-20 sm:flex-row sm:items-center sm:justify-between md:px-10">
          <p className="max-w-md font-serif text-2xl leading-[1.3] tracking-tight text-foreground md:text-3xl">
            Want to inspect the shipped product and the original{" "}
            <span className="italic text-primary">requirements?</span>
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href={playStoreUrl}
              target="_blank"
              rel="noreferrer"
              className="hover-pop group inline-flex items-center gap-3 border border-primary bg-primary px-6 py-3.5 text-[11px] font-medium uppercase tracking-[0.22em] text-primary-foreground hover:bg-primary/90"
            >
              Open Play Store
              <ExternalLink className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <Link
              href="/work"
              className="hover-pop group inline-flex items-center gap-3 border border-border bg-card px-6 py-3.5 text-[11px] font-medium uppercase tracking-[0.22em] text-foreground hover:border-primary"
            >
              View supporting work
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
