import { useEffect, useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Check, KeyRound } from "lucide-react";
import type { PlatformUser } from "./types";

interface ResetPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: PlatformUser | null;
}

export function ResetPasswordModal({
  isOpen,
  onClose,
  user,
}: ResetPasswordModalProps) {
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setSent(false);
    }
  }, [isOpen]);

  if (!user) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} width="md" height="lg">
      <div className="px-2 pb-1">
        {/* Header */}
        <div className="pb-3 border-b border-slate-100">
          <h2 className="text-[15px] font-bold text-slate-800">
            Reset password
          </h2>
        </div>

        {!sent ? (
          <>
            <div className="pt-5 pb-4 space-y-4">
              <div className="h-9 w-9 rounded-lg bg-[#22C55E] text-white flex items-center justify-center">
                <KeyRound size={18} strokeWidth={2.4} />
              </div>

              <p className="text-[13.5px] text-slate-600">
                Send a password reset link to{" "}
                <span className="font-bold text-slate-800">{user.email}</span>?
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3">
              <button
                type="button"
                onClick={() => setSent(true)}
                className="rounded-full bg-[#37AADF] hover:bg-[#2F99CA] text-white px-6 py-2.5 text-[13px] font-semibold transition-colors cursor-pointer"
              >
                Send reset link
              </button>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full bg-[#F4F6F9] hover:bg-slate-200/70 text-slate-700 px-6 py-2.5 text-[13px] font-semibold transition-colors cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="pt-5 pb-4 space-y-3">
              <div className="h-10 w-10 rounded-full bg-[#22C55E] text-white flex items-center justify-center">
                <Check size={20} strokeWidth={2.8} />
              </div>

              <div>
                <h3 className="text-[15px] font-bold text-slate-800">
                  Password reset link sent
                </h3>
                <p className="text-[13px] text-slate-400 mt-1">
                  An email was sent to {user.email}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end pt-3">
              <button
                type="button"
                onClick={onClose}
                className="rounded-full bg-[#37AADF] hover:bg-[#2F99CA] text-white px-7 py-2.5 text-[13px] font-semibold transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
}

