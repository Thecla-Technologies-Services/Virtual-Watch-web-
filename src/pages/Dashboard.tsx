import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { DashboardMetrics } from "@/components/dashboard/DashboardMetrics";
import { RotaOverview } from "@/components/dashboard/RotaOverview";
import { WeeklyRota } from "@/components/dashboard/WeeklyRota";
import { IncidentLogWidget } from "@/components/dashboard/IncidentLogWidget";
import { DashboardAlerts } from "@/components/dashboard/DashboardAlerts";
import { TaskReassignmentWidget } from "@/components/dashboard/TaskReassignmentWidget";

export function Dashboard() {
  return (
    <div className="animate-fade-in duration-300 space-y-6 pb-8">
      {/* Page Title & Breadcrumb Header */}
      <Breadcrumb
        pageTitle="DASHBOARD"
        subtext="Real-time overview of key metrics and operations"
        activePage="Dashboard"
      />

      {/* Row 1: Key Metrics Summary Cards */}
      <DashboardMetrics />

      {/* Row 2: Rota Overview & Weekly Rota Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-6 flex flex-col">
          <RotaOverview />
        </div>
        <div className="lg:col-span-6 flex flex-col">
          <WeeklyRota />
        </div>
      </div>

      {/* Row 3: Incident Log, Alerts, & Task Reassignment */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-6 flex flex-col">
          <IncidentLogWidget />
        </div>
        <div className="lg:col-span-3 flex flex-col">
          <DashboardAlerts />
        </div>
        <div className="lg:col-span-3 flex flex-col">
          <TaskReassignmentWidget />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
