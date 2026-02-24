"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AUTH_EMAIL_COOKIE, AUTH_NAME_COOKIE, AUTH_ROLE_COOKIE, ROLE_LABELS, roleHome, UserRole } from '@/lib/auth';

type DemoAccount = {
  role: UserRole;
  name: string;
  email: string;
  password: string;
};

const DEMO_ACCOUNTS: DemoAccount[] = [
  { role: 'siswa', name: 'Siswa Uji Coba', email: 'siswa@smktelkom-mlg.sch.id', password: 'siswa123' },
  { role: 'operator', name: 'Operator Lab', email: 'operator@smktelkom-mlg.sch.id', password: 'operator123' },
  { role: 'admin', name: 'Admin User', email: 'admin@smktelkom-mlg.sch.id', password: 'admin123' },
];

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState<UserRole>('siswa');
  const [fullName, setFullName] = useState('Siswa Uji Coba');
  const [email, setEmail] = useState('siswa@smktelkom-mlg.sch.id');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const defaultNames: Record<UserRole, string> = Object.fromEntries(
    DEMO_ACCOUNTS.map((account) => [account.role, account.name]),
  ) as Record<UserRole, string>;

  const defaultEmails: Record<UserRole, string> = Object.fromEntries(
    DEMO_ACCOUNTS.map((account) => [account.role, account.email]),
  ) as Record<UserRole, string>;

  const handleRoleChange = (selectedRole: UserRole) => {
    setRole(selectedRole);
    setFullName(defaultNames[selectedRole]);
    setEmail(defaultEmails[selectedRole]);
    setPassword('');
    setErrorMessage('');
  };

  const applyDemoAccount = (selectedRole: UserRole) => {
    const account = DEMO_ACCOUNTS.find((item) => item.role === selectedRole);
    if (!account) {
      return;
    }

    setRole(account.role);
    setFullName(account.name);
    setEmail(account.email);
    setPassword(account.password);
    setErrorMessage('');
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    const matchedAccount = DEMO_ACCOUNTS.find(
      (account) => account.role === role && account.email.toLowerCase() === email.trim().toLowerCase() && account.password === password,
    );

    if (!matchedAccount) {
      setIsSubmitting(false);
      setErrorMessage('Email atau password tidak sesuai untuk role yang dipilih.');
      return;
    }

    const name = fullName.trim() || matchedAccount.name;
    const resolvedEmail = matchedAccount.email;

    document.cookie = `${AUTH_ROLE_COOKIE}=${role}; path=/; max-age=86400; samesite=lax`;
    document.cookie = `${AUTH_NAME_COOKIE}=${encodeURIComponent(name)}; path=/; max-age=86400; samesite=lax`;
    document.cookie = `${AUTH_EMAIL_COOKIE}=${encodeURIComponent(resolvedEmail)}; path=/; max-age=86400; samesite=lax`;

    router.push(roleHome[role]);
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Login Portal Lab</h1>
          <p className="text-sm text-slate-500 mt-1">Pilih role untuk mencoba UI/UX sistem laboratorium.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <p className="block text-sm font-medium text-slate-700 mb-2">Akun Demo Cepat</p>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => applyDemoAccount('siswa')}
                disabled={isSubmitting}
                className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-60"
              >
                Isi Siswa
              </button>
              <button
                type="button"
                onClick={() => applyDemoAccount('operator')}
                disabled={isSubmitting}
                className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-60"
              >
                Isi Operator
              </button>
              <button
                type="button"
                onClick={() => applyDemoAccount('admin')}
                disabled={isSubmitting}
                className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-60"
              >
                Isi Admin
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-medium text-slate-700 mb-2">Role</label>
            <select
              id="role"
              value={role}
              onChange={(event) => handleRoleChange(event.target.value as UserRole)}
              disabled={isSubmitting}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="siswa">Siswa</option>
              <option value="operator">Operator</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-slate-700 mb-2">Nama</label>
            <input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              disabled={isSubmitting}
              placeholder="Masukkan nama pengguna"
              className="w-full rounded-lg border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              disabled={isSubmitting}
              placeholder="Masukkan email akun"
              className="w-full rounded-lg border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              disabled={isSubmitting}
              placeholder="Masukkan password"
              className="w-full rounded-lg border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>

          <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm">
            <p className="text-slate-600">
              Login sebagai <span className="font-semibold text-slate-900">{ROLE_LABELS[role]}</span>
            </p>
            <p className="text-slate-500 mt-1">Arahkan ke: {roleHome[role]}</p>
            <p className="text-slate-500 mt-1">Demo password untuk role ini: <span className="font-medium text-slate-700">{DEMO_ACCOUNTS.find((account) => account.role === role)?.password}</span></p>
          </div>

          {errorMessage && (
            <p className="text-sm text-red-600 -mt-1">{errorMessage}</p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-red-600 text-white py-2.5 rounded-lg font-medium hover:bg-red-700 disabled:bg-red-400 transition-colors"
          >
            {isSubmitting ? 'Memproses...' : 'Masuk'}
          </button>

          {isSubmitting && (
            <p className="text-xs text-slate-500 text-center">Sedang memvalidasi akun dan menyiapkan dashboard...</p>
          )}
        </form>
      </div>
    </div>
  );
}