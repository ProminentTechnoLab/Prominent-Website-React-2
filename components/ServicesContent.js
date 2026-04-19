'use client'

import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import StretchableLine from './animations/StretchableLine'
import SERVICE_CONFIGS from './serviceConfigs'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const BenefitIcon = ({ type }) => {
  const svgs = {
    strategic: (
      <svg viewBox="0 0 80 80" className="sc-benefit-svg" fill="none">
        <circle cx="40" cy="40" r="30" stroke="currentColor" strokeWidth="1.5" opacity="0.2" />
        <path d="M40 25 L40 55 M25 40 L55 40" stroke="currentColor" strokeWidth="1.5" opacity="0.4" className="sc-icon-pulse" />
        <circle cx="40" cy="40" r="10" stroke="currentColor" strokeWidth="2" opacity="0.8" className="sc-icon-rotate" />
        <circle cx="40" cy="40" r="3" fill="currentColor" opacity="0.9" />
      </svg>
    ),
    scalable: (
      <svg viewBox="0 0 80 80" className="sc-benefit-svg" fill="none">
        <rect x="20" y="50" width="10" height="10" stroke="currentColor" strokeWidth="1.5" opacity="0.4" className="sc-icon-grow-1" />
        <rect x="35" y="40" width="10" height="20" stroke="currentColor" strokeWidth="1.5" opacity="0.6" className="sc-icon-grow-2" />
        <rect x="50" y="30" width="10" height="30" stroke="currentColor" strokeWidth="1.5" opacity="0.8" className="sc-icon-grow-3" />
      </svg>
    ),
    premium: (
      <svg viewBox="0 0 80 80" className="sc-benefit-svg" fill="none">
        <path d="M40 15 L50 35 L70 40 L50 45 L40 65 L30 45 L10 40 L30 35 Z" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
        <path d="M40 25 L45 35 L55 40 L45 45 L40 55 L35 45 L25 40 L35 35 Z" fill="currentColor" opacity="0.7" className="sc-icon-sparkle" />
      </svg>
    ),
    unity: (
      <svg viewBox="0 0 80 80" className="sc-benefit-svg" fill="none">
        <circle cx="25" cy="25" r="8" stroke="currentColor" strokeWidth="1.5" opacity="0.5" className="sc-node-1" />
        <circle cx="55" cy="25" r="8" stroke="currentColor" strokeWidth="1.5" opacity="0.5" className="sc-node-2" />
        <circle cx="40" cy="55" r="8" stroke="currentColor" strokeWidth="1.5" opacity="0.5" className="sc-node-3" />
        <path d="M33 25 L47 25 M30 33 L35 48 M50 48 L55 33" stroke="currentColor" strokeWidth="1" opacity="0.3" strokeDasharray="4 2" />
        <circle cx="40" cy="35" r="3" fill="currentColor" opacity="0.6" className="sc-node-core" />
      </svg>
    ),
  }
  return <div className="sc-benefit-icon-box">{svgs[type]}</div>
}

