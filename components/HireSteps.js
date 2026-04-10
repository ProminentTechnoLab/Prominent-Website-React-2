'use client'

import React from 'react'

const HireSteps = () => {
  const steps = [
    { num: '01', title: 'Share Requirements', desc: 'Tell us about your project needs, required skills, and timeline.' },
    { num: '02', title: 'Select Developers', desc: 'Review vetted profiles and interview the best talent for your team.' },
    { num: '03', title: 'Start Development', desc: 'Seamlessly onboard your new team and start building immediately.' }
  ]

  return (
    <section className="hs-section">
      <div className="hs-inner">
        <h2 className="hs-title">How we work</h2>
        <div className="hs-grid">
          {steps.map(s => (
            <div key={s.num} className="hs-card">
              <span className="hs-num">{s.num}</span>
              <h3 className="hs-card-title">{s.title}</h3>
              <p className="hs-card-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .hs-section {
          background: var(--bg-primary);
          padding: 120px 0;
        }
        .hs-inner { max-width: 1400px; margin: 0 auto; padding: 0 40px; }
        .hs-title {
          font-size: clamp(3rem, 5.5vw, 5rem);
          font-weight: 500;
          color: #000;
          margin-bottom: 60px;
          letter-spacing: -0.03em;
        }
        .hs-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          border-top: 1px solid rgba(0,0,0,0.1);
        }
        .hs-card {
          padding: 40px 30px 40px 0;
          border-right: 1px solid rgba(0,0,0,0.1);
          border-bottom: 1px solid rgba(0,0,0,0.1);
          transition: background 0.5s var(--ease-expo);
        }
        .hs-card:last-child { border-right: none; }
        .hs-card:hover { background: #000; }
        .hs-card:hover .hs-num,
        .hs-card:hover .hs-card-title { color: #fff; }
        .hs-card:hover .hs-card-desc { color: rgba(255,255,255,0.5); }

        .hs-num {
          font-size: 0.8rem;
          font-weight: 500;
          color: rgba(0,0,0,0.3);
          margin-bottom: 30px;
          display: block;
          transition: color 0.4s;
        }
        .hs-card-title {
          font-size: 1.5rem;
          font-weight: 500;
          color: #000;
          margin-bottom: 16px;
          letter-spacing: -0.02em;
          transition: color 0.4s;
        }
        .hs-card-desc {
          font-size: 1rem;
          color: #666;
          line-height: 1.5;
          transition: color 0.4s;
        }

        @media (max-width: 768px) {
          .hs-section { padding: 80px 0; }
          .hs-inner { padding: 0 20px; }
          .hs-grid { grid-template-columns: 1fr; }
          .hs-card { border-right: none; padding: 30px 0; }
          .hs-card:hover { background: transparent; padding-left: 20px; }
        }
        @media (max-width: 480px) {
          .hs-section { padding: 60px 0; }
          .hs-inner { padding: 0 16px; }
          .hs-card-title { font-size: 1.25rem; }
        }
      `}</style>
    </section>
  )
}

export default HireSteps
