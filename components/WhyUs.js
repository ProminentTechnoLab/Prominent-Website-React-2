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
    <section className="why-us section" ref={sectionRef}>
      <div className="container">
        <div className="section-grid">
          {/* Left: Stats & Heading */}
          <div className="why-left">
            <div className="badge">Why Choose Us</div>
            <h2 className="section-h">
              <TextReveal>Results Driven</TextReveal>
              <TextReveal delay={0.2} className="accent-text">Engineering</TextReveal>
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
          color: #fff; /* Changed to white */
          line-height: 0.95;
          letter-spacing: -0.04em;
          text-transform: uppercase;
          margin-bottom: 4rem;
        }
        .accent-text {
          color: #fff;
          opacity: 0.15; /* Adjusted for dark */
          display: block;
        }
        .why-desc {
          font-size: 1.4rem;
          color: #aaa; /* Lighter for dark */
          margin-bottom: 6rem;
          max-width: 500px;
          opacity: 0.8;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }
        .stat-card {
          padding: 4rem 2rem;
          border-right: 1px solid rgba(255, 255, 255, 0.1);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          text-align: left;
          transition: all 0.6s var(--ease-expo);
        }
        .stat-card:hover {
          background: #fff;
          color: #000;
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
          gap: 2rem;
          padding: 6rem 0;
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
          .reason-item:hover { padding-left: 0; }
        }
      `}</style>
    </section>
  )
}

export default WhyUs
