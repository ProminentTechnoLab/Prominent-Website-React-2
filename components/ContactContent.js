'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import { FiMapPin, FiPhone, FiMail, FiClock, FiArrowRight, FiCheckCircle, FiSend } from 'react-icons/fi'

const contactInfo = [
    { icon: FiMapPin, title: 'Our Office', lines: ['G-108, Titanium City Center, 100 Feet Anand Nagar Rd, near SACHIN TOWER, Ahmedabad, Gujarat 380015'], color: '#FF6600' },
    { icon: FiPhone, title: 'Call Us', lines: ['+91 93276 03253'], href: 'tel:+919327603253', color: '#0A2463' },
    { icon: FiMail, title: 'Email Us', lines: ['info@prominenttechnolabs.com'], href: 'mailto:info@prominenttechnolabs.com', color: '#7c3aed' },
    { icon: FiClock, title: 'Business Hours', lines: ['Mon – Fri: 9:00 AM – 7:00 PM IST'], color: '#059669' },
]

const serviceOptions = ['Website Development', 'Mobile App Development', 'UI/UX Design', 'CMS & E-Commerce', 'Payment & Shipping API', 'Digital Marketing / SEO', 'Remote Developer Hiring', 'Other / Not Listed']
const initialForm = { name: '', email: '', phone: '', service: '', budget: '', message: '' }

