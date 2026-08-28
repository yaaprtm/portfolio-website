"use client";

import Link from "next/link";
import { Home } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="id">
      <body className="bg-[#FAFAFA]">
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="max-w-md w-full text-center">
            <div className="mb-8">
              <h1 className="font-display text-9xl font-extrabold text-mono-black mb-4">
                500
              </h1>
              <h2 className="font-display text-2xl font-bold text-mono-black mb-2">
                Something Went Wrong
              </h2>
              <p className="text-mono-gray text-sm">
                We&apos;re sorry, but something went wrong. Please try again.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={reset}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-mono-black text-white font-bold text-sm hover:bg-mono-gray transition-all"
              >
                Try Again
              </button>
              
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-mono-border text-mono-black font-bold text-sm hover:bg-mono-card transition-all"
              >
                <Home size={16} />
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
