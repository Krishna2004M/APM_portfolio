import { useId } from "react"
import { cn } from "@/lib/utils"

/**
 * Procedural sky: SVG turbulence clouds that drift slowly sideways, with a
 * halftone screen on top. No images, so it scales and themes for free.
 */
export function Sky({
  className,
  seed = 7,
  drift = 140,
  cover = 0.5,
}: {
  className?: string
  seed?: number
  /** seconds for one full drift loop */
  drift?: number
  /** 0..1, how much of the sky the clouds take up */
  cover?: number
}) {
  const id = useId().replace(/:/g, "")
  const threshold = (2.5 - cover * 1.4).toFixed(2)

  const cloudSvg = (key: string) => (
    <svg
      key={key}
      className="h-full w-1/2 shrink-0"
      viewBox="0 0 1600 900"
      preserveAspectRatio="none"
      aria-hidden
    >
      <defs>
        <filter id={`c-${id}`} x="0" y="0" width="1600" height="900" filterUnits="userSpaceOnUse">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.0021 0.0040"
            numOctaves="5"
            seed={seed}
            stitchTiles="stitch"
            result="noise"
          />
          <feColorMatrix
            in="noise"
            type="matrix"
            values={`0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  4.2 0 0 0 -${threshold}`}
            result="mask"
          />
          <feFlood style={{ floodColor: "var(--cloud)" }} result="color" />
          <feComposite in="color" in2="mask" operator="in" result="clouds" />
          <feFlood style={{ floodColor: "var(--cloud-shadow)" }} result="shade" />
          <feOffset in="mask" dy="22" result="soft-low" />
          <feComposite in="shade" in2="soft-low" operator="in" result="shadow" />
          <feComposite in="shadow" in2="mask" operator="in" result="belly" />
          <feMerge>
            <feMergeNode in="clouds" />
            <feMergeNode in="belly" />
          </feMerge>
        </filter>
      </defs>
      <rect width="1600" height="900" filter={`url(#c-${id})`} opacity="0.95" />
    </svg>
  )

  return (
    <div className={cn("sky halftone absolute inset-0 overflow-hidden", className)} aria-hidden>
      <div
        className="cloud-layer flex"
        style={
          {
            "--drift": `${drift}s`,
            maskImage: "linear-gradient(180deg, rgba(0,0,0,.55) 0%, rgba(0,0,0,.25) 35%, #000 75%)",
            WebkitMaskImage: "linear-gradient(180deg, rgba(0,0,0,.55) 0%, rgba(0,0,0,.25) 35%, #000 75%)",
          } as React.CSSProperties
        }
      >
        {cloudSvg("a")}
        {cloudSvg("b")}
      </div>
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-b from-transparent to-[var(--sky-bottom)]" />
    </div>
  )
}
