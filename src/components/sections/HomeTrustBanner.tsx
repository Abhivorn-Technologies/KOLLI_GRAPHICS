import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ShieldCheck, Award, ArrowRight, FileText } from 'lucide-react'

export const HomeTrustBanner: React.FC = () => {
  return (
    <section
      style={{
        background: 'linear-gradient(135deg, #111827 0%, #1f2937 100%)',
        color: '#ffffff',
        padding: '95px 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Glow decorative background circle */}
      <div
        style={{
          position: 'absolute',
          top: '-20%',
          right: '-10%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(220, 38, 38, 0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: 40,
            alignItems: 'center',
          }}
        >
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '6px 14px',
                borderRadius: 999,
                backgroundColor: 'rgba(220, 38, 38, 0.15)',
                border: '1px solid rgba(220, 38, 38, 0.3)',
                color: '#ef4444',
                fontSize: '0.75rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom: 20,
              }}
            >
              <Award size={14} />
              <span>Founders' Motto & Quality Guarantee</span>
            </div>

            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 3.5vw, 3rem)',
                fontWeight: 600,
                lineHeight: 1.15,
                color: '#ffffff',
                marginBottom: 20,
              }}
            >
              "Customer Service & Quality <span style={{ color: '#dc2626' }}>First</span>"
            </h2>

            <p style={{ fontSize: '1rem', color: '#d1d5db', lineHeight: 1.7, marginBottom: 28 }}>
              As a valued customer of Kolli Graphics, you can be assured of doing business with a company that fosters a culture of openness, responsiveness, integrity, and absolute craftsmanship. We welcome an opportunity to show you what we can do for you.
            </p>

            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to="/estimating"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '14px 30px',
                    backgroundColor: '#dc2626',
                    color: '#ffffff',
                    fontWeight: 700,
                    fontSize: '0.875rem',
                    borderRadius: 6,
                    textDecoration: 'none',
                    boxShadow: '0 4px 18px rgba(220,38,38,0.4)',
                  }}
                >
                  <FileText size={16} />
                  <span>Request Packaging Estimate</span>
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to="/contact"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '14px 28px',
                    backgroundColor: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    color: '#ffffff',
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    borderRadius: 6,
                    textDecoration: 'none',
                  }}
                >
                  <span>Contact</span>
                  <ArrowRight size={16} />
                </Link>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            style={{
              backgroundColor: 'rgba(255,255,255,0.03)',
              borderRadius: 16,
              border: '1px solid rgba(255,255,255,0.08)',
              padding: 32,
              boxShadow: '0 12px 32px rgba(0,0,0,0.3)',
            }}
          >
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.25rem',
                color: '#ffffff',
                marginBottom: 20,
              }}
            >
              Certified Manufacturing Standards
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              {[
                { title: 'ISO 9001:2015 Quality System', desc: 'Strict multi-stage quality assurance protocol across all departments.' },
                { title: 'FSC® Certified Paperboard', desc: 'Sustainable, eco-friendly virgin kraft and recycled board substrates.' },
                { title: '24/7 CCTV Cleanroom Environment', desc: '40,000 sq. ft. secured access-controlled plant in Cherlapally, Hyderabad.' },
              ].map((item) => (
                <motion.div

                  key={item.title}
                  whileHover={{ x: 6 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  style={{ display: 'flex', gap: 14, cursor: 'default' }}
                >
                  <ShieldCheck size={22} style={{ color: '#00aeef', flexShrink: 0, marginTop: 2 }} />
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.92rem', color: '#f9fafb' }}>
                      {item.title}
                    </div>
                    <div style={{ fontSize: '0.82rem', color: '#9ca3af', marginTop: 2 }}>
                      {item.desc}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
