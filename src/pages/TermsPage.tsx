import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Scale, Layers, ArrowLeft } from 'lucide-react'
import { COMPANY_INFO } from '../data/company'

export const TermsPage: React.FC = () => {
  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', padding: '120px 0 80px 0' }}>
      <div className="container" style={{ maxWidth: '900px', margin: '0 auto', padding: '0 20px' }}>
        
        {/* Back navigation */}
        <Link
          to="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: '#64748b',
            textDecoration: 'none',
            fontSize: '0.9rem',
            fontWeight: 600,
            marginBottom: '32px',
            transition: 'color 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#dc2626')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#64748b')}
        >
          <ArrowLeft size={16} />
          <span>Back to Home</span>
        </Link>

        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '24px',
            padding: '40px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
            marginBottom: '32px',
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: '999px',
              backgroundColor: 'rgba(0, 174, 239, 0.08)',
              color: '#00aeef',
              fontSize: '0.78rem',
              fontWeight: 700,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              marginBottom: '16px',
            }}
          >
            <Scale size={14} />
            <span>Legal Agreement</span>
          </div>

          <h1
            style={{
              fontSize: '2.4rem',
              fontWeight: 800,
              color: '#111827',
              lineHeight: 1.2,
              marginBottom: '12px',
            }}
          >
            Terms &amp; Conditions
          </h1>

          <p style={{ fontSize: '0.95rem', color: '#64748b', lineHeight: 1.6, margin: 0 }}>
            <strong>Entity:</strong> {COMPANY_INFO.name} &bull; <strong>Effective Date:</strong> October 2024 &bull;{' '}
            <strong>Jurisdiction:</strong> Hyderabad, Telangana, India
          </p>
        </motion.div>

        {/* Terms Content Sections */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '24px',
            padding: '48px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
            display: 'flex',
            flexDirection: 'column',
            gap: '36px',
            color: '#334155',
            lineHeight: 1.7,
            fontSize: '0.96rem',
          }}
        >
          {/* Section 1 */}
          <section>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#111827', marginBottom: '12px' }}>
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing, browsing, or utilizing the website, digital portals, or estimation tools of{' '}
              <strong>{COMPANY_INFO.name}</strong> (&ldquo;Kolli Graphics&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;), you acknowledge that you have read, understood, and agreed to be legally bound by these Terms &amp; Conditions and our Privacy Policy.
            </p>
            <p>
              If you do not agree to these terms, please discontinue using this website immediately.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#111827', marginBottom: '12px' }}>
              2. Intellectual Property &amp; Proprietary Rights
            </h2>
            <p>
              All materials displayed or accessible on this website—including, but not limited to, company logos, brand trademarks, website code, packaging structural die-lines, 3D renderings, machinery photography, visual layouts, and written technical content—are the exclusive intellectual property of <strong>{COMPANY_INFO.name}</strong> or its licensors.
            </p>
            <ul style={{ paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li>You may not reproduce, distribute, modify, create derivative works of, publicly display, or commercially exploit any material without prior written permission from Kolli Graphics.</li>
              <li>Customer brand artworks, pharmaceutical trademarks, and registered client trade dress displayed as portfolio references remain the property of their respective trademark holders.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section
            style={{
              padding: '24px',
              borderRadius: '16px',
              backgroundColor: '#f0f9ff',
              border: '1.5px solid #bae6fd',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <Layers size={22} color="#00aeef" />
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0369a1', margin: 0 }}>
                3. Online Estimating Portal &amp; Quotation Disclaimer
              </h2>
            </div>
            <p style={{ color: '#0c4a6e', fontSize: '0.92rem', marginBottom: '12px' }}>
              The interactive carton dimensioning, grammage selection, and calculation tools provided on this website are designed solely to generate <strong>preliminary indicative engineering estimates</strong> for commercial discussion.
            </p>
            <ul style={{ paddingLeft: '20px', color: '#075985', fontSize: '0.88rem', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <li>Estimates generated on the website do not constitute a legally binding contractual offer or firm price commitment until verified by our technical engineering desk.</li>
              <li>Final commercial production pricing is contingent upon substrate paperboard market rates, formal die approval, GSM specifications, special pantone ink confirmations, order batch volumes, and execution of a formal Purchase Order (PO).</li>
              <li>Tolerances in manufacturing (cutting, creasing, grammage variations) follow standard Indian Paper &amp; Packaging Institute trade norms (&plusmn;0.5mm dimensional variance).</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#111827', marginBottom: '12px' }}>
              4. Acceptable Website Use
            </h2>
            <p>When using our website and communication features, you agree NOT to:</p>
            <ul style={{ paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li>Submit false, misleading, defamatory, or fraudulent quotation requests.</li>
              <li>Introduce malicious scripts, viruses, automated bots, scrapers, or code intended to damage or disrupt site infrastructure.</li>
              <li>Attempt unauthorized penetration testing, vulnerability scanning, or security bypass of server networks.</li>
              <li>Impersonate any person, business entity, or pharmaceutical brand without authorization.</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#111827', marginBottom: '12px' }}>
              5. Limitation of Liability
            </h2>
            <p>
              To the fullest extent permitted by applicable Indian law, Kolli Graphics Private Limited, its directors, officers, employees, and developers shall not be liable for any indirect, incidental, punitive, or consequential damages resulting from:
            </p>
            <ul style={{ paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li>The use or inability to use this website or digital quotation features.</li>
              <li>Unscheduled website downtime, maintenance interruptions, or technical transmission errors.</li>
              <li>Reliance placed upon preliminary online estimates prior to written commercial confirmation.</li>
            </ul>
          </section>

          {/* Section 6 */}
          <section>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#111827', marginBottom: '12px' }}>
              6. Governing Law &amp; Jurisdiction
            </h2>
            <p style={{ margin: 0 }}>
              These Terms &amp; Conditions are governed by and construed in accordance with the laws of the Republic of India. Any legal dispute, claim, or controversy arising out of or related to these terms or your use of the website shall be subject to the exclusive jurisdiction of the competent courts situated in <strong>Hyderabad, Telangana, India</strong>.
            </p>
          </section>

          {/* Section 7 */}
          <section
            style={{
              padding: '24px',
              borderRadius: '16px',
              backgroundColor: '#f8fafc',
              border: '1px solid #e2e8f0',
            }}
          >
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111827', marginBottom: '8px' }}>
              7. Contact &amp; Legal Notices
            </h2>
            <p style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '14px' }}>
              For formal legal inquiries, notices, or clarifications regarding these Terms, please contact our corporate desk:
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.9rem', color: '#111827' }}>
              <div><strong>{COMPANY_INFO.name}</strong></div>
              <div>Registered Office: {COMPANY_INFO.corporateOffice.address}, {COMPANY_INFO.corporateOffice.city} &ndash; {COMPANY_INFO.corporateOffice.pincode}, Telangana</div>
              <div>Email: <a href={`mailto:${COMPANY_INFO.email}`} style={{ color: '#dc2626' }}>{COMPANY_INFO.email}</a></div>
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  )
}
