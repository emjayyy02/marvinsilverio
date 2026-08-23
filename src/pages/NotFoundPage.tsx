import { Icon } from '../components/Icon'
import { RouteLink } from '../lib/router'

export function NotFoundPage() {
  return (
    <section className="hero-grid min-h-[calc(100vh-8rem)] border-b border-border">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 lg:py-32">
        <p className="section-kicker font-mono text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">404 / Not found</p>
        <h1 id="route-heading" tabIndex={-1} className="mt-4 text-4xl font-medium tracking-[-0.04em] text-foreground sm:text-6xl">This page is not in the archive.</h1>
        <p className="mt-5 max-w-xl text-lg leading-8 text-muted-foreground">Return to the project archive or the portfolio home page.</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <RouteLink href="/projects" className="interactive-control button-primary inline-flex min-h-11 items-center justify-center rounded-card bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground">View Projects</RouteLink>
          <RouteLink href="/" className="interactive-control button-secondary group inline-flex min-h-11 items-center justify-center gap-2 rounded-card border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground">
            <Icon name="arrowLeft" className="button-arrow size-4 group-hover:-translate-x-0.5" />
            Back Home
          </RouteLink>
        </div>
      </div>
    </section>
  )
}
