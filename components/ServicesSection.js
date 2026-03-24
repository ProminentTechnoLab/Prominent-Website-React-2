'use client'

import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { IoArrowForward, IoCheckmarkCircleOutline } from 'react-icons/io5'
import TextReveal from './animations/TextReveal'
import MagneticButton from './animations/MagneticButton'

const ServicesSection = () => {
  const sectionRef = useRef(null)
  const [activeTab, setActiveTab] = useState(0) // Default first item open
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 1024)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const services = [
    {
      id: "01",
      title: "Website Development",
      shortTitle: "Website",
      desc: "Creating high-performance, responsive websites with cutting-edge technologies like React and Next.js. We build digital platforms that drive results and scale effortlessly.",
      details: ["Custom UI/UX Design", "Next.js & React Apps", "Headless CMS Integration", "Performance Optimization"],
      path: "/services/website-development/",
      image: "/images/website-development.png", // Ensure paths are correct
      color: "#0A1128" // Deep Space Blue
    },
    {
      id: "02",
      title: "Mobile App Development",
      shortTitle: "Mobile Apps",
      desc: "Building intuitive cross-platform mobile applications using Flutter and React Native for iOS and Android.",
      details: ["iOS & Android Apps", "Cross-platform Efficiency", "Real-time Features", "App Store Deployment"],
      path: "/services/mobile-app-development/",
      image: "/images/mobile-app-development.png",
      color: "#993300" // Premium Rust Orange
    },
    {
      id: "03",
      title: "UI/UX Design",
      shortTitle: "UI/UX",
      desc: "Immersive user experiences through research, wireframing, and high-fidelity prototypes.",
      details: ["UX Research", "Visual Identity", "Prototyping", "Design Systems"],
      path: "/services/ui-ux-design/",
      image: "/images/ui-ux-design.png",
      color: "#2B1425" // Deep Maroon
    },
    {
      id: "04",
      title: "CMS & E-commerce",
      shortTitle: "Online Stores",
      desc: "Scalable online stores with seamless payment integration and optimized user journeys.",
      details: ["Store Architecture", "Payment Gateways", "Inventory Management", "Conversion UX"],
      path: "/services/cms-ecommerce/",
      image: "/images/cms-e-commerce.png",
      color: "#082833" // Midnight Teal
    },
    {
      id: "05",
      title: "Digital Marketing",
      shortTitle: "Growth",
      desc: "Driving growth through data-backed SEO strategies, PPC, and targeted social media campaigns.",
      details: ["SEO Strategy", "PPC Campaigns", "Content Marketing", "Analytics Mapping"],
      path: "/services/digital-marketing/",
      image: "/images/digital-marketing.png",
      color: "#180C24" // Deep Purple
    },
    {
      id: "06",
      title: "Payment & API",
      shortTitle: "API Systems",
      desc: "Robust API integrations for payments and logistics to streamline your business operations.",
      details: ["Stripe & Razorpay", "Global Logistics", "Custom API Flows", "Security Audits"],
      path: "/services/payment-shipping-api/",
      image: "/images/payment-shipping-api.png",
      color: "#0D2118" // Forest Black
    }
  ]

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      // Entrance Animation fix for strict opacity targeting
      gsap.fromTo('.acc-row',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.services-vertical-accordion',
            start: 'top 85%'
          }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="services-hub-id" className="services-hub-premium" ref={sectionRef}>
      <div className="container" style={{ maxWidth: '1400px' }}>
        {/* Header */}
        <div className="hub-header">
          <div className="badge">WHAT WE DO</div>
          <h1 className="hub-title">
            <TextReveal>Specialized Digital</TextReveal>
            <TextReveal delay={0.2} className="accent-text">Capabilities</TextReveal>
          </h1>
          <p className="hub-desc">
            We deliver end-to-end digital engineering that scales. Discover our specialized services tailored to elevate your business in the digital era.
          </p>
        </div>
      </div> {/* <-- PROPERLY CLOSES THE MAIN CONTAINER --> */}

      {/* Vertical Accordion - Full Width */}
      <div className="services-vertical-accordion">
          {services.map((s, index) => {
            const isActive = isMobile || activeTab === index;

            return (
              <div
                key={s.id}
                className={`acc-row ${isActive ? 'active' : ''}`}
                onMouseEnter={() => !isMobile && setActiveTab(index)}
              >
                {/* Hover Background Color Overlay - Stretches 100vw */}
                <div className="row-bg" style={{ backgroundColor: s.color }}></div>

                {/* Content bounded by container to align with header */}
                <div className="container" style={{ maxWidth: '1400px' }}>
                  {/* Visible Row Header */}
                  <div className="row-header">
                  <div className="row-num">{s.id}</div>
                  <h3 className="row-title">{s.title}</h3>
                  <div className="row-indicator">
                    <div className="indicator-line horizontal"></div>
                    <div className="indicator-line vertical"></div>
                  </div>
                </div>

                {/* Expanding Body (Grid transition for smooth height animation) */}
                <div className="row-body">
                  <div className="row-body-inner">
                    <div className="row-content-split">

                      {/* Left: Content & Links */}
                      <div className="row-text-content">
                        <p className="row-desc">{s.desc}</p>

                        <ul className="row-features">
                          {s.details.map((detail, idx) => (
                            <li key={idx}>
                              <IoCheckmarkCircleOutline className="check-icon" />
                              {detail}
                            </li>
                          ))}
                        </ul>

                        <div className="row-action">
                          <Link href={s.path} style={{ textDecoration: 'none' }} className="premium-pill-link">
                            <div className="pill-btn-wrap">
                              <span className="pill-text">Explore {s.shortTitle || "Solution"}</span>
                              <MagneticButton>
                                <div className="pill-orb">
                                  <IoArrowForward />
                                </div>
                              </MagneticButton>
                            </div>
                          </Link>
                        </div>
                      </div>

                      {/* Right: Floating Image */}
                      <div className="row-image-content">
                        <div className="image-float-wrapper">
                          <Image src={s.image} alt={s.title} fill style={{ objectFit: 'contain' }} className="acc-feat-img" />
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
                </div> {/* End inner container */}
              </div>
            )
          })}
        </div>

      <style jsx>{`
        .services-hub-premium {
          padding: 120px 0 100px;
          background: #ffffff;
          position: relative;
        }

        .hub-header {
          margin-bottom: 60px;
          max-width: 900px;
          padding: 0 2vw;
        }
        
        .hub-title {
          font-size: clamp(3.5rem, 8vw, 7.5rem);
          line-height: 0.9;
          font-weight: 800;
          letter-spacing: -0.04em;
          text-transform: uppercase;
          margin-bottom: 2.5rem;
          color: #000;
        }
        .accent-text { color: #000; opacity: 0.08; display: block; }
        .hub-desc {
          font-size: 1.3rem;
          line-height: 1.5;
          color: #666;
          max-width: 650px;
          font-weight: 500;
        }

        /* --- VERTICAL FULL WIDTH ACCORDION --- */
        .services-vertical-accordion {
          width: 100%;
          border-top: 1px solid rgba(0,0,0,0.1);
        }

        .acc-row {
          position: relative;
          border-bottom: 1px solid rgba(0,0,0,0.1);
          overflow: hidden;
          transition: box-shadow 0.6s cubic-bezier(0.19, 1, 0.22, 1), border-color 0.6s cubic-bezier(0.19, 1, 0.22, 1), background-color 0.6s cubic-bezier(0.19, 1, 0.22, 1);
          background: #ffffff;
        }
        .acc-row.active {
          z-index: 5;
          box-shadow: 0 40px 80px rgba(0,0,0,0.3);
          border-bottom-color: transparent;
        }

        /* Premium Dark Background Hover */
        .row-bg {
          position: absolute;
          inset: 0;
          opacity: 0;
          transition: opacity 0.7s ease;
          z-index: 0;
        }
        .acc-row.active .row-bg {
          opacity: 1; /* Fade into premium color */
        }

        /* Header / Row Toggle */
        .row-header {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          padding: 40px 2vw;
          cursor: pointer;
          transition: all 0.6s cubic-bezier(0.19, 1, 0.22, 1);
        }
        .acc-row.active .row-header {
          padding-top: 50px;
          padding-bottom: 20px;
        }

        .row-num {
          font-family: var(--font-heading);
          font-size: 1.4rem;
          font-weight: 900;
          letter-spacing: 0.1em;
          width: 80px;
          color: var(--brand-orange);
          transition: color 0.4s;
        }
        .acc-row.active .row-num {
          color: rgba(255,255,255,0.4) !important;
        }

        .row-title {
          flex: 1;
          font-size: clamp(2rem, 4vw, 3.2rem);
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: -0.02em;
          color: #000;
          margin: 0;
          transition: all 0.6s cubic-bezier(0.19, 1, 0.22, 1);
          transform-origin: left center;
        }
        .acc-row.active .row-title {
          color: #ffffff !important;
          transform: translateX(15px);
        }

        /* Animated Plus/Minus Indicator — HIDDEN on desktop since hover is used */
        .row-indicator {
          width: 40px;
          height: 40px;
          position: relative;
          display: none;
          align-items: center;
          justify-content: center;
        }
        .indicator-line {
          position: absolute;
          background: #000;
          transition: all 0.6s cubic-bezier(0.19, 1, 0.22, 1);
        }
        .acc-row.active .indicator-line {
          background: #ffffff !important;
        }
        .indicator-line.horizontal {
          width: 20px;
          height: 2px;
        }
        .indicator-line.vertical {
          width: 2px;
          height: 20px;
        }
        .acc-row.active .indicator-line.vertical {
          transform: rotate(90deg);
          opacity: 0;
        }
        .acc-row.active .indicator-line.horizontal {
          transform: rotate(180deg);
        }

        /* Expanding Body via Grid Grid-Template-Rows Trick for smooth height animation! */
        .row-body {
          position: relative;
          z-index: 2;
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 0.8s cubic-bezier(0.19, 1, 0.22, 1);
        }
        .acc-row.active .row-body {
          grid-template-rows: 1fr;
        }

        .row-body-inner {
          overflow: hidden;
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.6s cubic-bezier(0.19, 1, 0.22, 1);
        }
        .acc-row.active .row-body-inner {
          opacity: 1;
          transform: translateY(0);
          transition-delay: 0.1s; /* fade in slightly after opening */
        }

        .row-content-split {
          display: flex;
          gap: 60px;
          padding: 20px 2vw 50px 100px;
          margin-top: 10px;
        }

        .row-text-content {
          flex: 1.2;
        }

        .row-desc {
          font-size: 1.2rem;
          line-height: 1.5;
          opacity: 0.9;
          margin-bottom: 30px;
          max-width: 85%;
        }
        #services-hub-id .acc-row.active .row-desc {
          color: rgba(255,255,255,0.9) !important;
        }

        .row-features {
          list-style: none;
          padding: 0;
          margin: 0 0 35px 0;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .row-features li {
          display: flex;
          align-items: center;
          gap: 15px;
          font-size: 1.05rem;
          font-weight: 600;
        }
        #services-hub-id .acc-row.active .row-features li {
          color: #ffffff !important;
        }
        #services-hub-id .acc-row.active .check-icon {
          color: var(--brand-orange) !important;
          font-size: 1.4rem;
        }

        /* UI/UX Premium Button */
        .premium-pill-link {
          display: inline-block;
          text-decoration: none !important;
          outline: none;
        }
        #services-hub-id .acc-row.active .pill-btn-wrap {
          display: inline-flex;
          align-items: center;
          background: rgba(255,255,255,0.08) !important; /* Frosted */
          border: 1px solid rgba(255,255,255,0.2) !important;
          border-radius: 100px;
          padding: 6px 6px 6px 26px;
          gap: 20px;
          backdrop-filter: blur(10px);
          transition: all 0.5s cubic-bezier(0.19, 1, 0.22, 1);
        }
        #services-hub-id .acc-row.active .pill-btn-wrap:hover {
          background: #ffffff !important;
          border-color: #ffffff !important;
          transform: translateY(-3px);
          box-shadow: 0 15px 30px rgba(0,0,0,0.3);
        }

        #services-hub-id .acc-row.active a.premium-pill-link,
        #services-hub-id .acc-row.active .pill-text {
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-size: 0.9rem;
          color: #ffffff !important;
          transition: color 0.4s;
          text-decoration: none !important;
        }
        #services-hub-id .acc-row.active .pill-btn-wrap:hover .pill-text {
          color: #000000 !important;
        }
        
        #services-hub-id .acc-row.active .pill-orb {
          color: #000000 !important;
        }
        #services-hub-id .acc-row.active .pill-btn-wrap:hover .pill-orb {
          color: #ffffff !important;
        }

        .pill-orb {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: #ffffff;
          color: #000000;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.3rem;
          box-shadow: 0 5px 15px rgba(0,0,0,0.1);
          transition: all 0.4s cubic-bezier(0.19, 1, 0.22, 1);
        }
        .pill-btn-wrap:hover .pill-orb {
          background: var(--brand-orange);
          color: #ffffff;
          transform: scale(1.1) rotate(-45deg);
        }

        /* Image Content */
        .row-image-content {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }
        .image-float-wrapper {
          position: relative;
          width: 100%;
          height: 380px;
          filter: drop-shadow(0 30px 40px rgba(0,0,0,0.4));
          animation: floatSlow 7s ease-in-out infinite;
        }
        .acc-feat-img {
          /* subtle scale up trick for active */
          transform: scale(0.9);
          transition: transform 1s cubic-bezier(0.19, 1, 0.22, 1);
        }
        .acc-row.active .acc-feat-img {
          transform: scale(1);
        }

        @keyframes floatSlow {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
          100% { transform: translateY(0px); }
        }

        /* Responsiveness */
        @media (max-width: 1200px) {
          .row-content-split {
            flex-direction: column;
            gap: 40px;
          }
          .row-image-content {
            width: 100%;
          }
        }

        /* Tablet & Mobile: Always-expanded Refokus style */
        @media (max-width: 1024px) {
          .services-hub-premium { padding: 100px 0 80px; }
          .hub-header { margin-bottom: 50px; }
          .hub-desc { font-size: 1.1rem; }

          /* Hide +/- indicator on mobile */
          .row-indicator { display: none !important; }

          /* Force all items to be always expanded */
          .acc-row .row-body {
            grid-template-rows: 1fr !important;
          }
          .acc-row .row-body-inner {
            overflow: visible !important;
          }
          .acc-row .row-bg {
            opacity: 1 !important;
          }
          .acc-row .row-header {
            color: #fff;
            cursor: default;
          }
          .acc-row .row-num,
          .acc-row .row-title {
            color: #fff !important;
          }
          .acc-row .row-desc,
          .acc-row .row-features li,
          .acc-row .check-icon {
            color: rgba(255,255,255,0.85) !important;
          }
          .acc-row .pill-text {
            color: #fff !important;
          }
          .acc-row .pill-orb {
            background: rgba(255,255,255,0.15) !important;
            color: #fff !important;
          }

          /* Each service becomes a stacked card */
          .acc-row {
            border-bottom: 1px solid rgba(255,255,255,0.15);
            border-top: none;
            border-radius: 16px;
            margin-bottom: 8px;
          }
          .row-header { padding: 25px 16px 12px; }
          .row-content-split { padding: 0 16px 30px 16px; }
          .row-features { grid-template-columns: 1fr; gap: 10px; }
          .image-float-wrapper { height: 250px; border-radius: 20px; }
          .row-desc { font-size: 1.05rem; max-width: 100%; }
        }

        @media (max-width: 768px) {
          .services-hub-premium { padding: 70px 0 50px; }
          .hub-header { margin-bottom: 35px; }
          .row-header { padding: 22px 12px 10px; }
          .row-num { width: 35px; font-size: 1rem; }
          .row-title { font-size: 1.6rem; }
          .row-content-split { padding: 0 12px 28px 12px; gap: 25px; }
          .image-float-wrapper { height: 200px; }
        }

        @media (max-width: 480px) {
          .services-hub-premium { padding: 50px 0 35px; }
          .hub-header { margin-bottom: 25px; }
          .hub-title { font-size: 2rem; }
          .hub-desc { font-size: 0.95rem; max-width: 100%; }
          .row-header { padding: 18px 10px 8px; }
          .row-num { width: 28px; font-size: 0.85rem; }
          .row-title { font-size: 1.3rem; }
          .row-content-split { padding: 0 10px 24px 10px; gap: 20px; }
          .row-desc { font-size: 0.95rem; margin-bottom: 16px; }
          .row-features { gap: 8px; margin: 0 0 20px 0; }
          .row-features li { font-size: 0.85rem; gap: 8px; }
          .image-float-wrapper { height: 160px; border-radius: 14px; }
          .pill-orb { width: 36px; height: 36px; font-size: 1rem; }
          .pill-text { font-size: 0.8rem; }
          .acc-row { border-radius: 12px; margin-bottom: 6px; }
        }
      `}</style>
    </section>
  )
}

export default ServicesSection
