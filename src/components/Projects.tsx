import { content } from '../data/content'
import { selectedProjects } from '../data/projects'
import { RouteLink } from '../lib/router'
import { Icon } from './Icon'
import { ProjectCard } from './ProjectCard'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'

export function Projects() {
  const section = content.sections.projects

  return (
    <section id="projects" className="border-b border-border bg-surface" aria-labelledby="projects-heading">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20 lg:py-24">
        <Reveal className="max-w-2xl">
          <SectionHeading id="projects-heading" eyebrow={section.eyebrow} title={section.title} description={section.description} />
          <RouteLink
            href="/projects"
            className="interactive-control button-secondary group inline-flex min-h-11 items-center gap-2 rounded-card border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground"
          >
            View all projects
            <Icon name="arrow" className="button-arrow size-4 group-hover:translate-x-0.5" />
          </RouteLink>
        </Reveal>

        <div className="mt-10 grid items-stretch gap-4 sm:mt-12 md:grid-cols-2">
          {selectedProjects.map((project, index) => (
            <Reveal key={project.slug} delay={0.18 + index * 0.1} className="h-full">
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
