'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { gsap } from 'gsap'
import { IoArrowBack, IoArrowForward } from 'react-icons/io5'

const Testimonials = ({ variant = 'light' }) => {
  const [idx, setIdx] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const quoteRef = useRef(null)
  const isDark = variant === 'dark'

  const testimonials = [
    { name: 'Michael Chen', role: 'Project Manager, US', text: "The quality of work from Prominent TechnoLabs is exceptional. Their developers integrated seamlessly with our team and delivered ahead of schedule.", initials: 'MC' },
    { name: 'Sarah Jenkins', role: 'CEO, Digital Pulse (UK)', text: "Transformative results! Our e-commerce conversion rate increased by 40% after the redesign. They truly understand modern UX.", initials: 'SJ' },
    { name: 'Rajesh Gupta', role: 'Founder, RetailGo (India)', text: "Reliable, transparent, and technically brilliant. We've been working with them for 3 years and they never disappoint.", initials: 'RG' },
    { name: 'Elena Rodriguez', role: 'Tech Lead, Spain', text: "Prompt communication and deep technical knowledge. Their React and Node.js expertise helped us scale effortlessly.", initials: 'ER' }
  ]

  const animateQuote = useCallback(() => {
    if (!quoteRef.current) return
    gsap.fromTo(quoteRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', onComplete: () => setIsAnimating(false) }
    )
  }, [])

  const changeSlide = useCallback((direction) => {
    if (isAnimating) return
    setIsAnimating(true)
    
    gsap.to(quoteRef.current, {
      opacity: 0, y: -20, duration: 0.3, ease: 'power2.in',
      onComplete: () => {
        if (direction === 'next') {
          setIdx(prev => (prev + 1) % testimonials.length)
        } else {
          setIdx(prev => (prev - 1 + testimonials.length) % testimonials.length)
        }
      }
    })
  }, [isAnimating, testimonials.length])

  useEffect(() => {
    animateQuote()
  }, [idx, animateQuote])

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(() => {
      changeSlide('next')
    }, 6000)
    return () => clearInterval(timer)
  }, [changeSlide])

  const t = testimonials[idx]

  return (
    <section className={`tm-section ${isDark ? 'tm-dark' : ''}`}>
      <div className="tm-inner">
        {/* Header row */}
        <div className="tm-header">
          <h2 className="tm-heading">What clients say</h2>
          <div className="tm-counter">
            <span className="tm-counter-current">{String(idx + 1).padStart(2, '0')}</span>
            <span className="tm-counter-sep">/</span>
            <span className="tm-counter-total">{String(testimonials.length).padStart(2, '0')}</span>
          </div>
        </div>

        {/* Quote content */}
        <div className="tm-body" ref={quoteRef}>
          {/* Large decorative quote */}
          <div className="tm-quote-mark">
            <svg viewBox="0 0 80 60" fill="currentColor" opacity="0.06">
              <path d="M0 40V20C0 8.954 8.954 0 20 0h4v12h-4c-4.418 0-8 3.582-8 8v4h12v16H0zm44 0V20C44 8.954 52.954 0 64 0h4v12h-4c-4.418 0-8 3.582-8 8v4h12v16H44z"/>
            </svg>
          </div>

          <blockquote className="tm-quote">{t.text}</blockquote>

          <div className="tm-footer">
            <div className="tm-author-row">
              <div className="tm-avatar">
                <span>{t.initials}</span>
              </div>
              <div className="tm-author-info">
                <div className="tm-name">{t.name}</div>
                <div className="tm-role">{t.role}</div>
              </div>
            </div>

            <div className="tm-nav">
              <button onClick={() => changeSlide('prev')} className="tm-btn" aria-label="Previous testimonial">
                <IoArrowBack />
              </button>
              {/* Progress dots */}
              <div className="tm-dots">
                {testimonials.map((_, i) => (
                  <button key={i} className={`tm-dot ${i === idx ? 'active' : ''}`} onClick={() => { if (!isAnimating) { setIsAnimating(true); gsap.to(quoteRef.current, { opacity: 0, y: -20, duration: 0.3, ease: 'power2.in', onComplete: () => setIdx(i) }); }}} aria-label={`Go to testimonial ${i + 1}`} />
                ))}
              </div>
              <button onClick={() => changeSlide('next')} className="tm-btn" aria-label="Next testimonial">
                <IoArrowForward />
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .tm-section {
          background: var(--bg-primary, #fff);
          padding: 120px 0;
        }
        .tm-section.tm-dark {
          background: #000;
          color: #fff;
        }

        .tm-inner {
          width: 100%;
          padding: 0 12vw;
        }

        /* Header */
        .tm-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 80px;
        }
        .tm-heading {
          font-size: clamp(2.5rem, 6vw, 5.2rem);
          font-weight: 500;
          letter-spacing: -0.035em;
          line-height: 1.05;
        }
        .tm-dark .tm-heading { color: #fff; }
        .tm-counter {
          display: flex;
          align-items: baseline;
          gap: 4px;
          padding-bottom: 8px;
        }
        .tm-counter-current {
          font-size: 1.4rem;
          font-weight: 600;
          font-variant-numeric: tabular-nums;
        }
        .tm-counter-sep {
          font-size: 1rem;
          opacity: 0.2;
          margin: 0 2px;
        }
        .tm-counter-total {
          font-size: 0.9rem;
          opacity: 0.3;
          font-variant-numeric: tabular-nums;
        }

        /* Body */
        .tm-body {
          position: relative;
          border-top: 1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'};
          padding-top: 60px;
        }
        .tm-quote-mark {
          position: absolute;
          top: 40px;
          right: 0;
          width: 120px;
          height: 90px;
          pointer-events: none;
          color: ${isDark ? '#fff' : '#000'};
        }

        /* Quote */
        .tm-quote {
          font-size: clamp(1.6rem, 2.8vw, 2.4rem);
          font-weight: 500;
          line-height: 1.35;
          letter-spacing: -0.02em;
          max-width: 900px;
          margin-bottom: 60px;
          color: ${isDark ? '#fff' : '#000'};
        }

        /* Footer */
        .tm-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top: 1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'};
          padding-top: 32px;
        }

        .tm-author-row {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .tm-avatar {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.04)'};
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          color: ${isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.4)'};
          flex-shrink: 0;
        }
        .tm-name {
          font-size: 0.85rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: ${isDark ? '#fff' : '#000'};
        }
        .tm-role {
          font-size: 0.8rem;
          font-weight: 400;
          color: ${isDark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.4)'};
          margin-top: 3px;
        }

        /* Navigation */
        .tm-nav {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .tm-btn {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          border: 1px solid ${isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)'};
          background: transparent;
          color: ${isDark ? '#fff' : '#000'};
          font-size: 0.95rem;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          flex-shrink: 0;
        }
        .tm-btn:hover {
          background: ${isDark ? '#fff' : '#000'};
          color: ${isDark ? '#000' : '#fff'};
          border-color: ${isDark ? '#fff' : '#000'};
        }

        /* Dots */
        .tm-dots {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .tm-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          border: none;
          background: ${isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.12)'};
          cursor: pointer;
          padding: 0;
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .tm-dot.active {
          width: 24px;
          border-radius: 10px;
          background: ${isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.5)'};
        }

        /* ─── Responsive ─── */
        @media (max-width: 1200px) {
          .tm-inner { padding: 0 8vw; }
        }
        @media (max-width: 1024px) {
          .tm-header { margin-bottom: 50px; }
          .tm-quote-mark { width: 80px; }
        }
        @media (max-width: 768px) {
          .tm-section { padding: 80px 0; }
          .tm-inner { padding: 0 6vw; }
          .tm-header { flex-direction: column; align-items: flex-start; gap: 16px; margin-bottom: 40px; }
          .tm-quote { font-size: 1.4rem; margin-bottom: 40px; }
          .tm-footer { flex-direction: column; align-items: flex-start; gap: 28px; }
          .tm-quote-mark { display: none; }
        }
        @media (max-width: 480px) {
          .tm-section { padding: 60px 0; }
          .tm-inner { padding: 0 20px; }
          .tm-quote { font-size: 1.2rem; }
          .tm-avatar { width: 40px; height: 40px; font-size: 0.65rem; }
          .tm-btn { width: 40px; height: 40px; }
        }
      `}</style>
    </section>
  )
}

export default Testimonials
