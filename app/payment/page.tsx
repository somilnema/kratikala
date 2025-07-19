'use client';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const Payment = dynamic(() => import('../components/Payment'), {
  ssr: false, // disables server-side rendering
});

export default function PaymentPage() {
  return (
    <Suspense fallback={<div>Loading Payment...</div>}>
      <Payment />
    </Suspense>
  );
}
