import { Modal } from "@/components/ui/Modal";
import { Trash2 } from "lucide-react";
import type { PlatformUser } from "./types";

interface DisableAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: PlatformUser | null;
  onConfirm: (userId: string) => void;
}

export function DisableAccountModal({
  isOpen,
  onClose,
  user,
  onConfirm,
}: DisableAccountModalProps) {
  if (!user) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} width="md" height="lg">
      <div className="px-2 pb-1">
        {/* Header */}
        <div className="pb-3 border-b border-slate-100">
          <h2 className="text-[15px] font-bold text-slate-800">
            Disable account
          </h2>
        </div>

        {/* Body */}
        <div className="pt-5 pb-4 space-y-3">
          <div className="text-[#EF4444]">
            <Trash2 size={32} strokeWidth={2.2} />
          </div>

          <div>
            <h3 className="text-[15px] font-bold text-slate-800">
              Disable account for {user.name}?
            </h3>
            <p className="text-[13px] text-slate-400 mt-1">
              They will lose immediate access to the platform.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 pt-3">
          <button
            type="button"
            onClick={() => onConfirm(user.id)}
            className="rounded-full bg-[#EF4444] hover:bg-red-600 text-white px-6 py-2.5 text-[13px] font-semibold transition-colors cursor-pointer"
          >
            Yes, disable account
          </button>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-[#F4F6F9] hover:bg-slate-200/70 text-slate-700 px-6 py-2.5 text-[13px] font-semibold transition-colors cursor-pointer"
          >
            No, cancel
          </button>
        </div>
      </div>
    </Modal>
  );
}

