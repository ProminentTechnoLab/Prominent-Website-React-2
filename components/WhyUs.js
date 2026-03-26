'use client'

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import TextReveal from './animations/TextReveal'

const WhyUs = () => {
  const sectionRef = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const counters = document.querySelectorAll('.counter-val')
    counters.forEach((counter) => {
      const target = parseInt(counter.getAttribute('data-target'))
      gsap.fromTo(
        counter,
        { innerText: 0 },
        {
          innerText: target,
          duration: 2,
          snap: { innerText: 1 },
          scrollTrigger: {
            trigger: counter,
            start: 'top 85%',
          },
        }
      )
    })
  }, [])

  const stats = [
    { label: 'Happy Clients', value: 30, suffix: '+' },
    { label: 'Successful Projects', value: 50, suffix: '+' },
    { label: 'Expert Developers', value: 15, suffix: '+' },
    { label: 'Years of Experience', value: 5, suffix: '+' },
  ]

  const reasons = [
    {
      title: 'Customer Centric',
      desc: 'We prioritize your vision and goals, ensuring every solution is tailored to your specific business needs.'
    },
    {
      title: 'Expert Engineering',
      desc: 'Our team consists of top-tier developers skilled in modern frameworks like React, Flutter, and Laravel.'
    },
    {
      title: 'Transparent Process',
      desc: 'From planning to deployment, we maintain full transparency with regular updates and clear communication.'
    }
  ]

  return (
    <section className="why-us section section-dark" ref={sectionRef}>
      <span className="section-label">TRUST</span>
      <div className="container">
        <div className="section-grid">
          {/* Left: Stats & Heading */}
          <div className="why-left">
            <h2 className="section-h">
              <TextReveal>Results Driven</TextReveal>
              <TextReveal delay={0.2} className="muted-text">Engineering</TextReveal>
            </h2>
            <p className="why-desc">
              We don't just build apps; we build businesses. Our data-driven approach ensures every line of code adds value to your bottom line.
            </p>

            {/* Stats section restored */}
            <div className="stats-grid">
              {stats.map((s) => (
                <div key={s.label} className="stat-card">
                  <div className="stat-number">
                    <span
                      className="counter-val"
                      data-target={s.value}
                    >
                      0
                    </span>
                    <span className="suffix">{s.suffix}</span>
                  </div>
                  <div className="stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Reasons */}
          <div className="why-right">
            {reasons.map((r, i) => (
              <div key={r.title} className="reason-item">
                <div className="reason-content">
                  <h3 className="reason-title">{r.title}</h3>
                  <p className="reason-desc">{r.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .why-us {
          background: transparent;
          padding-top: 4rem !important; /* Reduced from 12vw to remove unwanted space */
        }
        .section-grid {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 10vw;
          align-items: flex-start;
          padding-top: 0; /* Removed remaining inner padding */
        }

        .why-left {
          position: sticky;
          top: 15vw;
        }
        .section-h {
          font-size: clamp(3rem, 6vw, 5.5rem); 
          color: #fff;
          line-height: 0.95;
          letter-spacing: -0.04em;
          text-transform: uppercase;
          margin-bottom: 3rem;
        }
        .muted-text {
          color: #a1a1a1;
          display: block;
        }
        .why-desc {
          font-size: 1.3rem;
          color: #aaa;
          margin-bottom: 4rem;
          max-width: 500px;
          opacity: 0.8;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2vw; /* Added gap to allow cards to shadow without overlapping */
        }
        .stat-card {
          padding: 4rem 3rem;
          border-radius: 20px; /* Modern rounded corners */
          background: rgba(255, 255, 255, 0.03); /* Subtle background instead of borders */
          text-align: left;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.6s cubic-bezier(0.16, 1, 0.3, 1), background 0.6s var(--ease-expo), color 0.4s;
          will-change: transform;
        }
        .stat-card:hover {
          background: #fff;
          color: #000;
          transform: translateY(-12px) scale(1.02);
          box-shadow: 0 30px 60px rgba(0,0,0,0.4);
          z-index: 2;
        }
        
        .counter-val, .suffix {
          font-family: var(--font-heading);
          font-size: 4rem;
          font-weight: 700;
          color: #fff; /* White for dark theme */
          letter-spacing: -0.04em;
          transition: color 0.4s;
        }
        .stat-card:hover .counter-val,
        .stat-card:hover .suffix,
        .section-dark .stat-card:hover .counter-val,
        .section-dark .stat-card:hover .suffix {
          color: #000000 !important;
        }
        .stat-label {
          font-size: 0.75rem;
          color: #999; /* Muted for dark */
          text-transform: uppercase;
          letter-spacing: 0.2em;
          margin-top: 1rem;
          font-weight: 700;
          transition: color 0.4s;
        }
        .stat-card:hover .stat-label {
          color: rgba(0,0,0,0.7) !important;
        }

        .why-right {
          display: flex;
          flex-direction: column;
        }
        .reason-item {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          padding: 4rem 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.6s var(--ease-expo);
        }
        .reason-item:first-child { border-top: 1px solid rgba(255, 255, 255, 0.1); }
        .reason-item:hover {
          padding-left: 3rem;
        }
        .reason-title {
          font-size: 2.5rem;
          color: #fff; /* White for dark */
          margin-bottom: 1.5rem;
          font-weight: 700;
          letter-spacing: -0.02em;
          text-transform: uppercase;
          line-height: 1;
        }
        .reason-desc {
          font-size: 1.2rem;
          color: #aaa; /* Lighter for dark */
          line-height: 1.5;
          opacity: 0.8;
        }

        @media (max-width: 1024px) {
          .section-grid { grid-template-columns: 1fr; gap: 60px; }
          .why-left { position: relative; top: 0; }
          .stats-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 768px) {
          .stats-grid { grid-template-columns: 1fr; }
          .stat-card { border-right: none; }
          .reason-item:hover { padding-left: 0; }
          .reason-title { font-size: 1.8rem; }
          .reason-item { padding: 3rem 0; }
          .why-desc { font-size: 1.1rem; margin-bottom: 3rem; }
        }
        @media (max-width: 480px) {
          .counter-val, .suffix { font-size: 2.8rem; }
          .stat-card { padding: 2.5rem 1.5rem; }
          .reason-title { font-size: 1.5rem; }
          .reason-desc { font-size: 1rem; }
          .reason-item { padding: 2.5rem 0; gap: 1.2rem; }
          .why-desc { font-size: 1rem; margin-bottom: 2.5rem; }
          .section-h { margin-bottom: 2rem; }
        }
      `}</style>
    </section>
  )
}

export default WhyUs
