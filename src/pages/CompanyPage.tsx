import React, { useEffect } from "react"
import { CompanySection } from "../components/sections/CompanySection"
import { CapabilitiesSection } from "../components/sections/CapabilitiesSection"

const SectionDivider = () => (
  <div style={{ height: "2px", background: "linear-gradient(to right, transparent 0%, rgba(21,128,61,0.18) 30%, rgba(220,38,38,0.12) 70%, transparent 100%)" }} />
)

export const CompanyPage: React.FC = () => {
  useEffect(() => {
    document.title = "Company & Team | Kolli Graphics Private Limited"
    window.scrollTo({ top: 0 })
  }, [])

  return (
    <>
      <CompanySection />
      <SectionDivider />
      <CapabilitiesSection />
    </>
  )
}
