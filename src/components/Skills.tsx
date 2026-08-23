import { content } from '../data/content'
import { homepageSkills } from '../data/skills'
import { RouteLink } from '../lib/router'
import { Icon } from './Icon'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'
import { ToolOrbit } from './ToolOrbit'

export function Skills() {
  const section = content.sections.skills

  return (
    <section id="skills" className="border-b border-border" aria-labelledby="skills-heading">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[minmax(14rem,0.55fr)_minmax(0,1.45fr)] lg:gap-16 lg:py-24">
        <Reveal>
          <div className="lg:sticky lg:top-28">
            <SectionHeading id="skills-heading" eyebrow={section.eyebrow} title={section.title} description={section.description} />
            <p className="max-w-sm text-sm leading-6 text-muted-foreground">{section.detail}</p>
            <RouteLink href="/skills" className="interactive-control button-secondary group mt-6 inline-flex min-h-11 items-center gap-2 rounded-card border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground">
              View full toolkit
              <Icon name="arrow" className="button-arrow size-4 group-hover:translate-x-0.5" />
            </RouteLink>
          </div>
        </Reveal>
        <Reveal delay={0.16}>
          <ToolOrbit items={homepageSkills} />
        </Reveal>
      </div>
    </section>
  )
}
