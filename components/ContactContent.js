'use client'

import React, { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { IoCheckmarkCircle, IoAlertCircle } from 'react-icons/io5'

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
              <button
                key={item}
                className={`ct-chip ${selected.includes(item) ? 'active' : ''}`}
                onClick={() => toggleInterest(item)}
                type="button"
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="ct-form">
          {status.success ? (
            <div className="ct-success">
              <IoCheckmarkCircle className="ct-success-icon" />
              <h3>Message sent!</h3>
              <p>We'll get back to you within 24 hours.</p>
              <button className="ct-reset" onClick={() => setStatus({ ...status, success: false })}>Send another message</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="ct-field">
                <label>Your name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" required />
              </div>
              <div className="ct-field">
                <label>Your email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" required />
              </div>
              <div className="ct-field-row">
                <div className="ct-field">
                  <label>Phone (optional)</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+1 (555) 000-0000" />
                </div>
                <div className="ct-field">
                  <label>Subject</label>
                  <input type="text" name="subject" value={formData.subject} onChange={handleChange} placeholder="Project inquiry" required />
                </div>
              </div>
              <div className="ct-field">
                <label>Tell us about your project</label>
                <textarea name="message" value={formData.message} onChange={handleChange} placeholder="I need help with..." rows="3" required></textarea>
              </div>

              {status.error && (
                <div className="ct-error"><IoAlertCircle /> {status.error}</div>
              )}

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
        .ct-inner { max-width: 1000px; margin: 0 auto; padding: 0 40px; }

        .ct-title {
          font-size: clamp(3.2rem, 7.5vw, 6.5rem);
          font-weight: 500;
          line-height: 1.05;
          letter-spacing: -0.035em;
          color: #000;
          text-align: center;
          margin-bottom: 80px;
        }
        .ct-line { display: block; overflow: hidden; }

        /* Chips — Cuberto "I'm interested in" */
        .ct-chips-section { margin-bottom: 60px; }
        .ct-label {
          font-size: 1.2rem;
          font-weight: 400;
          color: #000;
          margin-bottom: 24px;
        }
        .ct-chips-row { display: flex; flex-wrap: wrap; gap: 12px; }
        .ct-chip {
          padding: 14px 28px;
          border: 1px solid rgba(0,0,0,0.15);
          border-radius: 100px;
          background: transparent;
          color: #000;
          font-size: 1rem;
          font-weight: 400;
          cursor: pointer;
          transition: all 0.3s var(--ease-expo);
          font-family: inherit;
        }
        .ct-chip:hover { border-color: #000; }
        .ct-chip.active {
          background: #000;
          color: #fff;
          border-color: #000;
        }

        /* Form — Cuberto style: borderless inputs with underlines */
        .ct-field { margin-bottom: 32px; }
        .ct-field-row { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; }
        .ct-field label {
          display: block;
          font-size: 0.75rem;
          font-weight: 500;
          color: #999;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 8px;
        }
        .ct-field input, .ct-field textarea {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid rgba(0,0,0,0.12);
          padding: 12px 0;
          font-size: 1.1rem;
          font-weight: 500;
          color: #000;
          font-family: inherit;
          outline: none;
          border-radius: 0;
          transition: border-color 0.3s;
        }
        .ct-field input:focus, .ct-field textarea:focus { border-color: #000; }
        .ct-field input::placeholder, .ct-field textarea::placeholder { color: rgba(0,0,0,0.2); font-weight: 400; }
        .ct-field textarea { resize: vertical; min-height: 60px; }

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
          transition: border-color 1s cubic-bezier(0.19, 1, 0.22, 1);
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
          transition: transform 1s cubic-bezier(0.19, 1, 0.22, 1);
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
          transition: transform 1s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.15s ease-out;
        }
        .ct-submit-text-new {
          position: absolute; top: 100%; left: 0; width: 100%;
          text-align: center; color: #fff; display: inline-block;
          transition: transform 1s cubic-bezier(0.19, 1, 0.22, 1);
        }
        .ct-submit:hover .ct-submit-text-old { transform: translateY(-100%); opacity: 0; }
        .ct-submit:hover .ct-submit-text-new { transform: translateY(-100%); }
        .ct-submit:disabled { opacity: 0.4; cursor: not-allowed; }

        .ct-error {
          display: flex; align-items: center; gap: 8px;
          color: #c53030; margin-bottom: 16px;
          font-size: 0.9rem; font-weight: 500;
        }

        .ct-success { text-align: center; padding: 60px 0; }
        .ct-success-icon { font-size: 3rem; color: #4ade80; display: block; margin-bottom: 16px; }
        .ct-success h3 { font-size: 1.5rem; font-weight: 500; margin-bottom: 8px; }
        .ct-success p { color: #666; margin-bottom: 32px; }
        .ct-reset {
          padding: 14px 28px; border: 1px solid rgba(0,0,0,0.15);
          border-radius: 100px; background: transparent; color: #000;
          font-size: 0.9rem; font-weight: 500; cursor: pointer; font-family: inherit;
          transition: all 0.3s;
        }
        .ct-reset:hover { background: #000; color: #fff; }

        @media (max-width: 768px) {
          .ct-page { padding: 120px 0 80px; }
          .ct-inner { padding: 0 20px; }
          .ct-field-row { grid-template-columns: 1fr; gap: 0; }
          .ct-title { margin-bottom: 50px; }
          .ct-chip { padding: 10px 18px; font-size: 0.9rem; }
        }
        @media (max-width: 480px) {
          .ct-page { padding: 100px 0 60px; }
          .ct-inner { padding: 0 16px; }
          .ct-title { font-size: 2.5rem; }
          .ct-chip { padding: 8px 14px; font-size: 0.8rem; }
          .ct-submit { padding: 14px 28px; font-size: 0.9rem; }
        }
      `}</style>
    </section>
  )
}

export default ContactContent
