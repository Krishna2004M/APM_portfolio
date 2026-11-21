"use client"

import { AnimatePresence, motion } from "motion/react"
import { useState } from "react"
import { Check, Copy, Download } from "lucide-react"
import { LinkedinIcon, GithubIcon } from "@/components/brand-icons"
import { Sky } from "@/components/home/sky"

const EMAIL = "krishbabu2004@gmail.com"

export function Contact() {
  const [copied, setCopied] = useState(false)

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
    <section className="relative overflow-hidden" aria-labelledby="contact-heading">
      <Sky seed={3} cover={0.6} drift={180} className="[mask-image:linear-gradient(to_bottom,transparent,black_30%,black_70%,transparent)]" />
      <div className="relative mx-auto flex min-h-[85svh] max-w-3xl flex-col items-center justify-center px-6 py-32 text-center">
        <h2
          id="contact-heading"
          className="text-balance font-serif text-[clamp(40px,6.4vw,84px)] italic leading-[1.02] tracking-[-0.02em]"
        >
          Let&apos;s build something people come back to.
        </h2>
        <p className="mt-6 max-w-md text-base leading-relaxed text-foreground/75 sm:text-lg">
          I&apos;m open to APM, Product Analyst and AI PM roles. The fastest way to reach me is email.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={copy}
            className="relative inline-flex min-w-[15rem] items-center justify-center gap-2 overflow-hidden rounded-full bg-foreground px-6 py-3.5 text-sm font-medium text-background transition-transform duration-300 hover:-translate-y-0.5"
          >
            <AnimatePresence mode="wait" initial={false}>
              {copied ? (
                <motion.span
                  key="done"
                  className="inline-flex items-center gap-2"
                  initial={{ y: 16, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -16, opacity: 0 }}
                >
                  <Check className="size-4" /> Email copied
                </motion.span>
              ) : (
                <motion.span
                  key="copy"
                  className="inline-flex items-center gap-2"
                  initial={{ y: 16, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -16, opacity: 0 }}
                >
                  <Copy className="size-4" /> Copy {EMAIL}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
          <a
            href="/M%20Krishna%20APM%20CV.pdf"
            download="M Krishna APM CV.pdf"
            className="inline-flex items-center gap-2 rounded-full border border-foreground/25 bg-[var(--paper)]/60 px-6 py-3.5 text-sm font-medium backdrop-blur-md transition-colors hover:border-foreground/60"
          >
            <Download className="size-4" /> Download CV
          </a>
        </div>
        <div className="mt-6 flex items-center gap-6 text-sm text-foreground/70">
          <a href="https://linkedin.com/in/m-krishna-krishna" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-foreground">
            <LinkedinIcon className="size-4" /> LinkedIn
          </a>
          <a href="https://github.com/Krishna2004M" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-foreground">
            <GithubIcon className="size-4" /> GitHub
          </a>
        </div>
      </div>
    </section>
  )
}
