'use client';
import CheckoutForm from '@/components/CheckoutForm.tsx';
import { useParams, usePathname, useSearchParams } from 'next/navigation';

export default function DonatePage(): JSX.Element {
  const params = useSearchParams();
  const plan = params.toString().split('=')[1];

  return (
    <div className='page-container'>
      <h1>Donate with embedded Checkout</h1>
      <p>Donate to our project 💖</p>
      <CheckoutForm uiMode='embedded' plan={plan} />
    </div>
  );
}
