import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { DashboardLayout } from "./components/layout/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import ServiceUsers from "./pages/ServiceUsers";
import UserManagement from "./pages/UserManagement";
import RotaManagement from "./pages/RotaManagement";
import HandoverReport from "./pages/HandoverReport";
import IncidentManagement from "./pages/IncidentManagement";
import Appointments from "./pages/Appointments";
import Holiday from "./pages/Holiday";
import Expenses from "./pages/Expenses";
import AuditLog from "./pages/AuditLog";
import TaskAssignment from "./pages/TaskAssignment";
import PlaceholderPage from "./pages/PlaceholderPage";
import Login from "./pages/Login";

// Admin Payroll Pages
import Payroll from "./pages/Payroll";
import PayrollEmployees from "./pages/PayrollEmployees";
import ReviewPayroll from "./pages/ReviewPayroll";
import PayrollReports from "./pages/PayrollReports";

// Admin Timesheet Pages
import Timesheet from "./pages/Timesheet";
import PayAdvice from "./pages/PayAdvice";

// Company Admin Pages
import CompanyDashboard from "./pages/company/Dashboard";
import Users from "./pages/company/Users";
import Billing from "./pages/company/Billing";
import ReleaseNote from "./pages/company/ReleaseNote";
import Notifications from "./pages/company/Notifications";
import CompanyProfile from "./pages/company/CompanyProfile";
import SupportCentre from "./pages/company/SupportCentre";

// Portal Owner Pages
import PortalOwnerDashboard from "./pages/portal-owner/Dashboard";
import PortalOwnerCompanies from "./pages/portal-owner/Companies";
import PortalOwnerUsers from "./pages/portal-owner/Users";
import PortalOwnerFinance from "./pages/portal-owner/Finance";
import PortalOwnerMessages from "./pages/portal-owner/Messages";
import PortalOwnerAnnouncements from "./pages/portal-owner/Announcements";
import PortalOwnerSettings from "./pages/portal-owner/Settings";
import PortalOwnerAuditLogs from "./pages/portal-owner/AuditLogs";
import PortalOwnerReferrals from "./pages/portal-owner/Referrals";
import PortalOwnerSupport from "./pages/portal-owner/Support";
import PortalOwnerSubscriptions from "./pages/portal-owner/Subscriptions";
import PortalOwnerCompanyDetails from "./pages/portal-owner/CompanyDetails";

import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import "./App.css";

function RootRedirect() {
  const { hasAnyRole } = useAuth();
  if (hasAnyRole(['admin'])) {
    return <Navigate to="/dashboard" replace />;
  }
  if (hasAnyRole(['portal_owner'])) {
    return <Navigate to="/portal-owner/dashboard" replace />;
  }
  if (hasAnyRole(['company_admin'])) {
    return <Navigate to="/company-dashboard" replace />;
  }
  return <Navigate to="/login" replace />;
}

