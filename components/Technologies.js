'use client'

import React from 'react'
import {
  FaReact, FaNodeJs, FaLaravel, FaWordpress,
  FaShopify, FaJs, FaPython, FaAppStore, FaAndroid
} from 'react-icons/fa'
import { SiFlutter, SiNextdotjs, SiTailwindcss, SiTypescript, SiFirebase, SiMeta, SiGoogle } from 'react-icons/si'
import { gsap } from 'gsap'
import TextReveal from './animations/TextReveal'

const Technologies = () => {
  const techStack = [
    { name: 'React', icon: <FaReact />, color: '#61DBFB' },
    { name: 'Next.js', icon: <SiNextdotjs />, color: '#000000' },
    { name: 'Flutter', icon: <SiFlutter />, color: '#54C5F8' },
    { name: 'Laravel', icon: <FaLaravel />, color: '#FF2D20' },
    { name: 'Node.js', icon: <FaNodeJs />, color: '#68A063' },
    { name: 'WordPress', icon: <FaWordpress />, color: '#21759b' },
    { name: 'Shopify', icon: <FaShopify />, color: '#96BF48' },
    { name: 'Firebase', icon: <SiFirebase />, color: '#FFCA28' },
    { name: 'Tailwind', icon: <SiTailwindcss />, color: '#06B6D4' },
    { name: 'JavaScript', icon: <FaJs />, color: '#F7DF1E' },
    { name: 'TypeScript', icon: <SiTypescript />, color: '#3178C6' },
    { name: 'Python', icon: <FaPython />, color: '#3776AB' },
    { name: 'Google Ads', icon: <SiGoogle />, color: '#4285F4' },
    { name: 'Meta Ads', icon: <SiMeta />, color: '#0668E1' },
    { name: 'App Store', icon: <FaAppStore />, color: '#0070c9' },
    { name: 'Android', icon: <FaAndroid />, color: '#3DDC84' },
  ]

  // Triple for efficiency (Quad was overkill and taxing GPU)
  const marqueeItems = [...techStack, ...techStack, ...techStack]

  const marquee1Ref = React.useRef(null)
  const marquee2Ref = React.useRef(null)

  React.useEffect(() => {
    const ctx = gsap.context(() => {
      const m1 = marquee1Ref.current
      const m2 = marquee2Ref.current
      if (!m1 || !m2) return

      const c1 = m1.querySelector('.marquee-content')
      const c2 = m2.querySelector('.marquee-content')

      // Set initial positions
      gsap.set(c1, { xPercent: 0, force3D: true })
      gsap.set(c2, { xPercent: -33.333, force3D: true })

      const s1 = gsap.to(c1, {
        xPercent: -33.333,
        repeat: -1,
        duration: 40, /* Increased from 20 to slow down */
        ease: 'none',
        force3D: true,
      })

      const s2 = gsap.to(c2, {
        xPercent: 0,
        repeat: -1,
        duration: 56, /* Increased from 28 to slow down */
        ease: 'none',
        force3D: true,
      })

      // Hover controls
      const handleEnter = (anim) => gsap.to(anim, { timeScale: 0.1, duration: 0.5 })
      const handleLeave = (anim) => gsap.to(anim, { timeScale: 1, duration: 0.5 })

      m1.addEventListener('mouseenter', () => handleEnter(s1))
      m1.addEventListener('mouseleave', () => handleLeave(s1))
      m2.addEventListener('mouseenter', () => handleEnter(s2))
      m2.addEventListener('mouseleave', () => handleLeave(s2))
    })

    return () => ctx.revert()
  }, [])

  return (
    <section className="tech-section">
      <div className="tech-lens-flare top" />
      <div className="tech-lens-flare bottom" />

      <div className="wrapper">
        <div className="section-header-centered">
          <div className="badge glass-badge">Our Core Stack</div>
          <h2 className="section-h">
            <TextReveal>Architecting with</TextReveal>
            <TextReveal delay={0.2} className="accent-text">Premium Tech</TextReveal>
          </h2>
        </div>
      </div>

      <div className="ribbon-universe">
        <div className="ribbon-blur-edge left" />
        <div className="ribbon-blur-edge right" />

        <div className="marquee-wrap" ref={marquee1Ref}>
          <div className="marquee-content">
            {marqueeItems.map((tech, i) => (
              <div
                key={`${tech.name}-${i}`}
                className="tech-chip"
                style={{ '--glow-color': tech.color }}
              >
                <div className="chip-glass" />
                <div className="chip-sheen" />
                <span className="tech-icon" style={{ color: tech.color }}>{tech.icon}</span>
                <span className="tech-name">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="marquee-wrap" ref={marquee2Ref}>
          <div className="marquee-content">
            {marqueeItems.map((tech, i) => (
              <div
                key={`${tech.name}-rev-${i}`}
                className="tech-chip outline"
                style={{ '--glow-color': tech.color }}
              >
                <div className="chip-glass" />
                <div className="chip-sheen" />
                <span className="tech-icon" style={{ color: tech.color }}>{tech.icon}</span>
                <span className="tech-name">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .tech-section {
          background: #000000;
          overflow: hidden;
          padding: 6rem 0;
          position: relative;
        }
        .wrapper {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 4%;
        }

        .tech-lens-flare {
          position: absolute;
          width: 60vw;
          height: 60vw;
          background: radial-gradient(circle, rgba(255, 102, 0, 0.08) 0%, transparent 70%);
          pointer-events: none;
          z-index: 1;
        }
        .tech-lens-flare.top { top: -20vw; right: -10vw; }
        .tech-lens-flare.bottom { bottom: -20vw; left: -10vw; }

        .section-header-centered {
          text-align: left;
          margin-bottom: 4vw;
          position: relative;
          z-index: 2;
        }
        .glass-badge {
          background: rgba(255, 255, 255, 0.05); /* Lighter for dark theme */
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: var(--brand-orange);
          font-weight: 700;
          letter-spacing: 0.15em;
        }
        .section-h {
          font-size: clamp(3rem, 6vw, 4.5rem); 
          color: #fff; /* Changed to white */
          line-height: 0.9;
          letter-spacing: -0.06em;
          text-transform: uppercase;
          font-weight: 900;
        }
        .accent-text {
          color: #fff;
          opacity: 0.15; /* Adjusted for dark */
        }

        .ribbon-universe {
          display: flex;
          flex-direction: column;
          gap: 25px;
          position: relative;
          width: 100vw;
          left: 50%;
          transform: translateX(-50%);
          padding: 3rem 0;
        }
        
        /* Depth-of-Field Blur Edges - Adjusted for black background */
        .ribbon-blur-edge {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 20vw;
          z-index: 5;
          pointer-events: none;
        }
        .ribbon-blur-edge.left {
          left: 0;
          background: linear-gradient(to right, #000 10%, rgba(0,0,0,0.8) 40%, transparent 100%);
        }
        .ribbon-blur-edge.right {
          right: 0;
          background: linear-gradient(to left, #000 10%, rgba(0,0,0,0.8) 40%, transparent 100%);
        }

        .marquee-wrap {
          display: flex;
          overflow: hidden;
          width: 100%;
          will-change: transform;
        }
        .marquee-wrap:nth-of-type(even) { transform: scale(0.95); opacity: 0.8; }

        .marquee-content {
          display: flex;
          gap: 25px;
          white-space: nowrap;
          width: max-content;
        }

        /* Prismatic Tech Chips - Adjusted for dark mode */
        .tech-chip {
          position: relative;
          padding: 1.8rem 4rem;
          display: flex;
          align-items: center;
          gap: 20px;
          cursor: pointer;
          border-radius: 16px;
          transition: transform 0.4s cubic-bezier(0.19, 1, 0.22, 1), box-shadow 0.4s ease;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
        }
        .chip-glass {
          position: absolute;
          inset: 0;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          z-index: -1;
        }
        .chip-sheen {
          position: absolute;
          top: 0; left: -100%;
          width: 50%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transform: skewX(-20deg);
          transition: left 0.8s ease;
        }
        .tech-chip:hover .chip-sheen { left: 150%; }

        .tech-chip.outline { opacity: 0.7; }

        .tech-icon {
          font-size: 2.2rem;
          color: #fff;
          filter: grayscale(100%) opacity(0.3);
          transition: filter 0.4s ease, transform 0.4s ease, opacity 0.4s ease;
        }

        .tech-name {
          font-family: var(--font-heading);
          font-weight: 800;
          color: rgba(255, 255, 255, 0.3);
          font-size: 1.3rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          transition: color 0.4s ease, letter-spacing 0.4s ease;
        }

        /* Prismatic Hover for Dark Mode */
        .tech-chip:hover {
          transform: scale(1.05) translateY(-8px);
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.15);
          opacity: 1 !important;
          box-shadow: 
            0 20px 40px rgba(0, 0, 0, 0.6),
            0 10px 20px rgba(0, 0, 0, 0.4);
        }
        .tech-chip:hover .tech-icon {
          filter: grayscale(0%) opacity(1);
          transform: scale(1.15) rotate(3deg);
        }
        .tech-chip:hover .tech-name {
          color: #fff;
          letter-spacing: 0.15em;
          opacity: 1;
        }
        
        /* Dynamic Glow Reveal */
        .tech-chip::after {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at center, var(--glow-color, rgba(255,255,255,0.05)), transparent 70%);
          opacity: 0;
          transition: opacity 0.5s ease;
          pointer-events: none;
        }
        .tech-chip:hover::after { opacity: 0.25; }

        @media (max-width: 1024px) {
          .tech-chip { padding: 1.8rem 3.5rem; }
          .tech-icon { font-size: 2rem; }
          .tech-name { font-size: 1.2rem; }
        }
        @media (max-width: 768px) {
          .tech-chip { padding: 1.2rem 2rem; }
          .tech-icon { font-size: 1.6rem; }
          .tech-name { font-size: 0.95rem; }
          .ribbon-blur-edge { width: 25vw; }
          .tech-section { padding: 4rem 0; }
        }
        @media (max-width: 480px) {
          .tech-section { padding: 3rem 0; }
          .tech-chip { padding: 0.9rem 1.5rem; gap: 10px; border-radius: 10px; }
          .tech-icon { font-size: 1.3rem; }
          .tech-name { font-size: 0.8rem; }
          .marquee-content { gap: 12px; }
          .ribbon-universe { gap: 12px; padding: 1.5rem 0; }
          .section-header-centered { margin-bottom: 3vw; }
        }
      `}</style>
    </section>
  )
}

export default Technologies
