import { useState } from 'react'
import type { MouseEvent } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { content } from '../data/content'
import { useTheme } from '../contexts/ThemeContext'
import type { Theme, TransitionOrigin } from '../contexts/ThemeContext'
import { forceFullMotionForVisualQa } from '../lib/motionPreference'
import { Icon } from './Icon'

export function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const shouldReduceMotion = useReducedMotion() && !forceFullMotionForVisualQa()

  const closeMenu = () => setIsMenuOpen(false)

  return (
    <motion.header
      className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-md"
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: shouldReduceMotion ? 0.2 : 0.46, ease: [0.16, 1, 0.3, 1] }}
    >
      <nav className="mx-auto flex min-h-16 max-w-6xl items-center justify-between px-5 sm:px-8" aria-label="Main navigation">
        <a href="#top" className="interactive-control inline-flex min-h-11 items-center gap-2.5 rounded-card pr-2 text-xs font-medium tracking-[-0.02em] text-foreground">
          <img src={content.person.mascotSrc} alt="" width="32" height="32" className="pixel-art size-8 shrink-0" />
          <span>{content.person.wordmark}</span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {content.navigation.map((item) => (
            <a key={item.href} href={item.href} className="interactive-control inline-flex min-h-11 items-center rounded-card px-3 text-sm text-muted-foreground hover:text-foreground">
              {item.label}
            </a>
          ))}
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
              <a key={item.href} href={item.href} onClick={closeMenu} className="interactive-control inline-flex min-h-11 items-center rounded-card px-3 text-sm text-muted-foreground hover:text-foreground">
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </motion.header>
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
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
      >
        <Icon name={icon} />
      </motion.span>
    </button>
  )
}
