import { content } from '../data/content'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'

export function Certifications() {
  return (
    <section id="certifications" className="border-b border-border" aria-labelledby="certifications-heading">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[minmax(14rem,0.55fr)_minmax(0,1.45fr)] lg:gap-16 lg:py-24">
        <Reveal>
          <SectionHeading
            id="certifications-heading"
            eyebrow="05 / Certifications"
            title="Credentials, listed plainly."
            description="A direct record of learning credentials without ratings, progress bars, or decorative badges."
          />
        </Reveal>
        <Reveal delay={0.16}>
          <ul className="border-y border-border" aria-label="Certifications">
            {content.certifications.map((certification, index) => (
              <li key={certification.name} className={`flex flex-col gap-2 py-6 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8 sm:py-7 ${index > 0 ? 'border-t border-border' : ''}`}>
                <span className="text-xl font-medium tracking-[-0.03em] text-foreground sm:text-2xl">{certification.name}</span>
                <span className="shrink-0 font-mono text-xs uppercase tracking-[0.1em] text-muted-foreground">{certification.issuer}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
