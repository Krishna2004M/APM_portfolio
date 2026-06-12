import { cn } from "@/lib/utils"

export function HoverDot({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "pointer-events-none absolute right-6 top-6 flex size-3 items-center justify-center",
        className,
      )}
    >
      <span className="absolute inline-flex size-2 rounded-full bg-primary opacity-0 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:animate-pulse-dot" />
      <span className="relative inline-flex size-1.5 rounded-full bg-primary/50 transition-all duration-300 group-hover:size-2 group-hover:bg-primary" />
    </span>
  )
}
