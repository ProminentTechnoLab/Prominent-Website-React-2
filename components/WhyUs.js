'use client'

import React, { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

const WhyUs = () => {
  const stats = [
    { value: '30+', label: 'Happy Clients' },
    { value: '50+', label: 'Successful Projects' },
    { value: '15+', label: 'Expert Developers' },
    { value: '5+', label: 'Years Experience' },
  ]

  const reasons = [
    { title: 'Customer Centric', desc: 'We prioritize your vision and goals, ensuring every solution is tailored to your specific business needs.' },
    { title: 'Expert Engineering', desc: 'Top-tier developers skilled in modern frameworks like React, Flutter, and Laravel.' },
    { title: 'Transparent Process', desc: 'Full transparency with regular updates and clear communication from planning to deployment.' }
  ]

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    gsap.utils.toArray('.wu-stat').forEach((el) => {
      gsap.fromTo(el, { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 90%' }
      })
    })
  }, [])

  return (
    <section className="wu-section">
      <div className="wu-inner">
        <h2 className="wu-title">Why choose us</h2>

        {/* Stats row — Cuberto style: large numbers with thin borders */}
        <div className="wu-stats">
          {stats.map(s => (
            <div key={s.label} className="wu-stat">
              <div className="wu-stat-val">{s.value}</div>
              <div className="wu-stat-label">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Reasons list — horizontal dividers */}
        <div className="wu-reasons">
          {reasons.map(r => (
            <div key={r.title} className="wu-reason">
              <h3 className="wu-reason-title">{r.title}</h3>
              <p className="wu-reason-desc">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .wu-section {
          background: #000;
          color: #fff;
          padding: 120px 0;
          border-radius: 30px 30px 0 0;
        }
        .wu-inner { max-width: 1400px; margin: 0 auto; padding: 0 40px; }
        .wu-title {
          font-size: clamp(3rem, 5.5vw, 5rem);
          font-weight: 500;
          color: #fff;
          margin-bottom: 80px;
          letter-spacing: -0.03em;
        }

        .wu-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          border-top: 1px solid rgba(255,255,255,0.1);
          margin-bottom: 80px;
        }
        .wu-stat {
          padding: 40px 0;
          border-bottom: 1px solid rgba(255,255,255,0.1);
          border-right: 1px solid rgba(255,255,255,0.1);
        }
        .wu-stat:last-child { border-right: none; }
        .wu-stat-val {
          font-size: clamp(2.5rem, 4vw, 3.5rem);
          font-weight: 500;
          color: #fff;
          letter-spacing: -0.03em;
          margin-bottom: 8px;
        }
        .wu-stat-label {
          font-size: 0.8rem;
          font-weight: 400;
          color: rgba(255,255,255,0.4);
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        .wu-reasons { border-top: 1px solid rgba(255,255,255,0.1); }
        .wu-reason {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 40px;
          padding: 40px 0;
          border-bottom: 1px solid rgba(255,255,255,0.1);
          align-items: start;
        }
        .wu-reason-title {
          font-size: 1.5rem;
          font-weight: 500;
          color: #fff;
        }
        .wu-reason-desc {
          font-size: 1.05rem;
          font-weight: 400;
          color: rgba(255,255,255,0.5);
          line-height: 1.5;
        }

        @media (max-width: 1024px) {
          .wu-stats { grid-template-columns: 1fr 1fr; }
          .wu-stat:nth-child(2) { border-right: none; }
        }
        @media (max-width: 768px) {
          .wu-section { padding: 80px 0; border-radius: 20px 20px 0 0; }
          .wu-inner { padding: 0 20px; }
          .wu-title { margin-bottom: 50px; }
          .wu-stats { grid-template-columns: 1fr 1fr; }
          .wu-reason { grid-template-columns: 1fr; gap: 12px; padding: 30px 0; }
        }
        @media (max-width: 480px) {
          .wu-section { padding: 60px 0; border-radius: 16px 16px 0 0; }
          .wu-inner { padding: 0 16px; }
          .wu-stats { grid-template-columns: 1fr; }
          .wu-stat { border-right: none; padding: 24px 0; }
          .wu-reason-title { font-size: 1.2rem; }
          .wu-reason-desc { font-size: 0.9rem; }
        }
      `}</style>
    </section>
  )
}

export default WhyUs
