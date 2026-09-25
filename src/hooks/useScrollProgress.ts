import { useRef, useEffect, useState } from 'react'

/**
 * Tracks scroll progress [0..1] of an element relative to the viewport.
 * start: when the element's top hits the viewport bottom
 * end: when the element's bottom exits the viewport top
 */
export function useScrollProgress(_options?: {
  start?: 'top-bottom' | 'top-top' | 'center-center'
  end?: 'bottom-top' | 'bottom-center' | 'bottom-bottom'
}) {
  const ref = useRef<HTMLElement | null>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const update = () => {
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight
      const totalHeight = rect.height + vh
      const scrolled = vh - rect.top
      const raw = scrolled / totalHeight
      setProgress(Math.max(0, Math.min(1, raw)))
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update, { passive: true })
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return { ref, progress }
}

/**
 * Returns progress [0..1] relative to a sticky pin zone.
 * The element must have `position: sticky` and a tall parent.
 */
export function useStickyScrollProgress() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const update = () => {
      const rect = container.getBoundingClientRect()
      const totalScrollDistance = container.offsetHeight - window.innerHeight
      if (totalScrollDistance <= 0) {
        setProgress(0)
        return
      }
      // How far have we scrolled past the container's top into the page?
      const scrolledIntoContainer = -rect.top
      const raw = scrolledIntoContainer / totalScrollDistance
      setProgress(Math.max(0, Math.min(1, raw)))
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update, { passive: true })
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return { containerRef, progress }
}

/** Smooth clamp/remap helper. */
export function remap(
  val: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  const t = Math.max(0, Math.min(1, (val - inMin) / (inMax - inMin)))
  return outMin + t * (outMax - outMin)
}

/** Smooth ease out cubic */
export function easeOut(t: number): number {
  return 1 - Math.pow(1 - t, 3)
}

/** Smooth ease in-out */
export function easeInOut(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}
