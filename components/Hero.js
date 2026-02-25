'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { FiArrowRight, FiCheck, FiCheckCircle, FiZap, FiShield } from 'react-icons/fi'
import { FaReact, FaVuejs, FaNodeJs, FaWordpress, FaApple, FaJava, FaAws } from 'react-icons/fa'
import { SiNextdotjs, SiLaravel, SiFlutter, SiDart, SiKotlin, SiMysql, SiSwift } from 'react-icons/si'

const highlights = [
  'Custom Web & Mobile Solutions',
  '30+ Happy Clients Worldwide',
  '99% Customer Satisfaction Rate',
]

const techStack = [
  { name: 'React', Icon: FaReact, color: '#61DBFB' },
  { name: 'Vue.js', Icon: FaVuejs, color: '#42b883' },
  { name: 'Next.js', Icon: SiNextdotjs, color: '#000000' },
  { name: 'Laravel', Icon: SiLaravel, color: '#FF2D20' },
  { name: 'Node.js', Icon: FaNodeJs, color: '#68A063' },
  { name: 'WordPress', Icon: FaWordpress, color: '#21759b' },
  { name: 'Flutter', Icon: SiFlutter, color: '#54C5F8' },
  { name: 'React Native', Icon: FaReact, color: '#61DBFB' },
  { name: 'iOS', Icon: FaApple, color: '#555555' },
  { name: 'SwiftUI', Icon: SiSwift, color: '#FA7343' },
  { name: 'Dart', Icon: SiDart, color: '#0175C2' },
  { name: 'Kotlin', Icon: SiKotlin, color: '#7F52FF' },
  { name: 'Java', Icon: FaJava, color: '#ED8B00' },
  { name: 'MySQL', Icon: SiMysql, color: '#00758F' },
  { name: 'AWS', Icon: FaAws, color: '#FF9900' },
]

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg-circle hero-bg-c1" />
      <div className="hero-bg-circle hero-bg-c2" />

      <div className="container hero-inner">
        {/* Left content */}
        <motion.div className="hero-content" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: 'easeOut' }}>
          <div className="hero-badge">
            <span className="hero-badge-dot" />
            Innovative Digital Solutions
          </div>

          <h1 className="hero-title">
            Powering Businesses with<br />
            <span className="hero-title-accent">Digital Excellence</span>
          </h1>

          <p className="hero-subtitle">
            Elevate your business with our premier web and mobile app development services.
            From responsive websites to cutting-edge mobile apps — we deliver solutions
            that drive real results.
          </p>

          <ul className="hero-highlights">
            {highlights.map(h => (
              <li key={h}>
                <span className="hero-check"><FiCheck size={13} /></span>
                {h}
              </li>
            ))}
          </ul>

          <div className="hero-actions">
            <Link href="/contact" className="btn btn-primary">Get Started Today <FiArrowRight /></Link>
            <Link href="/services" className="btn btn-outline">Explore Services <FiArrowRight /></Link>
          </div>
        </motion.div>

        {/* Right visual */}
        <motion.div className="hero-visual" initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, delay: 0.3, ease: 'easeOut' }}>
          <div className="orbit-ring orbit-ring-1" />
          <div className="orbit-ring orbit-ring-2" />

          <motion.div className="hero-center-card" animate={{ y: [0, -12, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
            <img src="/images/icon-white.svg" alt="Prominent TechnoLabs" className="hero-center-icon" />
            <h3>Empower Your Enterprise</h3>
            <p>Advanced Web &amp; App Solutions<br />tailored to your business goals</p>
            <div className="hero-stats-row">
              {[['30+', 'Clients'], ['50+', 'Projects'], ['99%', 'Satisfaction']].map(([n, l]) => (
                <div key={l} className="hero-stat"><strong>{n}</strong><span>{l}</span></div>
              ))}
            </div>
          </motion.div>

          <motion.div className="hero-float-badge hero-fb-1" animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}>
            <FiCheckCircle size={13} style={{ color: '#FF6600' }} /> Responsive Design
          </motion.div>
          <motion.div className="hero-float-badge hero-fb-2" animate={{ y: [0, 8, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}>
            <FiZap size={13} style={{ color: '#FF6600' }} /> Fast Delivery
          </motion.div>
          <motion.div className="hero-float-badge hero-fb-3" animate={{ y: [0, -6, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}>
            <FiShield size={13} style={{ color: '#FF6600' }} /> Secure &amp; Scalable
          </motion.div>
        </motion.div>
      </div>

      <div className="hero-wave">
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,60 C360,110 1080,10 1440,60 L1440,100 L0,100 Z" fill="white" />
        </svg>
      </div>

      <style>{`
        .hero { background: var(--gradient-hero); min-height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: stretch; position: relative; overflow: hidden; padding: 120px 0 100px; }
        .hero-bg-circle { position: absolute; border-radius: 50%; filter: blur(80px); opacity: 0.18; pointer-events: none; }
        .hero-bg-c1 { width: 600px; height: 600px; background: var(--orange); top: -200px; right: -100px; }
        .hero-bg-c2 { width: 400px; height: 400px; background: #1a6fd8; bottom: -100px; left: -80px; }
        .hero-inner { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; position: relative; z-index: 1; }
        .hero-badge { display: inline-flex; align-items: center; gap: 8px; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,102,0,0.5); color: #ffd9b8; padding: 8px 18px; border-radius: var(--radius-full); font-size: 0.82rem; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 22px; }
        .hero-badge-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--orange); animation: pulse-orange 2s infinite; }
        .hero-title { font-family: var(--font-heading); font-size: clamp(2rem, 4vw, 3.2rem); font-weight: 800; color: white; line-height: 1.15; margin-bottom: 20px; }
        .hero-title-accent { color: var(--orange); }
        .hero-subtitle { font-size: 1.05rem; color: rgba(255,255,255,0.72); line-height: 1.8; margin-bottom: 28px; max-width: 520px; }
        .hero-highlights { display: flex; flex-direction: column; gap: 10px; margin-bottom: 36px; }
        .hero-highlights li { display: flex; align-items: center; gap: 10px; font-size: 0.92rem; color: rgba(255,255,255,0.85); font-weight: 500; }
        .hero-check { width: 22px; height: 22px; background: var(--orange); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; flex-shrink: 0; }
        .hero-actions { display: flex; gap: 16px; flex-wrap: wrap; margin-bottom: 40px; }
        .hero-tech { display: flex; flex-direction: column; gap: 10px; }
        .hero-tech-label { font-size: 0.78rem; color: rgba(255,255,255,0.5); font-weight: 600; text-transform: uppercase; letter-spacing: 1px; }
        .hero-tech-badges { display: flex; gap: 8px; flex-wrap: wrap; }
        .hero-tech-badge { padding: 5px 12px; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15); border-radius: var(--radius-full); color: rgba(255,255,255,0.85); font-size: 0.78rem; font-weight: 500; transition: var(--transition); display: inline-flex; align-items: center; gap: 5px; }
        .hero-tech-badge:hover { background: rgba(255,102,0,0.2); border-color: rgba(255,102,0,0.5); color: white; }
        .hero-visual { position: relative; display: flex; align-items: center; justify-content: center; height: 420px; }
        .orbit-ring { position: absolute; border-radius: 50%; border-style: solid; border-color: rgba(255,255,255,0.1); }
        .orbit-ring-1 { width: 360px; height: 360px; border-width: 1px; animation: spin-slow 20s linear infinite; }
        .orbit-ring-2 { width: 260px; height: 260px; border-width: 1px; border-color: rgba(255,102,0,0.2); animation: spin-slow 14s linear infinite reverse; }
        .hero-center-card { background: rgba(255,255,255,0.08); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.15); border-radius: var(--radius-xl); padding: 36px 30px; text-align: center; color: white; width: 220px; box-shadow: 0 20px 60px rgba(0,0,0,0.25); z-index: 2; position: relative; }
        .hero-center-icon { width: 56px; height: auto; margin: 0 auto 16px; }
        .hero-center-card h3 { font-family: var(--font-heading); font-size: 0.95rem; font-weight: 700; margin-bottom: 6px; line-height: 1.3; }
        .hero-center-card p { font-size: 0.72rem; opacity: 0.65; line-height: 1.6; margin-bottom: 20px; }
        .hero-stats-row { display: flex; justify-content: center; gap: 14px; padding-top: 16px; border-top: 1px solid rgba(255,255,255,0.12); }
        .hero-stat { display: flex; flex-direction: column; align-items: center; gap: 2px; }
        .hero-stat strong { font-family: var(--font-heading); font-size: 1.2rem; font-weight: 800; color: var(--orange); }
        .hero-stat span { font-size: 0.62rem; opacity: 0.6; text-transform: uppercase; }
        .hero-float-badge { position: absolute; background: white; border-radius: var(--radius-full); padding: 7px 14px; font-size: 0.77rem; font-weight: 600; color: var(--primary); box-shadow: 0 6px 20px rgba(0,0,0,0.15); white-space: nowrap; z-index: 3; display: flex; align-items: center; gap: 5px; }
        .hero-fb-1 { top: 50px; left: -10px; } .hero-fb-2 { bottom: 80px; left: -10px; } .hero-fb-3 { top: 50px; right: -10px; }
        .hero-wave { position: absolute; bottom: -2px; left: 0; right: 0; height: 100px; z-index: 3; }
        .hero-wave svg { width: 100%; height: 100%; }
        @media (max-width: 900px) { .hero { padding: 120px 0 80px; min-height: auto; } .hero-inner { grid-template-columns: 1fr; text-align: center; } .hero-highlights li { justify-content: center; } .hero-actions { justify-content: center; } .hero-tech { align-items: center; } .hero-visual { height: 300px; } .hero-fb-1, .hero-fb-2, .hero-fb-3 { display: none; } }
      `}</style>
    </section>
  )
}
