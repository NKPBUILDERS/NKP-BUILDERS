import { ServiceItem, ProjectItem, BlogPost, Testimonial, FAQItem } from "./types";

export const servicesData: ServiceItem[] = [
  {
    id: "residential-construction",
    title: "Residential Construction",
    shortDesc: "Premium, custom turnkey villas and homes built with 100% structural integrity and Vasthu compliance.",
    priceEst: "₹1,650 - ₹2,300 per sqft",
    benefits: [
      "100% Vasthu compliant planning by experts",
      "Corrosion-resistant steel (JSW/TATA) & premium Grade-53 cement",
      "Rigorous 3-stage material testing before concrete lay",
      "On-time delivery with pre-agreed milestone schedule"
    ],
    details: "NKP Builders crafts spectacular residential spaces from design blueprints to key handovers. We provide professional soil testing, custom civil designs, high-tension pillars, beautiful masonry work, modular layouts, and top-brand fittings. Our team guides you on local building license regulations in Chengalpattu and Chennai municipal divisions.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "commercial-construction",
    title: "Commercial Construction",
    shortDesc: "Contemporary, robust retail, workspaces, and warehouses designed for fast workflow and zero safety hazards.",
    priceEst: "₹1,800 - ₹2,600 per sqft",
    benefits: [
      "Heavy load-bearing columns and seismic-tested designs",
      "Fire-resistant emergency escape designs",
      "Eco-friendly, energy-saving high ceilings and cross ventilation",
      "Strict compliance with National Building Codes (NBC India)"
    ],
    details: "We construct office hubs, warehouses, showrooms, and shopping plazas tailored to high commercial demands. With expert construction supervisors overseeing foundation work, we guarantee extreme safety, premium material handling, and state-of-the-art elevations that look stunning.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "building-renovation",
    title: "Building Renovation & Extension",
    shortDesc: "Complete structural rehabilitation, floor additions, or modern layout expansions.",
    priceEst: "Custom based on scope",
    benefits: [
      "Detailed structural load analysis before vertical expansion",
      "Premium flooring and tile alignment upgrades",
      "Water-proof structural injection repairs",
      "Minimal disturbance to adjacent spaces"
    ],
    details: "Give your existing home a second life. We specialize in structural modifications, balcony enhancements, floor extensions, structural wall demolitions with micro-beam reinforcements, and retrofitting modular luxury features.",
    image: "https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "interior-painting",
    title: "Interior Painting",
    shortDesc: "Aesthetic color design and super smooth textures matching your bespoke home styling.",
    priceEst: "₹12 - ₹28 per sqft",
    benefits: [
      "Putty-leveled walls using advanced mechanical sanders",
      "Official Asian Paints Royale Luxury authorized primers & emulsions",
      "Odorless, safe low-VOC options",
      "Post-painting deep cleanup and zero furniture stain guarantee"
    ],
    details: "We convert standard walls into premium display spaces. From wall preparation, chemical checking for alkaline moistures, acrylic putty base application, to fine sanding and paint coats using precision rollers.",
    image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "exterior-painting",
    title: "Exterior Painting & Weather Shielding",
    shortDesc: "High-protection protective paint coats preventing thermal expansion cracks and water absorption.",
    priceEst: "₹15 - ₹35 per sqft",
    benefits: [
      "Up to 5 Years Asian Paints Apex Ultima written warranty",
      "Dust-guard technology to keep surfaces looking fresh",
      "Crack-bridging acrylic coats to seal plaster micro-lines",
      "Anti-algae, anti-fungal chemical blends"
    ],
    details: "Tamil Nadu weather can cause severe cracks on exterior plastering due to high solar radiation and monsoons. Our multi-layer paint technology using professional weather-resistant shields keeps your exterior walls pristine for years.",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "waterproofing",
    title: "Waterproofing (Dam Sheath System)",
    shortDesc: "Premium multi-barrier membrane coatings preventing ceiling dampness, wall peeling, and water penetration.",
    priceEst: "₹45 - ₹95 per sqft",
    benefits: [
      "Dam Sheath crystalline waterproofing compounds",
      "5-Year official written leak-proof warranty",
      "Advanced chemical injection in weak plaster nodes",
      "Ideal for terraced gardens, water tanks, and basement walls"
    ],
    details: "Dampness is the silent killer of concrete structures. We use heavy-duty polymers, high-elastic crystalline membranes, and expansion-seal compounds. We test waterproofing with continuous 48-hour flood ponding checks.",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "wall-crack-repair",
    title: "Wall Crack & Plaster Repair",
    shortDesc: "Injectable structural grouting and high-elastic fiber polymer crack filling.",
    priceEst: "₹60 - ₹120 per running ft",
    benefits: [
      "High-adhesion micro-fibers prevent crack recurrence",
      "Deep polymer epoxy injection for load-bearing columns",
      "Excellent matching plaster finish, ready for primer",
      "Increases concrete shelf life by preventing steel rebar rusting"
    ],
    details: "Cracks are not just ugly; they let moisture reach internal steel beams, leading to rust and decay. We route cracks with V-groove cuts, inject structural acrylic grouts, apply flexible mesh, and seal them perfectly.",
    image: "https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "texture-painting",
    title: "Texture Painting & Wall Stencils",
    shortDesc: "Stunning feature wall designs, marble, stucco, and metallic textures.",
    priceEst: "₹40 - ₹150 per sqft",
    benefits: [
      "Beautiful 3D wall reliefs and high-end artistic finishes",
      "Perfect for drawing room accent walls and corporate lounges",
      "Easy-to-clean metallic and non-metallic patterns",
      "Damp-resistant glaze coats for lasting glamour"
    ],
    details: "Personalize your living space with Royale Play metallic textures, stucco plastering, sand dunes, or premium stencil patterns. Our certified artists create unique customized designs that define your room's mood.",
    image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "tile-work",
    title: "Premium Tile & Marble Work",
    shortDesc: "Laying exquisite vitrified tiles, polished granites, and fine marble flooring.",
    priceEst: "₹45 - ₹85 per sqft",
    benefits: [
      "Perfect laser-level alignments prevent floor bumps",
      "Zero-lip joints with high-tension tile spacers",
      "Water-proof epoxy grouting in bathrooms & wet areas",
      "Highly skilled master masons for intricate layouts"
    ],
    details: "Flooring establishes the baseline elegance of any interior. We lay large-format double-charged vitrified tiles, granite stairs with anti-skid grooves, kitchen countertops, and complete anti-skid bathroom tiling layouts.",
    image: "https://images.unsplash.com/photo-1502005229762-fc1b2b812ca5?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "false-ceiling",
    title: "Bespoke False Ceiling",
    shortDesc: "Modern plasterboard ceiling configurations with integrated LED lighting and acoustic protection.",
    priceEst: "₹80 - ₹140 per sqft",
    benefits: [
      "Saint-Gobain Gyproc premium plasterboard profiles",
      "Hidden thermal insulation options reduce room temperatures",
      "Integrated wiring channels with premium safety pipes",
      "Excellent acoustic profiling reduces echoes"
    ],
    details: "Design a dramatic overhead landscape. We engineer gorgeous stepped ceilings, modern floating panels, and cove lighting profiles that elevate room ambiance while keeping your wiring beautifully hidden.",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "electrical-works",
    title: "Professional Electrical Works",
    shortDesc: "High-safety concealed conduits, wiring upgrades, and designer automation panels.",
    priceEst: "Custom estimation",
    benefits: [
      "100% fire-retardant Finolex / KEI wiring used",
      "Havells/Legrand MCBs and modern modular switches",
      "Expert safety grounding to prevent electric shocks",
      "Detailed wiring circuit diagram provided upon handover"
    ],
    details: "Safe, robust power routing is critical. We design the electrical map, run heavy-duty pipes inside wall plaster, configure multi-zone lighting circuits, and coordinate main power boards with phase selectors.",
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "plumbing",
    title: "Bespoke Plumbing Works",
    shortDesc: "High-pressure leakage-free plumbing, sanitaryware fitouts, and concealed piping networks.",
    priceEst: "Standard corporate rates",
    benefits: [
      "Corrosion-free Ashirvad / Supreme CPVC pipes",
      "Precision pressure-testing before wall closure",
      "Concealed diverter mappings and high-end fixtures",
      "Complete drainage vent profiling avoids bad odor"
    ],
    details: "Water leakage is the primary cause of wall peeling and structural weakness. Our plumbers utilize heat-fused joints, specialized pressure checklists, and layout alignments to guarantee decades of smooth flow.",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "building-maintenance",
    title: "Building Maintenance",
    shortDesc: "Scheduled structural audits, drainage cleaning, pressure washing, and masonry touch-ups.",
    priceEst: "Custom plans",
    benefits: [
      "Preventive structural checkups prevent expensive failures",
      "Professional terrace deep cleaning and fungus removal",
      "Emergency service dispatch for piping / wiring faults",
      "Maintains the asset value of your property over time"
    ],
    details: "NKP Builders partners with apartments, commercial spaces, and villas for yearly facility management. We keep overhead water tanks sanitized, check sewage pipelines, and repoint masonry joints.",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "asian-paints-warranty",
    title: "Asian Paints Warranty Services",
    shortDesc: "Officially backed paint systems offering standard 3-year, 5-year and 10-year dampness guarantees.",
    priceEst: "Project based",
    benefits: [
      "Asian Paints official system checks and verification",
      "Joint material-and-workmanship warranty certificates",
      "Detailed computer-aided digital paint shade preview",
      "Premium paint thickness (DFT) checks using digital gauges"
    ],
    details: "As a trusted regional paint application partner, we align with Asian Paints technical teams. We apply Apex Ultima Protek waterproofing systems on exterior walls, ensuring strict adherence to the paint brand's application protocols to issue authentic active warranties.",
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80"
  }
];

