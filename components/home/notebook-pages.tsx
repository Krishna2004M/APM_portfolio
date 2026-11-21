"use client"

import Link from "next/link"
import { motion } from "motion/react"
import { useId, useState, type ReactNode } from "react"
import { ArrowUpRight } from "lucide-react"
import { Sky } from "@/components/home/sky"
import { cn } from "@/lib/utils"

export type PageProps = {
  /** true when this page is on the open spread (desktop) or undefined on mobile */
  active?: boolean
  goTo: (spread: number) => void
}

/* ------------------------------------------------------------------ */
/* Shared bits                                                         */
/* ------------------------------------------------------------------ */

function PageNumber({ n }: { n: number }) {
  return (
    <div className="flex items-center justify-center gap-3 text-[clamp(10px,2.2cqw,12px)] text-foreground/45" aria-hidden>
      <span className="h-px w-5 bg-foreground/25" />
      {String(n).padStart(2, "0")}
      <span className="h-px w-5 bg-foreground/25" />
    </div>
  )
}

function Shell({ n, children, className }: { n?: number; children?: ReactNode; className?: string }) {
  return (
    <div className={cn("flex h-full flex-col px-[8cqw] pb-[7cqw] pt-[6cqw] text-foreground", className)}>
      {n !== undefined && <PageNumber n={n} />}
      <div className="flex min-h-0 flex-1 flex-col pt-[6cqw]">{children}</div>
    </div>
  )
}

const body = "text-[clamp(13.5px,3.05cqw,15.5px)] leading-[1.6]"
const small = "text-[clamp(11px,2.45cqw,13px)]"

function Status({ children }: { children: ReactNode }) {
  return (
    <p className={cn(small, "flex items-center gap-2 text-foreground/65")}>
      <span className="size-1.5 rounded-full bg-meadow" />
      {children}
    </p>
  )
}

function Title({ children }: { children: ReactNode }) {
  return (
    <h3 className="mt-[3cqw] font-serif text-[clamp(28px,10cqw,54px)] italic leading-[1] tracking-[-0.01em]">
      {children}
    </h3>
  )
}

function Facts({ items }: { items: Array<[string, string]> }) {
  return (
    <dl className={cn(body, "mt-[5cqw] space-y-[3.2cqw]")}>
      {items.map(([k, v]) => (
        <div key={k}>
          <dt className="font-medium text-foreground">{k}</dt>
          <dd className="text-foreground/75">{v}</dd>
        </div>
      ))}
    </dl>
  )
}

function PageLink({ href, children, external }: { href: string; children: ReactNode; external?: boolean }) {
  const cls = cn(
    small,
    "inline-flex items-center gap-1.5 rounded-full border border-foreground/20 px-3.5 py-2 font-medium text-foreground transition-colors hover:border-foreground hover:bg-foreground hover:text-background",
  )
  return external || href.endsWith(".pdf") ? (
    <a href={href} target="_blank" rel="noreferrer" className={cls}>
      {children}
      <ArrowUpRight className="size-3.5" />
    </a>
  ) : (
    <Link href={href} className={cls}>
      {children}
    </Link>
  )
}

function Links({ children }: { children: ReactNode }) {
  return <div className="mt-auto flex flex-wrap gap-2 pt-[4cqw]">{children}</div>
}

/** A hand-drawn line that sketches itself when its page opens. */
function Sketch({
  d,
  active,
  delay = 0,
  className,
  width = 1.6,
}: {
  d: string
  active?: boolean
  delay?: number
  className?: string
  width?: number
}) {
  const shared = {
    d,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: width,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className,
  }
  const transition = { duration: 1.4, delay, ease: [0.65, 0, 0.35, 1] as const }
  if (active === undefined) {
    return (
      <motion.path
        {...shared}
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={transition}
      />
    )
  }
  return <motion.path {...shared} initial={false} animate={{ pathLength: active ? 1 : 0 }} transition={transition} />
}

