'use client'

import React, { Suspense } from 'react'
import Payment from '../components/Payment'

export default function PaymentPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center text-gray-500">Loading payment...</div>}>
      <Payment />
    </Suspense>
  )
}
