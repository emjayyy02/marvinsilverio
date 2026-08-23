import type { Project } from '../data/projects'
import { RouteLink } from '../lib/router'
import { Icon } from './Icon'
import { TechLogoList } from './TechLogoList'

export function ProjectCard({ project, archive = false }: { project: Project; archive?: boolean }) {
  const Heading = archive ? 'h2' : 'h3'
  const preview = project.previewImage

  return (
    <article className="flex h-full min-w-0 flex-col overflow-hidden rounded-card border border-border bg-background">
      <figure className="aspect-[16/9] border-b border-border bg-muted p-2.5 sm:p-3">
        <img
          src={preview.src}
          alt={preview.alt}
          width={preview.width}
          height={preview.height}
          loading="lazy"
          decoding="async"
          className="size-full object-contain"
        />
      </figure>

      <div className={`flex flex-1 flex-col ${archive ? 'p-6 sm:p-7' : 'p-5 sm:p-6'}`}>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <p className="font-mono text-[0.64rem] uppercase tracking-[0.12em] text-muted-foreground">Project {project.number} / {project.type}</p>
          {project.status && <span className="font-mono text-[0.6rem] uppercase tracking-[0.1em] text-muted-foreground">{project.status}</span>}
        </div>

        <Heading className={`${archive ? 'text-2xl sm:text-3xl' : 'text-2xl'} mt-4 font-medium tracking-[-0.03em] text-foreground`}>
          {project.title}
        </Heading>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">{project.summary}</p>

        <div className="py-6">
          <TechLogoList technologies={project.cardTechnologies} label={`${project.title} representative technologies`} compact />
        </div>

        <div className="mt-auto flex flex-col gap-3 border-t border-border pt-5 sm:flex-row">
          <RouteLink
            href={`/projects/${project.slug}`}
            className="interactive-control button-primary inline-flex min-h-11 flex-1 items-center justify-center rounded-card bg-primary px-4 py-2.5 text-center text-sm font-medium text-primary-foreground"
          >
            View Case Study
          </RouteLink>
          <a
            href={project.sourceUrl}
            target="_blank"
            rel="noreferrer"
            className="interactive-control button-secondary group inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-card border border-border bg-background px-4 py-2.5 text-center text-sm font-medium text-foreground"
          >
            View Source
            <Icon name="arrow" className="button-arrow size-4 group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
    </article>
  )
}
