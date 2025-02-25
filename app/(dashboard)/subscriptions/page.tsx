import Link from 'next/link';
import React from 'react';

function Subscriptions() {
  return (
    <div className='bg-yellow-400'>
      {' '}
      <ul className='flex  justify-between gap-4 px-3'>
        <li className='flex flex-col w-full bg-gray-600'>
          <Link
            href='/donate-with-embedded-checkout'
            className='card checkout-style-background'
          >
            <h2 className='bottom'>free</h2>
          </Link>
        </li>
        <li className='bg-gray-600 w-full'>
          <Link
            href='/donate-with-checkout'
            className='card checkout-style-background'
          >
            <h2 className='bottom'>Basic</h2>
          </Link>
        </li>
        <li className='bg-gray-600 w-full'>
          <Link
            href='/donate-with-elements'
            className='card elements-style-background'
          >
            <h2 className='bottom'>Premium</h2>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Subscriptions;
