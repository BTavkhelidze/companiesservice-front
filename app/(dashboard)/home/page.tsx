'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

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

  if (!companystate) return null;

  return (
    <div className='px-3 md:px-[50px] pt-10 flex flex-col  h-screen'>
      <motion.div
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 220 }}
        className='w-full gap-14 flex'
      >
        <h2>CompanyName : {companystate.name}</h2>
        <div className='cursor-pointer'>
          <Logout />
        </div>
      </motion.div>
      {loading ? (
        <div className='w-full mx-auto flex h-screen items-center justify-center'>
          Loading...
        </div>
      ) : (
        <div className=' w-full overflow-hidden  mx-auto flex h-full  gap-5 300  flex-1    items-center justify-center'>
          <motion.div
            initial={{ x: '-100vw', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className='p-6 h-[300px] w-[300px] bg-white justify-self-end rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer flex flex-col justify-center items-center border border-gray-100'
            onClick={() => router.push('/users')}
          >
            {' '}
            <p className='groupe-[hover:scale-1 ]'>View Users Dashboard</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className='p-6 h-[300px] w-[300px] bg-white  rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer  flex flex-col justify-center items-center border border-gray-100'
            onClick={() => router.push('/files')}
          >
            {' '}
            <p className='groupe-[hover:scale-1 ]'>View Files Dashboard</p>
          </motion.div>
          <motion.div
            initial={{ x: '100vw', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            whileHover={{
              textShadow: '0px 0px 0px rgb(255, 255, 255,)',
            }}
            transition={{ duration: 1 }}
            className='group p-6 h-[300px] w-[300px] bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer flex flex-col justify-center items-center border border-gray-100'
            onClick={() => router.push('/subscptionDashboard')}
          >
            {' '}
            <motion.p
              whileHover={{
                textShadow: '0px 0px 0px rgb(255, 255, 255)',
              }}
              className='group-[hover:text-scale-1.2]'
            >
              View Subscription Dashboard
            </motion.p>
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default HomePage;
