import React, { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Package,
  Layers,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  ArrowRight,
  Box,
  CheckCircle2,
} from 'lucide-react'
import { SectionHeader } from '../common/SectionHeader'
import { ScrollReveal } from '../common/ScrollReveal'
import { PRODUCT_CATEGORIES } from '../../data/products'

/* ─── 3D Tilt Card with Specular Sheen ──────────────────────────────────── */
interface TiltCardProps {
  children: React.ReactNode
  accentColor?: string
  style?: React.CSSProperties
  className?: string
}

const TiltCard: React.FC<TiltCardProps> = ({
  children,
  accentColor = '#dc2626',
  style,
  className,
}) => {
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
      const cx = (e.clientX - rect.left) / rect.width
      const cy = (e.clientY - rect.top) / rect.height
      const targetX = (cy - 0.5) * -12
      const targetY = (cx - 0.5) * 12

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
        scale: hovered ? 1.02 : 1,
        y: hovered ? -4 : 0,
        boxShadow: hovered
          ? `0 16px 32px -6px ${accentColor}26, 0 4px 12px rgba(0,0,0,0.06)`
          : '0 2px 8px rgba(0,0,0,0.02)',
      }}
      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
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
      {/* Specular shine overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '14px',
          background: `radial-gradient(circle at ${shine.x}% ${shine.y}%, rgba(255,255,255,${shine.opacity}) 0%, transparent 60%)`,
          pointerEvents: 'none',
          transition: 'opacity 0.2s ease',
          zIndex: 5,
        }}
      />
    </motion.div>
  )
}

/* ─── Category Metadata & Color Schemes ─────────────────────────────────── */
const CATEGORY_META: Record<
  string,
  {
    color: string
    bgLight: string
    borderLight: string
    icon: React.ComponentType<{ size?: number; color?: string; style?: React.CSSProperties }>
    keyline: string
    highlightTags: string[]
  }
> = {
  cartons: {
    color: '#dc2626',
    bgLight: 'rgba(220, 38, 38, 0.05)',
    borderLight: 'rgba(220, 38, 38, 0.18)',
    icon: Box,
    keyline: 'High-Speed Automated & Hand Packaging Line Optimization',
    highlightTags: ['100% In-House Die Cutting', 'Crash Lock & Tuck Options', '<0.5mm Accuracy'],
  },
  'tray-boxes': {
    color: '#00aeef',
    bgLight: 'rgba(0, 174, 239, 0.05)',
    borderLight: 'rgba(0, 174, 239, 0.18)',
    icon: Layers,
    keyline: 'Double-Walled Rigidity & High-Strength Stacking Performance',
    highlightTags: ['4 & 6 Corner Pasting', 'Rigid Sidewalls', 'Luxury Presentation'],
  },
  cigarette: {
    color: '#f59e0b',
    bgLight: 'rgba(245, 158, 11, 0.05)',
    borderLight: 'rgba(245, 158, 11, 0.18)',
    icon: Sparkles,
    keyline: 'International GD & Fockey Keylines with Flawless Foil Embossing',
    highlightTags: ['Hinge Lid Blanks', 'Micro Embossing', 'Foil Stamped Finish'],
  },
  'specialty-packaging': {
    color: '#ec008c',
    bgLight: 'rgba(236, 0, 140, 0.05)',
    borderLight: 'rgba(236, 0, 140, 0.18)',
    icon: ShieldCheck,
    keyline: 'Custom Partitioning, Protective Sleeves & Specialty Varnishes',
    highlightTags: ['UV Coating & Spot UV', 'Inner Partition Dividers', 'Anti-Counterfeit'],
  },
}

export const ProductsSection: React.FC = () => {
  const [activeCategoryId, setActiveCategoryId] = useState<string>('all')

  const filterTabs = [
    { id: 'all', label: 'All Products', count: 32 },
    { id: 'cartons', label: 'Cartons', count: 8 },
    { id: 'tray-boxes', label: 'Tray Boxes', count: 12 },
    { id: 'cigarette', label: 'Cigarette Packaging', count: 6 },
    { id: 'specialty-packaging', label: 'Specialty Packaging', count: 6 },
  ]

  const displayedCategories =
    activeCategoryId === 'all'
      ? PRODUCT_CATEGORIES
      : PRODUCT_CATEGORIES.filter((c) => c.id === activeCategoryId)

  return (
    <section
      id="products"
      style={{
        padding: '90px 0 100px 0',
        backgroundColor: '#f8fafc',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative background radial glows */}
      <div
        style={{
          position: 'absolute',
          top: '-10%',
          right: '-5%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(220, 38, 38, 0.04) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '5%',
          left: '-5%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0, 174, 239, 0.04) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Section Header with Scroll Arrival */}
        <ScrollReveal direction="up" distance={36}>
          <SectionHeader
            badge="Product Portfolio"
            badgeVariant="cyan"
            title="Engineered Structural"
            titleHighlight="Cartons & Packaging"
            subtitle="Precision mono cartons, high-rigidity tray boxes, and micron-tolerance specialty packaging crafted at our 40,000 sq.ft. facility in Hyderabad."
          />
        </ScrollReveal>

        {/* Quick Highlights Strip with Scroll Arrival */}
        <ScrollReveal direction="up" delay={0.1} distance={28}>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '12px',
              marginBottom: '36px',
            }}
          >
            {[
              { label: '32+ Configurations', highlight: 'Engineered Precision' },
              { label: '4 Categories', highlight: 'Turnkey Portfolio' },
              { label: '< 0.5mm', highlight: 'Strict Tolerance' },
              { label: '100% In-House', highlight: 'Die Cutting & Gluing' },
            ].map((stat) => (
              <div
                key={stat.label}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '7px 16px',
                  borderRadius: '999px',
                  background: '#ffffff',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.02)',
                }}
              >
                <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#dc2626' }}>
                  {stat.label}
                </span>
                <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#cbd5e1' }} />
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b' }}>
                  {stat.highlight}
                </span>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Category Filter Tabs with Scroll Arrival */}
        <ScrollReveal direction="up" delay={0.16} distance={24}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '10px',
              flexWrap: 'wrap',
              marginBottom: '52px',
            }}
          >
            {filterTabs.map((tab) => {
              const isActive = activeCategoryId === tab.id
              return (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveCategoryId(tab.id)}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '10px 20px',
                    borderRadius: '999px',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    backgroundColor: isActive ? '#dc2626' : '#ffffff',
                    color: isActive ? '#ffffff' : '#4b5563',
                    border: isActive ? '1px solid #dc2626' : '1px solid #e2e8f0',
                    boxShadow: isActive
                      ? '0 6px 18px rgba(220, 38, 38, 0.25)'
                      : '0 2px 6px rgba(0, 0, 0, 0.03)',
                  }}
                >
                  <span>{tab.label}</span>
                  <span
                    style={{
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      padding: '2px 8px',
                      borderRadius: '999px',
                      backgroundColor: isActive ? 'rgba(255, 255, 255, 0.25)' : '#f1f5f9',
                      color: isActive ? '#ffffff' : '#64748b',
                    }}
                  >
                    {tab.count}
                  </span>
                </motion.button>
              )
            })}
          </div>
        </ScrollReveal>

        {/* Categories Display with Staggered Scroll Arrival Animations */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
          <AnimatePresence mode="popLayout">
            {displayedCategories.map((category, catIdx) => {
              const meta = CATEGORY_META[category.id] || CATEGORY_META.cartons
              const IconComponent = meta.icon

              return (
                <ScrollReveal
                  key={category.id}
                  direction="up"
                  delay={catIdx * 0.08}
                  distance={36}
                  viewportAmount={0.1}
                >
                  <div
                    style={{
                      backgroundColor: '#ffffff',
                      borderRadius: '24px',
                      border: '1px solid #e5e7eb',
                      overflow: 'hidden',
                      boxShadow: '0 8px 30px rgba(0, 0, 0, 0.04)',
                    }}
                  >
                    {/* Category Top Banner */}
                    <div
                      className="product-category-banner"
                      style={{
                        padding: '28px 32px',
                        background: `linear-gradient(to right, ${meta.bgLight} 0%, #ffffff 100%)`,
                        borderBottom: `1px solid ${meta.borderLight}`,
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '20px',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <div
                          style={{
                            width: '52px',
                            height: '52px',
                            borderRadius: '14px',
                            backgroundColor: '#ffffff',
                            border: `1.5px solid ${meta.borderLight}`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: meta.color,
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.04)',
                            flexShrink: 0,
                          }}
                        >
                          <IconComponent size={24} color={meta.color} />
                        </div>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <h3
                              style={{
                                fontSize: '1.25rem',
                                fontWeight: 700,
                                color: '#111827',
                                margin: 0,
                              }}
                            >
                              {category.title}
                            </h3>
                            <span
                              style={{
                                fontSize: '0.7rem',
                                fontWeight: 700,
                                padding: '3px 10px',
                                borderRadius: '999px',
                                backgroundColor: meta.bgLight,
                                color: meta.color,
                                border: `1px solid ${meta.borderLight}`,
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em',
                              }}
                            >
                              {category.items.length} Options
                            </span>
                          </div>
                          <p
                            style={{
                              fontSize: '0.875rem',
                              color: '#64748b',
                              margin: '4px 0 0 0',
                              maxWidth: '700px',
                              lineHeight: 1.5,
                            }}
                          >
                            {category.description}
                          </p>
                        </div>
                      </div>

                      {/* Tags / Engineering Badges */}
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {meta.highlightTags.map((tag) => (
                          <span
                            key={tag}
                            style={{
                              fontSize: '0.72rem',
                              fontWeight: 600,
                              padding: '4px 12px',
                              borderRadius: '6px',
                              backgroundColor: '#f8fafc',
                              color: '#475569',
                              border: '1px solid #e2e8f0',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px',
                            }}
                          >
                            <CheckCircle2 size={11} color={meta.color} />
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Items Specification Grid with Staggered Cascading Scroll Arrivals */}
                    <div
                      className="product-category-items-grid"
                      style={{
                        padding: '24px 32px 32px 32px',
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 260px), 1fr))',
                        gap: '14px',
                        backgroundColor: '#ffffff',
                        perspective: '1000px',
                      }}
                    >
                      {category.items.map((item, idx) => (
                        <ScrollReveal
                          key={item}
                          direction="up"
                          delay={Math.min(idx * 0.035, 0.4)}
                          distance={20}
                          duration={0.45}
                          viewportAmount={0.05}
                        >
                          <TiltCard
                            accentColor={meta.color}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              gap: '12px',
                              padding: '14px 18px',
                              borderRadius: '12px',
                              backgroundColor: '#ffffff',
                              border: '1px solid #edf2f7',
                              cursor: 'pointer',
                              minHeight: '64px',
                            }}
                          >
                            <div
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                minWidth: 0,
                                flex: 1,
                              }}
                            >
                              <span
                                style={{
                                  fontSize: '0.7rem',
                                  fontWeight: 800,
                                  color: meta.color,
                                  backgroundColor: meta.bgLight,
                                  width: '26px',
                                  height: '26px',
                                  borderRadius: '6px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  flexShrink: 0,
                                }}
                              >
                                {(idx + 1).toString().padStart(2, '0')}
                              </span>
                              <span
                                style={{
                                  fontSize: '0.85rem',
                                  fontWeight: 600,
                                  color: '#1e293b',
                                  lineHeight: 1.35,
                                  whiteSpace: 'normal',
                                }}
                              >
                                {item}
                              </span>
                            </div>
                            <ChevronRight
                              size={15}
                              color={meta.color}
                              style={{ flexShrink: 0, opacity: 0.7 }}
                            />
                          </TiltCard>
                        </ScrollReveal>
                      ))}
                    </div>

                    {/* Footer Bar per Category with Link to Technical Specs in Capabilities */}
                    <div
                      style={{
                        padding: '14px 32px',
                        backgroundColor: '#fafbfc',
                        borderTop: '1px solid #f1f5f9',
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '12px',
                      }}
                    >
                      <span style={{ fontSize: '0.78rem', color: '#64748b', fontStyle: 'italic' }}>
                        Keyline profile: {meta.keyline}
                      </span>
                      <Link
                        to="/capabilities"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          fontSize: '0.78rem',
                          fontWeight: 700,
                          color: meta.color,
                          textDecoration: 'none',
                          transition: 'opacity 0.2s ease',
                        }}
                      >
                        <span>Explore Technical Specs in Capabilities</span>
                        <ArrowRight size={13} />
                      </Link>
                    </div>
                  </div>
                </ScrollReveal>
              )
            })}
          </AnimatePresence>
        </div>

        {/* Bottom CTA Card leading to Capabilities & Estimating with Scroll Arrival */}
        <ScrollReveal direction="up" delay={0.15} distance={32}>
          <div
            style={{
              marginTop: '56px',
              padding: '36px 40px',
              borderRadius: '24px',
              background: 'linear-gradient(135deg, #111827 0%, #1f2937 100%)',
              color: '#ffffff',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '24px',
              boxShadow: '0 12px 36px rgba(0, 0, 0, 0.12)',
            }}
          >
            <div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '4px 12px',
                  borderRadius: '999px',
                  backgroundColor: 'rgba(220, 38, 38, 0.2)',
                  color: '#f87171',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  marginBottom: '10px',
                }}
              >
                <Package size={12} />
                Need Custom Structural Drawings?
              </div>
              <h4
                style={{
                  fontSize: '1.25rem',
                  color: '#ffffff',
                  margin: '0 0 6px 0',
                  fontWeight: 700,
                }}
              >
                View Structural Folding Concepts &amp; Diagram Guides
              </h4>
              <p
                style={{
                  fontSize: '0.875rem',
                  color: '#9ca3af',
                  margin: 0,
                  maxWidth: '560px',
                  lineHeight: 1.5,
                }}
              >
                Inspect detailed panel fold physics, Tuck-Top structures, lock-bottom bases, and
                die-cutting layouts in our dedicated Capabilities section.
              </p>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px' }}>
              <Link
                to="/capabilities"
                style={{
                  padding: '12px 24px',
                  borderRadius: '12px',
                  backgroundColor: '#dc2626',
                  color: '#ffffff',
                  fontSize: '0.875rem',
                  fontWeight: 700,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 14px rgba(220, 38, 38, 0.4)',
                  transition: 'background-color 0.2s',
                }}
              >
                <span>View Capabilities</span>
                <ArrowRight size={15} />
              </Link>
              <Link
                to="/estimating"
                style={{
                  padding: '12px 24px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  color: '#ffffff',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'background-color 0.2s',
                }}
              >
                <span>Get an Estimate</span>
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .product-category-banner {
            padding: 20px 16px !important;
          }
          .product-category-items-grid {
            padding: 16px 14px 22px 14px !important;
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
