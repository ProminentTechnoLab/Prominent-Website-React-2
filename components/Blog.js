'use client'

import React from 'react'
import Link from 'next/link'
import { IoCalendarOutline, IoTimeOutline, IoArrowForward } from 'react-icons/io5'
import TextReveal from './animations/TextReveal'

const Blog = () => {
  const posts = [
    {
      title: "Why React + Laravel is the Perfect Stack for Modern Web Apps in 2026",
      excerpt: "Discover why combining React on the frontend with Laravel on the backend creates a powerhouse stack for building scalable web applications.",
      date: "Mar 15, 2026",
      time: "5 min",
      category: "WEB DEVELOPMENT",
      image: "/images/blog-1.jpg"
    },
    {
      title: "Flutter vs React Native in 2026: Which Should You Choose?",
      excerpt: "We compare performance, UI flexibility, and ecosystem maturity to help you make the right choice for your next mobile project.",
      date: "Mar 10, 2026",
      time: "7 min",
      category: "MOBILE APPS",
      image: "/images/blog-2.jpg"
    },
    {
      title: "10 Proven SEO Strategies That Tripled Our Clients' Organic Traffic",
      excerpt: "From Core Web Vitals to E-E-A-T content frameworks — here are the exact SEO techniques we used for remarkable growth.",
      date: "Mar 05, 2026",
      time: "6 min",
      category: "DIGITAL MARKETING",
      image: "/images/blog-3.jpg"
    }
  ]

  return (
    <section className="blog-section section">
      <div className="container">
        <div className="section-header-centered">
          <div className="badge">Insights & Updates</div>
          <h2 className="section-h">
            <TextReveal>Our Latest</TextReveal>
            <TextReveal delay={0.2} className="accent-text">Perspectives</TextReveal>
          </h2>
        </div>

        <div className="blog-grid">
          {posts.map((post, i) => (
            <div key={i} className="blog-card">
              <div className="blog-cat-wrapper">
                <span className="blog-cat">{post.category}</span>
              </div>

              <div className="blog-info">
                <div className="blog-meta">
                  <span><IoCalendarOutline /> {post.date}</span>
                  <span><IoTimeOutline /> {post.time} read</span>
                </div>
                <h3 className="blog-h">{post.title}</h3>
                <p className="blog-p">{post.excerpt}</p>
                <div className="blog-footer">
                  <span className="read-more">Read More <IoArrowForward className="arrow" /></span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .blog-section {
          padding-top: 5rem;
        }
        .section-header-centered { 
          text-align: left; 
          margin-bottom: 8rem; 
        }
        .section-h { 
          font-size: clamp(3rem, 6vw, 5.5rem); 
          color: white; 
          line-height: 0.95;
          letter-spacing: -0.04em;
          text-transform: uppercase;
        }
        .accent-text {
          color: white;
          opacity: 0.15; /* Adjusted for dark */
        }

        .blog-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          border-top: 1px solid rgba(255, 255, 255, 0.1); /* Adjusted for dark */
        }

        .blog-card {
          text-decoration: none;
          padding: 5rem 4rem;
          border-right: 1px solid rgba(255, 255, 255, 0.1);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.6s var(--ease-expo);
          background: rgba(255,255,255,0.02);
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        .blog-card:hover {
          background: rgba(255,255,255,0.05);
          transform: translateY(-10px);
        }

        .blog-cat-wrapper {
          margin-bottom: 2rem;
        }
        .blog-cat {
          display: inline-block;
          background: var(--brand-orange);
          color: white;
          font-size: 0.7rem;
          font-weight: 800;
          padding: 6px 16px;
          border-radius: 4px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .blog-info {
          padding: 0;
        }
        .blog-meta {
          display: flex;
          gap: 20px;
          color: #999; /* Muted for dark */
          font-size: 0.75rem;
          margin-bottom: 1.5rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-weight: 700;
        }
        
        .blog-h {
          font-size: 1.6rem;
          color: white;
          margin-bottom: 1.5rem;
          line-height: 1.2;
          font-weight: 700;
          transition: 0.4s;
        }
        .blog-card:hover .blog-h { opacity: 0.7; }

        .blog-p {
          font-size: 1rem;
          color: #aaa; /* Lighter for dark */
          margin-bottom: 2rem;
          line-height: 1.6;
          opacity: 0.8;
        }

        .read-more {
          color: white;
          font-weight: 700;
          font-size: 0.8rem;
          display: flex;
          align-items: center;
          gap: 10px;
          text-transform: uppercase;
          letter-spacing: 0.15em;
        }
        .arrow { transform: rotate(-45deg); transition: 0.4s; }
        .blog-card:hover .arrow { transform: rotate(0deg); }

        @media (max-width: 1024px) {
          .blog-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 768px) {
          .blog-grid { grid-template-columns: 1fr; }
          .blog-card { padding: 4rem 2rem; }
        }
      `}</style>
    </section>
  )
}

export default Blog
