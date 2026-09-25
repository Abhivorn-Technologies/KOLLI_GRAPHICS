import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Sparkles, CheckCircle, Layers, Box } from 'lucide-react'
import { useStickyScrollProgress, remap, easeOut, easeInOut } from '../../hooks/useScrollProgress'

/* ─── helpers ─────────────────────────────────────────────────────────────── */
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

// Phase boundaries (progress 0..1)
const P = {
  sidewallStart: 0.1,
  sidewallEnd: 0.3,
  frontWallStart: 0.25,
  frontWallEnd: 0.45,
  bottomStart: 0.4,
  bottomEnd: 0.58,
  topCloseStart: 0.55,
  topCloseEnd: 0.74,
  topOpenStart: 0.78,
  topOpenEnd: 1.0,
}

const STAGES = [
  {
    label: 'Flat Die-Line Sheet',
    prog: 0,
    desc: 'Precision laser-scored paperboard, flat for maximum pallet density.',
  },
  {
    label: 'Sidewalls Fold 90°',
    prog: 0.25,
    desc: 'Side panels hinge along crease rules to form the prism walls.',
  },
  {
    label: 'Auto-Lock Base Interlocks',
    prog: 0.5,
    desc: 'Bottom flaps interlock and glue for structural rigidity.',
  },
  {
    label: 'Tuck-End Closure Seals',
    prog: 0.76,
    desc: 'Top lid folds down — hot foil stamped, gold embossed.',
  },
  {
    label: 'Unboxing Reveal',
    prog: 1.0,
    desc: 'Interior print & gold foil craftsmanship revealed.',
  },
]

