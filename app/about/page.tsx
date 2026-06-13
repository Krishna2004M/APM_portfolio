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
import { HoverDot } from "@/components/hover-dot"
import { SectionLabel } from "@/components/section-label"

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

const skillCategories = [
  {
    label: "Product",
    skills: [
      "Product Thinking",
      "User Journey Mapping",
      "UX Review",
      "Feature Prioritization",
      "Product Documentation",
      "QA Testing",
    ],
  },
  {
    label: "AI Product",
    skills: [
      "GenAI",
      "LLMs",
      "Prompt Evaluation",
      "AI Safety & Red-Teaming",
      "Model-Output Evaluation",
      "AI Workflow Automation",
    ],
  },
  {
    label: "Analytics",
    skills: [
      "SQL",
      "Excel",
      "Google Sheets",
      "Funnel Analysis",
      "Retention",
      "Engagement & Drop-off Analysis",
    ],
  },
  {
    label: "Tools",
    skills: ["Figma", "Streamlit", "GitHub", "OpenAI API", "Hugging Face", "Ollama"],
  },
]

export default function AboutPage() {
  const delays = [100, 200, 300, 400, 400] as const

  return (
    <main className="overflow-hidden">
      {/* HERO */}
      <section className="relative border-b border-border">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-1/3 size-[50vw] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />
        </div>
        <div className="mx-auto max-w-[1400px] px-6 pb-16 pt-40 md:px-10 md:pt-48">
          <Reveal>
            <SectionLabel accent>PM Competencies</SectionLabel>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="mt-8 max-w-5xl font-serif text-[clamp(48px,9vw,128px)] font-medium leading-[0.95] tracking-[-0.025em] text-foreground">
              How I think as an
              <br />
              <span className="italic">APM candidate</span>
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-10 max-w-2xl font-serif text-xl leading-[1.4] tracking-tight text-muted-foreground md:text-2xl">
              I&apos;m early in my product career, but my work in AI-enabled learning has shaped a
              clear way of thinking about products.
            </p>
          </Reveal>
        </div>
      </section>

      {/* COMPETENCIES */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-28">
          <div className="grid gap-px border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
            {competencies.map((c, i) => {
              const Icon = c.icon
              return (
                <Reveal key={c.t} delay={delays[i]} className="bg-background">
                  <div className="hover-pop glass-surface group relative flex h-full flex-col gap-6 border border-transparent p-8 hover:border-primary/40 md:p-10">
                    <HoverDot />
                    <div className="flex items-center justify-between">
                      <Icon className="size-5 text-primary" />
                      <span className="font-mono text-xs text-primary">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h2 className="font-serif text-2xl font-medium leading-[1.15] tracking-tight text-foreground md:text-3xl">
                      {c.t}
                    </h2>
                    <p className="text-sm leading-relaxed text-muted-foreground">{c.d}</p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-28">
          <Reveal>
            <SectionLabel>Skills</SectionLabel>
            <h2 className="mt-6 font-serif text-4xl font-medium leading-[1.05] tracking-tight md:text-6xl">
              What I <span className="italic text-primary">work with</span>
            </h2>
          </Reveal>
          <div className="mt-16 grid gap-px border border-border bg-border sm:grid-cols-2 md:grid-cols-4">
            {skillCategories.map((cat, index) => (
              <Reveal
                key={cat.label}
                delay={index === 0 ? 100 : index === 1 ? 200 : index === 2 ? 300 : 400}
                className="bg-background"
              >
                <div className="hover-pop glass-surface h-full border border-transparent p-8 hover:border-primary/40 md:p-10">
                  <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-primary">
                    {cat.label}
                  </p>
                  <ul className="mt-6 flex flex-col gap-3">
                    {cat.skills.map((s) => (
                      <li
                        key={s}
                        className="flex items-center gap-3 text-sm leading-snug text-foreground"
                      >
                        <span className="size-1 rounded-full bg-primary/60" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <Reveal as="section" className="border-b border-border">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-32">
          <SectionLabel accent>Get in touch</SectionLabel>
          <h2 className="mt-6 max-w-4xl font-serif text-5xl font-medium leading-[1.05] tracking-tight md:text-7xl">
            <span className="italic">Let&apos;s talk.</span>
          </h2>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            I&apos;m looking for Associate Product Manager and Product Analyst opportunities,
            especially in AI products and learning tech. Happy to walk through the case study.
          </p>

          <div className="mt-10">
            <a
              href="/M_Krishna_Product_APM_CV.pdf"
              download="M_Krishna_Product_APM_CV.pdf"
              className="hover-pop group inline-flex items-center gap-3 border border-primary bg-primary px-6 py-3.5 text-[11px] font-medium uppercase tracking-[0.22em] text-primary-foreground hover:bg-primary/90"
            >
              <Download className="size-4" />
              Download CV
            </a>
          </div>

          <div className="mt-16 grid gap-px border border-border bg-border sm:grid-cols-3">
            {contactLinks.map((item) => {
              const Icon = item.icon

              return (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noreferrer" : undefined}
                  className="hover-pop glass-surface group relative flex items-center justify-between gap-3 border border-transparent p-8 hover:border-primary/40"
                >
                  <HoverDot />
                  <span className="flex min-w-0 items-center gap-4">
                    <Icon className="size-5 shrink-0 text-primary" />
                    <span className="min-w-0">
                      <span className="block text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
                        {item.label}
                      </span>
                      <span className="mt-1 block truncate text-base text-foreground transition-colors group-hover:text-primary">
                        {item.value}
                      </span>
                    </span>
                  </span>
                  <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary" />
                </a>
              )
            })}
          </div>
        </div>
      </Reveal>
    </main>
  )
}
