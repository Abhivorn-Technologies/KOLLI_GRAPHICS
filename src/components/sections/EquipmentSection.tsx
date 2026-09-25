import React, { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence, useInView, useReducedMotion } from 'framer-motion'
import { CheckCircle2, Search, X, ShieldCheck, ArrowRight, Zap } from 'lucide-react'
import { SectionHeader } from '../common/SectionHeader'
import { ImageWithFallback } from '../common/ImageWithFallback'
import { EQUIPMENT_LIST } from '../../data/equipment'
import type { EquipmentItem } from '../../data/equipment'
import { Link } from 'react-router-dom'

/* ─── Sequential reveal container ──────────────────────────────────── */
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 36, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.55,
      ease: [0.21, 0.47, 0.32, 0.98] as [number, number, number, number],
    },
  },
}

/* ─── Category accent colors ────────────────────────────────────────── */
const CATEGORY_COLORS: Record<string, string> = {
  offset: '#dc2626', // Crimson
  labels: '#00aeef', // Cyan
  'die-cutting': '#f59e0b', // Yellow Gold
  finishing: '#ec008c', // Magenta
}

/* ─── Equipment card with 3D hover & open modal trigger ──────────── */
interface EquipCardProps {
  eq: EquipmentItem
  index: number
  onOpenModal: (item: EquipmentItem) => void
}

const EquipCard: React.FC<EquipCardProps> = ({ eq, index, onOpenModal }) => {
  const reduce = useReducedMotion()
  const [hovered, setHovered] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 })
  const cardRef = useRef<HTMLDivElement>(null)

  const accentColor = CATEGORY_COLORS[eq.category] || '#dc2626'

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (reduce || !cardRef.current) return
      const rect = cardRef.current.getBoundingClientRect()
      setMousePos({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      })
    },
    [reduce]
  )

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false)
        setMousePos({ x: 50, y: 50 })
      }}
      onMouseMove={onMouseMove}
      animate={{
        y: hovered ? -8 : 0,
        boxShadow: hovered
          ? `0 24px 48px -12px ${accentColor}28, 0 8px 24px -6px rgba(0,0,0,0.08)`
          : '0 2px 10px rgba(0,0,0,0.04)',
      }}
      transition={{ type: 'spring', stiffness: 280, damping: 22 }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '20px',
        overflow: 'hidden',
        backgroundColor: '#ffffff',
        border: '1px solid #e2e8f0',
        height: '100%',
        position: 'relative',
        cursor: 'pointer',
        flex: '1 1 320px',
        maxWidth: '380px',
        width: '100%',
      }}
      onClick={() => onOpenModal(eq)}
    >
      {/* Shine overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '20px',
          background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(255,255,255,${hovered ? 0.2 : 0}) 0%, transparent 60%)`,
          pointerEvents: 'none',
          zIndex: 5,
          transition: 'opacity 0.3s ease',
        }}
      />

      {/* Accent top line */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          backgroundColor: accentColor,
          zIndex: 6,
        }}
      />

      {/* Image Banner */}
      <div
        style={{
          position: 'relative',
          height: '220px',
          backgroundColor: '#f1f5f9',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <motion.div
          style={{ width: '100%', height: '100%' }}
          animate={{ scale: hovered ? 1.07 : 1 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
        >
          <ImageWithFallback
            src={eq.image}
            alt={eq.name}
            fallbackLabel={eq.name}
            fallbackCategory={eq.badge}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </motion.div>

        {/* Category Badge */}
        <span
          style={{
            position: 'absolute',
            top: '14px',
            left: '14px',
            padding: '5px 14px',
            borderRadius: '999px',
            backgroundColor: 'rgba(17,24,39,0.85)',
            backdropFilter: 'blur(8px)',
            color: '#ffffff',
            fontSize: '0.72rem',
            fontWeight: 800,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
          }}
        >
          {eq.badge}
        </span>

        {/* Machine Index tag */}
        <div
          style={{
            position: 'absolute',
            bottom: '12px',
            right: '12px',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            backgroundColor: accentColor,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.75rem',
            fontWeight: 800,
            color: '#ffffff',
            boxShadow: `0 4px 12px ${accentColor}60`,
          }}
        >
          {String(index + 1).padStart(2, '0')}
        </div>
      </div>

      {/* Content Body */}
      <div
        style={{
          padding: '26px 24px',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
        }}
      >
        <div style={{ marginBottom: '12px' }}>
          <span
            style={{
              fontSize: '0.72rem',
              fontWeight: 800,
              color: accentColor,
              textTransform: 'uppercase',
              letterSpacing: '0.07em',
              display: 'block',
              marginBottom: '4px',
            }}
          >
            {eq.tagline}
          </span>
          <h3
            style={{
              fontSize: '1.2rem',
              color: '#111827',
              fontWeight: 800,
              lineHeight: 1.3,
            }}
          >
            {eq.name}
          </h3>
          <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600 }}>{eq.model}</span>
        </div>

        <p style={{ fontSize: '0.85rem', color: '#4b5563', lineHeight: 1.6, marginBottom: '20px' }}>
          {eq.description}
        </p>

        {/* Spec Chips */}
        {eq.specs && (
          <div style={{ display: 'flex', gap: '6px', marginBottom: '20px', flexWrap: 'wrap' }}>
            {eq.specs.speed && (
              <span
                style={{
                  fontSize: '0.7rem',
                  padding: '3px 10px',
                  borderRadius: '6px',
                  backgroundColor: '#f1f5f9',
                  color: '#334155',
                  fontWeight: 700,
                }}
              >
                ⚡ {eq.specs.speed}
              </span>
            )}
            {eq.specs.country && (
              <span
                style={{
                  fontSize: '0.7rem',
                  padding: '3px 10px',
                  borderRadius: '6px',
                  backgroundColor: `${accentColor}12`,
                  color: accentColor,
                  fontWeight: 700,
                }}
              >
                🌐 {eq.specs.country}
              </span>
            )}
          </div>
        )}

        {/* Bottom CTA inspect trigger */}
        <div
          style={{
            marginTop: 'auto',
            paddingTop: '16px',
            borderTop: '1px solid #f1f5f9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span
            style={{
              fontSize: '0.82rem',
              fontWeight: 700,
              color: accentColor,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            Inspect Machine Specs <ArrowRight size={14} />
          </span>
          <span style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 600 }}>
            Click to Expand
          </span>
        </div>
      </div>
    </motion.div>
  )
}

/* ─── Animated Grid Wrapper ─────────────────────────────────────────── */
function AnimatedGrid({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px 0px' })

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '28px',
      }}
    >
      {children}
    </motion.div>
  )
}

