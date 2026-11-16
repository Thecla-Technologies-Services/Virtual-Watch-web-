import { useMemo, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Copy } from "lucide-react";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import {
  INITIAL_COMPANIES,
  type Company,
} from "@/components/portal-owner/companies/types";
import { SuspendCompanyModal } from "@/components/portal-owner/companies/SuspendCompanyModal";
import { ChangePlanModal } from "@/components/portal-owner/subscriptions/ChangePlanModal";
import {
  INITIAL_PLANS,
  type CompanySubscription,
} from "@/components/portal-owner/subscriptions/types";
import { ResetPasswordModal } from "@/components/portal-owner/users/ResetPasswordModal";
import { OverviewTab } from "@/components/portal-owner/company-details/OverviewTab";
import { UsersTab } from "@/components/portal-owner/company-details/UsersTab";
import { BillingTab } from "@/components/portal-owner/company-details/BillingTab";
import { SupportTab } from "@/components/portal-owner/company-details/SupportTab";
import { ActivityTab } from "@/components/portal-owner/company-details/ActivityTab";
import { EmailsTab } from "@/components/portal-owner/company-details/EmailsTab";
import { SettingsTab } from "@/components/portal-owner/company-details/SettingsTab";

type DetailTab =
  | "Overview"
  | "Users"
  | "Billing"
  | "Support"
  | "Activity"
  | "Emails"
  | "Settings";

const DETAIL_TABS: DetailTab[] = [
  "Overview",
  "Users",
  "Billing",
  "Support",
  "Activity",
  "Emails",
  "Settings",
];

