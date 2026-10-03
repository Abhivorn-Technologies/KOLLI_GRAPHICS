import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Phone,
  Mail,
  MessageSquare,
  ArrowUp,
  ArrowRight,
  MapPin,
  Building2,
  Sparkles,
} from 'lucide-react'
import { ScrollReveal } from '../common/ScrollReveal'
import { COMPANY_INFO } from '../../data/company'

const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Company', path: '/company' },
  { label: 'Capabilities', path: '/capabilities' },
  { label: 'Equipment', path: '/equipment' },
  { label: 'Estimating', path: '/estimating' },
  { label: 'Contact', path: '/contact' },
]

export const Footer: React.FC = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
  const year = new Date().getFullYear()

  return (
    <footer
      style={{
        backgroundColor: '#f8fafc',
        color: '#111827',
        borderTop: '1px solid #e2e8f0',
        paddingTop: '0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* ── Pre-footer CTA banner ──────────────────────────── */}
      <div
        style={{
          background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)',
          borderBottom: '1px solid #e2e8f0',
        }}
      >
        <div className="container" style={{ padding: '60px 0' }}>
          <ScrollReveal direction="up" distance={32} duration={0.65}>
            <motion.div
              whileHover={{ y: -3 }}
              transition={{ duration: 0.3 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '28px',
                padding: '44px 48px',
                borderRadius: '24px',
                background: 'linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%)',
                border: '1px solid #e2e8f0',
                boxShadow: '0 8px 30px rgba(0,0,0,0.04)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Decorative subtle corner glow */}
              <div
                style={{
                  position: 'absolute',
                  top: '-40px',
                  right: '-40px',
                  width: '200px',
                  height: '200px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(220,38,38,0.06) 0%, transparent 70%)',
                  pointerEvents: 'none',
                }}
              />

              <div style={{ position: 'relative', zIndex: 1 }}>
                {/* Animated CMYK dots */}
                <div style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
                  {['#00aeef', '#ec008c', '#f59e0b', '#dc2626'].map((c, idx) => (
                    <motion.div
                      key={c}
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: idx * 0.3 }}
                      style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: c }}
                    />
                  ))}
                </div>
                <h3
                  style={{
                    fontSize: 'clamp(1.5rem,2.6vw,2.2rem)',
                    color: '#111827',
                    marginBottom: '10px',
                    lineHeight: 1.2,
                    fontWeight: 800,
                  }}
                >
                  Let's Create Something Exceptional.
                </h3>
                <p
                  style={{
                    fontSize: '0.95rem',
                    color: '#4b5563',
                    maxWidth: '520px',
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  Partner with Hyderabad's premier finishing, packaging &amp; label manufacturing
                  company. On-time. Every time.
                </p>
              </div>

              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', position: 'relative', zIndex: 1 }}>
                <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    to="/estimating"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '14px 26px',
                      borderRadius: '999px',
                      background: 'linear-gradient(135deg,#dc2626 0%,#b91c1c 100%)',
                      color: '#ffffff',
                      fontWeight: 700,
                      fontSize: '0.95rem',
                      boxShadow: '0 4px 16px rgba(220,38,38,0.3)',
                      transition: 'all 0.2s ease',
                      textDecoration: 'none',
                    }}
                  >
                    <span>Request an Estimate</span>
                    <ArrowRight size={16} />
                  </Link>
                </motion.div>

                <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.98 }}>
                  <a
                    href={`https://wa.me/${COMPANY_INFO.phoneRaw}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '14px 24px',
                      borderRadius: '999px',
                      backgroundColor: '#25D366',
                      color: '#ffffff',
                      fontWeight: 700,
                      fontSize: '0.95rem',
                      boxShadow: '0 4px 14px rgba(37,211,102,0.25)',
                      transition: 'all 0.2s ease',
                      textDecoration: 'none',
                    }}
                  >
                    <MessageSquare size={17} />
                    <span>Direct WhatsApp</span>
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </ScrollReveal>
        </div>
      </div>

      {/* ── Main footer columns with Staggered Scroll Arrivals ────────────────────────────── */}
      <div className="container" style={{ paddingTop: '64px', paddingBottom: '48px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0,1.6fr) minmax(0,1fr) minmax(0,1.2fr) minmax(0,1.2fr)',
            gap: '40px',
            marginBottom: '52px',
          }}
        >
          {/* Column 1: Brand & Bio */}
          <ScrollReveal direction="up" distance={30} delay={0.05} duration={0.6}>
            <div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
                style={{ display: 'inline-block', marginBottom: '20px' }}
              >
                <img
                  src="/assets/logo/kolli-logo.png"
                  alt="Kolli Graphics"
                  style={{ height: '60px', width: 'auto', objectFit: 'contain' }}
                />
              </motion.div>
              <p
                style={{
                  fontSize: '0.85rem',
                  color: '#4b5563',
                  lineHeight: 1.78,
                  marginBottom: '18px',
                  maxWidth: '280px',
                }}
              >
                Kolli Graphics Private Limited — Hyderabad's premier offset lithography, folding
                carton, flexo label, and luxury finishing company since 2009.
              </p>
              <motion.div
                whileHover={{ scale: 1.03 }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '6px 14px',
                  borderRadius: '999px',
                  backgroundColor: '#fee2e2',
                  border: '1px solid #fecaca',
                  cursor: 'default',
                }}
              >
                <motion.div
                  animate={{ scale: [1, 1.4, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  style={{ width: 7, height: 7, borderRadius: '50%', backgroundColor: '#dc2626' }}
                />
                <span
                  style={{
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    color: '#dc2626',
                    letterSpacing: '0.07em',
                    textTransform: 'uppercase',
                  }}
                >
                  Quality &amp; Customer First
                </span>
              </motion.div>
            </div>
          </ScrollReveal>

          {/* Column 2: Quick Links */}
          <ScrollReveal direction="up" distance={30} delay={0.12} duration={0.6}>
            <div>
              <h4
                style={{
                  fontSize: '0.78rem',
                  fontWeight: 800,
                  color: '#dc2626',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  marginBottom: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <Sparkles size={12} />
                Navigation
              </h4>
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                }}
              >
                {NAV_LINKS.map((link, idx) => (
                  <motion.li
                    key={link.path}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 + idx * 0.04, duration: 0.35 }}
                  >
                    <motion.div whileHover={{ x: 6 }} transition={{ duration: 0.2 }}>
                      <Link
                        to={link.path}
                        style={{
                          fontSize: '0.875rem',
                          color: '#4b5563',
                          fontWeight: 500,
                          transition: 'color 0.2s ease',
                          textDecoration: 'none',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = '#dc2626')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = '#4b5563')}
                      >
                        <span style={{ color: '#dc2626', fontSize: '0.75rem', fontWeight: 800 }}>›</span>
                        {link.label}
                      </Link>
                    </motion.div>
                  </motion.li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          {/* Column 3: Corporate Office & Works Facility */}
          <ScrollReveal direction="up" distance={30} delay={0.18} duration={0.6}>
            <div>
              <h4
                style={{
                  fontSize: '0.78rem',
                  fontWeight: 800,
                  color: '#dc2626',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  marginBottom: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <Building2 size={13} />
                Offices &amp; Works
              </h4>

              <motion.div
                whileHover={{ y: -2 }}
                style={{
                  marginBottom: '18px',
                  padding: '12px 14px',
                  borderRadius: '12px',
                  backgroundColor: '#ffffff',
                  border: '1px solid #f1f5f9',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.02)',
                  transition: 'border-color 0.2s',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    color: '#111827',
                    textTransform: 'uppercase',
                    letterSpacing: '0.07em',
                    marginBottom: '4px',
                  }}
                >
                  <MapPin size={11} color="#dc2626" />
                  Corporate Office
                </div>
                <p style={{ fontSize: '0.82rem', color: '#64748b', lineHeight: 1.6, margin: 0 }}>
                  {COMPANY_INFO.corporateOffice.address}
                  <br />
                  {COMPANY_INFO.corporateOffice.city} – {COMPANY_INFO.corporateOffice.pincode}
                </p>
              </motion.div>

              <motion.div
                whileHover={{ y: -2 }}
                style={{
                  padding: '12px 14px',
                  borderRadius: '12px',
                  backgroundColor: '#ffffff',
                  border: '1px solid #f1f5f9',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.02)',
                  transition: 'border-color 0.2s',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    color: '#111827',
                    textTransform: 'uppercase',
                    letterSpacing: '0.07em',
                    marginBottom: '4px',
                  }}
                >
                  <MapPin size={11} color="#00aeef" />
                  Works Facility
                </div>
                <p style={{ fontSize: '0.82rem', color: '#64748b', lineHeight: 1.6, margin: 0 }}>
                  {COMPANY_INFO.worksFacility.address}
                  <br />
                  {COMPANY_INFO.worksFacility.area}
                  <br />
                  {COMPANY_INFO.worksFacility.city} – {COMPANY_INFO.worksFacility.pincode}
                </p>
              </motion.div>
            </div>
          </ScrollReveal>

          {/* Column 4: Contact & Facility Stats */}
          <ScrollReveal direction="up" distance={30} delay={0.24} duration={0.6}>
            <div>
              <h4
                style={{
                  fontSize: '0.78rem',
                  fontWeight: 800,
                  color: '#dc2626',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  marginBottom: '20px',
                }}
              >
                Get In Touch
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <motion.div
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                  style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
                >
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: '8px',
                      backgroundColor: '#fee2e2',
                      border: '1px solid #fecaca',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Phone size={14} color="#dc2626" />
                  </div>
                  <a
                    href={`tel:${COMPANY_INFO.phoneRaw}`}
                    style={{
                      fontSize: '0.875rem',
                      color: '#111827',
                      fontWeight: 600,
                      textDecoration: 'none',
                    }}
                  >
                    {COMPANY_INFO.phone}
                  </a>
                </motion.div>

                <motion.div
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                  style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
                >
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: '8px',
                      backgroundColor: '#e0f2fe',
                      border: '1px solid #bae6fd',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Mail size={14} color="#00aeef" />
                  </div>
                  <a
                    href={`mailto:${COMPANY_INFO.email}`}
                    style={{
                      fontSize: '0.82rem',
                      color: '#111827',
                      fontWeight: 600,
                      textDecoration: 'none',
                      wordBreak: 'break-all',
                    }}
                  >
                    {COMPANY_INFO.email}
                  </a>
                </motion.div>

                <motion.div
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                  style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
                >
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: '8px',
                      backgroundColor: '#dcfce7',
                      border: '1px solid #bbf7d0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <MessageSquare size={14} color="#16a34a" />
                  </div>
                  <a
                    href={`https://wa.me/${COMPANY_INFO.phoneRaw}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontSize: '0.875rem',
                      color: '#111827',
                      fontWeight: 600,
                      textDecoration: 'none',
                    }}
                  >
                    WhatsApp Us
                  </a>
                </motion.div>

                {/* Facility stats card */}
                <motion.div
                  whileHover={{ scale: 1.02, y: -2 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    marginTop: '6px',
                    padding: '14px 16px',
                    borderRadius: '14px',
                    backgroundColor: '#ffffff',
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                  }}
                >
                  <div
                    style={{
                      fontSize: '0.72rem',
                      color: '#dc2626',
                      marginBottom: '4px',
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      fontWeight: 700,
                    }}
                  >
                    Facility Infrastructure
                  </div>
                  <div
                    style={{ fontSize: '0.8rem', color: '#111827', fontWeight: 600, lineHeight: 1.6 }}
                  >
                    40,000 sq.ft.{' '}
                    <span style={{ color: '#64748b', fontWeight: 400 }}>Total Facility</span>
                    <br />
                    40,000 sq.ft.{' '}
                    <span style={{ color: '#64748b', fontWeight: 400 }}>Secured, 24/7 CCTV</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* ── Bottom bar with Scroll Arrival ──────────────────────────────────── */}
        <ScrollReveal direction="up" distance={20} delay={0.2} duration={0.5}>
          <div
            style={{
              paddingTop: '28px',
              borderTop: '1px solid #e2e8f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '14px',
            }}
          >
            <div>
              <div style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '4px' }}>
                © {year} {COMPANY_INFO.name}. All rights reserved.
              </div>
              <div style={{ fontSize: '0.75rem', color: '#4b5563' }}>
                Developed by{' '}
                <span
                  style={{
                    color: '#dc2626',
                    fontWeight: 800,
                    letterSpacing: '0.02em',
                  }}
                >
                  Abhivorn Technologies &amp; DigiLevelUp
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span style={{ fontSize: '0.78rem', color: '#64748b' }}>
                Hyderabad, Telangana, India
              </span>
              <motion.button
                whileHover={{ scale: 1.06, y: -3 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToTop}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 16px',
                  borderRadius: '999px',
                  backgroundColor: '#fee2e2',
                  border: '1px solid #fecaca',
                  color: '#dc2626',
                  fontSize: '0.76rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 2px 6px rgba(220,38,38,0.1)',
                }}
              >
                <span>Back to Top</span>
                <ArrowUp size={13} />
              </motion.button>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Responsive grid fallback */}
      <style>{`
        @media (max-width: 900px) {
          footer .container > div:nth-child(2) > div:first-child {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 600px) {
          footer .container > div:nth-child(2) > div:first-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  )
}
