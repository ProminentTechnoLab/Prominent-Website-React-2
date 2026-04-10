'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const followerRef = useRef(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const posRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    if (typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) return

    const dot = dotRef.current
    const follower = followerRef.current
    if (!dot || !follower) return

    const speed = 0.15

    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX
      mouseRef.current.y = e.clientY
      gsap.set(dot, { x: e.clientX, y: e.clientY, force3D: true })
    }

    const tick = () => {
      const dt = 1.0 - Math.pow(1.0 - speed, gsap.ticker.deltaRatio())
      posRef.current.x += (mouseRef.current.x - posRef.current.x) * dt
      posRef.current.y += (mouseRef.current.y - posRef.current.y) * dt
      gsap.set(follower, { x: posRef.current.x, y: posRef.current.y, force3D: true })
    }
    gsap.ticker.add(tick)

    const onEnter = () => {
      gsap.to(follower, { width: 70, height: 70, backgroundColor: 'rgba(0,0,0,0.04)', border: 'none', duration: 0.4, ease: 'power3.out' })
      gsap.to(dot, { scale: 0, duration: 0.2 })
    }
    const onLeave = () => {
      gsap.to(follower, { width: 40, height: 40, backgroundColor: 'transparent', border: '1px solid rgba(0,0,0,0.15)', duration: 0.4, ease: 'power3.out' })
      gsap.to(dot, { scale: 1, duration: 0.2 })
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    const bind = () => {
      document.querySelectorAll('a, button, .interactive, input, textarea, select, .ct-chip, .pr-tab').forEach(el => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('mouseleave', onLeave)
      })
    }
    bind()
    const observer = new MutationObserver(() => requestAnimationFrame(bind))
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      gsap.ticker.remove(tick)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cb-dot" />
      <div ref={followerRef} className="cb-follower" />
      <style>{`
        .cb-dot {
          width: 8px; height: 8px;
          background: #000;
          border-radius: 50%;
          position: fixed;
          top: -4px; left: -4px;
          pointer-events: none;
          z-index: 10000;
          will-change: transform;
          mix-blend-mode: difference;
        }
        .cb-follower {
          width: 40px; height: 40px;
          border: 1px solid rgba(0,0,0,0.15);
          border-radius: 50%;
          position: fixed;
          top: -20px; left: -20px;
          pointer-events: none;
          z-index: 9999;
          will-change: transform, width, height;
        }
        @media (max-width: 1024px), (hover: none) {
          .cb-dot, .cb-follower { display: none !important; }
        }
      `}</style>
    </>
  )
}
