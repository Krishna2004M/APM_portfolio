import { AboutHero } from "@/components/about/about-hero"
import { CardStack } from "@/components/about/card-stack"
import { SkillConstellation } from "@/components/about/skill-constellation"
import { ContactPanel } from "@/components/about/contact-panel"

export const metadata = {
  title: "Skills and Contact, M Krishna",
  description: "How M Krishna works as a product person, the skills he works with, and how to get in touch.",
}

export default function AboutPage() {
  return (
    <main className="overflow-x-clip">
      <AboutHero />
      <CardStack />
      <SkillConstellation />
      <ContactPanel />
    </main>
  )
}
