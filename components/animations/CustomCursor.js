'use client'

/**
 * CustomCursor
 * -----------------------------------------------------------------------------
 * Single-element trailing cursor.
 *
 * This merges two earlier versions:
 *   - Architecture, positioning, and hover-binding logic from the original
 *     ring-based implementation (gsap.ticker loop, mouseRef/posRef lerp,
 *     per-element enter/leave listeners with MutationObserver rebinding).
 *   - Visual style + motion feel of the later single-dot version (small
 *     white dot, mix-blend-mode: difference, subtle glow, clean scale-only
 *     hover effect).
 *
 * There is only ONE element. The native OS cursor stays visible; the dot
 * is a secondary decorative layer that trails the cursor with a smooth lerp.
 * -----------------------------------------------------------------------------
 */

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const posRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    // Touch / no-hover device bail-out.
    if (
      typeof window !== 'undefined' &&
      ('ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia('(hover: none)').matches)
    ) {
      return
    }

    const dot = dotRef.current
    if (!dot) return

    // Lerp factor — higher = snappier, lower = smoother. 0.22 gives a
    // visible trail without lagging behind the real cursor noticeably.
    const speed = 0.22

    // First-move flag so the dot doesn't flash at (0,0) on mount.
    let hasMoved = false

    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX
      mouseRef.current.y = e.clientY
      if (!hasMoved) {
        // Snap the rendered position to the real cursor on the first
        // real mousemove — prevents a long sweep in from (0,0).
        posRef.current.x = e.clientX
        posRef.current.y = e.clientY
        dot.style.opacity = '1'
        hasMoved = true
      }
    }

    // Frame-rate-independent lerp using GSAP's ticker.
    const tick = () => {
      const dt = 1.0 - Math.pow(1.0 - speed, gsap.ticker.deltaRatio())
      posRef.current.x += (mouseRef.current.x - posRef.current.x) * dt
      posRef.current.y += (mouseRef.current.y - posRef.current.y) * dt
      // Single batched transform write per frame. Viewport-space coords +
      // position: fixed means scroll / ancestor transforms can't offset it.
      dot.style.transform = `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0) translate(-50%, -50%)`
    }
    gsap.ticker.add(tick)

    // Subtle scale-only hover. No position offset — the dot always stays
    // exactly under the real cursor, so no flicker on element boundaries.
    // `overwrite: 'auto'` prevents stacked tweens if enter/leave fire
    // rapidly across nested children.
    const onEnter = () => {
      gsap.to(dot, { scale: 2.2, duration: 0.28, ease: 'power3.out', overwrite: 'auto' })
    }
    const onLeave = () => {
      gsap.to(dot, { scale: 1, duration: 0.28, ease: 'power3.out', overwrite: 'auto' })
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    // Original approach: bind enter/leave to each interactive element,
    // with a MutationObserver to cover elements added after mount.
    const SELECTOR =
      'a, button, [role="button"], input, textarea, select, label, .magnetic, .interactive, .ct-chip, .pr-tab'
    const bind = () => {
      document.querySelectorAll(SELECTOR).forEach((el) => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('mouseleave', onLeave)
      })
    }
    bind()
    const observer = new MutationObserver(() => requestAnimationFrame(bind))
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      gsap.ticker.remove(tick)
      observer.disconnect()
      document.querySelectorAll(SELECTOR).forEach((el) => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
      })
      gsap.killTweensOf(dot)
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cb-dot" aria-hidden="true" />
      <style>{`
        .cb-dot {
          position: fixed;
          top: 0;
          left: 0;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #fff;
          /* Auto-inverts against any background — stays visible on both
             light and dark sections with no JS color sampling. */
          mix-blend-mode: difference;
          pointer-events: none;
          z-index: 10000;
          will-change: transform;
          opacity: 0;
          box-shadow: 0 0 8px rgba(255, 255, 255, 0.35);
          transform: translate3d(-100px, -100px, 0) translate(-50%, -50%);
        }
        @media (hover: none), (pointer: coarse), (max-width: 1024px) {
          .cb-dot { display: none !important; }
        }
      `}</style>
    </>
  )
}
