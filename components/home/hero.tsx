"use client"

import Link from "next/link"
import { motion, useScroll, useTransform } from "motion/react"
import { useRef } from "react"
import { Download } from "lucide-react"
import { Sky } from "@/components/home/sky"
import { DotWordmark } from "@/components/home/dot-wordmark"
import { smoothScrollTo } from "@/components/smooth-scroll"

function PaperPlane({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 40" className={className} aria-hidden>
      <path d="M2 20 L62 2 L30 38 L26 24 Z" fill="var(--paper)" stroke="var(--foreground)" strokeOpacity=".55" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M26 24 L62 2" stroke="var(--foreground)" strokeOpacity=".45" strokeWidth="1" />
      <path d="M26 24 L22 33 L30 38" fill="var(--cloud-shadow)" stroke="var(--foreground)" strokeOpacity=".4" strokeWidth="1" strokeLinejoin="round" />
    </svg>
  )
}

export function Hero() {
  const ref = useRef<HTMLElement | null>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] })

  // Stage 1: the dotted name. Stage 2: the headline.
  const scatter = useTransform(scrollYProgress, [0.04, 0.42], [0, 1])
  const nameOpacity = useTransform(scrollYProgress, [0.1, 0.4], [1, 0])
  const nameY = useTransform(scrollYProgress, [0, 0.42], ["0%", "-18%"])
  const introOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0])
  const headOpacity = useTransform(scrollYProgress, [0.3, 0.52], [0, 1])
  const headY = useTransform(scrollYProgress, [0.3, 0.56], [60, 0])
  const headBlur = useTransform(scrollYProgress, [0.3, 0.52], ["blur(10px)", "blur(0px)"])
  const skyScale = useTransform(scrollYProgress, [0, 1], [1, 1.12])
  const planeX = useTransform(scrollYProgress, [0, 1], ["0vw", "62vw"])
  const planeY = useTransform(scrollYProgress, [0, 1], ["0vh", "-26vh"])
  const headPointer = useTransform(scrollYProgress, (v) => (v > 0.4 ? "auto" : "none"))
  const cueOpacity = useTransform(scrollYProgress, [0, 0.08, 0.6, 0.75], [1, 0.4, 0.4, 0])

  return (
    <section ref={ref} className="relative h-[230svh]" aria-labelledby="hero-heading">
      <div className="sticky top-0 h-svh overflow-hidden">
        <motion.div className="absolute inset-0" style={{ scale: skyScale }}>
          <Sky seed={11} cover={0.55} />
        </motion.div>

        {/* Paper plane drifting through the sky */}
        <motion.div className="pointer-events-none absolute left-[8%] top-[22%] z-10 w-14 sm:w-20" style={{ x: planeX, y: planeY }}>
          <div className="plane-bob">
            <PaperPlane className="w-full drop-shadow-[0_10px_14px_rgba(40,70,120,0.18)]" />
          </div>
        </motion.div>

        {/* Stage 1: the name in dots */}
        <motion.div className="absolute inset-0 z-10" style={{ opacity: nameOpacity, y: nameY }}>
          <DotWordmark
            text="M KRISHNA"
            label="M Krishna"
            scatter={scatter}
            className="h-full w-full touch-pan-y"
          />
        </motion.div>
        <motion.p
          className="absolute inset-x-0 top-[calc(50%+max(64px,min(12vw,140px)))] z-10 px-6 text-center text-base text-foreground/75 sm:text-lg"
          style={{ opacity: introOpacity }}
        >
          Aspiring product manager, product notebook below.
          <span className="hidden [@media(hover:hover)]:inline"> Try moving your cursor through the name.</span>
        </motion.p>

        {/* Stage 2: the headline */}
        <motion.div
          className="absolute inset-0 z-20 flex items-center justify-center px-6"
          style={{ opacity: headOpacity, y: headY, filter: headBlur, pointerEvents: headPointer }}
        >
          <div className="max-w-3xl text-center">
            <h1
              id="hero-heading"
              className="text-balance font-serif text-[clamp(44px,7.4vw,104px)] font-normal italic leading-[0.98] tracking-[-0.02em] text-foreground"
            >
              Good products start with paying attention.
            </h1>
            <p className="mx-auto mt-7 max-w-xl text-pretty text-base leading-relaxed text-foreground/80 sm:text-lg">
              I&apos;m Krishna. I work in product operations at Airlearn (Unacademy Group), and I took
              Emoline, a journaling app, from PRD to a production launch on Google Play. I&apos;m
              looking for my first APM or Product Analyst role.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => smoothScrollTo("#notebook")}
                className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-sm font-medium text-background transition-transform duration-300 hover:-translate-y-0.5 active:translate-y-0"
              >
                Open my product notebook
              </button>
              <a
                href="/M%20Krishna%20APM%20CV.pdf"
                download="M Krishna APM CV.pdf"
                className="inline-flex items-center gap-2 rounded-full border border-foreground/25 bg-[var(--paper)]/60 px-6 py-3.5 text-sm font-medium text-foreground backdrop-blur-md transition-colors hover:border-foreground/60"
              >
                <Download className="size-4" />
                Download CV
              </a>
              <Link
                href="/case-study"
                className="inline-flex items-center gap-2 px-3 py-3.5 text-sm font-medium text-foreground underline decoration-foreground/30 underline-offset-[6px] transition-colors hover:decoration-foreground"
              >
                Read the Emoline case study
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          className="absolute inset-x-0 bottom-8 z-20 flex flex-col items-center gap-2 text-xs text-foreground/70"
          style={{ opacity: cueOpacity }}
          aria-hidden
        >
          <span>Scroll</span>
          <span className="relative block h-8 w-px overflow-hidden bg-foreground/15">
            <span className="cue-drop absolute inset-x-0 top-0 h-3 bg-foreground/70" />
          </span>
        </motion.div>
      </div>
    </section>
  )
}
