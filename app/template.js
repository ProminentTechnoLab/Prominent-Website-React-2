'use client'

import React, { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function Template({ children }) {
  const containerRef = useRef(null)
  const overlayRef = useRef(null)

  useLayoutEffect(() => {
    // Template re-mounts on every navigation, so we simply run the entry animation
    const ctx = gsap.context(() => {
      const tl = gsap.timeline()

      // The reveal animation (curtain moves UP)
      // We use a slight delay to ensure the browser has a moment to settle
      tl.to(overlayRef.current, {
        y: '-101%',
        duration: 1.1,
        ease: 'expo.inOut',
        delay: 0.1,
        onComplete: () => {
          gsap.set(overlayRef.current, { display: 'none' })
        }
      })

      // Content reveal: fade in and slide up slightly
      tl.fromTo(containerRef.current,
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1.0, 
          ease: 'power4.out',
          clearProps: 'all'
        },
        '-=0.7'
      )
    })

    return () => ctx.revert()
  }, []) // Mount-only effect runs on every navigation in a template

  return (
    <>
      {/* 
          Standard Transition Overlay:
          Starts COVERING the screen (y: 0) to guarantee zero blink.
          High z-index ensures it covers the layout elements like Navbar.
      */}
      <div
        ref={overlayRef}
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: '100%', height: '100%',
          background: '#FFFFFF',
          zIndex: 99999,
          pointerEvents: 'none',
          willChange: 'transform',
          transform: 'translateY(0%)',
          display: 'block'
        }}
      />
      <div ref={containerRef} style={{ opacity: 0 }}>
        {children}
      </div>
    </>
  )
}
