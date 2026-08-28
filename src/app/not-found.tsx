"use client";

import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="font-display text-9xl font-extrabold text-mono-black mb-4">
            404
          </h1>
          <h2 className="font-display text-2xl font-bold text-mono-black mb-2">
            Halaman Tidak Ditemukan
          </h2>
          <p className="text-mono-gray text-sm">
            Maaf, halaman yang Anda cari tidak ada atau telah dipindahkan.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-mono-black text-white font-bold text-sm hover:bg-mono-gray transition-all"
          >
            <Home size={16} />
            Kembali ke Home
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-mono-border text-mono-black font-bold text-sm hover:bg-mono-card transition-all"
          >
            <ArrowLeft size={16} />
            Halaman Sebelumnya
          </button>
        </div>
      </div>
    </div>
  );
}
