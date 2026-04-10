'use client'

import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

const Hero = () => {
  const heroRef = useRef(null)
  const videoRef = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      // Title lines stagger in
      gsap.fromTo('.hero-line',
        { y: 120, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.12, duration: 1.4, ease: 'power4.out', delay: 0.2 }
      )
      // Subtitle fade in
      gsap.fromTo('.hero-sub',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: 'power4.out', delay: 0.5 }
      )
      // Button fade in
      gsap.fromTo('.hero-cta',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power4.out', delay: 0.7 }
      )
      // Video scales up
      gsap.fromTo(videoRef.current,
        { scale: 0.92, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.6, ease: 'expo.out', delay: 0.5 }
      )
      // Parallax on scroll
      if (videoRef.current) {
        gsap.to(videoRef.current, {
          y: -100, scale: 0.94,
          scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: 1.5 }
        })
      }
    }, heroRef)
    return () => ctx.revert()
  }, [])

  return (
    <section className="cb-hero" ref={heroRef}>
      <div className="cb-hero-content">
        {/* Cuberto: massive centered title */}
        <h1 className="cb-hero-title">
          <span className="hero-line">Powering Businesses</span>
          <span className="hero-line">With Innovation</span>
        </h1>

        <p className="hero-sub">
          Prominent TechnoLabs is a digital design and technology partner focused on smart
          interactions, delightful UX, and cutting-edge development solutions.
        </p>

        {/* "What we do" pill button — exact Cuberto liquid & rolling text hover */}
        <div className="hero-cta">
          <Link href="/services/" className="hero-btn">
            <span className="hero-btn-text-wrapper">
              <span className="hero-text-old">What we do</span>
              <span className="hero-text-new">What we do</span>
            </span>
          </Link>
        </div>
      </div>

      {/* Large rounded video — Cuberto signature */}
      <div className="cb-hero-media" ref={videoRef}>
        <video autoPlay muted loop playsInline className="cb-hero-video">
          <source src="/videos/hero-3d.mp4" type="video/mp4" />
        </video>
      </div>

      <style>{`
        .cb-hero {
          min-height: 100vh;
          background: #ffffff;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 180px 100px 100px;
          position: relative;
          overflow: hidden;
        }

        .cb-hero-content {
          text-align: center;
          max-width: 1100px;
          margin: 0 auto 80px;
        }

        /* Title — exact Cuberto: very large, weight 500, tight leading */
        .cb-hero-title {
          font-size: clamp(3.2rem, 7.5vw, 6.5rem);
          font-weight: 500;
          line-height: 1.05;
          letter-spacing: -0.035em;
          color: #000;
          margin-bottom: 28px;
        }
        .hero-line {
          display: block;
          overflow: hidden;
        }

        /* Subtitle — Cuberto: centered, regular weight, muted */
        .hero-sub {
          font-size: clamp(1rem, 1.3vw, 1.2rem);
          font-weight: 400;
          color: #000;
          opacity: 0.65;
          line-height: 1.6;
          max-width: 650px;
          margin: 0 auto;
        }

        /* ─── "What we do" Button — Cuberto liquid fill & rolling text ─── */
        .hero-cta {
          margin-top: 40px;
        }
        .hero-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 18px 38px;
          border: 1.5px solid #000;
          border-radius: 100px;
          background: transparent;
          color: #000;
          font-family: var(--font-main);
          font-size: 17px;
          font-weight: 400;
          text-decoration: none;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: border-color 1s cubic-bezier(0.19, 1, 0.22, 1);
        }

        /* Liquid circle that rises from bottom (slower 1s) */
        .hero-btn::before {
          content: '';
          position: absolute;
          top: 100%;
          left: -50%;
          width: 200%;
          height: 300%;
          background: #000;
          border-radius: 50%;
          transform: translateY(0);
          transition: transform 1s cubic-bezier(0.19, 1, 0.22, 1);
          z-index: 0;
        }

        .hero-btn:hover::before {
          transform: translateY(-60%);
        }

        .hero-btn:hover {
          border-color: #000;
        }

        /* Rolling Text wrapper */
        .hero-btn-text-wrapper {
          position: relative;
          z-index: 1;
          display: inline-flex;
          overflow: hidden;
          padding-bottom: 1px; /* visual alignment tweak */
        }

        /* Original black text */
        .hero-text-old {
          display: inline-block;
          color: #000;
          transition: transform 1s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.15s ease-out;
        }

        /* New white text hidden below */
        .hero-text-new {
          position: absolute;
          top: 100%;
          left: 0;
          width: 100%;
          text-align: center;
          color: #fff;
          display: inline-block;
          transition: transform 1s cubic-bezier(0.19, 1, 0.22, 1);
        }

        /* On hover: old text fades instantly and moves up, new text slides in */
        .hero-btn:hover .hero-text-old {
          transform: translateY(-100%);
          opacity: 0;
        }
        .hero-btn:hover .hero-text-new {
          transform: translateY(-100%);
        }

        /* Video container — full width, rounded */
        .cb-hero-media {
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
          border-radius: 24px;
          overflow: hidden;
          will-change: transform;
          aspect-ratio: 16 / 9;
          background: #e0e0e0;
        }
        .cb-hero-video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        /* ─── Responsive ─── */
        @media (max-width: 1024px) {
          .cb-hero { padding: 160px 50px 60px; }
        }
        @media (max-width: 768px) {
          .cb-hero { padding: 130px 24px 40px; }
          .cb-hero-content { margin-bottom: 50px; }
          .cb-hero-media { border-radius: 20px; }
          .hero-cta { margin-top: 32px; }
          .hero-btn { padding: 16px 32px; font-size: 15px; }
        }
        @media (max-width: 480px) {
          .cb-hero { padding: 110px 16px 30px; }
          .cb-hero-title { font-size: 2.4rem; margin-bottom: 20px; }
          .cb-hero-media { border-radius: 16px; }
          .hero-sub { font-size: 0.95rem; }
          .hero-btn { padding: 14px 28px; font-size: 14px; }
          .hero-cta { margin-top: 24px; }
        }
      `}</style>
    </section>
  )
}

export default Hero
