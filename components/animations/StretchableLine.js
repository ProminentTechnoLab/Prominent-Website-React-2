'use client'

import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'

const StretchableLine = ({ className = '', color = 'rgba(0,0,0,0.1)' }) => {
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
      
      gsap.to(path, {
        attr: { d: `M 0 50 Q ${xPercent} ${relY} 1000 50` },
        duration: 0.3,
        ease: 'power3.out',
        overwrite: 'auto'
      })
    }

    const handleMouseLeave = () => {
      gsap.to(path, {
        attr: { d: 'M 0 50 Q 500 50 1000 50' },
        duration: 0.8,
        ease: 'elastic.out(1, 0.3)',
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
      <svg viewBox="0 0 1000 100" preserveAspectRatio="none" className="stretchable-svg">
        <path ref={pathRef} d="M 0 50 Q 500 50 1000 50" stroke={color} strokeWidth="1" fill="none" />
      </svg>
      <style>{`
        .stretchable-line-container {
          height: 100px;
          width: 100%;
          cursor: pointer;
          display: flex;
          align-items: center;
          margin-top: -50px;
          margin-bottom: -50px;
          position: relative;
          z-index: 2;
        }
        .stretchable-svg {
          width: 100%;
          height: 100px;
          pointer-events: none;
        }
      `}</style>
    </div>
  )
}

export default StretchableLine
