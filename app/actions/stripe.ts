// app/api/checkout/route.ts
'use server';

import { headers } from 'next/headers';

import axios from 'axios';

export async function createCheckoutSession(data: FormData) {
  const uiMode = data.get('uiMode') as 'hosted' | 'embedded';
  const companyId = data.get('companyId') as string;
  const plan = (data.get('plan') as 'free' | 'basic' | 'premium') || 'free'; // Default to free
  const origin = (await headers()).get('origin') as string;

  const priceIds = {
    free: 'price_1QvwXRLBnqqETekESqovHYqo',
    basic: 'price_1QvwQMLBnqqETekEKGFacdWz',
    premium: 'price_1QvwyILBnqqETekEahMiRoul',
  };

  const priceId = priceIds[plan];

  try {
    const endpoint = companyId
      ? `${process.env.NEXT_PUBLIC_API_URL}/companies/${companyId}/checkout`
      : `${process.env.NEXT_PUBLIC_API_URL}/companies/checkout`;
    const response = await axios.post(
      endpoint,
      { priceId },
      {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      }
    );

    const { clientSecret } = response.data;

    return {
      client_secret: clientSecret,
      url:
        uiMode === 'hosted'
          ? `${origin}/success?session_id={CHECKOUT_SESSION_ID}&plan_name=${plan}`
          : null,
    };
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw new Error('Failed to create checkout session');
  }
}
