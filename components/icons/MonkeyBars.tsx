'use client'

interface MonkeyBarsProps {
  className?: string
}

export function MonkeyBars({ className = 'w-12 h-12' }: MonkeyBarsProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Monkey body */}
      <ellipse cx="32" cy="36" rx="12" ry="14" fill="#8B5A2B" />
      
      {/* Monkey head */}
      <circle cx="32" cy="20" r="12" fill="#8B5A2B" />
      
      {/* Face */}
      <ellipse cx="32" cy="22" rx="8" ry="7" fill="#DEB887" />
      
      {/* Ears */}
      <circle cx="20" cy="18" r="5" fill="#8B5A2B" />
      <circle cx="20" cy="18" r="3" fill="#DEB887" />
      <circle cx="44" cy="18" r="5" fill="#8B5A2B" />
      <circle cx="44" cy="18" r="3" fill="#DEB887" />
      
      {/* Eyes */}
      <circle cx="28" cy="19" r="2.5" fill="#1E293B" />
      <circle cx="36" cy="19" r="2.5" fill="#1E293B" />
      <circle cx="28.5" cy="18.5" r="1" fill="white" />
      <circle cx="36.5" cy="18.5" r="1" fill="white" />
      
      {/* Nose */}
      <ellipse cx="32" cy="24" rx="3" ry="2" fill="#654321" />
      
      {/* Smile */}
      <path d="M28 27 Q32 30 36 27" stroke="#654321" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      
      {/* Arms reaching up (holding bars) */}
      <path d="M22 32 L10 12" stroke="#8B5A2B" strokeWidth="5" strokeLinecap="round" />
      <path d="M42 32 L54 12" stroke="#8B5A2B" strokeWidth="5" strokeLinecap="round" />
      
      {/* Hands */}
      <circle cx="10" cy="12" r="4" fill="#DEB887" />
      <circle cx="54" cy="12" r="4" fill="#DEB887" />
      
      {/* Bar */}
      <rect x="4" y="8" width="56" height="4" rx="2" fill="#6B7280" />
      
      {/* Tail */}
      <path d="M32 50 Q40 55 38 62 Q35 58 32 56" fill="#8B5A2B" />
      
      {/* Legs */}
      <ellipse cx="26" cy="48" rx="4" ry="6" fill="#8B5A2B" />
      <ellipse cx="38" cy="48" rx="4" ry="6" fill="#8B5A2B" />
    </svg>
  )
}
