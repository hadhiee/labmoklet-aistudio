"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, CalendarDays, Users, LogOut, MonitorPlay, FileText, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AUTH_EMAIL_COOKIE, AUTH_NAME_COOKIE, AUTH_ROLE_COOKIE, isValidRole, ROLE_LABELS, ROLE_NAV_ACCESS } from '@/lib/auth';

const navItems = [
  { name: 'Portal Siswa/Umum', href: '/portal', icon: Users },
  { name: 'Dashboard Manajemen', href: '/admin', icon: LayoutDashboard },
  { name: 'Dashboard Operator', href: '/operator', icon: CalendarDays },
  { name: 'Inventaris & Aset', href: '/admin/inventory', icon: MonitorPlay },
  { name: 'Laporan & SNP', href: '/admin/reports', icon: FileText },
  { name: 'Peringatan Sistem', href: '/admin/alerts', icon: AlertTriangle },
];

function getCookieValue(cookieName: string) {
  if (typeof document === 'undefined') {
    return '';
  }

  const encodedName = `${cookieName}=`;
  const cookie = document.cookie
    .split(';')
    .map((item) => item.trim())
    .find((item) => item.startsWith(encodedName));

  if (!cookie) {
    return '';
  }

  return decodeURIComponent(cookie.substring(encodedName.length));
}

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const roleValue = getCookieValue(AUTH_ROLE_COOKIE);
  const role = isValidRole(roleValue) ? roleValue : 'siswa';
  const profileName = getCookieValue(AUTH_NAME_COOKIE) || (role === 'siswa' ? 'Siswa Uji Coba' : role === 'operator' ? 'Operator Lab' : 'Admin User');
  const profileEmail = getCookieValue(AUTH_EMAIL_COOKIE) || (role === 'siswa' ? 'siswa@smktelkom-mlg.sch.id' : role === 'operator' ? 'operator@smktelkom-mlg.sch.id' : 'admin@smktelkom-mlg.sch.id');

  const roleLinks = ROLE_NAV_ACCESS[role] || ROLE_NAV_ACCESS.siswa;

  const visibleNavItems = navItems.filter((item) => roleLinks.includes(item.href));

  const initials = profileName
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((name) => name.charAt(0).toUpperCase())
    .join('') || 'US';

  const handleLogout = () => {
    document.cookie = `${AUTH_ROLE_COOKIE}=; path=/; max-age=0; samesite=lax`;
    document.cookie = `${AUTH_NAME_COOKIE}=; path=/; max-age=0; samesite=lax`;
    document.cookie = `${AUTH_EMAIL_COOKIE}=; path=/; max-age=0; samesite=lax`;

    router.push('/');
    router.refresh();
  };

  return (
    <div className="flex h-full w-64 flex-col border-r bg-slate-900 text-slate-300">
      <div className="flex h-16 items-center px-6 border-b border-slate-800">
        <h1 className="text-lg font-bold text-white tracking-tight">SMK Telkom Malang</h1>
      </div>
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-3">
          {visibleNavItems.map((item) => {
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
        <div className="flex items-center gap-3 mb-3">
          <div className="h-8 w-8 rounded-full bg-slate-700 flex items-center justify-center text-sm font-medium text-white">
            {initials}
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-medium text-white truncate">{profileName}</span>
            <span className="text-xs text-slate-400 truncate">{profileEmail}</span>
            <span className="text-[11px] text-red-300 mt-0.5">Role: {ROLE_LABELS[role]}</span>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 rounded-md border border-slate-700 px-3 py-2 text-sm font-medium text-slate-100 hover:bg-slate-800 transition-colors"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </div>
  );
}
