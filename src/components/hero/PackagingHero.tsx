import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import kolliLogo from '../../assets/logo/kolli-logo.png'
import machineRollCutter from '../../assets/images/process/corrugated-roll-cutter.jpg'
import machineFlexoPress from '../../assets/images/process/flexo-printing-press.jpg'
import machineSlottingCreasing from '../../assets/images/process/slotting-creasing-machine.jpg'
import machineGluingFolding from '../../assets/images/process/box-gluing-folding-machine.jpg'

gsap.registerPlugin(ScrollTrigger)

// ── Math & Easing Helpers ───────────────────────────────────────────────────
const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v))
const lerp = (a: number, b: number, t: number) => a + (b - a) * clamp(t)
const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

// ── 7 Comprehensive Manufacturing Stages from Company Documents ─────────────
export interface StageData {
  id: string
  num: string
  tag: string
  title: string
  subtitle: string
  leftQuote?: string
  leftAuthor?: string
  description: string
  equipmentTitle: string
  equipmentName: string
  equipmentSpecs: { label: string; value: string }[]
  capabilityTitle: string
  capabilityItems: string[]
  badgeColor: string
  accentColor: string
  machineImage?: string
  telemetry: {
    label: string
    value: string
    unit: string
    pct: number
  }
}

const STAGES: StageData[] = [
  {
    id: 'welcome',
    num: '01',
    tag: 'WELCOME & COMPANY COMMITMENT',
    title: 'KOLLI GRAPHICS',
    subtitle: 'PRIVATE LIMITED · HYDERABAD (EST. 2009)',
    leftQuote:
      'We are a fully committed, service-oriented premier finishing company providing high quality craftsmanship and service in a timely manner. We stand by this and work tirelessly to ensure we meet your deadlines & deliver products that exceed customers’ expectations.',
    leftAuthor: '— Ranga Reddy Kolli & Parasurami Reddy Kolli, Founders',
    description:
      'Operating out of a modern 43,000+ sq. ft. secured manufacturing facility in Cherlapally Industrial Park, Hyderabad. Delivering world-class mono-cartons, rigid luxury boxes, and high-security labels.',
    equipmentTitle: 'PLANT INFRASTRUCTURE',
    equipmentName: 'Cherlapally Works Facility',
    equipmentSpecs: [
      { label: 'Plant Area', value: '43,000+ sq. ft. secured' },
      { label: 'Security', value: '24/7 CCTV cleanroom' },
      { label: 'Quality', value: 'ISO 9001:2015 & FSC®' },
    ],
    capabilityTitle: 'CORE CAPABILITIES',
    capabilityItems: ['Mono Cartons & Rigid Boxes', 'UV Offset & Flexo Labels', 'Spot UV, Foil & Embossing'],
    badgeColor: '#dc2626',
    accentColor: '#ef4444',
    machineImage: machineGluingFolding,
    telemetry: { label: 'PLANT READINESS', value: '100', unit: '%', pct: 100 },
  },
  {
    id: 'substrate',
    num: '02',
    tag: 'RAW KRAFT ROLL & BOARD SCORING',
    title: 'CORRUGATED BOARD',
    subtitle: 'VIRGIN KRAFT FEED & LASER CALIPER SCAN',
    description:
      'High-grade virgin kraft paperboard roll unwinds continuously into the corrugated board scoring line. Laser calipers gauge substrate thickness at 450 µm with zero-moisture warpage control to form rigid 3-ply Flute-B corrugated blanks.',
    equipmentTitle: 'BOARD SCORING LINE',
    equipmentName: 'Corrugated Board Scoring Machine',
    equipmentSpecs: [
      { label: 'Material', value: 'Virgin FSC® Kraft Paper' },
      { label: 'Flute Grade', value: 'Flute-B 3-Ply High ECT' },
      { label: 'Caliper Scan', value: '450 µm Laser Precision' },
    ],
    capabilityTitle: 'QUALITY CONTROL',
    capabilityItems: ['Zero-Moisture Warpage Control', 'Grain Direction 0° Parallel', 'FSC® Certified Sustainability'],
    badgeColor: '#0284c7',
    accentColor: '#38bdf8',
    machineImage: machineRollCutter,
    telemetry: { label: 'CALIPER THICKNESS', value: '450', unit: 'µm', pct: 45 },
  },
  {
    id: 'printing',
    num: '03',
    tag: 'MULTI-COLOUR FLEXO & UV PRINTING',
    title: '6-COLOUR FLEXO PRESS',
    subtitle: 'HEIDELBERG SPEEDMASTER XL 106 UV',
    description:
      'The flat horizontal corrugated blank feeds through the multi-deck printing press. In-line rotating CMYK & Pantone Red ink cylinders deposit razor-sharp graphics with instant high-intensity UV curing at 18,000 sheets per hour.',
    equipmentTitle: 'FLAGSHIP PRINTING PRESS',
    equipmentName: 'Corrugated Box Flexo UV Press',
    equipmentSpecs: [
      { label: 'Color Decks', value: '6 In-Line + UV Gloss Varnish' },
      { label: 'Max Speed', value: '18,000 Sheets / Hour' },
      { label: 'Spectral QC', value: '2400 DPI ΔE < 1.0 Control' },
    ],
    capabilityTitle: 'PRINT FINISHES',
    capabilityItems: ['Low-Migration UV Inks', 'High-Gloss Aqueous Coating', 'Micro-Text & Barcode Precision'],
    badgeColor: '#d97706',
    accentColor: '#f59e0b',
    machineImage: machineFlexoPress,
    telemetry: { label: 'PRESS SPEED', value: '18,000', unit: 'SPH', pct: 85 },
  },
  {
    id: 'prepress',
    num: '04',
    tag: 'PRE-PRESS & BOBST CAD DIELINE',
    title: 'STRUCTURAL CREASING',
    subtitle: 'BOBST CAD DIELINE & STEEL CREASING RULES',
    description:
      'Direct-to-Plate (CtP) thermal laser proofing and BOBST CAD creasing matrix. Heavy steel creasing rule blades press precise fold scorelines along the 4 panel creases and flap joints with ±0.02 mm fold-line precision.',
    equipmentTitle: 'PRE-PRESS SUITE',
    equipmentName: 'BOBST CAD Structural Dieline Unit',
    equipmentSpecs: [
      { label: 'Direct Imaging', value: 'Thermal Laser CtP 2400 DPI' },
      { label: 'Dieline Accuracy', value: '±0.02 mm Precision CNC' },
      { label: 'Workflow Engine', value: 'Heidelberg Prinect Suite' },
    ],
    capabilityTitle: 'PRECISION CHECKS',
    capabilityItems: ['CMYK + Pantone Color Calibration', 'Crash-Lock Fold Testing', 'Digital 3D Prototyping'],
    badgeColor: '#7c3aed',
    accentColor: '#a855f7',
    machineImage: machineRollCutter,
    telemetry: { label: 'DIELINE ACCURACY', value: '±0.02', unit: 'mm', pct: 98 },
  },
  {
    id: 'finishing',
    num: '05',
    tag: '24K METALLIC EMBELLISHMENT',
    title: 'HOT FOIL STAMPING',
    subtitle: '180 BAR HYDRAULIC & SCULPTED EMBOSS',
    description:
      'Heated micro-etched brass die (165°C) mounted on dual chrome hydraulic rams descends under 180 bar pressure directly onto the Kolli logo, fusing brilliant 24K mirror gold foil with sculpted 3D relief embossing.',
    equipmentTitle: 'HOT STAMPING MACHINERY',
    equipmentName: 'Hydraulic Foil & Emboss Unit',
    equipmentSpecs: [
      { label: 'Pressure', value: '180 Bar Hydraulic Ram' },
      { label: 'Die Temp', value: '165°C Precision Heat' },
      { label: 'Tooling', value: 'Micro-Etched Brass Dies' },
    ],
    capabilityTitle: 'FINISHING FX',
    capabilityItems: ['24K Gold & Holographic Foils', 'Tactile Blind Embossing', 'High-Reflectance Spot Lustre'],
    badgeColor: '#b45309',
    accentColor: '#fbbf24',
    machineImage: machineFlexoPress,
    telemetry: { label: 'HYDRAULIC PRESSURE', value: '180', unit: 'BAR', pct: 90 },
  },
  {
    id: 'diecutting',
    num: '06',
    tag: 'ROTARY SLOTTING & CREASING',
    title: 'SLOTTED BOX BLANK',
    subtitle: 'CORRUGATED BOX SLOTTING MACHINE',
    description:
      'Precision rotary slotting circular knives slice the 3 flap slot gaps at top and bottom, shear off waste tabs, and shape the side glue tab to form the ready-to-fold flat horizontal slotted box blank.',
    equipmentTitle: 'SLOTTING & CREASING LINE',
    equipmentName: 'Corrugated Box Slotting Machine',
    equipmentSpecs: [
      { label: 'Cutting Blades', value: 'Rotary Hardened Tool Steel' },
      { label: 'Waste Stripping', value: '100% Dynamic Pin Ejection' },
      { label: 'Capacity', value: '8,000 Blanks / Hour' },
    ],
    capabilityTitle: 'CUTTING METRICS',
    capabilityItems: ['Clean Fiber-Free Slit Edges', 'Integral Side Glue/Stitching Tab', '4-Flap Precision Scorelines'],
    badgeColor: '#dc2626',
    accentColor: '#f87171',
    machineImage: machineSlottingCreasing,
    telemetry: { label: 'SLOTTER SPEED', value: '8,000', unit: 'SPH', pct: 75 },
  },
  {
    id: 'conversion',
    num: '07',
    tag: 'AUTOMATIC FOLDING & UNBOXING',
    title: 'FINISHED 3D CARTON',
    subtitle: 'BOBST EXPERTFOLD 110 & UNBOXING REVEAL',
    description:
      'The flat horizontal slotted blank enters the folder-gluer. Side glue tab receives hot-melt adhesive, the 4 panels fold 90° into a solid 3D rectangular carton with the Kolli logo on the front face, and all 4 top flaps open into a luxury unboxing presentation.',
    equipmentTitle: 'FOLDER-GLUER LINE',
    equipmentName: 'BOBST Expertfold 110 Folder-Gluer',
    equipmentSpecs: [
      { label: 'Folder Speed', value: '450 Cartons / Minute' },
      { label: 'Gluing System', value: 'Nordson Electronic Hot-Melt' },
      { label: 'QC Inspection', value: '100% 4K Optical Camera Check' },
    ],
    capabilityTitle: 'DISPATCH READY',
    capabilityItems: ['Rigid Protective Structure', 'Articulated 4-Flap Presentation', 'Custom Velvet Cushion Inlay'],
    badgeColor: '#16a34a',
    accentColor: '#22c55e',
    machineImage: machineGluingFolding,
    telemetry: { label: 'GLUER OUTPUT', value: '450', unit: 'CPM', pct: 100 },
  },
]