function Appear({
  active,
  delay = 0,
  children,
  className,
}: {
  active?: boolean
  delay?: number
  children: ReactNode
  className?: string
}) {
  const transition = { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as const }
  if (active === undefined) {
    return (
      <motion.div
        className={className}
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={transition}
      >
        {children}
      </motion.div>
    )
  }
  return (
    <motion.div
      className={className}
      initial={false}
      animate={{ opacity: active ? 1 : 0, y: active ? 0 : 10 }}
      transition={transition}
    >
      {children}
    </motion.div>
  )
}

function Decision({ children }: { children: ReactNode }) {
  return (
    <p className="font-serif text-[clamp(22px,7.4cqw,40px)] italic leading-[1.12] tracking-[-0.01em] text-foreground">
      {children}
    </p>
  )
}

/* ------------------------------------------------------------------ */
/* Pages                                                               */
/* ------------------------------------------------------------------ */

export function CoverPage({ goTo }: PageProps) {
  return (
    <button
      type="button"
      onClick={() => goTo(1)}
      data-cursor="Open"
      aria-label="Open the product notebook"
      className="group relative block h-full w-full overflow-hidden rounded-r-[6px] text-left"
    >
      <Sky seed={4} cover={0.65} drift={200} className="rounded-r-[6px]" />
      <div className="absolute inset-x-0 bottom-0 h-[24%] bg-gradient-to-t from-meadow/80 via-meadow/40 to-transparent" aria-hidden />
      <div className="relative flex h-full flex-col justify-between p-[8cqw] text-foreground">
        <div className="flex justify-between text-[clamp(10px,2.3cqw,12px)] text-foreground/70">
          <span>M Krishna</span>
          <span>Vol. 01</span>
        </div>
        <div className="pb-[22cqw]">
          <p className="font-serif text-[clamp(34px,12cqw,66px)] leading-[0.95] tracking-[-0.02em]">
            Product
            <br />
            Notebook
          </p>
          <p className="mt-[4cqw] max-w-[70%] text-[clamp(12px,3cqw,15px)] leading-snug text-foreground/75">
            Things I&apos;ve built, tested and learned along the way.
          </p>
        </div>
      </div>
      <span className="absolute inset-y-0 left-0 w-[3cqw] bg-gradient-to-r from-black/15 to-transparent" aria-hidden />
    </button>
  )
}

const contents: Array<{ title: string; page: number; spread: number }> = [
  { title: "Hello", page: 2, spread: 1 },
  { title: "Emoline", page: 3, spread: 2 },
  { title: "SuperKalam Reattempt", page: 5, spread: 3 },
  { title: "TalentXO Leads Management", page: 7, spread: 4 },
  { title: "Clearance", page: 9, spread: 5 },
  { title: "The building blocks", page: 11, spread: 6 },
]

export function ContentsPage({ goTo }: PageProps) {
  return (
    <Shell n={1}>
      <h3 className="font-serif text-[clamp(28px,10cqw,54px)] italic leading-none">Contents</h3>
      <ol className="mt-[8cqw] space-y-[3.6cqw]">
        {contents.map((item) => (
          <li key={item.title}>
            <button
              type="button"
              onClick={() => goTo(item.spread)}
              className={cn(body, "group flex w-full items-end gap-2 text-left text-foreground/80 hover:text-primary")}
            >
              <span className="transition-transform duration-300 group-hover:translate-x-1">{item.title}</span>
              <span className="leader" aria-hidden />
              <span className="tabular-nums text-foreground/50">{String(item.page).padStart(2, "0")}</span>
            </button>
          </li>
        ))}
      </ol>
      <p className={cn(small, "mt-auto text-foreground/55")}>
        Scroll to turn pages, use the arrows, or pick a chapter.
      </p>
    </Shell>
  )
}

