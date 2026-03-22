'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { IoClose, IoMenu, IoChevronDown } from 'react-icons/io5'
import { gsap } from 'gsap'
import MagneticButton from './animations/MagneticButton'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [isVisible, setIsVisible] = useState(true)

  const pathname = usePathname()
  const menuRef = useRef(null)
  const navRef = useRef(null)
  const lastScrollYRef = useRef(0)
  const rafRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) return
      rafRef.current = requestAnimationFrame(() => {
        const currentScrollY = window.scrollY

        setIsScrolled(currentScrollY > 20)

        if (currentScrollY > lastScrollYRef.current && currentScrollY > 100) {
          setIsVisible(false)
        } else {
          setIsVisible(true)
        }

        lastScrollYRef.current = currentScrollY
        rafRef.current = null
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  useEffect(() => {
    if (menuRef.current) {
      if (isOpen) {
        gsap.to(menuRef.current, { y: 0, opacity: 1, duration: 0.6, ease: 'power4.out', display: 'flex' })
        document.body.style.overflow = 'hidden'
      } else {
        gsap.to(menuRef.current, { y: '-100%', opacity: 0, duration: 0.5, ease: 'power4.in', display: 'none' })
        document.body.style.overflow = 'auto'
      }
    }
  }, [isOpen])

  const services = [
    { title: 'Website Development', path: '/services/website-development/' },
    { title: 'Mobile App Development', path: '/services/mobile-app-development/' },
    { title: 'UI/UX Design', path: '/services/ui-ux-design/' },
    { title: 'CMS & E-commerce', path: '/services/cms-ecommerce/' },
    { title: 'Digital Marketing', path: '/services/digital-marketing/' },
    { title: 'Payment & Shipping API', path: '/services/payment-shipping-api/' },
  ]

  const navLinks = [
    { title: 'Home', path: '/' },
    { title: 'About', path: '/about/' },
    { title: 'Services', path: '/services/', hasDropdown: true },
    { title: 'Pricing', path: '/pricing/' },
    { title: 'Contact', path: '/contact/' },
  ]

  return (
    <nav
      ref={navRef}
      className={`navbar ${isScrolled ? 'scrolled' : ''} ${!isVisible ? 'nav-hidden' : ''}`}
    >
      <div className="container nav-container">
        {/* Logo */}
        <Link href="/" className="logo-wrap">
          <Image
            src="/images/logo-color.svg"
            alt="Prominent TechnoLabs"
            width={180}
            height={48}
            priority
            className="nav-logo"
            style={{ width: 'auto', height: '48px', objectFit: 'contain', verticalAlign: 'middle' }}
          />
        </Link>

        {/* Desktop Navigation */}
        <ul className="nav-links">
          {navLinks.map((link) => (
            <li
              key={link.title}
              className={`nav-item ${link.hasDropdown ? 'has-dropdown' : ''}`}
              onMouseEnter={() => link.hasDropdown && setActiveDropdown(true)}
              onMouseLeave={() => link.hasDropdown && setActiveDropdown(false)}
            >
              <Link
                href={link.path}
                className={`link ${pathname === link.path ? 'active' : ''}`}
              >
                <span className="link-text">{link.title}</span>
                {link.hasDropdown && <IoChevronDown className="chevron" />}
                <div className="link-indicator"></div>
              </Link>

              {link.hasDropdown && (
                <div className={`mega-menu ${activeDropdown ? 'show' : ''}`}>
                  <div className="mega-grid">
                    {services.map((service) => (
                      <Link key={service.title} href={service.path} className="mega-item">
                        {service.title}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>

        {/* Mobile Toggle */}
        <button className="mobile-toggle" onClick={() => setIsOpen(true)}>
          <IoMenu />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div ref={menuRef} className="mobile-overlay">
        <button className="close-menu" onClick={() => setIsOpen(false)}>
          <IoClose />
        </button>
        <div className="mobile-links">
          {navLinks.map((link) => (
            <div key={link.title} className="mobile-link-item">
              {link.hasDropdown ? (
                <div className="mobile-dropdown">
                  <span className="mobile-link-main">Services</span>
                  <div className="mobile-sublinks">
                    {services.map((s) => (
                      <Link key={s.title} href={s.path} onClick={() => setIsOpen(false)}>
                        {s.title}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link href={link.path} onClick={() => setIsOpen(false)}>
                  {link.title}
                </Link>
              )}
            </div>
          ))}
          {/* Mobile CTA removed */}
        </div>
      </div>

      <style>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 1000;
          height: var(--nav-height);
          display: flex;
          align-items: center;
          transition: var(--trans-smooth);
        }
        .navbar.scrolled {
          height: 80px;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(0, 0, 0, 0.05);
        }
        .nav-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
        }
        .nav-hidden {
          transform: translateY(-100%);
        }
        .nav-links {
          display: flex;
          gap: 2.5rem;
          list-style: none;
        }
        .nav-item {
          position: relative;
        }
        .link {
          font-family: var(--font-heading);
          color: #000;
          font-weight: 700;
          font-size: 0.85rem;
          text-transform: uppercase;
          text-decoration: none;
          letter-spacing: 0.1em;
          display: flex;
          align-items: center;
          gap: 5px;
          position: relative;
          opacity: 0.9;
          transition: var(--trans-fast);
          padding: 10px 0;
        }
        .link:hover, .link.active {
          opacity: 1;
        }
        .link-indicator {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background: var(--brand-orange);
          transition: width 0.6s var(--ease-expo);
          transform-origin: left;
        }
        .link:hover .link-indicator {
          width: 100%;
        }
        .link.active {
          opacity: 1;
        }
        .link.active .link-text {
          color: var(--brand-orange);
        }
        .link .chevron {
          font-size: 0.8rem;
          transition: transform 0.3s;
        }
        .nav-item:hover .chevron {
          transform: rotate(180deg);
        }
        
        .nav-btn {
          padding: 0.8rem 2rem;
          font-size: 0.9rem;
          background: var(--brand-orange) !important;
          color: white !important;
          border-color: var(--brand-orange) !important;
          opacity: 1 !important;
          visibility: visible !important;
        }
        .nav-btn:hover {
          background: #000 !important;
          color: white !important;
          border-color: #000 !important;
        }

        .mega-menu {
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%) translateY(20px);
          background: #ffffff;
          border: 1px solid rgba(0, 0, 0, 0.08);
          border-radius: 20px;
          padding: 1.5rem;
          width: 450px;
          opacity: 0;
          visibility: hidden;
          transition: all 0.4s var(--ease-expo);
          box-shadow: 0 30px 60px rgba(0,0,0,0.1);
        }
        .mega-menu.show {
          opacity: 1;
          visibility: visible;
          transform: translateX(-50%) translateY(0);
        }
        .mega-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 10px;
        }
        .mega-item {
          padding: 0.8rem 1.2rem;
          color: #444;
          border-radius: 10px;
          font-weight: 500;
          transition: var(--trans-fast);
          text-decoration: none;
        }
        .mega-item:hover {
          background: rgba(0,0,0,0.03);
          color: var(--brand-orange);
          padding-left: 1.5rem;
        }

        .mobile-toggle {
          display: none;
          font-size: 2rem;
          color: #000;
          background: none;
          border: none;
          cursor: pointer;
        }

        .mobile-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          background: var(--bg-dark);
          z-index: 2000;
          display: none;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 40px;
          opacity: 0;
          transform: translateY(-100%);
        }
        .close-menu {
          position: absolute;
          top: 30px;
          right: 30px;
          font-size: 2.5rem;
          color: white;
          background: none;
          border: none;
          cursor: pointer;
        }
        .mobile-links {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          text-align: center;
        }
        .mobile-links a, .mobile-link-main {
          font-family: var(--font-heading);
          font-size: 1.8rem;
          font-weight: 700;
          color: white;
          text-decoration: none;
        }
        .mobile-sublinks {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-top: 1rem;
        }
        .mobile-sublinks a {
          font-size: 1.1rem;
          font-weight: 400;
          color: var(--text-secondary);
        }

        @media (max-width: 1024px) {
          .nav-links, .nav-cta { display: none; }
          .mobile-toggle { display: block; }
        }
      `}</style>
    </nav>
  )
}

export default Navbar
