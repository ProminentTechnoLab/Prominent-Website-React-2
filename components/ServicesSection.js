'use client'

import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import SERVICE_CONFIGS from './serviceConfigs'

const ServicesSection = () => {
  const sectionRef = useRef(null)
  const [hoveredIdx, setHoveredIdx] = useState(null)
  const rowRefs = useRef([])

  useEffect(() => {
    // Only apply scroll-expansion on touch devices or tablet/mobile viewports
    // to avoid interference with precise mouse hover on desktop.
    const isTouch = window.matchMedia('(max-width: 1024px)').matches
    if (!isTouch) return

    const observerOptions = {
      root: null,
      rootMargin: '-40% 0% -40% 0%', // Center focus zone
      threshold: 0.1
    }

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const idx = parseInt(entry.target.getAttribute('data-index'))
          setHoveredIdx(idx)
        }
      });
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)
    
    rowRefs.current.forEach(row => {
      if (row) observer.observe(row)
    })

    return () => observer.disconnect()
  }, [])

  const servicesConfigList = [
    { id: 'website-development', hoverColor: '#0A2463', imgLg: '/images/serv_web_lg.png', imgSm1: '/images/refokus_web_dev.png', imgSm2: '/images/refokus_web_dev.png' },
    { id: 'mobile-app-development', hoverColor: '#EA4335', imgLg: '/images/serv_mob_lg.png', imgSm1: '/images/refokus_mobile_dev.png', imgSm2: '/images/refokus_mobile_dev.png' },
    { id: 'ui-ux-design', hoverColor: '#3F51B5', imgLg: '/images/serv_ui_lg.png', imgSm1: '/images/refokus_uiux.png', imgSm2: '/images/refokus_uiux.png' },
    { id: 'cms-ecommerce', hoverColor: '#00838F', imgLg: '/images/serv_ecom_lg.png', imgSm1: '/images/refokus_ecommerce.png', imgSm2: '/images/refokus_ecommerce.png' },
    { id: 'payment-shipping-api', hoverColor: '#2E7D32', imgLg: '/images/serv_api_lg.png', imgSm1: '/images/refokus_api.png', imgSm2: '/images/refokus_api.png' },
    { id: 'digital-marketing', hoverColor: '#E65100', imgLg: '/images/serv_mark_lg.png', imgSm1: '/images/refokus_marketing.png', imgSm2: '/images/refokus_marketing.png' }
  ]

  const mappedServices = servicesConfigList.map(item => {
    const config = SERVICE_CONFIGS[item.id]
    return {
      ...item,
      title: config.serviceName,
      desc: config.heroSubtitle,
      tags: config.technologies.slice(0, 4).map(t => t.name),
      path: `/services/${item.id}/`
    }
  })

  return (
    <section
      className="ss-section"
      ref={sectionRef}
    >
      <div className="ss-inner">
        <div className="ss-intro-group">
          <h2 className="ss-title">Our services</h2>
          <div className="ss-intro-text">
            From motion design to AI-powered products — we design and build interfaces for the future.
          </div>
        </div>

        <div className="ss-list-wrap">
          {mappedServices.map((service, idx) => {
            const isHovered = hoveredIdx === idx

            return (
              <div
                key={idx}
                ref={el => rowRefs.current[idx] = el}
                data-index={idx}
                className={`ss-row ${isHovered ? 'is-hovered' : ''}`}
                onMouseEnter={() => {
                  // Keep hover on desktop
                  if (!window.matchMedia('(max-width: 1024px)').matches) {
                    setHoveredIdx(idx)
                  }
                }}
                onMouseLeave={() => {
                  if (!window.matchMedia('(max-width: 1024px)').matches) {
                    setHoveredIdx(null)
                  }
                }}
                style={{
                  '--hover-bg': servicesConfigList[idx].hoverColor
                }}
              >
                <div className="ss-row-top">
                  <div className="ss-col flex-1" style={{ display: 'flex', flexDirection: 'column' }}>
                    <h3 className="ss-row-title">{service.title}</h3>
                    
                    <div className="ss-col-link-wrap">
                      <Link href={service.path} className="ss-case-study-link">
                        <span className="link-text-wrap">
                          <span className="link-text-old">Explore Service</span>
                          <span className="link-text-new">Explore Service</span>
                        </span>
                        <span className="link-arrow-wrap">
                          <span className="link-arrow-old">&rarr;</span>
                          <span className="link-arrow-new">&rarr;</span>
                        </span>
                      </Link>
                    </div>
                  </div>
                  <div className="ss-col flex-2 ss-col-desc">
                    <p className="ss-row-desc">{service.desc}</p>
                  </div>
                  <div className="ss-col flex-1 ss-col-tags">
                    <ul className="ss-row-tags">
                      {service.tags.map((tag, i) => <li key={i}>{tag}</li>)}
                    </ul>
                  </div>
                </div>

                <div className="ss-row-bottom">
                  <div className="ss-row-bottom-inner">


                    {/* Image Gallery stays as matrix for desktop, handled by CSS for mobile */}
                    <div className="ss-col-media-wrap" style={{ width: '100%' }}>
                      <div className="ss-gallery-matrix">
                        <div className="ss-media-box ss-media-lg">
                          <Image src={service.imgLg} alt={`${service.title} feature`} fill style={{ objectFit: 'cover' }} quality={95} />
                        </div>
                        <div className="ss-media-box ss-media-sm">
                          <Image src={service.imgSm1} alt={`${service.title} detail one`} fill style={{ objectFit: 'cover' }} quality={90} />
                        </div>
                        <div className="ss-media-box ss-media-sm">
                          <Image src={service.imgSm2} alt={`${service.title} detail two`} fill style={{ objectFit: 'cover' }} quality={90} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            )
          })}
        </div>
      </div>

      <style>{`
        .ss-section {
          padding: 100px 0 120px;
          overflow: hidden;
          background-color: #0d0d0d;
          border-top-left-radius: 80px;
          border-top-right-radius: 80px;
          margin-top: -80px; 
          position: relative;
          z-index: 10;
          color: #ffffff;
        }
        
        .ss-inner {
          width: 100%; 
        }

        .ss-intro-group {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 80px;
          padding: 0 5vw; 
        }
        .ss-title {
          flex: 1;
          font-size: clamp(3.2rem, 5.5vw, 5.2rem);
          font-weight: 500;
          line-height: 1.05;
          letter-spacing: -0.04em;
          margin: 0;
          color: #ffffff !important;
        }
        .ss-intro-text {
          flex: 1;
          font-size: clamp(1.1rem, 1.4vw, 1.25rem);
          line-height: 1.5;
          font-weight: 400;
          max-width: 500px;
          opacity: 0.8;
          margin-top: 10px;
          color: #ffffff !important;
        }

        .ss-list-wrap {
          display: flex;
          flex-direction: column;
          width: 100%;
          border-top: 1px solid rgba(255, 255, 255, 0.15);
        }

        .ss-row {
          position: relative;
          width: 100%;
          border-bottom: 1px solid rgba(255, 255, 255, 0.15);
          padding: 50px 5vw; 
          transition: opacity 0.5s ease, background-color 0.5s ease;
          border-radius: 0px !important; 
          background-color: transparent;
        }
        .ss-row.is-hovered {
          background-color: var(--hover-bg);
        }

        .ss-row-top {
          display: flex;
          align-items: flex-start;
          width: 100%;
        }

        .flex-1 { flex: 1; }
        .flex-2 { flex: 2; }

        .ss-row-title {
          font-size: clamp(2rem, 2.5vw, 2.8rem);
          font-weight: 500;
          letter-spacing: -0.02em;
          margin: 0;
          line-height: 1.1;
          color: #ffffff !important;
        }

        .ss-col-link-wrap {
          margin-top: 24px;
        }
        .ss-case-study-link {
          position: relative;
          display: inline-flex;
          align-items: center;
          font-size: 1.1rem;
          font-weight: 500;
          color: #ffffff !important;
          text-decoration: none;
          padding-bottom: 8px;
          
          opacity: 0;
          transform: translateY(10px);
          transition: opacity 0.4s ease, transform 0.4s ease;
          transition-delay: 0s;
        }
        
        .ss-row.is-hovered .ss-case-study-link {
          opacity: 1;
          transform: translateY(0);
          transition-delay: 0.2s; 
        }

        /* Desktop Positioning Fix: Link stays under title area on large screens */
        @media (min-width: 1025px) {
           .ss-col-link-wrap {
             position: absolute;
             top: 110px;
             left: 5vw;
             z-index: 20;
           }
        }

        .ss-case-study-link::before {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 1px;
          background: rgba(255,255,255,0.3);
        }
        .ss-case-study-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 1.5px;
          background: #ffffff;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .ss-case-study-link:hover::after {
          transform: scaleX(1);
        }

        .link-text-wrap {
          position: relative;
          display: inline-block;
          overflow: hidden;
          line-height: 1.1;
        }
        .link-text-old {
          display: flex;
          align-items: center;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .link-text-new {
          position: absolute;
          top: 100%;
          left: 0;
          display: flex;
          align-items: center;
          width: 100%;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .ss-case-study-link:hover .link-text-old {
          transform: translateY(-100%);
        }
        .ss-case-study-link:hover .link-text-new {
          transform: translateY(-100%);
        }
        
        .link-arrow-wrap {
          position: relative;
          display: inline-flex;
          overflow: hidden;
          margin-left: 40px;
          font-size: 1.2rem;
          font-family: Arial, sans-serif;
        }
        .link-arrow-old {
          display: inline-flex;
          transform: translateX(0);
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .link-arrow-new {
          position: absolute;
          top: 0; 
          left: 0;
          transform: translateX(-150%);
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .ss-case-study-link:hover .link-arrow-old {
          transform: translateX(150%);
        }
        .ss-case-study-link:hover .link-arrow-new {
          transform: translateX(0);
        }

        .ss-row-desc {
          font-size: clamp(1rem, 1.1vw, 1.1rem);
          line-height: 1.5;
          max-width: 85%;
          margin: 0;
          opacity: 0.9;
          color: #ffffff !important;
        }

        .ss-row-tags {
          list-style: none;
          padding: 0;
          margin: 0;
          margin-left: auto;
        }
        .ss-row-tags li {
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          margin-bottom: 8px;
          opacity: 0.9;
          color: #ffffff !important;
        }

        .ss-row-bottom {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .ss-row.is-hovered .ss-row-bottom {
          grid-template-rows: 1fr;
        }

        .ss-row-bottom-inner {
          overflow: hidden;
          display: flex;
          align-items: flex-start;
          width: 100%;
          padding-top: 0;
          transition: padding-top 0.4s ease;
        }
        .ss-row.is-hovered .ss-row-bottom-inner {
          padding-top: 40px; 
        }

        .ss-col-media-wrap {
          width: 100%;
        }
        .ss-gallery-matrix {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          gap: 24px;   
          width: 100%;
          align-items: flex-start;
        }

        .ss-media-box {
          position: relative;
          width: 100%;
          border-radius: 12px;
          overflow: hidden;
          background: rgba(0,0,0,0.1);
          transform: translateY(40px) scale(0.98);
          opacity: 0;
          transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }
        
        .ss-media-lg {
          height: 380px;
        }
        
        .ss-media-sm {
          height: 250px;
        }
        
        .ss-row.is-hovered .ss-media-box {
          transform: translateY(0) scale(1);
          opacity: 1;
        }
        
        .ss-row.is-hovered .ss-media-box:nth-child(1) { transition-delay: 0.0s; }
        .ss-row.is-hovered .ss-media-box:nth-child(2) { transition-delay: 0.08s; }
        .ss-row.is-hovered .ss-media-box:nth-child(3) { transition-delay: 0.16s; }

        .ss-list-wrap:hover .ss-row:not(.is-hovered) {
          opacity: 0.25;
        }

        @media (max-width: 1024px) {
          .ss-section {
            border-top-left-radius: 40px !important;
            border-top-right-radius: 40px !important;
            margin-top: -40px !important;
          }
          .ss-intro-group {
            flex-direction: column;
            gap: 20px;
            padding: 0 5vw 40px !important;
          }
          .ss-row-top {
             display: grid !important;
             grid-template-columns: 1.2fr 2fr 1fr !important;
             gap: 6vw !important;
             align-items: flex-start !important;
             flex-direction: row !important;
          }
          .ss-row-title { font-size: 1.8rem !important; margin: 0; line-height: 1.1; }
          .ss-row-desc { max-width: 100%; font-size: 1rem; opacity: 0.8; }
          .ss-row-tags { 
            margin-left: 0; 
            display: flex; 
            flex-direction: column; 
            gap: 8px; 
            margin-top: 0;
            align-items: flex-start !important; /* Column on right, but content aligned left */
            text-align: left !important;
          }
          .ss-row-tags li { margin-bottom: 0; font-size: 0.7rem; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 4px; width: fit-content; }

          /* The link is now inside ss-row-bottom-inner, so it's only visible on expand by default */
          /* Link positioning under title on Tablet */
          .ss-col-link-wrap { 
            position: relative !important;
            margin-top: 20px !important;
            display: none !important; /* Hidden by default on tablet */
            z-index: 5;
          }
          .is-hovered .ss-col-link-wrap {
            display: flex !important; /* Revealed when expanded */
          }
          .ss-case-study-link {
            opacity: 1 !important;
            transform: translateY(0) !important;
            font-size: 0.95rem !important;
            padding-bottom: 5px !important;
          }
          .link-arrow-wrap { margin-left: 15px !important; }

          .ss-gallery-matrix {
             grid-template-columns: 2fr 1fr 1fr;
             gap: 15px;
          }
          .ss-media-sm { display: block !important; height: 160px; }
          .ss-media-lg { height: 260px; border-radius: 12px; }
          
          .link-arrow-wrap { margin-left: 20px !important; }
          .ss-col-link-wrap { margin-top: 20px !important; }
        }

        @media (max-width: 768px) {
          .ss-section {
             padding: 60px 0;
             border-top-left-radius: 0 !important;
             border-top-right-radius: 0 !important;
             margin-top: 0 !important;
          }
          .ss-title { font-size: clamp(3rem, 10vw, 4rem); padding-left: 20px; }

          /* Force Always Open Cards on Mobile only */
          .ss-list-wrap { 
            padding: 12px !important; 
            gap: 12px !important; 
            border-top: none !important;
          }
          .ss-row { 
            background-color: var(--hover-bg) !important; 
            margin: 0 !important;
            border-radius: 8px !important;
            width: 100% !important;
            display: flex;
            flex-direction: column;
            border: none !important;
            padding: 24px !important;
            opacity: 1 !important;
          }
          .ss-row-top { display: flex !important; flex-direction: column !important; gap: 15px !important; }
          
          /* Link at bottom on Mobile cards */
          .ss-col-link-wrap { 
            order: 10 !important; 
            margin-top: 25px !important; 
            display: flex !important; 
          }
          .ss-row-tags { 
            flex-direction: row !important; 
            flex-wrap: wrap !important;
            gap: 8px !important;
            margin-top: 10px !important;
          }
          
          .ss-row-bottom { grid-template-rows: 1fr !important; }
          .ss-row-bottom-inner { 
            display: flex !important;
            flex-direction: column !important;
            padding-top: 24px !important; 
          }
          .ss-col-media-wrap { order: 5 !important; }
          .ss-case-study-link { 
            opacity: 1 !important; 
            transform: translateY(0) !important; 
            display: flex !important;
            width: 100% !important;
            justify-content: space-between !important;
            margin-top: 0 !important;
          }
          .ss-case-study-link::after, .ss-case-study-link::before { display: none !important; }
          .ss-media-box { transform: translateY(0) scale(1) !important; opacity: 1 !important; }
          .ss-list-wrap:hover .ss-row:not(.is-hovered) { opacity: 1 !important; }
          
          .ss-row-title { font-size: 2rem !important; }
          .ss-row-desc { font-size: 0.95rem; }
          .ss-gallery-matrix {
             grid-template-columns: 1fr;
          }
          .ss-media-sm { display: none !important; }
          .ss-media-lg { height: 220px; }
        }
      `}</style>
    </section>
  )
}

export default ServicesSection
