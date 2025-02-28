'use client';

import React from 'react';

import { useRouter } from 'next/navigation';

export default function OrderSuccess() {
  const router = useRouter();

  const PushRoute = () => {
    router.push('/home');
  };

  setTimeout(() => {
    PushRoute();
  }, 5000);

  return (
    <div className=' h-screen  px-6 flex items-center justify-center bg-green-100'>
      <div className='text-center space-y-4'>
        <div className='text-red-500 text-5xl'>✕</div>
        <h1 className='text-2xl font-semibold text-gray-900'>Payment Failed</h1>
        <p className='text-gray-600'>
          We couldn't process your subscription. Please try again.
        </p>

        <button onClick={() => PushRoute()}> Go Back</button>
      </div>
    </div>
  );
}
