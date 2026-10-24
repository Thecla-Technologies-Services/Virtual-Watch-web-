import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { DashboardLayout } from "./components/layout/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import ServiceUsers from "./pages/ServiceUsers";
import UserManagement from "./pages/UserManagement";
import RotaManagement from "./pages/RotaManagement";
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

import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import "./App.css";

function RootRedirect() {
  const { hasAnyRole } = useAuth();
  if (hasAnyRole(['admin', 'portal_owner'])) {
    return <Navigate to="/dashboard" replace />;
  }
  if (hasAnyRole(['company_admin'])) {
    return <Navigate to="/company-dashboard" replace />;
  }
  return <Navigate to="/login" replace />;
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
                  <Route path="/settings" element={<PlaceholderPage name="Settings" />} />

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
                  <Route path="/handover-report" element={<ProtectedRoute allowedRoles={['admin']}><PlaceholderPage name="Handover report" /></ProtectedRoute>} />
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
