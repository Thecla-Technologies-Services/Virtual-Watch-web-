import {
  Building2,
  ChevronRight,
  Clock,
  Copy,
  CreditCard,
  FileText,
  History,
  KeyRound,
} from "lucide-react";
import type { Company } from "../companies/types";

interface SettingsTabProps {
  company: Company;
  onChangePlan: () => void;
  onResetPassword: () => void;
  onSuspend: () => void;
  onSwitchTab: (tab: "Billing") => void;
}

export function SettingsTab({
  company,
  onChangePlan,
  onResetPassword,
  onSuspend,
  onSwitchTab,
}: SettingsTabProps) {
  const referralCode = `${company.name.split(" ")[0].toUpperCase()}-REF`;

  const accountActions = [
    {
      label: "Change subscription plan",
      icon: CreditCard,
      onClick: onChangePlan,
    },
    {
      label: "Update payment method",
      icon: Building2,
      onClick: () => onSwitchTab("Billing"),
    },
    {
      label: "Reset admin password",
      icon: KeyRound,
      onClick: onResetPassword,
    },
    {
      label: "Send manual invoice",
      icon: FileText,
      onClick: () => onSwitchTab("Billing"),
    },
    {
      label: "Extend trial period",
      icon: Clock,
      onClick: onChangePlan,
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
      {/* Left Column */}
      <div className="lg:col-span-7 space-y-5">
        {/* Platform Access */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100/80 ">
          <h3 className="text-[12px] font-bold uppercase tracking-wide text-[#2E3A59] mb-4">
            Platform access
          </h3>
          <div className="bg-[#F8FAFC] rounded-xl p-4 space-y-2.5 text-[12px]">
            {[
              { label: "SSO enabled", value: "No" },
              { label: "MFA required", value: "Optional" },
              { label: "Password policy", value: "8 chars min · 90d expiry" },
              { label: "Session timeout", value: "30 minutes" },
              { label: "IP restrictions", value: "None configured" },
            ].map((row) => (
              <div
                key={row.label}
                className="flex items-center justify-between gap-4"
              >
                <span className="text-slate-400">{row.label}</span>
                <span className="font-medium text-[#2E3A59]">{row.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Suspension History */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100/80 ">
          <h3 className="text-[12px] font-bold uppercase tracking-wide text-[#2E3A59] mb-4">
            Suspension history
          </h3>
          <div className="bg-[#F8FAFC] rounded-xl py-10 flex flex-col items-center justify-center text-slate-400">
            <History className="w-7 h-7 mb-2 text-slate-300" />
            <p className="text-[12px]">No suspensions on record</p>
          </div>
        </div>

        {/* Referral Program */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100/80 ">
          <h3 className="text-[12px] font-bold uppercase tracking-wide text-[#2E3A59] mb-3">
            Referral program
          </h3>
          <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
            Referral code
          </p>
          <div className="flex items-center gap-2 mt-0.5 mb-4">
            <span className="text-[15px] font-bold text-[#2E3A59]">
              {referralCode}
            </span>
            <button
              type="button"
              onClick={() =>
                navigator.clipboard?.writeText(referralCode).catch(() => {})
              }
              aria-label="Copy referral code"
              className="text-[#37AADF] hover:text-[#2F99CA] cursor-pointer"
            >
              <Copy className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="bg-[#F8FAFC] rounded-xl p-4 space-y-2 text-[12px]">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Referred companies</span>
              <span className="font-medium text-[#2E3A59]">0</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Pending rewards</span>
              <span className="font-medium text-[#2E3A59]">£0</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Total earned</span>
              <span className="font-medium text-[#2E3A59]">£0</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className="lg:col-span-5 space-y-5">
        {/* Account Actions */}
        <div className="bg-white rounded-2xl p-5 border border-[#A7F3D0] ">
          <h3 className="text-[12px] font-bold uppercase tracking-wide text-[#2E3A59] mb-3">
            Account actions
          </h3>
          <div className="bg-[#F8FAFC] rounded-xl divide-y divide-slate-100">
            {accountActions.map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.label}
                  type="button"
                  onClick={action.onClick}
                  className="w-full px-4 py-3 flex items-center justify-between text-[12px] font-medium text-[#2E3A59] hover:bg-slate-100/70 first:rounded-t-xl last:rounded-b-xl transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 text-slate-400" />
                    {action.label}
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </button>
              );
            })}
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100/80  space-y-5">
          <h3 className="text-[12px] font-bold uppercase tracking-wide text-[#2E3A59]">
            Danger zone
          </h3>

          <div className="space-y-2.5 pb-4 border-b border-slate-100">
            <p className="text-[13px] font-semibold text-[#2E3A59]">
              Suspend company
            </p>
            <p className="text-[11px] text-slate-400">
              Blocks access while preserving all data.
            </p>
            <button
              type="button"
              onClick={onSuspend}
              className="h-9 px-5 rounded-full bg-[#FF0000] hover:bg-red-700 text-white text-[12px] font-semibold transition-colors cursor-pointer"
            >
              Suspend account
            </button>
          </div>

          <div className="space-y-2.5">
            <p className="text-[13px] font-semibold text-[#2E3A59]">
              Archive company
            </p>
            <p className="text-[11px] text-slate-400">
              Deactivates workspace. Cannot be undone easily.
            </p>
            <button
              type="button"
              onClick={onSuspend}
              className="h-9 px-5 rounded-full bg-[#FF0000] hover:bg-red-700 text-white text-[12px] font-semibold transition-colors cursor-pointer"
            >
              Deactivate account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

