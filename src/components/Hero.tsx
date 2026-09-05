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
    initial: shouldReduceMotion ? false as const : { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: shouldReduceMotion ? 0 : motionDuration.entrance, delay: shouldReduceMotion ? 0 : delay, ease: motionEase.out },
  })

  return (
    <section id="top" className="border-b border-border" aria-labelledby="hero-heading">
      <div className="mx-auto flex min-h-[calc(90svh-4rem)] max-w-6xl flex-col items-center justify-center px-5 py-12 text-center sm:px-8 sm:py-16">
        <motion.p {...entrance(0)} className="inline-flex max-w-full items-center gap-2 rounded-full border border-profile-mark/20 bg-profile-mark/10 px-4 py-2 font-mono text-xs font-medium uppercase tracking-[0.14em] text-profile-mark">
          <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-current" />
          <span className="text-balance">Open to automation specialist roles</span>
        </motion.p>

        <motion.div {...entrance(0.08)} className="mt-6 w-32 shrink-0 rounded-full ring-1 ring-profile-mark sm:w-40">
          <ProfilePortrait image={content.person.profileImage} />
        </motion.div>

        <motion.h1 {...entrance(0.16)} id="hero-heading" className="mt-6 inline-flex max-w-full items-center justify-center gap-2 text-4xl font-medium tracking-[-0.04em] text-foreground sm:gap-3 sm:text-6xl lg:text-7xl">
          <span>{content.person.name}</span>
          <span aria-hidden="true" className="relative top-[0.03em] grid size-4 shrink-0 place-items-center rounded-full bg-profile-mark text-profile-mark-foreground sm:size-5">
            <Icon name="check" className="size-3 sm:size-3.5" />
          </span>
        </motion.h1>
        <motion.p {...entrance(0.24)} className="mt-3 max-w-full text-balance text-lg font-medium tracking-[-0.03em] text-muted-foreground sm:text-xl lg:text-2xl">
          {content.person.professionalTitle}
        </motion.p>
        <motion.p {...entrance(0.32)} className="mt-5 max-w-[26rem] text-pretty text-base leading-7 text-muted-foreground">
          {content.person.heroSummary}
        </motion.p>
        <motion.div {...entrance(0.40)} className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <RouteLink href={content.person.primaryAction.href} className="interactive-control button-primary inline-flex min-h-11 items-center justify-center rounded-card bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground">{content.person.primaryAction.label}</RouteLink>
          <ResumeAction resumeUrl={content.person.resumeUrl} />
        </motion.div>
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
