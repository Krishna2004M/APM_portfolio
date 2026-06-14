import Link from "next/link"
import { ArrowRight, ArrowUpRight, Download } from "lucide-react"
import type { ElementType } from "react"
import { LinkedinIcon, GithubIcon } from "@/components/brand-icons"
import { Reveal } from "@/components/reveal"
import { HoverDot } from "@/components/hover-dot"
import { SectionLabel } from "@/components/section-label"

const proofCards = [
  {
    tag: "Product Operations",
    title: "Airlearn Product Operations",
    desc: "Learning-product QC and release readiness, reviewing lesson flows, scripts, and modules before they go live.",
  },
  {
    tag: "AI Safety",
    title: "Google Adversarial Nibbler",
    desc: "AI safety and model-output evaluation, probing generative models for harmful and unsafe outputs.",
  },
  {
    tag: "AI Projects",
    title: "AI Product Projects",
    desc: "Brain tumor detection and NLP research, applying AI to real problems with a user-and-impact lens.",
  },
]

const heroLinks: Array<{
  href: string
  label: string
  icon: ElementType<{ className?: string }>
  download?: string
}> = [
  {
    href: "/M_Krishna_Product_APM_CV.pdf",
    label: "Download CV",
    icon: Download,
    download: "M_Krishna_Product_APM_CV.pdf",
  },
  { href: "https://linkedin.com/in/m-krishna-krishna", label: "LinkedIn", icon: LinkedinIcon },
  { href: "https://github.com/Krishna2004M", label: "GitHub", icon: GithubIcon },
]

