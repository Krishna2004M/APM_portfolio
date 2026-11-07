import Link from "next/link"
import type { ReactNode } from "react"
import { ArrowRight, ExternalLink, Languages, Microscope, Search, ShieldAlert, Smartphone, Users, type LucideIcon } from "lucide-react"
import { Reveal } from "@/components/reveal"
import { HoverDot } from "@/components/hover-dot"
import { SectionLabel } from "@/components/section-label"

export const metadata = {
  title: "Supporting Work, M Krishna",
  description:
    "Shipped product, AI product, AI safety, and NLP research work that grounds M Krishna's product thinking.",
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-muted-foreground">
        {label}
      </p>
      <p className="mt-2.5 leading-relaxed text-foreground">{children}</p>
    </div>
  )
}

function ProjectIcon({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <div className="flex size-12 shrink-0 items-center justify-center border border-primary text-primary">
      <Icon className="size-5" />
    </div>
  )
}

const projects = [
  {
    n: "01",
    icon: Smartphone,
    category: "Shipped Product",
    badge: "Live on Google Play",
    title: "Emoline Consumer Journaling App",
    fields: [
      {
        label: "Problem",
        body: "Traditional journaling often asks too much from users at the moment they are trying to build a habit.",
      },
      {
        label: "Product decision",
        body: "Scoped the core behavior to one emotion plus one sentence daily, keeping AI and chat out of V1 to isolate the behavioral hypothesis.",
      },
      {
        label: "Role",
        body: "Defined the problem, wrote the PRD, selected React Native, Expo, and Supabase, and directed the build from spec to launch.",
      },
      {
        label: "Launch",
        body: "Moved the app through a 15-day Google Play closed test with 12 testers, then launched the first production release on Google Play.",
      },
      {
        label: "Metrics",
        body: "Defined first-entry completion, D1/D7/D30 retention, and daily entry completion as early product engagement signals.",
      },
      {
        label: "Product lesson",
        body: "A strong MVP is not the smallest build. It is the smallest test that can teach whether the product behavior is worth scaling.",
      },
    ],
    tags: ["PRD", "User Flow", "Closed Testing", "Google Play", "Metrics"],
    links: [{ label: "Read case study", href: "/case-study" }],
  },
  {
    n: "02",
    icon: Search,
    category: "Product Discovery and UX",
    badge: "Prototype",
    title: "SuperKalam Reattempt",
    fields: [
      { label: "Discovery", body: "Explored the SuperKalam app over three days and spoke with two UPSC aspirants through social media to understand how they use written-answer practice and AI evaluation." },
      { label: "Problem", body: "Learners received detailed AI feedback after an answer, but had no clear loop to apply that feedback, retry the question, or see whether their answer had improved." },
      { label: "Product decision", body: "Proposed Reattempt on the home experience: after a lower-scoring attempt, learners can use the evaluation guidance to try again and compare the new response with their previous score and feedback." },
      { label: "Supporting ideas", body: "Recommended topic, chapter, and subject filters to reduce browsing, plus predictive question search so learners can find a question they remember from a phrase or keyword." },
      { label: "Success signals", body: "Proposed tracking reattempt starts and completions, score movement between attempts, and repeat use of filters/search. These are measurement proposals, not claimed results." },
    ],
    tags: ["User interviews", "Learning loop", "AI evaluation", "Question discovery"],
    links: [{ label: "Open prototype", href: "https://superkalam-reattempt.vercel.app/" }],
  },
  {
    n: "03",
    icon: Users,
    category: "Product Analyst Assignment",
    badge: "Interactive prototype",
    title: "TalentXO Leads Management",
    fields: [
      { label: "Problem", body: "Talent Partners share a candidate database across jobs. Without controlled ownership and clear progress, multiple recruiters can duplicate outreach while other leads go untouched or stall." },
      { label: "Product approach", body: "Designed an end-to-end workflow for discovering relevant candidate-job leads, claiming exclusive ownership, recording outreach and next actions, validating candidate interest and authorization, then submitting or closing with a reason." },
      { label: "Key decisions", body: "Model a lead as a candidate-job opportunity, not a candidate-wide lock. Separate outreach attempts from confirmed progress, require job-specific consent before submission, and preserve history through reassignment." },
      { label: "Operations and edge cases", body: "The PRD covers claim capacity and expiry, inactivity recovery, duplicate applications, changing job/candidate eligibility, uncertain submission outcomes, and operational visibility into stalled or disputed leads." },
      { label: "Success signals", body: "Proposed lead utilization, time to first meaningful contact, stale-lead rate, duplicate outreach, and valid lead-to-application conversion as signals to evaluate after implementation." },
    ],
    tags: ["PRD", "Lead lifecycle", "Workflow design", "Business rules", "Prototype"],
    links: [
      { label: "Open prototype", href: "https://talentxo-leads-prototype.vercel.app/" },
      { label: "Read PRD", href: "/talentxo/TalentXO-Leads-Management-PRD.pdf" },
      { label: "Read assignment", href: "/talentxo/TalentXO-Product-Analyst-Assignment.pdf" },
    ],
  },
  {
    n: "04",
    icon: Search,
    category: "APM Integrations Take-Home",
    badge: "Working product prototype",
    title: "Clearance: OAuth Approval Readiness",
    fields: [
      { label: "Problem", body: "Agent builders can underestimate the steps, review gates, and provider wait times involved in getting an OAuth app approved, making integration launch plans hard to trust." },
      { label: "Solution", body: "Built a guide library and live research flow that estimates difficulty and time to production, explains blockers, and turns requirements into an ordered checklist." },
      { label: "Product decisions", body: "Separate hands-on work from provider waiting; assign an owner to each step (agent, developer, or provider); and make evidence quality visible so sourced facts, probes, and uncertainty are distinguishable." },
      { label: "Trust and safety", body: "The system link-checks cited sources, runs deterministic OAuth probes, blocks private IPs in fetches, and downgrades unsupported claims instead of presenting model output as verified fact." },
      { label: "Status", body: "A deployed prototype and public source repository are available. The README describes 12 curated guides and coverage for 402 OAuth toolkits; these are product coverage counts, not user or business impact metrics." },
    ],
    tags: ["OAuth", "Integrations", "AI research workflow", "Evidence quality", "Prototype"],
    links: [
      { label: "Open prototype", href: "https://clearance-sigma-nine.vercel.app/" },
      { label: "View source", href: "https://github.com/krishna2004-coder/clearance" },
      { label: "Read assignment", href: "https://composio.notion.site/APM-Integrations-Take-home-Assignment-3f9f261a6dfe81489ee5e3643151f9d6" },
    ],
  },
  {
    n: "05",
    icon: Microscope,
    category: "AI Product",
    badge: "Provisional Patent Filed, Nov 2025",
    title: "Brain Tumor Detection & Clinical Report Generator",
    fields: [
      {
        label: "Problem",
        body: "Radiologists spend significant time reviewing scans and writing reports, which can delay diagnosis and add cognitive load.",
      },
      {
        label: "Target user",
        body: "Radiologists and clinicians who need fast, consistent support in reading MRI/CT scans.",
      },
      {
        label: "Solution",
        body: "MONAI U-Net segmentation of MRI/CT scans paired with GenAI radiologist-style reports, designed to assist, not replace, the clinician's judgement.",
      },
      {
        label: "User flow",
        body: "Upload scan, MONAI U-Net detects and highlights region, GenAI draft report generated, clinician reviews, edits, and confirms.",
      },
      {
        label: "Evaluation",
        body: "Prototype tested using Dice score for segmentation quality. End-to-end Streamlit interface designed and directed using AI tooling.",
      },
      {
        label: "Product lesson",
        body: "In high-stakes domains, the product must build trust and keep a human in the loop. Accuracy alone is not enough.",
      },
    ],
    tags: ["MONAI U-Net", "GenAI Reports", "Streamlit", "Dice Score"],
  },
  {
    n: "06",
    icon: ShieldAlert,
    category: "AI Safety",
    badge: "~150 selected from 7,000+ applicants, Jan 2025",
    title: "Google Adversarial Nibbler",
    fields: [
      {
        label: "Context",
        body: "A crowdsourced AI-safety challenge focused on surfacing harmful or unsafe outputs from text-to-image generative models. Selected among ~150 participants from 7,000+ applicants.",
      },
      {
        label: "Role",
        body: "Red-teamer designing adversarial prompts and evaluating model responses for safety, bias, and harmful-output patterns.",
      },
      {
        label: "What I evaluated",
        body: "Whether model outputs were unsafe, biased, or misleading, and how easily safeguards could be bypassed using prompt engineering.",
      },
      {
        label: "Risks surfaced",
        body: "Harmful content generation, edge-case failures, and the gap between intended and actual model behavior.",
      },
      {
        label: "Product relevance",
        body: "AI products need evaluation and guardrails as first-class features. Judging model output quality is a core PM skill in AI products.",
      },
    ],
    tags: [] as string[],
  },
  {
    n: "07",
    icon: Languages,
    category: "NLP Research",
    badge: "Published and Presented, Dec 2024",
    title: "Code-Mixing & Code-Switching Detection",
    fields: [
      {
        label: "Problem",
        body: "Many users mix languages within a single sentence (English, Hindi, Tamil), which standard NLP models handle poorly.",
      },
      {
        label: "Why it matters",
        body: "Multilingual users are a huge, underserved audience, especially relevant for a language-learning product serving diverse learners.",
      },
      {
        label: "Approach",
        body: "Framed the research problem and selected model approach: SVM, CNN, LSTM, and N-Gram classifiers using TF-IDF, FastText, and character n-grams.",
      },
      {
        label: "Result",
        body: "91.5% accuracy with LSTM. Published and presented at an international NLP conference (Dec 2024).",
      },
    ],
    tags: [
      "91.5% accuracy (LSTM)",
      "International conference",
      "English, Hindi, Tamil",
      "TF-IDF, FastText",
    ],
  },
]

