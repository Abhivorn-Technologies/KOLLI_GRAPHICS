import React, { useEffect } from 'react'
import { CapabilitiesSection } from '../components/sections/CapabilitiesSection'
import { FoldingCartonSection } from '../components/sections/FoldingCartonSection'
import { PrintingSection } from '../components/sections/PrintingSection'
import { FinishingSection } from '../components/sections/FinishingSection'
import '../styles/company-redesign.css'

const SectionDivider = () => (
  <div
    style={{
      height: '3px',
      background:
        'linear-gradient(to right, transparent 0%, rgba(0,174,239,0.2) 30%, rgba(220,38,38,0.2) 70%, transparent 100%)',
    }}
  />
)

export const CapabilitiesPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Capabilities & Technical Finishing | Kolli Graphics'
    window.scrollTo({ top: 0 })
  }, [])

  return (
    <>
      <CapabilitiesSection />
      <SectionDivider />
      <FoldingCartonSection />
      <SectionDivider />
      <PrintingSection />
      <SectionDivider />
      <FinishingSection />
    </>
  )
}
