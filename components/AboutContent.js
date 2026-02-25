'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import { FiArrowRight, FiCheckCircle, FiUsers, FiTarget, FiGlobe, FiAward } from 'react-icons/fi'

const values = [
    { icon: FiTarget, title: 'Our Mission', desc: 'To deliver innovative digital solutions that empower businesses to thrive in the competitive digital landscape.', color: '#FF6600' },
    { icon: FiGlobe, title: 'Our Vision', desc: 'To become a globally recognised technology partner known for excellence, integrity, and transformative digital experiences.', color: '#0A2463' },
    { icon: FiUsers, title: 'Our Team', desc: '15+ passionate professionals with expertise across web development, mobile apps, design, and digital marketing.', color: '#7c3aed' },
    { icon: FiAward, title: 'Our Promise', desc: '99% customer satisfaction backed by transparent communication, agile delivery, and quality that exceeds expectations.', color: '#059669' },
]

const milestones = [
    { year: '2018', title: 'Company Founded', desc: 'Prominent TechnoLabs was established with a mission to deliver world-class digital services to businesses worldwide.' },
    { year: '2020', title: 'Mobile Department', desc: 'Expanded services with a dedicated mobile app development team specialising in Flutter and React Native.' },
    { year: '2022', title: 'International Clients', desc: 'Started working with clients across UK, USA, Australia, Singapore — delivering projects from India with consistent quality.' },
    { year: '2024', title: '30+ Happy Clients', desc: 'Crossed a major milestone with 30+ satisfied clients and 50+ successful projects delivered across industries.' },
]

