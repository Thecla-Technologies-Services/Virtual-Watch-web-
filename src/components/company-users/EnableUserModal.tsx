import { Modal } from "@/components/ui/Modal";
import { CheckCircle } from "lucide-react";

interface EnableUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  onConfirm?: () => void;
}

export function EnableUserModal({ isOpen, onClose, userName, onConfirm }: EnableUserModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} width="lg">
      <div className="pb-4 mb-5 border-b border-slate-100">
        <h3 className="text-base font-bold text-slate-800">Enable account</h3>
      </div>

      <div className="flex flex-col gap-4 py-4">
        <CheckCircle size={40} className="text-green-500" strokeWidth={2} />
        <p className="text-[14px] text-slate-600 leading-relaxed">
          Re-enable account for{" "}
          <span className="font-bold text-slate-800">{userName}</span>?
        </p>
      </div>

      <div className="flex items-center justify-end gap-3 pt-5 mt-2 border-t border-slate-100">
        <button
          onClick={() => { onConfirm?.(); onClose(); }}
          className="px-6 py-2.5 bg-[#38BDF8] hover:bg-[#2BA5DF] text-white text-[14px] font-bold rounded-full transition-all cursor-pointer"
        >
          Enable
        </button>
        <button
          onClick={onClose}
          className="px-6 py-2.5 bg-[#FAFAFA] hover:bg-slate-100 border border-[#E7E7E7] text-[14px] font-bold text-slate-700 rounded-full transition-all cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
}
