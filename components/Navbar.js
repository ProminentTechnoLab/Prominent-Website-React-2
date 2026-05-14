'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const navRef = useRef(null)
  const overlayRef = useRef(null)
  const isHidden = useRef(false)

  const navLinks = [
    { title: 'Services', path: '/services/' },
    { title: 'Portfolio', path: '/portfolio/' },
    { title: 'Company', path: '/about/' },
    { title: 'Blog', path: '/blog/' },
    { title: 'Contacts', path: '/contact/' },
  ]

  // Close menu on route change & reset navbar visibility
  useEffect(() => {
    setMenuOpen(false)
    document.body.style.overflow = ''
    document.body.style.height = ''
    document.body.style.touchAction = ''
    // Always show the header when navigating to a new page
    if (navRef.current) {
      gsap.set(navRef.current, { y: 0 })
      isHidden.current = false
    }
  }, [pathname])

  // Scroll direction detection — bulletproof rAF loop
  // Reads the actual DOM scroll position every frame, works with any scroll library
  useEffect(() => {
    let rafId = null
    let prevY = window.scrollY || 0

    const tick = () => {
      if (!navRef.current) {
        rafId = requestAnimationFrame(tick)
        return
      }

      const currentY = window.scrollY

      // Handle Shadow
      if (currentY > 20) {
        navRef.current.classList.add('is-scrolled')
      } else {
        navRef.current.classList.remove('is-scrolled')
      }

      const diff = currentY - prevY

      // Near the top — always visible
      if (currentY < 80) {
        if (isHidden.current) {
          gsap.to(navRef.current, { y: 0, duration: 0.35, ease: 'power2.out', overwrite: true })
          isHidden.current = false
        }
      } else if (diff < -1 && isHidden.current) {
        // Scrolling UP → Show (1px threshold to ignore sub-pixel noise)
        gsap.to(navRef.current, { y: 0, duration: 0.35, ease: 'power2.out', overwrite: true })
        isHidden.current = false
      } else if (diff > 1 && !isHidden.current) {
        // Scrolling DOWN → Hide
        gsap.to(navRef.current, { y: '-100%', duration: 0.35, ease: 'power2.out', overwrite: true })
        isHidden.current = true
      }

      prevY = currentY
      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)

    return () => {
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  // Header entrance animation
  useEffect(() => {
    const runEntrance = () => {
      // Animate logo
      gsap.fromTo('.cb-logo', 
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: 'power4.out', delay: 0.4 }
      )
      // Animate nav links
      gsap.fromTo('.cb-nav-link',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.05, ease: 'power4.out', delay: 0.5 }
      )
      // Animate mobile toggle
      gsap.fromTo('.cb-menu-btn',
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1, ease: 'back.out(1.7)', delay: 0.6 }
      )
    }

    // Only run on the official transition signal from AppWrapper
    // This prevents "double-animations" when the route changes
    window.addEventListener('refresh-text-reveal', runEntrance)

    return () => {
      window.removeEventListener('refresh-text-reveal', runEntrance)
    }
  }, []) // Empty dependency array - logic is handled by the event listener

  // Mobile overlay animation
  useEffect(() => {
    if (!overlayRef.current) return
    if (menuOpen) {
      // Robust Body Scroll Lock
      document.body.style.overflow = 'hidden'
      document.body.style.height = '100vh'
      document.body.style.touchAction = 'none'

      gsap.to(overlayRef.current, {
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: 0.8, ease: 'power4.inOut',
        onStart: () => { overlayRef.current.style.display = 'flex' }
      })
      gsap.fromTo('.mob-link', { y: 60, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.06, duration: 0.7, ease: 'power4.out', delay: 0.3 })
    } else {
      document.body.style.overflow = ''
      document.body.style.height = ''
      document.body.style.touchAction = ''

      gsap.to(overlayRef.current, {
        clipPath: 'inset(0% 0% 100% 0%)',
        duration: 0.6, ease: 'power4.inOut',
        onComplete: () => { if (overlayRef.current) overlayRef.current.style.display = 'none' }
      })
    }
  }, [menuOpen])

  // Navigation handler
  const handleNav = (e, path) => {
    e.preventDefault()
    if (menuOpen) setMenuOpen(false)
    const isSamePage = (pathname === path)
    window.dispatchEvent(new CustomEvent('trigger-nav-transition', { 
      detail: { href: path, isSamePage } 
    }))
  }

  return (
    <>
      <nav
        ref={navRef}
        className="cb-nav"
      >
        <div className="cb-nav-inner">
          {/* Logo — original color, no filter */}
          <Link 
            href="/" 
            className="cb-logo"
            onClick={(e) => handleNav(e, '/')}
          >
            <img src="/images/logo-color.svg" alt="Prominent TechnoLabs" className="cb-logo-img" />
          </Link>

          {/* Desktop Links — right-aligned, matching Cuberto exactly */}
          <div className="cb-nav-links">
            {navLinks.map((link, i) => (
              <Link
                key={link.title}
                href={link.path}
                className={`cb-nav-link ${pathname.startsWith(link.path) ? 'active' : ''}`}
                onClick={(e) => handleNav(e, link.path)}
              >
                <span className="cb-nav-link-inner">
                  <span className="cb-nav-link-old">{link.title}</span>
                  <span className="cb-nav-link-new">{link.title}</span>
                </span>
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
          <Link 
            href="/" 
            className="cb-logo" 
            onClick={(e) => handleNav(e, '/')}
          >
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
              <Link 
                key={link.title} 
                href={link.path} 
                className="mob-link" 
                onClick={(e) => handleNav(e, link.path)}
              >
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
          height: 70px; /* Reduced from 80px */
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
          height: 40px; /* Reduced from 46px */
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

        .cb-logo, .cb-nav-link, .cb-menu-btn {
          opacity: 0; /* Hidden by default to prevent blinking */
          will-change: transform, opacity;
        }

        .cb-nav-link {
          font-family: var(--font-main);
          font-size: 16px; /* Reduced from 18px for better proportion in 70px header */
          font-weight: 400;
          color: #000000;
          text-decoration: none;
          padding: 8px 0;
          position: relative;
          will-change: transform;
          transition: opacity 0.3s ease;
          letter-spacing: 0;
          line-height: 1;
          display: inline-block;
        }
        .cb-nav-link-inner {
          display: flex;
          flex-direction: column;
          height: 1.1em;
          overflow: hidden;
          position: relative;
        }
        .cb-nav-link-old, .cb-nav-link-new {
          display: block;
          transition: transform 0.8s cubic-bezier(0.19, 1, 0.22, 1);
        }
        .cb-nav-link-new {
          position: absolute;
          top: 100%;
          left: 0;
          width: 100%;
        }
        .cb-nav-link:hover .cb-nav-link-old {
          transform: translateY(-120%);
        }
        .cb-nav-link:hover .cb-nav-link-new {
          transform: translateY(-100%);
        }
        .cb-nav-link.active::after {
          content: '';
          position: absolute;
          bottom: 0; /* Reduced gap between text and underline */
          left: 0;
          width: 100%;
          height: 1px; /* Ultra-thin for a premium, delicate appearance */
          background: #000;
        }
        .cb-nav-link:hover {
          /* Color remains the same on hover */
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
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          height: 100dvh;
          background: #ffffff;
          z-index: 100001; /* Above Sigil (99999) */
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        .cb-overlay-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 24px;
          height: 70px;
          flex-shrink: 0;
          background: #fff;
          z-index: 2;
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
          padding: 40px 12vw 0;
          justify-content: center; /* Centered links as per premium standard */
          overflow: hidden; /* No scroll as requested */
          background: #fff;
        }
        .cb-overlay-label {
          font-size: 0.85rem;
          font-weight: 400;
          color: #999;
          margin-bottom: 20px;
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
