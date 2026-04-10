'use client'

import React from 'react'
import Link from 'next/link'
import { FaInstagram, FaLinkedinIn, FaFacebookF, FaYoutube } from 'react-icons/fa'
import { RiTwitterXFill } from 'react-icons/ri'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const navLinks = [
    { label: 'Services', path: '/services/' },
    { label: 'About', path: '/about/' },
    { label: 'Pricing', path: '/pricing/' },
    { label: 'Contact', path: '/contact/' },
  ]

  const socialLinks = [
    { icon: <FaInstagram />, url: 'https://instagram.com/prominenttechnolabs/', label: 'Instagram' },
    { icon: <FaYoutube />, url: 'https://youtube.com/@prominenttechnolabs', label: 'YouTube' },
    { icon: <FaLinkedinIn />, url: 'https://linkedin.com/company/prominent-technolabs/', label: 'LinkedIn' },
    { icon: <FaFacebookF />, url: 'https://facebook.com/prominenttechnolabs/', label: 'Facebook' },
    { icon: <RiTwitterXFill />, url: 'https://twitter.com/prominenttech/', label: 'Twitter' },
  ]

  return (
    <footer className="cb-footer">
      {/* Have an idea section — matching Cuberto's pre-footer CTA */}
      <div className="cb-footer-cta">
        <h2 className="cb-footer-title">Have an idea?</h2>
        <h2 className="cb-footer-title outline">Tell us about it</h2>
      </div>

      {/* Footer content grid */}
      <div className="cb-footer-content">
        {/* Left: contact pills + address */}
        <div className="cb-footer-left">
          <div className="cb-pill-row">
            <a href="mailto:prominenttechnolabs@gmail.com" className="cb-pill">prominenttechnolabs@gmail.com</a>
            <a href="tel:+919327603253" className="cb-pill">+91 93276 03253</a>
          </div>
          <div className="cb-address">
            <div className="cb-addr-block">
              <span className="cb-addr-label">OFFICE</span>
              <strong>G-108, Titanium City Center</strong>
              <span>Ahmedabad, Gujarat 380015</span>
            </div>
          </div>
        </div>

        {/* Right: nav grid — Cuberto style */}
        <div className="cb-footer-nav">
          {navLinks.map(link => (
            <Link key={link.label} href={link.path} className="cb-footer-link">{link.label}</Link>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="cb-footer-bottom">
        <div className="cb-bottom-left">
          <a href="https://sites.google.com/view/prominettechnolabsprivacy/home" target="_blank" rel="noopener noreferrer" className="cb-bottom-link">Privacy Policy</a>
          <span className="cb-bottom-copy">{currentYear}, Prominent TechnoLabs</span>
        </div>
        <div className="cb-bottom-right">
          {socialLinks.map(s => (
            <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer" className="cb-social-icon" aria-label={s.label}>
              {s.icon}
            </a>
          ))}
        </div>
      </div>

      <style>{`
        .cb-footer {
          background: #000;
          color: #fff;
          padding: 120px 40px 40px;
          position: relative;
        }

        /* CTA area */
        .cb-footer-cta {
          max-width: 1400px;
          margin: 0 auto 120px;
        }
        .cb-footer-title {
          font-size: clamp(4rem, 10vw, 9rem);
          font-weight: 500;
          line-height: 1.0;
          letter-spacing: -0.04em;
          color: #fff;
        }
        .cb-footer-title.outline {
          color: transparent;
          -webkit-text-stroke: 1px rgba(255,255,255,0.3);
        }

        /* Footer content grid */
        .cb-footer-content {
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding-bottom: 80px;
        }

        .cb-footer-left { flex: 1; }
        .cb-pill-row { display: flex; gap: 16px; margin-bottom: 40px; flex-wrap: wrap; }
        .cb-pill {
          display: inline-flex;
          align-items: center;
          padding: 14px 28px;
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 100px;
          color: #fff;
          text-decoration: none;
          font-size: 1rem;
          font-weight: 400;
          transition: all 0.4s var(--ease-expo);
        }
        .cb-pill:hover {
          background: #fff;
          color: #000;
          border-color: #fff;
        }

        .cb-address { display: flex; gap: 60px; }
        .cb-addr-block { display: flex; flex-direction: column; gap: 4px; }
        .cb-addr-label {
          font-size: 0.7rem;
          font-weight: 500;
          color: rgba(255,255,255,0.4);
          letter-spacing: 0.05em;
          margin-bottom: 4px;
        }
        .cb-addr-block strong { font-size: 0.95rem; font-weight: 500; color: #fff; }
        .cb-addr-block span { font-size: 0.9rem; color: rgba(255,255,255,0.5); }

        /* Nav grid — Cuberto style: 2-column, large links */
        .cb-footer-nav {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px 60px;
        }
        .cb-footer-link {
          font-size: 1.3rem;
          font-weight: 500;
          color: #fff;
          text-decoration: none;
          transition: opacity 0.3s ease;
          padding: 4px 0;
        }
        .cb-footer-link:hover { opacity: 0.5; }

        /* Bottom bar */
        .cb-footer-bottom {
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 40px;
          border-top: 1px solid rgba(255,255,255,0.08);
        }
        .cb-bottom-left { display: flex; align-items: center; gap: 24px; }
        .cb-bottom-link {
          font-size: 0.85rem;
          color: rgba(255,255,255,0.4);
          text-decoration: underline;
          text-decoration-color: rgba(255,255,255,0.15);
          text-underline-offset: 3px;
          transition: color 0.3s;
        }
        .cb-bottom-link:hover { color: #fff; }
        .cb-bottom-copy { font-size: 0.85rem; color: rgba(255,255,255,0.4); }

        .cb-bottom-right { display: flex; gap: 12px; }
        .cb-social-icon {
          width: 46px;
          height: 46px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-size: 1.1rem;
          text-decoration: none;
          transition: all 0.4s var(--ease-expo);
        }
        .cb-social-icon:hover {
          background: #fff;
          color: #000;
          border-color: #fff;
        }

        @media (max-width: 1024px) {
          .cb-footer-content { flex-direction: column; gap: 60px; }
          .cb-footer-nav { gap: 8px 40px; }
        }
        @media (max-width: 768px) {
          .cb-footer { padding: 80px 20px 30px; }
          .cb-footer-cta { margin-bottom: 80px; }
          .cb-footer-title { font-size: clamp(3rem, 10vw, 5rem); }
          .cb-pill { padding: 12px 20px; font-size: 0.9rem; }
          .cb-footer-bottom { flex-direction: column; gap: 24px; align-items: flex-start; }
        }
        @media (max-width: 480px) {
          .cb-footer { padding: 60px 16px 24px; }
          .cb-pill-row { flex-direction: column; }
          .cb-pill { width: 100%; justify-content: center; }
          .cb-footer-nav { grid-template-columns: 1fr; gap: 6px; }
          .cb-social-icon { width: 40px; height: 40px; font-size: 1rem; }
        }
      `}</style>
    </footer>
  )
}

export default Footer
