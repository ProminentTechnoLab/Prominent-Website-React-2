'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import {
  FiArrowRight, FiCheckCircle,
  FiMonitor, FiSmartphone, FiLayout, FiShoppingCart, FiCreditCard, FiTrendingUp,
} from 'react-icons/fi'

const tabs = [
  {
    id: 'web',
    label: 'Website Development',
    Icon: FiMonitor,
    heading: 'Custom Website Development',
    desc: 'We build scalable, secure, and SEO-friendly websites that perform beautifully across all devices. Our team leverages the latest frameworks to deliver exceptional digital experiences.',
    features: ['Custom WordPress Development', 'Custom Web Applications', 'E-Commerce Website Development', 'Landing Page & Corporate Sites', 'API Integration & Development', 'Website Maintenance & Support'],
    link: '/services/website-development',
  },
  {
    id: 'mobile',
    label: 'Mobile App',
    Icon: FiSmartphone,
    heading: 'Mobile App Development',
    desc: 'From native iOS/Android to cross-platform Flutter apps, we create mobile applications that deliver exceptional user experiences and help businesses expand their reach.',
    features: ['Flutter Cross-Platform Apps', 'React Native Development', 'iOS App Development', 'Android App Development', 'App UI/UX Design', 'App Store & Play Store Optimization'],
    link: '/services/mobile-app-development',
  },
  {
    id: 'uiux',
    label: 'UI/UX Design',
    Icon: FiLayout,
    heading: 'User Experience & Interface Design',
    desc: 'We create stunning, intuitive designs that communicate your brand value clearly. Every pixel is purposeful — from wireframes to high-fidelity Figma prototypes.',
    features: ['Website & App UI Design', 'UX Research & User Testing', 'Wireframing & Prototyping', 'Brand Identity Design', 'Logo Design', 'Responsive Mobile Design'],
    link: '/services/ui-ux-design',
  },
  {
    id: 'cms',
    label: 'CMS & E-Commerce',
    Icon: FiShoppingCart,
    heading: 'CMS & E-Commerce Solutions',
    desc: 'We build powerful e-commerce platforms and content management systems that are easy to use, scalable, and tailored to your business operations.',
    features: ['WooCommerce Development', 'Shopify Store Setup & Customization', 'Custom CMS Development', 'Multi-Vendor Marketplace', 'Product Catalog Management', 'Inventory & Order Management'],
    link: '/services/cms-ecommerce',
  },
  {
    id: 'payment',
    label: 'Payment & Shipping API',
    Icon: FiCreditCard,
    heading: 'Payment & Shipping API Integration',
    desc: 'Streamline your checkout and fulfillment process with seamless payment gateway and shipping API integrations — supporting all major providers.',
    features: ['Stripe & PayPal Integration', 'Razorpay & PayU Integration', 'UPI Integration', 'Shiprocket & Delhivery Integration', 'Subscription & Recurring Payments', 'COD & EMI Payment Options'],
    link: '/services/payment-shipping-api',
  },
  {
    id: 'marketing',
    label: 'Digital Marketing',
    Icon: FiTrendingUp,
    heading: 'Digital Marketing Services',
    desc: 'We help you reach your target audience through data-driven marketing strategies — from SEO to paid ads — and convert visitors into loyal customers.',
    features: ['Search Engine Optimization (SEO)', 'Google Ads (PPC) Management', 'Facebook & Instagram Ads', 'Social Media Marketing', 'Content Writing & Strategy', 'Graphic Design for Campaigns'],
    link: '/services/digital-marketing',
  },
]

