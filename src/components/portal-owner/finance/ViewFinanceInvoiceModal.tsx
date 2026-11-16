import { Modal } from "@/components/ui/Modal";
import type { FinanceInvoice, InvoiceStatus } from "./types";

interface ViewFinanceInvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  invoice: FinanceInvoice | null;
  onDownloadPdf: (invoice: FinanceInvoice) => void;
}

const STATUS_BADGE: Record<InvoiceStatus, string> = {
  Paid: "bg-[#E8F8EE] text-[#22C55E]",
  Overdue: "bg-[#FEF7E6] text-[#F59E0B]",
  Refund: "bg-[#FEF2F2] text-[#EF4444]",
};

export function ViewFinanceInvoiceModal({
  isOpen,
  onClose,
  invoice,
  onDownloadPdf,
}: ViewFinanceInvoiceModalProps) {
  if (!invoice) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} width="lg" height="3xl">
      <div className="px-2 pb-2">
        {/* Header */}
        <div className="pb-3 border-b border-slate-100">
          <h2 className="text-[15px] font-bold text-slate-800">
            Invoice - {invoice.invoiceNumber}
          </h2>
        </div>

        {/* Brand & Invoice Number */}
        <div className="flex items-start justify-between gap-4 pt-5 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="h-7 w-7 rounded-full bg-rose-500 text-white flex items-center justify-center text-xs font-bold">
              ⚡
            </div>
            <div>
              <p className="text-[13.5px] font-bold text-slate-800 leading-tight">
                Orion Inc.
              </p>
              <p className="text-[11.5px] text-slate-400">
                support@orioninc.io
              </p>
            </div>
          </div>

          <div className="text-right">
            <p className="text-[11px] text-slate-400">Invoice number</p>
            <p className="text-[13px] font-bold text-slate-800">
              {invoice.invoiceNumber}
            </p>
            <span
              className={`inline-block mt-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                STATUS_BADGE[invoice.status]
              }`}
            >
              {invoice.status}
            </span>
          </div>
        </div>

        {/* Billed To & Invoice Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
          <div className="bg-[#F8FAFC] rounded-xl p-3.5 text-[12px]">
            <p className="text-[10.5px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              BILLED TO
            </p>
            <p className="font-medium text-slate-600">{invoice.company}</p>
            <p className="text-slate-400 mt-0.5">{invoice.address}</p>
            <p className="text-slate-400 mt-0.5">{invoice.email}</p>
          </div>

          <div className="bg-[#F8FAFC] rounded-xl p-3.5 text-[12px]">
            <p className="text-[10.5px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              INVOICE DETAILS
            </p>
            <div className="space-y-1">
              <div className="flex items-center justify-between text-slate-400">
                <span>Issue date</span>
                <span className="text-slate-500">{invoice.date}</span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span>Due date</span>
                <span className="text-slate-500">{invoice.dueDate}</span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span>Plan</span>
                <span className="text-slate-500">{invoice.plan}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Line Items Table */}
        <div className="rounded-xl border border-slate-100 overflow-hidden mb-4">
          <table className="w-full text-[12px]">
            <thead className="bg-[#F8FAFC] border-b border-slate-100">
              <tr>
                <th className="py-2.5 px-3.5 text-left font-semibold text-slate-600">
                  Description
                </th>
                <th className="py-2.5 px-3 text-left font-semibold text-slate-600">
                  Qty
                </th>
                <th className="py-2.5 px-3 text-left font-semibold text-slate-600">
                  Unit price
                </th>
                <th className="py-2.5 px-3.5 text-right font-semibold text-slate-600">
                  Total
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-500">
              <tr>
                <td className="py-3 px-3.5">
                  {invoice.plan} Plan Subscription - Monthly
                </td>
                <td className="py-3 px-3">1</td>
                <td className="py-3 px-3">{invoice.amount}</td>
                <td className="py-3 px-3.5 text-right">{invoice.amount}</td>
              </tr>
              <tr>
                <td className="py-3 px-3.5">Platform Usage Fee</td>
                <td className="py-3 px-3">1</td>
                <td className="py-3 px-3">$0.00</td>
                <td className="py-3 px-3.5 text-right">$0.00</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className="flex justify-end mb-5">
          <div className="w-52 space-y-1.5 text-[12px]">
            <div className="flex items-center justify-between text-slate-400">
              <span>Subtotal</span>
              <span>{invoice.amount}</span>
            </div>
            <div className="flex items-center justify-between text-slate-400">
              <span>Tax (0%)</span>
              <span>$0.00</span>
            </div>
            <div className="flex items-center justify-between font-bold text-slate-700 pt-1">
              <span>Total</span>
              <span>{invoice.amount}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={() => onDownloadPdf(invoice)}
            className="rounded-full bg-[#37AADF] hover:bg-[#2F99CA] text-white px-6 py-2.5 text-[13px] font-semibold transition-colors cursor-pointer"
          >
            Download PDF
          </button>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-[#F4F6F9] hover:bg-slate-200/70 text-slate-700 px-6 py-2.5 text-[13px] font-semibold transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
}

