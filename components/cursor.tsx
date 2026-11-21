"use client"

import { motion, useMotionValue, useSpring } from "motion/react"
import { useEffect, useState } from "react"

/**
 * A soft ring that trails the pointer. It grows over interactive elements and
 * shows a short label for anything marked with data-cursor="Label".
 * Hidden on touch devices (see .cursor-ring in globals.css).
 */
export function Cursor() {
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 })
  const [mode, setMode] = useState<"idle" | "link" | "label">("idle")
  const [label, setLabel] = useState("")
  const [visible, setVisible] = useState(false)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (!fine || reduced) return
    setEnabled(true)

    const move = (e: PointerEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setVisible(true)
      const target = e.target as HTMLElement | null
      const labelled = target?.closest<HTMLElement>("[data-cursor]")
      if (labelled?.dataset.cursor) {
        setMode("label")
        setLabel(labelled.dataset.cursor)
        return
      }
      const interactive = target?.closest("a, button, [role='button'], input, textarea, select, label")
      setMode(interactive ? "link" : "idle")
    }
    const leave = () => setVisible(false)

    window.addEventListener("pointermove", move, { passive: true })
    document.documentElement.addEventListener("pointerleave", leave)
    return () => {
      window.removeEventListener("pointermove", move)
      document.documentElement.removeEventListener("pointerleave", leave)
    }
  }, [x, y])

  if (!enabled) return null

  const size = mode === "label" ? 84 : mode === "link" ? 44 : 22

  return (
    <motion.div
      aria-hidden
      className="cursor-ring"
      style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
      animate={{
        width: size,
        height: size,
        opacity: visible ? 1 : 0,
        backgroundColor:
          mode === "label"
            ? "var(--primary)"
            : mode === "link"
              ? "color-mix(in oklab, var(--primary) 12%, transparent)"
              : "rgba(0,0,0,0)",
      }}
      transition={{ type: "spring", stiffness: 380, damping: 30 }}
    >
      {mode === "label" && (
        <motion.span initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}>
          {label}
        </motion.span>
      )}
    </motion.div>
  )
}
