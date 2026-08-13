import { content } from '../data/content'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'

export function Projects() {
  return (
    <section id="projects" className="border-b border-border bg-surface" aria-labelledby="projects-heading">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[minmax(14rem,0.55fr)_minmax(0,1.45fr)] lg:gap-16 lg:py-24">
        <Reveal>
          <div className="lg:sticky lg:top-28">
            <SectionHeading id="projects-heading" eyebrow="01 / Featured build" title="The portfolio is the case study." description="A transparent look at the problem, the rebuild, and what this project is teaching me." />
            <p className="max-w-sm border-l-2 border-foreground pl-4 text-sm leading-6 text-muted-foreground">The proof is this page: every decision below is being checked in the rendered experience, not inferred from source code.</p>
          </div>
        </Reveal>
        <div>
          {content.projects.map((project, index) => (
            <Reveal key={project.title} delay={0.18 + index * 0.1}>
              <article className="border-y-2 border-foreground py-7 sm:py-9">
                <div className="flex flex-col items-start gap-5 sm:flex-row sm:justify-between">
                  <div>
                    <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground">Field note / 001</p>
                    <h3 className="mt-2 text-3xl font-medium tracking-[-0.04em] text-foreground sm:text-4xl">{project.title}</h3>
                  </div>
                  <span className="w-fit shrink-0 border border-border bg-muted px-2.5 py-1.5 font-mono text-[0.65rem] uppercase tracking-[0.1em] text-muted-foreground">{project.status}</span>
                </div>
                <p className="mt-6 max-w-3xl text-xl leading-8 text-foreground sm:text-2xl sm:leading-9">{project.description}</p>
                <figure className="mt-9">
                  <div className="overflow-hidden border border-border bg-muted p-1.5">
                    <img src={project.imageSrc} alt={project.imageAlt} width="1425" height="549" loading="lazy" className="block h-auto w-full border border-border" />
                  </div>
                  <figcaption className="mt-3 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-muted-foreground">{project.imageCaption}</figcaption>
                </figure>
                <dl className="mt-9 grid border-t border-border md:grid-cols-2">
                  {project.details.map((detail, detailIndex) => (
                    <div key={detail.label} className={`border-b border-border py-6 md:py-7 ${detailIndex % 2 === 0 ? 'md:pr-7' : 'md:border-l md:pl-7'}`}>
                      <dt className="font-mono text-xs font-medium uppercase tracking-[0.1em] text-muted-foreground">{detail.label}</dt>
                      <dd className="mt-3 leading-7 text-foreground">{detail.body}</dd>
                    </div>
                  ))}
                </dl>
                <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2" aria-label="Project technologies">
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
