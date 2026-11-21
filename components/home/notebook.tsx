"use client"

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useSpring,
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

const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

/** 0..1 progress of one leaf's turn, eased, including any hover peel. */
type Peel = { amount: MotionValue<number>; leaf: MotionValue<number> }

function useLeafProgress(index: number, flips: MotionValue<number>, peel: Peel) {
  return useTransform([flips, peel.amount, peel.leaf], ([f, p, leaf]: number[]) => {
    const raw = (f - (index + 0.1)) / 0.8
    const t = Math.min(1, Math.max(0, raw))
    return Math.min(1, Math.max(0, ease(t) + (leaf === index ? p : 0)))
  })
}

function Leaf({
  index,
  flips,
  peel,
  spread,
  showing,
  goTo,
}: {
  index: number
  flips: MotionValue<number>
  peel: Peel
  spread: number
  showing: [number, number]
  goTo: (k: number) => void
}) {
  const t = useLeafProgress(index, flips, peel)

  // The page lifts off the block, bends at the free edge and settles flat.
  const transform = useTransform(t, (v) => {
    const arc = Math.sin(Math.PI * v)
    const angle = -180 * v
    const lift = arc * 70
    const curl = arc * -7 // skew makes the free edge trail like bending paper
    const tilt = arc * 2.2
    return `rotateY(${angle}deg) translateZ(${lift}px) rotateZ(${-tilt}deg) skewY(${curl}deg)`
  })
  const zIndex = useTransform(t, (v) => (v > 0.5 ? (10 + index) * 2 : (10 + LEAVES - index) * 2))

  // Light: the front darkens as it turns away, a gloss band sweeps across it.
  const frontShade = useTransform(t, [0, 0.5, 0.501], [0, 0.32, 0.32])
  const backShade = useTransform(t, [0.499, 0.5, 1], [0.32, 0.32, 0])
  const gloss = useTransform(t, [0, 0.12, 0.45, 0.55, 0.88, 1], [0, 0.9, 0.5, 0.5, 0.9, 0])
  const glossPos = useTransform(t, [0, 1], ["120% 0%", "-20% 0%"])

  const Front = pages[index * 2]
  const Back = pages[index * 2 + 1]
  const frontPage = index * 2
  const backPage = index * 2 + 1
  const onShow = (page: number) => {
    const k = spreadOfPage(page)
    return k >= showing[0] && k <= showing[1]
  }
  // "active" drives each page's own animation; inert keeps hidden pages out of the tab order.
  const frontActive = onShow(frontPage)
  const backActive = onShow(backPage) && backPage < pages.length - 1
  const frontInert = spreadOfPage(frontPage) !== spread
  const backInert = spreadOfPage(backPage) !== spread || backPage >= pages.length - 1
  const isCover = index === 0

  const glossStyle = {
    opacity: gloss,
    backgroundImage:
      "linear-gradient(100deg, transparent 35%, rgba(255,255,255,0.55) 48%, rgba(255,255,255,0.0) 62%)",
    backgroundSize: "250% 100%",
    backgroundPosition: glossPos,
    mixBlendMode: "soft-light" as const,
  }

  return (
    <motion.div
      className="leaf absolute left-1/2 top-0 h-full w-[var(--pw)]"
      style={{ transform, zIndex }}
    >
      <div
        className={cn("leaf-face front", isCover ? "rounded-r-[6px]" : "paper paper-right rounded-r-[4px]")}
        inert={frontInert}
      >
        <Front goTo={goTo} active={frontActive} />
        <motion.div
          className="pointer-events-none absolute inset-0"
          style={{
            opacity: frontShade,
            backgroundImage: "linear-gradient(90deg, rgba(20,30,52,0.55), rgba(20,30,52,0.15) 60%, rgba(20,30,52,0.35))",
          }}
          aria-hidden
        />
        <motion.div className="pointer-events-none absolute inset-0" style={glossStyle} aria-hidden />
      </div>
      <div className="leaf-face back paper paper-left rounded-l-[4px]" inert={backInert}>
        {Back && <Back goTo={goTo} active={backActive} />}
        <motion.div
          className="pointer-events-none absolute inset-0"
          style={{
            opacity: backShade,
            backgroundImage: "linear-gradient(270deg, rgba(20,30,52,0.55), rgba(20,30,52,0.15) 60%, rgba(20,30,52,0.35))",
          }}
          aria-hidden
        />
        <motion.div className="pointer-events-none absolute inset-0" style={glossStyle} aria-hidden />
      </div>
    </motion.div>
  )
}

