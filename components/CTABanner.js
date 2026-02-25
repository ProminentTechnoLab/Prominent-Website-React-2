'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiArrowRight } from 'react-icons/fi'

export default function CTABanner({
  variant = 'primary',
  title = 'Ready to Grow Your Business Digitally?',
  subtitle = "Let's build something remarkable together. Get a free consultation from our expert team.",
  btnText = 'Get a Free Quote',
  btnLink = '/contact',
  secondBtnText = 'View Our Services',
  secondBtnLink = '/services',
}) {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })
  const isPrimary = variant === 'primary'

  return (
    <section className={`cta-section ${isPrimary ? 'cta-primary' : 'cta-dark'}`} ref={ref}>
      <div className="cta-blob cta-blob-1" />
      <div className="cta-blob cta-blob-2" />

      <div className="container">
        <motion.div
          className="cta-inner"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="cta-text">
            <h2 className="cta-title">{title}</h2>
            {subtitle && <p className="cta-subtitle">{subtitle}</p>}
          </div>
          <div className="cta-actions">
            <Link href={btnLink} className="btn btn-primary">
              {btnText} <FiArrowRight />
            </Link>
            {secondBtnText && (
              <Link href={secondBtnLink} className="btn btn-outline">
                {secondBtnText} <FiArrowRight />
              </Link>
            )}
          </div>
        </motion.div>
      </div>

      <style>{`
        .cta-section { padding: 80px 0; position: relative; overflow: hidden; }
        .cta-primary { background: var(--gradient-primary); }
        .cta-dark { background: var(--gradient-dark); }
        .cta-blob { position: absolute; border-radius: 50%; filter: blur(70px); opacity: 0.15; pointer-events: none; }
        .cta-blob-1 { width:400px;height:400px;background:var(--orange);top:-150px;right:-100px; }
        .cta-blob-2 { width:300px;height:300px;background:#3b82f6;bottom:-100px;left:-80px; }
        .cta-inner { display: flex; align-items: center; justify-content: space-between; gap: 40px; flex-wrap: wrap; position: relative; z-index: 1; }
        .cta-text { flex: 1; min-width: 280px; }
        .cta-title { font-family: var(--font-heading); font-size: clamp(1.4rem, 2.5vw, 2rem); font-weight: 700; color: white; line-height: 1.3; margin-bottom: 8px; }
        .cta-subtitle { font-size: 0.95rem; color: rgba(255,255,255,0.65); line-height: 1.7; }
        .cta-actions { display: flex; gap: 14px; flex-wrap: wrap; flex-shrink: 0; }
        @media (max-width: 768px) { .cta-inner { flex-direction: column; text-align: center; } .cta-actions { justify-content: center; } }
      `}</style>
    </section>
  )
}
