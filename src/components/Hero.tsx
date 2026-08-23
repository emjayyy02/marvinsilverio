import { motion } from 'motion/react'
import { content } from '../data/content'
import { usePrefersReducedMotion } from '../lib/motionPreference'
import { motionDuration, motionEase } from '../lib/motionTokens'
import { RouteLink } from '../lib/router'
import { Icon } from './Icon'
import { ProfilePortrait } from './ProfilePortrait'

export function Hero() {
  const shouldReduceMotion = usePrefersReducedMotion()
  const entrance = (delay: number) => ({
    initial: { opacity: 0, y: shouldReduceMotion ? 0 : 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: shouldReduceMotion ? motionDuration.fast : motionDuration.entrance, delay: shouldReduceMotion ? 0 : delay, ease: motionEase.out },
  })

  return (
    <section id="top" className="hero-grid border-b border-border" aria-labelledby="hero-heading">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24 lg:py-28">
        <div className="grid gap-10 md:grid-cols-[12rem_minmax(0,1fr)] md:items-center md:gap-12 lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-16">
          <motion.div {...entrance(0.08)} className="w-40 sm:w-44 md:w-full">
            <ProfilePortrait image={content.person.profileImage} />
          </motion.div>

          <div className="min-w-0 text-left">
            <motion.h1 {...entrance(0.14)} id="hero-heading" className="inline-flex max-w-full items-center gap-2 text-4xl font-medium tracking-[-0.04em] text-foreground sm:gap-3 sm:text-6xl lg:text-7xl">
              <span>{content.person.name}</span>
              <span aria-hidden="true" className="relative top-[0.03em] grid size-4 shrink-0 place-items-center rounded-full bg-profile-mark text-profile-mark-foreground sm:size-5">
                <Icon name="check" className="size-3 sm:size-3.5" />
              </span>
            </motion.h1>
            <motion.p {...entrance(0.21)} className="mt-4 max-w-[46rem] text-balance text-2xl font-medium tracking-[-0.03em] text-foreground sm:text-3xl lg:text-4xl">
              {content.person.professionalTitle}
            </motion.p>
            <motion.p {...entrance(0.29)} className="mt-6 max-w-[46rem] text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
              {content.person.heroSummary}
            </motion.p>
            <motion.div {...entrance(0.37)} className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap">
              <RouteLink href={content.person.primaryAction.href} className="interactive-control button-primary inline-flex min-h-11 items-center justify-center rounded-card bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground">{content.person.primaryAction.label}</RouteLink>
              <ResumeAction resumeUrl={content.person.resumeUrl} />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ResumeAction({ resumeUrl }: { resumeUrl: string | null }) {
  if (resumeUrl) {
    return (
      <a href={resumeUrl} target="_blank" rel="noreferrer" className="interactive-control button-secondary inline-flex min-h-11 items-center justify-center rounded-card border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground">
        View Resume
      </a>
    )
  }

  return (
    <>
      <button type="button" disabled aria-label="View Resume — not yet available" aria-describedby="resume-unavailable" title="Resume will be available soon" className="inline-flex min-h-11 cursor-not-allowed items-center justify-center rounded-card border border-border bg-background px-4 py-2.5 text-sm font-medium text-muted-foreground opacity-70">
        View Resume
      </button>
      <span id="resume-unavailable" className="sr-only">Resume is not yet available.</span>
    </>
  )
}
