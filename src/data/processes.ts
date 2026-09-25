export interface PrintingProcess {
  id: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  flowSteps: { step: string; label: string; desc: string }[];
  keyAttributes: string[];
  substrates: string[];
}

export interface FinishingMethod {
  id: string;
  name: string;
  type: 'carton' | 'label';
  tagline: string;
  description: string;
  effect: string;
  technicalDetails: string;
  visualCue: string;
  features: string[];
}

export const PRINTING_PROCESSES: PrintingProcess[] = [
  {
    id: 'offset',
    name: 'Printing – Offset',
    shortName: 'Offset Lithography',
    tagline: 'Mass-Production Precision Lithography',
    description: 'Offset printing, also called offset lithography, is a method of mass-production printing in which the images on metal plates are transferred (offset) to rubber blankets or rollers and then to the print media. The print media, usually paper, does not come into direct contact with the metal plates.',
    flowSteps: [
      { step: '01', label: 'Metal Plate', desc: 'Pre-press imaged aluminum plate receives ink on image areas and water on non-image areas.' },
      { step: '02', label: 'Rubber Blanket', desc: 'The ink image is transferred (offset) onto a flexible rubber blanket cylinder with micro-calibrated pressure.' },
      { step: '03', label: 'Print Substrate', desc: 'The rubber blanket deposits the vivid ink image directly onto paperboard without plate-to-sheet friction.' }
    ],
    keyAttributes: [
      'Supreme dot sharpness and micro-type definition',
      'Consistent, repeatable high-volume efficiency',
      'Dual coater integration for aqueous and full UV finishes',
      'Extended delivery ensures thorough drying for color intensity'
    ],
    substrates: ['FBB (Folding Box Board)', 'SBS / SCB', 'Greyback Board', 'Safire Graphic', 'Metallic Board']
  },
  {
    id: 'flexography',
    name: 'Printing – Flexography',
    shortName: 'Rotary Flexo',
    tagline: 'Flexible Relief Plates for Non-Porous & Film Substrates',
    description: 'Flexography (often abbreviated to flexo) is a form of printing process which utilizes a flexible relief plate. It is essentially a modern version of letterpress, evolved with high speed rotary functionality, which can be used for printing on almost any type of substrate, including plastic, metallic films, cellophane, and paper. It is widely used for printing on the non-porous substrates required for various types of food packaging (it is also well suited for printing large areas of solid colour).',
    flowSteps: [
      { step: '01', label: 'Relief Plate', desc: 'Flexible photopolymer plate featuring raised image elements is mounted onto rotary cylinder.' },
      { step: '02', label: 'Anilox & Ink', desc: 'Ceramic anilox roller transfers an exact, controlled film of fluid ink directly onto the raised plate cells.' },
      { step: '03', label: 'Fast-Dry Substrate', desc: 'High-speed rotary press prints onto film, label stock, or foil with inline cold foil and UV/heat curing.' }
    ],
    keyAttributes: [
      'Prints seamlessly across non-porous plastics, cellophane, metallic films, and paper',
      'Flawless laydown of vast solid color backgrounds',
      'Rotary high-speed performance ideal for label converting',
      'Food packaging compliance and fast UV-cured ink chemistries'
    ],
    substrates: ['Pressure-Sensitive Self-Adhesive Stocks', 'BOPP / PET Films', 'Metallic Foils', 'Thermal & Uncoated Paper']
  }
];

