'use client'

import React from 'react'
import Link from 'next/link'
import TextReveal from './animations/TextReveal'
import LiquidButton from './animations/LiquidButton'

const CTABanner = ({
  title = "Ready to build something extraordinary?",
  subtitle = "Partner with India's trusted digital agency to turn your vision into scalable reality.",
  primaryBtnText = "Get A Quote",
  primaryBtnLink = "/contact/",
  variant = "primary"
}) => {
  return (
    <section className={`cta-banner section ${variant}`}>
      <div className="container">
        <div className="cta-content">
          <div className="cta-text-wrap">
            <h2 className="cta-title">
              <TextReveal>{title}</TextReveal>
            </h2>
            <p className="cta-desc animate-up">
              {subtitle}
            </p>
          </div>

          <div className="cta-actions animate-up">
            <LiquidButton
              effect="cryogenic"
              variant="solid"
              color="var(--brand-orange)"
              liquidColor="#000"
              textColor="white"
              hoverTextColor="white"
              strength={35}
            >
              <Link href={primaryBtnLink} className="btn-clean">
                {primaryBtnText}
              </Link>
            </LiquidButton>
          </div>
        </div>
      </div>

      {/* Decorative Blob */}
      <div className="cta-blob"></div>

      <style>{`
        .cta-banner {
          position: relative;
          overflow: hidden;
          padding: 10vw 0;
        }

        .cta-content {
          position: relative;
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .cta-title {
          font-size: clamp(3rem, 7vw, 6rem);
          line-height: 0.9;
          margin-bottom: 3rem;
          color: #000;
          max-width: 1000px;
          text-transform: uppercase;
          letter-spacing: -0.04em;
          font-weight: 800;
        }
        .cta-desc {
          font-size: 1.15rem;
          color: #444;
          max-width: 600px;
          margin: 0 auto 4rem;
          opacity: 0.8;
          line-height: 1.5;
        }

        .cta-btn {
          background: var(--brand-orange) !important;
          color: white !important;
          padding: 1.5rem 4rem !important;
          font-size: 1.1rem !important;
          font-weight: 800 !important;
          border-radius: 100px !important;
          text-transform: uppercase !important;
          letter-spacing: 0.15em !important;
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
          transition: var(--trans-smooth) !important;
        }
        .cta-btn:hover {
          background: #000 !important; /* Changed from white for contrast */
          color: white !important;
          transform: scale(1.05);
        }

        .animate-up {
          opacity: 1; /* Removing animation delays to ensure visibility */
          transform: translateY(0);
        }
        @keyframes fadeInUp {
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 1024px) {
          .cta-banner { padding: 10vw 0; }
          .cta-title { margin-bottom: 2.5rem; }
          .cta-desc { margin: 0 auto 3.5rem; }
        }
        @media (max-width: 768px) {
          .cta-content { padding: 1.5rem 0; }
          .cta-title { margin-bottom: 2rem; }
          .cta-desc { margin: 0 auto 3rem; font-size: 1.05rem; }
        }
        @media (max-width: 480px) {
          .cta-banner { padding: 14vw 0; }
          .cta-content { padding: 1rem 0; }
          .cta-title { font-size: 1.8rem; margin-bottom: 1.5rem; }
          .cta-desc { font-size: 0.95rem; margin: 0 auto 2.5rem; }
        }
      `}</style>
    </section>
  )
}

export default CTABanner
