import { useEffect, useMemo, useState } from "react";
import { Check } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import type { CompanySubscription } from "./types";

interface ExtendSubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  subscription: CompanySubscription | null;
  onConfirm: (subscriptionId: string, newRenewalDate: string) => void;
}

function addThirtyDays(dateStr: string): string {
  const parsed = new Date(dateStr);
  if (Number.isNaN(parsed.getTime())) {
    return "Aug 31, 2024";
  }
  const next = new Date(parsed);
  next.setDate(next.getDate() + 30);
  return next.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function ExtendSubscriptionModal({
  isOpen,
  onClose,
  subscription,
  onConfirm,
}: ExtendSubscriptionModalProps) {
  const [reason, setReason] = useState("Customer request");
  const [details, setDetails] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setReason("Customer request");
      setDetails("");
      setIsSuccess(false);
    }
  }, [isOpen, subscription?.id]);

  const newRenewal = useMemo(
    () => (subscription ? addThirtyDays(subscription.nextRenewal) : ""),
    [subscription]
  );

  if (!subscription) return null;

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm(subscription.id, newRenewal);
    setIsSuccess(true);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Extend subscription"
      width="max-w-[520px]"
    >
      {isSuccess ? (
        <div className="space-y-6 py-2">
          <div className="space-y-3">
            <div className="w-9 h-9 rounded-full bg-[#16A34A] text-white flex items-center justify-center">
              <Check className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-[15px] font-bold text-[#2E3A59]">
                Subscription extended
              </h4>
              <p className="text-[13px] text-slate-500 mt-1">
                {subscription.company}&apos;s renewal date has been extended by 30 days.
              </p>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="h-10 px-6 rounded-full bg-[#37AADF] hover:bg-[#2F99CA] text-white text-[13px] font-medium transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleConfirm} className="space-y-4">
          <p className="text-[13px] text-[#2E3A59]">
            Extend the subscription for{" "}
            <span className="font-semibold">{subscription.company}</span> by 30 days?
          </p>

          <div className="space-y-2 py-2 border-b border-slate-100 text-[13px]">
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Current renewal</span>
              <span className="font-medium text-[#2E3A59]">
                {subscription.nextRenewal}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">New renewal</span>
              <span className="font-semibold text-[#16A34A]">{newRenewal}</span>
            </div>
          </div>

          <div>
            <label className="block text-[13px] font-medium text-[#2E3A59] mb-1.5">
              Reason
            </label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full h-11 px-4 rounded-xl border border-slate-200 text-[13px] text-[#2E3A59] bg-white focus:outline-none focus:ring-2 focus:ring-[#37AADF]/30 focus:border-[#37AADF]"
            >
              <option value="Customer request">Customer request</option>
              <option value="Billing issue">Billing issue</option>
              <option value="Goodwill gesture">Goodwill gesture</option>
              <option value="Technical downtime">Technical downtime</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-[13px] font-medium text-[#2E3A59] mb-1.5">
              Others (Specify)
            </label>
            <textarea
              rows={3}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Reason for extension..."
              className="w-full p-3.5 rounded-xl border border-slate-200 text-[13px] text-[#2E3A59] placeholder:text-slate-400 resize-none focus:outline-none focus:ring-2 focus:ring-[#37AADF]/30 focus:border-[#37AADF]"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="submit"
              className="h-10 px-6 rounded-full bg-[#37AADF] hover:bg-[#2F99CA] text-white text-[13px] font-medium transition-colors cursor-pointer"
            >
              Confirm extension
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
      )}
    </Modal>
  );
}