export const projectsData: ProjectItem[] = [
  {
    id: "mahalakshmi-villa",
    title: "Mahalakshmi Luxury Villa",
    category: "residential",
    status: "completed",
    location: "Mahalakshmi Nagar, Chengalpattu",
    year: "2025",
    imageBefore: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80",
    imageAfter: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
    description: "A stunning 2,400 sqft premium duplex villa constructed with classic modern architecture, featuring JSW Steel structural columns, luxury vitrified flooring, and premium Asian Paints Royale interior finishes. Engineered from foundation to full custom structural layout with a Vaastu compliant layout.",
    area: "2,400 Sq.Ft.",
    client: "Mr. R. Karthikeyan (IT Director)"
  },
  {
    id: "thiruporur-commercial",
    title: "Thiruporur Retail Plaza",
    category: "commercial",
    status: "completed",
    location: "Chengalpattu - Thiruporur Main Road",
    year: "2025",
    imageBefore: "https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&w=800&q=80",
    imageAfter: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
    description: "Modern triple-story retail and office complex built with high-tension structural concrete grids. Features customized front elevations with structural glazing and energy-saving high ceilings.",
    area: "4,500 Sq.Ft.",
    client: "NKP Ventures & Retails"
  },
  {
    id: "kelambakkam-waterproofing",
    title: "Kelambakkam Apartment Waterproofing",
    category: "waterproofing",
    status: "completed",
    location: "Kelambakkam, Chennai Suburbs",
    year: "2024",
    imageBefore: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80",
    imageAfter: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80",
    description: "Successful dampness correction of a 12-block residential apartment. We utilized our signature Dam Sheath Waterproofing system, treating 15,000 sqft of concrete slab, resulting in 100% leak stoppage backed by a 5-year written warranty.",
    area: "15,000 Sq.Ft.",
    client: "Alliance Residency Association"
  },
  {
    id: "mahabalipuram-beachhouse",
    title: "Mahabalipuram Beach Villa",
    category: "residential",
    status: "ongoing",
    location: "East Coast Road, Mahabalipuram",
    year: "2026",
    imageAfter: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80",
    description: "An ongoing ultra-luxury beach house construction. Features anti-corrosive concrete reinforcement mixes to withstand seaside salt-mist corrosion, floor-to-ceiling glass panel frameworks, and infinity pool structural layouts.",
    area: "3,800 Sq.Ft.",
    client: "Dr. S. Anand (Chief Surgeon)"
  },
  {
    id: "chengalpattu-painting",
    title: "Royale Interior & Exterior Painting",
    category: "painting",
    status: "completed",
    location: "Thiruporur Road, Chengalpattu",
    year: "2025",
    imageBefore: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80",
    imageAfter: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
    description: "Complete painting overhaul of a heritage bungalow. We applied high-tension elastomeric exterior paints (Apex Ultima Protek) with a bespoke royal gold accent styling, and premium Royale silk emulsion for interior walls.",
    area: "3,200 Sq.Ft.",
    client: "Mrs. Meenakshi Sundaram"
  },
  {
    id: "omr-corporate-interior",
    title: "OMR Tech Hub Interior fitout",
    category: "interior",
    status: "ongoing",
    location: "OMR, Chennai",
    year: "2026",
    imageAfter: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
    description: "Design and creation of a modern open-office layout. Includes Saint-Gobain sound-absorbing false ceilings, premium vitrified tile grids, decorative wood panels, and smart LED circuit designs.",
    area: "6,000 Sq.Ft.",
    client: "InnoSoft Solutions"
  }
];

