'use client';
import CompanySubscription from '@/components/CompanySubscription';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import convertToSubcurrency from '@/lib/convertToSubcurrency';
import CheckoutPage from '@/components/CheckoutPage';
import Subscriptions from '../subscriptions/page';

if (process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY === undefined) {
  throw new Error('NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined');
}
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export interface ICompany {
  country: string;
  email: string;
  industry: string;
  name: string;
  plan: string;
  stripeCustomerId: string;
  subscriptionId: string;
  __v: number;
  _id: string;
}
function HomePage() {
  const [company, setCompany] = useState<ICompany | undefined>();
  useEffect(() => {
    async function getCopmanies() {
      const { data } = await axios.get('/api/current-company', {
        withCredentials: true,
      });

      console.log(data, 'data');
      setCompany(data.data);
    }
    getCopmanies();
  }, []);

  console.log(company, 'company');
  // useEffect(() => {
  //   async function getCompanies() {
  //     const { data } = await axios.get(`http://localhost:3000/companies`, {
  //       withCredentials: true,
  //     });

  //     setCompanies(data);
  //   }
  //   getCompanies();
  // }, []);
  // console.log(companies, 'companies');

  const amount = 49.99;

  if (!company) return null;

  return (
    <div>
      <h1>CompanyName : {company.name}</h1>
      <main className='max-w-6xl mx-auto p-10 text-white text-center border m-10 rounded-md bg-gradient-to-tr from-blue-500 to-purple-500'>
        <div className='mb-10'>
          <h1 className='text-4xl font-extrabold mb-2'>Sonny</h1>
          <h2 className='text-2xl'>
            has requested
            <span className='font-bold'> ${amount}</span>
          </h2>
        </div>

        <Elements
          stripe={stripePromise}
          options={{
            mode: 'payment',
            amount: convertToSubcurrency(amount),
            currency: 'usd',
          }}
        >
          <CheckoutPage amount={amount} />
        </Elements>
      </main>

      <CompanySubscription company={company} />
      <Subscriptions />
    </div>
  );
}

export default HomePage;
