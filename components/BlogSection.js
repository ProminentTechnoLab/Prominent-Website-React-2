'use client'

import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

import { blogs } from '../app/blog/data'

const BlogSection = () => {
    const sectionRef = useRef(null)
    const rowRefs = useRef([])

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger)
        
        const ctx = gsap.context(() => {
            // Rows animation
            rowRefs.current.forEach((row, i) => {
                if (!row) return
                gsap.fromTo(row,
                    { y: 60, opacity: 0 },
                    { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out',
                      scrollTrigger: { trigger: row, start: 'top 92%' },
                      delay: i * 0.1
                    }
                )
            })
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section className="bs-section" ref={sectionRef}>
            <div className="bs-inner">
                <div className="bs-header bs-header-top">
                    <h2 className="bs-title">Blog</h2>
                </div>

                <div className="bs-list">
                    {blogs.map((blog, i) => (
                        <Link 
                            key={blog.slug} 
                            href={`/blog/${blog.slug}`}
                            ref={el => rowRefs.current[i] = el}
                            className="bs-row"
                        >
                            <div className="bs-row-img-wrap">
                                <div className="bs-row-img-inner">
                                    <Image 
                                        src={blog.image} 
                                        alt={blog.title} 
                                        fill 
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                            </div>
                            <div className="bs-row-content">
                                <span className="bs-row-category">{blog.category}</span>
                                <h3 className="bs-row-title">{blog.title}</h3>
                                <div className="bs-row-date">{blog.date}</div>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="bs-footer">
                    <Link href="/blog/" className="bs-explore-btn" onClick={(e) => { e.preventDefault(); handleNav('/blog/'); }}>
                        <span className="bs-btn-text-wrap">
                            <span className="bs-btn-text-old">Explore more</span>
                            <span className="bs-btn-text-new">Explore more</span>
                        </span>
                    </Link>
                </div>
            </div>

            <style>{`
                .bs-section {
                    background-color: #0d0d0d;
                    color: #ffffff;
                    padding: 120px 0;
                    position: relative;
                    z-index: 10;
                    /* Cuberto rounded top transition from white portfolio section */
                    border-top-left-radius: 80px;
                    border-top-right-radius: 80px;
                    margin-top: -80px;
                }

                .bs-inner {
                    max-width: 1400px;
                    margin: 0 auto;
                    padding: 0 15vw;
                }

                .bs-header {
                    margin-bottom: 80px;
                }
                .bs-title {
                    font-size: clamp(2.5rem, 6vw, 5.2rem);
                    font-weight: 500;
                    letter-spacing: -3px;
                    margin-bottom: 20px;
                    line-height: 1.1;
                    color: #ffffff;
                }

                .bs-list {
                    display: flex;
                    flex-direction: column;
                    gap: 30px;
                }

                .bs-row {
                    display: flex;
                    align-items: center;
                    gap: 60px;
                    padding-bottom: 40px;
                    transition: transform 0.4s ease;
                    opacity: 0;
                    will-change: transform, opacity;
                    text-decoration: none;
                    color: inherit;
                }

                .bs-row-img-wrap {
                    flex: 0 0 420px;
                }
                .bs-row-img-inner {
                    position: relative;
                    width: 100%;
                    aspect-ratio: 16/10;
                    border-radius: 20px;
                    overflow: hidden;
                    background: #1a1a1a;
                    transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
                }
                .bs-row:hover .bs-row-img-inner {
                    transform: scale(1.03);
                }

                .bs-row-content {
                    flex: 1;
                }

                .bs-row-category {
                    display: inline-block;
                    font-size: 0.75rem;
                    font-weight: 600;
                    letter-spacing: 0.05em;
                    border: 1px solid rgba(255,255,255,0.3);
                    padding: 6px 14px;
                    border-radius: 100px;
                    margin-bottom: 24px;
                    color: #ffffff;
                }

                .bs-row-title {
                    font-size: clamp(1.8rem, 2.8vw, 2.6rem);
                    font-weight: 500;
                    letter-spacing: -1px;
                    line-height: 1.15;
                    margin-bottom: 12px;
                    max-width: 800px;
                    color: #ffffff;
                }

                .bs-row-date {
                    font-size: 0.95rem;
                    opacity: 0.5;
                    font-weight: 400;
                    color: #ffffff;
                }

                /* --- Liquid Button Animation --- */
                .bs-footer {
                    margin-top: 80px;
                    display: flex;
                    justify-content: center;
                }

                .bs-explore-btn {
                    position: relative;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    padding: 24px 50px;
                    border: 1.5px solid #ffffff !important;
                    border-radius: 100px;
                    text-decoration: none;
                    color: #ffffff !important;
                    font-size: 1.1rem;
                    font-weight: 500;
                    font-family: inherit;
                    overflow: hidden;
                    transition: color 0.4s ease, border-color 0.4s ease;
                }

                .bs-explore-btn::before {
                    content: '';
                    position: absolute;
                    top: 100%;
                    left: -50%;
                    width: 200%;
                    height: 300%;
                    background: #ffffff;
                    border-radius: 50%;
                    transform: translateY(0);
                    transition: transform 1.2s cubic-bezier(0.19, 1, 0.22, 1);
                    z-index: 0;
                }

                .bs-explore-btn:hover::before {
                    transform: translateY(-60%);
                }

                .bs-btn-text-wrap {
                    position: relative;
                    z-index: 2;
                    display: flex;
                    flex-direction: column;
                    overflow: hidden;
                    height: 1.6em;
                    line-height: 1.6;
                    padding-bottom: 2px;
                }
                .bs-btn-text-old {
                    transition: transform 0.6s cubic-bezier(0.19, 1, 0.22, 1);
                    color: #ffffff !important;
                }
                .bs-btn-text-new {
                    position: absolute;
                    top: 100%;
                    left: 0;
                    width: 100%;
                    text-align: center;
                    color: #000000 !important;
                    transition: transform 0.6s cubic-bezier(0.19, 1, 0.22, 1);
                }

                .bs-explore-btn:hover .bs-btn-text-old {
                    transform: translateY(-100%);
                }
                .bs-explore-btn:hover .bs-btn-text-new {
                    transform: translateY(-100%);
                }

                /* --- Responsive --- */
                @media (max-width: 1024px) {
                    .bs-inner { padding: 0 40px; }
                    .bs-section { 
                        border-top-left-radius: 60px !important; 
                        border-top-right-radius: 60px !important; 
                        margin-top: -60px !important; 
                    }
                    .bs-row { gap: 40px; }
                    .bs-row-img-wrap { flex: 0 0 260px; }
                }

                @media (max-width: 768px) {
                    .bs-section { 
                        padding: 80px 0; 
                        border-top-left-radius: 0 !important; 
                        border-top-right-radius: 0 !important; 
                        margin-top: 0 !important; 
                    }
                    .bs-inner { padding: 0 24px; }
                    .bs-title { font-size: 3.5rem; letter-spacing: -1.5px; }
                    .bs-row { flex-direction: column; align-items: flex-start; gap: 30px; }
                    .bs-row-img-wrap { width: 100%; flex: none; }
                    .bs-row-img-inner { aspect-ratio: 16/9; }
                    .bs-row-title { font-size: 1.8rem; }
                    .bs-explore-btn { width: 100%; }
                }
            `}</style>
        </section>
    )
}

export default BlogSection
