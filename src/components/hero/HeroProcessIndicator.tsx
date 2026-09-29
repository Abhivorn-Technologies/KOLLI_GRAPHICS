import React from 'react'
import type { ScrollState } from './usePackagingScroll'
import { STAGE_LABELS, STAGE_BOUNDARIES } from './usePackagingScroll'

interface Props {
  scroll: ScrollState
}

export const HeroProcessIndicator: React.FC<Props> = ({ scroll }) => {
  const { stage, progress } = scroll
  // Only show stages 0-8 (not the final reveal which takes full screen)
  const visibleStages = STAGE_LABELS.slice(0, 9)

  return (
    <div
      style={{
        position: 'absolute',
        right: '32px',
        top: '50%',
        transform: 'translateY(-50%)',
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
        zIndex: 20,
        opacity: progress < 0.92 ? 1 : Math.max(0, 1 - (progress - 0.92) / 0.06),
        transition: 'opacity 0.3s ease',
      }}
    >
      {visibleStages.map((label, i) => {
        const isActive = stage === i
        const isPast = stage > i
        const stageStart = STAGE_BOUNDARIES[i]
        const stageEnd = STAGE_BOUNDARIES[i + 1]
        const stageP = Math.min(1, Math.max(0, (progress - stageStart) / (stageEnd - stageStart)))

        return (
          <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {/* Number */}
            <span
              style={{
                fontSize: '0.6rem',
                fontWeight: 800,
                color: isActive ? '#dc2626' : isPast ? '#9ca3af' : '#d1d5db',
                letterSpacing: '0.05em',
                width: '16px',
                textAlign: 'right',
                fontFamily: "'DM Sans', sans-serif",
                transition: 'color 0.4s ease',
              }}
            >
              {String(i + 1).padStart(2, '0')}
            </span>

            {/* Track */}
            <div
              style={{
                width: '40px',
                height: '2px',
                backgroundColor: isPast ? '#dc262644' : '#e5e7eb',
                borderRadius: '2px',
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  height: '100%',
                  width: isActive ? `${stageP * 100}%` : isPast ? '100%' : '0%',
                  background: 'linear-gradient(to right, #dc2626, #f59e0b)',
                  borderRadius: '2px',
                  transition: 'width 0.1s linear',
                }}
              />
            </div>

            {/* Label */}
            <span
              style={{
                fontSize: '0.55rem',
                fontWeight: isActive ? 800 : 600,
                color: isActive ? '#dc2626' : isPast ? '#9ca3af' : '#d1d5db',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                fontFamily: "'DM Sans', sans-serif",
                transition: 'color 0.4s ease',
                whiteSpace: 'nowrap',
              }}
            >
              {label}
            </span>
          </div>
        )
      })}
    </div>
  )
}
