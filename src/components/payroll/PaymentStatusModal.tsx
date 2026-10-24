import { Modal } from "@/components/ui/Modal";
import { Check } from "lucide-react";

interface PaymentStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PaymentStatusModal({ isOpen, onClose }: PaymentStatusModalProps) {
  const steps = [
    { label: "Approved", date: "25 May, 2026", active: true },
    { label: "Submitted", date: "26 May, 2026", active: true },
    { label: "Processing", date: "27 May, 2026", active: true },
    { label: "Paid", date: "30 May, 2026", active: true },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} width="xl">
      <div className="pb-4 mb-4 border-b border-slate-100 flex items-center justify-between">
        <h3 className="text-[16px] font-bold text-slate-800">Payment status</h3>
      </div>

      <div className="py-4">
        {/* Horizontal Stepper */}
        <div className="relative flex items-center justify-between mb-10 mt-2 px-4">
          <div className="absolute top-3 left-8 right-8 h-0.5 bg-[#32C832] z-0" />
          {steps.map((step, idx) => (
            <div key={idx} className="relative z-10 flex flex-col items-center gap-2">
              <div className="h-6 w-6 rounded-full bg-[#32C832] flex items-center justify-center border-2 border-white">
                <Check size={12} className="text-white" strokeWidth={4} />
              </div>
              <div className="text-center absolute top-8 w-24">
                <p className="text-[13px] font-bold text-slate-800">{step.label}</p>
                <p className="text-[11px] text-slate-500">{step.date}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-slate-100 pt-6">
          <h4 className="text-[14px] font-bold text-slate-800 mb-4">Payment details</h4>
          <div className="space-y-4">
            <div className="flex justify-between items-center text-[13px]">
              <span className="text-slate-500">BACs reference</span>
              <span className="font-semibold text-slate-800 text-[15px]">1234567890</span>
            </div>
            <div className="flex justify-between items-center text-[13px]">
              <span className="text-slate-500">Submitted by</span>
              <span className="font-semibold text-slate-800 text-[15px]">John Doe</span>
            </div>
            <div className="flex justify-between items-center text-[13px]">
              <span className="text-slate-500">Submitted on</span>
              <span className="font-semibold text-slate-800 text-[15px]">26 May, 2026 . 10:30 AM</span>
            </div>
            <div className="flex justify-between items-center text-[13px]">
              <span className="text-slate-500">Estimated settlement</span>
              <span className="font-semibold text-slate-800 text-[15px]">30 May, 2026</span>
            </div>
            <div className="flex justify-between items-center text-[13px]">
              <span className="text-slate-500">Total amount</span>
              <span className="font-semibold text-slate-800 text-[15px]">£52,430.000</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-6 mt-4 border-t border-slate-100 bg-white mx-[-24px] px-6 pb-2">
        <button
          className="px-6 py-2.5 bg-[#38BDF8] hover:bg-[#2BA5DF] text-white text-[14px] font-bold rounded-full transition-all cursor-pointer"
        >
          View payment details
        </button>
        <button
          onClick={onClose}
          className="px-6 py-2.5 bg-[#FAFAFA] hover:bg-slate-100 text-[14px] font-bold text-slate-700 rounded-full transition-all cursor-pointer"
        >
          Close
        </button>
      </div>
    </Modal>
  );
}
