'use client'

import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import SERVICE_CONFIGS from './serviceConfigs'
import StretchableLine from './animations/StretchableLine'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const ServicePagePremium = ({ slug }) => {
  const config = SERVICE_CONFIGS[slug]
  const containerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Kinetic Typography: Word Split Reveal
      const splitWords = gsap.utils.toArray('.spp-word-inner')
      gsap.fromTo(splitWords, 
        { y: '110%' },
        { 
          y: '0%', 
          duration: 1.2, 
          stagger: 0.05, 
          ease: 'expo.out', 
          delay: 0.3 
        }
      )

      gsap.fromTo('.spp-hero-p', 
        { y: 40, opacity: 0 },
        { y: 0, opacity: 0.65, duration: 1.2, ease: 'power4.out', delay: 0.8 }
      )
      
      // 2. Refined Center-Mask Disclosure for Hero Image
      gsap.fromTo('.spp-visual-wrap', 
        { clipPath: 'inset(10% 20% 10% 20% round 40px)', opacity: 0, scale: 0.95 },
        { 
          clipPath: 'inset(0% 0% 0% 0% round 40px)', 
          opacity: 1, 
          scale: 1,
          duration: 1.8, 
          ease: 'expo.inOut', 
          delay: 0.4 
        }
      )

      gsap.to('.parallax-img', {
        y: -100,
        ease: 'none',
        scrollTrigger: {
          trigger: '.spp-visual-wrap',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      })

      // 3. Section reveal animations
      gsap.utils.toArray('.reveal').forEach((el) => {
        gsap.fromTo(el,
          { y: 60, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 1.2, ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none none'
            }
          }
        )
      })

      // 4. Magnetic Tech Pills Micro-Interaction
      const pills = gsap.utils.toArray('.spp-tech-pill')
      pills.forEach((pill) => {
        pill.addEventListener('mousemove', (e) => {
          const { left, top, width, height } = pill.getBoundingClientRect()
          const x = (e.clientX - left - width / 2) * 0.3
          const y = (e.clientY - top - height / 2) * 0.4
          gsap.to(pill, { x, y, duration: 0.4, ease: 'power2.out' })
        })
        pill.addEventListener('mouseleave', () => {
          gsap.to(pill, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.3)' })
        })
      })

    }, containerRef)

    return () => ctx.revert()
  }, [])

  if (!config) return <div className="spp-not-found">Service not found</div>

  const imageMap = {
    'website-development': '/images/premium/web-dev.png',
    'mobile-app-development': '/images/premium/mobile-dev.png',
    'ui-ux-design': '/images/premium/uiux.png',
    'cms-ecommerce': '/images/premium/ecommerce.png',
    'payment-shipping-api': '/images/premium/api.png',
    'digital-marketing': '/images/premium/marketing.png'
  }

  return (
    <div className="spp-container" ref={containerRef}>
      {/* Hero Section */}
      <section className="spp-hero">
        <div className="spp-inner">
          <div className="spp-hero-content">
            <h1 className="spp-hero-h">
              {config.heroTitle.split(' ').map((word, i) => (
                <span key={i} className="spp-word-wrap">
                  <span className="spp-word-inner">{word}&nbsp;</span>
                </span>
              ))}
            </h1>
            <p className="spp-hero-p">{config.heroSubtitle}</p>
          </div>
          
          <div className="spp-visual-wrap">
            <div className="spp-image-container">
              <Image 
                src={imageMap[slug] || '/images/premium/web-dev.png'} 
                alt={config.serviceName}
                fill
                className="parallax-img"
                style={{ objectFit: 'cover' }}
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Details */}
      <section className="spp-details-section">
        <div className="spp-inner">
          
          <StretchableLine color="rgba(0,0,0,0.12)" />

          {/* Overview Section */}
          <div className="spp-section-row reveal">
            <div className="spp-sticky-label-wrap">
              <div className="spp-row-label">Overview</div>
            </div>
            <div className="spp-row-content">
              <h2 className="spp-content-h">{config.overviewTitle}</h2>
              <p className="spp-content-p">{config.overviewDesc}</p>
            </div>
          </div>

          <StretchableLine color="rgba(0,0,0,0.12)" />

          {/* Capabilities Section */}
          <div className="spp-section-row reveal">
            <div className="spp-sticky-label-wrap">
              <div className="spp-row-label">Capabilities</div>
            </div>
            <div className="spp-row-content">
              <div className="spp-offers-grid">
                {config.offers.map((offer, i) => (
                  <div key={i} className="spp-offer-item">
                    <h3 className="spp-offer-h">{offer.title}</h3>
                    <p className="spp-offer-p">{offer.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <StretchableLine color="rgba(0,0,0,0.12)" />

          {/* Process Section */}
          <div className="spp-section-row reveal">
            <div className="spp-sticky-label-wrap">
              <div className="spp-row-label">Process</div>
            </div>
            <div className="spp-row-content">
               <div className="spp-process-list">
                  {config.process.map((step, i) => (
                    <div key={i} className="spp-process-item">
                        <div className="spp-process-num">0{i+1}</div>
                        <div className="spp-process-info">
                            <h4 className="spp-step-h">{step.title}</h4>
                            <p className="spp-step-p">{step.desc}</p>
                        </div>
                    </div>
                  ))}
               </div>
            </div>
          </div>

          <StretchableLine color="rgba(0,0,0,0.12)" />

          {/* Technologies Section */}
          <div className="spp-section-row reveal">
            <div className="spp-sticky-label-wrap">
              <div className="spp-row-label">Tech Stack</div>
            </div>
            <div className="spp-row-content">
               <div className="spp-tech-pills">
                  {config.technologies.slice(0, 12).map((tech, i) => (
                    <span key={i} className="spp-tech-pill">{tech.name}</span>
                  ))}
               </div>
            </div>
          </div>

        </div>
      </section>

      <style jsx>{`
        .spp-container {
          background-color: #ffffff;
          color: #000000;
          padding-bottom: 120px;
          overflow: hidden;
        }
        .spp-inner {
          max-width: 1600px;
          margin: 0 auto;
          padding: 0 12vw;
        }

        /* Hero */
        .spp-hero {
          padding-top: 180px;
          text-align: center;
        }
        .spp-hero-content {
          max-width: 1100px;
          margin: 0 auto 80px;
        }
        .spp-hero-h {
          font-size: clamp(2.5rem, 6.5vw, 5.5rem);
          font-weight: 500;
          line-height: 1.05;
          letter-spacing: -0.045em;
          margin-bottom: 24px;
        }
        .spp-word-wrap {
          display: inline-block;
          overflow: hidden;
          vertical-align: bottom;
        }
        .spp-word-inner {
          display: inline-block;
          will-change: transform;
        }
        .spp-hero-p {
          font-size: clamp(1.1rem, 1.4vw, 1.25rem);
          color: #000;
          opacity: 0.65;
          max-width: 700px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .spp-visual-wrap {
          width: 100%;
          border-radius: 40px;
          overflow: hidden;
          background: #f8f8f8;
          margin-bottom: 40px;
          will-change: clip-path, transform;
        }
        .spp-image-container {
          position: relative;
          width: 100%;
          height: 85vh;
        }
        .parallax-img {
          transform: scale(1.2);
          will-change: transform;
        }

        /* Details Section */
        .spp-details-section {
          padding: 20px 0;
        }
        .spp-section-row {
          display: grid;
          grid-template-columns: 0.6fr 2fr;
          padding: 90px 0;
        }

        /* Sticky Labels */
        .spp-sticky-label-wrap {
          position: relative;
        }
        .spp-row-label {
          position: sticky;
          top: 140px;
          font-size: 13px;
          font-weight: 600;
          text-transform: uppercase;
          color: rgba(0,0,0,0.3);
          letter-spacing: 0.1em;
          padding-top: 12px;
        }

        .spp-content-h {
          font-size: clamp(1.8rem, 3.2vw, 2.8rem);
          font-weight: 500;
          margin: 0 0 32px 0;
          line-height: 1.25;
          letter-spacing: -0.035em;
        }
        .spp-content-p {
          font-size: clamp(1.2rem, 1.8vw, 1.75rem);
          line-height: 1.45;
          color: #1a1a1a;
          margin-bottom: 0;
          max-width: 900px;
          letter-spacing: -0.015em;
        }

        /* Grid */
        .spp-offers-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 70px 60px;
        }
        .spp-offer-h {
          font-size: 1.65rem;
          font-weight: 500;
          margin-bottom: 15px;
          letter-spacing: -0.03em;
        }
        .spp-offer-p {
          font-size: 1.15rem;
          line-height: 1.6;
          color: #555;
          opacity: 0.85;
        }

        /* Process */
        .spp-process-list {
          display: flex;
          flex-direction: column;
          gap: 65px;
        }
        .spp-process-item {
          display: flex;
          gap: 45px;
        }
        .spp-process-num {
          font-size: 14px;
          color: #999;
          font-weight: 600;
          padding-top: 8px;
        }
        .spp-step-h {
          font-size: 1.8rem;
          font-weight: 500;
          margin-bottom: 12px;
          letter-spacing: -0.03em;
        }
        .spp-step-p {
           font-size: 1.15rem;
           line-height: 1.6;
           color: #555;
           max-width: 700px;
           opacity: 0.85;
        }

        /* Tech Stack */
        .spp-tech-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 15px;
        }
        .spp-tech-pill {
          padding: 14px 30px;
          border: 1px solid rgba(0,0,0,0.08);
          background: #fafafa;
          border-radius: 100px;
          font-size: 15px;
          font-weight: 500;
          color: #000;
          cursor: pointer;
          transition: border-color 0.3s ease, background 0.3s ease;
        }
        .spp-tech-pill:hover {
          border-color: #000;
          background: #fff;
          z-index: 2;
        }

        @media (max-width: 1024px) {
          .spp-inner { padding: 0 40px; }
          .spp-section-row { grid-template-columns: 1fr; gap: 20px; padding: 60px 0; }
          .spp-row-label { position: relative; top: 0; font-size: 12px; margin-bottom: 10px; }
          .spp-stats { flex-wrap: wrap; gap: 40px; }
          .spp-offers-grid { grid-template-columns: 1fr; }
          .spp-image-container { height: 60vh; }
        }

        @media (max-width: 768px) {
          .spp-hero { padding-top: 140px; }
          .spp-hero-h { font-size: 3rem; }
          .spp-visual-wrap { border-radius: 24px; }
          .spp-image-container { height: 45vh; }
          .spp-content-h { font-size: 2.1rem; }
          .spp-content-p { font-size: 1.35rem; }
          .spp-step-h { font-size: 1.6rem; }
          .spp-tech-pills { gap: 10px; }
          .spp-tech-pill { padding: 10px 22px; font-size: 14px; }
        }
      `}</style>
    </div>
  )
}

export default ServicePagePremium
