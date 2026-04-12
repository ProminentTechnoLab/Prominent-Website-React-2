'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { gsap } from 'gsap'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [visible, setVisible] = useState(true)
  const pathname = usePathname()
  const navRef = useRef(null)
  const overlayRef = useRef(null)
  const linkRefs = useRef([])
  const lastScrollY = useRef(0)
  const ticking = useRef(false)

  const navLinks = [
    { title: 'Services', path: '/services/' },
    { title: 'About', path: '/about/' },
    { title: 'Pricing', path: '/pricing/' },
    { title: 'Contact', path: '/contact/' },
  ]

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false)
    document.body.style.overflow = ''
  }, [pathname])

  // Scroll direction detection: hide on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      if (ticking.current) return
      ticking.current = true

      requestAnimationFrame(() => {
        const currentScrollY = window.scrollY

        if (currentScrollY <= 10) {
          // At the very top — always show
          setVisible(true)
        } else if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
          // Scrolling DOWN past 80px — hide
          setVisible(false)
        } else if (currentScrollY < lastScrollY.current) {
          // Scrolling UP — show
          setVisible(true)
        }

        lastScrollY.current = currentScrollY
        ticking.current = false
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Magnetic hover effect on desktop nav links
  useEffect(() => {
    const links = linkRefs.current.filter(Boolean)
    const handlers = []
    links.forEach((el) => {
      const onMove = (e) => {
        const rect = el.getBoundingClientRect()
        const x = (e.clientX - (rect.left + rect.width / 2)) * 0.2
        const y = (e.clientY - (rect.top + rect.height / 2)) * 0.2
        gsap.to(el, { x, y, duration: 0.3, ease: 'power2.out' })
      }
      const onLeave = () => {
        gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.3)' })
      }
      el.addEventListener('mousemove', onMove)
      el.addEventListener('mouseleave', onLeave)
      handlers.push({ el, onMove, onLeave })
    })
    return () => handlers.forEach(({ el, onMove, onLeave }) => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    })
  }, [])

  // Mobile overlay animation
  useEffect(() => {
    if (!overlayRef.current) return
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
      gsap.to(overlayRef.current, {
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: 0.8, ease: 'power4.inOut',
        onStart: () => { overlayRef.current.style.display = 'flex' }
      })
      gsap.fromTo('.mob-link', { y: 60, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.06, duration: 0.7, ease: 'power4.out', delay: 0.3 })
    } else {
      document.body.style.overflow = ''
      gsap.to(overlayRef.current, {
        clipPath: 'inset(0% 0% 100% 0%)',
        duration: 0.6, ease: 'power4.inOut',
        onComplete: () => { if (overlayRef.current) overlayRef.current.style.display = 'none' }
      })
    }
  }, [menuOpen])

  return (
    <>
      <nav
        ref={navRef}
        className="cb-nav"
        style={{
          transform: visible ? 'translateY(0)' : 'translateY(-100%)',
        }}
      >
        <div className="cb-nav-inner">
          {/* Logo — original color, no filter */}
          <Link href="/" className="cb-logo">
            <img src="/images/logo-color.svg" alt="Prominent TechnoLabs" className="cb-logo-img" />
          </Link>

          {/* Desktop Links — right-aligned, matching Cuberto exactly */}
          <div className="cb-nav-links">
            {navLinks.map((link, i) => (
              <Link
                key={link.title}
                href={link.path}
                ref={el => linkRefs.current[i] = el}
                className={`cb-nav-link ${pathname.startsWith(link.path) ? 'active' : ''}`}
              >
                {link.title}
              </Link>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button className="cb-menu-btn" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            <div className={`cb-hamburger ${menuOpen ? 'open' : ''}`}>
              <span></span>
              <span></span>
            </div>
          </button>
        </div>
      </nav>

      {/* Full-screen Mobile Overlay */}
      <div ref={overlayRef} className="cb-overlay" style={{ display: 'none', clipPath: 'inset(0% 0% 100% 0%)' }}>
        <div className="cb-overlay-header">
          <Link href="/" className="cb-logo" onClick={() => setMenuOpen(false)}>
            <img src="/images/logo-color.svg" alt="Prominent TechnoLabs" className="cb-logo-img" />
          </Link>
          <button className="cb-close-btn" onClick={() => setMenuOpen(false)} aria-label="Close">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="cb-overlay-body">
          <div className="cb-overlay-label">Menu</div>
          <div className="mob-link-container">
            {[{ title: 'Home', path: '/' }, ...navLinks].map((link) => (
              <Link key={link.title} href={link.path} className="mob-link" onClick={() => setMenuOpen(false)}>
                {link.title}
              </Link>
            ))}
          </div>
        </div>

        <div className="cb-overlay-footer">
          <div className="cb-overlay-label">Get in touch</div>
          <div className="cb-footer-links-row">
            <a href="mailto:info@prominenttechnolabs.com" className="mob-footer-link">info@prominenttechnolabs.com</a>
            <a href="tel:+919327603253" className="mob-footer-link">+91 93276 03253</a>
          </div>
        </div>
      </div>

      <style>{`
        /* ─── Cuberto White Header — Exact Match ─── */
        .cb-nav {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 1000;
          height: 80px;
          background: #ffffff;
          display: flex;
          align-items: center;
          transition: transform 0.5s cubic-bezier(0.19, 1, 0.22, 1);
          will-change: transform;
        }

        .cb-nav-inner {
          width: 100%;
          padding: 0 100px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        /* Logo — original color, no filter */
        .cb-logo {
          display: flex;
          align-items: center;
          text-decoration: none;
          flex-shrink: 0;
        }
        .cb-logo-img {
          height: 46px;
          width: auto;
          display: block;
          /* NO filter — original brand colors */
        }

        /* Desktop Nav Links */
        .cb-nav-links {
          display: flex;
          align-items: center;
          gap: 40px;
        }

        .cb-nav-link {
          font-family: var(--font-main);
          font-size: 18px;
          font-weight: 400;
          color: #000000;
          text-decoration: none;
          padding: 6px 0;
          position: relative;
          will-change: transform;
          transition: opacity 0.3s ease;
          letter-spacing: 0;
          line-height: 1;
        }
        .cb-nav-link:hover {
          opacity: 0.5;
        }

        /* Hamburger — mobile only */
        .cb-menu-btn {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          padding: 10px;
          z-index: 2001;
        }
        .cb-hamburger {
          width: 22px;
          height: 12px;
          position: relative;
        }
        .cb-hamburger span {
          display: block;
          width: 100%;
          height: 1.5px;
          background: #000;
          position: absolute;
          left: 0;
          transition: all 0.35s cubic-bezier(0.19, 1, 0.22, 1);
        }
        .cb-hamburger span:first-child { top: 0; }
        .cb-hamburger span:last-child { bottom: 0; }
        .cb-hamburger.open span:first-child {
          top: 5px;
          transform: rotate(45deg);
        }
        .cb-hamburger.open span:last-child {
          bottom: 5px;
          transform: rotate(-45deg);
        }

        /* ─── Full-screen Mobile Overlay ─── */
        .cb-overlay {
          position: fixed;
          inset: 0;
          background: #ffffff;
          z-index: 2000;
          flex-direction: column;
          padding: 0;
        }
        .cb-overlay-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 24px;
          height: 80px;
          flex-shrink: 0;
        }
        .cb-close-btn {
          background: none;
          border: none;
          cursor: pointer;
          padding: 10px;
        }

        .cb-overlay-body {
          flex: 1;
          display: flex;
          flex-direction: column;
          padding: 80px 12vw 0;
          justify-content: flex-start;
        }
        .cb-overlay-label {
          font-size: 0.85rem;
          font-weight: 400;
          color: #999;
          margin-bottom: 30px;
          text-transform: capitalize;
          letter-spacing: 0;
        }
        .mob-link-container {
          display: flex;
          flex-direction: column;
        }
        .mob-link {
          font-family: var(--font-main);
          font-size: clamp(2.5rem, 8vw, 4.2rem);
          font-weight: 400;
          color: #000;
          text-decoration: none;
          line-height: 1.1;
          padding: 6px 0;
          transition: opacity 0.3s;
          letter-spacing: -0.02em;
        }
        .mob-link:hover { opacity: 0.35; }

        .cb-overlay-footer {
          padding: 40px 12vw 60px;
          border-top: 1px solid rgba(0, 0, 0, 0.05);
        }
        .cb-footer-links-row {
          display: flex;
          flex-wrap: wrap;
          gap: 30px 60px;
          margin-top: 10px;
        }
        .mob-footer-link {
          display: block;
          color: #000;
          text-decoration: none;
          font-size: 1rem;
          font-weight: 400;
          border-bottom: 1.5px solid rgba(0,0,0,0.1);
          padding-bottom: 2px;
          transition: border-color 0.3s;
        }
        .mob-footer-link:hover { border-color: #000; }

        /* ─── Responsive ─── */
        @media (max-width: 1024px) {
          .cb-nav-inner { padding: 0 40px; }
          .cb-nav-links { gap: 25px; } /* Slightly tighter gap for tablets */
        }

        @media (max-width: 768px) {
          .cb-nav-links { display: none; }
          .cb-menu-btn { display: block; }
          .cb-nav-inner { padding: 0 24px; }
        }
        @media (max-width: 480px) {
          .cb-nav-inner { padding: 0 16px; }
          .cb-overlay-header { padding: 0 16px; }
          .cb-overlay-body { padding: 60px 8vw 0; }
          .cb-overlay-footer { padding: 30px 8vw 50px; }
        }
      `}</style>
    </>
  )
}

export default Navbar
