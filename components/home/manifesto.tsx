"use client"

import { motion, useScroll, useTransform, type MotionValue } from "motion/react"
import { useRef } from "react"

const lines = [
  "Most products don't fail at launch.",
  "They fail quietly, one skipped step at a time.",
  "Someone opens the app, hesitates, and leaves.",
  "Nobody files a ticket for that.",
  "So I start with the moment before the drop-off.",
  "I write the PRD after I understand the person.",
  "I ship the smallest thing that can answer the question.",
  "Then I watch what people actually do.",
  "Retention tells me where to look.",
  "Users tell me why.",
]

function Line({
  text,
  index,
  total,
  progress,
}: {
  text: string
  index: number
  total: number
  progress: MotionValue<number>
}) {
  const start = index / total
  const end = (index + 1) / total
  const opacity = useTransform(progress, [start, end], [0.16, 1])
  const x = useTransform(progress, [start, end], [-8, 0])
  return (
    <motion.p style={{ opacity, x }} className="leading-[1.55]">
      {text}
    </motion.p>
  )
}

export function Manifesto() {
  const ref = useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.45"] })
  const closingOpacity = useTransform(scrollYProgress, [0.92, 1], [0.16, 1])
  const rule = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section id="manifesto" className="relative px-6 py-28 md:py-40" aria-labelledby="manifesto-heading">
      <div className="mx-auto max-w-[40rem]">
        <h2
          id="manifesto-heading"
          className="text-center font-serif text-[clamp(34px,4.6vw,56px)] italic leading-tight tracking-[-0.01em] text-foreground"
        >
          How I think about products.
        </h2>

        <div ref={ref} className="relative mt-14 pl-6 text-[clamp(18px,1.6vw,21px)] text-foreground md:mt-20">
          <div className="absolute left-0 top-1 h-[calc(100%-0.5rem)] w-px bg-foreground/10" aria-hidden>
            <motion.div className="h-full w-full origin-top bg-primary" style={{ scaleY: rule }} />
          </div>
          {lines.map((line, i) => (
            <Line key={line} text={line} index={i} total={lines.length + 1} progress={scrollYProgress} />
          ))}
          <motion.p style={{ opacity: closingOpacity }} className="mt-6 font-serif text-[1.35em] italic">
            Build less. Notice more.
          </motion.p>
        </div>
      </div>
    </section>
  )
}
