'use client';

import { useSearchParams } from 'next/navigation';

export default function PaymentPage() {
  const searchParams = useSearchParams();
  const amount = searchParams?.get('amount');

  return (
    <div>
      <h2>Payment Page</h2>
      <p>Amount: {amount}</p>
    </div>
  );
}
