import { Modal } from "@/components/ui/Modal";
import { Trash2 } from "lucide-react";

interface DisableUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  onConfirm?: () => void;
}

export function DisableUserModal({ isOpen, onClose, userName, onConfirm }: DisableUserModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} width="lg">
      <div className="pb-4 mb-5 border-b border-slate-100">
        <h3 className="text-base font-bold text-slate-800">Disable account</h3>
      </div>

      <div className="flex flex-col gap-4 py-4">
        {/* Red trash icon */}
        <div className="h-14 w-14 rounded-2xl bg-red-100 flex items-center justify-center">
          <Trash2 size={26} className="text-red-500" strokeWidth={2} />
        </div>

        <div>
          <p className="text-[15px] font-bold text-slate-800 mb-1">
            Disable account for {userName}?
          </p>
          <p className="text-[13px] text-slate-500 font-medium">
            They will lose immediate access to the platform.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 pt-5 mt-2 border-t border-slate-100">
        <button
          onClick={() => { onConfirm?.(); onClose(); }}
          className="px-6 py-2.5 bg-red-500 hover:bg-red-600 text-white text-[14px] font-bold rounded-full transition-all cursor-pointer"
        >
          Yes, disable account
        </button>
        <button
          onClick={onClose}
          className="px-6 py-2.5 bg-[#FAFAFA] hover:bg-slate-100 border border-[#E7E7E7] text-[14px] font-bold text-slate-700 rounded-full transition-all cursor-pointer"
        >
          No, cancel
        </button>
      </div>
    </Modal>
  );
}
