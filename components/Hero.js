'use client'

import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import LiquidSculpture from './animations/LiquidSculpture'

const Hero = () => {
  const heroRef = useRef(null)
  const videoRef = useRef(null)
  const aboutRef = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-line',
        { y: 120, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.12, duration: 1.4, ease: 'power4.out', delay: 0.2 }
      )
      gsap.fromTo('.hero-sub',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: 'power4.out', delay: 0.5 }
      )
      gsap.fromTo(videoRef.current,
        { scale: 0.92, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.6, ease: 'expo.out', delay: 0.5 }
      )
      if (videoRef.current) {
        gsap.to(videoRef.current, {
          y: -100, scale: 0.94,
          scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: 1.5 }
        })
      }
      if (aboutRef.current) {
        gsap.fromTo('.cb-about-sculpture',
          { x: -60, opacity: 0 },
          {
            x: 0, opacity: 1, duration: 1.2, ease: 'power3.out',
            scrollTrigger: { trigger: aboutRef.current, start: 'top 80%', toggleActions: 'play none none none' }
          }
        )
        gsap.fromTo('.cb-about-text p',
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1, stagger: 0.15, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: aboutRef.current, start: 'top 75%', toggleActions: 'play none none none' }
          }
        )
        gsap.fromTo('.cb-about-cta',
          { y: 30, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: aboutRef.current, start: 'top 65%', toggleActions: 'play none none none' }
          }
        )
      }
    }, heroRef)
    return () => ctx.revert()
  }, [])

  return (
    <section className="cb-hero" ref={heroRef}>
      <div className="cb-hero-content">
        <h1 className="cb-hero-title">
          <span className="hero-line">Powering Businesses</span>
          <span className="hero-line">With Innovation</span>
        </h1>
        <p className="hero-sub">
          A full-service digital agency crafting intuitive UI/UX designs, scalable web &amp; mobile
          applications, and performance-driven digital marketing strategies that elevate brands.
        </p>
      </div>

      <div className="cb-hero-media" ref={videoRef}>
        <video autoPlay muted loop playsInline className="cb-hero-video">
          <source src="/videos/hero-3d.mp4" type="video/mp4" />
        </video>
      </div>

      {/* ─── Cuberto-style about section — 50/50 grid ─── */}
      <div className="cb-hero-about" ref={aboutRef}>
        <div className="cb-about-sculpture">
          <LiquidSculpture />
        </div>
        <div className="cb-about-text">
          <p>
            Since 2018, we have been helping our clients find exceptional solutions for their
            businesses, creating memorable websites, mobile apps, and digital products.
          </p>
          <p>
            Prominent TechnoLabs doesn&apos;t do cookie-cutter solutions and we build products exactly as they were
            during the design phase, no short cuts or simplifications.
          </p>
          <div className="cb-about-cta">
            <Link href="/services/" className="hero-btn">
              <span className="hero-btn-text-wrapper">
                <span className="hero-text-old">What we do</span>
                <span className="hero-text-new">What we do</span>
              </span>
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        .cb-hero {
          min-height: 100vh;
          background: #ffffff;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 180px 100px 0;
          position: relative;
          overflow: hidden;
        }
        .cb-hero-content {
          text-align: center;
          max-width: 1100px;
          margin: 0 auto 80px;
        }
        .cb-hero-title {
          font-size: clamp(3.2rem, 7.5vw, 6.5rem);
          font-weight: 500;
          line-height: 1.05;
          letter-spacing: -0.035em;
          color: #000;
          margin-bottom: 28px;
        }
        .hero-line { display: block; overflow: hidden; }
        .hero-sub {
          font-size: clamp(1rem, 1.3vw, 1.2rem);
          font-weight: 400;
          color: #000;
          opacity: 0.65;
          line-height: 1.6;
          max-width: 650px;
          margin: 0 auto;
        }
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

        /* ═══ About Section — exact 50/50 split ═══ */
        .cb-hero-about {
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;
          max-width: 1400px;
          width: 100%;
          margin: 0 auto;
          padding: 60px 0 100px;
        }
        .cb-about-sculpture {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 420px;
        }
        .cb-about-text {
          padding-left: 20px;
        }
        .cb-about-text p {
          font-size: clamp(1.05rem, 1.45vw, 1.28rem);
          font-weight: 400;
          line-height: 1.55;
          color: #000;
          margin-bottom: 24px;
        }
        .cb-about-text p:last-of-type { margin-bottom: 0; }
        .cb-about-cta { margin-top: 40px; }

        /* ═══ Button ═══ */
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
        .hero-btn::before {
          content: '';
          position: absolute;
          top: 100%; left: -50%;
          width: 200%; height: 300%;
          background: #000;
          border-radius: 50%;
          transform: translateY(0);
          transition: transform 1s cubic-bezier(0.19, 1, 0.22, 1);
          z-index: 0;
        }
        .hero-btn:hover::before { transform: translateY(-60%); }
        .hero-btn:hover { border-color: #000; }
        .hero-btn-text-wrapper {
          position: relative; z-index: 1;
          display: inline-flex; overflow: hidden;
          padding-bottom: 1px;
        }
        .hero-text-old {
          display: inline-block; color: #000;
          transition: transform 1s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.15s ease-out;
        }
        .hero-text-new {
          position: absolute; top: 100%; left: 0; width: 100%;
          text-align: center; color: #fff; display: inline-block;
          transition: transform 1s cubic-bezier(0.19, 1, 0.22, 1);
        }
        .hero-btn:hover .hero-text-old { transform: translateY(-100%); opacity: 0; }
        .hero-btn:hover .hero-text-new { transform: translateY(-100%); }

        /* ═══ Responsive ═══ */
        @media (max-width: 1200px) {
          .cb-hero-about { padding: 50px 0 80px; }
          .cb-about-sculpture { min-height: 380px; }
        }
        @media (max-width: 1024px) {
          .cb-hero { padding: 160px 50px 0; }
          .cb-hero-about { padding: 40px 0 70px; }
          .cb-about-sculpture { min-height: 340px; }
        }
        @media (max-width: 768px) {
          .cb-hero { padding: 130px 24px 0; }
          .cb-hero-content { margin-bottom: 50px; }
          .cb-hero-media { border-radius: 20px; }
          .cb-hero-about {
            grid-template-columns: 1fr;
            gap: 20px;
            padding: 35px 0 50px;
          }
          .cb-about-sculpture { min-height: 300px; }
          .cb-about-text {
            text-align: center;
            padding-left: 0;
            max-width: 500px;
            margin: 0 auto;
          }
          .hero-btn { padding: 16px 32px; font-size: 15px; }
        }
        @media (max-width: 480px) {
          .cb-hero { padding: 110px 16px 0; }
          .cb-hero-title { font-size: 2.4rem; margin-bottom: 20px; }
          .cb-hero-media { border-radius: 16px; }
          .hero-sub { font-size: 0.95rem; }
          .cb-hero-about { gap: 10px; padding: 30px 0 35px; }
          .cb-about-sculpture { min-height: 260px; }
          .cb-about-text p { font-size: 0.95rem; }
          .hero-btn { padding: 14px 28px; font-size: 14px; }
          .cb-about-cta { margin-top: 24px; }
        }
      `}</style>
    </section>
  )
}

export default Hero
