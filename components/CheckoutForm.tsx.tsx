// components/CheckoutForm.tsx
'use client';

import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from '@stripe/react-stripe-js';
import { createCheckoutSession } from '@/app/actions/stripe';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

interface CheckoutFormProps {
  companyId: string;
  clientSecret?: string; // Passed from signup
}

export default function CheckoutForm({
  companyId,
  clientSecret: initialClientSecret,
}: CheckoutFormProps) {
  const [clientSecret, setClientSecret] = useState<string | null>(
    initialClientSecret || null
  );
  const [loading, setLoading] = useState(!initialClientSecret);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!initialClientSecret) {
      const fetchClientSecret = async () => {
        try {
          const formData = new FormData();
          formData.append('uiMode', 'embedded');
          formData.append('companyId', companyId);

          const { client_secret } = await createCheckoutSession(formData);
          setClientSecret(client_secret);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchClientSecret();
    } else {
      setLoading(false);
    }
  }, [companyId, initialClientSecret]);

  if (loading) return <div>Loading Checkout...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div id='checkout'>
      {clientSecret && (
        <EmbeddedCheckoutProvider
          stripe={stripePromise}
          options={{ clientSecret }}
        >
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      )}
    </div>
  );
}
