export interface CartonTypeDetail {
  id: string
  code: string
  title: string
  subtitle: string
  description: string
  advantages: string[]
  bestFor: string[]
  image: string
  foldingConcept: string
}

export interface ProductCategory {
  id: string
  title: string
  subtitle: string
  description: string
  items: string[]
}

export const CARTON_TYPES: CartonTypeDetail[] = [
  {
    id: 'straight-tuck',
    code: 'ST',
    title: 'Straight Tuck Box',
    subtitle: 'Classic Precision Packaging',
    description:
      'Straight tuck boxes are one of the most common types of boxes that work for a variety of industries. The top and bottom closure panels are attached to the same main panel, folding from front to back in the exact same direction with slit locks securing the tucks cleanly in place.',
    advantages: [
      'Clean front-facing aesthetics with no raw cut edges exposed',
      'Both flaps fold from front to back in the same direction',
      'Integrated slit locks that securely lock tucks in place',
      'Perfect for automated and hand packaging lines',
    ],
    bestFor: ['Cosmetics', 'Pharmaceuticals', 'Luxury Personal Care', 'Retail Goods'],
    image: '/assets/images/cartons/straight-tuck-box.png',
    foldingConcept:
      'Dual flaps attached to the same primary panel fold inward in identical orientation.',
  },
  {
    id: 'reverse-tuck',
    code: 'RT',
    title: 'Reverse Tuck Box',
    subtitle: 'High-Efficiency Paperboard Utilization',
    description:
      'Reverse tuck boxes are very similar to straight tuck boxes, except for the closing panels. One closing panel is attached to the back of the box, while the other closing panel is attached to the front. They fold in opposite directions.',
    advantages: [
      'Lower manufacturing cost through optimal sheet nesting on paperboard',
      'Opens and closes in a very intuitive, familiar way for customers',
      'Works seamlessly with any embellishment (UV, foiling, embossing)',
      'Available in all custom sizes, grammages, and substrates',
    ],
    bestFor: [
      'FMCG Products',
      'Pharmaceutical Cartons',
      'Hardware & Electronics',
      'Cost-Optimized High Runs',
    ],
    image: '/assets/images/cartons/reverse-tuck-box.png',
    foldingConcept:
      'Opposing flaps fold in opposite directions (top folds back-to-front, bottom folds front-to-back).',
  },
  {
    id: 'lock-bottom',
    code: 'LB',
    title: 'Lock Bottom Box (1-2-3 Bottom)',
    subtitle: 'Reinforced Heavy-Item Support',
    description:
      'Also called 1-2-3 bottom boxes, lock bottom boxes are especially designed to hold heavier items. The bottom flaps push into each other, forming a very sturdy base that won’t open under the weight of the product inside. Top closure features a tuck top with friction or slit locks.',
    advantages: [
      'Secure closure: interlocking flaps prevent accidental drops or blowouts',
      'Easy assembly: fast manual 1-2-3 lock sequence on packaging floors',
      'Enhanced protection: reinforced multi-layered bottom for heavier items',
      'Space efficiency: collapsible design stored flat to reduce shipping costs',
    ],
    bestFor: ['Heavy Glass Bottles', 'Healthcare Supplements', 'Hardware', 'Fragile Liquids'],
    image: '/assets/images/cartons/lock-bottom-box.png',
    foldingConcept:
      'Four precision bottom flaps interlock in a 1-2-3 sequence to support substantial weight.',
  },
  {
    id: 'crash-bottom',
    code: 'CB',
    title: 'Crash Bottom Box (Auto-Lock)',
    subtitle: 'Instant Rapid-Assembly Base',
    description:
      'Crash bottom boxes, or auto-lock bottom, are another superior choice to package heavier items that need extra bottom support. They are pre-glued on our high-speed BOBST & DGM folder-gluers so that pushing opposite corners snaps the bottom instantly into a rigid locked base.',
    advantages: [
      'Pre-glued automated bottom pops open in a fraction of a second',
      'Handles heavy products with high structural rigidity',
      'Massive packaging line labor savings and speed acceleration',
      'Fully compatible with gloss UV, matt coatings, and foil embellishments',
    ],
    bestFor: ['High-Speed Assembly Lines', 'Bottled Goods', 'Pharma Syrups', 'Retail Kits'],
    image: '/assets/images/cartons/crash-bottom-box.png',
    foldingConcept:
      'Pre-glued diagonal fold snaps automatically into place when the carton is squared.',
  },
  {
    id: 'tuck-top',
    code: 'TT',
    title: 'One-Piece Tuck Top Boxes',
    subtitle: 'Double-Wall Structural Durability',
    description:
      'The tuck top box is a very strong and durable box type thanks to its double side walls. As a shape, it is similar to a mailer box, but crafted out of premium paperboard. The double-wall tuck top box has one opening at the top, with two closing flaps that fold into the bottom with a friction lock.',
    advantages: [
      'Double side walls provide exceptional stacking strength and crush resistance',
      'Seamless hinged lid opening delivers a premium unboxing experience',
      'Secure friction locks eliminate the need for exterior adhesive sealing tape',
      'Vibrant internal printing surface for branded storytelling',
    ],
    bestFor: [
      'E-commerce Mailers',
      'Premium Confectionery',
      'Sample Presentation Kits',
      'Gift Sets',
    ],
    image: '/assets/images/cartons/tuck-top-box.png',
    foldingConcept: 'Single sheet with roll-over double side walls and integrated top tuck lid.',
  },
  {
    id: 'two-piece',
    code: 'TP',
    title: 'Two-Piece Boxes (Simplex / Kwikset Tray)',
    subtitle: 'Luxury Tray & Lid Architecture',
    description:
      'Also called Simplex Tray or Kwikset Tray, two-piece boxes are an elegant packaging solution that works for any kind of product, especially for luxury products, sweet assortments, or product kits with multiple items. Formed of an independent tray and lid, both featuring double-wall structure.',
    advantages: [
      'Independent tray and lid structure creating a ritualistic reveal',
      'Double-wall framework delivers heavy rigidity and durability',
      'Accommodates custom die-cut inner partitions and inserts',
      'Superior shelf presence and perceived luxury value',
    ],
    bestFor: [
      'Luxury Gifting',
      'Chocolates & Sweets',
      'Apparel & Accessories',
      'Multi-Component Kits',
    ],
    image: '/assets/images/cartons/two-piece-box.png',
    foldingConcept:
      'Separate precision base tray and matching telescoping lid with rolled sidewalls.',
  },
  {
    id: 'sleeve-packaging',
    code: 'SE',
    title: 'Sleeve Packaging',
    subtitle: 'Dynamic Wrap-Around Customization',
    description:
      'A sleeve is an open-ended paperboard band that wraps snuggly around a product container, tray, or primary box, adding another level of customization, security, and tactile branding without altering primary container tooling.',
    advantages: [
      'Cost-effective seasonal, promotional, or regional packaging variations',
      'Can feature intricate die-cut windows, foil stamping, and tactile emboss',
      'Slides smoothly over basic containers to upgrade presentation instantly',
      'Quick turnaround for limited edition batches',
    ],
    bestFor: [
      'Food Trays',
      'Ready Meals',
      'Soap & Bath Bars',
      'Cosmetic Tins',
      'Promotional Bundles',
    ],
    image: '/assets/images/cartons/sleeve-packaging.png',
    foldingConcept:
      'Continuous scored band with high-speed side seam gluing that slides effortlessly over core containers.',
  },
  {
    id: 'embossed-boxes',
    code: 'EB',
    title: 'Custom Embossed Boxes',
    subtitle: 'Tactile Brand Distinction & Luxury Depth',
    description:
      'Custom embossed boxes combine aesthetics and functionality, presenting your products with a touch of elegance that resonates with customers and showcases your brand’s commitment to excellence. Using hand-tooled brass dies and multi-level sculpturing, impressions rise gracefully from the paperboard.',
    advantages: [
      'Enhanced shelf presence: tactile 3D relief catches light and consumer touch',
      'Brand credibility: refined appearance instills immediate luxury trust',
      'Artistic expression: allows micro-detailing, sculptured crests, and bevels',
      'Can be combined with metallic hot foil stamping in one registered pass',
    ],
    bestFor: [
      'Perfumes & Fragrances',
      'High-End Spirits',
      'Gourmet Delicacies',
      'Cigarette Packaging',
    ],
    image: '/assets/images/cartons/straight-tuck-box.png',
    foldingConcept:
      'Raised substrate fibers sculpted under high tonnage pressure with registered foil.',
  },
]

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  {
    id: 'cartons',
    title: 'Cartons',
    subtitle: 'Specialty Mono & Folding Cartons',
    description:
      'Engineered for high-speed automated packaging and hand packaging lines with micron-perfect die-cutting and folding.',
    items: [
      'Standard Reverse Tuck',
      'French Reverse Tuck',
      'Standard Straight Tuck',
      'Snap Lock Bottom, Top Hinged from Rear',
      'Snap Lock Bottom, Top Hinged from Front',
      'Auto Lock Bottom, Top Hinged from Rear',
      'Auto Lock Bottom, Top Hinged from Front',
      'Video - Side Load and Bottom Load',
    ],
  },
  {
    id: 'tray-boxes',
    title: 'Tray Boxes',
    subtitle: 'Structural & Rolled Wall Trays',
    description:
      'Rigid, double-walled, and corner-glued tray configurations designed for confectionery, retail display, and luxury presentation.',
    items: [
      'Four Corner Glued Trays',
      'Six Corner Integrated Boxes',
      'Single Sidewall Trays',
      'Double End Wall Boxes',
      'Double Sidewall Rigid Boxes',
      'Double Glued Sidewall Trays',
      'Roll Two Sides',
      'Roll Two Sides, Tuck Top',
      'Roll Two Angle Sides, Tuck Top',
      'Roll Three Sides, Tuck Top',
      'Roll Three Angle Sides, Tuck Top',
      'Roll Four Sides Trays',
    ],
  },
  {
    id: 'cigarette',
    title: 'Cigarette Packaging',
    subtitle: 'High-Precision Specialty HLP & Labels',
    description:
      'Ultra-high-tolerance hinge lid packs and soft pack labels crafted to exact international manufacturing keylines with flawless foil embossing.',
    items: [
      'Cigarette HLP (Hinge Lid Packs)',
      'Soft Pack Labels',
      'Fockey Keyline HLPs',
      'GD Keyline HLPs',
      'Round Corner HLPs',
      'Bevel Edge HLPs',
    ],
  },
  {
    id: 'specialty-packaging',
    title: 'Specialty Packaging Solutions',
    subtitle: 'Custom Engineered Configurations',
    description:
      'Tailored packaging products engineered from design to storage for complex industrial, medical, and FMCG requirements.',
    items: [
      'Mono Cartons with UV & Specialty Varnishes',
      'Auto-Lock Quick Erect Cartons',
      'Tuck-Top Mailer & Dispatch Cartons',
      'Four Corner & Six Corner Trays',
      'Inner Partition & Divider Boxes',
      'Custom Paperboard Sleeves',
    ],
  },
]

