'use client'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useEffect, useState } from 'react'
import { FiCheckCircle, FiZap, FiUsers, FiAward } from 'react-icons/fi'

const stats = [
  { num: 30, suffix: '+', label: 'Happy Customers' },
  { num: 50, suffix: '+', label: 'Successful Projects' },
  { num: 15, suffix: '+', label: 'Team Members' },
  { num: 99, suffix: '%', label: 'Satisfaction Rate' },
]

const reasons = [
  {
    icon: FiZap,
    title: 'Lightning-Fast Delivery',
    desc: 'We follow agile methodologies with sprint-based delivery cycles, ensuring your project launches on time without compromising on quality.',
    color: '#FF6600',
  },
  {
    icon: FiUsers,
    title: 'Dedicated Expert Team',
    desc: 'Work directly with experienced developers, designers, and marketers committed exclusively to your project â€” no outsourcing, no junior staff surprises.',
    color: '#FF6600',
  },
  {
    icon: FiAward,
    title: 'Transparent Communication',
    desc: 'Daily updates, weekly reports, and an always-open communication channel mean you are always in the loop â€” from kickoff to launch and beyond.',
    color: '#FF6600',
  },
]

function AnimatedCounter({ target, suffix, inView }) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!inView) return
    let start = 0
    const step = target / 50
    const id = setInterval(() => {
      start += step
      if (start >= target) { setCount(target); clearInterval(id) }
      else { setCount(Math.floor(start)) }
    }, 30)
    return () => clearInterval(id)
  }, [inView, target])
  return <>{count}{suffix}</>
}

export default function WhyUs() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section className="why-us section-pad" ref={ref}>
      <div className="container">
        {/* Stats bar */}
        <div className="stats-grid">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              className="stat-card"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <div className="stat-card-number">
                <AnimatedCounter target={s.num} suffix={s.suffix} inView={inView} />
              </div>
              <div className="stat-card-label">{s.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Section header */}
        <div className="section-header" style={{ marginTop: 70 }}>
          <div className="section-badge">Why Prominent TechnoLabs</div>
          <h2 className="section-title">Why Working <span>With Us?</span></h2>
          <p className="section-subtitle">
            We go beyond just writing code â€” we become a strategic technology partner invested in your success.
          </p>
        </div>

        {/* Reasons grid */}
        <div className="grid-3">
          {reasons.map((r, i) => {
            const Icon = r.icon
            return (
              <motion.div
                key={r.title}
                className="reason-card"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.15 }}
              >
                <div className="reason-icon" style={{ background: r.color + '22', color: r.color }}>
                  <Icon size={26} />
                </div>
                <div className="reason-check"><FiCheckCircle color={r.color} size={18} /></div>
                <h3 className="reason-title">{r.title}</h3>
                <p className="reason-desc">{r.desc}</p>
              </motion.div>
            )
          })}
        </div>
      </div>

      <style>{`
        .why-us {
          background: var(--gradient-primary);
          color: white;
          position: relative;
          overflow: hidden;
        }
        .why-us::before {
          content: '';
          position: absolute;
          top: -200px; right: -200px;
          width: 500px; height: 500px;
          border-radius: 50%;
          background: var(--orange);
          opacity: 0.07;
          filter: blur(60px);
        }
        .why-us .section-title { color: white; }
        .why-us .section-subtitle { color: rgba(255,255,255,0.65); }
        .why-us .section-badge {
          background: rgba(255,102,0,0.2);
          border-color: rgba(255,102,0,0.4);
          color: #ffd9b8;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }
        .stat-card {
          background: rgba(255,255,255,0.07);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: var(--radius-lg);
          padding: 32px 20px;
          text-align: center;
          transition: var(--transition);
        }
        .stat-card:hover {
          background: rgba(255,102,0,0.15);
          border-color: rgba(255,102,0,0.4);
          transform: translateY(-4px);
        }
        .stat-card-number {
          font-family: var(--font-heading);
          font-size: 2.8rem;
          font-weight: 800;
          color: var(--orange);
          line-height: 1;
          margin-bottom: 8px;
        }
        .stat-card-label {
          font-size: 0.85rem;
          color: rgba(255,255,255,0.7);
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .reason-card {
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: var(--radius-lg);
          padding: 36px;
          position: relative;
          transition: var(--transition);
        }
        .reason-card:hover {
          background: rgba(255,255,255,0.12);
          transform: translateY(-6px);
        }
        .reason-icon {
          width: 60px; height: 60px;
          border-radius: var(--radius-md);
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 18px;
        }
        .reason-check { position: absolute; top: 20px; right: 20px; }
        .reason-title {
          font-family: var(--font-heading);
          font-size: 1.05rem;
          font-weight: 700;
          color: white;
          margin-bottom: 10px;
        }
        .reason-desc {
          font-size: 0.88rem;
          color: rgba(255,255,255,0.65);
          line-height: 1.8;
        }

        @media (max-width: 900px) { .stats-grid { grid-template-columns: repeat(2,1fr); } }
        @media (max-width: 480px) { .stats-grid { grid-template-columns: 1fr 1fr; gap: 14px; } }
      `}</style>
    </section>
  )
}


