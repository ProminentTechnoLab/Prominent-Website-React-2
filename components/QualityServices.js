'use client'

import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

const QualityServices = () => {
  const sectionRef = useRef(null)

  const services = [
    { id: "01", title: "Website Development", desc: "Creating high-performance, responsive websites with cutting-edge technologies.", tags: ["React", "Next.js", "Node.js"], path: "/services/website-development/", image: "/images/website-development.png" },
    { id: "02", title: "Mobile App Development", desc: "Building intuitive cross-platform mobile applications for iOS and Android.", tags: ["Flutter", "React Native", "iOS"], path: "/services/mobile-app-development/", image: "/images/mobile-app-development.png" },
    { id: "03", title: "UI/UX Design", desc: "Immersive user experiences through research, wireframing, and prototypes.", tags: ["Figma", "Prototyping", "Design Systems"], path: "/services/ui-ux-design/", image: "/images/ui-ux-design.png" },
    { id: "04", title: "CMS & E-commerce", desc: "Scalable online stores with seamless payment integration.", tags: ["Shopify", "WooCommerce", "Headless"], path: "/services/cms-ecommerce/", image: "/images/cms-e-commerce.png" },
    { id: "05", title: "Digital Marketing", desc: "Driving growth through SEO, PPC, and social media campaigns.", tags: ["SEO", "PPC", "Analytics"], path: "/services/digital-marketing/", image: "/images/digital-marketing.png" },
    { id: "06", title: "Payment & Shipping API", desc: "Robust API integrations for payments and logistics.", tags: ["Stripe", "Razorpay", "FedEx"], path: "/services/payment-shipping-api/", image: "/images/payment-shipping-api.png" }
  ]

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      // Section heading
      gsap.fromTo('.fp-heading', { y: 80, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1.2, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
      })
      // Cards stagger
      gsap.utils.toArray('.fp-card').forEach((card, i) => {
        gsap.fromTo(card, { y: 100, opacity: 0 }, {
          y: 0, opacity: 1, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 92%' }
        })
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const leftCol = services.filter((_, i) => i % 2 === 0)
  const rightCol = services.filter((_, i) => i % 2 !== 0)

  const Card = ({ s }) => (
    <Link href={s.path} className="fp-card" style={{ textDecoration: 'none' }}>
      <div className="fp-card-img">
        <img src={s.image} alt={s.title} loading="lazy" />
      </div>
      <div className="fp-card-meta">
        <strong>{s.title.split(' ')[0]}</strong> — {s.desc}
      </div>
    </Link>
  )

  return (
    <section className="fp-section" ref={sectionRef}>
      <div className="fp-inner">
        <h2 className="fp-heading">Featured services</h2>

        <div className="fp-grid">
          <div className="fp-col fp-col-left">
            {leftCol.map(s => <Card key={s.id} s={s} />)}
          </div>
          <div className="fp-col fp-col-right">
            {rightCol.map(s => <Card key={s.id} s={s} />)}
          </div>
        </div>
      </div>

      <style>{`
        /* Cuberto "Featured projects" section — black bg, rounded top */
        .fp-section {
          background: #000;
          color: #fff;
          border-radius: 30px 30px 0 0;
          padding: 120px 0 80px;
          position: relative;
          z-index: 5;
          margin-top: -10px;
        }
        .fp-inner {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 40px;
        }
        .fp-heading {
          font-size: clamp(3rem, 5.5vw, 5rem);
          font-weight: 500;
          color: #fff;
          margin-bottom: 80px;
          letter-spacing: -0.03em;
        }

        /* Staggered 2-col grid — Cuberto signature */
        .fp-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 30px;
        }
        .fp-col-right {
          margin-top: 120px;
        }

        .fp-card {
          display: block;
          margin-bottom: 40px;
          cursor: pointer;
          color: #fff;
        }
        .fp-card-img {
          width: 100%;
          aspect-ratio: 4 / 3;
          border-radius: 20px;
          overflow: hidden;
          background: #111;
          margin-bottom: 20px;
        }
        .fp-card-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.8s var(--ease-expo);
        }
        .fp-card:hover .fp-card-img img {
          transform: scale(1.05);
        }

        .fp-card-meta {
          font-size: 1rem;
          font-weight: 400;
          color: rgba(255,255,255,0.7);
          line-height: 1.4;
        }
        .fp-card-meta strong {
          color: #fff;
          font-weight: 600;
        }

        @media (max-width: 768px) {
          .fp-section { border-radius: 20px 20px 0 0; padding: 80px 0 60px; }
          .fp-grid { grid-template-columns: 1fr; }
          .fp-col-right { margin-top: 0; }
          .fp-inner { padding: 0 20px; }
          .fp-heading { margin-bottom: 50px; }
          .fp-card { margin-bottom: 30px; }
          .fp-card-img { border-radius: 16px; }
        }
        @media (max-width: 480px) {
          .fp-section { border-radius: 16px 16px 0 0; padding: 60px 0 40px; }
          .fp-inner { padding: 0 16px; }
          .fp-card-img { border-radius: 12px; }
          .fp-card-meta { font-size: 0.9rem; }
        }
      `}</style>
    </section>
  )
}

export default QualityServices
