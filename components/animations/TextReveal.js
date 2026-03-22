'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

export default function TextReveal({ children, className = '', delay = 0 }) {
  const textRef = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    if (!textRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current,
        { y: '100%' },
        {
          y: '0%',
          duration: 1.2,
          delay,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 95%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    }, textRef)

    return () => ctx.revert()
  }, [delay])

  return (
    <span className={`text-reveal-mask ${className}`}>
      <span ref={textRef} style={{ display: 'block' }}>
        {children}
      </span>
    </span>
  )
}
