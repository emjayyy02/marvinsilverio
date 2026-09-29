import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from 'react'
import type { PointerEvent as ReactPointerEvent, RefObject } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'motion/react'
import { useLenis } from 'lenis/react'
import { usePrefersReducedMotion } from '../lib/motionPreference'
import { motionDuration, motionEase } from '../lib/motionTokens'
import { Icon } from './Icon'

interface ImageLightboxProps {
  open: boolean
  src: string
  alt: string
  title: string
  width: number
  height: number
  returnFocusRef: RefObject<HTMLButtonElement | null>
  onClose: () => void
}

const minimumZoom = 100
const maximumZoom = 300
const zoomStep = 25

export function ImageLightbox({ open, src, alt, title, width, height, returnFocusRef, onClose }: ImageLightboxProps) {
  const lenis = useLenis()
  const shouldReduceMotion = usePrefersReducedMotion()
  const titleId = useId()
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const dragRef = useRef({
    active: false,
    pointerId: null as number | null,
    startX: 0,
    startY: 0,
    startScrollLeft: 0,
    startScrollTop: 0,
  })
  const [zoom, setZoom] = useState(minimumZoom)
  const [isDragging, setIsDragging] = useState(false)
  const [viewportSize, setViewportSize] = useState({ width: 0, height: 0 })
  const stopDragging = useCallback(() => {
    const drag = dragRef.current
    const viewport = viewportRef.current
    dragRef.current = { ...drag, active: false, pointerId: null }
    setIsDragging(false)

    if (viewport && drag.pointerId !== null && viewport.hasPointerCapture(drag.pointerId)) {
      viewport.releasePointerCapture(drag.pointerId)
    }
  }, [])

  const handleZoomChange = useCallback((requestedZoom: number) => {
    const nextZoom = Math.max(minimumZoom, Math.min(maximumZoom, requestedZoom))
    const viewport = viewportRef.current
    if (!viewport || nextZoom === zoom) return

    const viewportBounds = viewport.getBoundingClientRect()
    const imageBounds = imageRef.current?.getBoundingClientRect()
    const imageOriginX = imageBounds
      ? imageBounds.left - viewportBounds.left - viewport.clientLeft + viewport.scrollLeft
      : 0
    const imageOriginY = imageBounds
      ? imageBounds.top - viewportBounds.top - viewport.clientTop + viewport.scrollTop
      : 0
    const oldScale = zoom / minimumZoom
    const centerX = (viewport.scrollLeft + viewport.clientWidth / 2 - imageOriginX) / oldScale
    const centerY = (viewport.scrollTop + viewport.clientHeight / 2 - imageOriginY) / oldScale

    setZoom(nextZoom)
    if (nextZoom === minimumZoom) stopDragging()

    requestAnimationFrame(() => {
      const currentViewport = viewportRef.current
      const currentImage = imageRef.current
      if (!currentViewport || !currentImage) return

      const nextViewportBounds = currentViewport.getBoundingClientRect()
      const nextImageBounds = currentImage.getBoundingClientRect()
      const nextImageOriginX = nextImageBounds.left - nextViewportBounds.left - currentViewport.clientLeft + currentViewport.scrollLeft
      const nextImageOriginY = nextImageBounds.top - nextViewportBounds.top - currentViewport.clientTop + currentViewport.scrollTop
      const nextScale = nextZoom / minimumZoom

      currentViewport.scrollLeft = nextImageOriginX + centerX * nextScale - currentViewport.clientWidth / 2
      currentViewport.scrollTop = nextImageOriginY + centerY * nextScale - currentViewport.clientHeight / 2
    })
  }, [stopDragging, zoom])

  const handlePointerMove = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current
    if (!drag.active || drag.pointerId !== event.pointerId) return

    event.currentTarget.scrollLeft = drag.startScrollLeft - (event.clientX - drag.startX)
    event.currentTarget.scrollTop = drag.startScrollTop - (event.clientY - drag.startY)
  }, [])

  const handlePointerEnd = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current
    if (!drag.active || drag.pointerId !== event.pointerId) return

    dragRef.current = { ...drag, active: false, pointerId: null }
    setIsDragging(false)
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
  }, [])

  const handleClose = useCallback(() => {
    stopDragging()
    setZoom(minimumZoom)
    onClose()
  }, [onClose, stopDragging])

  useLayoutEffect(() => {
    if (!open || !viewportRef.current) return

    const viewport = viewportRef.current
    const measure = () => setViewportSize({ width: viewport.clientWidth, height: viewport.clientHeight })
    measure()

    if (typeof ResizeObserver !== 'undefined') {
      const observer = new ResizeObserver(measure)
      observer.observe(viewport)
      window.addEventListener('resize', measure)
      return () => {
        observer.disconnect()
        window.removeEventListener('resize', measure)
      }
    }

    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [open])

  useEffect(() => {
    if (!open) return

    const previousOverflow = document.body.style.overflow
    const previousRootOverflow = document.documentElement.style.overflow
    const shouldRestartLenis = Boolean(lenis && !lenis.isStopped)
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'
    lenis?.stop()
    closeButtonRef.current?.focus()

    const getFocusableElements = () => Array.from(
      dialogRef.current?.querySelectorAll<HTMLElement>('button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])') ?? [],
    ).filter((element) => element.getClientRects().length > 0)

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        handleClose()
        return
      }

      if (event.key !== 'Tab') return

      const focusableElements = getFocusableElements()
      const firstElement = focusableElements[0]
      const lastElement = focusableElements.at(-1)
      if (!firstElement || !lastElement) return

      if (!dialogRef.current?.contains(document.activeElement)) {
        event.preventDefault()
        closeButtonRef.current?.focus()
      } else if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault()
        lastElement.focus()
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault()
        firstElement.focus()
      }
    }

    const handleFocusIn = (event: FocusEvent) => {
      if (event.target instanceof Node && !dialogRef.current?.contains(event.target)) {
        closeButtonRef.current?.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('focusin', handleFocusIn)
    return () => {
      document.body.style.overflow = previousOverflow
      document.documentElement.style.overflow = previousRootOverflow
      if (shouldRestartLenis) lenis?.start()
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('focusin', handleFocusIn)
    }
  }, [open, handleClose, lenis])

  const fitScale = viewportSize.width > 0 && viewportSize.height > 0
    ? Math.min(viewportSize.width / width, viewportSize.height / height, 1)
    : 0
  const imageWidth = Math.max(1, Math.round(width * fitScale * zoom / minimumZoom))
  const imageHeight = Math.max(1, Math.round(height * fitScale * zoom / minimumZoom))
  const canvasWidth = Math.max(viewportSize.width, imageWidth)
  const canvasHeight = Math.max(viewportSize.height, imageHeight)

  const handleExitComplete = () => {
    if (!open) returnFocusRef.current?.focus()
  }

  return createPortal(
    <AnimatePresence onExitComplete={handleExitComplete}>
      {open && (
        <motion.div
          key="image-lightbox-backdrop"
          className="fixed inset-0 z-[90] grid place-items-center overflow-hidden bg-black/75 backdrop-blur-sm"
          style={{
            paddingTop: 'max(0.5rem, env(safe-area-inset-top))',
            paddingRight: 'max(0.5rem, env(safe-area-inset-right))',
            paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom))',
            paddingLeft: 'max(0.5rem, env(safe-area-inset-left))',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : motionDuration.fast }}
          onPointerDown={(event) => {
            if (event.target === event.currentTarget) handleClose()
          }}
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            data-lenis-prevent
            className="grid min-h-0 grid-rows-[auto_auto_minmax(0,1fr)] overflow-hidden rounded-card border border-white/20 bg-background shadow-card"
            style={{ width: 'min(84rem, 100%)', height: 'min(94dvh, 100%)' }}
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.985 }}
            transition={{ duration: shouldReduceMotion ? 0 : motionDuration.normal, ease: motionEase.out }}
            onPointerDown={(event) => event.stopPropagation()}
          >
            <div className="flex min-h-14 min-w-0 items-center justify-between gap-3 border-b border-border px-3 sm:px-4">
              <h2 id={titleId} className="min-w-0 truncate text-sm font-medium text-foreground">{title}</h2>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={handleClose}
                aria-label="Close image viewer"
                className="interactive-control button-secondary grid size-11 shrink-0 place-items-center rounded-card border border-border bg-muted text-foreground"
              >
                <Icon name="close" />
              </button>
            </div>

            <div className="flex min-h-14 items-center justify-between gap-2 border-b border-border px-3 sm:px-4">
              <span className="sr-only">Image zoom controls</span>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => handleZoomChange(zoom - zoomStep)}
                  disabled={zoom === minimumZoom}
                  aria-label="Zoom out"
                  className="interactive-control button-secondary grid size-10 place-items-center rounded-card border border-border bg-background text-foreground disabled:cursor-not-allowed disabled:opacity-45"
                >
                  <ZoomIcon kind="out" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    stopDragging()
                    setZoom(minimumZoom)
                    const viewport = viewportRef.current
                    if (viewport) {
                      viewport.scrollLeft = 0
                      viewport.scrollTop = 0
                    }
                  }}
                  disabled={zoom === minimumZoom}
                  aria-label="Reset zoom to 100 percent"
                  className="interactive-control button-secondary min-h-10 rounded-card border border-border bg-background px-3 text-xs font-medium text-foreground disabled:cursor-not-allowed disabled:opacity-45"
                >
                  Reset
                </button>
                <button
                  type="button"
                  onClick={() => handleZoomChange(zoom + zoomStep)}
                  disabled={zoom === maximumZoom}
                  aria-label="Zoom in"
                  className="interactive-control button-secondary grid size-10 place-items-center rounded-card border border-border bg-background text-foreground disabled:cursor-not-allowed disabled:opacity-45"
                >
                  <ZoomIcon kind="in" />
                </button>
              </div>
              <output aria-live="polite" aria-atomic="true" className="min-w-12 text-right font-mono text-xs tabular-nums text-muted-foreground">
                {zoom}%
              </output>
            </div>

            <div
              ref={viewportRef}
              className={`min-h-0 overflow-auto overscroll-contain bg-black ${zoom > minimumZoom ? (isDragging ? 'cursor-grabbing' : 'cursor-grab') : 'cursor-auto'} select-none`}
              data-lenis-prevent
              onPointerDown={(event) => {
                if (zoom <= minimumZoom || event.pointerType !== 'mouse' || event.button !== 0) return

                const viewport = event.currentTarget
                dragRef.current = {
                  active: true,
                  pointerId: event.pointerId,
                  startX: event.clientX,
                  startY: event.clientY,
                  startScrollLeft: viewport.scrollLeft,
                  startScrollTop: viewport.scrollTop,
                }
                viewport.setPointerCapture(event.pointerId)
                setIsDragging(true)
                event.preventDefault()
              }}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerEnd}
              onPointerCancel={handlePointerEnd}
              onLostPointerCapture={handlePointerEnd}
            >
              <div
                className="grid place-items-center"
                style={{ width: canvasWidth, height: canvasHeight, minWidth: '100%', minHeight: '100%' }}
              >
                <img
                  ref={imageRef}
                  src={src}
                  alt={alt}
                  width={width}
                  height={height}
                  draggable={false}
                  className="block max-w-none select-none"
                  style={{ width: imageWidth, height: imageHeight, objectFit: 'contain' }}
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}

function ZoomIcon({ kind }: { kind: 'in' | 'out' }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
      <path d="M5 12h14" />
      {kind === 'in' && <path d="M12 5v14" />}
    </svg>
  )
}
