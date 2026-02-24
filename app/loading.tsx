import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="h-12 w-12 text-red-600 animate-spin mx-auto mb-4" />
        <p className="text-slate-600 font-medium">Memuat halaman...</p>
      </div>
    </div>
  );
}
