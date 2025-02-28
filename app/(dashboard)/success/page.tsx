/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import axios from 'axios';

export default function SuccessPage() {
  const [status, setStatus] = useState('loading');
  const [, setCustomerEmail] = useState('');
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  const planName = searchParams.get('plan_name');

  const router = useRouter();

  const PushRoute = () => {
    router.push('/home');
  };

  useEffect(() => {
    if (sessionId) {
      fetchSessionStatus();
    } else {
      console.error('No session ID provided in URL.');
      setStatus('failed');
    }
  }, [sessionId]);

  async function fetchSessionStatus() {
    try {
      const response = await fetch(`/api/check-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sessionId }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch session details.');
      }

      const { session } = await response.json();

      if (session.payment_status) {
        setStatus(session.payment_status);

        setCustomerEmail(
          session.customer_details?.email || 'No email provided'
        );
        if (session.payment_status === 'paid') {
          let payment;
          if (session.amount_total == 0) payment = 'free';
          if (session.amount_total == 499) payment = 'basic';
          if (session.amount_total == 1299) payment = 'premium';

          const data = {
            stripeCustomerId: session.customer,
            subscriptionId: session.subscription,
            plan: payment,
          };
          const update = async () => {
            await axios.post('/api/company', data, {
              withCredentials: true,
              headers: {
                'Content-Type': 'application/json',
              },
            });
          };
          update();
          setTimeout(() => {
            PushRoute();
          }, 5000);
        }
      } else {
        throw new Error('Missing required session details.');
      }
    } catch (error) {
      console.error('Error fetching session:', error);
      setStatus('failed');
    }
  }

  if (status === 'loading') {
    return (
      <div className='flex items-center justify-center h-screen bg-gray-100'>
        <div className='text-lg font-semibold text-gray-700'>
          {/* <LoadingSpinner /> */}
        </div>
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className='flex items-center justify-center h-screen bg-red-100'>
        <div className='p-6 bg-white rounded shadow-md'>
          <h1 className='text-2xl font-bold text-red-600'>
            Subscription Failed
          </h1>
          <p className='mt-4 text-gray-600'>
            Failed to process subscription. Please try again.
          </p>
        </div>
      </div>
    );
  }

  if (status === 'unknown') {
    return (
      <div className='flex items-center justify-center h-screen border-red-500'>
        <div className='text-center space-y-4'>
          <div className='text-red-500 text-5xl'>✕</div>
          <h1 className='text-2xl font-semibold text-gray-900'>
            Payment Failed
          </h1>
          <p className='text-gray-600'>
            We couldn't process your subscription. Please try again.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='flex px-6 items-center justify-center h-screen bg-green-100'>
      <div className='flex  items-center justify-center  bg-green-400 '>
        <div className='p-6 flex gap-7 flex-col bg-white items-center rounded shadow-md text-center'>
          <div className='animate-check'>
            <div className='w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto'>
              <svg
                className='w-8 h-8 text-green-500'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M5 13l4 4L19 7'
                />
              </svg>
            </div>
          </div>

          <div className='space-y-2'>
            <h1 className='text-2xl font-semibold text-gray-900'>
              Payment Successful
            </h1>
            <p className='text-gray-600'>
              Your <span className='font-medium text-blue-600'>{planName}</span>{' '}
              plan is now active
            </p>
          </div>
          <button
            type='button'
            className='w-full py-2 px-4 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors'
            onClick={() => PushRoute()}
          >
            Go Back
          </button>
          <p className='text-sm text-gray-500'>
            Redirecting automatically in 5 seconds...
          </p>
        </div>
      </div>
    </div>
  );
}
