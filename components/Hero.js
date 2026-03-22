'use client'

import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import TextReveal from './animations/TextReveal'
import LiquidButton from './animations/LiquidButton'

const Hero = () => {
  const heroRef = useRef(null)
  const bgRef = useRef(null)
  const title1Ref = useRef(null)
  const title2Ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Subtle background drift animation
      gsap.to(bgRef.current, {
        x: '3%',
        y: '3%',
        duration: 20,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      })

      // Title animation - Using fromTo for absolute reliability
      const tl = gsap.timeline({ 
        defaults: { ease: 'power4.out', duration: 1.5 },
        delay: 0.2 // Small delay to ensure DOM is ready
      })
      
      tl.fromTo(title1Ref.current, 
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1 }
      )
      .fromTo(title2Ref.current, 
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1 }, 
        '-=1.2'
      )
      .fromTo('.hero-desc, .hero-actions', 
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.15, duration: 1 }, 
        '-=1.0'
      )
    }, heroRef)

    return () => ctx.revert()
  }, [])

  const stats = [
    { label: 'Happy Clients', value: '30+' },
    { label: 'Projects Delivered', value: '50+' },
    { label: 'Years Experience', value: '5+' },
  ]

  return (
    <section className="hero section-light" ref={heroRef}>
      {/* Dynamic Background */}
      <div className="hero-bg" ref={bgRef}>
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="noise"></div>
      </div>

      <div className="container hero-container">
        <div className="hero-content">
          <h1 className="hero-title" style={{ color: '#000000' }}>
            <span className="title-line">
              <span ref={title1Ref}>Powering Businesses</span>
            </span>
            <span className="title-line accent-text" style={{ color: '#ff4d00' }}>
              <span ref={title2Ref}>With Innovation</span>
            </span>
          </h1>

          <p className="hero-desc" style={{ color: '#444444', opacity: 1 }}>
            We deliver world-class Digital Marketing, intuitive UI/UX Design, and high-performance Web Development. Our team combines technical excellence with creative strategy to scale your brand's digital presence globally.
          </p>

          <div className="hero-actions">
            <LiquidButton
              effect="cryogenic"
              variant="solid"
              color="#000"
              liquidColor="var(--brand-orange)"
              textColor="white"
              hoverTextColor="white"
              strength={35}
            >
              <Link href="/contact/" className="btn-clean">
                Start Your Project
              </Link>
            </LiquidButton>
            <LiquidButton
              effect="aura"
              variant="outline"
              liquidColor="#000"
              textColor="#000"
              strength={25}
            >
              <Link href="/services/" className="hero-btn-secondary">
                  Our Services
                </Link>
            </LiquidButton>
          </div>
        </div>
      </div>

      <style>{`
        .hero {
          height: auto;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          background: #ffffff !important;
          padding-top: calc(var(--nav-height) + 10vh);
          padding-bottom: 25vh;
        }

        .hero-bg {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          z-index: 2;
          pointer-events: none;
        }
        .blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          opacity: 0.15;
        }
        .blob-1 {
          width: 600px; height: 600px;
          background: var(--brand-orange);
          top: -20%; right: -10%;
        }
        .blob-2 {
          width: 800px; height: 800px;
          background: #ffaa00;
          bottom: -30%; left: -15%;
        }

        .hero-container {
          position: relative;
          z-index: 10;
        }
        .hero-title {
          font-size: clamp(3.2rem, 8.5vw, 8.5rem);
          line-height: 1.1;
          font-weight: 800;
          letter-spacing: -0.04em;
          margin-bottom: 3.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .title-line {
          display: block;
          position: relative;
        }
        .title-line span {
          display: block;
        }

        .hero-desc {
          font-size: clamp(1.1rem, 1.5vw, 1.35rem);
          max-width: 850px;
          margin: 0 auto;
          line-height: 1.6;
          font-weight: 500;
        }

        .hero-actions {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 3.5rem;
          margin-top: 5rem;
        }

        .btn-clean {
          display: inline-flex;
          align-items: center;
          color: inherit;
          text-decoration: none;
          padding: 0;
          background: transparent;
          border: none;
        }

        @media (max-width: 1024px) {
          .hero-actions { flex-direction: column; gap: 2rem; }
          .hero { padding-bottom: 20vh; }
        }
      `}</style>
    </section>
  )
}

export default Hero
