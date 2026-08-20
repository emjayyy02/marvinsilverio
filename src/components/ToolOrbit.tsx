import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react'
import type { KeyboardEvent, PointerEvent as ReactPointerEvent } from 'react'
import { useReducedMotion } from 'motion/react'
import type { SkillIconName } from '../data/content'
import { forceFullMotionForVisualQa } from '../lib/motionPreference'
import { ToolIcon } from './ToolIcon'

export interface ToolOrbitItem {
  id: string
  label: string
  group: string
  icon: SkillIconName
}

interface Rotation {
  yaw: number
  pitch: number
}

interface PointerState {
  id: number
  lastX: number
  lastY: number
  lastTime: number
}

const INITIAL_ROTATION: Rotation = { yaw: -0.42, pitch: -0.12 }
const DRAG_SENSITIVITY = 0.006
const MAX_PITCH = 0.92
const MAX_VELOCITY = 0.008
const MOMENTUM_LIMIT_MS = 1200
const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5))

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max)

export function ToolOrbit({ items }: { items: readonly ToolOrbitItem[] }) {
  const instructionId = useId()
  const shouldReduceMotion = Boolean(useReducedMotion()) && !forceFullMotionForVisualQa()
  const [rotation, setRotation] = useState<Rotation>(INITIAL_ROTATION)
  const [isDragging, setIsDragging] = useState(false)
  const [isCoasting, setIsCoasting] = useState(false)
  const rotationRef = useRef(rotation)
  const pointerRef = useRef<PointerState | null>(null)
  const velocityRef = useRef<Rotation>({ yaw: 0, pitch: 0 })
  const momentumFrameRef = useRef<number | null>(null)

  const coordinates = useMemo(() => items.map((_, index) => {
    const y = items.length === 1 ? 0 : 1 - (index / (items.length - 1)) * 2
    const radius = Math.sqrt(Math.max(0, 1 - y * y))
    const angle = GOLDEN_ANGLE * index
    return { x: Math.cos(angle) * radius, y, z: Math.sin(angle) * radius }
  }), [items])

  const commitRotation = useCallback((next: Rotation) => {
    rotationRef.current = next
    setRotation(next)
  }, [])

  const stopMomentum = useCallback((updateState = true) => {
    if (momentumFrameRef.current !== null) {
      window.cancelAnimationFrame(momentumFrameRef.current)
      momentumFrameRef.current = null
    }
    velocityRef.current = { yaw: 0, pitch: 0 }
    if (updateState) setIsCoasting(false)
  }, [])

  const startMomentum = useCallback(() => {
    if (shouldReduceMotion) {
      stopMomentum()
      return
    }

    const speed = Math.hypot(velocityRef.current.yaw, velocityRef.current.pitch)
    if (speed < 0.00005) {
      stopMomentum()
      return
    }

    setIsCoasting(true)
    const startedAt = performance.now()
    let previousTime = startedAt

    const tick = (time: number) => {
      const delta = Math.min(time - previousTime, 32)
      previousTime = time
      const velocity = velocityRef.current
      const current = rotationRef.current

      commitRotation({
        yaw: current.yaw + velocity.yaw * delta,
        pitch: clamp(current.pitch + velocity.pitch * delta, -MAX_PITCH, MAX_PITCH),
      })

      const decay = Math.pow(0.9, delta / 16.67)
      velocityRef.current = {
        yaw: velocity.yaw * decay,
        pitch: velocity.pitch * decay,
      }

      const nextSpeed = Math.hypot(velocityRef.current.yaw, velocityRef.current.pitch)
      if (nextSpeed < 0.00005 || time - startedAt >= MOMENTUM_LIMIT_MS) {
        stopMomentum()
        return
      }

      momentumFrameRef.current = window.requestAnimationFrame(tick)
    }

    momentumFrameRef.current = window.requestAnimationFrame(tick)
  }, [commitRotation, shouldReduceMotion, stopMomentum])

  useEffect(() => {
    const stopInteraction = () => {
      pointerRef.current = null
      setIsDragging(false)
      stopMomentum()
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState !== 'visible') stopInteraction()
    }

    window.addEventListener('blur', stopInteraction)
    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => {
      window.removeEventListener('blur', stopInteraction)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      stopMomentum(false)
    }
  }, [stopMomentum])

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'touch') event.preventDefault()
    stopMomentum()
    event.currentTarget.setPointerCapture(event.pointerId)
    pointerRef.current = {
      id: event.pointerId,
      lastX: event.clientX,
      lastY: event.clientY,
      lastTime: performance.now(),
    }
    velocityRef.current = { yaw: 0, pitch: 0 }
    setIsDragging(true)
  }

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const pointer = pointerRef.current
    if (!pointer || pointer.id !== event.pointerId) return

    const now = performance.now()
    const deltaTime = Math.max(now - pointer.lastTime, 8)
    const deltaX = event.clientX - pointer.lastX
    const deltaY = event.clientY - pointer.lastY
    const current = rotationRef.current

    commitRotation({
      yaw: current.yaw + deltaX * DRAG_SENSITIVITY,
      pitch: clamp(current.pitch + deltaY * DRAG_SENSITIVITY, -MAX_PITCH, MAX_PITCH),
    })

    const sampledVelocity = {
      yaw: clamp((deltaX * DRAG_SENSITIVITY) / deltaTime, -MAX_VELOCITY, MAX_VELOCITY),
      pitch: clamp((deltaY * DRAG_SENSITIVITY) / deltaTime, -MAX_VELOCITY, MAX_VELOCITY),
    }
    velocityRef.current = {
      yaw: velocityRef.current.yaw * 0.45 + sampledVelocity.yaw * 0.55,
      pitch: velocityRef.current.pitch * 0.45 + sampledVelocity.pitch * 0.55,
    }

    pointerRef.current = {
      id: pointer.id,
      lastX: event.clientX,
      lastY: event.clientY,
      lastTime: now,
    }
  }

  const finishPointerInteraction = (event: ReactPointerEvent<HTMLDivElement>, cancelled = false) => {
    const pointer = pointerRef.current
    if (!pointer || pointer.id !== event.pointerId) return

    pointerRef.current = null
    setIsDragging(false)
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }

    if (cancelled || performance.now() - pointer.lastTime > 80) {
      stopMomentum()
      return
    }
    startMomentum()
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const step = event.shiftKey ? 0.28 : 0.14
    const current = rotationRef.current
    let next: Rotation | null = null

    if (event.key === 'ArrowLeft') next = { ...current, yaw: current.yaw - step }
    if (event.key === 'ArrowRight') next = { ...current, yaw: current.yaw + step }
    if (event.key === 'ArrowUp') next = { ...current, pitch: clamp(current.pitch - step, -MAX_PITCH, MAX_PITCH) }
    if (event.key === 'ArrowDown') next = { ...current, pitch: clamp(current.pitch + step, -MAX_PITCH, MAX_PITCH) }
    if (event.key === 'Home') next = INITIAL_ROTATION
    if (event.key === 'Escape') {
      event.preventDefault()
      stopMomentum()
      return
    }

    if (!next) return
    event.preventDefault()
    stopMomentum()
    commitRotation(next)
  }

  const projectedItems = coordinates.map((point, index) => {
    const cosYaw = Math.cos(rotation.yaw)
    const sinYaw = Math.sin(rotation.yaw)
    const cosPitch = Math.cos(rotation.pitch)
    const sinPitch = Math.sin(rotation.pitch)
    const xAfterYaw = point.x * cosYaw + point.z * sinYaw
    const zAfterYaw = -point.x * sinYaw + point.z * cosYaw
    const yAfterPitch = point.y * cosPitch - zAfterYaw * sinPitch
    const zAfterPitch = point.y * sinPitch + zAfterYaw * cosPitch
    const depth = (zAfterPitch + 1) / 2

    return {
      item: items[index],
      left: 50 + xAfterYaw * 34,
      top: 50 - yAfterPitch * 34,
      scale: 0.78 + depth * 0.28,
      opacity: 0.54 + depth * 0.46,
      zIndex: Math.round(depth * 100) + 2,
    }
  })

  return (
    <div>
      <p id={instructionId} className="mb-4 text-center font-mono text-[0.68rem] uppercase tracking-[0.12em] text-muted-foreground">
        Drag to rotate <span aria-hidden="true">/</span> focus and use arrow keys
      </p>
      <div
        role="group"
        tabIndex={0}
        aria-label="Interactive globe of tools and skills"
        aria-describedby={instructionId}
        data-dragging={isDragging ? 'true' : 'false'}
        data-coasting={isCoasting ? 'true' : 'false'}
        className="tool-orbit relative mx-auto aspect-square w-full max-w-[32rem] select-none overflow-hidden rounded-full border border-border bg-surface text-foreground"
        onKeyDown={handleKeyDown}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={(event) => finishPointerInteraction(event)}
        onPointerCancel={(event) => finishPointerInteraction(event, true)}
      >
        <ul aria-label="Tools and skills">
          {projectedItems.map(({ item, left, top, scale, opacity, zIndex }) => (
            <li
              key={item.id}
              aria-label={`${item.label}, ${item.group}`}
              className="absolute grid size-[3.65rem] place-items-center rounded-card border border-border bg-background text-foreground sm:size-[4.4rem]"
              style={{
                left: `${left}%`,
                top: `${top}%`,
                zIndex,
                opacity,
                transform: `translate(-50%, -50%) scale(${scale})`,
              }}
            >
              <ToolIcon name={item.icon} className="size-5 sm:size-6" />
              <span className="sr-only">{item.label}</span>
            </li>
          ))}
        </ul>
        <span aria-hidden="true" className="absolute bottom-5 left-1/2 z-[110] -translate-x-1/2 whitespace-nowrap rounded-card border border-border bg-background/90 px-2 py-1 font-mono text-[0.58rem] uppercase tracking-[0.1em] text-muted-foreground backdrop-blur-sm">
          {isDragging ? 'Rotating' : isCoasting ? 'Momentum' : 'Drag the globe'}
        </span>
      </div>
      <ul className="mx-auto mt-5 flex max-w-[36rem] flex-wrap justify-center gap-x-4 gap-y-2" aria-label="Tool names">
        {items.map((item) => (
          <li key={`${item.id}-label`} className="pixel-tag font-mono text-[0.65rem] uppercase tracking-[0.08em] text-muted-foreground">{item.label}</li>
        ))}
      </ul>
    </div>
  )
}
