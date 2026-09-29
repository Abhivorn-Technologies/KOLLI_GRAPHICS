import React from 'react'
import { motion } from 'framer-motion'
import { Building2, Award, Zap, ShieldCheck } from 'lucide-react'

export const HomeMetricsBanner: React.FC = () => {
  const stats = [
    {
      icon: <Building2 size={24} style={{ color: '#dc2626' }} />,
      glowColor: 'rgba(220, 38, 38, 0.25)',
      borderColor: 'rgba(220, 38, 38, 0.4)',
      value: '43,000+',
      label: 'SQ. FT. FACILITY',
      sub: 'Cherlapally Works, Hyderabad',
    },
    {
      icon: <Award size={24} style={{ color: '#00aeef' }} />,
      glowColor: 'rgba(0, 174, 239, 0.25)',
      borderColor: 'rgba(0, 174, 239, 0.4)',
      value: '15+ Years',
      label: 'PACKAGING EXCELLENCE',
      sub: 'Est. 2009 · Quality First',
    },
    {
      icon: <Zap size={24} style={{ color: '#f59e0b' }} />,
      glowColor: 'rgba(245, 158, 11, 0.25)',
      borderColor: 'rgba(245, 158, 11, 0.4)',
      value: '18,000',
      label: 'SHEETS/HR CAPACITY',
      sub: 'Heidelberg & Komori UV Presses',
    },
    {
      icon: <ShieldCheck size={24} style={{ color: '#ec008c' }} />,
      glowColor: 'rgba(236, 0, 140, 0.25)',
      borderColor: 'rgba(236, 0, 140, 0.4)',
      value: '100%',
      label: 'ZERO-ERROR INSPECTION',
      sub: 'TubeScan Automatic Vision System',
    },
  ]

  return (
    <div
      style={{
        backgroundColor: '#111827',
        color: '#ffffff',
        padding: '60px 0',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 24,
            alignItems: 'center',
          }}
        >
          {stats.map((st, i) => (
            <motion.div
              key={st.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.12, duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
              whileHover={{
                scale: 1.035,
                y: -4,
                boxShadow: `0 12px 30px -5px ${st.glowColor}`,
                borderColor: st.borderColor,
                backgroundColor: 'rgba(255,255,255,0.06)',
              }}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 16,
                padding: '22px 24px',
                borderRadius: '14px',
                backgroundColor: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                cursor: 'pointer',
                transition: 'border-color 0.3s ease, background-color 0.3s ease',
              }}
            >
              <motion.div
                whileHover={{ rotate: 10, scale: 1.15 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                style={{
                  padding: 12,
                  borderRadius: 12,
                  backgroundColor: 'rgba(255,255,255,0.06)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                {st.icon}
              </motion.div>

              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.85rem',
                    fontWeight: 700,
                    lineHeight: 1.1,
                    color: '#ffffff',
                  }}
                >
                  {st.value}
                </div>
                <div
                  style={{
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: '#dc2626',
                    marginTop: 4,
                  }}
                >
                  {st.label}
                </div>
                <div style={{ fontSize: '0.78rem', color: '#9ca3af', marginTop: 2 }}>
                  {st.sub}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
