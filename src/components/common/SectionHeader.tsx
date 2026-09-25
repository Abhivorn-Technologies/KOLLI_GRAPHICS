import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeaderProps {
  badge: string;
  badgeVariant?: 'cyan' | 'magenta' | 'yellow' | 'dark';
  title: string;
  titleHighlight?: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  dark?: boolean;
}

const gradientMap: Record<string, string> = {
  cyan:    'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)',
  magenta: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
  yellow:  'linear-gradient(135deg, #b45309 0%, #92400e 100%)',
  dark:    'linear-gradient(135deg, #f59e0b 0%, #5bbdaa 100%)',
};

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  badge,
  badgeVariant = 'cyan',
  title,
  titleHighlight,
  subtitle,
  align = 'center',
  dark = false,
}) => {
  const alignItems = align === 'center' ? 'center' : align === 'right' ? 'flex-end' : 'flex-start';
  const textAlign  = align as React.CSSProperties['textAlign'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems, textAlign, marginBottom: '44px' }}>

      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{ marginBottom: '14px' }}
      >
        <span className={`section-badge${dark ? ' dark' : badgeVariant === 'magenta' ? ' magenta' : ''}`}>
          {/* CMYK dots — smaller */}
          <span style={{ display: 'inline-flex', gap: 4 }}>
            {['#dc2626','#dc2626','#b45309'].map((c) => (
              <span key={c} style={{ display: 'inline-block', width: 5, height: 5, borderRadius: '50%', backgroundColor: c, opacity: dark ? 0.7 : 1 }} />
            ))}
          </span>
          {badge}
        </span>
      </motion.div>

      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        style={{
          color: dark ? '#f4f6f8' : 'var(--text-primary)',
          marginBottom: titleHighlight || subtitle ? '12px' : '0',
          lineHeight: 1.15,
        }}
      >
        {title}
        {titleHighlight && (
          <>
            {' '}
            <span style={{
              background: gradientMap[badgeVariant] || gradientMap.cyan,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              {titleHighlight}
            </span>
          </>
        )}
      </motion.h2>

      {/* Thin rule */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        style={{
          width: '36px', height: '2px',
          background: gradientMap[dark ? 'dark' : badgeVariant] || gradientMap.cyan,
          borderRadius: '2px',
          marginBottom: subtitle ? '14px' : '0',
          transformOrigin: align === 'right' ? 'right' : align === 'center' ? 'center' : 'left',
        }}
      />

      {/* Subtitle */}
      {subtitle && (
        <motion.p
          className="section-subtitle"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
          style={{ color: dark ? '#9ca3af' : 'var(--text-secondary)', margin: '0 auto' }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};