export function HelloPage({ active }: PageProps) {
  const hillId = `hill-${useId().replace(/:/g, "")}`
  return (
    <Shell n={2}>
      <h3 className="font-serif text-[clamp(28px,10cqw,54px)] italic leading-none">Hi, I&apos;m Krishna.</h3>
      <div className={cn(body, "mt-[6cqw] space-y-[3.5cqw] text-foreground/80")}>
        <p>
          I studied computer science at LPU and now work in product operations at Airlearn, moving lessons
          from raw content through design, voiceover, QA and publishing across four teams.
        </p>
        <p>
          Outside work I take product ideas from a problem to a working prototype. This notebook holds four
          of them, with the decisions behind each.
        </p>
      </div>
      {/* A small flag planted on a dotted hill */}
      <svg viewBox="0 0 200 110" className="mt-auto w-full text-foreground" aria-hidden>
        <defs>
          <pattern id={hillId} width="5" height="5" patternUnits="userSpaceOnUse">
            <circle cx="2.5" cy="2.5" r="1.25" fill="var(--meadow)" />
          </pattern>
        </defs>
        <path d="M0 110 Q 100 52 200 110 Z" fill={`url(#${hillId})`} />
        <Sketch d="M100 77 L100 22" active={active} width={1.8} />
        <Sketch d="M100 24 L128 32 L100 41" active={active} delay={0.5} width={1.6} className="text-primary" />
      </svg>
    </Shell>
  )
}

export function EmolineText(_: PageProps) {
  return (
    <Shell n={3}>
      <Status>Shipped and live on Google Play</Status>
      <Title>Emoline</Title>
      <p className={cn(body, "mt-[3cqw] font-serif text-[clamp(15px,3.9cqw,20px)] italic text-foreground/80")}>
        One mood, one honest sentence, every day.
      </p>
      <Facts
        items={[
          ["Problem", "Traditional journaling asks too much at the moment people are trying to build a habit."],
          ["Decision", "Scoped V1 to one emotion plus one sentence, and kept AI and chat out to isolate the behaviour being tested."],
          ["Launch", "A 15-day closed test with 12 testers on Google Play, then the first production release."],
        ]}
      />
      <Links>
        <PageLink href="/case-study">Read the case study</PageLink>
        <PageLink href="https://play.google.com/store/apps/details?id=com.emoline.app&hl=en" external>
          Google Play
        </PageLink>
      </Links>
    </Shell>
  )
}

export function EmolineVisual({ active }: PageProps) {
  const [fan, setFan] = useState(false)
  return (
    <Shell n={4}>
      <div
        className="relative flex flex-1 items-center justify-center"
        onMouseEnter={() => setFan(true)}
        onMouseLeave={() => setFan(false)}
        onClick={() => setFan((v) => !v)}
        data-cursor="Fan out"
      >
        {[
          { src: "/emoline/emoline-03-daily-entry.png", alt: "Emoline daily entry screen", r: -7, x: -16 },
          { src: "/emoline/emoline-05-memory.png", alt: "Emoline saved memory screen", r: 6, x: 16 },
        ].map((shot, i) => (
          <motion.img
            key={shot.src}
            src={shot.src}
            alt={shot.alt}
            loading="lazy"
            className="absolute w-[42%] rounded-[3.2cqw] border border-foreground/15 bg-card shadow-[0_18px_40px_-14px_rgba(30,45,80,0.45)]"
            initial={false}
            animate={{
              rotate: active === false ? 0 : fan ? shot.r * 2 : shot.r,
              x: `${active === false ? 0 : fan ? shot.x * 2.6 : shot.x}cqw`,
              y: active === false ? 18 : fan ? -6 : 0,
              opacity: active === false ? 0 : 1,
            }}
            transition={{ type: "spring", stiffness: 160, damping: 20, delay: active ? i * 0.12 : 0 }}
          />
        ))}
      </div>
      <p className={cn(small, "text-center text-foreground/55")}>Daily entry and saved memory screens</p>
    </Shell>
  )
}