export const CARTON_FINISHING: FinishingMethod[] = [
  {
    id: 'uv-coating',
    name: 'UV Coating',
    type: 'carton',
    tagline: 'Dazzling High-Sheen Protection',
    description: 'The application of UV coatings to both enhance and protect a press sheet has become very popular in recent years. The dazzling sheen of a well coated printed piece certainly justifies the relative low cost of performing this operation. This UV Coating can be flood coat or spot coat with a variety of specialized coatings depending on customer specific needs.',
    effect: 'Deep glass-like gloss reflection or selective matte contrast that repels scratches and finger oils.',
    technicalDetails: 'Polymer resins cured instantly beneath intense UV ultraviolet radiationlamps.',
    visualCue: 'gloss-sweep',
    features: ['Flood Coat (full sheet coverage)', 'Spot UV (selective highlight enhancement)', 'Textured UV & Satin options', 'Superior scuff & abrasion resistance']
  },
  {
    id: 'die-cutting',
    name: 'Die Cutting',
    type: 'carton',
    tagline: 'Precision Steel Rule Blanking',
    description: 'Die cutting is achieved through the use of sharpened steel rules that have been inserted into a special plywood board. The dies are ruled out to exactly match the final cutting outline indicated by the designer via a rule out sheet or die vinyl. Once the press sheets are run through the die cutting press, the excess stock (non-live area) is stripped away leaving the final die cut configuration, or blank. These pieces are now ready for packing or for additional operations as required.',
    effect: 'Crisp, razor-sharp carton outlines and precise creasing rules for effortless folding.',
    technicalDetails: 'Executed on BOBST SP Evoline 102 E and SP 102 E with automatic stripping units.',
    visualCue: 'die-cut-outline',
    features: ['Zero hand-stripping distortion', 'Laser-accurate rule-out matching', 'Perfect crease depth for automated cartoning', 'Intricate custom window apertures']
  },
  {
    id: 'embossing',
    name: 'Embossing',
    type: 'carton',
    tagline: 'Tactile Raised Impression Depth',
    description: 'Embossing is the process used to raise an impression on the surface of a substrate. There are a number of different effects that can be achieved through embossing. Single level, multi-level, domed, sculptured, flip images, beveled etc., are some of the most commonly used embossing techniques. Several different metals are used to make embossing dies, such as magnesium, copper and brass. Brass dies are the first choice of the embosser. This is the only metal that can be hand tooled, thereby achieving the dramatic effects that are so popular today.',
    effect: 'Three-dimensional sculptural relief that physically rises from the paperboard plane.',
    technicalDetails: 'Hand-tooled brass dies delivering sculpted, multi-level, and beveled tactile elevations.',
    visualCue: 'tactile-rise',
    features: ['Single level & multi-level elevations', 'Hand-tooled brass dies for dramatic artistic depth', 'Domed, sculptured, and beveled edge profiles', 'Flip image optical tactile dynamics']
  },
  {
    id: 'micro-embossing',
    name: 'Micro Embossing',
    type: 'carton',
    tagline: 'Fine Line Texture & Diffraction Sheen',
    description: 'Micro embossing adds a pattern of very fine lines / text to the printed cartons or foil surface without affecting the substrate itself. Beautiful, elegant, and fully customizable, micro embossing checks many boxes for high-level creativity and brand representation. Even better, the application process is the same as a flat foil stamp, with the only change being in the die manufacturing process, making the increase in cost nominal.',
    effect: 'Subtle holographic shimmer and micro-textured light refraction across foil or carton surfaces.',
    technicalDetails: 'Nanometer-precise micro-etched lines impressed in identical pass as flat foil stamping.',
    visualCue: 'micro-refraction',
    features: ['Very fine lines & micro-text patterns', 'No damage or deformation to substrate integrity', 'High-level anti-counterfeiting & brand protection', 'Nominal cost increase with premium visual impact']
  },
  {
    id: 'foil-stamping',
    name: 'Foil Stamping',
    type: 'carton',
    tagline: 'Lustrous Roll Leaf Metallic Transfer',
    description: 'Foil stamping, sometimes called flat stamping, hot stamping, or leaf stamping, is the process which roll leaf is applied to a substrate through the use of heat and pressure to create a paper level image. A vast array of different foil products are currently available and can achieve impressive results on a variety of substrates.',
    effect: 'Mirrored metallic gleam in gold, silver, bronze, holographic, or custom pigment.',
    technicalDetails: 'BOBST 102 BMA multi-zone heated platen with precision foil roll tension tensioning.',
    visualCue: 'metallic-gleam',
    features: ['Gold, silver, copper, and custom colored roll foils', 'Diffraction and holographic security foils', 'Flat paper-level image with razor edge definition', 'High-temperature permanent thermal adhesion']
  },
  {
    id: 'foil-embossing',
    name: 'Foil Embossing',
    type: 'carton',
    tagline: 'Combined Metallic Foil & Raised Relief',
    description: 'Foil embossing, or combination stamping, combines both the foil stamping and embossing processes through the use of a specially tooled brass die. This operation can be completed in one press pass and is used extensively in Cigarette, pharma packaging etc. For shorter runs, or projects where printed elements need to be embossed along with foiled elements, the same effect can be accomplished with less expensive dies through two separate operations; first flat stamping the foil image and then embossing in register to the foil and/or print images.',
    effect: 'Lustrous metallic surface elevated into physical 3D embossed contours in immaculate register.',
    technicalDetails: 'One-pass combination stamping using master brass dies on BOBST 102 BMA.',
    visualCue: 'foil-emboss-combo',
    features: ['Single press pass efficiency on long runs', 'Two-operation precision registration for short batches', 'Extensively utilized in luxury cigarette & pharma packaging', 'Flawless register between metallic sheen and sculptural relief']
  }
];

