import { Modal } from "@/components/ui/Modal";
import { Trash2 } from "lucide-react";

interface DeleteUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  userName?: string;
}

export function DeleteUserModal({
  isOpen,
  onClose,
  onConfirm,
  userName,
}: DeleteUserModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} width="lg">
      {/* Modal Title Header */}
      <div className="flex items-center justify-between border-b pb-3.5 mb-6">
        <h3 className="text-lg font-bold text-slate-900">Delete user</h3>
      </div>

      <div className="space-y-6 text-slate-700">
        {/* Prominent Red Trash Icon */}
        <div className="h-14 w-14 rounded-2xl bg-[#FFF6F5] border border-red-100 flex items-center justify-center text-[#FF1100] shadow-2xs">
          <Trash2 size={32} strokeWidth={2.5} className="text-[#FF1100]" />
        </div>

        {/* Warning Message */}
        <p className="text-[15px] leading-relaxed text-slate-600 font-medium pr-4">
          This action cannot be undone. The user
          {userName ? (
            <span className="font-bold text-slate-900"> ({userName}) </span>
          ) : (
            " "
          )}
          will be permanently deleted from the system.
        </p>

        {/* Action Footer */}
        <div className="flex items-center justify-end gap-3 pt-5 border-t mt-8">
          <button
            type="button"
            onClick={() => {
              if (onConfirm) onConfirm();
              onClose();
            }}
            className="px-7 py-2.5 bg-[#FF1100] hover:bg-[#D90F00] text-white text-[14px] font-bold rounded-full transition-all cursor-pointer shadow-xs"
          >
            Yes, delete user
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 bg-[#FBFBFB] hover:bg-slate-100 border text-slate-800 text-[14px] font-bold rounded-full transition-all cursor-pointer"
          >
            No, cancel
          </button>
        </div>
      </div>
    </Modal>
  );
}