/* ─── Machine Spec Detail Modal Component ────────────────────────────── */
const EquipmentDetailModal: React.FC<{
  eq: EquipmentItem | null
  onClose: () => void
}> = ({ eq, onClose }) => {
  if (!eq) return null
  const accentColor = CATEGORY_COLORS[eq.category] || '#dc2626'

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        backgroundColor: 'rgba(15, 23, 42, 0.7)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        overflowY: 'auto',
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }}
        transition={{ type: 'spring', stiffness: 300, damping: 28 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '780px',
          backgroundColor: '#ffffff',
          borderRadius: '24px',
          overflow: 'hidden',
          boxShadow: '0 32px 80px rgba(0,0,0,0.25)',
          position: 'relative',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            zIndex: 20,
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: 'rgba(17,24,39,0.8)',
            border: 'none',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
          }}
        >
          <X size={18} />
        </button>

        {/* Modal Header Banner */}
        <div
          style={{
            position: 'relative',
            height: '260px',
            backgroundColor: '#f1f5f9',
            flexShrink: 0,
          }}
        >
          <ImageWithFallback
            src={eq.image}
            alt={eq.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(17,24,39,0.9) 0%, transparent 60%)',
            }}
          />

          <div style={{ position: 'absolute', bottom: '24px', left: '28px', right: '28px' }}>
            <span
              style={{
                fontSize: '0.75rem',
                fontWeight: 800,
                padding: '4px 12px',
                borderRadius: '999px',
                backgroundColor: accentColor,
                color: '#ffffff',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
              }}
            >
              {eq.badge}
            </span>
            <h2
              style={{
                fontSize: '1.6rem',
                color: '#ffffff',
                fontWeight: 800,
                marginTop: '8px',
                marginBottom: '2px',
              }}
            >
              {eq.name}
            </h2>
            <p style={{ fontSize: '0.85rem', color: '#cbd5e1', margin: 0 }}>{eq.model}</p>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div style={{ padding: '32px 28px', overflowY: 'auto' }}>
          <div style={{ marginBottom: '24px' }}>
            <h4
              style={{
                fontSize: '0.82rem',
                fontWeight: 800,
                color: accentColor,
                textTransform: 'uppercase',
                letterSpacing: '0.07em',
                marginBottom: '6px',
              }}
            >
              Operational Overview
            </h4>
            <p style={{ fontSize: '0.92rem', color: '#334155', lineHeight: 1.7, margin: 0 }}>
              {eq.description}
            </p>
          </div>

          {/* Specs Table */}
          {eq.specs && (
            <div
              style={{
                marginBottom: '28px',
                backgroundColor: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '16px',
                padding: '20px',
              }}
            >
              <h4
                style={{
                  fontSize: '0.82rem',
                  fontWeight: 800,
                  color: '#111827',
                  textTransform: 'uppercase',
                  letterSpacing: '0.07em',
                  marginBottom: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <Zap size={15} color={accentColor} /> Technical Specifications
              </h4>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '14px',
                }}
              >
                {Object.entries(eq.specs).map(([key, val]) => (
                  <div
                    key={key}
                    style={{
                      padding: '10px 14px',
                      borderRadius: '10px',
                      backgroundColor: '#ffffff',
                      border: '1px solid #e2e8f0',
                    }}
                  >
                    <div
                      style={{
                        fontSize: '0.68rem',
                        color: '#64748b',
                        textTransform: 'uppercase',
                        fontWeight: 700,
                        letterSpacing: '0.05em',
                      }}
                    >
                      {key}
                    </div>
                    <div
                      style={{
                        fontSize: '0.85rem',
                        color: '#0f172a',
                        fontWeight: 700,
                        marginTop: '2px',
                      }}
                    >
                      {val}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Capability Highlights */}
          <div style={{ marginBottom: '28px' }}>
            <h4
              style={{
                fontSize: '0.82rem',
                fontWeight: 800,
                color: '#111827',
                textTransform: 'uppercase',
                letterSpacing: '0.07em',
                marginBottom: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <ShieldCheck size={15} color={accentColor} /> Key Machine Capabilities
            </h4>
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              {eq.highlights.map((h) => (
                <li
                  key={h}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '10px',
                    fontSize: '0.88rem',
                    color: '#334155',
                    lineHeight: 1.5,
                  }}
                >
                  <CheckCircle2
                    size={16}
                    color={accentColor}
                    style={{ marginTop: '2px', flexShrink: 0 }}
                  />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Modal Action CTA */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px',
              flexWrap: 'wrap',
              paddingTop: '20px',
              borderTop: '1px solid #e2e8f0',
            }}
          >
            <span style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: 600 }}>
              Need production availability for this machine?
            </span>
            <Link
              to="/estimating"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                borderRadius: '999px',
                backgroundColor: accentColor,
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '0.88rem',
                textDecoration: 'none',
                boxShadow: `0 4px 16px ${accentColor}40`,
              }}
            >
              Request Job Estimate <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ─── Main Equipment Section ───────────────────────────────────────── */
export const EquipmentSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [selectedModalItem, setSelectedModalItem] = useState<EquipmentItem | null>(null)

  const categories = [
    { id: 'all', label: 'All Machinery' },
    { id: 'offset', label: 'Offset Presses' },
    { id: 'labels', label: 'Flexo Labels' },
    { id: 'die-cutting', label: 'Die-Cutting & Foiling' },
    { id: 'finishing', label: 'Folder-Gluers & Pasting' },
  ]

  const filteredEquipment = EQUIPMENT_LIST.filter((eq) => {
    const matchesCategory = selectedCategory === 'all' || eq.category === selectedCategory
    const matchesSearch =
      searchQuery.trim() === '' ||
      eq.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      eq.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      eq.tagline.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <section
      id="equipment"
      style={{
        padding: '110px 0 80px 0',
        backgroundColor: '#ffffff',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ambient background glows */}
      <div
        style={{
          position: 'absolute',
          top: '-120px',
          right: '-100px',
          width: '560px',
          height: '560px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,174,239,0.04) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div className="container">
        <SectionHeader
          badge="World-Class Infrastructure"
          badgeVariant="cyan"
          title="Heavyweight Machinery &"
          titleHighlight="Finishing Arsenal"
          subtitle="Precision German Heidelberg, Komori, OMET, and Swiss BOBST technologies commanding automated, high-velocity carton converting and multi-color UV printing."
        />

        {/* Filter Navigation & Search Bar */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px',
            marginBottom: '52px',
          }}
        >
          {/* Category Pills */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '10px',
              flexWrap: 'wrap',
            }}
          >
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.id
              const accentColor = isSelected ? CATEGORY_COLORS[cat.id] || '#dc2626' : '#ebeef2'
              return (
                <motion.button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  animate={{
                    backgroundColor: isSelected ? accentColor : '#f1f5f9',
                    color: isSelected ? '#ffffff' : '#475569',
                    boxShadow: isSelected ? `0 4px 16px ${accentColor}40` : 'none',
                  }}
                  transition={{ duration: 0.2 }}
                  style={{
                    padding: '10px 22px',
                    borderRadius: '999px',
                    fontSize: '0.875rem',
                    fontWeight: 700,
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  {cat.label}
                </motion.button>
              )
            })}
          </div>

          {/* Quick Machine Search Bar */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '420px',
            }}
          >
            <Search
              size={16}
              color="#94a3b8"
              style={{
                position: 'absolute',
                left: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
              }}
            />
            <input
              type="text"
              placeholder="Search press, brand, or capability..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 16px 10px 44px',
                borderRadius: '999px',
                border: '1px solid #e2e8f0',
                backgroundColor: '#ffffff',
                fontSize: '0.875rem',
                color: '#0f172a',
                outline: 'none',
                boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{
                  position: 'absolute',
                  right: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  border: 'none',
                  background: 'none',
                  color: '#94a3b8',
                  cursor: 'pointer',
                }}
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Equipment Grid */}
        <AnimatedGrid key={`${selectedCategory}-${searchQuery}`}>
          {filteredEquipment.map((eq, idx) => (
            <EquipCard
              key={eq.id}
              eq={eq}
              index={idx}
              onOpenModal={(item) => setSelectedModalItem(item)}
            />
          ))}
        </AnimatedGrid>
      </div>

      {/* Interactive Machine Detail Modal */}
      <AnimatePresence>
        {selectedModalItem && (
          <EquipmentDetailModal eq={selectedModalItem} onClose={() => setSelectedModalItem(null)} />
        )}
      </AnimatePresence>
    </section>
  )
}
