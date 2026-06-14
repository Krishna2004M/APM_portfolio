import Link from "next/link"
import { Mail } from "lucide-react"
import { LinkedinIcon, GithubIcon } from "@/components/brand-icons"

export function SiteFooter() {
  return (
    <footer className="relative mt-24 border-t border-border bg-background">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-8 px-6 py-14 md:flex-row md:items-start md:justify-between md:px-10">
        <div>
          <p className="font-serif text-2xl font-medium tracking-tight text-foreground">
            M Krishna
          </p>
          <p className="mt-1 text-xs uppercase tracking-[0.22em] text-muted-foreground">
            APM, AI Products, Learning Tech
          </p>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
            Open to APM & Product Analyst roles.{" "}
            <a
              href="mailto:krishbabu2004@gmail.com"
              className="text-primary underline-offset-4 hover:underline"
            >
              Let&apos;s talk
            </a>
            .
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
          <a
            href="mailto:krishbabu2004@gmail.com"
            className="hover-pop group flex items-center gap-2 text-sm uppercase tracking-[0.18em] hover:text-primary"
          >
            <Mail className="size-4" />
            Email
          </a>
          <a
            href="https://linkedin.com/in/m-krishna-krishna"
            target="_blank"
            rel="noreferrer"
            className="hover-pop group flex items-center gap-2 text-sm uppercase tracking-[0.18em] hover:text-primary"
          >
            <LinkedinIcon className="size-4" />
            LinkedIn
          </a>
          <a
            href="https://github.com/Krishna2004M"
            target="_blank"
            rel="noreferrer"
            className="hover-pop group flex items-center gap-2 text-sm uppercase tracking-[0.18em] hover:text-primary"
          >
            <GithubIcon className="size-4" />
            GitHub
          </a>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-3 px-6 py-5 text-[11px] uppercase tracking-[0.22em] text-muted-foreground sm:flex-row sm:items-center sm:justify-between md:px-10">
          <p>
            Copyright {new Date().getFullYear()} M Krishna, APM, AI Products, Learning Tech
          </p>
          <Link
            href="/case-study"
            className="hover-pop inline-flex items-center gap-2 hover:text-primary"
          >
            <span className="size-1 rounded-full bg-primary animate-pulse-dot" />
            Read the main case study
          </Link>
        </div>
      </div>
      <div
        aria-hidden
        className="pointer-events-none select-none overflow-hidden border-t border-border py-10"
      >
        <p className="whitespace-nowrap font-serif text-[18vw] font-medium leading-none tracking-tighter text-foreground/[0.05]">
          M&nbsp;KRISHNA APM AI LEARNING&nbsp;TECH
        </p>
      </div>
    </footer>
  )
}
