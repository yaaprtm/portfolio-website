"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Home, RefreshCw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error untuk debugging
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="font-display text-9xl font-extrabold text-mono-black mb-4">
            500
          </h1>
          <h2 className="font-display text-2xl font-bold text-mono-black mb-2">
            Terjadi Kesalahan
          </h2>
          <p className="text-mono-gray text-sm mb-4">
            Maaf, terjadi kesalahan pada server. Silakan coba lagi.
          </p>
          {error.digest && (
            <p className="text-xs text-mono-gray font-mono">
              Error ID: {error.digest}
            </p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-mono-black text-white font-bold text-sm hover:bg-mono-gray transition-all"
          >
            <RefreshCw size={16} />
            Coba Lagi
          </button>
          
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-mono-border text-mono-black font-bold text-sm hover:bg-mono-card transition-all"
          >
            <Home size={16} />
            Kembali ke Home
          </Link>
        </div>
      </div>
    </div>
  );
}
