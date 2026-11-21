"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme-toggle"

const links = [
  { href: "/#notebook", label: "Notebook" },
  { href: "/case-study", label: "Case study" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "Skills & contact" },
]

function isActive(linkHref: string, pathname: string) {
  if (linkHref.startsWith("/#")) return false
  return pathname.startsWith(linkHref)
}

export function SiteNav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setScrolled(y > 24)
    if (open) return
    setHidden(y > 160 && y > prev + 2 ? true : y < prev - 2 ? false : hidden)
  })

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false)
    document.addEventListener("keydown", onKey)
    document.documentElement.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.documentElement.style.overflow = ""
    }
  }, [open])

  return (
    <>
      <motion.header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter] duration-500",
          scrolled && !open ? "bg-background/70 backdrop-blur-xl" : "bg-transparent",
        )}
        initial={false}
        animate={{ y: hidden && !open ? "-100%" : "0%" }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 md:px-10">
          <Link href="/" className="group flex items-center gap-2.5 text-[15px] font-semibold tracking-[-0.01em]">
            <span className="relative flex size-2.5 items-center justify-center" aria-hidden>
              <span className="absolute size-2.5 rounded-full bg-primary/30 transition-transform duration-500 group-hover:scale-[2.2]" />
              <span className="size-1.5 rounded-full bg-primary" />
            </span>
            M Krishna
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {links.map((link) => {
              const active = isActive(link.href, pathname)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative rounded-full px-4 py-2 text-sm transition-colors",
                    active ? "text-foreground" : "text-foreground/65 hover:text-foreground",
                  )}
                >
                  {link.label}
                  {active && (
                    <motion.span
                      layoutId="nav-dot"
                      className="absolute bottom-0.5 left-1/2 size-1 -translate-x-1/2 rounded-full bg-primary"
                    />
                  )}
                </Link>
              )
            })}
            <span className="ml-2">
              <ThemeToggle />
            </span>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="relative z-[60] inline-flex h-10 items-center gap-2 rounded-full border border-foreground/20 bg-background/60 px-4 text-sm backdrop-blur-md"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              <span className="relative block h-2.5 w-4" aria-hidden>
                <motion.span
                  className="absolute left-0 top-0 h-px w-4 bg-foreground"
                  animate={open ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                />
                <motion.span
                  className="absolute bottom-0 left-0 h-px w-4 bg-foreground"
                  animate={open ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
                />
              </span>
              {open ? "Close" : "Menu"}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col justify-between bg-background px-6 pb-10 pt-28 md:hidden"
            initial={{ clipPath: "circle(0% at 90% 4%)" }}
            animate={{ clipPath: "circle(150% at 90% 4%)" }}
            exit={{ clipPath: "circle(0% at 90% 4%)" }}
            transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
          >
            <ul className="space-y-2">
              {[{ href: "/", label: "Home" }, ...links].map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "block font-serif text-[44px] italic leading-[1.15]",
                      isActive(link.href, pathname) || (link.href === "/" && pathname === "/")
                        ? "text-foreground"
                        : "text-foreground/55",
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <motion.div
              className="space-y-1 text-sm text-foreground/70"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <a href="mailto:krishbabu2004@gmail.com" className="block">
                krishbabu2004@gmail.com
              </a>
              <p>Open to APM, Product Analyst and AI PM roles.</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
