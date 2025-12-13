import { NextRequest, NextResponse } from 'next/server';

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://your-app.vercel.app';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { untrustedData } = body;
    const fid = untrustedData?.fid;

    // In production, verify the frame message signature
    // For now, we'll proceed with the payment flow

    return NextResponse.json({
      type: 'frame',
      version: 'next',
      image: {
        url: `${APP_URL}/api/og/payment`,
        aspectRatio: '1:1',
      },
      buttons: [
        {
          label: 'Pay with x402',
          action: 'tx',
          target: `${APP_URL}/api/frame/tx`,
          postUrl: `${APP_URL}/api/frame/confirm`,
        },
        {
          label: 'Cancel',
          action: 'post',
          target: `${APP_URL}/api/frame`,
        },
      ],
    });
  } catch (error) {
    console.error('Play frame error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