export const PRODUCTION_JOURNEY = [
  {
    step: '01',
    phase: 'DESIGN & PRE-PRESS',
    title: 'Pre-Press Calibration',
    description:
      'Recognizing that quality begins with pre-press, our experienced pre-press team calibrates color curves, verifies die keylines, and generates proof profiles.',
    icon: 'Layers',
  },
  {
    step: '02',
    phase: 'HIGH-PRECISION PRINT',
    title: 'Offset & UV Printing',
    description:
      'Executed on Heidelberg CD 102 5 XL and Komori Lithrone 40 6-color presses with inline aqueous & UV coating for intense color saturation.',
    icon: 'Printer',
  },
  {
    step: '03',
    phase: 'DIE-CUTTING & SCORING',
    title: 'BOBST Die-Cutting',
    description:
      'Precision steel rule dies mounted in automated BOBST SP Evoline 102 E cut and score blanks with automatic waste stripping for perfectly flat blanks.',
    icon: 'Scissors',
  },
  {
    step: '04',
    phase: 'LUXURY FINISHING',
    title: 'Embossing & Foil Stamping',
    description:
      'Multi-level embossing, micro-embossing, and metallic hot foil stamping via BOBST 102 BMA add dramatic tactile depth and metallic luster.',
    icon: 'Sparkles',
  },
  {
    step: '05',
    phase: 'AUTOMATED FOLDING',
    title: 'High-Speed Pasting & Gluing',
    description:
      'BOBST Domino, BOBST Media, and DGM folder-gluers run cold and hot-melt gluing with online inspection and HandyPack automated packing.',
    icon: 'Box',
  },
  {
    step: '06',
    phase: 'INSPECTION & STORAGE',
    title: 'Zero-Defect Packaging & Dispatch',
    description:
      'Secured in our 40,000 sq. ft. 24/7 CCTV-monitored facility, strapped with ATS banding machinery and delivered on-schedule.',
    icon: 'ShieldCheck',
  },
]
