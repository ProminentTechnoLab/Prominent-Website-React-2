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
      {/* Full-bleed subtle animated background */}
      <div className="hero-video-wrapper">
        <video
          className="hero-video-element"
          autoPlay
          loop
          muted
          playsInline
          style={{ opacity: 0.15 }}
          src="https://cdn.coverr.co/videos/coverr-abstract-neon-lines-5953/1080p.mp4"
        />
        <div className="hero-overlay"></div>
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
              <Link href="/contact/" className="btn-clean" style={{ color: 'inherit', textDecoration: 'none' }}>
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
              <Link href="/services/" className="hero-btn-secondary" style={{ color: 'inherit', textDecoration: 'none' }}>
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
          padding-top: calc(var(--nav-height) + 8vh);
          padding-bottom: 18vh;
        }

        .hero-video-wrapper {
          position: absolute;
          inset: 0;
          z-index: 1;
          overflow: hidden;
        }

        .hero-video-element {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transform: scale(1.02); /* Slight scale to hide edges */
          filter: grayscale(100%);
        }

        .hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.7) 100%);
          z-index: 2;
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
          gap: 2.5rem;
          margin-top: 4rem;
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
          .hero-actions { flex-direction: column; gap: 1.5rem; }
          .hero { padding-bottom: 15vh; }
        }
        @media (max-width: 768px) {
          .hero { padding-top: calc(var(--nav-height) + 5vh); padding-bottom: 12vh; min-height: auto; }
          .hero-title { font-size: clamp(2.5rem, 10vw, 4rem); margin-bottom: 1.5rem; }
          .hero-desc { font-size: 1rem; max-width: 100%; }
          .hero-actions { gap: 1.2rem; margin-top: 2.5rem; }
          .blob-1 { width: 300px; height: 300px; }
          .blob-2 { width: 400px; height: 400px; }
        }
        @media (max-width: 480px) {
          .hero { padding-top: calc(var(--nav-height) + 3vh); padding-bottom: 10vh; }
          .hero-title { font-size: 2rem; margin-bottom: 1.2rem; }
          .hero-desc { font-size: 0.95rem; line-height: 1.5; }
          .hero-actions { gap: 1rem; margin-top: 2rem; }
          .blob-1 { width: 200px; height: 200px; }
          .blob-2 { width: 250px; height: 250px; }
        }
      `}</style>
    </section>
  )
}

export default Hero
