'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { IoCheckmarkCircle, IoCloseCircle } from 'react-icons/io5'
import TextReveal from './animations/TextReveal'
import LiquidButton from './animations/LiquidButton'

const Pricing = () => {
  const [activeTab, setActiveTab] = useState('Website Design')

  const categories = ['Website Design', 'Remote Hiring', 'Mobile App', 'Digital Marketing']

  const plans = {
    'Website Design': [
      { name: 'Starter', price: '$199', period: 'One Time', popular: false, features: ['5 Dynamic Pages', 'Responsive Design', 'Basic SEO', '1 Month Support', { text: 'Free Domain & Hosting', included: false }] },
      { name: 'Professional', price: '$349', period: 'One Time', popular: true, features: ['10 Dynamic Pages', 'Premium Design', 'Advanced SEO', '3 Months Support', 'Free Domain & Hosting', 'Admin Panel'] },
      { name: 'Business', price: '$599', period: 'One Time', popular: false, features: ['Unlimited Pages', 'Custom UI/UX', 'SEO & Speed Fix', '6 Months Support', 'Free Domain & Hosting', 'CMS Integration', 'E-commerce Ready'] }
    ],
    'Remote Hiring': [
      { name: 'Junior Dev', price: '$449', period: 'per month', features: ['Dedicate Developer', 'Daily Updates', 'Quality Assurance', 'Project Management', { text: 'Senior Oversight', included: false }] },
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

  return (
    <section className="pricing section">
      <div className="container">
        <div className="section-header-centered">
          <div className="badge">Flexible Pricing</div>
          <h2 className="section-h">
            <TextReveal>Transparent Plans for</TextReveal>
            <TextReveal delay={0.2} className="accent-text">Every Scale</TextReveal>
          </h2>
        </div>

        {/* Tab Switcher */}
        <div className="pricing-tabs">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`tab-btn ${activeTab === cat ? 'active' : ''}`}
              onClick={() => setActiveTab(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Pricing Cards */}
        <div className="pricing-grid">
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

              <ul className="plan-features">
                {plan.features.map((f, i) => {
                  const isObject = typeof f === 'object'
                  const text = isObject ? f.text : f
                  const included = isObject ? f.included : true
                  return (
                    <li key={i} className={included ? '' : 'disabled'}>
                      {included ? <IoCheckmarkCircle className="check" /> : <IoCloseCircle className="uncheck" />}
                      <span className="feature-text">{text}</span>
                    </li>
                  )
                })}
              </ul>

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

      <style>{`
        .pricing {
          background: #000000;
          padding: 8vw 0;
        }
        .section-header-centered { 
          text-align: left; 
          margin-bottom: 4rem; 
        }
        .section-h { 
          font-size: clamp(3rem, 6vw, 5.5rem); 
          color: #fff !important; /* Changed to white */
          line-height: 0.95;
          letter-spacing: -0.04em;
          text-transform: uppercase;
        }
        .accent-text { 
          color: #fff;
          opacity: 0.15; 
          display: block;
        }

        .pricing-tabs {
          display: flex;
          justify-content: flex-start;
          gap: 24px;
          margin-bottom: 4rem;
          flex-wrap: wrap;
          border-top: 1px solid rgba(255,255,255,0.1);
          padding-top: 1.5rem;
        }
        .tab-btn {
          padding: 0;
          background: transparent;
          border: none;
          color: #fff; /* Changed to white */
          opacity: 0.4;
          font-size: 1rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          cursor: pointer;
          transition: 0.4s var(--ease-expo);
          position: relative;
        }
        .tab-btn::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 0;
          height: 2px;
          background: #fff;
          transition: 0.4s var(--ease-expo);
        }
        .tab-btn:hover, .tab-btn.active {
          opacity: 1;
        }
        .tab-btn.active::after {
          width: 100%;
        }

        .pricing-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          margin-top: 2rem;
        }

        .pricing-card {
          background: #111;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 2.5rem;
          padding: 4rem 2.5rem;
          position: relative;
          transition: all 0.6s var(--ease-expo);
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        .pricing-card:hover {
          background: #fff; /* Flip to white on hover */
          transform: translateY(-15px);
          box-shadow: 0 30px 60px rgba(255,255,255,0.1);
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
          padding: 8px 16px;
          letter-spacing: 0.1em;
          border-bottom-left-radius: 1.5rem;
        }

        .card-head { margin-bottom: 3rem; text-align: left; }
        .plan-name { 
          font-size: 0.9rem; 
          color: #aaa !important; /* Lighter for dark */
          margin-bottom: 1.5rem; 
          text-transform: uppercase;
          letter-spacing: 0.2rem;
          font-weight: 800;
          transition: color 0.4s;
        }
        .pricing-card:hover .plan-name,
        .section-dark .pricing-card:hover .plan-name,
        .pricing-card:hover .feature-text,
        .section-dark .pricing-card:hover .feature-text { 
          color: #000000 !important;
          opacity: 0.8 !important; /* Increased for better visibility */
        }
        .price-wrap { color: #fff; transition: color 0.4s; display: flex; align-items: baseline; gap: 4px; }
        .pricing-card:hover .price-wrap,
        .section-dark .pricing-card:hover .price-wrap,
        .pricing-card:hover .price,
        .section-dark .pricing-card:hover .price,
        .pricing-card:hover .period,
        .section-dark .pricing-card:hover .period { 
          color: #000000 !important; 
        }
        .price { font-size: 3rem; font-weight: 700; letter-spacing: -0.04em; }
        .period { font-size: 0.8rem; opacity: 0.4; text-transform: uppercase; font-weight: 700; }

        .plan-features {
          list-style: none;
          margin-bottom: 4rem;
          flex: 1;
        }
        .plan-features li {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 1.2rem;
          color: #eee; /* Lighter for dark theme */
          font-size: 0.95rem;
          transition: all 0.4s;
        }
        .pricing-card:hover .plan-features li,
        .section-dark .pricing-card:hover .plan-features li { 
          color: #000000 !important; 
        }
        
        .plan-features .check { color: var(--brand-orange); font-size: 1.2rem; transition: color 0.4s; }
        .pricing-card:hover .plan-features .check { color: #000000 !important; }
        
        .plan-features .uncheck { font-size: 1.2rem; color: #ff4d4d; opacity: 0.8; transition: all 0.4s; }
        .pricing-card:hover .plan-features .uncheck { color: #000000 !important; opacity: 1; }

        .plan-features li.disabled { 
          opacity: 0.3; 
          text-decoration: line-through;
        }
        .pricing-card:hover .plan-features li.disabled { 
          opacity: 0.4 !important; 
          color: #000000 !important;
        }

        .card-footer {
          margin-top: auto;
          display: flex;
          justify-content: center;
          width: 100%;
        }
        .plan-btn {
          width: 100%;
          justify-content: center;
          font-size: 0.85rem;
          font-weight: 800;
          padding: 1.2rem;
          border-radius: 1rem;
        }

        .pricing-card .btn-outline {
          border: 1px solid #fff;
          color: #fff;
        }
        .pricing-card:hover .fast-btn {
          background: #000 !important;
          border-color: #000 !important;
        }
        .pricing-card:hover .btn-content,
        .pricing-card:hover .btn-content * {
          color: #fff !important;
        }
        
        /* Ensure popular card button stays orange on card hover but maybe changes liquid color */
        .pricing-card.popular:hover .fast-btn {
          background: var(--brand-orange) !important;
          border-color: var(--brand-orange) !important;
        }

        @media (max-width: 1024px) {
          .pricing-grid { grid-template-columns: repeat(2, 1fr); gap: 1.5rem; }
        }
        @media (max-width: 768px) {
          .pricing-grid { grid-template-columns: 1fr; gap: 1.5rem; }
          .pricing-card { padding: 3rem 2rem; }
          .pricing-tabs { gap: 12px; }
          .section-header-centered { margin-bottom: 3rem; }
        }
        @media (max-width: 480px) {
          .pricing { padding: 12vw 0; }
          .pricing-card { padding: 2.5rem 1.5rem; border-radius: 1.5rem; }
          .price { font-size: 2.2rem; }
          .plan-name { font-size: 0.75rem; letter-spacing: 0.12rem; margin-bottom: 0.8rem; }
          .plan-features li { font-size: 0.85rem; margin-bottom: 0.8rem; }
          .plan-features { margin-bottom: 2.5rem; }
          .section-header-centered { margin-bottom: 2.5rem; }
          .pricing-tabs { gap: 8px; margin-bottom: 3rem; }
          .tab-btn { font-size: 0.8rem; }
        }
      `}</style>
    </section>
  )
}

export default Pricing
