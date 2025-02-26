import { useState } from 'react';

import { ICompany } from '@/app/(dashboard)/home/page';
import axios from 'axios';

export default function CompanySubscription({
  company,
}: {
  company: ICompany;
}) {
  const [loading, setLoading] = useState(false);

  const handleUpdateSubscription = async (priceId: string) => {
    setLoading(true);
    const body = priceId;

    try {
      await axios.patch(
        `http://localhost:3000/companies/${company._id}/subscription`,
        body,
        {
          withCredentials: true,
        }
      );
    } catch (error) {
      console.error('Error updating subscription:', error);
    }
    setLoading(false);
  };

  return (
    <div className='bg-red-300'>
      <h2>
        {company.name} - Current Plan: {company.plan}
      </h2>
      <button
        onClick={() =>
          handleUpdateSubscription('price_1QvwQMLBnqqETekEKGFacdWz')
        }
        disabled={loading || company.plan === 'Basic'}
      >
        {loading ? 'Loading...' : 'Upgrade to Basic'}
      </button>
      <button
        onClick={() =>
          handleUpdateSubscription('price_1QvwXRLBnqqETekESqovHYqo')
        }
        disabled={loading || company.plan === 'free'}
      >
        {loading ? 'Loading...' : 'Downgrade to Free'}
      </button>
    </div>
  );
}
