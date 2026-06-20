'use client'

import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { projects } from '../app/portfolio/data'

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger)
}

const PortfolioSection = () => {
    const sectionRef = useRef(null)
    const cardRefs = useRef([])

    useEffect(() => {
        const ctx = gsap.context(() => {
            cardRefs.current.forEach((card, i) => {
                if (!card) return
                gsap.fromTo(card,
                    { y: 100, opacity: 0 },
                    { 
                        y: 0, 
                        opacity: 1, 
                        duration: 1.2, 
                        ease: 'power4.out',
                        scrollTrigger: {
                            trigger: card,
                            start: 'top 90%',
                            toggleActions: 'play none none none'
                        }
                    }
                )
            })
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    const handleNav = (path) => {
        window.dispatchEvent(new CustomEvent('trigger-nav-transition', { 
            detail: { href: path, isSamePage: false } 
        }))
    }

    // Explicit colors mapped for RGB values for the beautiful hover glowing backdrops
    const brandColors = {
        'biobonz': { hex: '#2D5A27', rgb: '45, 90, 39' },
        'propleadz': { hex: '#1A73E8', rgb: '26, 115, 232' },
        'bb-signs': { hex: '#E62E2D', rgb: '230, 46, 45' },
        'yoyo-fashion': { hex: '#FF4081', rgb: '255, 64, 129' },
        'antyodaya-news': { hex: '#D32F2F', rgb: '211, 47, 47' }
    }

    // Slicing to the first 4 projects
    const homeProjects = projects.slice(0, 4)

    return (
        <section className="ps-section" ref={sectionRef}>
            <div className="ps-inner">
                <div className="ps-header">
                    <h2 className="ps-title">Selected projects</h2>
                    <p className="ps-subtitle">We build premium digital experiences that define brands and drive growth.</p>
                </div>

                <div className="ps-grid">
                    {homeProjects.map((project, i) => {
                        const colors = brandColors[project.slug] || { hex: '#000000', rgb: '0,0,0' }
                        return (
                            <div 
                                key={project.slug} 
                                className={`ps-card ps-card-${i}`}
                                ref={el => cardRefs.current[i] = el}
                                style={{ 
                                    '--project-color': colors.hex,
                                    '--project-color-rgb': colors.rgb
                                }}
                            >
                                <div className="ps-card-media-wrapper">
                                    <div className="ps-card-media">
                                        <Image 
                                            src={project.image} 
                                            alt={project.title} 
                                            fill 
                                            style={{ objectFit: 'cover' }}
                                            className="ps-image"
                                            priority={i < 2} // Preload the first row to prevent blank flashes!
                                        />
                                    </div>
                                    <div className="ps-card-glow" />
                                </div>
                                <div className="ps-card-info">
                                    <div className="ps-card-meta">
                                        <span className="ps-category">{project.category}</span>
                                        <span className="ps-year">{project.year}</span>
                                    </div>
                                    <h3 className="ps-card-title">{project.title}</h3>

                                    <div className="ps-card-footer">
                                        <Link 
                                            href={`/portfolio/${project.slug}/`} 
                                            className="ps-explore-link"
                                            onClick={(e) => { e.preventDefault(); handleNav(`/portfolio/${project.slug}/`); }}
                                        >
                                            View Case Study <span className="ps-link-arrow">&rarr;</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>

                <div className="ps-footer">
                    <Link href="/portfolio/" className="ps-all-btn" onClick={(e) => { e.preventDefault(); handleNav('/portfolio/'); }}>
                        <span className="ps-btn-text-wrap">
                            <span className="ps-btn-text-old">View all projects</span>
                            <span className="ps-btn-text-new">View all projects</span>
                        </span>
                    </Link>
                </div>
            </div>

            <style>{`
                .ps-section {
                    background-color: #ffffff;
                    color: #000000;
                    padding: 120px 0 260px; /* Increased bottom padding to accommodate the staggered cards visual overflow */
                    position: relative;
                    z-index: 10;
                    border-top-left-radius: 80px;
                    border-top-right-radius: 80px;
                    margin-top: -80px;
                }

                .ps-inner {
                    max-width: 1400px;
                    margin: 0 auto;
                    padding: 0 100px;
                }

                .ps-header {
                    margin-bottom: 80px;
                    max-width: 800px;
                }

                .ps-title {
                    font-size: clamp(2.5rem, 6vw, 5.2rem);
                    font-weight: 500;
                    letter-spacing: -0.04em;
                    line-height: 1.15;
                    margin-bottom: 24px;
                    color: #000000;
                }

                .ps-subtitle {
                    font-size: clamp(1.1rem, 1.4vw, 1.25rem);
                    opacity: 0.6;
                    line-height: 1.5;
                    color: #000000;
                    font-weight: 400;
                }

                /* ─── Premium Staggered Zig Zag Grid ─── */
                .ps-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 120px 60px; /* 120px gap vertically between rows, 60px horizontally */
                    align-items: start;
                }

                .ps-card {
                    display: flex;
                    flex-direction: column;
                    gap: 24px;
                    position: relative;
                    transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
                }

                /* Explicit columns: first right, second left, third right, fourth left */
                .ps-card-0 {
                    grid-column: 2; /* Right Column */
                    grid-row: 1;
                }

                .ps-card-1 {
                    grid-column: 1; /* Left Column */
                    grid-row: 1;
                    transform: translateY(160px); /* Shift left column down */
                }

                .ps-card-2 {
                    grid-column: 2; /* Right Column */
                    grid-row: 2;
                }

                .ps-card-3 {
                    grid-column: 1; /* Left Column */
                    grid-row: 2;
                    transform: translateY(160px); /* Shift left column down */
                }

                /* ─── Card Visual Media ─── */
                .ps-card-media-wrapper {
                    position: relative;
                    width: 100%;
                    border-radius: 12px;
                }

                .ps-card-media {
                    position: relative;
                    width: 100%;
                    aspect-ratio: 16/9;
                    border-radius: 12px;
                    overflow: hidden;
                    background: #f7f7f7;
                    z-index: 2;
                    box-shadow: 0 12px 36px rgba(0, 0, 0, 0.04);
                    transition: box-shadow 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
                }

                .ps-image {
                    transition: transform 1.2s cubic-bezier(0.16, 1, 0.3, 1);
                }

                /* ─── External Live Link ─── */
                .ps-live-link {
                    position: absolute;
                    top: 24px;
                    right: 24px;
                    width: 54px;
                    height: 54px;
                    background: #ffffff;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #000000;
                    z-index: 5;
                    opacity: 0;
                    transform: scale(0.8) translate(-10px, 10px);
                    transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
                    box-shadow: 0 10px 30px rgba(0,0,0,0.15);
                }

                .ps-live-link svg {
                    width: 22px;
                    height: 22px;
                    transition: transform 0.4s ease;
                }

                .ps-card:hover .ps-live-link {
                    opacity: 1;
                    transform: scale(1) translate(0, 0);
                }

                .ps-live-link:hover {
                    background: var(--project-color, #000000);
                    color: #ffffff;
                    transform: scale(1.1) !important;
                }
                
                .ps-live-link:hover svg {
                    transform: translate(2px, -2px);
                }

                /* ─── Ambient Glow Effect on Hover ─── */
                .ps-card-glow {
                    position: absolute;
                    top: 10%;
                    left: 10%;
                    width: 80%;
                    height: 80%;
                    background: radial-gradient(circle, rgba(var(--project-color-rgb), 0.45) 0%, transparent 70%);
                    z-index: 1;
                    filter: blur(40px);
                    opacity: 0;
                    transform: scale(0.9);
                    transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
                }

                /* Hover States */
                .ps-card:hover .ps-card-media {
                    transform: translateY(-8px);
                    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.12), 0 0 40px rgba(var(--project-color-rgb), 0.1);
                }

                .ps-card:hover .ps-image {
                    transform: scale(1.06);
                }

                .ps-card:hover .ps-card-glow {
                    opacity: 1;
                    transform: scale(1.1);
                }

                /* ─── Card Info & Details ─── */
                .ps-card-info {
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                    padding: 0 8px;
                    transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
                }

                .ps-card:hover .ps-card-info {
                    transform: translateY(-4px);
                }

                .ps-card-meta {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    font-size: 0.75rem;
                    font-weight: 600;
                    letter-spacing: 0.08em;
                    text-transform: uppercase;
                    opacity: 0.4;
                }

                .ps-category {
                    color: var(--project-color, #000000);
                    opacity: 0.95;
                    font-weight: 700;
                }

                .ps-card-title {
                    font-size: clamp(1.6rem, 2.3vw, 2.2rem);
                    font-weight: 500;
                    letter-spacing: -0.02em;
                    color: #000000;
                    margin: 4px 0;
                    transition: color 0.4s ease;
                }

                .ps-card:hover .ps-card-title {
                    color: var(--project-color, #000000);
                }

                /* ─── Minimalist Technology Tags ─── */
                .ps-card-tags {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 8px;
                    margin: 4px 0 8px;
                }

                .ps-tag {
                    font-size: 0.72rem;
                    font-weight: 500;
                    padding: 4px 12px;
                    background: #f3f3f3;
                    border: 1px solid #e5e5e5;
                    border-radius: 100px;
                    color: #555555;
                    transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
                }

                .ps-card:hover .ps-tag {
                    background: rgba(var(--project-color-rgb), 0.08);
                    border-color: rgba(var(--project-color-rgb), 0.15);
                    color: var(--project-color);
                }

                /* ─── Premium Link Hover ─── */
                .ps-card-footer {
                    margin-top: 4px;
                }

                .ps-explore-link {
                    display: inline-flex;
                    align-items: center;
                    gap: 12px;
                    font-size: 1.05rem;
                    font-weight: 500;
                    color: #000;
                    text-decoration: none;
                    position: relative;
                    padding-bottom: 4px;
                    width: fit-content;
                }

                .ps-explore-link::after {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    height: 1.5px;
                    background: var(--project-color, #000000);
                    transform: scaleX(0);
                    transform-origin: right;
                    transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
                }

                .ps-explore-link:hover::after {
                    transform: scaleX(1);
                    transform-origin: left;
                }

                .ps-link-arrow {
                    font-size: 1.1rem;
                    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                }

                .ps-explore-link:hover .ps-link-arrow {
                    transform: translateX(6px);
                    color: var(--project-color, #000000);
                }

                /* ─── View All Button ─── */
                .ps-footer {
                    margin-top: 140px;
                    display: flex;
                    justify-content: center;
                }

                .ps-all-btn {
                    position: relative;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    padding: 24px 50px;
                    border: 1.5px solid #000000 !important;
                    border-radius: 100px;
                    text-decoration: none;
                    color: #000000 !important;
                    font-size: 1.1rem;
                    font-weight: 500;
                    font-family: inherit;
                    overflow: hidden;
                    transition: color 0.4s ease, border-color 0.4s ease;
                }

                .ps-all-btn::before {
                    content: '';
                    position: absolute;
                    top: 100%;
                    left: -50%;
                    width: 200%;
                    height: 300%;
                    background: #000000;
                    border-radius: 50%;
                    transform: translateY(0);
                    transition: transform 1.2s cubic-bezier(0.19, 1, 0.22, 1);
                    z-index: 0;
                }

                .ps-all-btn:hover::before {
                    transform: translateY(-60%);
                }

                .ps-btn-text-wrap {
                    position: relative;
                    z-index: 2;
                    display: flex;
                    flex-direction: column;
                    overflow: hidden;
                    height: 1.6em;
                    line-height: 1.6;
                }

                .ps-btn-text-old {
                    transition: transform 0.6s cubic-bezier(0.19, 1, 0.22, 1);
                    color: #000000 !important;
                }

                .ps-btn-text-new {
                    position: absolute;
                    top: 100%;
                    left: 0;
                    width: 100%;
                    color: #ffffff !important;
                    transition: transform 0.6s cubic-bezier(0.19, 1, 0.22, 1);
                }

                .ps-all-btn:hover .ps-btn-text-old {
                    transform: translateY(-100%);
                }

                .ps-all-btn:hover .ps-btn-text-new {
                    transform: translateY(-100%);
                }

                /* ─── Media Queries (Responsive Tuning) ─── */
                @media (max-width: 1024px) {
                    .ps-inner { padding: 0 40px; }
                    .ps-grid { gap: 80px 40px; }
                    .ps-section { 
                        border-top-left-radius: 60px; 
                        border-top-right-radius: 60px; 
                        margin-top: -60px;
                        padding-bottom: 200px;
                    }
                    .ps-card-1, .ps-card-3 {
                        transform: translateY(100px); /* Lower stagger for tablets */
                    }
                }

                @media (max-width: 768px) {
                    .ps-section { 
                        padding: 80px 0 100px; 
                        border-top-left-radius: 0; 
                        border-top-right-radius: 0; 
                        margin-top: 0;
                    }
                    .ps-inner { padding: 0 24px; }
                    .ps-grid { 
                        display: flex;
                        flex-direction: column;
                        gap: 60px; 
                        align-items: stretch;
                    }
                    .ps-card {
                        grid-column: auto !important;
                        grid-row: auto !important;
                        transform: none !important;
                        width: 100%;
                    }
                    .ps-card-media { 
                        border-radius: 12px; 
                        box-shadow: none;
                    }
                    .ps-card-media-wrapper { border-radius: 12px; }
                    .ps-card-glow { display: none; }
                    .ps-all-btn { width: 100%; }
                    .ps-footer { margin-top: 60px; }
                    .ps-card:hover .ps-card-info {
                        transform: none;
                    }
                    .ps-card:hover .ps-card-media {
                        transform: none;
                        box-shadow: none;
                    }
                }
            `}</style>
        </section>
    )
}

export default PortfolioSection
