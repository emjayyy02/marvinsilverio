import { useSyncExternalStore } from 'react'

const subscribers = new Set<() => void>()
let reducedMotionQuery: MediaQueryList | null = null

export type MotionMode = 'full' | 'reduce'
type MotionSource = 'query-full' | 'query-reduce' | 'dev-default' | 'prefers-reduced-motion' | 'system-default'

interface MotionPreference {
  mode: MotionMode
  source: MotionSource
  mediaQueryMatches: boolean
}

function getReducedMotionQuery() {
  if (typeof window === 'undefined') return null
  reducedMotionQuery ??= window.matchMedia('(prefers-reduced-motion: reduce)')
  return reducedMotionQuery
}

export function resolveMotionPreference(): MotionPreference {
  if (typeof window === 'undefined') {
    return { mode: 'full', source: 'system-default', mediaQueryMatches: false }
  }

  const mediaQueryMatches = Boolean(getReducedMotionQuery()?.matches)
  const override = new URLSearchParams(window.location.search).get('motion')

  if (override === 'full') return { mode: 'full', source: 'query-full', mediaQueryMatches }
  if (override === 'reduce') return { mode: 'reduce', source: 'query-reduce', mediaQueryMatches }
  if (import.meta.env.DEV) return { mode: 'full', source: 'dev-default', mediaQueryMatches }
  if (mediaQueryMatches) return { mode: 'reduce', source: 'prefers-reduced-motion', mediaQueryMatches }

  return { mode: 'full', source: 'system-default', mediaQueryMatches }
}

export function prefersReducedMotion() {
  return resolveMotionPreference().mode === 'reduce'
}

export function syncDocumentMotionPreference() {
  if (typeof document === 'undefined') return
  const preference = resolveMotionPreference()
  const root = document.documentElement
  root.dataset.motion = preference.mode

  if (import.meta.env.DEV) {
    root.dataset.motionSource = preference.source
    root.dataset.motionMediaReduce = String(preference.mediaQueryMatches)
  } else {
    delete root.dataset.motionSource
    delete root.dataset.motionMediaReduce
  }
}

export function usePrefersReducedMotion() {
  return useSyncExternalStore(subscribeToMotionPreference, prefersReducedMotion, () => false)
}

function subscribeToMotionPreference(onStoreChange: () => void) {
  const mediaQuery = getReducedMotionQuery()
  const isFirstSubscriber = subscribers.size === 0
  subscribers.add(onStoreChange)
  if (isFirstSubscriber) mediaQuery?.addEventListener('change', notifyMotionSubscribers)

  return () => {
    subscribers.delete(onStoreChange)
    if (subscribers.size === 0) mediaQuery?.removeEventListener('change', notifyMotionSubscribers)
  }
}

function notifyMotionSubscribers() {
  syncDocumentMotionPreference()
  subscribers.forEach((subscriber) => subscriber())
}
