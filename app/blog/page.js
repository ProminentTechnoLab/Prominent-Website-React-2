'use client'

import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'

const BlogPage = () => {
    const gridRef = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.bp-card', 
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, ease: 'power3.out', stagger: 0.15, delay: 0.2 }
            )
        }, gridRef)
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
        <main className="bp-main">
            <div className="bp-container">
                <header className="bp-header">
                    <h1 className="bp-title">Blog</h1>
                    <p className="bp-intro">
                        Deep dives into digital transformation, modern design, and engineering excellence by Prominent TechnoLabs.
                    </p>
                </header>

                <div className="bp-grid" ref={gridRef}>
                    {blogs.map((blog, i) => (
                        <div key={i} className="bp-card">
                            <div className="bp-card-img-wrap">
                                <Image 
                                    src={blog.image} 
                                    alt={blog.title} 
                                    fill 
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                            <div className="bp-card-content">
                                <span className="bp-card-category">{blog.category}</span>
                                <h2 className="bp-card-title">{blog.title}</h2>
                                <div className="bp-card-date">{blog.date}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
                .bp-main {
                    background-color: #ffffff;
                    color: #000000;
                    padding-top: 160px;
                    padding-bottom: 120px;
                    min-height: 100vh;
                }

                .bp-container {
                    max-width: 1400px;
                    margin: 0 auto;
                    padding: 0 100px;
                }

                .bp-header {
                    margin-bottom: 100px;
                    max-width: 100%;
                    text-align: center;
                }
                .bp-title {
                    font-size: clamp(2.5rem, 6vw, 5.2rem);
                    font-weight: 500;
                    letter-spacing: -0.035em;
                    line-height: 1.05;
                    color: #000;
                    margin-bottom: 30px;
                }
                .bp-intro {
                    font-size: 1.25rem;
                    line-height: 1.6;
                    opacity: 0.6;
                    max-width: 600px;
                    margin: 0 auto;
                }

                .bp-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 80px 60px;
                }

                .bp-card {
                    display: flex;
                    flex-direction: column;
                    cursor: pointer;
                }

                .bp-card-img-wrap {
                    position: relative;
                    width: 100%;
                    aspect-ratio: 16/10;
                    border-radius: 24px;
                    overflow: hidden;
                    background: #f5f5f5;
                    margin-bottom: 32px;
                    transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
                }
                .bp-card:hover .bp-card-img-wrap {
                    transform: scale(1.02);
                }

                .bp-card-category {
                    display: inline-block;
                    font-size: 0.7rem;
                    font-weight: 600;
                    letter-spacing: 0.08em;
                    border: 1px solid rgba(0,0,0,0.1);
                    padding: 6px 14px;
                    border-radius: 100px;
                    margin-bottom: 20px;
                    width: fit-content;
                }

                .bp-card-title {
                    font-size: clamp(1.8rem, 2.8vw, 2.4rem);
                    font-weight: 500;
                    letter-spacing: -1px;
                    line-height: 1.2;
                    margin-bottom: 16px;
                    transition: opacity 0.3s ease;
                }
                .bp-card:hover .bp-card-title {
                    opacity: 0.6;
                }

                .bp-card-date {
                    font-size: 0.95rem;
                    opacity: 0.4;
                }

                @media (max-width: 1024px) {
                    .bp-container { padding: 0 40px; }
                    .bp-grid { gap: 60px 40px; }
                    .bp-header { margin-bottom: 80px; }
                }

                @media (max-width: 768px) {
                    .bp-main { padding-top: 120px; }
                    .bp-container { padding: 0 24px; }
                    .bp-grid { grid-template-columns: 1fr; gap: 50px; }
                    .bp-title { font-size: clamp(2.5rem, 8vw, 4rem); letter-spacing: -0.03em; }
                    .bp-header { margin-bottom: 60px; }
                    .bp-card-img-wrap { border-radius: 16px; margin-bottom: 24px; }
                }
            `}</style>
        </main>
    )
}

export default BlogPage
