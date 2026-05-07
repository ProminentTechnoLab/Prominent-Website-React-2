'use client'

import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'

const StretchableLine = ({ className = '', color = 'rgba(0,0,0,0.4)' }) => {
  const lineRef = useRef(null)
  const pathRef = useRef(null)

  useEffect(() => {
    const path = pathRef.current
    const container = lineRef.current
    if (!path || !container) return

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect()
      const relX = e.clientX - rect.left
      const relY = e.clientY - rect.top
      const xPercent = (relX / rect.width) * 1000
      
      // Magnetic Repulsion Logic:
      // We want the line to move AWAY from the cursor.
      // Center is at Y=70.
      const centerY = 70
      const distY = relY - centerY
      const repulsionStrength = 1.3 // Higher magnetic feel
      const targetY = centerY - (distY * repulsionStrength)
      
      gsap.to(path, {
        attr: { d: `M 0 70 Q ${xPercent} ${targetY} 1000 70` },
        duration: 0.4,
        ease: 'power2.out',
        overwrite: 'auto'
      })
    }

    const handleMouseLeave = () => {
      gsap.to(path, {
        attr: { d: 'M 0 70 Q 500 70 1000 70' },
        duration: 1.4,
        ease: 'elastic.out(1.3, 0.25)', // Premium 'drop' effect
        overwrite: 'auto'
      })
    }

    container.addEventListener('mousemove', handleMouseMove)
    container.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      container.removeEventListener('mousemove', handleMouseMove)
      container.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <div ref={lineRef} className={`stretchable-line-container ${className}`}>
      <svg viewBox="0 0 1000 140" preserveAspectRatio="none" className="stretchable-svg">
        <path ref={pathRef} d="M 0 70 Q 500 70 1000 70" stroke={color} strokeWidth="1" fill="none" />
      </svg>
      <style>{`
        .stretchable-line-container {
          height: 140px;
          width: 100%;
          cursor: pointer;
          display: flex;
          align-items: center;
          margin-top: -70px;
          margin-bottom: -70px;
          position: relative;
          z-index: 2;
        }
        .stretchable-svg {
          width: 100%;
          height: 140px;
          pointer-events: none;
        }
      `}</style>
    </div>
  )
}

export default StretchableLine
