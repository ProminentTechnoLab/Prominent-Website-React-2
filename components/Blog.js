'use client'

import React from 'react'
import { IoArrowForward } from 'react-icons/io5'

const Blog = () => {
  const posts = [
    { title: "Why React + Laravel is the Perfect Stack for Modern Web Apps", date: "Mar 15, 2026", category: "Web Development" },
    { title: "Flutter vs React Native in 2026: Which Should You Choose?", date: "Mar 10, 2026", category: "Mobile Apps" },
    { title: "10 Proven SEO Strategies That Tripled Our Clients' Organic Traffic", date: "Mar 05, 2026", category: "Digital Marketing" }
  ]

  return (
    <section className="bl-section">
      <div className="bl-inner">
        <h2 className="bl-title">Latest insights</h2>
        <div className="bl-list">
          {posts.map((p, i) => (
            <div key={i} className="bl-item">
              <div className="bl-item-top">
                <span className="bl-cat">{p.category}</span>
                <span className="bl-date">{p.date}</span>
              </div>
              <h3 className="bl-item-title">{p.title}</h3>
              <span className="bl-read">
                Read more <IoArrowForward className="bl-arrow" />
              </span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .bl-section {
          background: #000;
          color: #fff;
          padding: 120px 0;
          border-radius: 30px 30px 0 0;
        }
        .bl-inner { max-width: 1400px; margin: 0 auto; padding: 0 40px; }
        .bl-title {
          font-size: clamp(3rem, 5.5vw, 5rem);
          font-weight: 500;
          color: #fff;
          margin-bottom: 60px;
          letter-spacing: -0.03em;
        }
        .bl-list {
          border-top: 1px solid rgba(255,255,255,0.1);
        }
        .bl-item {
          padding: 40px 0;
          border-bottom: 1px solid rgba(255,255,255,0.1);
          cursor: pointer;
          transition: opacity 0.3s;
        }
        .bl-item:hover { opacity: 0.7; }
        .bl-item-top {
          display: flex;
          justify-content: space-between;
          margin-bottom: 16px;
        }
        .bl-cat {
          font-size: 0.75rem;
          font-weight: 500;
          color: rgba(255,255,255,0.4);
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }
        .bl-date {
          font-size: 0.8rem;
          color: rgba(255,255,255,0.3);
        }
        .bl-item-title {
          font-size: clamp(1.3rem, 2.5vw, 2rem);
          font-weight: 500;
          color: #fff;
          line-height: 1.2;
          letter-spacing: -0.02em;
          margin-bottom: 20px;
        }
        .bl-read {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 0.85rem;
          font-weight: 500;
          color: rgba(255,255,255,0.5);
        }
        .bl-arrow {
          transform: rotate(-45deg);
          transition: transform 0.3s ease;
          font-size: 0.9rem;
        }
        .bl-item:hover .bl-arrow { transform: rotate(0); }

        @media (max-width: 768px) {
          .bl-section { padding: 80px 0; border-radius: 20px 20px 0 0; }
          .bl-inner { padding: 0 20px; }
          .bl-item { padding: 30px 0; }
        }
        @media (max-width: 480px) {
          .bl-section { padding: 60px 0; border-radius: 16px 16px 0 0; }
          .bl-inner { padding: 0 16px; }
          .bl-item-title { font-size: 1.15rem; }
        }
      `}</style>
    </section>
  )
}

export default Blog
