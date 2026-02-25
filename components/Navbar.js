'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FiPhone, FiMail, FiChevronDown, FiMenu, FiX, FiArrowRight } from 'react-icons/fi'
import { FaFacebookF, FaLinkedinIn, FaInstagram, FaYoutube } from 'react-icons/fa'

const XIcon = ({ size = 14 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
)

const serviceItems = [
    { label: 'Website Development', href: '/services/website-development' },
    { label: 'Mobile App Development', href: '/services/mobile-app-development' },
    { label: 'UI/UX Design', href: '/services/ui-ux-design' },
    { label: 'CMS & E-Commerce', href: '/services/cms-ecommerce' },
    { label: 'Payment & Shipping APIs', href: '/services/payment-shipping-api' },
    { label: 'Digital Marketing', href: '/services/digital-marketing' },
]

const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services', hasDropdown: true },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Contact', href: '/contact' },
]

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [mobileOpen, setMobileOpen] = useState(false)
    const [dropOpen, setDropOpen] = useState(false)
    const pathname = usePathname()

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40)
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    useEffect(() => { setMobileOpen(false); setDropOpen(false) }, [pathname])

    const isHomepage = pathname === '/'
    const transparent = isHomepage && !scrolled && !mobileOpen
    const isActive = useCallback((href) => {
        if (href === '/') return pathname === '/'
        return pathname.startsWith(href)
    }, [pathname])

    return (
        <>
            {/* Top Bar */}
            <div className="topbar">
                <div className="container topbar-inner">
                    <div className="topbar-left">
                        <a href="tel:+919327603253"><FiPhone size={12} />+91 93276 03253</a>
                        <a href="mailto:info@prominenttechnolabs.com"><FiMail size={12} />info@prominenttechnolabs.com</a>
                    </div>
                    <div className="topbar-right">
                        <a href="https://www.facebook.com/people/Prominent-TechnoLabs/61556264138689/" target="_blank" rel="noreferrer" aria-label="Facebook"><FaFacebookF size={12} /></a>
                        <a href="#" aria-label="X (Twitter)"><XIcon size={12} /></a>
                        <a href="#" aria-label="LinkedIn"><FaLinkedinIn size={12} /></a>
                        <a href="https://www.instagram.com/prominent_technolabs/" target="_blank" rel="noreferrer" aria-label="Instagram"><FaInstagram size={12} /></a>
                        <a href="https://www.youtube.com/@Prominentechnolabs" target="_blank" rel="noreferrer" aria-label="YouTube"><FaYoutube size={12} /></a>
                    </div>
                </div>
            </div>

            {/* Main Nav */}
            <header className={`navbar ${scrolled ? 'navbar-scrolled' : ''} ${transparent ? 'navbar-transparent' : ''}`}>
                <div className="container nav-inner">
                    <Link href="/" className="nav-logo">
                        <img
                            src={transparent ? '/images/logo-white.svg' : '/images/logo-color.svg'}
                            alt="Prominent TechnoLabs"
                            className="nav-logo-img"
                        />
                    </Link>

                    <nav className="nav-links">
                        {navLinks.map(l => l.hasDropdown ? (
                            <div key={l.label} className="nav-dropdown-wrapper">
                                <Link href={l.href} className={`nav-link ${isActive(l.href) ? 'active' : ''}`}>
                                    {l.label} <FiChevronDown size={14} className="nav-chevron" />
                                </Link>
                                <div className="nav-dropdown">
                                    {serviceItems.map(s => (
                                        <Link key={s.label} href={s.href} className="nav-dropdown-item">
                                            <FiArrowRight size={13} />{s.label}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <Link key={l.label} href={l.href} className={`nav-link ${isActive(l.href) ? 'active' : ''}`}>{l.label}</Link>
                        ))}
                    </nav>

                    <Link href="/contact" className="btn btn-primary nav-cta">Get a Quote <FiArrowRight /></Link>

                    <button className="nav-hamburger" onClick={() => setMobileOpen(v => !v)} aria-label="Toggle menu">
                        {mobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                    </button>
                </div>

                {mobileOpen && (
                    <div className="mobile-menu">
                        {navLinks.map(l => l.hasDropdown ? (
                            <div key={l.label}>
                                <button className="mobile-link" onClick={() => setDropOpen(v => !v)}
                                    style={{ width: '100%', textAlign: 'left', background: 'none', color: 'inherit', fontFamily: 'inherit', fontSize: 'inherit', cursor: 'pointer' }}>
                                    {l.label} <FiChevronDown style={{ float: 'right', transition: '0.3s', transform: dropOpen ? 'rotate(180deg)' : 'none' }} />
                                </button>
                                {dropOpen && (
                                    <div className="mobile-sub">
                                        {serviceItems.map(s => <Link key={s.label} href={s.href} className="mobile-sub-link">{s.label}</Link>)}
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link key={l.label} href={l.href} className={`mobile-link ${isActive(l.href) ? 'active' : ''}`}>{l.label}</Link>
                        ))}
                        <Link href="/contact" className="btn btn-primary" style={{ margin: '16px 20px', display: 'flex', justifyContent: 'center' }}>
                            Get a Quote <FiArrowRight />
                        </Link>
                    </div>
                )}
            </header>

            <style>{`
        .topbar { background: var(--primary); color: rgba(255,255,255,0.8); font-size: 0.78rem; padding: 7px 0; position: relative; z-index: 1001; }
        .topbar-inner { display: flex; align-items: center; justify-content: space-between; }
        .topbar-left { display: flex; gap: 24px; flex-wrap: wrap; }
        .topbar-left a { display: flex; align-items: center; gap: 5px; color: rgba(255,255,255,0.8); font-size: 0.78rem; transition: var(--transition); }
        .topbar-left a:hover { color: var(--orange); }
        .topbar-right { display: flex; gap: 6px; }
        .topbar-right a { width: 26px; height: 26px; background: rgba(255,255,255,0.1); border-radius: 6px; display: flex; align-items: center; justify-content: center; color: rgba(255,255,255,0.75); transition: var(--transition); }
        .topbar-right a:hover { background: var(--orange); color: white; }
        .navbar { position: sticky; top: 0; z-index: 1000; background: white; box-shadow: 0 2px 20px rgba(10,36,99,0.1); transition: var(--transition); }
        .navbar-transparent { background: rgba(10,36,99,0.9) !important; backdrop-filter: blur(14px); box-shadow: none; }
        .navbar-transparent .nav-link { color: rgba(255,255,255,0.9) !important; }
        .navbar-transparent .nav-link.active, .navbar-transparent .nav-link:hover { color: var(--orange) !important; }
        .navbar-transparent .nav-hamburger { color: white; }
        .navbar-scrolled { background: white !important; box-shadow: 0 4px 25px rgba(10,36,99,0.12) !important; }
        .nav-inner { display: flex; align-items: center; gap: 32px; height: var(--navbar-height); }
        .nav-logo { flex-shrink: 0; }
        .nav-logo-img { height: 42px; width: auto; object-fit: contain; }
        .nav-links { display: flex; align-items: center; gap: 6px; margin-left: auto; }
        .nav-link { display: flex; align-items: center; gap: 4px; padding: 8px 12px; font-size: 0.9rem; font-weight: 500; color: var(--gray-800); border-radius: var(--radius-sm); transition: var(--transition); text-decoration: none; }
        .nav-link:hover, .nav-link.active { color: var(--orange); }
        .nav-link.active { font-weight: 600; }
        .nav-dropdown-wrapper { position: relative; }
        .nav-chevron { transition: transform 0.3s; vertical-align: middle; }
        .nav-dropdown-wrapper:hover .nav-chevron { transform: rotate(180deg); }
        /* Dropdown: hidden by default, shown on CSS :hover — no gap = no disappearing */
        .nav-dropdown { position: absolute; top: 100%; left: 50%; transform: translateX(-50%); background: white; border-radius: var(--radius-md); box-shadow: var(--shadow-lg); border: 1px solid var(--gray-100); min-width: 230px; z-index: 999; opacity: 0; visibility: hidden; pointer-events: none; transition: opacity 0.15s ease, transform 0.15s ease; transform: translateX(-50%) translateY(-4px); padding: 6px 0; }
        .nav-dropdown-wrapper:hover .nav-dropdown { opacity: 1; visibility: visible; pointer-events: auto; transform: translateX(-50%) translateY(0); }
        /* Invisible bridge fills the gap so mouse doesn't leave hover zone */
        .nav-dropdown::before { content: ''; position: absolute; top: -12px; left: 0; right: 0; height: 12px; background: transparent; }
        .nav-dropdown-item { display: flex; align-items: center; gap: 8px; padding: 10px 18px; font-size: 0.87rem; color: var(--gray-700); transition: var(--transition); font-weight: 500; text-decoration: none; }
        .nav-dropdown-item:hover { color: var(--orange); background: rgba(255,102,0,0.04); padding-left: 24px; }
        .nav-cta { font-size: 0.87rem; padding: 10px 22px; flex-shrink: 0; }
        .nav-hamburger { display: none; color: var(--primary); padding: 8px; border-radius: var(--radius-sm); background: none; border: none; cursor: pointer; }
        .mobile-menu { background: white; border-top: 1px solid var(--gray-100); padding-bottom: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); max-height: calc(100vh - var(--navbar-height) - 40px); overflow-y: auto; }
        .mobile-link { display: block; padding: 14px 20px; font-size: 0.95rem; font-weight: 500; color: var(--gray-800); border-bottom: 1px solid var(--gray-100); transition: var(--transition); text-decoration: none; }
        .mobile-link.active, .mobile-link:hover { color: var(--orange); }
        .mobile-sub { background: var(--off-white); }
        .mobile-sub-link { display: block; padding: 10px 20px 10px 36px; font-size: 0.87rem; color: var(--gray-600); border-bottom: 1px solid var(--gray-100); transition: var(--transition); text-decoration: none; }
        .mobile-sub-link:hover { color: var(--orange); }
        @media (max-width: 900px) { .nav-links, .nav-cta { display: none; } .nav-hamburger { display: flex; margin-left: auto; } }
        @media (max-width: 480px) { .topbar-left a:last-child { display: none; } }
      `}</style>
        </>
    )
}
