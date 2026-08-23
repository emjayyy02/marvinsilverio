import { useState } from 'react'
import type { MouseEvent } from 'react'
import { motion } from 'motion/react'
import { content } from '../data/content'
import { useTheme } from '../contexts/ThemeContext'
import type { Theme, TransitionOrigin } from '../contexts/ThemeContext'
import { setMotionEnabled, usePrefersReducedMotion } from '../lib/motionPreference'
import { motionDuration, motionEase } from '../lib/motionTokens'
import { RouteLink, useRouter } from '../lib/router'
import { Icon } from './Icon'

export function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const { location } = useRouter()
  const shouldReduceMotion = usePrefersReducedMotion()

  const closeMenu = () => setIsMenuOpen(false)

  return (
    <motion.header
      className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-md"
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: shouldReduceMotion ? motionDuration.fast : motionDuration.entrance, ease: motionEase.out }}
    >
      <nav className="mx-auto flex min-h-16 max-w-6xl items-center justify-between px-5 sm:px-8" aria-label="Main navigation">
        <RouteLink href="/" aria-label="Marvin Silverio home" className="interactive-control inline-flex min-h-11 min-w-11 items-center justify-center rounded-card font-mono text-sm font-semibold tracking-[0.08em] text-foreground">
          <span aria-hidden="true">MJ</span>
        </RouteLink>

        <div className="hidden items-center gap-1 md:flex">
          {content.navigation.map((item) => (
            <RouteLink key={item.href} href={item.href} aria-current={location.pathname === item.href ? 'page' : undefined} className="interactive-control inline-flex min-h-11 items-center rounded-card px-3 text-sm text-muted-foreground hover:text-foreground">
              {item.label}
            </RouteLink>
          ))}
          <MotionButton shouldReduceMotion={shouldReduceMotion} />
          <ThemeButton theme={theme} toggleTheme={toggleTheme} />
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeButton theme={theme} toggleTheme={toggleTheme} />
          <button type="button" onClick={() => setIsMenuOpen((open) => !open)} aria-expanded={isMenuOpen} aria-controls="mobile-navigation" aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'} className="interactive-control grid size-11 place-items-center rounded-card border border-border bg-surface text-foreground">
            <Icon name={isMenuOpen ? 'close' : 'menu'} />
          </button>
        </div>
      </nav>

      {isMenuOpen && (
        <div id="mobile-navigation" className="border-t border-border bg-background px-5 py-3 md:hidden sm:px-8">
          <div className="mx-auto flex max-w-6xl flex-col">
            {content.navigation.map((item) => (
              <RouteLink key={item.href} href={item.href} aria-current={location.pathname === item.href ? 'page' : undefined} onClick={closeMenu} className="interactive-control inline-flex min-h-11 items-center rounded-card px-3 text-sm text-muted-foreground hover:text-foreground">
                {item.label}
              </RouteLink>
            ))}
            <div className="mt-2 border-t border-border pt-2">
              <MotionButton shouldReduceMotion={shouldReduceMotion} isMobile />
            </div>
          </div>
        </div>
      )}
    </motion.header>
  )
}

function MotionButton({ shouldReduceMotion, isMobile = false }: { shouldReduceMotion: boolean; isMobile?: boolean }) {
  const isEnabled = !shouldReduceMotion
  const stateLabel = isEnabled ? 'On' : 'Off'

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isEnabled}
      aria-label="Toggle motion"
      title={`Motion ${stateLabel}`}
      onClick={() => setMotionEnabled(!isEnabled)}
      className={`interactive-control inline-flex min-h-11 items-center gap-2 rounded-card text-foreground ${isMobile ? 'w-full justify-between px-3' : 'ml-1 px-2.5'}`}
    >
      <span className="text-sm">Motion</span>
      <span className="inline-flex items-center gap-1.5">
        <span aria-hidden="true" className={`relative h-5 w-9 rounded-full border ${isEnabled ? 'border-primary bg-primary' : 'border-border bg-muted'}`}>
          <span className={`absolute left-1 top-1/2 size-3 -translate-y-1/2 rounded-full ${isEnabled ? 'translate-x-4 bg-primary-foreground' : 'translate-x-0 bg-muted-foreground'}`} />
        </span>
        <span className="w-5 text-left font-mono text-[0.625rem] uppercase tracking-[0.08em] text-muted-foreground">{stateLabel}</span>
      </span>
    </button>
  )
}

const themeLabels: Record<Theme, string> = {
  light: 'light',
  dark: 'dark',
}

function ThemeButton({ theme, toggleTheme }: { theme: Theme; toggleTheme: (origin?: TransitionOrigin) => void }) {
  const nextTheme: Theme = theme === 'light' ? 'dark' : 'light'
  const icon = theme === 'light' ? 'sun' : 'moon'

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    toggleTheme({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    })
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={`Switch to ${themeLabels[nextTheme]} mode`}
      title={`Switch to ${themeLabels[nextTheme]} mode`}
      className="theme-trigger interactive-control ml-1 grid size-11 place-items-center rounded-card border border-border bg-surface text-foreground"
    >
      <motion.span
        key={theme}
        className="grid place-items-center"
        initial={{ opacity: 0, scale: 0.72 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: motionDuration.normal, ease: motionEase.out }}
      >
        <Icon name={icon} />
      </motion.span>
    </button>
  )
}
