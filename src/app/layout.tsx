import type { Metadata } from 'next';
import '../index.css';

const SITE_URL = 'https://philippine-info.vercel.app/';
const SITE_NAME = 'Philippines Information Portal & Travel Guide';
const SITE_DESCRIPTION =
  'Mabuhay! Discover the 7,641 islands of the Philippines — explore Luzon, Visayas, and Mindanao regions, local cuisines like Adobo and Sinigang, Filipino phrases in Tagalog, Cebuano & Ilocano, heritage trivia, and plan your trip with Bayani, your AI travel concierge.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  // Core
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  generator: 'Next.js',
  referrer: 'origin-when-cross-origin',

  // Author
  authors: [{ name: 'Timothy Irwin Bibat' }],
  creator: 'Timothy Irwin Bibat',
  publisher: 'Timothy Irwin Bibat',

  // SEO Keywords
  keywords: [
    'Philippines travel guide',
    'Philippines tourism',
    'Philippine islands',
    'Filipino food',
    'Adobo recipe',
    'Sinigang',
    'Lechon',
    'Halo-Halo',
    'Tagalog phrases',
    'Cebuano phrases',
    'Ilocano phrases',
    'Filipino language',
    'Luzon',
    'Visayas',
    'Mindanao',
    'Palawan',
    'El Nido',
    'Boracay',
    'Siargao',
    'Banaue Rice Terraces',
    'Chocolate Hills Bohol',
    'Vigan Heritage',
    'Cebu City',
    'Philippine culture',
    'Manila travel',
    'Southeast Asia travel',
    'island hopping Philippines',
    'best beaches Philippines',
    'Philippines itinerary',
    'AI travel concierge Philippines',
  ],

  // Category
  category: 'Travel & Tourism',

  // Robots
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // Canonical & Alternates
  alternates: {
    canonical: '/',
  },

  // Open Graph
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Philippines Information Portal — 7,641 Islands of Discovery',
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: ['/opengraph-image'],
  },

  // Format Detection
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="56gLGCBIzoJX5aMJh3flIzaE8EM-nBUjo_aSpDWG-7k" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
