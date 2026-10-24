import { useState } from "react";
import { Modal } from "@/components/ui/Modal";

interface Plan {
  id: string;
  name: string;
  price: string;
  description: string;
}

const PLANS: Plan[] = [
  { id: "starter",    name: "Starter",    price: "$49/mo",  description: "Up to 5 users" },
  { id: "growth",     name: "Growth",     price: "$149/mo", description: "Up to 20 users" },
  { id: "business",   name: "Business",   price: "$349/mo", description: "Up to 100 users" },
  { id: "enterprise", name: "Enterprise", price: "$890/mo", description: "Unlimited users" },
];

interface ChangePlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPlanId?: string;
  onConfirm?: (planId: string) => void;
}

export function ChangePlanModal({ isOpen, onClose, currentPlanId = "enterprise", onConfirm }: ChangePlanModalProps) {
  const [selectedPlan, setSelectedPlan] = useState(currentPlanId);

  const handleConfirm = () => {
    onConfirm?.(selectedPlan);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} width="lg">
      {/* Header */}
      <div className="pb-4 mb-4 border-b border-slate-100 shrink-0">
        <h3 className="text-base font-bold text-slate-800">Change subscription plan</h3>
      </div>

      {/* Plan grid */}
      <div className="grid grid-cols-2 gap-2 mb-6">
        {PLANS.map((plan) => {
          const isSelected = selectedPlan === plan.id;
          return (
            <button
              key={plan.id}
              type="button"
              onClick={() => setSelectedPlan(plan.id)}
              className={`flex items-start gap-3 p-4 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                isSelected
                  ? "border-[#38BDF8] bg-white"
                  : "border-slate-200 bg-white hover:border-slate-300"
              }`}
            >
              {/* Radio circle */}
              <div className={`mt-0.5 h-4 w-4 rounded-full border-2 shrink-0 flex items-center justify-center ${
                isSelected ? "border-[#38BDF8]" : "border-slate-300"
              }`}>
                {isSelected && (
                  <div className="h-2 w-2 rounded-full bg-[#38BDF8]" />
                )}
              </div>
              <div>
                <p className="text-[14px] font-bold text-slate-800 leading-snug">{plan.name}</p>
                <p className="text-[12px] text-slate-500 font-medium mt-0.5">
                  {plan.price} · {plan.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
        <button
          onClick={handleConfirm}
          className="px-6 py-2.5 bg-[#38BDF8] hover:bg-[#2BA5DF] text-white text-[14px] font-bold rounded-full transition-all cursor-pointer"
        >
          Confirm change
        </button>
        <button
          onClick={onClose}
          className="px-6 py-2.5 bg-[#FAFAFA] hover:bg-slate-100 border border-[#E7E7E7] text-[14px] font-bold text-slate-700 rounded-full transition-all cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
}
