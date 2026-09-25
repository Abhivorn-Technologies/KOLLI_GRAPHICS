import React, { useRef, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Printer, CheckCircle2 } from 'lucide-react';
import { SectionHeader } from '../common/SectionHeader';
import { PRINTING_PROCESSES } from '../../data/processes';

/* ─── Flow step card with staggered entrance ─────────────────────── */
interface FlowStepProps {
  step: { step: string; label: string; desc: string };
  index: number;
  color: string;
  totalSteps: number;
}

const FlowStep: React.FC<FlowStepProps> = ({ step, index, color, totalSteps }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px 0px' });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -24, filter: 'blur(4px)' }}
      animate={inView ? { opacity: 1, x: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.55, delay: index * 0.12, ease: [0.21, 0.47, 0.32, 0.98] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ position: 'relative', display: 'flex', gap: 20 }}
    >
      {/* Vertical connector line */}
      {index < totalSteps - 1 && (
        <div
          style={{
            position: 'absolute',
            left: 20,
            top: 44,
            width: 2,
            bottom: -32,
            background: `linear-gradient(to bottom, ${color}50 0%, transparent 100%)`,
          }}
        />
      )}

      {/* Step number circle */}
      <motion.div
        animate={{
          scale: hovered ? 1.15 : 1,
          boxShadow: hovered ? `0 0 0 6px ${color}20` : `0 0 0 0px ${color}00`,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 22 }}
        style={{
          flexShrink: 0,
          width: 42,
          height: 42,
          borderRadius: '50%',
          background: `linear-gradient(135deg, ${color} 0%, ${color}bb 100%)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.1rem',
          fontWeight: 800,
          color: '#ffffff',
          boxShadow: `0 4px 12px ${color}40`,
          position: 'relative',
          zIndex: 1,
        }}
      >
        {step.step}
      </motion.div>

      {/* Content */}
      <motion.div
        animate={{
          backgroundColor: hovered ? `${color}08` : 'rgba(255,255,255,0)',
          borderColor: hovered ? `${color}25` : 'rgba(255,255,255,0.08)',
        }}
        transition={{ duration: 0.25 }}
        style={{
          flex: 1,
          padding: '14px 18px',
          borderRadius: '12px',
          border: '1px solid transparent',
          marginBottom: 20,
        }}
      >
        <h5
          style={{
            fontSize: '1rem',
            color: '#ffffff',
            marginBottom: '5px',
            fontWeight: 700,
          }}
        >
          {step.label}
        </h5>
        <p style={{ fontSize: '0.82rem', color: '#9ca3af', lineHeight: 1.6 }}>
          {step.desc}
        </p>
      </motion.div>
    </motion.div>
  );
};

/* ─── Process tab button ─────────────────────────────────────────── */
const ProcessTab: React.FC<{ label: string; active: boolean; color: string; onClick: () => void }> = ({
  label, active, color, onClick
}) => (
  <motion.button
    onClick={onClick}
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.97 }}
    animate={{
      backgroundColor: active ? color : 'transparent',
      color: active ? '#ffffff' : '#4b5563',
      boxShadow: active ? `0 4px 16px ${color}40` : 'none',
    }}
    transition={{ duration: 0.22 }}
    style={{
      padding: '12px 30px',
      borderRadius: '999px',
      fontSize: '0.95rem',
      fontWeight: 700,
      cursor: 'pointer',
      border: 'none',
    }}
  >
    {label}
  </motion.button>
);

/* ─── Capability check item ─────────────────────────────────────── */
const CapItem: React.FC<{ text: string; color: string; index: number }> = ({ text, color, index }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-30px 0px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -16 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.45, delay: index * 0.06, ease: [0.21, 0.47, 0.32, 0.98] }}
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '10px',
        fontSize: '0.9rem',
        color: '#374151',
      }}
    >
      <CheckCircle2
        size={16}
        color={color}
        style={{ marginTop: '3px', flexShrink: 0 }}
      />
      <span>{text}</span>
    </motion.div>
  );
};

/* ─── Substrate pill ─────────────────────────────────────────────── */
const SubstratePill: React.FC<{ sub: string; color: string; index: number }> = ({ sub, color, index }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-30px 0px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      whileHover={{ scale: 1.03, borderColor: color }}
      style={{
        padding: '10px 14px',
        borderRadius: '8px',
        backgroundColor: '#f4f6f8',
        border: `1px solid #e5e7eb`,
        fontSize: '0.85rem',
        fontWeight: 600,
        color: '#374151',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        transition: 'border-color 0.2s ease',
        cursor: 'default',
      }}
    >
      <span
        style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: color,
          flexShrink: 0,
        }}
      />
      {sub}
    </motion.div>
  );
};

