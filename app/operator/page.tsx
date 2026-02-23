"use client";

import { useState } from 'react';
import { labs } from '@/lib/data';
import { CalendarDays, Clock, CheckCircle, XCircle, MoreVertical, Search, Filter } from 'lucide-react';

const schedule = [
  { id: 1, labId: 1, user: "Kelas 11 TKJ 1", purpose: "Praktik Jaringan Dasar", date: "2026-02-23", time: "07:00 - 10:00", status: "Approved" },
  { id: 2, labId: 2, user: "OSIS", purpose: "Rapat Koordinasi Event", date: "2026-02-23", time: "13:00 - 15:00", status: "Pending" },
  { id: 3, labId: 6, user: "Ekskul Game Dev", purpose: "Latihan LKS", date: "2026-02-24", time: "15:30 - 17:30", status: "Approved" },
  { id: 4, labId: 3, user: "PT Telkom (Mitra)", purpose: "Training Tefa", date: "2026-02-25", time: "08:00 - 16:00", status: "Approved" },
  { id: 5, labId: 9, user: "Kelas 12 RPL 2", purpose: "Praktik Machine Learning", date: "2026-02-23", time: "10:30 - 14:00", status: "Pending" },
];

export default function OperatorDashboard() {
  const [activeTab, setActiveTab] = useState('requests');

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Dashboard Operator</h1>
          <p className="text-slate-500 mt-1">Kelola jadwal, persetujuan peminjaman, dan status lab</p>
        </div>
        <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium transition-colors">
          + Buat Jadwal Baru
        </button>
      </div>

      <div className="flex gap-4 border-b border-slate-200">
        <button 
          onClick={() => setActiveTab('requests')}
          className={`pb-4 px-2 font-medium text-sm transition-colors relative ${activeTab === 'requests' ? 'text-red-600' : 'text-slate-500 hover:text-slate-700'}`}
        >
          Permintaan Peminjaman
          {activeTab === 'requests' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600 rounded-t-full" />}
        </button>
        <button 
          onClick={() => setActiveTab('schedule')}
          className={`pb-4 px-2 font-medium text-sm transition-colors relative ${activeTab === 'schedule' ? 'text-red-600' : 'text-slate-500 hover:text-slate-700'}`}
        >
          Jadwal Aktif
          {activeTab === 'schedule' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600 rounded-t-full" />}
        </button>
        <button 
          onClick={() => setActiveTab('status')}
          className={`pb-4 px-2 font-medium text-sm transition-colors relative ${activeTab === 'status' ? 'text-red-600' : 'text-slate-500 hover:text-slate-700'}`}
        >
          Status Lab & Maintenance
          {activeTab === 'status' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600 rounded-t-full" />}
        </button>
      </div>

      {activeTab === 'requests' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
            <h3 className="font-semibold text-slate-900">Menunggu Persetujuan</h3>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input type="text" placeholder="Cari..." className="pl-9 pr-4 py-1.5 text-sm rounded-md border border-slate-200 focus:outline-none focus:ring-1 focus:ring-red-500" />
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3">Pemohon</th>
                  <th className="px-6 py-3">Laboratorium</th>
                  <th className="px-6 py-3">Keperluan</th>
                  <th className="px-6 py-3">Waktu</th>
                  <th className="px-6 py-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {schedule.filter(s => s.status === 'Pending').map((req) => (
                  <tr key={req.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900">{req.user}</td>
                    <td className="px-6 py-4 text-slate-600">Lab {req.labId}</td>
                    <td className="px-6 py-4 text-slate-600">{req.purpose}</td>
                    <td className="px-6 py-4 text-slate-600">
                      <div className="flex items-center gap-2">
                        <CalendarDays className="h-4 w-4 text-slate-400" /> {req.date}
                      </div>
                      <div className="flex items-center gap-2 mt-1 text-xs">
                        <Clock className="h-3 w-3 text-slate-400" /> {req.time}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-md transition-colors" title="Setujui">
                          <CheckCircle className="h-5 w-5" />
                        </button>
                        <button className="p-1.5 text-red-600 hover:bg-red-50 rounded-md transition-colors" title="Tolak">
                          <XCircle className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {schedule.filter(s => s.status === 'Pending').length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                      Tidak ada permintaan peminjaman baru.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'schedule' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
            <h3 className="font-semibold text-slate-900">Jadwal Disetujui</h3>
            <div className="flex gap-2">
              <button className="flex items-center gap-2 px-3 py-1.5 text-sm border border-slate-200 rounded-md hover:bg-white text-slate-600 font-medium">
                <Filter className="h-4 w-4" /> Filter Lab
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3">Laboratorium</th>
                  <th className="px-6 py-3">Pengguna</th>
                  <th className="px-6 py-3">Keperluan</th>
                  <th className="px-6 py-3">Waktu</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3 text-right"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {schedule.filter(s => s.status === 'Approved').map((req) => (
                  <tr key={req.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900">Lab {req.labId}</td>
                    <td className="px-6 py-4 text-slate-600">{req.user}</td>
                    <td className="px-6 py-4 text-slate-600">{req.purpose}</td>
                    <td className="px-6 py-4 text-slate-600">
                      <div className="flex items-center gap-2">
                        <CalendarDays className="h-4 w-4 text-slate-400" /> {req.date}
                      </div>
                      <div className="flex items-center gap-2 mt-1 text-xs">
                        <Clock className="h-3 w-3 text-slate-400" /> {req.time}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
                        Disetujui
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-1.5 text-slate-400 hover:text-slate-600 rounded-md transition-colors">
                        <MoreVertical className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'status' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {labs.map((lab) => (
            <div key={lab.id} className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-slate-900">{lab.name}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">{lab.type}</p>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                  lab.status === 'Available' ? 'bg-emerald-100 text-emerald-700' :
                  lab.status === 'In Use' ? 'bg-amber-100 text-amber-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {lab.status}
                </span>
              </div>
              
              <div className="mt-auto pt-4 border-t border-slate-100">
                <label className="text-xs font-medium text-slate-500 mb-2 block">Ubah Status Lab:</label>
                <select 
                  className="w-full text-sm border border-slate-200 rounded-md py-1.5 px-3 focus:outline-none focus:ring-1 focus:ring-red-500"
                  defaultValue={lab.status}
                >
                  <option value="Available">Available (Tersedia)</option>
                  <option value="In Use">In Use (Sedang Digunakan)</option>
                  <option value="Maintenance">Maintenance (Perbaikan)</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
