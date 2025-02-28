'use client';
import AddNewUser from '@/components/AddNewUser';
import { Users } from '@/components/Users';
import { useRouter } from 'next/navigation';
import React from 'react';

function UsersPage() {
  const router = useRouter();
  return (
    <div className='px-3 md:px-[50px] mt-10'>
      <p
        className='font-semibold text-xl mb-10  cursor-pointer'
        onClick={() => router.push('/home')}
      >
        {'< '}
      </p>

      <div className='pt-4'>
        <div className='w-[150px] cursor-pointer'>
          <AddNewUser />
        </div>
        <div className='mt-10 px-8'>
          <Users />
        </div>
      </div>
    </div>
  );
}

export default UsersPage;
