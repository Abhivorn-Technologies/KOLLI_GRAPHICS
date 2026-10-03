import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Layers, CheckCircle2 } from 'lucide-react'
import { SectionHeader } from '../common/SectionHeader'
import { ScrollReveal } from '../common/ScrollReveal'
import { ImageWithFallback } from '../common/ImageWithFallback'
import { CARTON_TYPES } from '../../data/products'

export const FoldingCartonSection: React.FC = () => {
  const [selectedCartonId, setSelectedCartonId] = useState(CARTON_TYPES[0].id)
  const currentCarton = CARTON_TYPES.find((c) => c.id === selectedCartonId) || CARTON_TYPES[0]

  return (
    <section id="cartons" style={{ padding: '50px 0 40px 0', backgroundColor: '#ffffff' }}>
      <div className="container">
        {/* Section Header */}
        <ScrollReveal direction="up" delay={0.05}>
          <SectionHeader
            badge="Structural Engineering"
            badgeVariant="magenta"
            title="What is a"
            titleHighlight="Folding Carton?"
            subtitle="The term “folding carton” has been used since the late 19th century! It refers to a box made of paperboard that is printed, cut, glued, and scored. Shipped flat, they construct into protective, luxury containers."
          />
        </ScrollReveal>

        {/* 4 Core Advantages Row — Displays in 1 Single Line */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))',
            gap: '16px',
            marginBottom: '32px',
          }}
        >
          {[
            {
              title: 'Premium Presentation',
              desc: 'The smooth, high-quality finish of our folding cartons adds an unmistakable touch of luxury to your product packaging.',
            },
            {
              title: 'Customizable Design',
              desc: 'Personalize folding cartons with brand colors, logos, metallic foils, and spot UV graphics reflecting brand identity.',
            },
            {
              title: 'Easy Assembly',
              desc: 'Designed for quick and hassle-free assembly, our folding cartons save critical time and labor on the packaging floor.',
            },
            {
              title: 'Versatility',
              desc: 'Suitable for a wide range of products, from cosmetics to confectionery, pharmaceuticals, and industrial hardware.',
            },
          ].map((adv, idx) => (
            <ScrollReveal key={adv.title} direction="up" delay={idx * 0.1}>
              <div
                className="smoke-hover-card"
                style={{
                  padding: '22px 18px',
                  borderRadius: '16px',
                  backgroundColor: '#ffffff',
                  border: '1px solid #e5e7eb',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '10px',
                    color: '#dc2626',
                  }}
                >
                  <CheckCircle2 size={18} />
                  <h4 style={{ fontSize: '1.05rem', color: '#111827', margin: 0 }}>{adv.title}</h4>
                </div>
                <p style={{ fontSize: '0.875rem', color: '#4b5563', lineHeight: 1.6, margin: 0 }}>
                  {adv.desc}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* What is Paperboard Sub-Section */}
        <ScrollReveal direction="up" delay={0.15}>
          <div
            style={{
              padding: '28px 32px',
              borderRadius: '20px',
              background:
                'linear-gradient(135deg, rgba(0, 174, 239, 0.05) 0%, rgba(220, 38, 38, 0.05) 100%)',
              border: '1px solid #e5e7eb',
              marginBottom: '28px',
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
              flexWrap: 'wrap',
            }}
          >
            <div
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '12px',
                backgroundColor: '#ffffff',
                border: '1px solid #e5e7eb',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#dc2626',
                flexShrink: 0,
              }}
            >
              <Layers size={22} />
            </div>
            <div style={{ flex: 1, minWidth: '260px' }}>
              <h4 style={{ fontSize: '1.15rem', color: '#111827', marginBottom: '4px' }}>
                What is Paperboard?
              </h4>
              <p style={{ fontSize: '0.9rem', color: '#4b5563', lineHeight: 1.6 }}>
                Paperboard, or cardstock, is a heavy or thick paper-based material which includes
                metallic paperboard, plus various other boards. All paperboard (including kraft) can
                be cut and formed easily while still remaining stable in order to protect the
                contents of the folding carton.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Folding Carton Structural Types Interactive Showcase */}
        <ScrollReveal direction="up" delay={0.1}>
          <div>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <div className="section-badge cyan" style={{ margin: '0 auto 10px auto' }}>
                Structural Blueprint
              </div>
              <h3 style={{ fontSize: '1.85rem' }}>Different Types of Folding Cartons</h3>
              <p style={{ fontSize: '0.95rem', color: '#6b7280' }}>
                Select a carton configuration to inspect structural folding physics, panel layout, and
                packaging benefits.
              </p>
            </div>

            {/* Type Selector Tabs with Hover & Active Motion */}
            <div
              style={{
                display: 'flex',
                gap: '10px',
                overflowX: 'auto',
                paddingBottom: '14px',
                marginBottom: '32px',
                scrollbarWidth: 'none',
              }}
            >
              {CARTON_TYPES.map((carton) => {
                const isActive = carton.id === selectedCartonId
                return (
                  <motion.button
                    key={carton.id}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedCartonId(carton.id)}
                    className={isActive ? '' : 'smoke-hover-card'}
                    style={{
                      padding: '10px 18px',
                      borderRadius: '12px',
                      whiteSpace: 'nowrap',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      backgroundColor: isActive ? '#dc2626' : '#ffffff',
                      color: isActive ? '#ffffff' : '#374151',
                      border: isActive ? '1px solid #dc2626' : '1px solid #e5e7eb',
                      cursor: 'pointer',
                      transition: 'all 0.25s ease',
                      boxShadow: isActive ? '0 6px 20px rgba(220, 38, 38, 0.3)' : '0 2px 8px rgba(0,0,0,0.04)',
                    }}
                  >
                    <span style={{ opacity: 0.8, marginRight: '6px', fontSize: '0.75rem' }}>
                      [{carton.code}]
                    </span>
                    {carton.title.split('(')[0].trim()}
                  </motion.button>
                )
              })}
            </div>

            {/* Detailed Structural Card with Smoke Glow & Diagram Image Zoom */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentCarton.id}
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.98 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="smoke-hover-card"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                  gap: '36px',
                  padding: '36px',
                  borderRadius: '24px',
                  backgroundColor: '#ffffff',
                  border: '1px solid #e5e7eb',
                  boxShadow: 'var(--shadow-md)',
                  alignItems: 'center',
                }}
              >
                {/* Left Column: Visual Diagram Frame with Hover Zoom */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#f8fafc',
                    borderRadius: '18px',
                    padding: '30px',
                    border: '1px solid #e5e7eb',
                  }}
                >
                  <div
                    style={{
                      position: 'relative',
                      width: '100%',
                      maxWidth: '320px',
                      height: '280px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <ImageWithFallback
                      src={currentCarton.image}
                      alt={currentCarton.title}
                      fallbackLabel={currentCarton.title}
                      style={{
                        maxHeight: '260px',
                        maxWidth: '100%',
                        objectFit: 'contain',
                        transition: 'transform 0.4s ease',
                      }}
                    />
                  </div>

                  <div
                    style={{
                      marginTop: '16px',
                      padding: '8px 14px',
                      borderRadius: '8px',
                      backgroundColor: '#ffffff',
                      border: '1px solid #e5e7eb',
                      fontSize: '0.78rem',
                      color: '#6b7280',
                      textAlign: 'center',
                      width: '100%',
                    }}
                  >
                    <strong>Folding Mechanics:</strong> {currentCarton.foldingConcept}
                  </div>
                </motion.div>

              {/* Right Column: Content, Advantages, Best-For */}
              <div>
                <div
                  style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}
                >
                  <span
                    style={{
                      padding: '3px 10px',
                      borderRadius: '6px',
                      backgroundColor: 'rgba(220, 38, 38, 0.1)',
                      color: '#dc2626',
                      fontSize: '0.75rem',
                      fontWeight: 800,
                    }}
                  >
                    CODE: {currentCarton.code}
                  </span>
                  <span style={{ fontSize: '0.85rem', color: '#6b7280' }}>
                    {currentCarton.subtitle}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.65rem', color: '#111827', marginBottom: '14px' }}>
                  {currentCarton.title}
                </h3>

                <p
                  style={{
                    fontSize: '0.925rem',
                    color: '#4b5563',
                    lineHeight: 1.7,
                    marginBottom: '20px',
                  }}
                >
                  {currentCarton.description}
                </p>

                <div style={{ marginBottom: '22px' }}>
                  <h4 style={{ fontSize: '0.95rem', color: '#111827', marginBottom: '10px' }}>
                    Structural Advantages:
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {currentCarton.advantages.map((adv) => (
                      <div
                        key={adv}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '8px',
                          fontSize: '0.875rem',
                          color: '#374151',
                        }}
                      >
                        <span style={{ color: '#dc2626', marginTop: '2px' }}>✓</span>
                        <span>{adv}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4
                    style={{
                      fontSize: '0.85rem',
                      color: '#6b7280',
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                      marginBottom: '8px',
                    }}
                  >
                    Recommended Applications:
                  </h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {currentCarton.bestFor.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          padding: '4px 12px',
                          borderRadius: 'var(--radius-full)',
                          backgroundColor: '#ebeef2',
                          color: '#4b5563',
                          fontSize: '0.78rem',
                          fontWeight: 600,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
