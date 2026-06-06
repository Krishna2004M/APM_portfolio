import type { ElementType } from "react"
import {
  ArrowUpRight,
  BarChart3,
  BrainCircuit,
  Download,
  GraduationCap,
  Mail,
  Route,
  Sparkles,
  type LucideIcon,
} from "lucide-react"
import { LinkedinIcon, GithubIcon } from "@/components/brand-icons"
import { Reveal } from "@/components/reveal"

export const metadata = {
  title: "Skills & Contact - M Krishna",
  description: "PM competencies and contact details for M Krishna.",
}

const competencies: Array<{
  t: string
  d: string
  icon: LucideIcon
}> = [
  {
    t: "I evaluate AI outputs",
    d: "From AI-safety work to model evaluation, I can judge whether model output is useful, safe, and trustworthy.",
    icon: BrainCircuit,
  },
  {
    t: "I think in user journeys",
    d: "I look at how learners move through a flow and where small gaps break the experience.",
    icon: Route,
  },
  {
    t: "I understand learning-product quality",
    d: "Hands-on QC of lesson flows, scripts, and modules - knowing what release ready really means.",
    icon: GraduationCap,
  },
  {
    t: "I think in metrics",
    d: "I frame features around activation, engagement, retention, and learning outcomes.",
    icon: BarChart3,
  },
  {
    t: "I connect AI with user value",
    d: "I focus on the user problem first, then use AI where it genuinely improves the experience.",
    icon: Sparkles,
  },
]

const contactLinks: Array<{
  href: string
  label: string
  value: string
  icon: ElementType<{ className?: string }>
  external?: boolean
}> = [
  {
    href: "mailto:krishbabu2004@gmail.com",
    label: "Email",
    value: "krishbabu2004@gmail.com",
    icon: Mail,
  },
  {
    href: "https://linkedin.com/in/m-krishna-krishna",
    label: "LinkedIn",
    value: "m-krishna-krishna",
    icon: LinkedinIcon,
    external: true,
  },
  {
    href: "https://github.com/Krishna2004M",
    label: "GitHub",
    value: "Krishna2004M",
    icon: GithubIcon,
    external: true,
  },
]

export default function AboutPage() {
  const delays = [100, 200, 300, 400, 400] as const

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <section>
        <Reveal>
          <div className="mb-3 flex items-center gap-3">
            <span className="h-px w-8 bg-primary" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              PM Competencies
            </span>
          </div>
          <h1 className="max-w-2xl text-balance font-serif text-4xl font-medium tracking-tight md:text-5xl">
            How I think as an APM candidate
          </h1>
          <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
            I&apos;m early in my product career, but my work in AI-enabled learning has shaped a clear
            way of thinking about products.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {competencies.map((c, i) => {
            const Icon = c.icon

            return (
              <Reveal key={c.t} delay={delays[i]}>
                <div className="flex h-full flex-col gap-3 rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-foreground/30 hover:shadow-md dark:hover:shadow-foreground/5">
                  <Icon className="size-5 text-primary" />
                  <span className="font-mono text-sm text-primary">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="font-medium leading-snug text-foreground">{c.t}</h2>
                  <p className="text-sm leading-relaxed text-muted-foreground">{c.d}</p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </section>

      <section className="mt-16">
        <Reveal>
          <div className="mb-3 flex items-center gap-3">
            <span className="h-px w-8 bg-primary" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Skills
            </span>
          </div>
          <h2 className="font-serif text-2xl font-medium tracking-tight">What I work with</h2>
        </Reveal>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          {[
            {
              label: "Product",
              skills: ["Product Thinking", "User Journey Mapping", "UX Review", "Feature Prioritization", "Product Documentation", "QA Testing"],
            },
            {
              label: "AI Product",
              skills: ["GenAI", "LLMs", "Prompt Evaluation", "AI Safety & Red-Teaming", "Model-Output Evaluation", "AI Workflow Automation"],
            },
            {
              label: "Analytics",
              skills: ["SQL", "Excel", "Google Sheets", "Funnel Analysis", "Retention", "Engagement & Drop-off Analysis"],
            },
            {
              label: "Tools",
              skills: ["Figma", "Streamlit", "GitHub", "OpenAI API", "Hugging Face", "Ollama"],
            },
          ].map((cat, index) => (
            <Reveal key={cat.label} delay={index === 0 ? 100 : index === 1 ? 200 : index === 2 ? 300 : 400}>
              <div className="h-full rounded-xl border border-border bg-card p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-foreground/30 hover:shadow-md dark:hover:shadow-foreground/5">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-primary">
                  {cat.label}
                </p>
                <ul className="flex flex-col gap-1.5">
                  {cat.skills.map((s) => (
                    <li key={s} className="text-sm leading-snug text-muted-foreground">
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <Reveal as="section" className="mt-16 rounded-2xl border border-border bg-secondary/40 p-8 shadow-sm md:p-12">
        <h2 className="font-serif text-3xl font-medium tracking-tight">Get in touch</h2>
        <p className="mt-3 max-w-md text-pretty leading-relaxed text-muted-foreground">
          I&apos;m looking for Associate Product Manager and Product Analyst opportunities,
          especially in AI products and learning tech. Happy to walk through the case study.
        </p>

        <div className="mt-6">
          <a
            href="/M_Krishna_Product_APM_CV.pdf"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium shadow-sm transition-all hover:-translate-y-0.5 hover:bg-secondary hover:shadow-md"
          >
            <Download className="size-4" />
            Download CV
          </a>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {contactLinks.map((item) => {
            const Icon = item.icon

            return (
              <a
                key={item.label}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noreferrer" : undefined}
                className="group flex items-center justify-between gap-3 rounded-xl border border-border bg-card p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-foreground/30 hover:shadow-md dark:hover:shadow-foreground/5"
              >
                <span className="flex min-w-0 items-center gap-3">
                  <Icon className="size-5 shrink-0 text-primary" />
                  <span className="min-w-0">
                    <span className="block text-xs uppercase tracking-[0.12em] text-muted-foreground">
                      {item.label}
                    </span>
                    <span className="block truncate text-sm">{item.value}</span>
                  </span>
                </span>
                <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            )
          })}
        </div>
      </Reveal>
    </main>
  )
}
