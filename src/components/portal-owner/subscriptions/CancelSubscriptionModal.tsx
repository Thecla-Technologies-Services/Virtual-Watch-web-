import { useEffect, useState } from "react";
import { AlertTriangle } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import type { CompanySubscription } from "./types";

interface CancelSubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  subscription: CompanySubscription | null;
  onConfirm: (subscriptionId: string) => void;
}

export function CancelSubscriptionModal({
  isOpen,
  onClose,
  subscription,
  onConfirm,
}: CancelSubscriptionModalProps) {
  const [reason, setReason] = useState("Customer request");
  const [effectiveDate, setEffectiveDate] = useState("End of current billing period");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (isOpen) {
      setReason("Customer request");
      setEffectiveDate("End of current billing period");
      setNotes("");
    }
  }, [isOpen, subscription?.id]);

  if (!subscription) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm(subscription.id);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Cancel subscription"
      width="max-w-[520px]"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="rounded-xl bg-[#FF0000] text-white p-3.5 flex items-start gap-2.5 text-[12px] leading-relaxed">
          <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
          <p>
            Cancelling the subscription for{" "}
            <span className="font-semibold">{subscription.company}</span> will set
            their account to Expired at the end of the billing period.
          </p>
        </div>

        <div>
          <label className="block text-[13px] font-medium text-[#2E3A59] mb-1.5">
            Cancellation reason
          </label>
          <select
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full h-11 px-4 rounded-xl border border-slate-200 text-[13px] text-[#2E3A59] bg-white focus:outline-none focus:ring-2 focus:ring-[#37AADF]/30 focus:border-[#37AADF]"
          >
            <option value="Customer request">Customer request</option>
            <option value="Non-payment">Non-payment</option>
            <option value="Switched provider">Switched provider</option>
            <option value="Business closed">Business closed</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-[13px] font-medium text-[#2E3A59] mb-1.5">
            Effective date
          </label>
          <select
            value={effectiveDate}
            onChange={(e) => setEffectiveDate(e.target.value)}
            className="w-full h-11 px-4 rounded-xl border border-slate-200 text-[13px] text-[#2E3A59] bg-white focus:outline-none focus:ring-2 focus:ring-[#37AADF]/30 focus:border-[#37AADF]"
          >
            <option value="End of current billing period">
              End of current billing period ({subscription.nextRenewal})
            </option>
            <option value="Immediately">Immediately</option>
          </select>
        </div>

        <div>
          <label className="block text-[13px] font-medium text-[#2E3A59] mb-1.5">
            Notes
          </label>
          <textarea
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Internal notes for this cancellation..."
            className="w-full p-3.5 rounded-xl border border-slate-200 text-[13px] text-[#2E3A59] placeholder:text-slate-400 resize-none focus:outline-none focus:ring-2 focus:ring-[#37AADF]/30 focus:border-[#37AADF]"
          />
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="submit"
            className="h-10 px-6 rounded-full bg-[#37AADF] hover:bg-[#2F99CA] text-white text-[13px] font-medium transition-colors cursor-pointer"
          >
            Confirm cancellation
          </button>
          <button
            type="button"
            onClick={onClose}
            className="h-10 px-6 rounded-full bg-[#F4F6F9] hover:bg-slate-200/70 text-[#2E3A59] text-[13px] font-medium transition-colors cursor-pointer"
          >
            Keep subscription
          </button>
        </div>
      </form>
    </Modal>
  );
}

