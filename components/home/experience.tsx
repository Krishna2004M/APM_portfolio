"use client"

import { AnimatePresence, motion } from "motion/react"
import Link from "next/link"
import { useState } from "react"
import { Plus } from "lucide-react"
import { cn } from "@/lib/utils"

const rows = [
  {
    place: "Airlearn, Unacademy Group",
    role: "Product Operations Associate",
    detail:
      "End-to-end lesson production and release ownership across Educator, Design, Creation and Technical teams: raw content through design, voiceover, QA and publishing.",
    href: "/about",
  },
  {
    place: "Emoline",
    role: "Built and launched",
    detail:
      "A consumer journaling app taken from problem framing and PRD through a 15-day closed test with 12 testers to a production launch on Google Play.",
    href: "/case-study",
  },
  {
    place: "Google Adversarial Nibbler",
    role: "AI red-teaming, Jan 2025",
    detail:
      "Designed adversarial prompts and evaluated text-to-image model outputs for safety, bias and harmful-output patterns. One of about 150 participants selected from 7,000+ applicants.",
    href: "/work",
  },
  {
    place: "Research",
    role: "NLP paper and a provisional patent",
    detail:
      "Published and presented work on code-mixing and code-switching detection (Dec 2024), and filed a provisional patent for a brain tumour detection and clinical report generator (Nov 2025).",
    href: "/work",
  },
]

export function Experience() {
  const [open, setOpen] = useState(0)

  return (
    <section className="px-6 py-28 md:py-40" aria-labelledby="experience-heading">
      <div className="mx-auto max-w-[56rem]">
        <h2 id="experience-heading" className="font-serif text-[clamp(34px,4.6vw,56px)] italic leading-tight tracking-[-0.01em]">
          Where I&apos;ve practised
        </h2>
        <ul className="mt-12 border-t border-foreground/15">
          {rows.map((row, i) => {
            const isOpen = open === i
            return (
              <li key={row.place} className="border-b border-foreground/15" onMouseEnter={() => setOpen(i)}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className="group flex w-full items-baseline gap-4 py-6 text-left md:py-7"
                >
                  <span className="flex-1">
                    <span
                      className={cn(
                        "block font-serif text-[clamp(22px,2.6vw,32px)] leading-tight transition-colors duration-300",
                        isOpen ? "text-foreground" : "text-foreground/55 group-hover:text-foreground",
                      )}
                    >
                      {row.place}
                    </span>
                  </span>
                  <span className="hidden text-sm text-foreground/60 sm:block">{row.role}</span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="self-center text-foreground/60"
                  >
                    <Plus className="size-5" />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="flex flex-col gap-4 pb-8 sm:flex-row sm:items-end sm:justify-between">
                        <p className="max-w-[38rem] text-base leading-relaxed text-foreground/75">
                          <span className="mb-1 block text-sm text-foreground/60 sm:hidden">{row.role}</span>
                          {row.detail}
                        </p>
                        <Link
                          href={row.href}
                          className="shrink-0 text-sm font-medium text-primary underline-offset-4 hover:underline"
                        >
                          More detail
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
