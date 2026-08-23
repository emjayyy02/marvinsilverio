import { useEffect, useState } from 'react'
import { prefersReducedMotion } from '../lib/motionPreference'
import { Icon } from './Icon'

export function ScrollToTop() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const updateVisibility = () => {
      const scrollableDistance = Math.max(0, document.documentElement.scrollHeight - window.innerHeight)
      const progress = scrollableDistance > 0 ? window.scrollY / scrollableDistance : 0
      setVisible(progress >= 0.4)
    }

    updateVisibility()
    window.addEventListener('scroll', updateVisibility, { passive: true })
    window.addEventListener('resize', updateVisibility)
    return () => {
      window.removeEventListener('scroll', updateVisibility)
      window.removeEventListener('resize', updateVisibility)
    }
  }, [])

  return (
    <button
      type="button"
      aria-label="Back to top"
      title="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })}
      className={`interactive-control button-primary scroll-top-control fixed bottom-[max(1.5rem,env(safe-area-inset-bottom))] left-[max(1.25rem,env(safe-area-inset-left))] z-30 inline-flex size-11 items-center justify-center rounded-card border border-primary bg-primary text-primary-foreground shadow-card sm:left-8 xl:left-[max(2rem,calc((100vw-72rem)/2+2rem))] ${visible ? 'pointer-events-auto translate-y-0 scale-100 opacity-100' : 'pointer-events-none translate-y-2 scale-95 opacity-0'}`}
    >
      <Icon name="arrowUp" className="size-5" />
    </button>
  )
}
