import { useEffect, useState } from "react";
import { Modal } from "@/components/ui/Modal";
import type { CompanySubscription, SubscriptionPlan } from "./types";

interface ChangePlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  subscription: CompanySubscription | null;
  plans: SubscriptionPlan[];
  onConfirm: (subscriptionId: string, newPlan: SubscriptionPlan) => void;
}

export function ChangePlanModal({
  isOpen,
  onClose,
  subscription,
  plans,
  onConfirm,
}: ChangePlanModalProps) {
  const [selectedPlanName, setSelectedPlanName] = useState("Enterprise");
  const [effectiveDate, setEffectiveDate] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (subscription) {
      setSelectedPlanName(subscription.currentPlan);
      setEffectiveDate("");
      setNotes("");
    }
  }, [subscription]);

  if (!subscription) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const chosen = plans.find((p) => p.name === selectedPlanName) ?? plans[0];
    if (chosen) {
      onConfirm(subscription.id, chosen);
    }
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Change plan - ${subscription.company}`}
      width="max-w-[540px]"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-[13px] font-medium text-[#2E3A59] mb-2">
            Subscription plan
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {plans.map((plan) => {
              const isSelected = selectedPlanName === plan.name;
              return (
                <button
                  key={plan.id}
                  type="button"
                  onClick={() => setSelectedPlanName(plan.name)}
                  className={`text-left p-3.5 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? "border-[#37AADF] bg-[#37AADF]/[0.03] ring-1 ring-[#37AADF]"
                      : "border-slate-200 bg-white hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                        isSelected ? "border-[#37AADF]" : "border-slate-300"
                      }`}
                    >
                      {isSelected && (
                        <span className="w-2 h-2 rounded-full bg-[#37AADF]" />
                      )}
                    </span>
                    <span className="text-[13px] font-semibold text-[#2E3A59]">
                      {plan.name}
                    </span>
                  </div>
                  <p className="text-[12px] text-slate-400 mt-1 pl-6">
                    ${plan.price}/mo · {plan.userLimit}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <label className="block text-[13px] font-medium text-[#2E3A59] mb-1.5">
            Effective date
          </label>
          <input
            type="date"
            value={effectiveDate}
            onChange={(e) => setEffectiveDate(e.target.value)}
            className="w-full h-11 px-4 rounded-xl border border-slate-200 text-[13px] text-[#2E3A59] focus:outline-none focus:ring-2 focus:ring-[#37AADF]/30 focus:border-[#37AADF]"
          />
        </div>

        <div>
          <label className="block text-[13px] font-medium text-[#2E3A59] mb-1.5">
            Notes <span className="text-slate-400 font-normal">(optional)</span>
          </label>
          <textarea
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Reason for plan change..."
            className="w-full p-3.5 rounded-xl border border-slate-200 text-[13px] text-[#2E3A59] placeholder:text-slate-400 resize-none focus:outline-none focus:ring-2 focus:ring-[#37AADF]/30 focus:border-[#37AADF]"
          />
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="submit"
            className="h-10 px-6 rounded-full bg-[#37AADF] hover:bg-[#2F99CA] text-white text-[13px] font-medium transition-colors cursor-pointer"
          >
            Confirm change
          </button>
          <button
            type="button"
            onClick={onClose}
            className="h-10 px-6 rounded-full bg-[#F4F6F9] hover:bg-slate-200/70 text-[#2E3A59] text-[13px] font-medium transition-colors cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
}

