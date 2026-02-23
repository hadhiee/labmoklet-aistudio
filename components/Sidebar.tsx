"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, CalendarDays, Users, Settings, MonitorPlay, FileText, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { name: 'Portal Siswa/Umum', href: '/', icon: Users },
  { name: 'Dashboard Manajemen', href: '/admin', icon: LayoutDashboard },
  { name: 'Dashboard Operator', href: '/operator', icon: CalendarDays },
  { name: 'Inventaris & Aset', href: '/admin/inventory', icon: MonitorPlay },
  { name: 'Laporan & SNP', href: '/admin/reports', icon: FileText },
  { name: 'Peringatan Sistem', href: '/admin/alerts', icon: AlertTriangle },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-64 flex-col border-r bg-slate-900 text-slate-300">
      <div className="flex h-16 items-center px-6 border-b border-slate-800">
        <h1 className="text-lg font-bold text-white tracking-tight">SMK Telkom Malang</h1>
      </div>
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-3">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-red-600 text-white'
                    : 'hover:bg-slate-800 hover:text-white'
                )}
              >
                <item.icon className={cn('mr-3 h-5 w-5 flex-shrink-0', isActive ? 'text-white' : 'text-slate-400')} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-slate-700 flex items-center justify-center text-sm font-medium text-white">
            AD
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-white">Admin User</span>
            <span className="text-xs text-slate-400">admin@smktelkom-mlg.sch.id</span>
          </div>
        </div>
      </div>
    </div>
  );
}
