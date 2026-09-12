import type { Locale } from '@/i18n/routing';

export type ProductCategory = {
  name: string;
  // URL segment for the category's SEO-friendly listing page, /products/[slug].
  slug: string;
};

// The full set of product categories the storefront sells into. Shown as filter
// chips on the products listing page even before every category has products.
export const PRODUCT_CATEGORIES: ProductCategory[] = [
  { name: 'Vehicle Tracking', slug: 'vehicle-tracking' },
  { name: 'Personal Tracking', slug: 'personal-tracking' },
  { name: 'Asset Tracking', slug: 'asset-tracking' },
  { name: '4G Dash Camera', slug: '4g-dash-camera' }
];

export function getCategoryBySlug(slug: string): ProductCategory | undefined {
  return PRODUCT_CATEGORIES.find((c) => c.slug === slug);
}

export function getCategoryByName(name: string): ProductCategory | undefined {
  return PRODUCT_CATEGORIES.find((c) => c.name === name);
}

export type ProductSpecSection = {
  title: string;
  rows: { label: string; value: string }[];
};

// Icon keys rendered around the product photo on the details page.
export type ProductFeatureIcon =
  | 'location'
  | 'speed'
  | 'phone'
  | 'battery'
  | 'share'
  | 'drop'
  | 'bell'
  | 'key'
  | 'shield'
  | 'alert'
  | 'history'
  | 'map';

// Fixed ring layout: 3 icons across the top, 3 down each side, 3 across the bottom.
export type ProductFeaturePosition =
  | 'top-1'
  | 'top-2'
  | 'top-3'
  | 'left-1'
  | 'left-2'
  | 'left-3'
  | 'right-1'
  | 'right-2'
  | 'right-3'
  | 'bottom-1'
  | 'bottom-2'
  | 'bottom-3';

export type ProductFeature = {
  position: ProductFeaturePosition;
  icon: ProductFeatureIcon;
  label: string;
  description: string;
};

export type ProductPackageRow = {
  label: string;
  value: string;
};

export type Product = {
  id: string;
  slug: string;
  category: string;
  price: number;
  // MRP shown struck-through next to the price when the product is discounted.
  originalPrice?: number;
  currency: 'INR';
  images: string[];
  stock: number;
  rating: { average: number; count: number };
  featured: boolean;
  name: Record<Locale, string>;
  shortDescription: Record<Locale, string>;
  description: Record<Locale, string>;
  // Short pills shown above the product name, e.g. ["2G GPS", "All Type Vehicles"].
  badge: string[];
  // Technical specs, the feature ring and the highlight list aren't translated —
  // kept as plain text, same across locales, same as GPS spec sheets normally are.
  specifications: ProductSpecSection[];
  features: ProductFeature[];
  // Short "at a glance" callouts shown as a 2-column icon grid, e.g. "1 Year Warranty".
  highlights: string[];
  // "Features and Benefits" tab: intro copy, card grid built from `features`.
  benefitsEyebrow: string;
  benefitsHeading: string;
  benefitsSubheading: string;
  // "Package Details & Subscription Fee" tab: warranty, app access, SIM/subscription
  // terms and setup guide, as a Feature/Details table.
  packageDetails: ProductPackageRow[];
  // "What's in the Box" tab: plain checklist of what ships with the product.
  boxContents: string[];
};

