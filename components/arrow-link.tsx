import Link from "next/link"
import type { ReactNode } from "react"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"

type Variant = "inline" | "primary" | "ghost"

const variantClass: Record<Variant, string> = {
  inline:
    "group/al inline-flex items-center gap-2 text-sm font-medium tracking-wide text-foreground transition-colors hover:text-primary",
  primary:
    "group/al inline-flex items-center gap-3 border border-primary bg-primary px-6 py-3 text-sm font-medium uppercase tracking-[0.2em] text-primary-foreground transition-all hover:bg-primary/90",
  ghost:
    "group/al inline-flex items-center gap-3 border border-border bg-transparent px-6 py-3 text-sm font-medium uppercase tracking-[0.2em] text-foreground transition-all hover:border-primary hover:text-primary",
}

export function ArrowLink({
  href,
  children,
  variant = "inline",
  external,
  download,
  external_icon,
  className,
}: {
  href: string
  children: ReactNode
  variant?: Variant
  external?: boolean
  download?: string
  external_icon?: boolean
  className?: string
}) {
  const Icon = external_icon ? ArrowUpRight : ArrowRight
  const isExternal = external || href.startsWith("http") || href.startsWith("mailto:")

  if (isExternal || download) {
    return (
      <a
        href={href}
        target={isExternal && !download ? "_blank" : undefined}
        rel={isExternal && !download ? "noreferrer" : undefined}
        download={download}
        className={cn(variantClass[variant], className)}
      >
        <span>{children}</span>
        <Icon className="size-4 transition-transform duration-300 ease-out group-hover/al:translate-x-1" />
      </a>
    )
  }

  return (
    <Link href={href} className={cn(variantClass[variant], className)}>
      <span>{children}</span>
      <Icon className="size-4 transition-transform duration-300 ease-out group-hover/al:translate-x-1" />
    </Link>
  )
}