export function SuperKalamText(_: PageProps) {
  return (
    <Shell n={5}>
      <Status>Discovery and prototype</Status>
      <Title>SuperKalam Reattempt</Title>
      <Facts
        items={[
          ["Discovery", "Explored the app for three days and spoke with two UPSC aspirants about answer-writing practice."],
          ["Problem", "Learners got detailed AI feedback but had no loop to apply it, retry, or see whether they improved."],
          ["Decision", "A Reattempt flow: retry a low-scoring answer and compare it with the previous score and feedback."],
        ]}
      />
      <Links>
        <PageLink href="https://superkalam-reattempt.vercel.app/" external>
          Open prototype
        </PageLink>
        <PageLink href="/work#superkalam">Full write-up</PageLink>
      </Links>
    </Shell>
  )
}

export function SuperKalamVisual({ active }: PageProps) {
  return (
    <Shell n={6}>
      <Appear active={active}>
        <Decision>Turn feedback into another attempt.</Decision>
      </Appear>
      <div className="relative mt-auto">
        <svg viewBox="0 0 220 160" className="w-full text-foreground" aria-hidden>
          <Sketch active={active} delay={0.2} d="M110 22 C 168 22 196 58 190 88 C 184 124 146 142 110 140 C 66 138 30 118 30 82 C 30 50 60 24 104 22" />
          <Sketch active={active} delay={1.4} d="M98 14 L106 22 L97 30" className="text-primary" width={1.8} />
          <Sketch active={active} delay={1.1} d="M183 97 l7 9 l7 -9" className="text-primary" width={1.8} />
          <Sketch active={active} delay={1.25} d="M23 76 l7 -9 l7 9" className="text-primary" width={1.8} />
        </svg>
        {[
          ["Answer", "left-[44%] top-[2%]"],
          ["Feedback", "right-[0%] top-[44%]"],
          ["Retry", "left-[44%] bottom-[0%]"],
          ["Compare", "left-[0%] top-[44%]"],
        ].map(([label, pos], i) => (
          <Appear key={label} active={active} delay={0.5 + i * 0.25} className={cn("absolute", pos)}>
            <span className={cn(small, "rounded-full bg-[var(--paper)] px-2 py-0.5 text-foreground/75 ring-1 ring-foreground/15")}>
              {label}
            </span>
          </Appear>
        ))}
      </div>
    </Shell>
  )
}

export function TalentXOText(_: PageProps) {
  return (
    <Shell n={7}>
      <Status>PRD and prototype</Status>
      <Title>TalentXO Leads Management</Title>
      <Facts
        items={[
          ["Problem", "On a shared candidate database, recruiters could duplicate outreach while other leads went untouched."],
          ["Decisions", "Treat a lead as a candidate-job opportunity, not a candidate-wide lock. Require job-specific consent before submission. Keep history through reassignment."],
        ]}
      />
      <Links>
        <PageLink href="https://talentxo-leads-prototype.vercel.app/" external>
          Open prototype
        </PageLink>
        <PageLink href="/talentxo/TalentXO-Leads-Management-PRD.pdf">Read PRD</PageLink>
      </Links>
    </Shell>
  )
}

const leadSteps = ["Discover", "Claim", "Reach out", "Validate", "Submit or close"]

export function TalentXOVisual({ active }: PageProps) {
  return (
    <Shell n={8}>
      <Appear active={active}>
        <Decision>One accountable owner per opportunity.</Decision>
      </Appear>
      <ol className="relative mt-auto space-y-[3.4cqw] pl-[7cqw]">
        <svg className="absolute left-0 top-[1.2cqw] h-[calc(100%-2.4cqw)] w-[4cqw] text-foreground/40" viewBox="0 0 10 100" preserveAspectRatio="none" aria-hidden>
          <Sketch active={active} delay={0.2} d="M5 0 C 2 25, 8 50, 5 75 S 4 95, 5 100" width={1} />
        </svg>
        {leadSteps.map((step, i) => (
          <Appear key={step} active={active} delay={0.3 + i * 0.18}>
            <li className={cn(body, "relative flex items-center gap-3 text-foreground/80")}>
              <span className="absolute -left-[5.4cqw] size-[2.2cqw] min-h-2 min-w-2 rounded-full border border-foreground/40 bg-[var(--paper)]" />
              <span className="tabular-nums text-foreground/45">{i + 1}</span>
              {step}
            </li>
          </Appear>
        ))}
      </ol>
      <p className={cn(small, "mt-[4cqw] text-foreground/55")}>The lead lifecycle the PRD defines</p>
    </Shell>
  )
}

