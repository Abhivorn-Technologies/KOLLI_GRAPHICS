import React, { useState, useRef } from 'react'
import { motion, useSpring } from 'framer-motion'

interface InteractiveTiltCardProps {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  glowColor?: string
  maxTilt?: number
  onClick?: () => void
}

export const InteractiveTiltCard: React.FC<InteractiveTiltCardProps> = ({
  children,
  className = '',
  style = {},
  glowColor = 'rgba(220, 38, 38, 0.12)',
  maxTilt = 7,
  onClick,
}) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  // Smooth springs for 3D tilt rotation
  const rotateX = useSpring(0, { stiffness: 200, damping: 20 })
  const rotateY = useSpring(0, { stiffness: 200, damping: 20 })
  const scale = useSpring(1, { stiffness: 200, damping: 20 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height

    // Calculate cursor relative position inside card
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    setMousePos({ x, y })

    // Center offset normalized (-1 to +1)
    const normX = (x - width / 2) / (width / 2)
    const normY = (y - height / 2) / (height / 2)

    // Set tilt values
    rotateX.set(-normY * maxTilt)
    rotateY.set(normX * maxTilt)
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
    scale.set(1.02)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    rotateX.set(0)
    rotateY.set(0)
    scale.set(1)
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        perspective: 1000,
        rotateX,
        rotateY,
        scale,
        transformStyle: 'preserve-3d',
        position: 'relative',
        cursor: onClick ? 'pointer' : 'default',
        ...style,
      }}
      className={`interactive-tilt-card ${className}`}
    >
      {/* Dynamic Cursor Radial Light Glow */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 'inherit',
          pointerEvents: 'none',
          zIndex: 2,
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.3s ease',
          background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, ${glowColor}, transparent 80%)`,
        }}
      />

      {children}
    </motion.div>
  )
}
