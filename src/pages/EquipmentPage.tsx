import React, { useEffect } from "react"
import { EquipmentSection } from "../components/sections/EquipmentSection"

export const EquipmentPage: React.FC = () => {
  useEffect(() => {
    document.title = "Machinery & Equipment | Kolli Graphics"
    window.scrollTo({ top: 0 })
  }, [])

  return <EquipmentSection />
}
