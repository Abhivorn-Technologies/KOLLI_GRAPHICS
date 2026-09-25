import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, MessageSquare, ChevronDown } from 'lucide-react'
import { COMPANY_INFO } from '@data/company'
import { HeroBoxAnimation } from '../animations/HeroBoxAnimation'

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11, delayChildren: 0.18 } },
}
const up = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
}
const line = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
}

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
        { x: '8%',  y: '24%', c: '#00aeef', s: 5 },
        { x: '90%', y: '18%', c: '#ec008c', s: 4 },
        { x: '4%',  y: '74%', c: '#f59e0b', s: 4 },
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
        {/* Two-column grid: text left, 3D box right */}
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
                tirelessly to stand above our competitors to ensure that we meet your deadlines &amp;
                deliver products that exceed customers' expectations. Our motto is{' '}
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
              Offset lithography · Folding cartons · Flexo labels · Luxury finishing.
              Operating from our{' '}
              <strong style={{ color: '#374151' }}>43,000 sq.ft. Hyderabad facility</strong>, 24/7.
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
                { n: '2009',   unit: '',       label: 'Year founded' },
                { n: '< 0.5', unit: 'mm',     label: 'Tubescan inspection' },
              ].map((s, i, arr) => (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    paddingRight: i < arr.length - 1 ? 16 : 0,
                    paddingLeft:  i > 0 ? 16 : 0,
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
                  <div style={{ fontSize: '0.68rem', color: '#9ca3af', marginTop: 3, fontWeight: 500 }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── RIGHT: 3D Box Animation ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'relative',
              borderRadius: 20,
              background: 'linear-gradient(145deg, rgba(255,255,255,0.9) 0%, rgba(244,248,252,0.95) 100%)',
              border: '1px solid rgba(220,38,38,0.1)',
              boxShadow: '0 4px 32px rgba(0,0,0,0.07), 0 1px 4px rgba(0,0,0,0.04)',
              backdropFilter: 'blur(10px)',
              overflow: 'hidden',
              minHeight: 460,
            }}
          >
            {/* Corner label */}
            <div
              style={{
                position: 'absolute',
                top: 14,
                right: 14,
                padding: '3px 10px',
                borderRadius: 6,
                backgroundColor: 'rgba(220,38,38,0.07)',
                border: '1px solid rgba(220,38,38,0.14)',
                fontSize: '0.6rem',
                fontWeight: 700,
                color: '#dc2626',
                letterSpacing: '0.07em',
                textTransform: 'uppercase',
                zIndex: 10,
              }}
            >
              Live 3D Preview
            </div>

            <HeroBoxAnimation />
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

