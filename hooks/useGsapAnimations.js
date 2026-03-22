'use client'

import { useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

export default function useGsapAnimations() {
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // 1. Premium Reveal Animation
    const reveals = document.querySelectorAll('[data-reveal]')
    reveals.forEach((el) => {
      const delay = el.getAttribute('data-delay') || 0
      gsap.fromTo(
        el,
        { opacity: 0, y: 60, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.5,
          delay: parseFloat(delay),
          ease: 'quint.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    })

    // 2. Subtle Float Effect (Liquid Content)
    const floats = document.querySelectorAll('[data-float]')
    floats.forEach((el, i) => {
      gsap.to(el, {
        y: '20px',
        duration: 3 + Math.random() * 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: i * 0.2
      })
    })

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  const animateIn = (element, delay = 0) => {
    gsap.fromTo(
      element,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 90%',
        },
      }
    )
  }

  return { animateIn }
}
