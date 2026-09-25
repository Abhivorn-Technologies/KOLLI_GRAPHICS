import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Cpu,
  CheckCircle2,
  Sparkles,
  Scissors,
  Layers,
  ShieldCheck,
  Sun,
  Sliders,
  Award,
  Zap,
  Wind,
  Barcode,
  SearchCheck,
} from 'lucide-react'
import { SectionHeader } from '../common/SectionHeader'
import { ImageWithFallback } from '../common/ImageWithFallback'
import { CARTON_FINISHING, LABEL_FINISHING } from '../../data/processes'
import type { FinishingMethod } from '../../data/processes'

export const FinishingSection: React.FC = () => {
  const [activeFinishingId, setActiveFinishingId] = useState<string>(CARTON_FINISHING[0].id)
  const [foilColor, setFoilColor] = useState<'gold' | 'silver' | 'bronze'>('gold')
  const [isScanning, setIsScanning] = useState<boolean>(true)

  const currentFinish: FinishingMethod =
    CARTON_FINISHING.find((f) => f.id === activeFinishingId) || CARTON_FINISHING[0]

  const getFinishIcon = (id: string) => {
    switch (id) {
      case 'uv-coating':
        return <Sun size={18} />
      case 'die-cutting':
        return <Scissors size={18} />
      case 'embossing':
        return <Layers size={18} />
      case 'micro-embossing':
        return <Sparkles size={18} />
      case 'foil-stamping':
        return <Award size={18} />
      case 'foil-embossing':
        return <Zap size={18} />
      default:
        return <Sparkles size={18} />
    }
  }

  const foilGradients = {
    gold: 'linear-gradient(135deg, #d97706 0%, #fef3c7 45%, #b45309 80%, #78350f 100%)',
    silver: 'linear-gradient(135deg, #9ca3af 0%, #ffffff 45%, #6b7280 80%, #374151 100%)',
    bronze: 'linear-gradient(135deg, #a16207 0%, #fde68a 45%, #854d0e 80%, #451a03 100%)',
  }

  return (
    <section id="finishing" style={{ padding: '56px 0', backgroundColor: '#f8fafc' }}>
      <div className="container">
        {/* Section Header */}
        <SectionHeader
          badge="Post-Press Mastery"
          badgeVariant="cyan"
          title="Finishing – Cartons &"
          titleHighlight="Pharma Labels"
          subtitle="Explore sensory surface architecture and post-press embellishments that transform standard paperboard into luxury packaging, backed by 100% Tubescan optical verification."
        />

        {/* ── PART 1: CARTON FINISHING EMBELLISHMENTS ─────────────────────── */}
        <div style={{ marginBottom: '84px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <span
              style={{
                fontSize: '0.78rem',
                fontWeight: 800,
                color: '#dc2626',
                textTransform: 'uppercase',
                letterSpacing: '0.09em',
              }}
            >
              Carton Finishing Architecture
            </span>
            <h3
              style={{ fontSize: '1.85rem', color: '#111827', fontWeight: 800, marginTop: '4px' }}
            >
              Sensory Surface &amp; Foil Embellishments
            </h3>
            <p
              style={{
                fontSize: '0.925rem',
                color: '#64748b',
                maxWidth: '620px',
                margin: '6px auto 0',
              }}
            >
              Select a post-press technique below to inspect machine operations, surface physics,
              and document specifications.
            </p>
          </div>

          {/* Finish Selection Grid / Pill Tabs */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '12px',
              marginBottom: '36px',
            }}
          >
            {CARTON_FINISHING.map((finish) => {
              const isSelected = finish.id === activeFinishingId
              return (
                <button
                  key={finish.id}
                  onClick={() => setActiveFinishingId(finish.id)}
                  style={{
                    padding: '14px 18px',
                    borderRadius: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    backgroundColor: isSelected ? '#ffffff' : 'rgba(255, 255, 255, 0.7)',
                    color: isSelected ? '#dc2626' : '#475569',
                    border: isSelected ? '2px solid #dc2626' : '1px solid #e2e8f0',
                    boxShadow: isSelected ? '0 4px 16px rgba(220, 38, 38, 0.15)' : 'none',
                    cursor: 'pointer',
                    transition: 'all 0.22s ease',
                    textAlign: 'left',
                  }}
                >
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      backgroundColor: isSelected ? '#fee2e2' : '#f1f5f9',
                      color: isSelected ? '#dc2626' : '#64748b',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    {getFinishIcon(finish.id)}
                  </div>
                  <div>
                    <span style={{ fontSize: '0.875rem', fontWeight: 700, display: 'block' }}>
                      {finish.name}
                    </span>
                    <span style={{ fontSize: '0.68rem', color: '#94a3b8', fontWeight: 500 }}>
                      {finish.type.toUpperCase()}
                    </span>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Interactive Simulation Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentFinish.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '36px',
                padding: '36px',
                borderRadius: '24px',
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                boxShadow: '0 8px 30px rgba(0,0,0,0.04)',
                alignItems: 'center',
              }}
            >
              {/* Left Column: Clean Light-Mode Visual Showcase Card */}
              <div
                style={{
                  padding: '24px',
                  borderRadius: '20px',
                  backgroundColor: '#ffffff',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                }}
              >
                {/* Header Badge & Foil Selector */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '10px',
                  }}
                >
                  <span
                    style={{
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      padding: '4px 12px',
                      borderRadius: '999px',
                      backgroundColor: '#fee2e2',
                      color: '#dc2626',
                      border: '1px solid #fecaca',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                    }}
                  >
                    {currentFinish.name} Machine
                  </span>

                  {/* Foil Sheen Switcher for Foil finishes */}
                  {(currentFinish.id === 'foil-stamping' ||
                    currentFinish.id === 'foil-embossing' ||
                    currentFinish.id === 'micro-embossing') && (
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        backgroundColor: '#f8fafc',
                        padding: '4px 10px',
                        borderRadius: '999px',
                        border: '1px solid #e2e8f0',
                      }}
                    >
                      <Sliders size={12} color="#64748b" />
                      <span style={{ fontSize: '0.68rem', fontWeight: 700, color: '#475569' }}>
                        Foil:
                      </span>
                      {(['gold', 'silver', 'bronze'] as const).map((color) => (
                        <button
                          key={color}
                          onClick={() => setFoilColor(color)}
                          style={{
                            width: '16px',
                            height: '16px',
                            borderRadius: '50%',
                            background: foilGradients[color],
                            border: foilColor === color ? '2px solid #dc2626' : '1px solid #cbd5e1',
                            cursor: 'pointer',
                            transform: foilColor === color ? 'scale(1.2)' : 'scale(1)',
                            transition: 'all 0.18s ease',
                          }}
                          title={`${color.toUpperCase()} Foil`}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Bright Crisp Equipment / Finish Image Frame */}
                <div
                  style={{
                    position: 'relative',
                    height: '240px',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    backgroundColor: '#f1f5f9',
                    border: '1px solid #e2e8f0',
                  }}
                >
                  <ImageWithFallback
                    src={
                      currentFinish.id === 'die-cutting'
                        ? '/assets/images/equipment/bobst-evoline.png'
                        : currentFinish.id === 'foil-stamping' ||
                            currentFinish.id === 'foil-embossing'
                          ? '/assets/images/equipment/bobst-bma.png'
                          : '/assets/images/equipment/heidelberg-cd102.png'
                    }
                    alt={currentFinish.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />

                  {/* Dynamic Sheen Sweep Line */}
                  <motion.div
                    animate={{ x: ['-140%', '180%'] }}
                    transition={{ repeat: Infinity, duration: 2.8, ease: 'easeInOut' }}
                    style={{
                      position: 'absolute',
                      top: 0,
                      bottom: 0,
                      width: '45%',
                      background: currentFinish.id.includes('foil')
                        ? foilGradients[foilColor]
                        : 'linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.6) 50%, transparent 80%)',
                      opacity: 0.4,
                      transform: 'skewX(-25deg)',
                      pointerEvents: 'none',
                    }}
                  />

                  {/* Equipment Model Tag */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '10px',
                      left: '10px',
                      padding: '4px 10px',
                      borderRadius: '8px',
                      backgroundColor: 'rgba(255,255,255,0.95)',
                      border: '1px solid #e2e8f0',
                      fontSize: '0.68rem',
                      fontWeight: 700,
                      color: '#0f172a',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                    }}
                  >
                    {currentFinish.id === 'die-cutting'
                      ? 'BOBST SP Evoline 102 E'
                      : currentFinish.id === 'foil-stamping' ||
                          currentFinish.id === 'foil-embossing'
                        ? 'BOBST 102 BMA Foil Stamper'
                        : 'Heidelberg CD 102 5 XL'}
                  </div>
                </div>

                {/* Bottom Highlight Card */}
                <div
                  style={{
                    padding: '16px',
                    borderRadius: '14px',
                    backgroundColor: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                  }}
                >
                  <div
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '10px',
                      backgroundColor: '#fee2e2',
                      color: '#dc2626',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    {getFinishIcon(currentFinish.id)}
                  </div>
                  <div>
                    <span
                      style={{
                        fontSize: '0.8125rem',
                        fontWeight: 800,
                        color: '#111827',
                        display: 'block',
                      }}
                    >
                      {currentFinish.name} Effect
                    </span>
                    <span
                      style={{
                        fontSize: '0.72rem',
                        color: '#64748b',
                        lineHeight: 1.4,
                        display: 'block',
                      }}
                    >
                      {currentFinish.effect}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: Exact Document Specs & Technical Details */}
              <div>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '5px 14px',
                    borderRadius: '999px',
                    backgroundColor: '#fee2e2',
                    border: '1px solid #fecaca',
                    color: '#dc2626',
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    marginBottom: '14px',
                  }}
                >
                  {currentFinish.tagline}
                </div>

                <h3
                  style={{
                    fontSize: '1.75rem',
                    color: '#111827',
                    fontWeight: 800,
                    marginBottom: '14px',
                  }}
                >
                  {currentFinish.name}
                </h3>

                <p
                  style={{
                    fontSize: '0.925rem',
                    color: '#475569',
                    lineHeight: 1.75,
                    marginBottom: '22px',
                  }}
                >
                  {currentFinish.description}
                </p>

                {/* Visual & Tactile Result Card */}
                <div
                  style={{
                    padding: '18px 22px',
                    borderRadius: '16px',
                    backgroundColor: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    marginBottom: '24px',
                  }}
                >
                  <div
                    style={{
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      color: '#dc2626',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      marginBottom: '4px',
                    }}
                  >
                    Visual &amp; Tactile Result:
                  </div>
                  <div
                    style={{
                      fontSize: '0.875rem',
                      color: '#1e293b',
                      fontWeight: 600,
                      lineHeight: 1.6,
                    }}
                  >
                    {currentFinish.effect}
                  </div>
                  <div
                    style={{
                      fontSize: '0.78rem',
                      color: '#64748b',
                      marginTop: '6px',
                      fontStyle: 'italic',
                    }}
                  >
                    <strong>Technical Execution:</strong> {currentFinish.technicalDetails}
                  </div>
                </div>

                {/* Specifications Checklist */}
                <div>
                  <h4
                    style={{
                      fontSize: '0.78rem',
                      fontWeight: 800,
                      color: '#64748b',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      marginBottom: '12px',
                    }}
                  >
                    Key Specifications &amp; Features:
                  </h4>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                      gap: '10px',
                    }}
                  >
                    {currentFinish.features.map((feat) => (
                      <div
                        key={feat}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          fontSize: '0.825rem',
                          color: '#1e293b',
                          fontWeight: 600,
                        }}
                      >
                        <CheckCircle2 size={15} color="#dc2626" style={{ flexShrink: 0 }} />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── PART 2: PHARMACEUTICAL & FMCG LABELS — HIGH-TECH REDESIGN ── */}
        <div style={{ marginBottom: '40px' }}>
          {/* Header Banner */}
          <div
            style={{
              padding: '36px 40px',
              borderRadius: '24px',
              background: 'linear-gradient(135deg, #111827 0%, #1f2937 100%)',
              color: '#ffffff',
              marginBottom: '32px',
              boxShadow: '0 8px 30px rgba(17,24,39,0.12)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '28px',
              alignItems: 'center',
            }}
          >
            <div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '5px 14px',
                  borderRadius: '999px',
                  backgroundColor: 'rgba(220,38,38,0.2)',
                  border: '1px solid rgba(220,38,38,0.4)',
                  color: '#f87171',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  marginBottom: '12px',
                }}
              >
                <ShieldCheck size={14} />
                Pharmaceutical &amp; FMCG Label Excellence
              </div>
              <h3
                style={{
                  fontSize: 'clamp(1.6rem, 2.8vw, 2.2rem)',
                  color: '#ffffff',
                  fontWeight: 800,
                  margin: '0 0 10px 0',
                  lineHeight: 1.18,
                }}
              >
                Finishing – Labels: Zero Error Guarantee
              </h3>
              <p style={{ fontSize: '0.925rem', color: '#d1d5db', lineHeight: 1.7, margin: 0 }}>
                {LABEL_FINISHING.overview}
              </p>
            </div>

            {/* Cleanroom Environment Highlight Box */}
            <div
              style={{
                padding: '24px',
                borderRadius: '18px',
                backgroundColor: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.12)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  marginBottom: '10px',
                  color: '#00aeef',
                }}
              >
                <Wind size={22} />
                <h4 style={{ fontSize: '1.05rem', color: '#ffffff', fontWeight: 800, margin: 0 }}>
                  Centrally Air-Conditioned Cleanroom
                </h4>
              </div>
              <p style={{ fontSize: '0.85rem', color: '#cbd5e1', lineHeight: 1.6, margin: 0 }}>
                {LABEL_FINISHING.environment}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '14px' }}>
                {['Hygienic Environment', 'Climate Controlled', 'Pharma Standard'].map((chip) => (
                  <span
                    key={chip}
                    style={{
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      padding: '3px 10px',
                      borderRadius: '999px',
                      backgroundColor: 'rgba(0,174,239,0.2)',
                      color: '#38bdf8',
                      border: '1px solid rgba(0,174,239,0.3)',
                    }}
                  >
                    ✓ {chip}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* 4 Feature Cards Grid: Tubescan, Spectrophotometric, Varnishing, Serial Numbering */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '24px',
              marginBottom: '32px',
            }}
          >
            {/* Card 1: Zero Error Printing & Tubescan Simulator */}
            <div
              style={{
                padding: '28px',
                borderRadius: '20px',
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                flex: '1 1 280px',
                maxWidth: '360px',
              }}
            >
              <div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '16px',
                  }}
                >
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '12px',
                      backgroundColor: '#fee2e2',
                      color: '#dc2626',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <SearchCheck size={22} />
                  </div>
                  <span
                    style={{
                      fontSize: '0.7rem',
                      fontWeight: 800,
                      padding: '4px 10px',
                      borderRadius: '999px',
                      backgroundColor: '#dc2626',
                      color: '#ffffff',
                      textTransform: 'uppercase',
                    }}
                  >
                    &lt; 0.5 mm Accuracy
                  </span>
                </div>

                <h4
                  style={{
                    fontSize: '1.25rem',
                    color: '#111827',
                    fontWeight: 800,
                    marginBottom: '8px',
                  }}
                >
                  {LABEL_FINISHING.zeroErrorPrinting.title}
                </h4>
                <p
                  style={{
                    fontSize: '0.875rem',
                    color: '#475569',
                    lineHeight: 1.68,
                    marginBottom: '18px',
                  }}
                >
                  {LABEL_FINISHING.zeroErrorPrinting.description}
                </p>
              </div>

              {/* Tubescan Mini Camera Scanner Widget */}
              <div
                style={{
                  position: 'relative',
                  height: '140px',
                  borderRadius: '14px',
                  backgroundColor: '#0f172a',
                  border: '1px solid #0284c7',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '16px',
                }}
              >
                <button
                  onClick={() => setIsScanning(!isScanning)}
                  style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    padding: '3px 8px',
                    borderRadius: '999px',
                    backgroundColor: isScanning ? '#dc2626' : '#ffffff',
                    color: isScanning ? '#ffffff' : '#0f172a',
                    border: 'none',
                    fontSize: '0.62rem',
                    fontWeight: 800,
                    cursor: 'pointer',
                    zIndex: 10,
                  }}
                >
                  {isScanning ? 'PAUSE SCAN' : 'START SCAN'}
                </button>

                {isScanning && (
                  <motion.div
                    animate={{ y: ['-50px', '50px'] }}
                    transition={{
                      repeat: Infinity,
                      repeatType: 'reverse',
                      duration: 1.8,
                      ease: 'linear',
                    }}
                    style={{
                      position: 'absolute',
                      left: 0,
                      right: 0,
                      height: '2px',
                      backgroundColor: '#dc2626',
                      boxShadow: '0 0 12px #dc2626',
                      zIndex: 5,
                    }}
                  />
                )}

                <div
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    backgroundColor: '#ffffff',
                    borderRadius: '8px',
                    boxShadow: '0 4px 14px rgba(0,0,0,0.3)',
                    textAlign: 'center',
                    zIndex: 2,
                  }}
                >
                  <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#dc2626' }}>
                    PRATI TUBESCAN OPTICAL INSPECTION
                  </span>
                  <div style={{ fontSize: '0.65rem', color: '#64748b', marginTop: '2px' }}>
                    Micron Dust Detection: PASS | Zero Text Errors
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Zero Non-Uniformity In Colors */}
            <div
              style={{
                padding: '28px',
                borderRadius: '20px',
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                flex: '1 1 280px',
                maxWidth: '360px',
              }}
            >
              <div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '16px',
                  }}
                >
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '12px',
                      backgroundColor: '#e0f2fe',
                      color: '#00aeef',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Cpu size={22} />
                  </div>
                  <span
                    style={{
                      fontSize: '0.7rem',
                      fontWeight: 800,
                      padding: '4px 10px',
                      borderRadius: '999px',
                      backgroundColor: '#00aeef',
                      color: '#ffffff',
                      textTransform: 'uppercase',
                    }}
                  >
                    Closed-Loop Sensing
                  </span>
                </div>

                <h4
                  style={{
                    fontSize: '1.25rem',
                    color: '#111827',
                    fontWeight: 800,
                    marginBottom: '8px',
                  }}
                >
                  {LABEL_FINISHING.zeroNonUniformity.title}
                </h4>
                <p
                  style={{
                    fontSize: '0.875rem',
                    color: '#475569',
                    lineHeight: 1.68,
                    marginBottom: '18px',
                  }}
                >
                  {LABEL_FINISHING.zeroNonUniformity.description}
                </p>
              </div>

              {/* Color Uniformity Spectrum Bar */}
              <div
                style={{
                  padding: '16px',
                  borderRadius: '14px',
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                }}
              >
                <div
                  style={{
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    color: '#00aeef',
                    textTransform: 'uppercase',
                    marginBottom: '6px',
                  }}
                >
                  Continuous Spectrophotometric Control:
                </div>
                <div
                  style={{
                    height: '10px',
                    borderRadius: '999px',
                    background:
                      'linear-gradient(to right, #00aeef 0%, #ec008c 35%, #f59e0b 70%, #dc2626 100%)',
                    marginBottom: '6px',
                  }}
                />
                <div
                  style={{
                    fontSize: '0.68rem',
                    color: '#64748b',
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <span>Automatic Sensing</span>
                  <span>Zero Manual Error</span>
                </div>
              </div>
            </div>

            {/* Card 3: Protective Heat-Cured Varnishing */}
            <div
              style={{
                padding: '28px',
                borderRadius: '20px',
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                flex: '1 1 280px',
                maxWidth: '360px',
              }}
            >
              <div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '16px',
                  }}
                >
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '12px',
                      backgroundColor: '#fee2e2',
                      color: '#dc2626',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Sun size={22} />
                  </div>
                  <span
                    style={{
                      fontSize: '0.7rem',
                      fontWeight: 800,
                      padding: '4px 10px',
                      borderRadius: '999px',
                      backgroundColor: '#fee2e2',
                      color: '#dc2626',
                    }}
                  >
                    Heat-Cured Layer
                  </span>
                </div>

                <h4
                  style={{
                    fontSize: '1.25rem',
                    color: '#111827',
                    fontWeight: 800,
                    marginBottom: '8px',
                  }}
                >
                  {LABEL_FINISHING.varnishing.title}
                </h4>
                <p
                  style={{
                    fontSize: '0.875rem',
                    color: '#475569',
                    lineHeight: 1.68,
                    marginBottom: '18px',
                  }}
                >
                  {LABEL_FINISHING.varnishing.description}
                </p>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {LABEL_FINISHING.varnishing.benefits.map((b) => (
                  <span
                    key={b}
                    style={{
                      fontSize: '0.72rem',
                      padding: '5px 12px',
                      borderRadius: '8px',
                      backgroundColor: '#fee2e2',
                      color: '#dc2626',
                      fontWeight: 700,
                    }}
                  >
                    ✓ {b}
                  </span>
                ))}
              </div>
            </div>

            {/* Card 4: Serial Numbering & Track-and-Trace */}
            <div
              style={{
                padding: '28px',
                borderRadius: '20px',
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                flex: '1 1 280px',
                maxWidth: '360px',
              }}
            >
              <div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '16px',
                  }}
                >
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '12px',
                      backgroundColor: '#e0f2fe',
                      color: '#00aeef',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Barcode size={22} />
                  </div>
                  <span
                    style={{
                      fontSize: '0.7rem',
                      fontWeight: 800,
                      padding: '4px 10px',
                      borderRadius: '999px',
                      backgroundColor: '#e0f2fe',
                      color: '#00aeef',
                    }}
                  >
                    Track &amp; Trace
                  </span>
                </div>

                <h4
                  style={{
                    fontSize: '1.25rem',
                    color: '#111827',
                    fontWeight: 800,
                    marginBottom: '8px',
                  }}
                >
                  {LABEL_FINISHING.serialNumbering.title}
                </h4>
                <p
                  style={{
                    fontSize: '0.875rem',
                    color: '#475569',
                    lineHeight: 1.68,
                    marginBottom: '18px',
                  }}
                >
                  {LABEL_FINISHING.serialNumbering.description}
                </p>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {LABEL_FINISHING.serialNumbering.benefits.map((b) => (
                  <span
                    key={b}
                    style={{
                      fontSize: '0.72rem',
                      padding: '5px 12px',
                      borderRadius: '8px',
                      backgroundColor: '#e0f2fe',
                      color: '#00aeef',
                      fontWeight: 700,
                    }}
                  >
                    ✓ {b}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
