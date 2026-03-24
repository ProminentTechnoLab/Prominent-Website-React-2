'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  FaFacebookF, FaLinkedinIn,
  FaInstagram, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaYoutube
} from 'react-icons/fa'
import { RiTwitterXFill } from 'react-icons/ri'
import MagneticButton from './animations/MagneticButton'

const Footer = () => {
  const [footerHeight, setFooterHeight] = useState(0)
  const footerRef = useRef(null)

  useEffect(() => {
    if (!footerRef.current) return
    const resizeObserver = new window.ResizeObserver((entries) => {
      for (let entry of entries) {
        setFooterHeight(entry.contentRect.height)

        // Push height dynamically to the global spacer resting securely inside the scroll context
        const globalSpacer = document.getElementById('global-footer-spacer')
        if (globalSpacer) {
          globalSpacer.style.height = `${entry.contentRect.height}px`
        }
      }
    })
    resizeObserver.observe(footerRef.current)
    return () => resizeObserver.disconnect()
  }, [])

  const currentYear = new Date().getFullYear()

  return (
    <>
      <footer ref={footerRef} className="footer reveal-footer">
        <div className="refokus-container">
          <div className="refokus-panels">
            {/* Left Panel - Services */}
            <Link href="/services/" className="refokus-panel panel-left">
              <div className="panel-top">
                <span className="panel-label">SERVICES</span>
                <span className="panel-arrow">→</span>
              </div>
              <div className="panel-body">
                <h3 className="panel-title">Digital Solutions<br />& Expertise</h3>
                <p className="panel-desc">Website Development, Mobile App Dev, UI/UX Design, and Digital Marketing.</p>
              </div>
            </Link>

            {/* Right Panel - Contact */}
            <Link href="/contact/" className="refokus-panel panel-right">
              <div className="panel-top">
                <span className="panel-label">GET IN TOUCH</span>
                <span className="panel-arrow">→</span>
              </div>
              <div className="panel-body">
                <h3 className="panel-subtitle">Let's get to it.<br />together.</h3>
                <div className="panel-bottom-row">
                  <h2 className="panel-massive-title">Start a Project</h2>
                  <div className="panel-cta">
                    <span>Contact us</span>
                    <span className="panel-cta-arrow">→</span>
                    <div className="cta-line"></div>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Repositioned Bottom Legal Bar */}
          <div className="refokus-bottom-bar">
            <div className="bottom-left">
              <span>© {currentYear} Prominent TechnoLabs.</span>
            </div>
            <div className="bottom-right">
              <a href="https://sites.google.com/view/prominettechnolabsprivacy/home" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
              <a href="https://sites.google.com/view/prominenttearmsconditions/home" target="_blank" rel="noopener noreferrer">Terms of Service</a>
            </div>
          </div>
        </div>

        <style>{`
        .reveal-footer {
          position: fixed;
          bottom: 0;
          left: 0;
          width: 100%;
          z-index: 1; /* Sits behind main content */
        }
        .footer {
          background: #f4f4f5; /* Professional light background for sharp contrast */
          color: #000000;
          overflow: hidden;
        }

        /* Twin-Panel Layout */
        .refokus-container {
          padding: 2.5vw;
          display: flex;
          flex-direction: column;
          gap: 2.5vw;
          max-width: 100%;
          font-family: var(--font-body);
        }
        
        .refokus-panels {
          display: grid;
          grid-template-columns: 1fr 2.15fr; /* Matches Refokus proportions */
          gap: 2.5vw;
        }

        .refokus-panel {
          border-radius: 28px;
          padding: 3.5vw 4vw;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          text-decoration: none;
          cursor: pointer;
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          min-height: 65vh;
          position: relative;
          overflow: hidden;
        }

        /* Left Panel Styles */
        .panel-left {
          background: #141414;
          color: #ffffff;
          border: 1px solid rgba(0,0,0,0.1);
        }
        .panel-left:hover {
          background: #ffffff;
          border-color: rgba(0,0,0,0.1);
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }
        /* Explicit Hover Typography Flippers */
        .panel-left:hover .panel-label,
        .panel-left:hover .panel-title,
        .panel-left:hover .panel-arrow {
          color: #000000 !important;
          opacity: 1 !important;
        }
        .panel-left:hover .panel-desc {
          color: #333333 !important;
          opacity: 0.9 !important;
        }

        /* Right Panel Styles */
        .panel-right {
          background: var(--brand-orange);
          color: #ffffff;
        }
        .panel-right:hover {
          background: #e64500;
        }

        /* Typography & Layout within Panels */
        .panel-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 4vw;
        }
        .panel-label {
          font-size: 0.85rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          opacity: 0.9;
        }
        .panel-arrow {
          font-size: 1.5rem;
          transition: transform 0.4s ease;
        }
        .refokus-panel:hover .panel-arrow {
          transform: translateX(5px) scale(1.1);
        }

        .panel-body {
          display: flex;
          flex-direction: column;
          height: 100%;
          justify-content: space-between;
        }

        .panel-title {
          font-size: clamp(2.5rem, 4vw, 3.5rem);
          font-weight: 500;
          line-height: 1.1;
          margin-bottom: auto;
          font-family: var(--font-heading);
          letter-spacing: -0.02em;
          transition: color 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .panel-desc {
          font-size: clamp(1rem, 1.2vw, 1.2rem);
          opacity: 0.8;
          max-width: 85%;
          line-height: 1.5;
          transition: color 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s ease;
        }

        .panel-subtitle {
          font-size: clamp(2.5rem, 4vw, 3.5rem);
          font-weight: 500;
          line-height: 1.1;
          font-family: var(--font-heading);
          margin-bottom: auto;
          letter-spacing: -0.02em;
        }

        .panel-bottom-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          width: 100%;
        }
        .panel-massive-title {
          font-size: clamp(3.5rem, 8.5vw, 9.5rem);
          font-weight: 600;
          line-height: 0.85;
          letter-spacing: -0.03em;
          font-family: var(--font-heading);
        }
        .panel-cta {
          display: flex;
          align-items: center;
          gap: 15px;
          font-size: 1.3rem;
          font-weight: 500;
          position: relative;
          padding-bottom: 12px;
          margin-bottom: 10px;
        }
        .panel-cta-arrow {
          font-size: 1.3rem;
          transition: transform 0.4s ease;
        }
        .refokus-panel:hover .panel-cta-arrow {
          transform: translateX(5px);
        }
        .cta-line {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 1px;
          background: rgba(255,255,255,0.4);
          transition: background 0.3s;
        }
        .refokus-panel:hover .cta-line {
          background: rgba(255,255,255,1);
        }

        /* Bottom Legal Bar */
        .refokus-bottom-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1vw 2vw 0 2vw;
          font-size: 0.9rem;
          color: #555555;
        }
        .bottom-right {
          display: flex;
          gap: 2vw;
        }
        .bottom-right a {
          color: #555555;
          text-decoration: none;
          transition: color 0.3s;
        }
        .bottom-right a:hover {
          color: #000000;
        }

        /* Responsive Design */
        @media (max-width: 1200px) {
          .refokus-panels {
            grid-template-columns: 1fr 1.5fr;
          }
          .panel-massive-title {
            font-size: clamp(3rem, 6vw, 5rem);
          }
        }

        @media (max-width: 900px) {
          .refokus-panels {
            grid-template-columns: 1fr;
          }
          .refokus-panel {
            min-height: 40vh;
            padding: 5vw;
          }
          .panel-massive-title {
            font-size: clamp(3.5rem, 10vw, 6rem);
          }
          .bottom-left {
            gap: 15px;
            flex-wrap: wrap;
          }
        }

        @media (max-width: 600px) {
          .refokus-container {
            padding: 4vw;
            gap: 4vw;
          }
          .refokus-panels {
            gap: 4vw;
          }
          .refokus-panel {
            min-height: 45vh;
            padding: 8vw;
            border-radius: 20px;
          }
          .panel-bottom-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 20px;
          }
          .panel-cta {
            padding-bottom: 8px;
            font-size: 1.1rem;
          }
          .refokus-bottom-bar {
            flex-direction: column;
            align-items: flex-start;
            gap: 20px;
            padding: 2vw 1vw;
          }
          .bottom-left {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
          }
          .bottom-right {
            gap: 20px;
          }
        }
      `}</style>
      </footer>
    </>
  )
}

export default Footer
