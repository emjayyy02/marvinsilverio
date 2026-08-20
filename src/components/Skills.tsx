import { content } from '../data/content'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'
import { ToolOrbit } from './ToolOrbit'

export function Skills() {
  const orbitItems = content.skills.flatMap((group) => group.items.map((item) => ({
    id: `${group.title}-${item.label}`,
    label: item.label,
    group: group.title,
    icon: item.icon,
  })))

  return (
    <section id="skills" className="border-b border-border" aria-labelledby="skills-heading">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[minmax(14rem,0.55fr)_minmax(0,1.45fr)] lg:gap-16 lg:py-24">
        <Reveal>
          <div className="lg:sticky lg:top-28">
            <SectionHeading id="skills-heading" eyebrow="03 / Tools & skills" title="A toolkit in motion." description="Drag the globe to explore the same focused set of tools for interfaces, workflows, and everyday operations." />
            <p className="max-w-sm text-sm leading-6 text-muted-foreground">The cluster moves only when you move it. A release carries brief, damped momentum and then comes fully to rest.</p>
          </div>
        </Reveal>
        <Reveal delay={0.16}>
          <ToolOrbit items={orbitItems} />
        </Reveal>
      </div>
    </section>
  )
}
