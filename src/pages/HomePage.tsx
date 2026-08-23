import { Certifications } from '../components/Certifications'
import { Contact } from '../components/Contact'
import { Education } from '../components/Education'
import { FeaturedBuild } from '../components/FeaturedBuild'
import { Hero } from '../components/Hero'
import { Projects } from '../components/Projects'
import { Skills } from '../components/Skills'
import { content } from '../data/content'

export function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedBuild />
      <Projects />
      <Skills />
      {content.certifications.length > 0 && <Certifications />}
      <Education />
      <Contact />
    </>
  )
}
