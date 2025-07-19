"use client";

import Link from "next/link";

export default function CustomOrderThankYou() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="p-8 w-full max-w-md text-center bg-white rounded-xl shadow-lg">
        <h1 className="mb-6 text-3xl font-bold text-purple-600">Thank You for Your Custom Order!</h1>
        <p className="mb-4 text-lg text-gray-700">
          We have received your request. We will call you shortly to confirm details.<br />
          For urgent queries or to follow up, you can reach us on Instagram:
        </p>
        <Link href="https://www.instagram.com/krati_kreates?igsh=cHhod283Z214YTIx" target="_blank" className="inline-block px-4 py-2 mt-4 font-semibold text-white bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg hover:from-pink-600 hover:to-purple-600">
          Go to Instagram
        </Link>
      </div>
    </div>
  );
} 