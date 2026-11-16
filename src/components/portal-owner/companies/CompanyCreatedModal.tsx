import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from "@/components/ui/Modal";
import { Check, AlertTriangle, Copy, ChevronRight } from "lucide-react";
import type { Company } from "./types";

interface CompanyCreatedModalProps {
  isOpen: boolean;
  onClose: () => void;
  company: Company | null;
  tempPassword: string;
  onSendInvoice: () => void;
}

export function CompanyCreatedModal({
  isOpen,
  onClose,
  company,
  tempPassword,
  onSendInvoice,
}: CompanyCreatedModalProps) {
  const navigate = useNavigate();
  const [copiedField, setCopiedField] = useState<string | null>(null);

  if (!company) return null;

  const loginUrl = `app.virtualwatch.co.uk/${company.workspace}`;

  const handleCopy = (field: string, value: string) => {
    navigator.clipboard?.writeText(value);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 1500);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} width="lg" height="3xl">
      <div className="px-2 pb-2">
        {/* Header */}
        <div className="pb-3 border-b border-slate-100">
          <h2 className="text-[15px] font-bold text-slate-800">
            Company created
          </h2>
        </div>

        {/* Success Icon & Message */}
        <div className="flex flex-col items-center text-center pt-6 pb-5">
          <div className="h-11 w-11 rounded-full bg-[#22C55E] text-white flex items-center justify-center mb-4 shadow-sm">
            <Check size={22} strokeWidth={2.8} />
          </div>
          <p className="text-[13px] text-slate-600 max-w-md leading-relaxed">
            <span className="font-bold text-slate-800">{company.name}</span> is
            now active on the {company.plan} plan. Credentials have been
            generated for {company.adminName}.
          </p>
        </div>

        {/* LOGIN CREDENTIALS */}
        <div className="bg-[#F8FAFC] rounded-2xl p-4 space-y-2.5 text-[12.5px]">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
            LOGIN CREDENTIALS
          </p>

          <div className="flex items-center justify-between gap-3">
            <span className="text-slate-400">Username (Email)</span>
            <button
              type="button"
              onClick={() => handleCopy("email", company.adminEmail)}
              className="inline-flex items-center gap-1.5 font-semibold text-slate-700 hover:text-slate-900 cursor-pointer"
            >
              <span>{company.adminEmail}</span>
              <ChevronRight size={14} className="text-slate-400" />
            </button>
          </div>

          <div className="flex items-center justify-between gap-3">
            <span className="text-slate-400">Temporary password</span>
            <button
              type="button"
              onClick={() => handleCopy("password", tempPassword)}
              className="inline-flex items-center gap-1.5 font-bold text-[#22C55E] hover:opacity-80 cursor-pointer"
            >
              <span>{tempPassword}</span>
              <ChevronRight size={14} className="text-slate-400" />
            </button>
          </div>

          <div className="flex items-center justify-between gap-3">
            <span className="text-slate-400">Login URL</span>
            <button
              type="button"
              onClick={() => handleCopy("url", loginUrl)}
              className="inline-flex items-center gap-1.5 font-semibold text-[#37AADF] hover:underline cursor-pointer"
            >
              <span>{loginUrl}</span>
              <Copy size={13} className="text-slate-400" />
            </button>
          </div>

          <div className="flex items-center justify-between gap-3">
            <span className="text-slate-400">Company Id</span>
            <button
              type="button"
              onClick={() => handleCopy("code", company.companyCode)}
              className="inline-flex items-center gap-1.5 font-semibold text-slate-700 hover:text-slate-900 cursor-pointer"
            >
              <span>{company.companyCode}</span>
              <Copy size={13} className="text-slate-400" />
            </button>
          </div>

          {copiedField && (
            <p className="text-[11px] text-[#22C55E] font-medium text-right pt-0.5">
              Copied to clipboard!
            </p>
          )}
        </div>

        {/* Warning Banner */}
        <div className="mt-4 rounded-xl bg-[#FDE68A]/75 border border-[#FCD34D] px-4 py-3 flex items-start gap-2.5 text-[12px] text-slate-700 leading-relaxed">
          <AlertTriangle
            size={16}
            className="text-slate-700 shrink-0 mt-0.5"
          />
          <span>
            A welcome email with these credentials and setup instructions has
            been sent to{" "}
            <span className="font-semibold">{company.adminEmail}</span> and an
            invoice has been generated for this company
          </span>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-center gap-3 pt-6 pb-1">
          <button
            type="button"
            onClick={onSendInvoice}
            className="rounded-full bg-[#37AADF] hover:bg-[#2F99CA] text-white px-6 py-2.5 text-[13px] font-semibold transition-colors cursor-pointer"
          >
            Send invoice
          </button>
          <button
            type="button"
            onClick={() => {
              onClose();
              navigate("/portal-owner/dashboard");
            }}
            className="rounded-full bg-[#F4F6F9] hover:bg-slate-200/70 text-slate-700 px-6 py-2.5 text-[13px] font-semibold transition-colors cursor-pointer"
          >
            Go to dashboard
          </button>
        </div>
      </div>
    </Modal>
  );
}

