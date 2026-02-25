'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import { FiArrowRight, FiCheckCircle, FiX } from 'react-icons/fi'

// Use Rs. for currency to avoid encoding issues; or HTML entity below
const USD = () => <span>$</span>

const tabs = [
  { id: 'web', label: 'Website Design' },
  { id: 'remote', label: 'Remote Hiring' },
  { id: 'mobile', label: 'Mobile App' },
  { id: 'marketing', label: 'Digital Marketing' },
]

const plans = {
  web: [
    {
      name: 'Basic', price: '69', period: 'package', popular: false,
      features: ['Up to 5 Pages', 'Responsive Design', 'Contact Form', 'Basic SEO Setup', 'Social Media Links', 'Free Domain (1 Year)', '1 Month Support', { text: 'Custom Animations', crossed: true }, { text: 'E-Commerce Integration', crossed: true }],
    },
    {
      name: 'Standard', price: '129', period: 'package', popular: true,
      features: ['Up to 15 Pages', 'Responsive Design', 'Contact & Enquiry Forms', 'On-Page SEO Optimization', 'Admin Panel (CMS)', 'Free Domain + Hosting (1 Year)', 'Blog Integration', 'Google Analytics Setup', '3 Months Support'],
    },
    {
      name: 'Premium', price: '239', period: 'package', popular: false,
      features: ['Unlimited Pages', 'Custom UI/UX Design', 'E-Commerce Integration', 'Advanced SEO Setup', 'Payment Gateway Integration', 'Free Domain + Premium Hosting', 'Custom Animations', 'Speed Optimization', '6 Months Support'],
    },
  ],
  remote: [
    {
      name: 'Laravel / PHP', price: '15', period: 'per hour', popular: false,
      features: ['Dedicated Developer', 'Agile Workflow', 'Daily Progress Report', 'Code via GitHub', 'Email Support', 'Technical Architecture', 'Git + CI/CD Setup', 'Slack / Teams Support'],
    },
    {
      name: 'React / Next.js', price: '16', period: 'per hour', popular: true,
      features: ['Expert React Developer', 'State Management', 'Performance Tuning', 'Daily Standups & Reports', 'Code Review Included', 'Technical Architecture', 'Git + CI/CD Setup', 'Slack / Teams Support'],
    },
    {
      name: 'Node / Python / Mobile', price: '18', period: 'per hour', popular: false,
      features: ['Specialist Developer', 'Complex Logic / Backend', 'API Security', 'Daily Standups & Reports', 'Code Review Included', 'Technical Architecture', 'Git + CI/CD Setup', 'Slack / Teams Support'],
    },
  ],
  mobile: [
    {
      name: 'Native (iOS/Android)', price: '359', period: 'per app', popular: false,
      features: ['Single Platform', 'Up to 10 Screens', 'Material / HIG Design', 'Push Notifications', 'App Store / Play Store', '1 Month Support', { text: 'Multi-platform', crossed: true }, { text: 'Advanced API', crossed: true }],
    },
    {
      name: 'Flutter / React Native', price: '499', period: 'per app', popular: true,
      features: ['Both iOS + Android', 'Up to 15 Screens', 'Custom UI/UX Design', 'Backend API Integration', 'Push Notifications', 'Store Optimization', 'Cross-platform Efficiency', '3 Months Support'],
    },
    {
      name: 'Enterprise App', price: '899', period: 'per app', popular: false,
      features: ['iOS + Android (Hybrid/Native)', 'Unlimited Screens', 'Real-time Features', 'Complex Backend / CMS', 'Scalable Architecture', 'Biometric Auth', 'In-App Purchases', '6 Months Support'],
    },
  ],
  marketing: [
    {
      name: 'Basic', price: '299', period: 'per month', popular: false,
      features: ['Social Media Management', '10 Keywords SEO', 'Monthly Report', 'Google My Business', '2 Blog Posts', { text: 'Google Ads', crossed: true }, { text: 'Competitor Analysis', crossed: true }],
    },
    {
      name: 'Comprehensive', price: '399', period: 'per month', popular: true,
      features: ['Advanced SEO (25 Keywords)', 'SMM & Content Strategy', 'Competitor Analysis', '4 Blog Posts/Month', 'Link Building', 'Monthly Detail Reporting', 'ROI Measurement'],
    },
    {
      name: 'Premium', price: '549', period: 'per month', popular: false,
      features: ['Full Digital Strategy', 'Unlimited SEO Keywords', 'Paid Ad Management', 'Premium Backlinks', 'Weekly Reporting', 'Conversion Rate Optimization', 'Dedicated Manager'],
    },
  ],
}