export const blogData: BlogPost[] = [
  {
    id: "waterproofing-guide-tn",
    title: "Protecting Your Home from Tamil Nadu Monsoon: Terrace Waterproofing Guide",
    category: "maintenance",
    date: "June 12, 2026",
    readTime: "5 mins read",
    summary: "Terrace concrete suffers heavy expansion due to Chengalpattu's high heat, leading to fine hairline cracks that leak during monsoons. Learn the standard Crystalline membrane systems.",
    content: [
      "In Tamil Nadu, summer temperatures touch 42°C, causing concrete roofs to expand rapidly. During the monsoon, the temperature drops suddenly, causing immediate contraction. This physical shock develops tiny hairline cracks.",
      "A simple coat of local paint won't fix this. You need our advanced Dam Sheath Waterproofing system, which offers an elastic waterproofing film that stretches up to 300% without tearing.",
      "Key Steps in Professional Waterproofing:",
      "1. High-pressure cleaning to remove moss, micro-algae, and weak cement patches.",
      "2. Cutting structural V-grooves in visible cracks and injecting flexible polymer compounds.",
      "3. Applying a primer coat of moisture-blocker primer.",
      "4. Laying two coats of fiber-reinforced waterproofing membranes.",
      "At NKP Builders, we provide a 5-Year written leak-proof guarantee on all terrace waterproofing assignments."
    ],
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80",
    author: "Mr.N.K.Praveen Kumar, Civil Expert"
  },
  {
    id: "asian-paints-ultima-review",
    title: "Why We Recommend Asian Paints Apex Ultima Protek for Exterior Weather Protection",
    category: "painting",
    date: "May 20, 2026",
    readTime: "4 mins read",
    summary: "An in-depth look at how multi-coat weather shields resist heavy dust, extreme sun, and prevent structural plaster peeling.",
    content: [
      "Exterior plaster suffers the absolute blunt of nature—scorching sun, severe coastal winds, and high monsoon dampness. Standard external paint peels off within 2 seasons, leading to ugly black spots of fungal infestation.",
      "Apex Ultima Protek is a revolutionary nanotechnology paint formulated to bridge cracks up to 2mm wide. It features a water-resistant layer that allows internal moisture to escape while blocking external liquid rain.",
      "We use digital DFT gauges to measure dry paint thickness, ensuring the coat meets the 5-year and 10-year official warranty guidelines of Asian Paints. We are authorized premium painters in Tamil Nadu.",
      "Contact NKP Builders for a Free Paint Shade Visualizer service!"
    ],
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
    author: "Mr.N.K.Praveen Kumar"
  },
  {
    id: "vasthu-shastra-house-tips",
    title: "10 Essential Vasthu Shastra Layout Tips for Your New Home Construction",
    category: "construction",
    date: "April 15, 2026",
    readTime: "6 mins read",
    summary: "Designing a harmonious home that ensures peace, proper solar lighting, and natural wind flow in accordance with ancient civil planning.",
    content: [
      "Vasthu Shastra is not just superstition; it is a ancient science of orientation and environmental planning. It aligns with natural forces like the morning sun, magnetic lines of the earth, and typical wind patterns in South India.",
      "1. The Main Entrance (Pujai or Hall): Ideally placed in the East or Northeast to receive healthy morning UV solar light.",
      "2. The Master Bedroom: Must be located in the Southwest corner (Kubera side) to symbolize stability and structural security.",
      "3. The Kitchen (Agni corner): Ideally placed in the Southeast to capture natural ventilation and safe fire positions.",
      "4. Bathrooms and Overheads: Placed in West or Northwest corridors.",
      "All house layouts engineered by NKP Builders are verified by veteran certified Vasthu civil draftsmen before starting structural drawings, absolutely free of cost."
    ],
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    author: "Mr.N.K.Praveen Kumar"
  }
];

