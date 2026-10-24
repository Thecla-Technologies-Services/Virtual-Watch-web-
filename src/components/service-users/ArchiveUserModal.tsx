import { Modal } from "@/components/ui/Modal";
import { AlertTriangle } from "lucide-react";

interface ArchiveUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function ArchiveUserModal({ isOpen, onClose, onConfirm }: ArchiveUserModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} width="sm">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
        <h3 className="text-base font-extrabold text-slate-800">Archive service user</h3>
      </div>
      
      <div className="flex flex-col gap-4 mb-8 mt-2">
        <div className="text-rose-600">
          <AlertTriangle size={36} fill="currentColor" className="text-rose-600" />
        </div>
        <p className="text-sm font-medium text-slate-500 leading-relaxed">
          This service user will be archived and no longer visible in active lists. This action can be reversed.
        </p>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
        <button
          onClick={onClose}
          type="button"
          className="px-5 py-2 bg-slate-50 hover:bg-slate-100 text-slate-600 text-[13px] font-bold rounded-full transition-all cursor-pointer"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          type="button"
          className="px-5 py-2 bg-[#FF1A1A] hover:bg-red-600 text-white text-[13px] font-bold rounded-full transition-all cursor-pointer"
        >
          Archive
        </button>
      </div>
    </Modal>
  );
}
