import { Modal } from "@/components/ui/Modal";
import { Check } from "lucide-react";

interface ApprovePayrollModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function ApprovePayrollModal({ isOpen, onClose, onConfirm }: ApprovePayrollModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} width="lg">
      <div className="pb-4 mb-4 border-b border-slate-100 flex items-center justify-between">
        <h3 className="text-[16px] font-bold text-slate-800">Approve payroll run</h3>
      </div>

      <div className="py-2">
        <div className="h-10 w-10 bg-[#32C832] rounded-full flex items-center justify-center mb-5">
          <Check size={24} className="text-white" strokeWidth={3} />
        </div>

        <p className="text-[14px] text-slate-600 mb-6 leading-relaxed">
          You're about to approve payroll run for May 2026. This action can not be undone
        </p>

        <div className="border-t border-slate-100 pt-5 space-y-4">
          <div className="flex justify-between items-center text-[13px]">
            <span className="text-slate-500">Total employees</span>
            <span className="font-bold text-slate-800 text-[15px]">25</span>
          </div>
          <div className="flex justify-between items-center text-[13px]">
            <span className="text-slate-500">Total net pay</span>
            <span className="font-bold text-slate-800 text-[15px]">£52,430.000</span>
          </div>
          <div className="flex justify-between items-center text-[13px]">
            <span className="text-slate-500">Payroll generated for May 2026</span>
            <span className="font-bold text-slate-800 text-[15px]">30 May, 2026</span>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-6 mt-2 border-t border-slate-100 bg-white mx-[-24px] px-6 pb-2">
        <button
          onClick={onConfirm}
          className="px-6 py-2.5 bg-[#32C832] hover:bg-[#2DB42D] text-white text-[14px] font-bold rounded-full transition-all cursor-pointer"
        >
          Approve and generate file
        </button>
        <button
          onClick={onClose}
          className="px-6 py-2.5 bg-[#FAFAFA] hover:bg-slate-100 text-[14px] font-bold text-slate-700 rounded-full transition-all cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
}
