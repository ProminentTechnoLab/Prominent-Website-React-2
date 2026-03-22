'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  FaFacebookF, FaLinkedinIn,
  FaInstagram, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaYoutube
} from 'react-icons/fa'
import { RiTwitterXFill } from 'react-icons/ri'
import MagneticButton from './animations/MagneticButton'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const services = [
    { title: 'Website Development', path: '/services/website-development/' },
    { title: 'Mobile App Development', path: '/services/mobile-app-development/' },
    { title: 'UI/UX Design', path: '/services/ui-ux-design/' },
    { title: 'CMS & E-commerce', path: '/services/cms-ecommerce/' },
    { title: 'Digital Marketing', path: '/services/digital-marketing/' },
    { title: 'Payment & Shipping API', path: '/services/payment-shipping-api/' },
  ]

  const socialLinks = [
    { icon: <FaLinkedinIn />, url: 'https://linkedin.com/company/prominent-technolabs/', label: 'LinkedIn', id: 'footer-social-linkedin' },
    { icon: <FaInstagram />, url: 'https://instagram.com/prominenttechnolabs/', label: 'Instagram', id: 'footer-social-instagram' },
    { icon: <FaFacebookF />, url: 'https://facebook.com/prominenttechnolabs/', label: 'Facebook', id: 'footer-social-facebook' },
    { icon: <RiTwitterXFill />, url: 'https://twitter.com/prominenttech/', label: 'Twitter', id: 'footer-social-twitter' },
    { icon: <FaYoutube />, url: 'https://youtube.com/@prominenttechnolabs', label: 'YouTube', id: 'footer-social-youtube' }
  ]

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container">
          <div className="footer-grid">
            {/* Brand Col */}
            <div className="footer-col brand-col">
              <Link href="/" className="footer-logo">
                <Image
                  src="/images/logo-white.svg"
                  alt="Prominent TechnoLabs"
                  width={240}
                  height={60}
                  className="logo-img"
                  style={{ objectFit: 'contain', objectPosition: 'left' }}
                />
              </Link>
              <p className="brand-desc">
                Elevating global businesses through superior digital engineering and immersive design. India's premier digital innovation studio.
              </p>
              <div className="social-links-large">
                {socialLinks.map((link) => (
                  <MagneticButton key={link.label} strength={20}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      id={link.id}
                      className="social-btn-large"
                      aria-label={link.label}
                    >
                      {link.icon}
                    </a>
                  </MagneticButton>
                ))}
              </div>
            </div>

            {/* Links Columns */}
            <div className="footer-col links-col">
              <h4 className="footer-h">Services</h4>
              <ul className="footer-links">
                {services.map((s) => (
                  <li key={s.title}>
                    <Link href={s.path}>{s.title}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-col links-col">
              <h4 className="footer-h">Company</h4>
              <ul className="footer-links">
                <li><Link href="/about/">About</Link></li>
                <li><Link href="/services/">Services Hub</Link></li>
                <li><Link href="/pricing/">Pricing</Link></li>
                <li><Link href="/contact/">Contact</Link></li>
              </ul>
            </div>

            {/* Contact Col */}
            <div className="footer-col contact-col">
              <h4 className="footer-h">Contact</h4>
              <div className="contact-info">
                <a href="mailto:info@prominenttechnolabs.com" className="contact-item">
                  <FaEnvelope className="icon" /> info@prominenttechnolabs.com
                </a>
                <a href="tel:+919327603253" className="contact-item">
                  <FaPhoneAlt className="icon" /> +91 93276 03253
                </a>
                <div className="contact-item align-start">
                  <FaMapMarkerAlt className="icon mt-5" />
                  <span>Ahmedabad, Gujarat, India</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container bottom-container">
          <p className="copyright">
            © {currentYear} Prominent TechnoLabs. All rights reserved.
          </p>
          <div className="legal-links">
            <a href="https://sites.google.com/view/prominettechnolabsprivacy/home" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
            <span className="sep">|</span>
            <a href="https://sites.google.com/view/prominenttearmsconditions/home" target="_blank" rel="noopener noreferrer">Terms of Service</a>
          </div>
        </div>
      </div>

      <style>{`
        .footer {
          background: #000;
          color: white;
          padding-top: 10vw;
          border-top: 1px solid var(--glass-border);
          position: relative;
          z-index: 10;
        }
        .footer-top {
          padding-bottom: 8vw;
        }
        .footer-grid {
          display: grid;
          grid-template-columns: 1.2fr 1.4fr 0.8fr 1.3fr;
          gap: 5vw;
        }

        .brand-col { 
          max-width: 450px; 
          text-align: left;
        }
        .footer-logo { 
          display: block; 
          margin-bottom: 3rem; 
          text-align: left;
        }
        .logo-img {
          object-position: left; /* Align to the exact left of the container */
        }
        .brand-desc { 
          font-size: 1.1rem; 
          color: var(--text-secondary); 
          line-height: 1.6; 
          margin-bottom: 4rem;
          opacity: 0.6;
          text-align: left;
        }

        .social-links-large {
          display: flex;
          gap: 15px;
        }
        .social-btn-large {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--glass-border);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 1.8rem;
          transition: all 0.4s var(--ease-expo);
        }
        .social-btn-large:hover {
          background: var(--brand-orange);
          border-color: var(--brand-orange);
          transform: translateY(-5px);
        }

        .footer-h {
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.2rem;
          color: var(--text-muted);
          margin-bottom: 3rem;
          font-weight: 700;
        }

        .footer-links {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .footer-links a {
          color: var(--text-secondary);
          text-decoration: none;
          font-size: 1rem;
          transition: var(--trans-fast);
          opacity: 0.6;
        }
        .footer-links a:hover {
          color: var(--brand-orange);
          opacity: 1;
          padding-left: 10px;
        }

        .contact-info {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        .contact-item {
          display: flex;
          align-items: center;
          gap: 15px;
          color: var(--text-secondary);
          text-decoration: none;
          transition: 0.3s;
          opacity: 0.6;
          font-size: 1rem;
        }
        .contact-item:hover { opacity: 1; color: white; }
        .contact-item .icon { color: var(--brand-orange); font-size: 1.1rem; }
        .align-start { align-items: flex-start; }
        .mt-5 { margin-top: 5px; }

        .footer-bottom {
          border-top: 1px solid var(--glass-border);
          padding: 3rem 0;
        }
        .bottom-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .copyright {
          font-size: 0.9rem;
          color: var(--text-muted);
        }
        .legal-links {
          display: flex;
          gap: 2rem;
          align-items: center;
        }
        .legal-links a {
          color: var(--text-muted);
          text-decoration: none;
          font-size: 0.9rem;
          transition: 0.3s;
        }
        .legal-links a:hover {
          color: white;
        }
        .sep {
          color: var(--glass-border);
          font-size: 0.8rem;
        }

        @media (max-width: 1200px) {
          .footer-grid { grid-template-columns: 1fr 1fr; gap: 80px; }
        }
        @media (max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr; gap: 60px; }
          .social-btn-large { width: 55px; height: 55px; font-size: 1.4rem; }
        }
      `}</style>
    </footer>
  )
}

export default Footer
