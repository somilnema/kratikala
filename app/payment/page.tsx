import dynamic from 'next/dynamic';

// 👇 This defines the `Payment` component with SSR disabled
const Payment = dynamic(() => import('../components/Payment'), { ssr: false });

export default function PaymentPage() {
  return <Payment />;
}
