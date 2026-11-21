"use client"

import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react"
import { useRef, useState, type ReactNode } from "react"
import { cn } from "@/lib/utils"

type Habit = { title: string; detail: string; doodle: (active: boolean) => ReactNode }

function Draw({ d, active, delay = 0, accent }: { d: string; active: boolean; delay?: number; accent?: boolean }) {
  return (
    <motion.path
      d={d}
      fill="none"
      stroke="currentColor"
      strokeWidth={accent ? 2.2 : 1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={accent ? "text-primary" : "text-foreground/70"}
      initial={false}
      animate={{ pathLength: active ? 1 : 0, opacity: active ? 1 : 0 }}
      transition={{ duration: 1.1, delay: active ? delay : 0, ease: [0.65, 0, 0.35, 1] }}
    />
  )
}

const habits: Habit[] = [
  {
    title: "I turn ideas into shipped products",
    detail:
      "Emoline moved from problem framing and PRD to build, closed testing, and production launch on Google Play.",
    doodle: (a) => (
      <>
        <Draw active={a} d="M8 92 C 40 88, 60 60, 92 52 S 150 20, 172 14" />
        <Draw active={a} delay={0.7} accent d="M160 8 L180 12 L166 26 L164 18 Z" />
      </>
    ),
  },
  {
    title: "I think in user journeys",
    detail: "I look at how learners move through a flow and where small gaps break the experience.",
    doodle: (a) => (
      <>
        <Draw active={a} d="M10 70 C 40 20, 70 100, 100 55 S 150 30, 176 60" />
        <Draw active={a} delay={0.6} accent d="M10 70 m-4 0 a4 4 0 1 0 8 0 a4 4 0 1 0 -8 0" />
        <Draw active={a} delay={0.8} accent d="M100 55 m-4 0 a4 4 0 1 0 8 0 a4 4 0 1 0 -8 0" />
        <Draw active={a} delay={1} accent d="M176 60 m-4 0 a4 4 0 1 0 8 0 a4 4 0 1 0 -8 0" />
      </>
    ),
  },
  {
    title: "I own release readiness",
    detail:
      "At Airlearn, I coordinate raw content through design, voiceover, QA, and publishing across four cross-functional teams.",
    doodle: (a) => (
      <>
        {[0, 1, 2, 3].map((i) => (
          <g key={i}>
            <Draw active={a} delay={i * 0.15} d={`M${12 + i * 44} 40 h28 v28 h-28 z`} />
            <Draw active={a} delay={0.5 + i * 0.22} accent d={`M${18 + i * 44} 55 l6 6 l12 -13`} />
          </g>
        ))}
      </>
    ),
  },
  {
    title: "I think in metrics",
    detail: "I frame products around activation, D1/D7/D30 retention, engagement, and drop-off signals.",
    doodle: (a) => (
      <>
        <Draw active={a} d="M10 10 V 92 H 180" />
        <Draw active={a} delay={0.5} accent d="M14 80 L 50 66 L 84 72 L 120 44 L 150 50 L 176 22" />
      </>
    ),
  },
  {
    title: "I connect AI with user value",
    detail: "I focus on the user problem first, then use AI where it genuinely improves the experience.",
    doodle: (a) => (
      <>
        <Draw active={a} d="M30 78 m-14 0 a14 14 0 1 0 28 0 a14 14 0 1 0 -28 0 M30 64 V 50 M14 98 C 18 88, 42 88, 46 98" />
        <Draw active={a} delay={0.5} d="M60 70 C 90 70, 100 50, 130 50" />
        <Draw
          active={a}
          delay={0.9}
          accent
          d="M150 26 L 155 42 L 171 47 L 155 52 L 150 68 L 145 52 L 129 47 L 145 42 Z"
        />
      </>
    ),
  },
]

const tilts = [-2.2, 1.6, -1.1, 2, -1.6]

function Card({
  habit,
  index,
  total,
  progress,
  active,
}: {
  habit: Habit
  index: number
  total: number
  progress: MotionValue<number>
  active: boolean
}) {
  const last = index === total - 1
  const y = useTransform(progress, (p) => {
    const out = last ? 0 : Math.min(1, Math.max(0, p - index))
    const depth = Math.max(0, index - p)
    return `calc(${-out * 140}% + ${Math.min(depth, 3) * 16}px)`
  })
  const x = useTransform(progress, (p) => {
    const out = last ? 0 : Math.min(1, Math.max(0, p - index))
    return `${-out * 14}%`
  })
  const rotate = useTransform(progress, (p) => {
    const out = last ? 0 : Math.min(1, Math.max(0, p - index))
    const depth = Math.max(0, index - p)
    return tilts[index] * Math.min(1, depth) - out * 16
  })
  const scale = useTransform(progress, (p) => 1 - Math.min(Math.max(0, index - p), 3) * 0.045)
  const opacity = useTransform(progress, (p) => {
    const depth = index - p
    const out = last ? 0 : Math.min(1, Math.max(0, p - index))
    return Math.max(0, Math.min(1, 3.6 - depth)) * (1 - Math.max(0, out - 0.7) / 0.3)
  })

  return (
    <motion.article
      className="paper absolute inset-0 overflow-hidden rounded-[10px] p-7 shadow-[0_30px_60px_-30px_rgba(28,43,74,0.55),0_2px_0_var(--paper-edge)] ring-1 ring-black/5 md:p-10"
      style={{
        y,
        x,
        rotate,
        scale,
        opacity,
        zIndex: total - index,
        backgroundImage:
          "repeating-linear-gradient(180deg, transparent 0 35px, color-mix(in oklab, var(--primary) 14%, transparent) 35px 36px)",
        backgroundPositionY: "64px",
      }}
      aria-hidden={!active}
    >
      <span className="absolute inset-x-0 top-[62px] h-px bg-[color-mix(in_oklab,#d4553f_45%,transparent)]" aria-hidden />
      <h3 className="max-w-[18ch] font-serif text-[clamp(28px,3.4vw,44px)] italic leading-[1.05] tracking-[-0.01em]">
        {habit.title}
      </h3>
      <p className="mt-8 max-w-[34ch] text-[clamp(15px,1.25vw,17px)] leading-[36px] text-foreground/80">{habit.detail}</p>
      <svg viewBox="0 0 190 110" className="absolute bottom-6 right-6 w-[38%] max-w-[220px] md:bottom-8 md:right-8" aria-hidden>
        {habit.doodle(active)}
      </svg>
    </motion.article>
  )
}

export function CardStack() {
  const ref = useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] })
  const raw = useTransform(scrollYProgress, [0.04, 0.92], [0, habits.length - 1])
  const progress = useSpring(raw, { stiffness: 120, damping: 22, mass: 0.6 })
  const [top, setTop] = useState(0)
  useMotionValueEvent(progress, "change", (v) => {
    const next = Math.max(0, Math.min(habits.length - 1, Math.round(v)))
    setTop((t) => (t === next ? t : next))
  })

  return (
    <section id="how-i-work" aria-labelledby="how-heading" className="scroll-mt-0">
      {/* Animated stack */}
      <div ref={ref} className="relative motion-reduce:hidden" style={{ height: `calc(${habits.length} * 75svh + 100svh)` }}>
        <div className="sticky top-0 flex h-svh items-center overflow-hidden">
          <div className="mx-auto grid w-full max-w-[1100px] items-center gap-10 px-6 md:grid-cols-[1fr_1.25fr] md:gap-16 md:px-10">
            <div>
              <h2 id="how-heading" className="font-serif text-[clamp(36px,5vw,64px)] italic leading-[1.02] tracking-[-0.01em]">
                How I work
              </h2>
              <p className="mt-5 max-w-sm text-base leading-relaxed text-foreground/70 md:text-lg">
                Five habits I lean on, and the work they come from. Keep scrolling to deal the next card.
              </p>
              <div className="mt-8 flex items-center gap-1.5" aria-hidden>
                {habits.map((h, i) => (
                  <span
                    key={h.title}
                    className={cn(
                      "block h-1.5 rounded-full transition-all duration-500",
                      i === top ? "w-7 bg-foreground" : i < top ? "w-1.5 bg-foreground/50" : "w-1.5 bg-foreground/20",
                    )}
                  />
                ))}
              </div>
              <p className="sr-only" aria-live="polite">
                {habits[top].title}
              </p>
            </div>
            <div className="relative mx-auto aspect-[1.45] w-full max-w-[560px] max-md:aspect-[0.95]">
              {habits.map((h, i) => (
                <Card key={h.title} habit={h} index={i} total={habits.length} progress={progress} active={i === top} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Reduced motion: the same cards, laid flat */}
      <div className="mx-auto hidden max-w-[1100px] px-6 py-24 motion-reduce:block md:px-10">
        <h2 className="font-serif text-[clamp(36px,5vw,64px)] italic leading-[1.02]">How I work</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {habits.map((h) => (
            <article key={h.title} className="paper rounded-[10px] p-8 ring-1 ring-black/5">
              <h3 className="font-serif text-3xl italic leading-tight">{h.title}</h3>
              <p className="mt-4 leading-relaxed text-foreground/80">{h.detail}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
