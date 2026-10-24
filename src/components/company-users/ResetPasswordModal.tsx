import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { KeyRound, CheckCircle } from "lucide-react";

interface ResetPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  userEmail: string;
  onConfirm?: () => void;
}

export function ResetPasswordModal({ isOpen, onClose, userEmail, onConfirm }: ResetPasswordModalProps) {
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    onConfirm?.();
    setSent(true);
  };

  const handleDone = () => {
    setSent(false);
    onClose();
  };

  // ── Success state ────────────────────────────────────
  if (sent) {
    return (
      <Modal isOpen={isOpen} onClose={handleDone} width="lg">
        <div className="pb-4 mb-5 border-b border-slate-100">
          <h3 className="text-base font-bold text-slate-800">Reset password</h3>
        </div>

        <div className="flex flex-col gap-4 py-4">
          <CheckCircle size={40} className="text-green-500" strokeWidth={2} />
          <div>
            <p className="text-[15px] font-bold text-slate-800 mb-1">Password reset link sent</p>
            <p className="text-[13px] text-slate-500 font-medium">
              An email was sent to {userEmail}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-5 mt-2 border-t border-slate-100">
          <button
            onClick={handleDone}
            className="px-6 py-2.5 bg-[#38BDF8] hover:bg-[#2BA5DF] text-white text-[14px] font-bold rounded-full transition-all cursor-pointer"
          >
            Done
          </button>
        </div>
      </Modal>
    );
  }

  // ── Confirm state ────────────────────────────────────
  return (
    <Modal isOpen={isOpen} onClose={onClose} width="lg">
      <div className="pb-4 mb-5 border-b border-slate-100">
        <h3 className="text-base font-bold text-slate-800">Reset password</h3>
      </div>

      <div className="flex flex-col gap-4 py-4">
        {/* Green key icon block */}
        <div className="relative w-16 h-14">
          <div className="absolute inset-0 bg-green-500 rounded-2xl flex items-center justify-center">
            <KeyRound size={26} className="text-white" strokeWidth={2.2} />
          </div>
          {/* Circular arrow badge */}
          <div className="absolute -bottom-1.5 -right-1.5 h-6 w-6 rounded-full bg-green-500 border-2 border-white flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" className="h-3 w-3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </div>
        </div>

        <p className="text-[14px] text-slate-600 leading-relaxed">
          Send a password reset link to{" "}
          <span className="font-bold text-slate-800">{userEmail}</span>?
        </p>
      </div>

      <div className="flex items-center justify-end gap-3 pt-5 mt-2 border-t border-slate-100">
        <button
          onClick={handleSend}
          className="px-6 py-2.5 bg-[#38BDF8] hover:bg-[#2BA5DF] text-white text-[14px] font-bold rounded-full transition-all cursor-pointer"
        >
          Send reset link
        </button>
        <button
          onClick={onClose}
          className="px-6 py-2.5 bg-[#FAFAFA] hover hover:bg-slate-100 border border-[#E7E7E7] text-[14px] font-bold text-slate-700 rounded-full transition-all cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
}
