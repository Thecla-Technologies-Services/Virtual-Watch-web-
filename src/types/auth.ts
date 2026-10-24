export type UserRole = 'admin' | 'portal_owner' | 'company_admin';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  avatar?: string;
  jobTitle?: string;
}