// This file simulates a database table. In a real app, swap this module
// for a Prisma/Drizzle query, a CMS client (Sanity, Contentful), or a call
// to an external commerce platform (Shopify, Medusa, etc). Both lib/api.ts
// (used by Server Components) and app/api/products/* (the REST endpoints for
// external clients) import from here directly — Server Components no longer
// go through the REST layer for their own data; see lib/api.ts for why.
export const products: Product[] = [
  {
    id: 'Trakway-TW-05-GPS',
    slug: 'trakway-tw-05-gps',
    category: 'Vehicle Tracking',
    price: 2799,
    originalPrice: 5599,
    currency: 'INR',
    // TODO: swap in real gallery photography — same image repeated so the
    // thumbnail carousel/autoplay has more than one frame to demo for now.
    images: ['/images/products/v5/v5.png', '/images/products/v5/v5.png'],
    stock: 24,
    rating: { average: 4.6, count: 128 },
    featured: true,
    name: {
      en: 'TW-05 GPS (WIRED)(2G)',
      ta: 'கை வேலைப்பாடு மட்பாண்ட கோப்பை',
      hi: 'हस्तनिर्मित मिट्टी का मग'
    },
    shortDescription: {
      en: 'Vehicle GPS Tracker',
      ta: 'கை வேலைப்பாடு மட்பாண்ட கோப்பை',
      hi: 'हस्तनिर्मित मिट्टी का मग'
    },
    description: {
      en: 'TW-05 GPS tracker is a compact and efficient device designed for reliable location tracking in real time. Utilizing 2G connectivity, it offers essential tracking features suitable for personal vehicles and assets. With its user-friendly interface and simple installation, the V5 provides accurate positioning, geofencing capabilities, and historical logs for no network area. Ideal for those seeking an economical solution for monitoring their belongings, the TW-05  GPS tracker ensures you stay connected and informed at all times.Secure, monitor, and manage your vehicle with the Trakway Advanced GPS Tracking Device.',
      ta: 'கையால் வடிவமைக்கப்பட்ட மட்பாண்ட கோப்பை. ஒவ்வொன்றும் தனித்துவமான வடிவமைப்புடன் இருக்கும்.',
      hi: 'हाथ से बना मिट्टी का मग। हर टुकड़ा अपने अनोखे ग्लेज़ पैटर्न के साथ अद्वितीय है।'
    },
    badge: ['2G GPS', 'All Vehicles'],
    features: [
      {
        position: 'top-1',
        icon: 'location',
        label: 'Live Location',
        description: "See your vehicle's exact position on the map in real time."
      },
      {
        position: 'top-2',
        icon: 'speed',
        label: 'Speed',
        description: 'Monitor current speed and get alerts on over-speeding.'
      },
      {
        position: 'top-3',
        icon: 'phone',
        label: 'Contact Driver',
        description: 'Call the driver directly from the tracking app.'
      },
      {
        position: 'left-1',
        icon: 'battery',
        label: 'In-Built Battery',
        description: 'Built-in backup battery keeps tracking even if power is cut.'
      },
      {
        position: 'left-2',
        icon: 'drop',
        label: 'Waterproof',
        description: 'Rugged, weatherproof body built to survive the outdoors.'
      },
      {
        position: 'left-3',
        icon: 'key',
        label: 'Engine On/Off (optioned)',
        description: 'Optional relay to remotely start or immobilise the engine.'
      },
      {
        position: 'right-1',
        icon: 'share',
        label: 'Share Ride',
        description: 'Share your live trip with family or friends with one tap.'
      },
      {
        position: 'right-2',
        icon: 'bell',
        label: 'Alerts & Notifications',
        description: 'Instant alerts for geo-fence, tampering and low battery.'
      },
      {
        position: 'right-3',
        icon: 'shield',
        label: 'Anti-Theft Mode',
        description: 'Get notified the moment your vehicle moves without you.'
      },
      {
        position: 'bottom-1',
        icon: 'alert',
        label: 'Reports',
        description: 'Detailed trip, mileage and driving behaviour reports.'
      },
      {
        position: 'bottom-2',
        icon: 'history',
        label: 'Playback & History',
        description: 'Replay any past trip with full route history.'
      },
      {
        position: 'bottom-3',
        icon: 'map',
        label: 'All Vehicles In 1 Map',
        description: 'Track your entire fleet together on a single map.'
      }
    ],
    highlights: [
      'Live Tracking, Engine Cut Off',
      '1 Year Warranty',
      'Android App, Ios App, PC',
      'All Type Vehicles',
      'GSM, GPS, LBS'
    ],
    benefitsEyebrow: 'BUILT TO TRACK',
    benefitsHeading: 'What the X3 GPS Tracker does',
    benefitsSubheading: 'A multifunctional tracker built for fleet management and security monitoring.',
    packageDetails: [
      { label: 'Hardware Warranty', value: '1 Year' },
      { label: 'App Software Access', value: 'First year FREE (₹750/year after Year 1)' },
      {
        label: 'SIM Card Connectivity',
        value:
          'Pre-installed inactive SIM. Recharge for ₹1200/year, or insert your own active SIM card.'
      },
      {
        label: 'Setup Guide',
        value: 'Step-by-step activation instructions included in the box user manual.'
      }
    ],
    boxContents: [
      '1 × Trakway GPS Tracker',
      '1 x Wire',
      '1 x Relay',
      '1 × User Manual / App Setup Guide',
      '1 x Sim Card'
    ],
    specifications: [
      {
        title: 'Specifications',
        rows: [
          { label: 'GSM Band', value: '850 / 900 / 1800 / 1900 MHz' },
          { label: 'GNSS Type', value: 'GPS + LBS' },
          { label: 'Antenna', value: 'Built-in GPS ceramic antenna; GSM quad-band antenna' },
          { label: 'LED Indicator', value: 'GPS (Blue), GSM (Green)' },
          { label: 'Internal Battery', value: '60 mAh / 3.7 V Li-Polymer battery' },
          { label: 'Working Voltage / Current', value: '9–90 V DC' },
          { label: 'Standby Current', value: '< 5 mA' },
          { label: 'Operating Temperature', value: '-20°C to +70°C' },
          { label: 'Weight', value: '29 g' },
          { label: 'Dimensions', value: '71.9 mm × 30.2 mm × 12.9 mm' }
        ]
      }
    ]
  },
  {
    id: 'Trakway-TW-149-GPS',
    slug: 'trakway-tw-149-gps',
    category: 'Vehicle Tracking',
    price: 2799,
    originalPrice: 5599,
    currency: 'INR',
    // TODO: swap in real gallery photography — same image repeated so the
    // thumbnail carousel/autoplay has more than one frame to demo for now.
    images: ['/images/products/149/tw-149.png', '/images/products/149/tw-149.png'],
    stock: 24,
    rating: { average: 4.6, count: 128 },
    featured: true,
    name: {
      en: 'TW-149 GPS Tracker(4G)',
      ta: 'கை வேலைப்பாடு மட்பாண்ட கோப்பை',
      hi: 'हस्तनिर्मित मिट्टी का मग'
    },
    shortDescription: {
      en: 'Vehicle GPS Tracker',
      ta: 'கை வேலைப்பாடு மட்பாண்ட கோப்பை',
      hi: 'हस्तनिर्मित मिट्टी का मग'
    },
    description: {
      en: 'The TW-149 is a state-of-the-art GPS tracker designed for seamless real-time location tracking. Equipped with 4G LTE connectivity, it ensures reliable and swift data transmission, making it ideal for monitoring vehicles and assets. This compact device offers features such as geofencing, historical data storage, and customizable alerts, ensuring you stay informed and in control. Whether for personal use or fleet management, the TW-149 provides peace of mind with its robust performance and easy installation.',
      ta: 'கையால் வடிவமைக்கப்பட்ட மட்பாண்ட கோப்பை. ஒவ்வொன்றும் தனித்துவமான வடிவமைப்புடன் இருக்கும்.',
      hi: 'हाथ से बना मिट्टी का मग। हर टुकड़ा अपने अनोखे ग्लेज़ पैटर्न के साथ अद्वितीय है।'
    },
    badge: ['4G GPS', 'All Vehicles'],
    features: [
      {
        position: 'top-1',
        icon: 'location',
        label: 'Live Location',
        description: "See your vehicle's exact position on the map in real time."
      },
      {
        position: 'top-2',
        icon: 'speed',
        label: 'Speed',
        description: 'Monitor current speed and get alerts on over-speeding.'
      },
      {
        position: 'top-3',
        icon: 'phone',
        label: 'Contact Driver',
        description: 'Call the driver directly from the tracking app.'
      },
      {
        position: 'left-1',
        icon: 'battery',
        label: 'In-Built Battery',
        description: 'Built-in backup battery keeps tracking even if power is cut.'
      },
      {
        position: 'left-2',
        icon: 'drop',
        label: 'Waterproof',
        description: 'Rugged, weatherproof body built to survive the outdoors.'
      },
      {
        position: 'left-3',
        icon: 'key',
        label: 'Engine On/Off (optioned)',
        description: 'Optional relay to remotely start or immobilise the engine.'
      },
      {
        position: 'right-1',
        icon: 'share',
        label: 'Share Ride',
        description: 'Share your live trip with family or friends with one tap.'
      },
      {
        position: 'right-2',
        icon: 'bell',
        label: 'Alerts & Notifications',
        description: 'Instant alerts for geo-fence, tampering and low battery.'
      },
      {
        position: 'right-3',
        icon: 'shield',
        label: 'Anti-Theft Mode',
        description: 'Get notified the moment your vehicle moves without you.'
      },
      {
        position: 'bottom-1',
        icon: 'alert',
        label: 'Reports',
        description: 'Detailed trip, mileage and driving behaviour reports.'
      },
      {
        position: 'bottom-2',
        icon: 'history',
        label: 'Playback & History',
        description: 'Replay any past trip with full route history.'
      },
      {
        position: 'bottom-3',
        icon: 'map',
        label: 'All Vehicles In 1 Map',
        description: 'Track your entire fleet together on a single map.'
      }
    ],
    highlights: [
      '10-second real-time updates',
      'Multi-GNSS precision',
      'Compact Size',
      'Precision Tracking',
      '4G Connectivity',
      'Wide Voltage Range'
    ],
    benefitsEyebrow: 'BUILT TO TRACK',
    benefitsHeading: 'What the X3 GPS Tracker does',
    benefitsSubheading: 'A multifunctional tracker built for fleet management and security monitoring.',
    packageDetails: [
      { label: 'Hardware Warranty', value: '1 Year' },
      { label: 'App Software Access', value: 'First year FREE (₹750/year after Year 1)' },
      {
        label: 'SIM Card Connectivity',
        value:
          'Pre-installed inactive SIM. Recharge for ₹1200/year, or insert your own active SIM card.'
      },
      {
        label: 'Setup Guide',
        value: 'Step-by-step activation instructions included in the box user manual.'
      }
    ],
    boxContents: [
      '1 × Trakway GPS Tracker',
      '1 x Wire',
      '1 x Relay',
      '1 × User Manual / App Setup Guide',
      '1 x Sim Card'
    ],
    specifications: [
      {
        title: 'GPS Specifications',
        rows: [
          { label: 'Positioning System', value: 'GPS' },
          { label: 'Frequency', value: 'L1/B1' },
          { label: 'GPS channel', value: '66' },
          { label: 'Positioning accuracy', value: '<2.5m CEP' },
          { label: 'Tracking sensitivity', value: '-165 dBm' },
          { label: 'Acquisition', value: '-148dBm' },
          { label: 'TTFF (open-sky)', value: 'Avg. hot start <1sec | Avg. cold start <32sec' }
        ]
      },
      {
        title: 'Network Specifications',
        rows: [
          { label: 'Network Type', value: '4G LTE Cat.1' },
          {
            label: 'Supported Bands',
            value: 'LTE-FDD: B1/B3/B5/B8 | LTE-TDD: B34/B38/39/B40/B41'
          },
          { label: 'Data Transmission', value: 'TCP' },
          { label: 'Max Frequency Error', value: '±0.1ppm' },
          { label: 'SIM Card', value: 'Standard Nano SIM' },
          { label: 'LED Indication', value: 'Green (Cellular), Blue (GPS)' }
        ]
      },
      {
        title: 'Physical Specifications',
        rows: [
          { label: 'Dimensions', value: '80*31*31mm' },
          { label: 'Weight', value: '28g' },
          { label: 'Color', value: 'Black' },
          { label: 'IP Rating', value: 'IP54 Tested in internal lab' }
        ]
      },
      {
        title: 'Power Specifications',
        rows: [
          { label: 'Operating Voltage', value: '9V - 90V DC' },
          { label: 'Standby Current', value: '< 7mA' },
          { label: 'Backup Battery', value: 'Built-in 60Mah/3.7V Li-Polymer' },
          { label: 'Battery Life', value: '30 Minute' },
          { label: 'Operating Temperature', value: 'DC -20°C to 70°C' },
          { label: 'Storage Temperature', value: '–30°C to +85°C' },
          { label: 'Power Supply', value: 'Power cable: B+/ACC/GND' },
          {
            label: '*',
            value:
              '* We reserve the right to the final interpretation of this page. All information is for reference only and is subject to change without further notice.'
          }
        ]
      },
      {
        title: 'Additional Features',
        rows: [
          { label: 'Server Type', value: 'Dual IP Support (Primary1 + Primary2)' },
          { label: 'Data Storage', value: '4MB + 4MB Flash Memory' },
          { label: 'Motion Sensor', value: 'Accelerometer' },
          {
            label: 'Alarm Types',
            value:
              'Vibration, Over-Speeding, Geo-fence, Power Cut, Ignition On/Off, Low battery, Moving, Driving Behavior Analysis'
          },
          { label: 'Chipset', value: 'RDA "RDA8955L"' },
          { label: 'Offline Memory Logs', value: '1000 location packet' },
          { label: 'Ignition Detection', value: 'Wire & motion' }
        ]
      }
    ]
  },
  {
    id: 'Trakway-TW-10-GPS',
    slug: 'trakway-tw-10-gps',
    category: 'Vehicle Tracking',
    price: 2799,
    originalPrice: 5599,
    currency: 'INR',
    // TODO: swap in real gallery photography — same image repeated so the
    // thumbnail carousel/autoplay has more than one frame to demo for now.
    images: ['/images/products/10/tw-10.png', '/images/products/10/tw-10.png'],
    stock: 24,
    rating: { average: 4.6, count: 128 },
    featured: true,
    name: {
      en: 'TW-10 Wireless Portable Tracker',
      ta: 'கை வேலைப்பாடு மட்பாண்ட கோப்பை',
      hi: 'हस्तनिर्मित मिट्टी का मग'
    },
    shortDescription: {
      en: 'Vehicle GPS Tracker',
      ta: 'கை வேலைப்பாடு மட்பாண்ட கோப்பை',
      hi: 'हस्तनिर्मित मिट्टी का मग'
    },
    description: {
      en: 'Trakway 10000mAh Wireless GPS Tracker  is a heavy-duty, all-weather tracking solution designed for vehicles, assets, and personal safety. Featuring a magnetic mounting system, ultra-long battery performance, live GPS tracking, and remote voice monitoring, it delivers accurate real-time location monitoring through Android and iOS mobile applications.',
      ta: 'கையால் வடிவமைக்கப்பட்ட மட்பாண்ட கோப்பை. ஒவ்வொன்றும் தனித்துவமான வடிவமைப்புடன் இருக்கும்.',
      hi: 'हाथ से बना मिट्टी का मग। हर टुकड़ा अपने अनोखे ग्लेज़ पैटर्न के साथ अद्वितीय है।'
    },
    badge: ['2G GPS', 'All Vehicles'],
    features: [
      {
        position: 'top-1',
        icon: 'location',
        label: 'Live GPS Tracking & Route History',
        description:
          'High-sensitivity GPS chip sends location updates to cloud servers, enabling real-time tracking and full-day driving history playback.'
      },
      {
        position: 'top-2',
        icon: 'battery',
        label: 'Extended Battery Life',
        description:
          'High-capacity 10,000 mAh battery lasts up to 1 year on single daily updates, up to 50 days at 5–10 minute intervals, or 22–25 days at fast 10–20 second tracking intervals.'
      },
      {
        position: 'top-3',
        icon: 'phone',
        label: 'Voice Monitoring & Security',
        description:
          'Integrated microphone allows calling in to listen to surrounding audio (requires active voice SIM), backed by over-speed alerts and light-sensor tamper alarms.'
      },
      {
        position: 'left-1',
        icon: 'map',
        label: 'Advanced Navigation & Offline Logging',
        description:
          'Supports EPO auxiliary positioning, turning-point angle updates for smooth trajectory mapping, and stores up to 600 location points offline during cellular blind spots.'
      },
      {
        position: 'left-2',
        icon: 'drop',
        label: 'All-Weather Waterproof Build',
        description:
          'Fully waterproof and dustproof body operates across extreme temperature ranges from -25°C to +75°C.'
      }
    ],
    highlights: [
      'Live Tracking , Voice Monitoring, Magnetic',
      'Battery Life 25-30 Days',
      'Gsm, Gps, Lbs',
      '1 Year Warranty',
    ],
    benefitsEyebrow: 'BUILT TO TRACK',
    benefitsHeading: 'What the X3 GPS Tracker does',
    benefitsSubheading: 'A multifunctional tracker built for fleet management and security monitoring.',
    packageDetails: [
      { label: 'Hardware Warranty', value: '1 Year' },
      { label: 'App Software Access', value: 'First year FREE (₹750/year after Year 1)' },
      {
        label: 'SIM Card Connectivity',
        value:
          'Pre-installed inactive SIM. Recharge for ₹1200/year, or insert your own active SIM card.'
      },
      {
        label: 'Setup Guide',
        value: 'Step-by-step activation instructions included in the box user manual.'
      }
    ],
    boxContents: [
      'Trakway Wireless GPS tracking unit, ',
      'USB charging cable',
      'User manual and step-by-step activation guide.',
 
    ],
    specifications: [
      {
        title: 'Technical Specifications',
        rows: [
          { label: 'Dimensions', value: '86 mm × 62 mm × 30 mm' },
          { label: 'Weight', value: '255 g' },
          { label: 'Battery Capacity', value: '10,000 mAh' },
          { label: 'Working Voltage', value: 'DC 5V' },
          {
            label: 'Power Consumption',
            value: 'Motion: 46mA@4V, Static: 7.5mA@4V, Power Saving: 70µA@4V, Standby: <3.5µA'
          },
          { label: 'Location Accuracy', value: '<10 meters (GPS + EPO Auxiliary)' },
          { label: 'Cellular Communication', value: 'GPRS / GSM (850/900/1800/1900 MHz) via TCP' },
          { label: 'Operating Temperature', value: '-25°C to +75°C' },
          { label: 'Storage Temperature', value: '-40°C to +85°C' },
          { label: 'Blind Spot Storage', value: 'Buffers up to 600 logs offline' }
        ]
      }
    ]
  }
];

