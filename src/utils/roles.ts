import type { User, UserRole } from '../types/auth';

export const hasRole = (user: User | null, role: UserRole): boolean => {
  return user?.role === role;
};

export const hasAnyRole = (user: User | null, roles: UserRole[]): boolean => {
  if (!user) return false;
  if (!roles || roles.length === 0) return false;
  return roles.includes(user.role);
};
