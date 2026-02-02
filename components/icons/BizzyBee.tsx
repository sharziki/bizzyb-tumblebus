'use client'

import { motion } from 'framer-motion'

interface BizzyBeeProps {
  className?: string
  animate?: boolean
}

export function BizzyBee({ className = 'w-24 h-24', animate = true }: BizzyBeeProps) {
  return (
    <motion.svg
      className={className}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      animate={animate ? { y: [-2, 2, -2] } : undefined}
      transition={animate ? { y: { repeat: Infinity, duration: 0.8, ease: 'easeInOut' } } : undefined}
    >
      {/* Wings */}
      <motion.ellipse
        cx="35"
        cy="45"
        rx="18"
        ry="12"
        fill="#E0F2FE"
        stroke="#0EA5E9"
        strokeWidth="1.5"
        animate={animate ? { rotate: [0, 15, 0, -15, 0] } : undefined}
        transition={animate ? { repeat: Infinity, duration: 0.15, ease: 'easeInOut' } : undefined}
        style={{ originX: '55px', originY: '50px' }}
      />
      <motion.ellipse
        cx="85"
        cy="45"
        rx="18"
        ry="12"
        fill="#E0F2FE"
        stroke="#0EA5E9"
        strokeWidth="1.5"
        animate={animate ? { rotate: [0, -15, 0, 15, 0] } : undefined}
        transition={animate ? { repeat: Infinity, duration: 0.15, ease: 'easeInOut' } : undefined}
        style={{ originX: '65px', originY: '50px' }}
      />
      
      {/* Body */}
      <ellipse cx="60" cy="65" rx="28" ry="32" fill="#FCD34D" />
      
      {/* Stripes */}
      <path d="M35 55 Q60 50 85 55" stroke="#1E293B" strokeWidth="6" strokeLinecap="round" />
      <path d="M33 70 Q60 65 87 70" stroke="#1E293B" strokeWidth="6" strokeLinecap="round" />
      <path d="M35 85 Q60 80 85 85" stroke="#1E293B" strokeWidth="6" strokeLinecap="round" />
      
      {/* Head */}
      <circle cx="60" cy="30" r="18" fill="#FCD34D" />
      
      {/* Eyes */}
      <circle cx="52" cy="28" r="5" fill="#1E293B" />
      <circle cx="68" cy="28" r="5" fill="#1E293B" />
      <circle cx="53" cy="26" r="1.5" fill="white" />
      <circle cx="69" cy="26" r="1.5" fill="white" />
      
      {/* Smile */}
      <path d="M52 36 Q60 42 68 36" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      
      {/* Antennae */}
      <path d="M50 15 Q48 5 42 3" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M70 15 Q72 5 78 3" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" fill="none" />
      <circle cx="42" cy="3" r="3" fill="#F97316" />
      <circle cx="78" cy="3" r="3" fill="#F97316" />
      
      {/* Stinger */}
      <path d="M60 97 L60 108" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
    </motion.svg>
  )
}