export const LABEL_FINISHING = {
  overview: 'Labels are a very essential part of the pharmaceutical industry and FMCG industry. Pharmaceuticals Labels in particular help to provide comprehensive information about the product, in building confidence among end users, brand building in the industry and protection against counterfeit in the market. We at Kolli Graphics understand how critical labelling can be for pharma companies.',
  environment: 'Our labels are manufactured in a hygienic, clean and centrally air-conditioned environment to provide superior quality labels. We are able to provide pharmaceutical companies with comprehensive solutions for security labels due to our vast knowledge in this field. Our machinery, systems and infrastructure match the best of its class.',
  zeroErrorPrinting: {
    title: 'ZERO ERROR PRINTING',
    description: 'We have PRATI Slitter rewinder with Tubescan 100% inspection system which can detect < 0.5 mm defects. It even detects a dust particle in microns on the label layer or the liner layer thus guaranteeing an error free text printing.',
    specs: ['Tubescan 100% Optical Camera System', 'Detection capability: < 0.5 mm', 'Micron-level dust particle detection on face and liner', 'Guaranteed error-free pharmaceutical text & dosage printing']
  },
  zeroNonUniformity: {
    title: 'ZERO CHANCE OF NON-UNIFORMITY IN COLORS',
    description: 'Our highly sophisticated machinery ensures automatic color sensing thus removes manual errors across large volume runs.',
    specs: ['Continuous inline spectrophotometric sensing', 'Automatic closed-loop color adjustments', 'Eliminates human visual fatigue and manual drift', 'Uniform delta-E tolerance throughout entire roll']
  },
  varnishing: {
    title: 'Varnishing',
    description: 'Varnishing refers to the process of applying a heat-cured clear coating of transparent ink on the surface of a label for protection and for giving it lustrous look. The labels with a varnishing enhancement protect the material and the printing from abrasion, sunlight, chemicals and moisture.',
    benefits: ['Abrasion & scuff defense', 'Sunlight UV resistance', 'Chemical & solvent barrier', 'Moisture & humidity protection']
  },
  serialNumbering: {
    title: 'Serial Numbering',
    description: 'Labeling with unique serial numbers is required in various industries, such as pharma, retail and logistics, as well as for several purposes, such as identifying spare parts and individual units of goods and products.',
    benefits: ['Pharma Track-and-Trace compliance', 'Unique individual unit identification', 'Logistics barcode and serialized QR matching', 'Anti-counterfeit product verification']
  }
};