export default function WorkPage() {
  return (
    <main className="overflow-hidden">
      {/* HERO */}
      <section className="relative border-b border-border">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-1/3 size-[50vw] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />
        </div>
        <div className="mx-auto max-w-[1400px] px-6 pb-16 pt-40 md:px-10 md:pt-48">
          <Reveal>
            <SectionLabel accent>Supporting Work</SectionLabel>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="mt-8 max-w-5xl font-serif text-[clamp(56px,11vw,160px)] font-medium leading-[0.92] tracking-[-0.025em] text-foreground">
              Supporting
              <br />
              <span className="italic">work</span>
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-10 max-w-2xl font-serif text-2xl leading-[1.4] tracking-tight text-muted-foreground md:text-3xl">
              These projects show how I move from problem framing to shipping, evaluation, and
              learning. Each is framed as a product story: the problem, the user, and what I learned.
            </p>
          </Reveal>
        </div>
      </section>

      {/* PROJECTS */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-[1400px] px-6 py-20 md:px-10 md:py-28">
          <div className="space-y-px border border-border bg-border">
            {projects.map((p, idx) => {
              const Icon = p.icon
              return (
                <Reveal
                  key={p.title}
                  as="article"
                  delay={idx === 0 ? 100 : idx === 1 ? 200 : 300}
                  className="bg-background"
                >
                  <div className="hover-pop glass-surface group relative grid gap-10 border border-transparent p-8 hover:border-primary/40 md:grid-cols-12 md:gap-16 md:p-12 lg:p-16">
                    <HoverDot />
                    <div className="md:col-span-4">
                      <span className="font-mono text-xs text-primary">{p.n}</span>
                      <div className="mt-6 flex flex-wrap items-center gap-4">
                        <ProjectIcon icon={Icon} />
                        <div>
                          <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-primary">
                            {p.category}
                          </p>
                          <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                            {p.badge}
                          </p>
                        </div>
                      </div>
                      <h2 className="mt-8 font-serif text-3xl font-medium leading-[1.05] tracking-tight text-foreground md:text-4xl">
                        {p.title}
                      </h2>
                    </div>

                    <div className="md:col-span-8">
                      <div className="grid gap-8 sm:grid-cols-2">
                        {p.fields.map((f) => (
                          <Field key={f.label} label={f.label}>
                            {f.body}
                          </Field>
                        ))}
                      </div>
                      {p.tags.length > 0 && (
                        <div className="mt-10 flex flex-wrap gap-2">
                          {p.tags.map((tag, tagIdx) => (
                            <span
                              key={tag}
                              className={
                                tagIdx === 0 && p.n === "03"
                                  ? "border border-primary bg-primary/10 px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-primary"
                                  : "border border-border px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-muted-foreground"
                              }
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      {p.links && (
                        <div className="mt-8 flex flex-wrap gap-3">
                          {p.links.map((link) => {
                            const external = link.href.startsWith("http")
                            return external ? (
                              <a key={link.label} href={link.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 border border-border px-4 py-2 text-[10px] font-medium uppercase tracking-[0.18em] text-foreground hover:border-primary hover:text-primary">
                                {link.label}<ExternalLink className="size-3.5" />
                              </a>
                            ) : (
                              <a key={link.label} href={link.href} className="inline-flex items-center gap-2 border border-border px-4 py-2 text-[10px] font-medium uppercase tracking-[0.18em] text-foreground hover:border-primary hover:text-primary">
                                {link.label}<ExternalLink className="size-3.5" />
                              </a>
                            )
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-b border-border">
        <div className="mx-auto flex max-w-[1400px] flex-col items-start gap-8 px-6 py-20 sm:flex-row sm:items-center sm:justify-between md:px-10">
          <p className="max-w-md font-serif text-2xl leading-[1.3] tracking-tight text-foreground md:text-3xl">
            The clearest end-to-end product story is the{" "}
            <span className="italic text-primary">Emoline case study.</span>
          </p>
          <Link
            href="/case-study"
            className="hover-pop group inline-flex items-center gap-3 border border-primary bg-primary px-6 py-3.5 text-[11px] font-medium uppercase tracking-[0.22em] text-primary-foreground hover:bg-primary/90"
          >
            Read the case study
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </main>
  )
}
