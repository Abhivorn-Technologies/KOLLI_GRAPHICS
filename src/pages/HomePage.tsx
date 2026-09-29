import React, { useEffect } from 'react'
import { FactoryHero } from '../components/hero/FactoryHero'
import { HomeMetricsBanner } from '../components/sections/HomeMetricsBanner'
import { ProductsSection } from '../components/sections/ProductsSection'
import { HomeEquipmentTeaser } from '../components/sections/HomeEquipmentTeaser'
import { HomeTrustBanner } from '../components/sections/HomeTrustBanner'

const SectionDivider = () => (
  <div
    style={{
      height: '2px',
      background:
        'linear-gradient(to right, transparent 0%, rgba(220,38,38,0.18) 30%, rgba(0,174,239,0.18) 70%, transparent 100%)',
    }}
  />
)

export const HomePage: React.FC = () => {
  useEffect(() => {
    document.title = 'Kolli Graphics | Premium Printing & Packaging — Hyderabad'
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <FactoryHero />
      <HomeMetricsBanner />
      <ProductsSection />
      <SectionDivider />
      <HomeEquipmentTeaser />
      <HomeTrustBanner />
    </>
  )
}
