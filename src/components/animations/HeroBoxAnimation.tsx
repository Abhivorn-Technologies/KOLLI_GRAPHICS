import React, { useEffect, useRef, useState } from 'react'

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}
function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3)
}
function remap(val: number, inMin: number, inMax: number, outMin: number, outMax: number): number {
  const t = Math.max(0, Math.min(1, (val - inMin) / (inMax - inMin)))
  return outMin + t * (outMax - outMin)
}
function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}

const PH = {
  sideStart: 0.12,
  sideEnd: 0.32,
  frontStart: 0.28,
  frontEnd: 0.48,
  botStart: 0.43,
  botEnd: 0.6,
  topCloseStart: 0.56,
  topCloseEnd: 0.74,
  revealStart: 0.86,
  revealEnd: 1.0,
}
const CYCLE_MS = 6500
const HOLD_CLOSED_MS = 1000
const HOLD_OPEN_MS = 1800
const RESET_MS = 1100

type Phase = 'folding' | 'hold_closed' | 'opening' | 'hold_open' | 'resetting'

interface BoxState {
  p: number
  leftAngle: number
  rightAngle: number
  frontAngle: number
  botAngle: number
  topAngle: number
  sceneRotX: number
  sceneRotY: number
  shadowW: number
  shadowBlur: number
  interiorOpacity: number
}

function derive(p: number): BoxState {
  const sideT = easeOutCubic(remap(p, PH.sideStart, PH.sideEnd, 0, 1))
  const frontT = easeOutCubic(remap(p, PH.frontStart, PH.frontEnd, 0, 1))
  const botT = easeOutCubic(remap(p, PH.botStart, PH.botEnd, 0, 1))
  const topT = easeInOutCubic(remap(p, PH.topCloseStart, PH.topCloseEnd, 0, 1))
  const revT = easeOutCubic(remap(p, PH.revealStart, PH.revealEnd, 0, 1))
  let topAngle = 0
  if (p >= PH.revealStart) topAngle = lerp(90, -35, revT)
  else if (p >= PH.topCloseStart) topAngle = topT * 90
  return {
    p,
    leftAngle: sideT * 90,
    rightAngle: sideT * 90,
    frontAngle: frontT * 90,
    botAngle: botT * 90,
    topAngle,
    sceneRotX: lerp(28, 15, easeInOutCubic(p)),
    sceneRotY: lerp(-42, 20, easeInOutCubic(p)),
    shadowW: lerp(180, 310, easeInOutCubic(p)),
    shadowBlur: lerp(28, 12, easeInOutCubic(p)),
    interiorOpacity: remap(p, PH.revealStart, PH.revealEnd, 0, 1),
  }
}

