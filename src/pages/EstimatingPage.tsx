import React, { useEffect } from "react"
import { EstimatingSection } from "../components/sections/EstimatingSection"

export const EstimatingPage: React.FC = () => {
  useEffect(() => {
    document.title = "Request Estimate | Kolli Graphics"
    window.scrollTo({ top: 0 })
  }, [])

  return <EstimatingSection />
}
