import Link from "next/link"
import type { ReactNode } from "react"
import { ArrowRight, Languages, Microscope, ShieldAlert, type LucideIcon } from "lucide-react"
import { Reveal } from "@/components/reveal"

export const metadata = {
  title: "Supporting Work - M Krishna",
  description:
    "Supporting AI product, AI safety, and NLP research work that grounds M Krishna's product thinking.",
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
        {label}
      </p>
      <p className="mt-1.5 leading-relaxed text-foreground">{children}</p>
    </div>
  )
}

function ProjectIcon({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent text-primary">
      <Icon className="size-5" />
    </div>
  )
}

export default function WorkPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <Reveal as="header" className="mb-12 max-w-2xl">
        <h1 className="font-serif text-4xl font-medium tracking-tight md:text-5xl">
          Supporting work
        </h1>
        <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
          These projects support the main case study. Each is framed as a product story - the
          problem, the user, and what I learned - rather than as a list of technical achievements.
        </p>
      </Reveal>

      <div className="space-y-8">
        <Reveal as="article" delay={100} className="rounded-2xl border border-border bg-card p-7 shadow-sm transition-all hover:-translate-y-0.5 hover:border-foreground/30 hover:shadow-md dark:hover:shadow-foreground/5 md:p-9">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <ProjectIcon icon={Microscope} />
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-primary">
                  AI Product
                </p>
                <span className="mt-1 inline-flex rounded-full bg-accent px-2.5 py-0.5 text-xs font-medium text-accent-foreground">
                  Provisional Patent Filed | Nov 2025
                </span>
              </div>
            </div>
          </div>
          <h2 className="mt-4 font-serif text-2xl font-medium tracking-tight">
            Brain Tumor Detection & Clinical Report Generator
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <Field label="Problem">
              Radiologists spend significant time reviewing scans and writing reports, which can
              delay diagnosis and add cognitive load.
            </Field>
            <Field label="Target user">
              Radiologists and clinicians who need fast, consistent support in reading MRI/CT scans.
            </Field>
            <Field label="Solution">
              MONAI U-Net segmentation of MRI/CT scans paired with GenAI radiologist-style reports -
              to assist, not replace, the clinician&apos;s judgement.
            </Field>
            <Field label="User flow">
              Upload scan - MONAI U-Net detects and highlights region - GenAI draft report generated
              - clinician reviews, edits, and confirms.
            </Field>
            <Field label="Evaluation">
              Prototype tested using Dice score for segmentation quality. End-to-end Streamlit
              interface designed and directed using AI tooling.
            </Field>
            <Field label="Product lesson">
              In high-stakes domains, the product must build trust and keep a human in the loop -
              accuracy alone is not enough.
            </Field>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            {["MONAI U-Net", "GenAI Reports", "Streamlit", "Dice Score"].map((tag) => (
              <span key={tag} className="rounded-full bg-secondary px-3 py-1 text-sm text-secondary-foreground">
                {tag}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal as="article" delay={200} className="rounded-2xl border border-border bg-card p-7 shadow-sm transition-all hover:-translate-y-0.5 hover:border-foreground/30 hover:shadow-md dark:hover:shadow-foreground/5 md:p-9">
          <div className="flex flex-wrap items-center gap-3">
            <ProjectIcon icon={ShieldAlert} />
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-primary">
                AI Safety
              </p>
              <span className="mt-1 inline-flex rounded-full bg-accent px-2.5 py-0.5 text-xs font-medium text-accent-foreground">
                ~150 selected from 7,000+ applicants | Jan 2025
              </span>
            </div>
          </div>
          <h2 className="mt-4 font-serif text-2xl font-medium tracking-tight">
            Google Adversarial Nibbler
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <Field label="Context">
              A crowdsourced AI-safety challenge focused on surfacing harmful or unsafe outputs from
              text-to-image generative models. Selected among ~150 participants from 7,000+ applicants.
            </Field>
            <Field label="Role">
              Red-teamer - designing adversarial prompts and evaluating model responses for safety,
              bias, and harmful-output patterns.
            </Field>
            <Field label="What I evaluated">
              Whether model outputs were unsafe, biased, or misleading, and how easily safeguards
              could be bypassed using prompt engineering.
            </Field>
            <Field label="Risks surfaced">
              Harmful content generation, edge-case failures, and the gap between intended and
              actual model behavior.
            </Field>
            <Field label="Product relevance">
              AI products need evaluation and guardrails as first-class features. Judging model
              output quality is a core PM skill in AI products.
            </Field>
          </div>
        </Reveal>

        <Reveal as="article" delay={300} className="rounded-2xl border border-border bg-card p-7 shadow-sm transition-all hover:-translate-y-0.5 hover:border-foreground/30 hover:shadow-md dark:hover:shadow-foreground/5 md:p-9">
          <div className="flex flex-wrap items-center gap-3">
            <ProjectIcon icon={Languages} />
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-primary">
                NLP Research
              </p>
              <span className="mt-1 inline-flex rounded-full bg-accent px-2.5 py-0.5 text-xs font-medium text-accent-foreground">
                Published & Presented | Dec 2024
              </span>
            </div>
          </div>
          <h2 className="mt-4 font-serif text-2xl font-medium tracking-tight">
            Code-Mixing & Code-Switching Detection
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <Field label="Problem">
              Many users mix languages within a single sentence (English, Hindi, Tamil), which
              standard NLP models handle poorly.
            </Field>
            <Field label="Why it matters">
              Multilingual users are a huge, underserved audience - especially relevant for a
              language-learning product serving diverse learners.
            </Field>
            <Field label="Approach">
              Framed the research problem and selected model approach: SVM, CNN, LSTM, and N-Gram
              classifiers using TF-IDF, FastText, and character n-grams.
            </Field>
            <Field label="Result">
              91.5% accuracy with LSTM. Published and presented at an international NLP conference
              (Dec 2024).
            </Field>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            {["91.5% accuracy (LSTM)", "International conference", "English | Hindi | Tamil", "TF-IDF | FastText"].map((tag, index) => (
              <span
                key={tag}
                className={index === 0 ? "rounded-full bg-accent px-3 py-1 text-sm font-medium text-accent-foreground" : "rounded-full bg-secondary px-3 py-1 text-sm text-secondary-foreground"}
              >
                {tag}
              </span>
            ))}
          </div>
        </Reveal>
      </div>

      <Reveal className="mt-12 flex flex-col items-start gap-4 rounded-2xl border border-border bg-secondary/40 p-7 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-md text-pretty text-muted-foreground">
          The strongest expression of this thinking is the Airlearn case study.
        </p>
        <Link
          href="/case-study"
          className="group inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-md"
        >
          Read the case study
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </Reveal>
    </main>
  )
}
