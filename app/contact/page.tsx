import Link from 'next/link'
import React from 'react'

export default function page() {
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
            Contact Us
          </span>
          <h1 className="text-3xl font-bold tracking-tight text-center brush-stroke animate-text-shimmer">
            Get in Touch
          </h1>
        </div>
        <div className="max-w-none text-center prose prose-lg">
          <p><Link href="https://www.instagram.com/krati_kreates/" target='_blank' className='text-blue-500'>Reach us on Instagram</Link></p>
          <p>Contact number: <span className="font-semibold">8770577994</span></p>
          <p>Email: <Link href="mailto:kratikreates@gmail.com" className='text-blue-500'>kratikreates@gmail.com</Link></p>
        </div>
      </div>
    </div>
  )
}
