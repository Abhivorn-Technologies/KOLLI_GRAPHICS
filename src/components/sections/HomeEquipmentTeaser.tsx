import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Cpu } from 'lucide-react'

import { Link } from 'react-router-dom'
import { SectionHeader } from '../common/SectionHeader'
import { EQUIPMENT_LIST } from '../../data/equipment'

export const HomeEquipmentTeaser: React.FC = () => {
  const featured = EQUIPMENT_LIST.slice(0, 4)

  return (
    <section style={{ padding: '100px 0 80px 0', backgroundColor: '#f9fafb' }}>
      <div className="container">
        <SectionHeader
          badge="World-Class Machinery"
          badgeVariant="cyan"
          title="State-of-the-Art Printing &"
          titleHighlight="Finishing Technology"
          subtitle="Operating Heidelberg, Komori, BOBST, and OMET technology for zero-defect folding cartons and luxury packaging."
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 24,
            marginTop: 48,
          }}
        >
          {featured.map((eq, i) => (
            <motion.div
              key={eq.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.12, duration: 0.55, ease: [0.21, 0.47, 0.32, 0.98] }}
              whileHover={{
                y: -8,
                boxShadow: '0 20px 38px -10px rgba(220,38,38,0.15), 0 8px 16px -4px rgba(0,0,0,0.06)',
                borderColor: 'rgba(220,38,38,0.3)',
              }}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: 16,
                overflow: 'hidden',
                border: '1px solid #e5e7eb',
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                transition: 'border-color 0.3s ease',
              }}
            >
              <div
                style={{
                  height: 190,
                  backgroundColor: '#111827',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <motion.img
                  src={eq.image}
                  alt={eq.name}
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    opacity: 0.9,
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: 12,
                    left: 12,
                    backgroundColor: '#dc2626',
                    color: '#ffffff',
                    fontSize: '0.68rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    padding: '4px 10px',
                    borderRadius: 4,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                  }}
                >
                  {eq.badge}
                </div>
              </div>

              <div style={{ padding: 24, flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.2rem',
                    fontWeight: 600,
                    color: '#111827',
                    marginBottom: 8,
                  }}
                >
                  {eq.name}
                </h3>
                <p style={{ fontSize: '0.85rem', color: '#6b7280', lineHeight: 1.6, marginBottom: 16, flex: 1 }}>
                  {eq.description}
                </p>

                {eq.specs?.speed && (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      color: '#00aeef',
                      paddingTop: 12,
                      borderTop: '1px solid #f3f4f6',
                    }}
                  >
                    <Cpu size={15} />
                    <span>{eq.specs.speed}</span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 52 }}>
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }} style={{ display: 'inline-block' }}>
            <Link
              to="/equipment"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 12,
                padding: '16px 36px',
                backgroundColor: '#111827',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '0.875rem',
                borderRadius: 8,
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                boxShadow: '0 6px 20px rgba(17,24,39,0.25)',
              }}
            >
              <span>Explore All Equipment & Machine Specs</span>
              <motion.span animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                <ArrowRight size={17} />
              </motion.span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
