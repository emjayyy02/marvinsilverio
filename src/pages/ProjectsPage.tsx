import { useEffect } from 'react'
import { Icon } from '../components/Icon'
import { ProjectCard } from '../components/ProjectCard'
import { Reveal } from '../components/Reveal'
import { projects } from '../data/projects'
import { RouteLink, useRouter } from '../lib/router'

const PROJECTS_PER_PAGE = 4

type PaginationItem = number | 'ellipsis'

function getPaginationItems(pageCount: number, currentPage: number): PaginationItem[] {
  if (pageCount <= 7) return Array.from({ length: pageCount }, (_, index) => index + 1)

  const visiblePages = new Set([1, pageCount, currentPage - 1, currentPage, currentPage + 1])
  if (currentPage <= 3) [2, 3, 4].forEach((page) => visiblePages.add(page))
  if (currentPage >= pageCount - 2) [pageCount - 3, pageCount - 2, pageCount - 1].forEach((page) => visiblePages.add(page))

  const pages = [...visiblePages].filter((page) => page >= 1 && page <= pageCount).sort((left, right) => left - right)
  return pages.flatMap((page, index) => index > 0 && page - pages[index - 1] > 1 ? ['ellipsis', page] : [page])
}

export function ProjectsPage() {
  const { location, navigate } = useRouter()
  const pageCount = Math.max(1, Math.ceil(projects.length / PROJECTS_PER_PAGE))
  const rawPage = new URLSearchParams(location.search).get('page')
  const parsedPage = rawPage && /^\d+$/.test(rawPage) ? Number(rawPage) : 1
  const currentPage = Number.isSafeInteger(parsedPage) ? Math.min(pageCount, Math.max(1, parsedPage)) : 1
  const shouldNormalize = rawPage !== null && rawPage !== String(currentPage)
  const pageStart = (currentPage - 1) * PROJECTS_PER_PAGE
  const visibleProjects = projects.slice(pageStart, pageStart + PROJECTS_PER_PAGE)
  const paginationItems = getPaginationItems(pageCount, currentPage)

  useEffect(() => {
    if (shouldNormalize) navigate(`/projects?page=${currentPage}`, { replace: true })
  }, [currentPage, navigate, shouldNormalize])

  return (
    <>
      <header className="hero-grid border-b border-border">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20 lg:py-24">
          <p className="section-kicker font-mono text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">Projects / Archive</p>
          <h1 id="route-heading" tabIndex={-1} className="mt-4 max-w-4xl text-4xl font-medium tracking-[-0.04em] text-foreground sm:text-6xl">Things I&apos;ve built.</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">Automation systems and frontend projects, documented with the decisions, reliability work, and lessons that shaped them.</p>
          <RouteLink href="/" className="interactive-control button-secondary group mt-8 inline-flex min-h-11 items-center gap-2 rounded-card border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground">
            <Icon name="arrowLeft" className="button-arrow size-4 group-hover:-translate-x-0.5" />
            Back to Home
          </RouteLink>
        </div>
      </header>

      <section className="border-b border-border bg-surface" aria-labelledby="archive-heading">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20 lg:py-24">
          <div className="mb-10 max-w-2xl">
            <h2 id="archive-heading" tabIndex={-1} className="scroll-mt-24 text-3xl font-medium tracking-[-0.04em] text-foreground sm:text-4xl">Project archive</h2>
            <p className="mt-3 text-base leading-7 text-muted-foreground">Primary projects include focused case studies and source repositories.</p>
          </div>
          <div className="grid items-stretch gap-4 md:grid-cols-2">
            {visibleProjects.map((project, index) => (
              <Reveal key={project.slug} delay={index * 0.08} className="h-full">
                <ProjectCard project={project} archive />
              </Reveal>
            ))}
          </div>

          {pageCount > 1 && (
            <nav className="mt-10 border-t border-border pt-6 sm:mt-12" aria-label="Project archive pagination">
              <p className="sr-only">Page {currentPage} of {pageCount}</p>
              <div className="mr-14 flex flex-wrap items-center justify-center gap-2 sm:mr-0">
                {currentPage > 1 ? (
                  <RouteLink
                    href={`/projects?page=${currentPage - 1}`}
                    aria-label={`Previous project page, page ${currentPage - 1}`}
                    className="interactive-control button-secondary inline-flex min-h-11 items-center justify-center rounded-card border border-border bg-background px-3.5 text-sm font-medium text-foreground"
                  >
                    <Icon name="arrowLeft" className="size-4 sm:mr-1.5" />
                    <span className="sr-only sm:not-sr-only">Previous</span>
                  </RouteLink>
                ) : (
                  <span aria-disabled="true" className="inline-flex min-h-11 items-center justify-center rounded-card border border-border px-3.5 text-sm font-medium text-muted-foreground opacity-50">
                    <Icon name="arrowLeft" className="size-4 sm:mr-1.5" />
                    <span className="sr-only sm:not-sr-only">Previous</span>
                  </span>
                )}

                <ol className="flex flex-wrap items-center justify-center gap-2">
                  {paginationItems.map((item, index) => item === 'ellipsis' ? (
                    <li key={`ellipsis-${index}`} aria-hidden="true" className="inline-flex size-11 items-center justify-center text-muted-foreground">…</li>
                  ) : (
                    <li key={item}>
                      <RouteLink
                        href={`/projects?page=${item}`}
                        aria-label={`Project archive page ${item}`}
                        aria-current={item === currentPage ? 'page' : undefined}
                        className={`interactive-control ${item === currentPage ? 'button-primary border-primary bg-primary text-primary-foreground' : 'button-secondary border-border bg-background text-foreground'} inline-flex size-11 items-center justify-center rounded-card border text-sm font-medium`}
                      >
                        {item}
                      </RouteLink>
                    </li>
                  ))}
                </ol>

                {currentPage < pageCount ? (
                  <RouteLink
                    href={`/projects?page=${currentPage + 1}`}
                    aria-label={`Next project page, page ${currentPage + 1}`}
                    className="interactive-control button-secondary inline-flex min-h-11 items-center justify-center rounded-card border border-border bg-background px-3.5 text-sm font-medium text-foreground"
                  >
                    <span className="sr-only sm:not-sr-only">Next</span>
                    <Icon name="arrow" className="size-4 sm:ml-1.5" />
                  </RouteLink>
                ) : (
                  <span aria-disabled="true" className="inline-flex min-h-11 items-center justify-center rounded-card border border-border px-3.5 text-sm font-medium text-muted-foreground opacity-50">
                    <span className="sr-only sm:not-sr-only">Next</span>
                    <Icon name="arrow" className="size-4 sm:ml-1.5" />
                  </span>
                )}
              </div>
            </nav>
          )}
        </div>
      </section>
    </>
  )
}
