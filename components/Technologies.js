'use client'

import React, { useEffect, useRef } from 'react'
import { FaReact, FaNodeJs, FaLaravel, FaWordpress, FaShopify, FaJs, FaPython } from 'react-icons/fa'
import { SiFlutter, SiNextdotjs, SiTailwindcss, SiTypescript, SiFirebase } from 'react-icons/si'
import { gsap } from 'gsap'

const Technologies = () => {
  const m1 = useRef(null)
  const m2 = useRef(null)

  const techs = [
    { name: 'React', icon: <FaReact /> },
    { name: 'Next.js', icon: <SiNextdotjs /> },
    { name: 'Flutter', icon: <SiFlutter /> },
    { name: 'Laravel', icon: <FaLaravel /> },
    { name: 'Node.js', icon: <FaNodeJs /> },
    { name: 'WordPress', icon: <FaWordpress /> },
    { name: 'Shopify', icon: <FaShopify /> },
    { name: 'Firebase', icon: <SiFirebase /> },
    { name: 'Tailwind', icon: <SiTailwindcss /> },
    { name: 'JavaScript', icon: <FaJs /> },
    { name: 'TypeScript', icon: <SiTypescript /> },
    { name: 'Python', icon: <FaPython /> },
  ]
  const items = [...techs, ...techs, ...techs]

  useEffect(() => {
    const ctx = gsap.context(() => {
      const c1 = m1.current?.querySelector('.mq-track')
      const c2 = m2.current?.querySelector('.mq-track')
      if (!c1 || !c2) return
      gsap.set(c1, { xPercent: 0 })
      gsap.set(c2, { xPercent: -33.333 })
      gsap.to(c1, { xPercent: -33.333, repeat: -1, duration: 40, ease: 'none' })
      gsap.to(c2, { xPercent: 0, repeat: -1, duration: 50, ease: 'none' })
    })
    return () => ctx.revert()
  }, [])

  return (
    <section className="tech-section">
      <div className="tech-header">
        <h2 className="tech-title">Technologies we use</h2>
      </div>
      <div className="mq-container">
        <div className="mq-fade left" />
        <div className="mq-fade right" />
        <div className="mq-row" ref={m1}>
          <div className="mq-track">
            {items.map((t, i) => (
              <div key={`a-${i}`} className="mq-chip">{t.icon}<span>{t.name}</span></div>
            ))}
          </div>
        </div>
        <div className="mq-row" ref={m2}>
          <div className="mq-track">
            {items.map((t, i) => (
              <div key={`b-${i}`} className="mq-chip outline">{t.icon}<span>{t.name}</span></div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .tech-section {
          background: var(--bg-primary);
          padding: 100px 0;
          overflow: hidden;
        }
        .tech-header {
          max-width: 1400px;
          margin: 0 auto 50px;
          padding: 0 40px;
        }
        .tech-title {
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 500;
          color: #000;
          letter-spacing: -0.03em;
        }

        .mq-container { position: relative; display: flex; flex-direction: column; gap: 16px; }
        .mq-fade { position: absolute; top: 0; bottom: 0; width: 10vw; z-index: 2; pointer-events: none; }
        .mq-fade.left { left: 0; background: linear-gradient(to right, #f1f1f1 20%, transparent); }
        .mq-fade.right { right: 0; background: linear-gradient(to left, #f1f1f1 20%, transparent); }

        .mq-row { overflow: hidden; }
        .mq-track { display: flex; gap: 12px; width: max-content; }

        .mq-chip {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 14px 28px;
          border-radius: 100px;
          background: #fff;
          border: 1px solid rgba(0,0,0,0.06);
          font-size: 0.95rem;
          font-weight: 500;
          color: #000;
          white-space: nowrap;
          transition: transform 0.3s ease;
        }
        .mq-chip:hover { transform: translateY(-3px); }
        .mq-chip.outline { background: transparent; border-color: rgba(0,0,0,0.12); }
        .mq-chip svg { font-size: 1.3rem; }

        @media (max-width: 768px) {
          .tech-section { padding: 60px 0; }
          .tech-header { padding: 0 20px; margin-bottom: 30px; }
          .mq-chip { padding: 10px 18px; font-size: 0.85rem; gap: 8px; }
          .mq-chip svg { font-size: 1.1rem; }
        }
        @media (max-width: 480px) {
          .tech-section { padding: 40px 0; }
          .tech-header { padding: 0 16px; }
          .mq-chip { padding: 8px 14px; font-size: 0.75rem; }
        }
      `}</style>
    </section>
  )
}

export default Technologies
