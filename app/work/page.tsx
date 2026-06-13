import Link from "next/link"
import type { ReactNode } from "react"
import { ArrowRight, Languages, Microscope, ShieldAlert, type LucideIcon } from "lucide-react"
import { Reveal } from "@/components/reveal"
import { HoverDot } from "@/components/hover-dot"
import { SectionLabel } from "@/components/section-label"

export const metadata = {
  title: "Supporting Work | M Krishna",
  description:
    "Supporting AI product, AI safety, and NLP research work that grounds M Krishna's product thinking.",
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
    icon: Microscope,
    category: "AI Product",
    badge: "Provisional Patent Filed | Nov 2025",
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
    n: "02",
    icon: ShieldAlert,
    category: "AI Safety",
    badge: "~150 selected from 7,000+ applicants | Jan 2025",
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
    n: "03",
    icon: Languages,
    category: "NLP Research",
    badge: "Published & Presented | Dec 2024",
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
      "English | Hindi | Tamil",
      "TF-IDF | FastText",
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
              These projects support the main case study. Each is framed as a product story: the
              problem, the user, and what I learned, rather than as a list of technical achievements.
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
            The strongest expression of this thinking is the{" "}
            <span className="italic text-primary">Airlearn case study.</span>
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
