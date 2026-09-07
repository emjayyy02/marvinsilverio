import { content } from '../data/content'
import { featuredProject } from '../data/projects'
import { RouteLink } from '../lib/router'
import { Icon } from './Icon'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'
import { TechLogoList } from './TechLogoList'

export function FeaturedBuild() {
  const project = featuredProject
  const preview = project.heroScreenshot
  const section = content.sections.featuredBuild

  return (
    <section id="featured-build" className="border-b border-border bg-surface" aria-labelledby="featured-build-heading">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20 lg:py-24">
        <Reveal>
          <SectionHeading
            id="featured-build-heading"
            eyebrow={section.eyebrow}
            title={section.title}
            description={section.description}
          />
        </Reveal>

        <Reveal delay={0.16}>
          <article className="overflow-hidden rounded-card border border-border bg-background shadow-card">
            <div className="grid lg:grid-cols-[minmax(0,1.35fr)_minmax(20rem,0.8fr)]">
              <div className="border-b border-border p-4 sm:p-6 lg:border-b-0 lg:border-r lg:p-7">
                <div className="relative aspect-[2/1] overflow-hidden rounded-card border border-border bg-muted p-1.5">
                  <img
                    src={preview.src}
                    alt={preview.alt}
                    width={preview.width}
                    height={preview.height}
                    loading="lazy"
                    className="h-full w-full rounded-[calc(var(--radius)-2px)] border border-border object-contain object-center"
                  />
                  <span className="absolute left-3 top-3 rounded-card border border-border bg-background/90 px-2 py-1 font-mono text-[0.6rem] uppercase tracking-[0.1em] text-muted-foreground backdrop-blur-sm">Build preview</span>
                </div>
              </div>

              <div className="flex min-w-0 flex-col p-6 sm:p-8">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted-foreground">Spotlight / 001</p>
                  {project.status && <span className="rounded-card border border-border bg-muted px-2.5 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.1em] text-muted-foreground">{project.status}</span>}
                </div>
                <h3 className="mt-5 text-3xl font-medium tracking-[-0.04em] text-foreground sm:text-4xl">{project.title}</h3>
                <p className="mt-4 max-w-[34rem] text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">{project.description}</p>
                <p className="mt-3 max-w-[34rem] font-mono text-xs leading-5 text-muted-foreground" aria-label="Workflow architecture">
                  {section.architecture}
                </p>
                <div className="mt-6">
                  <TechLogoList technologies={project.cardTechnologies} label="Featured build representative technologies" compact />
                </div>

                <div className="mt-8 flex flex-col gap-3 border-t border-border pt-5 sm:flex-row">
                  <RouteLink
                    href={`/projects/${project.slug}`}
                    className="interactive-control button-primary inline-flex min-h-11 items-center justify-center rounded-card bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground"
                  >
                    View Case Study
                  </RouteLink>
                  <a
                    href={project.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="interactive-control button-secondary group inline-flex min-h-11 items-center justify-center gap-2 rounded-card border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground"
                  >
                    View Source
                    <Icon name="arrow" className="button-arrow size-4 group-hover:translate-x-0.5" />
                  </a>
                </div>
              </div>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  )
}
