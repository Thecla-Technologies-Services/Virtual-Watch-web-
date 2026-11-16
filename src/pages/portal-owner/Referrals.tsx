import { useState } from "react";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Dropdown, DropdownItem } from "@/components/ui/Dropdown";
import { Settings, MoreVertical, CheckCircle2 } from "lucide-react";
import { ReferralMetrics } from "@/components/portal-owner/referrals/ReferralMetrics";
import {
  INITIAL_REFERRALS,
  type ReferralEntry,
  type ReferralStatus,
} from "@/components/portal-owner/referrals/types";
import { IssueRewardModal } from "@/components/portal-owner/referrals/IssueRewardModal";
import { RewardConfigModal } from "@/components/portal-owner/referrals/RewardConfigModal";

const STATUS_DOT: Record<ReferralStatus, string> = {
  Converted: "bg-[#22C55E]",
  Pending: "bg-[#FFA940]",
  Expired: "bg-[#FF0E0E]",
};

export default function Referrals() {
  const [referrals, setReferrals] =
    useState<ReferralEntry[]>(INITIAL_REFERRALS);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [issueTarget, setIssueTarget] = useState<ReferralEntry | null>(null);
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const pageSize = 8;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const totalPages = Math.max(1, Math.ceil(referrals.length / pageSize));
  const safePage = Math.min(currentPage, totalPages);
  const paginatedReferrals = referrals.slice(
    (safePage - 1) * pageSize,
    safePage * pageSize
  );

  const startEntry =
    referrals.length === 0 ? 0 : (safePage - 1) * pageSize + 1;
  const endEntry = Math.min(safePage * pageSize, referrals.length);

  const allSelected =
    paginatedReferrals.length > 0 &&
    paginatedReferrals.every((r) => selectedIds.includes(r.id));

  const toggleAll = () => {
    if (allSelected) {
      setSelectedIds((prev) =>
        prev.filter((id) => !paginatedReferrals.some((r) => r.id === id))
      );
    } else {
      const next = new Set(selectedIds);
      paginatedReferrals.forEach((r) => next.add(r.id));
      setSelectedIds(Array.from(next));
    }
  };

  const toggleRow = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleIssueReward = (referralId: string, rewardType: string) => {
    setReferrals((prev) =>
      prev.map((r) =>
        r.id === referralId
          ? { ...r, status: "Converted", reward: rewardType }
          : r
      )
    );
    showToast(`Reward "${rewardType}" issued`);
  };

  return (
    <div className="animate-fade-in duration-300 space-y-5 pb-8">
      <Breadcrumb
        pageTitle="REFERRAL PROGRAM"
        subtext="Track referrals, rewards, and incentive distribution"
        activePage="Referral program"
      />

      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2.5 text-[12.5px] font-semibold text-white shadow-lg">
          <CheckCircle2 size={15} className="text-[#22C55E]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Row 1: 4 Stat Cards */}
      <ReferralMetrics />

      {/* Main White Table Card */}
      <div className="bg-white rounded-2xl p-6  border border-slate-100/80">
        {/* Card Header */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-[14px] font-bold text-slate-800">
            Referral tracking
          </h2>
          <button
            type="button"
            onClick={() => setIsConfigOpen(true)}
            className="h-9 w-9 rounded-full bg-[#FEF2F2] hover:bg-red-100 text-[#EF4444] flex items-center justify-center transition-colors cursor-pointer"
            title="Reward configuration"
            aria-label="Reward configuration"
          >
            <Settings size={16} />
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-[13px] border-collapse">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="py-3.5 pr-4 w-10 text-left">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={toggleAll}
                    aria-label="Select all referrals"
                    className="h-4 w-4 rounded border-slate-200 accent-[#37AADF] cursor-pointer"
                  />
                </th>
                <th className="py-3.5 pr-4 text-left font-semibold text-slate-700">
                  ID
                </th>
                <th className="py-3.5 pr-4 text-left font-semibold text-slate-700">
                  Referrer
                </th>
                <th className="py-3.5 pr-4 text-left font-semibold text-slate-700">
                  Referred company
                </th>
                <th className="py-3.5 pr-4 text-left font-semibold text-slate-700">
                  Code
                </th>
                <th className="py-3.5 pr-4 text-left font-semibold text-slate-700">
                  Date
                </th>
                <th className="py-3.5 pr-4 text-left font-semibold text-slate-700">
                  Status
                </th>
                <th className="py-3.5 pr-4 text-left font-semibold text-slate-700">
                  Reward
                </th>
                <th className="py-3.5 w-12 text-right" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100/80">
              {paginatedReferrals.map((ref) => (
                <tr
                  key={ref.id}
                  className="hover:bg-slate-50/60 transition-colors"
                >
                  <td className="py-4 pr-4">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(ref.id)}
                      onChange={() => toggleRow(ref.id)}
                      aria-label={`Select ${ref.codeId}`}
                      className="h-4 w-4 rounded border-slate-200 accent-[#37AADF] cursor-pointer"
                    />
                  </td>
                  <td className="py-4 pr-4 font-medium text-slate-700">
                    {ref.codeId}
                  </td>
                  <td className="py-4 pr-4 text-slate-600">{ref.referrer}</td>
                  <td className="py-4 pr-4 text-slate-600">
                    {ref.referredCompany}
                  </td>
                  <td className="py-4 pr-4 font-medium text-[#37AADF]">
                    {ref.referralCode}
                  </td>
                  <td className="py-4 pr-4 text-slate-500">{ref.date}</td>
                  <td className="py-4 pr-4">
                    <div className="inline-flex items-center gap-2">
                      <span
                        className={`h-2 w-2 rounded-full ${
                          STATUS_DOT[ref.status]
                        }`}
                      />
                      <span className="text-slate-600 font-medium">
                        {ref.status}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 pr-4 text-slate-600">{ref.reward}</td>
                  <td className="py-4 text-right">
                    <Dropdown
                      align="right"
                      menuClassName="w-40 shadow-lg border border-slate-100"
                      trigger={
                        <button
                          type="button"
                          className="h-8 w-8 rounded-full bg-[#F4F6F9] hover:bg-slate-200/70 flex items-center justify-center text-slate-500 transition-colors cursor-pointer ml-auto"
                          aria-label={`Actions for ${ref.codeId}`}
                        >
                          <MoreVertical size={15} />
                        </button>
                      }
                    >
                      <DropdownItem onClick={() => setIssueTarget(ref)}>
                        Issue reward
                      </DropdownItem>
                    </Dropdown>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer / Pagination */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-5 mt-2 border-t border-slate-100/80 text-[12.5px]">
          <p className="font-semibold text-slate-600">
            Showing {startEntry} to {endEntry} of {referrals.length} entries
          </p>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              disabled={safePage >= totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="px-3.5 py-1.5 rounded-lg bg-[#F4F6F9] text-slate-600 font-semibold text-[12px] hover:bg-slate-200/70 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              Next
            </button>

            {Array.from({ length: totalPages }, (_, idx) => idx + 1).map(
              (page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => setCurrentPage(page)}
                  className={`h-8 w-8 rounded-lg font-bold text-[12px] transition-colors cursor-pointer ${
                    page === safePage
                      ? "bg-[#37AADF] text-white"
                      : "bg-[#F4F6F9] text-slate-600 hover:bg-slate-200/70"
                  }`}
                >
                  {page}
                </button>
              )
            )}

            <button
              type="button"
              disabled={safePage <= 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="px-3.5 py-1.5 rounded-lg bg-[#F4F6F9] text-slate-600 font-semibold text-[12px] hover:bg-slate-200/70 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              Previous
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <IssueRewardModal
        isOpen={Boolean(issueTarget)}
        onClose={() => setIssueTarget(null)}
        referral={issueTarget}
        onIssue={handleIssueReward}
      />

      <RewardConfigModal
        isOpen={isConfigOpen}
        onClose={() => setIsConfigOpen(false)}
      />
    </div>
  );
}

