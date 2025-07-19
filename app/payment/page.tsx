'use client'

import React, { Suspense } from 'react'
import dynamic from 'next/dynamic';

const PaymentPage = dynamic(() => import('./PaymentClientPage'), { ssr: false });

export default PaymentPage;
