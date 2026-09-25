import React, { useState } from 'react';
import { MessageSquare, Upload, FileText, Info } from 'lucide-react';
import { SectionHeader } from '../common/SectionHeader';
import { COMPANY_INFO } from '../../data/company';

interface FormData {
  name: string;
  companyName: string;
  phone: string;
  email: string;
  cartonType: string;
  cartonTypeOther: string;
  lengthMm: string;
  widthMm: string;
  heightMm: string;
  boardType: string;
  boardTypeOther: string;
  gsm: string;
  surfaceCoating: string;
  scannedImageName: string;
  artworkFileName: string;
}

export const EstimatingSection: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    companyName: '',
    phone: '',
    email: '',
    cartonType: 'Reverse Tuck',
    cartonTypeOther: '',
    lengthMm: '120',
    widthMm: '80',
    heightMm: '180',
    boardType: 'FBB',
    boardTypeOther: '',
    gsm: '300',
    surfaceCoating: 'UV Varnish',
    scannedImageName: '',
    artworkFileName: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [whatsAppUrl, setWhatsAppUrl] = useState('');

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Full name is required';
    if (!formData.companyName.trim()) errs.companyName = 'Company name is required';
    if (!formData.phone.trim()) {
      errs.phone = 'Phone number is required';
    } else if (!/^[0-9+ -]{8,15}$/.test(formData.phone.trim())) {
      errs.phone = 'Please enter a valid phone number';
    }
    if (!formData.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email address';
    }

    if (!formData.lengthMm || Number(formData.lengthMm) <= 0) errs.lengthMm = 'Enter length (mm)';
    if (!formData.widthMm || Number(formData.widthMm) <= 0) errs.widthMm = 'Enter width (mm)';
    if (!formData.heightMm || Number(formData.heightMm) <= 0) errs.heightMm = 'Enter height (mm)';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const actualCartonType = formData.cartonType === 'Other'
      ? `Other (${formData.cartonTypeOther || 'Not specified'})`
      : formData.cartonType;

    const actualBoardType = formData.boardType === 'Others'
      ? `Others (${formData.boardTypeOther || 'Not specified'})`
      : formData.boardType;

    const messageLines = [
      `*New Estimate Request - Kolli Graphics*`,
      `-----------------------------------------`,
      `*Name:* ${formData.name}`,
      `*Company:* ${formData.companyName}`,
      `*Contact Phone:* ${formData.phone}`,
      `*Email ID:* ${formData.email}`,
      `-----------------------------------------`,
      `*Type of Carton:* ${actualCartonType}`,
      `*Dimensions:* ${formData.lengthMm} mm (L) x ${formData.widthMm} mm (W) x ${formData.heightMm} mm (H)`,
      `*Type of Board:* ${actualBoardType}`,
      `*GSM:* ${formData.gsm || 'Standard'}`,
      `*Surface Coating:* ${formData.surfaceCoating}`,
      `-----------------------------------------`
    ];

    if (formData.scannedImageName) {
      messageLines.push(`*Scanned Image:* ${formData.scannedImageName} (Attaching in WhatsApp)`);
    }
    if (formData.artworkFileName) {
      messageLines.push(`*Artwork File:* ${formData.artworkFileName} (Attaching in WhatsApp)`);
    }

    messageLines.push(
      `-----------------------------------------`,
      `_Submitted via Kolli Graphics Web Estimating Portal_`
    );

    const encodedMessage = encodeURIComponent(messageLines.join('\n'));
    const url = `https://wa.me/91${COMPANY_INFO.phone}?text=${encodedMessage}`;
    setWhatsAppUrl(url);
    setSubmitted(true);

    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Dimensional preview ratios
  const l = Number(formData.lengthMm) || 100;
  const w = Number(formData.widthMm) || 100;
  const h = Number(formData.heightMm) || 100;
  const maxDim = Math.max(l, w, h, 1);
  const scaleRatio = 140 / maxDim;
  const previewL = Math.max(40, Math.min(180, l * scaleRatio));
  const previewW = Math.max(30, Math.min(140, w * scaleRatio));
  const previewH = Math.max(50, Math.min(200, h * scaleRatio));

  return (
    <section id="estimating" style={{ padding: '100px 0', backgroundColor: '#f8fafc' }}>
      <div className="container">
        {/* Section Header */}
        <SectionHeader
          badge="Direct Estimating"
          badgeVariant="cyan"
          title="Request a Custom"
          titleHighlight="Carton & Print Estimate"
          subtitle="Provide your packaging specifications below and our executive team will revert back to you within one business working day."
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '36px',
            alignItems: 'start'
          }}
        >
          {/* Left Column: Comprehensive Estimating Form */}
          <div
            style={{
              padding: '36px',
              borderRadius: '24px',
              backgroundColor: '#ffffff',
              border: '1px solid #e2e8f0',
              boxShadow: '0 8px 30px rgba(0,0,0,0.04)'
            }}
          >
            <form onSubmit={handleSubmit} noValidate>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {/* 1. Contact Information */}
                <div>
                  <h4 style={{ fontSize: '1rem', color: '#111827', fontWeight: 800, marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#dc2626' }} />
                    1. Contact Information
                  </h4>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                        Your Name *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Rakesh Kumar"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '11px 14px',
                          borderRadius: '10px',
                          border: errors.name ? '1.5px solid #dc2626' : '1px solid #cbd5e1',
                          fontSize: '0.9rem',
                          backgroundColor: '#ffffff',
                          color: '#0f172a',
                          outline: 'none'
                        }}
                      />
                      {errors.name && <span style={{ color: '#dc2626', fontSize: '0.75rem', marginTop: '4px', display: 'block', fontWeight: 600 }}>{errors.name}</span>}
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                        Company Name *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Acme Pharma Ltd"
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '11px 14px',
                          borderRadius: '10px',
                          border: errors.companyName ? '1.5px solid #dc2626' : '1px solid #cbd5e1',
                          fontSize: '0.9rem',
                          backgroundColor: '#ffffff',
                          color: '#0f172a',
                          outline: 'none'
                        }}
                      />
                      {errors.companyName && <span style={{ color: '#dc2626', fontSize: '0.75rem', marginTop: '4px', display: 'block', fontWeight: 600 }}>{errors.companyName}</span>}
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginTop: '14px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                        Contact Phone *
                      </label>
                      <input
                        type="tel"
                        placeholder="e.g. 98490 00000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '11px 14px',
                          borderRadius: '10px',
                          border: errors.phone ? '1.5px solid #dc2626' : '1px solid #cbd5e1',
                          fontSize: '0.9rem',
                          backgroundColor: '#ffffff',
                          color: '#0f172a',
                          outline: 'none'
                        }}
                      />
                      {errors.phone && <span style={{ color: '#dc2626', fontSize: '0.75rem', marginTop: '4px', display: 'block', fontWeight: 600 }}>{errors.phone}</span>}
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                        Email ID *
                      </label>
                      <input
                        type="email"
                        placeholder="e.g. contact@acme.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '11px 14px',
                          borderRadius: '10px',
                          border: errors.email ? '1.5px solid #dc2626' : '1px solid #cbd5e1',
                          fontSize: '0.9rem',
                          backgroundColor: '#ffffff',
                          color: '#0f172a',
                          outline: 'none'
                        }}
                      />
                      {errors.email && <span style={{ color: '#dc2626', fontSize: '0.75rem', marginTop: '4px', display: 'block', fontWeight: 600 }}>{errors.email}</span>}
                    </div>
                  </div>
                </div>

                {/* 2. Type of Carton */}
                <div style={{ paddingTop: '18px', borderTop: '1px solid #f1f5f9' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 800, color: '#111827', marginBottom: '12px' }}>
                    2. Type of Carton:
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: '8px' }}>
                    {['Reverse Tuck', 'Crash', 'Lock bottom', 'Other'].map((type) => (
                      <button
                        type="button"
                        key={type}
                        onClick={() => setFormData({ ...formData, cartonType: type })}
                        style={{
                          padding: '10px',
                          borderRadius: '10px',
                          fontSize: '0.82rem',
                          fontWeight: 700,
                          backgroundColor: formData.cartonType === type ? '#dc2626' : '#f8fafc',
                          color: formData.cartonType === type ? '#ffffff' : '#475569',
                          border: formData.cartonType === type ? '1px solid #dc2626' : '1px solid #e2e8f0',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          boxShadow: formData.cartonType === type ? '0 4px 12px rgba(220,38,38,0.25)' : 'none'
                        }}
                      >
                        {type}
                      </button>
                    ))}
                  </div>

                  {formData.cartonType === 'Other' && (
                    <div style={{ marginTop: '12px' }}>
                      <input
                        type="text"
                        placeholder="Please describe carton style (e.g. Four Corner Tray, Sleeve, Tuck-Top)"
                        value={formData.cartonTypeOther}
                        onChange={(e) => setFormData({ ...formData, cartonTypeOther: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '11px 14px',
                          borderRadius: '10px',
                          border: '1px solid #cbd5e1',
                          fontSize: '0.85rem',
                          outline: 'none'
                        }}
                      />
                    </div>
                  )}
                </div>

                {/* 3. Dimensions (mm) */}
                <div style={{ paddingTop: '18px', borderTop: '1px solid #f1f5f9' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 800, color: '#111827', marginBottom: '12px' }}>
                    3. Dimensions (in millimeters):
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b' }}>Length (mm) *</label>
                      <input
                        type="number"
                        min="1"
                        value={formData.lengthMm}
                        onChange={(e) => setFormData({ ...formData, lengthMm: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          borderRadius: '10px',
                          border: errors.lengthMm ? '1.5px solid #dc2626' : '1px solid #cbd5e1',
                          fontSize: '0.9rem',
                          fontWeight: 700,
                          color: '#0f172a',
                          outline: 'none'
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b' }}>Width (mm) *</label>
                      <input
                        type="number"
                        min="1"
                        value={formData.widthMm}
                        onChange={(e) => setFormData({ ...formData, widthMm: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          borderRadius: '10px',
                          border: errors.widthMm ? '1.5px solid #dc2626' : '1px solid #cbd5e1',
                          fontSize: '0.9rem',
                          fontWeight: 700,
                          color: '#0f172a',
                          outline: 'none'
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b' }}>Height (mm) *</label>
                      <input
                        type="number"
                        min="1"
                        value={formData.heightMm}
                        onChange={(e) => setFormData({ ...formData, heightMm: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          borderRadius: '10px',
                          border: errors.heightMm ? '1.5px solid #dc2626' : '1px solid #cbd5e1',
                          fontSize: '0.9rem',
                          fontWeight: 700,
                          color: '#0f172a',
                          outline: 'none'
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* 4. Type of Board & GSM */}
                <div style={{ paddingTop: '18px', borderTop: '1px solid #f1f5f9' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 800, color: '#111827', marginBottom: '12px' }}>
                    4. Type of Paperboard &amp; Substance:
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: '8px', marginBottom: '14px' }}>
                    {['FBB', 'SCB', 'Greyback', 'Safire Graphic', 'Polycoated', 'Others'].map((b) => (
                      <button
                        type="button"
                        key={b}
                        onClick={() => setFormData({ ...formData, boardType: b })}
                        style={{
                          padding: '10px',
                          borderRadius: '10px',
                          fontSize: '0.82rem',
                          fontWeight: 700,
                          backgroundColor: formData.boardType === b ? '#00aeef' : '#f8fafc',
                          color: formData.boardType === b ? '#ffffff' : '#475569',
                          border: formData.boardType === b ? '1px solid #00aeef' : '1px solid #e2e8f0',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          boxShadow: formData.boardType === b ? '0 4px 12px rgba(0,174,239,0.25)' : 'none'
                        }}
                      >
                        {b}
                      </button>
                    ))}
                  </div>

                  {formData.boardType === 'Others' && (
                    <div style={{ marginBottom: '14px' }}>
                      <input
                        type="text"
                        placeholder="Please specify board (e.g. MetPET, Metallized Board, Poly-coated)"
                        value={formData.boardTypeOther}
                        onChange={(e) => setFormData({ ...formData, boardTypeOther: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '11px 14px',
                          borderRadius: '10px',
                          border: '1px solid #cbd5e1',
                          fontSize: '0.85rem',
                          outline: 'none'
                        }}
                      />
                    </div>
                  )}

                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#64748b', marginBottom: '4px' }}>
                      Board Grammage (GSM)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 250, 300, 350, 400"
                      value={formData.gsm}
                      onChange={(e) => setFormData({ ...formData, gsm: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        borderRadius: '10px',
                        border: '1px solid #cbd5e1',
                        fontSize: '0.9rem',
                        fontWeight: 700,
                        color: '#0f172a',
                        outline: 'none'
                      }}
                    />
                  </div>
                </div>

                {/* 5. Surface Coating & Finishes */}
                <div style={{ paddingTop: '18px', borderTop: '1px solid #f1f5f9' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 800, color: '#111827', marginBottom: '12px' }}>
                    5. Surface Coating &amp; Finishes:
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '8px' }}>
                    {['Aqua Varnish', 'Matt Varnish', 'Satin finish Varnish', 'UV Varnish', 'Textured UV', 'Hot Foil Stamping'].map((coating) => (
                      <button
                        type="button"
                        key={coating}
                        onClick={() => setFormData({ ...formData, surfaceCoating: coating })}
                        style={{
                          padding: '10px',
                          borderRadius: '10px',
                          fontSize: '0.8rem',
                          fontWeight: 700,
                          backgroundColor: formData.surfaceCoating === coating ? '#f59e0b' : '#f8fafc',
                          color: formData.surfaceCoating === coating ? '#ffffff' : '#475569',
                          border: formData.surfaceCoating === coating ? '1px solid #f59e0b' : '1px solid #e2e8f0',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          boxShadow: formData.surfaceCoating === coating ? '0 4px 12px rgba(245,158,11,0.25)' : 'none'
                        }}
                      >
                        {coating}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 6. Attachments */}
                <div style={{ paddingTop: '18px', borderTop: '1px solid #f1f5f9' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 800, color: '#111827', marginBottom: '10px' }}>
                    6. Attachments (Scanned Sample / Artwork File):
                  </label>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                    <div>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '6px' }}>
                        Scanned Box Sample
                      </span>
                      <input
                        type="file"
                        id="scanned-image-input"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) setFormData({ ...formData, scannedImageName: file.name });
                        }}
                        style={{ display: 'none' }}
                      />
                      <label
                        htmlFor="scanned-image-input"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '8px 14px',
                          borderRadius: '8px',
                          backgroundColor: '#f1f5f9',
                          border: '1px solid #cbd5e1',
                          color: '#334155',
                          fontSize: '0.78rem',
                          fontWeight: 700,
                          cursor: 'pointer'
                        }}
                      >
                        <Upload size={14} />
                        <span>{formData.scannedImageName ? 'File Ready' : 'Choose Sample'}</span>
                      </label>
                      {formData.scannedImageName && (
                        <span style={{ display: 'block', fontSize: '0.72rem', color: '#dc2626', marginTop: '4px', fontWeight: 600 }}>
                          {formData.scannedImageName}
                        </span>
                      )}
                    </div>

                    <div>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '6px' }}>
                        Artwork File (AI / PDF / CDR)
                      </span>
                      <input
                        type="file"
                        id="artwork-file-input"
                        accept=".ai,.pdf,.cdr,.eps,.psd,image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) setFormData({ ...formData, artworkFileName: file.name });
                        }}
                        style={{ display: 'none' }}
                      />
                      <label
                        htmlFor="artwork-file-input"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '8px 14px',
                          borderRadius: '8px',
                          backgroundColor: '#f1f5f9',
                          border: '1px solid #cbd5e1',
                          color: '#334155',
                          fontSize: '0.78rem',
                          fontWeight: 700,
                          cursor: 'pointer'
                        }}
                      >
                        <FileText size={14} />
                        <span>{formData.artworkFileName ? 'File Ready' : 'Choose Artwork'}</span>
                      </label>
                      {formData.artworkFileName && (
                        <span style={{ display: 'block', fontSize: '0.72rem', color: '#dc2626', marginTop: '4px', fontWeight: 600 }}>
                          {formData.artworkFileName}
                        </span>
                      )}
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.78rem', color: '#64748b', lineHeight: 1.5 }}>
                    <Info size={14} style={{ marginTop: '2px', flexShrink: 0 }} />
                    <span>
                      Selected file details will be generated into the WhatsApp estimate request. You can attach raw artwork files directly in WhatsApp with our executive team.
                    </span>
                  </div>
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  style={{
                    width: '100%',
                    padding: '16px',
                    borderRadius: '999px',
                    background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                    color: '#ffffff',
                    fontSize: '1rem',
                    fontWeight: 800,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    border: 'none',
                    boxShadow: '0 6px 20px rgba(37, 211, 102, 0.35)',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                    marginTop: '8px'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <MessageSquare size={20} />
                  <span>Send Estimate Request via WhatsApp</span>
                </button>

                <p style={{ textAlign: 'center', fontSize: '0.8rem', color: '#64748b', fontStyle: 'italic', margin: 0 }}>
                  “Thank you for your interest in Kolli Graphics. We will revert back to you within one business working day.”
                </p>
              </div>
            </form>

            {submitted && (
              <div
                style={{
                  marginTop: '20px',
                  padding: '16px',
                  borderRadius: '12px',
                  backgroundColor: '#fee2e2',
                  border: '1px solid #fecaca',
                  color: '#dc2626',
                  fontSize: '0.85rem'
                }}
              >
                <strong>Estimate Summary Generated!</strong> WhatsApp chat opened with Ranga Reddy Kolli (+91 {COMPANY_INFO.phone}). <a href={whatsAppUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline', fontWeight: 700 }}>Click here if WhatsApp did not open automatically</a>.
              </div>
            )}
          </div>

          {/* Right Column: Live 3D Proportion Box Preview */}
          <div style={{ position: 'sticky', top: '100px' }}>
            <div
              style={{
                padding: '36px',
                borderRadius: '24px',
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                color: '#111827',
                boxShadow: '0 8px 30px rgba(0,0,0,0.04)'
              }}
            >
              <div style={{ marginBottom: '20px' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#dc2626', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Live Specification Summary
                </span>
                <h3 style={{ fontSize: '1.4rem', color: '#111827', fontWeight: 800, marginTop: '2px' }}>
                  Carton Dimensions Inspector
                </h3>
              </div>

              {/* 3D Box Wireframe Preview */}
              <div
                style={{
                  height: '240px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  perspective: '800px',
                  backgroundColor: '#f8fafc',
                  borderRadius: '16px',
                  border: '1px solid #e2e8f0',
                  marginBottom: '24px'
                }}
              >
                <div
                  style={{
                    width: `${previewL}px`,
                    height: `${previewH}px`,
                    position: 'relative',
                    transformStyle: 'preserve-3d',
                    transform: 'rotateX(-20deg) rotateY(35deg)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {/* Front Face */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      backgroundColor: 'rgba(220, 38, 38, 0.12)',
                      border: '2px solid #dc2626',
                      borderRadius: '4px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#dc2626',
                      fontSize: '0.75rem',
                      fontWeight: 800
                    }}
                  >
                    <span>{formData.lengthMm} × {formData.heightMm} mm</span>
                    <span style={{ fontSize: '0.65rem', color: '#64748b' }}>FRONT</span>
                  </div>

                  {/* Top Face */}
                  <div
                    style={{
                      position: 'absolute',
                      width: `${previewL}px`,
                      height: `${previewW}px`,
                      top: 0,
                      left: 0,
                      backgroundColor: 'rgba(0, 174, 239, 0.12)',
                      border: '2px solid #00aeef',
                      borderRadius: '4px',
                      transformOrigin: 'top center',
                      transform: 'rotateX(90deg)'
                    }}
                  />

                  {/* Side Face */}
                  <div
                    style={{
                      position: 'absolute',
                      width: `${previewW}px`,
                      height: `${previewH}px`,
                      top: 0,
                      right: 0,
                      backgroundColor: 'rgba(245, 158, 11, 0.15)',
                      border: '2px solid #f59e0b',
                      borderRadius: '4px',
                      transformOrigin: 'right center',
                      transform: 'rotateY(90deg)'
                    }}
                  />
                </div>
              </div>

              {/* Live Spec Summary Table */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid #f1f5f9' }}>
                  <span style={{ color: '#64748b', fontWeight: 500 }}>Selected Carton:</span>
                  <span style={{ color: '#111827', fontWeight: 700 }}>{formData.cartonType}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid #f1f5f9' }}>
                  <span style={{ color: '#64748b', fontWeight: 500 }}>Dimensions (L×W×H):</span>
                  <span style={{ color: '#dc2626', fontWeight: 800 }}>{formData.lengthMm} × {formData.widthMm} × {formData.heightMm} mm</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid #f1f5f9' }}>
                  <span style={{ color: '#64748b', fontWeight: 500 }}>Board Type:</span>
                  <span style={{ color: '#00aeef', fontWeight: 700 }}>{formData.boardType}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid #f1f5f9' }}>
                  <span style={{ color: '#64748b', fontWeight: 500 }}>GSM:</span>
                  <span style={{ color: '#111827', fontWeight: 700 }}>{formData.gsm || 'Standard'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748b', fontWeight: 500 }}>Surface Finish:</span>
                  <span style={{ color: '#f59e0b', fontWeight: 700 }}>{formData.surfaceCoating}</span>
                </div>
              </div>

              {/* Contact direct card */}
              <div
                style={{
                  marginTop: '24px',
                  padding: '16px',
                  borderRadius: '12px',
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  fontSize: '0.8rem',
                  color: '#475569',
                  lineHeight: 1.6
                }}
              >
                Executive Contact: <strong style={{ color: '#111827' }}>Ranga Reddy Kolli</strong> (Founder)
                <br />
                Direct Hotline: <strong style={{ color: '#dc2626' }}>+91 {COMPANY_INFO.phone}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
