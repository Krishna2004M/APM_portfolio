import Link from "next/link"
import { ArrowRight, ArrowUpRight, Download } from "lucide-react"
import type { ElementType } from "react"
import { LinkedinIcon, GithubIcon } from "@/components/brand-icons"
import { Reveal } from "@/components/reveal"

const proofCards = [
  {
    tag: "Product Operations",
    title: "Airlearn Product Operations",
    desc: "Learning-product QC and release readiness - reviewing lesson flows, scripts, and modules before they go live.",
  },
  {
    tag: "AI Safety",
    title: "Google Adversarial Nibbler",
    desc: "AI safety and model-output evaluation - probing generative models for harmful and unsafe outputs.",
  },
  {
    tag: "AI Projects",
    title: "AI Product Projects",
    desc: "Brain tumor detection and NLP research - applying AI to real problems with a user-and-impact lens.",
  },
]

const heroLinks: Array<{
  href: string
  label: string
  icon: ElementType<{ className?: string }>
}> = [
  { href: "/M_Krishna_Product_APM_CV.pdf", label: "Download CV", icon: Download },
  { href: "https://linkedin.com/in/m-krishna-krishna", label: "LinkedIn", icon: LinkedinIcon },
  { href: "https://github.com/Krishna2004M", label: "GitHub", icon: GithubIcon },
]

export default function HomePage() {
  return (
    <main>
      <section className="relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 -z-10 h-72 bg-gradient-to-b from-primary/10 to-transparent" />
        <div className="mx-auto max-w-5xl px-6 pb-16 pt-16 md:pt-24">
          <Reveal className="max-w-3xl">
            <p className="animate-soft-glow mb-5 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-secondary px-3 py-1 text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
              Associate Product Manager | Product Analyst
            </p>
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              <div>
                <h1 className="text-balance font-serif text-4xl font-medium leading-[1.1] tracking-tight md:text-6xl">
                  M Krishna
                </h1>
                <p className="mt-3 text-lg font-medium text-accent-foreground md:text-xl">
                  APM | AI Products | Learning Tech
                </p>
              </div>
              <div className="flex size-16 shrink-0 items-center justify-center rounded-full bg-primary font-serif text-xl font-medium text-primary-foreground shadow-md">
                MK
              </div>
            </div>
            <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
              Aspiring Associate Product Manager with hands-on product-operations experience in
              AI-enabled language learning. I review learner flows, Figma lesson modules, scripts,
              content quality, and release readiness to improve product experience.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/case-study"
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-md"
              >
                Read Main Case Study
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              {heroLinks.map((item) => {
                const Icon = item.icon
                const external = item.href.startsWith("http")

                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noreferrer" : undefined}
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 py-2.5 text-sm font-medium shadow-sm transition-all hover:-translate-y-0.5 hover:bg-secondary hover:shadow-md"
                  >
                    <Icon className="size-4" />
                    {item.label}
                  </a>
                )
              })}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-border bg-secondary/40">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <Reveal>
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-8 bg-primary" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                Featured Case Study
              </span>
            </div>

            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:-translate-y-0.5 hover:border-foreground/30 hover:shadow-md dark:hover:shadow-foreground/5">
              <div className="grid gap-0 md:grid-cols-5">
                <div className="flex flex-col justify-center gap-5 p-8 md:col-span-3 md:p-10">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
                      Language Learning | EdTech
                    </p>
                    <h2 className="mt-2 text-balance font-serif text-2xl font-medium leading-tight tracking-tight md:text-3xl">
                      Mistakes Review Feature for Airlearn
                    </h2>
                  </div>
                  <p className="text-pretty leading-relaxed text-muted-foreground">
                    A product case study on improving language-learning retention through
                    personalized mistake review, spaced repetition, and feedback loops.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["Problem framing", "User flow", "MVP scope", "Metrics", "A/B test"].map(
                      (tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-secondary px-3 py-1 text-xs text-secondary-foreground"
                        >
                          {tag}
                        </span>
                      ),
                    )}
                  </div>
                  <div>
                    <Link
                      href="/case-study"
                      className="group inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-md"
                    >
                      View Case Study
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-px border-t border-border bg-border md:col-span-2 md:border-l md:border-t-0">
                  {[
                    { k: "Role", v: "Product thinking & feature proposal" },
                    { k: "Domain", v: "Language learning / EdTech" },
                    { k: "Focus", v: "Retention & feedback loops" },
                    { k: "Output", v: "MVP scope, metrics, A/B hypothesis" },
                  ].map((item) => (
                    <div key={item.k} className="bg-card p-6">
                      <p className="text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
                        {item.k}
                      </p>
                      <p className="mt-1.5 text-sm leading-snug">{item.v}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16">
        <Reveal className="mb-8 flex flex-col gap-2">
          <h2 className="font-serif text-2xl font-medium tracking-tight">
            Background that supports my product thinking
          </h2>
          <p className="max-w-2xl text-pretty text-muted-foreground">
            Three experiences that ground how I evaluate AI products, learning quality, and user value.
          </p>
        </Reveal>

        <div className="grid gap-5 md:grid-cols-3">
          {proofCards.map((card, index) => (
            <Reveal key={card.title} delay={index === 0 ? 100 : index === 1 ? 200 : 300}>
              <div className="flex h-full flex-col gap-3 rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-foreground/30 hover:shadow-md dark:hover:shadow-foreground/5">
                <span className="w-fit rounded-full bg-accent px-2.5 py-0.5 text-xs font-medium text-accent-foreground">
                  {card.tag}
                </span>
                <h3 className="font-medium leading-snug">{card.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{card.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-8">
          <Link
            href="/work"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary underline-offset-4 hover:underline"
          >
            See supporting work
            <ArrowUpRight className="size-4" />
          </Link>
        </Reveal>
      </section>
    </main>
  )
}
