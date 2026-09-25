import React, { useEffect } from 'react'
import { CapabilitiesSection } from '../components/sections/CapabilitiesSection'
import { ProductsSection } from '../components/sections/ProductsSection'
import { FoldingCartonSection } from '../components/sections/FoldingCartonSection'
import { PrintingSection } from '../components/sections/PrintingSection'
import { FinishingSection } from '../components/sections/FinishingSection'

const SectionDivider = () => (
  <div
    style={{
      height: '2px',
      background:
        'linear-gradient(to right, transparent 0%, rgba(21,128,61,0.18) 30%, rgba(220,38,38,0.12) 70%, transparent 100%)',
    }}
  />
)

export const CapabilitiesPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Capabilities & Products | Kolli Graphics'
    window.scrollTo({ top: 0 })
  }, [])

  return (
    <>
      <CapabilitiesSection />
      <SectionDivider />
      <FoldingCartonSection />
      <SectionDivider />
      <ProductsSection />
      <SectionDivider />
      <PrintingSection />
      <SectionDivider />
      <FinishingSection />
    </>
  )
}