const ServicesContent = () => {
  const containerRef = useRef(null)
  const rowsRef = useRef([])

  const services = [
    { id: 'website-development', slug: 'website-development' },
    { id: 'mobile-app-development', slug: 'mobile-app-development' },
    { id: 'ui-ux-design', slug: 'ui-ux-design' },
    { id: 'cms-ecommerce', slug: 'cms-ecommerce' },
    { id: 'payment-shipping-api', slug: 'payment-shipping-api' },
    { id: 'digital-marketing', slug: 'digital-marketing' }
  ]

  const benefits = [
    {
      badge: 'Strategic',
      title: 'Business Focused Delivery',
      desc: 'We don’t just build; we engineer with purpose. Every line of code is a step toward your tangible business goals.',
      icon: 'strategic'
    },
    {
      badge: 'Scalable',
      title: 'Infinite Growth Architecture',
      desc: 'Our solutions are designed to grow with you. We build robust infrastructures that handle your success today and tomorrow.',
      icon: 'scalable'
    },
    {
      badge: 'Premium',
      title: 'User-Centric Excellence',
      desc: 'Premium experiences that resonate deeply. We prioritize the user journey to ensure world-class engagement.',
      icon: 'premium'
    },
    {
      badge: 'Unity',
      title: 'Full-Stack Agile Partnership',
      desc: 'We are your extended team of experts. Transparent communication and rapid iterations keep us aligned with your vision.',
      icon: 'unity'
    }
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Title Animation
      gsap.from('.sc-hero-title span', {
        y: 80,
        opacity: 0,
        duration: 1.2,
        ease: 'power4.out',
        stagger: 0.1
      })

      // Hero Video Reveal
      gsap.from('.sc-hero-video-wrap', {
        scale: 0.9,
        opacity: 0,
        duration: 1.5,
        ease: 'expo.out',
        delay: 0.5
      })

      // Section Reveals
      gsap.utils.toArray('.reveal').forEach(el => {
        gsap.from(el, {
          y: 40,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
          }
        })
      })

    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div className="sc-container" ref={containerRef}>
      {/* ─── Section 1: Hero (White) ─── */}
      <section className="sc-hero sc-white-bg">
        <div className="sc-inner">
          <div className="sc-narrow-inner">
            <h1 className="sc-hero-title">
              <span className="d-block">Going beyond</span>
              <span className="d-block">what's possible</span>
            </h1>
          </div>
          <div className="sc-hero-video-container">
            <div className="sc-hero-video-wrap">
              <video
                src="/videos/branding-video.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="sc-hero-video"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── Section 2: Our Solutions (White) ─── */}
      <section className="sc-solutions sc-white-bg">
        <div className="sc-wide-inner">
          <h2 className="sc-main-title reveal">Our solutions</h2>

          <div className="sc-list">
            <StretchableLine color="rgba(0,0,0,0.85)" />
            {services.map((s, i) => {
              const config = SERVICE_CONFIGS[s.id]
              return (
                <div key={s.id} className="sc-list-item-wrap">
                  <div className="sc-row reveal">
                    <div className="sc-row-grid">
                      <div className="sc-col-left">
                        <span className="sc-row-badge">{config.badge}</span>
                      </div>
                      <div className="sc-col-right">
                        <div className="sc-row-main">
                          <p className="sc-row-desc">
                            {config.heroSubtitle}
                          </p>
                        </div>
                        <div className="sc-row-action">
                          <Link href={`/services/${s.slug}/`} className="hero-btn">
                            <span className="hero-btn-text-wrapper">
                              <span className="hero-text-old">Read more</span>
                              <span className="hero-text-new">Read more</span>
                            </span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  {i < services.length - 1 && <StretchableLine color="rgba(0,0,0,0.85)" />}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── Section 3: Benefits (Black) ─── */}
      <section className="sc-benefits sc-black-bg">
        <div className="sc-wide-inner">
          <h2 className="sc-main-title white-text reveal">
            <span className="d-block">Benefits of</span>
            <span className="d-block">working with us</span>
          </h2>

          <div className="sc-list">
            <StretchableLine color="rgba(255,255,255,1)" />
            {benefits.map((b, i) => (
              <div key={i} className="sc-list-item-wrap">
                <div className="sc-row reveal">
                  <div className="sc-row-grid benefit-row">
                    <div className="sc-col-icon">
                      <BenefitIcon type={b.icon} />
                    </div>
                    <div className="sc-col-left">
                      <span className="sc-row-badge white-text">{b.badge}</span>
                    </div>
                    <div className="sc-col-right">
                      <div className="sc-row-main">
                        <p className="sc-row-desc white-text">
                          <strong style={{ fontSize: '1.4rem' }}>{b.title}</strong><br />
                          {b.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                {i < benefits.length - 1 && <StretchableLine color="rgba(255,255,255,1)" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .sc-container {
          background-color: #ffffff;
          padding-top: 140px;
        }
        .sc-white-bg { background: #ffffff; color: #000000; }
        .sc-black-bg { 
          background: #000000; 
          color: #ffffff; 
          padding: 140px 0;
          border-top-left-radius: 60px;
          border-top-right-radius: 60px;
        }

        .sc-wide-inner {
          width: 100%;
          padding: 0 15vw;
        }
        .sc-narrow-inner {
          width: 100%;
          padding: 0 100px;
        }
        .sc-hero-video-container {
          width: 100%;
          padding: 0 100px;
        }
        
        .d-block { display: block; overflow: hidden; }
        .sc-label {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: rgba(0,0,0,0.4);
          font-weight: 600;
          margin-bottom: 20px;
          display: block;
        }
        .sc-black-bg .sc-label { color: rgba(255,255,255,0.5); }

        .sc-section-title {
          font-size: clamp(2rem, 4vw, 3.5rem);
          font-weight: 500;
          letter-spacing: -0.03em;
          line-height: 1.1;
          max-width: 800px;
          margin-bottom: 60px;
        }
        .white-text { color: #fff !important; }

        /* Hero */
        .sc-hero {
          padding-bottom: 120px;
          text-align: center;
        }
        .sc-hero-title {
          font-size: clamp(2.5rem, 7vw, 5.5rem);
          font-weight: 500;
          line-height: 1.05;
          letter-spacing: -0.04em;
          margin-bottom: 80px;
        }
        .sc-hero-video-wrap {
          width: 100%;
          border-radius: 40px;
          overflow: hidden;
          background: #f1f1f1;
          line-height: 0;
        }
        .sc-hero-video {
          width: 100%;
          height: auto;
          display: block;
          transform: scale(1.12); /* Zoom in to hide watermark */
          transform-origin: center;
        }

        .sc-main-title {
          font-size: clamp(2.5rem, 6vw, 5.2rem);
          font-weight: 500;
          letter-spacing: -0.045em;
          line-height: 1.05;
          margin-bottom: 100px;
          color: #000;
          padding-left: 0;
        }

        /* Solutions */
        .sc-solutions {
          padding-bottom: 140px;
        }
        .sc-row {
          padding: 60px 0;
          transition: all 0.4s ease;
        }
        .sc-row-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          align-items: flex-start;
        }
        .sc-row-badge {
          font-size: 13px;
          font-weight: 600;
          text-transform: uppercase;
          color: rgba(0,0,0,0.4);
          letter-spacing: 0.05em;
          padding-top: 0;
          display: block;
        }

        .sc-row-title {
          font-size: clamp(1.8rem, 3.5vw, 2.8rem);
          font-weight: 500;
          margin-bottom: 20px;
          letter-spacing: -0.02em;
        }
        .sc-row-desc {
          font-size: clamp(1.1rem, 1.4vw, 1.25rem);
          line-height: 1.55;
          color: #000;
          opacity: 0.85;
          max-width: 750px;
          margin-bottom: 40px;
        }

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
          font-family: inherit;
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
          transition: transform 1.2s cubic-bezier(0.19, 1, 0.22, 1);
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
          transition: transform 0.8s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.15s ease-out;
        }
        .hero-text-new {
          position: absolute; top: 100%; left: 0; width: 100%;
          text-align: center; color: #fff; display: inline-block;
          transition: transform 0.8s cubic-bezier(0.19, 1, 0.22, 1);
        }
        .hero-btn:hover .hero-text-old { transform: translateY(-100%); opacity: 0; }
        .hero-btn:hover .hero-text-new { transform: translateY(-100%); }

        /* Benefits */
        .sc-benefits-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 80px 60px;
        }
        .sc-benefit-item {
          display: flex;
          flex-direction: column;
        }
        .sc-benefit-title {
          font-size: 1.6rem;
          font-weight: 500;
          margin-bottom: 20px;
          color: #fff;
        }
        .sc-benefit-desc {
          font-size: 1.05rem;
          line-height: 1.6;
          color: rgba(255,255,255,0.6);
          margin-bottom: 30px;
        }
        .sc-benefit-line {
          height: 1px;
          background: rgba(255,255,255,0.15);
          width: 0;
          transition: width 0.8s ease;
        }
        .sc-benefit-item:hover .sc-benefit-line {
          width: 100%;
        }
        .sc-row-grid.benefit-row {
          grid-template-columns: 0.4fr 0.6fr 2fr;
          align-items: flex-start;
          padding-top: 60px;
          padding-bottom: 60px;
          padding: 0;
        }
        .sc-col-icon { display: flex; align-items: flex-start; justify-content: flex-start; margin-top: -15px; }
        .sc-benefit-icon-box {
          width: 80px;
          height: 80px;
          color: #fff;
          opacity: 0.9;
        }
        .sc-benefit-svg { width: 100%; height: 100%; }

        /* SVG Animations */
        .sc-icon-pulse { animation: scPulse 3s ease-in-out infinite; }
        @keyframes scPulse { 0%, 100% { opacity: 0.4; transform: scale(1); } 50% { opacity: 0.6; transform: scale(1.05); } }

        .sc-icon-rotate { transform-origin: 40px 40px; animation: scRotate 8s linear infinite; }
        @keyframes scRotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

        .sc-icon-grow-1 { animation: scGrow 2s ease-in-out infinite; }
        .sc-icon-grow-2 { animation: scGrow 2s ease-in-out infinite 0.3s; }
        .sc-icon-grow-3 { animation: scGrow 2s ease-in-out infinite 0.6s; }
        @keyframes scGrow { 0%, 100% { opacity: 0.4; } 50% { opacity: 0.8; } }

        .sc-icon-sparkle { animation: scSparkle 4s ease-in-out infinite; }
        @keyframes scSparkle { 0%, 100% { opacity: 0.7; transform: scale(1); } 50% { opacity: 0.4; transform: scale(0.9); } }

        .sc-node-1 { animation: scFloat 5s ease-in-out infinite; }
        .sc-node-2 { animation: scFloat 5s ease-in-out infinite 1s; }
        .sc-node-3 { animation: scFloat 5s ease-in-out infinite 2s; }
        @keyframes scFloat { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }

        .sc-node-core { animation: scPulseCore 2s ease-in-out infinite; }
        @keyframes scPulseCore { 0%, 100% { opacity: 0.6; } 50% { opacity: 0.3; } }

        @media (max-width: 1024px) {
          .sc-wide-inner { padding: 0 40px; }
          .sc-narrow-inner { padding: 0 40px; }
          .sc-hero-video-container { padding: 0 40px; }
          .sc-row-grid { grid-template-columns: 1fr; gap: 20px; }
          .sc-col-left { margin-bottom: 5px; }
          .sc-row-grid.benefit-row { 
            display: flex;
            flex-direction: column;
            align-items: flex-start; 
            text-align: left;
            gap: 20px; 
          }
          .sc-col-icon { margin-top: 0; justify-content: flex-start; }
          .sc-main-title { margin-bottom: 60px; }
        }

        @media (max-width: 768px) {
          .sc-container { padding-top: 100px; }
          .sc-wide-inner { padding: 0 24px; }
          .sc-narrow-inner { padding: 0 24px; }
          .sc-hero-video-container { padding: 0 24px; }
          .sc-hero-video-wrap { border-radius: 20px; }
          .sc-hero-title { font-size: 3.2rem; margin-bottom: 40px; }
          .sc-main-title { font-size: 2.8rem; margin-bottom: 40px; }
          .sc-row { padding: 40px 0; }
          .sc-section-title { font-size: 1.8rem; }
          .sc-black-bg { padding: 60px 0; border-top-left-radius: 0; border-top-right-radius: 0; }
          .sc-row-desc { font-size: 1.1rem; margin-bottom: 30px; }
          .hero-btn { padding: 15px 30px; font-size: 15px; }
        }

        @media (max-width: 480px) {
          .sc-container { padding-top: 80px; }
          .sc-wide-inner { padding: 0 20px; }
          .sc-narrow-inner { padding: 0 20px; }
          .sc-hero-video-container { padding: 0 20px; }
          .sc-hero-title { font-size: 2.4rem; }
          .sc-main-title { font-size: 2.2rem; }
          .sc-benefit-icon-box { width: 64px; height: 64px; }
        }
      `}</style>
    </div>
  )
}

export default ServicesContent
