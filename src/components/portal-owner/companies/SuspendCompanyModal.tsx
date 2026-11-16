import { useState, useEffect } from "react";
import { Modal } from "@/components/ui/Modal";
import { AlertTriangle, ChevronDown } from "lucide-react";
import type { Company } from "./types";

interface SuspendCompanyModalProps {
  isOpen: boolean;
  onClose: () => void;
  company: Company | null;
  onConfirm: (companyId: string, reason: string, notes: string) => void;
}

export function SuspendCompanyModal({
  isOpen,
  onClose,
  company,
  onConfirm,
}: SuspendCompanyModalProps) {
  const [reason, setReason] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (isOpen) {
      setReason("");
      setNotes("");
    }
  }, [isOpen]);

  if (!company) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm(company.id, reason, notes);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} width="lg" height="2xl">
      <div className="px-2 pb-1">
        {/* Header */}
        <div className="pb-3 border-b border-slate-100">
          <h2 className="text-[15px] font-bold text-slate-800">
            Suspend company
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="pt-4 space-y-4">
          {/* Warning Banner */}
          <div className="rounded-xl bg-[#FDE68A]/75 border border-[#FCD34D] px-4 py-3 flex items-start gap-2.5 text-[12px] text-slate-700 leading-relaxed">
            <AlertTriangle
              size={16}
              className="text-slate-700 shrink-0 mt-0.5"
            />
            <span>
              Suspending <span className="font-bold">{company.name}</span> will
              restrict all platform features. Users can still log in but cannot
              create or modify data.
            </span>
          </div>

          {/* Suspension reason */}
          <div>
            <label className="block text-[12px] font-medium text-slate-600 mb-1.5">
              Suspension reason
            </label>
            <div className="relative">
              <select
                required
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full h-10 appearance-none rounded-full border border-slate-200 bg-white px-4 pr-9 text-[13px] text-slate-700 focus:outline-none focus:border-[#37AADF] focus:ring-2 focus:ring-[#37AADF]/15 cursor-pointer"
              >
                <option value="">Select</option>
                <option value="Non-payment / Overdue invoice">
                  Non-payment / Overdue invoice
                </option>
                <option value="Policy violation">Policy violation</option>
                <option value="Security concern">Security concern</option>
                <option value="Requested by client">Requested by client</option>
                <option value="Other">Other</option>
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
              placeholder="Additional context for this suspension..."
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-[13px] text-slate-700 placeholder:text-slate-300 focus:outline-none focus:border-[#37AADF] focus:ring-2 focus:ring-[#37AADF]/15 resize-none"
            />
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="submit"
              className="rounded-full bg-[#FDE068] hover:bg-[#FCD34D] text-slate-800 px-6 py-2.5 text-[13px] font-semibold transition-colors cursor-pointer"
            >
              Confirm suspension
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
      </div>
    </Modal>
  );
}

