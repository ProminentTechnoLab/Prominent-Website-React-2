'use client'

import React from 'react'
import Link from 'next/link'
import { FaInstagram, FaFacebookF, FaYoutube, FaLinkedinIn } from 'react-icons/fa'
import { RiTwitterXFill } from 'react-icons/ri'

const Footer = () => {
  const socialLinks = [
    { icon: <FaInstagram />, url: 'https://instagram.com/prominenttechnolabs/', label: 'Instagram' },
    { icon: <FaYoutube />, url: 'https://youtube.com/@prominenttechnolabs', label: 'YouTube' },
    { icon: <FaLinkedinIn />, url: 'https://linkedin.com/company/prominent-technolabs/', label: 'LinkedIn' },
    { icon: <FaFacebookF />, url: 'https://facebook.com/prominenttechnolabs/', label: 'Facebook' },
    { icon: <RiTwitterXFill />, url: 'https://twitter.com/prominenttech/', label: 'Twitter' },
  ]

  const navLinks = [
    { label: 'Services', path: '/services/' },
    { label: 'About', path: '/about/' },
    { label: 'Pricing', path: '/pricing/' },
    { label: 'Contact', path: '/contact/' },
  ]

  return (
    <footer className="cb-footer">
      {/* 1. TOP CTA SECTION (Title & Button Only) */}
      <div className="cb-footer-hero">
        <div className="cb-footer-bg-wrap">
          <div className="mesh-gradient"></div>
        </div>
        <div className="cb-hero-overlay"></div>
        
        <div className="cb-hero-content">
          <h2 className="cb-hero-title">Have <br /> an idea?</h2>
          
          <Link href="/contact/" className="cb-footer-tellus-btn">
            <span className="btn-inner">
              <span className="btn-text-old">TELL US</span>
              <span className="btn-text-new">TELL US</span>
            </span>
          </Link>
        </div>
      </div>

      {/* 2. INFORMATION & NAVIGATION SECTION (First Line) */}
      <div className="cb-footer-info-row">
        <div className="cb-footer-container">
          {/* Left: Email, Phone, Office */}
          <div className="cb-info-col">
            <div className="cb-pill-stack">
              <a href="mailto:prominenttechnolabs@gmail.com" className="cb-pill">prominenttechnolabs@gmail.com</a>
              <a href="tel:+919327603253" className="cb-pill">+91 93276 03253</a>
            </div>
            <div className="cb-address-group">
              <div className="cb-address-line">
                <span className="cb-label">OFFICE</span>
                <p className="cb-addr-text">G-108, Titanium City Center, Ahmedabad, Gujarat 380015</p>
              </div>
            </div>
          </div>

          {/* Right: Page Links (2 Columns) */}
          <div className="cb-footer-navs-col">
            <div className="cb-footer-navs">
              {navLinks.map(link => (
                <Link key={link.label} href={link.path} className="cb-footer-nav">
                  <span className="cb-footer-nav-inner">{link.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 3. LEGAL & SOCIAL SECTION (Second Line) */}
      <div className="cb-footer-bottom-row">
        <div className="cb-footer-container">
          {/* Left: Privacy, Terms, Copyright */}
          <div className="cb-legal-col">
            <div className="cb-legal-links">
              <a href="https://sites.google.com/view/prominettechnolabsprivacy/home" target="_blank" rel="noopener noreferrer" className="cb-legal-link">Privacy Policy</a>
              <a href="https://sites.google.com/view/prominenttearmsconditions/home" target="_blank" rel="noopener noreferrer" className="cb-legal-link">Terms and Condition</a>
              <span className="cb-copyright">© {new Date().getFullYear()}, Prominent TechnoLabs</span>
            </div>
          </div>
          
          {/* Right: Social Icons */}
          <div className="cb-social-col">
            <div className="cb-social-icons">
              {socialLinks.map((s, i) => (
                <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" className="cb-social-circle" aria-label={s.label}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .cb-footer {
          background: #000 !important;
          color: #fff !important;
          font-family: 'Inter', -apple-system, sans-serif;
          width: 100% !important;
          position: relative !important;
          z-index: 10 !important;
          overflow: hidden !important;
        }

        .cb-footer-container {
          max-width: 1440px;
          margin: 0 auto;
          width: 100%;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 100px;
          align-items: flex-start;
          padding: 0 5vw;
        }

        /* 1. HERO SECTION */
        .cb-footer-hero {
          position: relative;
          height: 100vh;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: #000;
        }
        .cb-footer-bg-wrap { position: absolute; inset: 0; z-index: 0; overflow: hidden; }
        .mesh-gradient {
          position: absolute;
          width: 200%; height: 200%;
          top: -50%; left: -50%;
          background: 
            radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 50%),
            radial-gradient(circle at 20% 80%, rgba(255,255,255,0.08) 0%, transparent 40%),
            radial-gradient(circle at 80% 20%, rgba(255,255,255,0.08) 0%, transparent 40%);
          filter: blur(80px);
          animation: meshFlow 20s ease-in-out infinite alternate;
        }
        @keyframes meshFlow { 0% { transform: rotate(0deg) scale(1); } 100% { transform: rotate(15deg) scale(1.1); } }
        
        .cb-footer .cb-hero-overlay { position: absolute; inset: 0; background: #000; z-index: 1; opacity: 0.7 !important; }
        .cb-footer .cb-hero-content { 
          position: relative; 
          z-index: 2; 
          text-align: center; 
          width: 100%; 
          display: flex; 
          flex-direction: column; 
          align-items: center; 
          gap: 40px; 
          padding-top: 15vh; /* Added 15vh of top gap as per user suggestion */
        }
        
        .cb-footer .cb-hero-title {
          font-size: clamp(3rem, 9.5vw, 8rem) !important;
          font-weight: 400 !important;
          line-height: .8 !important;
          letter-spacing: -0.04em !important;
          color: #fff !important;
          margin: 0 !important;
          text-transform: none !important;
        }

        /* MASSIVE PILL BUTTON - EXACT MATCH */
        .cb-footer .cb-footer-tellus-btn {
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
          padding: 30px 80px !important;
          border: 1px solid rgba(255,255,255,0.8) !important;
          border-radius: 500px !important;
          background: transparent !important;
          color: #fff !important;
          font-size: 3.5rem !important; 
          font-weight: 400 !important;
          text-transform: uppercase !important;
          text-decoration: none !important;
          position: relative;
          overflow: hidden;
          transition: transform 0.4s cubic-bezier(0.19, 1, 0.22, 1) !important;
          cursor: pointer;
          width: fit-content;
          margin-top: 20px !important;
        }
        .cb-footer-tellus-btn:hover {
          transform: scale(1.03) !important;
        }
        
        .cb-footer-tellus-btn::before {
          content: '';
          position: absolute;
          top: 100%; left: -50%;
          width: 200%; height: 300%;
          background: #ffffff;
          border-radius: 50%;
          transition: transform 0.8s cubic-bezier(0.19, 1, 0.22, 1);
          z-index: 0;
        }
        .cb-footer-tellus-btn:hover::before { transform: translateY(-70%); }
        
        .cb-footer .btn-inner { position: relative; z-index: 1; display: inline-flex; height: 1.1em; line-height: 1.1em; overflow: hidden; }
        .cb-footer .btn-text-old { display: block; transition: transform 0.8s cubic-bezier(0.19, 1, 0.22, 1); color: #fff; }
        .cb-footer .btn-text-new { position: absolute; top: 100%; left: 0; width: 100%; text-align: center; color: #000 !important; transition: transform 0.8s cubic-bezier(0.19, 1, 0.22, 1); }
        .cb-footer .cb-footer-tellus-btn:hover .btn-text-old { transform: translateY(-100%); }
        .cb-footer .cb-footer-tellus-btn:hover .btn-text-new { transform: translateY(-100%); }

        /* 2. INFORMATION & NAVIGATION */
        .cb-footer-info-row { padding: 120px 0; background: #000; }
        .cb-pill-stack { display: flex; flex-direction: column; gap: 15px; margin-bottom: 50px; }
        .cb-pill {
          display: inline-flex;
          padding: 16px 36px;
          border: 1px solid rgba(255,255,255,0.2) !important;
          border-radius: 100px !important;
          color: #ffffff !important;
          text-decoration: none !important;
          font-size: 1.2rem;
          width: fit-content;
          transition: all 0.4s ease;
          background: transparent;
        }
        .cb-pill:hover { background: #fff !important; color: #000 !important; border-color: #fff !important; }
        
        .cb-address-group { display: flex; flex-direction: column; gap: 40px; }
        .cb-label { font-size: 0.75rem; color: #777; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 12px; display: block; font-weight: 600; }
        .cb-addr-text { font-size: 1.35rem; color: #fff !important; line-height: 1.3; max-width: 320px; font-weight: 500; }
        
        .cb-footer-navs-col { width: 100%; }
        .cb-footer-navs { 
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 15px 60px;
          justify-items: end;
          text-align: right;
          width: 100%;
        }
        .cb-footer-nav, .cb-footer .cb-footer-nav * { 
          font-size: 1.3rem !important; 
          font-weight: 500 !important; 
          color: #ffffff !important; 
          text-decoration: none !important; 
          display: inline-block !important;
          transition: opacity 0.3s ease !important;
          opacity: 1 !important;
          outline: none !important;
          border: none !important;
          background: none !important;
        }
        .cb-footer-nav:hover { opacity: 0.5 !important; }

        /* 3. LEGAL & SOCIAL */
        .cb-footer-bottom-row { padding: 60px 0; background: #000; }
        .cb-legal-col { display: flex; align-items: center; justify-self: start; }
        .cb-legal-links { display: flex; align-items: center; gap: 30px; }
        .cb-legal-link { font-size: 0.95rem; color: #ffffff !important; text-decoration: none !important; opacity: 0.6; transition: opacity 0.3s; }
        .cb-legal-link:hover { opacity: 1 !important; }
        .cb-copyright { font-size: 0.95rem; color: #555; margin-left: 20px; }
        
        .cb-social-col { justify-self: end; }
        .cb-social-icons { display: flex; gap: 12px; justify-content: flex-end; }
        .cb-social-circle { 
          width: 54px !important; height: 54px !important; 
          border-radius: 50% !important; 
          border: 1px solid rgba(255,255,255,0.15) !important; 
          display: flex !important; align-items: center !important; justify-content: center !important; 
          color: #fff !important; font-size: 1.35rem !important; 
          transition: all 0.5s cubic-bezier(0.19, 1, 0.22, 1) !important; 
        }
        .cb-social-circle:hover { background: #fff !important; color: #000 !important; border-color: #fff !important; transform: translateY(-5px); }

        @media (max-width: 1024px) {
          .cb-footer-container { grid-template-columns: 1fr; gap: 80px; }
          .cb-footer-navs { justify-items: start; text-align: left; }
          .cb-footer-nav { font-size: 3rem !important; }
          .cb-footer-navs-col { min-width: auto; }
        }
        @media (max-width: 768px) {
        .cb-footer .cb-hero-title { font-size: 5rem !important; }
        .cb-footer .cb-footer-tellus-btn { padding: 25px 50px !important; font-size: 2.5rem !important; }
          .cb-legal-links { flex-direction: column; align-items: flex-start; gap: 15px; }
          .cb-copyright { margin-left: 0; margin-top: 30px; }
        }
      `}</style>
    </footer>
  )
}

export default Footer
