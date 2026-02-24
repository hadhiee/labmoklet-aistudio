'use client';

import Link from 'next/link';
import { FileQuestion, Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl border border-slate-200 shadow-sm p-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-100 mb-6">
          <FileQuestion className="h-8 w-8 text-amber-600" />
        </div>
        
        <h1 className="text-6xl font-bold text-slate-900 mb-2">404</h1>
        
        <h2 className="text-xl font-bold text-slate-900 mb-2">
          Halaman Tidak Ditemukan
        </h2>
        
        <p className="text-slate-600 mb-8">
          Maaf, halaman yang Anda cari tidak dapat ditemukan. Kemungkinan halaman telah dipindahkan atau dihapus.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => window.history.back()}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 font-medium transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali
          </button>
          
          <Link
            href="/"
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium transition-colors"
          >
            <Home className="h-4 w-4" />
            Ke Beranda
          </Link>
        </div>
      </div>
    </div>
  );
}
