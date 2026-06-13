"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { Menu, X } from "lucide-react"

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
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    document.addEventListener("keydown", handler)
    return () => document.removeEventListener("keydown", handler)
  }, [open])

  return (
    <header
      className={cn(
        "fixed left-0 right-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border bg-background/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 md:px-10">
        <Link
          href="/"
          className="group flex items-center gap-3"
          onClick={() => setOpen(false)}
        >
          <span className="flex size-9 items-center justify-center border border-border font-serif text-sm font-medium text-foreground transition-colors group-hover:border-primary group-hover:text-primary">
            MK
          </span>
          <span className="flex flex-col leading-tight">
            <span className="font-serif text-base font-medium tracking-tight text-foreground">
              M Krishna
            </span>
          <span className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              APM | AI Products
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((link) => {
            const active = isActive(link.href, pathname)
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "group relative px-4 py-2 text-[11px] uppercase tracking-[0.22em] transition-colors",
                  active
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {link.label}
                <span
                  className={cn(
                    "absolute -bottom-0.5 left-4 right-4 h-px origin-left scale-x-0 bg-primary transition-transform duration-300 ease-out group-hover:scale-x-100",
                    active && "scale-x-100",
                  )}
                />
              </Link>
            )
          })}
        </div>

        <div className="md:hidden">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex size-10 items-center justify-center border border-border text-foreground transition-colors hover:border-primary hover:text-primary"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <div className="mx-auto flex max-w-[1400px] flex-col px-6 py-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "border-b border-border/60 px-1 py-4 text-sm uppercase tracking-[0.22em] transition-colors last:border-b-0",
                  isActive(link.href, pathname)
                    ? "text-primary"
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