/** The shadow a turning leaf throws onto the page beneath it. */
function CastShadow({ index, flips, peel }: { index: number; flips: MotionValue<number>; peel: Peel }) {
  const t = useLeafProgress(index, flips, peel)
  const rightScale = useTransform(t, (v) => (v < 0.5 ? Math.max(0, Math.cos(Math.PI * v)) * 0.9 + 0.1 : 0))
  const rightOpacity = useTransform(t, (v) => (v > 0 && v < 0.5 ? Math.sin(Math.PI * v) * 0.9 : 0))
  const leftScale = useTransform(t, (v) => (v > 0.5 ? Math.max(0, -Math.cos(Math.PI * v)) * 0.9 + 0.1 : 0))
  const leftOpacity = useTransform(t, (v) => (v > 0.5 && v < 1 ? Math.sin(Math.PI * v) * 0.9 : 0))
  const zRight = (10 + LEAVES - index) * 2 - 1
  const zLeft = (10 + index) * 2 - 1

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-full w-[var(--pw)] origin-left"
        style={{
          zIndex: zRight,
          scaleX: rightScale,
          opacity: rightOpacity,
          backgroundImage: "linear-gradient(90deg, rgba(18,28,50,0.38), rgba(18,28,50,0.12) 70%, transparent)",
        }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute right-1/2 top-0 h-full w-[var(--pw)] origin-right"
        style={{
          zIndex: zLeft,
          scaleX: leftScale,
          opacity: leftOpacity,
          backgroundImage: "linear-gradient(270deg, rgba(18,28,50,0.38), rgba(18,28,50,0.12) 70%, transparent)",
        }}
      />
    </>
  )
}

/** Stacked page edges: thicker on whichever side holds more pages. */
function stackShadow(count: number, side: 1 | -1) {
  const layers: string[] = []
  const n = Math.max(0, Math.round(count))
  for (let k = 1; k <= n; k++) {
    const shade = k % 2 ? "var(--paper-edge)" : "color-mix(in oklab, var(--paper-edge) 75%, #8a93a6)"
    layers.push(`${side * k * 1.6}px ${k * 1.1}px 0 ${shade}`)
  }
  layers.push("0 40px 80px -30px rgba(28,43,74,0.45)", "0 18px 30px -18px rgba(28,43,74,0.35)")
  return layers.join(", ")
}

