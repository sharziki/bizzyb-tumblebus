'use client'

interface HoneycombPatternProps {
  className?: string
  opacity?: number
}

export function HoneycombPattern({ className = '', opacity = 0.05 }: HoneycombPatternProps) {
  return (
    <svg className={className} width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="honeycomb" width="56" height="100" patternUnits="userSpaceOnUse" patternTransform="scale(0.5)">
          <path 
            d="M28 66L0 50L0 16L28 0L56 16L56 50L28 66L28 100" 
            fill="none" 
            stroke="currentColor" 
            strokeOpacity={opacity}
            strokeWidth="1"
          />
          <path 
            d="M28 0L28 34L0 50L0 84L28 100L56 84L56 50L28 34" 
            fill="none" 
            stroke="currentColor" 
            strokeOpacity={opacity}
            strokeWidth="1"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#honeycomb)" />
    </svg>
  )
}