export function findProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

// Shape returned by the REST API — locale-resolved, no Record<Locale, string> leaking out.
export type ApiProduct = {
  id: string;
  slug: string;
  category: string;
  name: string;
  shortDescription: string;
  description: string;
  specifications: ProductSpecSection[];
  price: number;
  originalPrice?: number;
  currency: 'INR';
  image: string;
  images: string[];
  inStock: boolean;
  stock: number;
  rating: { average: number; count: number };
  featured: boolean;
  badge: string[];
  features: ProductFeature[];
  highlights: string[];
  benefitsEyebrow: string;
  benefitsHeading: string;
  benefitsSubheading: string;
  packageDetails: ProductPackageRow[];
  boxContents: string[];
};

export function toApiProduct(product: Product, locale: Locale): ApiProduct {
  return {
    id: product.id,
    slug: product.slug,
    category: product.category,
    name: product.name[locale],
    shortDescription: product.shortDescription[locale],
    description: product.description[locale],
    specifications: product.specifications,
    price: product.price,
    originalPrice: product.originalPrice,
    currency: product.currency,
    image: product.images[0],
    images: product.images,
    inStock: product.stock > 0,
    stock: product.stock,
    rating: product.rating,
    featured: product.featured,
    badge: product.badge,
    features: product.features,
    highlights: product.highlights,
    benefitsEyebrow: product.benefitsEyebrow,
    benefitsHeading: product.benefitsHeading,
    benefitsSubheading: product.benefitsSubheading,
    packageDetails: product.packageDetails,
    boxContents: product.boxContents
  };
}
