'use client'

import React, { useState, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import SERVICE_CONFIGS from './serviceConfigs'

const ServicesSection = () => {
  const sectionRef = useRef(null)
  const [hoveredIdx, setHoveredIdx] = useState(null)

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
                   className={`ss-row ${isHovered ? 'is-hovered' : ''}`}
                   onMouseEnter={() => setHoveredIdx(idx)}
                   onMouseLeave={() => setHoveredIdx(null)}
                   style={{
                     '--hover-bg': servicesConfigList[idx].hoverColor
                   }}
                 >
                    <div className="ss-row-top">
                       <div className="ss-col flex-1" style={{ display: 'flex', flexDirection: 'column' }}>
                          <h3 className="ss-row-title">{service.title}</h3>
                          
                          {/* Link moved UPPER of images and DIRECTLY below title, fading in softly on hover */}
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
                          
                          {/* Image Gallery spans exact 100% full width mirroring Refokus exact layout */}
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

        /* The link wrapper now sits directly under the title */
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

        /* FULL WIDTH GALLERY Exact Match (50% / 25% / 25%) */
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

        /* Responsive Breakpoints */
        @media (max-width: 1024px) {
          /* Force Always Open on Touch Devices */
          .ss-row { background-color: var(--hover-bg) !important; }
          .ss-row-bottom { grid-template-rows: 1fr !important; }
          .ss-row-bottom-inner { padding-top: 40px !important; }
          .ss-case-study-link { opacity: 1 !important; transform: translateY(0) !important; }
          .ss-media-box { transform: translateY(0) scale(1) !important; opacity: 1 !important; }
          .ss-list-wrap:hover .ss-row:not(.is-hovered) { opacity: 1 !important; }

          .ss-intro-group {
            flex-direction: column;
            gap: 20px;
          }
          .ss-row-top {
             flex-direction: column;
             gap: 24px;
          }
          .ss-col-desc { max-width: 100%; }
          .ss-row-tags { margin-left: 0; display: flex; flex-wrap: wrap; gap: 15px; }
          .ss-row-tags li { margin-bottom: 0; }
          .ss-row-bottom-inner {
             flex-direction: column;
             gap: 30px;
          }
          
          .ss-gallery-matrix {
             grid-template-columns: 1fr;
          }
          .ss-media-lg { height: 260px; }
          .ss-media-sm { height: 260px; }
        }
        @media (max-width: 768px) {
          .ss-section {
             padding: 60px 0;
             border-top-left-radius: 40px;
             border-top-right-radius: 40px;
             margin-top: -40px;
          }
          .ss-title { font-size: clamp(3rem, 10vw, 4rem); }
          .ss-row { padding: 40px 5vw; }
          .ss-media-lg, .ss-media-sm { border-radius: 8px; height: 220px; }
        }
      `}</style>
    </section>
  )
}

export default ServicesSection
