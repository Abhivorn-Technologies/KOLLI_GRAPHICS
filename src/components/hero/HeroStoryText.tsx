import React from 'react'
import type { ScrollState } from './usePackagingScroll'
import { STAGE_SUBTITLES, STAGE_LABELS } from './usePackagingScroll'

interface Props {
  scroll: ScrollState
}

export const HeroStoryText: React.FC<Props> = ({ scroll }) => {
  const { stage, stageProgress, progress } = scroll
  const isReveal = progress >= 0.95

  // Fade logic for each text block: fade in at 0.1, hold, fade out at 0.85
  const textOpacity = (() => {
    if (stageProgress < 0.12) return stageProgress / 0.12
    if (stageProgress > 0.78) return 1 - (stageProgress - 0.78) / 0.22
    return 1
  })()

  const translateY = (() => {
    if (stageProgress < 0.12) return 24 * (1 - stageProgress / 0.12)
    if (stageProgress > 0.78) return -18 * ((stageProgress - 0.78) / 0.22)
    return 0
  })()

  if (isReveal) return null

  return (
    <div
      style={{
        position: 'absolute',
        bottom: '120px',
        left: '50%',
        transform: 'translateX(-50%)',
        textAlign: 'center',
        zIndex: 20,
        pointerEvents: 'none',
        width: '100%',
        maxWidth: '520px',
        padding: '0 24px',
      }}
    >
      {/* Stage number pill */}
      <div
        style={{
          opacity: textOpacity,
          transform: `translateY(${translateY}px)`,
          transition: 'none',
        }}
      >
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '4px 14px',
            borderRadius: '999px',
            backgroundColor: 'rgba(220,38,38,0.1)',
            border: '1px solid rgba(220,38,38,0.25)',
            color: '#dc2626',
            fontSize: '0.65rem',
            fontWeight: 800,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            fontFamily: "'DM Sans', sans-serif",
            marginBottom: '12px',
          }}
        >
          {String(stage + 1).padStart(2, '0')} — {STAGE_LABELS[stage]}
        </span>

        <h2
          style={{
            fontSize: 'clamp(1.4rem, 3vw, 2.2rem)',
            fontWeight: 800,
            color: '#ffffff',
            letterSpacing: '0.04em',
            margin: '0 0 8px 0',
            lineHeight: 1.15,
            fontFamily: "'DM Serif Display', Georgia, serif",
            textShadow: '0 2px 20px rgba(0,0,0,0.6)',
          }}
        >
          {STAGE_SUBTITLES[stage]}
        </h2>

        {/* Sub-copy for select stages */}
        {stage === 0 && (
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.82rem', margin: 0, letterSpacing: '0.06em', fontFamily: "'DM Sans', sans-serif" }}>
            A BLANK SHEET. THE STORY BEGINS.
          </p>
        )}
        {stage === 2 && (
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.82rem', margin: 0, letterSpacing: '0.06em', fontFamily: "'DM Sans', sans-serif" }}>
            Heidelberg & Komori. Six-color UV lithography.
          </p>
        )}
        {stage === 7 && (
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.82rem', margin: 0, letterSpacing: '0.06em', fontFamily: "'DM Sans', sans-serif" }}>
            Kolli Graphics. 15 years of craftsmanship.
          </p>
        )}
      </div>
    </div>
  )
}
