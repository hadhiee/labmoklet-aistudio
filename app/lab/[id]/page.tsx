import { notFound } from 'next/navigation';
import Link from 'next/link';
import { labs, inventory, feedback } from '@/lib/data';
import { ArrowLeft, Users, Monitor, CheckCircle2, AlertTriangle, Clock, Info } from 'lucide-react';

export default async function LabDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const labId = parseInt(resolvedParams.id);
  const lab = labs.find(l => l.id === labId);

  if (!lab) {
    notFound();
  }

  const labInventory = inventory.filter(i => i.labId === labId);
  const labFeedback = feedback.filter(f => f.labId === labId);

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      <Link href="/" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Kembali ke Portal
      </Link>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="h-48 bg-slate-100 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900" />
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <Monitor className="h-32 w-32 text-white" />
          </div>
          <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
            <div>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/20 text-white backdrop-blur-sm mb-3 inline-block">
                {lab.type}
              </span>
              <h1 className="text-3xl font-bold text-white tracking-tight">{lab.name}</h1>
            </div>
            <span className={`px-4 py-1.5 rounded-full text-sm font-semibold shadow-sm ${
              lab.status === 'Available' ? 'bg-emerald-400 text-emerald-950' :
              lab.status === 'In Use' ? 'bg-amber-400 text-amber-950' :
              'bg-red-400 text-red-950'
            }`}>
              {lab.status === 'Available' ? 'Tersedia' : lab.status === 'In Use' ? 'Sedang Digunakan' : 'Perbaikan'}
            </span>
          </div>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-8">
              <section>
                <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Info className="h-5 w-5 text-slate-400" />
                  Informasi & Tujuan
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  {lab.description}. Laboratorium ini dirancang untuk mendukung kegiatan pembelajaran praktik, 
                  ekstrakurikuler, dan kegiatan operasional sekolah lainnya sesuai dengan peruntukannya.
                </p>
                <div className="mt-6 flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-lg border border-slate-100">
                    <Users className="h-5 w-5 text-slate-400" />
                    <div>
                      <p className="text-xs text-slate-500 font-medium">Kapasitas</p>
                      <p className="text-sm font-bold text-slate-900">{lab.capacity} Orang</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-lg border border-slate-100">
                    <Clock className="h-5 w-5 text-slate-400" />
                    <div>
                      <p className="text-xs text-slate-500 font-medium">Jam Operasional</p>
                      <p className="text-sm font-bold text-slate-900">07:00 - 16:00</p>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Monitor className="h-5 w-5 text-slate-400" />
                  Fasilitas & Inventaris
                </h2>
                {labInventory.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {labInventory.map((item) => (
                      <div key={item.id} className="p-4 rounded-xl border border-slate-200 bg-white shadow-sm flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-slate-900">{item.name}</h3>
                          <p className="text-sm text-slate-500 mt-1">Total: {item.total} unit</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1 text-sm text-emerald-600 font-medium">
                            <CheckCircle2 className="h-4 w-4" /> {item.working}
                          </div>
                          {item.broken > 0 && (
                            <div className="flex items-center gap-1 text-sm text-red-500 font-medium mt-1">
                              <AlertTriangle className="h-4 w-4" /> {item.broken}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-6 text-center bg-slate-50 rounded-xl border border-slate-200 border-dashed">
                    <p className="text-slate-500">Data inventaris belum tersedia untuk lab ini.</p>
                  </div>
                )}
              </section>
            </div>

            <div className="space-y-6">
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                <h3 className="font-bold text-slate-900 mb-4">Aksi</h3>
                <button 
                  disabled={lab.status !== 'Available'}
                  className={`w-full py-2.5 rounded-lg font-medium transition-colors mb-3 ${
                    lab.status === 'Available' 
                      ? 'bg-red-600 text-white hover:bg-red-700' 
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  Ajukan Peminjaman
                </button>
                <button className="w-full py-2.5 rounded-lg font-medium border border-slate-200 text-slate-700 hover:bg-white transition-colors">
                  Laporkan Kendala
                </button>
              </div>

              {labFeedback.length > 0 && (
                <div>
                  <h3 className="font-bold text-slate-900 mb-4">Ulasan Terbaru</h3>
                  <div className="space-y-4">
                    {labFeedback.map((f) => (
                      <div key={f.id} className="p-4 rounded-xl border border-slate-200 bg-white shadow-sm">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-sm text-slate-900">{f.user}</span>
                          <div className="flex items-center text-amber-500 text-xs">
                            {'★'.repeat(f.rating)}{'☆'.repeat(5-f.rating)}
                          </div>
                        </div>
                        <p className="text-sm text-slate-600">{f.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
