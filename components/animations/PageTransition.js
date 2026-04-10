'use client'

import React, { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { gsap } from 'gsap'

export default function PageTransition({ children }) {
  const containerRef = useRef(null)
  const overlayRef = useRef(null)
  const pathname = usePathname()

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline()

      // Curtain wipe out
      tl.set(overlayRef.current, { y: '0%', display: 'block' })
        .to(overlayRef.current, {
          y: '-101%',
          duration: 0.9,
          ease: 'power4.inOut',
          delay: 0.15,
          onComplete: () => {
            gsap.set(overlayRef.current, { display: 'none' })
          }
        })

      // Content fade in
      tl.fromTo(containerRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
        '-=0.4'
      )
    })

    return () => ctx.revert()
  }, [pathname])

  return (
    <>
      <div
        ref={overlayRef}
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: '100%', height: '100%',
          background: '#000',
          zIndex: 99999,
          transform: 'translateY(0)',
          pointerEvents: 'none',
          willChange: 'transform',
        }}
      />
      <div ref={containerRef}>
        {children}
      </div>
    </>
  )
}