/** A folded corner that peels the page back on hover and turns it on click. */
function DogEar({
  side,
  onTurn,
  onPeel,
  label,
}: {
  side: "left" | "right"
  onTurn: () => void
  onPeel: (on: boolean) => void
  label: string
}) {
  const [hover, setHover] = useState(false)
  const right = side === "right"
  return (
    <motion.button
      type="button"
      aria-label={label}
      data-cursor={right ? "Turn" : "Back"}
      onClick={onTurn}
      onMouseEnter={() => {
        setHover(true)
        onPeel(true)
      }}
      onMouseLeave={() => {
        setHover(false)
        onPeel(false)
      }}
      onFocus={() => onPeel(true)}
      onBlur={() => onPeel(false)}
      className={cn("absolute bottom-0 z-[80] block", right ? "right-0" : "left-0")}
      initial={false}
      animate={{ width: hover ? 76 : 40, height: hover ? 76 : 40 }}
      transition={{ type: "spring", stiffness: 380, damping: 24 }}
    >
      <span
        className="absolute inset-0"
        style={{
          clipPath: right ? "polygon(100% 0, 100% 100%, 0 100%)" : "polygon(0 0, 100% 100%, 0 100%)",
          background: "var(--background)",
        }}
      />
      <span
        className="absolute inset-0"
        style={{
          clipPath: right ? "polygon(100% 0, 0 100%, 0 0)" : "polygon(0 0, 100% 0, 100% 100%)",
          background: right
            ? "linear-gradient(135deg, var(--paper) 40%, color-mix(in oklab, var(--paper) 70%, #7d879b) 100%)"
            : "linear-gradient(225deg, var(--paper) 40%, color-mix(in oklab, var(--paper) 70%, #7d879b) 100%)",
          filter: "drop-shadow(-2px -2px 3px rgba(20,30,50,0.18))",
          transform: right ? "translate(0,0)" : undefined,
        }}
      />
    </motion.button>
  )
}

