import { content } from '../data/content'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'

export function Skills() {
  return (
    <section id="skills" className="border-b border-border" aria-labelledby="skills-heading">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[minmax(14rem,0.55fr)_minmax(0,1.45fr)] lg:gap-16 lg:py-24">
        <Reveal><SectionHeading id="skills-heading" eyebrow="02 / Tools & skills" title="A practical toolkit." description="A focused set of tools for building interfaces, connecting workflows, and keeping everyday operations moving." /></Reveal>
        <div className="border-y border-border">
          {content.skills.map((group, index) => (
            <Reveal key={group.title} delay={0.18 + index * 0.1}>
              <article className={`grid gap-5 py-6 sm:grid-cols-[9rem_1fr] sm:items-start ${index > 0 ? 'border-t border-border' : ''}`}>
                <h3 className="font-mono text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">0{index + 1} / {group.title}</h3>
                <ul className="flex flex-wrap gap-x-5 gap-y-3" aria-label={`${group.title} skills`}>
                  {group.items.map((item) => <li key={item} className="pixel-tag text-base font-medium text-foreground">{item}</li>)}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
