import { ImageResponse } from 'next/og';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0038A8 0%, #001d5c 50%, #0038A8 100%)',
          fontFamily: 'sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Ambient glow circles */}
        <div
          style={{
            position: 'absolute',
            top: '-80px',
            right: '-80px',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.08)',
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-100px',
            left: '50px',
            width: '350px',
            height: '350px',
            borderRadius: '50%',
            background: 'rgba(252,209,22,0.12)',
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '0',
            left: '0',
            right: '0',
            height: '8px',
            background: '#CE1126',
            display: 'flex',
          }}
        />

        {/* Flag emoji */}
        <div
          style={{
            fontSize: '56px',
            marginBottom: '16px',
            display: 'flex',
          }}
        >
          🇵🇭
        </div>

        {/* Title */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              fontSize: '96px',
              fontWeight: 900,
              color: '#FCD116',
              lineHeight: 0.9,
              letterSpacing: '-4px',
              display: 'flex',
            }}
          >
            7,641
          </div>
          <div
            style={{
              fontSize: '42px',
              fontWeight: 900,
              color: 'white',
              letterSpacing: '16px',
              textTransform: 'uppercase',
              marginTop: '8px',
              display: 'flex',
            }}
          >
            ISLANDS
          </div>
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: '20px',
            fontWeight: 600,
            color: 'rgba(255,255,255,0.75)',
            marginTop: '24px',
            textAlign: 'center',
            maxWidth: '800px',
            lineHeight: 1.5,
            display: 'flex',
          }}
        >
          Philippines Information Portal & Travel Guide — Discover cuisines, culture, phrases & destinations
        </div>

        {/* Bottom tags */}
        <div
          style={{
            display: 'flex',
            gap: '12px',
            marginTop: '32px',
          }}
        >
          {['Luzon', 'Visayas', 'Mindanao'].map((region) => (
            <div
              key={region}
              style={{
                background: 'rgba(255,255,255,0.12)',
                border: '1px solid rgba(255,255,255,0.15)',
                color: 'white',
                padding: '8px 20px',
                borderRadius: '24px',
                fontSize: '14px',
                fontWeight: 700,
                letterSpacing: '2px',
                textTransform: 'uppercase',
                display: 'flex',
              }}
            >
              {region}
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
