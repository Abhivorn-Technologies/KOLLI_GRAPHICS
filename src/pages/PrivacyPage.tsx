                                                                                                                                             import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  ShieldCheck,
  UserCheck,
  Mail,
  Phone,
  MapPin,
  ArrowLeft,
  CheckCircle2,
} from 'lucide-react'
import { COMPANY_INFO } from '../data/company'

export const PrivacyPage: React.FC = () => {
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
              backgroundColor: 'rgba(220, 38, 38, 0.08)',
              color: '#dc2626',
              fontSize: '0.78rem',
              fontWeight: 700,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              marginBottom: '16px',
            }}
          >
            <ShieldCheck size={14} />
            <span>DPDPA 2023 Compliant</span>
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
            Privacy Policy
          </h1>

          <p style={{ fontSize: '0.95rem', color: '#64748b', lineHeight: 1.6, margin: 0 }}>
            <strong>Entity:</strong> {COMPANY_INFO.name} &bull; <strong>Effective Date:</strong> October 2024 &bull;{' '}
            <strong>Compliance:</strong> Digital Personal Data Protection (DPDP) Act, 2023 (India)
          </p>
        </motion.div>

        {/* Policy Content Sections */}
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
              1. Introduction &amp; Commitment to Data Protection
            </h2>
            <p>
              <strong>{COMPANY_INFO.name}</strong> (&ldquo;Kolli Graphics&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) is a premier carton manufacturing, packaging, and label finishing company based in Hyderabad, India.
            </p>
            <p>
              We are committed to safeguarding the personal data of our website visitors, clients, partners, and enterprise stakeholders in compliance with the <strong>Digital Personal Data Protection Act, 2023 (&ldquo;DPDPA&rdquo;)</strong> and other applicable Indian laws. This Privacy Policy sets out how we collect, process, store, and protect digital personal data obtained through our website.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#111827', marginBottom: '12px' }}>
              2. Categories of Personal Data We Collect
            </h2>
            <p>We collect only the minimum necessary personal data required to respond to business inquiries and provide precise packaging manufacturing estimates:</p>
            <ul style={{ paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li>
                <strong>Contact &amp; Identification Data:</strong> Full Name, Business Name / Company, Work Email Address, and Phone Number when submitted through our Contact Form or Estimating Portal.
              </li>
              <li>
                <strong>Packaging &amp; Technical Requirements:</strong> Carton dimensions, paperboard substrates (FBB, SCB, Greyback), surface finishes, print quantities, and delivery locations submitted for project feasibility and pricing.
              </li>
              <li>
                <strong>Technical &amp; Device Information:</strong> Internet Protocol (IP) address, browser type, device identifiers, and page interaction timestamps recorded automatically to ensure site security and prevent spam.
              </li>
            </ul>
          </section>

          {/* Section 3 */}
          <section>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#111827', marginBottom: '12px' }}>
              3. Purpose &amp; Lawful Basis of Processing
            </h2>
            <p>Under Section 6 of the DPDP Act 2023, we process your personal data based on your voluntary, informed <strong>consent</strong> for explicit, legitimate business purposes:</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px', marginTop: '14px' }}>
              {[
                { title: 'Quotation & Feasibility', desc: 'Calculating structural packaging prices, tooling feasibility, and material consumption.' },
                { title: 'Customer Communication', desc: 'Direct technical follow-ups via phone or email regarding your orders.' },
                { title: 'Site Security & Integrity', desc: 'Protecting our web portals against automated bots, DDoS attacks, and unauthorized access.' },
                { title: 'Statutory Compliance', desc: 'Maintaining requisite commercial records as mandated under Indian tax and commercial statutes.' },
              ].map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '16px',
                    borderRadius: '12px',
                    backgroundColor: '#f8fafc',
                    border: '1px solid #e2e8f0',
                  }}
                >
                  <div style={{ fontWeight: 700, color: '#dc2626', fontSize: '0.9rem', marginBottom: '4px' }}>
                    {item.title}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#64748b' }}>{item.desc}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 4 */}
          <section>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#111827', marginBottom: '12px' }}>
              4. Storage, Security &amp; Data Retention
            </h2>
            <p>
              We implement comprehensive physical, organizational, and technological controls to safeguard digital personal data:
            </p>
            <ul style={{ paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li>
                <strong>Digital Security:</strong> Data in transit is protected using industry-standard SSL/TLS (HTTPS) encryption. Form endpoints are protected against injection and unauthorized intrusion.
              </li>
              <li>
                <strong>Physical Infrastructure Security:</strong> Customer design files and technical specifications are protected under Kolli Graphics&apos; 40,000 sq.ft. facility access controls with 24/7 CCTV surveillance and restricted entry protocols.
              </li>
              <li>
                <strong>Data Retention:</strong> We retain personal data only for as long as necessary to fulfill the inquiry or business engagement, or to comply with applicable statutory retention requirements. When no longer required, data is securely erased.
              </li>
            </ul>
          </section>

          {/* Section 5 */}
          <section>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#111827', marginBottom: '12px' }}>
              5. Third-Party Disclosures &amp; Service Providers
            </h2>
            <p>
              <strong>We do not sell, rent, or trade your personal data to any third party for marketing purposes.</strong>
            </p>
            <p>
              Personal data may only be processed by trusted technical partners operating under strict confidentiality obligations, such as:
            </p>
            <ul style={{ paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li>Cloud hosting and network infrastructure providers (e.g., Vercel / AWS / Google Cloud).</li>
              <li>Communication gateways (e.g., SMS and standard email transport protocols).</li>
              <li>Authorized law enforcement agencies solely when mandated by a valid statutory order under Indian law.</li>
            </ul>
          </section>

          {/* Section 6 */}
          <section>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#111827', marginBottom: '12px' }}>
              6. Your Rights Under the DPDP Act, 2023
            </h2>
            <p>As a Data Principal under the Digital Personal Data Protection Act, 2023, you hold the following statutory rights:</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '12px' }}>
              {[
                { title: 'Right to Access Information', desc: 'You may request a summary of the personal data we hold about you and the processing activities undertaken.' },
                { title: 'Right to Correction & Updating', desc: 'You have the right to request correction of inaccurate, misleading, or outdated personal data.' },
                { title: 'Right to Erasure / Deletion', desc: 'You may request the deletion of your personal data when it is no longer necessary for the purpose for which it was collected.' },
                { title: 'Right to Withdraw Consent', desc: 'You may withdraw your previously given consent at any time with ease by contacting us.' },
                { title: 'Right to Grievance Redressal', desc: 'You have the right to accessible grievance redressal provided by our Data Protection / Grievance Officer.' },
                { title: 'Right to Nominate', desc: 'You may nominate an individual to exercise your data rights in the event of death or incapacity.' },
              ].map((right, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                    padding: '12px 16px',
                    borderRadius: '10px',
                    backgroundColor: '#f8fafc',
                  }}
                >
                  <CheckCircle2 size={18} color="#dc2626" style={{ flexShrink: 0, marginTop: '3px' }} />
                  <div>
                    <strong style={{ color: '#111827', fontSize: '0.92rem' }}>{right.title}: </strong>
                    <span style={{ color: '#475569', fontSize: '0.9rem' }}>{right.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 7 */}
          <section>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#111827', marginBottom: '12px' }}>
              7. Cookie Policy &amp; Preferences
            </h2>
            <p>
              Our website uses minimal, strictly essential cookies and performance caching to ensure optimal rendering, secure form transmission, and user interface preferences. We do not use intrusive third-party cross-site behavioral tracking cookies. You may manage your cookie preferences through our on-site cookie banner or through your browser settings at any time.
            </p>
          </section>

          {/* Section 8: Grievance Redressal Mechanism */}
          <section
            style={{
              padding: '28px',
              borderRadius: '16px',
              backgroundColor: '#fff1f2',
              border: '1.5px solid #fecdd3',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <UserCheck size={24} color="#dc2626" />
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#9f1239', margin: 0 }}>
                8. Grievance Redressal &amp; Data Protection Officer
              </h2>
            </div>
            <p style={{ color: '#881337', fontSize: '0.92rem', marginBottom: '16px' }}>
              In accordance with Section 8 of the Digital Personal Data Protection Act, 2023, if you have any questions, wish to exercise any of your statutory rights, or wish to file a grievance regarding your personal data, please contact our designated Grievance Officer:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.9rem', color: '#111827' }}>
              <div>
                <strong>Designated Grievance Officer:</strong> Parasurami Reddy Kolli / Grievance Cell
              </div>
              <div>
                <strong>Entity:</strong> {COMPANY_INFO.name}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Mail size={15} color="#dc2626" />
                <span>
                  <strong>Email:</strong>{' '}
                  <a href={`mailto:${COMPANY_INFO.email}`} style={{ color: '#dc2626', fontWeight: 600 }}>
                    {COMPANY_INFO.email}
                  </a>
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Phone size={15} color="#dc2626" />
                <span>
                  <strong>Phone:</strong>{' '}
                  <a href="tel:+919849246688" style={{ color: '#dc2626', fontWeight: 600 }}>
                    +91 98492 46688
                  </a>
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <MapPin size={15} color="#dc2626" style={{ marginTop: '4px', flexShrink: 0 }} />
                <span>
                  <strong>Registered Address:</strong> {COMPANY_INFO.corporateOffice.address}, {COMPANY_INFO.corporateOffice.city} &ndash; {COMPANY_INFO.corporateOffice.pincode}, Telangana, India
                </span>
              </div>
            </div>
            <p style={{ color: '#881337', fontSize: '0.82rem', marginTop: '14px', marginBottom: 0 }}>
              We will acknowledge and respond to all verifiable data principal requests within the statutory timeline mandated by the DPDP Act and relevant rules.
            </p>
          </section>

          {/* Section 9 */}
          <section>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#111827', marginBottom: '12px' }}>
              9. Changes &amp; Updates to this Policy
            </h2>
            <p style={{ margin: 0 }}>
              We may update this Privacy Policy from time to time to reflect operational, legal, or regulatory updates. Any changes will be posted directly on this page with an updated Effective Date. Continued use of the website following notification of updates constitutes acknowledgment of the revised terms.
            </p>
          </section>
        </motion.div>
      </div>
    </div>
  )
}
