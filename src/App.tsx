import { useEffect, useRef } from 'react'
import { MotionConfig } from 'motion/react'
import { ReactLenis } from 'lenis/react'
import { ChatWidget } from './components/ChatWidget'
import { Footer } from './components/Footer'
import { Nav } from './components/Nav'
import { getProjectBySlug } from './data/projects'
import { prefersReducedMotion, usePrefersReducedMotion } from './lib/motionPreference'
import { useRouter } from './lib/router'
import { safeDecodeURIComponent } from './lib/safeDecodeURIComponent'
import { HomePage } from './pages/HomePage'
import { NotFoundPage } from './pages/NotFoundPage'
import { ProjectPage } from './pages/ProjectPage'
import { ProjectsPage } from './pages/ProjectsPage'
import { SkillsPage } from './pages/SkillsPage'

export default function App() {
  const shouldReduceMotion = usePrefersReducedMotion()
  const { location } = useRouter()
  const projectMatch = location.pathname.match(/^\/projects\/([^/]+)$/)
  const projectSlug = projectMatch ? safeDecodeURIComponent(projectMatch[1]) : null
  const project = projectSlug ? getProjectBySlug(projectSlug) : undefined

  let page = <NotFoundPage />
  let title = 'Page Not Found — Marvin Silverio'

  if (location.pathname === '/') {
    page = <HomePage />
    title = 'Marvin Silverio — Automation Engineer & Frontend Developer'
  } else if (location.pathname === '/projects') {
    page = <ProjectsPage />
    title = 'Projects — Marvin Silverio'
  } else if (location.pathname === '/skills') {
    page = <SkillsPage />
    title = 'Skills & Capabilities — Marvin Silverio'
  } else if (project) {
    page = <ProjectPage project={project} />
    title = `${project.title} — Marvin Silverio`
  }

  return (
    <ReactLenis
      root
      autoRaf
      options={{
        lerp: 0.1,
        smoothWheel: !shouldReduceMotion,
        syncTouch: false,
        anchors: true,
        stopInertiaOnNavigate: true,
        respectReducedMotion: false,
      }}
    >
      <MotionConfig reducedMotion={shouldReduceMotion ? 'always' : 'never'}>
        <RouteEffects title={title} routeKey={location.key} pathname={location.pathname} search={location.search} hash={location.hash} />
        <a href="#main-content" className="sr-only z-[100] rounded-card bg-primary px-4 py-3 text-sm font-medium text-primary-foreground focus:fixed focus:left-4 focus:top-4 focus:not-sr-only">Skip to content</a>
        <Nav />
        <main id="main-content" tabIndex={-1}>
          {page}
        </main>
        <Footer />
        <ChatWidget />
      </MotionConfig>
    </ReactLenis>
  )
}

function RouteEffects({
  title,
  routeKey,
  pathname,
  search,
  hash,
}: {
  title: string
  routeKey: number
  pathname: string
  search: string
  hash: string
}) {
  const isFirstRender = useRef(true)
  const previousPathname = useRef(pathname)

  useEffect(() => {
    document.title = title
    const isArchivePagination = !isFirstRender.current && pathname === '/projects' && previousPathname.current === '/projects'

    const frame = window.requestAnimationFrame(() => {
      if (hash) {
        const targetId = safeDecodeURIComponent(hash.slice(1))
        const target = targetId ? document.getElementById(targetId) : null
        target?.scrollIntoView({ block: 'start' })
      } else if (isArchivePagination) {
        document.getElementById('archive-heading')?.scrollIntoView({
          block: 'start',
          behavior: prefersReducedMotion() ? 'auto' : 'smooth',
        })
      } else {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
      }

      if (isFirstRender.current) {
        isFirstRender.current = false
        previousPathname.current = pathname
        return
      }

      const focusTarget = isArchivePagination
        ? document.getElementById('archive-heading')
        : document.getElementById('route-heading') ?? document.getElementById('main-content')
      focusTarget?.focus({ preventScroll: true })
      previousPathname.current = pathname
    })

    return () => window.cancelAnimationFrame(frame)
  }, [hash, pathname, routeKey, search, title])

  return null
}
