'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import { FiArrowRight, FiFileText, FiUsers, FiZap } from 'react-icons/fi'

const steps = [
  {
    num: '01',
    Icon: FiFileText,
    title: 'Tell Us Your Requirements',
    desc: 'Share your project ideas, goals, and budget. Fill in a quick form or book a free consultation call with our team.',
  },
  {
    num: '02',
    Icon: FiUsers,
    title: 'Schedule an Interview',
    desc: "We'll shortlist the best candidates from our team matching your needs. Conduct interviews to evaluate compatibility and skills.",
  },
  {
    num: '03',
    Icon: FiZap,
    title: 'Hire & Start Building',
    desc: 'Onboard your developer within 24-48 hours and kick off your project with daily standups, sprint planning, and transparent delivery.',
  },
]

export default function HireSteps() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section className="section-pad bg-light" ref={ref}>
      <div className="container">
        <div className="section-header">
          <div className="section-badge">Hire a Developer</div>
          <h2 className="section-title">3 Steps to Hire <span>Remote Developers</span></h2>
          <p className="section-subtitle">Get a skilled developer working on your project in as little as 48 hours.</p>
        </div>

        <div className="hire-steps">
          <div className="hire-connector" />
          {steps.map((step, i) => {
            const Icon = step.Icon
            return (
              <motion.div
                key={step.num}
                className="hire-step"
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.15 }}
              >
                <div className="hire-step-num">{step.num}</div>
                <div className="hire-step-icon"><Icon size={36} color="#FF6600" /></div>
                <h3 className="hire-step-title">{step.title}</h3>
                <p className="hire-step-desc">{step.desc}</p>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          style={{ textAlign: 'center', marginTop: 50 }}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.45 }}
        >
          <Link href="/contact" className="btn btn-primary">Hire a Developer Now <FiArrowRight /></Link>
        </motion.div>
      </div>

      <style>{`
        .hire-steps { display: grid; grid-template-columns: repeat(3, 1fr); gap: 36px; position: relative; align-items: start; margin-bottom: 10px; }
        .hire-connector { position: absolute; top: 36px; left: calc(16.66% + 36px); right: calc(16.66% + 36px); height: 3px; background: linear-gradient(to right, var(--orange), var(--primary)); z-index: 0; border-radius: 2px; }
        .hire-step { background: white; border-radius: var(--radius-xl); padding: 40px 28px; text-align: center; box-shadow: var(--shadow-card); border: 1px solid var(--gray-100); position: relative; z-index: 1; transition: var(--transition); }
        .hire-step:hover { transform: translateY(-8px); box-shadow: var(--shadow-lg); }
        .hire-step-num { position: absolute; top: -18px; left: 50%; transform: translateX(-50%); width: 36px; height: 36px; background: var(--gradient-orange); border-radius: 50%; font-family: var(--font-heading); font-size: 0.8rem; font-weight: 700; color: white; display: flex; align-items: center; justify-content: center; box-shadow: var(--shadow-orange); }
        .hire-step-icon { display: flex; align-items: center; justify-content: center; margin-bottom: 16px; height: 56px; }
        .hire-step-title { font-family: var(--font-heading); font-size: 1rem; font-weight: 700; color: var(--primary); margin-bottom: 12px; }
        .hire-step-desc { font-size: 0.86rem; color: var(--gray-600); line-height: 1.75; }
        @media (max-width: 900px) { .hire-steps { grid-template-columns: 1fr; } .hire-connector { display: none; } }
      `}</style>
    </section>
  )
}
