'use client'

import React, { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { gsap } from 'gsap'

const FloatingContact = () => {
  const router = useRouter()
  const rootRef = useRef(null)
  const lensRef = useRef(null)
  const iconRef = useRef(null)
  const dotsRef = useRef(null)

  useEffect(() => {
    // 1. Permanent Pulse for Typing Dots
    gsap.to(".pt-pulse-dot", {
      opacity: 0.3,
      scale: 0.5,
      duration: 0.6,
      repeat: -1,
      yoyo: true,
      stagger: 0.2,
      ease: 'sine.inOut'
    })

    // 2. Subtle Lens Breath
    gsap.to(lensRef.current, {
      scale: 1.05,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    })

    // 3. Advanced Magnetic Interaction
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e
      if (!rootRef.current) return
      
      const { left, top, width, height } = rootRef.current.getBoundingClientRect()
      const centerX = left + width / 2
      const centerY = top + height / 2
      
      const distanceX = clientX - centerX
      const distanceY = clientY - centerY
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY)
      
      if (distance < 200) {
        // Smooth magnetic pull
        gsap.to(rootRef.current, {
          x: distanceX * 0.2,
          y: distanceY * 0.2,
          duration: 0.8,
          ease: 'power3.out'
        })
        // Icon Parallax (Deep 3D effect)
        gsap.to(iconRef.current, {
          x: distanceX * 0.12,
          y: distanceY * 0.12,
          rotateX: -distanceY * 0.1,
          rotateY: distanceX * 0.1,
          duration: 0.8,
          ease: 'power3.out'
        })
      } else {
        gsap.to([rootRef.current, iconRef.current], {
          x: 0, y: 0, rotateX: 0, rotateY: 0,
          duration: 1.2,
          ease: 'elastic.out(1, 0.4)'
        })
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const handleClick = () => {
    gsap.to(lensRef.current, {
      scale: 0,
      opacity: 0,
      duration: 0.4,
      ease: 'power4.in',
      onComplete: () => router.push('/contact/')
    })
  }

  return (
    <div className="pt-portal-root" ref={rootRef} onClick={handleClick}>
      <div className="pt-portal-lens" ref={lensRef}>
        
        {/* Glass Effect */}
        <div className="pt-portal-glass" />
        
        {/* Kinetic Message Glyph */}
        <div className="pt-portal-icon-wrap" ref={iconRef}>
          <div className="pt-message-glyph">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="pt-svg">
              <path 
                d="M21 11.5C21 16.1944 16.9706 20 12 20C10.5181 20 9.12304 19.6607 7.89315 19.0569L3 20L4.10301 15.7766C3.39864 14.536 3 13.0694 3 11.5C3 6.80558 7.02944 3 12 3C16.9706 3 21 6.80558 21 11.5Z" 
                stroke="currentColor" 
                strokeWidth="1.2" 
                strokeLinejoin="round"
              />
              <circle className="pt-pulse-dot" cx="8" cy="11.5" r="1" fill="#ff6600" />
              <circle className="pt-pulse-dot" cx="12" cy="11.5" r="1" fill="#ff6600" />
              <circle className="pt-pulse-dot" cx="16" cy="11.5" r="1" fill="#ff6600" />
            </svg>
          </div>
        </div>

        {/* Refractive Inner Glow */}
        <div className="pt-portal-glow" />
      </div>

      <style jsx>{`
        .pt-portal-root {
          position: fixed !important;
          bottom: 50px !important;
          right: 50px !important;
          width: 90px !important;
          height: 90px !important;
          z-index: 2147483647 !important;
          cursor: pointer !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          pointer-events: all !important;
          mix-blend-mode: exclusion;
        }

        .pt-portal-lens {
          position: relative;
          width: 80px;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.6s cubic-bezier(0.19, 1, 0.22, 1);
          transform-style: preserve-3d;
        }

        .pt-portal-glass {
          position: absolute;
          inset: 0;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(25px) saturate(180%);
          -webkit-backdrop-filter: blur(25px) saturate(180%);
          border-radius: 50%;
          border: 1.2px solid rgba(255, 255, 255, 0.3);
          box-shadow: 
            0 15px 35px rgba(0,0,0,0.1),
            inset 0 0 15px rgba(255,255,255,0.1);
        }

        .pt-portal-icon-wrap {
          position: relative;
          z-index: 5;
          color: #fff;
          transform-style: preserve-3d;
          transition: transform 0.4s ease;
        }

        .pt-message-glyph {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .pt-portal-glow {
          position: absolute;
          inset: 15%;
          background: radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2) 0%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
        }

        /* Hover Effects */
        .pt-portal-root:hover .pt-portal-lens {
          transform: scale(1.1);
        }
        
        .pt-portal-root:hover .pt-portal-glass {
          border-color: #ff6600;
          background: rgba(255, 255, 255, 0.1);
        }

        .pt-portal-root:hover .pt-message-glyph {
          transform: translateZ(20px);
        }

        @media (max-width: 768px) {
          .pt-portal-root {
            bottom: 30px !important;
            right: 30px !important;
            width: 80px !important;
            height: 80px !important;
          }
          .pt-portal-lens { width: 70px; height: 70px; }
          .pt-svg { width: 26px; height: 26px; }
        }
      `}</style>
    </div>
  )
}

export default FloatingContact
