'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
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
  const pathname = usePathname()

  useEffect(() => {
    const runReveal = () => {
      // 1. Selector for all text elements we want to reveal word-by-word
      const targets = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, .reveal-text, .reveal-p')

      targets.forEach((target) => {
        // Force re-run on navigation even if already split, 
        // as long as the content has been re-rendered by navKey
        if (target.dataset.splitDone === 'true') {
          // If already split, just ensure the words are reset to 110% 
          // before the new animation starts
          const innerWords = target.querySelectorAll('.word-inner')
          gsap.set(innerWords, { y: '120%' })
        } else {
          // RECURSIVE SPLITTER
          const splitTextNodes = (node) => {
            const children = Array.from(node.childNodes)
            children.forEach((child) => {
              if (child.nodeType === Node.TEXT_NODE) {
                const text = child.textContent
                if (!text.trim()) return
                const words = text.split(/(\s+)/)
                const fragment = document.createDocumentFragment()
                words.forEach((word) => {
                  if (word.trim()) {
                    const wordWrap = document.createElement('span')
                    wordWrap.className = 'word-wrap'
                    wordWrap.style.display = 'inline-block'
                    wordWrap.style.overflow = 'hidden'
                    wordWrap.style.verticalAlign = 'bottom'
                    wordWrap.style.paddingBottom = '0.25em' // Generous space for descenders (g, j, p, q, y)
                    wordWrap.style.marginBottom = '-0.25em' // Offset padding to maintain baseline
                    
                    const wordInner = document.createElement('span')
                    wordInner.className = 'word-inner'
                    wordInner.innerText = word
                    wordInner.style.display = 'inline-block'
                    wordInner.style.transform = 'translateY(130%)' // Slightly more to clear padding
                    wordInner.style.willChange = 'transform'
                    wordWrap.appendChild(wordInner)
                    fragment.appendChild(wordWrap)
                  } else {
                    fragment.appendChild(document.createTextNode(word))
                  }
                })
                node.replaceChild(fragment, child)
              } else if (child.nodeType === Node.ELEMENT_NODE) {
                if (child.tagName === 'BR') return
                splitTextNodes(child)
              }
            })
          }
          splitTextNodes(target)
          target.dataset.splitDone = 'true'
        }

        const innerWords = target.querySelectorAll('.word-inner')
        const rect = target.getBoundingClientRect()
        const isAboveFold = rect.top < window.innerHeight * 0.8

        if (isAboveFold) {
          gsap.set(innerWords, { y: '120%' })
          gsap.to(innerWords, {
            y: '0%',
            duration: 1.2,
            ease: 'power4.out',
            stagger: 0.08,
            delay: 0.3
          })
        } else {
          gsap.to(innerWords, {
            y: '0%',
            ease: 'power3.out', 
            stagger: 0.1, 
            scrollTrigger: {
              trigger: target,
              start: 'top 96%',
              end: 'top 70%',
              scrub: 1.2,
              once: true
            }
          })
        }
      })
      ScrollTrigger.refresh()
    }

    // Only run on the official transition signal from AppWrapper
    window.addEventListener('refresh-text-reveal', runReveal)

    return () => {
      window.removeEventListener('refresh-text-reveal', runReveal)
      ScrollTrigger.getAll().forEach(st => st.kill())
    }
  }, []) // Rely on event listener for all transitions

  return null
}
