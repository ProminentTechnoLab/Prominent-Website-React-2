'use client'

import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { projects } from '../app/portfolio/data'

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger)
}

const ProjectDetailContent = ({ project }) => {
    const containerRef = useRef(null)
    const stickyVisitRef = useRef(null)
    
    // Find next project
    const currentIndex = projects.findIndex(p => p.slug === project.slug)
    const nextProject = projects[(currentIndex + 1) % projects.length]

    useEffect(() => {
        let ctx;
        const runAnimations = () => {
            if (ctx) ctx.revert();
            ctx = gsap.context(() => {
                // Background Color Transitions
                const sections = gsap.utils.toArray('.pd-chapter')
                sections.forEach((section) => {
                    const bgColor = section.getAttribute('data-bg')
                    const textColor = section.getAttribute('data-text')
                    
                    ScrollTrigger.create({
                        trigger: section,
                        start: 'top 50%',
                        end: 'bottom 50%',
                        onEnter: () => gsap.to('body', { backgroundColor: bgColor, color: textColor, duration: 0.8 }),
                        onEnterBack: () => gsap.to('body', { backgroundColor: bgColor, color: textColor, duration: 0.8 }),
                    })
                })

                // Sticky Visit Button Reveal
                gsap.fromTo(stickyVisitRef.current,
                    { y: 100, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: '.pd-hero',
                            start: 'bottom 20%',
                            toggleActions: 'play reverse play reverse'
                        }
                    }
                )

                // Hero Reveal
                gsap.fromTo('.pd-hero-title', 
                    { y: 100, opacity: 0 },
                    { y: 0, opacity: 1, duration: 1.2, ease: 'power4.out', delay: 0.2 }
                )

                // Masonry Parallax
                gsap.utils.toArray('.pd-gallery-item').forEach((item, i) => {
                    gsap.fromTo(item,
                        { y: 60, opacity: 0 },
                        {
                            y: 0,
                            opacity: 1,
                            duration: 1.5,
                            ease: 'power3.out',
                            scrollTrigger: {
                                trigger: item,
                                start: 'top 95%',
                                scrub: i % 2 === 0 ? 0.5 : 1
                            }
                        }
                    )
                })

                // Media Parallax
                gsap.fromTo('.pd-full-img',
                    { y: '-10%' },
                    {
                        y: '10%',
                        ease: 'none',
                        scrollTrigger: {
                            trigger: '.pd-media-full',
                            start: 'top bottom',
                            end: 'bottom top',
                            scrub: true
                        }
                    }
                )

                ScrollTrigger.refresh()
            }, containerRef)
        }

        window.addEventListener('refresh-text-reveal', runAnimations)
        const timer = setTimeout(runAnimations, 300)

        return () => {
            window.removeEventListener('refresh-text-reveal', runAnimations)
            if (ctx) ctx.revert()
            gsap.to('body', { backgroundColor: '#ffffff', color: '#000000', duration: 0 })
            clearTimeout(timer)
        }
    }, [project.slug])

    return (
        <div className="pd-container" ref={containerRef}>
            {/* Sticky Floating Visit Button */}
            <a 
                href={project.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="pd-sticky-visit"
                ref={stickyVisitRef}
                style={{ '--btn-bg': project.color }}
            >
                <div className="pd-sticky-inner">
                    <span>Visit Live Site</span>
                    <div className="pd-sticky-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg>
                    </div>
                </div>
            </a>

            {/* ─── 01 HERO ─── */}
            <section className="pd-chapter pd-hero" data-bg={project.color} data-text="#ffffff">
                <div className="pd-inner">
                    <div className="pd-hero-grid">
                        <div className="pd-hero-left">
                            <div className="pd-hero-meta">
                                <div className="pd-hero-meta-item">
                                    <span className="pd-meta-label">Sector</span>
                                    <span className="pd-meta-value">{project.category}</span>
                                </div>
                                <div className="pd-hero-meta-item">
                                    <span className="pd-meta-label">Services</span>
                                    <div className="pd-meta-list">
                                        {project.services?.map(s => <span key={s}>{s}</span>)}
                                    </div>
                                </div>
                                <div className="pd-hero-meta-item">
                                    <span className="pd-meta-label">Year</span>
                                    <span className="pd-meta-value">2024</span>
                                </div>
                            </div>
                        </div>
                        <div className="pd-hero-right">
                            <h1 className="pd-hero-title">{project.title}</h1>
                            <p className="pd-hero-desc">{project.fullDescription}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── 02 FULL BLEED MEDIA ─── */}
            <section className="pd-chapter pd-media-full" data-bg="#000000" data-text="#ffffff">
                <div className="pd-full-img-wrap">
                    <div className="pd-full-img">
                        <Image src={project.image} alt="Hero" fill style={{ objectFit: 'cover' }} priority />
                    </div>
                </div>
            </section>

            {/* ─── 03 STRATEGY ─── */}
            <section className="pd-chapter pd-strategy" data-bg="#ffffff" data-text="#000000">
                <div className="pd-inner">
                    <div className="pd-content-split">
                        <div className="pd-chapter-num">01 / Objective</div>
                        <div className="pd-chapter-main">
                            <h2 className="pd-chapter-heading">The Method behind the Magic.</h2>
                            <p className="pd-chapter-para">{project.approach}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── 04 MASONRY SHOWCASE ─── */}
            <section className="pd-chapter pd-gallery" data-bg="#f9f9fb" data-text="#000000">
                <div className="pd-inner">
                    <div className="pd-masonry-grid">
                        {project.images?.map((img, idx) => (
                            <div key={idx} className={`pd-gallery-item pos-${idx}`}>
                                <div className="pd-gallery-img-box">
                                    <Image src={img} alt="Showcase" fill style={{ objectFit: 'cover' }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── 05 OUTCOME SECTION (FIXED SPACING) ─── */}
            <section className="pd-chapter pd-outcome" data-bg="#ffffff" data-text="#000000">
                <div className="pd-inner">
                    <div className="pd-outcome-card">
                        <div className="pd-outcome-grid">
                            <div className="pd-outcome-header">
                                <span className="pd-meta-label">02 / Outcome</span>
                                <h3 className="pd-outcome-title">Measured Success.</h3>
                            </div>
                            <div className="pd-outcome-content">
                                <p className="pd-outcome-para">{project.results}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── 06 NEXT PROJECT REVEAL ─── */}
            <section className="pd-chapter pd-next-chapter" data-bg="#000000" data-text="#ffffff">
                <Link href={`/portfolio/${nextProject.slug}`} className="pd-next-link">
                    <div className="pd-next-bg">
                        <Image src={nextProject.image} alt="Next" fill style={{ objectFit: 'cover', opacity: 0.4 }} />
                    </div>
                    <div className="pd-inner">
                        <div className="pd-next-content">
                            <span className="pd-next-label">Next Project</span>
                            <h2 className="pd-next-title">{nextProject.title}</h2>
                            <div className="pd-next-circle">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                            </div>
                        </div>
                    </div>
                </Link>
            </section>

            <style>{`
                .pd-container { width: 100%; position: relative; }
                .pd-inner { max-width: 1600px; margin: 0 auto; padding: 0 6vw; }

                /* ─── Sticky Visit Button ─── */
                .pd-sticky-visit {
                    position: fixed;
                    bottom: 40px;
                    right: 40px;
                    z-index: 1000;
                    text-decoration: none;
                    background: var(--btn-bg);
                    color: #fff;
                    padding: 6px 6px 6px 24px;
                    border-radius: 500px;
                    display: flex;
                    align-items: center;
                    box-shadow: 0 20px 40px rgba(0,0,0,0.2);
                    transition: transform 0.5s var(--ease-expo);
                    opacity: 0;
                    transform: translateY(100px);
                }

                .pd-sticky-visit:hover { transform: scale(1.05) !important; }
                .pd-sticky-inner { display: flex; align-items: center; gap: 15px; }
                .pd-sticky-inner span { font-size: 0.85rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; }
                .pd-sticky-icon { width: 44px; height: 44px; background: rgba(255,255,255,0.2); border-radius: 50%; display: flex; align-items: center; justify-content: center; transition: background 0.3s ease; }
                .pd-sticky-visit:hover .pd-sticky-icon { background: rgba(255,255,255,0.4); }
                .pd-sticky-icon svg { width: 18px; height: 18px; }

                /* ─── Global Chapters ─── */
                .pd-chapter { padding: 120px 0; position: relative; }

                /* ─── Hero ─── */
                .pd-hero { min-height: 90vh; display: flex; align-items: center; padding-top: 140px; }
                .pd-hero-grid { display: grid; grid-template-columns: 350px 1fr; gap: 80px; align-items: flex-start; }
                .pd-hero-meta { display: flex; flex-direction: column; gap: 40px; }
                .pd-meta-label { display: block; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.15em; font-weight: 700; opacity: 0.5; margin-bottom: 12px; }
                .pd-meta-value, .pd-meta-list span { font-size: 1.1rem; font-weight: 500; }
                .pd-meta-list { display: flex; flex-direction: column; gap: 6px; }
                .pd-hero-title { font-size: clamp(4rem, 12vw, 12rem); font-weight: 300; line-height: 0.9; letter-spacing: -0.05em; margin-bottom: 30px; text-transform: uppercase; }
                .pd-hero-desc { font-size: clamp(1.2rem, 2vw, 2.2rem); line-height: 1.3; font-weight: 400; max-width: 900px; opacity: 0.9; }

                /* ─── Media Full (Aspect Ratio Fix) ─── */
                .pd-media-full { padding: 0; height: auto; aspect-ratio: 21/9; width: 100%; overflow: hidden; }
                .pd-full-img-wrap { position: relative; width: 100%; height: 100%; overflow: hidden; }
                .pd-full-img { position: relative; width: 100%; height: 120%; top: -10%; }

                /* ─── Strategy ─── */
                .pd-content-split { display: grid; grid-template-columns: 350px 1fr; gap: 80px; }
                .pd-chapter-num { font-size: 0.8rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.2em; opacity: 0.3; padding-top: 10px; }
                .pd-chapter-heading { font-size: clamp(2.5rem, 5vw, 5rem); font-weight: 400; line-height: 1.1; letter-spacing: -0.04em; margin-bottom: 50px; }
                .pd-chapter-para { font-size: clamp(1.1rem, 1.8vw, 1.8rem); line-height: 1.5; opacity: 0.8; max-width: 900px; }

                /* ─── Masonry Showcase ─── */
                .pd-gallery { padding-bottom: 160px; }
                .pd-masonry-grid { display: grid; grid-template-columns: repeat(12, 1fr); gap: 40px; }
                .pd-gallery-item { position: relative; border-radius: 16px; overflow: hidden; background: #eee; }
                .pos-0 { grid-column: 1 / 9; aspect-ratio: 16/10; }
                .pos-1 { grid-column: 9 / 13; aspect-ratio: 4/5; margin-top: 80px; }
                .pos-2 { grid-column: 2 / 7; aspect-ratio: 4/5; margin-top: -80px; }
                .pos-3 { grid-column: 7 / 13; aspect-ratio: 16/10; }

                /* ─── Outcome Section (Refined) ─── */
                .pd-outcome { padding: 100px 0; border-top: 1px solid rgba(0,0,0,0.05); }
                .pd-outcome-card { max-width: 1200px; }
                .pd-outcome-grid { display: grid; grid-template-columns: 350px 1fr; gap: 80px; }
                .pd-outcome-title { font-size: 2.8rem; font-weight: 500; margin-top: 15px; letter-spacing: -0.02em; }
                .pd-outcome-para { font-size: 1.5rem; line-height: 1.5; opacity: 0.7; }

                /* ─── Next Project ─── */
                .pd-next-chapter { padding: 0; height: 100vh; }
                .pd-next-link { display: flex; width: 100%; height: 100%; position: relative; text-decoration: none; overflow: hidden; align-items: center; justify-content: center; }
                .pd-next-bg { position: absolute; top: 0; left: 0; width: 100%; height: 100%; transition: transform 1.2s var(--ease-expo), filter 1.2s ease; filter: grayscale(100%); transform: scale(1.1); }
                .pd-next-link:hover .pd-next-bg { transform: scale(1); filter: grayscale(0%); }
                .pd-next-content { position: relative; z-index: 2; text-align: center; color: #fff; }
                .pd-next-label { display: block; font-size: 1rem; text-transform: uppercase; letter-spacing: 0.3em; margin-bottom: 24px; opacity: 0.7; }
                .pd-next-title { font-size: clamp(3.5rem, 10vw, 10rem); font-weight: 300; text-transform: uppercase; line-height: 1; letter-spacing: -0.05em; }
                .pd-next-circle { width: 90px; height: 90px; border: 1px solid rgba(255,255,255,0.3); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 50px auto 0; transition: all 0.5s var(--ease-expo); }
                .pd-next-link:hover .pd-next-circle { background: #fff; border-color: #fff; transform: scale(1.1); }
                .pd-next-circle svg { width: 24px; height: 24px; color: #fff; transition: color 0.5s ease; }
                .pd-next-link:hover .pd-next-circle svg { color: #000; }

                @media (max-width: 1024px) {
                    .pd-hero-grid, .pd-content-split, .pd-outcome-grid { grid-template-columns: 1fr; gap: 40px; }
                    .pd-hero-title { font-size: clamp(3.5rem, 12vw, 8rem); }
                    .pd-hero-meta { flex-direction: row; flex-wrap: wrap; gap: 30px; }
                    .pd-hero-meta-item { flex: 1; min-width: 150px; }
                    .pd-media-full { aspect-ratio: 16/9; }
                }

                @media (max-width: 768px) {
                    .pd-chapter { padding: 60px 0; }
                    .pd-hero { padding-top: 100px; min-height: auto; }
                    .pd-hero-meta { gap: 24px; }
                    .pd-meta-label { margin-bottom: 8px; }
                    .pd-hero-desc { font-size: 1.2rem; line-height: 1.4; }
                    .pd-chapter-heading { font-size: 2.4rem; margin-bottom: 24px; }
                    .pd-chapter-para, .pd-outcome-para { font-size: 1.2rem; line-height: 1.5; }
                    
                    /* Masonry Reset */
                    .pd-masonry-grid { grid-template-columns: 1fr; gap: 20px; }
                    .pd-gallery-item { border-radius: 12px; }
                    .pos-0, .pos-1, .pos-2, .pos-3 { grid-column: span 1; aspect-ratio: 4/3; margin-top: 0 !important; }
                    
                    /* Media Fix */
                    .pd-media-full { aspect-ratio: 4/3; height: 350px; }
                    .pd-full-img { top: 0; height: 100%; }
                    
                    .pd-outcome-title { font-size: 2rem; margin-top: 5px; }
                    
                    /* Sticky Button Mobile */
                    .pd-sticky-visit { bottom: 24px; right: 24px; left: 24px; padding: 5px 5px 5px 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.3); }
                    .pd-sticky-icon { width: 38px; height: 38px; }

                    .pd-next-title { font-size: 2.8rem; }
                    .pd-next-circle { width: 64px; height: 64px; margin-top: 30px; }
                }

                @media (max-width: 480px) {
                    .pd-hero-title { font-size: 3rem; }
                    .pd-chapter-heading { font-size: 2rem; }
                    .pd-next-title { font-size: 2.2rem; }
                }
            `}</style>
        </div>
    )
}

export default ProjectDetailContent
