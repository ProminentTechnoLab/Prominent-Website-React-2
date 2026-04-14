'use client'

import React, { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { IoCheckmarkCircle, IoAlertCircle } from 'react-icons/io5'

const ServiceChip = ({ label, active, onClick }) => {
  const chipRef = useRef(null)

  useEffect(() => {
    const chip = chipRef.current
    if (!chip) return

    const handleMouseMove = (e) => {
      const { left, top, width, height } = chip.getBoundingClientRect()
      const centerX = left + width / 2
      const centerY = top + height / 2
      const x = (e.clientX - centerX) * 0.15
      const y = (e.clientY - centerY) * 0.15

      gsap.to(chip, {
        x: x,
        y: y,
        duration: 0.3,
        ease: 'power2.out',
        overwrite: 'auto'
      })
    }

    const handleMouseLeave = () => {
      gsap.to(chip, {
        x: 0,
        y: 0,
        duration: 0.8,
        ease: 'elastic.out(1, 0.3)',
        overwrite: 'auto'
      })
    }

    chip.addEventListener('mousemove', handleMouseMove)
    chip.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      chip.removeEventListener('mousemove', handleMouseMove)
      chip.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <button
      ref={chipRef}
      className={`ct-chip ${active ? 'active' : ''}`}
      onClick={onClick}
      type="button"
    >
      <span className="ct-chip-content">
        <span className="ct-chip-text">{label}</span>
        <span className="ct-chip-text ct-chip-text-hover">{label}</span>
      </span>
    </button>
  )
}

const ContactContent = () => {
  const sectionRef = useRef(null)
  const [selected, setSelected] = useState([])
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [status, setStatus] = useState({ submitting: false, success: false, error: null })

  const interests = [
    'Website Development', 'Mobile App Development', 'UI/UX Design',
    'CMS & E-commerce', 'Digital Marketing', 'Payment & Shipping API'
  ]

  const toggleInterest = (item) => {
    setSelected(prev =>
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
    )
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.ct-line', { y: 80, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1, duration: 1.2, ease: 'power4.out', delay: 0.3 })
      gsap.fromTo('.ct-chips', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power4.out', delay: 0.6 })
      gsap.fromTo('.ct-form', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power4.out', delay: 0.8 })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus({ submitting: true, success: false, error: null })
    try {
      const response = await fetch('https://api.prominenttechnolabs.com/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ ...formData, service: selected.join(', ') }),
      })
      const data = await response.json()
      if (response.ok) {
        setStatus({ submitting: false, success: true, error: null })
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
        setSelected([])
      } else {
        throw new Error(data.message || 'Something went wrong')
      }
    } catch (err) {
      setStatus({ submitting: false, success: false, error: err.message })
    }
  }

  return (
    <section className="ct-page" ref={sectionRef}>
      <div className="ct-inner">
        {/* Cuberto: "Hey! Tell us all the things" */}
        <h1 className="ct-title">
          <span className="ct-line">Hey! Tell us all</span>
          <span className="ct-line">the things</span>
        </h1>

        {/* Interest chips — Cuberto signature */}
        <div className="ct-chips-section ct-chips">
          <p className="ct-label">I'm interested in...</p>
          <div className="ct-chips-row">
            {interests.map(item => (
              <ServiceChip
                key={item}
                label={item}
                active={selected.includes(item)}
                onClick={() => toggleInterest(item)}
              />
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="ct-form">
          {status.success ? (
            <div className="ct-success">
              <div className="ct-success-icon-wrap">
                <IoCheckmarkCircle className="ct-success-icon" />
              </div>
              <h3>Thank you!</h3>
              <p>Your message has been sent successfully. We'll get back to you within 24 hours.</p>
              <button className="ct-reset" onClick={() => setStatus({ ...status, success: false })}>Send another message</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="ct-field">
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your name" required />
              </div>
              <div className="ct-field">
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
              </div>
              <div className="ct-field">
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone (optional)" />
              </div>
              <div className="ct-field">
                <input type="text" name="subject" value={formData.subject} onChange={handleChange} placeholder="Subject" required />
              </div>
              <div className="ct-field">
                <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Tell us about your project" rows="1" required></textarea>
              </div>

              {status.error && (
                <div className="ct-error"><IoAlertCircle /> {status.error}</div>
              )}

              <div className="ct-submit-container">
                <button type="submit" className="ct-submit" disabled={status.submitting}>
                  <span className="ct-submit-text-wrapper">
                    <span className="ct-submit-text-old">
                      {status.submitting ? 'Sending...' : 'Send request'}
                    </span>
                    <span className="ct-submit-text-new">
                      {status.submitting ? 'Sending...' : 'Send request'}
                    </span>
                  </span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      <style>{`
        .ct-page {
          background: #ffffff;
          padding: 160px 0 120px;
          min-height: 100vh;
        }
        .ct-inner { width: 100%; margin: 0; padding: 0 100px; }

        .ct-title {
          font-size: clamp(2.5rem, 6vw, 5.2rem); /* Standardized across all sections */
          font-weight: 500;
          line-height: 1.05;
          letter-spacing: -0.035em;
          color: #000;
          text-align: center;
          margin-bottom: 80px;
        }
        .ct-line { display: block; overflow: hidden; }

        /* Chips — Cuberto "I'm interested in" */
        .ct-chips-section { margin-bottom: 60px; text-align: left; }
        .ct-label {
          font-size: 1.2rem;
          font-weight: 400;
          color: #000;
          margin-bottom: 24px;
          text-align: left;
        }
        .ct-chips-row {
          display: flex;
          flex-wrap: wrap;
          gap: 15px 12px;
          justify-content: flex-start;
          max-width: 800px;
        }
        .ct-chip {
          padding: 14px 28px;
          border: 1px solid #000;
          border-radius: 100px;
          background: transparent;
          color: #000;
          font-size: 1rem;
          font-weight: 400;
          cursor: pointer;
          transition: background 0.8s cubic-bezier(0.19, 1, 0.22, 1), color 0.8s cubic-bezier(0.19, 1, 0.22, 1), border-color 0.8s cubic-bezier(0.19, 1, 0.22, 1);
          font-family: inherit;
          position: relative;
          display: inline-block;
          overflow: hidden;
          z-index: 1;
        }
        .ct-chip.active {
          background: #000;
          color: #fff;
          border-color: #000;
        }

        .ct-chip-content {
          display: flex;
          flex-direction: column;
          position: relative;
          height: 1.2em;
          overflow: hidden;
          pointer-events: none;
        }
        .ct-chip-text {
          display: block;
          line-height: 1.2;
          transition: transform 0.8s cubic-bezier(0.19, 1, 0.22, 1);
        }
        .ct-chip-text-hover {
          position: absolute;
          top: 100%;
          left: 0;
          width: 100%;
        }
        .ct-chip:hover .ct-chip-text {
          transform: translateY(-100%);
        }
        .ct-chip.active .ct-chip-text {
          color: #fff;
        }

        /* Form — Cuberto style: borderless inputs with underlines */
        .ct-form { max-width: 700px; text-align: left; }
        .ct-field { 
          margin-bottom: 60px; 
          position: relative; 
        }
        .ct-field::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background: #000;
          transition: width 0.8s cubic-bezier(0.19, 1, 0.22, 1);
          pointer-events: none;
          z-index: 2;
        }
        .ct-field:focus-within::after {
          width: 100%;
        }
        .ct-field input, .ct-field textarea {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1.5px solid rgba(0,0,0,0.08); /* Light track for the rope */
          padding: 40px 0 15px;
          font-size: clamp(1.4rem, 3.5vw, 1.8rem);
          font-weight: 400;
          color: #000;
          font-family: inherit;
          outline: none;
          border-radius: 0;
          transition: border-bottom-color 0.4s ease;
        }
        .ct-field input:focus, .ct-field textarea:focus { border-bottom-color: rgba(0,0,0,0.08); }
        .ct-field input::placeholder, .ct-field textarea::placeholder { color: rgba(0,0,0,0.45); font-weight: 300; transition: color 0.3s; }
        .ct-field input:focus::placeholder, .ct-field textarea:focus::placeholder { color: rgba(0,0,0,0.7); }
        .ct-field textarea { resize: none; min-height: 120px; vertical-align: bottom; }

        .ct-submit-container { text-align: left; }

        .ct-submit {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 18px 45px;
          border: 1.5px solid #000;
          border-radius: 100px;
          background: transparent;
          color: #000;
          font-size: 17px;
          font-weight: 400;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: border-color 0.8s cubic-bezier(0.19, 1, 0.22, 1);
          margin-top: 16px;
          font-family: inherit;
        }
        .ct-submit::before {
          content: '';
          position: absolute;
          top: 100%; left: -50%;
          width: 200%; height: 300%;
          background: #000;
          border-radius: 50%;
          transform: translateY(0);
          transition: transform 1.2s cubic-bezier(0.19, 1, 0.22, 1);
          z-index: 0;
        }
        .ct-submit:hover::before { transform: translateY(-70%); }
        .ct-submit:hover { border-color: #000; }
        
        .ct-submit-text-wrapper {
          position: relative; z-index: 1;
          display: inline-flex; overflow: hidden;
          height: 1.2em;
        }
        .ct-submit-text-old {
          display: inline-block; color: #000;
          transition: transform 0.8s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.15s ease-out;
        }
        .ct-submit-text-new {
          position: absolute; top: 100%; left: 0; width: 100%;
          text-align: center; color: #fff; display: inline-block;
          transition: transform 0.8s cubic-bezier(0.19, 1, 0.22, 1);
        }
        .ct-submit:hover .ct-submit-text-old { transform: translateY(-100%); opacity: 0; }
        .ct-submit:hover .ct-submit-text-new { transform: translateY(-100%); }
        .ct-submit:disabled { opacity: 0.4; cursor: not-allowed; }

        .ct-error {
          display: flex; align-items: center; gap: 8px;
          color: #c53030; margin-bottom: 16px;
          font-size: 0.9rem; font-weight: 500;
        }

        .ct-success { text-align: left; padding: 100px 0; max-width: 600px; animation: fadeInUp 0.8s var(--ease-expo); }
        .ct-success-icon-wrap { margin-bottom: 32px; }
        .ct-success-icon { font-size: 4rem; color: #000; }
        .ct-success h3 { font-size: clamp(2.5rem, 5vw, 4rem); font-weight: 500; margin-bottom: 20px; letter-spacing: -0.03em; }
        .ct-success p { font-size: 1.25rem; color: #666; margin-bottom: 48px; line-height: 1.5; font-weight: 300; }
        .ct-reset {
          padding: 18px 40px; border: 1.5px solid #000;
          border-radius: 100px; background: transparent; color: #000;
          font-size: 1rem; font-weight: 400; cursor: pointer; font-family: inherit;
          transition: all 0.4s var(--ease-expo);
        }
        .ct-reset:hover { background: #000; color: #fff; }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 1024px) {
          .ct-inner { padding: 0 40px !important; }
        }
        @media (max-width: 768px) {
          .ct-page { padding: 120px 0 80px; }
          .ct-inner { padding: 0 24px !important; }
          .ct-title { margin-bottom: 50px; font-size: clamp(2.5rem, 8vw, 4rem); }
          .ct-chip { padding: 10px 20px; font-size: 0.95rem; }
          .ct-field { margin-bottom: 50px !important; }
          .ct-field input, .ct-field textarea { font-size: 1.5rem; padding: 30px 0 15px; }
          .ct-success { padding: 60px 0; }
        }
        @media (max-width: 480px) {
          .ct-page { padding: 80px 0 60px; }
          .ct-inner { padding: 0 16px !important; }
          .ct-title { font-size: 2.22rem; margin-bottom: 40px; }
          .ct-label { font-size: 1.1rem; margin-bottom: 16px; }
          .ct-chips-row { gap: 10px 8px; }
          .ct-chip { padding: 8px 16px; font-size: 0.85rem; }
          .ct-field { margin-bottom: 40px !important; }
          .ct-field input, .ct-field textarea { font-size: 1.25rem; padding: 24px 0 12px; }
          .ct-submit-container { width: 100%; }
          .ct-submit { padding: 16px 32px; font-size: 0.95rem; width: 100%; display: flex; justify-content: center; }
          .ct-success { padding: 40px 0; }
          .ct-success h3 { font-size: 2.2rem; }
          .ct-success p { font-size: 1.1rem; }
        }
      `}</style>
    </section>
  )
}

export default ContactContent
