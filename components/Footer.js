'use client'

import Link from 'next/link'
import { FiMapPin, FiPhone, FiMail, FiArrowRight } from 'react-icons/fi'
import { FaFacebookF, FaLinkedinIn, FaInstagram, FaYoutube } from 'react-icons/fa'

const XIcon = ({ size = 14 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
)

const serviceLinks = ['Web Development', 'Mobile App Development', 'UI/UX Design', 'CMS & E-Commerce', 'Payment & Shipping API', 'Digital Marketing']
const quickLinks = [{ label: 'Home', href: '/' }, { label: 'About Us', href: '/about' }, { label: 'Our Services', href: '/services' }, { label: 'Pricing Plans', href: '/pricing' }, { label: 'Contact Us', href: '/contact' }]
const socials = [
    { Icon: FaFacebookF, href: 'https://www.facebook.com/people/Prominent-TechnoLabs/61556264138689/', label: 'Facebook' },
    { Icon: XIcon, href: '#', label: 'X (Twitter)' },
    { Icon: FaLinkedinIn, href: '#', label: 'LinkedIn' },
    { Icon: FaInstagram, href: 'https://www.instagram.com/prominent_technolabs/', label: 'Instagram' },
    { Icon: FaYoutube, href: 'https://www.youtube.com/@Prominentechnolabs', label: 'YouTube' },
]

export default function Footer() {
    const year = new Date().getFullYear()
    return (
        <footer className="footer">
            <div className="footer-main">
                <div className="container footer-grid">
                    <div className="footer-brand">
                        <Link href="/" className="footer-logo-wrap">
                            <img src="/images/logo-white.svg" alt="Prominent TechnoLabs" className="footer-logo" />
                        </Link>
                        <p className="footer-tagline">Elevate your business with our premier web and mobile app development services. Partner with us and take your business to new heights in the digital world.</p>
                        <div className="footer-social">
                            {socials.map(s => (
                                <a key={s.label} href={s.href} target={s.href !== '#' ? '_blank' : undefined} rel={s.href !== '#' ? 'noreferrer' : undefined} aria-label={s.label} className="footer-social-btn">
                                    <s.Icon size={14} />
                                </a>
                            ))}
                        </div>
                    </div>
                    <div className="footer-col">
                        <h4 className="footer-col-title">Our Services</h4>
                        <ul className="footer-links">{serviceLinks.map(s => <li key={s}><Link href="/services"><FiArrowRight size={11} />{s}</Link></li>)}</ul>
                    </div>
                    <div className="footer-col">
                        <h4 className="footer-col-title">Quick Links</h4>
                        <ul className="footer-links">{quickLinks.map(l => <li key={l.label}><Link href={l.href}><FiArrowRight size={11} />{l.label}</Link></li>)}</ul>
                    </div>
                    <div className="footer-col">
                        <h4 className="footer-col-title">Contact Info</h4>
                        <ul className="footer-contact-list">
                            <li><FiMapPin className="fci" /><span>G-108, Titanium City Center, 100 Feet Anand Nagar Rd, near SACHIN TOWER, Ahmedabad, Gujarat 380015</span></li>
                            <li><FiPhone className="fci" /><a href="tel:+919327603253">+91 93276 03253</a></li>
                            <li><FiMail className="fci" /><a href="mailto:info@prominenttechnolabs.com">info@prominenttechnolabs.com</a></li>
                        </ul>
                        <div className="footer-newsletter">
                            <h5>Get Updates</h5>
                            <form className="newsletter-form" onSubmit={e => e.preventDefault()}>
                                <input type="email" placeholder="Enter your email" className="newsletter-input" />
                                <button type="submit" className="newsletter-btn" aria-label="Subscribe"><FiArrowRight size={15} /></button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <div className="container footer-bottom-inner">
                    <p>© {year} Prominent TechnoLabs. All Rights Reserved.</p>
                    <div className="footer-bottom-links">
                        <Link href="#">Privacy Policy</Link>
                        <Link href="#">Terms of Service</Link>
                    </div>
                </div>
            </div>
            <style>{`
        .footer { background: var(--primary-dark); color: rgba(255,255,255,0.7); font-size: 0.875rem; }
        .footer-main { padding: 70px 0 50px; border-bottom: 1px solid rgba(255,255,255,0.06); }
        .footer-grid { display: grid; grid-template-columns: 1.8fr 1fr 1fr 1.4fr; gap: 48px; }
        .footer-logo-wrap { display: block; margin-bottom: 18px; }
        .footer-logo { height: 36px; width: auto; }
        .footer-tagline { font-size: 0.84rem; line-height: 1.8; color: rgba(255,255,255,0.5); margin-bottom: 22px; }
        .footer-social { display: flex; gap: 8px; flex-wrap: wrap; }
        .footer-social-btn { width: 34px; height: 34px; border-radius: 8px; background: rgba(255,255,255,0.07); display: flex; align-items: center; justify-content: center; color: rgba(255,255,255,0.6); transition: var(--transition); }
        .footer-social-btn:hover { background: var(--orange); color: white; transform: translateY(-2px); }
        .footer-col-title { font-family: var(--font-heading); color: white; font-size: 0.92rem; font-weight: 600; margin-bottom: 18px; padding-bottom: 10px; border-bottom: 2px solid var(--orange); display: inline-block; }
        .footer-links { display: flex; flex-direction: column; gap: 8px; }
        .footer-links li a { display: flex; align-items: center; gap: 6px; font-size: 0.84rem; color: rgba(255,255,255,0.5); transition: var(--transition); text-decoration: none; }
        .footer-links li a:hover { color: var(--orange); transform: translateX(3px); }
        .footer-contact-list { display: flex; flex-direction: column; gap: 12px; margin-bottom: 22px; }
        .footer-contact-list li { display: flex; align-items: flex-start; gap: 10px; font-size: 0.84rem; color: rgba(255,255,255,0.5); }
        .fci { color: var(--orange); flex-shrink: 0; margin-top: 2px; }
        .footer-contact-list a { color: rgba(255,255,255,0.5); transition: var(--transition); text-decoration: none; }
        .footer-contact-list a:hover { color: var(--orange); }
        .footer-newsletter h5 { font-family: var(--font-heading); color: white; font-size: 0.85rem; font-weight: 600; margin-bottom: 10px; }
        .newsletter-form { display: flex; gap: 6px; }
        .newsletter-input { flex: 1; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); border-radius: var(--radius-sm); padding: 9px 12px; color: white; font-size: 0.82rem; outline: none; transition: var(--transition); font-family: var(--font-primary); }
        .newsletter-input::placeholder { color: rgba(255,255,255,0.3); }
        .newsletter-input:focus { border-color: var(--orange); background: rgba(255,102,0,0.08); }
        .newsletter-btn { width: 38px; height: 38px; background: var(--orange); border: none; border-radius: var(--radius-sm); display: flex; align-items: center; justify-content: center; color: white; cursor: pointer; flex-shrink: 0; transition: var(--transition); }
        .newsletter-btn:hover { background: var(--orange-dark); }
        .footer-bottom { padding: 18px 0; }
        .footer-bottom-inner { display: flex; align-items: center; justify-content: space-between; gap: 16px; flex-wrap: wrap; }
        .footer-bottom p { font-size: 0.8rem; color: rgba(255,255,255,0.3); }
        .footer-bottom-links { display: flex; gap: 20px; }
        .footer-bottom-links a { font-size: 0.8rem; color: rgba(255,255,255,0.3); transition: var(--transition); text-decoration: none; }
        .footer-bottom-links a:hover { color: var(--orange); }
        @media (max-width: 1024px) { .footer-grid { grid-template-columns: 1fr 1fr; gap: 36px; } .footer-brand { grid-column: 1 / -1; } }
        @media (max-width: 600px) { .footer-grid { grid-template-columns: 1fr; } .footer-brand { grid-column: 1; } .footer-bottom-inner { flex-direction: column; text-align: center; } }
      `}</style>
        </footer>
    )
}
