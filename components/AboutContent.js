'use client'

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import TextReveal from './animations/TextReveal'
import MagneticButton from './animations/MagneticButton'
import { IoArrowForward, IoRocketOutline, IoShieldCheckmarkOutline, IoDiamondOutline } from 'react-icons/io5'

const AboutContent = () => {
  const containerRef = useRef(null)
  const statsRef = useRef(null)

  const stats = [
    { label: 'Happy Clients', value: 30, suffix: '+' },
    { label: 'Successful Projects', value: 50, suffix: '+' },
    { label: 'Expert Developers', value: 15, suffix: '+' },
    { label: 'Years of Experience', value: 5, suffix: '+' }
  ]

  const values = [
    { 
      title: 'Innovation', 
      desc: 'We embrace emerging technologies and creative thinking to solve complex problems.',
      icon: <IoRocketOutline />
    },
    { 
      title: 'Quality', 
      desc: 'Our rigorous standards ensure every pixel and line of code meets world-class expectations.',
      icon: <IoShieldCheckmarkOutline />
    },
    { 
      title: 'Reliability', 
      desc: 'We take ownership of your project, delivering results on time and with full transparency.',
      icon: <IoDiamondOutline />
    }
  ]

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    
    const ctx = gsap.context(() => {
      // Hero Entrance
      gsap.from('.stagger-text', {
        y: 60,
        opacity: 0,
        duration: 1.5,
        stagger: 0.2,
        ease: 'power4.out',
        delay: 0.5
      })

      // Stats Counter Animation
      const statItems = gsap.utils.toArray('.counter-val')
      statItems.forEach((item) => {
        const targetValue = parseInt(item.getAttribute('data-target'))
        gsap.to(item, {
          innerText: targetValue,
          duration: 2,
          snap: { innerText: 1 },
          ease: 'power2.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 95%',
          }
        })
      })

      // Section Reveal Animations
      const revealItems = gsap.utils.toArray('.reveal-up')
      revealItems.forEach((item) => {
        gsap.from(item, {
          y: 80,
          opacity: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
          }
        })
      })

    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="about-premium-wrapper">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <div className="hero-content-wrap">
            <div className="badge stagger-text">OUR STORY</div>
            <h1 className="hero-title stagger-text">
              <TextReveal>Engineering Digital</TextReveal>
              <TextReveal delay={0.2} className="accent-text">Innovations Since 2019</TextReveal>
            </h1>
            <p className="hero-p stagger-text">
              We are a team of visionary builders dedicated to transforming ambitious ideas into 
              world-class digital realities. India's premier boutique innovation studio.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="about-stats-section" ref={statsRef}>
        <div className="container">
          <div className="stats-border-grid">
            {stats.map((s, i) => (
              <div key={i} className="stat-card reveal-up">
                <div className="stat-number-box">
                  <span className="counter-val" data-target={s.value}>0</span>
                  <span className="suffix">{s.suffix}</span>
                </div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Narrative Section - Split Layout */}
      <section className="about-narrative section">
        <div className="container">
          <div className="narrative-grid">
            <div className="narrative-visual reveal-up">
              <div className="visual-inner">
                 <img src="/images/about.jpg" alt="Our Studio" className="studio-img" />
                 <div className="visual-badge">EST. 2019</div>
              </div>
            </div>
            <div className="narrative-text reveal-up">
              <h2 className="section-h">From A Small Local Dev Shop To A <span className="text-orange">Global Innovation Hub.</span></h2>
              <div className="text-content">
                <p>
                  Prominent TechnoLabs started with a simple belief: code is not just instructions; it's the foundation of modern business expansion. Over the years, we've evolved into a full-cycle digital agency serving enterprises across the US, Europe, and Australia.
                </p>
                <p>
                  Our philosophy is simple—we don't just build features; we build solutions. Every project we undertake is an opportunity to push the boundaries of what's possible in the digital realm.
                </p>
                <div className="narrative-cta">
                   <MagneticButton strength={20}>
                      <a href="/contact/" className="premium-button">
                        <span className="btn-text">Work With Us</span>
                        <div className="btn-icon">
                          <IoArrowForward />
                        </div>
                      </a>
                   </MagneticButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section (Dark Theme) */}
      <section className="mission-vision-section">
         <div className="container">
            <div className="mv-grid">
               <div className="mv-card reveal-up">
                  <div className="mv-badge">MISSION</div>
                  <h3>To empower brands with the technology of tomorrow, today.</h3>
                  <p>Our mission is to bridge the gap between complex engineering and human-centric design, creating products that leave a lasting impact.</p>
               </div>
               <div className="mv-card reveal-up" style={{ animationDelay: '0.2s' }}>
                  <div className="mv-badge">VISION</div>
                  <h3>To be the most trusted partner for digital transformation globally.</h3>
                  <p>We envision a future where every business, regardless of size, has access to the highest quality digital craftsmanship.</p>
               </div>
            </div>
         </div>
      </section>

      {/* Core Values Section */}
      <section className="about-values">
        <div className="container">
          <div className="section-header reveal-up">
            <div className="badge">OUR DNA</div>
            <h2 className="section-h">The Core Values That Drive Us</h2>
          </div>

          <div className="values-grid">
            {values.map((v, i) => (
              <div key={v.title} className="value-card-premium reveal-up">
                <div className="value-icon-box">{v.icon}</div>
                <div className="value-index">0{i + 1}</div>
                <h3 className="value-title">{v.title}</h3>
                <p className="value-desc">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style jsx>{`
        .about-premium-wrapper { background: #fff; overflow-x: hidden; }
        
        /* Hero Section */
        .about-hero { 
          padding: 150px 0 80px; 
          background: #fff; 
          text-align: left;
        }
        .hero-title { 
            font-size: clamp(3.5rem, 8vw, 7rem); 
            line-height: 0.9; 
            font-weight: 800; 
            letter-spacing: -0.04em; 
            margin-bottom: 3rem; 
            text-transform: uppercase; 
            color: #000;
        }
        .accent-text { opacity: 0.15; display: block; }
        .hero-p { 
            font-size: 1.5rem; 
            max-width: 800px; 
            color: #666; 
            font-weight: 500; 
            line-height: 1.4;
        }

        /* Stats Section - Balanced with Home Page (WhyUs) */
        .about-stats-section { padding: 0; background: #fff; }
        .stats-border-grid { 
          display: grid; 
          grid-template-columns: repeat(4, 1fr); 
          border-top: 1px solid rgba(0,0,0,0.08);
          border-left: 1px solid rgba(0,0,0,0.08);
        }
        .stat-card { 
          padding: 5rem 3rem; 
          border-right: 1px solid rgba(0,0,0,0.08); 
          border-bottom: 1px solid rgba(0,0,0,0.08); 
          text-align: left;
          transition: all 0.6s var(--ease-expo);
        }
        .stat-card:hover { background: #000; color: #fff; }
        
        .stat-number-box { 
          font-family: var(--font-heading);
          font-size: 5rem; 
          font-weight: 800; 
          line-height: 1; 
          color: #000; 
          margin-bottom: 1rem; 
          display: flex; 
          align-items: baseline; 
          letter-spacing: -0.04em;
          transition: color 0.4s;
        }
        .stat-card:hover .stat-number-box,
        .stat-card:hover .counter-val,
        .stat-card:hover .suffix { color: #fff; }

        .counter-val { transition: color 0.4s; }
        .suffix { color: var(--brand-orange); transition: color 0.4s; }
        .stat-label { 
          font-size: 0.8rem; 
          text-transform: uppercase; 
          letter-spacing: 0.2rem; 
          font-weight: 800; 
          color: #999; 
          transition: color 0.4s;
        }
        .stat-card:hover .stat-label { color: rgba(255,255,255,0.6); }

        /* Narrative Section */
        .narrative-grid { display: grid; grid-template-columns: 1fr 1.2fr; gap: 6vw; align-items: center; padding: 80px 0; }
        .visual-inner { position: relative; border-radius: 40px; overflow: hidden; height: 600px; }
        .studio-img { width: 100%; height: 100%; object-fit: cover; }
        .visual-badge { position: absolute; bottom: 40px; right: 40px; background: #fff; padding: 15px 30px; border-radius: 100px; font-weight: 900; font-size: 0.8rem; }
        
        .section-h { 
          font-size: clamp(2.2rem, 4vw, 3rem); 
          line-height: 1.1; 
          font-weight: 800; 
          text-transform: uppercase; 
          margin-bottom: 2.5rem; 
          letter-spacing: -0.02em;
          color: #000;
        }
        .text-orange { color: var(--brand-orange); }
        .text-content p { font-size: 1.1rem; color: #444; line-height: 1.6; margin-bottom: 2rem; opacity: 0.8; }
        
        .narrative-cta { margin-top: 3rem; }
        .premium-button {
          display: inline-flex;
          align-items: center;
          gap: 20px;
          background: #000;
          color: #fff;
          padding: 18px 35px;
          border-radius: 100px;
          text-decoration: none;
          font-weight: 700;
          font-size: 1rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          transition: all 0.4s var(--ease-expo);
          overflow: hidden;
          position: relative;
        }
        .premium-button:hover {
          background: var(--brand-orange);
          transform: scale(1.05);
          box-shadow: 0 20px 40px rgba(255, 102, 0, 0.2);
        }
        .btn-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.4s var(--ease-expo);
        }
        .premium-button:hover .btn-icon {
          transform: translateX(5px);
        }

        /* Mission Vision */
        .mission-vision-section { padding: 80px 0; background: #000; border-radius: 50px; color: #fff; margin: 0 2vw; }
        .mv-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; }
        .mv-card { padding: 3.5rem; border: 1px solid rgba(255,255,255,0.1); border-radius: 30px; }
        .mv-badge { font-size: 0.75rem; font-weight: 900; color: var(--brand-orange); letter-spacing: 0.2rem; margin-bottom: 1.5rem; }
        .mv-card h3 { font-size: 2.2rem; font-weight: 800; margin-bottom: 1.5rem; line-height: 1.1; }
        .mv-card p { font-size: 1.05rem; opacity: 0.6; line-height: 1.6; }

        /* Values Section */
        .about-values { padding: 100px 0; }
        .section-header { margin-bottom: 4rem; }
        .values-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
        .value-card-premium { 
          background: #fbfbfb; 
          border: 1px solid rgba(0,0,0,0.06); 
          padding: 4rem 3rem; 
          border-radius: 30px; 
          transition: all 0.6s var(--ease-expo);
          position: relative;
          overflow: hidden;
        }
        .value-card-premium:hover { 
          background: #000; 
          transform: translateY(-20px); 
          border-color: #000;
        }
        .value-card-premium:hover .value-title, 
        .value-card-premium:hover .value-desc { color: #fff !important; }
        .value-card-premium:hover .value-index { opacity: 0.15 !important; color: #fff; }

        .value-icon-box { font-size: 3rem; color: var(--brand-orange); margin-bottom: 2rem; }
        .value-index { position: absolute; top: 40px; right: 40px; font-size: 4rem; font-weight: 900; opacity: 0.05; color: #000; transition: 0.4s; }
        .value-title { font-size: 1.8rem; font-weight: 800; margin-bottom: 1.5rem; text-transform: uppercase; color: #000; transition: 0.4s; }
        .value-desc { font-size: 1rem; color: #555; line-height: 1.6; transition: 0.4s; }

        @media (max-width: 1024px) {
          .stats-border-grid { grid-template-columns: repeat(2, 1fr); }
          .narrative-grid { grid-template-columns: 1fr; }
          .mv-grid { grid-template-columns: 1fr; }
          .values-grid { grid-template-columns: 1fr; }
          .visual-inner { height: 400px; }
        }
        @media (max-width: 768px) {
          .about-hero { padding: 120px 0 60px; }
          .hero-p { font-size: 1.15rem; }
          .stat-card { padding: 3rem 2rem; }
          .stat-number-box { font-size: 3.5rem; }
          .narrative-grid { padding: 60px 0; }
          .visual-inner { height: 280px; border-radius: 24px; }
          .section-h { font-size: 2rem; margin-bottom: 2rem; }
          .text-content p { font-size: 1rem; }
          .mission-vision-section { padding: 60px 0; margin: 0 0; border-radius: 30px; }
          .mv-card { padding: 2.5rem; border-radius: 24px; }
          .mv-card h3 { font-size: 1.8rem; }
          .about-values { padding: 60px 0; }
          .value-card-premium { padding: 3rem 2rem; border-radius: 24px; }
          .section-header { margin-bottom: 3rem; }
        }
        @media (max-width: 480px) {
          .about-hero { padding: 100px 0 40px; }
          .hero-title { font-size: 2rem !important; }
          .hero-p { font-size: 1rem; max-width: 100%; }
          .stats-border-grid { grid-template-columns: 1fr; }
          .stat-card { padding: 2rem 1.5rem; border-right: none; }
          .stat-number-box { font-size: 3rem; }
          .stat-label { font-size: 0.65rem; letter-spacing: 0.12rem; }
          .narrative-grid { padding: 40px 0; gap: 2.5rem; }
          .visual-inner { height: 220px; border-radius: 16px; }
          .visual-badge { bottom: 15px; right: 15px; padding: 8px 16px; font-size: 0.65rem; }
          .section-h { font-size: 1.6rem; }
          .mission-vision-section { padding: 45px 0; border-radius: 20px; margin: 0; }
          .mv-grid { gap: 1.5rem; }
          .mv-card { padding: 2rem 1.5rem; border-radius: 20px; }
          .mv-card h3 { font-size: 1.4rem; margin-bottom: 1.2rem; }
          .mv-card p { font-size: 0.95rem; }
          .about-values { padding: 45px 0; }
          .values-grid { gap: 1rem; }
          .value-card-premium { padding: 2.5rem 1.5rem; border-radius: 20px; }
          .value-title { font-size: 1.3rem; margin-bottom: 0.8rem; }
          .value-desc { font-size: 0.9rem; }
          .value-icon-box { font-size: 2rem; margin-bottom: 1.2rem; }
          .value-index { font-size: 2.5rem; top: 20px; right: 20px; }
          .premium-button { padding: 12px 24px; font-size: 0.85rem; gap: 12px; }
          .narrative-cta { margin-top: 1.5rem; }
        }
      `}</style>
    </div>
  )
}

export default AboutContent
