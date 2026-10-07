import React, { useState, useEffect } from 'react'
import {
  Building2,
  Users,
  Briefcase,
  Award,
  Sparkles,
  Maximize2,
  X,
  ChevronRight,
  CheckCircle2,
  Phone,
  Mail,
  ArrowRight,
  Zap,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { SectionHeader } from '../common/SectionHeader'
import { COMPANY_INFO, EXECUTIVE_TEAM, MANUFACTURING_ROLES, TeamMember } from '../../data/company'

// Import existing project images provided by user
import imgPlantMain from '../../assets/images/image.png'
import imgPressDetail from '../../assets/images/image copy.png'
import imgKomoriLine from '../../assets/images/image copy 3.png'
import imgBobstCut from '../../assets/images/image copy 4.png'
import imgOmetLabels from '../../assets/images/image copy 5.png'
import imgBobstGluer from '../../assets/images/image copy 7.png'

const ABOUT_IMAGES = [
  {
    src: imgPlantMain,
    title: '40,000 Sq. Ft. Facility Floor',
    subtitle: 'Integrated Offset & Flexo Production Facility in Hyderabad',
    tag: 'Main Works',
  },
  {
    src: imgPressDetail,
    title: 'Omet Flexo printer',
    subtitle: 'Narrow-web flexographic printing press',
    tag: 'Flexo Printer',
  },
  {
    src: imgKomoriLine,
    title: 'Heidelberg Offset press',
    subtitle: 'High-precision offset printing press unit',
    tag: 'Offset Press',
  },
  {
    src: imgOmetLabels,
    title: 'DGM folder Gluer with 100% online inspection',
    subtitle: 'Automated folding & gluing with 100% vision QC',
    tag: 'Folder Gluer',
  },
  {
    src: imgBobstCut,
    title: 'BOBST Automatic Die-Cutting',
    subtitle: 'Precision foil stamping and blanking line for folding cartons',
    tag: 'Finishing Equipment',
  },
  {
    src: imgBobstGluer,
    title: 'Automated Box Pasting Lines',
    subtitle: 'BOBST Domino & DGM pasting with online inspection systems',
    tag: 'Automated Lines',
  },
]

const P: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({
  children,
  style,
}) => (
  <p
    style={{
      fontSize: '0.975rem',
      color: '#4b5563',
      lineHeight: 1.8,
      margin: 0,
      ...style,
    }}
  >
    {children}
  </p>
)

export const CompanySection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('about-us')
  const [selectedImage, setSelectedImage] = useState<(typeof ABOUT_IMAGES)[0] | null>(null)
  const [selectedExecutive, setSelectedExecutive] = useState<TeamMember | null>(null)
  const [selectedRole, setSelectedRole] = useState<(typeof MANUFACTURING_ROLES)[0] | null>(null)
  const [showHallmarksModal, setShowHallmarksModal] = useState<boolean>(false)

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about-us', 'leadership-team', 'career-opportunities']
      const scrollPos = window.scrollY + 200

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId)
        if (el) {
          const top = el.offsetTop
          const height = el.offsetHeight
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveTab(sectionId)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    setActiveTab(id)
    const el = document.getElementById(id)
    if (el) {
      const offset = 100
      const bodyRect = document.body.getBoundingClientRect().top
      const elementRect = el.getBoundingClientRect().top
      const elementPosition = elementRect - bodyRect
      const offsetPosition = elementPosition - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
    }
  }

  return (
    <section
      id="company"
      style={{
        padding: '90px 0 60px 0',
        backgroundColor: '#fafafa',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Decorative Ambient Blur Elements */}
      <div
        className="company-glow-accent"
        style={{
          width: 500,
          height: 500,
          background: 'rgba(220, 38, 38, 0.08)',
          top: '5%',
          left: '-10%',
        }}
      />
      <div
        className="company-glow-accent"
        style={{
          width: 450,
          height: 450,
          background: 'rgba(0, 174, 239, 0.08)',
          top: '45%',
          right: '-10%',
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Section Header */}
        <SectionHeader
          badge="Company Overview"
          badgeVariant="cyan"
          title="Get To Know More About"
          titleHighlight="Who We Are"
          subtitle="Kolli Graphics Private Limited commands 15+ years of packaging excellence in Hyderabad."
        />

        {/* Dynamic Sticky Navigation Bar */}
        <div
          style={{
            position: 'sticky',
            top: 80,
            zIndex: 30,
            display: 'flex',
            justifyContent: 'center',
            marginBottom: 48,
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              padding: '6px',
              gap: 8,
              borderRadius: 999,
              backgroundColor: 'rgba(255, 255, 255, 0.92)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(229, 231, 235, 0.9)',
              boxShadow: '0 10px 30px -10px rgba(0,0,0,0.08)',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            {[
              { id: 'about-us', label: 'About Us', icon: Building2 },
              { id: 'leadership-team', label: 'Leadership Team', icon: Users },
              { id: 'career-opportunities', label: 'Career Opportunities', icon: Briefcase },
            ].map(({ id, label, icon: Icon }) => {
              const isActive = activeTab === id
              return (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className={`company-subnav-pill ${isActive ? 'active' : ''}`}
                >
                  <Icon size={15} color={isActive ? '#ffffff' : '#dc2626'} />
                  <span>{label}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* ── ABOUT US SECTION: Interwoven Visual Storytelling ──────────────── */}
        <div id="about-us" style={{ marginBottom: 90, scrollMarginTop: 130 }}>
          {/* Section Header Badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 16,
              marginBottom: 36,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 14,
                  backgroundColor: 'rgba(220, 38, 38, 0.1)',
                  color: '#dc2626',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 14px rgba(220,38,38,0.15)',
                }}
              >
                <Building2 size={24} />
              </div>
              <div>
                <h3 style={{ color: '#111827', fontSize: '1.8rem', margin: 0 }}>About Us</h3>
                <span style={{ fontSize: '0.85rem', color: '#6b7280' }}>
                  15+ Years of Service &amp; Packaging Excellence
                </span>
              </div>
            </div>

            {/* Quick Stat Highlights Bar */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 20,
                backgroundColor: '#ffffff',
                padding: '10px 22px',
                borderRadius: 999,
                border: '1px solid #e5e7eb',
                boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
              }}
            >
              <div>
                <div style={{ fontSize: '0.68rem', color: '#6b7280', fontWeight: 700 }}>
                  FOUNDED
                </div>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#dc2626' }}>2009</div>
              </div>
              <div style={{ width: 1, height: 26, backgroundColor: '#e5e7eb' }} />
              <div>
                <div style={{ fontSize: '0.68rem', color: '#6b7280', fontWeight: 700 }}>
                  FACILITY SIZE
                </div>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#00aeef' }}>
                  40,000 Sq.Ft
                </div>
              </div>
              <div style={{ width: 1, height: 26, backgroundColor: '#e5e7eb' }} />
              <div>
                <div style={{ fontSize: '0.68rem', color: '#6b7280', fontWeight: 700 }}>MOTTO</div>
                <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#111827' }}>
                  Customer Service &amp; Quality First
                </div>
              </div>
            </div>
          </div>

          {/* ── ABOUT BLOCK 1: Introduction & Founding (Split Layout: Text + Plant Main Image) ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
              gap: 32,
              alignItems: 'center',
              marginBottom: 40,
            }}
          >
            {/* Left: Text Content */}
            <div
              className="company-interactive-card"
              style={{
                padding: '36px',
                backgroundColor: '#ffffff',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '4px 12px',
                  borderRadius: 999,
                  backgroundColor: 'rgba(220,38,38,0.08)',
                  color: '#dc2626',
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  marginBottom: 16,
                  width: 'fit-content',
                }}
              >
                <Award size={14} /> Founding Vision &amp; Identity
              </div>

              <P style={{ marginBottom: 16 }}>
                <strong style={{ color: '#111827', fontWeight: 700 }}>
                  Kolli Graphics Private Limited
                </strong>
                , is a very unique and distinctive printer located in Hyderabad. We offer offset
                lithography with a full array of packaging services and Labels of all kinds. Kolli
                Graphics is founded in{' '}
                <strong style={{ color: '#111827', fontWeight: 700 }}>2009</strong> with a motive of{' '}
                <strong style={{ color: '#dc2626', fontWeight: 700 }}>
                  &ldquo;Customer Service &amp; Quality First&rdquo;
                </strong>
                .
              </P>

              <P>
                Over the past 15 years our company has expanded with newest machines in order to
                service our valued customers to the best of our ability with quality products all the
                time.
              </P>
            </div>

            {/* Right: Featured Interactive Image Card 1 */}
            <motion.div
              whileHover={{ y: -6, scale: 1.01 }}
              onClick={() => setSelectedImage(ABOUT_IMAGES[0])}
              className="company-img-zoom-container"
              style={{
                borderRadius: 20,
                height: 340,
                backgroundColor: '#1e293b',
                boxShadow: '0 12px 30px rgba(0,0,0,0.08)',
                border: '1px solid #e5e7eb',
              }}
            >
              <img
                src={imgPlantMain}
                alt="Kolli Graphics Facility"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div className="company-img-zoom-overlay">
                <div>
                  <span
                    style={{
                      padding: '3px 10px',
                      borderRadius: 999,
                      backgroundColor: '#dc2626',
                      fontSize: '0.68rem',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      display: 'inline-block',
                      marginBottom: 6,
                    }}
                  >
                    Main Plant Facility
                  </span>
                  <h4
                    style={{
                      fontSize: '1.1rem',
                      fontWeight: 700,
                      margin: 0,
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <span>40,000 Sq. Ft. Manufacturing Plant</span>
                    <Maximize2 size={16} style={{ marginLeft: 12 }} />
                  </h4>
                  <p style={{ fontSize: '0.8rem', color: '#cbd5e1', margin: '4px 0 0 0' }}>
                    Click to inspect high-resolution facility photo
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* ── ABOUT BLOCK 2: Machinery Fleet & Infrastructure (Full-Width Interactive Feature) ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ marginBottom: 40 }}
          >
            <div
              className="company-interactive-card"
              style={{
                padding: '36px',
                backgroundColor: '#ffffff',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  marginBottom: 16,
                  color: '#dc2626',
                }}
              >
                <Sparkles size={20} />
                <h4 style={{ color: '#111827', fontSize: '1.4rem', margin: 0 }}>
                  State-of-the-Art Printing &amp; Finishing Infrastructure
                </h4>
              </div>

              {/* Machinery Text Paragraph */}
              <P style={{ marginBottom: 28 }}>
                We have Heidelberg offset printing machines with online coaters and Komori with
                double coater and full UV press for the printing. With respect lable printing we have
                Omet Flexo printer with foil stamping and Slitter, Rewinder and online inspection
                machine. In addition to the investment in these state-of-the-art printing
                technologies, the company has installed an impressive array of finishing equipment
                as well. This includes BOBST Die cutters, BOBST Foil Stamping machines, BOBST Domino,
                BOBST Media pasting machines and DGM pasting machine with online inspection system.
                Also we have numerous automated production lines like Handy packs at the end of
                pasting machines, ATS Banding machinery, Waste stripping machines, Automatic Box
                sealing machine etc., The company is continuing to invest in a wide-range of
                finishing equipment to meet the needs of our growing client base.
              </P>

              {/* Machinery Photo Strip Grid (Interactive Lightbox Triggers) */}
              <div>
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    color: '#6b7280',
                    display: 'block',
                    marginBottom: 14,
                  }}
                >
                  Machinery Fleet Photo Gallery (Click any image to view details)
                </span>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: 16,
                  }}
                >
                  {[
                    {
                      src: imgPressDetail,
                      title: 'Omet Flexo printer',
                      tag: 'Flexo Printer',
                      subtitle: 'Narrow-web flexographic printing press',
                    },
                    {
                      src: imgKomoriLine,
                      title: 'Heidelberg Offset press',
                      tag: 'Offset Press',
                      subtitle: 'High-precision offset printing press unit',
                    },
                    {
                      src: imgOmetLabels,
                      title: 'DGM folder Gluer with 100% online inspection',
                      tag: 'Folder Gluer',
                      subtitle: 'Automated folding & gluing with 100% vision QC',
                    },
                    {
                      src: imgBobstCut,
                      title: 'BOBST Die Cutters',
                      tag: 'Finishing',
                      subtitle: 'Foil stamping & automatic stripping',
                    },
                  ].map((mach) => (
                    <motion.div
                      key={mach.title}
                      whileHover={{ y: -4, scale: 1.02 }}
                      onClick={() => setSelectedImage(mach)}
                      className="company-img-zoom-container"
                      style={{
                        borderRadius: 14,
                        height: 160,
                        backgroundColor: '#1e293b',
                        boxShadow: '0 4px 14px rgba(0,0,0,0.05)',
                        border: '1px solid #e5e7eb',
                      }}
                    >
                      <img
                        src={mach.src}
                        alt={mach.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      <div className="company-img-zoom-overlay">
                        <div>
                          <span
                            style={{
                              padding: '2px 6px',
                              borderRadius: 999,
                              backgroundColor: '#00aeef',
                              fontSize: '0.625rem',
                              fontWeight: 800,
                              textTransform: 'uppercase',
                              display: 'inline-block',
                              marginBottom: 2,
                            }}
                          >
                            {mach.tag}
                          </span>
                          <h5
                            style={{
                              fontSize: '0.85rem',
                              fontWeight: 700,
                              margin: 0,
                              color: '#ffffff',
                            }}
                          >
                            {mach.title}
                          </h5>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── ABOUT BLOCK 3: Pre-Press Excellence & Hallmark Quote Section ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
              gap: 32,
              alignItems: 'center',
              marginBottom: 40,
            }}
          >
            {/* Left: Pre-Press Quality Feature Box */}
            <div
              className="company-interactive-card"
              style={{
                padding: '32px',
                backgroundColor: '#ffffff',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '4px 12px',
                  borderRadius: 999,
                  backgroundColor: 'rgba(0,174,239,0.08)',
                  color: '#00aeef',
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  marginBottom: 14,
                  width: 'fit-content',
                }}
              >
                <Zap size={14} /> Pre-Press &amp; Color Accuracy
              </div>

              <P style={{ fontSize: '1rem', color: '#1f2937', fontWeight: 500 }}>
                Recognizing that quality begins with pre-press, Kolli Graphics is hiring the most
                experienced staff of pre-press professionals. As a service &amp; Qualitive motive
                company, these investments in pre-press and press mean colour-accurate, quality
                printing for our clients.
              </P>
            </div>

            {/* Right: Hallmarks Quote Card (Clickable to view Hallmarks Modal) */}
            <motion.div
              whileHover={{ scale: 1.02, x: 4 }}
              onClick={() => setShowHallmarksModal(true)}
              style={{
                cursor: 'pointer',
                padding: '32px',
                borderRadius: 20,
                backgroundColor: '#111827',
                color: '#ffffff',
                boxShadow: '0 15px 35px rgba(0,0,0,0.15)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: -20,
                  right: -20,
                  width: 120,
                  height: 120,
                  borderRadius: '50%',
                  backgroundColor: 'rgba(220,38,38,0.15)',
                  filter: 'blur(30px)',
                  pointerEvents: 'none',
                }}
              />

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 12,
                }}
              >
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    color: '#facc15',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                  }}
                >
                  Our Founding Culture &amp; Promise
                </span>
                <ChevronRight size={18} color="#facc15" />
              </div>

              <p
                style={{
                  fontStyle: 'italic',
                  color: '#f3f4f6',
                  fontSize: '0.95rem',
                  lineHeight: 1.75,
                  margin: 0,
                  fontWeight: 400,
                }}
              >
                &ldquo;As a customer of Kolli Graphics, you can be assured that you will be doing
                business with a company that has a culture of &lsquo;Service &amp; Quality
                First&rsquo;, openness, responsiveness, integrity and respect. These are the
                hallmarks of our company. We welcome an opportunity to show you what we can do for
                you, and we can assure you that it will be a decision you will never regret!&rdquo;
              </p>

              <div
                style={{
                  marginTop: 16,
                  fontSize: '0.75rem',
                  color: '#9ca3af',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                <Award size={14} color="#dc2626" /> Click to view hallmark values breakdown
              </div>
            </motion.div>
          </motion.div>

          {/* ── ABOUT BLOCK 4: 40,000 Sq. Ft. Facility Feature (Split Layout: Text + Image) ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
              gap: 32,
              alignItems: 'center',
            }}
          >
            {/* Left: Interactive Image Card 2 */}
            <motion.div
              whileHover={{ y: -6, scale: 1.01 }}
              onClick={() => setSelectedImage(ABOUT_IMAGES[5])}
              className="company-img-zoom-container"
              style={{
                borderRadius: 20,
                height: 280,
                backgroundColor: '#1e293b',
                boxShadow: '0 12px 30px rgba(0,0,0,0.08)',
                border: '1px solid #e5e7eb',
              }}
            >
              <img
                src={imgBobstGluer}
                alt="Automated Production Lines"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div className="company-img-zoom-overlay">
                <div>
                  <span
                    style={{
                      padding: '3px 10px',
                      borderRadius: 999,
                      backgroundColor: '#00aeef',
                      fontSize: '0.68rem',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      display: 'inline-block',
                      marginBottom: 6,
                    }}
                  >
                    Automated Lines &amp; Storage
                  </span>
                  <h4
                    style={{
                      fontSize: '1.1rem',
                      fontWeight: 700,
                      margin: 0,
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <span>High-Efficiency Automated Machinery</span>
                    <Maximize2 size={16} style={{ marginLeft: 12 }} />
                  </h4>
                </div>
              </div>
            </motion.div>

            {/* Right: Facility Text Block */}
            <div
              className="company-interactive-card"
              style={{
                padding: '36px',
                backgroundColor: '#ffffff',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '4px 12px',
                  borderRadius: 999,
                  backgroundColor: 'rgba(220,38,38,0.08)',
                  color: '#dc2626',
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  marginBottom: 14,
                  width: 'fit-content',
                }}
              >
                <Building2 size={14} /> Facility Expansion
              </div>

              <P style={{ fontSize: '1.05rem', color: '#111827', fontWeight: 600 }}>
                Recently we moved into a{' '}
                <strong style={{ color: '#dc2626', fontWeight: 700 }}>
                  40,000 square foot facility
                </strong>{' '}
                which has allowed us to work more efficiently, give our employees a better work
                environment and given us room for expansion.
              </P>
            </div>
          </motion.div>
        </div>

        {/* ── Leadership Team Section ────────────────────────────────────────── */}
        <div id="leadership-team" style={{ marginBottom: 80, scrollMarginTop: 130 }}>
          <div style={{ textAlign: 'center', marginBottom: 36 }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '6px 16px',
                borderRadius: 999,
                backgroundColor: 'rgba(220,38,38,0.08)',
                color: '#dc2626',
                fontSize: '0.75rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom: 10,
              }}
            >
              <Users size={14} /> Leadership &amp; Workforce
            </div>
            <h3 style={{ fontSize: '2rem', color: '#111827', marginBottom: 8 }}>LEADERSHIP TEAM</h3>
            <div
              style={{
                width: 48,
                height: 3,
                background: 'linear-gradient(to right, #dc2626, #00aeef)',
                borderRadius: 2,
                margin: '0 auto',
              }}
            />
          </div>

          {/* Executive Leadership Grid */}
          <div style={{ marginBottom: 48 }}>
            <p
              style={{
                textAlign: 'center',
                fontSize: '0.75rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: '#6b7280',
                marginBottom: 24,
              }}
            >
              Executive Team (Click card to view full profile &amp; focus)
            </p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
                gap: 24,
                maxWidth: 720,
                margin: '0 auto',
              }}
            >
              {EXECUTIVE_TEAM.map((exec) => (
                <motion.div
                  key={exec.name}
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => setSelectedExecutive(exec)}
                  className="company-interactive-card"
                  style={{
                    padding: '32px 24px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    background: 'linear-gradient(180deg, #ffffff 0%, #fdfdfd 100%)',
                  }}
                >
                  {/* Initials Avatar Icon */}
                  <div
                    style={{
                      width: 76,
                      height: 76,
                      borderRadius: '50%',
                      backgroundColor:
                        exec.name.includes('Ranga') ? 'rgba(0,174,239,0.1)' : 'rgba(220,38,38,0.1)',
                      color: exec.name.includes('Ranga') ? '#00aeef' : '#dc2626',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.5rem',
                      fontWeight: 800,
                      margin: '0 auto 16px',
                      boxShadow: '0 8px 20px rgba(0,0,0,0.06)',
                      border: '2px solid #ffffff',
                    }}
                  >
                    {exec.name
                      .split(' ')
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join('')}
                  </div>

                  <h4 style={{ color: '#111827', fontSize: '1.15rem', marginBottom: 6 }}>
                    {exec.name}
                  </h4>

                  <span
                    style={{
                      display: 'inline-block',
                      padding: '4px 14px',
                      borderRadius: 999,
                      backgroundColor: exec.name.includes('Ranga') ? '#e0f2fe' : '#fee2e2',
                      color: exec.name.includes('Ranga') ? '#0284c7' : '#dc2626',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      marginBottom: 14,
                    }}
                  >
                    {exec.role}
                  </span>

                  <p
                    style={{
                      fontSize: '0.85rem',
                      color: '#6b7280',
                      lineHeight: 1.6,
                      marginBottom: 16,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {exec.bio}
                  </p>

                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      color: '#dc2626',
                    }}
                  >
                    <span>View Profile &amp; Focus</span>
                    <ArrowRight size={14} />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Manufacturing Team & Specialist Roles Grid */}
          <div>
            <p
              style={{
                textAlign: 'center',
                fontSize: '0.75rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: '#6b7280',
                marginBottom: 24,
              }}
            >
              Manufacturing Team Divisions (Click role for operational specs)
            </p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))',
                gap: 20,
              }}
            >
              {MANUFACTURING_ROLES.map((role) => (
                <motion.div
                  key={role.title}
                  whileHover={{ y: -6, scale: 1.01 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => setSelectedRole(role)}
                  className="company-interactive-card"
                  style={{
                    padding: '24px',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <span
                      style={{
                        display: 'inline-block',
                        padding: '3px 10px',
                        borderRadius: 999,
                        backgroundColor: '#f3f4f6',
                        color: '#4b5563',
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        marginBottom: 12,
                      }}
                    >
                      {role.badge}
                    </span>
                    <h4 style={{ fontSize: '1.05rem', color: '#111827', marginBottom: 8 }}>
                      {role.title}
                    </h4>
                    <P style={{ fontSize: '0.875rem' }}>{role.description}</P>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      marginTop: 16,
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      color: '#00aeef',
                    }}
                  >
                    <span>Explore Operations</span>
                    <ChevronRight size={14} />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Career Opportunities Section ─────────────────────────────────── */}
        <div id="career-opportunities" style={{ scrollMarginTop: 130 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="company-interactive-card"
            style={{
              padding: '36px 40px',
              background:
                'linear-gradient(135deg, rgba(0,174,239,0.06) 0%, rgba(220,38,38,0.06) 100%)',
              border: '1px solid #e5e7eb',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 24,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 18, maxWidth: 600 }}>
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 14,
                  backgroundColor: '#ffffff',
                  border: '1px solid #e5e7eb',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#dc2626',
                  flexShrink: 0,
                  boxShadow: '0 4px 14px rgba(0,0,0,0.05)',
                }}
              >
                <Briefcase size={24} />
              </div>
              <div>
                <h4 style={{ color: '#111827', fontSize: '1.35rem', marginBottom: 6 }}>
                  Career Opportunities
                </h4>
                <P>
                  Recognizing that quality begins with pre-press, Kolli Graphics is continuously
                  hiring experienced professionals. Join our team of printing &amp; packaging masters!
                </P>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
              <a
                href={`https://wa.me/${COMPANY_INFO.phoneRaw}?text=Hello%20Kolli%20Graphics%20Team,%20I%20am%20interested%20in%20Career%20Opportunities.`}
                target="_blank"
                rel="noopener noreferrer"
                className="company-shimmer-btn"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '12px 24px',
                  borderRadius: 999,
                  backgroundColor: '#dc2626',
                  color: '#ffffff',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  textDecoration: 'none',
                  whiteSpace: 'nowrap',
                  boxShadow: '0 6px 20px rgba(220,38,38,0.3)',
                  transition: 'all 0.25s ease',
                }}
              >
                <Phone size={16} />
                <span>Inquire via WhatsApp</span>
              </a>

              <a
                href={`mailto:${COMPANY_INFO.email}?subject=Career%20Application%20-%20Kolli%20Graphics`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '12px 24px',
                  borderRadius: 999,
                  backgroundColor: '#ffffff',
                  color: '#111827',
                  border: '1px solid #e5e7eb',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  textDecoration: 'none',
                  whiteSpace: 'nowrap',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                  transition: 'all 0.25s ease',
                }}
              >
                <Mail size={16} />
                <span>Email Resume</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── MODAL 1: Image Lightbox Preview ───────────────────────────────── */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="company-modal-backdrop"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="company-modal-content"
              style={{ overflow: 'hidden', padding: 0 }}
            >
              <div style={{ position: 'relative', height: 380, backgroundColor: '#0f172a' }}>
                <img
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <button
                  onClick={() => setSelectedImage(null)}
                  style={{
                    position: 'absolute',
                    top: 16,
                    right: 16,
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    backgroundColor: 'rgba(0,0,0,0.6)',
                    color: '#ffffff',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <X size={18} />
                </button>
              </div>
              <div style={{ padding: '24px 28px' }}>
                <span
                  style={{
                    padding: '3px 10px',
                    borderRadius: 999,
                    backgroundColor: 'rgba(220,38,38,0.1)',
                    color: '#dc2626',
                    fontSize: '0.7rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                  }}
                >
                  {selectedImage.tag}
                </span>
                <h3 style={{ fontSize: '1.4rem', color: '#111827', marginTop: 8, marginBottom: 6 }}>
                  {selectedImage.title}
                </h3>
                <P>{selectedImage.subtitle}</P>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── MODAL 2: Executive Bio Detail Popup ──────────────────────────── */}
      <AnimatePresence>
        {selectedExecutive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedExecutive(null)}
            className="company-modal-backdrop"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="company-modal-content"
              style={{ padding: '32px' }}
            >
              <button
                onClick={() => setSelectedExecutive(null)}
                style={{
                  position: 'absolute',
                  top: 20,
                  right: 20,
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  backgroundColor: '#f3f4f6',
                  color: '#4b5563',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                <X size={18} />
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 20 }}>
                <div
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: '50%',
                    backgroundColor: selectedExecutive.name.includes('Ranga')
                      ? 'rgba(0,174,239,0.12)'
                      : 'rgba(220,38,38,0.12)',
                    color: selectedExecutive.name.includes('Ranga') ? '#00aeef' : '#dc2626',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.4rem',
                    fontWeight: 800,
                  }}
                >
                  {selectedExecutive.name
                    .split(' ')
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join('')}
                </div>
                <div>
                  <h3 style={{ fontSize: '1.4rem', color: '#111827', margin: 0 }}>
                    {selectedExecutive.name}
                  </h3>
                  <span
                    style={{
                      display: 'inline-block',
                      padding: '3px 12px',
                      borderRadius: 999,
                      backgroundColor: selectedExecutive.name.includes('Ranga')
                        ? '#e0f2fe'
                        : '#fee2e2',
                      color: selectedExecutive.name.includes('Ranga') ? '#0284c7' : '#dc2626',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      marginTop: 4,
                    }}
                  >
                    {selectedExecutive.role}
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <h5 style={{ fontSize: '0.8rem', color: '#9ca3af', textTransform: 'uppercase' }}>
                    KEY FOCUS &amp; LEADERSHIP
                  </h5>
                  <p style={{ fontSize: '1.05rem', fontWeight: 700, color: '#111827', margin: 0 }}>
                    {selectedExecutive.focus}
                  </p>
                </div>

                <div>
                  <h5 style={{ fontSize: '0.8rem', color: '#9ca3af', textTransform: 'uppercase' }}>
                    BACKGROUND &amp; VISION
                  </h5>
                  <P>{selectedExecutive.bio}</P>
                </div>

                <div
                  style={{
                    padding: '20px',
                    borderRadius: 16,
                    backgroundColor: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 12,
                  }}
                >
                  <span style={{ fontSize: '0.85rem', color: '#1e293b', fontWeight: 700 }}>
                    Directly Reach Executive Office:
                  </span>
                  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                    <a
                      href={`https://wa.me/${COMPANY_INFO.phoneRaw}?text=Hello%20${encodeURIComponent(
                        selectedExecutive.name,
                      )},%20I%20am%20interested%20in%20connecting%20with%20you.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        flex: 1,
                        minWidth: 160,
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 8,
                        padding: '10px 18px',
                        borderRadius: 999,
                        backgroundColor: '#dc2626',
                        color: '#ffffff',
                        fontSize: '0.825rem',
                        fontWeight: 700,
                        textDecoration: 'none',
                        boxShadow: '0 4px 12px rgba(220,38,38,0.2)',
                      }}
                    >
                      <Phone size={15} />
                      <span>WhatsApp Direct</span>
                    </a>

                    <a
                      href={`mailto:${COMPANY_INFO.email}?subject=Executive%20Inquiry%20-%20${encodeURIComponent(
                        selectedExecutive.name,
                      )}`}
                      style={{
                        flex: 1,
                        minWidth: 160,
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 8,
                        padding: '10px 18px',
                        borderRadius: 999,
                        backgroundColor: '#ffffff',
                        color: '#111827',
                        border: '1px solid #cbd5e1',
                        fontSize: '0.825rem',
                        fontWeight: 700,
                        textDecoration: 'none',
                      }}
                    >
                      <Mail size={15} />
                      <span>Email Message</span>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── MODAL 3: Manufacturing Role Spec Popup ────────────────────────── */}
      <AnimatePresence>
        {selectedRole && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedRole(null)}
            className="company-modal-backdrop"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="company-modal-content"
              style={{ padding: '32px' }}
            >
              <button
                onClick={() => setSelectedRole(null)}
                style={{
                  position: 'absolute',
                  top: 20,
                  right: 20,
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  backgroundColor: '#f3f4f6',
                  color: '#4b5563',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                <X size={18} />
              </button>

              <span
                style={{
                  padding: '3px 12px',
                  borderRadius: 999,
                  backgroundColor: '#f0fdf4',
                  color: '#16a34a',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                }}
              >
                {selectedRole.badge}
              </span>

              <h3 style={{ fontSize: '1.5rem', color: '#111827', marginTop: 10, marginBottom: 12 }}>
                {selectedRole.title}
              </h3>

              <P>{selectedRole.description}</P>

              <div
                style={{
                  marginTop: 24,
                  padding: '16px 20px',
                  borderRadius: 14,
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                }}
              >
                <h5 style={{ fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase' }}>
                  Operational Capability
                </h5>
                <ul
                  style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: '8px 0 0 0',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 8,
                  }}
                >
                  {[
                    'Operates round-the-clock 24/7 manufacturing shifts',
                    'Zero defect tolerance with automated in-line quality controls',
                    'Strict compliance with ISO & pharmaceutical security standards',
                  ].map((spec) => (
                    <li
                      key={spec}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        fontSize: '0.85rem',
                        color: '#1e293b',
                        fontWeight: 600,
                      }}
                    >
                      <CheckCircle2 size={16} color="#dc2626" />
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── MODAL 4: Hallmarks & Culture Modal ────────────────────────────── */}
      <AnimatePresence>
        {showHallmarksModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowHallmarksModal(false)}
            className="company-modal-backdrop"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="company-modal-content"
              style={{ padding: '32px' }}
            >
              <button
                onClick={() => setShowHallmarksModal(false)}
                style={{
                  position: 'absolute',
                  top: 20,
                  right: 20,
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  backgroundColor: '#f3f4f6',
                  color: '#4b5563',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                <X size={18} />
              </button>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  color: '#dc2626',
                  marginBottom: 12,
                }}
              >
                <Award size={24} />
                <h3 style={{ fontSize: '1.4rem', color: '#111827', margin: 0 }}>
                  Hallmarks &amp; Culture of Kolli Graphics
                </h3>
              </div>

              <P style={{ marginBottom: 20 }}>
                &ldquo;{COMPANY_INFO.culture}&rdquo; Our core pillars guide every single order from
                initial pre-press proof to final delivery:
              </P>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: 14 }}>
                {[
                  {
                    title: 'Service & Quality First',
                    desc: 'Uncompromising commitment to zero defect craftsmanship on time.',
                  },
                  {
                    title: 'Openness & Responsiveness',
                    desc: 'Direct communication with dedicated production management.',
                  },
                  {
                    title: 'Integrity',
                    desc: 'Transparent pricing, precise specs, and trustworthy partnerships.',
                  },
                  {
                    title: 'Respect',
                    desc: 'Dignity and care for our valued clients, employees, and suppliers.',
                  },
                ].map((val) => (
                  <div
                    key={val.title}
                    style={{
                      padding: '16px',
                      borderRadius: 12,
                      backgroundColor: '#fdf2f2',
                      border: '1px solid #fee2e2',
                    }}
                  >
                    <h5 style={{ fontSize: '0.95rem', color: '#dc2626', marginBottom: 4 }}>
                      {val.title}
                    </h5>
                    <p style={{ fontSize: '0.8rem', color: '#4b5563', margin: 0 }}>{val.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
