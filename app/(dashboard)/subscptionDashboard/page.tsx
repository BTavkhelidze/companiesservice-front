'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Subscription from '../subscriptions/page';
import { fetchCurrentCompany } from '@/service/api';
import { ICompany } from '../home/page';

function SubscriptionPage() {
  const [companystate, setCompanystate] = useState<ICompany | undefined>();

  const router = useRouter();

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

  if (!companystate) return null;

  return (
    <div className='px-3 md:px-[50px] mt-10'>
      <p
        className='font-semibold text-xl mb-10  cursor-pointer'
        onClick={() => router.push('/home')}
      >
        {'< '}
      </p>
      <div className='flex px-10 pt-10 flex-col'>
        <Subscription />
      </div>
    </div>
  );
}

export default SubscriptionPage;
