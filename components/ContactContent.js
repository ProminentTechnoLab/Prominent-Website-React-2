'use client'

import React, { useState, useEffect, useRef } from 'react'
import { 
  IoArrowForward, 
  IoCheckmarkCircle, IoAlertCircle 
} from 'react-icons/io5'
import {
  FaFacebookF, FaLinkedinIn,
  FaInstagram, FaYoutube
} from 'react-icons/fa'
import { RiTwitterXFill } from 'react-icons/ri'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import TextReveal from './animations/TextReveal'
import MagneticButton from './animations/MagneticButton'

const ContactContent = () => {
  // --- Form Logic ---
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    subject: '',
    message: '',
  })
  const [status, setStatus] = useState({
    submitting: false,
    success: false,
    error: null,
  })

  // --- FAQ State ---
  const [activeFaq, setActiveFaq] = useState(null) // Start with all closed

  // --- Testimonial State ---
  const [testimonialIndex, setTestimonialIndex] = useState(0)

  // --- Refs for Animations ---
  const sectionRef = useRef(null)
  const formRef = useRef(null)

  const faqs = [
    {
      q: "What services do you offer?",
      a: "We specialize in end-to-end digital product development, including Web Development (React, Next.js, Node.js), Mobile App Development (Flutter, React Native), UI/UX Design, and Digital Marketing."
    },
    {
      q: "How long does a typical project take?",
      a: "Timeline depends on complexity. A standard MVP typically takes 8-12 weeks, while larger enterprise transformations can span 4-6 months. We prioritize agile delivery to get you to market faster."
    },
    {
      q: "What is your primary tech stack?",
      a: "We are experts in modern high-performance stacks. For web: Next.js + Node.js. For mobile: Flutter. For backend: Laravel or Node.js. We always choose the best tool for your specific business requirements."
    },
    {
      q: "Do you provide post-launch support?",
      a: "Yes, we offer flexible maintenance and support packages. Whether you need bug fixes, feature updates, or server monitoring, our team is available to ensure your product continues to scale."
    }
  ]

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

  const services = [
    "Website Development",
    "Mobile App Development",
    "UI/UX Design",
    "CMS & E-commerce",
    "Digital Marketing",
    "Payment & Shipping API"
  ]

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    
    const ctx = gsap.context(() => {
      gsap.from('.stagger-item', {
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        }
      })
    })

    const interval = setInterval(() => {
      setTestimonialIndex(prev => (prev + 1) % testimonials.length)
    }, 6000)

    return () => {
      ctx.revert()
      clearInterval(interval)
    }
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
        body: JSON.stringify(formData),
      })

      const data = await response.json()
      if (response.ok) {
        setStatus({ submitting: false, success: true, error: null })
        setFormData({ name: '', email: '', phone: '', service: '', subject: '', message: '' })
      } else {
        throw new Error(data.message || 'Error occurred')
      }
    } catch (err) {
      setStatus({ submitting: false, success: false, error: err.message })
    }
  }

  return (
    <section className="contact-refokus" ref={sectionRef}>
      <div className="container">
        {/* Header Section */}
        <div className="contact-header">
           <h1 className="hero-h stagger-item">
             <TextReveal>It's time to</TextReveal>
             <TextReveal delay={0.2} className="accent-text">Elevate Your Business</TextReveal>
           </h1>
        </div>

        <div className="contact-main-grid">
          {/* Left Side: Testimonials & FAQ */}
          <div className="info-column">
            {/* Testimonials */}
            <div className="testimonial-section stagger-item">
               <div className="testimonial-card">
                 <p className="t-content">"{testimonials[testimonialIndex].content}"</p>
                 <div className="t-author">
                   <h4 className="t-name">{testimonials[testimonialIndex].name}</h4>
                   <p className="t-role">{testimonials[testimonialIndex].role}</p>
                 </div>
               </div>
               <div className="t-dots">
                 {testimonials.map((_, i) => (
                   <span 
                     key={i} 
                     className={`t-dot ${i === testimonialIndex ? 'active' : ''}`}
                     onClick={() => setTestimonialIndex(i)}
                   />
                 ))}
               </div>
            </div>

            {/* FAQ Accordion */}
            <div className="faq-section stagger-item">
              <h4 className="faq-title">Frequently Asked Questions</h4>
              <div className="faq-list">
                {faqs.map((faq, i) => (
                  <div key={i} className={`faq-item ${activeFaq === i ? 'active' : ''}`}>
                    <button className="faq-question" onClick={() => setActiveFaq(activeFaq === i ? null : i)}>
                      <span>{faq.q}</span>
                      <div className="faq-icon">
                        <span className="line hor"></span>
                        <span className="line ver"></span>
                      </div>
                    </button>
                    <div className="faq-answer">
                      <div className="faq-answer-inner">
                        <p>{faq.a}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="social-section stagger-item">
              <span className="social-label">Follow Our Journey</span>
              <div className="social-links-refokus">
                {[
                  { icon: <FaLinkedinIn />, url: 'https://linkedin.com/company/prominent-technolabs/' },
                  { icon: <FaInstagram />, url: 'https://instagram.com/prominenttechnolabs/' },
                  { icon: <FaFacebookF />, url: 'https://facebook.com/prominenttechnolabs/' },
                  { icon: <RiTwitterXFill />, url: 'https://twitter.com/prominenttech/' },
                  { icon: <FaYoutube />, url: 'https://youtube.com/@prominenttechnolabs' }
                ].map((s, idx) => (
                  <MagneticButton key={idx} strength={15} bgColor="#000">
                    <a href={s.url} target="_blank" rel="noopener noreferrer" className="social-btn-bw">
                      {s.icon}
                    </a>
                  </MagneticButton>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="form-column">
            <div className="contact-form-wrapper stagger-item">
              {status.success ? (
                <div className="success-message">
                  <IoCheckmarkCircle className="success-icon" />
                  <h3>Message Sent!</h3>
                  <p>We'll get back to you within 24 hours.</p>
                  <button className="reset-btn" onClick={() => setStatus({ ...status, success: false })}>
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="refokus-form" ref={formRef}>
                  <div className="field-group">
                    <label className="overhead-label">Full Name</label>
                    <input 
                      type="text" 
                      name="name" 
                      value={formData.name} 
                      onChange={handleChange} 
                      placeholder="e.g. John Doe"
                      required
                    />
                  </div>

                  <div className="field-row">
                    <div className="field-group">
                      <label className="overhead-label">Email Address</label>
                      <input 
                        type="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                    <div className="field-group">
                      <label className="overhead-label">Phone (Optional)</label>
                      <input 
                        type="tel" 
                        name="phone" 
                        value={formData.phone} 
                        onChange={handleChange} 
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                  </div>

                  <div className="field-row">
                    <div className="field-group">
                      <label className="overhead-label">I'm interested in</label>
                      <select name="service" value={formData.service} onChange={handleChange} required>
                        <option value="">Select a service</option>
                        {services.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                    <div className="field-group">
                      <label className="overhead-label">Subject</label>
                      <input 
                        type="text" 
                        name="subject" 
                        value={formData.subject} 
                        onChange={handleChange} 
                        placeholder="Project Inquiry"
                        required
                      />
                    </div>
                  </div>

                  <div className="field-group">
                    <label className="overhead-label">Your Message</label>
                    <textarea 
                      name="message" 
                      value={formData.message} 
                      onChange={handleChange} 
                      placeholder="Tell us about your goals..."
                      rows="4"
                      required
                    ></textarea>
                  </div>

                  {status.error && (
                    <div className="error-message-box">
                      <IoAlertCircle /> {status.error}
                    </div>
                  )}

                  <div className="submit-wrap">
                    <button type="submit" className="submit-btn" disabled={status.submitting}>
                      <span className="submit-text">
                        {status.submitting ? 'Sending...' : 'Send Message'}
                      </span>
                      <div className="arrow-wrap">
                        <IoArrowForward />
                      </div>
                      <div className="underline"></div>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .contact-refokus {
          background-color: #F5F5F7;
          color: #000;
          padding: 180px 0 120px;
          min-height: 100vh;
          position: relative;
          z-index: 1;
        }

        .contact-header { margin-bottom: 5vw; }
        .hero-h {
          font-size: clamp(3rem, 7vw, 6rem);
          line-height: 0.9;
          font-weight: 800;
          letter-spacing: -0.04em;
          text-transform: uppercase;
          color: #000 !important; /* Ensure black color */
        }
        .accent-text {
          display: block;
          color: #000 !important;
          opacity: 0.15 !important; /* Fixed visibility */
        }

        .contact-main-grid {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 10vw;
          align-items: start;
        }

        /* Info Column */
        .info-column { display: flex; flex-direction: column; gap: 4rem; }

        .testimonial-card {
          padding: 3rem;
          background: white;
          border-radius: 30px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.03);
          margin-bottom: 1.5rem;
          min-height: 280px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .t-content {
          font-size: 1.5rem;
          line-height: 1.4;
          font-weight: 600;
          margin-bottom: 2rem;
          color: #000;
        }
        .t-name { font-size: 1.2rem; color: #000; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 700; margin-bottom: 0.5rem; }
        .t-role { font-size: 0.9rem; color: #666; text-transform: uppercase; letter-spacing: 0.1em; }
        
        .t-dots { display: flex; gap: 8px; }
        .t-dot { width: 8px; height: 8px; border-radius: 50%; background: #ddd; cursor: pointer; transition: all 0.3s; }
        .t-dot.active { background: #000; width: 24px; border-radius: 10px; }

        .faq-title { font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.2em; font-weight: 800; margin-bottom: 2rem; opacity: 0.4; }
        .faq-list { display: flex; flex-direction: column; border-top: 1px solid rgba(0,0,0,0.1); }
        .faq-item { border-bottom: 1px solid rgba(0,0,0,0.1); }
        
        .faq-question {
          width: 100%;
          padding: 2.5rem 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: none;
          border: none;
          font-size: 1.2rem;
          font-weight: 700;
          text-align: left;
          cursor: pointer;
          transition: all 0.3s;
          color: #000;
        }
        .faq-question:hover { opacity: 0.7; }

        .faq-icon {
          width: 20px;
          height: 20px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .faq-icon .line {
          position: absolute;
          background: #000;
          transition: transform 0.6s cubic-bezier(0.19, 1, 0.22, 1);
        }
        .faq-icon .hor { width: 100%; height: 2px; }
        .faq-icon .ver { width: 2px; height: 100%; }
        
        /* PLUS TO MINUS ANIMATION */
        .faq-item.active .faq-icon .ver { transform: rotate(90deg) scaleX(0); }
        .faq-item.active .faq-icon .hor { transform: rotate(180deg); }

        .faq-answer {
            height: 0; 
            overflow: hidden; 
            transition: all 0.5s cubic-bezier(0.19, 1, 0.22, 1); 
            opacity: 0;
            pointer-events: none;
        }
        .faq-item.active .faq-answer {
            height: auto; 
            min-height: 40px; 
            opacity: 1; 
            padding-bottom: 2rem;
            pointer-events: all;
        }
        .faq-answer-inner { color: #555; line-height: 1.7; font-size: 1.1rem; }

        .social-label { font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.2em; font-weight: 800; margin-bottom: 2rem; opacity: 0.4; display: block; }
        .social-links-refokus { display: flex; gap: 15px; }
        
        .social-btn-bw {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: transparent;
          border: 1px solid rgba(0,0,0,0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #000;
          font-size: 1.4rem;
          transition: all 0.4s var(--ease-expo);
        }
        .social-btn-bw:hover {
          color: #fff;
          border-color: #000;
          transform: translateY(-5px);
        }

        /* Form Style */
        .contact-form-wrapper {
          background: white;
          padding: 5rem 4rem;
          border-radius: 40px;
          box-shadow: 0 40px 80px rgba(0,0,0,0.03);
        }
        .refokus-form input, .refokus-form textarea, .refokus-form select {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid rgba(0,0,0,0.1);
          padding: 1.2rem 0;
          font-size: 1.1rem;
          font-weight: 500;
          color: #000;
          outline: none;
          transition: border-color 0.3s;
          border-radius: 0;
        }
        .refokus-form input:focus, .refokus-form textarea:focus, .refokus-form select:focus {
          border-color: #000;
        }
        .refokus-form select {
          appearance: none;
          cursor: pointer;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right center;
        }

        .overhead-label { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.15em; font-weight: 800; color: #999; margin-bottom: 0.5rem; display: block; }
        .field-group { margin-bottom: 3rem; }
        .field-row { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; }

        .submit-wrap { margin-top: 2rem; }
        .submit-btn {
          background: none; border: none; display: flex; align-items: center; gap: 15px;
          font-size: 1.3rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em;
          cursor: pointer; position: relative; padding-bottom: 15px; color: #000;
        }
        .submit-btn .underline { position: absolute; bottom: 0; left: 0; width: 100%; height: 1px; background: rgba(0,0,0,0.1); transition: all 0.3s; }
        .submit-btn:hover .underline { height: 4px; background: #000; }
        .submit-btn:hover .arrow-wrap { transform: translateX(10px); }
        .submit-btn:disabled { opacity: 0.5; cursor: not-allowed; }

        .success-message { text-align: center; padding: 4rem 0; }
        .success-icon { font-size: 5rem; color: #4CAF50; margin-bottom: 2rem; }
        .reset-btn { background: #000; color: #fff; border: none; padding: 1.2rem 3rem; border-radius: 100px; font-weight: 700; text-transform: uppercase; cursor: pointer; transition: 0.3s; }
        .reset-btn:hover { transform: scale(1.05); }

        .error-message-box { background: #fff5f5; color: #c53030; padding: 1.5rem; border-radius: 15px; margin-bottom: 2rem; display: flex; align-items: center; gap: 12px; font-weight: 600; }

        @media (max-width: 1024px) {
          .contact-main-grid { grid-template-columns: 1fr; gap: 80px; }
          .contact-form-wrapper { padding: 4rem 3rem; }
        }
        @media (max-width: 768px) {
          .field-row { grid-template-columns: 1fr; gap: 0; }
          .hero-h { font-size: 3.5rem; }
          .testimonial-card { padding: 2rem; }
          .contact-form-wrapper { padding: 3rem 1.5rem; border-radius: 30px; }
        }
      `}</style>
    </section>
  )
}

export default ContactContent
