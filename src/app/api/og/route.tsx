import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #064e3b 0%, #022c22 100%)',
          fontFamily: 'system-ui',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            border: '4px solid #10b981',
            borderRadius: '24px',
            padding: '48px',
            background: 'rgba(0, 0, 0, 0.4)',
          }}
        >
          <div
            style={{
              fontSize: 80,
              fontWeight: 'bold',
              background: 'linear-gradient(180deg, #d4af37 0%, #f4e4a6 50%, #d4af37 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              marginBottom: 24,
            }}
          >
            MiniSudoku
          </div>
          
          <div
            style={{
              fontSize: 32,
              color: '#86efac',
              marginBottom: 48,
              textAlign: 'center',
            }}
          >
            Play Sudoku - Win USDC - Compete for Prize Pool
          </div>

          <div
            style={{
              display: 'flex',
              gap: 32,
              marginTop: 24,
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '24px 32px',
                background: 'rgba(0, 0, 0, 0.3)',
                borderRadius: '16px',
                border: '2px solid #059669',
              }}
            >
              <div style={{ fontSize: 24, color: '#86efac', marginBottom: 8 }}>
                Entry Fee
              </div>
              <div
                style={{
                  fontSize: 48,
                  fontWeight: 'bold',
                  background: 'linear-gradient(180deg, #d4af37 0%, #f4e4a6 50%, #d4af37 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                $0.30
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '24px 32px',
                background: 'rgba(0, 0, 0, 0.3)',
                borderRadius: '16px',
                border: '2px solid #059669',
              }}
            >
              <div style={{ fontSize: 24, color: '#86efac', marginBottom: 8 }}>
                Prize Pool
              </div>
              <div
                style={{
                  fontSize: 48,
                  fontWeight: 'bold',
                  background: 'linear-gradient(180deg, #d4af37 0%, #f4e4a6 50%, #d4af37 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                USDC
              </div>
            </div>
          </div>

          <div
            style={{
              fontSize: 24,
              color: '#86efac',
              marginTop: 48,
              textAlign: 'center',
            }}
          >
            Play now and compete for the 24-hour prize pool!
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 1200,
    }
  );
}
