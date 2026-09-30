import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, MessageSquare, ChevronDown } from 'lucide-react'
import { COMPANY_INFO } from '@data/company'
import heroBg from '@/assets/images/image.png'

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11, delayChildren: 0.18 } },
}
const up = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
}
const line = {
  hidden: { scaleX: 0 },
  show: {
    scaleX: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
}

const STAGE_LABELS = [
  'Die-Cut Flat Sheet',
  'Side Walls Folding',
  'Front Panel Closing',
  'Base Lock Engaging',
  'Tuck-Top Sealing',
  'Box Complete',
  'Unboxing Reveal',
]
const STAGE_DURATION_MS = 2600

function CMYKDots() {
  const colors = ['#00aeef', '#ec008c', '#f59e0b', '#111827']
  return (
    <span style={{ display: 'inline-flex', gap: 5, alignItems: 'center' }}>
      {colors.map((c, i) => (
        <motion.span
          key={i}
          style={{
            display: 'inline-block',
            width: 7,
            height: 7,
            borderRadius: '50%',
            backgroundColor: c,
          }}
          animate={{ scale: [1, 1.45, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.28, ease: 'easeInOut' }}
        />
      ))}
    </span>
  )
}

function HeroImagePanel() {
  const [stageIdx, setStageIdx] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let startTime: number | null = null
    let raf: number

    function tick(now: number) {
      if (startTime === null) startTime = now
      const elapsed = now - startTime
      const cycleProgress = (elapsed % STAGE_DURATION_MS) / STAGE_DURATION_MS
      setProgress(cycleProgress)
      const idx = Math.floor(elapsed / STAGE_DURATION_MS) % STAGE_LABELS.length
      setStageIdx(idx)
      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  const totalProgress =
    (stageIdx + progress) / STAGE_LABELS.length

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        minHeight: 460,
        overflow: 'hidden',
        borderRadius: 20,
      }}
    >
      {/* Background image */}
      <img
        src={heroBg}
        alt="Kolli Graphics Hyderabad facility"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
        }}
      />

      {/* Dark gradient overlay — heavier at bottom for text legibility */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.42) 55%, rgba(0,0,0,0.78) 100%)',
        }}
      />

      {/* Top-left: facility badge */}
      <div
        style={{
          position: 'absolute',
          top: 16,
          left: 16,
          display: 'flex',
          alignItems: 'center',
          gap: 7,
          padding: '5px 13px',
          borderRadius: 999,
          backgroundColor: 'rgba(255,255,255,0.12)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255,255,255,0.22)',
        }}
      >
        <div
          style={{
            width: 7,
            height: 7,
            borderRadius: '50%',
            backgroundColor: '#4ade80',
            boxShadow: '0 0 8px #4ade80cc',
          }}
        />
        <span
          style={{
            fontSize: '0.6rem',
            fontWeight: 700,
            color: '#fff',
            letterSpacing: '0.07em',
            textTransform: 'uppercase',
          }}
        >
          Hyderabad Facility · 43,000 sq.ft.
        </span>
      </div>

      {/* Top-right: CMYK corner dots */}
      <div
        style={{
          position: 'absolute',
          top: 16,
          right: 16,
          display: 'flex',
          gap: 5,
          alignItems: 'center',
        }}
      >
        {['#00aeef', '#ec008c', '#f59e0b', '#111827'].map((c) => (
          <div
            key={c}
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor: c,
              boxShadow: `0 0 6px ${c}99`,
              border: '1.5px solid rgba(255,255,255,0.4)',
            }}
          />
        ))}
      </div>

      {/* Bottom overlay — dynamic text area */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '28px 24px 24px',
        }}
      >
        {/* Animated stage label */}
        <div style={{ minHeight: 52, marginBottom: 14, overflow: 'hidden' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={stageIdx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Step counter */}
              <div
                style={{
                  fontSize: '0.6rem',
                  fontWeight: 600,
                  color: 'rgba(255,255,255,0.5)',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  marginBottom: 6,
                }}
              >
                Stage {stageIdx + 1} / {STAGE_LABELS.length}
              </div>
              {/* Main label */}
              <div
                style={{
                  fontSize: '1.35rem',
                  fontWeight: 800,
                  color: '#ffffff',
                  letterSpacing: '0.02em',
                  lineHeight: 1.15,
                  textShadow: '0 2px 12px rgba(0,0,0,0.5)',
                }}
              >
                {STAGE_LABELS[stageIdx]}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress bar — full cycle across all stages */}
        <div
          style={{
            height: 3,
            borderRadius: 3,
            backgroundColor: 'rgba(255,255,255,0.18)',
            overflow: 'hidden',
          }}
        >
          <motion.div
            style={{
              height: '100%',
              background: 'linear-gradient(to right, #00aeef, #ec008c, #f59e0b, #dc2626)',
              borderRadius: 3,
              originX: 0,
            }}
            animate={{ scaleX: totalProgress }}
            transition={{ duration: 0.15, ease: 'linear' }}
          />
        </div>

        {/* Sub-label dots row */}
        <div
          style={{
            display: 'flex',
            gap: 5,
            marginTop: 10,
            alignItems: 'center',
          }}
        >
          {STAGE_LABELS.map((_, i) => (
            <div
              key={i}
              style={{
                flex: i === stageIdx ? 2 : 1,
                height: 3,
                borderRadius: 3,
                backgroundColor: i <= stageIdx ? '#dc2626' : 'rgba(255,255,255,0.2)',
                transition: 'flex 0.4s ease, background-color 0.3s ease',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export const HeroSection: React.FC = () => {
  return (
    <section
      id="welcome"
      className="paper-grid-bg"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        paddingTop: 'calc(var(--nav-height) + 40px)',
        paddingBottom: '60px',
        overflow: 'hidden',
      }}
    >
      {/* Subtle brand glow — right side */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 55% 75% at 85% 50%, rgba(220,38,38,0.05) 0%, transparent 68%)',
          pointerEvents: 'none',
        }}
      />

      {/* Decorative rings */}
      <motion.div
        initial={{ opacity: 0, rotate: 12, scale: 0.85 }}
        animate={{ opacity: 1, rotate: 12, scale: 1 }}
        transition={{ duration: 1.4, delay: 0.3 }}
        style={{
          position: 'absolute',
          top: '8%',
          right: '-4%',
          width: 480,
          height: 480,
          borderRadius: 56,
          border: '1px solid rgba(220,38,38,0.08)',
          background: 'linear-gradient(135deg, rgba(220,38,38,0.02) 0%, rgba(0,174,239,0.02) 100%)',
          pointerEvents: 'none',
        }}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.8, delay: 0.6 }}
        style={{
          position: 'absolute',
          top: '14%',
          right: '0%',
          width: 370,
          height: 370,
          borderRadius: 44,
          border: '1px dashed rgba(220,38,38,0.06)',
          pointerEvents: 'none',
        }}
      />

      {/* Floating accent dots */}
      {[
        { x: '8%', y: '24%', c: '#00aeef', s: 5 },
        { x: '90%', y: '18%', c: '#ec008c', s: 4 },
        { x: '4%', y: '74%', c: '#f59e0b', s: 4 },
      ].map((d, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            left: d.x,
            top: d.y,
            width: d.s,
            height: d.s,
            borderRadius: '50%',
            backgroundColor: d.c,
            opacity: 0.2,
            pointerEvents: 'none',
          }}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 5 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }}
        />
      ))}

      <div className="container" style={{ position: 'relative', zIndex: 2, width: '100%' }}>
        {/* Two-column grid: text left, facility image right */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '48px',
            alignItems: 'center',
          }}
        >
          {/* ── LEFT: Text content ── */}
          <motion.div variants={stagger} initial="hidden" animate="show">
            {/* Eyebrow badge */}
            <motion.div variants={up} style={{ marginBottom: 18 }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '5px 15px',
                  borderRadius: 999,
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                }}
              >
                <CMYKDots />
                <span
                  style={{
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    color: '#dc2626',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                  }}
                >
                  Hyderabad · India · Est. 2009
                </span>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={up}
              style={{ lineHeight: 1.06, color: '#111827', marginBottom: 4 }}
            >
              Kolli Graphics
            </motion.h1>
            <motion.div variants={up} style={{ marginBottom: 20 }}>
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '1rem',
                  fontWeight: 600,
                  color: '#dc2626',
                  letterSpacing: '0.03em',
                }}
              >
                Private Limited
              </span>
            </motion.div>

            {/* Accent line */}
            <motion.div
              variants={line}
              style={{
                height: 2,
                width: 40,
                background: 'linear-gradient(to right, #dc2626, #dc2626)',
                borderRadius: 2,
                transformOrigin: 'left',
                marginBottom: 26,
              }}
            />

            {/* Founder quote */}
            <motion.div
              variants={up}
              style={{
                borderLeft: '3px solid #dc2626',
                paddingLeft: 16,
                marginBottom: 8,
              }}
            >
              <p
                style={{
                  fontSize: '0.9rem',
                  lineHeight: 1.76,
                  color: '#374151',
                  fontStyle: 'italic',
                  margin: 0,
                }}
              >
                "We are full committed service oriented premier finishing company to provide high
                quality craftsmanship and service in the timely manner. We stand by this and work
                tirelessly to stand above our competitors to ensure that we meet your deadlines
                &amp; deliver products that exceed customers' expectations. Our motto is{' '}
                <strong style={{ fontStyle: 'normal', color: '#111827' }}>
                  Quality &amp; Customer service first.
                </strong>
                "
              </p>
            </motion.div>
            <motion.p
              variants={up}
              style={{ fontSize: '0.78rem', color: '#9ca3af', marginBottom: 30, paddingLeft: 18 }}
            >
              — Ranga Reddy Kolli &amp; Parasurami Reddy Kolli, Founders
            </motion.p>

            {/* Service line */}
            <motion.p
              variants={up}
              style={{
                fontSize: '0.85rem',
                color: '#6b7280',
                lineHeight: 1.7,
                marginBottom: 32,
                maxWidth: 480,
              }}
            >
              Offset lithography · Folding cartons · Flexo labels · Luxury finishing. Operating from
              our <strong style={{ color: '#374151' }}>43,000 sq.ft. Hyderabad facility</strong>,
              24/7.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              variants={up}
              style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 40 }}
            >
              <motion.a
                href="#estimating"
                whileHover={{ y: -2, boxShadow: '0 8px 24px rgba(220,38,38,0.35)' }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 7,
                  padding: '10px 22px',
                  borderRadius: 999,
                  background: 'linear-gradient(135deg,#dc2626 0%,#b91c1c 100%)',
                  color: '#fff',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  textDecoration: 'none',
                  boxShadow: '0 4px 14px rgba(220,38,38,0.28)',
                }}
              >
                Request Estimate <ArrowRight size={14} />
              </motion.a>

              <motion.a
                href={`https://wa.me/91${COMPANY_INFO.phone}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 7,
                  padding: '10px 20px',
                  borderRadius: 999,
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  color: '#111827',
                  fontWeight: 500,
                  fontSize: '0.85rem',
                  textDecoration: 'none',
                }}
              >
                <MessageSquare size={13} color="#25D366" />
                WhatsApp Us
              </motion.a>

              <motion.a
                href="#company"
                whileHover={{ y: -2, color: '#dc2626' }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 7,
                  padding: '10px 20px',
                  borderRadius: 999,
                  border: '1px solid #e5e7eb',
                  color: '#6b7280',
                  fontWeight: 500,
                  fontSize: '0.85rem',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
              >
                Learn More →
              </motion.a>
            </motion.div>

            {/* Stats strip */}
            <motion.div
              variants={up}
              style={{
                display: 'flex',
                paddingTop: 18,
                borderTop: '1px solid #e5e7eb',
              }}
            >
              {[
                { n: '43,000', unit: 'sq.ft.', label: 'Modern Hyderabad facility' },
                { n: '40,000', unit: 'sq.ft.', label: '24/7 secured, CCTV' },
                { n: '2009', unit: '', label: 'Year founded' },
                { n: '< 0.5', unit: 'mm', label: 'Tubescan inspection' },
              ].map((s, i, arr) => (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    paddingRight: i < arr.length - 1 ? 16 : 0,
                    paddingLeft: i > 0 ? 16 : 0,
                    borderRight: i < arr.length - 1 ? '1px solid #e5e7eb' : 'none',
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'DM Serif Display', serif",
                      fontSize: '1.35rem',
                      fontWeight: 400,
                      color: '#111827',
                      lineHeight: 1,
                    }}
                  >
                    {s.n}
                    {s.unit && (
                      <span
                        style={{
                          fontSize: '0.62rem',
                          color: '#9ca3af',
                          marginLeft: 3,
                          fontFamily: 'Inter, sans-serif',
                          fontWeight: 500,
                        }}
                      >
                        {s.unit}
                      </span>
                    )}
                  </div>
                  <div
                    style={{ fontSize: '0.68rem', color: '#9ca3af', marginTop: 3, fontWeight: 500 }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── RIGHT: Facility image with dynamic text ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'relative',
              borderRadius: 20,
              boxShadow: '0 8px 40px rgba(0,0,0,0.18), 0 1px 4px rgba(0,0,0,0.06)',
              overflow: 'hidden',
              minHeight: 460,
            }}
          >
            <HeroImagePanel />
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: 22,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 3,
          color: '#d1d5db',
        }}
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ChevronDown size={18} />
        <span style={{ fontSize: '0.58rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          Scroll
        </span>
      </motion.div>
    </section>
  )
}