export const PackagingHero: React.FC = () => {
  const trackRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)
  const [activeStep, setActiveStep] = useState(0)
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragRot, setDragRot] = useState({ x: 18, y: -24 })
  const dragStart = useRef({ x: 0, y: 0, rotX: 18, rotY: -24 })

  // GSAP ScrollTrigger
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }

    if (!trackRef.current) return

    const st = ScrollTrigger.create({
      trigger: trackRef.current,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.25,
      onUpdate: (self) => {
        const p = self.progress
        setProgress(p)

        const total = STAGES.length
        const raw = p * (total - 0.01)
        const idx = Math.min(total - 1, Math.floor(raw))
        setActiveStep(idx)
      },
    })

    ScrollTrigger.refresh()

    return () => {
      st.kill()
    }
  }, [])

  // Parallax mouse movements
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const nx = (e.clientX / window.innerWidth - 0.5) * 2
    const ny = (e.clientY / window.innerHeight - 0.5) * 2
    setMouseOffset({ x: nx, y: ny })

    if (isDragging) {
      const dx = e.clientX - dragStart.current.x
      const dy = e.clientY - dragStart.current.y
      setDragRot({
        x: clamp(dragStart.current.rotX - dy * 0.3, -45, 60),
        y: dragStart.current.rotY + dx * 0.38,
      })
    }
  }, [isDragging])

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true)
    dragStart.current = {
      x: e.clientX,
      y: e.clientY,
      rotX: dragRot.x,
      rotY: dragRot.y,
    }
  }, [dragRot])

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  // Jump to specific manufacturing step
  const goToStep = (idx: number) => {
    if (!trackRef.current) return
    const totalHeight = trackRef.current.offsetHeight - window.innerHeight
    const target = trackRef.current.offsetTop + (idx / (STAGES.length - 1)) * totalHeight
    window.scrollTo({ top: target, behavior: 'smooth' })
  }

  const curStage = STAGES[activeStep] || STAGES[0]

  // ── PRECISE SOLID 3D BOX & KINEMATIC BLANK DIMENSIONS (LARGER VISUAL SIZE) ─
  const PW_FRONT = 180 // Front & Back Panel Width
  const PW_SIDE = 140 // Left & Right Panel Width (Box Depth)
  const PH = 175 // Box Height
  const FH = 68 // Top Flap Height
  const TAB_W = 22 // Side Glue Tab Width
  const flapH = FH

  const halfD = PW_SIDE / 2

  // Premium Realistic Kraft Material Palette
  const kraftOuter = '#df9b42'
  const kraftInner = '#b87522'
  const kraftFloor = '#8f5615'
  const kraftBorder = '#1c1917'

  // Single Continuous Unified Kinematic 3D Fold State
  // Stage 01 (Welcome): Fully assembled 3D box (effectiveFoldT = 1)
  // Stage 02 to 06: Flat blank workpiece on conveyor (effectiveFoldT = 0)
  // Stage 07 (BOBST Folder-Gluer): Smooth continuous 3D folding into carton (0.75 -> 0.86)
  const isFoldingPhase = progress >= 0.75 && progress < 0.86
  const effectiveFoldT = progress < 0.15
    ? 1
    : progress >= 0.75
    ? clamp((progress - 0.75) / 0.11, 0, 1)
    : 0

  const activeFoldAngle = easeInOutCubic(effectiveFoldT) * 90 // 0deg (flat) -> 90deg (solid box)
  const isAssembledBox = progress < 0.15 || progress >= 0.86

  // Camera Tilt Angles
  const targetTiltX = isAssembledBox ? 16 : (isFoldingPhase ? lerp(26, 16, effectiveFoldT) : 26)
  const targetTiltY = isAssembledBox ? -22 : (isFoldingPhase ? lerp(0, -22, effectiveFoldT) : 0)
  const baseRotX = isDragging ? dragRot.x : targetTiltX + mouseOffset.y * -6
  const baseRotY = isDragging ? dragRot.y : targetTiltY + mouseOffset.x * 10

  // 4 Top Flaps Articulation Angle (16deg = tight realistic luxury carton presentation, 0deg = flat in plane)
  const flapAngle = useMemo(() => {
    if (progress < 0.15) {
      return lerp(28, 0, easeInOutCubic(progress / 0.15))
    }
    if (progress >= 0.88) {
      return lerp(0, 28, easeOutCubic(clamp((progress - 0.88) / 0.10, 0, 1)))
    }
    return 0
  }, [progress])

  // Dynamic Stage 1 Opening Flap Progress (0 = closed box at top, 1 = fully open unboxing as you scroll)
  const stage1OpenProgress = useMemo(() => {
    if (progress < 0.14) {
      return easeInOutCubic(clamp(progress / 0.11, 0, 1))
    }
    return 1
  }, [progress])

  // Substrate laser caliper scan pos (Stage 02)
  const caliperScanX = progress >= 0.15 && progress < 0.28
    ? ((progress - 0.15) / 0.13) * 100
    : 50

  // Flexo Printing Roller Translation (Stage 03)
  const printT = clamp((progress - 0.28) / 0.14, 0, 1)
  const rollerPosY = lerp(-120, 120, printT)
  const printedOpacity = progress < 0.28 ? 0 : clamp(printT * 1.6, 0, 1)

  // Creasing Matrix Rules (Stage 04)
  const creasingT = clamp((progress - 0.42) / 0.14, 0, 1)
  const creasingDieY = creasingT < 0.5
    ? lerp(-40, 0, easeInOutCubic(creasingT * 2))
    : lerp(0, -40, easeInOutCubic((creasingT - 0.5) * 2))
  const laserX = lerp(10, 90, (Math.sin(creasingT * Math.PI * 4) + 1) / 2)

  // 180 Bar Hydraulic Brass Die Stamping (Stage 05) - Smooth & Fully Descending Down onto Logo with Dwell!
  const foilProgress = clamp((progress - 0.56) / 0.14, 0, 1)
  let dieTranslateY = -180
  let dieTranslateZ = 90
  let isDieContact = false

  if (foilProgress > 0 && foilProgress < 0.38) {
    const t = foilProgress / 0.38
    dieTranslateY = lerp(-180, 0, easeInOutCubic(t))
    dieTranslateZ = lerp(90, 2, easeInOutCubic(t))
  } else if (foilProgress >= 0.38 && foilProgress <= 0.64) {
    dieTranslateY = 0
    dieTranslateZ = 2
    isDieContact = true
  } else if (foilProgress > 0.64) {
    const t = (foilProgress - 0.64) / 0.36
    dieTranslateY = lerp(0, -180, easeInOutCubic(t))
    dieTranslateZ = lerp(2, 90, easeInOutCubic(t))
  }

  const foilGlow = Math.sin(foilProgress * Math.PI)
  const isGoldEmbossed = progress >= 0.60

  // Rotary Slotting (Stage 06)
  const slotT = clamp((progress - 0.70) / 0.05, 0, 1)
  const wasteDropY = lerp(0, 50, easeInOutCubic(slotT))
  const wasteOpacity = lerp(1, 0, easeInOutCubic(slotT))

  // ── REUSABLE PRISTINE 6-SIDED SOLID 3D CARTON BOX COMPONENT ───────────────
  const renderSolidBox = (
    key: string,
    containerStyle: React.CSSProperties = {},
    isGold: boolean = false,
    isSealed: boolean = true,
    openProgress: number = 0
  ) => {
    const W = 175 // Box Width (scaled up for prominent aesthetic visibility)
    const H = 170 // Box Height
    const D = 145 // Box Depth
    const hW = W / 2
    const hH = H / 2
    const hD = D / 2
    const fH = Math.round(D / 2) // Major Flap Height (73px - meets perfectly in center when closed)
    const sideFH = Math.round(W / 2) // Side Flap Height

    const frontFlapRot = lerp(90, -45, openProgress)
    const backFlapRot = lerp(-90, 45, openProgress)
    const sideFlapRot = lerp(90, -45, openProgress)

    return (
      <div
        key={key}
        style={{
          position: 'absolute',
          width: `${W}px`,
          height: `${H}px`,
          left: '50%',
          top: '50%',
          marginLeft: `-${hW}px`,
          marginTop: `-${hH}px`,
          transformStyle: 'preserve-3d',
          transition: 'all 0.4s ease-out',
          ...containerStyle,
        }}
      >
        {/* 1. FRONT FACE (Z = +hD) */}
        <div
          style={{
            position: 'absolute',
            width: `${W}px`,
            height: `${H}px`,
            left: 0,
            top: 0,
            background: `linear-gradient(135deg, ${kraftOuter} 0%, #ca8632 100%)`,
            border: `2px solid ${kraftBorder}`,
            padding: '10px 12px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxSizing: 'border-box',
            boxShadow: 'inset -3px -3px 12px rgba(0,0,0,0.15), 0 10px 25px rgba(0,0,0,0.08)',
            transform: `translateZ(${hD}px)`,
            backfaceVisibility: 'hidden',
          }}
        >
          {/* Top Tape Tab (hanging down from top lid seam only when sealed) */}
          {isSealed && (
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '22px',
                height: '20px',
                background: '#94a3b8',
                border: '1px solid rgba(0,0,0,0.2)',
                borderTop: 'none',
                boxShadow: '0 2px 4px rgba(0,0,0,0.15)',
                zIndex: 10,
              }}
            />
          )}

          {/* Top Markings */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: '6.5px', fontWeight: 900, color: '#1c1917', letterSpacing: '0.6px' }}>
              CHERLAPALLY WORKS
            </div>
            <div style={{ fontSize: '6.5px', fontWeight: 900, color: '#1c1917', border: '1px solid #1c1917', padding: '1px 5px', background: 'rgba(255,255,255,0.92)', borderRadius: '2px' }}>
              FSC® 100%
            </div>
          </div>

          {/* Kolli Official Logo */}
          <div
            style={{
              background: isGold
                ? 'linear-gradient(135deg, #ffffff 0%, #fef3c7 100%)'
                : 'rgba(255, 255, 255, 0.98)',
              padding: '5px 12px',
              borderRadius: '6px',
              border: isGold ? '1.5px solid #d97706' : '1.5px solid #1c1917',
              boxShadow: isGold
                ? `0 0 20px rgba(245, 158, 11, 0.8), inset 0 2px 4px rgba(255,255,255,0.9)`
                : '0 3px 8px rgba(0,0,0,0.12)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '2px',
              margin: '0 auto',
            }}
          >
            <img
              src={kolliLogo}
              alt="Kolli Graphics Official Logo"
              style={{ height: '32px', width: 'auto', objectFit: 'contain' }}
            />
            <div style={{ fontSize: '7px', fontWeight: 900, color: isGold ? '#78350f' : '#0f172a', letterSpacing: '0.5px', whiteSpace: 'nowrap' }}>
              KOLLI GRAPHICS PVT LTD
            </div>
          </div>

          {/* Bottom Handling Icons in Black Box Frames (Identical to Reference Image!) */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div style={{ display: 'flex', gap: '4px' }}>
              {[
                { icon: '⬆⬆', title: 'This Way Up' },
                { icon: '☂', title: 'Keep Dry' },
                { icon: '🍷', title: 'Fragile' },
                { icon: '♻', title: 'Recyclable' },
              ].map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    border: '1.2px solid #1c1917',
                    borderRadius: '2px',
                    width: '16px',
                    height: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '9px',
                    fontWeight: 900,
                    color: '#1c1917',
                    background: 'rgba(255,255,255,0.2)',
                  }}
                >
                  {item.icon}
                </div>
              ))}
            </div>
            <div style={{ fontSize: '6px', fontWeight: 900, color: '#1c1917' }}>
              ISO 9001:2015
            </div>
          </div>
        </div>

        {/* 2. BACK FACE (Z = -hD) */}
        <div
          style={{
            position: 'absolute',
            width: `${W}px`,
            height: `${H}px`,
            left: 0,
            top: 0,
            background: kraftInner,
            border: `2px solid ${kraftBorder}`,
            padding: '12px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            boxSizing: 'border-box',
            transform: `rotateY(180deg) translateZ(${hD}px)`,
            backfaceVisibility: 'hidden',
          }}
        >
          {isSealed && (
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '22px',
                height: '20px',
                background: '#94a3b8',
                border: '1px solid rgba(0,0,0,0.2)',
                borderTop: 'none',
              }}
            />
          )}
          <img
            src={kolliLogo}
            alt="Back Seal"
            style={{ height: '24px', width: 'auto', opacity: 0.7, filter: 'grayscale(0.6)' }}
          />
          <div style={{ fontSize: '6.5px', fontWeight: 900, color: '#1c1917', marginTop: '4px', letterSpacing: '0.8px', whiteSpace: 'nowrap' }}>
            QUALITY & FINISHING FIRST
          </div>
        </div>

        {/* 3. LEFT FACE (X = -hW) */}
        <div
          style={{
            position: 'absolute',
            width: `${D}px`,
            height: `${H}px`,
            left: `${(W - D) / 2}px`,
            top: 0,
            background: '#c4812b',
            border: `2px solid ${kraftBorder}`,
            padding: '10px 8px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxSizing: 'border-box',
            transform: `rotateY(-90deg) translateZ(${hW}px)`,
            backfaceVisibility: 'hidden',
          }}
        >
          <div style={{ fontSize: '6.5px', fontWeight: 900, color: '#1c1917', letterSpacing: '0.6px', whiteSpace: 'nowrap' }}>
            HANDLE WITH CARE
          </div>
          {/* Shipping Label on Side like Reference */}
          <div
            style={{
              background: '#ffffff',
              padding: '4px 6px',
              borderRadius: '2px',
              border: '1px solid #1c1917',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '2px',
            }}
          >
            <img src={kolliLogo} alt="Left Seal" style={{ height: '16px', width: 'auto' }} />
            <div style={{ display: 'flex', gap: '1.5px', height: '10px' }}>
              {[2, 1, 2, 1, 2, 1, 2, 1, 2].map((w, i) => (
                <div key={i} style={{ width: `${w}px`, height: '100%', background: '#1c1917' }} />
              ))}
            </div>
          </div>
          <div style={{ fontSize: '6px', color: '#1c1917', fontWeight: 800, whiteSpace: 'nowrap' }}>
            CHERLAPALLY WORKS
          </div>
        </div>

        {/* 4. RIGHT FACE (X = +hW) */}
        <div
          style={{
            position: 'absolute',
            width: `${D}px`,
            height: `${H}px`,
            left: `${(W - D) / 2}px`,
            top: 0,
            background: `linear-gradient(135deg, ${kraftOuter} 0%, #b87522 100%)`,
            border: `2px solid ${kraftBorder}`,
            padding: '10px 8px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxSizing: 'border-box',
            transform: `rotateY(90deg) translateZ(${hW}px)`,
            backfaceVisibility: 'hidden',
          }}
        >
          <div style={{ fontSize: '6.5px', fontWeight: 900, color: '#1c1917', letterSpacing: '0.6px', whiteSpace: 'nowrap' }}>
            BOBST DIE-CUT
          </div>
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.9)',
              padding: '4px 8px',
              borderRadius: '4px',
              border: '1px solid #1c1917',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img src={kolliLogo} alt="Right Seal" style={{ height: '18px', width: 'auto' }} />
          </div>
          <div style={{ fontSize: '6px', color: '#1c1917', fontWeight: 800, whiteSpace: 'nowrap' }}>
            ISO 9001:2015
          </div>
        </div>

        {/* 5. BOTTOM SOLID BASE FLOOR (Y = +hH) */}
        <div
          style={{
            position: 'absolute',
            width: `${W}px`,
            height: `${D}px`,
            left: 0,
            top: `${(H - D) / 2}px`,
            background: kraftFloor,
            border: `2px solid ${kraftBorder}`,
            boxSizing: 'border-box',
            transform: `rotateX(-90deg) translateZ(${hH}px)`,
            boxShadow: 'inset 0 0 25px rgba(0,0,0,0.5)',
          }}
        />

        {/* 6. TOP LID (SEALED WITH TAPE) OR UNBOXING OPENING FLAPS */}
        {isSealed ? (
          /* Closed Top Lid with Center Seam Tape (Stage 7 Dispatch) */
          <div
            style={{
              position: 'absolute',
              width: `${W}px`,
              height: `${D}px`,
              left: 0,
              top: `${(H - D) / 2}px`,
              background: `linear-gradient(180deg, ${kraftOuter} 0%, #ca8632 100%)`,
              border: `2px solid ${kraftBorder}`,
              boxSizing: 'border-box',
              transform: `rotateX(90deg) translateZ(${hH}px)`,
              boxShadow: 'inset 0 0 15px rgba(0,0,0,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '22px',
                background: '#94a3b8',
                borderLeft: '1px solid rgba(0,0,0,0.2)',
                borderRight: '1px solid rgba(0,0,0,0.2)',
                boxShadow: '0 0 6px rgba(0,0,0,0.2)',
              }}
            />
          </div>
        ) : (
          /* 4 Articulated Open Unboxing Flaps (Stage 1 Dynamic Opening Animation) */
          <>
            {/* Inner bottom floor cavity */}
            <div
              style={{
                position: 'absolute',
                width: `${W - 6}px`,
                height: `${D - 6}px`,
                left: '3px',
                top: `${(H - D) / 2 + 3}px`,
                background: '#6c3e0e',
                boxSizing: 'border-box',
                transform: `rotateX(-90deg) translateZ(-${hH - 4}px)`,
                boxShadow: 'inset 0 0 35px rgba(0,0,0,0.85)',
              }}
            />

            {/* Front Top Flap (Opening Forward toward viewer) */}
            <div
              style={{
                position: 'absolute',
                width: `${W}px`,
                height: `${fH}px`,
                left: 0,
                bottom: `${H}px`,
                background: `linear-gradient(180deg, ${kraftOuter} 0%, #cf8c36 100%)`,
                border: `2px solid ${kraftBorder}`,
                borderRadius: '3px 3px 0 0',
                transformOrigin: 'bottom center',
                transform: `translateZ(${hD}px) rotateX(${frontFlapRot}deg)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxSizing: 'border-box',
                transition: 'transform 0.15s ease-out',
                zIndex: 10,
              }}
            >
              <div style={{ fontSize: '7.5px', fontWeight: 900, color: '#1c1917', letterSpacing: '0.8px', opacity: 0.85, whiteSpace: 'nowrap' }}>
                KOLLI GRAPHICS
              </div>
            </div>

            {/* Back Top Flap (Opening Backward away from viewer) */}
            <div
              style={{
                position: 'absolute',
                width: `${W}px`,
                height: `${fH}px`,
                left: 0,
                bottom: `${H}px`,
                background: `linear-gradient(180deg, #b87522 0%, ${kraftOuter} 100%)`,
                border: `2px solid ${kraftBorder}`,
                borderRadius: '3px 3px 0 0',
                transformOrigin: 'bottom center',
                transform: `translateZ(-${hD}px) rotateX(${backFlapRot}deg)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxSizing: 'border-box',
                transition: 'transform 0.15s ease-out',
                zIndex: 5,
              }}
            />

            {/* Left Top Flap (Opening Left) */}
            <div
              style={{
                position: 'absolute',
                width: `${D}px`,
                height: `${sideFH}px`,
                left: `${(W - D) / 2}px`,
                bottom: `${H}px`,
                background: '#c4812b',
                border: `2px solid ${kraftBorder}`,
                borderRadius: '3px 3px 0 0',
                transformOrigin: 'bottom center',
                transform: `rotateY(-90deg) translateZ(${hW}px) rotateX(${sideFlapRot}deg)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxSizing: 'border-box',
                transition: 'transform 0.15s ease-out',
                zIndex: 8,
              }}
            />

            {/* Right Top Flap (Opening Right) */}
            <div
              style={{
                position: 'absolute',
                width: `${D}px`,
                height: `${sideFH}px`,
                left: `${(W - D) / 2}px`,
                bottom: `${H}px`,
                background: `linear-gradient(180deg, ${kraftOuter} 0%, #b87522 100%)`,
                border: `2px solid ${kraftBorder}`,
                borderRadius: '3px 3px 0 0',
                transformOrigin: 'bottom center',
                transform: `rotateY(90deg) translateZ(${hW}px) rotateX(${sideFlapRot}deg)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxSizing: 'border-box',
                transition: 'transform 0.15s ease-out',
                zIndex: 8,
              }}
            />
          </>
        )}
      </div>
    )
  }

  return (
    <div
      ref={trackRef}
      id="hero-cinematic-track"
      style={{
        position: 'relative',
        height: '1800vh',
        backgroundColor: '#f8f6f0',
        color: '#0f172a',
        userSelect: isDragging ? 'none' : 'auto',
      }}
    >
      {/* ── PINNED FULL-VIEWPORT CINEMATIC STAGE ───────────────────────── */}
      <div
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          width: '100vw',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: 'radial-gradient(ellipse at 50% 50%, #ffffff 0%, #f4f0e6 55%, #e9e3d3 100%)',
        }}
      >
        {/* Soft Ambient Dynamic Studio Lighting */}
        <div
          style={{
            position: 'absolute',
            top: '42%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '950px',
            height: '600px',
            background: `radial-gradient(circle, rgba(255, 255, 255, 0.95) 0%, ${curStage.accentColor}18 45%, transparent 70%)`,
            pointerEvents: 'none',
            filter: 'blur(60px)',
            transition: 'background 0.5s ease',
          }}
        />

        {/* ── TOP HUD / STEP CONTROLLER ───────────────────────────────── */}
        <header
          style={{
            position: 'relative',
            zIndex: 40,
            padding: '14px 36px 0 36px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {/* Brand Identity */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img
              src={kolliLogo}
              alt="Kolli Graphics Official Logo"
              style={{ height: '38px', width: 'auto', objectFit: 'contain' }}
            />
            <div>
              <div style={{ fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: '#64748b', fontWeight: 800 }}>
                KOLLI GRAPHICS PVT LTD
              </div>
              <div style={{ fontSize: '13px', fontWeight: 900, color: '#0f172a', letterSpacing: '0.5px' }}>
                {curStage.tag}
              </div>
            </div>
          </div>

          {/* Interactive Steps Pill Bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              background: 'rgba(255, 255, 255, 0.92)',
              padding: '4px 6px',
              borderRadius: '999px',
              border: '1px solid rgba(0, 0, 0, 0.08)',
              boxShadow: '0 4px 18px rgba(0, 0, 0, 0.05)',
              backdropFilter: 'blur(12px)',
            }}
          >
            {STAGES.map((stg, idx) => {
              const isCurr = activeStep === idx
              return (
                <button
                  key={stg.id}
                  onClick={() => goToStep(idx)}
                  title={stg.title}
                  style={{
                    background: isCurr ? '#0f172a' : 'transparent',
                    border: 'none',
                    color: isCurr ? '#ffffff' : '#64748b',
                    padding: isCurr ? '5px 12px' : '5px 8px',
                    borderRadius: '999px',
                    fontSize: '11px',
                    fontWeight: 750,
                    letterSpacing: '0.8px',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <span style={{ color: isCurr ? stg.accentColor : 'inherit' }}>{stg.num}</span>
                  {isCurr && <span>{stg.title}</span>}
                </button>
              )
            })}
          </div>

          {/* Live Plant Telemetry Readout */}
          <div style={{ textAlign: 'right', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div>
              <div style={{ fontSize: '10px', letterSpacing: '1.5px', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>
                {curStage.telemetry.label}
              </div>
              <div style={{ fontSize: '15px', fontWeight: 950, color: '#0f172a', fontFamily: 'monospace' }}>
                {curStage.telemetry.value} <span style={{ fontSize: '11px', color: curStage.badgeColor }}>{curStage.telemetry.unit}</span>
              </div>
            </div>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: `conic-gradient(${curStage.badgeColor} ${curStage.telemetry.pct}%, #e2e8f0 0%)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '3px',
                boxSizing: 'border-box',
              }}
            >
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  background: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '9px',
                  fontWeight: 900,
                  color: '#0f172a',
                }}
              >
                {curStage.num}
              </div>
            </div>
          </div>
        </header>

        {/* ── 3-COLUMN ZERO-OVERLAP HERO STAGE ─────────────────────────── */}
        <main
          style={{
            position: 'relative',
            zIndex: 30,
            padding: '4px 28px',
            display: 'grid',
            gridTemplateColumns: '315px 1fr 280px',
            gap: '20px',
            alignItems: 'center',
            maxWidth: '1600px',
            margin: '0 auto',
            width: '100%',
            boxSizing: 'border-box',
          }}
        >
          {/* ── LEFT COLUMN: STORYTELLING, FOUNDERS' STATEMENT & CTAS ──── */}
          <div
            key={`left-col-${activeStep}`}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              zIndex: 30,
              animation: 'smoothSlideIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
            }}
          >
            {/* Step Counter Badge */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(255, 255, 255, 0.95)',
                padding: '4px 12px',
                borderRadius: '999px',
                border: '1px solid rgba(0, 0, 0, 0.08)',
                width: 'fit-content',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              }}
            >
              <span
                style={{
                  display: 'inline-block',
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: curStage.badgeColor,
                  boxShadow: `0 0 8px ${curStage.badgeColor}`,
                }}
              />
              <span style={{ fontSize: '11.5px', fontWeight: 850, letterSpacing: '1.2px', color: curStage.badgeColor }}>
                MANUFACTURING STAGE {curStage.num} / 07
              </span>
            </div>

            {/* Stage Title */}
            <div>
              <h1
                style={{
                  fontSize: '34px',
                  fontWeight: 950,
                  lineHeight: 1.1,
                  letterSpacing: '-0.5px',
                  color: '#0f172a',
                  margin: 0,
                }}
              >
                {curStage.title}
              </h1>
              <div
                style={{
                  fontSize: '12px',
                  fontWeight: 800,
                  letterSpacing: '1.5px',
                  color: '#64748b',
                  textTransform: 'uppercase',
                  marginTop: '4px',
                }}
              >
                {curStage.subtitle}
              </div>
            </div>

            {/* Description OR Founders' Statement (Stage 01) */}
            {curStage.leftQuote ? (
              <div
                style={{
                  fontSize: '13.5px',
                  color: '#1e293b',
                  lineHeight: 1.6,
                  fontWeight: 600,
                  fontStyle: 'italic',
                  background: 'rgba(255, 255, 255, 0.92)',
                  padding: '13px 15px',
                  borderRadius: '10px',
                  borderLeft: '4px solid #dc2626',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.04)',
                }}
              >
                "{curStage.leftQuote}"
                <div style={{ fontStyle: 'normal', fontWeight: 850, color: '#dc2626', marginTop: '6px', fontSize: '12px' }}>
                  {curStage.leftAuthor}
                </div>
              </div>
            ) : (
              <div
                style={{
                  fontSize: '13.5px',
                  color: '#334155',
                  lineHeight: 1.6,
                  fontWeight: 500,
                  background: 'rgba(255, 255, 255, 0.85)',
                  padding: '13px 15px',
                  borderRadius: '10px',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
                }}
              >
                {curStage.description}
              </div>
            )}

            {/* Machine Deployed Badge */}
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.92)',
                border: '1px solid rgba(0, 0, 0, 0.08)',
                padding: '11px 15px',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
              }}
            >
              {curStage.machineImage && (
                <img
                  src={curStage.machineImage}
                  alt={curStage.equipmentName}
                  style={{ width: '40px', height: '40px', borderRadius: '6px', objectFit: 'cover', border: '1px solid rgba(0,0,0,0.1)' }}
                />
              )}
              <div>
                <div style={{ fontSize: '10px', color: '#64748b', fontWeight: 800, letterSpacing: '1px' }}>
                  ACTIVE EQUIPMENT LINE
                </div>
                <div style={{ fontSize: '13px', fontWeight: 850, color: '#0f172a' }}>
                  {curStage.equipmentName}
                </div>
              </div>
            </div>

            {/* Instant Actions */}
            <div style={{ display: 'flex', gap: '8px', marginTop: '2px' }}>
              <a
                href="/estimating"
                style={{
                  background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
                  color: '#ffffff',
                  padding: '11px 18px',
                  borderRadius: '8px',
                  fontWeight: 800,
                  fontSize: '13.5px',
                  textDecoration: 'none',
                  textAlign: 'center',
                  letterSpacing: '0.5px',
                  boxShadow: '0 8px 20px rgba(220, 38, 38, 0.35)',
                  transition: 'transform 0.2s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
              >
                Instant Estimate →
              </a>
              <a
                href="/capabilities"
                style={{
                  background: 'rgba(255, 255, 255, 0.9)',
                  border: '1px solid rgba(0, 0, 0, 0.12)',
                  color: '#0f172a',
                  padding: '11px 16px',
                  borderRadius: '8px',
                  fontWeight: 700,
                  fontSize: '13.5px',
                  textDecoration: 'none',
                  textAlign: 'center',
                }}
              >
                Capabilities
              </a>
            </div>
          </div>

          {/* ── CENTER STAGE: UNIFIED KINEMATIC 3D WORKPIECE & MACHINES ──── */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '500px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              perspective: '1400px',
              cursor: isDragging ? 'grabbing' : 'grab',
            }}
          >
            {/* Dynamic Elliptical Studio Floor Shadow */}
            <div
              style={{
                position: 'absolute',
                bottom: '10%',
                left: '50%',
                transform: 'translateX(-50%)',
                width: isAssembledBox ? '340px' : '460px',
                height: isAssembledBox ? '55px' : '75px',
                background: 'radial-gradient(ellipse, rgba(146, 102, 45, 0.35) 0%, rgba(146, 102, 45, 0.08) 50%, transparent 75%)',
                filter: 'blur(14px)',
                pointerEvents: 'none',
                transition: 'all 0.3s ease-out',
              }}
            />

            {/* 3D Transform Root Pivot */}
            <div
              style={{
                position: 'relative',
                transformStyle: 'preserve-3d',
                transform: `rotateX(${baseRotX}deg) rotateY(${baseRotY}deg)`,
                transition: isDragging ? 'none' : 'transform 0.12s ease-out',
              }}
            >
              {/* ══════════════════════════════════════════════════════════════
                  CASE A: STAGE 01 (WELCOME) — 1 SINGLE FULL PRISTINE 3D CARTON BOX
                  (Solid rigid base floor, official Kolli logo, luxury active open unboxing presentation)
                 ══════════════════════════════════════════════════════════════ */}
              {progress < 0.15 && (
                <div style={{ position: 'relative', width: `${PW_FRONT}px`, height: `${PH}px`, transformStyle: 'preserve-3d' }}>
                  {renderSolidBox('hero-stage1-single-box', {}, false, false, stage1OpenProgress)}
                </div>
              )}

              {/* ══════════════════════════════════════════════════════════════
                  CASE B: STAGES 02 TO 06 & FOLDING PHASE (0.15 <= progress < 0.86)
                  Conveyor blank workpiece + live machines + smooth 3D fold
                 ══════════════════════════════════════════════════════════════ */}
              {progress >= 0.15 && progress < 0.86 && (
                <div
                  style={{
                    position: 'relative',
                    width: `${PW_FRONT}px`,
                    height: `${PH}px`,
                    transformStyle: 'preserve-3d',
                    transform: `translateZ(${effectiveFoldT * halfD}px) scale(${lerp(0.68, 1, effectiveFoldT)})`,
                  }}
                >
                  {/* ── PANEL 2: MAIN FRONT PANEL (CENTER OF WORKPIECE) ── */}
                  <div
                    style={{
                      position: 'absolute',
                      width: `${PW_FRONT}px`,
                      height: `${PH}px`,
                      left: 0,
                      top: 0,
                      background: `linear-gradient(135deg, ${kraftOuter} 0%, #ca8632 100%)`,
                      border: `2.5px solid ${kraftBorder}`,
                      padding: '8px 10px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      boxSizing: 'border-box',
                      boxShadow: 'inset -3px -3px 12px rgba(0,0,0,0.15), 0 10px 25px rgba(0,0,0,0.08)',
                      transformStyle: 'preserve-3d',
                    }}
                  >
                    {/* Top Quality Markings */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', opacity: printedOpacity }}>
                      <div style={{ fontSize: '6.5px', fontWeight: 900, color: '#1c1917', letterSpacing: '0.6px' }}>
                        SECURED CHERLAPALLY WORKS
                      </div>
                      <div style={{ fontSize: '6.5px', fontWeight: 900, color: '#1c1917', border: '1px solid #1c1917', padding: '1px 5px', background: 'rgba(255,255,255,0.92)', borderRadius: '2px' }}>
                        FSC® 100%
                      </div>
                    </div>

                    {/* OFFICIAL KOLLI LOGO EMBEDDED IN FRONT PANEL (WITH 24K GOLD RELIEF EMBOSS) */}
                    <div
                      style={{
                        background: isGoldEmbossed
                          ? 'linear-gradient(135deg, #ffffff 0%, #fef3c7 100%)'
                          : 'rgba(255, 255, 255, 0.98)',
                        padding: '5px 12px',
                        borderRadius: '6px',
                        border: isGoldEmbossed ? '1.5px solid #d97706' : '1.5px solid #1c1917',
                        boxShadow: isGoldEmbossed
                          ? `0 0 25px rgba(245, 158, 11, 0.85), inset 0 2px 4px rgba(255,255,255,0.9)`
                          : '0 3px 10px rgba(0,0,0,0.12)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '2px',
                        margin: '0 auto',
                        opacity: printedOpacity,
                        transform: isGoldEmbossed ? 'scale(1.05)' : 'scale(1)',
                        transition: 'all 0.3s ease',
                      }}
                    >
                      <img
                        src={kolliLogo}
                        alt="Kolli Graphics Official Logo"
                        style={{ height: '34px', width: 'auto', objectFit: 'contain' }}
                      />
                      <div style={{ fontSize: '6.5px', fontWeight: 900, color: isGoldEmbossed ? '#78350f' : '#0f172a', letterSpacing: '0.5px', whiteSpace: 'nowrap' }}>
                        KOLLI GRAPHICS PVT LTD
                      </div>
                    </div>

                    {/* Handling Icons & Barcode */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', opacity: printedOpacity }}>
                      <div style={{ display: 'flex', gap: '4px', color: '#1c1917', fontSize: '10px', fontWeight: 900 }}>
                        <span>🍷</span>
                        <span>⬆⬆</span>
                        <span>☂</span>
                      </div>
                      <div style={{ display: 'flex', gap: '1.5px', height: '10px', alignItems: 'flex-end' }}>
                        {[2, 1, 3, 1, 2, 3, 1, 2, 3, 1, 3].map((w, i) => (
                          <div key={i} style={{ width: `${w}px`, height: '100%', background: '#1c1917' }} />
                        ))}
                      </div>
                      <div style={{ fontSize: '6px', fontWeight: 900, color: '#1c1917' }}>
                        HEIDELBERG XL 106
                      </div>
                    </div>

                    {/* ── PANEL 1: LEFT SIDE PANEL (HINGED TO LEFT OF PANEL 2) ── */}
                    <div
                      style={{
                        position: 'absolute',
                        width: `${PW_SIDE}px`,
                        height: `${PH}px`,
                        right: '100%',
                        top: 0,
                        background: '#c4812b',
                        border: `2.5px solid ${kraftBorder}`,
                        transformOrigin: 'right center',
                        transform: `rotateY(${-activeFoldAngle}deg)`,
                        padding: '8px 6px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        boxSizing: 'border-box',
                        transformStyle: 'preserve-3d',
                      }}
                    >
                      <div style={{ fontSize: '6.5px', fontWeight: 900, color: '#1c1917', letterSpacing: '0.6px' }}>
                        HANDLE WITH CARE
                      </div>
                      <div
                        style={{
                          background: 'rgba(255, 255, 255, 0.9)',
                          padding: '3px 6px',
                          borderRadius: '4px',
                          border: '1px solid #1c1917',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          opacity: printedOpacity,
                        }}
                      >
                        <img src={kolliLogo} alt="Left Seal" style={{ height: '20px', width: 'auto' }} />
                      </div>
                      <div style={{ fontSize: '6px', color: '#1c1917', fontWeight: 800 }}>
                        CHERLAPALLY WORKS
                      </div>

                      {/* ── GLUE TAB (HINGED TO LEFT OF PANEL 1 - TUCKED INSIDE) ── */}
                      <div
                        style={{
                          position: 'absolute',
                          width: `${TAB_W}px`,
                          height: `${PH}px`,
                          right: '100%',
                          top: 0,
                          background: kraftInner,
                          border: `1.5px solid ${kraftBorder}`,
                          borderRadius: '3px 0 0 3px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transformOrigin: 'right center',
                          transform: `rotateY(${-activeFoldAngle}deg)`,
                          boxSizing: 'border-box',
                        }}
                      />
                    </div>

                    {/* ── PANEL 3: RIGHT SIDE PANEL (HINGED TO RIGHT OF PANEL 2) ─ */}
                    <div
                      style={{
                        position: 'absolute',
                        width: `${PW_SIDE}px`,
                        height: `${PH}px`,
                        left: '100%',
                        top: 0,
                        background: `linear-gradient(135deg, ${kraftOuter} 0%, #b87522 100%)`,
                        border: `2.5px solid ${kraftBorder}`,
                        transformOrigin: 'left center',
                        transform: `rotateY(${activeFoldAngle}deg)`,
                        padding: '8px 6px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        boxSizing: 'border-box',
                        transformStyle: 'preserve-3d',
                      }}
                    >
                      <div style={{ fontSize: '6.5px', fontWeight: 900, color: '#1c1917', letterSpacing: '0.6px' }}>
                        BOBST DIE-CUT
                      </div>
                      <div
                        style={{
                          background: 'rgba(255, 255, 255, 0.9)',
                          padding: '3px 6px',
                          borderRadius: '4px',
                          border: '1px solid #1c1917',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          opacity: printedOpacity,
                        }}
                      >
                        <img src={kolliLogo} alt="Right Seal" style={{ height: '20px', width: 'auto' }} />
                      </div>
                      <div style={{ fontSize: '6px', color: '#1c1917', fontWeight: 800 }}>
                        ISO 9001:2015
                      </div>

                      {/* Right Top Flap */}
                      <div
                        style={{
                          position: 'absolute',
                          width: `${PW_SIDE}px`,
                          height: `${flapH}px`,
                          bottom: '100%',
                          left: 0,
                          background: `linear-gradient(180deg, ${kraftOuter} 0%, #b87522 100%)`,
                          border: `2.5px solid ${kraftBorder}`,
                          borderRadius: '3px 3px 0 0',
                          transformOrigin: 'bottom center',
                          transform: `rotateX(${lerp(0, -flapAngle, effectiveFoldT)}deg)`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxSizing: 'border-box',
                        }}
                      />

                      {/* ── PANEL 4: BACK PANEL (HINGED TO RIGHT OF PANEL 3) ── */}
                      <div
                        style={{
                          position: 'absolute',
                          width: `${PW_FRONT}px`,
                          height: `${PH}px`,
                          left: '100%',
                          top: 0,
                          background: kraftInner,
                          border: `2.5px solid ${kraftBorder}`,
                          transformOrigin: 'left center',
                          transform: `rotateY(${activeFoldAngle}deg)`,
                          padding: '10px',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxSizing: 'border-box',
                          transformStyle: 'preserve-3d',
                        }}
                      >
                        <img
                          src={kolliLogo}
                          alt="Back Seal"
                          style={{ height: '24px', width: 'auto', opacity: printedOpacity * 0.7, filter: 'grayscale(0.6)' }}
                        />
                        <div style={{ fontSize: '6.5px', fontWeight: 900, color: '#1c1917', marginTop: '4px', letterSpacing: '0.8px' }}>
                          QUALITY & FINISHING FIRST
                        </div>

                        {/* Back Top Flap */}
                        <div
                          style={{
                            position: 'absolute',
                            width: `${PW_FRONT}px`,
                            height: `${flapH}px`,
                            bottom: '100%',
                            left: 0,
                            background: `linear-gradient(180deg, #b87522 0%, ${kraftOuter} 100%)`,
                            border: `2.5px solid ${kraftBorder}`,
                            borderRadius: '3px 3px 0 0',
                            transformOrigin: 'bottom center',
                            transform: `rotateX(${lerp(0, -flapAngle, effectiveFoldT)}deg)`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxSizing: 'border-box',
                          }}
                        />
                      </div>
                    </div>

                    {/* Front Top Flap */}
                    <div
                      style={{
                        position: 'absolute',
                        width: `${PW_FRONT}px`,
                        height: `${flapH}px`,
                        bottom: '100%',
                        left: 0,
                        background: `linear-gradient(180deg, ${kraftOuter} 0%, #cf8c36 100%)`,
                        border: `2.5px solid ${kraftBorder}`,
                        borderRadius: '3px 3px 0 0',
                        transformOrigin: 'bottom center',
                        transform: `rotateX(${lerp(0, flapAngle, effectiveFoldT)}deg)`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxSizing: 'border-box',
                      }}
                    >
                      <div style={{ fontSize: '7px', fontWeight: 900, color: '#1c1917', letterSpacing: '0.8px', opacity: 0.8 }}>
                        KOLLI GRAPHICS
                      </div>
                    </div>

                    {/* Front Bottom Major Floor Flap (Folds INSIDE under the box base) */}
                    <div
                      style={{
                        position: 'absolute',
                        width: `${PW_FRONT}px`,
                        height: `${PW_SIDE}px`,
                        top: '100%',
                        left: 0,
                        background: kraftFloor,
                        border: `2.5px solid ${kraftBorder}`,
                        transformOrigin: 'top center',
                        transform: `rotateX(${-activeFoldAngle}deg)`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxSizing: 'border-box',
                        boxShadow: 'inset 0 0 15px rgba(0,0,0,0.3)',
                      }}
                    />
                  </div>

                  {/* ════════ STAGE 02 APPARATUS: LASER CALIPER SCAN ════════ */}
                  {progress >= 0.15 && progress < 0.28 && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '-60px',
                        bottom: '-60px',
                        left: `${caliperScanX}%`,
                        transform: 'translateX(-50%)',
                        width: '3px',
                        background: '#0284c7',
                        boxShadow: '0 0 16px #0284c7, 0 0 32px #0284c7',
                        zIndex: 40,
                      }}
                    >
                      <div style={{ position: 'absolute', top: '10px', left: '6px', background: '#0284c7', color: '#ffffff', fontSize: '7.5px', fontWeight: 900, padding: '2px 6px', borderRadius: '3px', whiteSpace: 'nowrap' }}>
                        450 µm LASER CALIPER
                      </div>
                    </div>
                  )}

                  {/* ════════ STAGE 03 APPARATUS: INK ROLLERS & UV LIGHT ════════ */}
                  {progress >= 0.28 && progress < 0.42 && (
                    <div
                      style={{
                        position: 'absolute',
                        left: '-160px',
                        right: '-160px',
                        top: `calc(50% + ${rollerPosY}px)`,
                        transform: 'translateY(-50%) translateZ(30px)',
                        zIndex: 50,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        background: 'linear-gradient(90deg, #00aeef 0%, #ec008c 25%, #f59e0b 50%, #111827 75%, #dc2626 100%)',
                        padding: '4px 14px',
                        borderRadius: '999px',
                        border: '2px solid #ffffff',
                        boxShadow: '0 0 25px rgba(0, 174, 239, 0.8), 0 8px 24px rgba(0,0,0,0.5)',
                      }}
                    >
                      <span style={{ fontSize: '8px', fontWeight: 950, color: '#ffffff', letterSpacing: '1px' }}>
                        HEIDELBERG 6-COLOUR FLEXO UV INK ROLLERS (18,000 SPH)
                      </span>
                    </div>
                  )}

                  {/* ════════ STAGE 04 APPARATUS: STEEL CREASING RULES ════════ */}
                  {progress >= 0.42 && progress < 0.56 && (
                    <div
                      style={{
                        position: 'absolute',
                        inset: '-10px -120px',
                        transform: `translateY(${creasingDieY}px) translateZ(20px)`,
                        border: '2px dashed #7c3aed',
                        borderRadius: '6px',
                        zIndex: 50,
                        pointerEvents: 'none',
                      }}
                    >
                      <div
                        style={{
                          position: 'absolute',
                          top: '50%',
                          left: `${laserX}%`,
                          transform: 'translate(-50%, -50%)',
                          width: '14px',
                          height: '14px',
                          borderRadius: '50%',
                          background: '#ec008c',
                          boxShadow: '0 0 16px #ec008c, 0 0 32px #ec008c',
                        }}
                      />
                    </div>
                  )}

                  {/* ════════ STAGE 05 APPARATUS: 180 BAR HYDRAULIC BRASS DIE ════ */}
                  {progress >= 0.56 && progress < 0.70 && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: `translate(-50%, -50%) translateY(${dieTranslateY}px) translateZ(${dieTranslateZ}px)`,
                        zIndex: 60,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        pointerEvents: 'none',
                      }}
                    >
                      {/* Chrome Hydraulic Piston Shaft above the die */}
                      <div
                        style={{
                          position: 'absolute',
                          bottom: '100%',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          width: '18px',
                          height: '150px',
                          background: 'linear-gradient(90deg, #64748b 0%, #cbd5e1 35%, #ffffff 50%, #94a3b8 70%, #475569 100%)',
                          borderRadius: '6px 6px 0 0',
                          boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
                          border: '1px solid rgba(255,255,255,0.6)',
                        }}
                      />

                      {/* Heated 24K Brass Stamping Die Block */}
                      <div
                        style={{
                          position: 'relative',
                          background: 'linear-gradient(135deg, #b45309 0%, #fef08a 35%, #f59e0b 60%, #b45309 85%, #fef08a 100%)',
                          border: '2px solid #ffffff',
                          borderRadius: '8px',
                          padding: '10px 22px',
                          boxShadow: isDieContact
                            ? `0 0 ${45 + foilGlow * 30}px rgba(245, 158, 11, 1), 0 0 90px rgba(234, 179, 8, 0.8), 0 8px 30px rgba(0,0,0,0.6)`
                            : `0 0 20px rgba(245, 158, 11, 0.5), 0 12px 25px rgba(0,0,0,0.5)`,
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          transform: isDieContact ? 'scale(1.02)' : 'scale(1)',
                          transition: 'box-shadow 0.1s ease',
                        }}
                      >
                        <span style={{ fontSize: '9px', fontWeight: 950, color: '#451a03', letterSpacing: '1px' }}>
                          180 BAR BRASS DIE
                        </span>
                        <span style={{ fontSize: '7px', fontWeight: 900, color: '#78350f', background: 'rgba(255,255,255,0.92)', padding: '1px 6px', borderRadius: '3px', marginTop: '2px' }}>
                          165°C HYDRAULIC STAMP
                        </span>
                      </div>

                      {/* Radiant pressure sparks & contact glow when touching down */}
                      {isDieContact && (
                        <div
                          style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: '180px',
                            height: '110px',
                            borderRadius: '12px',
                            border: '2px solid #fef08a',
                            boxShadow: '0 0 40px #f59e0b, inset 0 0 25px #fef08a',
                            pointerEvents: 'none',
                          }}
                        />
                      )}
                    </div>
                  )}

                  {/* ════════ STAGE 06 APPARATUS: ROTARY SLOTTING WASTE ════════ */}
                  {progress >= 0.70 && progress < 0.75 && (
                    <>
                      {[1, 2, 3].map((slot) => (
                        <div
                          key={slot}
                          style={{
                            position: 'absolute',
                            top: '-80px',
                            left: `${slot * 90 - 120}px`,
                            width: '8px',
                            height: '24px',
                            background: '#8f5919',
                            border: '1px solid #1c1917',
                            transform: `translateY(${wasteDropY}px) rotate(${slot * 25}deg)`,
                            opacity: wasteOpacity,
                          }}
                        />
                      ))}
                    </>
                  )}
                </div>
              )}

              {/* ══════════════════════════════════════════════════════════════
                  CASE C: STAGE 07 (DISPATCH) — 3-BOX PYRAMID STACK WITH FALLING ANIMATION
                  2 sealed shipping cartons at bottom + 1 box neatly falling & landing on top
                 ══════════════════════════════════════════════════════════════ */}
              {progress >= 0.86 && (() => {
                const s7Progress = clamp((progress - 0.86) / 0.14, 0, 1)
                const s7Ease = easeOutCubic(s7Progress)
                const leftBoxX = -92
                const rightBoxX = 92
                const bottomBoxY = 65
                const topBoxY = lerp(-260, -105, s7Ease)

                return (
                  <div
                    style={{
                      position: 'relative',
                      width: `${PW_FRONT}px`,
                      height: `${PH}px`,
                      transformStyle: 'preserve-3d',
                      transform: 'translateY(42px)',
                    }}
                  >
                    {/* Top-Center Box (Neatly falling and landing on top of bottom two boxes) */}
                    {renderSolidBox('stack-top-box', {
                      transform: `translate3d(0px, ${topBoxY}px, 20px) rotateY(0deg)`,
                      zIndex: 25,
                    }, true, true)}

                    {/* Bottom-Left Box */}
                    {renderSolidBox('stack-bottom-left', {
                      transform: `translate3d(${leftBoxX}px, ${bottomBoxY}px, -10px) rotateY(0deg)`,
                      zIndex: 10,
                    }, true, true)}

                    {/* Bottom-Right Box */}
                    {renderSolidBox('stack-bottom-right', {
                      transform: `translate3d(${rightBoxX}px, ${bottomBoxY}px, 0px) rotateY(0deg)`,
                      zIndex: 15,
                    }, true, true)}
                  </div>
                )
              })()}
            </div>

            {/* Interactive 3D Rotation Badge */}
            <div
              style={{
                position: 'absolute',
                bottom: '4px',
                background: 'rgba(255, 255, 255, 0.95)',
                border: '1px solid rgba(0, 0, 0, 0.1)',
                padding: '6px 14px',
                borderRadius: '999px',
                fontSize: '11px',
                fontWeight: 750,
                color: '#334155',
                boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
                backdropFilter: 'blur(8px)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                pointerEvents: 'none',
              }}
            >
              <span>🖐</span>
              <span>Click & drag to rotate 3D model</span>
            </div>
          </div>

          {/* ── RIGHT COLUMN: DYNAMIC EQUIPMENT SPECS & QUALITY ASSURANCE ── */}
          <div
            key={`right-col-${activeStep}`}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              zIndex: 30,
              animation: 'smoothSlideIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
            }}
          >
            {/* Equipment & Process Specs Card */}
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.92)',
                border: '1px solid rgba(0, 0, 0, 0.08)',
                borderRadius: '12px',
                padding: '18px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
                backdropFilter: 'blur(10px)',
                display: 'flex',
                flexDirection: 'column',
                gap: '11px',
              }}
            >
              {/* Process Step Metric Bar */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: 800, color: '#64748b' }}>
                  <span>{curStage.equipmentTitle}</span>
                  <span style={{ color: curStage.badgeColor }}>{curStage.telemetry.pct}% COMPLETE</span>
                </div>
                <div style={{ width: '100%', height: '5px', background: '#e2e8f0', borderRadius: '3px', marginTop: '5px', overflow: 'hidden' }}>
                  <div
                    style={{
                      height: '100%',
                      width: `${curStage.telemetry.pct}%`,
                      background: curStage.badgeColor,
                      transition: 'width 0.4s ease',
                    }}
                  />
                </div>
              </div>

              {/* Technical Specifications List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
                {curStage.equipmentSpecs.map((spec, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12.5px' }}>
                    <span style={{ color: '#64748b', fontWeight: 650 }}>{spec.label}</span>
                    <span style={{ color: '#0f172a', fontWeight: 800 }}>{spec.value}</span>
                  </div>
                ))}
              </div>

              <div style={{ width: '100%', height: '1px', background: 'rgba(0, 0, 0, 0.06)', margin: '3px 0' }} />

              <div style={{ fontSize: '10.5px', letterSpacing: '2px', color: '#64748b', textTransform: 'uppercase', fontWeight: 800 }}>
                {curStage.capabilityTitle}
              </div>

              {curStage.capabilityItems.map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#16a34a', flexShrink: 0 }} />
                  <span style={{ fontSize: '12.5px', color: '#334155', fontWeight: 600 }}>{item}</span>
                </div>
              ))}
            </div>

            {/* Equipment Catalogue Link */}
            <a
              href="/equipment"
              style={{
                background: 'rgba(255, 255, 255, 0.9)',
                border: '1px solid rgba(0, 0, 0, 0.08)',
                padding: '13px 16px',
                borderRadius: '10px',
                color: '#0f172a',
                textDecoration: 'none',
                fontSize: '13px',
                fontWeight: 750,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.02)',
              }}
            >
              <span>View Full Machinery Line</span>
              <span>→</span>
            </a>
          </div>
        </main>

        {/* ── BOTTOM TIMELINE PROGRESS BAR & FACILITY ADDRESS ─────────── */}
        <footer
          style={{
            position: 'relative',
            zIndex: 40,
            padding: '0 36px 14px 36px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          {/* Full-width Timeline Progress Bar */}
          <div style={{ position: 'relative', width: '100%', height: '4px', background: 'rgba(0, 0, 0, 0.08)', borderRadius: '999px' }}>
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                bottom: 0,
                width: `${progress * 100}%`,
                background: 'linear-gradient(90deg, #dc2626 0%, #ec008c 50%, #f59e0b 100%)',
                borderRadius: '999px',
                boxShadow: '0 0 10px rgba(220, 38, 38, 0.6)',
              }}
            />
            {/* Step Markers */}
            {STAGES.map((_, i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  top: '-3px',
                  left: `${(i / (STAGES.length - 1)) * 100}%`,
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  transform: 'translateX(-50%)',
                  background: progress >= i / (STAGES.length - 1) ? '#0f172a' : '#cbd5e1',
                  border: '2px solid #f8f6f0',
                  transition: 'background 0.2s',
                }}
              />
            ))}
          </div>

          {/* Footer Metadata */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', color: '#64748b', fontWeight: 600 }}>
            <div>
              <span>FACILITY: PLOT 44 A & B, PHASE V, IDA CHERLAPALLY, HYDERABAD — 500051</span>
            </div>
            <div style={{ display: 'flex', gap: '16px' }}>
              <span>HEIDELBERG SPEEDMASTER XL 106</span>
              <span>•</span>
              <span>BOBST NOVACUT 106 E</span>
              <span>•</span>
              <span>BOBST EXPERTFOLD 110</span>
            </div>
          </div>
        </footer>
      </div>

      {/* Global CSS Keyframes for Kinetic Animations */}
      <style>{`
        @keyframes smoothSlideIn {
          0% {
            opacity: 0;
            transform: translateY(16px);
            filter: blur(4px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0px);
          }
        }
      `}</style>
    </div>
  )
}