export function ClearanceText(_: PageProps) {
  return (
    <Shell n={9}>
      <Status>Working prototype</Status>
      <Title>Clearance</Title>
      <Facts
        items={[
          ["Problem", "Agent builders underestimate OAuth review gates and provider wait times, so launch plans are hard to trust."],
          ["Decision", "Separate hands-on work from provider waiting, give every step an owner, and show how strong each piece of evidence is."],
        ]}
      />
      <Links>
        <PageLink href="https://clearance-sigma-nine.vercel.app/" external>
          Open prototype
        </PageLink>
        <PageLink href="https://github.com/krishna2004-coder/clearance" external>
          Source
        </PageLink>
      </Links>
    </Shell>
  )
}

const checklist = ["Register the app", "Request scopes", "Wait on provider review", "Verify and go live"]

export function ClearanceVisual({ active }: PageProps) {
  return (
    <Shell n={10}>
      <Appear active={active}>
        <Decision>Make every approval step legible.</Decision>
      </Appear>
      <ul className="mt-auto space-y-[3.4cqw]">
        {checklist.map((item, i) => (
          <li key={item} className={cn(body, "flex items-center gap-3 text-foreground/80")}>
            <svg viewBox="0 0 24 24" className="size-[5cqw] min-h-4 min-w-4 shrink-0 text-foreground/50" aria-hidden>
              <rect x="3" y="3" width="18" height="18" rx="3" fill="none" stroke="currentColor" strokeWidth="1.4" />
              {i === 2 ? (
                <Sketch active={active} delay={0.4 + i * 0.35} d="M12 7 L12 12 L15.5 14" className="text-primary" width={1.8} />
              ) : (
                <Sketch active={active} delay={0.4 + i * 0.35} d="M7 12.5 L10.5 16 L17 8.5" className="text-primary" width={2} />
              )}
            </svg>
            {item}
          </li>
        ))}
      </ul>
      <p className={cn(small, "mt-[4cqw] text-foreground/55")}>An example checklist, with provider waiting kept separate</p>
    </Shell>
  )
}

export function BlocksLeft(_: PageProps) {
  return (
    <Shell n={11}>
      <h3 className="font-serif text-[clamp(30px,11cqw,58px)] italic leading-[1]">
        The building
        <br />
        blocks
      </h3>
      <span className="mt-[5cqw] block h-px w-10 bg-foreground/30" />
      <p className={cn(body, "mt-[5cqw] max-w-[80%] text-foreground/75")}>
        What I bring to a product team, in six parts. Pick one to see where it comes from.
      </p>
      <div className="relative -mx-[8cqw] -mb-[7cqw] mt-auto h-[38%] overflow-hidden">
        <Sky seed={21} cover={0.6} drift={260} className="!bg-none [mask-image:linear-gradient(to_bottom,transparent,black_45%)]" />
      </div>
    </Shell>
  )
}