import { useState } from 'react'

export default function Pricing() {
  const [activeTab, setActiveTab] = useState('web')
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true })

  return (
    <section className="section-pad" ref={ref}>
      <div className="container">
        <div className="section-header">
          <div className="section-badge">Transparent Pricing</div>
          <h2 className="section-title">Simple, Honest <span>Pricing Plans</span></h2>
          <p className="section-subtitle">No hidden fees. Choose the plan that fits your business. All plans include dedicated support.</p>
        </div>

        <div className="pricing-tabs">
          {tabs.map(t => (
            <button key={t.id} className={`pricing-tab ${activeTab === t.id ? 'active' : ''}`} onClick={() => setActiveTab(t.id)}>{t.label}</button>
          ))}
        </div>

        <motion.div key={activeTab} className="pricing-grid" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          {plans[activeTab].map((plan, i) => (
            <motion.div
              key={plan.name}
              className={`pricing-card ${plan.popular ? 'popular' : ''}`}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              {plan.popular && <div className="popular-badge">Most Popular</div>}
              <div className="plan-name">{plan.name}</div>
              <div className="plan-price">
                <span className="price-amount"><USD />{plan.price}</span>
                <span className="price-period">/{plan.period}</span>
              </div>
              <ul className="plan-features">
                {plan.features.map((f, fi) => {
                  const crossed = typeof f === 'object' && f.crossed
                  const text = typeof f === 'object' ? f.text : f
                  return (
                    <li key={fi} className={crossed ? 'feature-crossed' : ''}>
                      {crossed ? <FiX size={14} className="feature-icon-x" /> : <FiCheckCircle size={14} className="feature-icon-check" />}
                      {text}
                    </li>
                  )
                })}
              </ul>
              <Link href="/contact" className={`btn ${plan.popular ? 'btn-primary' : 'btn-outline-navy'}`} style={{ width: '100%', justifyContent: 'center', marginTop: 'auto' }}>
                Get Started <FiArrowRight />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style>{`
        .pricing-tabs { display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; margin-bottom: 44px; }
        .pricing-tab { padding: 10px 24px; border-radius: var(--radius-full); font-size: 0.88rem; font-weight: 600; cursor: pointer; border: 1.5px solid var(--gray-200); background: white; color: var(--gray-600); transition: var(--transition); }
        .pricing-tab:hover { color: var(--orange); border-color: var(--orange); }
        .pricing-tab.active { background: var(--orange); color: white; border-color: var(--orange); box-shadow: var(--shadow-orange); }
        .pricing-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px; align-items: start; }
        .pricing-card { background: white; border-radius: var(--radius-xl); padding: 36px; border: 1.5px solid var(--gray-100); box-shadow: var(--shadow-card); position: relative; display: flex; flex-direction: column; transition: var(--transition); }
        .pricing-card:hover { transform: translateY(-6px); box-shadow: var(--shadow-card-hover); }
        .pricing-card.popular { border-color: var(--orange); box-shadow: 0 10px 40px rgba(255,102,0,0.18); }
        .popular-badge { position: absolute; top: -14px; left: 50%; transform: translateX(-50%); background: var(--orange); color: white; font-size: 0.72rem; font-weight: 700; padding: 5px 16px; border-radius: var(--radius-full); letter-spacing: 0.5px; white-space: nowrap; }
        .plan-name { font-family: var(--font-heading); font-size: 0.85rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: var(--gray-400); margin-bottom: 14px; }
        .plan-price { margin-bottom: 28px; }
        .price-amount { font-family: var(--font-heading); font-size: 2.3rem; font-weight: 800; color: var(--primary); }
        .price-period { font-size: 0.85rem; color: var(--gray-400); margin-left: 4px; }
        .plan-features { display: flex; flex-direction: column; gap: 10px; margin-bottom: 28px; flex: 1; }
        .plan-features li { display: flex; align-items: center; gap: 8px; font-size: 0.87rem; color: var(--gray-700); }
        .feature-crossed { opacity: 0.4; }
        .feature-icon-check { color: var(--orange); flex-shrink: 0; }
        .feature-icon-x { color: var(--gray-400); flex-shrink: 0; }
        @media (max-width: 900px) { .pricing-grid { grid-template-columns: 1fr; max-width: 400px; margin: 0 auto; } }
        @media (max-width: 600px) { .pricing-grid { max-width: 100%; } }
      `}</style>
    </section>
  )
}
