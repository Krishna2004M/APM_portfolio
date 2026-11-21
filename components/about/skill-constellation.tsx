"use client"

import { AnimatePresence, motion, useInView, useMotionValue, useSpring, useTransform } from "motion/react"
import { useEffect, useMemo, useRef, useState } from "react"
import { cn } from "@/lib/utils"

const categories = [
  {
    label: "Product",
    hub: { x: 260, y: 205 },
    skills: [
      "Product Thinking",
      "MVP Scoping",
      "Product Requirements",
      "Cross-Functional Collaboration",
      "User Journey Mapping",
      "UX Review",
      "Feature Prioritization",
      "Product Documentation",
      "QA Testing",
    ],
  },
  {
    label: "AI Product",
    hub: { x: 840, y: 195 },
    skills: ["GenAI", "LLMs", "Prompt Evaluation", "AI Safety & Red-Teaming", "Model-Output Evaluation", "AI Workflow Automation"],
  },
  {
    label: "Analytics",
    hub: { x: 270, y: 505 },
    skills: ["SQL", "Excel", "Google Sheets", "Funnel Analysis", "Retention", "Engagement & Drop-off Analysis"],
  },
  {
    label: "Tools",
    hub: { x: 830, y: 500 },
    skills: ["Figma", "Streamlit", "GitHub", "OpenAI API", "Hugging Face", "Ollama", "React Native", "Supabase"],
  },
]

const CENTER = { x: 550, y: 350 }

type Node = { label: string; x: number; y: number; anchor: "start" | "end" | "middle"; lx: number; ly: number; delay: number }

function layout() {
  return categories.map((cat, ci) => {
    const n = cat.skills.length
    // Fan the skills around the side of the hub that faces away from the centre.
    const away = Math.atan2(cat.hub.y - CENTER.y, cat.hub.x - CENTER.x)
    const spread = Math.PI * 1.45
    const nodes: Node[] = cat.skills.map((label, i) => {
      const a = away - spread / 2 + (spread * (i + 0.5)) / n
      const rx = 168
      const ry = 122
      const x = cat.hub.x + Math.cos(a) * rx
      const y = cat.hub.y + Math.sin(a) * ry
      const c = Math.cos(a)
      const anchor = c > 0.25 ? "start" : c < -0.25 ? "end" : "middle"
      const lx = x + (anchor === "start" ? 10 : anchor === "end" ? -10 : 0)
      const ly = y + (anchor === "middle" ? (Math.sin(a) > 0 ? 20 : -12) : 4)
      return { label, x, y, anchor, lx, ly, delay: 0.9 + ci * 0.15 + i * 0.05 }
    })
    return { ...cat, nodes }
  })
}