export default function HomePage() {
  return (
    <main className="overflow-hidden">
      {/* HERO */}
      <section className="relative min-h-screen overflow-hidden border-b border-border">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-1/3 size-[60vw] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />
          <div className="absolute right-[8%] top-32 h-36 w-56 rotate-6 border border-primary/20 bg-card/30 blur-[1px] backdrop-blur-2xl" />
          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.6) 1px, transparent 0)",
              backgroundSize: "32px 32px",
            }}
          />
        </div>

        <div className="mx-auto w-full max-w-[1400px] px-6 pb-24 pt-32 sm:pt-36 md:px-10 md:pt-48">
          <Reveal>
            <SectionLabel accent>
              <span className="flex max-w-full flex-wrap items-center gap-3 leading-relaxed">
                <span className="size-1.5 rounded-full bg-primary animate-pulse-dot" />
                Associate Product Manager and Product Analyst
              </span>
            </SectionLabel>
          </Reveal>

          <div className="mt-10 grid min-w-0 items-end gap-10 md:grid-cols-12">
            <Reveal delay={100} className="min-w-0 md:col-span-9">
              <h1 className="max-w-full text-balance font-serif text-[clamp(56px,13vw,200px)] font-medium leading-[0.9] tracking-[-0.03em] text-foreground">
                M <span className="italic">Krishna</span>
              </h1>
              <p className="mt-6 max-w-full text-balance text-base font-medium uppercase leading-relaxed tracking-[0.18em] text-primary sm:text-lg sm:tracking-[0.24em] md:text-xl">
                APM, AI Products, Learning Tech
              </p>
            </Reveal>
            <Reveal delay={200} className="md:col-span-3 md:flex md:justify-end">
              <div className="flex size-24 shrink-0 items-center justify-center border border-primary font-serif text-3xl font-medium text-primary md:size-28 md:text-4xl">
                MK
              </div>
            </Reveal>
          </div>

          <Reveal delay={300} className="mt-14 grid min-w-0 gap-10 md:mt-16 md:grid-cols-12">
            <p className="min-w-0 max-w-full text-pretty font-serif text-xl leading-[1.45] tracking-tight text-foreground sm:text-2xl md:col-span-8 md:text-3xl">
              Associate Product Manager focused on AI-enabled language learning, with hands-on
              product-operations experience. I review learner flows, Figma lesson modules, scripts,
              content quality, and release readiness to improve product experience.
            </p>
          </Reveal>

          <Reveal delay={400} className="mt-12 flex flex-wrap items-center gap-3">
            <Link
              href="/case-study"
              className="hover-pop group inline-flex items-center gap-3 border border-primary bg-primary px-6 py-3.5 text-[11px] font-medium uppercase tracking-[0.22em] text-primary-foreground hover:bg-primary/90"
            >
              Read Main Case Study
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
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
                  download={item.download}
                  className="hover-pop glass-surface group inline-flex items-center gap-3 border border-border px-6 py-3.5 text-[11px] font-medium uppercase tracking-[0.22em] text-foreground hover:border-primary hover:text-primary"
                >
                  <Icon className="size-4" />
                  {item.label}
                </a>
              )
            })}
          </Reveal>
        </div>

        {/* Marquee */}
        <div className="border-y border-border bg-background py-5">
          <div
            className="flex whitespace-nowrap font-serif text-[clamp(28px,5vw,68px)] font-medium tracking-[-0.02em] text-foreground/30 animate-marquee"
            style={{ width: "max-content" }}
          >
            {Array.from({ length: 2 }).map((_, i) => (
              <span key={i} className="flex items-center">
                <span className="px-8">Product Thinking</span>
                <span className="px-8 text-primary">/</span>
                <span className="px-8 italic">AI Safety</span>
                <span className="px-8 text-primary">/</span>
                <span className="px-8">Learning Outcomes</span>
                <span className="px-8 text-primary">/</span>
                <span className="px-8 italic">Retention</span>
                <span className="px-8 text-primary">/</span>
                <span className="px-8">User Journeys</span>
                <span className="px-8 text-primary">/</span>
                <span className="px-8 italic">Evaluation</span>
                <span className="px-8 text-primary">/</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED CASE STUDY */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-32">
          <Reveal>
            <SectionLabel accent>Featured Case Study</SectionLabel>
          </Reveal>

          <Reveal delay={100}>
            <Link
              href="/case-study"
              className="hover-pop glass-surface group relative mt-12 grid gap-10 border border-border p-8 hover:border-primary md:grid-cols-12 md:gap-16 md:p-12 lg:p-16"
            >
              <HoverDot />

              <div className="md:col-span-7">
                <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
                  Language Learning and EdTech
                </p>
                <h2 className="mt-6 font-serif text-4xl font-medium leading-[1.05] tracking-tight text-foreground md:text-6xl">
                  Mistakes Review Feature
                  <br />
                  <span className="italic">for Airlearn</span>
                </h2>
                <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground">
                  A product case study on improving language-learning retention through
                  personalized mistake review, spaced repetition, and feedback loops.
                </p>
                <div className="mt-8 flex flex-wrap gap-2">
                  {["Problem framing", "User flow", "MVP scope", "Metrics", "A/B test"].map(
                    (tag) => (
                      <span
                        key={tag}
                        className="border border-border px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-muted-foreground transition-colors group-hover:border-primary/40 group-hover:text-foreground"
                      >
                        {tag}
                      </span>
                    ),
                  )}
                </div>
                <div className="mt-10 inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-foreground transition-colors group-hover:text-primary">
                  <span>View Case Study</span>
                  <span className="h-px w-10 bg-foreground transition-all duration-300 group-hover:w-16 group-hover:bg-primary" />
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-px border border-border bg-border md:col-span-5 md:self-stretch">
                {[
                  { k: "Role", v: "Product thinking & feature proposal" },
                  { k: "Domain", v: "Language learning and EdTech" },
                  { k: "Focus", v: "Retention & feedback loops" },
                  { k: "Output", v: "MVP scope, metrics, A/B hypothesis" },
                ].map((item) => (
                  <div key={item.k} className="flex flex-col justify-between bg-card p-5">
                    <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-muted-foreground">
                      {item.k}
                    </p>
                    <p className="mt-6 text-sm leading-snug text-foreground">{item.v}</p>
                  </div>
                ))}
              </div>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* BACKGROUND / PROOF */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-32">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <SectionLabel>Background</SectionLabel>
                <h2 className="mt-6 max-w-3xl font-serif text-4xl font-medium leading-[1.05] tracking-tight md:text-6xl">
                  Background that supports my{" "}
                  <span className="italic text-primary">product thinking</span>
                </h2>
                <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
                  Three experiences that ground how I evaluate AI products, learning quality, and
                  user value.
                </p>
              </div>
            </div>
          </Reveal>

          <div className="mt-16 grid gap-px border border-border bg-border md:grid-cols-3">
            {proofCards.map((card, index) => (
              <Reveal
                key={card.title}
                delay={index === 0 ? 100 : index === 1 ? 200 : 300}
                className="bg-background"
              >
                <div className="hover-pop glass-surface group relative flex h-full flex-col gap-8 border border-transparent p-8 hover:border-primary/40 md:p-10">
                  <HoverDot />
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-primary">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[10px] font-medium uppercase tracking-[0.24em] text-muted-foreground">
                      {card.tag}
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl font-medium leading-tight tracking-tight text-foreground md:text-3xl">
                    {card.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{card.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-10">
            <Link
              href="/work"
              className="group inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-foreground transition-colors hover:text-primary"
            >
              See supporting work
              <span className="h-px w-10 bg-foreground transition-all duration-300 group-hover:w-16 group-hover:bg-primary" />
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </Reveal>
        </div>
      </section>
    </main>
  )
}