/* ─── Main section ─────────────────────────────────────────────── */
export const PrintingSection: React.FC = () => {
  const [activeProcessId, setActiveProcessId] = useState<'offset' | 'flexography'>('offset');
  const activeProcess = PRINTING_PROCESSES.find((p) => p.id === activeProcessId) || PRINTING_PROCESSES[0];

  const processColor = activeProcessId === 'offset' ? '#dc2626' : '#dc2626';

  return (
    <section
      id="printing"
      style={{
        padding: '110px 0',
        backgroundColor: '#ffffff',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle bg mesh */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(to right, rgba(0,0,0,0.018) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,0,0,0.018) 1px, transparent 1px)
          `,
          backgroundSize: '52px 52px',
          pointerEvents: 'none',
          opacity: 0.6,
        }}
      />

      <div className="container" style={{ position: 'relative' }}>
        <SectionHeader
          badge="Core Printing Technologies"
          badgeVariant="cyan"
          title="Offset Lithography &"
          titleHighlight="High-Speed Flexography"
          subtitle="Explore the mass-production physics of our Heidelberg/Komori offset presses and OMET rotary flexo converting systems."
        />

        {/* Process selector */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '56px' }}>
          <div
            style={{
              display: 'inline-flex',
              padding: '6px',
              borderRadius: '999px',
              backgroundColor: '#ebeef2',
              border: '1px solid #e5e7eb',
              gap: '4px',
            }}
          >
            <ProcessTab
              label="Printing – Offset Lithography"
              active={activeProcessId === 'offset'}
              color="#dc2626"
              onClick={() => setActiveProcessId('offset')}
            />
            <ProcessTab
              label="Printing – Flexography (Flexo)"
              active={activeProcessId === 'flexography'}
              color="#dc2626"
              onClick={() => setActiveProcessId('flexography')}
            />
          </div>
        </div>

        {/* Main content — animated on tab switch */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeProcess.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.38, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            {/* Top grid: description + substrates */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '36px',
                marginBottom: '40px',
                padding: '40px',
                borderRadius: '24px',
                backgroundColor: '#f4f6f8',
                border: '1px solid #e5e7eb',
              }}
            >
              {/* Description side */}
              <div>
                <span
                  style={{
                    display: 'inline-block',
                    padding: '4px 12px',
                    borderRadius: '6px',
                    backgroundColor: `${processColor}15`,
                    color: processColor,
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    marginBottom: '12px',
                  }}
                >
                  {activeProcess.tagline}
                </span>
                <h3 style={{ fontSize: 'clamp(1.4rem,2.2vw,1.8rem)', color: '#111827', marginBottom: '16px' }}>
                  {activeProcess.name}
                </h3>
                <p style={{ fontSize: '1rem', color: '#4b5563', lineHeight: 1.75, marginBottom: '24px' }}>
                  {activeProcess.description}
                </p>

                <h4 style={{ fontSize: '0.95rem', color: '#111827', marginBottom: '14px' }}>
                  Technical Capabilities:
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '9px' }}>
                  {activeProcess.keyAttributes.map((attr, i) => (
                    <CapItem key={attr} text={attr} color={processColor} index={i} />
                  ))}
                </div>
              </div>

              {/* Substrates side */}
              <div
                style={{
                  padding: '30px',
                  borderRadius: '20px',
                  backgroundColor: '#ffffff',
                  border: '1px solid #e5e7eb',
                }}
              >
                <h4 style={{ fontSize: '1.05rem', color: '#111827', marginBottom: '16px' }}>
                  Supported Substrates &amp; Stock:
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
                  {activeProcess.substrates.map((sub, i) => (
                    <SubstratePill key={sub} sub={sub} color={processColor} index={i} />
                  ))}
                </div>

                {/* Machine info box */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  style={{
                    padding: '14px',
                    borderRadius: '10px',
                    backgroundColor: `${processColor}08`,
                    border: `1px solid ${processColor}20`,
                    fontSize: '0.8rem',
                    color: '#6b7280',
                    lineHeight: 1.55,
                    cursor: 'default',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                    <Printer size={14} color={processColor} />
                    <span style={{ fontWeight: 700, color: processColor, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Press Equipment
                    </span>
                  </div>
                  {activeProcessId === 'offset'
                    ? 'Heidelberg CD 102 5 XL with extended drying and Komori Lithrone 40 6-color UV press.'
                    : 'OMET rotary self-adhesive labels press with inline cold foil and Tubescan 100% inspection.'}
                </motion.div>
              </div>
            </div>

            {/* Process flow — progressive scroll reveal */}
            <div
              style={{
                padding: '36px',
                borderRadius: '22px',
                backgroundColor: '#111827',
                color: '#ffffff',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Ambient glow */}
              <div
                style={{
                  position: 'absolute',
                  top: '-30%',
                  right: '-10%',
                  width: '350px',
                  height: '350px',
                  borderRadius: '50%',
                  background: `radial-gradient(circle, ${processColor}18 0%, transparent 70%)`,
                  filter: 'blur(60px)',
                  pointerEvents: 'none',
                }}
              />

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '32px',
                  position: 'relative',
                }}
              >
                <span
                  style={{
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    color: processColor === '#dc2626' ? '#f59e0b' : '#e07060',
                    textTransform: 'uppercase',
                    letterSpacing: '0.07em',
                  }}
                >
                  Mechanical Transfer Flow — Scroll to Explore
                </span>
                <span style={{ fontSize: '0.72rem', color: '#6b7280' }}>
                  {activeProcessId === 'offset' ? 'Plate → Blanket → Paper' : 'Plate → Ink Roller → Substrate'}
                </span>
              </div>

              {/* Progressive flow steps */}
              <div style={{ position: 'relative' }}>
                {activeProcess.flowSteps.map((s, idx) => (
                  <FlowStep
                    key={s.step}
                    step={s}
                    index={idx}
                    color={processColor}
                    totalSteps={activeProcess.flowSteps.length}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};


