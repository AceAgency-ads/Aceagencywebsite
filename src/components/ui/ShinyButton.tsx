'use client'

import { motion } from 'framer-motion'
import { type ReactNode } from 'react'

type ShinyButtonProps = {
  children: ReactNode
  className?: string
  onClick?: () => void
}

export function ShinyButton({
  children,
  className = '',
  onClick,
}: ShinyButtonProps) {
  return (
    <motion.button
      initial={{ '--x': '100%', scale: 1 } as any}
      animate={{ '--x': '-100%' } as any}
      whileTap={{ scale: 0.97 }}
      transition={{
        repeat: Infinity,
        repeatType: 'loop',
        repeatDelay: 1,
        type: 'spring',
        stiffness: 20,
        damping: 15,
        mass: 2,
        scale: {
          type: 'spring',
          stiffness: 200,
          damping: 5,
          mass: 0.5,
        },
      }}
      onClick={onClick}
      className={`relative rounded-lg px-6 py-2 font-medium backdrop-blur-xl transition-shadow duration-300 ease-in-out hover:shadow-lg hover:shadow-electric-violet/50 ${className}`}
    >
      <span
        className="relative block size-full text-sm uppercase tracking-wide"
        style={{
          maskImage:
            'linear-gradient(-75deg, white calc(var(--x) + 20%), transparent calc(var(--x) + 30%), white calc(var(--x) + 100%))',
        }}
      >
        {children}
      </span>
      <span
        style={{
          mask: 'linear-gradient(rgb(0,0,0), rgb(0,0,0)) content-box, linear-gradient(rgb(0,0,0), rgb(0,0,0))',
          maskComposite: 'exclude',
        }}
        className="absolute inset-0 z-10 block rounded-[inherit] bg-[linear-gradient(-75deg,rgba(102,242,166,0.1)_calc(var(--x)+20%),rgba(102,242,166,0.5)_calc(var(--x)+25%),rgba(102,242,166,0.1)_calc(var(--x)+100%))] p-px"
      ></span>
    </motion.button>
  )
}
