import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'

type RevealAnimation = 'fade-in-up' | 'fade-in-left' | 'fade-in-right' | 'scale-in'

type RevealProps = {
  children: ReactNode
  className?: string
  animation?: RevealAnimation
  delay?: number
  /** When true, animates as soon as the component mounts (hero sections). */
  immediate?: boolean
}

const animationClasses: Record<RevealAnimation, string> = {
  'fade-in-up': 'animate-fade-in-up',
  'fade-in-left': 'animate-fade-in-left',
  'fade-in-right': 'animate-fade-in-right',
  'scale-in': 'animate-scale-in',
}

const Reveal = ({
  children,
  className = '',
  animation = 'fade-in-up',
  delay = 0,
  immediate = false,
}: RevealProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(immediate)

  useEffect(() => {
    if (immediate) {
      return
    }

    const el = ref.current
    if (!el) {
      return
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [immediate])

  const style: CSSProperties | undefined = visible && delay > 0 ? { animationDelay: `${delay}s` } : undefined

  return (
    <div
      ref={ref}
      className={`${visible ? animationClasses[animation] : 'opacity-0'} ${className}`}
      style={style}
    >
      {children}
    </div>
  )
}

export default Reveal