const blocks: Array<{ name: string; detail: string; icon: ReactNode }> = [
  {
    name: "Discovery",
    detail: "I look at how people move through a flow and where small gaps break it, then talk to them.",
    icon: <path d="M10 10 m-6 0 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0 M14.5 14.5 L20 20" />,
  },
  {
    name: "PRDs and scoping",
    detail: "Problem, user need, scope and requirements written down before anything gets built.",
    icon: <path d="M6 3 h9 l4 4 v14 h-13 z M15 3 v4 h4 M9 11 h7 M9 14.5 h7 M9 18 h4" />,
  },
  {
    name: "Metrics",
    detail: "Activation, D1/D7/D30 retention, engagement and drop-off signals framed from day one.",
    icon: <path d="M4 20 h16 M7 16 v-4 M11 16 v-8 M15 16 v-6 M19 16 v-10" />,
  },
  {
    name: "Release readiness",
    detail: "At Airlearn I coordinate lessons through design, voiceover, QA and publishing across four teams.",
    icon: <path d="M5 12 l4 4 l10 -10 M5 19 h14" />,
  },
  {
    name: "AI evaluation",
    detail: "Red-teamed text-to-image models in Google's Adversarial Nibbler, one of about 150 picked from 7,000+ applicants.",
    icon: <path d="M12 3 l2.2 5.6 l5.8 0.6 l-4.4 3.9 l1.3 5.9 l-4.9 -3 l-4.9 3 l1.3 -5.9 l-4.4 -3.9 l5.8 -0.6 z" />,
  },
  {
    name: "Prototyping",
    detail: "I conceive and architect products, then use AI tools to build prototypes people can actually click through.",
    icon: <path d="M4 5 h16 v11 h-16 z M9 20 h6 M12 16 v4 M8 9 l-2 2 l2 2 M16 9 l2 2 l-2 2" />,
  },
]

export function BlocksRight({ active }: PageProps) {
  const [selected, setSelected] = useState(0)
  return (
    <Shell n={12}>
      <div className="grid grid-cols-3 gap-x-[3cqw] gap-y-[5cqw]">
        {blocks.map((b, i) => {
          const on = selected === i
          return (
            <button
              key={b.name}
              type="button"
              onClick={() => setSelected(i)}
              onMouseEnter={() => setSelected(i)}
              aria-pressed={on}
              className="group flex flex-col items-center gap-[2.4cqw] text-center"
            >
              <motion.span
                className={cn(
                  "relative flex aspect-square w-[60%] items-center justify-center rounded-full transition-colors",
                  on ? "bg-primary/12 text-primary" : "text-foreground/60 group-hover:text-foreground",
                )}
                initial={false}
                animate={{ scale: on ? 1.08 : 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 18 }}
              >
                <span
                  className="absolute inset-0 rounded-full opacity-60"
                  style={{
                    backgroundImage: "radial-gradient(circle at 1.5px 1.5px, currentColor 0.9px, transparent 1.3px)",
                    backgroundSize: "5px 5px",
                    maskImage: "radial-gradient(circle, black 30%, transparent 70%)",
                    WebkitMaskImage: "radial-gradient(circle, black 30%, transparent 70%)",
                  }}
                  aria-hidden
                />
                <svg viewBox="0 0 24 24" className="relative w-[46%]" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  {b.icon}
                </svg>
              </motion.span>
              <span className={cn(small, on ? "font-medium text-foreground" : "text-foreground/70")}>{b.name}</span>
            </button>
          )
        })}
      </div>
      <div className="mt-auto min-h-[22cqw] border-t border-foreground/15 pt-[4cqw]" aria-live="polite">
        <motion.p
          key={selected}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: active === false ? 0 : 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className={cn(body, "text-foreground/80")}
        >
          {blocks[selected].detail}
        </motion.p>
        <Link href="/about" className={cn(small, "mt-[3cqw] inline-block text-primary underline-offset-4 hover:underline")}>
          See all skills
        </Link>
      </div>
    </Shell>
  )
}

export function InsideBackPage(_: PageProps) {
  return <Shell />
}

export const pages = [
  CoverPage,
  ContentsPage,
  HelloPage,
  EmolineText,
  EmolineVisual,
  SuperKalamText,
  SuperKalamVisual,
  TalentXOText,
  TalentXOVisual,
  ClearanceText,
  ClearanceVisual,
  BlocksLeft,
  BlocksRight,
  InsideBackPage,
]
