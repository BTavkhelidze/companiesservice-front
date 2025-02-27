'use client';

import React, { useEffect, useState } from 'react';

import Subscriptions from '../subscriptions/page';

import AddNewUser from '@/components/AddNewUser';

import { Users } from '@/components/Users';
import { fetchCurrentCompany } from '@/service/api';
import Logout from '@/components/Logout';

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
  const [companystate, setCompanystate] = useState<ICompany | undefined>();
  const [loading, setLoading] = useState(true);

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
        setLoading(false);
      }
    };

    getCompanyData();
  }, []);

  console.log(companystate, 'sssssssssss');

  if (loading) {
    return <div>Loading...</div>;
  }

  // if (error) {
  //   return <div>Error: {error}</div>;
  // }

  if (!companystate) return null;

  return (
    <div>
      <h1>CompanyName : {companystate.name}</h1>
      <Logout />
      <Users />
      <AddNewUser />
      <Subscriptions company={companystate} />
    </div>
  );
}

export default HomePage;
