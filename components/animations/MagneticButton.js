'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function MagneticButton({ children, strength = 35, bgColor = 'var(--brand-orange)' }) {
  const buttonRef = useRef(null)
  const bgRef = useRef(null)
  const rafId = useRef(null)

  useEffect(() => {
    const btn = buttonRef.current
    const bg = bgRef.current
    if (!btn || !bg) return

    let mouseX = 0, mouseY = 0

    const handleMouseEnter = () => {
      gsap.to(bg, {
        scale: 1,
        duration: 0.8,
        ease: 'expo.out'
      })
    }

    const handleMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY

      if (rafId.current) return
      rafId.current = requestAnimationFrame(() => {
        const { left, top, width, height } = btn.getBoundingClientRect()
        const centerX = left + width / 2
        const centerY = top + height / 2

        const moveX = (mouseX - centerX) / width * strength
        const moveY = (mouseY - centerY) / height * strength

        const bgX = (mouseX - left) - width / 2
        const bgY = (mouseY - top) - height / 2

        gsap.to(btn, {
          x: moveX,
          y: moveY,
          duration: 0.3,
          ease: 'power2.out',
        })

        gsap.to(bg, {
          x: bgX * 1.5,
          y: bgY * 1.5,
          duration: 0.6,
          ease: 'power3.out'
        })

        rafId.current = null
      })
    }

    const handleMouseLeave = () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current)
        rafId.current = null
      }
      gsap.killTweensOf([btn, bg]) // Stop any active move tweens
      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 1,
        ease: 'elastic.out(1, 0.3)',
      })
      gsap.to(bg, {
        x: 0,
        y: 0,
        scale: 0,
        duration: 0.6,
        ease: 'power3.out'
      })
    }

    btn.addEventListener('mouseenter', handleMouseEnter)
    btn.addEventListener('mousemove', handleMouseMove)
    btn.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      btn.removeEventListener('mouseenter', handleMouseEnter)
      btn.removeEventListener('mousemove', handleMouseMove)
      btn.removeEventListener('mouseleave', handleMouseLeave)
      if (rafId.current) cancelAnimationFrame(rafId.current)
    }
  }, [strength])

  return (
    <div ref={buttonRef} className="magnetic-btn-wrap">
      <div className="btn-inner">
        <div ref={bgRef} className="liquid-bg" style={{ background: bgColor }}></div>
        <div className="btn-content">{children}</div>
      </div>
      <style>{`
        .magnetic-btn-wrap {
          display: inline-block;
          position: relative;
        }
        .btn-inner {
          position: relative;
          overflow: hidden;
          border-radius: 100px;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1;
        }
        .liquid-bg {
          position: absolute;
          width: 250%;
          height: 250%;
          top: -75%;
          left: -75%;
          border-radius: 50%;
          transform: scale(0);
          pointer-events: none;
          z-index: -1;
        }
        /* Handle light section variants */
        .section-light .btn-primary .liquid-bg {
          background: #000;
        }
        .section-light .btn-outline .liquid-bg {
          background: #000;
        }
        .btn-content {
          position: relative;
          z-index: 5;
        }
        .section-light .btn-outline:hover {
          color: white !important;
        }
      `}</style>
    </div>
  )
}
