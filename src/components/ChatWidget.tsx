import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { content } from '../data/content'
import { Icon } from './Icon'
import { forceFullMotionForVisualQa } from '../lib/motionPreference'

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMobileModal, setIsMobileModal] = useState(() => window.matchMedia('(max-width: 767px)').matches)
  const shouldReduceMotion = useReducedMotion() && !forceFullMotionForVisualQa()
  const triggerRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const panelId = useId()
  const headingId = useId()

  const closePanel = useCallback((restoreFocus = true) => {
    setIsOpen(false)
    if (restoreFocus) {
      window.requestAnimationFrame(() => triggerRef.current?.focus())
    }
  }, [])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)')
    const handleChange = () => setIsMobileModal(mediaQuery.matches)

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  useEffect(() => {
    if (!isOpen) return

    closeButtonRef.current?.focus()
    const previousOverflow = document.body.style.overflow
    if (isMobileModal) document.body.style.overflow = 'hidden'

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        closePanel()
        return
      }

      if (event.key === 'Tab' && isMobileModal && panelRef.current) {
        const focusableElements = Array.from(
          panelRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'),
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

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node
      if (panelRef.current?.contains(target) || triggerRef.current?.contains(target)) return
      closePanel()
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('pointerdown', handlePointerDown)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('pointerdown', handlePointerDown)
    }
  }, [closePanel, isMobileModal, isOpen])

  const panelMotion = shouldReduceMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { opacity: 0, y: 12, scale: 0.98 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: 8, scale: 0.98 },
      }

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              aria-hidden="true"
              className="fixed inset-0 z-[55] bg-black/20 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.18 }}
            />
            <motion.div
              {...panelMotion}
              id={panelId}
              ref={panelRef}
              role="dialog"
              aria-modal={isMobileModal ? true : undefined}
              aria-labelledby={headingId}
              data-lenis-prevent
              className="fixed inset-x-4 bottom-[calc(5rem+env(safe-area-inset-bottom))] z-[60] rounded-card border border-border bg-surface p-5 shadow-card md:inset-x-auto md:right-6 md:w-[22rem]"
              transition={{ duration: shouldReduceMotion ? 0 : 0.18, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 id={headingId} className="text-xl font-medium tracking-[-0.03em] text-foreground">{content.chat.heading}</h2>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{content.chat.description}</p>
                </div>
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={() => closePanel()}
                  aria-label={content.chat.closeLabel}
                  className="interactive-control grid size-11 shrink-0 place-items-center rounded-card border border-border bg-muted text-foreground"
                >
                  <Icon name="close" />
                </button>
              </div>

              <div className="mt-5 grid gap-2">
                {content.contacts.map((contact) => (
                  <a
                    key={contact.label}
                    href={contact.href}
                    target={contact.href.startsWith('http') ? '_blank' : undefined}
                    rel={contact.href.startsWith('http') ? 'noreferrer' : undefined}
                    onClick={() => closePanel()}
                    className="interactive-control group flex min-h-11 items-center justify-between rounded-card border border-border bg-muted px-3.5 py-3 text-sm font-medium text-foreground"
                  >
                    <span className="flex items-center gap-3"><Icon name={contact.icon} className="size-5" />{contact.label}</span>
                    <Icon name="arrow" className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transform-none" />
                  </a>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-label={content.chat.triggerLabel}
        aria-expanded={isOpen}
        aria-controls={panelId}
        aria-haspopup="dialog"
        className="interactive-control fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-[max(1.25rem,env(safe-area-inset-right))] z-[65] inline-flex size-11 items-center justify-center gap-2 rounded-full border border-border bg-primary p-0 text-sm font-medium text-primary-foreground shadow-card md:h-11 md:w-auto md:px-4"
      >
        <Icon name="message" className="size-4" />
        <span className="hidden md:inline">{content.chat.triggerLabel}</span>
      </button>
    </>
  )
}
