'use client'

import React from 'react'
import Link from 'next/link'
import { IoArrowForward } from 'react-icons/io5'
import TextReveal from './animations/TextReveal'
import LiquidButton from './animations/LiquidButton'

const QualityServices = () => {
  const services = [
    {
      id: "01",
      title: "Website Development",
      desc: "Creating high-performance, responsive websites with cutting-edge technologies like React and Next.js.",
      tags: ["React", "Next.js", "Tailwind", "Node.js"],
      path: "/services/website-development/",
      image: "/images/website-development.png"
    },
    {
      id: "02",
      title: "Mobile App Development",
      desc: "Building intuitive cross-platform mobile applications using Flutter and React Native for iOS and Android.",
      tags: ["Flutter", "React Native", "iOS", "Android"],
      path: "/services/mobile-app-development/",
      image: "/images/mobile-app-development.png"
    },
    {
      id: "03",
      title: "UI/UX Design",
      desc: "Immersive user experiences through research, wireframing, and high-fidelity prototypes.",
      tags: ["Figma", "UX Research", "Prototyping", "Design Systems"],
      path: "/services/ui-ux-design/",
      image: "/images/ui-ux-design.png"
    },
    {
      id: "04",
      title: "CMS & E-commerce",
      desc: "Scalable online stores with seamless payment integration and optimized user journeys.",
      tags: ["Shopify", "WooCommerce", "Magento", "Headless"],
      path: "/services/cms-ecommerce/",
      image: "/images/cms-e-commerce.png"
    },
    {
      id: "05",
      title: "Digital Marketing",
      desc: "Driving growth through data-backed SEO strategies, PPC, and targeted social media campaigns.",
      tags: ["SEO", "PPC", "Analytics", "Social Media"],
      path: "/services/digital-marketing/",
      image: "/images/digital-marketing.png"
    },
    {
      id: "06",
      title: "Payment & Shipping API",
      desc: "Robust API integrations for payments and logistics to streamline your business operations.",
      tags: ["Stripe", "Razorpay", "FedEx", "PayPal"],
      path: "/services/payment-shipping-api/",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=800&q=80"
    }
  ]

  return (
    <section className="quality-services section">
      <div className="container">
        <div className="section-header">
          <div className="badge">What We Do Best</div>
          <h2 className="section-h">
            <TextReveal>Transforming Ideas Into</TextReveal>
            <TextReveal delay={0.2} className="accent-text">Service Excellence</TextReveal>
          </h2>
        </div>

        <div className="services-list">
          {services.map((s, i) => (
            <div key={s.id} className={`service-row ${i % 2 !== 0 ? 'reverse' : ''}`}>
              <div className="service-image-col">
                <div className="service-image-wrap">
                  <img src={s.image} alt={s.title} className="service-img" loading="lazy" />
                  <div className="image-overlay"></div>
                </div>
              </div>
              <div className="service-content-col">
                <h3 className="service-title">{s.title}</h3>
                <p className="service-desc">{s.desc}</p>
                <div className="service-features-mini">
                  {s.tags.map(tag => (
                    <span key={tag} className="feature-dot">{tag}</span>
                  ))}
                </div>
                <div className="cta-wrap">
                  <Link href={s.path} className="btn-text">
                    Learn More <IoArrowForward className="arrow" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      <style>{`
        .quality-services {
          position: relative;
          z-index: 5;
          padding: 10vw 0;
        }
        .section-header {
          margin-bottom: 5rem;
          text-align: left;
        }
        .section-h {
          font-size: clamp(3rem, 6vw, 5.5rem);
          color: #fff; /* Changed to white */
          max-width: 1000px;
          line-height: 0.95;
          letter-spacing: -0.03em;
          text-transform: uppercase;
        }
        .accent-text {
          color: #fff; /* Changed to white */
          opacity: 0.15; /* Adjusted for dark */
          display: block;
        }

        .services-list {
          display: flex;
          flex-direction: column;
          gap: 8vw;
        }

        .service-row {
          display: flex;
          align-items: center;
          gap: 8vw;
          opacity: 0.8;
          transition: opacity 0.5s ease;
        }
        .service-row:hover {
          opacity: 1;
        }
        .service-row.reverse {
          flex-direction: row-reverse;
        }

        .service-image-col {
          flex: 1.2;
          position: relative;
        }
        .service-image-wrap {
          aspect-ratio: 16/10;
          background: rgba(255,255,255,0.03); /* Dark theme bg */
          border-radius: 30px;
          overflow: hidden;
          position: relative;
          transition: transform 0.8s var(--ease-expo);
          box-shadow: 0 20px 40px rgba(0,0,0,0.2);
        }
        .service-row:hover .service-image-wrap {
          transform: translateY(-10px) scale(1.02);
        }
        .service-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 1.2s var(--ease-expo);
        }
        .service-row:hover .service-img {
          transform: scale(1.1);
        }
        .image-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, transparent, rgba(0,0,0,0.4));
        }

        .service-content-col {
          flex: 1;
          max-width: 500px;
        }
        .service-title {
          font-size: clamp(2.2rem, 4vw, 3.5rem);
          line-height: 1;
          font-weight: 800;
          letter-spacing: -0.04em;
          margin-bottom: 2rem;
          text-transform: uppercase;
          color: #fff; /* Changed to white */
        }
        .service-desc {
          font-size: 1.15rem;
          color: #aaa; /* Lighter for dark theme */
          margin-bottom: 3rem;
          line-height: 1.5;
        }
        .service-features-mini {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 3rem;
        }
        
        .feature-dot {
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #eee;
          background: rgba(255, 255, 255, 0.08);
          padding: 8px 18px;
          border-radius: 100px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          transition: all 0.4s cubic-bezier(0.19, 1, 0.22, 1);
          position: relative;
          cursor: default;
        }
        
        .quality-services .service-features-mini .feature-dot:hover {
          background: var(--brand-orange) !important;
          border-color: var(--brand-orange) !important;
          color: #ffffff !important;
          transform: translateY(-8px);
          box-shadow: 0 10px 25px rgba(255, 102, 0, 0.4);
        }

        .cta-wrap {
          margin-top: 1rem;
        }
        .btn-text {
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 1.1rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #fff; /* Changed to white */
          text-decoration: none !important;
          display: inline-flex;
          align-items: center;
          gap: 12px;
          position: relative;
          padding-bottom: 4px;
          transition: color 0.4s ease;
        }
        .btn-text::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background: var(--brand-orange);
          transition: width 0.4s var(--ease-expo);
        }
        .btn-text:hover {
          color: var(--brand-orange) !important;
        }
        .btn-text:hover::after {
          width: 100%;
        }
        .arrow {
          font-size: 1.2rem;
          transition: transform 0.4s var(--ease-expo), color 0.4s ease;
        }
        .btn-text:hover .arrow {
          transform: translateX(8px);
          color: var(--brand-orange);
        }

        .view-all-wrap {
          margin-top: 10vw;
          display: flex;
          justify-content: center;
        }

        @media (max-width: 1024px) {
          .service-row, .service-row.reverse {
            flex-direction: column !important;
            gap: 3rem;
          }
          .service-image-col { width: 100%; }
          .service-content-col {
            max-width: 100%;
            text-align: left;
          }
        }
        @media (max-width: 768px) {
          .quality-services { padding: 8vw 0; }
          .section-header { margin-bottom: 3rem; }
          .services-list { gap: 6vw; }
          .service-title { font-size: 1.8rem; }
          .service-desc { font-size: 1rem; margin-bottom: 1.5rem; }
          .service-features-mini { margin-bottom: 2rem; }
          .service-image-wrap { border-radius: 24px; }
        }
        @media (max-width: 480px) {
          .quality-services { padding: 10vw 0; }
          .section-header { margin-bottom: 2rem; }
          .services-list { gap: 8vw; }
          .service-title { font-size: 1.5rem; margin-bottom: 1.2rem; }
          .service-desc { font-size: 0.95rem; margin-bottom: 1.2rem; line-height: 1.4; }
          .service-features-mini { gap: 6px; margin-bottom: 1.5rem; }
          .feature-dot { font-size: 0.65rem; padding: 5px 12px; }
          .service-image-wrap { border-radius: 18px; }
          .btn-text { font-size: 0.9rem; }
        }
      `}</style>
    </section>
  )
}

export default QualityServices
