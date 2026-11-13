"use client"

import Link from "next/link"
import { useState } from "react"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"

const projects = [
  {
    eyebrow: "Shipped consumer product",
    title: "Emoline Journaling App",
    description:
      "A lightweight daily journaling loop, taken from problem framing and PRD through closed testing and Google Play launch.",
    tags: ["Product strategy", "MVP", "Launch", "Retention"],
    href: "/case-study",
    detail: "01 / 04",
    image: true,
  },
  {
    eyebrow: "Learning experience design",
    title: "SuperKalam Reattempt",
    description:
      "A feedback-to-practice loop that helps UPSC aspirants act on AI evaluation, retry answers, and compare progress.",
    tags: ["Discovery", "Learner feedback", "AI evaluation", "Practice loop"],
    href: "/work#superkalam",
    detail: "02 / 04",
  },
  {
    eyebrow: "Recruitment workflow design",
    title: "TalentXO Leads Management",
    description:
      "A controlled candidate-lead workflow balancing recruiter ownership, timely follow-up, candidate consent, and traceable outcomes.",
    tags: ["PRD", "Workflow", "Business rules", "Prototype"],
    href: "/work#talentxo",
    detail: "03 / 04",
  },
  {
    eyebrow: "OAuth integration readiness",
    title: "Clearance",
    description:
      "A research-led product that makes OAuth approval effort, provider wait time, evidence, and human handoffs easier to understand.",
    tags: ["Integrations", "AI research", "Evidence", "Prototype"],
    href: "/work#clearance",
    detail: "04 / 04",
  },
]

export function FeaturedProjectCarousel() {
  const [active, setActive] = useState(0)
  const project = projects[active]

  const change = (direction: number) => {
    setActive((current) => (current + direction + projects.length) % projects.length)
  }

  return (
    <div className="mt-10">
      <div className="grid gap-8 border border-border bg-card p-6 sm:p-8 md:grid-cols-12 md:gap-12 md:p-12">
        <Link
          href={project.href}
          aria-label={`View ${project.title}`}
          className="group flex min-h-[300px] flex-col justify-between md:col-span-7 md:min-h-[420px]"
        >
          <div>
            <div className="flex items-center justify-between gap-4">
              <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-primary">
                {project.eyebrow}
              </p>
              <span className="font-mono text-xs text-muted-foreground">{project.detail}</span>
            </div>
            <h2 className="mt-12 max-w-2xl text-balance font-serif text-4xl font-medium leading-[1.03] text-foreground sm:text-5xl md:text-6xl">
              {project.title}
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              {project.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span key={tag} className="border border-border px-3 py-1.5 text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <span className="mt-10 inline-flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.2em] text-foreground group-hover:text-primary">
            Explore project <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </span>
        </Link>

        <div className="flex min-h-[280px] flex-col justify-between border-t border-border pt-6 md:col-span-5 md:min-h-0 md:border-l md:border-t-0 md:pl-8 md:pt-0">
          <div className="flex flex-1 items-center justify-center bg-secondary/40 p-6">
            {project.image ? (
              <img src="/emoline/app-logo.png" alt="Emoline app logo" className="h-auto w-full max-w-[260px]" />
            ) : (
              <div className="max-w-sm">
                <p className="font-mono text-xs uppercase tracking-[0.22em] text-primary">Product decision</p>
                <p className="mt-5 font-serif text-3xl leading-tight text-foreground sm:text-4xl">
                  {active === 1 && "Turn feedback into another attempt."}
                  {active === 2 && "One accountable owner per opportunity."}
                  {active === 3 && "Make every approval step legible."}
                </p>
              </div>
            )}
          </div>
          <div className="mt-5 flex items-center justify-between">
            <div className="flex gap-2" aria-label="Choose featured project">
              {projects.map((item, index) => (
                <button
                  key={item.title}
                  type="button"
                  onClick={() => setActive(index)}
                  aria-label={`Show ${item.title}`}
                  aria-current={index === active ? "true" : undefined}
                  className={`h-1.5 w-8 transition-colors ${index === active ? "bg-primary" : "bg-border hover:bg-muted-foreground"}`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={() => change(-1)} aria-label="Previous project" title="Previous project" className="inline-flex size-10 items-center justify-center border border-border text-foreground hover:border-primary hover:text-primary">
                <ChevronLeft className="size-4" />
              </button>
              <button type="button" onClick={() => change(1)} aria-label="Next project" title="Next project" className="inline-flex size-10 items-center justify-center border border-border text-foreground hover:border-primary hover:text-primary">
                <ChevronRight className="size-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
