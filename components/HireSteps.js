'use client'

import React from 'react'
import { IoCloudDone, IoHandLeft, IoRocket } from 'react-icons/io5'
import TextReveal from './animations/TextReveal'

const HireSteps = () => {
  const steps = [
    {
      title: 'Share Requirements',
      desc: 'Tell us about your project needs, required skills, and timeline.',
      icon: <IoHandLeft />,
      color: '#FF6600'
    },
    {
      title: 'Select Developers',
      desc: 'Review vetted profiles and interview the best talent for your team.',
      icon: <IoCloudDone />,
      color: '#0A2463'
    },
    {
      title: 'Start Development',
      desc: 'Seamlessly onboard your new team and start building immediately.',
      icon: <IoRocket />,
      color: '#FF6600'
    }
  ]

  return (
    <section className="hire-steps section">
      <div className="container">
        <div className="section-header-centered">
          <div className="badge">Simple Process</div>
          <h2 className="section-h">
            <TextReveal>Hire Your Dream Team In</TextReveal>
            <TextReveal delay={0.2} className="accent-text">3 Simple Steps</TextReveal>
          </h2>
        </div>

        <div className="steps-row">
          {steps.map((step, i) => (
            <div key={step.title} className="step-card">
              <div className="step-icon-wrap" style={{ '--accent': step.color }}>
                {step.icon}
              </div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-desc">{step.desc}</p>
              {i < steps.length - 1 && <div className="step-connector"></div>}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .hire-steps {
          padding: 10vw 0;
        }
        .section-header-centered {
          text-align: left;
          margin-bottom: 10vw;
        }
        .section-h {
          font-size: clamp(3rem, 6vw, 5.5rem); 
          color: #000; /* Changed to black */
          line-height: 0.95;
          letter-spacing: -0.04em;
          text-transform: uppercase;
        }
        .accent-text { 
          color: #000;
          opacity: 0.1; /* Subtler for light */
        }

        .steps-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          border-top: 1px solid rgba(0, 0, 0, 0.08);
        }
        .step-card {
          background: transparent;
          border-right: 1px solid rgba(0, 0, 0, 0.08);
          border-bottom: 1px solid rgba(0, 0, 0, 0.08);
          padding: 8rem 4rem;
          text-align: left;
          position: relative;
          transition: background-color 0.8s var(--ease-expo), color 0.8s var(--ease-expo);
          cursor: pointer;
        }
        .step-card:hover {
          background: #000000 !important; /* Changed from white to black */
          color: #ffffff !important;
        }

        .step-icon-wrap {
          width: 80px;
          height: 80px;
          background: transparent;
          border: 1px solid rgba(0, 0, 0, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2.5rem;
          color: #000; /* Darker for light theme */
          margin: 0 0 4rem;
          transition: all 0.6s var(--ease-expo);
          opacity: 0.15;
        }
        .step-card:hover .step-icon-wrap {
          background: var(--brand-orange);
          color: #ffffff;
          border-color: var(--brand-orange);
          opacity: 1;
          transform: scale(1.1) rotate(5deg);
        }

        .step-title {
          font-size: 2.2rem;
          color: #000; /* Black for light theme */
          margin-bottom: 2rem;
          font-weight: 700;
          letter-spacing: -0.02em;
          text-transform: uppercase;
          line-height: 1;
          transition: color 0.4s;
        }
        .step-card:hover .step-title,
        .section-light .step-card:hover .step-title { 
          color: #ffffff !important; 
        }
        
        .step-desc {
          font-size: 1.2rem;
          color: #444; /* Dark gray for light theme */
          line-height: 1.5;
          transition: color 0.4s, opacity 0.4s;
        }
        .step-card:hover .step-desc,
        .section-light .step-card:hover .step-desc { 
          color: #eeeeee !important; 
          opacity: 1; 
        }

        @media (max-width: 1024px) {
          .steps-row { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 768px) {
          .steps-row { grid-template-columns: 1fr; }
          .step-card { padding: 4rem 2rem; }
        }
      `}</style>
    </section>
  )
}

export default HireSteps
