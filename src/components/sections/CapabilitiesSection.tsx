import React, { useState } from 'react';
import { ShieldCheck, Video, Lock, Clock, Box, Scissors, Sparkles, Printer, Layers, Package } from 'lucide-react';
import { SectionHeader } from '../common/SectionHeader';
import { ScrollReveal } from '../common/ScrollReveal';
import { PRODUCTION_JOURNEY } from '../../data/products';

export const CapabilitiesSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const getStepIcon = (iconName: string) => {
    switch (iconName) {
      case 'Layers': return <Layers size={22} />;
      case 'Printer': return <Printer size={22} />;
      case 'Scissors': return <Scissors size={22} />;
      case 'Sparkles': return <Sparkles size={22} />;
      case 'Box': return <Box size={22} />;
      case 'ShieldCheck': return <ShieldCheck size={22} />;
      default: return <Package size={22} />;
    }
  };

  return (
    <section id="capabilities" style={{ padding: '100px 0', backgroundColor: '#f4f6f8' }}>
      <div className="container">
        {/* Section Header */}
        <SectionHeader
          badge="End-to-End Capabilities"
          badgeVariant="cyan"
          title="From Design to Production to Storage,"
          titleHighlight="We Have Your Projects Covered."
          subtitle="Operating 24/7 in 40,000 square feet of secured space. All facilities have on-site security and are CCTV monitored for the protection of our clients' work and our employees."
        />

        {/* 3 Core Capability Pillars: Packaging, Materials, Labels */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
            marginBottom: '64px'
          }}
        >
          {/* Pillar 1: Packaging */}
          <ScrollReveal direction="up" delay={0.1}>
            <div
              className="premium-card"
              style={{
                padding: '32px',
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(220, 38, 38, 0.1)',
                  color: '#dc2626',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px'
                }}
              >
                <Box size={24} />
              </div>
              <h3 style={{ fontSize: '1.35rem', marginBottom: '12px' }}>Packaging</h3>
              <p style={{ fontSize: '0.9rem', color: '#4b5563', lineHeight: 1.7, marginBottom: '16px' }}>
                When we refer to “packaging”, we’re conveying our ability to produce specialty products such as Mono Cartons, Auto-Lock and Tuck-Top boxes, Four Corner trays, Six corner integrated Box, Inner Partition Boxes, and Sleeves.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {['Mono Cartons & Partition Boxes', 'Auto-Lock & Tuck-Top Boxes', '4-Corner & 6-Corner Trays', 'Custom Paperboard Sleeves'].map((item) => (
                  <li key={item} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#111827', fontWeight: 600 }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#dc2626' }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          {/* Pillar 2: Materials */}
          <ScrollReveal direction="up" delay={0.2}>
            <div
              className="premium-card"
              style={{
                padding: '32px',
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(220, 38, 38, 0.1)',
                  color: '#dc2626',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px'
                }}
              >
                <Layers size={24} />
              </div>
              <h3 style={{ fontSize: '1.35rem', marginBottom: '12px' }}>Materials</h3>
              <p style={{ fontSize: '0.9rem', color: '#4b5563', lineHeight: 1.7, marginBottom: '16px' }}>
                Paperboard (cardstock) is a heavy or thick paper-based material including metallic paperboard, plus various other boards. All paperboard (including kraft) can be cut and formed easily while remaining stable to protect contents.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {['FBB (Folding Box Board)', 'SBS & SCB Boards', 'Greyback Board', 'Safire Graphic & Metallic Boards'].map((item) => (
                  <li key={item} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#111827', fontWeight: 600 }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#dc2626' }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          {/* Pillar 3: Labels */}
          <ScrollReveal direction="up" delay={0.3}>
            <div
              className="premium-card"
              style={{
                padding: '32px',
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(180, 83, 9, 0.15)',
                  color: '#b45309',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px'
                }}
              >
                <Sparkles size={24} />
              </div>
              <h3 style={{ fontSize: '1.35rem', marginBottom: '12px' }}>Labels</h3>
              <p style={{ fontSize: '0.9rem', color: '#4b5563', lineHeight: 1.7, marginBottom: '16px' }}>
                Manufactured in a hygienic, clean and centrally air-conditioned environment for pharmaceutical and FMCG sectors. Zero Error Printing with Tubescan 100% inspection detecting &lt; 0.5 mm defects.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {['Pharmaceutical Security Labels', 'FMCG Pressure-Sensitive Labels', 'Tubescan 100% Optical Inspection', 'Serialized Anti-Counterfeiting'].map((item) => (
                  <li key={item} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#111827', fontWeight: 600 }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#b45309' }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>

        {/* 6-Step Production Journey: DESIGN -> PRINT -> CUT -> FOLD -> FINISH -> PACKAGING */}
        <div style={{ marginBottom: '70px' }}>
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <div className="section-badge cyan" style={{ margin: '0 auto 10px auto' }}>
              The Manufacturing Journey
            </div>
            <h3 style={{ fontSize: '1.85rem' }}>
              DESIGN → PRINT → CUT → FOLD → FINISH → PACKAGING
            </h3>
            <p style={{ fontSize: '0.95rem', color: '#6b7280' }}>
              Every order follows a tightly controlled, automated production workflow ensuring zero defects.
            </p>
          </div>

          {/* Interactive Steps Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '14px',
              marginBottom: '28px'
            }}
          >
            {PRODUCTION_JOURNEY.map((item, idx) => {
              const isSelected = activeStep === idx;
              return (
                <button
                  key={item.step}
                  onClick={() => setActiveStep(idx)}
                  style={{
                    padding: '16px',
                    borderRadius: '14px',
                    textAlign: 'left',
                    backgroundColor: isSelected ? '#ffffff' : 'rgba(255, 255, 255, 0.6)',
                    border: isSelected ? '2px solid #dc2626' : '1px solid #e5e7eb',
                    boxShadow: isSelected ? 'var(--shadow-md)' : 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: isSelected ? '#dc2626' : '#9ca3af' }}>
                      {item.step}
                    </span>
                    <div style={{ color: isSelected ? '#dc2626' : '#6b7280' }}>
                      {getStepIcon(item.icon)}
                    </div>
                  </div>
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#6b7280', display: 'block', textTransform: 'uppercase' }}>
                    {item.phase}
                  </span>
                  <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#111827', display: 'block', marginTop: '2px' }}>
                    {item.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Step Detailed Showcase Card */}
          <div
            style={{
              padding: '32px',
              borderRadius: '20px',
              backgroundColor: '#ffffff',
              border: '1px solid #e5e7eb',
              boxShadow: 'var(--shadow-sm)',
              display: 'flex',
              alignItems: 'center',
              gap: '24px',
              flexWrap: 'wrap'
            }}
          >
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '16px',
                backgroundColor: 'rgba(220, 38, 38, 0.1)',
                color: '#dc2626',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              {getStepIcon(PRODUCTION_JOURNEY[activeStep].icon)}
            </div>

            <div style={{ flex: 1, minWidth: '240px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#dc2626' }}>
                  STEP {PRODUCTION_JOURNEY[activeStep].step}
                </span>
                <span style={{ color: '#d1d5db' }}>•</span>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#6b7280', textTransform: 'uppercase' }}>
                  {PRODUCTION_JOURNEY[activeStep].phase}
                </span>
              </div>
              <h4 style={{ fontSize: '1.35rem', color: '#111827', marginBottom: '8px' }}>
                {PRODUCTION_JOURNEY[activeStep].title}
              </h4>
              <p style={{ fontSize: '0.95rem', color: '#4b5563', lineHeight: 1.7 }}>
                {PRODUCTION_JOURNEY[activeStep].description}
              </p>
            </div>
          </div>
        </div>

        {/* 40,000 Sq.Ft Secured Environment & CCTV Section per document */}
        <div
          style={{
            padding: '40px',
            borderRadius: '24px',
            backgroundColor: '#111827',
            color: '#ffffff',
            boxShadow: 'var(--shadow-lg)'
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '32px',
              alignItems: 'center'
            }}
          >
            <div>
              <div className="section-badge dark" style={{ marginBottom: '16px' }}>
                High-Security Facility
              </div>
              <h3 style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', color: '#ffffff', marginBottom: '14px' }}>
                40,000 Sq. Ft. Secured Space
              </h3>
              <p style={{ fontSize: '0.95rem', color: '#d1d5db', lineHeight: 1.7, marginBottom: '20px' }}>
                We operate 24/7 in <strong>40,000 square feet of secured space</strong> with a 24/7 Security & Access-Controlled Environment. All facilities have on-site security and are CCTV monitored for the safety and protection of our clients’ work and our employees.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#f59e0b', fontSize: '0.875rem', fontWeight: 600 }}>
                <Clock size={16} />
                <span>Round-The-Clock 24/7 Monitored Operations</span>
              </div>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '14px'
              }}
            >
              {[
                { icon: <Lock size={20} color="#f59e0b" />, title: 'Access Controlled', desc: 'Secure entry protocols for proprietary designs' },
                { icon: <Video size={20} color="#e07060" />, title: 'CCTV Monitored', desc: 'Comprehensive optical coverage across all plant zones' },
                { icon: <ShieldCheck size={20} color="#facc15" />, title: 'On-Site Security', desc: 'Stationed personnel safeguarding client materials' },
                { icon: <Box size={20} color="#4ade80" />, title: 'Protected Storage', desc: 'Secured warehouse for finished inventory' }
              ].map((sec) => (
                <div
                  key={sec.title}
                  style={{
                    padding: '18px',
                    borderRadius: '14px',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }}
                >
                  <div style={{ marginBottom: '10px' }}>{sec.icon}</div>
                  <h5 style={{ fontSize: '0.95rem', color: '#ffffff', marginBottom: '4px' }}>{sec.title}</h5>
                  <p style={{ fontSize: '0.75rem', color: '#9ca3af', lineHeight: 1.5 }}>{sec.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


