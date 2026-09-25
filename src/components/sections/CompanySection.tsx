import React from 'react'
import { Building2, Users, Briefcase } from 'lucide-react'
import { motion } from 'framer-motion'
import { SectionHeader } from '@common/SectionHeader'

const P: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({
  children,
  style,
}) => (
  <p
    style={{
      fontSize: '0.9rem',
      color: '#4b5563',
      lineHeight: 1.78,
      margin: 0,
      ...style,
    }}
  >
    {children}
  </p>
)

export const CompanySection: React.FC = () => {
  return (
    <section id="company" style={{ padding: '88px 0', backgroundColor: '#ffffff' }}>
      <div className="container">
        {/* Section Header — document: "COMPANY", "Get To Know More About Who We Are" */}
        <SectionHeader
          badge="Company"
          badgeVariant="cyan"
          title="COMPANY"
          subtitle="Get To Know More About Who We Are"
        />

        {/* Sub-nav — exact from document line 2: About Us, Meet Our Team, Career Opportunities */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 10,
            marginBottom: 48,
            flexWrap: 'wrap',
          }}
        >
          {['About Us', 'Meet Our Team', 'Career Opportunities'].map((label) => (
            <a
              key={label}
              href={`#${label.toLowerCase().replace(/ /g, '-')}`}
              style={{
                padding: '7px 18px',
                borderRadius: 999,
                backgroundColor: '#f4f6f8',
                color: '#374151',
                fontSize: '0.8125rem',
                fontWeight: 600,
                textDecoration: 'none',
                border: '1px solid #e5e7eb',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#dc2626'
                e.currentTarget.style.color = '#fff'
                e.currentTarget.style.borderColor = '#dc2626'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#f4f6f8'
                e.currentTarget.style.color = '#374151'
                e.currentTarget.style.borderColor = '#e5e7eb'
              }}
            >
              {label}
            </a>
          ))}
        </div>

        {/* ── About Us ──────────────────────────────────────────────── */}
        <div id="about-us" style={{ marginBottom: 60 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            style={{
              padding: '36px 40px',
              borderRadius: 16,
              backgroundColor: '#f4f6f8',
              border: '1px solid #e5e7eb',
            }}
          >
            {/* sub-heading */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 8,
                  backgroundColor: 'rgba(220,38,38,0.1)',
                  color: '#dc2626',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Building2 size={18} />
              </div>
              <h3 style={{ color: '#111827', margin: 0 }}>About Us</h3>
            </div>

            {/* exact paragraphs from document lines 13–18 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <P>
                <strong style={{ color: '#111827' }}>Kolli Graphics Private Limited</strong>, is a
                very unique and distinctive printer located in Hyderabad. We offer offset
                lithography with a full array of packaging services and Labels of all kinds. Kolli
                Graphics is founded in <strong style={{ color: '#111827' }}>2009</strong> with a
                motive of{' '}
                <strong style={{ color: '#dc2626' }}>&ldquo;Quality &amp; Customer First&rdquo;</strong>.
              </P>

              <P>
                Over the past 15 years our company has expanded with newest machines in order to
                service our valued customers to the best of our ability with quality products all
                the time.
              </P>

              <P>
                We have Heidelberg offset printing machines with online coaters and Komori with
                double coater and full UV press for the printing. With respect lable printing we
                have Omet Flexo printer with foil stamping and Slitter, Rewinder and online
                inspection machine. In addition to the investment in these state-of-the-art
                printing technologies, the company has installed an impressive array of finishing
                equipment as well. This includes BOBST Die cutters, BOBST Foil Stamping machines,
                BOBST Domino, BOBST Media pasting machines and DGM pasting machine with online
                inspection system. Also we have numerous automated production lines like Handy
                packs at the end of pasting machines, ATS Banding machinery, Waste stripping
                machines, Automatic Box sealing machine etc., The company is continuing to invest
                in a wide-range of finishing equipment to meet the needs of our growing client
                base.
              </P>

              <P>
                Recognizing that quality begins with pre-press, Kolli Graphics is hiring the most
                experienced staff of pre-press professionals. As a service &amp; Qualitive motive
                company, these investments in pre-press and press mean colour-accurate, quality
                printing for our clients.
              </P>

              <P
                style={{
                  fontStyle: 'italic',
                  borderLeft: '3px solid #dc2626',
                  paddingLeft: 16,
                  color: '#374151',
                }}
              >
                &ldquo;As a customer of Kolli Graphics, you can be assured that you will be doing
                business with a company that has a culture of &lsquo;Service &amp; Quality
                First&rsquo;, openness, responsiveness, integrity and respect. These are the
                hallmarks of our company. We welcome an opportunity to show you what we can do for
                you, and we can assure you that it will be a decision you will never regret!&rdquo;
              </P>

              <P>
                Recently we moved into a{' '}
                <strong style={{ color: '#111827' }}>43,000 square foot facility</strong> which has
                allowed us to work more efficiently, give our employees a better work environment
                and given us room for expansion.
              </P>
            </div>
          </motion.div>
        </div>

        {/* ── Meet Our Team ──────────────────────────────────────── */}
        <div id="meet-our-team" style={{ marginBottom: 60 }}>
          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <h3 style={{ color: '#111827', marginBottom: 6 }}>MEET OUR TEAM</h3>
            <div
              style={{
                width: 36,
                height: 2,
                background: 'linear-gradient(to right,#dc2626,#dc2626)',
                borderRadius: 2,
                margin: '0 auto',
              }}
            />
          </div>

          {/* Executive Team */}
          <div style={{ marginBottom: 28 }}>
            <p
              style={{
                textAlign: 'center',
                fontSize: '0.72rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.09em',
                color: '#9ca3af',
                marginBottom: 20,
              }}
            >
              Executive Team
            </p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))',
                gap: 20,
                maxWidth: 640,
                margin: '0 auto',
              }}
            >
              {[
                { initials: 'RR', name: 'Ranga Reddy Kolli', role: 'CEO', color: '#dc2626', bg: 'rgba(0,174,239,0.09)' },
                { initials: 'PR', name: 'Parasurami Reddy Kolli', role: 'COO', color: '#dc2626', bg: 'rgba(220,38,38,0.08)' },
              ].map((m) => (
                <motion.div
                  key={m.name}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  style={{
                    padding: '28px 24px',
                    borderRadius: 14,
                    backgroundColor: '#ffffff',
                    border: '1px solid #e5e7eb',
                    textAlign: 'center',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
                  }}
                >
                  <div
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: '50%',
                      backgroundColor: m.bg,
                      color: m.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.25rem',
                      fontWeight: 700,
                      margin: '0 auto 14px',
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    {m.initials}
                  </div>
                  <h4 style={{ color: '#111827', marginBottom: 6, fontSize: '1rem' }}>{m.name}</h4>
                  <span
                    style={{
                      display: 'inline-block',
                      padding: '3px 12px',
                      borderRadius: 999,
                      backgroundColor: m.bg,
                      color: m.color,
                      fontSize: '0.75rem',
                      fontWeight: 700,
                    }}
                  >
                    {m.role}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Manufacturing Team */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{
              padding: '24px 28px',
              borderRadius: 14,
              backgroundColor: '#f4f6f8',
              border: '1px solid #e5e7eb',
              textAlign: 'center',
              maxWidth: 640,
              margin: '0 auto',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                marginBottom: 8,
                color: '#dc2626',
              }}
            >
              <Users size={18} />
              <h4 style={{ color: '#111827', margin: 0 }}>Manufacturing Team</h4>
            </div>
            <P>
              Our dedicated manufacturing team operates our Heidelberg, Komori, OMET, and BOBST
              automated production lines, delivering precision craftsmanship and zero-defect
              quality across every production shift.
            </P>
          </motion.div>
        </div>

        {/* ── Career Opportunities ───────────────────────────────── */}
        <motion.div
          id="career-opportunities"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{
            padding: '28px 32px',
            borderRadius: 14,
            background: 'linear-gradient(135deg, rgba(0,174,239,0.05) 0%, rgba(220,38,38,0.04) 100%)',
            border: '1px solid #e5e7eb',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 20,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                backgroundColor: '#ffffff',
                border: '1px solid #e5e7eb',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#dc2626',
                flexShrink: 0,
              }}
            >
              <Briefcase size={20} />
            </div>
            <div>
              <h4 style={{ color: '#111827', marginBottom: 3 }}>Career Opportunities</h4>
              <P>
                Recognizing that quality begins with pre-press, Kolli Graphics is continuously
                hiring experienced professionals.
              </P>
            </div>
          </div>

          <a
            href="mailto:rangarkolli@gmail.com?subject=Career%20Inquiry%20-%20Kolli%20Graphics"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 7,
              padding: '10px 22px',
              borderRadius: 999,
              backgroundColor: '#111827',
              color: '#ffffff',
              fontSize: '0.8125rem',
              fontWeight: 600,
              textDecoration: 'none',
              whiteSpace: 'nowrap',
            }}
          >
            Inquire About Careers
          </a>
        </motion.div>
      </div>
    </section>
  )
}

