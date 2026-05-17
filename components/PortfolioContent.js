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

const PortfolioContent = () => {
    const containerRef = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.pc-hero-title span', {
                y: 100,
                opacity: 0,
                duration: 1,
                stagger: 0.1,
                ease: 'power4.out',
                delay: 0.2
            })

            gsap.utils.toArray('.pc-project-row').forEach(row => {
                gsap.from(row, {
                    y: 60,
                    opacity: 0,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: row,
                        start: 'top 85%',
                    }
                })
            })
        }, containerRef)

        return () => ctx.revert()
    }, [])

    const handleNav = (path) => {
        window.dispatchEvent(new CustomEvent('trigger-nav-transition', { 
            detail: { href: path, isSamePage: false } 
        }))
    }

    return (
        <div className="pc-container" ref={containerRef}>
            {/* Hero Section */}
            <section className="pc-hero">
                <div className="pc-inner">
                    <h1 className="pc-hero-title">
                        <span className="d-block">Defining brands through</span>
                        <span className="d-block">digital excellence</span>
                    </h1>
                </div>
            </section>

            {/* Projects Listing */}
            <section className="pc-projects">
                <div className="pc-inner">
                    <div className="pc-grid">
                        {(projects.length >= 4 ? [projects[1], projects[0], projects[3], projects[2]] : projects).map((project, i) => (
                            <div 
                                key={project.slug} 
                                className="pc-project-row"
                            >
                                <div className="pc-project-media">
                                    <Image 
                                        src={project.image} 
                                        alt={project.title} 
                                        fill 
                                        style={{ objectFit: 'cover' }}
                                        className="pc-project-img"
                                    />
                                </div>
                                <div className="pc-project-info">
                                    <div className="pc-project-header">
                                        <span className="pc-project-category">{project.category}</span>
                                        <h2 className="pc-project-title">{project.title}</h2>
                                    </div>
                                    <p className="pc-project-desc">{project.description}</p>

                                    <div className="pc-project-footer">
                                        <Link 
                                            href={`/portfolio/${project.slug}/`} 
                                            className="pc-explore-link"
                                            onClick={(e) => { e.preventDefault(); handleNav(`/portfolio/${project.slug}/`); }}
                                        >
                                            <span className="pc-link-text">View Case Study</span>
                                            <span className="pc-link-arrow">&rarr;</span>
                                        </Link>
                                        <a 
                                            href={project.link} 
                                            target="_blank" 
                                            rel="noopener noreferrer" 
                                            className="pc-external-link"
                                        >
                                            <span className="pc-link-text">Live Project</span>
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <style>{`
                .pc-container {
                    background-color: #ffffff;
                    padding-top: 140px;
                }

                .pc-inner {
                    max-width: 1400px;
                    margin: 0 auto;
                    padding: 0 100px;
                }

                .pc-hero {
                    padding-bottom: 100px;
                }

                .pc-hero-title {
                    font-size: clamp(2.5rem, 7vw, 5.5rem);
                    font-weight: 500;
                    line-height: 1.15;
                    letter-spacing: -0.04em;
                    margin-bottom: 40px;
                }

                .d-block { 
                    display: block; 
                    overflow: hidden; 
                    padding-bottom: 0.15em;
                    margin-bottom: -0.15em;
                }

                .pc-projects {
                    padding-bottom: 140px;
                }

                .pc-grid {
                    display: flex;
                    flex-direction: column;
                    gap: 80px;
                }

                .pc-project-row {
                    display: grid;
                    grid-template-columns: 1.2fr 1fr;
                    gap: 80px;
                    align-items: center;
                    position: relative;
                }

                .pc-project-media {
                    position: relative;
                    width: 100%;
                    aspect-ratio: 16/9;
                    border-radius: 12px;
                    overflow: hidden;
                    background: #f5f5f5;
                    order: 0;
                }

                .pc-project-row:nth-child(even) {
                    grid-template-columns: 1fr 1.2fr;
                }

                .pc-project-row:nth-child(even) .pc-project-media {
                    order: 2;
                }

                .pc-project-img {
                    transition: transform 1s var(--ease-expo);
                }

                .pc-project-row:hover .pc-project-img {
                    transform: scale(1.05);
                }

                .pc-project-info {
                    display: flex;
                    flex-direction: column;
                    gap: 24px;
                }

                .pc-project-category {
                    font-size: 0.75rem;
                    font-weight: 600;
                    letter-spacing: 0.1em;
                    text-transform: uppercase;
                    opacity: 0.4;
                    margin-bottom: 12px;
                    display: block;
                }

                .pc-project-title {
                    font-size: clamp(2rem, 4vw, 3.5rem);
                    font-weight: 500;
                    letter-spacing: -0.03em;
                    margin: 0;
                }

                .pc-project-desc {
                    font-size: 1.2rem;
                    line-height: 1.6;
                    opacity: 0.7;
                    max-width: 500px;
                    margin-bottom: 8px;
                }

                /* ─── Premium Link Hover ─── */
                .pc-project-footer {
                    display: flex;
                    gap: 32px;
                    align-items: center;
                }

                .pc-explore-link {
                    display: inline-flex;
                    align-items: center;
                    gap: 12px;
                    font-size: 1.1rem;
                    font-weight: 500;
                    color: #000;
                    text-decoration: none;
                    position: relative;
                    padding-bottom: 6px;
                    width: fit-content;
                }

                .pc-explore-link::after {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    height: 1.5px;
                    background: #000;
                    transform: scaleX(0);
                    transform-origin: right;
                    transition: transform 0.6s var(--ease-expo);
                }

                .pc-explore-link:hover::after {
                    transform: scaleX(1);
                    transform-origin: left;
                }

                .pc-link-arrow {
                    font-size: 1.2rem;
                    transition: transform 0.4s var(--ease-expo);
                }

                .pc-explore-link:hover .pc-link-arrow {
                    transform: translateX(8px);
                }

                /* Premium Pill Button for Live Project */
                .pc-external-link {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    font-size: 0.85rem;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                    padding: 10px 20px;
                    border-radius: 100px;
                    border: 1px solid rgba(0,0,0,0.15);
                    color: #000;
                    text-decoration: none;
                    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                }

                .pc-external-link:hover {
                    background: #000;
                    color: #fff;
                    border-color: #000;
                    transform: translateY(-2px);
                }

                .pc-external-link svg {
                    width: 14px;
                    height: 14px;
                }

                @media (max-width: 1024px) {
                    .pc-inner { padding: 0 40px; }
                    .pc-project-row { gap: 40px; }
                }

                @media (max-width: 768px) {
                    .pc-container { padding-top: 100px; }
                    .pc-inner { padding: 0 24px; }
                    .pc-hero-title { font-size: 3.2rem; }
                    .pc-grid { gap: 60px; }
                    .pc-project-row, .pc-project-row:nth-child(even) {
                        grid-template-columns: 1fr;
                        gap: 32px;
                    }
                    .pc-project-row:nth-child(even) .pc-project-media {
                        order: 0;
                    }
                    .pc-project-media { border-radius: 8px; }
                    .pc-project-title { font-size: 2.2rem; }
                    .pc-project-desc { font-size: 1.1rem; }
                }
            `}</style>
        </div>
    )
}

export default PortfolioContent
