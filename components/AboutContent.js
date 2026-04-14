'use client'

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import Link from 'next/link'

const AboutContent = () => {
  const sectionRef = useRef(null)

  const stats = [
    { value: '30+', label: 'Happy Clients' },
    { value: '50+', label: 'Projects Completed' },
    { value: '15+', label: 'Team Members' },
    { value: '5+', label: 'Years Experience' }
  ]

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      gsap.fromTo('.ab-line', { y: 80, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1, duration: 1.2, ease: 'power4.out', delay: 0.3 })
      gsap.utils.toArray('.ab-reveal').forEach(el => {
        gsap.fromTo(el, { y: 50, opacity: 0 }, {
          y: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%' }
        })
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <div className="ab-page" ref={sectionRef}>
      {/* Hero */}
      <section className="ab-hero">
        <div className="ab-inner">
          <h1 className="ab-title">
            <span className="ab-line">Powering Businesses</span>
            <span className="ab-line">Since 2019</span>
          </h1>
          <p className="ab-intro ab-reveal">
            Prominent TechnoLabs is a digital design and technology partner focused on
            smart interactions, delightful UX, and high-performance engineering solutions.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="ab-story ab-reveal">
        <div className="ab-inner">
          <div className="ab-story-grid">
            <div className="ab-story-img">
              <img src="/images/about.jpg" alt="Our Studio" />
            </div>
            <div className="ab-story-text">
              <p>
                We started with a simple belief: code is not just instructions — it's the foundation
                of modern business expansion. Over the years, we've evolved into a full-cycle digital
                agency serving enterprises across the US, Europe, and Australia.
              </p>
              <p>
                Our philosophy is simple — we don't just build features; we build solutions. Every project
                we undertake is an opportunity to push the boundaries of what's possible.
              </p>
              <Link href="/contact/" className="ab-pill">Work with us</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats — Cuberto-style grid with thin borders */}
      <section className="ab-stats-section">
        <div className="ab-inner">
          <div className="ab-stats">
            {stats.map(s => (
              <div key={s.label} className="ab-stat ab-reveal">
                <div className="ab-stat-val">{s.value}</div>
                <div className="ab-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission/Vision on dark */}
      <section className="ab-mv">
        <div className="ab-inner">
          <div className="ab-mv-grid">
            <div className="ab-mv-card ab-reveal">
              <span className="ab-mv-label">Mission</span>
              <h3>To empower brands with the technology of tomorrow, today.</h3>
              <p>We bridge the gap between complex engineering and human-centric design.</p>
            </div>
            <div className="ab-mv-card ab-reveal">
              <span className="ab-mv-label">Vision</span>
              <h3>To be the most trusted partner for digital transformation globally.</h3>
              <p>Every business deserves access to the highest quality digital craftsmanship.</p>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .ab-page { background: var(--bg-primary); }

        .ab-hero {
          padding: 160px 0 80px;
        }
        .ab-inner { max-width: 1400px; margin: 0 auto; padding: 0 40px; }
        .ab-title {
          font-size: clamp(2.5rem, 6vw, 5.2rem); /* Standardized across all sections */
          font-weight: 500;
          line-height: 1.0;
          letter-spacing: -0.04em;
          color: #000;
          margin-bottom: 40px;
        }
        .ab-line { display: block; overflow: hidden; }
        .ab-intro {
          font-size: clamp(1.1rem, 1.5vw, 1.3rem);
          color: #000;
          max-width: 700px;
          line-height: 1.5;
          font-weight: 400;
        }

        /* Story */
        .ab-story { padding: 60px 0; }
        .ab-story-grid {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 60px;
          align-items: start;
        }
        .ab-story-img {
          border-radius: 24px;
          overflow: hidden;
          aspect-ratio: 4 / 3;
        }
        .ab-story-img img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .ab-story-text p {
          font-size: 1.1rem;
          color: #555;
          line-height: 1.6;
          margin-bottom: 20px;
        }
        .ab-pill {
          display: inline-flex;
          padding: 14px 28px;
          border: 1px solid rgba(0,0,0,0.15);
          border-radius: 100px;
          color: #000;
          text-decoration: none;
          font-size: 0.95rem;
          font-weight: 500;
          transition: all 0.4s var(--ease-expo);
          margin-top: 12px;
        }
        .ab-pill:hover { background: #000; color: #fff; border-color: #000; }

        /* Stats */
        .ab-stats-section { padding: 40px 0 80px; }
        .ab-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          border-top: 1px solid rgba(0,0,0,0.1);
        }
        .ab-stat {
          padding: 40px 0;
          border-bottom: 1px solid rgba(0,0,0,0.1);
          border-right: 1px solid rgba(0,0,0,0.1);
          transition: background 0.4s;
        }
        .ab-stat:last-child { border-right: none; }
        .ab-stat:hover { background: #000; }
        .ab-stat:hover .ab-stat-val { color: #fff; }
        .ab-stat:hover .ab-stat-label { color: rgba(255,255,255,0.4); }

        .ab-stat-val {
          font-size: clamp(2.5rem, 4vw, 3.5rem);
          font-weight: 500;
          color: #000;
          letter-spacing: -0.03em;
          margin-bottom: 8px;
          transition: color 0.4s;
        }
        .ab-stat-label {
          font-size: 0.75rem;
          font-weight: 500;
          color: #999;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          transition: color 0.4s;
        }

        /* Mission Vision */
        .ab-mv {
          background: #000;
          color: #fff;
          padding: 120px 0;
          border-radius: 30px 30px 0 0;
        }
        .ab-mv-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1px;
          background: rgba(255,255,255,0.08);
          border-radius: 20px;
          overflow: hidden;
        }
        .ab-mv-card { background: #000; padding: 50px; }
        .ab-mv-label {
          font-size: 0.7rem;
          font-weight: 500;
          color: rgba(255,255,255,0.4);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          display: block;
          margin-bottom: 20px;
        }
        .ab-mv-card h3 {
          font-size: 1.8rem;
          font-weight: 500;
          color: #fff;
          line-height: 1.2;
          margin-bottom: 16px;
        }
        .ab-mv-card p {
          font-size: 1rem;
          color: rgba(255,255,255,0.4);
          line-height: 1.5;
        }

        @media (max-width: 1024px) {
          .ab-stats { grid-template-columns: 1fr 1fr; }
          .ab-stat:nth-child(2) { border-right: none; }
          .ab-story-grid { grid-template-columns: 1fr; }
          .ab-mv-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 768px) {
          .ab-hero { padding: 120px 0 60px; }
          .ab-inner { padding: 0 20px; }
          .ab-story-img { border-radius: 20px; }
          .ab-mv { padding: 80px 0; border-radius: 20px 20px 0 0; }
          .ab-mv-card { padding: 32px; }
        }
        @media (max-width: 480px) {
          .ab-hero { padding: 100px 0 40px; }
          .ab-inner { padding: 0 16px; }
          .ab-stats { grid-template-columns: 1fr; }
          .ab-stat { border-right: none; padding: 24px 0; }
          .ab-story-img { border-radius: 16px; }
          .ab-mv { border-radius: 16px 16px 0 0; }
          .ab-mv-card { padding: 24px 16px; }
          .ab-mv-card h3 { font-size: 1.4rem; }
        }
      `}</style>
    </div>
  )
}

export default AboutContent
