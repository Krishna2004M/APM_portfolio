"use client"

import { motion, useScroll, useTransform } from "motion/react"
import { useRef } from "react"
import { Download } from "lucide-react"
import { Sky } from "@/components/home/sky"
import { smoothScrollTo } from "@/components/smooth-scroll"

const headline = ["What", "I", "bring,", "and", "how", "to", "reach", "me."]

const jumps = [
  { label: "How I work", target: "#how-i-work" },
  { label: "Skills", target: "#skills" },
  { label: "Contact", target: "#contact" },
]

export function AboutHero() {
  const ref = useRef<HTMLElement | null>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "28%"])
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const skyScale = useTransform(scrollYProgress, [0, 1], [1, 1.15])

  return (
    <section ref={ref} className="relative flex min-h-[92svh] items-center overflow-hidden" aria-labelledby="about-heading">
      <motion.div className="absolute inset-0" style={{ scale: skyScale }}>
        <Sky seed={17} cover={0.5} drift={160} className="[mask-image:linear-gradient(to_bottom,black_70%,transparent)]" />
      </motion.div>

      <motion.div className="relative mx-auto w-full max-w-[1100px] px-6 pb-20 pt-36 md:px-10" style={{ y, opacity: fade }}>
        <motion.p
          className="text-base text-foreground/70"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          Skills and contact
        </motion.p>
        <h1
          id="about-heading"
          className="mt-5 max-w-4xl font-serif text-[clamp(48px,8.4vw,120px)] font-normal italic leading-[0.98] tracking-[-0.02em]"
        >
          {headline.map((word, i) => (
            <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
              <motion.span
                className="inline-block"
                initial={{ y: "105%", opacity: 0, filter: "blur(8px)" }}
                animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.9, delay: 0.15 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              >
                {word}
              </motion.span>
              {i < headline.length - 1 && " "}
            </span>
          ))}
        </h1>
        <motion.p
          className="mt-8 max-w-xl text-pretty text-lg leading-relaxed text-foreground/75"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          I&apos;m early in my product career, but I&apos;ve already owned release workflows, written product
          requirements, and shipped a consumer app to Google Play.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-wrap items-center gap-2"
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.08, delayChildren: 1 } } }}
        >
          {jumps.map((j) => (
            <motion.button
              key={j.target}
              type="button"
              onClick={() => smoothScrollTo(j.target)}
              variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="rounded-full border border-foreground/20 bg-[var(--paper)]/55 px-5 py-2.5 text-sm text-foreground backdrop-blur-md transition-colors hover:border-foreground/60"
            >
              {j.label}
            </motion.button>
          ))}
          <motion.a
            href="/M%20Krishna%20APM%20CV.pdf"
            download="M Krishna APM CV.pdf"
            variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="ml-1 inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background"
          >
            <Download className="size-4" />
            Download CV
          </motion.a>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute inset-x-0 bottom-8 flex flex-col items-center gap-2 text-xs text-foreground/70"
        style={{ opacity: fade }}
        aria-hidden
      >
        <span>Scroll</span>
        <span className="relative block h-8 w-px overflow-hidden bg-foreground/15">
          <span className="cue-drop absolute inset-x-0 top-0 h-3 bg-foreground/70" />
        </span>
      </motion.div>
    </section>
  )
}
