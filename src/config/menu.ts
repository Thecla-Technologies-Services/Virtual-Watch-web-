import { App, User, Calendar, Clock, Clipboard, Briefcase, FolderOpen, CreditCard, Bookmark, IdCard, CheckCircle } from '@duo-icons/react';
import type { UserRole } from '../types/auth';

export interface MenuItem {
  name: string;
  icon: any;
  path?: string; // Fallback path if auto-generation is not desired
  roles?: UserRole[]; // If undefined, available to all authenticated roles
}

export const menuItems: MenuItem[] = [
  { name: "Dashboard", icon: App, roles: ['admin'] }, // Admin dashboard
  
  // Admin items
  { name: "User management", icon: User, roles: ['admin'] },
  { name: "Service users", icon: User, roles: ['admin'] },
  { name: "Rota management", icon: Calendar, roles: ['admin'] },
  { name: "Timesheet", icon: Clock, roles: ['admin'] },
  { name: "Task assignment", icon: Clipboard, roles: ['admin'] },
  { name: "Incident management", icon: Briefcase, roles: ['admin'] },
  { name: "Appointments", icon: Calendar, roles: ['admin'] },
  { name: "Holiday", icon: Bookmark, roles: ['admin'] },
  { name: "Payroll", icon: CreditCard, roles: ['admin'] },
  { name: "Expenses", icon: CreditCard, roles: ['admin'] },
  { name: "Handover report", icon: FolderOpen, roles: ['admin'] },
  { name: "Audit log", icon: CheckCircle, roles: ['admin'] },

  // Company Admin items
  { name: "Dashboard", icon: App, path: "/company-dashboard", roles: ['company_admin'] },
  { name: "Users", icon: User, roles: ['company_admin'] },
  { name: "Billing", icon: CreditCard, roles: ['company_admin'] },
  { name: "Release note", icon: Bookmark, roles: ['company_admin'] },
  { name: "Notifications", icon: Clipboard, roles: ['company_admin'] },
  { name: "Company profile", icon: User, roles: ['company_admin'] },
];

export const generalItems: MenuItem[] = [
  { name: "Analytics", icon: IdCard, roles: ['admin'] },
  { name: "Support centre", icon: IdCard, roles: ['company_admin'] },
  { name: "Settings", icon: Briefcase }, // Usually everyone needs settings
];
