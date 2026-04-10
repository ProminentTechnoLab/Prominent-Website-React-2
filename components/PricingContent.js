'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { IoCheckmarkCircle, IoArrowForward, IoCloseCircle } from 'react-icons/io5'
import TextReveal from './animations/TextReveal'
import LiquidButton from './animations/LiquidButton'
import MagneticButton from './animations/MagneticButton'

const PricingContent = () => {
  const [activeTab, setActiveTab] = useState('Website Design')
  const [activeFaq, setActiveFaq] = useState(null)
  const containerRef = useRef(null)

  const categories = ['Website Design', 'Remote Hiring', 'Mobile App', 'Digital Marketing']

  const plans = {
    'Website Design': [
      { name: 'Starter', price: '$199', period: 'One Time', features: ['5 Dynamic Pages', 'Responsive Design', 'Basic SEO', '1 Month Support', { text: 'Free Domain & Hosting', included: false }] },
      { name: 'Professional', price: '$349', period: 'One Time', popular: true, features: ['10 Dynamic Pages', 'Premium Design', 'Advanced SEO', '3 Months Support', 'Free Domain & Hosting', 'Admin Panel'] },
      { name: 'Business', price: '$599', period: 'One Time', features: ['Unlimited Pages', 'Custom UI/UX', 'SEO & Speed Fix', '6 Months Support', 'Free Domain & Hosting', 'CMS Integration', 'E-commerce Ready'] }
    ],
    'Remote Hiring': [
      { name: 'Junior Dev', price: '$449', period: 'per month', features: ['Dedicated Developer', 'Daily Updates', 'Quality Assurance', 'Project Management', { text: 'Senior Oversight', included: false }] },
      { name: 'Mid Dev', price: '$699', period: 'per month', popular: true, features: ['Dedicated UI Specialist', 'Code Review', 'Cloud Deployment', '24/7 Support', 'Senior Oversight'] },
      { name: 'Senior Dev', price: '$1,199', period: 'per month', features: ['Architect Level Dev', 'Fullstack Expertise', 'Tech Consulting', 'Priority Support', 'Team Lead Access'] }
    ],
    'Mobile App': [
      { name: 'Basic App', price: '$649', period: 'Starting', features: ['Flutter/React Native', 'Basic Features', 'App Store Prep', '1 Month Support'] },
      { name: 'Pro App', price: '$1,299', period: 'Starting', popular: true, features: ['Custom Logic', 'Firebase/Laravel API', 'Push Notifications', '3 Months Support', 'Play/App Store Deploy'] }
    ],
    'Digital Marketing': [
      { name: 'ESSENTIAL', price: '$129', period: 'per month', features: ['SEO Analysis', 'Social Media Management', '5 Creatives/mo', 'Basic Reporting'] },
      { name: 'GROWTH', price: '$249', period: 'per month', popular: true, features: ['Full SEO Service', 'PPC Management', '15 Creatives/mo', 'Content Strategy', 'Monthly Strategy Call'] }
    ]
  }

  const faqs = [
    { q: "Do you offer custom pricing for large projects?", a: "Yes! While our standard plans cover most needs, we specialize in high-end custom software and enterprise solutions. Contact us for a bespoke quote tailored to your exact requirements." },
    { q: "What is your typical payment schedule?", a: "For one-time projects, we typically work on a 50% deposit and 50% upon delivery. For recurring services like remote hiring, billing is handled monthly in advance." },
    { q: "Can I upgrade my plan later?", a: "Absolutely. You can scale your plan or hiring capacity at any time. We'll simply adjust your billing for the next cycle or project phase." },
    { q: "Are there any hidden maintenance costs?", a: "None. Our pricing is fully transparent. Optional ongoing maintenance or cloud hosting costs are discussed upfront during the consultation phase." }
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.stagger-item', {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 1.2,
        ease: 'power4.out',
        delay: 0.3
      })
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="pricing-page-wrapper">
      {/* Premium Hero */}
      <section className="pricing-hero">
        <div className="container">
          <div className="hero-inner stagger-item">
            <div className="badge">Pricing & Plans</div>
            <h1 className="hero-title">
              <TextReveal>Flexible Plans for</TextReveal>
              <TextReveal delay={0.2} className="accent-text">Every Digital Ambition</TextReveal>
            </h1>
            <p className="hero-description stagger-item">
              Transparent, value-driven pricing designed to scale with your ambition. 
              No hidden fees, just world-class engineering.
            </p>
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="pricing-main section-dark">
        <div className="container">
          <div className="pricing-controls stagger-item">
            <div className="tabs-container">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`pricing-tab ${activeTab === cat ? 'active' : ''}`}
                  onClick={() => setActiveTab(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="pricing-grid stagger-item">
            {plans[activeTab].map((plan, i) => (
              <div key={plan.name} className={`pricing-card ${plan.popular ? 'popular' : ''}`}>
                {plan.popular && <div className="popular-tag">MOST POPULAR</div>}
                <div className="card-head">
                  <h3 className="plan-name">{plan.name}</h3>
                  <div className="price-wrap">
                    <span className="price">{plan.price}</span>
                    <span className="period">/{plan.period}</span>
                  </div>
                </div>
                <div className="card-body-wrap">
                  <ul className="plan-features">
                    {plan.features.map((f, idx) => {
                      const isObject = typeof f === 'object'
                      const text = isObject ? f.text : f
                      const included = isObject ? f.included : true
                      return (
                        <li key={idx} className={included ? '' : 'disabled'}>
                          {included ? <IoCheckmarkCircle className="check" /> : <IoCloseCircle className="uncheck" />}
                          <span className="feature-text">{text}</span>
                        </li>
                      )
                    })}
                  </ul>
                </div>
                <div className="card-footer">
                  <LiquidButton
                    effect="cryogenic"
                    variant={plan.popular ? "solid" : "outline"}
                    color={plan.popular ? "var(--brand-orange)" : "#fff"}
                    liquidColor={plan.popular ? "#000" : "var(--brand-orange)"}
                    textColor="white"
                    hoverTextColor="white"
                    strength={30}
                    width="100%"
                  >
                    <Link href="/contact/" className="btn-clean">
                      Choose Plan
                    </Link>
                  </LiquidButton>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enterprise Section */}
      <section className="enterprise-section stagger-item">
        <div className="container">
          <div className="enterprise-box">
            <div className="enterprise-content">
              <h3>Enterprise & Custom Solutions</h3>
              <p>Looking for a bespoke architecture, large-scale software, or long-term dedicated teams? Let's discuss a custom strategy.</p>
            </div>
            <div className="enterprise-cta">
              <MagneticButton strength={20}>
                <Link href="/contact/" className="cta-link-btn">
                  Talk to an Expert <IoArrowForward />
                </Link>
              </MagneticButton>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing FAQs (Help Center) */}
      <section className="pricing-faq section-light stagger-item">
        <div className="container">
          <div className="faq-main-wrapper">
             <div className="faq-header-info">
               <div className="badge">Help Center</div>
               <h2 className="faq-h">Common Pricing Questions</h2>
               <p>Everything you need to know about our billing and project management process.</p>
             </div>
             <div className="faq-accordion-wrapper">
               {faqs.map((faq, i) => (
                 <div key={i} className={`faq-row-item ${activeFaq === i ? 'active' : ''}`}>
                   <button className="faq-btn-trigger" onClick={() => setActiveFaq(activeFaq === i ? null : i)}>
                     <span>{faq.q}</span>
                     <div className="faq-custom-icon">
                       <span className="l l-hor"></span>
                       <span className="l l-ver"></span>
                     </div>
                   </button>
                   <div className="faq-pane">
                     <div className="faq-pane-inner">
                       <p>{faq.a}</p>
                     </div>
                   </div>
                 </div>
               ))}
             </div>
          </div>
        </div>
      </section>

      <style>{`
        .pricing-page-wrapper { background: var(--bg-primary); overflow: hidden; }
        .badge { display: none !important; }
        /* Hero */
        .pricing-hero { padding: 160px 0 80px; background: var(--bg-primary); text-align: left; }
        .hero-title { 
            font-size: clamp(3rem, 7vw, 6rem); 
            line-height: 0.9; 
            font-weight: 800; 
            letter-spacing: -0.04em; 
            margin-bottom: 3rem; 
            text-transform: uppercase; 
            color: #000 !important; 
        }
        .accent-text { 
          display: block; 
          color: #000 !important; 
          opacity: 0.15 !important; 
        }
        .hero-description { font-size: 1.2rem; max-width: 800px; color: #666; font-weight: 400; line-height: 1.5; }

        /* Tabs Section */
        .pricing-main { padding: 100px 0; background: #000; border-radius: 30px 30px 0 0; position: relative; z-index: 10; }
        .pricing-controls { margin-bottom: 4rem; display: flex; justify-content: flex-start; }
        .tabs-container { display: flex; background: rgba(255,255,255,0.05); padding: 8px; border-radius: 100px; gap: 5px; flex-wrap: wrap; }
        .pricing-tab { padding: 12px 28px; border-radius: 100px; border: none; background: transparent; color: #fff; opacity: 0.4; font-weight: 500; font-size: 0.85rem; letter-spacing: 0.02em; cursor: pointer; transition: 0.4s; font-family: inherit; }
        .pricing-tab.active { background: #fff; color: #000; opacity: 1; }

        /* Grid & Cards - SYNCHRONIZED WITH PRICING.JS */
        .pricing-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; }
        .pricing-card {
          background: #111;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 2.5rem;
          padding: 5rem 3rem;
          position: relative;
          transition: all 0.6s var(--ease-expo);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          height: 100%;
        }
        .pricing-card:hover {
          background: #fff;
          transform: translateY(-15px);
          box-shadow: 0 40px 80px rgba(0,0,0,0.1);
          border-color: #fff;
        }
        .popular-tag {
          position: absolute;
          top: 0;
          right: 0;
          left: auto;
          background: var(--brand-orange);
          color: white;
          font-size: 0.65rem;
          font-weight: 900;
          padding: 10px 20px;
          letter-spacing: 0.1em;
          border-bottom-left-radius: 1.5rem;
          z-index: 5;
        }

        .card-head { margin-bottom: 3rem; text-align: left; }
        .plan-name { 
          font-size: 0.9rem; 
          color: #aaa !important;
          margin-bottom: 1.5rem; 
          text-transform: uppercase;
          letter-spacing: 0.2rem;
          font-weight: 800;
          transition: color 0.4s;
        }
        .pricing-card:hover .plan-name,
        .pricing-card:hover .feature-text { 
          color: #000000 !important;
          opacity: 0.8 !important;
        }
        .price-wrap { color: #fff; transition: color 0.4s; display: flex; align-items: baseline; gap: 4px; }
        .pricing-card:hover .price-wrap,
        .pricing-card:hover .price,
        .pricing-card:hover .period { 
          color: #000000 !important; 
        }
        .price { font-size: 3.5rem; font-weight: 700; letter-spacing: -0.04em; }
        .period { font-size: 0.8rem; opacity: 0.4; text-transform: uppercase; font-weight: 700; }

        .plan-features { list-style: none; margin-bottom: 4rem; flex: 1; }
        .plan-features li {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 1.2rem;
          color: #eee;
          font-size: 0.95rem;
          transition: all 0.4s;
        }
        .pricing-card:hover .plan-features li { color: #000000 !important; }
        
        .plan-features .check { color: var(--brand-orange); font-size: 1.2rem; transition: color 0.4s; }
        .pricing-card:hover .plan-features .check { color: #000000 !important; }
        .plan-features .uncheck { font-size: 1.2rem; color: #ff4d4d; opacity: 0.8; transition: all 0.4s; }
        .pricing-card:hover .plan-features .uncheck { color: #000000 !important; opacity: 1; }
        .plan-features li.disabled { opacity: 0.3; text-decoration: line-through; }
        .pricing-card:hover .plan-features li.disabled { opacity: 0.4 !important; color: #000000 !important; }

        .card-footer { margin-top: auto; display: flex; justify-content: center; width: 100%; }
        .btn-clean { text-decoration: none; color: inherit; font-weight: 700; width: 100%; display: flex; justify-content: center; }

        /* Button Hover consistent with Pricing.js */
        .pricing-card:hover .fast-btn {
          background: #000 !important;
          border-color: #000 !important;
        }
        .pricing-card:hover .btn-content,
        .pricing-card:hover .btn-content * {
          color: #fff !important;
        }
        .pricing-card.popular:hover .fast-btn {
          background: var(--brand-orange) !important;
          border-color: var(--brand-orange) !important;
        }

        /* Enterprise Section */
        .enterprise-section { padding: 80px 0; background: var(--bg-primary); }
        .enterprise-box { background: #000; border-radius: 30px; padding: 5rem; display: flex; justify-content: space-between; align-items: center; gap: 3rem; color: #fff; }
        .enterprise-content h3 { font-size: 2.5rem; font-weight: 800; margin-bottom: 1.2rem; text-transform: uppercase; letter-spacing: -0.02em; }
        .enterprise-content p { font-size: 1.2rem; opacity: 0.7; max-width: 600px; line-height: 1.5; }
        .cta-link-btn { background: #fff !important; color: #000 !important; padding: 22px 45px; border-radius: 100px; text-decoration: none; font-weight: 800; display: inline-flex; align-items: center; gap: 12px; font-size: 1.1rem; transition: 0.4s var(--ease-expo); }
        .cta-link-btn:hover { background: var(--brand-orange) !important; color: #fff !important; transform: translateX(5px); }

        /* FAQ Section (Help Center) */
        .pricing-faq { padding: 100px 0; background: var(--bg-primary); }
        .faq-main-wrapper { display: flex; flex-direction: column; gap: 3rem; }
        .faq-h { font-size: 3rem; font-weight: 800; margin: 1rem 0; line-height: 0.9; letter-spacing: -0.04em; text-transform: uppercase; }
        .faq-header-info p { font-size: 1.2rem; color: #666; margin-bottom: 2rem; }
        
        .faq-accordion-wrapper { border-top: 1px solid rgba(0,0,0,0.1); width: 100%; }
        .faq-row-item { border-bottom: 1px solid rgba(0,0,0,0.1); }
        .faq-btn-trigger { width: 100%; padding: 2.5rem 0; display: flex; justify-content: space-between; align-items: center; background: none; border: none; cursor: pointer; text-align: left; font-size: 1.4rem; font-weight: 700; color: #000; transition: all 0.3s; }
        .faq-btn-trigger:hover { opacity: 0.6; }
        
        .faq-custom-icon { width: 20px; height: 20px; position: relative; display: flex; align-items: center; justify-content: center; }
        .l { position: absolute; background: #000; transition: transform 0.6s cubic-bezier(0.19, 1, 0.22, 1); }
        .l-hor { width: 100%; height: 2px; }
        .l-ver { width: 2px; height: 100%; }
        
        .faq-row-item.active .l-ver { transform: rotate(90deg) scaleX(0); }
        .faq-row-item.active .l-hor { transform: rotate(180deg); }

        .faq-pane { height: 0; overflow: hidden; transition: all 0.5s cubic-bezier(0.19, 1, 0.22, 1); opacity: 0; pointer-events: none; }
        .faq-row-item.active .faq-pane { height: auto; min-height: 40px; opacity: 1; padding-bottom: 3rem; pointer-events: all; }
        .faq-pane-inner { color: #555; line-height: 1.7; font-size: 1.2rem; }

        @media (max-width: 1200px) {
          .pricing-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 768px) {
          .pricing-hero { padding: 120px 0 60px; }
          .pricing-grid { grid-template-columns: 1fr; }
          .enterprise-box { flex-direction: column; text-align: center; padding: 3.5rem 2rem; border-radius: 24px; }
          .enterprise-content h3 { font-size: 2rem; }
          .enterprise-content p { font-size: 1.05rem; }
          .hero-title { font-size: 2.8rem; }
          .hero-description { font-size: 1.1rem; }
          .faq-h { font-size: 2.2rem; }
          .faq-btn-trigger { font-size: 1.1rem; }
          .pricing-main { padding: 60px 0; border-radius: 30px 30px 0 0; }
          .tabs-container { flex-wrap: wrap; }
          .cta-link-btn { padding: 16px 30px; font-size: 0.95rem; }
        }
        @media (max-width: 480px) {
          .pricing-hero { padding: 100px 0 40px; }
          .hero-title { font-size: 2rem; }
          .hero-description { font-size: 1rem; }
          .pricing-main { padding: 45px 0; border-radius: 20px 20px 0 0; }
          .pricing-controls { margin-bottom: 2.5rem; }
          .tabs-container { padding: 5px; gap: 3px; }
          .pricing-tab { padding: 8px 14px; font-size: 0.65rem; }
          .pricing-grid { gap: 1.2rem; }
          .pricing-card { padding: 2.5rem 1.5rem; border-radius: 1.5rem; }
          .price { font-size: 2.2rem; }
          .plan-name { font-size: 0.75rem; letter-spacing: 0.12rem; margin-bottom: 0.8rem; }
          .plan-features li { font-size: 0.85rem; margin-bottom: 0.8rem; }
          .plan-features { margin-bottom: 2.5rem; }
          .enterprise-section { padding: 45px 0; }
          .enterprise-box { padding: 2.5rem 1.2rem; border-radius: 20px; gap: 2rem; }
          .enterprise-content h3 { font-size: 1.6rem; }
          .enterprise-content p { font-size: 0.95rem; }
          .cta-link-btn { padding: 14px 24px; font-size: 0.85rem; gap: 6px; }
          .pricing-faq { padding: 60px 0; }
          .faq-h { font-size: 1.8rem; }
          .faq-header-info p { font-size: 0.95rem; }
          .faq-btn-trigger { font-size: 0.95rem; padding: 1.5rem 0; }
          .faq-pane-inner { font-size: 0.95rem; }
        }
      `}</style>
    </div>
  )
}

export default PricingContent
