export interface TeamMember {
  name: string
  role: string
  department: 'executive' | 'manufacturing'
  bio?: string
  focus?: string
}

export interface CompanyInfo {
  name: string
  shortName: string
  tagline: string
  mission: string
  motto: string
  culture: string
  foundedYear: number
  yearsOfExcellence: number
  facilitySizeSqFt: number
  securedSpaceSqFt: number
  location: string
  phone: string
  email: string
  contactPerson: string
  corporateOffice: {
    address: string
    city: string
    pincode: string
  }
  worksFacility: {
    address: string
    area: string
    city: string
    pincode: string
  }
  securityHighlights: string[]
}

export const COMPANY_INFO: CompanyInfo = {
  name: 'Kolli Graphics Private Limited',
  shortName: 'Kolli Graphics',
  tagline: 'Premier Printing, Packaging & Label Craftsmanship',
  mission:
    'We are full committed service oriented premier finishing company to provide high quality craftsmanship and service in the timely manner. We stand by this and work tirelessly to stand above our competitors to ensure that we meet your deadlines & deliver products that exceed customers’ expectations.',
  motto: 'Quality & Customer First',
  culture: 'Service & Quality First — openness, responsiveness, integrity, and respect.',
  foundedYear: 2009,
  yearsOfExcellence: 15,
  facilitySizeSqFt: 43000,
  securedSpaceSqFt: 40000,
  location: 'Hyderabad, Telangana, India',
  phone: '9849646688',
  email: 'rangarkolli@gmail.com',
  contactPerson: 'Ranga Reddy Kolli',
  corporateOffice: {
    address: '47 B, S R Nagar',
    city: 'Hyderabad',
    pincode: '500 038',
  },
  worksFacility: {
    address: 'Plot No 44 A & B, Phase V, IDA',
    area: 'Cherlapally',
    city: 'Hyderabad',
    pincode: '500 051',
  },
  securityHighlights: [
    '40,000 sq. ft. of secured manufacturing & storage space',
    '24/7 Security & Access-Controlled Environment',
    'Round-the-clock on-site security personnel',
    'Comprehensive CCTV monitoring across all zones',
    'Clean and centrally air-conditioned label environment',
    'Protected asset and artwork storage protocols',
  ],
}

export const EXECUTIVE_TEAM: TeamMember[] = [
  {
    name: 'Ranga Reddy Kolli',
    role: 'CEO & Founder',
    department: 'executive',
    bio: 'Founder and visionary behind Kolli Graphics Private Limited since 2009, steering continuous investment in world-class printing and finishing technologies.',
    focus: 'Strategic Leadership & Customer Partnerships',
  },
  {
    name: 'Parasurami Reddy Kolli',
    role: 'COO & Co-Founder',
    department: 'executive',
    bio: 'Oversees operational excellence, plant management, automated production lines, and adherence to strict quality control standards.',
    focus: 'Operations, Plant Automation & Production Delivery',
  },
]

export const MANUFACTURING_ROLES = [
  {
    title: 'Pre-Press Specialists',
    description:
      'Hiring the most experienced staff of pre-press professionals to guarantee color-accurate, high-fidelity reproduction from initial digital artwork.',
    badge: 'Pre-Press & Color Calibration',
  },
  {
    title: 'Offset & UV Press Masters',
    description:
      'Master operators commanding our Heidelberg CD 102 5 XL and Komori Lithrone 40 6-color presses with dual coating and full UV capability.',
    badge: 'Precision Lithography',
  },
  {
    title: 'BOBST Die-Cutting & Foiling Crew',
    description:
      'Specialists operating BOBST SP Evoline 102 E, 102 BMA, and automatic stripping die-cutters to deliver crisp, perfectly flat blanks.',
    badge: 'Finishing & Converting',
  },
  {
    title: 'Quality Assurance & Inspection Team',
    description:
      'Enforcing 100% optical inspection with Tubescan (<0.5mm defect detection) and online pasting inspection for zero-error delivery.',
    badge: 'Zero-Defect Quality Control',
  },
]
