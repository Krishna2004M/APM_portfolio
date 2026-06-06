"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "@/components/theme-provider"

export function ThemeToggle() {
  const { resolvedTheme, toggleTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex size-9 items-center justify-center rounded-full border border-border bg-background text-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:bg-secondary hover:shadow-md"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </button>
  )
}
