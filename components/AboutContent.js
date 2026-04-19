'use client'

import React, { useEffect, useRef, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import StretchableLine from './animations/StretchableLine'
import Testimonials from './Testimonials'

// ─── Animated SVG Benefit Icons ───
const BenefitIcon = ({ type }) => {
  const svgs = {
    globe: (
      <svg viewBox="0 0 80 80" className="ab-benefit-svg" fill="none">
        <circle cx="40" cy="40" r="28" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
        <ellipse cx="40" cy="40" rx="28" ry="10" stroke="currentColor" strokeWidth="1.5" opacity="0.6" className="ab-orbit-1" />
        <ellipse cx="40" cy="40" rx="28" ry="10" stroke="currentColor" strokeWidth="1.5" opacity="0.5" className="ab-orbit-2" />
        <ellipse cx="40" cy="40" rx="28" ry="10" stroke="currentColor" strokeWidth="1.5" opacity="0.3" className="ab-orbit-3" />
        <circle cx="40" cy="40" r="3" fill="currentColor" opacity="0.7" className="ab-pulse-dot" />
      </svg>
    ),
    diamond: (
      <svg viewBox="0 0 80 80" className="ab-benefit-svg" fill="none">
        <rect x="16" y="16" width="48" height="48" stroke="currentColor" strokeWidth="1.5" opacity="0.3" rx="2" className="ab-diamond-1" />
        <rect x="24" y="24" width="32" height="32" stroke="currentColor" strokeWidth="1.5" opacity="0.5" rx="2" className="ab-diamond-2" />
        <rect x="32" y="32" width="16" height="16" stroke="currentColor" strokeWidth="1.8" opacity="0.8" rx="1" className="ab-diamond-3" />
        <circle cx="40" cy="40" r="2" fill="currentColor" opacity="0.6" className="ab-pulse-dot" />
      </svg>
    ),
    compass: (
      <svg viewBox="0 0 80 80" className="ab-benefit-svg" fill="none">
        <circle cx="40" cy="40" r="28" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
        <circle cx="40" cy="40" r="20" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
        <line x1="40" y1="10" x2="40" y2="70" stroke="currentColor" strokeWidth="1" opacity="0.4" />
        <line x1="10" y1="40" x2="70" y2="40" stroke="currentColor" strokeWidth="1" opacity="0.4" />
        <polygon points="40,16 46,42 40,64 34,42" fill="currentColor" opacity="0.5" className="ab-compass-needle" />
        <polygon points="40,22 43,40 40,58 37,40" fill="currentColor" opacity="0.7" className="ab-compass-needle" />
        <circle cx="40" cy="40" r="2.5" fill="currentColor" opacity="0.8" />
      </svg>
    ),
    links: (
      <svg viewBox="0 0 80 80" className="ab-benefit-svg" fill="none">
        <circle cx="30" cy="40" r="16" stroke="currentColor" strokeWidth="1.5" opacity="0.6" className="ab-link-1" />
        <circle cx="50" cy="40" r="16" stroke="currentColor" strokeWidth="1.5" opacity="0.6" className="ab-link-2" />
        <circle cx="40" cy="40" r="4" fill="currentColor" opacity="0.4" className="ab-pulse-dot" />
        <circle cx="40" cy="40" r="1.5" fill="currentColor" opacity="0.8" />
      </svg>
    ),
  }
  return <div className="ab-benefit-icon-box">{svgs[type]}</div>
}

// ─── Standalone StatCard with reliable IntersectionObserver counter ───
const StatCard = ({ stat, index }) => {
  const [count, setCount] = useState(0)
  const cardRef = useRef(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const el = cardRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          const target = stat.num
          const duration = 2000
          const startTime = performance.now()

          const animate = (currentTime) => {
            const elapsed = currentTime - startTime
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.ceil(eased * target))

            if (progress < 1) {
              requestAnimationFrame(animate)
            }
          }
          requestAnimationFrame(animate)
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [stat.num])

  const handleMouseMove = useCallback((e) => {
    const el = cardRef.current
    if (!el) return
    const { left, top, width, height } = el.getBoundingClientRect()
    const x = ((e.clientX - left) / width - 0.5) * 2
    const y = ((e.clientY - top) / height - 0.5) * 2
    el.style.transform = `translateY(-8px) perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`
  }, [])

  const handleMouseLeave = useCallback(() => {
    const el = cardRef.current
    if (!el) return
    el.style.transform = ''
  }, [])

  return (
    <div
      ref={cardRef}
      className="ab-stat-item"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="ab-stat-num-wrap">
        <span className="ab-stat-num">{count}</span>
        <span className="ab-stat-suffix">{stat.suffix}</span>
      </div>
      <div className="ab-stat-divider" />
      <span className="ab-stat-label">{stat.label}</span>
    </div>
  )
}

