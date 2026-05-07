'use client'

import React, { useState, useEffect, useRef } from 'react'
import useSmoothScroll from '../hooks/useSmoothScroll'
import { usePathname, useRouter } from 'next/navigation'
import { gsap } from 'gsap'

const AppWrapper = ({ children }) => {
  useSmoothScroll()
  const pathname = usePathname()
  const router = useRouter()
  const [navKey, setNavKey] = useState(0)
  const curtainRef = useRef(null)
  const contentRef = useRef(null)
  const isInitialMount = useRef(true)

  // Handle revealing the new page after navigation or initial mount
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Ensure content is ready to be seen immediately
      gsap.set(contentRef.current, { opacity: 1, y: 0 })

      if (isInitialMount.current) {
        // --- 1. INITIAL PAGE LOAD ---
        gsap.to(curtainRef.current, {
          y: '-100%',
          duration: 1.2, 
          ease: 'expo.inOut',
          delay: 0.1,
          onStart: () => {
            window.dispatchEvent(new CustomEvent('refresh-text-reveal'))
          },
          onComplete: () => {
            // Reset to bottom so next transition always comes from bottom
            gsap.set(curtainRef.current, { y: '100%' })
          }
        })
        isInitialMount.current = false
      } else {
        // --- 2. SPA NAVIGATION REVEAL ---
        gsap.to(curtainRef.current, {
          y: '-100%',
          duration: 1.2,
          ease: 'expo.inOut',
          onStart: () => {
            window.dispatchEvent(new CustomEvent('refresh-text-reveal'))
          },
          onComplete: () => {
            gsap.set(curtainRef.current, { y: '100%' })
          }
        })
      }
    })
    return () => ctx.revert()
  }, [pathname, navKey])

  // Global listener for custom navigation (Curtain Exit)
  useEffect(() => {
    const handleNavigation = (e) => {
      const { href, isSamePage } = e.detail
      
      // Ensure it starts from bottom
      gsap.set(curtainRef.current, { y: '100%' })

      gsap.to(curtainRef.current, {
        y: '0%',
        duration: 0.9, // Slightly faster cover
        ease: 'power4.inOut',
        onComplete: () => {
          if (isSamePage) {
            // Small delay to ensure state settles before reveal starts
            setTimeout(() => {
              setNavKey(prev => prev + 1)
              window.scrollTo(0, 0)
            }, 50)
          } else {
            router.push(href)
          }
        }
      })
    }

    window.addEventListener('trigger-nav-transition', handleNavigation)
    return () => window.removeEventListener('trigger-nav-transition', handleNavigation)
  }, [pathname, router])

  return (
    <>
      <div 
        ref={curtainRef} 
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: '100%', height: '100%',
          backgroundColor: '#ffffff', // Matches white sections perfectly
          zIndex: 99999,
          transform: 'translateY(0%)', // Start covered for initial reveal
          willChange: 'transform'
        }}
      />
      <div ref={contentRef} style={{ opacity: 1, transform: 'translateY(0)' }}>
        <div key={`${pathname}-${navKey}`}>
          {children}
        </div>
      </div>
    </>
  )
}

export default AppWrapper
