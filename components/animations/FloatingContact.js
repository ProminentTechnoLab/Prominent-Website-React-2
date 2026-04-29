'use client'

import React, { useEffect, useRef, useState, useCallback } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'

const FloatingContact = () => {
  const rootRef = useRef(null)
  const ringRef = useRef(null)
  const innerRef = useRef(null)
  const [textColor, setTextColor] = useState('#1a1a1a')

  // Detect background luminance beneath the button and set text color accordingly
  const detectBackground = useCallback(() => {
    const root = rootRef.current
    if (!root) return

    const rect = root.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2

    // Temporarily hide the button so elementFromPoint picks the content behind it
    root.style.pointerEvents = 'none'
    root.style.visibility = 'hidden'

    const el = document.elementFromPoint(cx, cy)

    root.style.pointerEvents = ''
    root.style.visibility = ''

    if (!el) return

    // Walk up to find the first element with a non-transparent background
    let target = el
    let bg = 'rgba(0, 0, 0, 0)'
    while (target && target !== document.body) {
      const computed = window.getComputedStyle(target).backgroundColor
      if (computed && computed !== 'rgba(0, 0, 0, 0)' && computed !== 'transparent') {
        bg = computed
        break
      }
      target = target.parentElement
    }

    // If still transparent, check body
    if (bg === 'rgba(0, 0, 0, 0)') {
      bg = window.getComputedStyle(document.body).backgroundColor || 'rgb(255, 255, 255)'
    }

    // Parse RGB and calculate relative luminance
    const match = bg.match(/\d+/g)
    if (match) {
      const [r, g, b] = match.map(Number)
      const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
      setTextColor(luminance > 0.5 ? '#1a1a1a' : '#ffffff')
    }
  }, [])

  useEffect(() => {
    // 1. Permanent Rotation for the text ring
    gsap.to(ringRef.current, {
      rotate: 360,
      duration: 12,
      repeat: -1,
      ease: 'none'
    })

    // 2. Detect background color on scroll and resize
    detectBackground()
    const onScroll = () => detectBackground()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', detectBackground)

    // Also re-detect periodically to catch dynamic content changes
    const interval = setInterval(detectBackground, 500)

    // 3. Magnetic Interaction
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e
      const root = rootRef.current
      if (!root) return

      const rect = root.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const distX = clientX - centerX
      const distY = clientY - centerY
      const distance = Math.sqrt(distX * distX + distY * distY)

      const activeRange = 100

      if (distance < activeRange) {
        gsap.to(root, {
          x: distX * 0.08,
          y: distY * 0.08,
          duration: 0.6,
          ease: 'power3.out'
        })
        gsap.to(innerRef.current, {
          x: distX * 0.03,
          y: distY * 0.03,
          scale: 1.03,
          duration: 0.6,
          ease: 'power3.out'
        })
      } else {
        gsap.to(root, {
          x: 0,
          y: 0,
          duration: 1.2,
          ease: 'elastic.out(1, 0.4)'
        })
        gsap.to(innerRef.current, {
          x: 0,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: 'elastic.out(1, 0.4)'
        })
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', detectBackground)
      clearInterval(interval)
    }
  }, [detectBackground])

  // The circumference of our text path (r=38): 2 * π * 38 ≈ 238.76
  // We use 4 evenly spaced "CONTACT" words with dot separators
  const circleText = 'CONTACT \u00B7 CONTACT \u00B7 CONTACT \u00B7 CONTACT \u00B7 '

  return (
    <>
      <Link href="/contact/" className="cb-contact-portal" ref={rootRef}>
        <div className="cb-contact-ring" ref={ringRef}>
          <svg viewBox="0 0 100 100" className="cb-contact-svg">
            <defs>
              <path
                id="cb-text-circle"
                d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"
              />
            </defs>
            <text className="cb-contact-text" style={{ fill: textColor, transition: 'fill 0.3s ease' }}>
              <textPath
                href="#cb-text-circle"
                textLength="238.76"
                lengthAdjust="spacing"
              >
                {circleText}
              </textPath>
            </text>
          </svg>
        </div>
        <div className="cb-contact-inner" ref={innerRef}>
          <div className="cb-contact-avatar">
            <img src="/images/contact-memoji.png" alt="Get in touch" />
          </div>
        </div>
      </Link>

      <style jsx global>{`
        .cb-contact-portal {
          position: fixed !important;
          bottom: 50px !important;
          right: 50px !important;
          width: 120px !important;
          height: 120px !important;
          z-index: 9999 !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          text-decoration: none !important;
          cursor: pointer !important;
          pointer-events: all !important;
        }

        .cb-contact-ring {
          position: absolute !important;
          inset: 0 !important;
          pointer-events: none !important;
          z-index: 1 !important;
          opacity: 1 !important;
          transition: opacity 0.4s cubic-bezier(0.19, 1, 0.22, 1) !important;
        }

        .cb-contact-svg {
          width: 100% !important;
          height: 100% !important;
          display: block !important;
          overflow: visible !important;
        }

        .cb-contact-text {
          font-family: inherit !important;
          font-size: 6.2px !important;
          font-weight: 600 !important;
          text-transform: uppercase !important;
          letter-spacing: 0.8px !important;
        }

        .cb-contact-inner {
          position: relative !important;
          width: 72px !important;
          height: 72px !important;
          background: #fff !important;
          border-radius: 50% !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          box-shadow: 0 10px 30px rgba(0,0,0,0.08) !important;
          overflow: hidden !important;
          border: 1px solid rgba(0,0,0,0.03) !important;
          z-index: 2 !important;
          transition: transform 0.6s cubic-bezier(0.19, 1, 0.22, 1) !important;
        }

        .cb-contact-avatar {
          width: 100% !important;
          height: 100% !important;
          background: #f8f8f8 !important;
        }

        .cb-contact-avatar img {
          width: 110% !important;
          height: 110% !important;
          object-fit: contain !important;
          transform: translateY(5%) !important;
        }

        .cb-contact-portal:hover .cb-contact-ring {
          opacity: 0 !important;
        }

        .cb-contact-portal:hover .cb-contact-inner {
          transform: scale(0.95) !important;
        }

        @media (max-width: 1024px) {
          .cb-contact-portal {
            bottom: 40px !important;
            right: 40px !important;
            width: 110px !important;
            height: 110px !important;
          }
          .cb-contact-inner {
            width: 66px !important;
            height: 66px !important;
          }
        }

        @media (max-width: 768px) {
          .cb-contact-portal {
            bottom: 30px !important;
            right: 24px !important;
            width: 100px !important;
            height: 100px !important;
          }
          .cb-contact-inner {
            width: 60px !important;
            height: 60px !important;
          }
        }
      `}</style>
    </>
  )
}

export default FloatingContact
