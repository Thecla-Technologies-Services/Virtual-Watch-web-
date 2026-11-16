import { useEffect, useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Check, ChevronDown } from "lucide-react";
import type { ReferralEntry } from "./types";

interface IssueRewardModalProps {
  isOpen: boolean;
  onClose: () => void;
  referral: ReferralEntry | null;
  onIssue: (referralId: string, rewardType: string) => void;
}

export function IssueRewardModal({
  isOpen,
  onClose,
  referral,
  onIssue,
}: IssueRewardModalProps) {
  const [step, setStep] = useState<"form" | "done">("form");
  const [rewardType, setRewardType] = useState("1 Month Free");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (isOpen) {
      setStep("form");
      setRewardType("1 Month Free");
      setNotes("");
    }
  }, [isOpen]);

  if (!referral) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onIssue(referral.id, rewardType);
    setStep("done");
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} width="lg" height="2xl">
      <div className="px-2 pb-1">
        {/* Header */}
        <div className="pb-3 border-b border-slate-100">
          <h2 className="text-[15px] font-bold text-slate-800">
            Issue referral reward
          </h2>
        </div>

        {step === "form" ? (
          <form onSubmit={handleSubmit} className="pt-4 space-y-4">
            {/* Summary */}
            <div className="space-y-2 text-[12.5px] pb-3 border-b border-slate-100">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Referral</span>
                <span className="font-semibold text-slate-700">
                  {referral.codeId}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Referrer</span>
                <span className="font-semibold text-slate-700">
                  {referral.referrer}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Referred</span>
                <span className="font-semibold text-slate-700">
                  {referral.referredCompany}
                </span>
              </div>
            </div>

            {/* Reward Type */}
            <div>
              <label className="block text-[12px] font-medium text-slate-600 mb-1.5">
                Reward Type
              </label>
              <div className="relative">
                <select
                  value={rewardType}
                  onChange={(e) => setRewardType(e.target.value)}
                  className="w-full h-10 appearance-none rounded-full border border-slate-200 bg-white px-4 pr-9 text-[13px] text-slate-700 focus:outline-none focus:border-[#37AADF] focus:ring-2 focus:ring-[#37AADF]/15 cursor-pointer"
                >
                  <option value="1 Month Free">1 month free</option>
                  <option value="Subscription Credit">
                    Subscription Credit
                  </option>
                  <option value="Discount Voucher">Discount Voucher</option>
                </select>
                <ChevronDown
                  size={15}
                  className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500"
                />
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-[12px] font-medium text-slate-600 mb-1.5">
                Notes <span className="text-slate-400">(optional)</span>
              </label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Any notes for this reward..."
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-[13px] text-slate-700 placeholder:text-slate-300 focus:outline-none focus:border-[#37AADF] focus:ring-2 focus:ring-[#37AADF]/15 resize-none"
              />
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="submit"
                className="rounded-full bg-[#37AADF] hover:bg-[#2F99CA] text-white px-6 py-2.5 text-[13px] font-semibold transition-colors cursor-pointer"
              >
                Issue reward
              </button>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full bg-[#F4F6F9] hover:bg-slate-200/70 text-slate-700 px-6 py-2.5 text-[13px] font-semibold transition-colors cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="pt-5 space-y-5">
            <div className="space-y-3">
              <div className="h-10 w-10 rounded-full bg-[#22C55E] text-white flex items-center justify-center">
                <Check size={20} strokeWidth={2.8} />
              </div>
              <div>
                <h3 className="text-[15px] font-bold text-slate-800">
                  Reward issued
                </h3>
                <p className="text-[13px] text-slate-500 mt-1">
                  The reward has been applied to {referral.referrer}&apos;s
                  account.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end pt-2">
              <button
                type="button"
                onClick={onClose}
                className="rounded-full bg-[#37AADF] hover:bg-[#2F99CA] text-white px-7 py-2.5 text-[13px] font-semibold transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}

