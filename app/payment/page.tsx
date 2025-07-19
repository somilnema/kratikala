import dynamic from 'next/dynamic';

export const dynamicMode = 'force-dynamic';

const PaymentPage = dynamic(() => import('./PaymentClientPage'), { ssr: false });

export default PaymentPage;
