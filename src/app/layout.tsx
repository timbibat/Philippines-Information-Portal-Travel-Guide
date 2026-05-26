import type { Metadata } from 'next';
import '../index.css';

export const metadata: Metadata = {
  title: 'Philippines Information Portal & Travel Guide',
  description: 'Mabuhay! Discover the 7,641 islands of the Philippines, local cuisines, phrases, and tourist tips using Bayani, your AI travel concierge.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
