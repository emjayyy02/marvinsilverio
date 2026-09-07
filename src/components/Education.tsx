import { content } from '../data/content'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'

export function Education() {
  const section = content.sections.education
  const education = content.education

  return (
    <section id="education" className="border-b border-border" aria-labelledby="education-heading">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-14 sm:px-8 sm:py-16 lg:grid-cols-[minmax(14rem,0.55fr)_minmax(0,1.45fr)] lg:gap-14 lg:py-20">
        <Reveal>
          <SectionHeading id="education-heading" eyebrow={section.eyebrow} title={section.title} />
        </Reveal>

        <Reveal delay={0.16}>
          <article className="grid gap-5 border-y border-border py-6 sm:grid-cols-[8.5rem_minmax(0,1fr)] sm:gap-8 sm:py-7">
            <p className="font-mono text-xs font-medium uppercase tracking-[0.1em] text-muted-foreground">
              {education.period}
            </p>
            <div>
              <h3 className="text-xl font-medium tracking-[-0.03em] text-foreground sm:text-2xl">
                {education.degree}
              </h3>
              <p className="mt-3 text-base leading-7 text-foreground">{education.school}</p>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">{education.location}</p>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  )
}
