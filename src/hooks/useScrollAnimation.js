import { useEffect, useRef, useState } from 'react'

/**
 * Hook para detectar cuando un elemento entra en el viewport
 * y disparar animaciones de entrada.
 */
export function useScrollAnimation(threshold = 0.1) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target) // Solo anima una vez
        }
      },
      { threshold }
    )

    const currentRef = ref.current
    if (currentRef) observer.observe(currentRef)

    return () => {
      if (currentRef) observer.unobserve(currentRef)
    }
  }, [threshold])

  return { ref, isVisible }
}

/**
 * Hook para detectar el scroll y saber si el usuario bajó de cierta posición.
 */
export function useScrollPosition(offset = 50) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > offset)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [offset])

  return scrolled
}

/**
 * Hook para detectar la sección activa en el navbar.
 */
export function useActiveSection(sections) {
  const [activeSection, setActiveSection] = useState('')
  const sectionsRef = useRef(sections)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 100

      for (const section of sectionsRef.current) {
        const el = document.getElementById(section)
        if (!el) continue
        const { offsetTop, offsetHeight } = el
        if (scrollPos >= offsetTop && scrollPos < offsetTop + offsetHeight) {
          setActiveSection(section)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, []) // stable — sectionsRef never changes

  return activeSection
}
