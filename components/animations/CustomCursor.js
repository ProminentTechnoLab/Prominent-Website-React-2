'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function CustomCursor() {
  const cursorRef = useRef(null)
  const followerRef = useRef(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const follower = followerRef.current
    if (!cursor || !follower) return

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const mouse = { x: pos.x, y: pos.y }
    const speed = 0.15

    const xSet = gsap.quickSetter(cursor, 'x', 'px')
    const ySet = gsap.quickSetter(cursor, 'y', 'px')

    const fxSet = gsap.quickSetter(follower, 'x', 'px')
    const fySet = gsap.quickSetter(follower, 'y', 'px')
    const frSet = gsap.quickSetter(follower, 'rotate', 'deg')
    const fsSet = gsap.quickSetter(follower, 'scaleX')
    const fsySet = gsap.quickSetter(follower, 'scaleY')

    const handleMouseMove = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
      xSet(mouse.x)
      ySet(mouse.y)
    }

    gsap.ticker.add(() => {
      const dt = 1.0 - Math.pow(1.0 - speed, gsap.ticker.deltaRatio())
      pos.x += (mouse.x - pos.x) * dt
      pos.y += (mouse.y - pos.y) * dt
      
      fxSet(pos.x)
      fySet(pos.y)

      // Jelly effect based on velocity
      const dx = mouse.x - pos.x
      const dy = mouse.y - pos.y
      const vel = Math.sqrt(dx * dx + dy * dy)
      const angle = Math.atan2(dy, dx) * (180 / Math.PI)
      const stretch = Math.min(vel / 150, 0.4)

      frSet(angle)
      fsSet(1 + stretch)
      fsySet(1 - stretch)
    })

    const handleHover = () => {
      gsap.to(follower, {
        width: 100,
        height: 100,
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        mixBlendMode: 'difference',
        duration: 0.5,
        ease: 'power3.out'
      })
      gsap.to(cursor, { scale: 0, duration: 0.3 })
    }

    const handleUnhover = () => {
      gsap.to(follower, {
        width: 40,
        height: 40,
        backgroundColor: 'transparent',
        mixBlendMode: 'normal',
        duration: 0.5,
        ease: 'power3.out'
      })
      gsap.to(cursor, { scale: 1, duration: 0.3 })
    }

    window.addEventListener('mousemove', handleMouseMove)

    const interactives = document.querySelectorAll('a, button, .interactive')
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', handleHover)
      el.addEventListener('mouseleave', handleUnhover)
    })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <>
      <div ref={cursorRef} className="cursor-dot" />
      <div ref={followerRef} className="cursor-follower" />
      <style>{`
        .cursor-dot {
          width: 8px;
          height: 8px;
          background-color: var(--brand-orange);
          border-radius: 50%;
          position: fixed;
          top: 0; left: 0;
          pointer-events: none;
          z-index: 10000;
          transform: translate(-50%, -50%);
        }
        .cursor-follower {
          width: 40px;
          height: 40px;
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          position: fixed;
          top: 0; left: 0;
          pointer-events: none;
          z-index: 9999;
          transform: translate(-50%, -50%);
          will-change: transform, width, height;
        }
        @media (max-width: 1024px) {
          .cursor-dot, .cursor-follower { display: none; }
        }
      `}</style>
    </>
  )
}
