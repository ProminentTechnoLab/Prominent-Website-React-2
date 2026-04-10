'use client'

import React, { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import {
  FaFacebookF, FaLinkedinIn,
  FaInstagram, FaYoutube
} from 'react-icons/fa'
import { RiTwitterXFill } from 'react-icons/ri'
import MagneticButton from './animations/MagneticButton'

const FooterDoorEdge = () => {
  const pathname = usePathname()
  const [theme, setTheme] = useState('dark');
  const [doorBg, setDoorBg] = useState('#0a0a0a');

  useEffect(() => {
    const updateTheme = () => {
      let newTheme = 'dark';
      let bgColor = '#0a0a0a'; // Explicit hex prevents CSS variable .style drop in older rendering engines

      // Highly reliable explicit route mapping instead of brittle DOM background scanning across 2% opacity elements
      if (typeof window !== 'undefined' && typeof window.location !== 'undefined') {
        const pathLower = window.location.pathname.toLowerCase();
        if (pathLower.includes('/about') || pathLower.includes('/portfolio')) {
          newTheme = 'light';
          bgColor = '#ffffff';
        } else if (pathLower.includes('/contact') || pathLower.includes('/services')) {
          newTheme = 'light';
          bgColor = '#ffffff';
        } else if (pathLower.includes('/pricing')) {
          newTheme = 'dark';
          bgColor = '#1a1a1a';
        } else {
          // Homepage ends with Blog (dark bg)
          newTheme = 'dark';
          bgColor = '#1a1a1a';
        }
      }

      setTheme(newTheme);
      setDoorBg(bgColor); // Set the computed background to the state for forced rendering

      // Apply the background to the wrapper so the illusion is unbroken
      const mainLayer = document.querySelector('.main-layer');
      if (mainLayer) {
        mainLayer.style.backgroundColor = bgColor;
        mainLayer.style.borderBottomLeftRadius = '0px';
        mainLayer.style.borderBottomRightRadius = '0px';
      }
    };

    updateTheme();
    // Run after layout paintings
    const timer1 = setTimeout(updateTheme, 50);
    const timer2 = setTimeout(updateTheme, 300);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [pathname]);

  const socialLinks = [
    { icon: <FaLinkedinIn />, url: 'https://linkedin.com/company/prominent-technolabs/', label: 'LinkedIn', id: 'footer-social-linkedin' },
    { icon: <FaInstagram />, url: 'https://instagram.com/prominenttechnolabs/', label: 'Instagram', id: 'footer-social-instagram' },
    { icon: <FaFacebookF />, url: 'https://facebook.com/prominenttechnolabs/', label: 'Facebook', id: 'footer-social-facebook' },
    { icon: <RiTwitterXFill />, url: 'https://twitter.com/prominenttech/', label: 'Twitter', id: 'footer-social-twitter' },
    { icon: <FaYoutube />, url: 'https://youtube.com/@prominenttechnolabs', label: 'YouTube', id: 'footer-social-youtube' }
  ]

  const isLight = theme === 'light';
  
  // Dynamic CSS variables for the door edge
  const edgeStyle = {
    backgroundColor: doorBg, // FORCE SOLID BACKGROUND color to eliminate transparent bleed over footer
    '--door-text': isLight ? '#000000' : '#888888',
    '--door-hover': isLight ? '#FF6600' : '#ffffff',
    '--door-border': isLight ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.05)',
    
    // Icon styles mirroring Contact page, but completely solid/clear on dark variants
    '--icon-bg': isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.08)',
    '--icon-border': 'transparent', // Pro-level elegant borderless glass layout
    '--icon-text': isLight ? '#000000' : '#ffffff',
  };

  return (
    <>
      <div className="footer-door-edge" style={edgeStyle}>
        <div className="door-edge-left">
          {socialLinks.map(link => (
            <div className="social-magnetic-wrapper" key={link.label}>
              <MagneticButton strength={20} bgColor="var(--brand-orange)">
                <a href={link.url} target="_blank" rel="noopener noreferrer" className="door-social-icon" aria-label={link.label}>
                  <span className="icon-svg">{link.icon}</span>
                </a>
              </MagneticButton>
            </div>
          ))}
        </div>
        <div className="door-edge-right">
          <a href="/" className="door-edge-link">HOME</a>
          <a href="/services/" className="door-edge-link">SERVICES</a>
          <a href="/contact/" className="door-edge-link">CONTACT US</a>
        </div>
      </div>

      {/* Global styles block to ensure hovering inside MagneticButton correctly triggers the child styles without specificity issues */}
      <style>{`
        .door-social-icon {
          width: 58px;    /* Increased size for premium pro-level presence */
          height: 58px;
          border-radius: 50%;
          background: var(--icon-bg);
          border: 1px solid var(--icon-border);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--icon-text);
          font-size: 1.4rem; /* Scaled up icon internally */
          backdrop-filter: blur(10px);
          transition: all 0.4s cubic-bezier(0.19, 1, 0.22, 1);
          position: relative;
          text-decoration: none;
        }

        .door-social-icon svg {
          fill: currentColor;
          transition: all 0.4s ease;
        }
        
        .icon-svg {
          transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Hover States when MagneticButton container is actively hovered */
        .magnetic-btn-wrap:hover .door-social-icon {
          background: var(--brand-orange) !important;
          border-color: var(--brand-orange) !important;
          color: #ffffff !important; 
          transform: scale(1.1);
          box-shadow: 0 10px 30px rgba(255, 102, 0, 0.3);
        }
        
        .magnetic-btn-wrap:hover .door-social-icon svg {
          fill: #ffffff !important;
          color: #ffffff !important;
        }

        .magnetic-btn-wrap:hover .icon-svg {
          transform: scale(1.2); /* Elegant icon pop */
        }
        
        /* Add a soft ambient glow to the wrapper itself when hovered */
        .social-magnetic-wrapper {
          transition: all 0.5s ease;
          border-radius: 50%;
        }
        .social-magnetic-wrapper:hover {
          box-shadow: 0 10px 25px rgba(255, 102, 0, 0.4);
        }
      `}</style>

      <style jsx>{`
        .footer-door-edge {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding: 40px 5vw 60px 5vw;
          font-family: var(--font-body);
          color: var(--door-text);
          border-top: 1px solid var(--door-border); 
          transition: all 0.5s ease;
        }
        
        .door-edge-left {
          display: flex;
          gap: 16px;
        }
        
        .door-edge-right {
          display: flex;
          flex-direction: column;
          width: 25vw;
          min-width: 220px;
          max-width: 300px;
        }
        
        .door-edge-link {
          color: var(--door-text);
          text-decoration: none;
          transition: all 0.3s;
          font-weight: 500;
          font-size: 0.8rem;
          letter-spacing: 0.05em;
          padding: 16px 0;
          border-bottom: 1px solid var(--door-border);
          width: 100%;
        }
        
        .door-edge-link:hover {
          color: var(--door-hover);
        }
        
        @media (max-width: 768px) {
          .footer-door-edge {
            flex-direction: column;
            gap: 40px;
            padding: 40px 5vw;
          }
          .door-edge-right {
            width: 100%;
            max-width: 100%;
          }
          .door-edge-left {
            gap: 12px;
            flex-wrap: wrap;
          }
        }
      `}</style>
      <style jsx global>{`
        .magnetic-btn-wrap:hover .door-social-icon {
          color: var(--icon-hover-text) !important;
          border-color: transparent !important;
        }
      `}</style>
    </>
  )
}

export default FooterDoorEdge
