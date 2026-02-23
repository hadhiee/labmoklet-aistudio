import type {Metadata} from 'next';
import './globals.css'; // Global styles
import { Sidebar } from '@/components/Sidebar';

export const metadata: Metadata = {
  title: 'Dashboard Lab Komputer - SMK Telkom Malang',
  description: 'Sistem Manajemen Laboratorium Komputer SMK Telkom Malang',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="id">
      <body className="flex h-screen overflow-hidden bg-slate-50 font-sans text-slate-900" suppressHydrationWarning>
        <Sidebar />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </body>
    </html>
  );
}