function DesktopBook() {
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] })
  const raw = useTransform(scrollYProgress, [0, 1], [0, FLIPS])
  // Spring between scroll and pages: turns ease in, carry a little momentum and settle.
  const flips = useSpring(raw, { stiffness: 110, damping: 20, mass: 0.7, restDelta: 0.0005 })
  const peelAmount = useSpring(0, { stiffness: 260, damping: 22 })
  const peelLeaf = useMotionValue(-1)
  const peel: Peel = { amount: peelAmount, leaf: peelLeaf }
  const [spread, setSpread] = useState(0)
  // While a page turns, both the spread it leaves and the one it reveals are on show.
  const [showing, setShowing] = useState<[number, number]>([0, 0])

  useMotionValueEvent(flips, "change", (v) => {
    const next = Math.min(FLIPS, Math.max(0, Math.round(v)))
    setSpread((s) => (s === next ? s : next))
    const lo = Math.max(0, Math.floor(v + 0.15))
    const hi = Math.min(FLIPS, Math.ceil(v - 0.15))
    setShowing((cur) => (cur[0] === lo && cur[1] === hi ? cur : [lo, Math.max(lo, hi)]))
  })

  const shift = useTransform(flips, [0.1, 0.9], ["-25%", "0%"])
  const leftBase = useTransform(flips, [0.4, 0.6], [0, 1])
  const rightStack = useTransform(flips, (v) => stackShadow(Math.min(6, FLIPS - v + 1), 1))
  const leftStack = useTransform(flips, (v) => stackShadow(Math.min(6, v), -1))

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

  // Hovering a corner peels the next (or previous) page up a little.
  const startPeel = (leaf: number, amount: number) => (on: boolean) => {
    if (on) peelLeaf.set(leaf)
    peelAmount.set(on ? amount : 0)
  }

  return (
    <div
      ref={sectionRef}
      className="relative hidden md:block md:motion-reduce:hidden"
      style={{ height: `calc(${FLIPS} * 115svh + 100svh)` }}
    >
      <div className="sticky top-0 flex h-svh flex-col items-center justify-center gap-6 overflow-hidden pt-16">
        <div
          className="relative [perspective:2400px] [perspective-origin:50%_30%]"
          style={
            {
              "--pw": "min(43vw, 540px, calc((100svh - 190px) * 0.72))",
              width: "calc(var(--pw) * 2)",
              height: "calc(var(--pw) / 0.72)",
            } as React.CSSProperties
          }
        >
          <motion.div className="relative h-full w-full [transform-style:preserve-3d]" style={{ x: shift }}>
            {/* Page blocks under the leaves, with edges that grow and shrink */}
            <motion.div
              className="paper absolute left-0 top-0 h-full w-[var(--pw)] rounded-l-[4px]"
              style={{ opacity: leftBase, boxShadow: leftStack }}
              aria-hidden
            />
            <motion.div
              className="paper absolute left-1/2 top-0 h-full w-[var(--pw)] rounded-r-[4px]"
              style={{ boxShadow: rightStack }}
              aria-hidden
            />
            {Array.from({ length: LEAVES }).map((_, i) => (
              <CastShadow key={`s${i}`} index={i} flips={flips} peel={peel} />
            ))}
            {Array.from({ length: LEAVES }).map((_, i) => (
              <Leaf key={i} index={i} flips={flips} peel={peel} spread={spread} showing={showing} goTo={goTo} />
            ))}
            {/* Spine shadow */}
            <motion.div
              className="pointer-events-none absolute left-1/2 top-0 z-[70] h-full w-12 -translate-x-1/2 bg-[linear-gradient(90deg,transparent,rgba(20,30,50,0.10)_42%,rgba(20,30,50,0.2)_50%,rgba(20,30,50,0.10)_58%,transparent)]"
              style={{ opacity: leftBase }}
              aria-hidden
            />
          </motion.div>
          {/* Folded corners: a flat layer above the 3D book so they stay hoverable */}
          <motion.div className="pointer-events-none absolute inset-0 z-[90]" style={{ x: shift }}>
            <div className="pointer-events-auto absolute bottom-0 right-0 h-0 w-0">
              {spread < FLIPS && (
                <DogEar side="right" label="Turn to the next page" onTurn={() => goTo(spread + 1)} onPeel={startPeel(spread, 0.1)} />
              )}
            </div>
            <div className="pointer-events-auto absolute bottom-0 left-0 h-0 w-0">
              {spread > 1 && (
                <DogEar side="left" label="Turn back a page" onTurn={() => goTo(spread - 1)} onPeel={startPeel(spread - 1, -0.1)} />
              )}
            </div>
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
          <div className="relative h-5 w-32 overflow-hidden text-sm text-foreground/60" aria-live="polite">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={spread}
                className="absolute left-0 top-0"
                initial={{ y: 18, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -18, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                {SPREAD_NAMES[spread]}
              </motion.span>
            </AnimatePresence>
          </div>
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
    card?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" })
  }, [])

  // Each card bends toward its neighbours as it slides, like pages fanning under a thumb.
  const bend = useCallback(() => {
    const track = trackRef.current
    if (!track) return
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const mid = track.scrollLeft + track.clientWidth / 2
    let nearest = 0
    let best = Infinity
    Array.from(track.children).forEach((node, i) => {
      const el = node as HTMLElement
      const center = el.offsetLeft + el.offsetWidth / 2
      const delta = (center - mid) / el.offsetWidth
      if (Math.abs(delta) < best) {
        best = Math.abs(delta)
        nearest = i
      }
      if (reduced) return
      const d = Math.max(-1.4, Math.min(1.4, delta))
      el.style.transformOrigin = d > 0 ? "left center" : "right center"
      el.style.transform = `perspective(1000px) rotateY(${-d * 22}deg) scale(${1 - Math.abs(d) * 0.07})`
      el.style.filter = `brightness(${1 - Math.abs(d) * 0.08})`
    })
    setIndex(nearest)
  }, [])

  useEffect(() => {
    bend()
    window.addEventListener("resize", bend)
    return () => window.removeEventListener("resize", bend)
  }, [bend])

  const onScroll = () => requestAnimationFrame(bend)

  return (
    <div className="md:hidden md:motion-reduce:block">
      <div
        ref={trackRef}
        onScroll={onScroll}
        className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-[8vw] pb-8 pt-4 md:px-[max(1.5rem,calc((100vw-1100px)/2))]"
        aria-label="Product notebook pages"
      >
        {deckPages.map((Page, i) => (
          <div
            key={i}
            className={cn(
              "relative w-[84vw] max-w-[440px] shrink-0 snap-center overflow-hidden [container-type:inline-size] md:w-[min(30vw,420px)]",
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
