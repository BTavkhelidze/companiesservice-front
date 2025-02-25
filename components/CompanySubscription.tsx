import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { ICompany } from '@/app/(dashboard)/home/page';
import axios from 'axios';

const key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!;

const stripePromise = loadStripe(key)!;

export default function CompanySubscription({
  company,
}: {
  company: ICompany;
}) {
  const [loading, setLoading] = useState(false);

  const handleUpdateSubscription = async (priceId) => {
    setLoading(true);
    const body = priceId;
    console.log(priceId);
    try {
      const response = await axios.patch(
        `http://localhost:3000/companies/${company._id}/subscription`,
        body,
        {
          withCredentials: true,
        }
      );

      console.log('Subscription updated:', response);

      //   if (updatedCompany.subscriptionId) {
      //     const stripe = await stripePromise;
      //     const sessionResponse = await fetch(
      //       `${process.env.NEXT_PUBLIC_API_URL}/create-checkout-session`,
      //       {
      //         method: 'POST',
      //         headers: { 'Content-Type': 'application/json' },
      //         body: JSON.stringify({
      //           subscriptionId: updatedCompany.subscriptionId,
      //         }),
      //       }
      //     );
      //     const { sessionId } = await sessionResponse.json();
      //     await stripe.redirectToCheckout({ sessionId });
      //   }
    } catch (error) {
      console.error('Error updating subscription:', error);
    }
    setLoading(false);
  };

  const updateSubscription = (id) => {};

  return (
    <div className='bg-red-300'>
      <h2>
        {company.name} - Current Plan: {company.plan}
      </h2>
      <button
        onClick={() =>
          handleUpdateSubscription('price_1QvwQMLBnqqETekEKGFacdWz')
        }
        disabled={loading || company.plan === 'Basic'}
      >
        {loading ? 'Loading...' : 'Upgrade to Basic'}
      </button>
      <button
        onClick={() =>
          handleUpdateSubscription('price_1QvwXRLBnqqETekESqovHYqo')
        }
        disabled={loading || company.plan === 'free'}
      >
        {loading ? 'Loading...' : 'Downgrade to Free'}
      </button>
    </div>
  );
}
