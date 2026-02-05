'use client'

interface SlideProps {
  className?: string
}

export function Slide({ className = 'w-12 h-12' }: SlideProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Slide surface */}
      <path 
        d="M12 56 L20 20 Q22 12 30 12 L52 12" 
        stroke="#EF4444" 
        strokeWidth="6" 
        strokeLinecap="round"
        fill="none"
      />
      
      {/* Slide rails */}
      <path 
        d="M8 58 L18 18 Q20 10 28 10 L52 10" 
        stroke="#DC2626" 
        strokeWidth="2" 
        fill="none"
      />
      <path 
        d="M16 54 L22 22 Q24 14 32 14 L52 14" 
        stroke="#DC2626" 
        strokeWidth="2" 
        fill="none"
      />
      
      {/* Ladder */}
      <rect x="48" y="10" width="4" height="46" fill="#6B7280" />
      <rect x="56" y="10" width="4" height="46" fill="#6B7280" />
      
      {/* Ladder rungs */}
      <rect x="48" y="16" width="12" height="3" fill="#4B5563" />
      <rect x="48" y="26" width="12" height="3" fill="#4B5563" />
      <rect x="48" y="36" width="12" height="3" fill="#4B5563" />
      <rect x="48" y="46" width="12" height="3" fill="#4B5563" />
      
      {/* Ground */}
      <rect x="4" y="56" width="56" height="4" rx="2" fill="#22C55E" />
      
      {/* Kid sliding down */}
      <g transform="translate(16, 38) rotate(-50)">
        {/* Body */}
        <ellipse cx="0" cy="4" rx="4" ry="5" fill="#60A5FA" />
        {/* Head */}
        <circle cx="0" cy="-4" r="4" fill="#FBBF24" />
        {/* Happy face */}
        <circle cx="-1.5" cy="-5" r="0.8" fill="#1E293B" />
        <circle cx="1.5" cy="-5" r="0.8" fill="#1E293B" />
        <path d="M-2 -3 Q0 -1 2 -3" stroke="#1E293B" strokeWidth="0.8" fill="none" />
        {/* Arms up */}
        <path d="M-3 2 L-6 -2" stroke="#FBBF24" strokeWidth="2" strokeLinecap="round" />
        <path d="M3 2 L6 -2" stroke="#FBBF24" strokeWidth="2" strokeLinecap="round" />
      </g>
    </svg>
  )
}
