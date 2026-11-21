"use client"

import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react"
import { useCallback, useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { pages } from "@/components/home/notebook-pages"
import { smoothScrollTo } from "@/components/smooth-scroll"
import { cn } from "@/lib/utils"

const LEAVES = Math.ceil(pages.length / 2) // 7 leaves, 14 faces
const FLIPS = LEAVES - 1 // the last leaf stays as the final right page
const SPREAD_NAMES = ["Cover", "Contents", "Emoline", "SuperKalam", "TalentXO", "Clearance", "Building blocks"]

/** Spread k shows pages 2k-1 (left) and 2k (right). */
function spreadOfPage(page: number) {
  return Math.ceil(page / 2)
}

function Leaf({
  index,
  flips,
  spread,
  goTo,
}: {
  index: number
  flips: MotionValue<number>
  spread: number
  goTo: (k: number) => void
}) {
  const rotate = useTransform(flips, [index + 0.12, index + 0.88], [0, -180], { clamp: true })
  const zIndex = useTransform(rotate, (r) => (r < -90 ? 10 + index : 10 + LEAVES - index))
  const shade = useTransform(rotate, [0, -90, -180], [0, 0.22, 0])
  const lift = useTransform(rotate, [0, -90, -180], [0, -10, 0])

  const Front = pages[index * 2]
  const Back = pages[index * 2 + 1]
  const frontPage = index * 2
  const backPage = index * 2 + 1
  const frontActive = spreadOfPage(frontPage) === spread
  const backActive = spreadOfPage(backPage) === spread && backPage < pages.length - 1
  const isCover = index === 0

  return (
    <motion.div
      className="leaf absolute left-1/2 top-0 h-full w-[var(--pw)]"
      style={{ rotateY: rotate, zIndex, y: lift }}
    >
      <div
        className={cn("leaf-face front", isCover ? "rounded-r-[6px]" : "paper paper-right rounded-r-[4px]")}
        inert={!frontActive}
      >
        <Front goTo={goTo} active={frontActive} />
        <motion.div className="pointer-events-none absolute inset-0 bg-[#1c2b4a]" style={{ opacity: shade }} aria-hidden />
      </div>
      <div className="leaf-face back paper paper-left rounded-l-[4px]" inert={!backActive}>
        {Back && <Back goTo={goTo} active={backActive} />}
        <motion.div className="pointer-events-none absolute inset-0 bg-[#1c2b4a]" style={{ opacity: shade }} aria-hidden />
      </div>
    </motion.div>
  )
}

function DesktopBook() {
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] })
  const flips = useTransform(scrollYProgress, [0, 1], [0, FLIPS])
  const [spread, setSpread] = useState(0)

  useMotionValueEvent(flips, "change", (v) => {
    const next = Math.min(FLIPS, Math.max(0, Math.round(v)))
    setSpread((s) => (s === next ? s : next))
  })

  const shift = useTransform(flips, [0.12, 0.88], ["-25%", "0%"])
  const leftBase = useTransform(flips, [0.4, 0.6], [0, 1])

  const goTo = useCallback((k: number) => {
    const el = sectionRef.current
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY
    const range = el.offsetHeight - window.innerHeight
    smoothScrollTo(top + (Math.max(0, Math.min(FLIPS, k)) / FLIPS) * range)
  }, [])

  // Arrow keys turn pages while the notebook is pinned.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = sectionRef.current
      if (!el || e.defaultPrevented) return
      const target = e.target as HTMLElement | null
      if (target?.closest("input, textarea, select, [contenteditable]")) return
      const rect = el.getBoundingClientRect()
      const pinned = rect.top <= 1 && rect.bottom >= window.innerHeight - 1
      if (!pinned) return
      if (e.key === "ArrowRight") {
        e.preventDefault()
        goTo(spread + 1)
      } else if (e.key === "ArrowLeft") {
        e.preventDefault()
        goTo(spread - 1)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [goTo, spread])

  return (
    <div
      ref={sectionRef}
      className="relative hidden md:block md:motion-reduce:hidden"
      style={{ height: `calc(${FLIPS} * 115svh + 100svh)` }}
    >
      <div className="sticky top-0 flex h-svh flex-col items-center justify-center gap-6 overflow-hidden pt-16">
        <div
          className="relative [perspective:2600px]"
          style={
            {
              "--pw": "min(43vw, 540px, calc((100svh - 190px) * 0.72))",
              width: "calc(var(--pw) * 2)",
              height: "calc(var(--pw) / 0.72)",
            } as React.CSSProperties
          }
        >
          <motion.div className="relative h-full w-full [transform-style:preserve-3d]" style={{ x: shift }}>
            {/* Page block under the leaves */}
            <motion.div
              className="paper book-shadow absolute left-0 top-0 h-full w-[var(--pw)] rounded-l-[4px]"
              style={{ opacity: leftBase }}
              aria-hidden
            />
            <div className="paper book-shadow absolute left-1/2 top-0 h-full w-[var(--pw)] rounded-r-[4px]" aria-hidden />
            {Array.from({ length: LEAVES }).map((_, i) => (
              <Leaf key={i} index={i} flips={flips} spread={spread} goTo={goTo} />
            ))}
            {/* Spine shadow */}
            <motion.div
              className="pointer-events-none absolute left-1/2 top-0 z-[60] h-full w-10 -translate-x-1/2 bg-[linear-gradient(90deg,transparent,rgba(20,30,50,0.10)_45%,rgba(20,30,50,0.16)_50%,rgba(20,30,50,0.10)_55%,transparent)]"
              style={{ opacity: leftBase }}
              aria-hidden
            />
          </motion.div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-5">
          <button
            type="button"
            onClick={() => goTo(spread - 1)}
            disabled={spread === 0}
            aria-label="Previous page"
            className="inline-flex size-10 items-center justify-center rounded-full border border-foreground/20 text-foreground transition hover:border-foreground disabled:opacity-30"
          >
            <ChevronLeft className="size-4" />
          </button>
          <div className="flex items-center gap-1.5" role="tablist" aria-label="Notebook spreads">
            {SPREAD_NAMES.map((name, k) => (
              <button
                key={name}
                type="button"
                role="tab"
                aria-selected={spread === k}
                aria-label={name}
                title={name}
                onClick={() => goTo(k)}
                className="group flex h-6 items-center"
              >
                <span
                  className={cn(
                    "block h-1.5 rounded-full transition-all duration-500",
                    spread === k ? "w-7 bg-foreground" : "w-1.5 bg-foreground/25 group-hover:bg-foreground/60",
                  )}
                />
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => goTo(spread + 1)}
            disabled={spread === FLIPS}
            aria-label="Next page"
            className="inline-flex size-10 items-center justify-center rounded-full border border-foreground/20 text-foreground transition hover:border-foreground disabled:opacity-30"
          >
            <ChevronRight className="size-4" />
          </button>
          <span className="w-32 text-sm text-foreground/60" aria-live="polite">
            {SPREAD_NAMES[spread]}
          </span>
        </div>
      </div>
    </div>
  )
}

/** Phones and reduced motion: a swipeable deck of pages. */
function PageDeck() {
  const trackRef = useRef<HTMLDivElement | null>(null)
  const [index, setIndex] = useState(0)
  const deckPages = pages.slice(0, pages.length - 1)

  const goTo = useCallback((spread: number) => {
    const track = trackRef.current
    if (!track) return
    const pageIndex = spread === 0 ? 0 : spread * 2 - 1
    const card = track.children[pageIndex] as HTMLElement | undefined
    card?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" })
  }, [])

  const onScroll = () => {
    const track = trackRef.current
    if (!track) return
    const first = track.children[0] as HTMLElement | undefined
    if (!first) return
    const step = first.offsetWidth + 16
    setIndex(Math.round(track.scrollLeft / step))
  }

  return (
    <div className="md:hidden md:motion-reduce:block">
      <div
        ref={trackRef}
        onScroll={onScroll}
        className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-6 pt-2 md:px-[max(1.5rem,calc((100vw-1100px)/2))]"
        aria-label="Product notebook pages"
      >
        {deckPages.map((Page, i) => (
          <div
            key={i}
            className={cn(
              "relative w-[84vw] max-w-[440px] shrink-0 snap-start overflow-hidden [container-type:inline-size] md:w-[min(30vw,420px)]",
              i === 0 ? "aspect-[0.72] rounded-[6px] shadow-[0_24px_50px_-24px_rgba(30,45,80,0.55)]" : "paper min-h-[560px] rounded-[6px] shadow-[0_18px_40px_-26px_rgba(30,45,80,0.5)] ring-1 ring-black/5",
            )}
          >
            <Page goTo={goTo} />
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center gap-1.5 px-6" aria-hidden>
        {deckPages.map((_, i) => (
          <span
            key={i}
            className={cn("block h-1.5 rounded-full transition-all duration-300", index === i ? "w-5 bg-foreground" : "w-1.5 bg-foreground/25")}
          />
        ))}
      </div>
      <p className="mt-3 text-center text-sm text-foreground/55">Swipe to turn the pages</p>
    </div>
  )
}

export function Notebook() {
  return (
    <section id="notebook" className="relative scroll-mt-0" aria-labelledby="notebook-heading">
      <div className="mx-auto max-w-[40rem] px-6 pb-10 pt-8 text-center md:pb-0">
        <h2 id="notebook-heading" className="font-serif text-[clamp(34px,4.6vw,56px)] italic leading-tight tracking-[-0.01em]">
          My product notebook
        </h2>
        <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-foreground/70">
          Four products, the problem behind each, and the call I made. Keep scrolling to turn the pages.
        </p>
      </div>
      <DesktopBook />
      <PageDeck />
    </section>
  )
}
