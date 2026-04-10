'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { IoCheckmark, IoClose } from 'react-icons/io5'

const Pricing = () => {
  const [tab, setTab] = useState('Website Design')
  const cats = ['Website Design', 'Remote Hiring', 'Mobile App', 'Digital Marketing']

  const plans = {
    'Website Design': [
      { name: 'Starter', price: '$199', period: 'One Time', popular: false, features: ['5 Dynamic Pages', 'Responsive Design', 'Basic SEO', '1 Month Support', { text: 'Free Domain & Hosting', ok: false }] },
      { name: 'Professional', price: '$349', period: 'One Time', popular: true, features: ['10 Dynamic Pages', 'Premium Design', 'Advanced SEO', '3 Months Support', 'Free Domain & Hosting', 'Admin Panel'] },
      { name: 'Business', price: '$599', period: 'One Time', popular: false, features: ['Unlimited Pages', 'Custom UI/UX', 'SEO & Speed Fix', '6 Months Support', 'Free Domain & Hosting', 'CMS Integration', 'E-commerce Ready'] }
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

  return (
    <section className="pr-section">
      <div className="pr-inner">
        <h2 className="pr-title">Pricing plans</h2>

        <div className="pr-tabs">
          {cats.map(c => (
            <button key={c} className={`pr-tab ${tab === c ? 'active' : ''}`} onClick={() => setTab(c)}>{c}</button>
          ))}
        </div>

        <div className="pr-grid">
          {plans[tab].map(p => (
            <div key={p.name} className={`pr-card ${p.popular ? 'popular' : ''}`}>
              {p.popular && <div className="pr-badge">Popular</div>}
              <div className="pr-card-head">
                <span className="pr-plan-name">{p.name}</span>
                <div className="pr-price-row">
                  <span className="pr-price">{p.price}</span>
                  <span className="pr-period">{p.period}</span>
                </div>
              </div>
              <ul className="pr-features">
                {p.features.map((f, i) => {
                  const isObj = typeof f === 'object'
                  const text = isObj ? f.text : f
                  const ok = isObj ? f.ok : true
                  return (
                    <li key={i} className={ok ? '' : 'disabled'}>
                      {ok ? <IoCheckmark className="ck" /> : <IoClose className="xk" />}
                      {text}
                    </li>
                  )
                })}
              </ul>
              <Link href="/contact/" className="pr-btn">Choose Plan</Link>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .pr-section {
          background: #000;
          color: #fff;
          padding: 120px 0;
          border-radius: 30px 30px 0 0;
        }
        .pr-inner { max-width: 1400px; margin: 0 auto; padding: 0 40px; }
        .pr-title {
          font-size: clamp(3rem, 5.5vw, 5rem);
          font-weight: 500;
          color: #fff;
          margin-bottom: 50px;
          letter-spacing: -0.03em;
        }

        .pr-tabs {
          display: flex;
          gap: 32px;
          margin-bottom: 50px;
          border-bottom: 1px solid rgba(255,255,255,0.1);
          padding-bottom: 20px;
          flex-wrap: wrap;
        }
        .pr-tab {
          background: none;
          border: none;
          color: rgba(255,255,255,0.3);
          font-size: 0.9rem;
          font-weight: 500;
          cursor: pointer;
          transition: color 0.3s;
          padding: 0;
        }
        .pr-tab:hover, .pr-tab.active { color: #fff; }

        .pr-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          background: rgba(255,255,255,0.08);
          border-radius: 20px;
          overflow: hidden;
        }
        .pr-card {
          background: #000;
          padding: 40px 32px;
          display: flex;
          flex-direction: column;
          position: relative;
        }
        .pr-badge {
          position: absolute;
          top: 14px;
          right: 14px;
          background: #fff;
          color: #000;
          font-size: 0.6rem;
          font-weight: 600;
          padding: 5px 12px;
          border-radius: 100px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        .pr-card-head { margin-bottom: 32px; }
        .pr-plan-name {
          font-size: 0.7rem;
          font-weight: 500;
          color: rgba(255,255,255,0.4);
          text-transform: uppercase;
          letter-spacing: 0.15em;
          display: block;
          margin-bottom: 12px;
        }
        .pr-price-row { display: flex; align-items: baseline; gap: 6px; }
        .pr-price { font-size: 2.5rem; font-weight: 500; color: #fff; letter-spacing: -0.03em; }
        .pr-period { font-size: 0.75rem; color: rgba(255,255,255,0.3); font-weight: 500; }

        .pr-features {
          list-style: none;
          flex: 1;
          margin-bottom: 32px;
        }
        .pr-features li {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px 0;
          font-size: 0.9rem;
          color: rgba(255,255,255,0.7);
          font-weight: 400;
        }
        .pr-features li.disabled { opacity: 0.3; text-decoration: line-through; }
        .ck { color: #4ade80; font-size: 1rem; flex-shrink: 0; }
        .xk { color: rgba(255,255,255,0.3); font-size: 1rem; flex-shrink: 0; }

        .pr-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 14px 0;
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 100px;
          color: #fff;
          text-decoration: none;
          font-size: 0.9rem;
          font-weight: 500;
          transition: all 0.4s var(--ease-expo);
        }
        .pr-btn:hover { background: #fff; color: #000; border-color: #fff; }

        @media (max-width: 1024px) {
          .pr-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 768px) {
          .pr-section { padding: 80px 0; border-radius: 20px 20px 0 0; }
          .pr-inner { padding: 0 20px; }
          .pr-grid { grid-template-columns: 1fr; border-radius: 16px; }
          .pr-card { padding: 32px 24px; }
          .pr-tabs { gap: 16px; }
        }
        @media (max-width: 480px) {
          .pr-section { padding: 60px 0; border-radius: 16px 16px 0 0; }
          .pr-inner { padding: 0 16px; }
          .pr-price { font-size: 2rem; }
        }
      `}</style>
    </section>
  )
}

export default Pricing
