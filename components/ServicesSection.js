'use client'

import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { IoArrowForward } from 'react-icons/io5'

const ServicesSection = () => {
  const sectionRef = useRef(null)
  const [activeIdx, setActiveIdx] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 1024)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const services = [
    { title: "Website Development", desc: "Creating high-performance, responsive websites with cutting-edge technologies like React and Next.js.", path: "/services/website-development/", image: "/images/website-development.png" },
    { title: "Mobile App Development", desc: "Building intuitive cross-platform mobile applications using Flutter and React Native.", path: "/services/mobile-app-development/", image: "/images/mobile-app-development.png" },
    { title: "UI/UX Design", desc: "Immersive user experiences through research, wireframing, and high-fidelity prototypes.", path: "/services/ui-ux-design/", image: "/images/ui-ux-design.png" },
    { title: "CMS & E-commerce", desc: "Scalable online stores with seamless payment integration and optimized user journeys.", path: "/services/cms-ecommerce/", image: "/images/cms-e-commerce.png" },
    { title: "Digital Marketing", desc: "Driving growth through data-backed SEO strategies, PPC, and targeted social media campaigns.", path: "/services/digital-marketing/", image: "/images/digital-marketing.png" },
    { title: "Payment & Shipping API", desc: "Robust API integrations for payments and logistics to streamline operations.", path: "/services/payment-shipping-api/", image: "/images/payment-shipping-api.png" }
  ]

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      gsap.fromTo('.ss-row', { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, stagger: 0.06, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section className="ss-section" ref={sectionRef}>
      <div className="ss-inner">
        <div className="ss-header">
          <h2 className="ss-title">What we do</h2>
        </div>

        <div className="ss-list">
          {services.map((s, i) => {
            const isActive = isMobile || activeIdx === i
            return (
              <div key={s.title} className={`ss-row ${isActive ? 'active' : ''}`}
                onMouseEnter={() => !isMobile && setActiveIdx(i)}>
                <Link href={s.path} className="ss-row-link">
                  <span className="ss-row-title">{s.title}</span>
                  <span className="ss-row-arrow"><IoArrowForward /></span>
                </Link>
                {/* Expanding content on active */}
                <div className="ss-row-body">
                  <div className="ss-row-body-inner">
                    <div className="ss-row-content">
                      <p className="ss-row-desc">{s.desc}</p>
                    </div>
                    <div className="ss-row-img-wrap">
                      <Image src={s.image} alt={s.title} fill style={{ objectFit: 'contain' }} />
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <style>{`
        /* Cuberto-style services list on light bg */
        .ss-section {
          background: var(--bg-primary);
          padding: 120px 0 60px;
        }
        .ss-inner {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 40px;
        }
        .ss-header { margin-bottom: 60px; }
        .ss-title {
          font-size: clamp(3rem, 5.5vw, 5rem);
          font-weight: 500;
          color: #000;
          letter-spacing: -0.03em;
        }

        .ss-list {
          border-top: 1px solid rgba(0,0,0,0.1);
        }
        .ss-row {
          border-bottom: 1px solid rgba(0,0,0,0.1);
          transition: background 0.5s ease;
        }
        .ss-row-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 32px 0;
          text-decoration: none;
          color: #000;
        }
        .ss-row-title {
          font-size: clamp(1.5rem, 3vw, 2.5rem);
          font-weight: 500;
          letter-spacing: -0.02em;
          transition: opacity 0.3s ease;
        }
        .ss-row:not(.active) .ss-row-title { opacity: 0.35; }
        .ss-row.active .ss-row-title { opacity: 1; }

        .ss-row-arrow {
          font-size: 1.2rem;
          opacity: 0;
          transform: rotate(-45deg) translateX(-10px);
          transition: all 0.4s var(--ease-expo);
        }
        .ss-row.active .ss-row-arrow {
          opacity: 1;
          transform: rotate(-45deg) translateX(0);
        }

        /* Expanding body */
        .ss-row-body {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 0.6s var(--ease-expo);
        }
        .ss-row.active .ss-row-body { grid-template-rows: 1fr; }
        .ss-row-body-inner {
          overflow: hidden;
          opacity: 0;
          transition: opacity 0.4s ease 0.1s;
        }
        .ss-row.active .ss-row-body-inner { opacity: 1; }

        .ss-row-content {
          display: flex;
          gap: 40px;
          padding: 0 0 32px;
        }
        .ss-row-desc {
          font-size: 1.05rem;
          color: #666;
          max-width: 500px;
          line-height: 1.5;
        }
        .ss-row-img-wrap {
          position: relative;
          width: 200px;
          height: 150px;
          flex-shrink: 0;
          border-radius: 12px;
          overflow: hidden;
        }

        @media (max-width: 1024px) {
          .ss-row .ss-row-body { grid-template-rows: 1fr !important; }
          .ss-row .ss-row-body-inner { opacity: 1 !important; }
          .ss-row .ss-row-title { opacity: 1 !important; }
          .ss-row .ss-row-arrow { opacity: 1 !important; transform: rotate(-45deg) translateX(0) !important; }
          .ss-row-content { flex-direction: column; gap: 20px; }
          .ss-row-img-wrap { width: 100%; height: 180px; }
        }
        @media (max-width: 768px) {
          .ss-section { padding: 80px 0 40px; }
          .ss-inner { padding: 0 20px; }
          .ss-header { margin-bottom: 40px; }
          .ss-row-link { padding: 24px 0; }
        }
        @media (max-width: 480px) {
          .ss-section { padding: 60px 0 30px; }
          .ss-inner { padding: 0 16px; }
          .ss-row-title { font-size: 1.2rem; }
          .ss-row-desc { font-size: 0.9rem; }
          .ss-row-img-wrap { height: 140px; }
        }
      `}</style>
    </section>
  )
}

export default ServicesSection
