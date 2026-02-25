'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import {
    FiArrowRight, FiCheckCircle, FiChevronDown, FiChevronUp,
    FiPhone, FiMessageSquare,
} from 'react-icons/fi'
import SERVICE_CONFIGS from './serviceConfigs'


/* ─────────────────────────────────────────────
   FAQ Accordion Item
───────────────────────────────────────────── */
function FaqItem({ q, a, isOpen, toggle }) {
    return (
        <div className={`faq-item ${isOpen ? 'open' : ''}`} onClick={toggle}>
            <div className="faq-question">
                <span>{q}</span>
                {isOpen ? <FiChevronUp size={18} /> : <FiChevronDown size={18} />}
            </div>
            {isOpen && (
                <motion.div
                    className="faq-answer"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.25 }}
                >
                    <p>{a}</p>
                </motion.div>
            )}
        </div>
    )
}

/* ─────────────────────────────────────────────
   Main Layout
───────────────────────────────────────────── */
export default function ServicePageLayout({ slug }) {
    const config = SERVICE_CONFIGS[slug]
    const [openFaq, setOpenFaq] = useState(0)
    const [ref1, inView1] = useInView({ threshold: 0.05, triggerOnce: true })
    const [ref2, inView2] = useInView({ threshold: 0.05, triggerOnce: true })
    const [ref3, inView3] = useInView({ threshold: 0.05, triggerOnce: true })
    const [ref4, inView4] = useInView({ threshold: 0.05, triggerOnce: true })
    const [ref5, inView5] = useInView({ threshold: 0.05, triggerOnce: true })

    if (!config) return <div style={{ padding: '120px 20px', textAlign: 'center' }}>Service not found.</div>

    const {
        badge, heroTitle, heroSubtitle, heroIcon: HeroIcon, heroColor,
        serviceName,
        overviewTitle, overviewDesc, overviewHighlights, overviewStats,
        offers, process: steps, technologies, whyUs, faqs,
    } = config

    return (
        <>
            {/* ══════════════════════════════════════
          1. PAGE HERO
      ══════════════════════════════════════ */}
            <div className="page-hero spl-hero">
                <div className="spl-hero-bg-blob spl-blob-1" />
                <div className="spl-hero-bg-blob spl-blob-2" />
                <div className="container">
                    <motion.div
                        className="page-hero-content"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="section-badge">{badge}</div>
                        <h1 className="page-hero-title">{heroTitle}</h1>
                        <p className="page-hero-subtitle">{heroSubtitle}</p>

                        {/* Stats row */}
                        {overviewStats && (
                            <div className="spl-hero-stats">
                                {overviewStats.map(s => (
                                    <div key={s.label} className="spl-hero-stat">
                                        <strong>{s.value}</strong>
                                        <span>{s.label}</span>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="spl-hero-actions">
                            <Link href="/contact" className="btn btn-primary">Get a Free Quote <FiArrowRight /></Link>
                            <Link href="/services" className="btn btn-outline">All Services <FiArrowRight /></Link>
                        </div>

                        <div className="page-hero-breadcrumb" style={{ marginTop: 24 }}>
                            <Link href="/">Home</Link> / <Link href="/services">Services</Link> / <span>{serviceName}</span>
                        </div>
                    </motion.div>
                </div>
                <div className="page-hero-wave">
                    <svg viewBox="0 0 1440 80" preserveAspectRatio="none">
                        <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="white" />
                    </svg>
                </div>
            </div>

            {/* ══════════════════════════════════════
          2. OVERVIEW — 2 col
      ══════════════════════════════════════ */}
            <section className="section-pad" ref={ref1}>
                <div className="container">
                    <div className="spl-overview-grid">
                        {/* Left */}
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            animate={inView1 ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.7 }}
                        >
                            <div className="section-badge" style={{ marginBottom: 14 }}>{badge}</div>
                            <h2 className="spl-overview-title">{overviewTitle}</h2>
                            <p className="spl-overview-desc">{overviewDesc}</p>
                            <ul className="spl-overview-list">
                                {overviewHighlights.map(h => (
                                    <li key={h}><FiCheckCircle size={17} color="#FF6600" /><span>{h}</span></li>
                                ))}
                            </ul>
                            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 28 }}>
                                <Link href="/contact" className="btn btn-primary">Start Your Project <FiArrowRight /></Link>
                                <Link href="/pricing" className="btn btn-outline-navy">View Pricing <FiArrowRight /></Link>
                            </div>
                        </motion.div>

                        {/* Right — visual card */}
                        <motion.div
                            className="spl-overview-visual"
                            initial={{ opacity: 0, x: 40 }}
                            animate={inView1 ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.7, delay: 0.15 }}
                        >
                            <div className="spl-visual-card">
                                <div className="spl-visual-icon-wrap" style={{ background: heroColor + '22' }}>
                                    <HeroIcon size={48} color={heroColor} />
                                </div>
                                <h3>{overviewTitle}</h3>
                                <p>End-to-end professional solutions by our expert team in Ahmedabad, India.</p>
                                <div className="spl-visual-stats">
                                    {overviewStats?.map(s => (
                                        <div key={s.label} className="spl-vs-item">
                                            <strong>{s.value}</strong>
                                            <span>{s.label}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="spl-visual-badges">
                                    <span>Ahmedabad, India</span>
                                    <span>Since 2018</span>
                                    <span>30+ Clients</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════
          3. WHAT WE OFFER — 3 col cards
      ══════════════════════════════════════ */}
            <section className="section-pad bg-light" ref={ref2}>
                <div className="container">
                    <div className="section-header">
                        <div className="section-badge">What We Offer</div>
                        <h2 className="section-title">Complete <span>{serviceName}</span> Solutions</h2>
                        <p className="section-subtitle">
                            A full suite of {serviceName.toLowerCase()} capabilities to cover every need your business has.
                        </p>
                    </div>

                    <div className="spl-offers-grid">
                        {offers.map((offer, i) => {
                            const OIcon = offer.Icon
                            return (
                                <motion.div
                                    key={offer.title}
                                    className="spl-offer-card"
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={inView2 ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.5, delay: i * 0.08 }}
                                >
                                    <div className="spl-offer-icon" style={{ background: (offer.color || heroColor) + '18', color: offer.color || heroColor }}>
                                        <OIcon size={24} />
                                    </div>
                                    <h3 className="spl-offer-title">{offer.title}</h3>
                                    <p className="spl-offer-desc">{offer.desc}</p>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════
          4. OUR PROCESS
      ══════════════════════════════════════ */}
            <section className="section-pad" ref={ref3}>
                <div className="container">
                    <div className="section-header">
                        <div className="section-badge">How We Work</div>
                        <h2 className="section-title">Our <span>Proven Process</span></h2>
                        <p className="section-subtitle">A transparent, structured approach that delivers predictable results on time.</p>
                    </div>

                    <div className="spl-process-track">
                        {steps.map((step, i) => {
                            const SIcon = step.Icon
                            return (
                                <motion.div
                                    key={step.num}
                                    className="spl-process-step"
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={inView3 ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.5, delay: i * 0.12 }}
                                >
                                    <div className="spl-step-num">{step.num}</div>
                                    <div className="spl-step-icon"><SIcon size={30} color="#FF6600" /></div>
                                    <h4 className="spl-step-title">{step.title}</h4>
                                    <p className="spl-step-desc">{step.desc}</p>
                                    {i < steps.length - 1 && <div className="spl-step-arrow" />}
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════
          5. TECHNOLOGIES
      ══════════════════════════════════════ */}
            <section className="section-pad bg-light" ref={ref3}>
                <div className="container">
                    <div className="section-header">
                        <div className="section-badge">Tech Stack</div>
                        <h2 className="section-title">Technologies <span>We Use</span></h2>
                        <p className="section-subtitle">Industry-leading tools and frameworks chosen for performance, scalability, and maintainability.</p>
                    </div>
                    <motion.div
                        className="spl-tech-grid"
                        variants={{
                            hidden: { opacity: 0 },
                            show: {
                                opacity: 1,
                                transition: { staggerChildren: 0.05 }
                            }
                        }}
                        initial="hidden"
                        animate={inView3 ? "show" : "hidden"}
                    >
                        {technologies.map((t, i) => {
                            const TIcon = t.Icon
                            return (
                                <motion.div
                                    key={t.name}
                                    className="spl-tech-card"
                                    variants={{
                                        hidden: { opacity: 0, scale: 0.8, y: 20 },
                                        show: { opacity: 1, scale: 1, y: 0 }
                                    }}
                                    whileHover={{
                                        y: -8,
                                        scale: 1.05,
                                        boxShadow: "0 20px 40px rgba(0,0,0,0.12)",
                                        backgroundColor: "rgba(255, 255, 255, 1)"
                                    }}
                                >
                                    <div className="spl-tech-icon-wrapper">
                                        <TIcon size={34} color={t.color} />
                                    </div>
                                    <span>{t.name}</span>
                                </motion.div>
                            )
                        })}
                    </motion.div>
                </div>
            </section>

            {/* ══════════════════════════════════════
          6. WHY CHOOSE US
      ══════════════════════════════════════ */}
            <section className="section-pad" ref={ref4}>
                <div className="container">
                    <div className="section-header">
                        <div className="section-badge">Why Prominent TechnoLabs</div>
                        <h2 className="section-title">Why Businesses <span>Choose Us</span></h2>
                        <p className="section-subtitle">30+ businesses trust Prominent TechnoLabs — here is what sets us apart.</p>
                    </div>
                    <div className="spl-why-grid">
                        {whyUs.map((w, i) => {
                            const WIcon = w.Icon
                            return (
                                <motion.div
                                    key={w.title}
                                    className="spl-why-card"
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={inView4 ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.5, delay: i * 0.1 }}
                                >
                                    <div className="spl-why-icon"><WIcon size={26} /></div>
                                    <h4 className="spl-why-title">{w.title}</h4>
                                    <p className="spl-why-desc">{w.desc}</p>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════
          7. FAQ
      ══════════════════════════════════════ */}
            <section className="section-pad bg-light" ref={ref5}>
                <div className="container">
                    <div className="spl-faq-layout">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={inView5 ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="section-badge" style={{ marginBottom: 14 }}>FAQ</div>
                            <h2 className="spl-faq-heading">Frequently Asked<br /><span>Questions</span></h2>
                            <p style={{ color: 'var(--gray-600)', lineHeight: 1.8, marginBottom: 28 }}>
                                Have more questions? We are happy to help.
                            </p>
                            <Link href="/contact" className="btn btn-primary">
                                <FiMessageSquare size={16} /> Ask Us Anything
                            </Link>
                            <div style={{ marginTop: 16 }}>
                                <a href="tel:+919327603253" className="spl-phone-link">
                                    <FiPhone size={14} /> +91 93276 03253
                                </a>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={inView5 ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.1 }}
                        >
                            {faqs.map((faq, i) => (
                                <FaqItem
                                    key={i}
                                    q={faq.q}
                                    a={faq.a}
                                    isOpen={openFaq === i}
                                    toggle={() => setOpenFaq(openFaq === i ? -1 : i)}
                                />
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════
          8. CTA BANNER
      ══════════════════════════════════════ */}
            <section className="spl-cta-section">
                <div className="container spl-cta-inner">
                    <div>
                        <h2 className="spl-cta-title">Ready to Start Your <span>{serviceName}</span> Project?</h2>
                        <p className="spl-cta-sub">Get a free consultation and project estimate within 1 hour.</p>
                    </div>
                    <div className="spl-cta-actions">
                        <Link href="/contact" className="btn btn-primary">Get a Free Quote <FiArrowRight /></Link>
                        <Link href="/pricing" className="btn btn-outline">View Pricing <FiArrowRight /></Link>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════
          STYLES
      ══════════════════════════════════════ */}
            <style>{`
        /* ── Hero ── */
        .spl-hero { position: relative; overflow: hidden; }
        .spl-hero-bg-blob { position: absolute; border-radius: 50%; filter: blur(90px); opacity: 0.15; pointer-events: none; }
        .spl-blob-1 { width: 500px; height: 500px; background: #FF6600; top: -200px; right: -100px; }
        .spl-blob-2 { width: 350px; height: 350px; background: #1a6fd8; bottom: 0; left: -80px; }
        .spl-hero-stats { display: flex; gap: 32px; justify-content: center; margin: 24px 0; flex-wrap: wrap; }
        .spl-hero-stat { text-align: center; }
        .spl-hero-stat strong { display: block; font-family: var(--font-heading); font-size: 1.6rem; font-weight: 800; color: var(--orange); }
        .spl-hero-stat span { font-size: 0.8rem; color: rgba(255,255,255,0.6); text-transform: uppercase; letter-spacing: 0.5px; }
        .spl-hero-actions { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; margin-top: 8px; }

        /* ── Overview ── */
        .spl-overview-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 70px; align-items: center; }
        .spl-overview-title { font-family: var(--font-heading); font-size: clamp(1.5rem, 2.5vw, 2rem); font-weight: 700; color: var(--primary); margin-bottom: 14px; line-height: 1.3; }
        .spl-overview-desc { font-size: 0.96rem; color: var(--gray-600); line-height: 1.85; margin-bottom: 22px; }
        .spl-overview-list { display: flex; flex-direction: column; gap: 10px; }
        .spl-overview-list li { display: flex; align-items: flex-start; gap: 10px; font-size: 0.9rem; color: var(--gray-700); font-weight: 500; }
        .spl-visual-card { background: var(--gradient-primary); border-radius: var(--radius-xl); padding: 40px 36px; color: white; box-shadow: 0 20px 60px rgba(10,36,99,0.25); }
        .spl-visual-icon-wrap { width: 88px; height: 88px; border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; }
        .spl-visual-card h3 { font-family: var(--font-heading); font-size: 1.1rem; font-weight: 700; text-align: center; margin-bottom: 8px; }
        .spl-visual-card p { font-size: 0.84rem; opacity: 0.65; text-align: center; line-height: 1.6; margin-bottom: 24px; }
        .spl-visual-stats { display: flex; justify-content: center; gap: 28px; padding: 20px 0; border-top: 1px solid rgba(255,255,255,0.12); border-bottom: 1px solid rgba(255,255,255,0.12); margin-bottom: 20px; }
        .spl-vs-item { text-align: center; }
        .spl-vs-item strong { display: block; font-family: var(--font-heading); font-size: 1.5rem; font-weight: 800; color: var(--orange); }
        .spl-vs-item span { font-size: 0.7rem; opacity: 0.55; text-transform: uppercase; letter-spacing: 0.5px; }
        .spl-visual-badges { display: flex; gap: 8px; flex-wrap: wrap; justify-content: center; }
        .spl-visual-badges span { padding: 4px 12px; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); border-radius: var(--radius-full); font-size: 0.75rem; color: rgba(255,255,255,0.8); }

        /* ── Offers ── */
        .spl-offers-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        .spl-offer-card { background: white; border-radius: var(--radius-lg); padding: 30px; border: 1.5px solid var(--gray-100); box-shadow: var(--shadow-card); transition: var(--transition); }
        .spl-offer-card:hover { transform: translateY(-6px); box-shadow: var(--shadow-card-hover); border-color: rgba(255,102,0,0.15); }
        .spl-offer-icon { width: 54px; height: 54px; border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; margin-bottom: 16px; }
        .spl-offer-title { font-family: var(--font-heading); font-size: 0.98rem; font-weight: 700; color: var(--primary); margin-bottom: 8px; }
        .spl-offer-desc { font-size: 0.85rem; color: var(--gray-600); line-height: 1.72; }

        /* ── Process ── */
        .spl-process-track { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 28px; }
        .spl-process-step { background: white; border-radius: var(--radius-lg); padding: 32px 24px; text-align: center; position: relative; box-shadow: var(--shadow-card); border: 1.5px solid var(--gray-100); }
        .spl-step-num { position: absolute; top: -16px; left: 50%; transform: translateX(-50%); width: 32px; height: 32px; background: var(--gradient-orange); border-radius: 50%; font-size: 0.75rem; font-weight: 700; color: white; display: flex; align-items: center; justify-content: center; font-family: var(--font-heading); box-shadow: var(--shadow-orange); }
        .spl-step-icon { display: flex; justify-content: center; align-items: center; height: 48px; margin-bottom: 14px; }
        .spl-step-title { font-family: var(--font-heading); font-size: 0.95rem; font-weight: 700; color: var(--primary); margin-bottom: 8px; }
        .spl-step-desc { font-size: 0.83rem; color: var(--gray-600); line-height: 1.7; }

        /* ── Technologies ── */
        .spl-tech-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(130px, 1fr)); gap: 20px; }
        .spl-tech-card { 
            background: rgba(255, 255, 255, 0.7); 
            backdrop-filter: blur(10px); 
            -webkit-backdrop-filter: blur(10px);
            border-radius: var(--radius-lg); 
            padding: 24px 16px; 
            text-align: center; 
            box-shadow: 0 4px 15px rgba(0,0,0,0.04); 
            border: 1px solid rgba(255, 255, 255, 0.5); 
            display: flex; 
            flex-direction: column; 
            align-items: center; 
            gap: 12px; 
            transition: background-color 0.3s ease; 
        }
        .spl-tech-icon-wrapper {
            width: 60px;
            height: 60px;
            background: white;
            border-radius: var(--radius-md);
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 5px 15px rgba(0,0,0,0.05);
            margin-bottom: 4px;
        }
        .spl-tech-card span { font-size: 0.85rem; font-weight: 700; color: var(--primary); letter-spacing: 0.2px; }

        /* ── Why Us ── */
        .spl-why-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px; }
        .spl-why-card { background: white; border-radius: var(--radius-lg); padding: 36px 28px; border: 1.5px solid var(--gray-100); box-shadow: var(--shadow-card); transition: var(--transition); }
        .spl-why-card:hover { transform: translateY(-6px); box-shadow: var(--shadow-card-hover); }
        .spl-why-icon { width: 54px; height: 54px; background: rgba(255,102,0,0.1); border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; color: var(--orange); margin-bottom: 16px; }
        .spl-why-title { font-family: var(--font-heading); font-size: 1rem; font-weight: 700; color: var(--primary); margin-bottom: 10px; }
        .spl-why-desc { font-size: 0.86rem; color: var(--gray-600); line-height: 1.72; }

        /* ── FAQ ── */
        .spl-faq-layout { display: grid; grid-template-columns: 1fr 1.5fr; gap: 70px; align-items: start; }
        .spl-faq-heading { font-family: var(--font-heading); font-size: clamp(1.5rem, 2.5vw, 2rem); font-weight: 700; color: var(--primary); line-height: 1.3; margin-bottom: 14px; }
        .spl-faq-heading span { color: var(--orange); }
        .spl-phone-link { display: inline-flex; align-items: center; gap: 6px; font-size: 0.9rem; font-weight: 600; color: var(--primary); transition: var(--transition); }
        .spl-phone-link:hover { color: var(--orange); }
        .faq-item { background: white; border-radius: var(--radius-md); border: 1.5px solid var(--gray-100); margin-bottom: 12px; cursor: pointer; transition: var(--transition); overflow: hidden; }
        .faq-item.open { border-color: var(--orange); box-shadow: 0 4px 20px rgba(255,102,0,0.08); }
        .faq-question { display: flex; justify-content: space-between; align-items: center; padding: 18px 20px; font-size: 0.93rem; font-weight: 600; color: var(--primary); gap: 12px; }
        .faq-question svg { flex-shrink: 0; color: var(--orange); }
        .faq-answer { padding: 0 20px 18px; }
        .faq-answer p { font-size: 0.87rem; color: var(--gray-600); line-height: 1.8; }

        /* ── CTA ── */
        .spl-cta-section { background: var(--gradient-primary); padding: 70px 0; }
        .spl-cta-inner { display: flex; align-items: center; justify-content: space-between; gap: 40px; flex-wrap: wrap; }
        .spl-cta-title { font-family: var(--font-heading); font-size: clamp(1.4rem, 2.5vw, 2rem); font-weight: 800; color: white; margin-bottom: 8px; }
        .spl-cta-title span { color: var(--orange); }
        .spl-cta-sub { color: rgba(255,255,255,0.65); font-size: 0.95rem; }
        .spl-cta-actions { display: flex; gap: 12px; flex-wrap: wrap; flex-shrink: 0; }

        /* ── Responsive ── */
        @media (max-width: 1024px) {
          .spl-offers-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 900px) {
          .spl-overview-grid { grid-template-columns: 1fr; gap: 40px; }
          .spl-faq-layout { grid-template-columns: 1fr; gap: 40px; }
          .spl-why-grid { grid-template-columns: 1fr 1fr; }
          .spl-cta-inner { flex-direction: column; text-align: center; }
          .spl-cta-actions { justify-content: center; }
          .spl-hero-actions { flex-direction: column; align-items: center; }
        }
        @media (max-width: 600px) {
          .spl-offers-grid { grid-template-columns: 1fr; }
          .spl-why-grid { grid-template-columns: 1fr; }
          .spl-process-track { grid-template-columns: 1fr; }
          .spl-tech-grid { grid-template-columns: repeat(3, 1fr); }
        }
      `}</style>
        </>
    )
}
