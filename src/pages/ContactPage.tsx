import React, { useEffect } from 'react'
import { ContactSection } from '../components/sections/ContactSection'

export const ContactPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Contact Us | Kolli Graphics'
    window.scrollTo({ top: 0 })
  }, [])

  return <ContactSection />
}