function RoleSettingsPage() {
  const { hasAnyRole } = useAuth();
  if (hasAnyRole(['portal_owner'])) {
    return <PortalOwnerSettings />;
  }
  return <PlaceholderPage name="Settings" />;
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route path="/*" element={
            <ProtectedRoute>
              <DashboardLayout>
                <Routes>
                  <Route path="/" element={<RootRedirect />} />

                  {/* Unrestricted Routes (but still need login now) */}
                  <Route path="/settings" element={<RoleSettingsPage />} />

                  {/* Admin Only Routes */}
                  <Route path="/dashboard" element={<ProtectedRoute allowedRoles={['admin']}><Dashboard /></ProtectedRoute>} />
                  <Route path="/service-users" element={<ProtectedRoute allowedRoles={['admin']}><ServiceUsers /></ProtectedRoute>} />
                  <Route path="/user-management" element={<ProtectedRoute allowedRoles={['admin']}><UserManagement /></ProtectedRoute>} />
                  <Route path="/rota-management" element={<ProtectedRoute allowedRoles={['admin']}><RotaManagement /></ProtectedRoute>} />
                  <Route path="/timesheet" element={<ProtectedRoute allowedRoles={['admin']}><Timesheet /></ProtectedRoute>} />
                  <Route path="/timesheet/details" element={<ProtectedRoute allowedRoles={['admin']}><PayAdvice /></ProtectedRoute>} />
                  <Route path="/task-assignment" element={<ProtectedRoute allowedRoles={['admin']}><TaskAssignment /></ProtectedRoute>} />
                  <Route path="/incident-management" element={<ProtectedRoute allowedRoles={['admin']}><IncidentManagement /></ProtectedRoute>} />
                  <Route path="/appointments" element={<ProtectedRoute allowedRoles={['admin']}><Appointments /></ProtectedRoute>} />
                  <Route path="/holiday" element={<ProtectedRoute allowedRoles={['admin']}><Holiday /></ProtectedRoute>} />
                  <Route path="/payroll" element={<ProtectedRoute allowedRoles={['admin']}><Payroll /></ProtectedRoute>} />
                  <Route path="/payroll/employees" element={<ProtectedRoute allowedRoles={['admin']}><PayrollEmployees /></ProtectedRoute>} />
                  <Route path="/payroll/review" element={<ProtectedRoute allowedRoles={['admin']}><ReviewPayroll /></ProtectedRoute>} />
                  <Route path="/payroll/reports" element={<ProtectedRoute allowedRoles={['admin']}><PayrollReports /></ProtectedRoute>} />
                  <Route path="/expenses" element={<ProtectedRoute allowedRoles={['admin']}><Expenses /></ProtectedRoute>} />
                  <Route path="/handover-report" element={<ProtectedRoute allowedRoles={['admin']}><HandoverReport /></ProtectedRoute>} />
                  <Route path="/audit-log" element={<ProtectedRoute allowedRoles={['admin']}><AuditLog /></ProtectedRoute>} />
                  <Route path="/analytics" element={<ProtectedRoute allowedRoles={['admin']}><PlaceholderPage name="Analytics" /></ProtectedRoute>} />
                  
                  {/* Company Admin Only Routes */}
                  <Route path="/company-dashboard" element={<ProtectedRoute allowedRoles={['company_admin']}><CompanyDashboard /></ProtectedRoute>} />
                  <Route path="/users" element={<ProtectedRoute allowedRoles={['company_admin']}><Users /></ProtectedRoute>} />
                  <Route path="/billing" element={<ProtectedRoute allowedRoles={['company_admin']}><Billing /></ProtectedRoute>} />
                  <Route path="/release-note" element={<ProtectedRoute allowedRoles={['company_admin']}><ReleaseNote /></ProtectedRoute>} />
                  <Route path="/notifications" element={<ProtectedRoute allowedRoles={['company_admin']}><Notifications /></ProtectedRoute>} />
                  <Route path="/company-profile" element={<ProtectedRoute allowedRoles={['company_admin']}><CompanyProfile /></ProtectedRoute>} />
                  <Route path="/support-centre" element={<ProtectedRoute allowedRoles={['company_admin']}><SupportCentre /></ProtectedRoute>} />

                  {/* Portal Owner Only Routes */}
                  <Route path="/portal-owner/dashboard" element={<ProtectedRoute allowedRoles={['portal_owner']}><PortalOwnerDashboard /></ProtectedRoute>} />
                  <Route path="/portal-owner/companies" element={<ProtectedRoute allowedRoles={['portal_owner']}><PortalOwnerCompanies /></ProtectedRoute>} />
                  <Route path="/portal-owner/companies/:id" element={<ProtectedRoute allowedRoles={['portal_owner']}><PortalOwnerCompanyDetails /></ProtectedRoute>} />
                  <Route path="/portal-owner/users" element={<ProtectedRoute allowedRoles={['portal_owner']}><PortalOwnerUsers /></ProtectedRoute>} />
                  <Route path="/portal-owner/finance" element={<ProtectedRoute allowedRoles={['portal_owner']}><PortalOwnerFinance /></ProtectedRoute>} />
                  <Route path="/portal-owner/messages" element={<ProtectedRoute allowedRoles={['portal_owner']}><PortalOwnerMessages /></ProtectedRoute>} />
                  <Route path="/portal-owner/subscriptions" element={<ProtectedRoute allowedRoles={['portal_owner']}><PortalOwnerSubscriptions /></ProtectedRoute>} />
                  <Route path="/portal-owner/announcements" element={<ProtectedRoute allowedRoles={['portal_owner']}><PortalOwnerAnnouncements /></ProtectedRoute>} />
                  <Route path="/portal-owner/audit-logs" element={<ProtectedRoute allowedRoles={['portal_owner']}><PortalOwnerAuditLogs /></ProtectedRoute>} />
                  <Route path="/portal-owner/referrals" element={<ProtectedRoute allowedRoles={['portal_owner']}><PortalOwnerReferrals /></ProtectedRoute>} />
                  <Route path="/portal-owner/support" element={<ProtectedRoute allowedRoles={['portal_owner']}><PortalOwnerSupport /></ProtectedRoute>} />
                  <Route path="/portal-owner/settings" element={<ProtectedRoute allowedRoles={['portal_owner']}><PortalOwnerSettings /></ProtectedRoute>} />

                  {/* Catch-all */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </DashboardLayout>
            </ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
