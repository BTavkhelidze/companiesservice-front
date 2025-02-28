'use client';

import React, { useEffect, useState } from 'react';

import Subscriptions from '../subscriptions/page';

import AddNewUser from '@/components/AddNewUser';

import { Users } from '@/components/Users';
import { fetchCurrentCompany } from '@/service/api';
import Logout from '@/components/Logout';

import axios from 'axios';
import { useRouter } from 'next/navigation';

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
  users: [];
  filesUrl: [];
  __v: number;
  _id: string;
}
function HomePage() {
  const [companystate, setCompanystate] = useState<ICompany | undefined>();
  const [loading, setLoading] = useState(true);
  const [allFiles, setAllFiles] = useState(null);

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
        setLoading(false);
      }
    };

    getCompanyData();
  }, []);

  useEffect(() => {
    const getFiles = async () => {
      try {
        const response = await axios.get('/api/readAllFiles', {
          withCredentials: true,
        });
        setAllFiles(response.data);
        console.log(response, 'res');
      } catch (error) {
        console.error('Error fetching files:', error);
      }
    };
    getFiles();
  }, []);

  console.log(allFiles, 'ss');

  if (loading) {
    return (
      <div className='w-full mx-auto flex h-screen items-center justify-center'>
        Loading...
      </div>
    );
  }

  if (!companystate) return null;

  return (
    <div className='px-3 md:px-[50px] pt-10 flex flex-col  h-screen'>
      <div className='w-full gap-14 flex'>
        <h1>CompanyName : {companystate.name}</h1>
        <div className='cursor-pointer'>
          <Logout />
        </div>
      </div>
      <div className=' w-full  mx-auto flex h-full  gap-5 300  flex-1    items-center justify-center'>
        <div
          className='p-6 h-[300px] w-[300px] bg-white justify-self-end rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer flex flex-col justify-center items-center border border-gray-100'
          onClick={() => router.push('/users')}
        >
          {' '}
          <p className='groupe-[hover:scale-1 ]'>View Users Dashboard</p>
        </div>
        <div
          className='p-6 h-[300px] w-[300px] bg-white  rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer  flex flex-col justify-center items-center border border-gray-100'
          onClick={() => router.push('/files')}
        >
          {' '}
          <p className='groupe-[hover:scale-1 ]'>View Files Dashboard</p>
        </div>
        <div
          className='p-6 h-[300px] w-[300px] bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer flex flex-col justify-center items-center border border-gray-100'
          onClick={() => router.push('/subscptionDashboard')}
        >
          {' '}
          <p className='groupe-[hover:scale-1 ]'>View Subscription Dashboard</p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