export default function ContactContent() {
    const [form, setForm] = useState(initialForm)
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState('')
    const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true })

    const handleChange = e => { setForm(f => ({ ...f, [e.target.name]: e.target.value })); setError('') }

    const handleSubmit = async e => {
        e.preventDefault()
        if (!form.name || !form.email || !form.message) { setError('Please fill in Name, Email, and Message.'); return }
        setLoading(true)
        try {
            // Will connect to Laravel API once backend is ready:
            // await axios.post('/api/contact', form)
            await new Promise(r => setTimeout(r, 1200))
            setSuccess(true); setForm(initialForm)
        } catch { setError('Something went wrong. Please try again or email us directly.') }
        finally { setLoading(false) }
    }

    return (
        <div>
            {/* Page Hero */}
            <div className="page-hero">
                <div className="container">
                    <motion.div className="page-hero-content" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                        <div className="section-badge">Get In Touch</div>
                        <h1 className="page-hero-title">Let's Start a Conversation</h1>
                        <p className="page-hero-subtitle">Have a project in mind or want to hire a dedicated developer? Drop us a message and we'll get back to you within 1 hour.</p>
                        <div className="page-hero-breadcrumb"><Link href="/">Home</Link> / <span>Contact</span></div>
                    </motion.div>
                </div>
                <div className="page-hero-wave"><svg viewBox="0 0 1440 80" preserveAspectRatio="none"><path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="white" /></svg></div>
            </div>

            {/* Info Cards */}
            <section className="section-pad" ref={ref}>
                <div className="container">
                    <div className="section-header">
                        <div className="section-badge">Contact Information</div>
                        <h2 className="section-title">Reach Out <span>Anytime</span></h2>
                    </div>
                    <div className="contact-info-grid">
                        {contactInfo.map((c, i) => {
                            const Icon = c.icon
                            return (
                                <motion.div key={c.title} className="contact-info-card" initial={{ opacity: 0, y: 25 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: i * 0.1 }}>
                                    <div className="cic-icon" style={{ background: c.color + '15', color: c.color }}><Icon size={22} /></div>
                                    <h3 className="cic-title">{c.title}</h3>
                                    {c.lines.map(l => c.href ? <a key={l} href={c.href} className="cic-text">{l}</a> : <p key={l} className="cic-text">{l}</p>)}
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Contact Form */}
            <section className="section-pad bg-light" style={{ paddingTop: 0 }}>
                <div className="container">
                    <motion.div className="contact-form-wrap" initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.3 }}>
                        <div className="contact-form-left">
                            <div className="section-badge">Send Us a Message</div>
                            <h2 className="section-title" style={{ textAlign: 'left', maxWidth: 'none' }}>Get a <span>Free Quote</span></h2>
                            <p style={{ color: 'var(--gray-600)', lineHeight: 1.8, marginBottom: 24, fontSize: '0.9rem' }}>Fill in the form and we'll get back to you within 1 hour with a detailed proposal and timeline.</p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 30 }}>
                                {['Free consultation & project estimation', 'No contract lock-in for first project', 'Transparent pricing, no hidden charges', 'Regular progress updates & reports'].map(f => (
                                    <div key={f} style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: '0.87rem', color: 'var(--gray-700)' }}>
                                        <FiCheckCircle color="#FF6600" size={16} />{f}
                                    </div>
                                ))}
                            </div>
                            <div style={{ background: 'var(--gradient-primary)', borderRadius: 'var(--radius-lg)', padding: '24px 28px', color: 'white' }}>
                                <div style={{ fontSize: '0.75rem', opacity: 0.6, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>Average Response Time</div>
                                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: 800, color: 'var(--orange)' }}>{'< 1 Hour'}</div>
                                <div style={{ fontSize: '0.82rem', opacity: 0.6, marginTop: 4 }}>Mon – Fri, 9 AM – 7 PM IST</div>
                            </div>
                        </div>
                        <div className="contact-form-right">
                            {success ? (
                                <div className="contact-success">
                                    <div style={{ fontSize: '3rem', marginBottom: 20 }}>🎉</div>
                                    <h3>Message Sent Successfully!</h3>
                                    <p>Thank you for reaching out. Our team will contact you with a detailed response.</p>
                                    <button className="btn btn-primary" onClick={() => setSuccess(false)} style={{ marginTop: 20 }}>Send Another Message <FiArrowRight /></button>
                                </div>
                            ) : (
                                <form className="contact-form" onSubmit={handleSubmit}>
                                    <div className="form-row">
                                        <div className="form-group"><label className="form-label">Full Name *</label><input name="name" type="text" className="form-input" placeholder="John Doe" value={form.name} onChange={handleChange} required /></div>
                                        <div className="form-group"><label className="form-label">Email Address *</label><input name="email" type="email" className="form-input" placeholder="john@example.com" value={form.email} onChange={handleChange} required /></div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group"><label className="form-label">Phone Number</label><input name="phone" type="tel" className="form-input" placeholder="+91 93276 03253" value={form.phone} onChange={handleChange} /></div>
                                        <div className="form-group"><label className="form-label">Service Required</label>
                                            <select name="service" className="form-input" value={form.service} onChange={handleChange}>
                                                <option value="">Select a service...</option>
                                                {serviceOptions.map(o => <option key={o}>{o}</option>)}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group"><label className="form-label">Estimated Budget</label>
                                        <select name="budget" className="form-input" value={form.budget} onChange={handleChange}>
                                            <option value="">Select your budget range...</option>
                                            <option>Under ₹15,000</option><option>₹15,000 – ₹50,000</option><option>₹50,000 – ₹1,50,000</option><option>₹1,50,000 – ₹5,00,000</option><option>₹5,00,000+</option>
                                        </select>
                                    </div>
                                    <div className="form-group"><label className="form-label">Message / Project Details *</label><textarea name="message" className="form-input form-textarea" placeholder="Describe your project, goals, timeline, and any specific requirements..." value={form.message} onChange={handleChange} required rows={4} /></div>
                                    {error && <div className="form-error">{error}</div>}
                                    <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={loading}>
                                        {loading ? 'Sending...' : <><FiSend /> Send Message</>}
                                    </button>
                                </form>
                            )}
                        </div>
                    </motion.div>
                </div>
            </section>

            <style>{`
        .contact-info-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 24px; }
        .contact-info-card { background: white; border-radius: var(--radius-lg); padding: 28px; box-shadow: var(--shadow-card); border: 1px solid var(--gray-100); text-align: center; transition: var(--transition); }
        .contact-info-card:hover { transform: translateY(-6px); box-shadow: var(--shadow-card-hover); }
        .cic-icon { width: 54px; height: 54px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 14px; }
        .cic-title { font-family: var(--font-heading); font-size: 0.95rem; font-weight: 700; color: var(--primary); margin-bottom: 6px; }
        .cic-text { font-size: 0.84rem; color: var(--gray-600); line-height: 1.6; display: block; transition: var(--transition); text-decoration: none; }
        .cic-text:hover { color: var(--orange); }
        .contact-form-wrap { display: grid; grid-template-columns: 1fr 1.4fr; gap: 60px; background: white; border-radius: var(--radius-xl); padding: 54px; box-shadow: var(--shadow-lg); border: 1px solid var(--gray-100); }
        .contact-form { display: flex; flex-direction: column; gap: 18px; }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .form-group { display: flex; flex-direction: column; gap: 6px; }
        .form-label { font-size: 0.82rem; font-weight: 600; color: var(--gray-700); }
        .form-input { padding: 11px 14px; border: 1.5px solid var(--gray-200); border-radius: var(--radius-sm); font-size: 0.88rem; color: var(--gray-800); background: var(--off-white); transition: var(--transition); outline: none; font-family: var(--font-primary); }
        .form-input:focus { border-color: var(--orange); background: white; box-shadow: 0 0 0 3px rgba(255,102,0,0.08); }
        .form-textarea { resize: vertical; min-height: 110px; }
        .form-error { font-size: 0.82rem; color: #dc2626; background: #fef2f2; border: 1px solid #fecaca; border-radius: var(--radius-sm); padding: 10px 14px; }
        .contact-success { text-align: center; padding: 40px 20px; }
        .contact-success h3 { font-family: var(--font-heading); font-size: 1.3rem; font-weight: 700; color: var(--primary); margin-bottom: 12px; }
        .contact-success p { font-size: 0.9rem; color: var(--gray-600); line-height: 1.7; }
        @media (max-width: 1024px) { .contact-info-grid { grid-template-columns: repeat(2,1fr); } }
        @media (max-width: 900px) { .contact-form-wrap { grid-template-columns: 1fr; padding: 30px 20px; } }
        @media (max-width: 600px) { .contact-info-grid { grid-template-columns: 1fr; } .form-row { grid-template-columns: 1fr; } }
      `}</style>
        </div>
    )
}
