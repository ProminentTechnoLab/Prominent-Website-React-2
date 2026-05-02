'use client'

import React, { useEffect, useRef, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { gsap } from 'gsap'

/* ═══════════════════════════════════════════════════════════
   FLOATING CONTACT — Airborne Hub
   3D Plane flight · Wind/Speed lines interaction
   Perfectly centered · Hyper 3D depth
   ═══════════════════════════════════════════════════════════ */

const FloatingContact = () => {
  const router = useRouter()
  const rootRef = useRef(null)
  const perspectiveRef = useRef(null)
  const circleRef = useRef(null)
  const planeRef = useRef(null)
  const orbitRef = useRef(null)
  const pulseRef = useRef(null)
  const windWrapRef = useRef(null)
  const idleTl = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isNearFooter, setIsNearFooter] = useState(false)
  const [isDarkBg, setIsDarkBg] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setIsVisible(true), 1200)
    return () => clearTimeout(t)
  }, [])

  // Adaptive Background Detection
  useEffect(() => {
    const detectBg = () => {
      if (!rootRef.current) return
      rootRef.current.style.pointerEvents = 'none'
      rootRef.current.style.visibility = 'hidden'
      const rect = rootRef.current.getBoundingClientRect()
      const el = document.elementFromPoint(rect.left + rect.width / 2, rect.top + rect.height / 2)
      rootRef.current.style.visibility = ''
      rootRef.current.style.pointerEvents = isVisible ? 'all' : 'none'
      if (!el) return
      let target = el, bg = ''
      while (target && target !== document.documentElement) {
        const c = window.getComputedStyle(target).backgroundColor
        if (c && c !== 'rgba(0, 0, 0, 0)' && c !== 'transparent') { bg = c; break }
        target = target.parentElement
      }
      if (!bg) { setIsDarkBg(false); return }
      const m = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/)
      if (m) setIsDarkBg((0.299 * +m[1] + 0.587 * +m[2] + 0.114 * +m[3]) / 255 < 0.45)
    }
    window.addEventListener('scroll', detectBg, { passive: true })
    window.addEventListener('resize', detectBg, { passive: true })
    const t1 = setTimeout(detectBg, 200), t2 = setInterval(detectBg, 800)
    return () => { window.removeEventListener('scroll', detectBg); window.removeEventListener('resize', detectBg); clearTimeout(t1); clearInterval(t2) }
  }, [isVisible])

  // Footer Clearance
  useEffect(() => {
    const check = () => {
      const f = document.querySelector('.cb-footer-bottom-row')
      if (f) setIsNearFooter(f.getBoundingClientRect().top < window.innerHeight)
    }
    window.addEventListener('scroll', check, { passive: true }); check()
    return () => window.removeEventListener('scroll', check)
  }, [])

  // Breathing Pulse
  useEffect(() => {
    if (!isVisible || !pulseRef.current) return
    idleTl.current = gsap.timeline({ repeat: -1 })
      .to(pulseRef.current, { scale: 1.6, opacity: 0, duration: 2.2, ease: 'power2.out' })
      .set(pulseRef.current, { scale: 1, opacity: 0.3 })
    return () => { if (idleTl.current) idleTl.current.kill() }
  }, [isVisible])

  // Hyper 3D Tilt Interaction
  useEffect(() => {
    if (!isVisible) return
    const handle = (e) => {
      if (!rootRef.current || !perspectiveRef.current) return
      const r = rootRef.current.getBoundingClientRect()
      const cx = r.left + r.width / 2, cy = r.top + r.height / 2
      const dx = e.clientX - cx, dy = e.clientY - cy
      const dist = Math.sqrt(dx * dx + dy * dy)

      if (dist < 150) {
        const s = 1 - dist / 150
        gsap.to(rootRef.current, { x: dx * 0.1 * s, y: dy * 0.1 * s, duration: 0.6, ease: 'power2.out', overwrite: 'auto' })
        gsap.to(perspectiveRef.current, {
          rotateY: (dx / 75) * 25 * s,
          rotateX: -(dy / 75) * 25 * s,
          duration: 0.6, ease: 'power2.out', overwrite: 'auto'
        })
      } else {
        gsap.to(rootRef.current, { x: 0, y: 0, duration: 1.2, ease: 'elastic.out(1, 0.35)', overwrite: 'auto' })
        gsap.to(perspectiveRef.current, { rotateX: 0, rotateY: 0, duration: 1.2, ease: 'elastic.out(1, 0.35)', overwrite: 'auto' })
      }
    }
    window.addEventListener('mousemove', handle, { passive: true })
    return () => window.removeEventListener('mousemove', handle)
  }, [isVisible])

  const handleEnter = useCallback(() => {
    if (idleTl.current) idleTl.current.pause()
    if (pulseRef.current) gsap.to(pulseRef.current, { scale: 1.8, opacity: 0, duration: 0.3 })
    if (circleRef.current) gsap.to(circleRef.current, { scale: 1.15, duration: 0.5, ease: 'back.out(1.7)' })
    if (orbitRef.current) gsap.to(orbitRef.current, { scale: 1.3, duration: 0.6, ease: 'back.out(1.5)' })

    // Plane Flight
    if (planeRef.current) {
      gsap.killTweensOf(planeRef.current)
      // Initial bank & forward thrust (Z-axis only to keep centered)
      gsap.to(planeRef.current, {
        scale: 1.15, rotateZ: 10, rotateX: 20, translateZ: 15, duration: 0.4, ease: 'power3.out'
      })
      // Continuous Loop (Very subtle centering oscillation)
      gsap.to(planeRef.current, {
        translateZ: 18,
        repeat: -1, yoyo: true, duration: 0.6, ease: 'sine.inOut', delay: 0.4
      })
    }

    // Wind Lines
    if (windWrapRef.current) {
      gsap.to(windWrapRef.current, { opacity: 1, duration: 0.3 })
      const lines = windWrapRef.current.querySelectorAll('.fc-wind-line')
      lines.forEach((line, i) => {
        gsap.fromTo(line, 
          { x: -50, y: 50, opacity: 0 },
          { x: 50, y: -50, opacity: 0.6, duration: 0.5 + Math.random() * 0.5, repeat: -1, delay: i * 0.2, ease: 'none' }
        )
      })
    }
  }, [])

  const handleLeave = useCallback(() => {
    if (idleTl.current) idleTl.current.resume()
    if (circleRef.current) gsap.to(circleRef.current, { scale: 1, duration: 0.6, ease: 'elastic.out(1, 0.4)' })
    if (orbitRef.current) gsap.to(orbitRef.current, { scale: 1, duration: 0.8, ease: 'elastic.out(1, 0.5)' })

    // Stop Flight
    if (planeRef.current) {
      gsap.killTweensOf(planeRef.current)
      gsap.to(planeRef.current, {
        scale: 1, rotateZ: 0, rotateX: 0, x: 0, y: 0, duration: 0.8, ease: 'elastic.out(1, 0.4)'
      })
    }

    // Stop Wind
    if (windWrapRef.current) {
      gsap.to(windWrapRef.current, { opacity: 0, duration: 0.3 })
      gsap.killTweensOf(windWrapRef.current.querySelectorAll('.fc-wind-line'))
    }
  }, [])

  const handleClick = useCallback(() => {
    if (circleRef.current) {
      gsap.timeline()
        .to(circleRef.current, { scale: 0.85, duration: 0.12 })
        .to(circleRef.current, { scale: 1.1, duration: 0.4, ease: 'back.out(3)' })
    }
    setTimeout(() => router.push('/contact/'), 280)
  }, [router])

  const circleBg = isDarkBg ? '#ffffff' : '#111111'
  const ic = isDarkBg ? '#111111' : '#ffffff'
  const tc = isDarkBg ? '#ffffff' : '#111111'
  const orbitText = "CONTACT\u00A0\u00A0\u00A0•\u00A0\u00A0\u00A0CONTACT\u00A0\u00A0\u00A0•\u00A0\u00A0\u00A0CONTACT\u00A0\u00A0\u00A0•\u00A0\u00A0\u00A0CONTACT\u00A0\u00A0\u00A0•\u00A0\u00A0\u00A0"

  // Shading colors
  const sL = isDarkBg ? '#f8f8f8' : '#ffffff'
  const sM = isDarkBg ? '#d0d0d0' : '#ececec'
  const sD = isDarkBg ? '#a0a0a0' : '#cccccc'

  return (
    <>
      <div
        ref={rootRef}
        className={`fc-root ${isNearFooter ? 'fc-footer' : ''}`}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        onClick={handleClick}
        role="button"
        tabIndex={0}
        aria-label="Contact Us"
        style={{ opacity: isVisible ? 1 : 0, pointerEvents: isVisible ? 'all' : 'none' }}
      >
        <div ref={pulseRef} className="fc-pulse" style={{ background: circleBg }} />

        {/* Wind Wrap — Flying Effect Around Button */}
        <div ref={windWrapRef} className="fc-wind-wrap" style={{ opacity: 0 }}>
          <div className="fc-wind-line" style={{ background: tc, top: '20%', left: '0%' }} />
          <div className="fc-wind-line" style={{ background: tc, top: '50%', left: '-10%' }} />
          <div className="fc-wind-line" style={{ background: tc, top: '80%', left: '10%' }} />
        </div>

        <div ref={perspectiveRef} className="fc-3d-wrap">
          {/* Orbital Ring */}
          <div ref={orbitRef} className="fc-orbit-wrap">
            <div className="fc-orbit">
              <svg viewBox="0 0 200 200" className="fc-orbit-svg">
                <defs>
                  <path id="fc-text-path" d="M 100,100 m -70,0 a 70,70 0 1,1 140,0 a 70,70 0 1,1 -140,0" fill="none" />
                </defs>
                <text className="fc-orbit-text" style={{ fill: tc }}>
                  <textPath href="#fc-text-path" startOffset="0%">{orbitText}</textPath>
                </text>
              </svg>
            </div>
          </div>

          {/* Main Button */}
          <div ref={circleRef} className="fc-circle" style={{ background: circleBg }}>
            {/* ── Airborne Plane ── */}
            <div ref={planeRef} className="fc-plane-3d">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" style={{ overflow: 'visible', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}>
                <path d="M22 2L11 13V22L14 17L19 21L22 2Z" fill={sM} />
                <path d="M22 2L2 12L11 13L22 2Z" fill={sL} />
                <path d="M11 13V22L14 17L11 13Z" fill={sD} />
                <path d="M22 2L2 12L11 13V22L14 17L19 21L22 2Z" stroke={ic} strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .fc-root {
          position: fixed; bottom: 40px; right: 40px; z-index: 99999;
          cursor: pointer; width: 110px; height: 110px;
          display: flex; align-items: center; justify-content: center;
          transition: opacity 0.8s cubic-bezier(0.19,1,0.22,1), bottom 0.6s cubic-bezier(0.19,1,0.22,1);
          -webkit-tap-highlight-color: transparent; isolation: isolate;
        }
        .fc-root.fc-footer { bottom: 110px; }

        .fc-pulse {
          position: absolute; width: 56px; height: 56px; border-radius: 50%;
          opacity: 0.3; pointer-events: none; will-change: transform, opacity;
          transition: background 0.6s cubic-bezier(0.19,1,0.22,1);
        }

        .fc-wind-wrap {
          position: absolute; inset: -20px;
          pointer-events: none; z-index: -1;
        }
        .fc-wind-line {
          position: absolute; width: 40px; height: 1px;
          opacity: 0; transform: rotate(-45deg);
        }

        .fc-3d-wrap {
          position: relative; width: 100%; height: 100%;
          perspective: 1200px;
          transform-style: preserve-3d;
          display: flex; align-items: center; justify-content: center;
        }

        .fc-orbit-wrap {
          position: absolute; width: 110px; height: 110px;
          pointer-events: none; will-change: transform;
          transform: translateZ(40px);
        }
        .fc-orbit {
          width: 100%; height: 100%;
          animation: fc-spin 14s linear infinite; will-change: transform;
        }
        .fc-orbit-svg { width: 100%; height: 100%; overflow: visible; }
        .fc-orbit-text {
          font-family: var(--font-main, 'Inter', sans-serif);
          font-size: 12px; font-weight: 500;
          letter-spacing: 0.14em; text-transform: uppercase;
          transition: fill 0.6s cubic-bezier(0.19,1,0.22,1);
        }
        @keyframes fc-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

        .fc-circle {
          position: relative; width: 56px; height: 56px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          transform-style: preserve-3d;
          will-change: transform;
          box-shadow: 0 10px 40px rgba(0,0,0,0.15);
          transition: background 0.6s cubic-bezier(0.19,1,0.22,1), box-shadow 0.6s cubic-bezier(0.19,1,0.22,1);
        }

        .fc-plane-3d {
          will-change: transform;
          transform-style: preserve-3d;
          display: flex; align-items: center; justify-content: center;
          transform: translateZ(5px) translateX(-2px);
        }

        @media (max-width: 768px) {
          .fc-root { bottom: 24px; right: 18px; width: 90px; height: 90px; }
          .fc-orbit-wrap { width: 90px; height: 90px; }
          .fc-orbit-text { font-size: 11px; }
          .fc-circle { width: 46px; height: 46px; }
          .fc-pulse { width: 46px; height: 46px; }
          .fc-root.fc-footer { bottom: 95px; }
          .fc-plane-3d svg { width: 28px; height: 28px; }
        }
      `}</style>
    </>
  )
}

export default FloatingContact
