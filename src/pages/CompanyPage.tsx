import React, { useEffect } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { CompanySection } from '../components/sections/CompanySection'
import '../styles/company-redesign.css'

export const CompanyPage: React.FC = () => {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  useEffect(() => {
    document.title = 'Company & Team | Kolli Graphics Private Limited'
    window.scrollTo({ top: 0 })
  }, [])

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100vh' }}>
      {/* Top Scroll Progress Indicator */}
      <motion.div
        style={{
          scaleX,
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: 'linear-gradient(90deg, #00aeef 0%, #dc2626 50%, #f59e0b 100%)',
          transformOrigin: '0%',
          zIndex: 99999,
          boxShadow: '0 0 10px rgba(220,38,38,0.5)',
        }}
      />

      <CompanySection />
    </div>
  )
}
