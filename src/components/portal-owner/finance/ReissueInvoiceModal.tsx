import { useEffect, useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { ChevronDown } from "lucide-react";
import type { FinanceInvoice } from "./types";

interface ReissueInvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  invoice: FinanceInvoice | null;
  onReissue: (invoice: FinanceInvoice) => void;
}

export function ReissueInvoiceModal({
  isOpen,
  onClose,
  invoice,
  onReissue,
}: ReissueInvoiceModalProps) {
  const [reason, setReason] = useState("Customer request");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (isOpen) {
      setReason("Customer request");
      setNotes("");
    }
  }, [isOpen]);

  if (!invoice) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onReissue(invoice);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} width="lg" height="2xl">
      <div className="px-2 pb-1">
        {/* Header */}
        <div className="pb-3 border-b border-slate-100">
          <h2 className="text-[15px] font-bold text-slate-800">
            Reissue invoice
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

          {/* Reason */}
          <div>
            <label className="block text-[12px] font-medium text-slate-600 mb-1.5">
              Reason for reissue
            </label>
            <div className="relative">
              <select
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full h-10 appearance-none rounded-full border border-slate-200 bg-white px-4 pr-9 text-[13px] text-slate-700 focus:outline-none focus:border-[#37AADF] focus:ring-2 focus:ring-[#37AADF]/15 cursor-pointer"
              >
                <option value="Customer request">Customer request</option>
                <option value="Billing details updated">
                  Billing details updated
                </option>
                <option value="Expired / Missed">Expired / Missed</option>
                <option value="Amount adjustment">Amount adjustment</option>
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
              Reissue &amp; Send
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

