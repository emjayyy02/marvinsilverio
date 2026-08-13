import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { forceFullMotionForVisualQa, withVisualQaCacheBust } from '../lib/motionPreference'

interface Fragment {
  id: string
  column: number
  row: number
  x: number
  y: number
  delay: number
}

const columns = 4
const rows = 4

// Deterministic offsets keep the logo assembly consistent between renders.
const fragments: Fragment[] = Array.from({ length: columns * rows }, (_, index) => {
  const column = index % columns
  const row = Math.floor(index / columns)
  const directionX = (column + row) % 2 === 0 ? 1 : -1
  const directionY = (column * 2 + row) % 3 === 0 ? 1 : -1

  return {
    id: `${column}-${row}`,
    column,
    row,
    x: directionX * (48 + ((index * 17) % 72)),
    y: directionY * (42 + ((index * 23) % 64)),
    delay: ((column + row) / (columns + rows - 2)) * 0.2,
  }
})

export function MascotLogo({ src, alt }: { src: string; alt: string }) {
  const shouldReduceMotion = useReducedMotion() && !forceFullMotionForVisualQa()
  const imageSrc = withVisualQaCacheBust(src)
  const [loadState, setLoadState] = useState<'loading' | 'loaded' | 'error'>('loading')
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    let isCurrent = true
    const image = new Image()
    image.onload = () => {
      if (isCurrent) setLoadState('loaded')
    }
    image.onerror = () => {
      if (isCurrent) setLoadState('error')
    }
    image.src = imageSrc

    return () => {
      isCurrent = false
      image.onload = null
      image.onerror = null
    }
  }, [imageSrc])

  useEffect(() => {
    if (loadState !== 'loaded' || shouldReduceMotion) return
    const timeoutId = window.setTimeout(() => setIsComplete(true), 1550)
    return () => window.clearTimeout(timeoutId)
  }, [loadState, shouldReduceMotion])

  if (loadState === 'error') {
    return (
      <span className="grid size-full place-items-center border border-border bg-muted font-mono text-lg font-semibold text-foreground" aria-label={`${alt} Image unavailable.`} role="img">
        MS
      </span>
    )
  }

  if (loadState !== 'loaded') {
    return <span className="block size-full" aria-hidden="true" />
  }

  if (shouldReduceMotion) {
    return (
      <motion.img
        src={imageSrc}
        alt={alt}
        className="pixel-art size-full object-contain"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      />
    )
  }

  return (
    <div className="relative size-full overflow-visible" aria-label={alt} role="img">
      <motion.img
        src={imageSrc}
        alt=""
        className="pixel-art absolute inset-0 size-full object-contain"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.12, delay: 1.38 }}
      />

      {!isComplete && (
        <div aria-hidden="true" className="absolute inset-0 overflow-visible">
          {fragments.map((fragment) => (
            <motion.span
              key={fragment.id}
              className="pixel-art absolute block"
              style={{
                width: `${100 / columns}%`,
                height: `${100 / rows}%`,
                left: `${(fragment.column * 100) / columns}%`,
                top: `${(fragment.row * 100) / rows}%`,
                backgroundImage: `url(${imageSrc})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: `${columns * 100}% ${rows * 100}%`,
                backgroundPosition: `${(fragment.column * 100) / (columns - 1)}% ${(fragment.row * 100) / (rows - 1)}%`,
              }}
              initial={{ opacity: 0.7, x: fragment.x, y: fragment.y, scale: 0.72 }}
              animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
              transition={{ duration: 0.84, delay: 0.45 + fragment.delay, ease: [0.33, 0, 0.25, 1] }}
            />
          ))}
        </div>
      )}
    </div>
  )
}
