'use client'

import React, { useState, useEffect } from 'react'
import { gsap } from 'gsap'
import { IoArrowBack, IoArrowForward } from 'react-icons/io5'
import TextReveal from './animations/TextReveal'
import MagneticButton from './animations/MagneticButton'

const Testimonials = () => {
  const [index, setIndex] = useState(0)

  const testimonials = [
    {
      name: 'Michael Chen',
      role: 'Project Manager, US',
      content: "The quality of work from Prominent TechnoLabs is exceptional. Their developers integrated seamlessly with our local team and delivered the product ahead of schedule.",
    },
    {
      name: 'Sarah Jenkins',
      role: 'CEO, Digital Pulse (UK)',
      content: "Transformative results! Our e-commerce conversion rate increased by 40% after the redesign. They truly understand modern UX.",
    },
    {
      name: 'Rajesh Gupta',
      role: 'Founder, RetailGo (India)',
      content: "Reliable, transparent, and technically brilliant. We've been working with them for 3 years and they never disappoint.",
    },
    {
      name: 'Elena Rodriguez',
      role: 'Tech Lead, Spain',
      content: "Prompt communication and deep technical knowledge. Their React and Node.js expertise helped us scale our platform effortlessly.",
    }
  ]

  const next = () => setIndex((index + 1) % testimonials.length)
  const prev = () => setIndex((index - 1 + testimonials.length) % testimonials.length)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline()
      tl.fromTo('.t-content-large',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power4.out' }
      )
      tl.fromTo('.t-author',
        { opacity: 0, x: -15 },
        { opacity: 1, x: 0, duration: 0.5, ease: 'power4.out' },
        '-=0.3'
      )
    })
    return () => ctx.revert()
  }, [index])

  return (
    <section className="testimonials-refokus section">
      <div className="container">
        <div className="section-header">
          <div className="badge">Client Voices</div>
          <h2 className="section-h">
            <TextReveal>Working with</TextReveal>
            <TextReveal delay={0.2} className="accent-text">Prominent</TextReveal>
          </h2>
        </div>

        <div className="testimonial-display">
          <div className="t-content-wrap">
            <blockquote className="t-content-large">
              "{testimonials[index].content}"
            </blockquote>

            <div className="t-footer">
              <div className="t-author">
                <h4 className="t-name">{testimonials[index].name}</h4>
                <p className="t-role">{testimonials[index].role}</p>
              </div>

              <div className="t-nav">
                <MagneticButton strength={20}>
                  <button onClick={prev} className="t-nav-btn"><IoArrowBack /></button>
                </MagneticButton>
                <MagneticButton strength={20}>
                  <button onClick={next} className="t-nav-btn"><IoArrowForward /></button>
                </MagneticButton>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .testimonials-refokus {
          min-height: 80vh;
          display: flex;
          align-items: center;
        }
        .section-header { margin-bottom: 5vw; }
        .section-h {
          font-size: clamp(3rem, 6vw, 5.5rem);
          color: #000; /* Changed to black */
          line-height: 1;
          letter-spacing: -0.04em;
          text-transform: uppercase;
        }
        .accent-text { 
          color: #000;
          opacity: 0.1; /* Subtler for light */
        }

        .testimonial-display {
          border-top: 1px solid rgba(0, 0, 0, 0.08);
          padding-top: 4vw;
          position: relative;
        }
        .t-content-large {
          font-size: clamp(1.6rem, 3vw, 2.8rem);
          line-height: 1.2;
          font-weight: 700;
          color: #000;
          margin-bottom: 4rem;
          max-width: 1200px;
          letter-spacing: -0.03em;
        }
        
        .t-footer {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          border-top: 1px solid rgba(0, 0, 0, 0.08);
          padding-top: 3rem;
        }
        .t-name {
          font-size: 1.2rem;
          color: #000; /* Changed to black */
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 0.5rem;
        }
        .t-role {
          font-size: 0.9rem;
          color: #666; /* Muted for light */
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .t-nav {
          display: flex;
          gap: 20px;
        }
        .t-nav-btn {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          border: 1px solid #000;
          background: #000;
          color: #fff;
          font-size: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.4s var(--ease-expo);
        }
        .t-nav-btn:hover {
          background: var(--brand-orange);
          color: #fff;
          border-color: var(--brand-orange);
        }

        @media (max-width: 768px) {
          .t-footer { flex-direction: column; align-items: flex-start; gap: 3rem; }
          .t-nav-btn { width: 55px; height: 55px; font-size: 1.1rem; }
          .t-content-large { font-size: 1.4rem; margin-bottom: 3rem; }
          .testimonials-refokus { min-height: auto; }
        }
        @media (max-width: 480px) {
          .t-content-large { font-size: 1.2rem; margin-bottom: 2.5rem; line-height: 1.3; }
          .t-nav-btn { width: 44px; height: 44px; font-size: 1rem; }
          .t-nav { gap: 10px; }
          .t-name { font-size: 0.95rem; }
          .t-role { font-size: 0.75rem; }
          .t-footer { gap: 2rem; padding-top: 1.5rem; }
          .section-header { margin-bottom: 2vw; }
        }
      `}</style>
    </section>
  )
}

export default Testimonials