export default function AboutContent() {
    const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true })
    const [ref2, inView2] = useInView({ threshold: 0.05, triggerOnce: true })

    return (
        <div>
            {/* Page Hero */}
            <div className="page-hero">
                <div className="container">
                    <motion.div className="page-hero-content" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                        <div className="section-badge">About Us</div>
                        <h1 className="page-hero-title">Building Digital Success <span style={{ color: 'var(--orange)' }}>Since 2018</span></h1>
                        <p className="page-hero-subtitle">We are a passionate team of developers, designers, and marketers on a mission to help businesses thrive in the digital era.</p>
                        <div className="page-hero-breadcrumb"><Link href="/">Home</Link> / <span>About</span></div>
                    </motion.div>
                </div>
                <div className="page-hero-wave"><svg viewBox="0 0 1440 80" preserveAspectRatio="none"><path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="white" /></svg></div>
            </div>

            {/* Story Section */}
            <section className="section-pad" ref={ref}>
                <div className="container">
                    <div className="about-story-grid">
                        <motion.div className="about-story-left" initial={{ opacity: 0, x: -40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7 }}>
                            <div className="section-badge">Our Story</div>
                            <h2 className="section-title" style={{ textAlign: 'left', maxWidth: 'none' }}>Passionate About <span>Digital Innovation</span></h2>
                            <p style={{ color: 'var(--gray-600)', lineHeight: 1.8, marginBottom: 20 }}>Founded in 2018, Prominent TechnoLabs started with a simple idea: make world-class web and mobile development accessible to businesses of all sizes — from startups to enterprises across India and abroad.</p>
                            <p style={{ color: 'var(--gray-600)', lineHeight: 1.8, marginBottom: 28 }}>Today, we are a full-service digital agency with expertise in React, Laravel, Flutter, WordPress, UI/UX design, and digital marketing. Our team of 15+ professionals has delivered 50+ projects for clients across India, UK, USA, Australia, and Singapore.</p>
                            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                                {['React & Laravel Experts', 'Flutter Native Apps', 'Certified SEO Specialists', 'Agile Delivery Teams'].map(t => (
                                    <span key={t} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '0.83rem', fontWeight: 600, color: 'var(--primary)', background: 'rgba(10,36,99,0.06)', padding: '6px 14px', borderRadius: 'var(--radius-full)' }}>
                                        <FiCheckCircle color="#FF6600" size={13} />{t}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                        <motion.div className="about-story-right" initial={{ opacity: 0, x: 40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.2 }}>
                            <div className="about-visual-card">
                                <img src="/images/icon-white.svg" alt="Prominent TechnoLabs" style={{ width: 64, marginBottom: 16 }} />
                                <h3>Innovative. Reliable. Expert.</h3>
                                <p>Partner with us to bring your vision to life</p>
                                <div className="about-stats-row">
                                    {[['30+', 'Clients'], ['50+', 'Projects'], ['15+', 'Team'], ['99%', 'Satisfaction']].map(([n, l]) => (
                                        <div key={l} className="about-mini-stat"><strong>{n}</strong><span>{l}</span></div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="section-pad bg-light">
                <div className="container">
                    <div className="section-header">
                        <div className="section-badge">Our Values</div>
                        <h2 className="section-title">What <span>Drives Us</span></h2>
                    </div>
                    <div className="grid-4">
                        {values.map((v, i) => {
                            const Icon = v.icon
                            return (
                                <motion.div key={v.title} className="value-card" initial={{ opacity: 0, y: 25 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: i * 0.1 }}>
                                    <div className="value-icon" style={{ background: v.color + '15', color: v.color }}><Icon size={24} /></div>
                                    <h3 className="value-title">{v.title}</h3>
                                    <p className="value-desc">{v.desc}</p>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Timeline */}
            <section className="section-pad" ref={ref2}>
                <div className="container">
                    <div className="section-header">
                        <div className="section-badge">Our Journey</div>
                        <h2 className="section-title">Key <span>Milestones</span></h2>
                    </div>
                    <div className="timeline">
                        {milestones.map((m, i) => (
                            <motion.div key={m.year} className={`timeline-item ${i % 2 === 0 ? 'left' : 'right'}`} initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }} animate={inView2 ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: i * 0.15 }}>
                                <div className="timeline-year">{m.year}</div>
                                <div className="timeline-content">
                                    <h4>{m.title}</h4>
                                    <p>{m.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="section-pad" style={{ background: 'var(--gradient-primary)', textAlign: 'center' }}>
                <div className="container">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={inView2 ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
                        <h2 style={{ color: 'white', fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.6rem,3vw,2.4rem)', fontWeight: 800, marginBottom: 16 }}>Ready to Start Your Project?</h2>
                        <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: 32, fontSize: '1.05rem' }}>Let's build something remarkable together.</p>
                        <Link href="/contact" className="btn btn-primary">Get a Free Quote <FiArrowRight /></Link>
                    </motion.div>
                </div>
            </section>

            <style>{`
        .about-story-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; }
        .about-visual-card { background: var(--gradient-primary); border-radius: var(--radius-xl); padding: 48px 36px; color: white; text-align: center; }
        .about-visual-card h3 { font-family: var(--font-heading); font-size: 1.3rem; font-weight: 700; margin-bottom: 8px; }
        .about-visual-card p { font-size: 0.9rem; opacity: 0.7; margin-bottom: 28px; }
        .about-stats-row { display: flex; gap: 8px; justify-content: center; flex-wrap: wrap; }
        .about-mini-stat { background: rgba(255,255,255,0.1); border-radius: var(--radius-sm); padding: 10px 16px; text-align: center; }
        .about-mini-stat strong { display: block; font-family: var(--font-heading); font-size: 1.4rem; font-weight: 800; color: var(--orange); }
        .about-mini-stat span { font-size: 0.72rem; opacity: 0.7; text-transform: uppercase; }
        .value-card { background: white; border-radius: var(--radius-lg); padding: 32px; box-shadow: var(--shadow-card); border: 1px solid var(--gray-100); transition: var(--transition); }
        .value-card:hover { transform: translateY(-6px); box-shadow: var(--shadow-card-hover); }
        .value-icon { width: 54px; height: 54px; border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; margin-bottom: 16px; }
        .value-title { font-family: var(--font-heading); font-size: 1rem; font-weight: 700; color: var(--primary); margin-bottom: 10px; }
        .value-desc { font-size: 0.85rem; color: var(--gray-600); line-height: 1.7; }
        .timeline { max-width: 680px; margin: 0 auto; display: flex; flex-direction: column; gap: 24px; }
        .timeline-item { display: flex; gap: 20px; align-items: flex-start; }
        .timeline-item.right { flex-direction: row; }
        .timeline-year { background: var(--orange); color: white; font-family: var(--font-heading); font-weight: 800; font-size: 0.95rem; padding: 8px 16px; border-radius: var(--radius-full); text-align: center; white-space: nowrap; flex-shrink: 0; min-width: 70px; margin-top: 4px; }
        .timeline-content { background: white; border-radius: var(--radius-md); padding: 20px 24px; box-shadow: var(--shadow-card); border: 1px solid var(--gray-100); flex: 1; }
        .timeline-content h4 { font-family: var(--font-heading); font-size: 0.95rem; font-weight: 700; color: var(--primary); margin-bottom: 6px; }
        .timeline-content p { font-size: 0.84rem; color: var(--gray-600); line-height: 1.6; margin: 0; }
        @media (max-width: 900px) { .about-story-grid { grid-template-columns: 1fr; } }
        @media (max-width: 600px) { .timeline::before { display: none; } .timeline-item { grid-template-columns: 1fr; } .timeline-item.right { direction: ltr; } }
      `}</style>
        </div>
    )
}
