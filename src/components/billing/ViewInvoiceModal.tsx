import { Modal } from "@/components/ui/Modal";
import { Download } from "lucide-react";

interface InvoiceItem {
  description: string;
  qty: number;
  unitPrice: number;
  total: number;
}

interface ViewInvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  invoice: {
    invoiceNumber: string;
    status: "Paid" | "Overdue" | "Refund";
    billedTo: {
      company: string;
      address: string;
      email: string;
    };
    issueDate: string;
    dueDate: string;
    plan: string;
    items: InvoiceItem[];
    subtotal: number;
    tax: number;
    total: number;
  } | null;
}

const STATUS_STYLES: Record<string, string> = {
  Paid:    "bg-green-50 text-green-600 border border-green-200",
  Overdue: "bg-amber-50 text-amber-600 border border-amber-200",
  Refund:  "bg-red-50 text-red-600 border border-red-200",
};

function fmt(n: number) {
  return `$${n.toFixed(2)}`;
}

export function ViewInvoiceModal({ isOpen, onClose, invoice }: ViewInvoiceModalProps) {
  if (!invoice) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} width="xl" height="xl">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100 shrink-0">
        <h3 className="text-base font-bold text-slate-800">Invoice - {invoice.invoiceNumber}</h3>
      </div>

      {/* Branding row */}
      <div className="flex items-start justify-between mb-5">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-red-500 flex items-center justify-center text-white font-bold text-sm shrink-0">
            ⚡
          </div>
          <span className="text-[15px] font-bold text-slate-800">Orion Inc.</span>
        </div>
        <div className="text-right">
          <p className="text-[12px] text-slate-400 font-medium">Invoice number</p>
          <p className="text-[14px] font-bold text-slate-800">{invoice.invoiceNumber}</p>
          <span className={`inline-block mt-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${STATUS_STYLES[invoice.status] ?? ""}`}>
            {invoice.status}
          </span>
        </div>
      </div>

      {/* Billed To + Invoice Details */}
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-2xl p-4 bg-[#FAFAFA]">
          <p className="text-[10px] font-bold uppercase mb-2">Billed to</p>
          <p className="text-[13px] font-bold text-[#777777]  mb-0.5">{invoice.billedTo.company}</p>
          <p className="text-[11px] text-[#333448]">{invoice.billedTo.address}</p>
          <p className="text-[11px] text-[#333448]">{invoice.billedTo.email}</p>
        </div>
        <div className="rounded-2xl p-4 bg-[#FAFAFA]">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">Invoice details</p>
          <div className="">
            {[
              ["Issue date", invoice.issueDate],
              ["Due date",   invoice.dueDate],
              ["Plan",       invoice.plan],
            ].map(([label, value]) => (
              <div key={label} className="flex items-center justify-between">
                <span className="text-[11px] text-[#333448]">{label}</span>
                <span className="text-[11px] text-[#777777]">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <hr className="border-b my-3"/> 

      {/* Line Items Table */}
      <div className="border border-slate-100 rounded-2xl overflow-hidden mb-4">
        <table className="w-full text-[13px]">
          <thead>
            <tr className="border-b border-slate-100 bg-[#FAFAFA]">
              <th className="text-left px-4 py-2 text-[11px] font-semibold text-[#333448]">Description</th>
              <th className="text-center px-4 py-2 text-[11px] font-semibold text-[#333448]">Qty</th>
              <th className="text-right px-4 py-2 text-[11px] font-semibold text-[#333448]">Unit price</th>
              <th className="text-right px-4 py-2 text-[11px] font-semibold text-[#333448]">Total</th>
            </tr>
          </thead>
          <tbody>
            {invoice.items.map((item, i) => (
              <tr key={i} className="border-b last:border-0 border-slate-50">
                <td className="px-4 py-2 text-[#777777] text-[12px]">{item.description}</td>
                <td className="px-4 py-2 text-center text-[#777777] text-[12px]">{item.qty}</td>
                <td className="px-4 py-2 text-right text-[#777777] text-[12px]">{fmt(item.unitPrice)}</td>
                <td className="px-4 py-2 text-right text-[#777777] text-[12px]">{fmt(item.total)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Totals */}
      <div className="flex justify-end mb-6">
        <div className="w-56 space-y-1.5">
          {[
            ["Subtotal", fmt(invoice.subtotal), false],
            ["Tax (0%)", fmt(invoice.tax),      false],
            ["Total",    fmt(invoice.total),     true ],
          ].map(([label, value, bold]) => (
            <div key={label as string} className="flex justify-between text-[13px]">
              <span className={`${bold ? "font-semibold text-[#333448]" : "text-[#777777]"}`}>{label}</span>
              <span className={`${bold ? "font-semibold text-[#333448]" : "text-[#777777]"}`}>{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 shrink-0">
        <button
          onClick={() => console.log("Download PDF")}
          className="flex items-center gap-2 px-6 py-2.5 bg-[#38BDF8] hover:bg-[#2BA5DF] text-white text-[14px] font-bold rounded-full transition-all cursor-pointer"
        >
          <Download size={14} />
          Download PDF
        </button>
        <button
          onClick={onClose}
          className="px-6 py-2.5 bg-[#FAFAFA] hover:bg-slate-100 border border-[#E7E7E7] text-[14px] font-bold text-slate-700 rounded-full transition-all cursor-pointer"
        >
          Close
        </button>
      </div>
    </Modal>
  );
}
