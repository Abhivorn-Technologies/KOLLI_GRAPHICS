import React, { useState, useRef, useCallback } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Box } from 'lucide-react'
import { SectionHeader } from '../common/SectionHeader'
import { ScrollReveal } from '../common/ScrollReveal'
import { PRODUCT_CATEGORIES } from '../../data/products'

/* ─── 3D tilt card ─────────────────────────────────────────────────────── */
interface TiltCardProps {
  children: React.ReactNode
  style?: React.CSSProperties
  className?: string
}

const TiltCard: React.FC<TiltCardProps> = ({ children, style, className }) => {
  const reduce = useReducedMotion()
  const cardRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [shine, setShine] = useState({ x: 50, y: 50, opacity: 0 })
  const [hovered, setHovered] = useState(false)
  const rafRef = useRef<number | null>(null)

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (reduce || !cardRef.current) return
      const rect = cardRef.current.getBoundingClientRect()
      const cx = (e.clientX - rect.left) / rect.width // 0..1
      const cy = (e.clientY - rect.top) / rect.height // 0..1
      const targetX = (cy - 0.5) * -14 // tilt up/down
      const targetY = (cx - 0.5) * 14 // tilt left/right

      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => {
        setTilt({ x: targetX, y: targetY })
        setShine({ x: cx * 100, y: cy * 100, opacity: 0.12 })
      })
    },
    [reduce]
  )

  const onMouseLeave = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    setTilt({ x: 0, y: 0 })
    setShine((prev) => ({ ...prev, opacity: 0 }))
    setHovered(false)
  }, [])

  return (
    <motion.div
      ref={cardRef}
      className={className}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onMouseLeave}
      animate={{
        rotateX: tilt.x,
        rotateY: tilt.y,
        scale: hovered ? 1.025 : 1,
        y: hovered ? -6 : 0,
        boxShadow: hovered
          ? '0 24px 48px -8px rgba(220,38,38,0.18), 0 8px 20px -4px rgba(0,0,0,0.08)'
          : '0 2px 8px rgba(0,0,0,0.04)',
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      style={{
        transformStyle: 'preserve-3d',
        transformOrigin: 'center center',
        position: 'relative',
        borderRadius: '14px',
        overflow: 'hidden',
        willChange: 'transform',
        ...style,
      }}
    >
      {children}

      {/* Shine overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '14px',
          background: `radial-gradient(circle at ${shine.x}% ${shine.y}%, rgba(255,255,255,${shine.opacity}) 0%, transparent 60%)`,
          pointerEvents: 'none',
          transition: 'opacity 0.2s ease',
          zIndex: 10,
        }}
      />
    </motion.div>
  )
}

/* ─── Category filter pill ──────────────────────────────────────────────── */
const FilterPill: React.FC<{ label: string; active: boolean; onClick: () => void }> = ({
  label,
  active,
  onClick,
}) => (
  <motion.button
    onClick={onClick}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.97 }}
    animate={{
      backgroundColor: active ? '#dc2626' : '#ffffff',
      color: active ? '#ffffff' : '#4b5563',
      borderColor: active ? '#dc2626' : '#e5e7eb',
      boxShadow: active ? '0 4px 14px rgba(220,38,38,0.3)' : '0 1px 3px rgba(0,0,0,0.04)',
    }}
    transition={{ duration: 0.22 }}
    style={{
      padding: '9px 20px',
      borderRadius: '999px',
      fontSize: '0.875rem',
      fontWeight: 600,
      border: '1px solid',
      cursor: 'pointer',
    }}
  >
    {label}
  </motion.button>
)

/* ─── Main section ──────────────────────────────────────────────────────── */
export const ProductsSection: React.FC = () => {
  const [activeCategoryId, setActiveCategoryId] = useState('all')

  const categories = [
    { id: 'all', label: 'All Products' },
    { id: 'cartons', label: 'Cartons' },
    { id: 'tray-boxes', label: 'Tray Boxes' },
    { id: 'cigarette', label: 'Cigarette Packaging' },
    { id: 'specialty-packaging', label: 'Specialty Solutions' },
  ]

  const displayedCategories =
    activeCategoryId === 'all'
      ? PRODUCT_CATEGORIES
      : PRODUCT_CATEGORIES.filter((c) => c.id === activeCategoryId)

  // Category CMYK accent colors
  const categoryColors: Record<string, string> = {
    cartons: '#dc2626',
    'tray-boxes': '#00aeef',
    cigarette: '#f59e0b',
    'specialty-packaging': '#ec008c',
  }

  return (
    <section
      id="products"
      style={{
        padding: '80px 0',
        backgroundColor: '#f4f6f8',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle bg accent */}
      <div
        style={{
          position: 'absolute',
          top: '-120px',
          right: '-80px',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(220,38,38,0.04) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div className="container">
        <SectionHeader
          badge="Product Portfolio"
          badgeVariant="cyan"
          title="Engineered Structural"
          titleHighlight="Cartons & Packaging"
          subtitle="Explore Kolli Graphics comprehensive catalog of precision mono cartons, high-rigidity tray boxes, and micron-tolerance cigarette packaging."
        />

        {/* Filter Nav */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '10px',
            flexWrap: 'wrap',
            marginBottom: '52px',
          }}
        >
          {categories.map((cat) => (
            <FilterPill
              key={cat.id}
              label={cat.label}
              active={activeCategoryId === cat.id}
              onClick={() => setActiveCategoryId(cat.id)}
            />
          ))}
        </div>

        {/* Product Categories */}
        <motion.div layout style={{ display: 'flex', flexDirection: 'column', gap: '44px' }}>
          {displayedCategories.map((category, catIdx) => {
            const accentColor = categoryColors[category.id] || '#dc2626'
            return (
              <ScrollReveal key={category.id} direction="up" delay={catIdx * 0.07}>
                <div>
                  {/* Category header */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'baseline',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: '12px',
                      paddingBottom: '18px',
                      borderBottom: `2px solid ${accentColor}22`,
                      marginBottom: '28px',
                      position: 'relative',
                    }}
                  >
                    <div
                      style={{
                        position: 'absolute',
                        bottom: -2,
                        left: 0,
                        width: '60px',
                        height: '2px',
                        backgroundColor: accentColor,
                        borderRadius: '2px',
                      }}
                    />
                    <div>
                      <h3
                        style={{
                          fontSize: 'clamp(1rem, 1.5vw, 1.15rem)',
                          color: '#111827',
                          marginBottom: '3px',
                          fontFamily: "'DM Sans', sans-serif",
                          fontWeight: 700,
                        }}
                      >
                        {category.title}
                      </h3>
                      <p style={{ fontSize: '0.8125rem', color: '#6b7280' }}>
                        {category.description}
                      </p>
                    </div>
                    <span
                      style={{
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        padding: '4px 12px',
                        borderRadius: '999px',
                        backgroundColor: `${accentColor}15`,
                        color: accentColor,
                        border: `1px solid ${accentColor}30`,
                      }}
                    >
                      {category.items.length} CONFIGURATIONS
                    </span>
                  </div>

                  {/* Items grid — balanced centered flex layout */}
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      justifyContent: 'center',
                      gap: '14px',
                      perspective: '1000px',
                    }}
                  >
                    {category.items.map((item, idx) => (
                      <ScrollReveal key={item} direction="up" delay={idx * 0.035}>
                        <TiltCard
                          style={{
                            padding: '14px 18px',
                            backgroundColor: '#ffffff',
                            border: '1px solid #e2e8f0',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: '12px',
                            cursor: 'default',
                            minHeight: '68px',
                            flex: '1 1 250px',
                            maxWidth: '290px',
                            width: '100%',
                          }}
                        >
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '12px',
                              flex: 1,
                              minWidth: 0,
                            }}
                          >
                            {/* Icon */}
                            <div
                              style={{
                                width: 32,
                                height: 32,
                                borderRadius: '8px',
                                background: `${accentColor}12`,
                                border: `1px solid ${accentColor}25`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: accentColor,
                                flexShrink: 0,
                              }}
                            >
                              <Box size={15} />
                            </div>
                            {/* Label — multiline wrap for full readability */}
                            <span
                              style={{
                                fontSize: '0.85rem',
                                fontWeight: 600,
                                color: '#111827',
                                lineHeight: 1.35,
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                              }}
                            >
                              {item}
                            </span>
                          </div>
                          <span
                            style={{
                              color: accentColor,
                              fontSize: '0.8rem',
                              opacity: 0.6,
                              flexShrink: 0,
                            }}
                          >
                            →
                          </span>
                        </TiltCard>
                      </ScrollReveal>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
