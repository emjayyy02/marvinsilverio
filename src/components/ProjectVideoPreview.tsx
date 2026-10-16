import { useEffect, useRef, useState } from 'react'
import { usePrefersReducedMotion } from '../lib/motionPreference'

export function ProjectVideoPreview({ src, poster, title }: { src: string; poster: string; title: string }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const playButtonRef = useRef<HTMLButtonElement>(null)
  const attemptedHover = useRef(false)
  const [hasStarted, setHasStarted] = useState(false)
  const [userPaused, setUserPaused] = useState(false)
  const [isStarting, setIsStarting] = useState(false)
  const [failed, setFailed] = useState(false)
  const [playRejected, setPlayRejected] = useState(false)
  const shouldReduceMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (hasStarted && document.activeElement === playButtonRef.current) videoRef.current?.focus()
  }, [hasStarted])

  async function start() {
    const video = videoRef.current
    if (!video || hasStarted || userPaused || isStarting || failed) return
    attemptedHover.current = true
    video.muted = true
    setIsStarting(true)
    setPlayRejected(false)
    try {
      await video.play()
    } catch {
      // A rejected autoplay request leaves the poster and explicit Play available.
      setPlayRejected(true)
    } finally {
      setIsStarting(false)
    }
  }

  return (
    <div
      className="relative aspect-[2/1] overflow-hidden rounded-card border border-border bg-muted p-1.5"
      onPointerEnter={(event) => {
        if (event.pointerType === 'mouse' && window.matchMedia('(any-hover: hover) and (any-pointer: fine)').matches && !attemptedHover.current && !hasStarted && !userPaused) {
          void start()
        }
      }}
    >
      <div className="relative h-full w-full overflow-hidden rounded-[calc(var(--radius)-2px)] border border-border bg-muted">
        <img src={poster} alt={`${title} film preview`} width={1280} height={720} className="absolute inset-0 h-full w-full object-contain" />
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          width={1920}
          height={1080}
          preload="metadata"
          muted
          playsInline
          loop
          controls={hasStarted && !failed}
          tabIndex={hasStarted && !failed ? 0 : -1}
          aria-label={`${title} video preview`}
          className={`relative h-full w-full object-contain ${hasStarted && !failed ? 'visible' : 'invisible'}`}
          onPlaying={() => {
            setHasStarted(true)
            setUserPaused(false)
            setIsStarting(false)
          }}
          onPause={() => { if (hasStarted) setUserPaused(true) }}
          onError={() => { setFailed(true); setIsStarting(false) }}
        />
        {!failed && (
          <button
            ref={playButtonRef}
            type="button"
            aria-label={`Play ${title} video preview`}
            aria-busy={isStarting}
            aria-disabled={isStarting}
            tabIndex={hasStarted ? -1 : 0}
            onClick={() => { void start() }}
            className={`absolute inset-0 flex flex-col items-center justify-center gap-2 text-foreground focus-visible:-outline-offset-4 ${shouldReduceMotion ? '' : 'transition-opacity duration-200'} ${hasStarted ? 'pointer-events-none opacity-0' : 'cursor-pointer opacity-100'}`}
            aria-hidden={hasStarted ? true : undefined}
          >
            <span className="flex size-12 items-center justify-center rounded-full border border-border bg-background shadow-card">
              <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true"><path d="m9 5 11 7-11 7Z" fill="currentColor" /></svg>
            </span>
            <span className="text-xs font-medium text-white [text-shadow:0_1px_3px_rgb(0_0_0/80%)]">
            {isStarting ? 'Starting preview…' : <><span className="hidden [@media(any-hover:hover)_and_(any-pointer:fine)]:inline">Hover to preview</span><span className="[@media(any-hover:hover)_and_(any-pointer:fine)]:hidden">Play preview</span></>}
            </span>
          </button>
        )}
        <p role="status" className={failed || playRejected ? 'absolute inset-x-2 bottom-2 rounded-card border border-border bg-background px-2 py-1 text-center text-xs text-muted-foreground' : 'sr-only'}>
          {failed ? 'Video preview unavailable.' : playRejected ? 'Preview could not start. Press Play to try again.' : ''}
        </p>
      </div>
    </div>
  )
}
