"use client";

import { useRouter } from "next/navigation";
import { useLogin, LoginProvider } from "@/app/context/login";
import React, { useEffect } from "react";

const AccountSettings = () => {
  const { isLoggedIn, logout } = useLogin();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/auth");
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) return null;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-fuchsia-100 via-yellow-100 to-cyan-100">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Account Settings</h1>
        <button
          onClick={() => { logout(); router.push("/auth"); }}
          className="w-full py-2 px-4 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default function AccountPage() {
  return (
    <LoginProvider>
      <AccountSettings />
    </LoginProvider>
  );
} 