"use client"

import { AnimatePresence, motion, useInView, useMotionValue, useSpring } from "motion/react"
import { useRef, useState, type ElementType, type PointerEvent } from "react"
import { ArrowUpRight, Check, Copy, Download, Mail } from "lucide-react"
import { LinkedinIcon, GithubIcon } from "@/components/brand-icons"
import { Sky } from "@/components/home/sky"
import { cn } from "@/lib/utils"

const EMAIL = "krishbabu2004@gmail.com"

const topics = [
  { label: "An APM role", subject: "APM role" },
  { label: "A Product Analyst role", subject: "Product Analyst role" },
  { label: "The Emoline case study", subject: "Emoline case study" },
  { label: "Just saying hi", subject: "Hello from your portfolio" },
]

const links: Array<{ label: string; value: string; href: string; icon: ElementType<{ className?: string }>; external?: boolean; download?: string }> = [
  { label: "LinkedIn", value: "m-krishna-krishna", href: "https://linkedin.com/in/m-krishna-krishna", icon: LinkedinIcon, external: true },
  { label: "GitHub", value: "Krishna2004M", href: "https://github.com/Krishna2004M", icon: GithubIcon, external: true },
  { label: "CV", value: "Download the PDF", href: "/M%20Krishna%20APM%20CV.pdf", icon: Download, download: "M Krishna APM CV.pdf" },
]

/** A tile that leans toward the pointer. */
function MagneticTile({ item, index }: { item: (typeof links)[number]; index: number }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 18 })
  const sy = useSpring(y, { stiffness: 220, damping: 18 })
  const Icon = item.icon

  const move = (e: PointerEvent<HTMLAnchorElement>) => {
    if (e.pointerType !== "mouse") return
    const r = e.currentTarget.getBoundingClientRect()
    x.set(((e.clientX - r.left) / r.width - 0.5) * 14)
    y.set(((e.clientY - r.top) / r.height - 0.5) * 10)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ delay: 0.1 + index * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
    <motion.a
      href={item.href}
      target={item.external ? "_blank" : undefined}
      rel={item.external ? "noreferrer" : undefined}
      download={item.download}
      onPointerMove={move}
      onPointerLeave={() => {
        x.set(0)
        y.set(0)
      }}
      style={{ x: sx, y: sy }}
      className="paper group relative flex items-center justify-between gap-4 rounded-2xl p-5 ring-1 ring-black/5 transition-shadow hover:shadow-[0_24px_40px_-24px_rgba(28,43,74,0.5)]"
    >
      <span className="flex min-w-0 items-center gap-4">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-foreground/5 text-foreground transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
          <Icon className="size-4" />
        </span>
        <span className="min-w-0">
          <span className="block text-sm text-foreground/60">{item.label}</span>
          <span className="block truncate text-base text-foreground">{item.value}</span>
        </span>
      </span>
      <span className="relative size-5 shrink-0 overflow-hidden text-foreground/60">
        <ArrowUpRight className="absolute inset-0 size-5 transition-transform duration-300 group-hover:-translate-y-5 group-hover:translate-x-5" />
        <ArrowUpRight className="absolute inset-0 size-5 -translate-x-5 translate-y-5 text-primary transition-transform duration-300 group-hover:translate-x-0 group-hover:translate-y-0" />
      </span>
    </motion.a>
    </motion.div>
  )
}

export function ContactPanel() {
  const headRef = useRef<HTMLHeadingElement | null>(null)
  const headIn = useInView(headRef, { once: true, amount: 0.6 })
  const [topic, setTopic] = useState(0)
  const [copied, setCopied] = useState(false)
  const t = topics[topic]
  const mailto = `mailto:${EMAIL}?subject=${encodeURIComponent(t.subject)}`

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2200)
    } catch {
      window.location.href = `mailto:${EMAIL}`
    }
  }

  return (
    <section id="contact" className="relative scroll-mt-0 overflow-hidden" aria-labelledby="contact-heading">
      <Sky seed={9} cover={0.55} drift={190} className="[mask-image:linear-gradient(to_bottom,transparent,black_25%,black_80%,transparent)]" />
      <div className="relative mx-auto grid max-w-[1100px] gap-14 px-6 py-32 md:grid-cols-[1.1fr_1fr] md:items-center md:px-10 md:py-40">
        <div>
          <h2 ref={headRef} id="contact-heading" className="font-serif text-[clamp(52px,8vw,112px)] italic leading-[0.95] tracking-[-0.02em]">
            <motion.span
              className="relative inline-block"
              initial={{ opacity: 0, y: 30 }}
              animate={headIn ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              Let&apos;s talk.
              <svg className="absolute -bottom-3 left-0 w-full text-primary" viewBox="0 0 300 14" preserveAspectRatio="none" aria-hidden>
                <motion.path
                  d="M2 9 C 60 2, 120 13, 180 6 S 270 4, 298 8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={headIn ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
                  transition={{ duration: 1, delay: 0.5, ease: [0.65, 0, 0.35, 1] }}
                />
              </svg>
            </motion.span>
          </h2>
          <p className="mt-10 max-w-md text-lg leading-relaxed text-foreground/75">
            I&apos;m looking for Associate Product Manager and Product Analyst opportunities, especially across AI
            products, HR tech, B2B SaaS, and learning tech. Happy to walk through the Emoline case study.
          </p>
        </div>

        <div className="paper rounded-3xl p-6 shadow-[0_40px_80px_-40px_rgba(28,43,74,0.55)] ring-1 ring-black/5 md:p-8">
          <p className="text-base text-foreground/70">What would you like to talk about?</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {topics.map((tp, i) => (
              <button
                key={tp.label}
                type="button"
                onClick={() => setTopic(i)}
                aria-pressed={topic === i}
                className={cn(
                  "relative rounded-full border px-4 py-2 text-sm transition-colors",
                  topic === i ? "border-transparent text-background" : "border-foreground/15 text-foreground/75 hover:border-foreground/40",
                )}
              >
                {topic === i && (
                  <motion.span
                    layoutId="topic-pill"
                    className="absolute inset-0 rounded-full bg-foreground"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative">{tp.label}</span>
              </button>
            ))}
          </div>

          <a
            href={mailto}
            className="group mt-6 flex items-center justify-between gap-3 rounded-2xl bg-primary px-5 py-4 text-primary-foreground transition-transform duration-300 hover:-translate-y-0.5"
          >
            <span className="flex items-center gap-3">
              <Mail className="size-4" />
              <span className="relative block h-6 overflow-hidden">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={topic}
                    className="block whitespace-nowrap"
                    initial={{ y: 24, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -24, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  >
                    Email me about {t.label.charAt(0).toLowerCase() + t.label.slice(1)}
                  </motion.span>
                </AnimatePresence>
              </span>
            </span>
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>

          <button
            type="button"
            onClick={copy}
            className="mt-3 flex w-full items-center justify-between rounded-2xl border border-foreground/15 px-5 py-3.5 text-sm transition-colors hover:border-foreground/40"
          >
            <span className="truncate text-foreground/80">{EMAIL}</span>
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={copied ? "done" : "copy"}
                className="inline-flex items-center gap-1.5 text-foreground/70"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                {copied ? <Check className="size-4 text-primary" /> : <Copy className="size-4" />}
                {copied ? "Copied" : "Copy"}
              </motion.span>
            </AnimatePresence>
          </button>

          <div className="mt-6 grid gap-3">
            {links.map((item, i) => (
              <MagneticTile key={item.label} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
