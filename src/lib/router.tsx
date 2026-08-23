/* oxlint-disable react/only-export-components */
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from 'react'

interface RouteLocation {
  pathname: string
  search: string
  hash: string
  key: number
}

interface RouterContextValue {
  location: RouteLocation
  navigate: (to: string, options?: { replace?: boolean }) => void
}

const RouterContext = createContext<RouterContextValue | null>(null)

function readLocation(key = 0): RouteLocation {
  return {
    pathname: window.location.pathname.replace(/\/+$/, '') || '/',
    search: window.location.search,
    hash: window.location.hash,
    key,
  }
}

export function RouterProvider({ children }: { children: ReactNode }) {
  const [location, setLocation] = useState(() => readLocation())

  useEffect(() => {
    const handlePopState = () => setLocation((current) => readLocation(current.key + 1))
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const navigate = useCallback((to: string, options?: { replace?: boolean }) => {
    const nextUrl = new URL(to, window.location.href)
    const nextHref = `${nextUrl.pathname}${nextUrl.search}${nextUrl.hash}`
    const currentHref = `${window.location.pathname}${window.location.search}${window.location.hash}`

    if (nextUrl.origin !== window.location.origin) {
      window.location.assign(nextUrl.href)
      return
    }

    if (nextHref !== currentHref) {
      window.history[options?.replace ? 'replaceState' : 'pushState']({}, '', nextHref)
    }

    setLocation((current) => readLocation(current.key + 1))
  }, [])

  const value = useMemo(() => ({ location, navigate }), [location, navigate])

  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>
}

export function useRouter() {
  const context = useContext(RouterContext)
  if (!context) throw new Error('useRouter must be used inside RouterProvider')
  return context
}

interface RouteLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
}

export function RouteLink({ href, onClick, target, ...props }: RouteLinkProps) {
  const { navigate } = useRouter()

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event)
    if (
      event.defaultPrevented
      || event.button !== 0
      || event.metaKey
      || event.ctrlKey
      || event.shiftKey
      || event.altKey
      || target === '_blank'
    ) return

    const destination = new URL(href, window.location.href)
    if (destination.origin !== window.location.origin) return

    event.preventDefault()
    navigate(`${destination.pathname}${destination.search}${destination.hash}`)
  }

  return <a {...props} href={href} target={target} onClick={handleClick} />
}
