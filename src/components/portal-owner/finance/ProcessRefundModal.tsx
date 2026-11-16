import { useEffect, useState } from "react";
import { Modal } from "@/components/ui/Modal";
import {
  Check,
  ChevronDown,
  CreditCard,
  ArrowUpRight,
  RefreshCw,
  FileText,
} from "lucide-react";
import type { FinanceInvoice } from "./types";

interface ProcessRefundModalProps {
  isOpen: boolean;
  onClose: () => void;
  invoice: FinanceInvoice | null;
  onComplete: (invoiceId: string) => void;
}

type RefundStep = "form" | "review" | "done";

const REFUND_MEDIUMS = [
  {
    id: "original",
    title: "Original payment method",
    subtitle: "Visa ···· 4892 — refund within 5–10 business days",
    reviewLabel: "Visa ···· 4892 (Original)",
    icon: CreditCard,
  },
  {
    id: "bank",
    title: "Bank / EFT transfer",
    subtitle: "Direct deposit to company bank account",
    reviewLabel: "Bank / EFT transfer",
    icon: ArrowUpRight,
  },
  {
    id: "credit",
    title: "Account credit",
    subtitle: "Apply as credit towards future invoices",
    reviewLabel: "Account credit",
    icon: RefreshCw,
  },
  {
    id: "manual",
    title: "Manual / Cheque",
    subtitle: "Processed offline by finance team",
    reviewLabel: "Manual / Cheque",
    icon: FileText,
  },
] as const;

