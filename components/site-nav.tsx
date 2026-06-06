"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { Menu, X } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

const links = [
  { href: "/", label: "Home" },
  { href: "/case-study", label: "Case Study" },
  { href: "/work", label: "Supporting Work" },
  { href: "/about", label: "Skills & Contact" },
]

function isActive(linkHref: string, pathname: string) {
  return linkHref === "/" ? pathname === "/" : pathname.startsWith(linkHref)
}

export function SiteNav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    document.addEventListener("keydown", handler)
    return () => document.removeEventListener("keydown", handler)
  }, [open])

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex flex-col leading-tight" onClick={() => setOpen(false)}>
          <span className="font-serif text-lg font-medium tracking-tight">M Krishna</span>
          <span className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            APM | AI Products
          </span>
        </Link>

        <div className="hidden items-center gap-2 md:flex">
          <div className="flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-full px-3.5 py-1.5 text-sm transition-colors",
                  isActive(link.href, pathname)
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <ThemeToggle />
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex size-9 items-center justify-center rounded-full border border-border bg-background text-foreground shadow-sm transition-all hover:bg-secondary"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-border md:hidden">
          <div className="mx-auto flex max-w-5xl flex-col px-6 py-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-md px-2 py-2.5 text-sm transition-colors",
                  isActive(link.href, pathname)
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
