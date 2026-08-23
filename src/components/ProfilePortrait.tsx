import { useCallback, useEffect, useId, useState } from 'react'
import { motion } from 'motion/react'
import type { ProfileImageContent } from '../data/content'
import { usePrefersReducedMotion } from '../lib/motionPreference'
import { motionDuration, motionEase } from '../lib/motionTokens'
import { Icon } from './Icon'

const organicSplashPath = 'M 50 13 C 58 15 61 23 68 26 C 76 29 85 33 86 42 C 88 50 80 55 79 63 C 78 73 72 82 62 83 C 54 85 49 91 41 86 C 34 81 34 73 27 68 C 19 62 14 54 17 45 C 19 37 28 34 32 27 C 36 20 42 15 50 13 Z'

const splashLobes = [
  { cx: 49, cy: 20, rx: 4, ry: 7, delay: 0.16, rotate: -5 },
  { cx: 71, cy: 33, rx: 6, ry: 4.5, delay: 0.21, rotate: 28 },
  { cx: 82, cy: 48, rx: 7.5, ry: 5, delay: 0.25, rotate: -8 },
  { cx: 68, cy: 73, rx: 5.5, ry: 4, delay: 0.29, rotate: 36 },
  { cx: 48, cy: 82, rx: 4.5, ry: 7, delay: 0.32, rotate: 4 },
  { cx: 29, cy: 69, rx: 6, ry: 4.5, delay: 0.28, rotate: -32 },
  { cx: 19, cy: 52, rx: 7.5, ry: 5, delay: 0.23, rotate: 7 },
  { cx: 33, cy: 28, rx: 5.5, ry: 4, delay: 0.19, rotate: 34 },
] as const

let portraitHasRevealed = false

export function ProfilePortrait({ image }: { image: ProfileImageContent }) {
  const shouldReduceMotion = usePrefersReducedMotion()
  const maskId = `portrait-splash-${useId().replace(/:/g, '')}`
  const [hasLoaded, setHasLoaded] = useState(false)
  const [hasFailed, setHasFailed] = useState(false)
  const [isRevealed, setIsRevealed] = useState(() => portraitHasRevealed || shouldReduceMotion)
  const shouldAnimate = Boolean(image.src) && hasLoaded && !hasFailed && !shouldReduceMotion && !isRevealed

  const finishReveal = useCallback(() => {
    portraitHasRevealed = true
    setIsRevealed(true)
  }, [])

  useEffect(() => {
    if (shouldReduceMotion && !isRevealed) finishReveal()
  }, [finishReveal, isRevealed, shouldReduceMotion])

  useEffect(() => {
    if (!shouldAnimate) return
    const fallbackTimer = window.setTimeout(finishReveal, 1400)
    return () => window.clearTimeout(fallbackTimer)
  }, [finishReveal, shouldAnimate])

  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-full border border-border bg-surface" data-portrait-state={hasFailed ? 'fallback' : shouldAnimate ? 'revealing' : 'ready'}>
      {image.src && !hasFailed ? (
        <>
          <img
            src={image.src}
            alt={image.alt}
            width="554"
            height="541"
            className={`absolute inset-0 size-full object-cover ${hasLoaded && (!shouldAnimate || isRevealed) ? 'opacity-100' : 'opacity-0'}`}
            loading="eager"
            decoding="async"
            fetchPriority="high"
            onLoad={() => setHasLoaded(true)}
            onError={() => setHasFailed(true)}
          />

          {shouldAnimate && (
            <svg viewBox="0 0 100 100" className="absolute inset-0 size-full" aria-hidden="true" focusable="false">
              <defs>
                <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100">
                  <rect width="100" height="100" fill="black" />
                  <motion.path
                    d={organicSplashPath}
                    fill="white"
                    style={{ transformOrigin: '50px 50px' }}
                    initial={{ scale: 0.04, rotate: -6 }}
                    animate={{ scale: [0.04, 0.18, 0.72, 1.58], rotate: [-6, 2, -2, 0] }}
                    transition={{ duration: motionDuration.portraitSplash, times: [0, 0.16, 0.62, 1], ease: motionEase.out }}
                    onAnimationComplete={finishReveal}
                  />
                  {splashLobes.map((lobe, index) => (
                    <motion.ellipse
                      key={`${lobe.cx}-${lobe.cy}`}
                      cx={lobe.cx}
                      cy={lobe.cy}
                      rx={lobe.rx}
                      ry={lobe.ry}
                      fill="white"
                      style={{ transformOrigin: `${lobe.cx}px ${lobe.cy}px` }}
                      initial={{ opacity: 0, scale: 0.12, rotate: lobe.rotate }}
                      animate={{ opacity: [0, 1, 1], scale: [0.12, 0.82, 1.42], rotate: [lobe.rotate, lobe.rotate / -3, 0] }}
                      transition={{ duration: 0.58 + index * 0.012, delay: lobe.delay, times: [0, 0.36, 1], ease: motionEase.out }}
                    />
                  ))}
                </mask>
              </defs>
              <image
                href={image.src}
                width="100"
                height="100"
                preserveAspectRatio="xMidYMid slice"
                mask={`url(#${maskId})`}
                onError={() => setHasFailed(true)}
              />
            </svg>
          )}
        </>
      ) : (
        <PortraitFallback />
      )}
    </div>
  )
}

function PortraitFallback() {
  return (
    <div className="grid size-full place-items-center bg-muted text-muted-foreground" aria-hidden="true">
      <div className="flex flex-col items-center gap-3">
        <Icon name="image" className="size-6" />
        <span className="font-mono text-[0.65rem] font-medium uppercase tracking-[0.14em]">Portrait</span>
      </div>
    </div>
  )
}
