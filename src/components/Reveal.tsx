import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { forceFullMotionForVisualQa } from '../lib/motionPreference'

export function Reveal({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  const shouldReduceMotion = useReducedMotion() && !forceFullMotionForVisualQa()

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16, margin: '0px 0px -8% 0px' }}
      transition={{ duration: shouldReduceMotion ? 0.2 : 0.76, delay: shouldReduceMotion ? 0 : delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}
