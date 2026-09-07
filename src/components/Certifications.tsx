import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { content } from '../data/content'
import { usePrefersReducedMotion } from '../lib/motionPreference'
import { motionDuration, motionEase } from '../lib/motionTokens'
import { Icon } from './Icon'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'

export function Certifications() {
  const section = content.sections.certifications
  const [activeCertificateIndex, setActiveCertificateIndex] = useState<number | null>(null)
  const shouldReduceMotion = usePrefersReducedMotion()
  const triggerRefs = useRef<Array<HTMLButtonElement | null>>([])
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const titleId = useId()
  const activeCertificate = activeCertificateIndex === null ? null : content.certifications[activeCertificateIndex]

  const closeCertificate = useCallback(() => {
    const trigger = activeCertificateIndex === null ? null : triggerRefs.current[activeCertificateIndex]
    setActiveCertificateIndex(null)
    window.requestAnimationFrame(() => trigger?.focus())
  }, [activeCertificateIndex])

  useEffect(() => {
    if (!activeCertificate) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        closeCertificate()
        return
      }

      if (event.key === 'Tab' && dialogRef.current) {
        const focusableElements = Array.from(
          dialogRef.current.querySelectorAll<HTMLElement>('button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'),
        )
        const firstElement = focusableElements[0]
        const lastElement = focusableElements.at(-1)

        if (!firstElement || !lastElement) return
        if (event.shiftKey && document.activeElement === firstElement) {
          event.preventDefault()
          lastElement.focus()
        } else if (!event.shiftKey && document.activeElement === lastElement) {
          event.preventDefault()
          firstElement.focus()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [activeCertificate, closeCertificate])

  const dialogMotion = shouldReduceMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { opacity: 0, y: 12, scale: 0.985 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: 8, scale: 0.985 },
      }

  return (
    <>
      <section id="certifications" className="border-b border-border bg-surface" aria-labelledby="certifications-heading">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-14 sm:px-8 sm:py-16 lg:grid-cols-[minmax(14rem,0.55fr)_minmax(0,1.45fr)] lg:gap-14 lg:py-20">
          <Reveal>
            <SectionHeading
              id="certifications-heading"
              eyebrow={section.eyebrow}
              title={section.title}
            />
          </Reveal>
          <Reveal delay={0.16}>
            <ul className="max-w-2xl border-y border-border" aria-label="Certifications">
              {content.certifications.map((certification, index) => (
                <li key={certification.name} className={`min-w-0 py-4 sm:py-5 ${index > 0 ? 'border-t border-border' : ''}`}>
                  <article className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground">{certification.issuer}</p>
                      <h3 className="mt-1 max-w-xl text-base font-medium leading-snug tracking-[-0.02em] text-foreground sm:text-lg">
                        {certification.name}
                      </h3>
                      <p className="mt-2 font-mono text-xs uppercase tracking-[0.1em] text-muted-foreground">Issued {certification.issued}</p>
                    </div>
                    <button
                      ref={(element) => { triggerRefs.current[index] = element }}
                      type="button"
                      onClick={() => setActiveCertificateIndex(index)}
                      aria-haspopup="dialog"
                      className="interactive-control button-secondary inline-flex min-h-11 shrink-0 items-center justify-center gap-2 self-start rounded-card border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground sm:self-auto"
                    >
                      View Certificate
                      <span aria-hidden="true">↗</span>
                    </button>
                  </article>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <AnimatePresence>
        {activeCertificate && (
          <motion.div
            className="fixed inset-0 z-[80] grid place-items-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : motionDuration.fast }}
            onPointerDown={(event) => {
              if (event.target === event.currentTarget) closeCertificate()
            }}
          >
            <motion.div
              {...dialogMotion}
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              data-lenis-prevent
              className="relative flex max-h-[calc(100dvh-2rem)] w-full max-w-5xl flex-col overflow-hidden rounded-card border border-white/20 bg-background shadow-card sm:max-h-[calc(100dvh-3rem)]"
              transition={{ duration: shouldReduceMotion ? 0 : motionDuration.normal, ease: motionEase.out }}
              onPointerDown={(event) => event.stopPropagation()}
            >
              <div className="flex min-h-14 shrink-0 items-center justify-between gap-4 border-b border-border px-3 sm:px-4">
                <h2 id={titleId} className="min-w-0 truncate text-sm font-medium text-foreground">{activeCertificate.name}</h2>
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={closeCertificate}
                  aria-label="Close certificate preview"
                  className="interactive-control button-secondary grid size-11 shrink-0 place-items-center rounded-card border border-border bg-muted text-foreground"
                >
                  <Icon name="close" />
                </button>
              </div>
              <div className="min-h-0 overflow-auto bg-black p-2 sm:p-3">
                <img
                  src={activeCertificate.image.src}
                  alt={activeCertificate.image.alt}
                  width={activeCertificate.image.width}
                  height={activeCertificate.image.height}
                  className="mx-auto block h-auto max-h-[calc(100dvh-6.5rem)] max-w-full object-contain"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
