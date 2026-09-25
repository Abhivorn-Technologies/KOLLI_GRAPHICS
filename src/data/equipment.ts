export interface EquipmentItem {
  id: string
  category: 'offset' | 'labels' | 'die-cutting' | 'finishing'
  name: string
  model: string
  tagline: string
  description: string
  highlights: string[]
  image: string
  badge: string
  specs?: {
    speed?: string
    capacity?: string
    coating?: string
    automation?: string
    country?: string
  }
}

export const EQUIPMENT_LIST: EquipmentItem[] = [
  {
    id: 'heidelberg-cd102',
    category: 'offset',
    name: 'Heidelberg CD 102 5 XL',
    model: 'CD 102 5 XL with Extended Delivery',
    tagline: 'High-Speed Color-Intensity Offset Press',
    description:
      'Equipped with an extended delivery section for extra inline drying, this Heidelberg press is engineered for high-impact, colour-intensity printing on a wide spectrum of paperboard substrates.',
    highlights: [
      'Extended delivery section for enhanced inline drying performance',
      'Engineered for maximum colour intensity and dot reproduction accuracy',
      'Massive throughput capacity for high-volume commercial packaging',
      'Ultra-precise automated ink key calibration and register control',
    ],
    image: '/assets/images/equipment/heidelberg-cd102.png',
    badge: 'Offset Lithography',
    specs: {
      speed: '15,000 Sheets/Hour',
      capacity: 'Up to 1.0mm Board Thickness',
      coating: 'Extended Drying & Inline Varnish',
      automation: 'CPC 1-04 Autoplate & Color Control',
      country: 'Germany',
    },
  },
  {
    id: 'komori-lithrone40',
    category: 'offset',
    name: 'Komori Lithrone 40 (6-Color)',
    model: 'Lithrone 40 6-Color + Aqueous Coater + Full UV Press',
    tagline: 'UV Offset Press with Inline Dual Coating',
    description:
      'A 6-color powerhouse equipped with an inline aqueous coater and full UV offset press capabilities. Enables instant UV curing, vibrant color laydown, and luxury protective coatings in a single uninterrupted pass.',
    highlights: [
      '6 high-precision printing units + aqueous and UV coaters',
      'Full UV curing technology for instant drying on non-porous and metallic boards',
      'Inline aqueous coating for dazzling sheen and scuff resistance',
      'Superior register accuracy and lightning-fast job make-readies',
    ],
    image: '/assets/images/equipment/komori-lithrone.png',
    badge: 'Full UV Offset',
    specs: {
      speed: '16,500 Sheets/Hour',
      capacity: '720 x 1030 mm Sheet Size',
      coating: 'Inline Aqueous & Full UV Curing',
      automation: 'KHS-AI Rapid Setup & SpectroControl',
      country: 'Japan',
    },
  },
  {
    id: 'omet-flexo',
    category: 'labels',
    name: 'OMET Self-Adhesive Labels Press',
    model: 'OMET Flexo with Cold Foil & Online Inspection',
    tagline: 'World-Class Rotary Flexo Printing & Converting',
    description:
      'Serving the rapidly growing self-adhesive label market across food, beverage, cosmetics, and pharmaceuticals. Our OMET press features rotary flexographic printing, cold foil stamping, precision slitting, rewinding, and advanced 100% online inspection.',
    highlights: [
      'Rotary flexo units suitable for films, metallic substrates, and thermal stock',
      'Integrated cold foil and precision varnish capabilities',
      'PRATI slitter & rewinder integration with Tubescan 100% inspection',
      'Ideal for track-and-trace, variable data, and luxury decorative labels',
    ],
    image: '/assets/images/equipment/omet-flexo.png',
    badge: 'Flexographic Labels',
    specs: {
      speed: '200 Meters/Minute',
      capacity: 'Narrow-Web 370mm Roll Width',
      coating: 'Rotary UV Varnish & Cold Foil',
      automation: 'Tubescan 100% Vision Inspection',
      country: 'Italy',
    },
  },
  {
    id: 'bobst-evoline',
    category: 'die-cutting',
    name: 'BOBST SP Evoline 102 E',
    model: 'SP Evoline 102 E Automatic Die-Cutter',
    tagline: 'Next-Gen Automatic Stripping & Blanking',
    description:
      'Eliminates time-consuming hand stripping of waste, cutting labor costs, enhancing product quality, and supercharging productivity. Blanked cartons produced are perfectly flat and undistorted for maximum folder-gluer speeds.',
    highlights: [
      'Automatic internal waste stripping and edge separation',
      'Yields perfectly flat, undistorted blanks for high-speed folding',
      'Drastically cuts manual labor and eliminates turnaround bottlenecks',
      'Legendary Swiss BOBST cutting precision across complex keylines',
    ],
    image: '/assets/images/equipment/bobst-evoline.png',
    badge: 'Automatic Die Cutting',
    specs: {
      speed: '7,500 Sheets/Hour',
      capacity: '720 x 1020 mm Cutting Size',
      coating: 'Platen Pressure 250 Tonnes',
      automation: 'Autoplaten Centerline System',
      country: 'Switzerland',
    },
  },
  {
    id: 'bobst-sp102e',
    category: 'die-cutting',
    name: 'BOBST SP 102 E Die Cutters',
    model: 'SP 102 E High-Reliability Die Cutters',
    tagline: 'Proven Industrial Die-Cutting Leader',
    description:
      'A proven leader in the die-cutting industry, the SP 102 E is a reliable, high-quality die-cutter. Equipped with an automatic stripping unit, eliminating the cost and variability of hand stripping.',
    highlights: [
      'Heavy-duty platen tonnage for clean creasing and razor-sharp cuts',
      'Integrated automatic stripping unit',
      'Consistent repeatability for continuous multi-shift production',
      'Handles solid bleached board, kraft, and micro-flute corrugate',
    ],
    image: '/assets/images/equipment/bobst-sp102.png',
    badge: 'Industrial Die Cutting',
    specs: {
      speed: '7,500 Sheets/Hour',
      capacity: 'Paper, Board & Corrugated',
      coating: 'Micron-Tolerance Crease Scoring',
      automation: 'Continuous Feeder & Non-Stop Delivery',
      country: 'Switzerland',
    },
  },
  {
    id: 'bobst-102bma',
    category: 'die-cutting',
    name: 'BOBST 102 BMA Foil Stamper',
    model: '102 BMA High-Precision Foil Stamper & Embossing',
    tagline: 'Turning Foiling and Embossing Visions into Reality',
    description:
      'For foil stamping and relief embossing, this machine turns decorative visions into reality with exacting heat zone distribution, foil roll tension control, and micrometer register accuracy.',
    highlights: [
      'Dedicated multi-foil roll feeding system for complex multi-color designs',
      'High-tonnage heated platen for razor-sharp relief embossing',
      'Registered combination foil embossing in a single pass',
      'Handles metallic, holographic, pigmented, and security foils',
    ],
    image: '/assets/images/equipment/bobst-bma.png',
    badge: 'Foil & Emboss',
    specs: {
      speed: '6,500 Sheets/Hour',
      capacity: '12 Heated Independent Zones',
      coating: 'Multi-Roll Metallic & Holographic Foil',
      automation: 'Electronic Foil Advance & Register',
      country: 'Switzerland',
    },
  },
  {
    id: 'bobst-domino',
    category: 'finishing',
    name: 'BOBST Domino Folder / Gluer',
    model: 'Domino High-Speed Automated Folder/Gluer',
    tagline: 'High-Speed Straight-Line Folding & Gluing',
    description:
      'High-speed Folder/Gluer with inserting capabilities, cold PVA and hot-melt gluing systems, and an integrated HandyPack module at the delivery end for fast, ergonomic collection of finished cartons.',
    highlights: [
      'High-speed straight-line, crash bottom, and envelope folding',
      'Dual cold PVA and hot-melt electronic glue application systems',
      'Integrated HandyPack module at delivery for seamless packing',
      'Electronic code and glue detection sensors',
    ],
    image: '/assets/images/equipment/bobst-domino.png',
    badge: 'Folder / Gluer',
    specs: {
      speed: '400 Meters/Minute',
      capacity: 'Crash-Bottom & Lock-Base Cartons',
      coating: 'Dual Cold & Hot Melt Adhesives',
      automation: 'HandyPack Automated Delivery',
      country: 'Switzerland',
    },
  },
  {
    id: 'bobst-media',
    category: 'finishing',
    name: 'BOBST Media Folder / Gluer',
    model: 'Media High-Speed 4 & 6 Corner Box Maker',
    tagline: 'Multi-Corner & Specialty Structural Gluing',
    description:
      'Capable of producing complex 4-corner and 6-corner boxes apart from conventional cartons, with high-precision adhesive placement and HandyPack integration for continuous packing efficiency.',
    highlights: [
      'Specialized 4-corner and 6-corner collapsible tray folding units',
      'Hot-melt and cold adhesive application with micron accuracy',
      'HandyPack unit for continuous, high-efficiency packing lines',
      'Handles micro-flute, carton board, and heavy solid boards',
    ],
    image: '/assets/images/equipment/bobst-media.png',
    badge: '4 & 6 Corner Boxes',
    specs: {
      speed: '350 Meters/Minute',
      capacity: '4 & 6 Corner Trays & Boxes',
      coating: 'Precision Electronic Spray Gluing',
      automation: 'Automatic Hook System & HandyPack',
      country: 'Switzerland',
    },
  },
  {
    id: 'zekong-box-maker',
    category: 'finishing',
    name: 'ZEKONG Automated Box Maker',
    model: 'ZEKONG Multi-Wall Box Producer',
    tagline: 'Engineered Sidewall and Rigid Box Production',
    description:
      'Automated manufacturing of Single Sidewall, Double End wall, Double Sidewall, and Double Glued Sidewall boxes with robust structural integrity for luxury packaging.',
    highlights: [
      'Single and Double Sidewall high-speed construction',
      'Double End Wall and Double Glued Sidewall automation',
      'Heavy-duty rigid framework for confectionery & luxury boxes',
      'Seamless integration into downstream automated packaging workflows',
    ],
    image: '/assets/images/equipment/zekong-box.png',
    badge: 'Rigid Box Forming',
    specs: {
      speed: '120 Boxes/Minute',
      capacity: 'Double Sidewall & End Wall',
      coating: 'Hot Melt Structural Adhesive',
      automation: 'PLC Touchscreen Control',
      country: 'Automated Line',
    },
  },
  {
    id: 'automated-finishing-lines',
    category: 'finishing',
    name: 'Automated Finishing & Packaging Lines',
    model: 'DGM Pasting, Guillotines, ATS Banding & Box Sealing',
    tagline: 'End-to-End Plant Floor Automation',
    description:
      'Our 43,000 sq.ft. facility houses automated guillotine cutters, DGM pasting machines with online inspection, HandyPacks, ATS banding machinery, waste stripping machines, and automatic box sealing systems.',
    highlights: [
      'Automated Guillotine Cutters for micro-accurate sheet squaring',
      'DGM Pasting machine with online high-speed vision inspection',
      'ATS Banding Machinery for damage-free bundle securing',
      'Automatic Box Sealing machines ensuring secure outer packaging',
    ],
    image: '/assets/images/equipment/automated-finishing.png',
    badge: 'Automated Line',
    specs: {
      speed: 'Continuous 24/7 Operations',
      capacity: '43,000 sq.ft. Plant Throughput',
      coating: 'Vision Inspection & Bundle Strapping',
      automation: 'Fully Integrated Plant Automation',
      country: 'Hyderabad Works Facility',
    },
  },
]