export const HeroBoxAnimation: React.FC = () => {
  const rafRef = useRef<number | null>(null)
  const startRef = useRef<number | null>(null)
  const holdRef = useRef<number | null>(null)
  const phaseRef = useRef<Phase>('folding')
  const [s, setS] = useState<BoxState>(() => derive(0))

  useEffect(() => {
    function tick(now: number) {
      if (startRef.current === null) startRef.current = now
      const elapsed = now - startRef.current
      const ph = phaseRef.current
      if (ph === 'folding') {
        const animP = Math.min(elapsed / CYCLE_MS, 1)
        setS(derive(animP))
        if (animP >= 1) {
          phaseRef.current = 'hold_closed'
          holdRef.current = now
        }
      } else if (ph === 'hold_closed') {
        if (holdRef.current !== null && now - holdRef.current >= HOLD_CLOSED_MS) {
          phaseRef.current = 'opening'
          startRef.current = now
        }
      } else if (ph === 'opening') {
        const t = Math.min(elapsed / 800, 1)
        setS((prev) => ({
          ...prev,
          topAngle: lerp(90, -35, easeOutCubic(t)),
          interiorOpacity: easeOutCubic(t),
        }))
        if (t >= 1) {
          phaseRef.current = 'hold_open'
          holdRef.current = now
        }
      } else if (ph === 'hold_open') {
        if (holdRef.current !== null && now - holdRef.current >= HOLD_OPEN_MS) {
          phaseRef.current = 'resetting'
          startRef.current = now
          holdRef.current = null
        }
      } else if (ph === 'resetting') {
        const t = Math.min(elapsed / RESET_MS, 1)
        setS(derive(lerp(1, 0, easeInOutCubic(t))))
        if (t >= 1) {
          phaseRef.current = 'folding'
          startRef.current = null
          holdRef.current = null
        }
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  const {
    p,
    leftAngle,
    rightAngle,
    frontAngle,
    botAngle,
    topAngle,
    sceneRotX,
    sceneRotY,
    shadowW,
    shadowBlur,
    interiorOpacity,
  } = s
  const lidClosed = topAngle > 55
  const showDiecut = p < 0.28
  const stageLabel =
    p < 0.12
      ? 'Die-Cut Flat Sheet'
      : p < 0.32
        ? 'Side Walls Folding'
        : p < 0.48
          ? 'Front Panel Closing'
          : p < 0.6
            ? 'Base Lock Engaging'
            : p < 0.74
              ? 'Tuck-Top Sealing'
              : p < 0.86
                ? 'Box Complete'
                : 'Unboxing Reveal'
  const dotColor = p > 0.82 ? '#dc2626' : '#dc2626'

  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        minHeight: 460,
        userSelect: 'none',
        padding: '16px 0',
      }}
    >
      <div
        style={{
          position: 'absolute',
          width: 360,
          height: 360,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(21,128,61,0.09) 0%, rgba(220,38,38,0.04) 55%, transparent 70%)',
          filter: 'blur(48px)',
          transform: `translate(${p * 18 - 9}px, ${-p * 14}px)`,
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 10,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '4px 13px',
          borderRadius: 999,
          backgroundColor: 'rgba(21,128,61,0.07)',
          border: '1px solid rgba(21,128,61,0.15)',
          whiteSpace: 'nowrap',
        }}
      >
        <div
          style={{
            width: 7,
            height: 7,
            borderRadius: '50%',
            backgroundColor: dotColor,
            boxShadow: `0 0 8px ${dotColor}cc`,
          }}
        />
        <span
          style={{
            fontSize: '0.66rem',
            fontWeight: 700,
            color: '#374151',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
          }}
        >
          {stageLabel}
        </span>
      </div>
      <div
        style={{
          position: 'absolute',
          bottom: 50,
          left: '50%',
          transform: 'translateX(-50%)',
          width: shadowW,
          height: 48,
          borderRadius: '50%',
          background: 'rgba(0,0,0,0.15)',
          filter: `blur(${shadowBlur}px)`,
          pointerEvents: 'none',
        }}
      />
      <div style={{ perspective: '1000px', perspectiveOrigin: '50% 46%' }}>
        <div
          style={{
            position: 'relative',
            width: 210,
            height: 210,
            transformStyle: 'preserve-3d',
            transform: `rotateX(${sceneRotX}deg) rotateY(${sceneRotY}deg)`,
          }}
        >
          {/* MAIN FACE */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(145deg, #f8fafc 0%, #e8f0f8 60%, #dde7f2 100%)',
              border: '2px solid #c4d2e2',
              borderRadius: 5,
              transformStyle: 'preserve-3d',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
            }}
          >
            {showDiecut && (
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  opacity: 1 - remap(p, 0.14, 0.28, 0, 1),
                  pointerEvents: 'none',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: 5,
                    left: 7,
                    fontSize: '0.5rem',
                    color: '#aab6c4',
                    fontFamily: 'monospace',
                  }}
                >
                  ⌖ REG-01
                </div>
                <div
                  style={{
                    position: 'absolute',
                    top: 5,
                    right: 7,
                    fontSize: '0.5rem',
                    color: '#aab6c4',
                    fontFamily: 'monospace',
                  }}
                >
                  DIE 2pt CF
                </div>
                {[70, 140].map((x) => (
                  <div
                    key={x}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: x,
                      width: 1,
                      height: '100%',
                      background:
                        'repeating-linear-gradient(to bottom,#9ca3af 0,#9ca3af 3px,transparent 3px,transparent 7px)',
                      opacity: 0.4,
                    }}
                  />
                ))}
                {[70, 140].map((y) => (
                  <div
                    key={y}
                    style={{
                      position: 'absolute',
                      top: y,
                      left: 0,
                      height: 1,
                      width: '100%',
                      background:
                        'repeating-linear-gradient(to right,#9ca3af 0,#9ca3af 3px,transparent 3px,transparent 7px)',
                      opacity: 0.4,
                    }}
                  />
                ))}
                <div
                  style={{
                    position: 'absolute',
                    bottom: 8,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    gap: 12,
                  }}
                >
                  <span style={{ fontSize: '0.6rem', color: '#9ca3af' }}>↑ FOLD</span>
                  <span style={{ fontSize: '0.6rem', color: '#9ca3af' }}>FOLD ↑</span>
                </div>
              </div>
            )}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: 5,
                display: 'flex',
                opacity: remap(p, 0.34, 0.54, 0, 1),
              }}
            >
              {['#00aeef', '#ec008c', '#f59e0b', '#111827'].map((c) => (
                <div key={c} style={{ flex: 1, backgroundColor: c }} />
              ))}
            </div>
            <div style={{ textAlign: 'center', padding: '10px 14px', opacity: interiorOpacity }}>
              <div
                style={{
                  fontSize: '0.82rem',
                  fontWeight: 800,
                  color: '#111827',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  marginBottom: 3,
                }}
              >
                KOLLI GRAPHICS
              </div>
              <div style={{ fontSize: '0.58rem', color: '#6b7280', letterSpacing: '0.06em' }}>
                OFFSET LITHOGRAPHY
              </div>
              {interiorOpacity > 0.7 && (
                <div
                  style={{
                    marginTop: 9,
                    padding: '3px 9px',
                    borderRadius: 4,
                    background: 'linear-gradient(135deg,#ffd700 0%,#b8860b 100%)',
                    color: '#000',
                    fontSize: '0.52rem',
                    fontWeight: 800,
                    letterSpacing: '0.04em',
                    boxShadow: '0 2px 10px rgba(212,175,55,0.6)',
                  }}
                >
                  ★ HOT FOIL STAMPED ★
                </div>
              )}
            </div>
          </div>
          {/* LEFT WALL */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: 145,
              height: 210,
              background: 'linear-gradient(to right, #ccd8e8 0%, #e0eaf5 100%)',
              border: `1.5px ${p < 0.16 ? 'dashed' : 'solid'} #aebece`,
              transformOrigin: 'left center',
              transform: `rotateY(${leftAngle}deg)`,
              transformStyle: 'preserve-3d',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: leftAngle > 30 ? 'inset -10px 0 20px rgba(0,0,0,0.06)' : 'none',
            }}
          >
            <span
              style={{
                fontSize: '0.52rem',
                fontWeight: 700,
                color: '#94a3b8',
                transform: 'rotate(-90deg)',
                whiteSpace: 'nowrap',
                letterSpacing: '0.06em',
              }}
            >
              SIDE PANEL · 1.4pt CREASE
            </span>
          </div>
          {/* RIGHT WALL */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: 145,
              height: 210,
              background: 'linear-gradient(to left, #ccd8e8 0%, #e0eaf5 100%)',
              border: `1.5px ${p < 0.16 ? 'dashed' : 'solid'} #aebece`,
              transformOrigin: 'right center',
              transform: `rotateY(${-rightAngle}deg)`,
              transformStyle: 'preserve-3d',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: rightAngle > 30 ? 'inset 10px 0 20px rgba(0,0,0,0.06)' : 'none',
            }}
          >
            <span
              style={{
                fontSize: '0.52rem',
                fontWeight: 700,
                color: '#94a3b8',
                transform: 'rotate(90deg)',
                whiteSpace: 'nowrap',
                letterSpacing: '0.06em',
              }}
            >
              GLUE FLAP ATTACH
            </span>
          </div>
          {/* FRONT PANEL */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: 210,
              height: 210,
              background: 'linear-gradient(160deg, #eef3f9 0%, #e0eaf6 100%)',
              border: `1.5px ${p < 0.3 ? 'dashed' : 'solid'} #b4c4d6`,
              transformOrigin: 'bottom center',
              transform: `rotateX(${-frontAngle}deg)`,
              transformStyle: 'preserve-3d',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span
              style={{
                fontSize: '0.55rem',
                fontWeight: 700,
                color: '#94a3b8',
                letterSpacing: '0.06em',
                opacity: 1 - remap(frontAngle, 55, 90, 0, 1),
              }}
            >
              FRONT PANEL
            </span>
          </div>
          {/* BOTTOM FLAP */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: 210,
              height: 135,
              background: 'linear-gradient(to top, #bccad6 0%, #d4e2ee 100%)',
              border: `1.5px ${p < 0.25 ? 'dashed' : 'solid'} #9eb4c8`,
              transformOrigin: 'bottom center',
              transform: `rotateX(${-botAngle}deg)`,
              transformStyle: 'preserve-3d',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span
              style={{
                fontSize: '0.55rem',
                fontWeight: 700,
                color: '#7490a6',
                letterSpacing: '0.05em',
              }}
            >
              {botAngle > 65 ? 'LOCK-BASE ✓' : 'BOTTOM FLAP'}
            </span>
          </div>
          {/* TOP LID */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: 210,
              height: 135,
              background: lidClosed
                ? 'linear-gradient(145deg, #ffffff 0%, #fefaee 100%)'
                : 'linear-gradient(145deg, #ffffff 0%, #f2f6fb 100%)',
              border: `1.5px ${p < 0.25 ? 'dashed' : 'solid'} #bccad6`,
              borderRadius: '4px 4px 0 0',
              transformOrigin: 'top center',
              transform: `rotateX(${topAngle}deg)`,
              transformStyle: 'preserve-3d',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 5,
              boxShadow: topAngle < 20 ? '0 8px 28px rgba(0,0,0,0.14)' : 'none',
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                background:
                  'linear-gradient(135deg,#ffd700 0%,#b8860b 42%,#ffe87c 72%,#daa520 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: lidClosed
                  ? '0 4px 14px rgba(212,175,55,0.55)'
                  : '0 2px 6px rgba(212,175,55,0.28)',
              }}
            >
              <span style={{ fontSize: '0.9rem', color: '#4a2c00' }}>✦</span>
            </div>
            <span
              style={{
                fontSize: '0.58rem',
                fontWeight: 800,
                color: '#111827',
                letterSpacing: '0.05em',
              }}
            >
              TUCK-TOP LID
            </span>
          </div>
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          bottom: 8,
          left: '12%',
          right: '12%',
          height: 3,
          borderRadius: 3,
          backgroundColor: 'rgba(0,0,0,0.06)',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${p * 100}%`,
            background: 'linear-gradient(to right, #00aeef, #ec008c, #f59e0b, #dc2626)',
            borderRadius: 3,
          }}
        />
      </div>
      {[
        { x: '3%', y: '7%', c: '#00aeef' },
        { x: '93%', y: '7%', c: '#ec008c' },
        { x: '3%', y: '87%', c: '#f59e0b' },
        { x: '93%', y: '87%', c: '#dc2626' },
      ].map((d, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: d.x,
            top: d.y,
            width: 6,
            height: 6,
            borderRadius: '50%',
            backgroundColor: d.c,
            opacity: 0.25,
            pointerEvents: 'none',
          }}
        />
      ))}
    </div>
  )
}
