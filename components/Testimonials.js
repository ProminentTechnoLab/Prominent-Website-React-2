'use client'

import React, { useState, useEffect } from 'react'
import { gsap } from 'gsap'
import { IoArrowBack, IoArrowForward } from 'react-icons/io5'

const Testimonials = () => {
  const [idx, setIdx] = useState(0)
  const testimonials = [
    { name: 'Michael Chen', role: 'Project Manager, US', text: "The quality of work from Prominent TechnoLabs is exceptional. Their developers integrated seamlessly with our team and delivered ahead of schedule." },
    { name: 'Sarah Jenkins', role: 'CEO, Digital Pulse (UK)', text: "Transformative results! Our e-commerce conversion rate increased by 40% after the redesign. They truly understand modern UX." },
    { name: 'Rajesh Gupta', role: 'Founder, RetailGo (India)', text: "Reliable, transparent, and technically brilliant. We've been working with them for 3 years and they never disappoint." },
    { name: 'Elena Rodriguez', role: 'Tech Lead, Spain', text: "Prompt communication and deep technical knowledge. Their React and Node.js expertise helped us scale effortlessly." }
  ]

  const next = () => setIdx((idx + 1) % testimonials.length)
  const prev = () => setIdx((idx - 1 + testimonials.length) % testimonials.length)

  useEffect(() => {
    gsap.fromTo('.t-quote', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' })
  }, [idx])

  return (
    <section className="t-section">
      <div className="t-inner">
        <div className="t-layout">
          <h2 className="t-heading">What clients say</h2>
          <div className="t-content">
            <blockquote className="t-quote">"{testimonials[idx].text}"</blockquote>
            <div className="t-bottom">
              <div className="t-author">
                <div className="t-name">{testimonials[idx].name}</div>
                <div className="t-role">{testimonials[idx].role}</div>
              </div>
              <div className="t-nav">
                <button onClick={prev} className="t-btn"><IoArrowBack /></button>
                <button onClick={next} className="t-btn"><IoArrowForward /></button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .t-section { background: var(--bg-primary); padding: 120px 0; }
        .t-inner { max-width: 1400px; margin: 0 auto; padding: 0 40px; }
        .t-layout { display: grid; grid-template-columns: 0.7fr 1.3fr; gap: 80px; align-items: start; }
        .t-heading {
          font-size: clamp(3rem, 5.5vw, 5rem);
          font-weight: 500;
          color: #000;
          letter-spacing: -0.03em;
          position: sticky;
          top: 120px;
        }
        .t-content { border-top: 1px solid rgba(0,0,0,0.1); padding-top: 40px; }
        .t-quote {
          font-size: clamp(1.5rem, 2.5vw, 2.2rem);
          font-weight: 500;
          color: #000;
          line-height: 1.3;
          letter-spacing: -0.02em;
          margin-bottom: 40px;
        }
        .t-bottom {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          padding-top: 24px;
          border-top: 1px solid rgba(0,0,0,0.1);
        }
        .t-name { font-size: 0.9rem; font-weight: 500; color: #000; text-transform: uppercase; letter-spacing: 0.08em; }
        .t-role { font-size: 0.8rem; font-weight: 400; color: #999; margin-top: 4px; }
        .t-nav { display: flex; gap: 10px; }
        .t-btn {
          width: 50px; height: 50px;
          border-radius: 50%;
          border: 1px solid rgba(0,0,0,0.12);
          background: transparent;
          color: #000;
          font-size: 1rem;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .t-btn:hover { background: #000; color: #fff; border-color: #000; }

        @media (max-width: 1024px) {
          .t-layout { grid-template-columns: 1fr; gap: 40px; }
          .t-heading { position: relative; top: 0; }
        }
        @media (max-width: 768px) {
          .t-section { padding: 80px 0; }
          .t-inner { padding: 0 20px; }
          .t-bottom { flex-direction: column; align-items: flex-start; gap: 24px; }
          .t-btn { width: 44px; height: 44px; }
        }
        @media (max-width: 480px) {
          .t-section { padding: 60px 0; }
          .t-inner { padding: 0 16px; }
        }
      `}</style>
    </section>
  )
}

export default Testimonials
