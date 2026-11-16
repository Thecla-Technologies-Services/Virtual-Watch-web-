import { useMemo, useState } from "react";
import { Check, MoreVertical, Search, Upload } from "lucide-react";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Dropdown, DropdownItem } from "@/components/ui/Dropdown";
import { EditPlanModal } from "@/components/portal-owner/subscriptions/EditPlanModal";
import { ChangePlanModal } from "@/components/portal-owner/subscriptions/ChangePlanModal";
import { ExtendSubscriptionModal } from "@/components/portal-owner/subscriptions/ExtendSubscriptionModal";
import { CancelSubscriptionModal } from "@/components/portal-owner/subscriptions/CancelSubscriptionModal";
import {
  INITIAL_PLANS,
  INITIAL_SUBSCRIPTIONS,
  type CompanySubscription,
  type SubscriptionPlan,
  type SubscriptionStatus,
} from "@/components/portal-owner/subscriptions/types";

type StatusTab = "All" | SubscriptionStatus;

const TABS: StatusTab[] = ["All", "Active", "Trial", "Suspended", "Expired"];

const STATUS_DOT: Record<SubscriptionStatus, string> = {
  Active: "bg-[#22C55E]",
  Trial: "bg-[#9333EA]",
  Suspended: "bg-[#F59E0B]",
  Expired: "bg-[#EF4444]",
};

const PAGE_SIZE = 8;

