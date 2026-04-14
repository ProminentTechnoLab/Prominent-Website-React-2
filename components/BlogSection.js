'use client'

import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

const BlogSection = () => {
    const sectionRef = useRef(null)
    const rowRefs = useRef([])

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger)
        
        const ctx = gsap.context(() => {
            // Header animation
            gsap.fromTo('.bs-header-top', 
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, ease: 'power3.out',
                  scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' }
                }
            )

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

    const blogs = [
        {
            category: 'MARKETING',
            title: 'How Digital Marketing is Evolving in 2024',
            date: 'April 14, 2024',
            image: '/images/blog_marketing.png'
        },
        {
            category: 'DESIGN',
            title: 'The Future of UI/UX: Design Systems & AI',
            date: 'April 12, 2024',
            image: '/images/blog_design.png'
        },
        {
            category: 'DEVELOPMENT',
            title: 'Mastering Next.js 14 for Enterprise Web Apps',
            date: 'April 10, 2024',
            image: '/images/blog_development.png'
        }
    ]

    return (
        <section className="bs-section" ref={sectionRef}>
            <div className="bs-inner">
                <div className="bs-header bs-header-top">
                    <h2 className="bs-title">Blog</h2>
                </div>

                <div className="bs-list">
                    {blogs.map((blog, i) => (
                        <div 
                            key={i} 
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
                        </div>
                    ))}
                </div>

                <div className="bs-footer">
                    <Link href="/blog/" className="bs-explore-btn">
                        <span className="btn-text-wrap">
                            <span className="btn-text-old">Visit our blog</span>
                            <span className="btn-text-new">Visit our blog</span>
                        </span>
                    </Link>
                </div>
            </div>

            <style>{`
                .bs-section {
                    background-color: #ffffff;
                    color: #000000;
                    padding: 120px 0;
                    position: relative;
                    z-index: 10;
                    /* Cuberto rounded top transition from black services section */
                    border-top-left-radius: 80px;
                    border-top-right-radius: 80px;
                    margin-top: -80px;
                }

                .bs-inner {
                    max-width: 1400px;
                    margin: 0 auto;
                    padding: 0 15vw; /* Increased horizontal padding for a more centered look */
                }

                .bs-header {
                    margin-bottom: 80px;
                }
                .bs-title {
                    font-size: clamp(2.5rem, 6vw, 5.2rem);
                    font-weight: 500;
                    letter-spacing: -3px;
                    margin-bottom: 20px;
                    line-height: 0.95;
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
                    padding-bottom: 40px; /* Reduced gap between blogs */
                    transition: transform 0.4s ease;
                }

                .bs-row-img-wrap {
                    flex: 0 0 420px; /* Increased from 320px for a more prominent visual impact */
                }
                .bs-row-img-inner {
                    position: relative;
                    width: 100%;
                    aspect-ratio: 16/10;
                    border-radius: 20px;
                    overflow: hidden;
                    background: #f5f5f5;
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
                    border: 1px solid rgba(0,0,0,0.15);
                    padding: 6px 14px;
                    border-radius: 100px;
                    margin-bottom: 24px;
                }

                .bs-row-title {
                    font-size: clamp(1.8rem, 2.8vw, 2.6rem);
                    font-weight: 500;
                    letter-spacing: -1px;
                    line-height: 1.15;
                    margin-bottom: 12px;
                    max-width: 800px;
                }

                .bs-row-date {
                    font-size: 0.95rem;
                    opacity: 0.4;
                    font-weight: 400;
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
                    border: 1.5px solid #000;
                    border-radius: 100px;
                    text-decoration: none;
                    color: #000;
                    font-size: 1.1rem;
                    font-weight: 500;
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
                    background: #000;
                    border-radius: 50%;
                    transform: translateY(0);
                    transition: transform 1.2s cubic-bezier(0.19, 1, 0.22, 1);
                    z-index: 0;
                }

                .bs-explore-btn:hover::before {
                    transform: translateY(-60%);
                }

                .btn-text-wrap {
                    position: relative;
                    z-index: 2;
                    display: flex;
                    flex-direction: column;
                    overflow: hidden;
                    height: 1.4em; /* Increased to prevent clipping 'g' and other descenders */
                    line-height: 1.4;
                    padding-bottom: 2px;
                }
                .btn-text-old {
                    transition: transform 0.6s cubic-bezier(0.19, 1, 0.22, 1);
                }
                .btn-text-new {
                    position: absolute;
                    top: 100%;
                    left: 0;
                    width: 100%;
                    color: #fff;
                    transition: transform 0.6s cubic-bezier(0.19, 1, 0.22, 1);
                }

                .bs-explore-btn:hover .btn-text-old {
                    transform: translateY(-100%);
                }
                .bs-explore-btn:hover .btn-text-new {
                    transform: translateY(-100%);
                }

                /* --- Responsive --- */
                @media (max-width: 1024px) {
                    .bs-inner { padding: 0 40px; }
                    .bs-section { border-top-left-radius: 40px; border-top-right-radius: 40px; margin-top: -40px; }
                    .bs-row { gap: 40px; }
                    .bs-row-img-wrap { flex: 0 0 260px; }
                }

                @media (max-width: 768px) {
                    .bs-section { padding: 80px 0; border-radius: 0; margin-top: 0; }
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