export const testimonialsData: Testimonial[] = [
  {
    id: "test1",
    name: "Mr. R. Karthikeyan",
    role: "IT Director",
    rating: 5,
    text: "NKP Builders constructed our dream villa in Mahalakshmi Nagar, Chengalpattu. From day one, Mr.N.K.Praveen Kumar was extremely transparent. The steel and cement quality was verified on site. They completed the work on time and the finishing is absolutely premium. Highly recommended!",
    project: "Turnkey Duplex Construction",
    location: "Chengalpattu",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80"
  },
  {
    id: "test2",
    name: "Mrs. Meenakshi Sundaram",
    role: "Retired Professor",
    rating: 5,
    text: "Our family bungalow required deep plaster repair and painting. NKP Builders sealed all vertical cracks, did a fabulous exterior Apex Ultima weather shielding, and Royale painting for the interiors. Excellent cleanup and extremely polite workers.",
    project: "Home Renovation & Royale Painting",
    location: "Thiruporur Road",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80"
  },
  {
    id: "test3",
    name: "Dr. S. Anand",
    role: "Chief Surgeon",
    rating: 5,
    text: "I hired NKP Builders for waterproofing our roof slabs and bathroom joints. We had severe leaks for years, but their Dam Sheath system solved it in 3 days. No leaks even after the heavy rains last month! Their 5-year written warranty gave us peace of mind.",
    project: "Roof Slab Dam Sheath Waterproofing",
    location: "Kelambakkam",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=150&h=150&q=80"
  },
  {
    id: "test4",
    name: "Mr. K. Palanivel",
    role: "Entrepreneur",
    rating: 5,
    text: "Best civil contractors in Chengalpattu. They constructed our commercial block with maximum space utilization. Structural pillars are super strong and design matches the high-quality standards we expected. Transparent pricing with no hidden costs.",
    project: "Commercial Complex Construction",
    location: "Chengalpattu",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80"
  }
];

