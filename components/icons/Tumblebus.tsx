'use client'

import { motion } from 'framer-motion'

interface TumblebusProps {
  className?: string
  animate?: boolean
}

export function Tumblebus({ className = 'w-64 h-40', animate = true }: TumblebusProps) {
  return (
    <motion.svg
      className={className}
      viewBox="0 0 280 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      animate={animate ? { x: [0, 2, 0, -2, 0], rotate: [0, 0.5, 0, -0.5, 0] } : undefined}
      transition={animate ? { repeat: Infinity, duration: 0.5, ease: 'easeInOut' } : undefined}
    >
      {/* Bus body */}
      <rect x="20" y="50" width="240" height="70" rx="8" fill="#FCD34D" />
      
      {/* Bus top (rounded) */}
      <path d="M28 50 L28 35 Q28 20 43 20 L237 20 Q252 20 252 35 L252 50" fill="#FCD34D" />
      
      {/* Stripe */}
      <rect x="20" y="85" width="240" height="12" fill="#1E293B" />
      
      {/* Front hood */}
      <path d="M235 50 L260 50 Q270 50 270 60 L270 120 L235 120 Z" fill="#F59E0B" />
      
      {/* Windows */}
      <rect x="35" y="28" width="35" height="25" rx="3" fill="#0EA5E9" fillOpacity="0.3" stroke="#1E293B" strokeWidth="2" />
      <rect x="80" y="28" width="35" height="25" rx="3" fill="#0EA5E9" fillOpacity="0.3" stroke="#1E293B" strokeWidth="2" />
      <rect x="125" y="28" width="35" height="25" rx="3" fill="#0EA5E9" fillOpacity="0.3" stroke="#1E293B" strokeWidth="2" />
      <rect x="170" y="28" width="35" height="25" rx="3" fill="#0EA5E9" fillOpacity="0.3" stroke="#1E293B" strokeWidth="2" />
      
      {/* Door */}
      <rect x="40" y="58" width="30" height="45" rx="2" fill="#0EA5E9" fillOpacity="0.3" stroke="#1E293B" strokeWidth="2" />
      <rect x="55" y="75" width="3" height="15" rx="1" fill="#1E293B" />
      
      {/* TUMBLEBUS text */}
      <text x="140" y="112" textAnchor="middle" fill="white" fontWeight="bold" fontSize="11" fontFamily="system-ui">
        TUMBLEBUS
      </text>
      
      {/* Headlight */}
      <circle cx="260" cy="75" r="8" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="2" />
      
      {/* Stop sign arm */}
      <rect x="5" y="45" width="20" height="3" fill="#1E293B" />
      <polygon points="0,35 0,55 8,55 8,40 15,40 15,35" fill="#EF4444" />
      
      {/* Bumper */}
      <rect x="20" y="120" width="250" height="8" rx="2" fill="#374151" />
      
      {/* Wheels */}
      <g>
        <motion.g
          animate={animate ? { rotate: 360 } : undefined}
          transition={animate ? { repeat: Infinity, duration: 1, ease: 'linear' } : undefined}
          style={{ originX: '65px', originY: '128px' }}
        >
          <circle cx="65" cy="128" r="18" fill="#374151" />
          <circle cx="65" cy="128" r="12" fill="#6B7280" />
          <circle cx="65" cy="128" r="4" fill="#374151" />
          <path d="M65 116 L65 140 M53 128 L77 128" stroke="#374151" strokeWidth="3" />
        </motion.g>
        
        <motion.g
          animate={animate ? { rotate: 360 } : undefined}
          transition={animate ? { repeat: Infinity, duration: 1, ease: 'linear' } : undefined}
          style={{ originX: '215px', originY: '128px' }}
        >
          <circle cx="215" cy="128" r="18" fill="#374151" />
          <circle cx="215" cy="128" r="12" fill="#6B7280" />
          <circle cx="215" cy="128" r="4" fill="#374151" />
          <path d="M215 116 L215 140 M203 128 L227 128" stroke="#374151" strokeWidth="3" />
        </motion.g>
      </g>
      
      {/* Exhaust puffs */}
      {animate && (
        <>
          <motion.circle
            cx="15"
            cy="125"
            r="5"
            fill="#9CA3AF"
            fillOpacity="0.5"
            animate={{ x: [-10, -30], y: [0, -10], scale: [1, 1.5], opacity: [0.5, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeOut' }}
          />
          <motion.circle
            cx="15"
            cy="125"
            r="4"
            fill="#9CA3AF"
            fillOpacity="0.5"
            animate={{ x: [-10, -25], y: [0, -15], scale: [1, 1.3], opacity: [0.5, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeOut', delay: 0.5 }}
          />
        </>
      )}
    </motion.svg>
  )
}
