'use client'

import { useInView, useSpring, useTransform, motion } from 'framer-motion'
import { useEffect, useRef } from 'react'

type CountUpProps = {
  value: number
  className?: string
  suffix?: string
  prefix?: string
  duration?: number
}

export function CountUp({
  value,
  className = '',
  suffix = '',
  prefix = '',
  duration = 2,
}: CountUpProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const spring = useSpring(0, {
    stiffness: 100,
    damping: 30,
    duration: duration * 1000,
  })

  const display = useTransform(spring, (current) => {
    return `${prefix}${Math.round(current).toLocaleString()}${suffix}`
  })

  useEffect(() => {
    if (isInView) {
      spring.set(value)
    }
  }, [isInView, spring, value])

  return (
    <motion.span ref={ref} className={className}>
      {display}
    </motion.span>
  )
}
