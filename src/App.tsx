import { MotionConfig } from 'motion/react'
import { ReactLenis } from 'lenis/react'
import { ChatWidget } from './components/ChatWidget'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Nav } from './components/Nav'
import { Projects } from './components/Projects'
import { Skills } from './components/Skills'
import { forceFullMotionForVisualQa } from './lib/motionPreference'

export default function App() {
  const motionPreference = forceFullMotionForVisualQa() ? 'never' : 'user'

  return (
    <ReactLenis
      root
      autoRaf
      options={{
        lerp: 0.1,
        smoothWheel: true,
        syncTouch: false,
        anchors: true,
        stopInertiaOnNavigate: true,
        respectReducedMotion: true,
      }}
    >
      <MotionConfig reducedMotion={motionPreference}>
        <a href="#main-content" className="sr-only z-[100] rounded-card bg-primary px-4 py-3 text-sm font-medium text-primary-foreground focus:fixed focus:left-4 focus:top-4 focus:not-sr-only">Skip to content</a>
        <Nav />
        <main id="main-content" tabIndex={-1}>
          <Hero />
          <Projects />
          <Skills />
          <Contact />
        </main>
        <Footer />
        <ChatWidget />
      </MotionConfig>
    </ReactLenis>
  )
}
