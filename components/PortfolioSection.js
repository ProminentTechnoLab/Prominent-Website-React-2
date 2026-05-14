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

    return (
        <section className="ps-section" ref={sectionRef}>
            <div className="ps-inner">
                <div className="ps-header">
                    <h2 className="ps-title">Selected projects</h2>
                    <p className="ps-subtitle">We build premium digital experiences that define brands and drive growth.</p>
                </div>

                <div className="ps-grid">
                    {projects.slice(0, 4).map((project, i) => (
                        <div 
                            key={project.slug} 
                            className="ps-card"
                            ref={el => cardRefs.current[i] = el}
                        >
                            <div className="ps-card-media">
                                <Image 
                                    src={project.image} 
                                    alt={project.title} 
                                    fill 
                                    style={{ objectFit: 'cover' }}
                                    className="ps-image"
                                />
                            </div>
                            <div className="ps-card-info">
                                <div className="ps-card-meta">
                                    <span className="ps-category">{project.category}</span>
                                    <span className="ps-year">2024</span>
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
                    ))}
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
                    padding: 120px 0 140px;
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

                .ps-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 60px 40px;
                }

                .ps-card {
                    display: flex;
                    flex-direction: column;
                    gap: 24px;
                }

                .ps-card-media {
                    position: relative;
                    width: 100%;
                    aspect-ratio: 16/10;
                    border-radius: 24px;
                    overflow: hidden;
                    background: #f5f5f5;
                }

                .ps-image {
                    transition: transform 0.8s var(--ease-expo);
                }

                .ps-card:hover .ps-image {
                    transform: scale(1.05);
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
                    background: #000;
                    transform: scaleX(0);
                    transform-origin: right;
                    transition: transform 0.6s var(--ease-expo);
                }

                .ps-explore-link:hover::after {
                    transform: scaleX(1);
                    transform-origin: left;
                }

                .ps-link-arrow {
                    font-size: 1.1rem;
                    transition: transform 0.4s var(--ease-expo);
                }

                .ps-explore-link:hover .ps-link-arrow {
                    transform: translateX(6px);
                }

                .ps-card-info {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }

                .ps-card-meta {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    font-size: 0.75rem;
                    font-weight: 600;
                    letter-spacing: 0.05em;
                    text-transform: uppercase;
                    opacity: 0.4;
                }

                .ps-card-title {
                    font-size: clamp(1.5rem, 2.5vw, 2rem);
                    font-weight: 500;
                    letter-spacing: -0.02em;
                    color: #000000;
                }

                .ps-footer {
                    margin-top: 80px;
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

                @media (max-width: 1024px) {
                    .ps-inner { padding: 0 40px; }
                    .ps-grid { gap: 40px; }
                    .ps-section { 
                        border-top-left-radius: 60px; 
                        border-top-right-radius: 60px; 
                        margin-top: -60px;
                    }
                }

                @media (max-width: 768px) {
                    .ps-section { 
                        padding: 80px 0; 
                        border-top-left-radius: 0; 
                        border-top-right-radius: 0; 
                        margin-top: 0;
                    }
                    .ps-inner { padding: 0 24px; }
                    .ps-grid { grid-template-columns: 1fr; gap: 48px; }
                    .ps-card-media { border-radius: 16px; }
                    .ps-all-btn { width: 100%; }
                }
            `}</style>
        </section>
    )
}

export default PortfolioSection
