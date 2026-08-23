import { Icon } from '../components/Icon'
import { Reveal } from '../components/Reveal'
import { ScrollToTop } from '../components/ScrollToTop'
import { TechLogoList } from '../components/TechLogoList'
import type { CaseStudySection, Project, ProjectScreenshot } from '../data/projects'
import { RouteLink } from '../lib/router'

export function ProjectPage({ project }: { project: Project }) {
  return (
    <>
      <header className="hero-grid border-b border-border">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20 lg:py-24">
          <RouteLink href="/projects" className="interactive-control button-secondary group inline-flex min-h-11 items-center gap-2 rounded-card text-sm font-medium text-muted-foreground hover:text-foreground">
            <Icon name="arrowLeft" className="button-arrow size-4 group-hover:-translate-x-0.5" />
            Back to Projects
          </RouteLink>

          <div className="mt-8 grid gap-7 lg:grid-cols-[minmax(0,1.45fr)_minmax(16rem,0.55fr)] lg:items-end lg:gap-16">
            <div>
              <p className="section-kicker font-mono text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">Project {project.number} / {project.type}</p>
              <h1 id="route-heading" tabIndex={-1} className="mt-4 max-w-4xl text-4xl font-medium tracking-[-0.04em] text-foreground sm:text-6xl">{project.title}</h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground sm:text-xl">{project.description}</p>
            </div>
            <div className="border-t border-border pt-5 lg:border-t-0 lg:pt-0">
              {project.status && <p className="mb-4 font-mono text-[0.64rem] uppercase tracking-[0.12em] text-muted-foreground">{project.status}</p>}
              <a href={project.sourceUrl} target="_blank" rel="noreferrer" className="interactive-control button-primary group inline-flex min-h-11 items-center gap-2 rounded-card bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground">
                View Source
                <Icon name="arrow" className="button-arrow size-4 group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>
        </div>
      </header>

      <section className="border-b border-border bg-surface" aria-label={`${project.title} primary evidence`}>
        <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-14 lg:py-16">
          <ProjectFigure screenshot={project.heroScreenshot} priority />
        </div>
      </section>

      <article className="border-b border-border bg-background">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20 lg:py-24">
          {project.caseStudy.sections.map((section, index) => (
            <Reveal key={section.id} delay={index === 0 ? 0 : 0.04}>
              <CaseStudySectionView section={section} first={index === 0} />
            </Reveal>
          ))}
        </div>
      </article>

      <section className="border-b border-border bg-surface" aria-labelledby="technology-stack-heading">
        <div className="mx-auto grid max-w-6xl gap-7 px-5 py-14 sm:px-8 sm:py-16 lg:grid-cols-[minmax(13rem,0.38fr)_minmax(0,1fr)] lg:gap-20 lg:py-20">
          <h2 id="technology-stack-heading" className="text-3xl font-medium tracking-[-0.04em] text-foreground">Technology stack</h2>
          <div>
            <p className="mb-6 max-w-2xl text-base leading-7 text-muted-foreground">The complete set of technologies used by this project.</p>
            <TechLogoList technologies={project.technologies} label={`${project.title} technology stack`} />
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-background" aria-labelledby="takeaways-heading">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[minmax(13rem,0.38fr)_minmax(0,1fr)] lg:gap-20 lg:py-24">
          <h2 id="takeaways-heading" className="text-3xl font-medium tracking-[-0.04em] text-foreground">Key takeaways</h2>
          <div>
            <ul className="grid gap-0 border-t border-border">
              {project.caseStudy.takeaways.map((takeaway) => (
                <li key={takeaway} className="border-b border-border py-4 text-base leading-7 text-foreground">{takeaway}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <ScrollToTop />
    </>
  )
}

function CaseStudySectionView({ section, first }: { section: CaseStudySection; first: boolean }) {
  const evidenceClass = section.evidenceLayout === 'paired'
    ? 'grid gap-5 lg:grid-cols-2'
    : section.evidenceLayout === 'medium'
      ? 'grid max-w-4xl gap-5'
      : 'grid gap-5'

  return (
    <section id={section.id} aria-labelledby={`${section.id}-heading`} className={`${first ? '' : 'mt-16 border-t border-border pt-16'} scroll-mt-24`}>
      <div className="max-w-[46rem]">
        <h2 id={`${section.id}-heading`} className="text-2xl font-medium tracking-[-0.03em] text-foreground sm:text-3xl">{section.title}</h2>
        <div className="mt-5 space-y-4 text-base leading-7 text-muted-foreground">
          {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
        {section.points && (
          <ul className="mt-7 grid gap-3 border-t border-border pt-5 text-sm leading-6 text-foreground sm:grid-cols-2">
            {section.points.map((point) => <li key={point} className="pixel-tag items-start">{point}</li>)}
          </ul>
        )}
      </div>
      {section.screenshots && (
        <div className={`${evidenceClass} mt-9`}>
          {section.screenshots.map((screenshot) => <ProjectFigure key={screenshot.src} screenshot={screenshot} />)}
        </div>
      )}
    </section>
  )
}

function ProjectFigure({ screenshot, priority = false }: { screenshot: ProjectScreenshot; priority?: boolean }) {
  return (
    <figure className="overflow-hidden rounded-card border border-border bg-background shadow-card">
      <div className="flex justify-center bg-muted p-2 sm:p-3">
        <img
          src={screenshot.src}
          alt={screenshot.alt}
          width={screenshot.width}
          height={screenshot.height}
          loading={priority ? 'eager' : 'lazy'}
          style={{ maxWidth: `${screenshot.width}px` }}
          className="h-auto w-full rounded-[calc(var(--radius)-2px)] border border-border object-contain"
        />
      </div>
      <figcaption className="border-t border-border px-4 py-3 text-sm leading-6 text-muted-foreground sm:px-5">{screenshot.caption}</figcaption>
    </figure>
  )
}
