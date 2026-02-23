"use client";

import { labs, inventory, feedback } from '@/lib/data';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { AlertTriangle, CheckCircle2, MonitorPlay, Users, Activity, HardDrive } from 'lucide-react';

const usageData = [
  { name: 'Senin', usage: 85 },
  { name: 'Selasa', usage: 92 },
  { name: 'Rabu', usage: 78 },
  { name: 'Kamis', usage: 88 },
  { name: 'Jumat', usage: 95 },
];

const snpCompliance = [
  { id: 1, title: 'Rasio Komputer:Siswa (1:1)', status: 'warning', message: 'Lab 4 (Ekstra) rasio 1:1.5' },
  { id: 2, title: 'Kecepatan Internet (Min 100Mbps)', status: 'pass', message: 'Rata-rata 250Mbps' },
  { id: 3, title: 'Sirkulasi Udara & AC', status: 'warning', message: 'Feedback Lab 1: AC kurang dingin' },
  { id: 4, title: 'Pencahayaan Ruangan (Min 200 Lux)', status: 'pass', message: 'Semua lab memenuhi standar' },
];

export default function AdminDashboard() {
  const totalLabs = labs.length;
  const availableLabs = labs.filter(l => l.status === 'Available').length;
  const totalComputers = inventory.filter(i => i.name.includes('PC') || i.name.includes('Workstation')).reduce((acc, curr) => acc + curr.total, 0);
  const brokenComputers = inventory.filter(i => i.name.includes('PC') || i.name.includes('Workstation')).reduce((acc, curr) => acc + curr.broken, 0);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Dashboard Manajemen</h1>
        <p className="text-slate-500 mt-1">Ringkasan operasional dan kepatuhan Standar Nasional Pendidikan (SNP)</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-start gap-4">
          <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
            <MonitorPlay className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Total Laboratorium</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-1">{totalLabs}</h3>
            <p className="text-xs text-slate-500 mt-1">{availableLabs} Tersedia saat ini</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-start gap-4">
          <div className="p-3 bg-emerald-100 text-emerald-600 rounded-lg">
            <Activity className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Tingkat Penggunaan</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-1">87%</h3>
            <p className="text-xs text-emerald-600 font-medium mt-1">+5% dari bulan lalu</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-start gap-4">
          <div className="p-3 bg-amber-100 text-amber-600 rounded-lg">
            <HardDrive className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Kondisi Perangkat</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-1">{totalComputers}</h3>
            <p className="text-xs text-amber-600 font-medium mt-1">{brokenComputers} Perlu perbaikan</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-start gap-4">
          <div className="p-3 bg-purple-100 text-purple-600 rounded-lg">
            <Users className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Rata-rata Rating</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-1">4.2/5.0</h3>
            <p className="text-xs text-slate-500 mt-1">Berdasarkan {feedback.length} ulasan</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Charts */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-6">Tren Penggunaan Mingguan</h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={usageData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                  <Tooltip 
                    cursor={{fill: '#f1f5f9'}}
                    contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                  />
                  <Bar dataKey="usage" fill="#ef4444" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-slate-900">Feedback Terbaru</h3>
              <button className="text-sm text-red-600 font-medium hover:text-red-700">Lihat Semua</button>
            </div>
            <div className="space-y-4">
              {feedback.map((f) => (
                <div key={f.id} className="p-4 rounded-lg border border-slate-100 bg-slate-50 flex gap-4">
                  <div className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center flex-shrink-0 font-bold text-slate-600">
                    {f.user.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-slate-900">{f.user}</span>
                      <span className="text-xs text-slate-500">di Lab {f.labId}</span>
                      <div className="flex items-center text-amber-500 ml-2">
                        {'★'.repeat(f.rating)}{'☆'.repeat(5-f.rating)}
                      </div>
                    </div>
                    <p className="text-sm text-slate-600">{f.comment}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SNP Compliance & Alerts */}
        <div className="space-y-8">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-2">Audit Kepatuhan SNP</h3>
            <p className="text-sm text-slate-500 mb-6">Standar Nasional Pendidikan Sarpras</p>
            
            <div className="space-y-4">
              {snpCompliance.map((item) => (
                <div key={item.id} className="flex items-start gap-3 p-3 rounded-lg border border-slate-100">
                  {item.status === 'pass' ? (
                    <CheckCircle2 className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                  ) : (
                    <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                  )}
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900">{item.title}</h4>
                    <p className={`text-xs mt-1 ${item.status === 'pass' ? 'text-slate-500' : 'text-amber-600 font-medium'}`}>
                      {item.message}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
              Unduh Laporan Audit Lengkap
            </button>
          </div>

          <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-xl border border-slate-700 shadow-sm text-white">
            <h3 className="text-lg font-bold mb-2">Persiapan LKS & Tefa</h3>
            <p className="text-sm text-slate-300 mb-4">
              Lab 6 & 7 sedang dipersiapkan untuk pelatihan LKS Web Technologies dan Game Development.
            </p>
            <div className="w-full bg-slate-700 rounded-full h-2 mb-2">
              <div className="bg-red-500 h-2 rounded-full" style={{ width: '65%' }}></div>
            </div>
            <p className="text-xs text-slate-400 text-right">Progress Setup: 65%</p>
          </div>
        </div>
      </div>
    </div>
  );
}
