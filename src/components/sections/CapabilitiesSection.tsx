import React, { useState } from 'react'
import {
  ShieldCheck,
  Video,
  Lock,
  Clock,
  Box,
  Scissors,
  Sparkles,
  Printer,
  Layers,
  Package,
  X,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { SectionHeader } from '../common/SectionHeader'
import { ScrollReveal } from '../common/ScrollReveal'
import { InteractiveTiltCard } from '../common/InteractiveTiltCard'
import { PRODUCTION_JOURNEY } from '../../data/products'

// Import authentic workflow step images
import imgWorkflowPrepress from '../../assets/images/workflow-prepress.png'
import imgWorkflowPrint from '/assets/images/equipment/heidelberg-cd102.png'
import imgWorkflowDieCut from '/assets/images/equipment/bobst-evoline.png'
import imgWorkflowFoil from '/assets/images/equipment/bobst-bma.png'
import imgWorkflowGluer from '/assets/images/equipment/bobst-domino.png'
import imgWorkflowStorage from '../../assets/images/workflow-storage.png'

const JOURNEY_IMAGES = [
  imgWorkflowPrepress,
  imgWorkflowPrint,
  imgWorkflowDieCut,
  imgWorkflowFoil,
  imgWorkflowGluer,
  imgWorkflowStorage,
]

export const CapabilitiesSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0)
  const [selectedPillar, setSelectedPillar] = useState<{
    title: string
    num: string
    badge: string
    subtitle: string
    color: string
    icon: React.ReactNode
    metric: string
    description: string
    items: string[]
  } | null>(null)
  const [showSecurityModal, setShowSecurityModal] = useState<boolean>(false)

  const getStepIcon = (iconName: string) => {
    switch (iconName) {
      case 'Layers':
        return <Layers size={22} />
      case 'Printer':
        return <Printer size={22} />
      case 'Scissors':
        return <Scissors size={22} />
      case 'Sparkles':
        return <Sparkles size={22} />
      case 'Box':
        return <Box size={22} />
      case 'ShieldCheck':
        return <ShieldCheck size={22} />
      default:
        return <Package size={22} />
    }
  }

  const PILLARS = [
    {
      title: 'Packaging',
      num: '01',
      badge: 'Mono Cartons & Trays',
      subtitle: 'Structural Precision & Custom Folding',
      color: '#dc2626',
      icon: <Box size={24} strokeWidth={2.2} />,
      metric: 'Automated Folding & Gluing',
      description:
        'When we refer to “packaging”, we’re conveying our ability to produce specialty products such as Mono Cartons, Auto-Lock and Tuck-Top boxes, Four Corner trays, Six corner integrated Box, Inner Partition Boxes, and Sleeves.',
      items: [
        'Mono Cartons & Partition Boxes',
        'Auto-Lock & Tuck-Top Boxes',
        '4-Corner & 6-Corner Trays',
        'Custom Paperboard Sleeves',
      ],
    },
    {
      title: 'Materials',
      num: '02',
      badge: 'Board & Cardstock Range',
      subtitle: 'Certified Paperboard & High-Substance Boards',
      color: '#00aeef',
      icon: <Layers size={24} strokeWidth={2.2} />,
      metric: 'FSC & Food Grade Boards',
      description:
        'Paperboard (cardstock) is a heavy or thick paper-based material including metallic paperboard, plus various other boards. All paperboard (including kraft) can be cut and formed easily while remaining stable to protect contents.',
      items: [
        'FBB (Folding Box Board)',
        'SBS & SCB Boards',
        'Greyback Board',
        'Safire Graphic & Metallic Boards',
      ],
    },
    {
      title: 'Labels',
      num: '03',
      badge: 'Zero-Error Optical Labels',
      subtitle: 'Pharma & FMCG High-Speed Rolls',
      color: '#f59e0b',
      icon: <Sparkles size={24} strokeWidth={2.2} />,
      metric: 'Tubescan <0.5mm Inspection',
      description:
        'Manufactured in a hygienic, clean and centrally air-conditioned environment for pharmaceutical and FMCG sectors. Zero Error Printing with Tubescan 100% inspection detecting < 0.5 mm defects.',
      items: [
        'Pharmaceutical Security Labels',
        'FMCG Pressure-Sensitive Labels',
        'Tubescan 100% Optical Inspection',
        'Serialized Anti-Counterfeiting',
      ],
    },
  ]

  return (
    <section
      id="capabilities"
      style={{
        padding: '135px 0 60px 0',
        backgroundColor: '#f8fafc',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="container">
        {/* Section Header */}
        <ScrollReveal direction="up" delay={0.05}>
          <SectionHeader
            badge="End-to-End Capabilities"
            badgeVariant="cyan"
            title="From Design to Production to Storage,"
            titleHighlight="We Have Your Projects Covered."
            subtitle="Operating 24/7 in 40,000 square feet of secured space. All facilities have on-site security and are CCTV monitored for the protection of our clients' work and our employees."
          />
        </ScrollReveal>

        {/* 3 Core Capability Pillars: Packaging, Materials, Labels */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
            gap: '24px',
            marginBottom: '32px',
            alignItems: 'stretch',
          }}
        >
          {PILLARS.map((pillar, idx) => (
            <ScrollReveal key={pillar.title} direction="up" delay={0.1 * (idx + 1)}>
              <InteractiveTiltCard
                className="smoke-hover-card"
                glowColor={`${pillar.color}25`}
                onClick={() => setSelectedPillar(pillar)}
                style={{
                  padding: '34px 28px 28px 28px',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: '#ffffff',
                  borderRadius: 22,
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.03)',
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                {/* Top Colored Accent Bar */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '4px',
                    background: `linear-gradient(90deg, ${pillar.color} 0%, ${pillar.color}40 100%)`,
                  }}
                />

                {/* Subtle Ambient Corner Glow */}
                <div
                  style={{
                    position: 'absolute',
                    top: -24,
                    right: -24,
                    width: 120,
                    height: 120,
                    borderRadius: '50%',
                    background: `radial-gradient(circle, ${pillar.color}15 0%, transparent 70%)`,
                    pointerEvents: 'none',
                  }}
                />

                {/* Card Top: Icon + Number + Badge */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '20px',
                    position: 'relative',
                    zIndex: 1,
                  }}
                >
                  <div
                    style={{
                      width: '52px',
                      height: '52px',
                      borderRadius: '16px',
                      backgroundColor: `${pillar.color}12`,
                      color: pillar.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: `1px solid ${pillar.color}25`,
                      boxShadow: `0 4px 12px ${pillar.color}15`,
                    }}
                  >
                    {pillar.icon}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span
                      style={{
                        padding: '4px 12px',
                        borderRadius: 999,
                        backgroundColor: `${pillar.color}10`,
                        color: pillar.color,
                        fontSize: '0.72rem',
                        fontWeight: 800,
                        letterSpacing: '0.02em',
                      }}
                    >
                      {pillar.badge}
                    </span>
                    <span
                      style={{
                        fontSize: '0.85rem',
                        fontWeight: 900,
                        color: '#cbd5e1',
                        letterSpacing: '0.05em',
                      }}
                    >
                      {pillar.num}
                    </span>
                  </div>
                </div>

                {/* Title & Subtitle */}
                <div style={{ marginBottom: '12px', position: 'relative', zIndex: 1 }}>
                  <div
                    style={{
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      color: pillar.color,
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      marginBottom: '4px',
                    }}
                  >
                    {pillar.subtitle}
                  </div>
                  <h3
                    style={{
                      fontSize: '1.5rem',
                      fontWeight: 800,
                      color: '#111827',
                      margin: 0,
                    }}
                  >
                    {pillar.title}
                  </h3>
                </div>

                {/* Description */}
                <p
                  style={{
                    fontSize: '0.88rem',
                    color: '#4b5563',
                    lineHeight: 1.7,
                    marginBottom: '20px',
                    position: 'relative',
                    zIndex: 1,
                  }}
                >
                  {pillar.description}
                </p>

                {/* Capability Bullet Specifications */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    marginBottom: '20px',
                    position: 'relative',
                    zIndex: 1,
                  }}
                >
                  {pillar.items.map((item) => (
                    <div
                      key={item}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        fontSize: '0.82rem',
                        color: '#1e293b',
                        fontWeight: 600,
                      }}
                    >
                      <span
                        style={{
                          width: '6px',
                          height: '6px',
                          borderRadius: '50%',
                          backgroundColor: pillar.color,
                          flexShrink: 0,
                        }}
                      />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                {/* Technical Metric Highlight Banner */}
                <div
                  style={{
                    padding: '8px 12px',
                    borderRadius: '10px',
                    backgroundColor: '#f8fafc',
                    border: '1px solid #f1f5f9',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginTop: 'auto',
                    marginBottom: '16px',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    color: '#334155',
                    position: 'relative',
                    zIndex: 1,
                  }}
                >
                  <CheckCircle2 size={14} color={pillar.color} style={{ flexShrink: 0 }} />
                  <span>{pillar.metric}</span>
                </div>

                {/* Action Link */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '14px',
                    borderTop: '1px solid #f1f5f9',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    color: pillar.color,
                    position: 'relative',
                    zIndex: 1,
                  }}
                >
                  <span>Explore full specifications</span>
                  <ArrowRight size={15} />
                </div>
              </InteractiveTiltCard>
            </ScrollReveal>
          ))}
        </div>

        {/* 6-Step Production Journey with Scroll-Driven Entrance Animations */}
        <div style={{ marginBottom: '40px' }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ textAlign: 'center', marginBottom: '36px' }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '4px 14px',
                borderRadius: 999,
                backgroundColor: 'rgba(0,174,239,0.1)',
                color: '#00aeef',
                fontSize: '0.75rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                marginBottom: 10,
              }}
            >
              Automated Production Workflow
            </div>
            <h3 style={{ fontSize: '1.85rem', color: '#111827', marginBottom: 8 }}>
              DESIGN → PRINT → CUT → FOLD → FINISH → PACKAGING
            </h3>
            <p style={{ fontSize: '0.95rem', color: '#6b7280', margin: 0 }}>
              Every order follows a tightly controlled, automated production workflow ensuring zero
              defects.
            </p>
          </motion.div>

          {/* Interactive Steps Grid Tabs with Staggered Scroll Reveal */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
              gap: '10px',
              marginBottom: '28px',
            }}
          >
            {PRODUCTION_JOURNEY.map((item, idx) => {
              const isSelected = activeStep === idx
              return (
                <motion.button
                  key={item.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  whileHover={{ scale: 1.04, y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveStep(idx)}
                  className="smoke-hover-card"
                  style={{
                    padding: '16px 14px',
                    borderRadius: '16px',
                    textAlign: 'left',
                    backgroundColor: isSelected ? '#ffffff' : 'rgba(255, 255, 255, 0.85)',
                    border: isSelected ? '2px solid #dc2626' : '1px solid #e5e7eb',
                    boxShadow: isSelected
                      ? '0 0 20px rgba(220,38,38,0.25), 0 8px 20px rgba(0,0,0,0.06)'
                      : '0 2px 8px rgba(0,0,0,0.03)',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                    width: '100%',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '6px',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '0.72rem',
                        fontWeight: 800,
                        color: isSelected ? '#dc2626' : '#9ca3af',
                      }}
                    >
                      STEP {item.step}
                    </span>
                    <div style={{ color: isSelected ? '#dc2626' : '#6b7280' }}>
                      {getStepIcon(item.icon)}
                    </div>
                  </div>
                  <span
                    style={{
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      color: '#6b7280',
                      display: 'block',
                      textTransform: 'uppercase',
                    }}
                  >
                    {item.phase}
                  </span>
                  <span
                    style={{
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      color: '#111827',
                      display: 'block',
                      marginTop: '2px',
                    }}
                  >
                    {item.title}
                  </span>
                </motion.button>
              )
            })}
          </div>

          {/* Active Step Detailed Showcase Card with Image & Motion Reveal */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="smoke-hover-card"
              style={{
                padding: '32px',
                backgroundColor: '#ffffff',
                borderRadius: '20px',
                border: '1px solid #e5e7eb',
                boxShadow: '0 10px 30px -10px rgba(0,0,0,0.06)',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '28px',
                alignItems: 'center',
              }}
            >
              <div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    marginBottom: '10px',
                  }}
                >
                  <span
                    style={{
                      padding: '3px 10px',
                      borderRadius: 999,
                      backgroundColor: 'rgba(220,38,38,0.1)',
                      color: '#dc2626',
                      fontSize: '0.75rem',
                      fontWeight: 800,
                    }}
                  >
                    STEP {PRODUCTION_JOURNEY[activeStep].step}
                  </span>
                  <span style={{ color: '#d1d5db' }}>•</span>
                  <span
                    style={{
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      color: '#6b7280',
                      textTransform: 'uppercase',
                    }}
                  >
                    {PRODUCTION_JOURNEY[activeStep].phase}
                  </span>
                </div>

                <h4 style={{ fontSize: '1.5rem', color: '#111827', marginBottom: '12px' }}>
                  {PRODUCTION_JOURNEY[activeStep].title}
                </h4>

                <p style={{ fontSize: '0.95rem', color: '#4b5563', lineHeight: 1.75 }}>
                  {PRODUCTION_JOURNEY[activeStep].description}
                </p>

                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    marginTop: 18,
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    color: '#00aeef',
                  }}
                >
                  <span>Automated Quality Check Active</span>
                  <ArrowRight size={14} />
                </div>
              </div>

              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
                style={{
                  height: 220,
                  borderRadius: 16,
                  overflow: 'hidden',
                  backgroundColor: '#1e293b',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                }}
              >
                <img
                  src={JOURNEY_IMAGES[activeStep % JOURNEY_IMAGES.length]}
                  alt={PRODUCTION_JOURNEY[activeStep].title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 40,000 Sq.Ft Secured Environment & CCTV Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          onClick={() => setShowSecurityModal(true)}
          style={{
            padding: '44px 40px',
            borderRadius: '24px',
            backgroundColor: '#111827',
            color: '#ffffff',
            boxShadow: '0 20px 40px -10px rgba(0,0,0,0.3)',
            cursor: 'pointer',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Ambient Radial Gradient */}
          <div
            style={{
              position: 'absolute',
              top: '-30%',
              right: '-10%',
              width: 400,
              height: 400,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(220,38,38,0.2) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
              gap: '36px',
              alignItems: 'center',
            }}
          >
            <div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '4px 12px',
                  borderRadius: 999,
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  color: '#facc15',
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  marginBottom: '16px',
                }}
              >
                <ShieldCheck size={14} /> High-Security Facility
              </div>

              <h3
                style={{
                  fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)',
                  color: '#ffffff',
                  marginBottom: '14px',
                }}
              >
                40,000 Sq. Ft. Secured Space
              </h3>

              <p
                style={{
                  fontSize: '0.95rem',
                  color: '#d1d5db',
                  lineHeight: 1.75,
                  marginBottom: '20px',
                }}
              >
                We operate 24/7 in <strong>40,000 square feet of secured space</strong> with a 24/7
                Security &amp; Access-Controlled Environment. All facilities have on-site security
                and are CCTV monitored for the safety and protection of our clients’ work and our
                employees.
              </p>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#f59e0b',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                }}
              >
                <Clock size={16} />
                <span>Round-The-Clock 24/7 Monitored Operations (Click to expand)</span>
              </div>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))',
                gap: '14px',
              }}
            >
              {[
                {
                  icon: <Lock size={20} color="#f59e0b" />,
                  title: 'Access Controlled',
                  desc: 'Secure entry protocols for proprietary designs',
                },
                {
                  icon: <Video size={20} color="#e07060" />,
                  title: 'CCTV Monitored',
                  desc: 'Comprehensive optical coverage across all plant zones',
                },
                {
                  icon: <ShieldCheck size={20} color="#facc15" />,
                  title: 'On-Site Security',
                  desc: 'Stationed personnel safeguarding client materials',
                },
                {
                  icon: <Box size={20} color="#4ade80" />,
                  title: 'Protected Storage',
                  desc: 'Secured warehouse for finished inventory',
                },
              ].map((sec) => (
                <div
                  key={sec.title}
                  style={{
                    padding: '18px',
                    borderRadius: '16px',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                  }}
                >
                  <div style={{ marginBottom: '10px' }}>{sec.icon}</div>
                  <h5 style={{ fontSize: '0.95rem', color: '#ffffff', marginBottom: '4px' }}>
                    {sec.title}
                  </h5>
                  <p style={{ fontSize: '0.75rem', color: '#9ca3af', lineHeight: 1.5, margin: 0 }}>
                    {sec.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── MODAL 1: Capability Pillar Detail ────────────────────────────── */}
      <AnimatePresence>
        {selectedPillar && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPillar(null)}
            className="company-modal-backdrop"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="company-modal-content"
              style={{ overflow: 'hidden', padding: 0, position: 'relative' }}
            >
              {/* Header Top Accent Bar */}
              <div
                style={{
                  height: 6,
                  background: `linear-gradient(90deg, ${selectedPillar.color} 0%, ${selectedPillar.color}40 100%)`,
                }}
              />

              <div style={{ padding: '36px 36px 32px 36px' }}>
                {/* Header row with close button */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    marginBottom: 20,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <div
                      style={{
                        width: 52,
                        height: 52,
                        borderRadius: 16,
                        backgroundColor: `${selectedPillar.color}15`,
                        color: selectedPillar.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: `1px solid ${selectedPillar.color}30`,
                      }}
                    >
                      {selectedPillar.icon}
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: '0.72rem',
                          fontWeight: 800,
                          color: selectedPillar.color,
                          textTransform: 'uppercase',
                          letterSpacing: '0.08em',
                        }}
                      >
                        {selectedPillar.subtitle}
                      </div>
                      <h3
                        style={{
                          fontSize: '1.75rem',
                          color: '#111827',
                          fontWeight: 800,
                          margin: '2px 0 0 0',
                        }}
                      >
                        {selectedPillar.title} Capabilities
                      </h3>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedPillar(null)}
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: '50%',
                      backgroundColor: '#f1f5f9',
                      color: '#475569',
                      border: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      transition: 'background 0.2s',
                    }}
                  >
                    <X size={18} />
                  </button>
                </div>

                <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
                  <span
                    style={{
                      padding: '4px 12px',
                      borderRadius: 999,
                      backgroundColor: `${selectedPillar.color}12`,
                      color: selectedPillar.color,
                      fontSize: '0.75rem',
                      fontWeight: 700,
                    }}
                  >
                    {selectedPillar.badge}
                  </span>
                  <span
                    style={{
                      padding: '4px 12px',
                      borderRadius: 999,
                      backgroundColor: '#f1f5f9',
                      color: '#475569',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                    }}
                  >
                    ✓ {selectedPillar.metric}
                  </span>
                </div>

                <p
                  style={{
                    fontSize: '0.95rem',
                    color: '#4b5563',
                    lineHeight: 1.8,
                    marginBottom: 24,
                  }}
                >
                  {selectedPillar.description}
                </p>

                <h5
                  style={{
                    fontSize: '0.75rem',
                    color: '#64748b',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    marginBottom: 12,
                  }}
                >
                  KEY PRODUCT SPECIFICATIONS
                </h5>

                <ul
                  style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0,
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))',
                    gap: 12,
                  }}
                >
                  {selectedPillar.items.map((item) => (
                    <li
                      key={item}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                        padding: '10px 14px',
                        borderRadius: 12,
                        backgroundColor: '#f8fafc',
                        border: '1px solid #e2e8f0',
                        fontSize: '0.85rem',
                        color: '#1e293b',
                        fontWeight: 600,
                      }}
                    >
                      <CheckCircle2 size={16} color={selectedPillar.color} style={{ flexShrink: 0 }} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── MODAL 2: Plant Security Protocols Detail ──────────────────────── */}
      <AnimatePresence>
        {showSecurityModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowSecurityModal(false)}
            className="company-modal-backdrop"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="company-modal-content"
              style={{ padding: '32px' }}
            >
              <button
                onClick={() => setShowSecurityModal(false)}
                style={{
                  position: 'absolute',
                  top: 20,
                  right: 20,
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  backgroundColor: '#f3f4f6',
                  color: '#4b5563',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                <X size={18} />
              </button>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  color: '#dc2626',
                  marginBottom: 12,
                }}
              >
                <ShieldCheck size={28} />
                <h3 style={{ fontSize: '1.5rem', color: '#111827', margin: 0 }}>
                  40,000 Sq. Ft. Plant Security Standard
                </h3>
              </div>

              <p
                style={{
                  fontSize: '0.95rem',
                  color: '#4b5563',
                  lineHeight: 1.75,
                  marginBottom: 20,
                }}
              >
                Kolli Graphics enforces multi-tiered physical and asset protection protocols across
                our entire 40,000 square foot facility in Hyderabad:
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  '24/7 Stationed security personnel at entry and exit checkpoints',
                  'High-definition CCTV coverage across all printing, finishing, and storage bays',
                  'Biometric access restrictions to proprietary artwork and pre-press servers',
                  'Centrally air-conditioned and climate-controlled cleanroom for sensitive pharmaceutical labels',
                  'Dedicated secure storage area for finished goods awaiting client dispatch',
                ].map((highlight) => (
                  <div
                    key={highlight}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      padding: '12px 16px',
                      borderRadius: 12,
                      backgroundColor: '#f8fafc',
                      border: '1px solid #e2e8f0',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      color: '#1e293b',
                    }}
                  >
                    <CheckCircle2 size={18} color="#00aeef" style={{ flexShrink: 0 }} />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