export function ProcessRefundModal({
  isOpen,
  onClose,
  invoice,
  onComplete,
}: ProcessRefundModalProps) {
  const [step, setStep] = useState<RefundStep>("form");
  const [mediumId, setMediumId] = useState<string>("original");
  const [amount, setAmount] = useState("$890.00");
  const [reason, setReason] = useState("Billing error");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (isOpen && invoice) {
      setStep("form");
      setMediumId("original");
      setAmount(invoice.amount);
      setReason("Billing error");
      setNotes("");
    }
  }, [isOpen, invoice]);

  if (!invoice) return null;

  const selectedMedium =
    REFUND_MEDIUMS.find((m) => m.id === mediumId) || REFUND_MEDIUMS[0];

  const handleConfirm = () => {
    onComplete(invoice.id);
    setStep("done");
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} width="lg" height="3xl">
      <div className="flex flex-col h-full max-h-[84vh] px-2 pb-1">
        {/* Header */}
        <div className="pb-3 border-b border-slate-100 shrink-0">
          <h2 className="text-[15px] font-bold text-slate-800">
            {step === "form" ? "Process refund" : "Process refund - Review"}
          </h2>
        </div>

        <div className="flex-1 overflow-y-auto pt-4 pb-2">
          {step === "form" && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setStep("review");
              }}
              className="space-y-4"
            >
              {/* Company & Invoice Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-[#F8FAFC] rounded-xl p-3.5 text-[12px]">
                  <p className="text-[10.5px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    COMPANY DETAILS
                  </p>
                  <p className="font-medium text-slate-700">{invoice.company}</p>
                  <p className="text-slate-400 mt-0.5">+27 21 555 0100</p>
                  <p className="text-slate-400 mt-0.5">{invoice.email}</p>
                  <p className="text-slate-400 mt-0.5">{invoice.address}</p>
                </div>

                <div className="bg-[#F8FAFC] rounded-xl p-3.5 text-[12px]">
                  <p className="text-[10.5px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    INVOICE DETAILS
                  </p>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-slate-400">
                      <span>ID</span>
                      <span className="text-slate-600">
                        {invoice.invoiceNumber}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-slate-400">
                      <span>Plan</span>
                      <span className="text-slate-600">{invoice.plan}</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-400">
                      <span>Date</span>
                      <span className="text-slate-600">{invoice.dueDate}</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-400">
                      <span>Charge</span>
                      <span className="text-slate-600">{invoice.amount}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Refund Medium */}
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-2">
                  REFUND MEDIUM
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {REFUND_MEDIUMS.map((m) => {
                    const isSelected = mediumId === m.id;
                    const Icon = m.icon;
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setMediumId(m.id)}
                        className={`text-left rounded-xl border p-3 transition-all cursor-pointer flex items-start gap-2.5 ${
                          isSelected
                            ? "border-[#37AADF] bg-[#F4FAFE]"
                            : "border-slate-100 bg-white hover:border-slate-200"
                        }`}
                      >
                        <span
                          className={`mt-0.5 h-4 w-4 rounded-full border flex items-center justify-center shrink-0 ${
                            isSelected
                              ? "border-[#37AADF]"
                              : "border-slate-300"
                          }`}
                        >
                          {isSelected && (
                            <span className="h-2 w-2 rounded-full bg-[#37AADF]" />
                          )}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-[12.5px] font-semibold text-slate-800">
                              {m.title}
                            </span>
                            <Icon
                              size={13}
                              className="text-slate-400 shrink-0"
                            />
                          </div>
                          <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                            {m.subtitle}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Amount */}
              <div>
                <label className="block text-[12px] font-medium text-slate-600 mb-1.5">
                  Refund amount
                </label>
                <input
                  type="text"
                  required
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full h-10 rounded-full border border-slate-200 px-4 text-[13px] text-slate-700 focus:outline-none focus:border-[#37AADF] focus:ring-2 focus:ring-[#37AADF]/15"
                />
              </div>

              {/* Reason */}
              <div>
                <label className="block text-[12px] font-medium text-slate-600 mb-1.5">
                  Refund reason
                </label>
                <div className="relative">
                  <select
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="w-full h-10 appearance-none rounded-full border border-slate-200 bg-white px-4 pr-9 text-[13px] text-slate-700 focus:outline-none focus:border-[#37AADF] focus:ring-2 focus:ring-[#37AADF]/15 cursor-pointer"
                  >
                    <option value="Billing error">Billing error</option>
                    <option value="Duplicate charge">Duplicate charge</option>
                    <option value="Service cancellation">
                      Service cancellation
                    </option>
                    <option value="Customer request">Customer request</option>
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
                  Notes
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Additional context to this refund..."
                  className="w-full rounded-2xl border border-slate-200 px-4 py-2.5 text-[13px] text-slate-700 placeholder:text-slate-300 focus:outline-none focus:border-[#37AADF] focus:ring-2 focus:ring-[#37AADF]/15 resize-none"
                />
              </div>

              {/* Footer */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="submit"
                  className="rounded-full bg-[#37AADF] hover:bg-[#2F99CA] text-white px-6 py-2.5 text-[13px] font-semibold transition-colors cursor-pointer"
                >
                  Review refund
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
          )}

          {step === "review" && (
            <div className="space-y-5">
              <div className="bg-[#F8FAFC] rounded-2xl p-4 space-y-2.5 text-[12.5px]">
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                  REFUND SUMMARY
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Company</span>
                  <span className="font-semibold text-slate-700">
                    {invoice.company}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Invoice</span>
                  <span className="font-semibold text-slate-700">
                    {invoice.invoiceNumber}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Refund amount</span>
                  <span className="font-semibold text-slate-700">{amount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Refund via</span>
                  <span className="font-semibold text-slate-700">
                    {selectedMedium.reviewLabel}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Reason</span>
                  <span className="font-semibold text-slate-700">{reason}</span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleConfirm}
                  className="rounded-full bg-[#37AADF] hover:bg-[#2F99CA] text-white px-6 py-2.5 text-[13px] font-semibold transition-colors cursor-pointer"
                >
                  Confirm &amp; Process
                </button>
                <button
                  type="button"
                  onClick={() => setStep("form")}
                  className="rounded-full bg-[#F4F6F9] hover:bg-slate-200/70 text-slate-700 px-6 py-2.5 text-[13px] font-semibold transition-colors cursor-pointer"
                >
                  Back
                </button>
              </div>
            </div>
          )}

          {step === "done" && (
            <div className="space-y-5">
              <div className="pt-2 space-y-3">
                <div className="h-10 w-10 rounded-full bg-[#22C55E] text-white flex items-center justify-center">
                  <Check size={20} strokeWidth={2.8} />
                </div>
                <div>
                  <h3 className="text-[15px] font-bold text-slate-800">
                    Refund initiated
                  </h3>
                  <p className="text-[13px] text-slate-500 mt-1 leading-relaxed">
                    A {amount} refund has been queued for {invoice.company} via{" "}
                    {selectedMedium.reviewLabel}. Processing time varies by
                    method.
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
      </div>
    </Modal>
  );
}

