'use client';

import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';

import { ICompany } from '../home/page';
import { fetchCurrentCompany } from '@/service/api';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

interface Plan {
  id: string;
  name: string | null;
  description?: string | null;
  price: number;
  interval?: string;
  price_id: string;
  images: string | null;
}

const Subscription = () => {
  const [plans, setPlans] = useState([]);

  const [companystate, setCompanystate] = useState<ICompany | undefined>();
  useEffect(() => {
    const getCompanyData = async () => {
      try {
        const data = await fetchCurrentCompany();
        if (data.status === 200) {
          setCompanystate(data.data);
        }
      } catch (error) {
        console.error('Failed to fetch company data:', error);
      } finally {
      }
    };

    getCompanyData();
  }, []);

  useEffect(() => {
    fetch('/api/subscription-plans')
      .then((res) => res.json())
      .then((data) => setPlans(data))
      .catch((error) =>
        console.error('Error fetching subscription plans:', error)
      );
  }, []);

  const handleSubscribe = async (plan: Plan) => {
    try {
      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error('Stripe has not been initialized');
      }

      const createCheckoutSession = async () => {
        const response = await fetch('/api/create-checkout-Session', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            priceId: plan.price_id,
            planName: plan.name,
            planPrice: plan.price,
          }),
        });
        const data = await response.json();

        return data.sessionId;
      };

      const sessionId = await createCheckoutSession();
      const result = await stripe.redirectToCheckout({ sessionId });

      if (result.error) {
        console.error(result.error.message);
      }
    } catch (error) {
      console.error('Subscription error:', error);
    }
  };

  if (!companystate) return null;

  return (
    <div className='mx-auto px-4 py-8 bg-background text-textColor'>
      <div className='text-center mb-12'>
        <h1 className='text-5xl font-bold text-gray-900 dark:text-white'>
          current plan: {companystate.plan}
        </h1>
        <p className='text-gray-500 dark:text-gray-300 mt-3 text-lg'>
          Choose a plan that fits your needs and start using our product today.
        </p>
      </div>
      <div className='container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto'>
        {plans.map((plan: Plan) => (
          <div
            key={plan.id}
            className='flex flex-col justify-between border border-gray-300 rounded-xl shadow-md p-8 bg-[#955251] hover:shadow-xl transition-shadow duration-300 dark:bg-gray-900'
          >
            <div className='flex flex-col items-center'>
              <h2 className='text-3xl font-semibold text-gray-300 dark:text-gray-100 mb-5'>
                {plan.name}
              </h2>

              <p className='text-gray-300 dark:text-gray-300 mt-2 mb-6'>
                {plan.description}
              </p>
              <p className='text-lg font-medium text-gray-400 dark:text-gray-100 mb-6'>
                ${plan.price / 100} / {plan.interval}
              </p>
            </div>
            <button
              onClick={() => handleSubscribe(plan)}
              className='mt-auto bg-cyan-500 text-white px-6 py-3 rounded-lg w-full font-medium hover:bg-blue-700 transition-colors'
            >
              {plan.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Subscription;
