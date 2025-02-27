'use client';

import React, { useEffect, useState } from 'react';

import Subscriptions from '../subscriptions/page';

import AddNewUser from '@/components/AddNewUser';

import { Users } from '@/components/Users';
import { fetchCurrentCompany } from '@/service/api';
import Logout from '@/components/Logout';
import FileUpload from '@/components/UploadFile';
import axios from 'axios';

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
  const [allFiles, setAllFiles] = useState(null);

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
    return <div>Loading...</div>;
  }

  // if (error) {
  //   return <div>Error: {error}</div>;
  // }

  if (!companystate) return null;

  return (
    <div>
      <h1>CompanyName : {companystate.name}</h1>
      <div className=' w-full grid grid-cols-2  gap-3 300 h-[800px] flex-wrap'>
        <div className=' bg-red-300 h-[300px] w-[300px] justify-self-end self-end grid justify-center items-center'>
          {' '}
          View Users Dashboard
        </div>
        <div className=' bg-green-300 h-[300px] w-[300px] justify-self-start self-end'></div>
        <div className=' bg-blue-400 h-[300px] col-span-2 justify-self-center w-[300px] '></div>
      </div>
      <Logout />
      <FileUpload />
      <Users />
      <AddNewUser />
      {allFiles &&
        allFiles.map((file, i) => <div key={i}> {file.fileUrl}</div>)}
      <Subscriptions company={companystate} />
    </div>
  );
}

export default HomePage;
