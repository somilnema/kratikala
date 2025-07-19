import React from 'react';

export default function ShippingPolicyPage() {
  return (
    <div className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-fuchsia-100 via-yellow-100 to-cyan-100 animated-bg overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-paint-splash"
            style={{
              width: `${Math.random() * 40 + 20}px`,
              height: `${Math.random() * 40 + 20}px`,
              background: [
                "rgba(255, 20, 147, 0.2)",
                "rgba(255, 140, 0, 0.2)",
                "rgba(255, 255, 0, 0.2)",
                "rgba(0, 255, 127, 0.2)",
                "rgba(0, 191, 255, 0.2)",
              ][Math.floor(Math.random() * 5)],
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
      <div className="relative z-10 p-8 w-full max-w-xl rounded-2xl border border-fuchsia-100 shadow-2xl backdrop-blur-lg bg-white/90 animate-fade-in-up">
        <div className="flex flex-col items-center mb-6">
          <span className="px-4 py-1 mb-2 text-xs font-semibold text-white bg-gradient-to-r from-fuchsia-500 via-yellow-400 to-cyan-500 rounded-full shadow-md animate-pulse-slow">
            Shipping
          </span>
          <h1 className="text-3xl font-bold tracking-tight text-center brush-stroke animate-text-shimmer">
            Shipping Policy
          </h1>
        </div>
        <div className="max-w-none text-center prose prose-lg">
          <p>Shipping costs and delivery times depend on your location.</p>
          <p>Shipping charges will vary based on the destination and the size/weight of the artwork.</p>
          <p>You will be able to see the estimated shipping cost during the checkout process before finalizing your order.</p>
          <p>For specific inquiries about shipping to your location, please contact us.</p>
        </div>
      </div>
    </div>
  );
} 