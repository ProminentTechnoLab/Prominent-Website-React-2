'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import { FiArrowRight, FiMonitor, FiSmartphone, FiLayout, FiShoppingCart, FiCreditCard, FiTrendingUp } from 'react-icons/fi'

const services = [
  {
    id: 1,
    Icon: FiMonitor,
    title: 'Website Development',
    description: 'We craft high-performance, SEO-optimised websites using modern frameworks like React and Laravel — from corporate sites to complex web applications.',
    tags: ['React', 'Laravel', 'WordPress', 'Node.js'],
    color: '#0A2463',
    slug: 'website-development',
  },
  {
    id: 2,
    Icon: FiSmartphone,
    title: 'Mobile App Development',
    description: 'Cross-platform and native mobile apps for iOS & Android built with Flutter and React Native that users love and businesses rely on.',
    tags: ['Flutter', 'React Native', 'iOS', 'Android'],
    color: '#FF6600',
    slug: 'mobile-app-development',
  },
  {
    id: 3,
    Icon: FiLayout,
    title: 'UI/UX Design',
    description: 'We blend creativity with user psychology to design intuitive interfaces that captivate users, reduce bounce rates, and convert visitors into customers.',
    tags: ['Figma', 'User Research', 'Prototyping', 'Wireframes'],
    color: '#7c3aed',
    slug: 'ui-ux-design',
  },
  {
    id: 4,
    Icon: FiShoppingCart,
    title: 'CMS & E-Commerce',
    description: 'Future-proof online stores and content management systems built on WooCommerce, Shopify, and custom Laravel backends that scale with your business.',
    tags: ['WooCommerce', 'Shopify', 'Magento', 'Custom CMS'],
    color: '#0891b2',
    slug: 'cms-ecommerce',
  },
  {
    id: 5,
    Icon: FiCreditCard,
    title: 'Payment & Shipping APIs',
    description: 'Seamless integration of payment gateways (Stripe, Razorpay, PayPal) and shipping providers to automate your order-to-delivery pipeline.',
    tags: ['Stripe', 'Razorpay', 'PayPal', 'Shiprocket'],
    color: '#059669',
    slug: 'payment-shipping-api',
  },
  {
    id: 6,
    Icon: FiTrendingUp,
    title: 'Digital Marketing',
    description: 'Data-driven SEO, social media marketing, Google & Meta ads, and content strategies that bring measurable growth to your online presence.',
    tags: ['SEO', 'Google Ads', 'Meta Ads', 'Content'],
    color: '#d97706',
    slug: 'digital-marketing',
  },
]

export default function QualityServices() {
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true })

  return (
    <section className="section-pad" ref={ref}>
      <div className="container">
        <div className="section-header">
          <div className="section-badge">What We Offer</div>
          <h2 className="section-title">Delivering <span>Quality Services</span></h2>
          <p className="section-subtitle">
            From concept to launch, we offer a complete range of digital services to help your business thrive online.
          </p>
        </div>

        <div className="services-grid">
          {services.map((svc, i) => {
            const Icon = svc.Icon
            return (
              <motion.div
                key={svc.id}
                className="service-card"
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <div className="service-card-icon" style={{ background: svc.color + '18', color: svc.color }}>
                  <Icon size={28} />
                </div>
                <div className="service-card-accent" style={{ background: svc.color }} />
                <h3 className="service-card-title">{svc.title}</h3>
                <p className="service-card-desc">{svc.description}</p>
                <div className="service-card-tags">
                  {svc.tags.map(t => (
                    <span key={t} className="tag" style={{ background: svc.color + '12', color: svc.color }}>{t}</span>
                  ))}
                </div>
                <Link href={`/services/${svc.slug}`} className="service-card-link" style={{ color: svc.color }}>
                  Know More <FiArrowRight size={14} />
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>

      <style>{`
        .services-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px; }
        .service-card { background: white; border-radius: var(--radius-lg); padding: 32px; box-shadow: var(--shadow-card); border: 1px solid var(--gray-100); position: relative; overflow: hidden; transition: var(--transition); }
        .service-card:hover { transform: translateY(-8px); box-shadow: var(--shadow-card-hover); }
        .service-card:hover .service-card-accent { height: 4px; }
        .service-card-accent { position: absolute; bottom: 0; left: 0; right: 0; height: 3px; transition: height 0.3s ease; border-radius: 0 0 var(--radius-lg) var(--radius-lg); }
        .service-card-icon { width: 62px; height: 62px; border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; margin-bottom: 18px; }
        .service-card-title { font-family: var(--font-heading); font-size: 1.05rem; font-weight: 700; color: var(--primary); margin-bottom: 10px; }
        .service-card-desc { font-size: 0.87rem; color: var(--gray-600); line-height: 1.75; margin-bottom: 16px; }
        .service-card-tags { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 18px; }
        .tag { padding: 3px 10px; border-radius: var(--radius-full); font-size: 0.71rem; font-weight: 600; letter-spacing: 0.3px; }
        .service-card-link { display: inline-flex; align-items: center; gap: 5px; font-size: 0.85rem; font-weight: 600; transition: var(--transition); }
        .service-card-link:hover { gap: 9px; }
        @media (max-width: 1024px) { .services-grid { grid-template-columns: repeat(2,1fr); } }
        @media (max-width: 600px)  { .services-grid { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  )
}
