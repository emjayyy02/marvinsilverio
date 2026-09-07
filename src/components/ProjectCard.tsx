import type { Project, ProjectLink } from '../data/projects'
import { RouteLink } from '../lib/router'
import { Icon } from './Icon'
import { TechLogoList } from './TechLogoList'

export function ProjectCard({ project, archive = false }: { project: Project; archive?: boolean }) {
  const Heading = archive ? 'h2' : 'h3'
  const preview = project.previewImage
  const links = project.links ?? []
  const hasActions = links.length > 0

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

        <div className={hasActions ? 'mt-auto py-6' : 'mt-auto pt-6'}>
          <TechLogoList technologies={project.cardTechnologies} label={`${project.title} representative technologies`} compact />
        </div>

        {hasActions && (
          <div className="flex flex-col gap-3 border-t border-border pt-5 sm:flex-row">
            {links.map((link) => <ProjectCardAction key={`${link.label}-${link.href}`} link={link} />)}
          </div>
        )}
      </div>
    </article>
  )
}

function ProjectCardAction({ link }: { link: ProjectLink }) {
  const isPrimary = link.type === 'primary'
  const className = `interactive-control ${isPrimary ? 'button-primary bg-primary text-primary-foreground' : 'button-secondary group border border-border bg-background text-foreground'} inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-card px-4 py-2.5 text-center text-sm font-medium`
  const content = (
    <>
      {link.label}
      {!isPrimary && <Icon name="arrow" className="button-arrow size-4 group-hover:translate-x-0.5" />}
    </>
  )

  return link.href.startsWith('http') ? (
    <a href={link.href} target="_blank" rel="noreferrer" className={className}>{content}</a>
  ) : (
    <RouteLink href={link.href} className={className}>{content}</RouteLink>
  )
}
