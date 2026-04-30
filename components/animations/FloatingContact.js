'use client'

import React, { useEffect, useRef, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { gsap } from 'gsap'

/* ═══════════════════════════════════════════════════════════
   NEXUS CONNECTOR — Unique Strategic Contact Gateway
   Adaptive Color Inversion (Difference Blend)
   Non-Generic Interaction Node · Hover-Triggered Surround
   ═══════════════════════════════════════════════════════════ */

const FloatingContact = () => {
  const router = useRouter()
  const rootRef = useRef(null)
  const circleRef = useRef(null)
  const iconRef = useRef(null)
  const textRef = useRef(null)
  const ringsRef = useRef([])
  const [isVisible, setIsVisible] = useState(false)
  const [isNearFooter, setIsNearFooter] = useState(false)

  // Entry Delay
  useEffect(() => {
    const t = setTimeout(() => setIsVisible(true), 1200)
    return () => clearTimeout(t)
  }, [])

  // Dynamic Footer Clearance
  useEffect(() => {
    const check = () => {
      const footer = document.querySelector('.cb-footer-bottom-row')
      if (!footer) return
      const fR = footer.getBoundingClientRect()
      setIsNearFooter(fR.top < window.innerHeight)
    }
    window.addEventListener('scroll', check, { passive: true })
    check()
    return () => window.removeEventListener('scroll', check)
  }, [])

  // Magnetic Interaction
  useEffect(() => {
    if (!isVisible) return
    const handle = (e) => {
      if (!rootRef.current) return
      const rect = rootRef.current.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const dist = Math.sqrt(dx * dx + dy * dy)
      
      if (dist < 150) {
        const s = 1 - dist / 150
        gsap.to(rootRef.current, { x: dx * 0.08 * s, y: dy * 0.08 * s, duration: 1.2, ease: 'power2.out', overwrite: 'auto' })
      } else {
        gsap.to(rootRef.current, { x: 0, y: 0, duration: 1.2, ease: 'elastic.out(1, 0.35)', overwrite: 'auto' })
      }
    }
    window.addEventListener('mousemove', handle, { passive: true })
    return () => window.removeEventListener('mousemove', handle)
  }, [isVisible])

  const handleEnter = useCallback(() => {
    // Circle & Icon
    if (circleRef.current) gsap.to(circleRef.current, { scale: 1.2, duration: 0.4, ease: 'back.out(2)' })
    if (iconRef.current) {
      gsap.to(iconRef.current, { rotation: 180, scale: 1.15, duration: 0.6, ease: 'power2.inOut' })
      // Pulse animation for icon paths
      gsap.to('.nexus-path', { strokeDashoffset: 0, duration: 0.8, stagger: 0.1 })
    }
    // Surround Rings
    ringsRef.current.forEach((r, i) => {
      if (r) {
        gsap.fromTo(r, 
          { scale: 0.6, opacity: 0 },
          { scale: 1.2 + i * 0.4, opacity: 0.4 - i * 0.1, duration: 0.8, ease: 'power3.out', delay: i * 0.1 }
        )
        gsap.to(r, { rotation: (i % 2 === 0 ? 360 : -360), duration: 4, repeat: -1, ease: 'none' })
      }
    })
    // Label
    if (textRef.current) gsap.to(textRef.current, { opacity: 1, x: 0, duration: 0.4 })
  }, [])

  const handleLeave = useCallback(() => {
    if (circleRef.current) gsap.to(circleRef.current, { scale: 1, duration: 0.6, ease: 'elastic.out(1, 0.4)' })
    if (iconRef.current) gsap.to(iconRef.current, { rotation: 0, scale: 1, duration: 0.8, ease: 'elastic.out(1, 0.5)' })
    // Rings
    ringsRef.current.forEach(r => {
      if (r) gsap.to(r, { scale: 0.6, opacity: 0, duration: 0.5, ease: 'power3.in' })
    })
    if (textRef.current) gsap.to(textRef.current, { opacity: 0, x: 20, duration: 0.4 })
  }, [])

  const handleClick = useCallback(() => {
    if (circleRef.current) {
      gsap.timeline()
        .to(circleRef.current, { scale: 0.85, duration: 0.15 })
        .to(circleRef.current, { scale: 1.1, duration: 0.4, ease: 'back.out(3)' })
    }
    setTimeout(() => router.push('/contact/'), 300)
  }, [router])

  return (
    <>
      <div
        ref={rootRef}
        className={`nexus-root ${isNearFooter ? 'is-footer' : ''}`}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        onClick={handleClick}
        role="button"
        tabIndex={0}
        aria-label="Contact Gateway"
        style={{ opacity: isVisible ? 1 : 0, pointerEvents: isVisible ? 'all' : 'none' }}
      >
        {/* Surround Animations (Visible on Hover) */}
        {[0, 1, 2].map(i => (
          <div key={`ring-${i}`} ref={el => ringsRef.current[i] = el} className="nexus-ring" />
        ))}

        {/* Adaptive Circle Body */}
        <div ref={circleRef} className="nexus-circle">
          {/* Unique Non-Generic "Nexus Connector" Icon */}
          <div ref={iconRef} className="nexus-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Central communication hub */}
              <circle cx="12" cy="12" r="3.5" fill="currentColor" />
              {/* Branching strategic link paths */}
              <path className="nexus-path" d="M12 4v2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              <path className="nexus-path" d="M12 18v2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              <path className="nexus-path" d="M4 12h2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              <path className="nexus-path" d="M18 12h2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              {/* Dynamic corner connectors */}
              <circle cx="12" cy="5" r="1.5" fill="#FF6600">
                <animate attributeName="opacity" values="1;0;1" dur="1s" repeatCount="indefinite" />
              </circle>
              <circle cx="12" cy="19" r="1.5" fill="#FF6600">
                <animate attributeName="opacity" values="1;0;1" dur="1s" begin="0.5s" repeatCount="indefinite" />
              </circle>
            </svg>
          </div>
          <div className="nexus-glass" />
        </div>

        {/* Minimal Tooltip */}
        <div ref={textRef} className="nexus-label">Connect Now</div>
      </div>

      <style jsx global>{`
        .nexus-root {
          position: fixed !important;
          bottom: 45px !important;
          right: 45px !important;
          z-index: 10001 !important;
          cursor: pointer !important;
          width: 80px !important;
          height: 80px !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          /* Premium standard color inversion */
          mix-blend-mode: difference !important;
          transition: 
            opacity 1s ease-out,
            bottom 0.7s cubic-bezier(0.19, 1, 0.22, 1) !important;
          -webkit-tap-highlight-color: transparent;
        }

        .nexus-root.is-footer {
          bottom: 115px !important;
        }

        /* ── Hover-triggered Surround Rings ── */
        .nexus-ring {
          position: absolute;
          width: 60px;
          height: 60px;
          border: 1px solid #ffffff;
          border-radius: 50%;
          pointer-events: none;
          opacity: 0;
          will-change: transform, opacity;
        }

        .nexus-circle {
          position: relative;
          width: 66px;
          height: 66px;
          border-radius: 50%;
          background: #ffffff;
          color: #000000;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          will-change: transform;
          box-shadow: 0 12px 36px rgba(0,0,0,0.22);
        }

        .nexus-glass {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 100%);
          pointer-events: none;
          z-index: 2;
        }

        .nexus-icon {
          position: relative;
          z-index: 5;
          display: flex;
          align-items: center;
          justify-content: center;
          will-change: transform;
        }

        .nexus-label {
          position: absolute;
          right: 105px;
          background: #ffffff;
          color: #000000;
          padding: 10px 22px;
          border-radius: 100px;
          font-size: 15px;
          font-weight: 600;
          white-space: nowrap;
          opacity: 0;
          transform: translateX(20px);
          pointer-events: none;
          box-shadow: 0 8px 32px rgba(0,0,0,0.1);
          z-index: -1;
        }

        /* Mobile specific */
        @media (max-width: 768px) {
          .nexus-root { bottom: 35px !important; right: 25px !important; width: 68px !important; height: 68px !important; }
          .nexus-circle { width: 56px !important; height: 56px !important; }
          .nexus-root.is-footer { bottom: 100px !important; }
          .nexus-label { display: none; }
        }
      `}</style>
    </>
  )
}

export default FloatingContact
