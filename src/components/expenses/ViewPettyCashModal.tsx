import { Modal } from "@/components/ui/Modal";
import type { PettyCashItem } from "@/constants/expenses";
import { Check, X, Download, CheckCircle2, XCircle } from "lucide-react";

interface ViewPettyCashModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: PettyCashItem | null;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
}

export function ViewPettyCashModal({
  isOpen,
  onClose,
  item,
  onApprove,
  onReject,
}: ViewPettyCashModalProps) {
  if (!item) return null;

  const renderStatusDot = (status: string) => {
    let bg = "bg-[#36C328]";
    if (status === "Pending") bg = "bg-[#F19E39]";
    if (status === "Rejected") bg = "bg-[#FF1100]";
    return <span className={`h-2 w-2 rounded-full ${bg} inline-block mr-2`}></span>;
  };

  const renderApprovalBox = () => {
    if (item.status === "Approved") {
      return (
        <div className="bg-[#E8F8EE] rounded-xl p-4 flex items-start gap-3">
          <div className="p-0.5">
            <CheckCircle2 size={18} className="text-[#36C328]" />
          </div>
          <div>
            <p className="text-[14px] font-semibold mb-0.5">Approved</p>
            <p className="text-[14px] font-normal text-muted">
              This expense claim has been reviewed and approved
            </p>
          </div>
        </div>
      );
    }

    if (item.status === "Rejected") {
      return (
        <div className="bg-[#FFF6F5] rounded-xl p-4 flex items-start gap-3">
          <div className="p-0.5">
            <XCircle size={18} className="text-[#FF1100]" />
          </div>
          <div>
            <p className="text-[14px] font-semibold mb-0.5">Rejected</p>
            <p className="text-[14px] font-normal text-muted">
              This expense claim was not approved upon review
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-[#FEF5EA] rounded-xl p-4 flex items-start gap-3">
        <div className="p-0.5">
          <span className="flex items-center justify-center h-4 w-4 bg-[#F19E39] text-white rounded-full font-extrabold text-[11px]">
            !
          </span>
        </div>
        <div>
          <p className="text-[14px] font-semibold mb-0.5">Awaiting approval</p>
          <p className="text-[14px] font-normal text-muted">
            This expense is pending review and approval
          </p>
        </div>
      </div>
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} width="4xl" height="xl">
      <div className="flex items-center justify-between border-b pb-3 mb-4">
        <h3 className="text-base font-bold">View details</h3>
      </div>

      <div className="max-h-[74vh] overflow-y-auto pr-1 no-scrollbar">
        {/* Header Title & Reference */}
        <div className="mb-5">
          <h2 className="text-[17px] font-bold">{item.description}</h2>
          <div className="flex items-center gap-2">
            <span className="text-[14px] font-medium text-muted">Invoice reference</span>
            <span className="px-2.5 py-0.5 bg-primary/8 text-primary text-[12px] font-bold rounded-md tracking-wide">
              {item.reference || "INV-2024-001234"}
            </span>
          </div>
        </div>

        {/* Summary Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="bg-[#FBFBFB] rounded-2xl p-4 flex flex-col justify-center">
            <div className="flex items-center font-medium text-[16px]">
              {renderStatusDot(item.status)}
              <span>{item.status}</span>
            </div>
            <p className="text-[14px] font-normal text-muted">Status</p>
          </div>

          <div className="bg-[#FBFBFB] rounded-2xl p-4 flex flex-col justify-center">
            <div className="font-medium text-[16px]">{item.amount}</div>
            <p className="text-[14px] font-normal text-muted">Amount</p>
          </div>
        </div>

        {/* 2-Column Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Petty Cash Information */}
          <div>
            <h4 className="text-[13px] font-bold uppercase mb-4">
              PETTY CASH INFORMATION
            </h4>
            <div className="border rounded-2xl p-4">
              <div>
                <p className="text-[14px] font-normal text-muted">Quantity</p>
                <p className="text-[14px] font-medium">{item.quantity || 4}</p>
              </div>

              <hr className="border-t my-3.5" />

              <div>
                <p className="text-[14px] font-normal text-muted">Type</p>
                <p className="text-[14px] font-medium">{item.type}</p>
              </div>

              <hr className="border-t my-3.5" />

              <div>
                <p className="text-[14px] font-normal text-muted">Description</p>
                <p className="text-[14px] font-medium leading-relaxed">
                  {item.notes || item.description}
                </p>
              </div>
            </div>
          </div>

          {/* Submission Details */}
          <div>
            <h4 className="text-[13px] font-bold uppercase mb-4">
              SUBMISSION DETAILS
            </h4>
            <div className="border rounded-2xl p-4">
              <div>
                <p className="text-[14px] font-normal text-muted">Submitted by</p>
                <p className="text-[14px] font-medium">{item.submittedBy}</p>
              </div>

              <hr className="border-t my-3.5" />

              <div>
                <p className="text-[14px] font-normal text-muted">Submission date</p>
                <p className="text-[14px] font-medium">{item.date}</p>
              </div>

              <hr className="border-t my-3.5" />

              <div>
                <p className="text-[14px] font-normal text-muted">Expense date</p>
                <p className="text-[14px] font-medium">{item.expenseDate || item.date}</p>
              </div>
            </div>
          </div>
        </div>

        <hr className="border-t my-5" />

        {/* Approval Status */}
        <div className="mb-6">
          <h4 className="text-[13px] font-bold uppercase mb-4">
            APPROVAL STATUS
          </h4>
          {renderApprovalBox()}
        </div>

        <hr className="border-t my-5" />

        {/* Attachments */}
        <div className="mb-6">
          <h4 className="text-[13px] font-bold uppercase mb-4">
            ATTACHMENTS
          </h4>
          <div className="border rounded-2xl p-4 flex items-center gap-2.5 text-[14px] font-normal text-muted cursor-pointer hover:bg-slate-50 transition-colors">
            <Download size={16} className="text-[#38BDF8]" />
            <span>{item.attachmentName || "receipt-printer-paper.pdf"}</span>
          </div>
        </div>

        {/* Action Footer */}
        <div className="flex flex-wrap items-center justify-end gap-3 pt-5 border-t mt-8">
          <button
            type="button"
            onClick={() => {
              if (onApprove) onApprove(item.id);
              onClose();
            }}
            className="flex items-center gap-2 px-6 py-2.5 bg-[#36C328] hover:bg-green-700 text-white text-[14px] font-bold rounded-full transition-all cursor-pointer"
          >
            <Check size={16} strokeWidth={3} className="text-white" />
            <span>Approve</span>
          </button>
          <button
            type="button"
            onClick={() => {
              if (onReject) onReject(item.id);
              onClose();
            }}
            className="flex items-center gap-2 px-6 py-2.5 bg-[#FF1100] hover:bg-red-600 text-white text-[14px] font-bold rounded-full transition-all cursor-pointer"
          >
            <X size={16} strokeWidth={3} className="text-white" />
            <span>Reject</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 bg-[#FAFAFA] hover:bg-slate-100 border text-[14px] font-bold text-slate-700 rounded-full transition-all cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
}
