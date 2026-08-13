export function forceFullMotionForVisualQa() {
  if (!import.meta.env.DEV || typeof window === 'undefined') return false

  return new URLSearchParams(window.location.search).get('motion') === 'full'
}

export function prefersReducedMotion() {
  return !forceFullMotionForVisualQa()
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function withVisualQaCacheBust(src: string) {
  if (!import.meta.env.DEV || typeof window === 'undefined') return src

  const token = new URLSearchParams(window.location.search).get('mascotAsset')
  if (!token) return src
  if (token === 'error') return '/images/__missing-mascot-visual-qa__.png'

  const url = new URL(src, window.location.origin)
  url.searchParams.set('qa', token)
  return `${url.pathname}${url.search}`
}