export default function Subscriptions() {
  const [plans, setPlans] = useState<SubscriptionPlan[]>(INITIAL_PLANS);
  const [subscriptions, setSubscriptions] =
    useState<CompanySubscription[]>(INITIAL_SUBSCRIPTIONS);

  const [activeTab, setActiveTab] = useState<StatusTab>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [editingPlan, setEditingPlan] = useState<SubscriptionPlan | null>(null);
  const [changingPlanSub, setChangingPlanSub] =
    useState<CompanySubscription | null>(null);
  const [extendingSub, setExtendingSub] =
    useState<CompanySubscription | null>(null);
  const [cancellingSub, setCancellingSub] =
    useState<CompanySubscription | null>(null);

  const filteredSubscriptions = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return subscriptions.filter((sub) => {
      if (activeTab !== "All" && sub.status !== activeTab) {
        return false;
      }
      if (q) {
        const hay =
          `${sub.company} ${sub.workspace} ${sub.currentPlan} ${sub.status}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [subscriptions, activeTab, searchQuery]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredSubscriptions.length / PAGE_SIZE)
  );
  const safePage = Math.min(currentPage, totalPages);

  const paginatedSubscriptions = useMemo(() => {
    const start = (safePage - 1) * PAGE_SIZE;
    return filteredSubscriptions.slice(start, start + PAGE_SIZE);
  }, [filteredSubscriptions, safePage]);

  const allVisibleSelected =
    paginatedSubscriptions.length > 0 &&
    paginatedSubscriptions.every((s) => selectedIds.includes(s.id));

  const toggleSelectAll = () => {
    if (allVisibleSelected) {
      const visible = new Set(paginatedSubscriptions.map((s) => s.id));
      setSelectedIds((prev) => prev.filter((id) => !visible.has(id)));
    } else {
      const merged = new Set([
        ...selectedIds,
        ...paginatedSubscriptions.map((s) => s.id),
      ]);
      setSelectedIds(Array.from(merged));
    }
  };

  const toggleSelectOne = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSavePlan = (updated: SubscriptionPlan) => {
    setPlans((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
  };

  const handleChangePlan = (
    subscriptionId: string,
    newPlan: SubscriptionPlan
  ) => {
    setSubscriptions((prev) =>
      prev.map((sub) =>
        sub.id === subscriptionId
          ? {
              ...sub,
              currentPlan: newPlan.name,
              amount: `$${newPlan.price.toFixed(2)}`,
            }
          : sub
      )
    );
  };

  const handleExtendSubscription = (
    subscriptionId: string,
    newRenewalDate: string
  ) => {
    setSubscriptions((prev) =>
      prev.map((sub) =>
        sub.id === subscriptionId
          ? { ...sub, nextRenewal: newRenewalDate }
          : sub
      )
    );
  };

  const handleCancelSubscription = (subscriptionId: string) => {
    setSubscriptions((prev) =>
      prev.map((sub) =>
        sub.id === subscriptionId ? { ...sub, status: "Expired" } : sub
      )
    );
  };

  const handleExportCsv = () => {
    const headers = [
      "Company",
      "Workspace",
      "Current plan",
      "Start date",
      "Amount",
      "Next renewal",
      "Status",
    ];
    const rows = filteredSubscriptions.map((s) => [
      s.company,
      s.workspace,
      s.currentPlan,
      s.startDate,
      s.amount,
      s.nextRenewal,
      s.status,
    ]);
    const csv = [headers, ...rows]
      .map((row) =>
        row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")
      )
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "subscriptions.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  const startEntry =
    filteredSubscriptions.length === 0 ? 0 : (safePage - 1) * PAGE_SIZE + 1;
  const endEntry = Math.min(safePage * PAGE_SIZE, filteredSubscriptions.length);

  return (
    <div className="space-y-6">
      <Breadcrumb
        pageTitle="SUBSCRIPTION PLANS"
        subtext="Configure plans and manage company subscriptions"
        activePage="Subscription plans"
      />

      {/* Plan Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="bg-white rounded-2xl p-5  border border-slate-100/80 flex flex-col justify-between"
          >
            <div>
              <p className="text-[13px] font-medium text-slate-500">
                {plan.name}
              </p>

              <div className="flex items-baseline justify-between mt-1.5 pb-3 border-b border-slate-100">
                <div className="flex items-baseline gap-1">
                  <span className="text-[22px] font-bold text-[#2E3A59]">
                    ${plan.price}
                  </span>
                  <span className="text-[12px] text-slate-400">/mo</span>
                </div>
                <span className="text-[12px] text-slate-400">
                  {plan.userLimit}
                </span>
              </div>

              <ul className="space-y-2 my-4">
                {plan.features.map((feature, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-2 text-[12px] text-slate-500"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              <span className="text-[12px] text-slate-400">
                {plan.companiesCount} companies
              </span>
              <button
                type="button"
                onClick={() => setEditingPlan(plan)}
                className="text-[12px] font-semibold text-[#16A34A] hover:text-[#15803D] transition-colors cursor-pointer"
              >
                EDIT
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Subscriptions Table Card */}
      <div className="bg-white rounded-2xl p-6  border border-slate-100/80">
        {/* Tabs */}
        <div className="flex flex-wrap items-center gap-1 border-b border-slate-100 pb-4 mb-5">
          {TABS.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => {
                  setActiveTab(tab);
                  setCurrentPage(1);
                }}
                className={`px-4 py-2 rounded-lg text-[13px] font-medium transition-colors cursor-pointer ${
                  isActive
                    ? "bg-[#F4F6F9] text-[#2E3A59] font-semibold"
                    : "text-slate-500 hover:text-[#2E3A59] hover:bg-slate-50"
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
          <div className="relative flex-1 max-w-xs">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search..."
              className="w-full h-10 pl-10 pr-4 rounded-full bg-[#F4F6F9] text-[13px] text-[#2E3A59] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#37AADF]/30"
            />
          </div>

          <button
            type="button"
            onClick={handleExportCsv}
            className="h-10 px-4 rounded-full bg-[#F4F6F9] hover:bg-slate-200/70 text-[#2E3A59] text-[13px] font-medium inline-flex items-center gap-2 transition-colors cursor-pointer self-start sm:self-auto"
          >
            <Upload className="w-4 h-4 text-slate-500" />
            <span>Export</span>
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-[12px] font-semibold text-[#2E3A59]">
                <th className="py-3.5 pl-3 pr-2 w-10">
                  <button
                    type="button"
                    onClick={toggleSelectAll}
                    aria-label="Select all subscriptions"
                    className={`w-4 h-4 rounded flex items-center justify-center border transition-colors ${
                      allVisibleSelected
                        ? "bg-[#37AADF] border-[#37AADF] text-white"
                        : "border-slate-300 bg-white"
                    }`}
                  >
                    {allVisibleSelected && <Check className="w-3 h-3" />}
                  </button>
                </th>
                <th className="py-3.5 px-3">Company</th>
                <th className="py-3.5 px-3">Current plan</th>
                <th className="py-3.5 px-3">Start date</th>
                <th className="py-3.5 px-3">Amount</th>
                <th className="py-3.5 px-3">Next renewal</th>
                <th className="py-3.5 px-3">Status</th>
                <th className="py-3.5 pl-2 pr-3 w-12 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-[13px] text-[#2E3A59]">
              {paginatedSubscriptions.length === 0 ? (
                <tr>
                  <td
                    colSpan={8}
                    className="py-10 text-center text-slate-400 text-[13px]"
                  >
                    No company subscriptions found.
                  </td>
                </tr>
              ) : (
                paginatedSubscriptions.map((sub) => {
                  const isSelected = selectedIds.includes(sub.id);
                  return (
                    <tr
                      key={sub.id}
                      className="hover:bg-slate-50/70 transition-colors"
                    >
                      <td className="py-3.5 pl-3 pr-2">
                        <button
                          type="button"
                          onClick={() => toggleSelectOne(sub.id)}
                          aria-label={`Select ${sub.company}`}
                          className={`w-4 h-4 rounded flex items-center justify-center border transition-colors ${
                            isSelected
                              ? "bg-[#37AADF] border-[#37AADF] text-white"
                              : "border-slate-300 bg-white"
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3" />}
                        </button>
                      </td>
                      <td className="py-3.5 px-3 whitespace-nowrap">
                        <p className="font-medium text-[#2E3A59]">
                          {sub.company}
                        </p>
                        <p className="text-[11px] text-slate-400">
                          {sub.workspace}
                        </p>
                      </td>
                      <td className="py-3.5 px-3 text-slate-600 whitespace-nowrap">
                        {sub.currentPlan}
                      </td>
                      <td className="py-3.5 px-3 text-slate-600 whitespace-nowrap">
                        {sub.startDate}
                      </td>
                      <td className="py-3.5 px-3 text-slate-600 whitespace-nowrap">
                        {sub.amount}
                      </td>
                      <td className="py-3.5 px-3 text-slate-600 whitespace-nowrap">
                        {sub.nextRenewal}
                      </td>
                      <td className="py-3.5 px-3 whitespace-nowrap">
                        <span className="inline-flex items-center gap-2 text-slate-600">
                          <span
                            className={`w-2 h-2 rounded-full ${STATUS_DOT[sub.status]}`}
                          />
                          {sub.status}
                        </span>
                      </td>
                      <td className="py-3.5 pl-2 pr-3 text-right">
                        <Dropdown
                          align="right"
                          trigger={
                            <span className="w-8 h-8 rounded-full bg-[#F4F6F9] hover:bg-slate-200/70 inline-flex items-center justify-center text-slate-500 transition-colors">
                              <MoreVertical className="w-4 h-4" />
                            </span>
                          }
                        >
                          <DropdownItem onClick={() => setChangingPlanSub(sub)}>
                            Change plan
                          </DropdownItem>
                          <DropdownItem onClick={() => setExtendingSub(sub)}>
                            Extend by 30 days
                          </DropdownItem>
                          <DropdownItem
                            onClick={() => setCancellingSub(sub)}
                            className="text-red-500 hover:text-red-600"
                          >
                            Cancel Subscription
                          </DropdownItem>
                        </Dropdown>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-5 mt-2 border-t border-slate-100 text-[13px]">
          <p className="text-[#2E3A59] font-medium">
            Showing {startEntry} to {endEntry} of {filteredSubscriptions.length}{" "}
            entries
          </p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={safePage >= totalPages}
              className="px-3.5 py-1.5 rounded-lg bg-[#F4F6F9] text-slate-500 hover:text-[#2E3A59] disabled:opacity-50 text-[12px] font-medium transition-colors"
            >
              Next
            </button>

            {Array.from({ length: totalPages }, (_, idx) => idx + 1).map(
              (page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 rounded-lg text-[12px] font-semibold transition-colors ${
                    page === safePage
                      ? "bg-[#37AADF] text-white"
                      : "bg-[#F4F6F9] text-slate-600 hover:text-[#2E3A59]"
                  }`}
                >
                  {page}
                </button>
              )
            )}

            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={safePage <= 1}
              className="px-3.5 py-1.5 rounded-lg bg-[#F4F6F9] text-slate-500 hover:text-[#2E3A59] disabled:opacity-50 text-[12px] font-medium transition-colors"
            >
              Previous
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <EditPlanModal
        isOpen={Boolean(editingPlan)}
        onClose={() => setEditingPlan(null)}
        plan={editingPlan}
        onSave={handleSavePlan}
      />

      <ChangePlanModal
        isOpen={Boolean(changingPlanSub)}
        onClose={() => setChangingPlanSub(null)}
        subscription={changingPlanSub}
        plans={plans}
        onConfirm={handleChangePlan}
      />

      <ExtendSubscriptionModal
        isOpen={Boolean(extendingSub)}
        onClose={() => setExtendingSub(null)}
        subscription={extendingSub}
        onConfirm={handleExtendSubscription}
      />

      <CancelSubscriptionModal
        isOpen={Boolean(cancellingSub)}
        onClose={() => setCancellingSub(null)}
        subscription={cancellingSub}
        onConfirm={handleCancelSubscription}
      />
    </div>
  );
}

