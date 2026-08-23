import { useSyncExternalStore } from 'react'

const subscribers = new Set<() => void>()
let reducedMotionQuery: MediaQueryList | null = null

export type MotionMode = 'full' | 'reduce'
export type StoredMotionPreference = 'on' | 'off'
type MotionSource = 'site-on' | 'site-off' | 'query-full' | 'query-reduce' | 'prefers-reduced-motion' | 'system-default'

export const motionStorageKey = 'marvin-motion'

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

function getStoredMotionPreference(): StoredMotionPreference | null {
  if (typeof window === 'undefined') return null

  try {
    const storedPreference = window.localStorage.getItem(motionStorageKey)
    return storedPreference === 'on' || storedPreference === 'off' ? storedPreference : null
  } catch {
    return null
  }
}

export function resolveMotionPreference(): MotionPreference {
  if (typeof window === 'undefined') {
    return { mode: 'full', source: 'system-default', mediaQueryMatches: false }
  }

  const mediaQueryMatches = Boolean(getReducedMotionQuery()?.matches)
  const storedPreference = getStoredMotionPreference()
  const override = new URLSearchParams(window.location.search).get('motion')

  if (storedPreference === 'on') return { mode: 'full', source: 'site-on', mediaQueryMatches }
  if (storedPreference === 'off') return { mode: 'reduce', source: 'site-off', mediaQueryMatches }
  if (override === 'full') return { mode: 'full', source: 'query-full', mediaQueryMatches }
  if (override === 'reduce') return { mode: 'reduce', source: 'query-reduce', mediaQueryMatches }
  if (mediaQueryMatches) return { mode: 'reduce', source: 'prefers-reduced-motion', mediaQueryMatches }

  return { mode: 'full', source: 'system-default', mediaQueryMatches }
}

export function prefersReducedMotion() {
  return resolveMotionPreference().mode === 'reduce'
}

export function setMotionEnabled(isEnabled: boolean) {
  if (typeof window === 'undefined') return

  try {
    window.localStorage.setItem(motionStorageKey, isEnabled ? 'on' : 'off')
  } catch {
    return
  }

  if (isEnabled) {
    window.location.reload()
    return
  }

  notifyMotionSubscribers()
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
  if (isFirstSubscriber) {
    mediaQuery?.addEventListener('change', notifyMotionSubscribers)
    window.addEventListener('storage', handleStorageChange)
  }

  return () => {
    subscribers.delete(onStoreChange)
    if (subscribers.size === 0) {
      mediaQuery?.removeEventListener('change', notifyMotionSubscribers)
      window.removeEventListener('storage', handleStorageChange)
    }
  }
}

function handleStorageChange(event: StorageEvent) {
  if (event.key === motionStorageKey || event.key === null) notifyMotionSubscribers()
}

function notifyMotionSubscribers() {
  syncDocumentMotionPreference()
  subscribers.forEach((subscriber) => subscriber())
}
