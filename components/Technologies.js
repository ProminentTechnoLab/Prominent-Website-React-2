'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaReact, FaVuejs, FaNodeJs, FaWordpress, FaApple, FaJava, FaAws } from 'react-icons/fa'
import { SiNextdotjs, SiLaravel, SiFlutter, SiDart, SiKotlin, SiMysql, SiSwift, SiPython } from 'react-icons/si'

const techStack = [
    { name: 'React', Icon: FaReact, color: '#61DBFB' },
    { name: 'Next.js', Icon: SiNextdotjs, color: '#000000' },
    { name: 'Vue.js', Icon: FaVuejs, color: '#42b883' },
    { name: 'Laravel', Icon: SiLaravel, color: '#FF2D20' },
    { name: 'Node.js', Icon: FaNodeJs, color: '#68A063' },
    { name: 'Python', Icon: SiPython, color: '#3776AB' },
    { name: 'Flutter', Icon: SiFlutter, color: '#54C5F8' },
    { name: 'React Native', Icon: FaReact, color: '#61DBFB' },
    { name: 'WordPress', Icon: FaWordpress, color: '#21759b' },
    { name: 'iOS App', Icon: FaApple, color: '#555555' },
    { name: 'SwiftUI', Icon: SiSwift, color: '#FA7343' },
    { name: 'Kotlin', Icon: SiKotlin, color: '#7F52FF' },
    { name: 'MySQL', Icon: SiMysql, color: '#00758F' },
    { name: 'AWS', Icon: FaAws, color: '#FF9900' },
]

export default function Technologies() {
    const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })

    return (
        <section className="section-pad bg-light" ref={ref}>
            <div className="container">
                <div className="section-header">
                    <div className="section-badge">Our Technology Stack</div>
                    <h2 className="section-title">Technologies <span>We Use</span></h2>
                    <p className="section-subtitle">We use the latest and most efficient technologies to deliver high-quality digital products.</p>
                </div>

                <motion.div
                    className="home-tech-grid"
                    variants={{
                        hidden: { opacity: 0 },
                        show: {
                            opacity: 1,
                            transition: { staggerChildren: 0.05 }
                        }
                    }}
                    initial="hidden"
                    animate={inView ? "show" : "hidden"}
                >
                    {techStack.map((t) => {
                        const Icon = t.Icon
                        return (
                            <motion.div
                                key={t.name}
                                className="home-tech-card"
                                variants={{
                                    hidden: { opacity: 0, scale: 0.8, y: 20 },
                                    show: { opacity: 1, scale: 1, y: 0 }
                                }}
                                whileHover={{
                                    y: -8,
                                    scale: 1.05,
                                    boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                                    backgroundColor: "rgba(255, 255, 255, 1)"
                                }}
                            >
                                <div className="home-tech-icon-wrapper">
                                    <Icon size={32} color={t.color} />
                                </div>
                                <span>{t.name}</span>
                            </motion.div>
                        )
                    })}
                </motion.div>
            </div>

            <style>{`
        .home-tech-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
          gap: 24px;
          margin-top: 50px;
        }
        .home-tech-card {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.5);
          border-radius: var(--radius-lg);
          padding: 28px 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 14px;
          text-align: center;
          transition: background-color 0.3s ease;
          box-shadow: 0 4px 15px rgba(0,0,0,0.03);
        }
        .home-tech-icon-wrapper {
          width: 64px;
          height: 64px;
          background: white;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 5px 15px rgba(0,0,0,0.05);
        }
        .home-tech-card span {
          font-size: 0.9rem;
          font-weight: 700;
          color: var(--primary);
          letter-spacing: 0.3px;
        }
        @media (max-width: 600px) {
          .home-tech-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
          }
        }
      `}</style>
        </section>
    )
}
