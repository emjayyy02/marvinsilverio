import { motion, useReducedMotion } from 'motion/react'
import { content } from '../data/content'
import { forceFullMotionForVisualQa } from '../lib/motionPreference'
import { MascotLogo } from './MascotLogo'

export function Hero() {
  const shouldReduceMotion = useReducedMotion() && !forceFullMotionForVisualQa()
  const entrance = (delay: number) => ({
    initial: { opacity: 0, y: shouldReduceMotion ? 0 : 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: shouldReduceMotion ? 0.2 : 0.62, delay: shouldReduceMotion ? 0 : delay, ease: [0.16, 1, 0.3, 1] as const },
  })

  return (
    <section id="top" className="hero-grid border-b border-border" aria-labelledby="hero-heading">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-8 sm:py-24 lg:py-28">
        <div className="grid max-w-5xl gap-9 sm:gap-12 lg:grid-cols-[10rem_minmax(0,1fr)] lg:items-center lg:gap-14">
          <motion.div {...entrance(0.08)} className="relative size-32 sm:size-36 lg:size-40" data-hero-mascot>
            <MascotLogo src={content.person.mascotSrc} alt={content.person.mascotAlt} />
          </motion.div>

          <div className="min-w-0 text-left">
            <motion.p {...entrance(0.12)} className="mb-4 text-sm font-medium tracking-[-0.01em] text-muted-foreground">{content.person.positioning}</motion.p>
            <motion.h1 {...entrance(0.2)} id="hero-heading" className="max-w-full text-4xl font-medium tracking-[-0.04em] text-foreground sm:text-6xl">{content.person.name}</motion.h1>
            <motion.div {...entrance(0.28)} className="mt-6 max-w-[44rem] space-y-4 text-lg leading-8 text-muted-foreground sm:text-xl sm:leading-8">
              {content.person.summary.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </motion.div>
            <motion.div {...entrance(0.38)} className="mt-8">
              <a href="#projects" className="interactive-control inline-flex min-h-11 items-center rounded-card bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground">View this build</a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
