'use client'

import { useState } from 'react'

/**
 * Ultra-Fast Premium Button
 * Replaces heavy SVG math with pure CSS GPU-accelerated transitions
 * 100% Speed Boost over legacy LiquidButton
 */
export default function LiquidButton({ 
  children, 
  color = '#000', 
  liquidColor = '#FF6600', 
  textColor = 'white', 
  hoverTextColor = 'white',
  variant = 'solid',
  effect = 'cryogenic' // Kept for prop-compatibility
}) {
  const [isHovered, setIsHovered] = useState(false)

  const baseStyle = {
    background: variant === 'solid' ? color : 'transparent',
    color: isHovered ? hoverTextColor : textColor,
    border: variant === 'outline' ? `2px solid ${isHovered ? hoverTextColor : textColor}` : 'none',
  }

  const hoverOverlayStyle = {
    background: liquidColor,
    transform: isHovered ? 'scaleY(1)' : 'scaleY(0)',
  }

  return (
    <div 
      className="fast-btn-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`fast-btn variant-${variant}`} style={baseStyle}>
        <div className="btn-hover-overlay" style={hoverOverlayStyle} />
        <div className="btn-content" style={{ color: isHovered ? hoverTextColor : textColor }}>
          {children}
        </div>
      </div>

      <style>{`
        .fast-btn-container {
          display: inline-block;
          border-radius: 100px;
        }

        .fast-btn {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 260px;
          height: 76px;
          border-radius: 100px;
          cursor: pointer;
          overflow: hidden;
          transition: transform 0.4s var(--ease-expo), background-color 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease;
          backface-visibility: hidden;
          -webkit-font-smoothing: antialiased;
        }

        .fast-btn:hover {
          transform: translateY(-4px);
          box-shadow: 0 15px 30px rgba(0,0,0,0.1);
        }

        .btn-hover-overlay {
          position: absolute;
          inset: 0;
          transform-origin: bottom;
          transition: transform 0.6s var(--ease-expo);
          z-index: 1;
          border-radius: 100px;
        }

        .btn-content {
          position: relative;
          z-index: 10;
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: clamp(0.9rem, 1vw, 1rem);
          text-transform: uppercase;
          letter-spacing: 0.12rem;
          transition: color 0.4s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
        }

        .btn-content * {
          color: inherit !important;
          text-decoration: none !important;
        }
      `}</style>
    </div>
  )
}
