'use client'

import React from 'react'
import Link from 'next/link'

const CTABanner = () => {
  return (
    <section className="cta-section">
      <div className="cta-inner">
        <h2 className="cta-title">Ready to build<br />something extraordinary?</h2>
        <Link href="/contact/" className="cta-pill">Get in touch</Link>
      </div>

      <style>{`
        .cta-section {
          background: var(--bg-primary);
          padding: 120px 0;
        }
        .cta-inner {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 40px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .cta-title {
          font-size: clamp(3rem, 6vw, 5.5rem);
          font-weight: 500;
          color: #000;
          letter-spacing: -0.04em;
          line-height: 1.0;
          margin-bottom: 48px;
        }
        .cta-pill {
          display: inline-flex;
          align-items: center;
          padding: 18px 40px;
          border: 1px solid rgba(0,0,0,0.15);
          border-radius: 100px;
          color: #000;
          text-decoration: none;
          font-size: 1.1rem;
          font-weight: 500;
          transition: all 0.4s var(--ease-expo);
        }
        .cta-pill:hover {
          background: #000;
          color: #fff;
          border-color: #000;
        }
        @media (max-width: 768px) {
          .cta-section { padding: 80px 0; }
          .cta-inner { padding: 0 20px; }
          .cta-title br { display: none; }
          .cta-pill { padding: 14px 28px; font-size: 1rem; }
        }
        @media (max-width: 480px) {
          .cta-section { padding: 60px 0; }
          .cta-pill { padding: 12px 24px; font-size: 0.9rem; }
        }
      `}</style>
    </section>
  )
}

export default CTABanner