export default function ServicesSection() {
  const [activeTab, setActiveTab] = useState('web')
  const [ref, inView] = useInView({ threshold: 0.08, triggerOnce: true })
  const current = tabs.find(t => t.id === activeTab)
  const CurrentIcon = current.Icon

  return (
    <section className="section-pad bg-light" ref={ref}>
      <div className="container">
        <div className="section-header">
          <div className="section-badge">Our Expertise</div>
          <h2 className="section-title">Services We <span>Provide</span></h2>
          <p className="section-subtitle">Comprehensive digital solutions under one roof — choose the service that fits your needs.</p>
        </div>

        {/* Tab Navigation */}
        <motion.div className="tab-nav" initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          {tabs.map(t => {
            const TIcon = t.Icon
            return (
              <button key={t.id} className={`tab-btn ${activeTab === t.id ? 'active' : ''}`} onClick={() => setActiveTab(t.id)}>
                <TIcon size={14} />
                {t.label}
              </button>
            )
          })}
        </motion.div>

        {/* Tab Panel */}
        <motion.div key={activeTab} className="tab-panel" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <div className="tab-panel-inner">
            <div>
              <h3 className="tab-panel-heading">{current.heading}</h3>
              <p className="tab-panel-desc">{current.desc}</p>
              <ul className="tab-features">
                {current.features.map(f => (
                  <li key={f}><FiCheckCircle color="#FF6600" size={17} /><span>{f}</span></li>
                ))}
              </ul>
              <Link href={current.link} className="btn btn-primary" style={{ marginTop: 28 }}>Explore More <FiArrowRight /></Link>
            </div>
            <div className="tab-panel-visual">
              <div className="tab-visual-card">
                <div className="tab-visual-icon"><CurrentIcon size={56} color="rgba(255,102,0,0.9)" /></div>
                <h4>{current.heading}</h4>
                <p>End-to-end solutions tailored for your business</p>
                <div className="tab-visual-stats">
                  <div><strong>30+</strong><span>Happy Clients</span></div>
                  <div><strong>99%</strong><span>Satisfaction</span></div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`
        .tab-nav { display: flex; gap: 10px; flex-wrap: wrap; justify-content: center; margin-bottom: 40px; }
        .tab-btn { padding: 10px 18px; border-radius: var(--radius-full); font-size: 0.84rem; font-weight: 600; color: var(--gray-600); background: white; border: 1.5px solid var(--gray-200); cursor: pointer; transition: var(--transition); display: inline-flex; align-items: center; gap: 6px; }
        .tab-btn:hover { color: var(--orange); border-color: var(--orange); }
        .tab-btn.active { background: var(--orange); color: white; border-color: var(--orange); box-shadow: var(--shadow-orange); }
        .tab-panel { background: white; border-radius: var(--radius-xl); padding: 50px; box-shadow: var(--shadow-md); border: 1px solid var(--gray-100); }
        .tab-panel-inner { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; }
        .tab-panel-heading { font-family: var(--font-heading); font-size: 1.6rem; font-weight: 700; color: var(--primary); margin-bottom: 14px; }
        .tab-panel-desc { font-size: 0.93rem; color: var(--gray-600); line-height: 1.8; margin-bottom: 24px; }
        .tab-features { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .tab-features li { display: flex; align-items: flex-start; gap: 8px; font-size: 0.87rem; color: var(--gray-700); font-weight: 500; }
        .tab-visual-card { background: var(--gradient-primary); border-radius: var(--radius-xl); padding: 40px; color: white; text-align: center; }
        .tab-visual-icon { display: flex; align-items: center; justify-content: center; margin-bottom: 16px; }
        .tab-visual-card h4 { font-family: var(--font-heading); font-size: 1.1rem; font-weight: 700; margin-bottom: 8px; }
        .tab-visual-card p { font-size: 0.85rem; opacity: 0.7; margin-bottom: 28px; line-height: 1.6; }
        .tab-visual-stats { display: flex; justify-content: center; gap: 40px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.15); }
        .tab-visual-stats div { display: flex; flex-direction: column; gap: 3px; }
        .tab-visual-stats strong { font-family: var(--font-heading); font-size: 1.6rem; font-weight: 800; color: var(--orange); }
        .tab-visual-stats span { font-size: 0.72rem; opacity: 0.6; text-transform: uppercase; }
        @media (max-width: 900px) { .tab-panel { padding: 28px 20px; } .tab-panel-inner { grid-template-columns: 1fr; } .tab-panel-visual { display: none; } .tab-features { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  )
}
