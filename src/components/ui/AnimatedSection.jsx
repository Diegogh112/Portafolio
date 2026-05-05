import { useScrollAnimation } from '../../hooks/useScrollAnimation'

/**
 * Wrapper que aplica animación de entrada cuando el elemento
 * entra en el viewport.
 *
 * @param {string} animation - 'fade-up' | 'fade-in' | 'slide-left' | 'slide-right'
 * @param {number} delay - delay en ms (0, 100, 200, 300, 400, 500)
 */
export default function AnimatedSection({
  children,
  animation = 'fade-up',
  delay = 0,
  className = '',
  threshold = 0.1,
}) {
  const { ref, isVisible } = useScrollAnimation(threshold)

  const animationMap = {
    'fade-up': 'animate-fade-up',
    'fade-in': 'animate-fade-in',
    'slide-left': 'animate-slide-in-left',
    'slide-right': 'animate-slide-in-right',
  }

  const delayMap = {
    0: '',
    100: 'animate-delay-100',
    200: 'animate-delay-200',
    300: 'animate-delay-300',
    400: 'animate-delay-400',
    500: 'animate-delay-500',
  }

  return (
    <div
      ref={ref}
      className={`
        ${isVisible ? animationMap[animation] : 'opacity-0'}
        ${delayMap[delay] || ''}
        ${className}
      `}
    >
      {children}
    </div>
  )
}
