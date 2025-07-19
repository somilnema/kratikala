"use client";

export default function ConfirmationPage() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="p-8 w-full max-w-md text-center bg-white rounded-xl shadow-lg">
        <h1 className="mb-6 text-3xl font-bold text-green-600">Thank You for Your Order!</h1>
        <p className="mb-4 text-lg text-gray-700">
          Your order has been received. You will receive a mail soon for address and other details.
        </p>
        <div className="mt-6">
          <span className="inline-block px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-lg">
            We appreciate your business!
          </span>
        </div>
      </div>
    </div>
  );
} 