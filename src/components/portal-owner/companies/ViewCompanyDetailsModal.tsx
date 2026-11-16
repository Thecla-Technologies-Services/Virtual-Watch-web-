import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Copy } from "lucide-react";
import type { Company, CompanyStatus } from "./types";

interface ViewCompanyDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  company: Company | null;
}

const STATUS_BADGE: Record<CompanyStatus, string> = {
  Active: "bg-[#E8F8EE] text-[#22C55E]",
  Trial: "bg-[#F3EFFE] text-[#7C69EF]",
  Suspended: "bg-[#FEF7E6] text-[#F59E0B]",
  Expired: "bg-[#FEF2F2] text-[#EF4444]",
};

export function ViewCompanyDetailsModal({
  isOpen,
  onClose,
  company,
}: ViewCompanyDetailsModalProps) {
  const [copied, setCopied] = useState(false);

  if (!company) return null;

  const handleCopyId = () => {
    navigator.clipboard?.writeText(company.companyCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} width="lg" height="3xl">
      <div className="flex flex-col h-full max-h-[84vh]">
        {/* Header */}
        <div className="px-2 pb-3 border-b border-slate-100 shrink-0">
          <h2 className="text-[15px] font-bold text-slate-800">View details</h2>
        </div>

        <div className="flex-1 overflow-y-auto px-2 pt-4 pb-2 space-y-5">
          {/* Company Title + Workspace + Status */}
          <div>
            <h3 className="text-[15px] font-bold text-slate-800">
              {company.name}
            </h3>
            <div className="flex items-center gap-2 mt-1 text-[12.5px]">
              <span className="text-slate-400">Workspace:</span>
              <span className="font-semibold text-slate-700">
                {company.workspace}
              </span>
              <span
                className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                  STATUS_BADGE[company.status]
                }`}
              >
                {company.status}
              </span>
            </div>
          </div>

          {/* Dark Users Summary Card */}
          <div className="rounded-2xl bg-[#101828] px-5 py-4 space-y-2.5 text-[12.5px]">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Total users</span>
              <span className="font-bold text-white">{company.users}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Active users</span>
              <span className="font-bold text-[#22C55E]">
                {company.activeUsers}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Disabled Users</span>
              <span className="font-bold text-[#EF4444]">
                {company.disabledUsers}
              </span>
            </div>
          </div>

          {/* Company Details List */}
          <div className="space-y-2.5 text-[12.5px]">
            <div className="flex items-center justify-between gap-4">
              <span className="text-slate-400">Company ID</span>
              <button
                type="button"
                onClick={handleCopyId}
                className="inline-flex items-center gap-1.5 font-semibold text-slate-700 hover:text-slate-900 cursor-pointer"
              >
                <span>{company.companyCode}</span>
                <Copy size={13} className="text-slate-400" />
                {copied && (
                  <span className="text-[10px] text-[#22C55E] ml-1">
                    Copied
                  </span>
                )}
              </button>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-slate-400">Subscription plan</span>
              <span className="font-medium text-slate-700">{company.plan}</span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-slate-400">Industry</span>
              <span className="font-medium text-slate-700">
                {company.industry}
              </span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-slate-400">Registration #</span>
              <span className="font-medium text-slate-700">
                {company.registrationNumber}
              </span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-slate-400">Contact email</span>
              <span className="font-medium text-slate-700">
                {company.contactEmail}
              </span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-slate-400">Phone</span>
              <span className="font-medium text-slate-700">
                {company.contactPhone}
              </span>
            </div>
          </div>

          {/* Admin information */}
          <div className="pt-1 space-y-2.5 text-[12.5px]">
            <h4 className="text-[12.5px] font-bold text-slate-800">
              Admin information
            </h4>
            <div className="flex items-center justify-between gap-4">
              <span className="text-slate-400">Full name</span>
              <span className="font-medium text-slate-700">
                {company.adminName}
              </span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-slate-400">Email address</span>
              <span className="font-medium text-slate-700">
                {company.adminEmail}
              </span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-slate-400">Phone number</span>
              <span className="font-medium text-slate-700">
                {company.adminPhone}
              </span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-slate-400">Role</span>
              <span className="font-medium text-slate-700">
                {company.adminRole}
              </span>
            </div>
          </div>

          {/* Footer metadata */}
          <div className="pt-3 border-t border-slate-100 space-y-2.5 text-[12.5px]">
            <div className="flex items-center justify-between gap-4">
              <span className="text-slate-400">Address</span>
              <span className="font-medium text-slate-700 text-right">
                {company.address1}
              </span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-slate-400">Registration date</span>
              <span className="font-medium text-slate-700">
                {company.registered}
              </span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-slate-400">Total users</span>
              <span className="font-medium text-slate-700">{company.users}</span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-slate-400">Company admin</span>
              <span className="font-medium text-slate-700">
                {company.adminName}
              </span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-slate-400">Last login</span>
              <span className="font-medium text-slate-700">
                {company.lastLogin}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

