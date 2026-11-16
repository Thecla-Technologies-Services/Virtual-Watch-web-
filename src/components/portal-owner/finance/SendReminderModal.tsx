import { useEffect, useState } from "react";
import { Modal } from "@/components/ui/Modal";
import type { FinanceInvoice } from "./types";

interface SendReminderModalProps {
  isOpen: boolean;
  onClose: () => void;
  invoice: FinanceInvoice | null;
  onSend: (invoice: FinanceInvoice) => void;
}

export function SendReminderModal({
  isOpen,
  onClose,
  invoice,
  onSend,
}: SendReminderModalProps) {
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (isOpen) {
      setNotes("");
    }
  }, [isOpen]);

  if (!invoice) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSend(invoice);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} width="lg" height="2xl">
      <div className="px-2 pb-1">
        {/* Header */}
        <div className="pb-3 border-b border-slate-100">
          <h2 className="text-[15px] font-bold text-slate-800">
            Send invoice reminder
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="pt-4 space-y-4">
          {/* Summary */}
          <div className="space-y-2 text-[12.5px] pb-3 border-b border-slate-100">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Invoice</span>
              <span className="font-semibold text-slate-700">
                {invoice.invoiceNumber}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Company</span>
              <span className="font-semibold text-slate-700">
                {invoice.company}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Amount</span>
              <span className="font-semibold text-slate-700">
                {invoice.amount}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Recipient</span>
              <span className="font-semibold text-slate-700">
                {invoice.email}
              </span>
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
              placeholder="Any additional notes..."
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-[13px] text-slate-700 placeholder:text-slate-300 focus:outline-none focus:border-[#37AADF] focus:ring-2 focus:ring-[#37AADF]/15 resize-none"
            />
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="submit"
              className="rounded-full bg-[#37AADF] hover:bg-[#2F99CA] text-white px-6 py-2.5 text-[13px] font-semibold transition-colors cursor-pointer"
            >
              Send reminder
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

