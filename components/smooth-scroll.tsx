"use client"

import Lenis from "lenis"
import { usePathname } from "next/navigation"
import { useEffect } from "react"

let lenisInstance: Lenis | null = null

/** Scroll to a y position (or element) using Lenis when it is running. */
export function smoothScrollTo(target: number | HTMLElement | string, immediate = false) {
  if (lenisInstance) {
    lenisInstance.scrollTo(target, { immediate, duration: 1.1 })
    return
  }
  if (typeof target === "number") {
    window.scrollTo({ top: target, behavior: immediate ? "auto" : "smooth" })
  } else {
    const el = typeof target === "string" ? document.querySelector(target) : target
    el?.scrollIntoView({ behavior: immediate ? "auto" : "smooth" })
  }
}

export function SmoothScroll() {
  const pathname = usePathname()

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      anchors: { offset: -80 },
    })
    lenisInstance = lenis

    let frame = 0
    const raf = (time: number) => {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    }
    frame = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(frame)
      lenis.destroy()
      lenisInstance = null
    }
  }, [])

  // New page: start at the top without easing through the old page.
  useEffect(() => {
    if (window.location.hash) return
    lenisInstance?.scrollTo(0, { immediate: true })
  }, [pathname])

  return null
}
