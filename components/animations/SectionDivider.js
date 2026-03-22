'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

export default function SectionDivider() {
  const svgRef = useRef(null)
  const pathRef = useRef(null)
  const wrapRef = useRef(null)
  const rafId = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    
    const path = pathRef.current
    const wrap = wrapRef.current
    if (!path || !wrap) return

    const updatePath = (y) => {
      gsap.to(path, {
        attr: { d: `M0 100 Q50 ${y} 100 100` },
        duration: 0.6,
        ease: 'power2.out'
      })
    }

    const handleMouseMove = (e) => {
      if (rafId.current) return
      rafId.current = requestAnimationFrame(() => {
        const rect = wrap.getBoundingClientRect()
        const relY = ((e.clientY - rect.top) / rect.height) * 100
        const stretch = Math.max(0, Math.min(100, relY))
        updatePath(stretch)
        rafId.current = null
      })
    }

    const handleMouseLeave = () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current)
        rafId.current = null
      }
      updatePath(100)
    }

    wrap.addEventListener('mousemove', handleMouseMove)
    wrap.addEventListener('mouseleave', handleMouseLeave)

    // Scroll reveal effect
    gsap.fromTo(path, 
      { attr: { d: 'M0 100 Q50 100 100 100' } },
      {
        attr: { d: 'M0 100 Q50 0 100 100' },
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: svgRef.current,
          start: 'top bottom',
          scrub: 1.5,
        }
      }
    )

    return () => {
      wrap.removeEventListener('mousemove', handleMouseMove)
      wrap.removeEventListener('mouseleave', handleMouseLeave)
      if (rafId.current) cancelAnimationFrame(rafId.current)
    }
  }, [])

  return (
    <div className="section-divider-wrap" ref={wrapRef}>
      <svg
        ref={svgRef}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="section-divider-svg"
      >
        <path
          ref={pathRef}
          d="M0 100 Q50 100 100 100"
          fill="var(--bg-dark)"
        />
      </svg>
      <style>{`
        .section-divider-wrap {
          width: 100%;
          height: 12vh;
          margin-top: -12vh;
          position: relative;
          z-index: 2;
          cursor: pointer;
        }
        .section-divider-svg {
          width: 100%;
          height: 100%;
          display: block;
        }
      `}</style>
    </div>
  )
}
