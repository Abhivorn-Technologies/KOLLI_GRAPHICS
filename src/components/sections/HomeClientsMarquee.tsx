import React, { useState } from 'react'
import { CLIENTS_LIST, type ClientCompany } from '../../data/clients'

export const HomeClientsMarquee: React.FC = () => {
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({})
  const [imageSrcOverrides, setImageSrcOverrides] = useState<Record<string, string>>({})

  const handleImageError = (id: string, currentSrc: string) => {
    if (currentSrc.endsWith('.svg')) {
      // If svg fails or user added a png, try png alternative
      setImageSrcOverrides((prev) => ({ ...prev, [id]: currentSrc.replace('.svg', '.png') }))
    } else {
      setFailedImages((prev) => ({ ...prev, [id]: true }))
    }
  }

  // Duplicate for seamless infinite loop
  const marqueeItems = [
    ...CLIENTS_LIST.map((c) => ({ ...c, marqueeKey: `loop1-${c.id}` })),
    ...CLIENTS_LIST.map((c) => ({ ...c, marqueeKey: `loop2-${c.id}` })),
    ...CLIENTS_LIST.map((c) => ({ ...c, marqueeKey: `loop3-${c.id}` })),
  ]

  return (
    <section
      id="clients-section"
      style={{
        backgroundColor: '#ffffff',
        padding: '48px 0 54px 0',
        position: 'relative',
        borderBottom: '1px solid #e5e7eb',
        overflow: 'hidden',
      }}
    >
      <div className="container" style={{ textAlign: 'center', marginBottom: 28 }}>
        <p
          style={{
            fontSize: '0.78rem',
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#dc2626',
            margin: '0 0 6px 0',
          }}
        >
          Trusted by Industry Leaders
        </p>
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.5rem, 2.4vw, 2rem)',
            fontWeight: 700,
            color: '#111827',
            margin: 0,
          }}
        >
          Our Valued Customers
        </h2>
      </div>

      {/* Infinite Scrolling Logo Bar */}
      <div
        className="clients-marquee-container"
        style={{
          position: 'relative',
          width: '100%',
          overflow: 'hidden',
          padding: '8px 0',
        }}
      >
        {/* Soft edge fade masks */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '80px',
            height: '100%',
            background: 'linear-gradient(to right, #ffffff 20%, transparent 100%)',
            zIndex: 2,
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '80px',
            height: '100%',
            background: 'linear-gradient(to left, #ffffff 20%, transparent 100%)',
            zIndex: 2,
            pointerEvents: 'none',
          }}
        />

        <div className="clients-marquee-track" style={{ gap: '24px' }}>
          {marqueeItems.map((client) => {
            const currentSrc = imageSrcOverrides[client.id] || client.logo
            return (
              <ClientItem
                key={client.marqueeKey}
                client={client}
                src={currentSrc}
                isImageFailed={!!failedImages[client.id]}
                onImageError={() => handleImageError(client.id, currentSrc)}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}

interface ClientItemProps {
  client: ClientCompany
  src: string
  isImageFailed: boolean
  onImageError: () => void
}

const ClientItem: React.FC<ClientItemProps> = ({ client, src, isImageFailed, onImageError }) => {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        padding: '12px 20px',
        backgroundColor: hovered ? '#f8fafc' : '#ffffff',
        border: hovered ? '1px solid #cbd5e1' : '1px solid #e2e8f0',
        borderRadius: '10px',
        minWidth: 'max-content',
        transition: 'all 0.2s ease',
        cursor: 'default',
        boxShadow: hovered ? '0 4px 14px rgba(0,0,0,0.06)' : '0 1px 3px rgba(0,0,0,0.02)',
      }}
    >
      {/* Logo container */}
      <div
        style={{
          height: '38px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        {!isImageFailed ? (
          <img
            src={src}
            alt={client.name}
            onError={onImageError}
            style={{
              height: '36px',
              maxWidth: '130px',
              objectFit: 'contain',
              display: 'block',
            }}
          />
        ) : (
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              backgroundColor: '#f1f5f9',
              color: '#334155',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '0.8rem',
            }}
          >
            {client.name.substring(0, 2).toUpperCase()}
          </div>
        )}
      </div>

      {/* Company Name Only */}
      <span
        style={{
          fontSize: '0.925rem',
          fontWeight: 600,
          color: hovered ? '#111827' : '#374151',
          whiteSpace: 'nowrap',
          letterSpacing: '-0.01em',
          transition: 'color 0.2s ease',
        }}
      >
        {client.name}
      </span>
    </div>
  )
}
