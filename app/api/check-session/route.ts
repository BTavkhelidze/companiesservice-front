import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '../../../lib/stripe';

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();

    const { sessionId } = JSON.parse(body);

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === 'paid') {
      console.log("Payment status is 'paid'.");
    }

    return NextResponse.json({ session });
  } catch (error) {
    if (error) {
      console.error('Error in POST /api/check-session:');
      return NextResponse.json(
        { error: 'somthing went wrong' },
        { status: 400 }
      );
    }

    console.error('Unknown error occurred:', error);
    return NextResponse.json(
      { error: 'An unknown error occurred.' },
      { status: 500 }
    );
  }
}
