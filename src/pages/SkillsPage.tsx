import { Icon } from '../components/Icon'
import { Reveal } from '../components/Reveal'
import { ToolIcon } from '../components/ToolIcon'
import { currentSkillCategories } from '../data/skills'
import { RouteLink } from '../lib/router'

export function SkillsPage() {
  return (
    <>
      <header className="hero-grid border-b border-border">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20 lg:py-24">
          <p className="section-kicker font-mono text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">Skills / Capabilities</p>
          <h1 id="route-heading" tabIndex={-1} className="mt-4 max-w-4xl text-4xl font-medium tracking-[-0.04em] text-foreground sm:text-6xl">Tools I&apos;ve worked with.</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">A growing toolkit across frontend development, automation, AI-assisted workflows, APIs, and business operations.</p>
          <RouteLink href="/" className="interactive-control button-secondary group mt-8 inline-flex min-h-11 items-center gap-2 rounded-card border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground">
            <Icon name="arrowLeft" className="button-arrow size-4 group-hover:-translate-x-0.5" />
            Back to Home
          </RouteLink>
        </div>
      </header>

      <section className="border-b border-border bg-surface" aria-label="Current skills and capabilities">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20 lg:py-24">
          {currentSkillCategories.map((category, categoryIndex) => (
            <Reveal key={category.id} delay={Math.min(categoryIndex * 0.05, 0.2)}>
              <section className="grid gap-6 border-t border-border py-8 lg:grid-cols-[minmax(12rem,0.42fr)_minmax(0,1fr)] lg:gap-12" aria-labelledby={`${category.id}-heading`}>
                <div>
                  <h2 id={`${category.id}-heading`} className="max-w-xs text-xl font-medium tracking-[-0.03em] text-foreground sm:text-2xl">{category.title}</h2>
                </div>
                <ul className="grid gap-x-8 sm:grid-cols-2">
                  {category.skills.map((skill) => (
                    <li key={skill.id} className="flex min-h-24 items-center gap-4 border-t border-border py-4 first:border-t-0 sm:[&:nth-child(2)]:border-t-0">
                      <span role="img" aria-label={`${skill.name} logo`} className="inline-flex size-11 shrink-0 items-center justify-center rounded-card border border-border bg-white p-2 shadow-card">
                        <ToolIcon logo={skill.logo} className="size-full" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-sm font-medium text-foreground">{skill.name}</span>
                        <span className="mt-1 block text-sm leading-5 text-muted-foreground">{skill.description}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  )
}
