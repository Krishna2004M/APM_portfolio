"use client"

import { type MotionValue } from "motion/react"
import { useEffect, useRef } from "react"

type Dot = {
  tx: number
  ty: number
  x: number
  y: number
  vx: number
  vy: number
  r: number
  dx: number
  dy: number
  delay: number
}

/**
 * Draws text as a field of halftone dots. Dots gather into the letters on
 * load, push away from the pointer, and blow apart as `scatter` goes 0 to 1.
 */
export function DotWordmark({
  text,
  scatter,
  className,
  label,
}: {
  text: string
  scatter?: MotionValue<number>
  className?: string
  label: string
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    let dots: Dot[] = []
    let width = 0
    let height = 0
    let frame = 0
    let running = true
    let visible = true
    let start = performance.now()
    const pointer = { x: -9999, y: -9999, active: false }

    const ink = () =>
      getComputedStyle(document.documentElement).getPropertyValue("--foreground").trim() || "#22252c"
    let color = ink()

    const build = () => {
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      if (!width || !height) return
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      // Draw the text off-screen and sample it on a grid.
      const off = document.createElement("canvas")
      off.width = Math.round(width)
      off.height = Math.round(height)
      const octx = off.getContext("2d")
      if (!octx) return
      const family = getComputedStyle(document.body).fontFamily || "sans-serif"
      // The canvas covers the whole hero; the word sits in a box in the middle.
      const boxW = Math.min(width * 0.9, 1200)
      const boxH = Math.max(90, Math.min(width * 0.2, 250))
      let size = boxH * 0.8
      octx.font = `800 ${size}px ${family}`
      const measured = octx.measureText(text).width
      if (measured > boxW) size = (size * boxW) / measured
      octx.font = `800 ${size}px ${family}`
      octx.textAlign = "center"
      octx.textBaseline = "middle"
      octx.fillStyle = "#000"
      octx.fillText(text, width / 2, height / 2 + size * 0.04)

      const step = Math.max(3.2, Math.min(7, boxW / 190))
      const data = octx.getImageData(0, 0, off.width, off.height).data
      const next: Dot[] = []
      for (let y = 0; y < off.height; y += step) {
        for (let x = 0; x < off.width; x += step) {
          const i = (Math.round(y) * off.width + Math.round(x)) * 4 + 3
          if (data[i] > 120) {
            // Wind from the left: dots lift up and to the right, toward the paper plane.
            const gust = 0.35 + Math.random() * 1.1
            next.push({
              tx: x,
              ty: y,
              x: reduced ? x : width / 2 + (Math.random() - 0.5) * width * 1.2,
              y: reduced ? y : height / 2 + (Math.random() - 0.5) * height * 0.9,
              vx: 0,
              vy: 0,
              r: step * (0.26 + Math.random() * 0.14),
              dx: gust * (0.7 + Math.random() * 0.6) + (x / off.width) * 0.3,
              dy: -gust * (0.25 + Math.random() * 0.55) + (Math.random() - 0.5) * 0.25,
              delay: (x / off.width) * 380 + Math.random() * 260,
            })
          }
        }
      }
      dots = next
      start = performance.now()
    }

    const draw = (now: number) => {
      const s = scatter ? Math.max(0, Math.min(1, scatter.get())) : 0
      ctx.clearRect(0, 0, width, height)
      ctx.fillStyle = color
      const blow = s * s * width * 0.75
      ctx.globalAlpha = 1 - s * 0.95
      const R = Math.max(60, Math.min(width * 0.07, 110))

      for (const d of dots) {
        if (!reduced) {
          const ready = now - start > d.delay
          const gx = d.tx + d.dx * blow
          const gy = d.ty + d.dy * blow
          let ax = ready ? (gx - d.x) * 0.06 : 0
          let ay = ready ? (gy - d.y) * 0.06 : 0
          if (pointer.active) {
            const px = d.x - pointer.x
            const py = d.y - pointer.y
            const dist2 = px * px + py * py
            if (dist2 < R * R) {
              const dist = Math.sqrt(dist2) || 1
              const force = (1 - dist / R) * 5.5
              ax += (px / dist) * force
              ay += (py / dist) * force
            }
          }
          d.vx = (d.vx + ax) * 0.8
          d.vy = (d.vy + ay) * 0.8
          d.x += d.vx
          d.y += d.vy
        }
        ctx.beginPath()
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1
    }

    const loop = (now: number) => {
      if (!running) return
      if (visible) draw(now)
      frame = requestAnimationFrame(loop)
    }

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      pointer.x = e.clientX - rect.left
      pointer.y = e.clientY - rect.top
      pointer.active = pointer.x > -80 && pointer.y > -80 && pointer.x < width + 80 && pointer.y < height + 80
    }
    const onLeave = () => {
      pointer.active = false
    }

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
    })
    io.observe(canvas)

    const themeObserver = new MutationObserver(() => {
      color = ink()
      if (reduced) draw(performance.now())
    })
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })

    let resizeTimer = 0
    const ro = new ResizeObserver(() => {
      window.clearTimeout(resizeTimer)
      resizeTimer = window.setTimeout(() => {
        build()
        if (reduced) draw(performance.now())
      }, 120)
    })
    ro.observe(canvas)

    document.fonts.ready.then(() => {
      build()
      if (reduced) {
        draw(performance.now())
      } else {
        frame = requestAnimationFrame(loop)
      }
    })

    if (!reduced) {
      window.addEventListener("pointermove", onMove, { passive: true })
      window.addEventListener("pointerdown", onMove, { passive: true })
      document.documentElement.addEventListener("pointerleave", onLeave)
    }

    return () => {
      running = false
      cancelAnimationFrame(frame)
      io.disconnect()
      ro.disconnect()
      themeObserver.disconnect()
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("pointerdown", onMove)
      document.documentElement.removeEventListener("pointerleave", onLeave)
    }
  }, [text, scatter])

  return <canvas ref={canvasRef} role="img" aria-label={label} className={className} />
}
