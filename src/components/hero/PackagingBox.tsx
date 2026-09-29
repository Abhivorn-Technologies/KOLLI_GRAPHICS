import React from 'react'

interface Props {
  progress: number
  stage: number
  stageProgress: number
}

const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v))
const lerp = (a: number, b: number, t: number) => a + (b - a) * t

export const PackagingBox: React.FC<Props> = ({ progress, stage, stageProgress }) => {
  const p = progress

  // ── Stage values ────────────────────────────────────────────────────────
  const designLinesOpacity = clamp(stage >= 1 ? (stage === 1 ? stageProgress * 2.5 : 1) : 0)
  const printLayerC  = clamp(stage >= 2 ? (stage === 2 ? stageProgress * 3 : 1) : 0)
  const printLayerM  = clamp(stage >= 2 ? (stage === 2 ? Math.max(0, stageProgress - 0.2) * 5 : 1) : 0)
  const printLayerY  = clamp(stage >= 2 ? (stage === 2 ? Math.max(0, stageProgress - 0.45) * 5 : 1) : 0)
  const printLayerK  = clamp(stage >= 2 ? (stage === 2 ? Math.max(0, stageProgress - 0.65) * 5 : 1) : 0)
  const dieCutOpacity = clamp(stage >= 3 ? (stage === 3 ? stageProgress * 3 : 1) : 0)
  const embossProgress = clamp(stage === 4 ? stageProgress : stage > 4 ? 1 : 0)
  const foilProgress = clamp(stage === 5 ? stageProgress : stage > 5 ? 1 : 0)
  const foilX = lerp(-110, 120, foilProgress)
  const foldProgress = clamp(stage === 6 ? stageProgress : stage > 6 ? 1 : 0)
  const boxProgress  = clamp(stage === 7 ? stageProgress : stage > 7 ? 1 : 0)
  const openProgress = clamp(stage === 8 ? stageProgress : stage >= 9 ? 1 : 0)
  const revealProgress = clamp(stage === 9 ? stageProgress : 0)

  // ── Camera scale ─────────────────────────────────────────────────────────
  const scale = (() => {
    if (p < 0.1) return 1.0
    if (p < 0.32) return lerp(1.0, 1.08, (p - 0.1) / 0.22)
    if (p < 0.44) return lerp(1.08, 1.14, (p - 0.32) / 0.12)
    if (p < 0.64) return lerp(1.14, 0.96, (p - 0.44) / 0.2)
    if (p < 0.87) return lerp(0.96, 1.02, (p - 0.64) / 0.23)
    return lerp(1.02, 1.08, (p - 0.87) / 0.13)
  })()

  // ── Box geometry ─────────────────────────────────────────────────────────
  const BW = 220   // front/back width
  const BH = 270   // front/back height
  const BD = 80    // depth (side panel width)

  const isBox = foldProgress > 0.5 || boxProgress > 0

  // 3D box angles
  const boxRotX = lerp(0, 16, boxProgress)
  const boxRotY = lerp(-18, -32, boxProgress)
  const topFlapAngle = lerp(0, -105, openProgress)

  // Flat sheet gentle tilt on entry
  const flatTilt = Math.min(1, p * 10)

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        perspective: '1200px',
        perspectiveOrigin: '50% 48%',
      }}
    >
      {/* Center wrapper — scales with camera */}
      <div style={{ transform: `scale(${scale})`, transformStyle: 'preserve-3d' }}>

        {/* ── FLAT DIELINE (stages 0–5, transition out at 6) ── */}
        <div style={{
          display: isBox ? 'none' : 'block',
          position: 'relative',
          width: BW + BD * 2,
          height: BH + BD,
          transformStyle: 'preserve-3d',
          transform: `rotateX(${lerp(0, 10, flatTilt)}deg) rotateY(${lerp(0, 5, flatTilt)}deg)`,
        }}>
          {/* Main face */}
          <div style={{
            position: 'absolute', left: BD, top: 0,
            width: BW, height: BH,
            backgroundColor: '#f7f4ee',
            borderRadius: '3px',
            overflow: 'hidden',
            boxShadow: '0 28px 70px rgba(0,0,0,0.38), 0 8px 24px rgba(0,0,0,0.2)',
          }}>
            {/* Grain */}
            <div style={{
              position: 'absolute', inset: 0,
              backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.014) 0px, transparent 1px, transparent 10px)',
            }} />

            {/* Stage 1: pre-press fold lines */}
            <div style={{ opacity: designLinesOpacity, position: 'absolute', inset: 0 }}>
              {[0.22, 0.5, 0.78].map(pos => (
                <div key={pos} style={{ position: 'absolute', left: 0, right: 0, top: `${pos * 100}%`,
                  borderTop: '1.5px dashed rgba(220,38,38,0.6)' }} />
              ))}
              {[0.25, 0.75].map(pos => (
                <div key={pos} style={{ position: 'absolute', top: 0, bottom: 0, left: `${pos * 100}%`,
                  borderLeft: '1.5px dashed rgba(0,174,239,0.55)' }} />
              ))}
              <div style={{ position: 'absolute', inset: 0,
                backgroundImage: 'radial-gradient(circle, rgba(220,38,38,0.22) 1.5px, transparent 1.5px)',
                backgroundSize: '28px 28px' }} />
            </div>

            {/* Stage 2: CMYK printing layers */}
            <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
              <div style={{ position: 'absolute', inset: 0, opacity: printLayerC * 0.3,
                background: 'radial-gradient(ellipse at 28% 35%, #00aeef 0%, transparent 65%)',
                mixBlendMode: 'multiply' }} />
              <div style={{ position: 'absolute', inset: 0, opacity: printLayerM * 0.28,
                background: 'radial-gradient(ellipse at 72% 60%, #ec008c 0%, transparent 65%)',
                mixBlendMode: 'multiply' }} />
              <div style={{ position: 'absolute', inset: 0, opacity: printLayerY * 0.25,
                background: 'radial-gradient(ellipse at 52% 25%, #f59e0b 0%, transparent 62%)',
                mixBlendMode: 'multiply' }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '34%',
                opacity: printLayerK * 0.95,
                background: 'linear-gradient(to top, rgba(17,24,39,0.92) 0%, rgba(17,24,39,0.3) 65%, transparent 100%)' }} />
              {printLayerK > 0.3 && (
                <div style={{ position: 'absolute', bottom: '14%', left: '50%',
                  transform: 'translateX(-50%)', display: 'flex', gap: 7, opacity: printLayerK }}>
                  {['#00aeef','#ec008c','#f59e0b'].map(c => (
                    <div key={c} style={{ width: 9, height: 9, borderRadius: '50%', backgroundColor: c }} />
                  ))}
                </div>
              )}
            </div>

            {/* Stage 3: die cut border */}
            <div style={{ position: 'absolute', inset: '5px', borderRadius: '2px',
              opacity: dieCutOpacity,
              border: '2px solid rgba(220,38,38,0.7)',
              boxShadow: 'inset 0 0 0 8px rgba(220,38,38,0.06)',
              pointerEvents: 'none' }} />
            {dieCutOpacity > 0.05 && (
              <div style={{ position: 'absolute', top: 8, left: 8, width: 16, height: 16,
                opacity: dieCutOpacity, borderTop: '2.5px solid #dc2626', borderLeft: '2.5px solid #dc2626' }} />
            )}
            {dieCutOpacity > 0.05 && (
              <div style={{ position: 'absolute', bottom: 8, right: 8, width: 16, height: 16,
                opacity: dieCutOpacity, borderBottom: '2.5px solid #dc2626', borderRight: '2.5px solid #dc2626' }} />
            )}

            {/* Stage 4: emboss */}
            {embossProgress > 0 && (
              <div style={{ position: 'absolute', inset: 0, opacity: embossProgress,
                background: `radial-gradient(ellipse at 36% 30%, rgba(255,255,255,${embossProgress * 0.6}) 0%, transparent 48%),
                             radial-gradient(ellipse at 64% 70%, rgba(0,0,0,${embossProgress * 0.12}) 0%, transparent 48%)` }} />
            )}

            {/* Stage 5: foil sweep */}
            {foilProgress > 0 && (
              <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
                <div style={{ position: 'absolute', top: 0, bottom: 0, left: `${foilX}%`, width: '35%',
                  background: 'linear-gradient(108deg, transparent 0%, rgba(255,215,0,0.06) 20%, rgba(255,255,255,0.62) 50%, rgba(212,175,55,0.1) 80%, transparent 100%)',
                  transform: 'skewX(-14deg)' }} />
                {foilProgress > 0.6 && (
                  <div style={{ position: 'absolute', top: '14%', left: '10%', right: '10%', height: '20%',
                    opacity: clamp((foilProgress - 0.6) / 0.4),
                    background: 'linear-gradient(135deg, #d97706 0%, #fcd34d 22%, #92400e 48%, #fde68a 72%, #b45309 100%)',
                    borderRadius: '3px', boxShadow: '0 3px 12px rgba(217,119,6,0.5)' }} />
                )}
              </div>
            )}

            {/* Always visible sheen */}
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none',
              background: 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 55%)' }} />
          </div>

          {/* Side flaps */}
          <div style={{ position: 'absolute', left: 0, top: BD / 2, width: BD, height: BH - BD,
            backgroundColor: '#eae6dc', opacity: 0.75,
            borderRight: '1px dashed rgba(220,38,38,0.35)',
            boxShadow: 'inset -6px 0 14px rgba(0,0,0,0.09)' }} />
          <div style={{ position: 'absolute', right: 0, top: BD / 2, width: BD, height: BH - BD,
            backgroundColor: '#eae6dc', opacity: 0.75,
            borderLeft: '1px dashed rgba(0,174,239,0.35)',
            boxShadow: 'inset 6px 0 14px rgba(0,0,0,0.09)' }} />
          <div style={{ position: 'absolute', left: BD, top: -(BD / 2), width: BW, height: BD,
            backgroundColor: '#e4e0d6', opacity: 0.7,
            borderBottom: '1px dashed rgba(220,38,38,0.3)' }} />
          <div style={{ position: 'absolute', left: BD, bottom: -(BD / 2), width: BW, height: BD,
            backgroundColor: '#e4e0d6', opacity: 0.7,
            borderTop: '1px dashed rgba(0,174,239,0.3)' }} />

          {/* Shadow */}
          <div style={{ position: 'absolute', bottom: -55, left: '5%', right: '5%', height: 45,
            background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.28) 0%, transparent 70%)',
            filter: 'blur(10px)' }} />
        </div>

        {/* ── 3D BOX (stages 6+) ─────────────────────────────────── */}
        {isBox && (
          <div style={{
            position: 'relative', width: BW, height: BH,
            transformStyle: 'preserve-3d',
            transform: `rotateX(${boxRotX}deg) rotateY(${boxRotY}deg)`,
          }}>
            {/* Front */}
            <div style={{ position: 'absolute', inset: 0, backgroundColor: '#f7f4ee',
              transform: `translateZ(${BD / 2}px)`, backfaceVisibility: 'hidden',
              borderRadius: '2px', overflow: 'hidden',
              boxShadow: '0 0 0 1px rgba(0,0,0,0.06)' }}>
              <div style={{ position: 'absolute', inset: 0,
                background: 'linear-gradient(135deg, rgba(255,255,255,0.14) 0%, transparent 55%)' }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '30%',
                background: 'linear-gradient(to top, rgba(17,24,39,0.88) 0%, transparent 100%)' }} />
              <div style={{ position: 'absolute', top: '14%', left: '10%', right: '10%', height: '18%',
                background: 'linear-gradient(135deg, #d97706 0%, #fcd34d 22%, #92400e 48%, #fde68a 72%, #b45309 100%)',
                borderRadius: '2px', opacity: 0.9, boxShadow: '0 2px 10px rgba(217,119,6,0.4)' }} />
              <div style={{ position: 'absolute', bottom: '13%', left: '50%',
                transform: 'translateX(-50%)', display: 'flex', gap: 7 }}>
                {['#00aeef','#ec008c','#f59e0b'].map(c => (
                  <div key={c} style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: c }} />
                ))}
              </div>
            </div>
            {/* Back */}
            <div style={{ position: 'absolute', inset: 0, backgroundColor: '#ece9e1',
              transform: `rotateY(180deg) translateZ(${BD / 2}px)`, backfaceVisibility: 'hidden' }}>
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(0,0,0,0.03) 0%, transparent 100%)' }} />
            </div>
            {/* Right */}
            <div style={{ position: 'absolute', width: BD, height: BH, left: (BW - BD) / 2,
              backgroundColor: '#e2dfd5', transform: `rotateY(90deg) translateZ(${BW / 2}px)`,
              backfaceVisibility: 'hidden',
              boxShadow: 'inset -5px 0 14px rgba(0,0,0,0.14)' }} />
            {/* Left */}
            <div style={{ position: 'absolute', width: BD, height: BH, left: (BW - BD) / 2,
              backgroundColor: '#e2dfd5', transform: `rotateY(-90deg) translateZ(${BW / 2}px)`,
              backfaceVisibility: 'hidden',
              boxShadow: 'inset 5px 0 14px rgba(0,0,0,0.14)' }} />
            {/* Bottom */}
            <div style={{ position: 'absolute', width: BW, height: BD, top: (BH - BD) / 2,
              backgroundColor: '#d5d2c8', transform: `rotateX(90deg) translateZ(${BH / 2}px)`,
              backfaceVisibility: 'hidden' }} />
            {/* Top flap */}
            <div style={{
              position: 'absolute', width: BW, height: BD + 4, top: (BH - BD) / 2 - 2,
              backgroundColor: '#e2dfd5',
              transformOrigin: '50% 0%',
              transform: `rotateX(-90deg) translateZ(${BH / 2}px) rotateX(${topFlapAngle}deg)`,
              backfaceVisibility: 'hidden',
              boxShadow: topFlapAngle < -18 ? '0 8px 28px rgba(0,0,0,0.28)' : 'none',
              overflow: 'hidden',
            }}>
              <div style={{ position: 'absolute', inset: 0,
                background: 'linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, transparent 100%)' }} />
            </div>
            {/* Inner glow when opening */}
            {openProgress > 0.22 && (
              <div style={{
                position: 'absolute', inset: 0, transformStyle: 'preserve-3d',
                opacity: clamp((openProgress - 0.22) / 0.45),
              }}>
                <div style={{ position: 'absolute', inset: 0, backgroundColor: '#fff8f0',
                  transform: `translateZ(${BD / 2 - 8}px)`, backfaceVisibility: 'hidden' }}>
                  <div style={{ position: 'absolute', inset: 0,
                    background: 'radial-gradient(ellipse at 50% 0%, rgba(255,215,0,0.18) 0%, transparent 72%)' }} />
                </div>
              </div>
            )}
            {/* Shadow */}
            <div style={{ position: 'absolute', bottom: -BH / 2 - 8, left: '8%', right: '8%', height: 55,
              background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.32) 0%, transparent 72%)',
              filter: 'blur(12px)', transform: 'rotateX(90deg)' }} />
          </div>
        )}
      </div>

      {/* ── BRAND REVEAL ─────────────────────────────────────────── */}
      {revealProgress > 0 && (
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          opacity: clamp(revealProgress * 3),
          zIndex: 10,
          pointerEvents: revealProgress > 0.5 ? 'auto' : 'none',
          background: `radial-gradient(ellipse at 50% 50%, rgba(220,38,38,0.08) 0%, transparent 70%)`,
        }}>
          <div style={{ display: 'flex', gap: 13, marginBottom: 30 }}>
            {['#00aeef','#ec008c','#f59e0b','#111827'].map((c, i) => (
              <div key={c} style={{ width: 14, height: 14, borderRadius: '50%', backgroundColor: c,
                transform: `scale(${Math.min(1, revealProgress * 3)})`,
                transition: `transform 0.5s ease ${i * 0.07}s` }} />
            ))}
          </div>
          <h1 style={{ fontSize: 'clamp(2.6rem, 7vw, 5.5rem)', fontWeight: 900, color: '#ffffff',
            letterSpacing: '0.07em', margin: '0 0 12px 0',
            fontFamily: "'DM Serif Display', Georgia, serif",
            textShadow: '0 4px 40px rgba(0,0,0,0.6)',
            transform: `translateY(${lerp(40, 0, Math.min(1, revealProgress * 2.5))}px)` }}>
            KOLLI GRAPHICS
          </h1>
          <p style={{ fontSize: 'clamp(0.68rem, 1.4vw, 0.92rem)',
            color: 'rgba(255,255,255,0.65)', letterSpacing: '0.24em', textTransform: 'uppercase',
            fontFamily: "'DM Sans', sans-serif", margin: '0 0 48px 0',
            opacity: clamp((revealProgress - 0.28) / 0.72) }}>
            Quality &amp; Customer First — Since 2009
          </p>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center',
            opacity: clamp((revealProgress - 0.55) / 0.45) }}>
            <a href="/capabilities" style={{ display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '14px 30px', borderRadius: 999, backgroundColor: '#dc2626', color: '#ffffff',
              fontSize: '0.875rem', fontWeight: 700, textDecoration: 'none', letterSpacing: '0.04em',
              boxShadow: '0 8px 28px rgba(220,38,38,0.4)', fontFamily: "'DM Sans', sans-serif" }}>
              Explore Capabilities
            </a>
            <a href="/estimating" style={{ display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '14px 30px', borderRadius: 999,
              backgroundColor: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.22)', color: '#ffffff',
              fontSize: '0.875rem', fontWeight: 700, textDecoration: 'none', letterSpacing: '0.04em',
              fontFamily: "'DM Sans', sans-serif" }}>
              Request Estimate
            </a>
          </div>
        </div>
      )}
    </div>
  )
}
