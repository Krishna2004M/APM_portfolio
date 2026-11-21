import { Hero } from "@/components/home/hero"
import { Manifesto } from "@/components/home/manifesto"
import { Notebook } from "@/components/home/notebook"
import { Experience } from "@/components/home/experience"
import { Contact } from "@/components/home/contact"

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Manifesto />
      <Notebook />
      <Experience />
      <Contact />
    </main>
  )
}
