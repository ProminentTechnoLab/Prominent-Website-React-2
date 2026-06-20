'use client'

import React, { useEffect, useRef, useState } from 'react'
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
    const [focusedIdx, setFocusedIdx] = useState(0)
    
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

                // Accordion Gallery Reveal
                gsap.fromTo('.pd-accordion-gallery',
                    { y: 60, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 1.2,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: '.pd-gallery',
                            start: 'top 85%'
                        }
                    }
                )

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
            <section className="pd-chapter pd-hero" data-bg={project.color} data-text="#ffffff" style={{ '--project-color': project.color }}>
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
                                    <span className="pd-meta-value">{project.year}</span>
                                </div>
                                {project.link && project.link !== '#' && (
                                    <div className="pd-hero-meta-item">
                                        <span className="pd-meta-label">Live Project</span>
                                        <a 
                                            href={project.link} 
                                            target="_blank" 
                                            rel="noopener noreferrer" 
                                            className="pd-meta-link"
                                            style={{ '--hover-bg': '#ffffff', '--hover-text': project.color }}
                                        >
                                            Visit Live
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg>
                                        </a>
                                    </div>
                                )}
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

            {/* ─── 04 ACCORDION SHOWCASE ─── */}
            <section className="pd-chapter pd-gallery" data-bg="#ffffff" data-text="#000000">
                <div className="pd-inner">
                    <div className="pd-accordion-gallery">
                        {project.images?.slice(0, 3).map((img, idx) => (
                            <div 
                                key={idx} 
                                className={`pd-accordion-item ${focusedIdx === idx ? 'active' : ''}`}
                                onMouseEnter={() => setFocusedIdx(idx)}
                            >
                                <Image src={img} alt={`Showcase ${idx + 1}`} fill style={{ objectFit: 'cover' }} className="pd-accordion-img" />
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
                                <svg className="arrow-out" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                                <svg className="arrow-in" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
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
                .pd-chapter { position: relative; width: 100%; }

                /* ─── Hero ─── */
                .pd-hero { display: flex; align-items: center; padding: 200px 0 120px; }
                .pd-hero-grid { display: grid; grid-template-columns: 350px 1fr; gap: 80px; align-items: flex-start; }
                .pd-hero-meta { display: flex; flex-direction: column; gap: 40px; }
                .pd-meta-label { display: block; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.15em; font-weight: 700; opacity: 0.5; margin-bottom: 12px; }
                .pd-meta-value, .pd-meta-list span { font-size: 1.1rem; font-weight: 500; }
                .pd-meta-list { display: flex; flex-direction: column; gap: 6px; }
                .pd-meta-link { display: inline-flex; align-items: center; gap: 8px; font-size: 0.85rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; padding: 10px 20px; border-radius: 100px; border: 1px solid currentColor; color: inherit; text-decoration: none; transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1); margin-top: 5px; opacity: 0.8; }
                .pd-meta-link:hover { background: var(--hover-bg, #ffffff); color: var(--hover-text, #000) !important; opacity: 1; transform: translateY(-2px); }
                .pd-meta-link svg { width: 14px; height: 14px; }
                .pd-hero-title { font-size: clamp(3.5rem, 7vw, 8rem); font-weight: 300; line-height: 1; letter-spacing: -0.03em; margin-bottom: 30px; text-transform: uppercase; word-break: break-word; }
                .pd-hero-desc { font-size: clamp(1.2rem, 1.8vw, 2rem); line-height: 1.4; font-weight: 400; max-width: 800px; opacity: 0.9; }

                /* ─── Media Full (Aspect Ratio Fix) ─── */
                .pd-media-full { padding: 0; height: auto; aspect-ratio: 21/9; width: 100%; overflow: hidden; }
                .pd-full-img-wrap { 
                    position: relative; 
                    width: 100%; 
                    height: 100%; 
                    overflow: hidden; 
                    border-top: 1px solid rgba(128,128,128,0.2); 
                    border-bottom: 1px solid rgba(128,128,128,0.2); 
                }
                .pd-full-img { position: absolute; width: 100%; height: 120%; top: -10%; left: 0; }

                /* ─── Strategy ─── */
                .pd-strategy { padding: 140px 0 70px; }
                .pd-content-split { display: grid; grid-template-columns: 350px 1fr; gap: 80px; }
                .pd-chapter-num { font-size: 0.8rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.2em; opacity: 0.3; padding-top: 10px; }
                .pd-chapter-heading { font-size: clamp(2.5rem, 5vw, 5rem); font-weight: 400; line-height: 1.1; letter-spacing: -0.04em; margin-bottom: 50px; }
                .pd-chapter-para { font-size: clamp(1.1rem, 1.8vw, 1.8rem); line-height: 1.5; opacity: 0.8; max-width: 900px; }

                /* ─── Premium Accordion Gallery ─── */
                .pd-gallery { padding: 70px 0 140px; }
                .pd-accordion-gallery { 
                    display: flex; 
                    gap: 24px; 
                    height: 400px; 
                    width: 100%; 
                    align-items: flex-start;
                }

                .pd-accordion-item { 
                    position: relative; 
                    border-radius: 12px; 
                    overflow: hidden; 
                    background: #f5f5f5; 
                    transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1); 
                    cursor: pointer; 
                }

                .pd-accordion-img {
                    transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
                }

                /* Default State (Inactive) */
                .pd-accordion-item { 
                    flex: 1; 
                    height: 55%; 
                }
                .pd-accordion-item .pd-accordion-img { transform: scale(1.15); filter: brightness(0.7); }
                
                /* Active State (Controlled by React) */
                .pd-accordion-item.active { 
                    flex: 2; 
                    height: 100%; 
                }
                .pd-accordion-item.active .pd-accordion-img { transform: scale(1); filter: brightness(1); }

                /* ─── Outcome Section (Refined) ─── */
                .pd-outcome { padding: 100px 0 140px; border-top: 1px solid rgba(0,0,0,0.05); }
                .pd-outcome-card { max-width: 1200px; }
                .pd-outcome-grid { display: grid; grid-template-columns: 350px 1fr; gap: 80px; }
                .pd-outcome-title { font-size: 2.8rem; font-weight: 500; margin-top: 15px; letter-spacing: -0.02em; }
                .pd-outcome-para { font-size: 1.5rem; line-height: 1.5; opacity: 0.7; }

                /* ─── Next Project ─── */
                .pd-next-chapter { padding: 0; height: 100vh; }
                .pd-next-link { display: flex; width: 100%; height: 100%; position: relative; text-decoration: none; overflow: hidden; align-items: center; justify-content: center; }
                .pd-next-bg { position: absolute; top: 0; left: 0; width: 100%; height: 100%; transition: transform 1.2s var(--ease-expo), filter 1.2s ease; filter: grayscale(100%); transform: scale(1.1); }
                .pd-next-link:hover .pd-next-bg { transform: scale(1); filter: grayscale(0%); }
                .pd-next-content { position: relative; z-index: 2; text-align: center; color: #fff; padding: 0 4vw; }
                .pd-next-label { display: block; font-size: 1rem; text-transform: uppercase; letter-spacing: 0.3em; margin-bottom: 24px; opacity: 0.7; }
                .pd-next-title { font-size: clamp(3rem, 8vw, 8.5rem); font-weight: 300; text-transform: uppercase; line-height: 1; letter-spacing: -0.03em; word-break: break-word; }
                
                .pd-next-circle { 
                    width: 90px; 
                    height: 90px; 
                    border: 1px solid rgba(255,255,255,0.3); 
                    border-radius: 50%; 
                    display: flex; 
                    align-items: center; 
                    justify-content: center; 
                    margin: 50px auto 0; 
                    transition: all 0.7s cubic-bezier(0.16, 1, 0.3, 1); 
                    position: relative;
                    overflow: hidden;
                    cursor: pointer;
                }
                
                /* Stage 1: Hover the footer area */
                .pd-next-link:hover .pd-next-circle { 
                    background: #ffffff; 
                    border-color: #ffffff; 
                    transform: scale(1.1); 
                }

                .pd-next-link:hover .pd-next-circle svg { 
                    color: #000000; 
                }

                .pd-next-circle svg { 
                    width: 30px; 
                    height: 30px; 
                    color: #ffffff; 
                    position: absolute;
                    transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease, color 0.4s ease;
                }

                .pd-next-circle .arrow-out {
                    transform: translate(0px, 0px);
                    opacity: 1;
                }

                .pd-next-circle .arrow-in {
                    transform: translate(-30px, 30px);
                    opacity: 0;
                }

                /* Stage 2: Hover specifically on the button */
                .pd-next-circle:hover {
                    transform: scale(1.25) !important;
                }

                .pd-next-circle:hover .arrow-out {
                    transform: translate(30px, -30px) !important;
                    opacity: 0 !important;
                }

                .pd-next-circle:hover .arrow-in {
                    transform: translate(0px, 0px) !important;
                    opacity: 1 !important;
                }

                @media (max-width: 1024px) {
                    .pd-hero-grid, .pd-content-split, .pd-outcome-grid { grid-template-columns: 1fr; gap: 40px; }
                    .pd-hero-title { font-size: clamp(3.5rem, 12vw, 8rem); }
                    .pd-hero-meta { flex-direction: row; flex-wrap: wrap; gap: 30px; }
                    .pd-hero-meta-item { flex: 1; min-width: 150px; }
                    .pd-media-full { aspect-ratio: 16/9; }

                    /* Disable Accordion on Touch Devices -> Stack 1-by-1 */
                    .pd-accordion-gallery { height: auto; display: grid; grid-template-columns: 1fr; gap: 30px; }
                    .pd-accordion-item, .pd-accordion-item.active { flex: none !important; height: 400px !important; width: 100%; }
                    .pd-accordion-item .pd-accordion-img, .pd-accordion-item.active .pd-accordion-img { filter: brightness(1) !important; transform: scale(1) !important; }
                }

                @media (max-width: 768px) {
                    .pd-hero { padding: 140px 0 80px; }
                    .pd-strategy { padding: 80px 0 40px; }
                    .pd-gallery { padding: 40px 0 80px; }
                    .pd-outcome { padding: 60px 0 80px; }
                    .pd-hero-meta { gap: 24px; }
                    .pd-meta-label { margin-bottom: 8px; }
                    .pd-hero-desc { font-size: 1.2rem; line-height: 1.4; }
                    .pd-chapter-heading { font-size: 2.4rem; margin-bottom: 24px; }
                    .pd-chapter-para, .pd-outcome-para { font-size: 1.2rem; line-height: 1.5; }
                    
                    /* Accordion Gallery Mobile Adjustments */
                    .pd-accordion-gallery { gap: 20px; }
                    .pd-accordion-item, .pd-accordion-item.active { height: 300px !important; border-radius: 8px; }
                    
                    /* Media Fix */
                    .pd-media-full { aspect-ratio: 4/3; height: 350px; }
                    .pd-full-img-wrap { height: 100%; border-top: 1px solid rgba(128,128,128,0.2); border-bottom: 1px solid rgba(128,128,128,0.2); }
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
