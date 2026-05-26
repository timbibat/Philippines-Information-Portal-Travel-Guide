import App from '../App';

// JSON-LD Structured Data for rich search results
function JsonLd() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        name: 'Philippines Information Portal & Travel Guide',
        url: 'https://philippine-info.vercel.app/',
        description:
          'Discover the 7,641 islands of the Philippines — explore regional destinations, local cuisines, Filipino phrases, heritage trivia, and plan your trip with Bayani, your AI travel concierge.',
        inLanguage: 'en',
        publisher: {
          '@type': 'Person',
          name: 'Timothy Irwin Bibat',
        },
      },
      {
        '@type': 'TouristDestination',
        name: 'Philippines',
        description:
          'A spectacular archipelago of 7,641 islands featuring pristine beaches, ancient rice terraces, rich cultural heritage, and world-famous cuisines across three major island groups: Luzon, Visayas, and Mindanao.',
        touristType: ['Cultural tourism', 'Beach tourism', 'Adventure tourism', 'Culinary tourism'],
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 14.5995,
          longitude: 120.9842,
        },
        containedInPlace: {
          '@type': 'Country',
          name: 'Philippines',
        },
        includesAttraction: [
          {
            '@type': 'TouristAttraction',
            name: 'El Nido & Bacuit Archipelago',
            description: 'World-renowned for dramatic limestone cliffs rising out of turquoise lagoons with white sand beaches and coral gardens.',
          },
          {
            '@type': 'TouristAttraction',
            name: 'Banaue Rice Terraces',
            description: 'UNESCO heritage site carved over 2,000 years ago, often called the Eighth Wonder of the World.',
          },
          {
            '@type': 'TouristAttraction',
            name: 'Chocolate Hills',
            description: 'Over 1,260 symmetrical dome-shaped hills in Bohol that turn chocolate-brown during dry season.',
          },
          {
            '@type': 'TouristAttraction',
            name: 'Boracay Island',
            description: 'Famous worldwide for its 4-kilometer White Beach of ultra-fine shell sand and spectacular sailing sunsets.',
          },
          {
            '@type': 'TouristAttraction',
            name: 'Siargao Island',
            description: 'The Surf Capital of the Philippines, home to the iconic Cloud 9 wave.',
          },
          {
            '@type': 'TouristAttraction',
            name: 'Historic City of Vigan',
            description: 'UNESCO World Heritage Site and one of the best-preserved Spanish colonial towns in Asia.',
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'How many islands make up the Philippines?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The Philippines consists of 7,641 islands, divided into three major island groups: Luzon, Visayas, and Mindanao.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is the national dish of the Philippines?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Adobo is widely regarded as the unofficial national dish — meat slow-stewed in vinegar, soy sauce, garlic, bay leaves, and peppercorns.',
            },
          },
          {
            '@type': 'Question',
            name: 'What are the official languages of the Philippines?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The Philippines has two official languages: Filipino (based on Tagalog) and English. Over 175 other dialects and languages are spoken across the archipelago.',
            },
          },
          {
            '@type': 'Question',
            name: 'When is the best time to visit the Philippines?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The dry season from November to May is generally the best time to visit, though the ideal months vary by region. The typhoon season runs from June to October.',
            },
          },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export default function Home() {
  return (
    <>
      <JsonLd />
      <App />
    </>
  );
}
