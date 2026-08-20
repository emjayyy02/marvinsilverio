import { content } from '../data/content'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'

export function Projects() {
  return (
    <section id="projects" className="border-b border-border bg-surface" aria-labelledby="projects-heading">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[minmax(14rem,0.55fr)_minmax(0,1.45fr)] lg:gap-16 lg:py-24">
        <Reveal>
          <SectionHeading id="projects-heading" eyebrow="04 / Projects" title="More work, kept simple for now." description="Clean placeholders hold the structure without inventing project claims before the details are ready." />
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2">
          {content.projects.map((project, index) => (
            <Reveal key={project.title} delay={0.18 + index * 0.1}>
              <article className="flex min-h-44 flex-col rounded-card border border-border bg-background p-6 sm:p-7">
                <p className="font-mono text-[0.64rem] uppercase tracking-[0.12em] text-muted-foreground">{project.status}</p>
                <h3 className="mt-4 text-2xl font-medium tracking-[-0.03em] text-foreground">{project.title}</h3>
                <ul className="mt-auto flex flex-wrap gap-x-4 gap-y-2 pt-7" aria-label={`${project.title} tags`}>
                  {project.tags.map((tag) => <li key={tag} className="pixel-tag font-mono text-xs text-muted-foreground">{tag}</li>)}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
