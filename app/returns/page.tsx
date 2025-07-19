import React from 'react';

export default function ReturnsPolicyPage() {
  return (
    <div className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-fuchsia-100 via-yellow-100 to-cyan-100 animated-bg overflow-hidden">
      <div className="absolute inset-0 pointer-events-none z-0">
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
      <div className="relative z-10 w-full max-w-xl p-8 bg-white/90 rounded-2xl shadow-2xl animate-fade-in-up border border-fuchsia-100 backdrop-blur-lg">
        <div className="flex flex-col items-center mb-6">
          <span className="mb-2 px-4 py-1 rounded-full text-white bg-gradient-to-r from-fuchsia-500 via-yellow-400 to-cyan-500 text-xs font-semibold shadow-md animate-pulse-slow">
            Returns & Refunds
          </span>
          <h1 className="text-3xl font-bold tracking-tight brush-stroke animate-text-shimmer text-center">
            Returns & Refunds Policy
          </h1>
        </div>
        <div className="prose prose-lg max-w-none text-center">
          <p>Thank you for your interest in our artwork.</p>
          <p>Please note that we do not offer returns or replacements for any purchased items.</p>
          <p>All sales are final. We encourage you to review the artwork details carefully before making a purchase.</p>
          <p>If you have any questions about a specific piece, please contact us prior to your purchase.</p>
        </div>
      </div>
    </div>
  );
} 