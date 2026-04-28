'use client'

import React, { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { gsap } from 'gsap'

export default function PageTransition({ children }) {
  const containerRef = useRef(null)
  const overlayRef = useRef(null)
  const pathname = usePathname()
  const [isFirstLoad, setIsFirstLoad] = useState(true)

  useEffect(() => {
    // Determine if we should show the curtain
    if (isFirstLoad) {
      setIsFirstLoad(false)
      // Initial load: just fade content in quickly
      gsap.fromTo(containerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6, ease: 'power2.out' }
      )
      return
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline()

      // White Curtain reveal
      tl.set(overlayRef.current, { y: '0%', display: 'block' })
        .to(overlayRef.current, {
          y: '-101%',
          duration: 1.0, 
          ease: 'expo.inOut',
          onComplete: () => {
            gsap.set(overlayRef.current, { display: 'none' })
          }
        })

      // Content reveal
      tl.fromTo(containerRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'expo.out' },
        '-=0.5'
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
          background: '#FFFFFF',
          zIndex: 99999,
          transform: 'translateY(0)',
          pointerEvents: 'none',
          willChange: 'transform',
          display: 'none',
        }}
      />
      <div ref={containerRef}>
        {children}
      </div>
    </>
  )
}
