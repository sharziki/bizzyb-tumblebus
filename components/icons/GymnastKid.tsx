'use client'

import { motion } from 'framer-motion'

interface GymnastKidProps {
  className?: string
  variant?: 'tumble' | 'jump' | 'balance'
  color?: string
}

export function GymnastKid({ 
  className = 'w-16 h-16', 
  variant = 'tumble',
  color = '#F97316'
}: GymnastKidProps) {
  if (variant === 'tumble') {
    return (
      <motion.svg
        className={className}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
      >
        {/* Body curved in tumble position */}
        <circle cx="32" cy="20" r="8" fill={color} /> {/* Head */}
        <path 
          d="M28 28 Q20 40 28 52" 
          stroke={color} 
          strokeWidth="6" 
          strokeLinecap="round" 
          fill="none" 
        /> {/* Body */}
        {/* Arms */}
        <path d="M26 32 L16 26" stroke={color} strokeWidth="4" strokeLinecap="round" />
        <path d="M24 42 L14 48" stroke={color} strokeWidth="4" strokeLinecap="round" />
        {/* Legs */}
        <path d="M28 50 L38 44" stroke={color} strokeWidth="4" strokeLinecap="round" />
        <path d="M32 48 L42 54" stroke={color} strokeWidth="4" strokeLinecap="round" />
      </motion.svg>
    )
  }

  if (variant === 'jump') {
    return (
      <motion.svg
        className={className}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        animate={{ y: [0, -8, 0] }}
        transition={{ repeat: Infinity, duration: 0.6, ease: 'easeInOut' }}
      >
        <circle cx="32" cy="12" r="8" fill={color} /> {/* Head */}
        <path d="M32 20 L32 38" stroke={color} strokeWidth="6" strokeLinecap="round" /> {/* Body */}
        {/* Arms up */}
        <path d="M32 24 L22 14" stroke={color} strokeWidth="4" strokeLinecap="round" />
        <path d="M32 24 L42 14" stroke={color} strokeWidth="4" strokeLinecap="round" />
        {/* Legs spread */}
        <path d="M32 38 L22 54" stroke={color} strokeWidth="4" strokeLinecap="round" />
        <path d="M32 38 L42 54" stroke={color} strokeWidth="4" strokeLinecap="round" />
      </motion.svg>
    )
  }

  // Balance
  return (
    <motion.svg
      className={className}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      animate={{ rotate: [-5, 5, -5] }}
      transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
    >
      <circle cx="32" cy="10" r="7" fill={color} /> {/* Head */}
      <path d="M32 17 L32 38" stroke={color} strokeWidth="5" strokeLinecap="round" /> {/* Body */}
      {/* Arms out for balance */}
      <path d="M32 24 L14 28" stroke={color} strokeWidth="4" strokeLinecap="round" />
      <path d="M32 24 L50 28" stroke={color} strokeWidth="4" strokeLinecap="round" />
      {/* One leg up */}
      <path d="M32 38 L28 56" stroke={color} strokeWidth="4" strokeLinecap="round" />
      <path d="M32 38 L48 34" stroke={color} strokeWidth="4" strokeLinecap="round" />
      {/* Balance beam */}
      <rect x="8" y="58" width="48" height="4" rx="2" fill="#1E293B" />
    </motion.svg>
  )
}