export default function CompanyDetails() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const stateCompany = (location.state as { company?: Company } | null)?.company;

  const initialCompany = useMemo(() => {
    if (stateCompany) return stateCompany;
    return (
      INITIAL_COMPANIES.find((c) => c.id === id) ?? INITIAL_COMPANIES[0]
    );
  }, [id, stateCompany]);

  const [company, setCompany] = useState<Company>(initialCompany);
  const [activeTab, setActiveTab] = useState<DetailTab>("Overview");
  const [isChangePlanOpen, setIsChangePlanOpen] = useState(false);
  const [isSuspendOpen, setIsSuspendOpen] = useState(false);
  const [isResetOpen, setIsResetOpen] = useState(false);

  const subscriptionProxy: CompanySubscription = {
    id: company.id,
    company: company.name,
    workspace: company.workspace,
    currentPlan: company.plan,
    startDate: company.registered,
    amount: "$890.00",
    nextRenewal: "Aug 1, 2024",
    status: company.status,
  };

  const statusDotColor =
    company.status === "Active"
      ? "bg-[#22C55E]"
      : company.status === "Trial"
        ? "bg-[#9333EA]"
        : company.status === "Suspended"
          ? "bg-[#F59E0B]"
          : "bg-[#EF4444]";

  const statusPillClass =
    company.status === "Active"
      ? "bg-emerald-50 text-emerald-700"
      : company.status === "Suspended"
        ? "bg-amber-50 text-amber-700"
        : company.status === "Expired"
          ? "bg-red-50 text-red-700"
          : "bg-purple-50 text-purple-700";

  return (
    <div className="space-y-5">
      <Breadcrumb
        pageTitle="USER MANAGEMENT"
        subtext={`${company.name} workspace`}
        activePage={company.name.toLowerCase()}
        breadcrumbs={[
          { label: "", path: "/portal-owner/companies" },
        ]}
      />

      {/* Company Header & Tabs Banner */}
      <div className="bg-white rounded-2xl px-6 pt-5 pb-2 border border-slate-100/80 ">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2 text-[11px] leading-4">
              <span className="font-semibold text-[#37AADF] inline-flex items-center gap-1.5">
                ID: {company.companyCode}
                <button
                  type="button"
                  onClick={() =>
                    navigator.clipboard
                      ?.writeText(company.companyCode)
                      .catch(() => {})
                  }
                  aria-label="Copy company ID"
                  className="text-slate-400 hover:text-[#37AADF] cursor-pointer"
                >
                  <Copy className="w-3 h-3" />
                </button>
              </span>

              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full font-medium ${statusPillClass}`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${statusDotColor}`} />
                {company.status}
              </span>

              <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium">
                {company.plan} plan
              </span>
            </div>

            <h2 className="text-[18px] font-bold text-[#2E3A59]">
              {company.name}
            </h2>

            <p className="text-[12px] text-slate-400">
              {company.industry} · {company.address1} ·{" "}
              <span className="font-semibold text-[#2E3A59]">
                Since {company.registered}
              </span>
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => setIsChangePlanOpen(true)}
              className="h-9 px-4 rounded-full bg-[#FDE68A] hover:bg-[#FCD34D] text-[#92400E] text-[12px] font-semibold transition-colors cursor-pointer"
            >
              Change plan
            </button>

            {company.status === "Suspended" ? (
              <button
                type="button"
                onClick={() =>
                  setCompany((prev) => ({ ...prev, status: "Active" }))
                }
                className="h-9 px-4 rounded-full bg-[#16A34A] hover:bg-[#15803D] text-white text-[12px] font-semibold transition-colors cursor-pointer"
              >
                Reinstate
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setIsSuspendOpen(true)}
                className="h-9 px-4 rounded-full bg-[#FF0000] hover:bg-red-700 text-white text-[12px] font-semibold transition-colors cursor-pointer"
              >
                Suspend
              </button>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap items-center gap-1 border-t border-slate-100 pt-2">
          {DETAIL_TABS.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2.5 rounded-t-lg text-[13px] font-medium transition-colors cursor-pointer ${
                  isActive
                    ? "bg-[#EBF6FC] text-[#37AADF] font-semibold"
                    : "text-slate-500 hover:text-[#2E3A59]"
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === "Overview" && (
        <OverviewTab
          company={company}
          onSwitchTab={(t) => setActiveTab(t)}
          onChangePlan={() => setIsChangePlanOpen(true)}
          onResetPassword={() => setIsResetOpen(true)}
        />
      )}

      {activeTab === "Users" && (
        <UsersTab
          companyName={company.name}
          onViewActivity={() => setActiveTab("Activity")}
        />
      )}

      {activeTab === "Billing" && (
        <BillingTab
          company={company}
          onChangePlan={() => setIsChangePlanOpen(true)}
        />
      )}

      {activeTab === "Support" && <SupportTab companyName={company.name} />}

      {activeTab === "Activity" && <ActivityTab />}

      {activeTab === "Emails" && <EmailsTab adminEmail={company.adminEmail} />}

      {activeTab === "Settings" && (
        <SettingsTab
          company={company}
          onChangePlan={() => setIsChangePlanOpen(true)}
          onResetPassword={() => setIsResetOpen(true)}
          onSuspend={() => setIsSuspendOpen(true)}
          onSwitchTab={(t) => setActiveTab(t)}
        />
      )}

      {/* Shared Modals */}
      <ChangePlanModal
        isOpen={isChangePlanOpen}
        onClose={() => setIsChangePlanOpen(false)}
        subscription={subscriptionProxy}
        plans={INITIAL_PLANS}
        onConfirm={(_subId, newPlan) => {
          setCompany((prev) => ({
            ...prev,
            plan: newPlan.name,
          }));
        }}
      />

      <SuspendCompanyModal
        isOpen={isSuspendOpen}
        onClose={() => setIsSuspendOpen(false)}
        company={company}
        onConfirm={() => {
          setCompany((prev) => ({ ...prev, status: "Suspended" }));
        }}
      />

      <ResetPasswordModal
        isOpen={isResetOpen}
        onClose={() => setIsResetOpen(false)}
        user={{
          id: "admin",
          name: company.adminName,
          email: company.adminEmail,
          role: "Administrator",
          username: company.adminEmail.split("@")[0],
          company: company.name,
          phone: company.adminPhone,
          avatar: "",
          status: "Active",
          lastLogin: company.lastLogin,
        }}
      />
    </div>
  );
}
