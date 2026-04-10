'use client'

import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

const QualityServices = () => {
  const sectionRef = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      gsap.fromTo('.os-title',
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
        }
      )
      gsap.fromTo('.os-subtitle',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
        }
      )
      gsap.utils.toArray('.os-card').forEach((card) => {
        gsap.fromTo(card, { y: 80, opacity: 0 }, {
          y: 0, opacity: 1, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 90%' }
        })
      })
      gsap.fromTo('.os-view-all',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '.os-view-all', start: 'top 92%' }
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section className="os-section" ref={sectionRef}>
      <div className="os-inner">
        {/* Header */}
        <h2 className="os-title">Our services</h2>
        <p className="os-subtitle">
          From intuitive design to scalable development — we craft and build digital products for the future.
        </p>

        {/* Cuberto exact zigzag: LEFT → RIGHT → LEFT alternating */}
        <div className="os-grid">
          {/* Left Column — Card 1 + Card 3 */}
          <div className="os-col os-col-left">
            <div className="os-card">
              <div className="os-card-img">
                <img src="/images/ui-ux-design.png" alt="Design & Experience" loading="lazy" />
              </div>
              <h3 className="os-card-title">Design &amp; Experience</h3>
              <p className="os-card-desc">
                Interfaces that adapt, engage, and respond intelligently — crafted with precision and purpose.
              </p>
            </div>

            <div className="os-card">
              <div className="os-card-img">
                <img src="/images/digital-marketing.png" alt="Digital Marketing" loading="lazy" />
              </div>
              <h3 className="os-card-title">Digital Marketing</h3>
              <p className="os-card-desc">
                Data-driven SEO, PPC, and social strategies — engineered for measurable growth.
              </p>
            </div>
          </div>

          {/* Right Column — Card 2, offset down */}
          <div className="os-col os-col-right">
            <div className="os-card">
              <div className="os-card-img">
                <img src="/images/website-development.png" alt="Custom Development" loading="lazy" />
              </div>
              <h3 className="os-card-title">Custom development</h3>
              <p className="os-card-desc">
                Frontend + backend + mobile integrations — built for performance and scalability.
              </p>
            </div>
          </div>
        </div>

        {/* View all services button — centered */}
        <div className="os-view-all">
          <Link href="/services/" className="os-btn">
            <span className="os-btn-text-wrapper">
              <span className="os-btn-text-old">View all services</span>
              <span className="os-btn-text-new">View all services</span>
            </span>
          </Link>
        </div>
      </div>

      <style>{`
        .os-section {
          background: #000;
          color: #fff;
          border-radius: 30px 30px 0 0;
          padding: 120px 0 100px;
          position: relative;
          z-index: 5;
          margin-top: -10px;
        }
        .os-inner {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 80px;
        }

        /* ═══ Header — Cuberto exact ═══ */
        .os-title {
          font-size: clamp(3rem, 5.5vw, 5rem);
          font-weight: 500;
          color: #fff;
          letter-spacing: -0.03em;
          margin-bottom: 24px;
        }
        .os-subtitle {
          font-size: clamp(0.88rem, 1.1vw, 1rem);
          font-weight: 400;
          color: rgba(255,255,255,0.5);
          line-height: 1.5;
          max-width: 360px;
          margin-bottom: 60px;
        }

        /* ═══ Zigzag Grid — Cuberto exact ═══
           Left col: 1 card (higher)
           Right col: 2 cards (offset ~140px down)
           Creates the natural S-curve zigzag */
        .os-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0 40px;
        }

        .os-col-left {
          /* Left column starts at natural position */
        }

        .os-col-right {
          /* Right column is pushed down — Cuberto signature stagger */
          margin-top: 140px;
        }

        /* ═══ Card ═══ */
        .os-card {
          margin-bottom: 60px;
        }

        .os-card-img {
          width: 100%;
          aspect-ratio: 1 / 1;
          border-radius: 16px;
          overflow: hidden;
          background: #111;
          margin-bottom: 20px;
        }
        .os-card-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.8s cubic-bezier(0.19, 1, 0.22, 1);
        }
        .os-card:hover .os-card-img img {
          transform: scale(1.04);
        }

        .os-card-title {
          font-size: clamp(1.3rem, 2vw, 1.75rem);
          font-weight: 500;
          color: #fff;
          letter-spacing: -0.02em;
          margin-bottom: 10px;
          line-height: 1.2;
        }
        .os-card-desc {
          font-size: clamp(0.88rem, 1vw, 0.98rem);
          font-weight: 400;
          color: rgba(255,255,255,0.45);
          line-height: 1.5;
          max-width: 380px;
        }

        /* ═══ View All Services Button — Cuberto pill ═══ */
        .os-view-all {
          text-align: center;
          margin-top: 40px;
        }
        .os-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 18px 38px;
          border: 1.5px solid #fff;
          border-radius: 100px;
          background: transparent;
          color: #fff;
          font-family: var(--font-main);
          font-size: 17px;
          font-weight: 400;
          text-decoration: none;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: border-color 1s cubic-bezier(0.19, 1, 0.22, 1);
        }
        .os-btn::before {
          content: '';
          position: absolute;
          top: 100%; left: -50%;
          width: 200%; height: 300%;
          background: #fff;
          border-radius: 50%;
          transform: translateY(0);
          transition: transform 1s cubic-bezier(0.19, 1, 0.22, 1);
          z-index: 0;
        }
        .os-btn:hover::before { transform: translateY(-60%); }
        .os-btn:hover { border-color: #fff; }
        .os-btn-text-wrapper {
          position: relative; z-index: 1;
          display: inline-flex; overflow: hidden;
          padding-bottom: 1px;
        }
        .os-btn-text-old {
          display: inline-block; color: #fff;
          transition: transform 1s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.15s ease-out;
        }
        .os-btn-text-new {
          position: absolute; top: 100%; left: 0; width: 100%;
          text-align: center; color: #000; display: inline-block;
          transition: transform 1s cubic-bezier(0.19, 1, 0.22, 1);
        }
        .os-btn:hover .os-btn-text-old { transform: translateY(-100%); opacity: 0; }
        .os-btn:hover .os-btn-text-new { transform: translateY(-100%); }

        /* ═══ Responsive ═══ */
        @media (max-width: 1024px) {
          .os-inner { padding: 0 50px; }
          .os-col-right { margin-top: 100px; }
          .os-card-img { border-radius: 14px; }
        }
        @media (max-width: 768px) {
          .os-section { border-radius: 20px 20px 0 0; padding: 80px 0 60px; }
          .os-inner { padding: 0 24px; }
          .os-grid { grid-template-columns: 1fr; }
          .os-col-right { margin-top: 0; }
          .os-subtitle { margin-bottom: 40px; }
          .os-card-img { border-radius: 14px; }
          .os-card { margin-bottom: 50px; }
          .os-view-all { margin-top: 20px; }
          .os-btn { padding: 16px 32px; font-size: 15px; }
        }
        @media (max-width: 480px) {
          .os-section { border-radius: 16px 16px 0 0; padding: 60px 0 40px; }
          .os-inner { padding: 0 16px; }
          .os-card-img { border-radius: 12px; }
          .os-card { margin-bottom: 40px; }
          .os-btn { padding: 14px 28px; font-size: 14px; }
        }
      `}</style>
    </section>
  )
}

export default QualityServices
