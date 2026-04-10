'use client'

import React from 'react'
import Link from 'next/link'
import { IoCheckmarkCircle, IoRocketOutline, IoCodeSlashOutline, IoColorPaletteOutline, IoSearchOutline } from 'react-icons/io5'
import TextReveal from './animations/TextReveal'
import MagneticButton from './animations/MagneticButton'
import SERVICE_CONFIGS from './serviceConfigs'

const icons = {
  'website-development': <IoCodeSlashOutline />,
  'mobile-app-development': <IoRocketOutline />,
  'digital-marketing': <IoSearchOutline />,
  'cms-ecommerce': <IoCheckmarkCircle />,
  'payment-shipping-api': <IoCheckmarkCircle />,
  'ui-ux-design': <IoColorPaletteOutline />,
}

const ServicePageLayout = ({ slug }) => {
  const config = SERVICE_CONFIGS[slug]
  
  if (!config) return <div className="section container text-center">Service not found</div>

  const transformedConfig = {
    category: config.badge,
    title: config.heroTitle,
    desc: config.heroSubtitle,
    slug: slug,
    longDesc: config.overviewDesc,
    features: config.offers.map(o => ({ title: o.title, desc: o.desc })),
    technologies: config.technologies.map(t => t.name)
  }

  const c = transformedConfig

  return (
    <div className="service-detail-page">
      {/* Hero */}
      <section className="service-hero section">
        <div className="container">
          <div className="badge">{c.category}</div>
          <h1 className="hero-h">
            <TextReveal>{c.title}</TextReveal>
          </h1>
          <p className="hero-p">{c.desc}</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="service-main section">
        <div className="container">
          <div className="service-grid">
            <div className="service-info-col">
              <div className="service-visual">
                <div className="icon-main">{icons[c.slug] || <IoRocketOutline />}</div>
                <div className="glow"></div>
              </div>
              
              <h2 className="service-section-h">Why It Matters</h2>
              <p className="service-text">{c.longDesc}</p>
              
              <div className="cta-box">
                <h4>Transform your business</h4>
                <MagneticButton strength={15}>
                  <Link href="/contact/" className="btn btn-primary">Start Building</Link>
                </MagneticButton>
              </div>
            </div>

            <div className="service-features-col">
              <h3 className="features-h">Key Features</h3>
              <div className="features-grid">
                {c.features.map((f, i) => (
                  <div key={i} className="feature-item-card">
                    <IoCheckmarkCircle className="check-icon" />
                    <div>
                      <h4>{f.title}</h4>
                      <p>{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="tech-stack-list">
                <h4 className="tech-h">Technologies Used</h4>
                <div className="tech-pills">
                  {c.technologies.map(t => (
                    <span key={t} className="tech-pill-small">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .service-detail-page { 
          background: var(--bg-primary); 
        }
        .badge { display: none !important; }
        
        .service-hero { 
          text-align: left; 
          padding-top: 13vh; 
          margin-bottom: 4vw;
        }
        .hero-h { 
          font-size: clamp(3.5rem, 8vw, 8rem); 
          color: #000; 
          margin-bottom: 4rem; 
          line-height: 0.9;
          letter-spacing: -0.04em;
          text-transform: uppercase;
          font-weight: 500;
        }
        .hero-p { 
          font-size: 1.4rem; 
          color: #444; 
          max-width: 900px; 
          line-height: 1.4;
          opacity: 0.8;
        }

        .service-main {
          padding-top: 5vw;
        }

        .service-grid {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 8vw;
          align-items: flex-start;
          border-top: 1px solid rgba(0,0,0,0.06);
          padding-top: 8vw;
        }

        .service-visual {
          position: relative;
          width: 80px;
          height: 80px;
          margin-bottom: 4rem;
        }
        .icon-main {
          width: 100%;
          height: 100%;
          color: var(--brand-orange);
          font-size: 3rem;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          z-index: 2;
          opacity: 0.5;
        }

        .service-section-h { 
          font-size: 3rem; 
          color: #000; 
          margin-bottom: 2.5rem; 
          line-height: 1; 
          font-weight: 700;
          letter-spacing: -0.03em;
          text-transform: uppercase;
        }
        .service-text { 
          font-size: 1.2rem; 
          color: #555; 
          line-height: 1.5; 
          margin-bottom: 3rem; 
          opacity: 0.8;
        }

        .cta-box {
           background: var(--bg-primary);
          padding: 3rem;
          border: 1px solid rgba(0,0,0,0.04);
          border-radius: 20px;
        }
        .cta-box h4 { 
          color: #000; 
          font-size: 1.5rem; 
          margin-bottom: 2rem; 
          text-transform: uppercase; 
          letter-spacing: 0.1em;
          font-weight: 800;
        }

        .features-h { 
          font-size: 0.8rem; 
          color: var(--text-muted); 
          margin-bottom: 3rem; 
          text-transform: uppercase; 
          letter-spacing: 0.2em; 
          font-weight: 700;
        }
        .features-grid { 
          display: flex; 
          flex-direction: column; 
          margin-bottom: 6rem; 
          border-top: 1px solid rgba(0,0,0,0.06);
        }
        .feature-item-card {
          padding: 3rem 0;
          border-bottom: 1px solid rgba(0,0,0,0.06);
          display: flex;
          gap: 30px;
          transition: 0.6s var(--ease-expo);
        }
        .feature-item-card:hover { 
          background: rgba(255,255,255,0.02);
          padding-left: 20px;
        }
        .check-icon { 
          font-size: 2rem; 
          color: #000; 
          opacity: 0.1;
          flex-shrink: 0; 
        }
        .feature-item-card h4 { 
          color: #000; 
          margin-bottom: 15px; 
          font-size: 2rem; 
          font-weight: 700;
          letter-spacing: -0.02em;
        }
        .feature-item-card p { 
          color: #555; 
          font-size: 1.1rem; 
          line-height: 1.4;
          opacity: 0.8;
        }

        .tech-h { 
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: var(--text-muted); 
          margin-bottom: 2rem; 
          font-weight: 700;
        }
        .tech-pills { display: flex; flex-wrap: wrap; gap: 15px; }
        .tech-pill-small {
          background: transparent;
          border: 1px solid rgba(0,0,0,0.1);
          padding: 10px 24px;
          color: #000;
          font-size: 0.8rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          opacity: 0.5;
          transition: 0.3s;
        }
        .tech-pill-small:hover {
          opacity: 1;
          background: #000;
          color: #fff;
        }

        @media (max-width: 1200px) {
          .hero-h { font-size: 5rem; }
        }
        @media (max-width: 1024px) {
          .service-grid { grid-template-columns: 1fr; gap: 60px; }
          .service-info-col { text-align: left; }
          .cta-box { text-align: left; }
        }
        @media (max-width: 768px) {
          .service-hero { padding-top: 11vh; margin-bottom: 2vw; }
          .hero-h { font-size: 3rem; }
          .hero-p { font-size: 1.1rem; }
          .feature-item-card h4 { font-size: 1.4rem; }
          .feature-item-card { gap: 20px; padding: 2.5rem 0; }
          .feature-item-card p { font-size: 0.95rem; }
          .service-section-h { font-size: 2.2rem; margin-bottom: 1.5rem; }
          .service-text { font-size: 1.05rem; margin-bottom: 2.5rem; }
          .cta-box { padding: 2.5rem; }
          .cta-box h4 { font-size: 1.1rem; }
          .service-grid { padding-top: 6vw; }
        }
        @media (max-width: 480px) {
          .service-hero { padding-top: 9vh; margin-bottom: 1vw; }
          .hero-h { font-size: 2.2rem; margin-bottom: 2rem; }
          .hero-p { font-size: 1rem; }
          .service-grid { gap: 35px; padding-top: 5vw; }
          .feature-item-card { gap: 14px; padding: 2rem 0; }
          .feature-item-card h4 { font-size: 1.2rem; margin-bottom: 8px; }
          .feature-item-card p { font-size: 0.9rem; }
          .check-icon { font-size: 1.3rem; }
          .features-grid { margin-bottom: 3rem; }
          .service-section-h { font-size: 1.8rem; }
          .service-text { font-size: 0.95rem; }
          .cta-box { padding: 2rem 1.5rem; border-radius: 16px; }
          .cta-box h4 { font-size: 1rem; margin-bottom: 1.2rem; }
          .tech-pills { gap: 8px; }
          .tech-pill-small { padding: 7px 14px; font-size: 0.7rem; }
        }
      `}</style>
    </div>
  )
}

export default ServicePageLayout
