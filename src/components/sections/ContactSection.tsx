import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Phone,
  Mail,
  MapPin,
  Building,
  Factory,
  ExternalLink,
  CheckCircle2,
  Send,
} from 'lucide-react'
import { SectionHeader } from '../common/SectionHeader'
import { ScrollReveal } from '../common/ScrollReveal'
import { COMPANY_INFO } from '../../data/company'
import { dispatchFormEmail } from '../../services/mailService'

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    companyName: '',
    phone: '',
    email: '',
    message: '',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[field]
        return next
      })
    }
  }

  const validate = () => {
    const errs: Record<string, string> = {}
    if (!formData.name.trim()) {
      errs.name = 'Please enter your name'
    } else if (formData.name.trim().length < 2) {
      errs.name = 'Name must be at least 2 characters'
    }

    if (!formData.companyName.trim()) {
      errs.companyName = 'Company name is required'
    } else if (formData.companyName.trim().length < 2) {
      errs.companyName = 'Company name must be at least 2 characters'
    }

    const cleanedPhone = formData.phone.trim().replace(/\D/g, '')
    if (!cleanedPhone) {
      errs.phone = 'Mobile number is required'
    } else if (cleanedPhone.length !== 10) {
      errs.phone = 'Mobile number must be exactly 10 digits'
    } else if (!/^[6-9]\d{9}$/.test(cleanedPhone)) {
      errs.phone = 'Please enter a valid 10-digit mobile number (starts with 6, 7, 8, or 9)'
    }

    if (!formData.email.trim()) {
      errs.email = 'Please enter your email address'
    } else if (!/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email address (e.g. name@domain.com)'
    }

    if (!formData.message.trim()) {
      errs.message = 'Please enter your message or project requirements'
    } else if (formData.message.trim().length < 5) {
      errs.message = 'Please enter at least 5 characters for your inquiry details'
    }

    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setSubmitting(true)

    const messageLines = [
      `*New Contact Form Inquiry - Kolli Graphics*`,
      `-----------------------------------------`,
      `*Name:* ${formData.name}`,
      `*Company Name:* ${formData.companyName || 'N/A'}`,
      `*Phone:* ${formData.phone}`,
      `*Email ID:* ${formData.email}`,
      `*Message:* ${formData.message || 'General Inquiry'}`,
      `-----------------------------------------`,
      `_Sent from Kolli Graphics Contact Form_`,
    ]

    const waUrl = `https://wa.me/${COMPANY_INFO.phoneRaw}?text=${encodeURIComponent(messageLines.join('\n'))}`

    // Automatically open WhatsApp directly with pre-filled message
    try {
      window.open(waUrl, '_blank', 'noopener,noreferrer')
    } catch {
      // browser popup blocker fallback
    }

    // Automatically dispatch email (direct SMTP on production)
    try {
      await dispatchFormEmail(
        `New Inquiry: ${formData.name} (${formData.companyName})`,
        {
          Name: formData.name,
          Company: formData.companyName,
          Phone: formData.phone,
          Email: formData.email,
          Message: formData.message,
        }
      )
    } catch (err) {
      console.warn('Auto-email notice:', err)
    }

    setSubmitting(false)
    setSubmitted(true)
  }

  return (
    <section id="contact" style={{ padding: '135px 0 70px 0', backgroundColor: '#ffffff' }}>
      <div className="container">
        {/* Section Header */}
        <ScrollReveal direction="up" delay={0.05}>
          <SectionHeader
            badge="Get In Touch"
            badgeVariant="cyan"
            title="Corporate Office &"
            titleHighlight="Works Facility"
            subtitle="Direct phone line, email contacts, plant location, and instant inquiry form."
          />
        </ScrollReveal>

        {/* 2-Column Layout: Address Info on Left, Official Contact Form on Right */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
            gap: '32px',
            alignItems: 'start',
          }}
        >
          {/* Left Column: Corporate Office, Works & Contact Info */}
          <ScrollReveal direction="up" delay={0.1}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* Corporate Office */}
              <div
                className="smoke-hover-card"
                style={{
                  padding: '32px',
                  borderRadius: '20px',
                }}
              >
                <div
                  style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}
                >
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '10px',
                      backgroundColor: '#fee2e2',
                      color: '#dc2626',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Building size={20} />
                  </div>
                  <h3 style={{ fontSize: '1.25rem', color: '#111827' }}>Corporate Office</h3>
                </div>

                <p style={{ fontSize: '1rem', color: '#374151', lineHeight: 1.7, fontWeight: 500 }}>
                  {COMPANY_INFO.corporateOffice.address}
                  <br />
                  {COMPANY_INFO.corporateOffice.city} – {COMPANY_INFO.corporateOffice.pincode}
                </p>
              </div>

              {/* Works - with Google MAP (Strictly per document) */}
              <div
                className="smoke-hover-card"
                style={{
                  padding: '32px',
                  borderRadius: '20px',
                }}
              >
                <div
                  style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}
                >
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '10px',
                      backgroundColor: 'rgba(220, 38, 38, 0.1)',
                      color: '#dc2626',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Factory size={20} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', color: '#111827' }}>
                      Works Facility
                    </h3>
                    <span style={{ fontSize: '0.78rem', color: '#6b7280' }}>
                      Manufacturing &amp; Secured Storage Facility
                    </span>
                  </div>
                </div>

                <p
                  style={{
                    fontSize: '1rem',
                    color: '#374151',
                    lineHeight: 1.7,
                    fontWeight: 500,
                    marginBottom: '20px',
                  }}
                >
                  {COMPANY_INFO.worksFacility.address}, {COMPANY_INFO.worksFacility.area}
                  <br />
                  {COMPANY_INFO.worksFacility.city} – {COMPANY_INFO.worksFacility.pincode}
                </p>

                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(`${COMPANY_INFO.worksFacility.address}, Phase V, IDA Cherlapally, Hyderabad 500051`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '11px 20px',
                    borderRadius: '10px',
                    backgroundColor: '#111827',
                    color: '#ffffff',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    textDecoration: 'none',
                  }}
                >
                  <MapPin size={16} color="#f59e0b" />
                  <span>Open Google MAP</span>
                  <ExternalLink size={14} />
                </a>
              </div>

              {/* Direct Contact Channels */}
              <div
                className="smoke-hover-card"
                style={{
                  padding: '28px',
                  borderRadius: '20px',
                }}
              >
                <h4 style={{ fontSize: '1.05rem', color: '#111827', marginBottom: '14px' }}>
                  Contact Person
                </h4>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    fontSize: '0.95rem',
                  }}
                >
                  <div>
                    <strong>{COMPANY_INFO.contactPerson}</strong> (CEO)
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Phone size={16} color="#dc2626" />
                    <a
                      href={`tel:${COMPANY_INFO.phoneRaw}`}
                      style={{ color: '#dc2626', fontWeight: 600 }}
                    >
                      {COMPANY_INFO.phone}
                    </a>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Mail size={16} color="#dc2626" />
                    <a
                      href={`mailto:${COMPANY_INFO.email}`}
                      style={{ color: '#dc2626', fontWeight: 600 }}
                    >
                      {COMPANY_INFO.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Right Column: Contact Form */}
          <ScrollReveal direction="up" delay={0.2}>
            <div
              className="smoke-hover-card"
              style={{
                padding: '36px',
                borderRadius: '24px',
                backgroundColor: '#ffffff',
                border: '1px solid #e5e7eb',
                boxShadow: 'var(--shadow-md)',
              }}
            >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  padding: '48px 20px',
                  minHeight: '440px',
                }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.1 }}
                  style={{
                    width: '84px',
                    height: '84px',
                    borderRadius: '50%',
                    backgroundColor: '#dcfce7',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#16a34a',
                    marginBottom: '24px',
                    boxShadow: '0 8px 24px rgba(22, 163, 74, 0.2)',
                  }}
                >
                  <CheckCircle2 size={46} strokeWidth={2.5} />
                </motion.div>

                <h3
                  style={{
                    fontSize: '1.75rem',
                    color: '#111827',
                    fontWeight: 800,
                    marginBottom: '12px',
                  }}
                >
                  Thank You!
                </h3>

                <p
                  style={{
                    fontSize: '1.05rem',
                    color: '#374151',
                    lineHeight: 1.6,
                    maxWidth: '420px',
                    marginBottom: '28px',
                    fontWeight: 500,
                  }}
                >
                  Thank you for your interest and someone will get in touch with you within 24 hours.
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setFormData({ name: '', companyName: '', phone: '', email: '', message: '' })
                    setSubmitted(false)
                  }}
                  style={{
                    padding: '10px 24px',
                    borderRadius: '10px',
                    border: '1px solid #e2e8f0',
                    backgroundColor: '#f8fafc',
                    color: '#475569',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <>
                <div style={{ marginBottom: '22px' }}>
                  <h3 style={{ fontSize: '1.6rem', color: '#111827' }}>Contact Form:</h3>
                  <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                    Send your message, inquiries, or sample requests directly to Kolli Graphics.
                  </p>
                </div>

                <form onSubmit={handleSubmit} noValidate>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div>
                      <label className="modern-input-label">Name *</label>
                      <input
                        type="text"
                        placeholder="Enter your name"
                        value={formData.name}
                        spellCheck={false}
                        onChange={(e) => handleChange('name', e.target.value)}
                        className={`modern-input-field ${errors.name ? 'error' : ''}`}
                      />
                      {errors.name && (
                        <span style={{ color: '#dc2626', fontSize: '0.75rem', marginTop: '4px', display: 'block', fontWeight: 600 }}>
                          {errors.name}
                        </span>
                      )}
                    </div>

                    <div>
                      <label className="modern-input-label">Company Name *</label>
                      <input
                        type="text"
                        placeholder="Enter your company name"
                        value={formData.companyName}
                        spellCheck={false}
                        onChange={(e) => handleChange('companyName', e.target.value)}
                        className={`modern-input-field ${errors.companyName ? 'error' : ''}`}
                      />
                      {errors.companyName && (
                        <span style={{ color: '#dc2626', fontSize: '0.75rem', marginTop: '4px', display: 'block', fontWeight: 600 }}>
                          {errors.companyName}
                        </span>
                      )}
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: '14px' }}>
                      <div>
                        <label className="modern-input-label">Contact : Phone *</label>
                        <input
                          type="tel"
                          maxLength={10}
                          placeholder="10-digit mobile number"
                          value={formData.phone}
                          onChange={(e) => {
                            let val = e.target.value.replace(/\D/g, '')
                            if (val.startsWith('0')) val = val.substring(1)
                            handleChange('phone', val.slice(0, 10))
                          }}
                          className={`modern-input-field ${errors.phone ? 'error' : ''}`}
                        />
                        {errors.phone && (
                          <span style={{ color: '#dc2626', fontSize: '0.75rem', marginTop: '4px', display: 'block', fontWeight: 600 }}>
                            {errors.phone}
                          </span>
                        )}
                      </div>

                      <div>
                        <label className="modern-input-label">Email ID *</label>
                        <input
                          type="email"
                          placeholder="Enter your email address"
                          value={formData.email}
                          spellCheck={false}
                          onChange={(e) => handleChange('email', e.target.value)}
                          className={`modern-input-field ${errors.email ? 'error' : ''}`}
                        />
                        {errors.email && (
                          <span style={{ color: '#dc2626', fontSize: '0.75rem', marginTop: '4px', display: 'block', fontWeight: 600 }}>
                            {errors.email}
                          </span>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="modern-input-label">Message / Project Details *</label>
                      <textarea
                        rows={4}
                        placeholder="Tell us about your printing, packaging, cartons or labels requirement..."
                        value={formData.message}
                        onChange={(e) => handleChange('message', e.target.value)}
                        className={`modern-input-field ${errors.message ? 'error' : ''}`}
                        style={{ resize: 'vertical' }}
                      />
                      {errors.message && (
                        <span style={{ color: '#dc2626', fontSize: '0.75rem', marginTop: '4px', display: 'block', fontWeight: 600 }}>
                          {errors.message}
                        </span>
                      )}
                    </div>

                    <motion.button
                      type="submit"
                      disabled={submitting}
                      whileHover={{ scale: 1.01, y: -2 }}
                      whileTap={{ scale: 0.99 }}
                      style={{
                        width: '100%',
                        padding: '14px',
                        borderRadius: '12px',
                        background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
                        color: '#ffffff',
                        fontSize: '0.975rem',
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        border: 'none',
                        cursor: submitting ? 'wait' : 'pointer',
                        boxShadow: '0 4px 16px rgba(220, 38, 38, 0.35)',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <Send size={16} />
                      <span>{submitting ? 'Submitting...' : 'Submit'}</span>
                    </motion.button>
                  </div>
                </form>
              </>
            )}
          </div>
        </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
