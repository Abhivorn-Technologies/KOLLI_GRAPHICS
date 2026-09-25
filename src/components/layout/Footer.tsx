import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MessageSquare, ArrowUp, ArrowRight } from 'lucide-react';
import { COMPANY_INFO } from '../../data/company';

const NAV_LINKS = [
  { label: 'Home',         path: '/'            },
  { label: 'Company',      path: '/company'      },
  { label: 'Capabilities', path: '/capabilities' },
  { label: 'Equipment',    path: '/equipment'    },
  { label: 'Estimating',   path: '/estimating'   },
  { label: 'Contact',      path: '/contact'      },
];

export const Footer: React.FC = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        backgroundColor: '#f8fafc',
        color: '#111827',
        borderTop: '1px solid #e2e8f0',
        paddingTop: '0',
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
          <div
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
            }}
          >
            <div>
              {/* CMYK dots */}
              <div style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
                {['#00aeef','#ec008c','#f59e0b','#dc2626'].map((c) => (
                  <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: c }} />
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
              <p style={{ fontSize: '0.95rem', color: '#4b5563', maxWidth: '520px', lineHeight: 1.7 }}>
                Partner with Hyderabad's premier finishing, packaging &amp; label manufacturing company.
                On-time. Every time.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              <Link
                to="/estimating"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  padding: '14px 26px', borderRadius: '999px',
                  background: 'linear-gradient(135deg,#dc2626 0%,#b91c1c 100%)',
                  color: '#ffffff', fontWeight: 700, fontSize: '0.95rem',
                  boxShadow: '0 4px 16px rgba(220,38,38,0.3)',
                  transition: 'all 0.2s ease', textDecoration: 'none',
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                Request an Estimate <ArrowRight size={16} />
              </Link>

              <a
                href={`https://wa.me/91${COMPANY_INFO.phone}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  padding: '14px 24px', borderRadius: '999px',
                  backgroundColor: '#25D366', color: '#ffffff',
                  fontWeight: 700, fontSize: '0.95rem',
                  boxShadow: '0 4px 14px rgba(37,211,102,0.25)',
                  transition: 'all 0.2s ease', textDecoration: 'none',
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <MessageSquare size={17} />
                Direct WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main footer columns ────────────────────────────── */}
      <div className="container" style={{ paddingTop: '64px', paddingBottom: '48px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0,1.6fr) minmax(0,1fr) minmax(0,1.2fr) minmax(0,1.2fr)',
            gap: '40px',
            marginBottom: '52px',
          }}
        >
          {/* Brand column */}
          <div>
            <div style={{ marginBottom: '20px' }}>
              <img
                src="/assets/logo/kolli-logo.png"
                alt="Kolli Graphics"
                style={{ height: '48px', width: 'auto', objectFit: 'contain' }}
              />
            </div>
            <p
              style={{
                fontSize: '0.85rem', color: '#4b5563', lineHeight: 1.78,
                marginBottom: '18px', maxWidth: '280px',
              }}
            >
              Kolli Graphics Private Limited — Hyderabad's premier offset lithography, folding
              carton, flexo label, and luxury finishing company since 2009.
            </p>
            <div
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '6px 14px', borderRadius: '999px',
                backgroundColor: '#fee2e2',
                border: '1px solid #fecaca',
              }}
            >
              <div style={{ width: 7, height: 7, borderRadius: '50%', backgroundColor: '#dc2626' }} />
              <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#dc2626', letterSpacing: '0.07em', textTransform: 'uppercase' }}>
                Quality &amp; Customer First
              </span>
            </div>
          </div>

          {/* Navigation column */}
          <div>
            <h4
              style={{
                fontSize: '0.78rem', fontWeight: 800, color: '#dc2626',
                letterSpacing: '0.08em', textTransform: 'uppercase',
                marginBottom: '20px',
              }}
            >
              Navigation
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {NAV_LINKS.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    style={{
                      fontSize: '0.875rem', color: '#4b5563', fontWeight: 500,
                      transition: 'color 0.2s ease', textDecoration: 'none',
                      display: 'inline-flex', alignItems: 'center', gap: '6px',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#dc2626'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#4b5563'}
                  >
                    <span style={{ color: '#dc2626', fontSize: '0.7rem' }}>›</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Addresses column */}
          <div>
            <h4
              style={{
                fontSize: '0.78rem', fontWeight: 800, color: '#dc2626',
                letterSpacing: '0.08em', textTransform: 'uppercase',
                marginBottom: '20px',
              }}
            >
              Offices
            </h4>

            <div style={{ marginBottom: '20px' }}>
              <div
                style={{
                  fontSize: '0.72rem', fontWeight: 700, color: '#111827',
                  textTransform: 'uppercase', letterSpacing: '0.07em',
                  marginBottom: '6px',
                }}
              >
                Corporate Office
              </div>
              <p style={{ fontSize: '0.83rem', color: '#4b5563', lineHeight: 1.72 }}>
                {COMPANY_INFO.corporateOffice.address}<br />
                {COMPANY_INFO.corporateOffice.city} – {COMPANY_INFO.corporateOffice.pincode}
              </p>
            </div>

            <div>
              <div
                style={{
                  fontSize: '0.72rem', fontWeight: 700, color: '#111827',
                  textTransform: 'uppercase', letterSpacing: '0.07em',
                  marginBottom: '6px',
                }}
              >
                Works Facility
              </div>
              <p style={{ fontSize: '0.83rem', color: '#4b5563', lineHeight: 1.72 }}>
                {COMPANY_INFO.worksFacility.address}<br />
                {COMPANY_INFO.worksFacility.area}<br />
                {COMPANY_INFO.worksFacility.city} – {COMPANY_INFO.worksFacility.pincode}
              </p>
            </div>
          </div>

          {/* Contact column */}
          <div>
            <h4
              style={{
                fontSize: '0.78rem', fontWeight: 800, color: '#dc2626',
                letterSpacing: '0.08em', textTransform: 'uppercase',
                marginBottom: '20px',
              }}
            >
              Get In Touch
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div
                  style={{
                    width: 32, height: 32, borderRadius: '8px',
                    backgroundColor: '#fee2e2',
                    border: '1px solid #fecaca',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Phone size={14} color="#dc2626" />
                </div>
                <a
                  href={`tel:${COMPANY_INFO.phone}`}
                  style={{ fontSize: '0.875rem', color: '#111827', fontWeight: 600, textDecoration: 'none' }}
                >
                  +91 {COMPANY_INFO.phone}
                </a>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div
                  style={{
                    width: 32, height: 32, borderRadius: '8px',
                    backgroundColor: '#e0f2fe',
                    border: '1px solid #bae6fd',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Mail size={14} color="#00aeef" />
                </div>
                <a
                  href={`mailto:${COMPANY_INFO.email}`}
                  style={{ fontSize: '0.82rem', color: '#111827', fontWeight: 600, textDecoration: 'none', wordBreak: 'break-all' }}
                >
                  {COMPANY_INFO.email}
                </a>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div
                  style={{
                    width: 32, height: 32, borderRadius: '8px',
                    backgroundColor: '#dcfce7',
                    border: '1px solid #bbf7d0',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <MessageSquare size={14} color="#16a34a" />
                </div>
                <a
                  href={`https://wa.me/91${COMPANY_INFO.phone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: '0.875rem', color: '#111827', fontWeight: 600, textDecoration: 'none' }}
                >
                  WhatsApp Us
                </a>
              </div>

              {/* Facility stats */}
              <div
                style={{
                  marginTop: '8px', padding: '14px 16px', borderRadius: '12px',
                  backgroundColor: '#ffffff',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                }}
              >
                <div style={{ fontSize: '0.72rem', color: '#64748b', marginBottom: '4px', letterSpacing: '0.06em', textTransform: 'uppercase', fontWeight: 700 }}>
                  Facility
                </div>
                <div style={{ fontSize: '0.8rem', color: '#111827', fontWeight: 600, lineHeight: 1.6 }}>
                  43,000 sq.ft. <span style={{ color: '#64748b', fontWeight: 400 }}>Total</span><br />
                  40,000 sq.ft. <span style={{ color: '#64748b', fontWeight: 400 }}>Secured, 24/7 CCTV</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ──────────────────────────────────── */}
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
                Abhivorn Technologies
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ fontSize: '0.78rem', color: '#64748b' }}>
              Hyderabad, Telangana, India
            </span>
            <button
              onClick={scrollToTop}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                padding: '8px 16px', borderRadius: '999px',
                backgroundColor: '#fee2e2',
                border: '1px solid #fecaca',
                color: '#dc2626', fontSize: '0.76rem', fontWeight: 700,
                cursor: 'pointer', transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#fca5a5';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#fee2e2';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Back to Top <ArrowUp size={13} />
            </button>
          </div>
        </div>
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
  );
};
