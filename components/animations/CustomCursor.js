'use client'

/**
 * CustomCursor
 * -----------------------------------------------------------------------------
 * Single-element trailing cursor.
 *
 * This merges two earlier versions:
 *   - Architecture, positioning, and hover-binding logic from the original
 *     ring-based implementation (gsap.ticker loop, mouseRef/posRef lerp,
 *     per-element enter/leave listeners with MutationObserver rebinding).
 *   - Visual style + motion feel of the later single-dot version (small
 *     white dot, mix-blend-mode: difference, subtle glow, clean scale-only
 *     hover effect).
 *
 * There is only ONE element. The native OS cursor stays visible; the dot
 * is a secondary decorative layer that trails the cursor with a smooth lerp.
 * -----------------------------------------------------------------------------
 */

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const posRef = useRef({ x: 0, y: 0 })
  // Start even smaller (0.2 of 40px = 8px)
  const scaleRef = useRef({ val: 0.2 })

  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      ('ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia('(hover: none)').matches)
    ) {
      return
    }

    const dot = dotRef.current
    if (!dot) return

    const speed = 0.22
    let hasMoved = false

    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX
      mouseRef.current.y = e.clientY
      if (!hasMoved) {
        posRef.current.x = e.clientX
        posRef.current.y = e.clientY
        dot.style.opacity = '1'
        hasMoved = true
      }
    }

    const tick = () => {
      const dt = 1.0 - Math.pow(1.0 - speed, gsap.ticker.deltaRatio())
      posRef.current.x += (mouseRef.current.x - posRef.current.x) * dt
      posRef.current.y += (mouseRef.current.y - posRef.current.y) * dt
      
      // Scaling a large 40px object stays 100% sharp. 
      // Scaling a small 10px object up causes blur.
      dot.style.transform = `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0) translate(-50%, -50%) scale(${scaleRef.current.val})`
    }
    gsap.ticker.add(tick)

    const onEnter = () => {
      gsap.to(scaleRef.current, { 
        val: 0.5, 
        duration: 0.5, 
        ease: 'expo.out',
        overwrite: true
      })
    }
    const onLeave = () => {
      gsap.to(scaleRef.current, { 
        val: 0.2, 
        duration: 0.5, 
        ease: 'expo.out',
        overwrite: true
      })
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    const SELECTOR = 'a, button, [role="button"], input, textarea, select, label, .magnetic, .interactive, .ct-chip, .pr-tab'
    
    const handleMouseOver = (e) => {
      const target = e.target.closest(SELECTOR)
      const hasPointer = window.getComputedStyle(e.target).cursor === 'pointer'
      if (target || hasPointer) onEnter()
    }
    const handleMouseOut = (e) => {
      const target = e.target.closest(SELECTOR)
      const hasPointer = window.getComputedStyle(e.target).cursor === 'pointer'
      if (target || hasPointer) onLeave()
    }

    window.addEventListener('mouseover', handleMouseOver)
    window.addEventListener('mouseout', handleMouseOut)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseover', handleMouseOver)
      window.removeEventListener('mouseout', handleMouseOut)
      gsap.ticker.remove(tick)
      gsap.killTweensOf(scaleRef.current)
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cb-dot" aria-hidden="true" />
      <style>{`
        .cb-dot {
          position: fixed;
          top: 0;
          left: 0;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #fff;
          mix-blend-mode: difference;
          pointer-events: none;
          z-index: 10000;
          will-change: transform;
          opacity: 0;
          /* geometricPrecision + high-res base = zero blur */
          shape-rendering: geometricPrecision;
          transform: translate3d(-100px, -100px, 0) translate(-50%, -50%) scale(0.2);
        }
        @media (hover: none), (pointer: coarse), (max-width: 1024px) {
          .cb-dot { display: none !important; }
        }
      `}</style>
    </>
  )
}
