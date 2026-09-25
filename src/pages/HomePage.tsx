import React, { useEffect } from "react"
import { HeroSection } from "../components/sections/HeroSection"
import { ProductsSection } from "../components/sections/ProductsSection"
import { CompanySection } from "../components/sections/CompanySection"

const SectionDivider = () => (
  <div style={{ height: "2px", background: "linear-gradient(to right, transparent 0%, rgba(220,38,38,0.18) 30%, rgba(0,174,239,0.18) 70%, transparent 100%)" }} />
)

export const HomePage: React.FC = () => {
  useEffect(() => {
    document.title = "Kolli Graphics | Premium Printing & Packaging — Hyderabad"
    window.scrollTo({ top: 0 })
  }, [])

  return (
    <>
      <HeroSection />
      <SectionDivider />
      <ProductsSection />
      <SectionDivider />
      <CompanySection />
    </>
  )
}
