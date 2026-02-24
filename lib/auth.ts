export type UserRole = 'siswa' | 'admin' | 'operator';

export const AUTH_ROLE_COOKIE = 'lab_role';
export const AUTH_NAME_COOKIE = 'lab_name';
export const AUTH_EMAIL_COOKIE = 'lab_email';

export const ROLE_LABELS: Record<UserRole, string> = {
  siswa: 'Siswa',
  admin: 'Admin',
  operator: 'Operator',
};

export const roleHome: Record<UserRole, string> = {
  siswa: '/portal',
  admin: '/admin',
  operator: '/operator',
};

export const ROLE_NAV_ACCESS: Record<UserRole, string[]> = {
  siswa: ['/portal'],
  admin: ['/portal', '/admin', '/admin/inventory', '/admin/reports', '/admin/alerts'],
  operator: ['/portal', '/operator'],
};

export function isValidRole(role: string): role is UserRole {
  return role === 'siswa' || role === 'admin' || role === 'operator';
}