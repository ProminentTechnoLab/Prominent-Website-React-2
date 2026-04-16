'use client'

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import Link from 'next/link'
import StretchableLine from './animations/StretchableLine'
import Testimonials from './Testimonials'

const AboutContent = () => {
  const containerRef = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    
    const ctx = gsap.context(() => {
      // Hero Title Animation
      gsap.fromTo('.ab-hero-title span', 
        { y: 100, opacity: 0 }, 
        { y: 0, opacity: 1, stagger: 0.1, duration: 1.2, ease: 'power4.out', delay: 0.2 }
      )

      // Hero Media Reveal
      gsap.fromTo('.ab-hero-media', 
        { scale: 0.9, opacity: 0 }, 
        { scale: 1, opacity: 1, duration: 1.5, ease: 'expo.out', delay: 0.4 }
      )

      // Reusable Scroll Reveal
      gsap.utils.toArray('.reveal').forEach(el => {
        gsap.fromTo(el, 
          { y: 50, opacity: 0 }, 
          { 
            y: 0, opacity: 1, duration: 1.2, ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              toggleActions: 'play none none none'
            }
          }
        )
      })

      // Image Parallax
      gsap.to('.parallax-img', {
        y: -120,
        ease: 'none',
        scrollTrigger: {
          trigger: '.parallax-wrap',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      })

      // Stats Counter Animation
      gsap.utils.toArray('.ab-stat-num').forEach(el => {
        const target = parseInt(el.getAttribute('data-target'))
        const suffix = el.getAttribute('data-suffix') || ''
        const obj = { val: 0 }
        gsap.to(obj, {
          val: target,
          duration: 2.5,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            toggleActions: 'play none none none'
          },
          onUpdate: () => {
            el.innerText = Math.ceil(obj.val) + suffix
          }
        })
      })

      // Magnetic Perspective for Stats
      gsap.utils.toArray('.ab-stat-item').forEach(item => {
        item.addEventListener('mousemove', (e) => {
          const { left, top, width, height } = item.getBoundingClientRect()
          const centerX = left + width / 2
          const centerY = top + height / 2
          const x = (e.clientX - centerX) / (width / 2)
          const y = (e.clientY - centerY) / (height / 2)
          
          gsap.to(item, {
            rotateY: x * 15,
            rotateX: -y * 15,
            duration: 0.5,
            ease: 'power2.out',
            transformPerspective: 1000,
            overwrite: 'auto'
          })
        })
        
        item.addEventListener('mouseleave', () => {
          gsap.to(item, {
            rotateY: 0,
            rotateX: 0,
            duration: 1,
            ease: 'power2.out',
            overwrite: 'auto'
          })
        })
      })

      // Benefit icon entrance (scale/fade)
      gsap.utils.toArray('.ab-benefit-icon-box').forEach(box => {
        gsap.fromTo(box, 
          { scale: 0.5, opacity: 0, rotate: -10 },
          { 
            scale: 1, opacity: 1, rotate: 0, 
            duration: 1.5, ease: 'expo.out',
            scrollTrigger: {
              trigger: box,
              start: 'top 90%'
            }
          }
        )
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const stats = [
    { num: 50, suffix: '+', label: 'Digital Products' },
    { num: 30, suffix: '+', label: 'Happy Clients' },
    { num: 15, suffix: '+', label: 'Experts' },
    { num: 5, suffix: '+', label: 'Years' }
  ]

  const benefits = [
    { 
      label: 'Sync', 
      title: 'Timezone Agnostic', 
      desc: 'We sync with your schedule, ensuring seamless global collaboration across any time difference. Your project never sleeps.',
      icon: '/images/benefits_globe_3d.png'
    },
    { 
      label: 'Quality', 
      title: 'Precision Obsessed', 
      desc: 'No shortcuts. We develop digital products exactly as they were designed, pixel for pixel, ensuring flawless performance.',
      icon: '/images/benefits_prism_3d.png'
    },
    { 
      label: 'Terms', 
      title: 'Transparent Terms', 
      desc: 'Flexible engagement models from fixed-price projects to dedicated time & materials squads. Total clarity in every contract.',
      icon: '/images/benefits_compass_3d.png'
    },
    { 
      label: 'Unity', 
      title: 'Full Stack Partnership', 
      desc: 'A unified partner for design, engineering, and strategy. We handle the complexity so you can focus on your vision.',
      icon: '/images/benefits_links_3d.png'
    }
  ]

  const services = [
    { title: 'Product Design', desc: 'UI/UX Design, Prototyping, Design Systems' },
    { title: 'Web Development', desc: 'React, Next.js, High Performance Web Apps' },
    { title: 'Mobile Apps', desc: 'iOS, Android, Cross-platform Solutions' },
    { title: 'Branding', desc: 'Visual Identity, Motion Design, Strategy' }
  ]

  return (
    <div className="ab-container" ref={containerRef}>
      {/* ─── Hero Section (WHITE) ─── */}
      <section className="ab-hero ab-white-bg">
        <div className="ab-narrow-container">
          <h1 className="ab-hero-title">
            <span className="d-block">Creativity</span>
            <span className="d-block">meets technology</span>
          </h1>
          <div className="ab-hero-media parallax-wrap">
            <img src="/images/about_hero_vibe.png" alt="Office Vibe" className="parallax-img" />
          </div>
        </div>
      </section>

      <StretchableLine color="#333333" />

      {/* ─── Our Goal Section (WHITE) ─── */}
      <section className="ab-goal ab-white-bg">
        <div className="ab-wide-container reveal">
          <div className="ab-grid">
            <div className="ab-col-left">
              <span className="ab-label">Our Goal</span>
            </div>
            <div className="ab-col-right">
              <h2 className="ab-goal-text">
                We believe in the power of digital transformation to solve complex business problems. 
                Our team is dedicated to crafting premium experiences that resonate with users and drive growth.
              </h2>
              <p className="ab-sub-text">
                Since 2018, Prominent TechnoLabs has been at the forefront of innovation, 
                partnering with startups and enterprises to build the digital future.
              </p>
            </div>
          </div>
        </div>
      </section>

      <StretchableLine color="rgba(255,255,255,0.15)" />

      {/* ─── Stats Section (BLACK) ─── */}
      <section className="ab-stats ab-black-bg">
        <div className="ab-wide-container">
          <div className="ab-stats-header reveal">
            <span className="ab-label">Our Scale</span>
            <h2 className="ab-stats-title">Turning ambition into tangible digital success.</h2>
          </div>
          <div className="ab-stats-grid">
            {stats.map((s, i) => (
              <div key={i} className="ab-stat-item reveal">
                <span className="ab-stat-num" data-target={s.num} data-suffix={s.suffix}>0</span>
                <span className="ab-stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <StretchableLine color="rgba(255,255,255,0.15)" />

      {/* ─── Benefits Section (BLACK) ─── */}
      <section className="ab-benefits ab-black-bg">
        <div className="ab-wide-container">
          <div className="ab-benefits-header reveal">
            <span className="ab-label">Benefits</span>
            <h2 className="ab-benefits-main-title">Why work with us</h2>
          </div>
          <div className="ab-benefits-list">
            {benefits.map((b, i) => (
              <div key={i} className="ab-benefit-row reveal">
                <div className="ab-benefit-col-icon">
                  <div className="ab-benefit-icon-box">
                    <img src={b.icon} alt={b.title} className="ab-benefit-img" />
                  </div>
                </div>
                <div className="ab-benefit-col-label">
                  <span className="ab-label">{b.label}</span>
                </div>
                <div className="ab-benefit-col-desc">
                  <h3 className="ab-benefit-title">{b.title}</h3>
                  <p className="ab-benefit-desc">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <StretchableLine color="#333333" />

      {/* ─── What We Do (WHITE) ─── */}
      <section className="ab-services ab-white-bg">
        <div className="ab-wide-container">
          <div className="ab-grid">
            <div className="ab-col-left">
              <span className="ab-label">What we do best</span>
            </div>
            <div className="ab-col-right">
              <div className="ab-service-list">
                {services.map((s, i) => (
                  <div key={i} className="ab-service-item">
                    <StretchableLine color="#333333" />
                    <div className="ab-service-content reveal">
                      <h3 className="ab-service-title">{s.title}</h3>
                      <p className="ab-service-desc">{s.desc}</p>
                    </div>
                  </div>
                ))}
                <StretchableLine color="#333333" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <StretchableLine color="rgba(255,255,255,0.15)" />

      {/* ─── Testimonials (BLACK) ─── */}
      <div className="ab-testimonials-outer ab-black-bg reveal">
        <Testimonials variant="dark" />
      </div>

      <style>{`
        .ab-container {
          background: #ffffff;
          padding-top: 100px;
        }
        .ab-white-bg { background: #ffffff; color: #000000; }
        .ab-black-bg { background: #000000; color: #ffffff; }

        .ab-wide-container {
          width: 100%;
          padding: 0 12vw; /* Increased Side Gutters for Universal Consistency */
        }
        .ab-narrow-container {
          width: 85%;
          margin: 0 auto;
        }
        
        .d-block { display: block; overflow: hidden; }
        
        .ab-label {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: rgba(0,0,0,0.4);
          font-weight: 600;
        }
        .ab-black-bg .ab-label { color: rgba(255,255,255,0.4); }

        /* Hero */
        .ab-hero { padding: 80px 0; text-align: center; }
        .ab-hero-title {
          font-size: clamp(2.5rem, 6vw, 5.2rem);
          line-height: 1.05;
          font-weight: 500;
          letter-spacing: -0.04em;
          margin-bottom: 80px;
        }
        .ab-hero-media {
          width: 100%;
          border-radius: 40px;
          overflow: hidden;
          height: 85vh;
          position: relative;
          background: #f1f1f1;
        }
        .ab-hero-media img {
          width: 100%;
          height: 140%;
          object-fit: cover;
          display: block;
        }

        /* Grid General */
        .ab-grid {
          display: grid;
          grid-template-columns: 0.6fr 2fr;
          gap: 5vw;
          padding: 180px 0;
        }

        /* Goal */
        .ab-goal-text {
          font-size: clamp(1.2rem, 2.8vw, 2.2rem);
          line-height: 1.35;
          font-weight: 500;
          margin-bottom: 50px;
          letter-spacing: -0.02em;
          max-width: 900px;
        }
        .ab-sub-text {
          font-size: 1.15rem;
          color: rgba(0,0,0,0.6);
          max-width: 650px;
          line-height: 1.8;
        }

        /* Stats Section */
        .ab-stats { padding: 180px 0; }
        .ab-stats-header { margin-bottom: 80px; }
        .ab-stats-title {
          font-size: clamp(1.5rem, 3.5vw, 3rem);
          font-weight: 500;
          margin-top: 20px;
          letter-spacing: -0.03em;
          max-width: 800px;
        }
        .ab-stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }
        .ab-stat-item {
          background: #0d0d0d;
          padding: 80px 40px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          border-radius: 20px;
          border: 1px solid rgba(255,255,255,0.05);
          transition: transform 0.1s ease-out; /* For magnetic perspective logic */
        }
        .ab-stat-num {
          font-size: clamp(3rem, 7vw, 5rem);
          font-weight: 500;
          line-height: 1;
          margin-bottom: 12px;
          letter-spacing: -0.03em;
          color: #fff;
        }
        .ab-stat-label {
          font-size: 0.75rem;
          color: rgba(255,255,255,0.4);
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        /* Benefits Segment (Reproduction of Cuberto "Architecture") */
        .ab-benefits { padding-bottom: 180px; }
        .ab-benefits-header { padding-bottom: 80px; }
        .ab-benefits-main-title {
          font-size: clamp(1.5rem, 3.5vw, 3rem);
          font-style: normal;
          font-weight: 500;
          margin-top: 20px;
        }
        .ab-benefits-list { border-top: 1px solid rgba(255,255,255,0.15); }
        .ab-benefit-row {
          display: grid;
          grid-template-columns: 0.6fr 1.4fr 3fr;
          gap: 30px;
          padding: 100px 0;
          border-bottom: 1px solid rgba(255,255,255,0.15);
          align-items: center;
        }
        .ab-benefit-col-icon { display: flex; align-items: center; }
        .ab-benefit-icon-box {
          width: 100px;
          height: 100px;
          position: relative;
        }
        .ab-benefit-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          filter: drop-shadow(0 0 20px rgba(255,255,255,0.1));
        }
        .ab-benefit-title {
          font-size: clamp(1.5rem, 2.5vw, 2.2rem);
          font-weight: 500;
          margin-bottom: 20px;
        }
        .ab-benefit-desc {
          font-size: 1.1rem;
          color: rgba(255,255,255,0.5);
          line-height: 1.6;
          max-width: 600px;
        }

        /* Services */
        .ab-service-list { margin-top: -20px; }
        .ab-service-item { position: relative; }
        .ab-service-content {
          padding: 70px 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .ab-service-title {
          font-size: clamp(1.8rem, 3vw, 2.5rem);
          font-weight: 500;
        }
        .ab-service-desc {
          font-size: 1rem;
          color: rgba(0,0,0,0.5);
          max-width: 320px;
          text-align: right;
          line-height: 1.5;
        }

        /* Testimonials Outer */
        .ab-testimonials-outer {
          padding-bottom: 60px;
        }

        /* Mobile */
        @media (max-width: 1200px) {
          .ab-wide-container { padding: 0 8vw; }
          .ab-benefit-row { grid-template-columns: 0.6fr 1.2fr 2.5fr; }
        }
        @media (max-width: 1024px) {
          .ab-grid { grid-template-columns: 1fr; gap: 40px; padding: 100px 0; }
          .ab-stats-grid { grid-template-columns: repeat(2, 1fr); }
          .ab-benefit-row { grid-template-columns: 1fr; gap: 40px; padding: 80px 0; }
          .ab-benefit-icon-box { width: 80px; height: 80px; }
        }
        @media (max-width: 768px) {
          .ab-hero-title { font-size: 2.8rem; margin-bottom: 50px; }
          .ab-hero-media { height: 50vh; border-radius: 24px; }
          .ab-stat-item { padding: 60px 20px; }
          .ab-stat-num { font-size: 3rem; }
          .ab-service-content { flex-direction: column; align-items: flex-start; gap: 15px; padding: 50px 0; }
          .ab-service-desc { text-align: left; }
          .ab-wide-container { padding: 0 6vw; }
        }
        @media (max-width: 480px) {
          .ab-hero-title { font-size: 2.2rem; }
          .ab-stats-grid { grid-template-columns: 1fr; }
          .ab-wide-container { padding: 0 20px; }
        }
      `}</style>
    </div>
  )
}

export default AboutContent
