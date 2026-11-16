import { Modal } from "@/components/ui/Modal";
import { FileText } from "lucide-react";
import type { FinanceInvoice } from "./types";

interface DownloadInvoicePdfModalProps {
  isOpen: boolean;
  onClose: () => void;
  invoice: FinanceInvoice | null;
  onDownload: (invoice: FinanceInvoice) => void;
}

export function DownloadInvoicePdfModal({
  isOpen,
  onClose,
  invoice,
  onDownload,
}: DownloadInvoicePdfModalProps) {
  if (!invoice) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} width="md" height="lg">
      <div className="px-2 pb-1">
        {/* Header */}
        <div className="pb-3 border-b border-slate-100">
          <h2 className="text-[15px] font-bold text-slate-800">
            Download invoice PDF
          </h2>
        </div>

        {/* Dark File Preview Card */}
        <div className="pt-4 space-y-4">
          <div className="rounded-2xl bg-[#101828] px-4 py-3.5 flex items-center gap-3.5">
            <div className="h-9 w-9 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0">
              <FileText size={18} />
            </div>
            <div className="min-w-0">
              <p className="text-[13px] font-bold text-white truncate">
                {invoice.invoiceNumber}.pdf
              </p>
              <p className="text-[11.5px] text-slate-400 truncate mt-0.5">
                {invoice.company} · {invoice.amount} · {invoice.dueDate}
              </p>
            </div>
          </div>

          <p className="text-[12.5px] text-slate-500">
            This will generate and download the invoice as a PDF document.
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2.5 pt-5">
          <button
            type="button"
            onClick={() => onDownload(invoice)}
            className="rounded-full bg-[#37AADF] hover:bg-[#2F99CA] text-white px-5 py-2 text-[13px] font-semibold transition-colors cursor-pointer"
          >
            Download PDF
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className="rounded-full bg-[#F4F6F9] hover:bg-slate-200/70 text-slate-700 px-5 py-2 text-[13px] font-semibold transition-colors cursor-pointer"
          >
            Print
          </button>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-white hover:bg-slate-100 text-slate-700 px-4 py-2 text-[13px] font-semibold transition-colors cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
}

