import React, { useState } from 'react'
import {
  Phone,
  Mail,
  MapPin,
  Building,
  Factory,
  ExternalLink,
  Send,
  CheckCircle2,
} from 'lucide-react'
import { SectionHeader } from '../common/SectionHeader'
import { COMPANY_INFO } from '../../data/company'

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    companyName: '',
    phone: '',
    email: '',
    message: '',
  })

  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name.trim() || !formData.phone.trim() || !formData.email.trim()) {
      setError('Please fill in your Name, Phone, and Email ID.')
      return
    }
    setError('')

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

    const encoded = encodeURIComponent(messageLines.join('\n'))
    const url = `https://wa.me/91${COMPANY_INFO.phone}?text=${encoded}`
    setSubmitted(true)
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <section id="contact" style={{ padding: '56px 0', backgroundColor: '#ffffff' }}>
      <div className="container">
        {/* Section Header */}
        <SectionHeader
          badge="Get In Touch"
          badgeVariant="cyan"
          title="Corporate Office &"
          titleHighlight="Works Facility"
          subtitle="Direct phone line, email contacts, plant location, and instant inquiry form."
        />

        {/* 2-Column Layout: Address Info on Left, Official Contact Form on Right */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '40px',
            alignItems: 'start',
          }}
        >
          {/* Left Column: Corporate Office, Works & Contact Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Corporate Office */}
            <div
              className="premium-card"
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
              className="premium-card"
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
                    Works: - with Google MAP
                  </h3>
                  <span style={{ fontSize: '0.78rem', color: '#6b7280' }}>
                    Manufacturing & Secured Storage Facility
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
                {COMPANY_INFO.worksFacility.address}
                <br />
                {COMPANY_INFO.worksFacility.area}
                <br />
                Cheralapally
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
              className="premium-card"
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
                    href={`tel:${COMPANY_INFO.phone}`}
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

          {/* Right Column: Contact Form (Document Line 147: "Contact Form:") */}
          <div
            style={{
              padding: '36px',
              borderRadius: '24px',
              backgroundColor: '#ffffff',
              border: '1px solid #e5e7eb',
              boxShadow: 'var(--shadow-md)',
            }}
          >
            <div style={{ marginBottom: '22px' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '4px 12px',
                  borderRadius: '6px',
                  backgroundColor: '#fee2e2',
                  color: '#dc2626',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  marginBottom: '10px',
                }}
              >
                Document Line 147
              </div>
              <h3 style={{ fontSize: '1.6rem', color: '#111827' }}>Contact Form:</h3>
              <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                Send your message, inquiries, or sample requests directly to Kolli Graphics.
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      color: '#374151',
                      marginBottom: '6px',
                    }}
                  >
                    Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: '10px',
                      border: '1px solid #d1d5db',
                      fontSize: '0.9rem',
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      color: '#374151',
                      marginBottom: '6px',
                    }}
                  >
                    Company name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your company name"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: '10px',
                      border: '1px solid #d1d5db',
                      fontSize: '0.9rem',
                      outline: 'none',
                    }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div>
                    <label
                      style={{
                        display: 'block',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        color: '#374151',
                        marginBottom: '6px',
                      }}
                    >
                      Contact : Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 9849646688"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        borderRadius: '10px',
                        border: '1px solid #d1d5db',
                        fontSize: '0.9rem',
                        outline: 'none',
                      }}
                    />
                  </div>

                  <div>
                    <label
                      style={{
                        display: 'block',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        color: '#374151',
                        marginBottom: '6px',
                      }}
                    >
                      Email ID *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. email@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        borderRadius: '10px',
                        border: '1px solid #d1d5db',
                        fontSize: '0.9rem',
                        outline: 'none',
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      color: '#374151',
                      marginBottom: '6px',
                    }}
                  >
                    Message / Project Details
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your printing, packaging, cartons or labels requirement..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: '10px',
                      border: '1px solid #d1d5db',
                      fontSize: '0.9rem',
                      outline: 'none',
                      fontFamily: 'inherit',
                      resize: 'vertical',
                    }}
                  />
                </div>

                {error && <div style={{ color: '#ef4444', fontSize: '0.8rem' }}>{error}</div>}

                <button
                  type="submit"
                  style={{
                    width: '100%',
                    padding: '14px',
                    borderRadius: '10px',
                    background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
                    color: '#ffffff',
                    fontSize: '0.95rem',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(21, 128, 61, 0.35)',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
                >
                  <Send size={16} />
                  <span>Submit Contact Form</span>
                </button>
              </div>
            </form>

            {submitted && (
              <div
                style={{
                  marginTop: '18px',
                  padding: '14px',
                  borderRadius: '10px',
                  backgroundColor: '#f0fdf4',
                  border: '1px solid #bbf7d0',
                  color: '#dc2626',
                  fontSize: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <CheckCircle2 size={18} />
                <span>
                  Thank you! Your message has been prepared for Ranga Reddy Kolli (+91{' '}
                  {COMPANY_INFO.phone}).
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
