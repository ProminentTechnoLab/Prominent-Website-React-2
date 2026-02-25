'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiChevronLeft, FiChevronRight, FiStar, FiMapPin } from 'react-icons/fi'

const testimonials = [
  {
    name: 'Rajesh Patel',
    role: 'CEO, TradeMart India',
    initials: 'RP',
    quote: 'Prominent TechnoLabs delivered our e-commerce platform ahead of schedule. The attention to detail and post-launch support has been outstanding. Our conversions improved by 40% in the first month!',
    rating: 5,
    location: 'Ahmedabad, India',
  },
  {
    name: 'Sophie Williams',
    role: 'Founder, StyleHive UK',
    initials: 'SW',
    quote: 'Working with Prominent TechnoLabs was a game-changer for us. They transformed our outdated WordPress site into a blazing-fast React application. The team communicated daily and delivered beyond expectations.',
    rating: 5,
    location: 'London, UK',
  },
  {
    name: 'Amit Kumar',
    role: 'Director, Edukart Learning',
    initials: 'AK',
    quote: 'We needed a mobile app for our EdTech platform and they built exactly what we envisioned in Flutter. The UI is stunning, performance is excellent, and our students love using it. Highly recommended!',
    rating: 5,
    location: 'Pune, India',
  },
  {
    name: 'Michael Chen',
    role: 'CTO, LogiCore Solutions',
    initials: 'MC',
    quote: 'Their remote developer hiring service is excellent. We onboarded a senior full-stack developer within 48 hours. Great communication, clean code, and zero micromanagement needed. Will use again.',
    rating: 5,
    location: 'Singapore',
  },
  {
    name: 'Priya Sharma',
    role: 'Owner, BridalBliss Boutique',
    initials: 'PS',
    quote: 'Our Shopify store transformation was exactly what we needed. SEO traffic has tripled in 3 months, and the UI/UX improvements have significantly reduced cart abandonment. Worth every rupee!',
    rating: 5,
    location: 'Mumbai, India',
  },
]

export default function Testimonials() {
  const [idx, setIdx] = useState(0)
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })

  const prev = () => setIdx(i => (i - 1 + testimonials.length) % testimonials.length)
  const next = () => setIdx(i => (i + 1) % testimonials.length)
  const t = testimonials[idx]

  return (
    <section className="section-pad bg-light" ref={ref}>
      <div className="container">
        <div className="section-header">
          <div className="section-badge">Client Testimonials</div>
          <h2 className="section-title">What Our <span>Clients Say</span></h2>
          <p className="section-subtitle">
            Don't just take our word for it — hear from 30+ businesses who trusted us with their digital journey.
          </p>
        </div>

        <motion.div
          className="testimonials-wrapper"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={idx}
              className="testimonial-card"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4 }}
            >
              {/* Stars */}
              <div className="t-stars">
                {Array(t.rating).fill(0).map((_, i) => <FiStar key={i} fill="#FF6600" color="#FF6600" size={18} />)}
              </div>

              {/* Quote */}
              <blockquote className="t-quote">"{t.quote}"</blockquote>

              {/* Author */}
              <div className="t-author">
                <div className="t-avatar">{t.initials}</div>
                <div>
                  <div className="t-name">{t.name}</div>
                  <div className="t-role">{t.role}</div>
                  <div className="t-location"><FiMapPin size={11} /> {t.location}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="t-controls">
            <button className="t-btn" onClick={prev} aria-label="Previous"><FiChevronLeft size={20} /></button>
            <div className="t-dots">
              {testimonials.map((_, i) => (
                <button key={i} className={`t-dot ${i === idx ? 'active' : ''}`} onClick={() => setIdx(i)} aria-label={`Testimonial ${i + 1}`} />
              ))}
            </div>
            <button className="t-btn" onClick={next} aria-label="Next"><FiChevronRight size={20} /></button>
          </div>
        </motion.div>
      </div>

      <style>{`
        .testimonials-wrapper { max-width: 760px; margin: 0 auto; }
        .testimonial-card { background: white; border-radius: var(--radius-xl); padding: 50px; box-shadow: var(--shadow-lg); border: 1px solid var(--gray-100); min-height: 280px; position: relative; }
        .testimonial-card::before { content: '"'; position: absolute; top: 20px; left: 40px; font-size: 8rem; line-height: 1; font-family: Georgia, serif; color: rgba(255,102,0,0.1); pointer-events: none; }
        .t-stars { display: flex; gap: 4px; margin-bottom: 20px; }
        .t-quote { font-size: 1.05rem; color: var(--gray-700); line-height: 1.85; font-style: italic; margin-bottom: 28px; position: relative; z-index: 1; }
        .t-author { display: flex; align-items: center; gap: 16px; }
        .t-avatar { width: 58px; height: 58px; background: var(--gradient-primary); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.1rem; font-weight: 700; color: white; font-family: var(--font-heading); flex-shrink: 0; }
        .t-name { font-family: var(--font-heading); font-size: 1rem; font-weight: 700; color: var(--primary); }
        .t-role { font-size: 0.85rem; color: var(--gray-600); }
        .t-location { font-size: 0.78rem; color: var(--orange); margin-top: 2px; display: flex; align-items: center; gap: 4px; }
        .t-controls { display: flex; align-items: center; justify-content: center; gap: 16px; margin-top: 30px; }
        .t-btn { width: 42px; height: 42px; border-radius: 50%; background: white; border: 1.5px solid var(--gray-200); display: flex; align-items: center; justify-content: center; color: var(--primary); cursor: pointer; transition: var(--transition); }
        .t-btn:hover { background: var(--orange); color: white; border-color: var(--orange); }
        .t-dots { display: flex; gap: 6px; align-items: center; }
        .t-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--gray-200); cursor: pointer; border: none; transition: var(--transition); }
        .t-dot.active { background: var(--orange); width: 22px; border-radius: 4px; }
        @media (max-width: 600px) { .testimonial-card { padding: 32px 20px; } }
      `}</style>
    </section>
  )
}
