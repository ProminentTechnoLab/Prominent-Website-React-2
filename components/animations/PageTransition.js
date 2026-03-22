'use client'

import React, { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { gsap } from 'gsap'

export default function PageTransition({ children }) {
  const containerRef = useRef(null)
  const overlayRef = useRef(null)
  const pathname = usePathname()

  useEffect(() => {
    // Entrance Animation
    const ctx = gsap.context(() => {
      gsap.to(overlayRef.current, {
        y: '-100%',
        duration: 1.2,
        ease: 'power4.inOut',
        delay: 0.2
      })
      gsap.from(containerRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.8
      })
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
          background: 'var(--brand-black)',
          zIndex: 99999,
          transform: 'translateY(0)'
        }}
      />
      <div ref={containerRef}>
        {children}
      </div>
    </>
  )
}
