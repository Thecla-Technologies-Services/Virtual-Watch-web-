import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { PortalMetrics } from "@/components/portal-owner/PortalMetrics";
import { MonthlyRevenueChart } from "@/components/portal-owner/MonthlyRevenueChart";
import { CompanyStatusChart } from "@/components/portal-owner/CompanyStatusChart";
import { RecentCompaniesTable } from "@/components/portal-owner/RecentCompaniesTable";

export default function PortalOwnerDashboard() {
  return (
    <div className="animate-fade-in duration-300 space-y-5 pb-8">
      <Breadcrumb
        pageTitle="DASHBOARD"
        subtext="Real-time metrics across all company workspaces"
        activePage="Dashboard"
      />

      {/* Row 1: Key Metrics */}
      <PortalMetrics />

      {/* Row 2: Monthly Recurring Revenue & Company Status */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        <div className="lg:col-span-8">
          <MonthlyRevenueChart />
        </div>
        <div className="lg:col-span-4">
          <CompanyStatusChart />
        </div>
      </div>

      {/* Row 3: Recent Companies */}
      <RecentCompaniesTable />
    </div>
  );
}

