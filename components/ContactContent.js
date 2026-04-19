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

const InputField = ({ type, name, value, onChange, placeholder, required, isTextArea }) => {
  const pathRef = useRef(null)

  const handleFocus = () => {
    const path = pathRef.current
    if (!path) return

    // Pluck the rope — big smooth wave distortion
    gsap.timeline()
      .to(path, {
        attr: { d: 'M0,5 C120,-8 280,18 350,-4 C420,18 580,-8 700,5' },
        duration: 0.3,
        ease: 'power2.out'
      })
      .to(path, {
        attr: { d: 'M0,5 Q350,5 700,5' },
        duration: 2,
        ease: 'elastic.out(1, 0.25)'
      })
  }

  const Tag = isTextArea ? 'textarea' : 'input'

  return (
    <div className="ct-field">
      <Tag 
        type={type} 
        name={name} 
        value={value} 
        onChange={onChange} 
        placeholder={placeholder} 
        required={required} 
        rows={isTextArea ? "1" : undefined}
        onFocus={handleFocus}
      />
      <div className="ct-line-track">
        <svg className="ct-wave-svg" viewBox="0 0 700 10" preserveAspectRatio="none">
          <path
            ref={pathRef}
            d="M0,5 Q350,5 700,5"
            stroke="rgba(0,0,0,0.2)"
            strokeWidth="1.5"
            fill="none"
          />
        </svg>
      </div>
    </div>
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
        <h1 className="ct-title">
          <span className="ct-line">Hey! Tell us all</span>
          <span className="ct-line">the things</span>
        </h1>

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
              <InputField type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your name" required />
              <InputField type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
              <InputField type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone (optional)" />
              <InputField type="text" name="subject" value={formData.subject} onChange={handleChange} placeholder="Subject" required />
              <InputField name="message" value={formData.message} onChange={handleChange} placeholder="Tell us about your project" required isTextArea />

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
        .ct-inner { width: 100%; margin: 0; padding: 0 12vw; }

        .ct-title {
          font-size: clamp(2.5rem, 6vw, 5.2rem);
          font-weight: 500;
          line-height: 1.05;
          letter-spacing: -0.035em;
          color: #000;
          text-align: center;
          margin-bottom: 80px;
        }
        .ct-line { display: block; overflow: hidden; }

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
          transition: background 0.8s cubic-bezier(0.19, 1, 0.22, 1), color 0.8s cubic-bezier(0.19, 1, 0.22, 1);
          font-family: inherit;
          position: relative;
          display: inline-block;
          overflow: hidden;
          z-index: 1;
        }
        .ct-chip.active { background: #000; color: #fff; border-color: #000; }

        .ct-chip-content { display: flex; flex-direction: column; position: relative; height: 1.2em; overflow: hidden; pointer-events: none; }
        .ct-chip-text { display: block; line-height: 1.2; transition: transform 0.8s cubic-bezier(0.19, 1, 0.22, 1); }
        .ct-chip-text-hover { position: absolute; top: 100%; left: 0; width: 100%; }
        .ct-chip:hover .ct-chip-text { transform: translateY(-100%); }

        /* Form Track Interaction (Cuberto Contacts Style) */
        .ct-form { max-width: 700px; text-align: left; }
        .ct-field { 
          margin-bottom: 60px; 
          position: relative; 
          cursor: text;
        }
        .ct-field input, .ct-field textarea {
          width: 100%;
          background: transparent;
          border: none;
          padding: 40px 0 15px;
          font-size: clamp(1.4rem, 3.5vw, 1.8rem);
          font-weight: 400;
          color: #000;
          font-family: inherit;
          outline: none;
          border-radius: 0;
        }
        .ct-field textarea { resize: none; min-height: 120px; vertical-align: bottom; }
        .ct-field input::placeholder, .ct-field textarea::placeholder { color: rgba(0,0,0,0.5); font-weight: 400; }
        
        .ct-line-track {
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 100%;
          height: 10px;
          pointer-events: none;
        }
        .ct-wave-svg {
          width: 100%;
          height: 100%;
        }

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
        
        .ct-submit-text-wrapper { position: relative; z-index: 1; display: inline-flex; overflow: hidden; height: 1.2em; }
        .ct-submit-text-old { display: inline-block; color: #000; transition: transform 0.8s cubic-bezier(0.19, 1, 0.22, 1); }
        .ct-submit-text-new { position: absolute; top: 100%; left: 0; width: 100%; text-align: center; color: #fff; transition: transform 0.8s cubic-bezier(0.19, 1, 0.22, 1); }
        .ct-submit:hover .ct-submit-text-old { transform: translateY(-100%); }
        .ct-submit:hover .ct-submit-text-new { transform: translateY(-100%); }
        .ct-submit:disabled { opacity: 0.4; cursor: not-allowed; }

        .ct-success { text-align: left; padding: 100px 0; max-width: 600px; }
        .ct-success-icon { font-size: 4rem; color: #000; margin-bottom: 32px; }
        .ct-success h3 { font-size: clamp(2.5rem, 5vw, 4rem); font-weight: 500; margin-bottom: 20px; letter-spacing: -0.03em; }

        @media (max-width: 1024px) {
          .ct-inner { padding: 0 8vw !important; }
        }
        @media (max-width: 768px) {
          .ct-inner { padding: 0 6vw !important; }
          .ct-title { font-size: clamp(2.5rem, 8vw, 4rem); }
        }
        @media (max-width: 480px) {
          .ct-inner { padding: 0 20px !important; }
          .ct-submit { width: 100%; }
        }
      `}</style>
    </section>
  )
}

export default ContactContent