const AboutContent = () => {
  const containerRef = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      // Hero Title Animation
      gsap.fromTo('.ab-hero-title span',
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 1.2, ease: 'power4.out', delay: 0.2 }
      )

      // Hero Media Reveal
      gsap.fromTo('.ab-hero-media',
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.5, ease: 'expo.out', delay: 0.4 }
      )

      // Reusable Scroll Reveal
      gsap.utils.toArray('.reveal').forEach(el => {
        gsap.fromTo(el,
          { y: 50, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 1.2, ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              toggleActions: 'play none none none'
            }
          }
        )
      })

      // Image Parallax
      gsap.to('.parallax-img', {
        y: -120,
        ease: 'none',
        scrollTrigger: {
          trigger: '.parallax-wrap',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      })

      // Stats card entrance animation
      gsap.utils.toArray('.ab-stat-item').forEach((item, i) => {
        gsap.fromTo(item,
          { y: 80, opacity: 0, scale: 0.9 },
          {
            y: 0, opacity: 1, scale: 1,
            duration: 1.2,
            ease: 'power3.out',
            delay: i * 0.12,
            scrollTrigger: {
              trigger: item,
              start: 'top 92%',
              toggleActions: 'play none none none'
            }
          }
        )
      })

      // Benefit rows stagger in
      gsap.utils.toArray('.ab-benefit-row').forEach((row, i) => {
        gsap.fromTo(row,
          { y: 60, opacity: 0 },
          {
            y: 0, opacity: 1,
            duration: 1.2,
            ease: 'power3.out',
            delay: i * 0.08,
            scrollTrigger: {
              trigger: row,
              start: 'top 90%',
              toggleActions: 'play none none none'
            }
          }
        )
      })

    }, containerRef)

    return () => ctx.revert()
  }, [])

  const stats = [
    { num: 50, suffix: '+', label: 'Digital Products' },
    { num: 30, suffix: '+', label: 'Happy Clients' },
    { num: 15, suffix: '+', label: 'Experts' },
    { num: 5, suffix: '+', label: 'Years' }
  ]

  const benefits = [
    {
      label: 'Sync',
      title: 'Timezone Agnostic',
      desc: 'We sync with your schedule, ensuring seamless global collaboration across any time difference. Your project never sleeps.',
      icon: 'globe'
    },
    {
      label: 'Quality',
      title: 'Precision Obsessed',
      desc: 'No shortcuts. We develop digital products exactly as they were designed, pixel for pixel, ensuring flawless performance.',
      icon: 'diamond'
    },
    {
      label: 'Terms',
      title: 'Transparent Terms',
      desc: 'Flexible engagement models from fixed-price projects to dedicated time & materials squads. Total clarity in every contract.',
      icon: 'compass'
    },
    {
      label: 'Unity',
      title: 'Full Stack Partnership',
      desc: 'A unified partner for design, engineering, and strategy. We handle the complexity so you can focus on your vision.',
      icon: 'links'
    }
  ]


  return (
    <div className="ab-container" ref={containerRef}>
      {/* ─── Hero Section (WHITE) ─── */}
      <section className="ab-hero ab-white-bg">
        <div className="ab-narrow-container">
          <h1 className="ab-hero-title">
            <span className="d-block">Creativity</span>
            <span className="d-block">meets technology</span>
          </h1>
          <div className="ab-hero-media parallax-wrap">
            <img src="/images/about_hero_vibe.png" alt="Office Vibe" className="parallax-img" />
          </div>
        </div>
      </section>

      {/* ─── Our Goal Section (WHITE) ─── */}
      <section className="ab-goal ab-white-bg">
        <div className="ab-wide-container reveal">
          <div className="ab-grid">
            <div className="ab-col-left">
              <span className="ab-label">Our Goal</span>
            </div>
            <div className="ab-col-right">
              <h2 className="ab-goal-text">
                We believe in the power of digital transformation to solve complex business problems.
                Our team is dedicated to crafting premium experiences that resonate with users and drive growth.
              </h2>
              <p className="ab-sub-text">
                Since 2018, Prominent TechnoLabs has been at the forefront of innovation,
                partnering with startups and enterprises to build the digital future.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Stats Section (WHITE) ─── */}
      <section className="ab-stats ab-white-bg">
        <div className="ab-wide-container">
          <div className="ab-grid ab-stats-header reveal">
            <div className="ab-col-left">
              <span className="ab-label">Our Scale</span>
            </div>
            <div className="ab-col-right">
              <h2 className="ab-stats-title">Turning ambition into tangible digital success.</h2>
            </div>
          </div>
          <div className="ab-stats-grid">
            {stats.map((s, i) => (
              <StatCard key={i} stat={s} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── Benefits Section (BLACK) ─── */}
      <section className="ab-benefits ab-black-bg">
        <div className="ab-wide-container">
          <div className="ab-benefits-header reveal">
            <span className="ab-label">Benefits</span>
            <h2 className="ab-benefits-main-title">Why work with us</h2>
          </div>
          <div className="ab-benefits-list">
            {benefits.map((b, i) => (
              <div key={i}>
                <StretchableLine color="rgba(255,255,255,1)" />
                <div className="ab-benefit-row">
                  <div className="ab-benefit-col-icon">
                    <BenefitIcon type={b.icon} />
                  </div>
                  <div className="ab-benefit-col-label">
                    <span className="ab-label">{b.label}</span>
                  </div>
                  <div className="ab-benefit-col-desc">
                    <h3 className="ab-benefit-title">{b.title}</h3>
                    <p className="ab-benefit-desc">{b.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Testimonials (WHITE) ─── */}
      <section className="ab-testimonials-outer ab-white-bg">
        <Testimonials variant="light" />
      </section>

      <style>{`
        .ab-container {
          background: #ffffff;
          padding-top: 100px;
        }
        .ab-white-bg { background: #ffffff; color: #000000; }
        .ab-black-bg { background: #000000; color: #ffffff; }

        .ab-wide-container {
          width: 100%;
          padding: 0 12vw;
        }
        .ab-narrow-container {
          width: 85%;
          margin: 0 auto;
        }
        
        .d-block { display: block; overflow: hidden; }
        
        .ab-label {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: rgba(0,0,0,0.4);
          font-weight: 600;
        }
        .ab-black-bg .ab-label { color: rgba(255,255,255,0.6); }

        /* ─── Hero ─── */
        .ab-hero { padding: 40px 0 0; text-align: center; }
        .ab-hero-title {
          font-size: clamp(2.5rem, 6vw, 5.2rem);
          line-height: 1.05;
          font-weight: 500;
          letter-spacing: -0.04em;
          margin-bottom: 80px;
        }
        .ab-hero-media {
          width: 100%;
          border-radius: 40px;
          overflow: hidden;
          height: 85vh;
          position: relative;
          background: #f1f1f1;
        }
        .ab-hero-media img {
          width: 100%;
          height: 140%;
          object-fit: cover;
          display: block;
        }

        /* ─── Grid General ─── */
        .ab-grid {
          display: grid;
          grid-template-columns: 0.6fr 2fr;
          gap: 5vw;
          padding: 120px 0 40px;
        }

        /* ─── Goal ─── */
        .ab-goal-text {
          font-size: clamp(1.2rem, 2.8vw, 2.2rem);
          line-height: 1.35;
          font-weight: 500;
          margin-bottom: 50px;
          letter-spacing: -0.02em;
          max-width: 900px;
        }
        .ab-sub-text {
          font-size: 1.15rem;
          color: rgba(0,0,0,0.6);
          max-width: 650px;
          line-height: 1.8;
        }

        /* ─── Stats Section ─── */
        .ab-stats { padding: 80px 0 180px; }
        .ab-stats .ab-label { color: rgba(0,0,0,0.4); }
        .ab-stats-header { margin-bottom: 60px; }
        .ab-stats-title {
          font-size: clamp(1.5rem, 3.5vw, 3rem);
          font-weight: 500;
          margin-top: 0;
          letter-spacing: -0.03em;
          max-width: 800px;
          color: #000;
        }
        .ab-stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 28px;
        }
        .ab-stat-item {
          position: relative;
          background: linear-gradient(165deg, #ffffff 0%, #fafafa 100%);
          padding: 70px 36px 60px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          border-radius: 24px;
          border: 1px solid rgba(0,0,0,0.06);
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          overflow: hidden;
          cursor: default;
        }
        .ab-stat-item::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 24px;
          padding: 1.5px;
          background: linear-gradient(135deg, rgba(0,0,0,0.08), transparent 40%, transparent 60%, rgba(0,0,0,0.04));
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.5s ease;
        }
        .ab-stat-item:hover::before { opacity: 1; }
        .ab-stat-item::after {
          content: '';
          position: absolute;
          top: -60%;
          left: -60%;
          width: 220%;
          height: 220%;
          background: radial-gradient(circle, rgba(0,0,0,0.015) 0%, transparent 60%);
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.6s ease;
        }
        .ab-stat-item:hover::after { opacity: 1; }
        .ab-stat-item:hover {
          transform: translateY(-8px);
          box-shadow: 0 24px 60px -12px rgba(0,0,0,0.08), 0 8px 20px -8px rgba(0,0,0,0.04);
        }
        .ab-stat-num-wrap {
          position: relative;
          margin-bottom: 20px;
        }
        .ab-stat-num {
          font-size: clamp(3rem, 6vw, 4.5rem);
          font-weight: 600;
          line-height: 1;
          letter-spacing: -0.04em;
          background: linear-gradient(135deg, #1a1a1a 0%, #555 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .ab-stat-suffix {
          font-size: clamp(1.5rem, 3vw, 2.2rem);
          font-weight: 400;
          background: linear-gradient(135deg, #888 0%, #bbb 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-left: 2px;
        }
        .ab-stat-divider {
          width: 40px;
          height: 1.5px;
          background: linear-gradient(90deg, transparent, rgba(0,0,0,0.12), transparent);
          margin-bottom: 20px;
          transition: width 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .ab-stat-item:hover .ab-stat-divider { width: 60px; }
        .ab-stat-label {
          font-size: 0.7rem;
          color: rgba(0,0,0,0.4);
          text-transform: uppercase;
          letter-spacing: 0.15em;
          font-weight: 600;
        }

        /* ─── Benefits Section ─── */
        .ab-benefits {
          padding: 120px 0 180px;
          border-top-left-radius: 80px;
          border-top-right-radius: 80px;
          position: relative;
          z-index: 2;
          margin-top: -80px;
        }
        .ab-benefits-header { margin-bottom: 60px; }
        .ab-benefits-main-title {
          font-size: clamp(1.5rem, 3.5vw, 3rem);
          font-weight: 500;
          margin-top: 20px;
          letter-spacing: -0.03em;
          color: #fff;
        }
        .ab-benefits-list { }
        .ab-benefit-row {
          display: grid;
          grid-template-columns: 0.6fr 1.4fr 3fr;
          gap: 30px;
          padding: 60px 0;
          align-items: flex-start;
        }
        .ab-benefit-col-icon { display: flex; align-items: flex-start; margin-top: -12px; }
        .ab-benefit-icon-box {
          width: 80px;
          height: 80px;
          position: relative;
          color: rgba(255,255,255,0.9);
        }
        .ab-benefit-svg {
          width: 100%;
          height: 100%;
        }

        /* SVG Animations */
        .ab-orbit-1 { transform-origin: 40px 40px; animation: abOrbit1 18s linear infinite; }
        .ab-orbit-2 { transform-origin: 40px 40px; animation: abOrbit2 22s linear infinite; }
        .ab-orbit-3 { transform-origin: 40px 40px; animation: abOrbit3 28s linear infinite; }
        @keyframes abOrbit1 { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes abOrbit2 { from { transform: rotate(60deg); } to { transform: rotate(420deg); } }
        @keyframes abOrbit3 { from { transform: rotate(120deg); } to { transform: rotate(480deg); } }

        .ab-diamond-1 { transform-origin: 40px 40px; animation: abDiamondSpin 30s linear infinite; }
        .ab-diamond-2 { transform-origin: 40px 40px; animation: abDiamondSpin 20s linear infinite reverse; }
        .ab-diamond-3 { transform-origin: 40px 40px; animation: abDiamondSpin 14s linear infinite; }
        @keyframes abDiamondSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

        .ab-compass-needle { transform-origin: 40px 40px; animation: abCompassSwing 6s ease-in-out infinite; }
        @keyframes abCompassSwing { 0%, 100% { transform: rotate(0deg); } 30% { transform: rotate(12deg); } 70% { transform: rotate(-12deg); } }

        .ab-link-1 { animation: abLinkPulse1 4s ease-in-out infinite; }
        .ab-link-2 { animation: abLinkPulse2 4s ease-in-out infinite; }
        @keyframes abLinkPulse1 { 0%, 100% { transform: translateX(0); } 50% { transform: translateX(3px); } }
        @keyframes abLinkPulse2 { 0%, 100% { transform: translateX(0); } 50% { transform: translateX(-3px); } }

        .ab-pulse-dot { animation: abPulseDot 3s ease-in-out infinite; }
        @keyframes abPulseDot { 0%, 100% { opacity: 0.5; } 50% { opacity: 0.2; } }

        .ab-benefit-title {
          font-size: clamp(1.5rem, 2.5vw, 2.2rem);
          font-weight: 500;
          margin-bottom: 16px;
          color: #fff;
        }
        .ab-benefit-desc {
          font-size: 1.05rem;
          color: rgba(255,255,255,0.6);
          line-height: 1.6;
          max-width: 600px;
        }

        /* ─── Testimonials Outer ─── */
        .ab-testimonials-outer {
          padding: 0;
          border-top-left-radius: 80px;
          border-top-right-radius: 80px;
          position: relative;
          z-index: 3;
          margin-top: -80px;
          background: #ffffff;
          overflow: hidden;
        }
        .ab-testimonials-outer .tm-section {
          background: #ffffff;
        }

        /* ─── Responsive ─── */
        @media (max-width: 1200px) {
          .ab-wide-container { padding: 0 8vw; }
          .ab-benefit-row { grid-template-columns: 0.6fr 1.2fr 2.5fr; }
        }
        @media (max-width: 1024px) {
          .ab-grid { grid-template-columns: 1fr; gap: 40px; padding: 100px 0; }
          .ab-stats-grid { grid-template-columns: repeat(2, 1fr); gap: 20px; }
          .ab-stats { padding: 100px 0; }
          .ab-benefit-row { grid-template-columns: 1fr; gap: 24px; padding: 50px 0; }
          .ab-benefit-icon-box { width: 64px; height: 64px; }
          .ab-benefits {
            border-top-left-radius: 40px;
            border-top-right-radius: 40px;
            margin-top: -40px;
          }
          .ab-testimonials-outer {
            border-top-left-radius: 40px;
            border-top-right-radius: 40px;
            margin-top: -40px;
          }
        }
        @media (max-width: 768px) {
          .ab-hero-title { font-size: 2.8rem; margin-bottom: 50px; }
          .ab-hero-media { height: 50vh; border-radius: 24px; }
          .ab-stat-item { padding: 50px 20px 40px; }
          .ab-stat-num { font-size: 2.8rem; }

          .ab-wide-container { padding: 0 6vw; }
          .ab-grid { padding: 80px 0 20px; }
          .ab-benefits { padding: 80px 0; border-top-left-radius: 0; border-top-right-radius: 0; margin-top: 0; }
          .ab-testimonials-outer { border-top-left-radius: 0; border-top-right-radius: 0; margin-top: 0; }

          .ab-stats { padding: 40px 0 80px; }
        }
        @media (max-width: 480px) {
          .ab-hero-title { font-size: 2.2rem; }
          .ab-stats-grid { grid-template-columns: repeat(2, 1fr); gap: 14px; }
          .ab-stat-item { padding: 40px 16px 32px; border-radius: 18px; }
          .ab-stat-num { font-size: 2.2rem; }
          .ab-stat-suffix { font-size: 1.2rem; }
          .ab-wide-container { padding: 0 20px; }

          .ab-grid { padding: 60px 0 15px; }
          .ab-stats { padding: 30px 0 60px; }
        }
      `}</style>
    </div>
  )
}

export default AboutContent
