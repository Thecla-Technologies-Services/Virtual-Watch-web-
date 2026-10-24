import { Modal } from "@/components/ui/Modal";
import { Check, ChevronRight } from "lucide-react";

interface PaymentSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

export function PaymentSuccessModal({ isOpen, onClose, onSubmit }: PaymentSuccessModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} width="lg">
      <div className="pb-4 mb-4 border-b border-slate-100 flex items-center justify-between">
        <h3 className="text-[16px] font-bold text-slate-800">Payment approved successfully</h3>
      </div>

      <div className="py-2">
        <div className="h-10 w-10 bg-[#32C832] rounded-full flex items-center justify-center mb-5">
          <Check size={24} className="text-white" strokeWidth={3} />
        </div>

        <p className="text-[14px] text-slate-600 mb-6 border-b border-slate-100 pb-5">
          BACs file has been generated.
        </p>

        <div className="space-y-4 mb-6">
          <div className="flex justify-between items-center text-[13px]">
            <span className="text-slate-500">Payroll ID</span>
            <span className="font-bold text-slate-800 text-[15px]">PR-0008</span>
          </div>
          <div className="flex justify-between items-center text-[13px]">
            <span className="text-slate-500">Pay period</span>
            <span className="font-bold text-slate-800 text-[15px]">01 May, 2026 - 31 May, 2026</span>
          </div>
          <div className="flex justify-between items-center text-[13px]">
            <span className="text-slate-500">Pay date</span>
            <span className="font-bold text-slate-800 text-[15px]">30 May, 2026</span>
          </div>
          <div className="flex justify-between items-center text-[13px]">
            <span className="text-slate-500">Total payments</span>
            <span className="font-bold text-slate-800 text-[15px]">25</span>
          </div>
          <div className="flex justify-between items-center text-[13px]">
            <span className="text-slate-500">Total amount</span>
            <span className="font-bold text-slate-800 text-[15px]">£52,430.000</span>
          </div>
        </div>

        <div className="flex justify-center border-t border-slate-100 pt-5">
          <button className="flex items-center gap-1 text-[#38BDF8] text-[14px] font-bold hover:underline cursor-pointer">
            View payroll summary <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div className="flex justify-center gap-3 pt-6 mt-2 border-t border-slate-100 bg-white mx-[-24px] px-6 pb-2">
        <button
          onClick={onSubmit}
          className="px-6 py-2.5 bg-[#38BDF8] hover:bg-[#2BA5DF] text-white text-[14px] font-bold rounded-full transition-all cursor-pointer flex-1"
        >
          Mark as submitted
        </button>
        <button
          className="px-6 py-2.5 bg-[#FAFAFA] hover:bg-slate-100 text-[14px] font-bold text-slate-700 rounded-full transition-all cursor-pointer flex-1"
        >
          Download BACs file (.txt)
        </button>
      </div>
    </Modal>
  );
}
