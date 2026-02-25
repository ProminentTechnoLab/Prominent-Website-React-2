'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import { FiArrowRight, FiCalendar, FiClock, FiMonitor, FiSmartphone, FiTrendingUp } from 'react-icons/fi'

const posts = [
  {
    Icon: FiMonitor,
    iconColor: '#0A2463',
    bgColor: '#0A246315',
    category: 'Web Development',
    catColor: '#0A2463',
    title: 'Why React + Laravel is the Perfect Stack for Modern Web Apps in 2026',
    excerpt: 'Discover why combining React on the frontend with Laravel on the backend creates a powerhouse stack for building scalable, maintainable, and high-performance web applications.',
    date: 'February 10, 2026',
    readTime: '6 min read',
  },
  {
    Icon: FiSmartphone,
    iconColor: '#FF6600',
    bgColor: '#FF660015',
    category: 'Mobile Development',
    catColor: '#FF6600',
    title: "Flutter vs React Native in 2026: Which Should You Choose for Your Next App?",
    excerpt: 'We compare Flutter and React Native across performance, UI flexibility, ecosystem maturity, and developer experience to help you make the right choice for your project.',
    date: 'February 3, 2026',
    readTime: '8 min read',
  },
  {
    Icon: FiTrendingUp,
    iconColor: '#059669',
    bgColor: '#05966915',
    category: 'Digital Marketing',
    catColor: '#059669',
    title: "10 Proven SEO Strategies That Tripled Our Clients' Organic Traffic in 2026",
    excerpt: 'From Core Web Vitals optimization to E-E-A-T content frameworks — here are the exact SEO techniques we used to achieve remarkable organic growth for our clients.',
    date: 'January 25, 2026',
    readTime: '10 min read',
  },
]

export default function Blog() {
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true })

  return (
    <section className="section-pad" ref={ref}>
      <div className="container">
        <div className="section-header">
          <div className="section-badge">Insights &amp; Resources</div>
          <h2 className="section-title">Latest <span>News &amp; Insights</span></h2>
          <p className="section-subtitle">Stay updated with the latest in web development, mobile apps, and digital marketing.</p>
        </div>

        <div className="blog-grid">
          {posts.map((post, i) => {
            const Icon = post.Icon
            return (
              <motion.article
                key={post.title}
                className="blog-card"
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <div className="blog-card-thumb" style={{ background: post.bgColor }}>
                  <Icon size={52} color={post.iconColor} strokeWidth={1.5} />
                  <span className="blog-card-cat" style={{ background: post.catColor }}>{post.category}</span>
                </div>
                <div className="blog-card-body">
                  <h3 className="blog-card-title">{post.title}</h3>
                  <p className="blog-card-excerpt">{post.excerpt}</p>
                  <div className="blog-card-meta">
                    <span><FiCalendar size={12} /> {post.date}</span>
                    <span><FiClock size={12} /> {post.readTime}</span>
                  </div>
                  <Link href="#" className="blog-card-link">Read More <FiArrowRight size={14} /></Link>
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>

      <style>{`
        .blog-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px; }
        .blog-card { background: white; border-radius: var(--radius-lg); overflow: hidden; box-shadow: var(--shadow-card); border: 1px solid var(--gray-100); transition: var(--transition); display: flex; flex-direction: column; }
        .blog-card:hover { transform: translateY(-8px); box-shadow: var(--shadow-card-hover); }
        .blog-card-thumb { height: 180px; display: flex; align-items: center; justify-content: center; position: relative; }
        .blog-card-cat { position: absolute; top: 16px; left: 16px; color: white; font-size: 0.72rem; font-weight: 700; padding: 4px 12px; border-radius: var(--radius-full); text-transform: uppercase; letter-spacing: 0.5px; }
        .blog-card-body { padding: 24px; display: flex; flex-direction: column; flex: 1; }
        .blog-card-title { font-family: var(--font-heading); font-size: 0.98rem; font-weight: 700; color: var(--primary); margin-bottom: 10px; line-height: 1.45; }
        .blog-card-excerpt { font-size: 0.84rem; color: var(--gray-600); line-height: 1.7; margin-bottom: 16px; flex: 1; }
        .blog-card-meta { display: flex; gap: 16px; font-size: 0.75rem; color: var(--gray-400); margin-bottom: 14px; }
        .blog-card-meta span { display: flex; align-items: center; gap: 4px; }
        .blog-card-link { display: inline-flex; align-items: center; gap: 5px; font-size: 0.85rem; font-weight: 600; color: var(--orange); transition: var(--transition); }
        .blog-card-link:hover { gap: 9px; }
        @media (max-width: 900px) { .blog-grid { grid-template-columns: repeat(2,1fr); } }
        @media (max-width: 600px) { .blog-grid { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  )
}
