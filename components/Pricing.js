'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { IoCheckmark } from 'react-icons/io5'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

const Pricing = () => {
  const [tab, setTab] = useState('Website Design')
  const sectionRef = useRef(null)
  const gridRef = useRef(null)
  
  const cats = ['Website Design', 'Remote Hiring', 'Mobile App', 'Digital Marketing']

  const plans = {
    'Website Design': [
      { name: 'Starter', price: '$199', period: 'One Time', popular: false, features: ['5 Dynamic Pages', 'Responsive Design', 'Basic SEO', '1 Month Support', 'Clean UI Layout'] },
      { name: 'Professional', price: '$349', period: 'One Time', popular: true, features: ['10 Dynamic Pages', 'Premium Design', 'Advanced SEO', '3 Months Support', 'Free Domain & Hosting', 'Admin Panel'] },
      { name: 'Business', price: '$599', period: 'One Time', popular: false, features: ['Unlimited Pages', 'Custom UI/UX', 'SEO & Speed Fix', '6 Months Support', 'CMS Integration', 'E-commerce Ready'] }
    ],
    'Remote Hiring': [
      { name: 'Junior Dev', price: '$449', period: '/month', features: ['Dedicated Developer', 'Daily Updates', 'Quality Assurance', 'Project Management'] },
      { name: 'Mid Dev', price: '$699', period: '/month', popular: true, features: ['Dedicated UI Specialist', 'Code Review', 'Cloud Deployment', '24/7 Support', 'Senior Oversight'] },
      { name: 'Senior Dev', price: '$1,199', period: '/month', features: ['Architect Level Dev', 'Fullstack Expertise', 'Tech Consulting', 'Priority Support', 'Team Lead Access'] }
    ],
    'Mobile App': [
      { name: 'Basic App', price: '$649', period: 'Starting', features: ['Flutter/React Native', 'Basic Features', 'App Store Prep', '1 Month Support'] },
      { name: 'Pro App', price: '$1,299', period: 'Starting', popular: true, features: ['Custom Logic', 'Firebase/Laravel API', 'Push Notifications', '3 Months Support', 'Play/App Store Deploy'] }
    ],
    'Digital Marketing': [
      { name: 'Essential', price: '$129', period: '/month', features: ['SEO Analysis', 'Social Media Management', '5 Creatives/mo', 'Basic Reporting'] },
      { name: 'Growth', price: '$249', period: '/month', popular: true, features: ['Full SEO Service', 'PPC Management', '15 Creatives/mo', 'Content Strategy', 'Monthly Strategy Call'] }
    ]
  }

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    
    // Staggered entry for cards on tab change
    const cards = gridRef.current.querySelectorAll('.pr-card')
    gsap.fromTo(cards, 
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: 'power3.out', overwrite: true }
    )
  }, [tab])

  return (
    <section className="pr-section" ref={sectionRef}>
      <div className="pr-inner">
        <div className="pr-header">
          <div className="pr-title-wrap">
            <h2 className="pr-title">Pricing plans</h2>
          </div>
          <div className="pr-subtext">
            Transparent pricing for businesses of all sizes. Choose a plan that fits your growth ambitions.
          </div>
        </div>

        <nav className="pr-tabs-nav">
          <div className="pr-tabs-container">
            {cats.map(c => (
              <button 
                key={c} 
                className={`pr-tab-btn ${tab === c ? 'active' : ''}`} 
                onClick={() => setTab(c)}
              >
                {c}
                {tab === c && <span className="tab-indicator" />}
              </button>
            ))}
          </div>
        </nav>

        <div className="pr-grid" ref={gridRef}>
          {plans[tab].map(p => (
            <div key={p.name} className={`pr-card ${p.popular ? 'popular' : ''}`}>
              {p.popular && <div className="popular-tag">Most Popular</div>}
              
              <div className="pr-card-head">
                <span className="plan-label">{p.name}</span>
                <div className="price-box">
                  <span className="currency">$</span>
                  <span className="amount">{p.price.replace('$', '')}</span>
                  <span className="period">{p.period}</span>
                </div>
              </div>

              <div className="pr-features-wrap">
                <ul className="pr-feature-list">
                  {p.features.map((f, i) => (
                    <li key={i}>
                      <span className="check-icon"><IoCheckmark /></span>
                      <span className="feature-text">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pr-card-footer">
                <Link href="/contact/" className="pr-action-btn">
                  <span className="btn-inner">
                    <span className="btn-text-old">Get Started</span>
                    <span className="btn-text-new">Get Started</span>
                  </span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .pr-section {
          background-color: #ffffff;
          padding: 120px 0 160px;
          color: #000000;
          border-top-left-radius: 80px;
          border-top-right-radius: 80px;
          margin-top: -80px; 
          position: relative;
          z-index: 15;
        }

        .pr-inner {
          width: 100%;
          max-width: 1440px;
          margin: 0 auto;
          padding: 0 5vw;
        }

        .pr-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 80px;
          padding: 0 0;
        }

        .pr-title {
          flex: 1;
          font-size: clamp(3.2rem, 5.5vw, 5.2rem);
          font-weight: 500;
          line-height: 1.05;
          letter-spacing: -0.04em;
          margin: 0;
        }

        .pr-subtext {
          flex: 1;
          max-width: 420px;
          font-size: clamp(1.1rem, 1.4vw, 1.25rem);
          line-height: 1.5;
          color: #666666;
          margin-top: 10px;
        }

        /* Tabs Styling */
        .pr-tabs-nav {
          margin-bottom: 60px;
          border-bottom: 1px solid #eeeeee;
        }
        .pr-tabs-container {
          display: flex;
          gap: 40px;
        }
        .pr-tab-btn {
          background: none;
          border: none;
          padding: 20px 0;
          font-size: 0.95rem;
          font-weight: 500;
          color: #999999;
          cursor: pointer;
          position: relative;
          transition: color 0.3s ease;
        }
        .pr-tab-btn:hover {
          color: #000000;
        }
        .pr-tab-btn.active {
          color: #000000;
        }
        .tab-indicator {
          position: absolute;
          bottom: -1px;
          left: 0;
          width: 100%;
          height: 2px;
          background: #000000;
        }

        /* Grid & Cards */
        .pr-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
        }

        .pr-card {
          background: #ffffff;
          border: 1px solid #eeeeee;
          padding: 50px 40px;
          border-radius: 32px;
          display: flex;
          flex-direction: column;
          position: relative;
          transition: all 0.5s cubic-bezier(0.19, 1, 0.22, 1);
        }
        .pr-card:hover {
          border-color: #000000;
          transform: translateY(-8px);
          box-shadow: 0 30px 60px rgba(0,0,0,0.06);
        }

        .popular-tag {
          position: absolute;
          top: 24px;
          right: 24px;
          background: #000000;
          color: #ffffff;
          font-size: 0.7rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          padding: 6px 14px;
          border-radius: 100px;
        }

        .pr-card-head {
          margin-bottom: 40px;
        }
        .plan-label {
          display: block;
          font-size: 0.85rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #999999;
          margin-bottom: 15px;
        }
        .price-box {
          display: flex;
          align-items: baseline;
        }
        .currency {
          font-size: 1.5rem;
          font-weight: 500;
          margin-right: 4px;
          transform: translateY(-10px);
        }
        .amount {
          font-size: 4rem;
          font-weight: 500;
          letter-spacing: -0.02em;
        }
        .period {
          font-size: 0.9rem;
          color: #999999;
          margin-left: 10px;
        }

        .pr-features-wrap {
          flex: 1;
          margin-bottom: 50px;
        }
        .pr-feature-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .pr-feature-list li {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
          font-size: 1rem;
          color: #333333;
        }
        .check-icon {
          color: #000000;
          display: flex;
          font-size: 1.1rem;
        }

        /* Liquid Fill Button - Light Theme Version */
        .pr-action-btn {
          display: flex;
          width: 100%;
          justify-content: center;
          padding: 18px 0;
          border: 1px solid #000000;
          border-radius: 100px;
          text-decoration: none;
          font-size: 1rem;
          font-weight: 500;
          color: #000000;
          position: relative;
          overflow: hidden;
          background: transparent;
          transition: border-color 0.4s ease;
        }
        .pr-action-btn::before {
          content: '';
          position: absolute;
          top: 100%;
          left: -50%;
          width: 200%;
          height: 300%;
          background: #000000;
          border-radius: 50%;
          transition: transform 0.6s cubic-bezier(0.19, 1, 0.22, 1);
          z-index: 0;
        }
        .pr-action-btn:hover::before {
          transform: translateY(-66%);
        }
        
        .btn-inner {
          position: relative;
          z-index: 1;
          display: inline-flex;
          overflow: hidden;
          height: 1.2em;
        }
        .btn-text-old {
          display: inline-block;
          transition: transform 0.6s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.3s ease;
        }
        .btn-text-new {
          position: absolute;
          top: 100%;
          left: 0;
          width: 100%;
          text-align: center;
          color: #ffffff;
          transition: transform 0.6s cubic-bezier(0.19, 1, 0.22, 1);
        }
        .pr-action-btn:hover .btn-text-old {
          transform: translateY(-100%);
          opacity: 0;
        }
        .pr-action-btn:hover .btn-text-new {
          transform: translateY(-100%);
        }

        /* Responsive */
        @media (max-width: 1280px) {
          .pr-grid { grid-template-columns: repeat(2, 1fr); }
          .pr-card:last-child { grid-column: span 2; }
          /* Reset if 2 cols */
          .pr-grid .pr-card:nth-child(2).popular { grid-column: auto; }
        }

        @media (max-width: 1024px) {
          .pr-header { flex-direction: column; gap: 20px; }
          .pr-tabs-container { overflow-x: auto; padding-bottom: 0; }
          .pr-tab-btn { white-space: nowrap; }
        }

        @media (max-width: 768px) {
          .pr-section { padding: 80px 0; }
          .pr-grid { grid-template-columns: 1fr; }
          .pr-card:last-child { grid-column: auto; }
          .pr-card { padding: 40px 30px; }
          .pr-title { font-size: 3rem; }
          .amount { font-size: 3rem; }
        }
      `}</style>
    </section>
  )
}

export default Pricing
