'use client'

import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FaInstagram, FaFacebookF, FaYoutube, FaLinkedinIn } from 'react-icons/fa'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

const Footer = () => {
  const pathname = usePathname()
  const footerContainerRef = useRef(null)

  const socialLinks = [
    { icon: <FaInstagram />, url: 'https://www.instagram.com/prominent_technolabs/', label: 'Instagram' },
    { icon: <FaLinkedinIn />, url: 'https://in.linkedin.com/company/prominent-technolab', label: 'LinkedIn' },
    { icon: <FaFacebookF />, url: 'https://www.facebook.com/people/Prominent-TechnoLabs/61556264138689/', label: 'Facebook' },
    { icon: <FaYoutube />, url: 'https://www.youtube.com/@Prominentechnolabs', label: 'YouTube' },
  ]

  const navLinks = [
    { label: 'Services', path: '/services/' },
    { label: 'Portfolio', path: '/portfolio/' },
    { label: 'Company', path: '/about/' },
    { label: 'Blog', path: '/blog/' },
    { label: 'Contacts', path: '/contact/' },
  ]

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      // Footer animations handled by global TextReveal and local scale effects for buttons
      gsap.fromTo('.cb-footer-tellus-btn',
        { scale: 0.9, opacity: 0 },
        {
          scale: 1, opacity: 1, duration: 1.6, ease: 'power4.out', delay: 0.2,
          scrollTrigger: { trigger: '.cb-footer-hero', start: 'top 80%' }
        }
      )
    }, footerContainerRef)
    return () => ctx.revert()
  }, [pathname])

  return (
    <div ref={footerContainerRef}>
      {/* 1. TOP CTA SECTION (Title & Button Only) - Hidden on Contact page */}
      {!pathname.startsWith('/contact') && (
        <div className="cb-footer-hero">
          <div className="cb-footer-bg-wrap">
            <video
              className="cb-footer-video"
              autoPlay
              muted
              loop
              playsInline
              src="/videos/footer-video.mp4"
            />
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
      )}

      <footer className="cb-footer">
        {/* 2. INFORMATION & NAVIGATION SECTION (First Line) */}
        <div className="cb-footer-info-row">
          <div className="cb-footer-container">
            {/* Left: Email, Phone, Office */}
            <div className="cb-info-col">
              <div className="cb-info-flex-row">
                <div className="cb-info-block">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <a href="mailto:info@prominenttechnolabs.com" className="cb-pill">
                      <span className="cb-pill-inner">
                        <span className="cb-pill-old">info@prominenttechnolabs.com</span>
                        <span className="cb-pill-new">info@prominenttechnolabs.com</span>
                      </span>
                    </a>
                    <a href="tel:+919327603253" className="cb-pill">
                      <span className="cb-pill-inner">
                        <span className="cb-pill-old">+91 93276 03253</span>
                        <span className="cb-pill-new">+91 93276 03253</span>
                      </span>
                    </a>
                  </div>
                </div>

                <div className="cb-info-block">
                  <div className="cb-address-group">
                    <div className="cb-address-line">
                      <span className="cb-label">OFFICE</span>
                      <span className="cb-addr-white">G-108, Titanium City Center</span>
                    </div>
                    <div className="cb-addr-white">100 Feet Anand Nagar Rd, near SACHIN TOWER</div>
                    <div className="cb-addr-white">Ahmedabad, Gujarat 380015</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Page Links (2 Columns) */}
            <div className="cb-footer-navs-col">
              <div className="cb-footer-navs">
                {navLinks.map(link => (
                  <Link key={link.label} href={link.path} className="cb-footer-nav">
                    <span className="cb-footer-nav-inner">
                      <span className="cb-footer-nav-old">{link.label}</span>
                      <span className="cb-footer-nav-new">{link.label}</span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 3. LEGAL & SOCIAL SECTION (Second Line) */}
        <div className="cb-footer-bottom-row">
          <div className="cb-footer-container cb-footer-bottom-container">
            {/* Left: Privacy, Terms, Copyright */}
            <div className="cb-legal-col">
              <div className="cb-legal-links">
                <span className="cb-copyright">© {new Date().getFullYear()}, Prominent TechnoLabs</span>
                <a href="https://sites.google.com/view/prominettechnolabsprivacy/home" target="_blank" rel="noopener noreferrer" className="cb-legal-link">Privacy Policy</a>
                <a href="https://sites.google.com/view/prominenttearmsconditions/home" target="_blank" rel="noopener noreferrer" className="cb-legal-link">Terms and Conditions</a>
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
          grid-template-columns: 1.5fr 0.5fr;
          gap: 60px;
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
        .cb-footer-bg-wrap { 
          position: absolute; 
          inset: 0; 
          z-index: 0; 
          overflow: hidden; 
          background: #000;
        }
        .cb-footer-nav { 
          text-decoration: none; 
          color: #fff; 
          font-size: 1.3rem; 
          font-weight: 500; 
          position: relative;
          overflow: hidden;
          padding: 4px 0;
          display: inline-block;
          transition: opacity 0.3s ease;
        }
        .cb-footer-nav-inner {
          display: flex;
          flex-direction: column;
          height: 1.4em; 
          line-height: 1.4;
          overflow: hidden;
          position: relative;
        }
        .cb-footer-nav-old, .cb-footer-nav-new {
          display: block;
          transition: transform 0.8s cubic-bezier(0.19, 1, 0.22, 1);
          color: #fff;
        }
        .cb-footer-nav-new {
          position: absolute;
          top: 100%;
          left: 0;
          width: 100%;
        }
        .cb-footer .cb-footer-nav:hover .cb-footer-nav-old {
          transform: translateY(-120%);
        }
        .cb-footer .cb-footer-nav:hover .cb-footer-nav-new {
          transform: translateY(-100%);
        }
        .cb-footer .cb-footer-nav:hover { opacity: 1; }
        .cb-footer-video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: opacity 0.5s ease;
        }
        
        .cb-hero-overlay { 
          position: absolute; 
          inset: 0; 
          z-index: 1; 
          opacity: 0.5 !important; 
          pointer-events: none;
        }
        .cb-footer-hero .cb-hero-content { 
          position: relative; 
          z-index: 2; 
          text-align: center; 
          width: 100%; 
          display: flex; 
          flex-direction: column; 
          align-items: center; 
          justify-content: center;
          gap: 20px; 
          padding-top: 0;
        }
        
        .cb-footer-hero .cb-hero-title {
          font-size: clamp(2.8rem, 8vw, 8rem) !important;
          font-weight: 300 !important;
          line-height: 1 !important;
          letter-spacing: -0.04em !important;
          color: #fff !important;
          margin: 0 !important;
          text-transform: none !important;
        }

        /* MASSIVE PILL BUTTON - EXACT MATCH */
        .cb-footer-tellus-btn {
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
          padding: clamp(5px, 1vw, 15px) clamp(20px, 3vw, 40px) !important;
          border: 1px solid rgba(255,255,255,0.7) !important;
          border-radius: 500px !important;
          background: transparent !important;
          color: #fff !important;
          font-size: clamp(2.8rem, 8vw, 8rem) !important; 
          font-weight: 300 !important;
          text-transform: uppercase !important;
          letter-spacing: -0.05em !important;
          text-decoration: none !important;
          position: relative;
          overflow: hidden;
          transition: transform 0.8s cubic-bezier(0.19, 1, 0.22, 1) !important;
          cursor: pointer;
          width: fit-content;
          margin-top: 0px !important;
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
          transition: transform 1.2s cubic-bezier(0.19, 1, 0.22, 1);
          z-index: 0;
        }
        .cb-footer-tellus-btn:hover::before { transform: translateY(-70%); }
        
        .cb-footer-hero .btn-inner { position: relative; z-index: 1; display: inline-flex; height: 1.1em; line-height: 1.1em; overflow: hidden; }
        .cb-footer-hero .btn-text-old { display: block; transition: transform 1.2s cubic-bezier(0.19, 1, 0.22, 1); color: #fff; }
        .cb-footer-hero .btn-text-new { position: absolute; top: 100%; left: 0; width: 100%; text-align: center; color: #000 !important; transition: transform 1.2s cubic-bezier(0.19, 1, 0.22, 1); }
        .cb-footer-tellus-btn:hover .btn-text-old { transform: translateY(-100%); }
        .cb-footer-tellus-btn:hover .btn-text-new { transform: translateY(-100%); }
        .cb-footer:disabled { opacity: 0.4; cursor: not-allowed; }

        /* 2. INFORMATION & NAVIGATION */
        .cb-footer-info-row { padding: 100px 0 20px; background: #000; }
        .cb-info-flex-row { display: flex; gap: 40px; align-items: flex-start; }
        .cb-info-block { display: flex; flex-direction: column; gap: 40px; }
        .cb-footer .cb-pill {
          display: inline-flex;
          padding: 14px 34px;
          border: 1px solid rgba(255,255,255,0.7) !important;
          border-radius: 100px !important;
          color: #ffffff !important;
          text-decoration: none !important;
          font-size: 1.25rem;
          font-weight: 500;
          width: fit-content;
          position: relative;
          overflow: hidden;
          background: transparent;
        }
        .cb-pill::before {
          content: '';
          position: absolute;
          top: 100%;
          left: -50%;
          width: 200%;
          height: 300%;
          background: #fff;
          border-radius: 50%;
          transform: translateY(0);
          transition: transform 1.2s cubic-bezier(0.19, 1, 0.22, 1);
          z-index: 0;
        }
        .cb-pill:hover::before {
          transform: translateY(-60%);
        }
        .cb-pill:hover {
          border-color: #fff !important;
        }
        .cb-pill-inner {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          height: 1.4em; 
          line-height: 1.4;
          overflow: hidden;
        }
        .cb-pill-old, .cb-pill-new {
          display: block;
          transition: transform 0.8s cubic-bezier(0.19, 1, 0.22, 1);
          white-space: nowrap;
        }
        .cb-pill-new {
          position: absolute;
          top: 100%;
          left: 0;
          width: 100%;
          color: #000 !important;
        }
        .cb-pill:hover .cb-pill-old {
          transform: translateY(-120%);
        }
        .cb-pill:hover .cb-pill-new {
          transform: translateY(-100%);
        }
        
        .cb-footer .cb-address-group { display: flex; flex-direction: column; gap: 8px; }
        .cb-footer .cb-address-line { display: flex; align-items: baseline; gap: 8px; }
        .cb-footer .cb-label { font-size: 0.85rem; color: #777; letter-spacing: 0.05em; text-transform: uppercase; font-weight: 600; margin: 0; }
        .cb-footer .cb-addr-white { font-size: 0.95rem; color: #fff !important; line-height: 1.5; font-weight: 400; white-space: nowrap; }
        
        .cb-footer .cb-footer-navs-col { width: 100%; display: flex; justify-content: flex-end; }
        .cb-footer .cb-footer-navs { 
          display: grid;
          grid-template-columns: auto auto;
          row-gap: 15px;
          column-gap: 80px;
          justify-content: end;
          text-align: right;
        }

        /* 3. LEGAL & SOCIAL */
        .cb-footer-bottom-row { padding: 40px 0 60px; background: #000; }
        .cb-footer .cb-footer-bottom-container { align-items: center; } 
        .cb-footer .cb-legal-col { justify-self: start; }
        .cb-footer .cb-legal-links { display: flex; align-items: center; gap: 30px; }
        .cb-footer .cb-legal-link { font-size: 0.95rem; color: #ffffff !important; text-decoration: none !important; font-weight: 500; transition: opacity 0.3s; }
        .cb-footer .cb-legal-link:hover { opacity: 0.6 !important; }
        .cb-footer .cb-copyright { font-size: 0.95rem; color: #555; }
        
        .cb-social-col { justify-self: end; }
        .cb-social-icons { display: flex; gap: 10px; justify-content: flex-end; }
        .cb-social-circle { 
          width: 52px !important; height: 52px !important; 
          border-radius: 50% !important; 
          background: #1a1a1a !important;
          border: none !important; 
          display: flex !important; align-items: center !important; justify-content: center !important; 
          color: #fff !important; font-size: 1.25rem !important; 
          transition: all 0.5s cubic-bezier(0.19, 1, 0.22, 1) !important; 
        }
        .cb-social-circle:hover { background: #333 !important; transform: scale(1.05); }

        @media (max-width: 1280px) {
          .cb-footer .cb-footer-container { 
            grid-template-columns: 1fr !important; 
            gap: 60px !important; 
          }
          .cb-footer .cb-footer-navs-col { 
            justify-content: flex-start !important; 
            width: 100% !important;
          }
          .cb-footer .cb-footer-navs { 
            justify-content: start !important; 
            justify-items: start !important;
            text-align: left !important; 
            column-gap: 60px !important;
          }
          .cb-footer .cb-footer-nav { text-align: left !important; }
          .cb-footer .cb-info-flex-row { flex-direction: row; flex-wrap: wrap; gap: 30px; }
          
          .cb-footer .cb-footer-bottom-container { 
            display: flex !important; 
            flex-direction: column !important; 
            align-items: flex-start !important; 
            gap: 40px !important; 
          }
          .cb-footer .cb-social-col { order: 1 !important; justify-self: start !important; width: 100% !important; }
          .cb-footer .cb-social-icons { justify-content: flex-start !important; }
          .cb-footer .cb-legal-col { order: 2 !important; justify-self: start !important; width: 100% !important; }
          .cb-footer .cb-legal-links { justify-content: flex-start !important; }
        }
        @media (max-width: 768px) {
          .cb-footer-hero { height: 60vh !important; }
          .cb-hero-title { font-size: 3.2rem !important; }
          .cb-footer-tellus-btn { padding: 12px 30px !important; font-size: 1.8rem !important; }
          
          .cb-footer-navs { grid-template-columns: auto auto; column-gap: 50px; row-gap: 12px; }
          .cb-legal-links { flex-direction: row; flex-wrap: wrap; align-items: center; gap: 15px; }
          
          .cb-footer .cb-pill { font-size: 1.1rem; padding: 12px 24px; max-width: 100%; word-break: break-all; }
        }
        @media (max-width: 480px) {
          .cb-footer-hero { height: 50vh !important; }
          .cb-hero-title { font-size: 2.6rem !important; }
          .cb-footer-hero .cb-hero-content { gap: 20px !important; }
          .cb-footer-tellus-btn { font-size: 1.5rem !important; }
        }
      `}</style>
      </footer>
    </div>
  )
}

export default Footer
