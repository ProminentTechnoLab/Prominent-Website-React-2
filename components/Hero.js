'use client'

import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import LiquidButton from './animations/LiquidButton'
import TextReveal from './animations/TextReveal'

const Hero = () => {
  const heroRef = useRef(null)
  const videoWrapperRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal animations for white theme
      const tl = gsap.timeline({
        defaults: { ease: 'power4.out', duration: 1.5 },
        delay: 0.2
      })

      tl.fromTo('.hero-title span',
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.2 }
      )
        .fromTo('.hero-desc',
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1 },
          '-=1.0'
        )
        .fromTo(videoWrapperRef.current,
          { scale: 0.9, opacity: 0, y: 40 },
          { scale: 1, opacity: 1, y: 0, duration: 1.2, ease: 'expo.out' },
          '-=0.8'
        )
        .fromTo('.hero-actions',
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.15 },
          '-=1.0'
        )
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="hero section-light" ref={heroRef}>
      <span className="section-label">HOME</span>
      <div className="container hero-container">
        <div className="hero-content">
          <h1 className="hero-title">
            <TextReveal>Powering Businesses</TextReveal>
            <TextReveal delay={0.2} className="accent-text">With Innovation</TextReveal>
          </h1>

          <p className="hero-desc">
            We deliver world-class Digital Marketing, intuitive UI/UX Design, and high-performance Web Development. Our team combines technical excellence with creative strategy to scale your brand's digital presence globally.
          </p>

          {/* Premium 16:9 Showcase Video (Local Asset) */}
          <div className="hero-featured-showcase-container" ref={videoWrapperRef}>
            <div className="showcase-inner">
              <video
                className="hero-main-video"
                autoPlay
                muted
                loop
                playsInline
                // Pointing to local asset to ensure reliable playback (No Black Screen)
                src="/videos/hero-3d.mp4"
              >
                <source src="/videos/hero-3d.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="showcase-shadow"></div>
          </div>

          <div className="hero-actions">
            <LiquidButton
              effect="cryogenic"
              variant="solid"
              color="#0a0a0a"
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
              liquidColor="#0a0a0a"
              textColor="#0a0a0a"
              strength={25}
            >
              <Link href="/services/" className="hero-btn-secondary">
                Our Services
              </Link>
            </LiquidButton>
          </div>
        </div>
      </div>

      <style jsx>{`
        .hero {
          height: auto;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          background: #ffffff !important;
          padding: calc(var(--nav-height) + 8vh) 0 15vh;
        }

        .hero-container {
          position: relative;
          z-index: 10;
          width: 100%;
        }
        
        .hero-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .hero-title {
          font-size: clamp(3.2rem, 8.5vw, 8.5rem);
          line-height: 1.1;
          font-weight: 800;
          letter-spacing: -0.04em;
          margin-bottom: 2.5rem;
          display: flex;
          flex-direction: column;
          color: #000000;
        }
        
        .title-line {
          display: block;
          position: relative;
        }
        
        .accent-text {
          display: block;
          color: #000000 !important;
          opacity: 0.15 !important;
        }

        .hero-desc {
          color: #444444;
          font-size: clamp(1.1rem, 1.5vw, 1.35rem);
          max-width: 850px;
          margin: 0 auto 4rem;
          line-height: 1.6;
          font-weight: 500;
        }

        /* 16:9 Video Block Structure */
        .hero-featured-showcase-container {
            position: relative;
            width: 100%;
            max-width: 1100px;
            aspect-ratio: 16 / 9;
            margin: 0 auto 5rem;
            z-index: 5;
        }

        .showcase-inner {
            position: relative;
            width: 100%;
            height: 100%;
            border-radius: 40px;
            overflow: hidden;
            background: #000000; /* Dark bg while video loads */
            box-shadow: 0 50px 120px rgba(0,0,0,0.15);
            border: 1px solid rgba(0,0,0,0.05);
        }

        .hero-main-video {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
        }

        .showcase-shadow {
            position: absolute;
            bottom: -30px;
            left: 5%;
            width: 90%;
            height: 40px;
            background: rgba(0,0,0,0.08);
            filter: blur(40px);
            border-radius: 50%;
            z-index: -1;
        }

        .hero-actions {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 2.5rem;
        }

        .btn-clean {
          display: inline-flex;
          align-items: center;
          color: inherit;
          text-decoration: none;
          padding: 0;
          background: transparent;
          border: none;
          font-weight: inherit;
          font-size: inherit;
        }

        @media (max-width: 1024px) {
          .hero-featured-showcase-container { max-width: 95%; }
          .hero-actions { flex-direction: column; gap: 1.5rem; }
        }
        @media (max-width: 768px) {
          .hero { padding-top: calc(var(--nav-height) + 5vh); }
          .hero-title { font-size: clamp(2.5rem, 10vw, 4rem); margin-bottom: 2rem; }
          .hero-featured-showcase-container { margin-bottom: 3.5rem; border-radius: 24px; aspect-ratio: 16 / 10; }
          .showcase-inner { border-radius: 24px; }
        }
        @media (max-width: 480px) {
          .hero-title { font-size: 2.4rem; }
          .hero-featured-showcase-container { aspect-ratio: 1 / 1; border-radius: 20px; }
          .showcase-inner { border-radius: 20px; }
        }
      `}</style>
    </section>
  )
}

export default Hero
