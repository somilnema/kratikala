"use client"
import { useState, useEffect, useRef } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { QrCode, Loader2, CreditCard } from 'lucide-react'

function Payment() {
  const searchParams = useSearchParams()
  const amount = searchParams ? searchParams.get('amount') : null
  const [isLoading, setIsLoading] = useState(false)
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('')
  const [upiLink, setUpiLink] = useState<string>('')
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null)
  const [paymentAmount, setPaymentAmount] = useState<string>('')
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [utr, setUtr] = useState('');
  const [finalSubmitted, setFinalSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const router = useRouter(); // Initialize the router

  useEffect(() => {
    if (amount) {
      setPaymentAmount(amount)
    }
  }, [amount])

  const generateQR = () => {
    if (!paymentAmount || parseFloat(paymentAmount) <= 0) {
      alert('Please enter a valid amount')
      return
    }

    setIsLoading(true)
    setQrCodeUrl('') // Clear previous QR code

    const upiId = "somil.nema@ybl"
    const businessName = "Krati Kala"
    const upiLinkData = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(businessName)}&am=${paymentAmount}&cu=INR&mc=0000&tn=Payment+for+order`

    setUpiLink(upiLinkData)

    // Simulate API delay
    setTimeout(() => {
      const qrAPI = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(upiLinkData)}`
      setQrCodeUrl(qrAPI)
      setIsLoading(false)
    }, 1500)
  }

  const handlePayment = async () => {
    if (upiLink) {
      try {
        setPaymentStatus(null); // Reset payment status before processing
        setIsLoading(true); // Show loading state

        // Simulate an API call for payment processing
        await new Promise((resolve, reject) => {
          setTimeout(() => {
            const isSuccess = true; // Change this to false to simulate a failure
            if (isSuccess) {
              resolve("Payment successful!");
            } else {
              reject("Payment failed. Please try again.");
            }
          }, 2000); // Simulate a 2-second delay for payment processing
        });

        setPaymentStatus("Payment successful! Thank you for your purchase.");
        // Redirect to confirmation page
        router.push('/confirmation');
      } catch (error) {
        setPaymentStatus("Payment failed. Please try again.");
      } finally {
        setIsLoading(false); // Hide loading state
      }
    }
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!screenshot || !utr.trim()) {
      alert('Please upload a screenshot and enter the UTR number.');
      return;
    }
    setFinalSubmitted(true);
    // Here you would send the screenshot and UTR to your backend
  };

  return (
    <div className="flex justify-center items-center p-4 min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="p-6 space-y-6 w-full max-w-md bg-white rounded-2xl shadow-xl">
        <div className="text-center">
          <div className="inline-block p-3 mb-4 bg-blue-50 rounded-full">
            <QrCode className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">QR Code Payment</h1>
          <p className="mt-2 text-gray-500">Amount: {paymentAmount} INR</p>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <span
              className="px-4 py-3 w-full text-gray-600 bg-gray-100 rounded-lg border border-gray-200 transition-all"
            >
              {paymentAmount} INR
            </span>
            <span className="absolute right-4 top-1/2 text-gray-400 -translate-y-1/2">
              INR
            </span>
          </div>

          <button
            onClick={generateQR}
            disabled={isLoading}
            className="flex gap-2 justify-center items-center py-3 w-full font-medium text-white bg-blue-600 rounded-lg transition-colors hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Generating QR...
              </>
            ) : (
              'Generate QR Code'
            )}
          </button>
        </div>

        <div className="space-y-4">
          {isLoading && (
            <div className="overflow-hidden w-full h-1 bg-gray-100 rounded-full">
              <div className="h-full bg-blue-600 rounded-full animate-loading-bar"></div>
            </div>
          )}

          {qrCodeUrl && (
            <div className="space-y-4">
              <div className="flex justify-center">
                <img
                  src={qrCodeUrl}
                  alt="Payment QR Code"
                  className="object-contain w-48 h-48"
                />
              </div>
              <button
                onClick={handlePayment}
                className="flex gap-2 justify-center items-center py-3 w-full font-medium text-white bg-green-600 rounded-lg transition-colors hover:bg-green-700"
              >
                <CreditCard className="w-5 h-5" />
                Make Payment
              </button>
            </div>
          )}
        </div>

        <div className="text-sm text-center text-gray-500">
          Secure payments powered by UPI
        </div>

        {paymentStatus && (
          <div className="mt-4 text-center text-green-600">
            {paymentStatus}
          </div>
        )}
        {/* Screenshot and UTR upload after payment success */}
        {paymentStatus === "Payment successful! Thank you for your purchase." && !finalSubmitted && (
          <form onSubmit={handleFinalSubmit} className="mt-6 space-y-4">
            <div>
              <label className="block mb-2 font-medium text-gray-700">Upload Payment Screenshot (with visible UTR)</label>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={e => setScreenshot(e.target.files ? e.target.files[0] : null)}
                className="block w-full text-sm text-gray-700 rounded-lg border border-gray-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              {screenshot && (
                <img
                  src={URL.createObjectURL(screenshot)}
                  alt="Screenshot Preview"
                  className="object-contain mt-2 w-full max-h-48 rounded border"
                />
              )}
            </div>
            <div>
              <label className="block mb-2 font-medium text-gray-700">Enter UTR Number</label>
              <input
                type="text"
                value={utr}
                onChange={e => setUtr(e.target.value)}
                className="px-3 py-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter UTR number from payment receipt"
                required
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 w-full font-semibold text-white bg-green-600 rounded-lg transition-colors hover:bg-green-700"
            >
              Submit Payment Proof
            </button>
          </form>
        )}
        {finalSubmitted && (
          <div className="mt-4 font-semibold text-center text-blue-600">
            Thank you! Your payment proof has been submitted.
          </div>
        )}
      </div>
    </div>
  )
}

export default Payment 