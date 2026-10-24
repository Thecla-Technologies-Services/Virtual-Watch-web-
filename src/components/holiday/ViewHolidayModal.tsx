import React from "react";
import { Modal } from "@/components/ui/Modal";
import type { HolidayRequest } from "@/constants/holidays";
import { User, Calendar, Clipboard, Briefcase } from "@duo-icons/react";
import { Check, X, FileText } from "lucide-react";

interface ViewHolidayModalProps {
  isOpen: boolean;
  onClose: () => void;
  request: HolidayRequest | null;
  onApprove?: (id: string) => void;
  onRejectClick?: (request: HolidayRequest) => void;
}

export function ViewHolidayModal({
  isOpen,
  onClose,
  request,
  onApprove,
  onRejectClick,
}: ViewHolidayModalProps) {
  if (!request) return null;

  const renderStatusDot = (status: string) => {
    let bg = "bg-green-500";
    if (status === "Pending" || status === "Under review") bg = "bg-amber-500";
    if (status === "Rejected") bg = "bg-red-500";
    return <span className={`h-2 w-2 rounded-full ${bg} inline-block mr-2`}></span>;
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} width="4xl" height="xl">
      <div className="flex items-center justify-between border-b pb-3 mb-4">
        <h3 className="text-base font-bold">View details</h3>
      </div>

      <div className="max-h-[74vh] overflow-y-auto pr-1 no-scrollbar">
        {/* Header Title & Badge */}
        <div className="mb-5">
          <h2 className="text-[17px] font-bold">Leave request</h2>
          <div className="flex items-center gap-2">
            <span className="text-[14px] font-medium text-muted">Request ID</span>
            <span className="px-2.5 py-0.5 bg-primary/8 text-primary text-[12px] font-bold rounded-md tracking-wide">
              {request.requestId || "HJ7789Yijk"}
            </span>
          </div>
        </div>

        {/* Summary Stat Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <div className="bg-[#FBFBFB] rounded-2xl p-4 flex flex-col justify-center">
            <div className="flex items-center font-medium text-[16px]">
              {renderStatusDot(request.status)}
              <span>{request.status}</span>
            </div>
            <p className="text-[14px] font-normal text-muted">Status</p>
          </div>

          <div className="bg-[#FBFBFB] rounded-2xl p-4 flex flex-col justify-center">
            <div className="font-medium text-[16px]">{request.type}</div>
            <p className="text-[14px] font-normal text-muted">Leave type</p>
          </div>

          <div className="bg-[#FBFBFB] rounded-2xl p-4 flex flex-col justify-center">
            <div className="font-medium text-[16px]">{request.daysCount || request.days}</div>
            <p className="text-[14px] font-normal text-muted">Days requested</p>
          </div>

          <div className="bg-[#FBFBFB] rounded-2xl p-4 flex flex-col justify-center">
            <div className="font-medium text-[16px]">{request.requestedDate}</div>
            <p className="text-[14px] font-normal text-muted">Requested date</p>
          </div>
        </div>

        {/* Request Details Section */}
        <div className="mb-6">
          <h4 className="text-[13px] font-bold uppercase mb-4">
            REQUEST DETAILS
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-6 gap-x-6">
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-primary">
                    <User size={16} />
                  </span>
                  <span className="text-[14px] font-normal text-muted">Staff member</span>
                </div>
                <p className="text-[14px] font-medium">{request.name}</p>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="text-primary">
                    <Calendar size={16} />
                  </span>
                  <span className="text-[14px] font-normal text-muted">End date</span>
                </div>
                <p className="text-[14px] font-medium">{request.toDate}</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-primary">
                    <Clipboard size={16} />
                  </span>
                  <span className="text-[14px] font-normal text-muted">Leave type</span>
                </div>
                <p className="text-[14px] font-medium">{request.type}</p>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="text-primary">
                    <Briefcase size={16} />
                  </span>
                  <span className="text-[14px] font-normal text-muted">Reason</span>
                </div>
                <p className="text-[14px] font-medium">{request.reason || "N/A"}</p>
              </div>
            </div>

            <div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-primary">
                    <Calendar size={16} />
                  </span>
                  <span className="text-[14px] font-normal text-muted">Start date</span>
                </div>
                <p className="text-[14px] font-medium">{request.fromDate}</p>
              </div>
            </div>
          </div>
        </div>

        <hr className="border-t my-5" />

        {/* Split Section: Leave Balance & Additional Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
          {/* Leave Balance */}
          <div>
            <h4 className="text-[13px] font-bold uppercase  mb-4">
              LEAVE BALANCE
            </h4>
            <div className="bg-[#F4F9FC] p-4 rounded-xl flex justify-between items-center mb-2">
              <span className="text-[13px] font-medium">Balance before</span>
              <span className="font-bold text-[14px]">{request.balanceBefore || 18} days</span>
            </div>
            <div className="bg-[#FFF6F5] p-4 rounded-xl flex justify-between items-center mb-2">
              <span className="text-[13px] font-medium">Days requested</span>
              <span className="font-bold text-[#FF1100] text-[14px]">- {request.daysCount || 6}</span>
            </div>
            <div className="bg-[#F3FCF2] p-4 rounded-xl flex justify-between items-center">
              <span className="text-[13px] font-medium">Balance after</span>
              <span className="font-bold text-[#36C328] text-[14px]">{request.balanceAfter || 12} days</span>
            </div>
          </div>

          {/* Additional Information */}
          <div>
            <h4 className="text-[13px] font-bold uppercase  mb-4">
              ADDITIONAL INFORMATION
            </h4>
            <div className="mb-4">
              <div className="flex items-center gap-2">
                <span className="text-primary">
                  <User size={16} />
                </span>
                <span className="text-[14px] font-normal text-muted">Covering staff member</span>
              </div>
              <p className="text-[14px] font-medium">{request.coveringStaff || "Bob Smith"}</p>
            </div>

            <div className="bg-[#FBFBFB] rounded-xl p-2 mb-2">
              <p className="text-[12px] font-semibold">Notes</p>
              <p className="text-[13px] font-normal">{request.notes || "No notes provided"}</p>
            </div>

            <div className="bg-[#FBFBFB] rounded-xl p-2">
              <p className="text-[12px] font-semibold">Attachments</p>
              <div className="flex items-center gap-2 text-[14px] font-normal mt-1">
                <FileText size={15} className="text-[#38BDF8]" />
                <span>{request.attachment || "medical-certificate.pdf"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Footer */}
        <div className="flex flex-wrap items-center justify-end gap-3 pt-5 border-t mt-8">
          <button
            type="button"
            onClick={() => {
              if (onApprove) onApprove(request.id);
              onClose();
            }}
            className="flex items-center gap-2 px-6 py-2.5 bg-[#24A148] hover:bg-green-700 text-white text-[14px] font-bold rounded-full transition-all cursor-pointer"
          >
            <Check size={16} strokeWidth={3} className="text-white" />
            <span>Approve request</span>
          </button>
          <button
            type="button"
            onClick={() => {
              onClose();
              if (onRejectClick) onRejectClick(request);
            }}
            className="flex items-center gap-2 px-6 py-2.5 bg-[#FF1100] hover:bg-red-600 text-white text-[14px] font-bold rounded-full transition-all cursor-pointer"
          >
            <X size={16} strokeWidth={3} className="text-white" />
            <span>Reject request</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 bg-[#FAFAFA] hover:bg-slate-100 border text-[14px] font-bold text-slate-700 rounded-full transition-all cursor-pointer"
          >
            Back to leave requests
          </button>
        </div>
      </div>
    </Modal>
  );
}
