'use client'

import React, { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { gsap } from 'gsap'

const BlogPostClient = ({ blog, otherBlogs }) => {
    useEffect(() => {
        const runEntrance = () => {
            gsap.fromTo('.bp-hero-content',
                { y: 60, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.4, ease: 'power4.out', delay: 0.2 }
            )
            gsap.fromTo('.bp-article-body',
                { y: 40, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out', delay: 0.6 }
            )
            gsap.fromTo('.bp-more-card',
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, ease: 'power3.out', stagger: 0.12, delay: 0.8 }
            )
        }

        window.addEventListener('refresh-text-reveal', runEntrance)
        return () => window.removeEventListener('refresh-text-reveal', runEntrance)
    }, [])

    return (
        <main className="bp-post-main">

            {/* ─── Hero Section ─── */}
            <section className="bp-hero">
                <div className="bp-hero-bg">
                    <Image
                        src={blog.image}
                        alt={blog.title}
                        fill
                        style={{ objectFit: 'cover' }}
                        priority
                    />
                    <div className="bp-hero-overlay" />
                </div>
                <div className="bp-hero-content">
                    <div className="bp-hero-container">
                        <span className="bp-hero-category">{blog.category}</span>
                        <h1 className="bp-hero-title">{blog.title}</h1>
                        <div className="bp-hero-meta">
                            <span className="bp-hero-date">{blog.date}</span>
                            <span className="bp-hero-dot">·</span>
                            <span className="bp-hero-read">5 min read</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── Article Content ─── */}
            <section className="bp-article">
                <div className="bp-article-container">
                    <div className="bp-article-body" dangerouslySetInnerHTML={{ __html: blog.content }} />
                </div>
            </section>

            {/* ─── More from Blog ─── */}
            <section className="bp-more-section">
                <div className="bp-more-container">
                    <h2 className="bp-more-heading">More from Blog</h2>
                    <div className="bp-more-grid">
                        {otherBlogs.map((item) => (
                            <Link key={item.slug} href={`/blog/${item.slug}`} className="bp-more-card">
                                <div className="bp-more-card-img">
                                    <Image src={item.image} alt={item.title} fill style={{ objectFit: 'cover' }} />
                                </div>
                                <div className="bp-more-card-body">
                                    <span className="bp-more-card-cat">{item.category}</span>
                                    <h3 className="bp-more-card-title">{item.title}</h3>
                                    <span className="bp-more-card-date">{item.date}</span>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* CTA — Liquid Fill Animation (matches site-wide pattern) */}
                    <div className="bp-cta-wrap">
                        <Link href="/blog/" className="bp-cta-btn">
                            <span className="bp-cta-text-wrap">
                                <span className="bp-cta-text-old">View All Posts</span>
                                <span className="bp-cta-text-new">View All Posts</span>
                            </span>
                        </Link>
                    </div>
                </div>
            </section>

            <style>{`
                /* ════════════════════════════════════════
                   BLOG POST — PREMIUM EDITORIAL LAYOUT
                   Consistent with Cuberto / Prominent theme
                   ════════════════════════════════════════ */

                .bpc-container {
                    background-color: #ffffff;
                    padding-top: 140px;
                }

                .bp-post-main {
                    background-color: #ffffff;
                    color: #000000;
                }

                /* ─── Hero ─── */
                .bp-hero {
                    position: relative;
                    height: 90vh;
                    min-height: 600px;
                    display: flex;
                    align-items: flex-end;
                    padding-bottom: 100px;
                    overflow: hidden;
                }
                .bp-hero-bg {
                    position: absolute;
                    inset: 0;
                    z-index: 1;
                }
                .bp-hero-overlay {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(
                        to bottom,
                        rgba(0, 0, 0, 0.15) 0%,
                        rgba(0, 0, 0, 0.55) 60%,
                        rgba(0, 0, 0, 0.80) 100%
                    );
                    z-index: 2;
                }
                .bp-hero-content {
                    position: relative;
                    z-index: 3;
                    width: 100%;
                }
                .bp-hero-container {
                    max-width: 1400px;
                    margin: 0 auto;
                    padding: 0 100px;
                }
                .bp-hero-category {
                    display: inline-block;
                    font-size: 0.72rem;
                    font-weight: 600;
                    letter-spacing: 0.12em;
                    text-transform: uppercase;
                    color: #ffffff;
                    background: rgba(255, 255, 255, 0.15);
                    backdrop-filter: blur(12px);
                    -webkit-backdrop-filter: blur(12px);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    padding: 8px 18px;
                    border-radius: 100px;
                    margin-bottom: 30px;
                }
                .bp-hero-title {
                    font-size: clamp(2.5rem, 5vw, 4.2rem);
                    font-weight: 500;
                    line-height: 1.1;
                    letter-spacing: -0.03em;
                    color: #ffffff;
                    margin-bottom: 30px;
                    max-width: 850px;
                }
                .bp-hero-meta {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    font-size: 0.95rem;
                    color: rgba(255, 255, 255, 0.7);
                }
                .bp-hero-dot {
                    font-size: 1.2rem;
                }

                /* ─── Article Content ─── */
                .bp-article {
                    padding: 120px 0;
                    background: #ffffff;
                }
                .bp-article-container {
                    max-width: 780px;
                    margin: 0 auto;
                    padding: 0 40px;
                }
                .bp-article-body {
                    font-family: var(--font-main);
                    font-size: 1.2rem;
                    line-height: 1.8;
                    color: #333333;
                }
                .bp-article-body p {
                    margin-bottom: 32px;
                    color: #333333;
                }
                .bp-article-body h2 {
                    font-size: 2rem;
                    font-weight: 500;
                    color: #000000;
                    margin: 70px 0 25px;
                    letter-spacing: -0.02em;
                    line-height: 1.2;
                }
                .bp-article-body blockquote {
                    font-size: 1.6rem;
                    font-weight: 400;
                    font-style: italic;
                    color: #000000;
                    margin: 60px 0;
                    padding: 0 0 0 35px;
                    border-left: 3px solid #000000;
                    line-height: 1.45;
                }

                /* ─── More from Blog ─── */
                .bp-more-section {
                    padding: 120px 0;
                    background: #ffffff;
                }
                .bp-more-container {
                    max-width: 1400px;
                    margin: 0 auto;
                    padding: 0 100px;
                }
                .bp-more-heading {
                    font-size: clamp(2rem, 4vw, 3.2rem);
                    font-weight: 500;
                    color: #000000;
                    letter-spacing: -0.03em;
                    margin-bottom: 70px;
                }
                .bp-more-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 50px;
                    margin-bottom: 80px;
                }
                .bp-more-card {
                    display: flex;
                    flex-direction: column;
                    text-decoration: none;
                    color: inherit;
                }
                .bp-more-card-img {
                    position: relative;
                    width: 100%;
                    aspect-ratio: 16/10;
                    border-radius: 20px;
                    overflow: hidden;
                    background: #e5e5e5;
                    margin-bottom: 28px;
                    transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
                }
                .bp-more-card:hover .bp-more-card-img {
                    transform: scale(1.02);
                }
                .bp-more-card-cat {
                    display: inline-block;
                    font-size: 0.7rem;
                    font-weight: 600;
                    letter-spacing: 0.08em;
                    text-transform: uppercase;
                    color: #000000;
                    border: 1px solid rgba(0, 0, 0, 0.12);
                    padding: 5px 12px;
                    border-radius: 100px;
                    margin-bottom: 18px;
                    width: fit-content;
                }
                .bp-more-card-title {
                    font-size: clamp(1.4rem, 2.2vw, 1.8rem);
                    font-weight: 500;
                    color: #000000;
                    letter-spacing: -0.02em;
                    line-height: 1.25;
                    margin-bottom: 12px;
                    transition: opacity 0.3s ease;
                }
                .bp-more-card:hover .bp-more-card-title {
                    opacity: 0.5;
                }
                .bp-more-card-date {
                    font-size: 0.9rem;
                    color: #000000;
                    opacity: 0.4;
                }

                /* ─── CTA Button — Liquid Fill (site-wide pattern) ─── */
                .bp-cta-wrap {
                    display: flex;
                    justify-content: center;
                }
                .bp-cta-btn {
                    position: relative;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    padding: 24px 50px;
                    border: 1.5px solid #000000;
                    border-radius: 100px;
                    text-decoration: none;
                    color: #000000;
                    font-size: 1.1rem;
                    font-weight: 500;
                    overflow: hidden;
                    transition: color 0.4s ease, border-color 0.4s ease;
                }
                .bp-cta-btn::before {
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
                .bp-cta-btn:hover::before {
                    transform: translateY(-60%);
                }
                .bp-cta-text-wrap {
                    position: relative;
                    z-index: 2;
                    display: flex;
                    flex-direction: column;
                    overflow: hidden;
                    height: 1.4em;
                    line-height: 1.4;
                    padding-bottom: 2px;
                }
                .bp-cta-text-old {
                    transition: transform 0.6s cubic-bezier(0.19, 1, 0.22, 1);
                }
                .bp-cta-text-new {
                    position: absolute;
                    top: 100%;
                    left: 0;
                    width: 100%;
                    color: #ffffff;
                    transition: transform 0.6s cubic-bezier(0.19, 1, 0.22, 1);
                }
                .bp-cta-btn:hover .bp-cta-text-old {
                    transform: translateY(-100%);
                }
                .bp-cta-btn:hover .bp-cta-text-new {
                    transform: translateY(-100%);
                }

                /* ─── Responsive ─── */
                @media (max-width: 1024px) {
                    .bp-hero-container { padding: 0 40px; }
                    .bp-more-container { padding: 0 40px; }
                    .bp-article-container { padding: 0 30px; }
                    .bp-hero { height: 78vh; }
                }
                @media (max-width: 768px) {
                    .bp-hero {
                        height: 70vh;
                        min-height: 500px;
                        padding-bottom: 60px;
                    }
                    .bp-hero-container { padding: 0 24px; }
                    .bp-hero-category { margin-bottom: 20px; }
                    .bp-hero-title { font-size: 2.2rem; }
                    .bp-hero-meta { font-size: 0.85rem; }

                    .bp-article { padding: 80px 0; }
                    .bp-article-container { padding: 0 24px; }
                    .bp-article-body { font-size: 1.1rem; }
                    .bp-article-body h2 { font-size: 1.6rem; margin: 50px 0 20px; }
                    .bp-article-body blockquote { font-size: 1.3rem; padding: 0 0 0 20px; margin: 40px 0; }

                    .bp-share-bar { flex-direction: column; gap: 25px; align-items: flex-start; }
                    .bp-share-actions { width: 100%; flex-wrap: wrap; }

                    .bp-more-section { padding: 80px 0; }
                    .bp-more-container { padding: 0 24px; }
                    .bp-more-heading { margin-bottom: 50px; }
                    .bp-more-grid { grid-template-columns: 1fr; gap: 40px; }
                    .bp-more-card-img { border-radius: 16px; }

                    .bp-cta-btn { width: 100%; padding: 20px 40px; }
                }
                @media (max-width: 480px) {
                    .bp-hero-container { padding: 0 16px; }
                    .bp-article-container { padding: 0 16px; }
                    .bp-more-container { padding: 0 16px; }
                }
            `}</style>
        </main>
    )
}

export default BlogPostClient