export function SkillConstellation() {
  const graph = useMemo(layout, [])
  const ref = useRef<HTMLDivElement | null>(null)
  const inView = useInView(ref, { once: true, amount: 0.35 })
  const [active, setActive] = useState(0)
  const [hoverSkill, setHoverSkill] = useState<string | null>(null)
  const [touched, setTouched] = useState(false)

  // Cycle through the categories on its own until someone interacts.
  useEffect(() => {
    if (touched || !inView) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const id = window.setInterval(() => setActive((a) => (a + 1) % categories.length), 3200)
    return () => window.clearInterval(id)
  }, [touched, inView])

  // Gentle parallax that follows the pointer.
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const sx = useSpring(px, { stiffness: 60, damping: 18 })
  const sy = useSpring(py, { stiffness: 60, damping: 18 })
  const tx = useTransform(sx, (v) => v * -14)
  const ty = useTransform(sy, (v) => v * -10)

  const pick = (i: number) => {
    setTouched(true)
    setActive(i)
  }

  return (
    <section id="skills" className="relative flex min-h-svh scroll-mt-0 flex-col justify-center px-6 py-24 md:py-20" aria-labelledby="skills-heading">
      <div className="mx-auto w-full max-w-[1100px]">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <h2 id="skills-heading" className="font-serif text-[clamp(36px,5vw,64px)] italic leading-[1.02] tracking-[-0.01em]">
              What I work with
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-foreground/70 md:text-lg">
              Everything connects back to the product. Pick an area to light up its skills.
            </p>
          </div>
          <div className="no-scrollbar flex max-w-full gap-1 overflow-x-auto rounded-full border border-foreground/15 bg-[var(--paper)]/70 p-1 backdrop-blur-md" role="tablist" aria-label="Skill areas">
            {categories.map((c, i) => (
              <button
                key={c.label}
                type="button"
                role="tab"
                aria-selected={active === i}
                onClick={() => pick(i)}
                onMouseEnter={() => pick(i)}
                className={cn(
                  "relative shrink-0 whitespace-nowrap rounded-full px-3 py-2 text-sm transition-colors sm:px-4",
                  active === i ? "text-background" : "text-foreground/70 hover:text-foreground",
                )}
              >
                {active === i && (
                  <motion.span
                    layoutId="skill-pill"
                    className="absolute inset-0 rounded-full bg-foreground"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative">{c.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Constellation (tablet and up) */}
        <div
          ref={ref}
          className="relative mt-10 hidden md:block"
          onPointerMove={(e) => {
            const r = e.currentTarget.getBoundingClientRect()
            px.set((e.clientX - r.left) / r.width - 0.5)
            py.set((e.clientY - r.top) / r.height - 0.5)
          }}
          onPointerLeave={() => {
            px.set(0)
            py.set(0)
          }}
        >
          <motion.svg viewBox="0 30 1100 650" className="mx-auto max-h-[calc(100svh-230px)] min-h-[420px] w-full overflow-visible" style={{ x: tx, y: ty }} role="img" aria-label="Map of skills grouped into Product, AI Product, Analytics and Tools">
            {/* centre to hubs */}
            {graph.map((cat, ci) => (
              <motion.line
                key={`c-${cat.label}`}
                x1={CENTER.x}
                y1={CENTER.y}
                x2={cat.hub.x}
                y2={cat.hub.y}
                stroke="currentColor"
                className={active === ci ? "text-primary" : "text-foreground/25"}
                strokeWidth={active === ci ? 1.8 : 1.2}
                strokeDasharray="4 6"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: inView ? 1 : 0 }}
                transition={{ duration: 0.9, delay: 0.3 + ci * 0.1, ease: [0.65, 0, 0.35, 1] }}
                style={{ transition: "color 400ms, stroke-width 400ms" }}
              />
            ))}

            {graph.map((cat, ci) => {
              const on = active === ci
              return (
                <g key={cat.label} style={{ opacity: on ? 1 : 0.42, transition: "opacity 500ms" }}>
                  {cat.nodes.map((n) => (
                    <motion.line
                      key={`l-${n.label}`}
                      x1={cat.hub.x}
                      y1={cat.hub.y}
                      x2={n.x}
                      y2={n.y}
                      stroke="currentColor"
                      className={on ? "text-primary" : "text-foreground/40"}
                      strokeWidth={on ? 1.4 : 1}
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: inView ? 1 : 0 }}
                      transition={{ duration: 0.7, delay: n.delay, ease: [0.65, 0, 0.35, 1] }}
                    />
                  ))}
                  {on && (
                    <g aria-hidden>
                      {cat.nodes.map((n) => (
                        <line
                          key={`flow-${n.label}`}
                          x1={cat.hub.x}
                          y1={cat.hub.y}
                          x2={n.x}
                          y2={n.y}
                          stroke="var(--primary)"
                          strokeWidth="2.4"
                          strokeLinecap="round"
                          strokeDasharray="2 22"
                          className="skill-flow"
                        />
                      ))}
                    </g>
                  )}
                  {cat.nodes.map((n, ni) => {
                    const hot = hoverSkill === n.label
                    return (
                      <motion.g
                        key={n.label}
                        initial={{ opacity: 0, scale: 0.4 }}
                        animate={{ opacity: inView ? 1 : 0, scale: inView ? 1 : 0.4 }}
                        transition={{ delay: n.delay + 0.35, type: "spring", stiffness: 260, damping: 18 }}
                        style={{ transformOrigin: `${n.x}px ${n.y}px` }}
                        onMouseEnter={() => setHoverSkill(n.label)}
                        onMouseLeave={() => setHoverSkill(null)}
                      >
                        <g className="node-float" style={{ animationDelay: `${(ni * 0.37) % 3}s`, animationDuration: `${5 + (ni % 4)}s` }}>
                          <circle
                            cx={n.x}
                            cy={n.y}
                            r={hot ? 7 : on ? 5 : 4}
                            className={on ? "fill-primary" : "fill-foreground/60"}
                            style={{ transition: "r 250ms" }}
                          />
                          <circle cx={n.x} cy={n.y} r={14} fill="transparent" />
                          <text
                            x={n.lx}
                            y={n.ly}
                            textAnchor={n.anchor}
                            className={cn(
                              "fill-foreground text-[13.5px] transition-[font-weight] duration-200",
                              hot && "font-semibold",
                            )}
                            style={{ fontFamily: "var(--font-sans)" }}
                          >
                            {n.label}
                          </text>
                        </g>
                      </motion.g>
                    )
                  })}
                  {/* hub */}
                  <motion.g
                    initial={{ opacity: 0, scale: 0.3 }}
                    animate={{ opacity: inView ? 1 : 0, scale: inView ? 1 : 0.3 }}
                    transition={{ delay: 0.7 + ci * 0.12, type: "spring", stiffness: 220, damping: 16 }}
                    style={{ transformOrigin: `${cat.hub.x}px ${cat.hub.y}px`, cursor: "pointer" }}
                    onClick={() => pick(ci)}
                    onMouseEnter={() => pick(ci)}
                    data-cursor={cat.label}
                  >
                    {on && <circle cx={cat.hub.x} cy={cat.hub.y} r={56} className="hub-pulse fill-primary/15" />}
                    <circle
                      cx={cat.hub.x}
                      cy={cat.hub.y}
                      r={46}
                      className={on ? "fill-foreground" : "fill-[var(--paper)] stroke-foreground/35"}
                      strokeWidth={1.2}
                      style={{ transition: "fill 400ms" }}
                    />
                    <text
                      x={cat.hub.x}
                      y={cat.hub.y + 6}
                      textAnchor="middle"
                      className={cn("font-serif text-[19px] italic", on ? "fill-background" : "fill-foreground")}
                      style={{ fontFamily: "var(--font-serif)", transition: "fill 400ms" }}
                    >
                      {cat.label}
                    </text>
                  </motion.g>
                </g>
              )
            })}

            {/* centre: me */}
            <motion.g
              initial={{ opacity: 0, scale: 0.2 }}
              animate={{ opacity: inView ? 1 : 0, scale: inView ? 1 : 0.2 }}
              transition={{ type: "spring", stiffness: 200, damping: 14 }}
              style={{ transformOrigin: `${CENTER.x}px ${CENTER.y}px` }}
            >
              <circle cx={CENTER.x} cy={CENTER.y} r={44} className="hub-pulse fill-primary/10" />
              <circle cx={CENTER.x} cy={CENTER.y} r={34} className="fill-primary" />
              <text
                x={CENTER.x}
                y={CENTER.y + 7}
                textAnchor="middle"
                className="fill-primary-foreground font-serif text-[20px] italic"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                MK
              </text>
            </motion.g>
          </motion.svg>
        </div>

        {/* Phones: tap an area, skills deal in as chips */}
        <div className="mt-8 md:hidden">
          <AnimatePresence mode="wait">
            <motion.ul
              key={active}
              className="flex flex-wrap gap-2"
              initial="hidden"
              animate="show"
              exit="hidden"
              variants={{ show: { transition: { staggerChildren: 0.04 } }, hidden: {} }}
            >
              {categories[active].skills.map((s) => (
                <motion.li
                  key={s}
                  variants={{ hidden: { opacity: 0, y: 12, scale: 0.9 }, show: { opacity: 1, y: 0, scale: 1 } }}
                  className="rounded-full border border-foreground/15 bg-[var(--paper)] px-3.5 py-2 text-sm"
                >
                  {s}
                </motion.li>
              ))}
            </motion.ul>
          </AnimatePresence>
        </div>

        {/* Plain list for screen readers */}
        <div className="sr-only">
          {categories.map((c) => (
            <div key={c.label}>
              <h3>{c.label}</h3>
              <ul>
                {c.skills.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
