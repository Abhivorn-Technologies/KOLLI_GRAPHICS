import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Phone, MessageSquare, ArrowRight } from 'lucide-react'
import { COMPANY_INFO } from '../../data/company'

const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Company', path: '/company' },
  { label: 'Capabilities', path: '/capabilities' },
  { label: 'Equipment', path: '/equipment' },
  { label: 'Estimating', path: '/estimating' },
  { label: 'Contact', path: '/contact' },
]

export const Navbar: React.FC = () => {
  const location = useLocation()
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
    window.scrollTo({ top: 0 })
  }, [location.pathname])

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/' || location.pathname === '/home'
    return location.pathname === path
  }

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          transition: 'all 0.35s ease',
          backgroundColor: isScrolled ? 'rgba(255,255,255,0.97)' : 'rgba(255,255,255,0.92)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: isScrolled ? '1px solid rgba(17,24,39,0.08)' : '1px solid transparent',
          boxShadow: isScrolled ? '0 4px 20px -2px rgba(0,0,0,0.06)' : 'none',
          height: 'var(--nav-height)',
        }}
      >
        <div
          className="container"
          style={{
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '20px',
          }}
        >
          {/* Brand Logo → Home */}
          <Link
            to="/"
            style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}
          >
            <img
              src="/assets/logo/kolli-logo.png"
              alt="Kolli Graphics Private Limited"
              style={{ height: '46px', width: 'auto', objectFit: 'contain' }}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav
            className="desktop-nav"
            style={{ display: 'none', alignItems: 'center', gap: '6px' }}
          >
            {NAV_LINKS.map((link) => {
              const active = isActive(link.path)
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  style={{
                    position: 'relative',
                    padding: '8px 14px',
                    fontSize: '0.88rem',
                    fontWeight: active ? 700 : 500,
                    color: active ? '#dc2626' : '#374151',
                    borderRadius: '8px',
                    transition: 'color 0.2s ease',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={(e) => {
                    if (!active) e.currentTarget.style.color = '#dc2626'
                  }}
                  onMouseLeave={(e) => {
                    if (!active) e.currentTarget.style.color = '#374151'
                  }}
                >
                  {link.label}
                  {active && (
                    <span
                      style={{
                        position: 'absolute',
                        bottom: '2px',
                        left: '14px',
                        right: '14px',
                        height: '2px',
                        backgroundColor: '#dc2626',
                        borderRadius: '2px',
                      }}
                    />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Quick Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <a
              href={`tel:${COMPANY_INFO.phone}`}
              className="quick-call-btn"
              style={{
                display: 'none',
                alignItems: 'center',
                gap: '8px',
                padding: '9px 16px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'rgba(17,24,39,0.04)',
                border: '1px solid rgba(17,24,39,0.08)',
                color: '#111827',
                fontSize: '0.85rem',
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'all 0.2s ease',
              }}
            >
              <Phone size={15} color="#dc2626" />
              <span>{COMPANY_INFO.phone}</span>
            </a>

            <Link
              to="/estimating"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 20px',
                borderRadius: 'var(--radius-full)',
                background: 'linear-gradient(135deg,#dc2626 0%,#b91c1c 100%)',
                color: '#ffffff',
                fontSize: '0.875rem',
                fontWeight: 600,
                boxShadow: '0 4px 14px rgba(21,128,61,0.35)',
                transition: 'all 0.25s ease',
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              <span>Estimating</span>
              <ArrowRight size={15} />
            </Link>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="mobile-toggle-btn"
              aria-label="Toggle navigation menu"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '42px',
                height: '42px',
                borderRadius: '10px',
                backgroundColor: '#ebeef2',
                color: '#111827',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            top: 'var(--nav-height)',
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 999,
            backgroundColor: 'rgba(255,255,255,0.98)',
            backdropFilter: 'blur(20px)',
            display: 'flex',
            flexDirection: 'column',
            padding: '24px 20px',
            overflowY: 'auto',
          }}
        >
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}
          >
            {NAV_LINKS.map((link) => {
              const active = isActive(link.path)
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  style={{
                    padding: '14px 18px',
                    borderRadius: '12px',
                    fontSize: '1.05rem',
                    fontWeight: 600,
                    color: active ? '#dc2626' : '#111827',
                    backgroundColor: active ? 'rgba(21,128,61,0.08)' : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    textDecoration: 'none',
                  }}
                >
                  <span>{link.label}</span>
                  <ArrowRight size={16} color={active ? '#dc2626' : '#d1d5db'} />
                </Link>
              )
            })}
          </div>

          <div
            style={{
              marginTop: 'auto',
              paddingTop: '20px',
              borderTop: '1px solid #e5e7eb',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            <a
              href={`https://wa.me/91${COMPANY_INFO.phone}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                padding: '14px',
                borderRadius: '12px',
                backgroundColor: '#25D366',
                color: '#ffffff',
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              <MessageSquare size={18} />
              <span>WhatsApp: +91 {COMPANY_INFO.phone}</span>
            </a>
            <a
              href={`tel:${COMPANY_INFO.phone}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                padding: '14px',
                borderRadius: '12px',
                backgroundColor: '#111827',
                color: '#ffffff',
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              <Phone size={18} />
              <span>Call: +91 {COMPANY_INFO.phone}</span>
            </a>
          </div>
        </div>
      )}

      <style>{`
        @media (min-width: 992px) {
          .desktop-nav { display: flex !important; }
          .mobile-toggle-btn { display: none !important; }
          .quick-call-btn { display: inline-flex !important; }
        }
      `}</style>
    </>
  )
}