export const faqData: FAQItem[] = [
  {
    category: "general",
    question: "Do you offer a Free Site Visit and Estimation?",
    answer: "Yes, absolutely! We provide a 100% Free Site Inspection and detailed engineering estimation for projects in Chengalpattu, Thiruporur, Kelambakkam, Mahabalipuram, Guduvanchery, and South Chennai areas. Our engineer will visit your site, perform initial measurements, and guide you with design options."
  },
  {
    category: "construction",
    question: "What is the typical timeline for constructing a 2,000 sq.ft. house?",
    answer: "A standard duplex house of 2,000 sqft takes approximately 6 to 9 months from foundation excavation to final painting and handover. This timeline depends on weather conditions and prompt approvals of custom finishing designs."
  },
  {
    category: "painting",
    question: "Are you an authorized Asian Paints contractor?",
    answer: "Yes! NKP Builders is a highly trusted authorized painter in Chengalpattu. We use original Asian Paints primers, Royale emulsions for interior luxury walls, and Apex Ultima Protek weather shielding systems for exterior walls. We follow the brand's recommended multi-coat process using mechanical sanders."
  },
  {
    category: "warranty",
    question: "How does the 5-Year Waterproofing Warranty work?",
    answer: "Upon successful completion of our signature Dam Sheath Waterproofing system, we issue an official stamped written Warranty Card on our company letterhead, signed by Mr.N.K.Praveen Kumar. If any water leakage occurs in the treated areas within 5 years, our team will rectify it immediately at zero cost."
  },
  {
    category: "construction",
    question: "Do you assist with building plan approvals and electricity/water connections?",
    answer: "Yes, we provide end-to-end assistance. We prepare municipal-ready architectural drawing plans, submit them to DTCP or Chengalpattu Corporation bureaus, and help you secure approval papers, along with coordinating temporary construction electricity and water lines."
  }
];
