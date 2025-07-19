"use client";
import React, { Suspense } from 'react';
import Payment from '../components/Payment';

export default function PaymentPage() {
  return (
    <div>
      <Suspense fallback={<div>Loading payment...</div>}>
        <Payment />
      </Suspense>
    </div>
  );
}
