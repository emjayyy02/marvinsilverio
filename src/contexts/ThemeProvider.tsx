import { useCallback, useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { flushSync } from 'react-dom'
import { getInitialTheme, storageKey, ThemeContext } from './ThemeContext'
import type { Theme, TransitionOrigin } from './ThemeContext'
import { prefersReducedMotion } from '../lib/motionPreference'

interface ViewTransition {
  ready: Promise<void>
  finished: Promise<void>
}

type ViewTransitionDocument = {
  startViewTransition?: (updateCallback: () => void | Promise<void>) => ViewTransition
}

type ViewTransitionAnimationOptions = KeyframeAnimationOptions & {
  pseudoElement: string
}

const irisDuration = 700

function logIrisFailure(stage: string, error: unknown) {
  if (import.meta.env.DEV) {
    console.error(`[theme iris] ${stage}`, error)
  }
}

function getIrisGeometry(origin?: TransitionOrigin) {
  const x = origin?.x ?? window.innerWidth / 2
  const y = origin?.y ?? 32
  const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))
  return { x, y, radius }
}

function supportsNativeIris(documentWithTransitions: ViewTransitionDocument, root: HTMLElement) {
  return Boolean(
    documentWithTransitions.startViewTransition
    && typeof (root as HTMLElement & { animate?: unknown }).animate === 'function'
    && typeof KeyframeEffect !== 'undefined'
    && 'pseudoElement' in KeyframeEffect.prototype
    && CSS.supports('clip-path', 'circle(1px at 0px 0px)'),
  )
}

function applyTheme(theme: Theme) {
  const root = document.documentElement
  root.classList.remove('dark', 'light-gray')
  if (theme === 'dark') root.classList.add('dark')
  root.style.colorScheme = theme === 'dark' ? 'dark' : 'light'
  try {
    window.localStorage.setItem(storageKey, theme)
  } catch {
    // Theme switching still works for this visit when storage is unavailable.
  }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState(getInitialTheme)
  const isTransitioning = useRef(false)

  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  const toggleTheme = useCallback((origin?: TransitionOrigin) => {
    if (isTransitioning.current) return

    const nextTheme: Theme = theme === 'light' ? 'dark' : 'light'
    const root = document.documentElement
    const reducedMotion = prefersReducedMotion()
    const transitionDocument = document as ViewTransitionDocument
    const { x, y, radius } = getIrisGeometry(origin)

    const commitTheme = () => {
      applyTheme(nextTheme)
      flushSync(() => setTheme(nextTheme))
    }

    if (reducedMotion) {
      commitTheme()
      return
    }

    const runOverlayIris = async () => {
      const overlay = document.createElement('div')
      overlay.className = 'theme-iris-overlay'
      overlay.dataset.theme = nextTheme
      overlay.style.width = `${radius * 2}px`
      overlay.style.height = `${radius * 2}px`
      overlay.style.left = `${x - radius}px`
      overlay.style.top = `${y - radius}px`
      document.body.appendChild(overlay)

      try {
        if (typeof overlay.animate === 'function') {
          const animation = overlay.animate(
            { transform: ['scale(0)', 'scale(1)'] },
            { duration: irisDuration, easing: 'cubic-bezier(0.45, 0, 0.55, 1)', fill: 'both' },
          )
          await animation.finished
        } else {
          overlay.getBoundingClientRect()
          overlay.classList.add('is-active')
          await new Promise((resolve) => window.setTimeout(resolve, irisDuration))
        }
        commitTheme()
      } catch (error) {
        logIrisFailure('CSS overlay animation failed; applying the theme immediately.', error)
        commitTheme()
      } finally {
        overlay.remove()
      }
    }

    const runTransition = async () => {
      isTransitioning.current = true
      try {
        if (!supportsNativeIris(transitionDocument, root)) {
          await runOverlayIris()
          return
        }

        try {
          const transition = transitionDocument.startViewTransition!(commitTheme)
          await transition.ready
          root.animate(
            { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
            {
              duration: irisDuration,
              easing: 'cubic-bezier(0.45, 0, 0.55, 1)',
              fill: 'both',
              pseudoElement: '::view-transition-new(root)',
            } as ViewTransitionAnimationOptions,
          )
          await transition.finished
        } catch (error) {
          logIrisFailure('Native View Transition failed; using the CSS overlay fallback.', error)
          applyTheme(theme)
          flushSync(() => setTheme(theme))
          await runOverlayIris()
        }
      } finally {
        isTransitioning.current = false
      }
    }

    void runTransition()
  }, [theme])

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
}
