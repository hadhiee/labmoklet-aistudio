import { labs } from '@/lib/data';
import { Clock, Users, Search, Filter } from 'lucide-react';
import Link from 'next/link';

export default function StudentPortal() {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Portal Laboratorium</h1>
          <p className="text-slate-500 mt-1">SMK Telkom Malang - Cek ketersediaan dan booking lab</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Cari laboratorium..." 
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-700 font-medium">
            <Filter className="h-4 w-4" />
            Filter
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {labs.map((lab) => (
          <div key={lab.id} className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col">
            <div className="h-32 bg-slate-100 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-300" />
              <div className="absolute top-4 right-4">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  lab.status === 'Available' ? 'bg-emerald-100 text-emerald-700' :
                  lab.status === 'In Use' ? 'bg-amber-100 text-amber-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {lab.status === 'Available' ? 'Tersedia' : lab.status === 'In Use' ? 'Sedang Digunakan' : 'Perbaikan'}
                </span>
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-bold text-slate-900">{lab.name}</h3>
              </div>
              <p className="text-sm text-slate-500 mb-4 flex-1">{lab.description}</p>
              
              <div className="flex items-center gap-4 text-sm text-slate-600 mb-6">
                <div className="flex items-center gap-1.5">
                  <Users className="h-4 w-4 text-slate-400" />
                  <span>{lab.capacity} Kursi</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-slate-400" />
                  <span>07:00 - 16:00</span>
                </div>
              </div>

              <div className="flex gap-3 mt-auto">
                <button 
                  disabled={lab.status !== 'Available'}
                  className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
                    lab.status === 'Available' 
                      ? 'bg-red-600 text-white hover:bg-red-700' 
                      : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  Booking Lab
                </button>
                <Link 
                  href={`/lab/${lab.id}`}
                  className="px-4 py-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 font-medium text-center"
                >
                  Detail
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
