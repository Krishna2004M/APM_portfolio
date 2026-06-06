import Link from "next/link"
import { Mail } from "lucide-react"
import { LinkedinIcon, GithubIcon } from "@/components/brand-icons"

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-serif text-base">M Krishna</p>
          <p className="text-sm text-muted-foreground">APM | AI Products | Learning Tech</p>
          <p className="mt-1 text-sm text-muted-foreground">
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
        <div className="flex items-center gap-5 text-muted-foreground">
          <a
            href="mailto:krishbabu2004@gmail.com"
            className="flex items-center gap-2 text-sm transition-colors hover:text-foreground"
          >
            <Mail className="size-4" />
            Email
          </a>
          <a
            href="https://linkedin.com/in/m-krishna-krishna"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-sm transition-colors hover:text-foreground"
          >
            <LinkedinIcon className="size-4" />
            LinkedIn
          </a>
          <a
            href="https://github.com/Krishna2004M"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-sm transition-colors hover:text-foreground"
          >
            <GithubIcon className="size-4" />
            GitHub
          </a>
        </div>
      </div>
      <div className="mx-auto max-w-5xl px-6 pb-6">
        <p className="text-xs text-muted-foreground">
          Copyright {new Date().getFullYear()} M Krishna - APM | AI Products | Learning Tech -{" "}
          <Link href="/case-study" className="underline-offset-4 hover:underline">
            Read the main case study
          </Link>
        </p>
      </div>
    </footer>
  )
}