export const BoxFoldingSignature: React.FC = () => {
  const reduceMotion = useReducedMotion()
  const { containerRef, progress } = useStickyScrollProgress()

  const p = progress

  // Derived fold angles
  const leftWallAngle = easeOut(remap(p, P.sidewallStart, P.sidewallEnd, 0, 1)) * 90
  const rightWallAngle = easeOut(remap(p, P.sidewallStart, P.sidewallEnd, 0, 1)) * 90
  const bottomFlapAngle = easeOut(remap(p, P.bottomStart, P.bottomEnd, 0, 1)) * 90

  let topLidAngle = 0
  const closeT = easeInOut(remap(p, P.topCloseStart, P.topCloseEnd, 0, 1))
  const openT = easeOut(remap(p, P.topOpenStart, P.topOpenEnd, 0, 1))
  if (p < P.topCloseStart) {
    topLidAngle = 0
  } else if (p < P.topOpenStart) {
    topLidAngle = closeT * 90
  } else {
    // re-opens to reveal contents
    topLidAngle = lerp(90, -30, openT)
  }

  // Scene perspective rotation
  const sceneRotX = lerp(26, 14, easeInOut(p))
  const sceneRotY = lerp(-38, 12, easeInOut(p))

  // Shadow
  const shadowW = lerp(220, 320, easeInOut(p))
  const shadowBlur = lerp(22, 14, easeInOut(p))

  // Interior content opacity: only bright when box is open
  const interiorOpacity = remap(p, P.topOpenStart, P.topOpenEnd, 0, 1)
  // Gold foil badge on lid
  const goldBadgeVisible = p > 0.7

  const currentStage = STAGES.reduce((acc, s) => (p >= s.prog ? s : acc), STAGES[0])

  return (
    /* Outer container: tall enough for sticky pinning (300vh) */
    <div
      ref={containerRef}
      style={{ position: 'relative', height: reduceMotion ? 'auto' : '350vh' }}
      id="box-experience"
    >
      {/* Sticky viewport-tall panel */}
      <div
        className="paper-grid-bg"
        style={{
          position: reduceMotion ? 'relative' : 'sticky',
          top: 0,
          height: '100svh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          overflow: 'hidden',
          backgroundColor: '#f8fafc',
          borderTop: '1px solid #e2e8f0',
          borderBottom: '1px solid #e2e8f0',
        }}
      >
        {/* ── Ambient background glows (soft light pastel) ───────────────── */}
        <motion.div
          style={{
            position: 'absolute',
            top: '10%',
            left: '-10%',
            width: '560px',
            height: '560px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0,174,239,0.08) 0%, transparent 70%)',
            filter: 'blur(80px)',
            pointerEvents: 'none',
            x: p * 60,
            y: p * 30,
          }}
        />
        <motion.div
          style={{
            position: 'absolute',
            bottom: '-5%',
            right: '-8%',
            width: '480px',
            height: '480px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(220,38,38,0.06) 0%, transparent 70%)',
            filter: 'blur(90px)',
            pointerEvents: 'none',
            x: -p * 40,
          }}
        />
        {/* CMYK decorative dots parallax */}
        {[
          { color: '#00aeef', size: 6, x: '8%', y: '20%', px: p * 25 },
          { color: '#ec008c', size: 5, x: '92%', y: '30%', px: -p * 20 },
          { color: '#f59e0b', size: 6, x: '15%', y: '75%', px: p * 15 },
          { color: '#dc2626', size: 5, x: '85%', y: '70%', px: -p * 18 },
        ].map((dot) => (
          <div
            key={`dot-${dot.color}-${dot.x}-${dot.y}`}
            style={{
              position: 'absolute',
              left: dot.x,
              top: dot.y,
              width: dot.size,
              height: dot.size,
              borderRadius: '50%',
              backgroundColor: dot.color,
              opacity: 0.45,
              transform: `translateX(${dot.px}px)`,
              pointerEvents: 'none',
            }}
          />
        ))}

        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          {/* ── Two-column layout ──────────────────────────────────── */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)',
              gap: '60px',
              alignItems: 'center',
            }}
          >
            {/* LEFT: Info panel */}
            <div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '6px 16px',
                  borderRadius: '999px',
                  backgroundColor: '#fee2e2',
                  border: '1px solid #fecaca',
                  color: '#dc2626',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  marginBottom: '24px',
                }}
              >
                <Box size={13} color="#dc2626" />
                Signature Packaging Experience
              </div>

              <h2
                style={{
                  color: '#111827',
                  fontWeight: 800,
                  fontSize: 'clamp(2rem,3.2vw,3rem)',
                  lineHeight: 1.1,
                  marginBottom: '20px',
                }}
              >
                From Flat Sheet to{' '}
                <span
                  style={{
                    background: 'linear-gradient(135deg,#dc2626 0%,#ec008c 50%,#f59e0b 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  3D Perfection
                </span>
              </h2>

              {/* Stage label */}
              <div
                style={{
                  padding: '20px 24px',
                  borderRadius: '16px',
                  backgroundColor: '#ffffff',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
                  marginBottom: '28px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    marginBottom: '6px',
                  }}
                >
                  <div
                    style={{
                      width: 9,
                      height: 9,
                      borderRadius: '50%',
                      backgroundColor: '#dc2626',
                      boxShadow: '0 0 10px rgba(220,38,38,0.4)',
                    }}
                  />
                  <span
                    style={{
                      fontSize: '0.85rem',
                      fontWeight: 800,
                      color: '#dc2626',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                    }}
                  >
                    {currentStage.label}
                  </span>
                </div>
                <p style={{ fontSize: '0.9rem', color: '#4b5563', lineHeight: 1.6, margin: 0 }}>
                  {currentStage.desc}
                </p>
              </div>

              {/* Stage progress dots */}
              <div style={{ display: 'flex', gap: '8px', marginBottom: '36px' }}>
                {STAGES.map((s) => (
                  <div
                    key={`stage-bar-${s.name}`}
                    style={{
                      height: '5px',
                      flex: 1,
                      borderRadius: '4px',
                      backgroundColor: p >= s.prog ? '#dc2626' : '#e2e8f0',
                      transition: 'background-color 0.4s ease',
                    }}
                  />
                ))}
              </div>

              {/* Feature grid */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  {
                    icon: <Layers size={15} />,
                    color: '#dc2626',
                    label: 'Flat Shipping',
                    text: 'Ships flat, folds in seconds — maximum pallet density.',
                  },
                  {
                    icon: <CheckCircle size={15} />,
                    color: '#00aeef',
                    label: 'BOBST Swiss Die-Cutting',
                    text: 'Undistorted blanks from BOBST SP Evoline 102 E.',
                  },
                  {
                    icon: <Sparkles size={15} />,
                    color: '#f59e0b',
                    label: 'Luxury Unboxing',
                    text: 'Interior CMYK + gold foil — premium consumer perception.',
                  },
                ].map((f) => (
                  <div
                    key={f.label}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '14px',
                      padding: '16px 18px',
                      borderRadius: '14px',
                      backgroundColor: '#ffffff',
                      border: '1px solid #e2e8f0',
                      boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
                    }}
                  >
                    <div
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: '10px',
                        backgroundColor: `${f.color}15`,
                        border: `1px solid ${f.color}30`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: f.color,
                        flexShrink: 0,
                      }}
                    >
                      {f.icon}
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: '0.88rem',
                          fontWeight: 700,
                          color: '#111827',
                          marginBottom: '2px',
                        }}
                      >
                        {f.label}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#6b7280', lineHeight: 1.5 }}>
                        {f.text}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT: 3D Box Viewport */}
            <div
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '480px',
              }}
            >
              {/* Ground shadow */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '60px',
                  left: '50%',
                  transform: `translateX(-50%) rotateX(80deg)`,
                  width: shadowW,
                  height: 100,
                  borderRadius: '50%',
                  backgroundColor: 'rgba(0,0,0,0.14)',
                  filter: `blur(${shadowBlur}px)`,
                  pointerEvents: 'none',
                  transition: 'all 0.15s linear',
                }}
              />

              {/* 3D scene */}
              <div
                style={{
                  perspective: '1100px',
                  perspectiveOrigin: '50% 50%',
                }}
              >
                <div
                  style={{
                    position: 'relative',
                    width: '240px',
                    height: '240px',
                    transformStyle: 'preserve-3d',
                    transform: `rotateX(${sceneRotX}deg) rotateY(${sceneRotY}deg)`,
                    transition: 'transform 0.12s linear',
                  }}
                >
                  {/* ── BACK / MAIN FACE ─────────────────────────── */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      backgroundColor: '#f0f4f8',
                      border: '2px solid #c8d3e0',
                      borderRadius: '4px',
                      transformStyle: 'preserve-3d',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'linear-gradient(145deg, #f4f6f8 0%, #e8f0f8 100%)',
                      boxShadow: 'inset 0 0 40px rgba(0,0,0,0.04)',
                    }}
                  >
                    {/* Die-cut marks visible early */}
                    {p < 0.45 && (
                      <div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          opacity: 1 - remap(p, 0.25, 0.45, 0, 1),
                          pointerEvents: 'none',
                        }}
                      >
                        <div
                          style={{
                            position: 'absolute',
                            top: 8,
                            left: 8,
                            right: 8,
                            display: 'flex',
                            justifyContent: 'space-between',
                            fontSize: '0.58rem',
                            color: '#9ca3af',
                            fontFamily: 'monospace',
                          }}
                        >
                          <span>⌖ REG-MK 01</span>
                          <span>DIE 2pt CF</span>
                        </div>
                        {/* Score lines */}
                        {[80, 160].map((x) => (
                          <div
                            key={x}
                            style={{
                              position: 'absolute',
                              top: 0,
                              left: x,
                              width: '1px',
                              height: '100%',
                              background:
                                'repeating-linear-gradient(to bottom, #9ca3af 0, #9ca3af 4px, transparent 4px, transparent 8px)',
                              opacity: 0.4,
                            }}
                          />
                        ))}
                        {[80, 160].map((y) => (
                          <div
                            key={y}
                            style={{
                              position: 'absolute',
                              top: y,
                              left: 0,
                              height: '1px',
                              width: '100%',
                              background:
                                'repeating-linear-gradient(to right, #9ca3af 0, #9ca3af 4px, transparent 4px, transparent 8px)',
                              opacity: 0.4,
                            }}
                          />
                        ))}
                      </div>
                    )}

                    {/* Interior branding (reveals during unbox) */}
                    <div
                      style={{
                        textAlign: 'center',
                        padding: '16px',
                        opacity: interiorOpacity,
                        transition: 'opacity 0.3s ease',
                      }}
                    >
                      <img
                        src="/assets/logo/kolli-logo.png"
                        alt="Kolli Graphics"
                        style={{ height: 36, width: 'auto', objectFit: 'contain', marginBottom: 8 }}
                      />
                      <div
                        style={{
                          fontSize: '0.78rem',
                          fontWeight: 800,
                          color: '#111827',
                          letterSpacing: '0.04em',
                        }}
                      >
                        PREMIUM PACKAGING
                      </div>
                      <div style={{ fontSize: '0.65rem', color: '#6b7280', marginTop: 2 }}>
                        Offset Lithography • Full UV
                      </div>
                      {p > 0.9 && (
                        <div
                          style={{
                            marginTop: 10,
                            padding: '4px 10px',
                            borderRadius: 4,
                            background: 'linear-gradient(135deg,#ffd700 0%,#b8860b 100%)',
                            color: '#000',
                            fontSize: '0.6rem',
                            fontWeight: 800,
                            letterSpacing: '0.04em',
                            boxShadow: '0 2px 10px rgba(212,175,55,0.5)',
                          }}
                        >
                          ★ AUTHENTIC CRAFTSMANSHIP ★
                        </div>
                      )}
                    </div>
                  </div>

                  {/* ── LEFT WALL ───────────────────────────────────── */}
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '160px',
                      height: '240px',
                      background: 'linear-gradient(to right, #dce6f0 0%, #eaf1f8 100%)',
                      border: `1.5px ${p < 0.15 ? 'dashed' : 'solid'} #b8c8d8`,
                      transformOrigin: 'left center',
                      transform: `rotateY(${leftWallAngle}deg)`,
                      transition: 'transform 0.12s linear',
                      transformStyle: 'preserve-3d',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow:
                        leftWallAngle > 30 ? 'inset -12px 0 24px rgba(0,0,0,0.07)' : 'none',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '0.62rem',
                        fontWeight: 700,
                        color: '#9ca3af',
                        transform: 'rotate(-90deg)',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      SIDE PANEL · CREASE 1.4pt
                    </span>
                  </div>

                  {/* ── RIGHT WALL ──────────────────────────────────── */}
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      width: '160px',
                      height: '240px',
                      background: 'linear-gradient(to left, #dce6f0 0%, #eaf1f8 100%)',
                      border: `1.5px ${p < 0.15 ? 'dashed' : 'solid'} #b8c8d8`,
                      transformOrigin: 'right center',
                      transform: `rotateY(${-rightWallAngle}deg)`,
                      transition: 'transform 0.12s linear',
                      transformStyle: 'preserve-3d',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow:
                        rightWallAngle > 30 ? 'inset 12px 0 24px rgba(0,0,0,0.07)' : 'none',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '0.62rem',
                        fontWeight: 700,
                        color: '#9ca3af',
                        transform: 'rotate(90deg)',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      GLUE FLAP ATTACH
                    </span>
                  </div>

                  {/* ── BOTTOM FLAP ─────────────────────────────────── */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      width: '240px',
                      height: '150px',
                      background: 'linear-gradient(to top, #ccd8e4 0%, #dce6f0 100%)',
                      border: `1.5px ${p < 0.25 ? 'dashed' : 'solid'} #a8b8c8`,
                      transformOrigin: 'bottom center',
                      transform: `rotateX(${-bottomFlapAngle}deg)`,
                      transition: 'transform 0.12s linear',
                      transformStyle: 'preserve-3d',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <span style={{ fontSize: '0.65rem', fontWeight: 700, color: '#6b7280' }}>
                      {bottomFlapAngle > 60 ? 'LOCK-BOTTOM INTERLOCKED ✓' : 'BOTTOM FLAP'}
                    </span>
                  </div>

                  {/* ── TOP LID ──────────────────────────────────────── */}
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '240px',
                      height: '150px',
                      background: goldBadgeVisible
                        ? 'linear-gradient(145deg, #ffffff 0%, #fefdf6 100%)'
                        : 'linear-gradient(145deg, #ffffff 0%, #f4f6f8 100%)',
                      border: `1.5px ${p < 0.25 ? 'dashed' : 'solid'} #c8d4e0`,
                      borderRadius: '4px 4px 0 0',
                      transformOrigin: 'top center',
                      transform: `rotateX(${topLidAngle}deg)`,
                      transition: 'transform 0.12s linear',
                      transformStyle: 'preserve-3d',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 6,
                      boxShadow: topLidAngle < 20 ? '0 10px 30px rgba(0,0,0,0.18)' : 'none',
                    }}
                  >
                    <div
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: '50%',
                        background:
                          'linear-gradient(135deg,#ffd700 0%,#b8860b 45%,#fff2a3 75%,#daa520 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 14px rgba(212,175,55,0.45)',
                      }}
                    >
                      <Sparkles size={22} color="#4a2c00" />
                    </div>
                    <span
                      style={{
                        fontSize: '0.7rem',
                        fontWeight: 800,
                        color: '#111827',
                        letterSpacing: '0.04em',
                      }}
                    >
                      KOLLI GRAPHICS
                    </span>
                    <span
                      style={{ fontSize: '0.58rem', color: '#9ca3af', letterSpacing: '0.06em' }}
                    >
                      HOT FOIL STAMPED
                    </span>
                  </div>
                </div>
              </div>

              {/* Scroll hint (only at 0%) */}
              {p < 0.05 && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 6,
                    color: '#4b5563',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                  }}
                >
                  <div className="scroll-hint-arrow" />
                  Scroll to fold
                </motion.div>
              )}
            </div>
          </div>

          {/* Progress bar at bottom */}
          <div
            style={{
              position: 'absolute',
              bottom: 32,
              left: 24,
              right: 24,
              height: 4,
              borderRadius: 4,
              backgroundColor: '#e2e8f0',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                height: '100%',
                width: `${p * 100}%`,
                background: 'linear-gradient(to right, #00aeef, #ec008c, #f59e0b, #dc2626)',
                borderRadius: 4,
                transition: 'width 0.1s linear',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
