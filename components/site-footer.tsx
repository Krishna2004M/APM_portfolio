import Link from "next/link"
import { LinkedinIcon, GithubIcon } from "@/components/brand-icons"

export function SiteFooter() {
  return (
    <footer className="relative border-t border-foreground/10">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-8 px-6 py-12 md:flex-row md:items-end md:justify-between md:px-10">
        <div>
          <p className="font-serif text-2xl italic tracking-tight text-foreground">M Krishna</p>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-foreground/65">
            Aspiring product manager. Product operations at Airlearn, builder of Emoline.
          </p>
        </div>
        <div className="flex flex-col gap-4 text-sm md:items-end">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-foreground/70">
            <Link href="/#notebook" className="hover:text-foreground">
              Notebook
            </Link>
            <Link href="/case-study" className="hover:text-foreground">
              Case study
            </Link>
            <Link href="/work" className="hover:text-foreground">
              Work
            </Link>
            <Link href="/about" className="hover:text-foreground">
              Skills & contact
            </Link>
          </div>
          <div className="flex items-center gap-5 text-foreground/70">
            <a href="mailto:krishbabu2004@gmail.com" className="hover:text-foreground">
              krishbabu2004@gmail.com
            </a>
            <a href="https://linkedin.com/in/m-krishna-krishna" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="hover:text-foreground">
              <LinkedinIcon className="size-4" />
            </a>
            <a href="https://github.com/Krishna2004M" target="_blank" rel="noreferrer" aria-label="GitHub" className="hover:text-foreground">
              <GithubIcon className="size-4" />
            </a>
          </div>
          <p className="text-xs text-foreground/50">© {new Date().getFullYear()} M Krishna</p>
        </div>
      </div>
    </footer>
  )
}
