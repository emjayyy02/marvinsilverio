import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { content } from '../data/content'
import { forceFullMotionForVisualQa } from '../lib/motionPreference'
import { Icon } from './Icon'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'

export function FeaturedBuild() {
  const [isCaseStudyOpen, setIsCaseStudyOpen] = useState(false)
  const shouldReduceMotion = Boolean(useReducedMotion()) && !forceFullMotionForVisualQa()
  const project = content.featuredBuild

  return (
    <section id="featured-build" className="border-b border-border bg-surface" aria-labelledby="featured-build-heading">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20 lg:py-24">
        <Reveal>
          <SectionHeading
            id="featured-build-heading"
            eyebrow="02 / Featured build"
            title="One current build, brought into focus."
            description="The portfolio remains the real project: a compact spotlight on what it is, how it is built, and where the work lives."
          />
        </Reveal>

        <Reveal delay={0.16}>
          <article className="overflow-hidden rounded-card border border-border bg-background shadow-card">
            <div className="grid lg:grid-cols-[minmax(0,1.35fr)_minmax(20rem,0.8fr)]">
              <div className="border-b border-border p-4 sm:p-6 lg:border-b-0 lg:border-r lg:p-7">
                <div className="relative aspect-[16/10] overflow-hidden rounded-card border border-border bg-muted p-1.5">
                  <img
                    src={project.imageSrc}
                    alt={project.imageAlt}
                    width="1425"
                    height="549"
                    loading="lazy"
                    className="h-full w-full rounded-[calc(var(--radius)-2px)] border border-border object-cover object-center"
                  />
                  <span className="absolute left-3 top-3 rounded-card border border-border bg-background/90 px-2 py-1 font-mono text-[0.6rem] uppercase tracking-[0.1em] text-muted-foreground backdrop-blur-sm">Build preview</span>
                </div>
              </div>

              <div className="flex min-w-0 flex-col p-6 sm:p-8">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted-foreground">Spotlight / 001</p>
                  <span className="rounded-card border border-border bg-muted px-2.5 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.1em] text-muted-foreground">{project.status}</span>
                </div>
                <h3 className="mt-5 text-3xl font-medium tracking-[-0.04em] text-foreground sm:text-4xl">{project.title}</h3>
                <p className="mt-4 max-w-[34rem] text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">{project.description}</p>
                <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-2" aria-label="Featured build technologies">
                  {project.tags.map((tag) => <li key={tag} className="pixel-tag font-mono text-[0.68rem] uppercase tracking-[0.08em] text-foreground">{tag}</li>)}
                </ul>

                <div id="featured-case-study">
                  <AnimatePresence initial={false}>
                    {isCaseStudyOpen && (
                      <motion.dl
                        className="mt-7 grid overflow-hidden border-t border-border sm:grid-cols-2"
                        initial={{ height: 0, opacity: 0, y: shouldReduceMotion ? 0 : 8 }}
                        animate={{ height: 'auto', opacity: 1, y: 0 }}
                        exit={{ height: 0, opacity: 0, y: shouldReduceMotion ? 0 : 6 }}
                        transition={{ duration: shouldReduceMotion ? 0 : 0.32, ease: [0.16, 1, 0.3, 1] }}
                      >
                        {project.caseStudy.map((detail, index) => (
                          <div key={detail.label} className={`border-b border-border py-4 sm:py-5 ${index % 2 === 0 ? 'sm:pr-5' : 'sm:border-l sm:pl-5'}`}>
                            <dt className="font-mono text-[0.64rem] font-medium uppercase tracking-[0.1em] text-muted-foreground">{detail.label}</dt>
                            <dd className="mt-2 text-sm leading-6 text-foreground">{detail.body}</dd>
                          </div>
                        ))}
                      </motion.dl>
                    )}
                  </AnimatePresence>
                </div>

                <div className="mt-8 flex flex-col gap-3 border-t border-border pt-5 sm:flex-row">
                  <button
                    type="button"
                    aria-expanded={isCaseStudyOpen}
                    aria-controls="featured-case-study"
                    onClick={() => setIsCaseStudyOpen((open) => !open)}
                    className="interactive-control inline-flex min-h-11 items-center justify-center rounded-card bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground"
                  >
                    {isCaseStudyOpen ? 'Hide Case Study' : 'View Case Study'}
                  </button>
                  <a
                    href={project.sourceHref}
                    target="_blank"
                    rel="noreferrer"
                    className="interactive-control group inline-flex min-h-11 items-center justify-center gap-2 rounded-card border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground"
                  >
                    View Source
                    <Icon name="arrow" className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transform-none" />
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
