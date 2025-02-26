'use client';

import React, { useEffect } from 'react';

import Subscriptions from '../subscriptions/page';

import AddNewUser from '@/components/AddNewUser';

import { UseCurrentCompany } from '@/app/zustand/useCompanyActive';
import { Users } from '@/components/Users';

if (process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY === undefined) {
  throw new Error('NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined');
}

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
  const { company, fetchCompany, loading, error } = UseCurrentCompany();
  useEffect(() => {
    fetchCompany();
  }, [fetchCompany]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!company) return null;

  return (
    <div>
      <h1>CompanyName : {company.name}</h1>
      <Users />
      <AddNewUser />
      <Subscriptions company={company} />
    </div>
  );
}

export default HomePage;
