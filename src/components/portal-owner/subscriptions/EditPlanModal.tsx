import { useEffect, useState } from "react";
import { Modal } from "@/components/ui/Modal";
import type { SubscriptionPlan } from "./types";

interface EditPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: SubscriptionPlan | null;
  onSave: (updated: SubscriptionPlan) => void;
}

export function EditPlanModal({
  isOpen,
  onClose,
  plan,
  onSave,
}: EditPlanModalProps) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [userLimit, setUserLimit] = useState("");
  const [featuresText, setFeaturesText] = useState("");

  useEffect(() => {
    if (plan) {
      setName(plan.name);
      setPrice(String(plan.price));
      setUserLimit(plan.userLimit);
      setFeaturesText(plan.features.join("\n"));
    }
  }, [plan]);

  if (!plan) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedPrice = Number(price);
    onSave({
      ...plan,
      name: name.trim() || plan.name,
      price: Number.isFinite(parsedPrice) && parsedPrice >= 0 ? parsedPrice : plan.price,
      userLimit: userLimit.trim() || plan.userLimit,
      features: featuresText
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean),
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Edit plan - ${plan.name}`}
      width="max-w-[520px]"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-[13px] font-medium text-[#2E3A59] mb-1.5">
            Plan name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full h-11 px-4 rounded-xl border border-slate-200 text-[13px] text-[#2E3A59] focus:outline-none focus:ring-2 focus:ring-[#37AADF]/30 focus:border-[#37AADF]"
          />
        </div>

        <div>
          <label className="block text-[13px] font-medium text-[#2E3A59] mb-1.5">
            Monthly price (USD)
          </label>
          <input
            type="number"
            min="0"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full h-11 px-4 rounded-xl border border-slate-200 text-[13px] text-[#2E3A59] focus:outline-none focus:ring-2 focus:ring-[#37AADF]/30 focus:border-[#37AADF]"
          />
        </div>

        <div>
          <label className="block text-[13px] font-medium text-[#2E3A59] mb-1.5">
            User limit
          </label>
          <input
            type="text"
            value={userLimit}
            onChange={(e) => setUserLimit(e.target.value)}
            className="w-full h-11 px-4 rounded-xl border border-slate-200 text-[13px] text-[#2E3A59] focus:outline-none focus:ring-2 focus:ring-[#37AADF]/30 focus:border-[#37AADF]"
          />
        </div>

        <div>
          <label className="block text-[13px] font-medium text-[#2E3A59] mb-1.5">
            Features (one per line)
          </label>
          <textarea
            rows={5}
            value={featuresText}
            onChange={(e) => setFeaturesText(e.target.value)}
            className="w-full p-4 rounded-xl border border-slate-200 text-[13px] text-[#2E3A59] resize-none focus:outline-none focus:ring-2 focus:ring-[#37AADF]/30 focus:border-[#37AADF]"
          />
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="submit"
            className="h-10 px-6 rounded-full bg-[#37AADF] hover:bg-[#2F99CA] text-white text-[13px] font-medium transition-colors cursor-pointer"
          >
            Save changes
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

