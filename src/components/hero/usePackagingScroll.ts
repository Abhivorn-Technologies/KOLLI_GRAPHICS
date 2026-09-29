import { useEffect, useRef, useState, useCallback } from 'react'

export interface ScrollState {
  progress: number
  stage: number
  stageProgress: number
}

export const STAGE_BOUNDARIES = [0, 0.1, 0.2, 0.32, 0.44, 0.54, 0.64, 0.76, 0.87, 0.95, 1.0]

export const STAGE_LABELS = [
  'Flat Paperboard',
  'Pre-Press & Design',
  'Offset Printing',
  'Die-Cutting',
  'Embossing',
  'Foil Stamping',
  'Folding',
  'Finished Carton',
  'Unboxing',
  'Kolli Graphics',
]

export const STAGE_SUBTITLES = [
  'FROM AN IDEA...',
  'TO PRECISION DESIGN.',
  'TO BRILLIANT PRINT.',
  'SHAPED WITH PRECISION.',
  'REFINED WITH TEXTURE.',
  'FINISHED WITH GOLD.',
  'FORMED INTO STRUCTURE.',
  'BUILT TO PROTECT.',
  'READY TO IMPRESS.',
  'QUALITY & CUSTOMER FIRST.',
]

export function getStageFromProgress(progress: number): { stage: number; stageProgress: number } {
  for (let i = STAGE_BOUNDARIES.length - 2; i >= 0; i--) {
    if (progress >= STAGE_BOUNDARIES[i]) {
      const rangeStart = STAGE_BOUNDARIES[i]
      const rangeEnd = STAGE_BOUNDARIES[i + 1]
      const sp = (progress - rangeStart) / (rangeEnd - rangeStart)
      return { stage: i, stageProgress: Math.min(1, Math.max(0, sp)) }
    }
  }
  return { stage: 0, stageProgress: 0 }
}

export function usePackagingScroll(containerRef: React.RefObject<HTMLDivElement | null>): ScrollState {
  const [state, setState] = useState<ScrollState>({ progress: 0, stage: 0, stageProgress: 0 })
  const rafRef = useRef<number | null>(null)

  const compute = useCallback(() => {
    const el = containerRef.current
    if (!el) return

    // Use pageYOffset / scrollY and element.getBoundingClientRect for reliability
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    const elTop = el.getBoundingClientRect().top + scrollTop
    const elHeight = el.offsetHeight
    const viewH = window.innerHeight

    const totalScrollable = elHeight - viewH
    if (totalScrollable <= 0) return

    const scrolledIntoEl = scrollTop - elTop
    const progress = Math.min(1, Math.max(0, scrolledIntoEl / totalScrollable))
    const { stage, stageProgress } = getStageFromProgress(progress)
    setState(prev => {
      if (Math.abs(prev.progress - progress) < 0.0005) return prev
      return { progress, stage, stageProgress }
    })
  }, [containerRef])

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current)
      }
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null
        compute()
      })
    }

    // Initial compute
    compute()

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    }
  }, [compute])

  return state
}
