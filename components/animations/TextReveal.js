'use client'

import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

/**
 * TextReveal Component
 * -----------------------------------------------------------------------------
 * Provides a global entrance animation for text across the site.
 * Targets headers and paragraphs to reveal them with a smooth 
 * "bottom-to-top" and fade-in effect as they enter the viewport.
 * -----------------------------------------------------------------------------
 */
export default function TextReveal() {
  useEffect(() => {
    // 1. Selector for all text we want to reveal word-by-word
    const targets = document.querySelectorAll('h1, h2, h3, h4, .reveal-text')

    // We use a small timeout to ensure the browser has calculated the layout 
    // and fonts are loaded before we start splitting.
    const timer = setTimeout(() => {
      targets.forEach((target) => {
        if (target.dataset.splitDone === 'true') return
        
        // RECURSIVE SPLITTER: Preserves <br/> tags and HTML structure
        const splitTextNodes = (node) => {
          const children = Array.from(node.childNodes)
          
          children.forEach((child) => {
            if (child.nodeType === Node.TEXT_NODE) {
              const text = child.textContent
              if (!text.trim()) return
              
              const words = text.split(/(\s+)/) // Keep whitespace
              const fragment = document.createDocumentFragment()
              
              words.forEach((word) => {
                if (word.trim()) {
                  const wordWrap = document.createElement('span')
                  wordWrap.className = 'word-wrap'
                  wordWrap.style.display = 'inline-block'
                  wordWrap.style.overflow = 'hidden'
                  wordWrap.style.verticalAlign = 'top'
                  
                  const wordInner = document.createElement('span')
                  wordInner.className = 'word-inner'
                  wordInner.innerText = word
                  wordInner.style.display = 'inline-block'
                  wordInner.style.transform = 'translateY(110%)'
                  
                  wordWrap.appendChild(wordInner)
                  fragment.appendChild(wordWrap)
                } else {
                  // Keep spaces as-is
                  fragment.appendChild(document.createTextNode(word))
                }
              })
              
              node.replaceChild(fragment, child)
            } else if (child.nodeType === Node.ELEMENT_NODE) {
              splitTextNodes(child)
            }
          })
        }

        splitTextNodes(target)
        target.dataset.splitDone = 'true'

        // Animate the words when triggered
        const innerWords = target.querySelectorAll('.word-inner')
        
        gsap.to(innerWords, {
          y: '0%',
          duration: 1.2, // Slightly slower for more premium feel
          ease: 'power4.out',
          stagger: 0.05,
          scrollTrigger: {
            trigger: target,
            start: 'top 92%',
            toggleActions: 'play none none none',
            once: true
          }
        })
      })
    }, 100) // 100ms delay for stability on refresh

    // 2. Body paragraphs (P-tags) get a smoother, whole-block reveal
    const paragraphs = document.querySelectorAll('p, .reveal-p')
    paragraphs.forEach((p) => {
      if (p.dataset.revealed === 'true') return
      p.dataset.revealed = 'true'

      gsap.set(p, { y: 30, opacity: 0 })
      gsap.to(p, {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: p,
          start: 'top 92%',
          once: true
        }
      })
    })

    ScrollTrigger.refresh()

    return () => {
      clearTimeout(timer)
      ScrollTrigger.getAll().forEach(st => st.kill())
    }
  }, [])

  return null
}
