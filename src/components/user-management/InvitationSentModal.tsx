import React from "react";
import { Modal } from "@/components/ui/Modal";
import { Check } from "lucide-react";

interface InvitationSentModalProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
}

export function InvitationSentModal({
  isOpen,
  onClose,
  email,
}: InvitationSentModalProps) {
  const displayEmail = email || "maria.adey@gmail.com";

  return (
    <Modal isOpen={isOpen} onClose={onClose} width="lg">
      {/* Modal Title Header */}
      <div className="flex items-center justify-between border-b pb-3.5 mb-6">
        <h3 className="text-lg font-bold text-slate-900">Invitation sent</h3>
      </div>

      <div className="space-y-6 text-slate-700">
        {/* Green Circular Checkmark */}
        <div className="h-14 w-14 rounded-full bg-[#36C328] text-white flex items-center justify-center shadow-sm">
          <Check size={32} strokeWidth={3.5} />
        </div>

        {/* Confirmation Text */}
        <div className="text-[15px] leading-relaxed text-slate-700 font-medium">
          <p>
            An invitation has been sent to{" "}
            <span className="text-[#38BDF8] font-bold">{displayEmail}</span>
            <br />
            They'll receive an email to join MedStar's workspace.
          </p>
        </div>

        {/* What happens next Box */}
        <div className="bg-[#00B4FC] text-white p-5 rounded-2xl shadow-xs space-y-2">
          <div className="flex items-center gap-2.5 font-bold text-[15px]">
            <div className="bg-white text-[#00B4FC] h-5 w-5 rounded flex items-center justify-center font-black text-xs shrink-0">
              !
            </div>
            <span>What happens next</span>
          </div>
          <p className="text-[13.5px] font-normal text-white/95 leading-relaxed pl-7">
            The worker clicks the link in their email to accept the invitation
            and complete their profile.
          </p>
        </div>

        {/* Action Footer */}
        <div className="flex items-center justify-end pt-5 border-t mt-8">
          <button
            type="button"
            onClick={onClose}
            className="px-8 py-2.5 bg-[#38BDF8] hover:bg-[#2BA5DF] text-white text-[14px] font-bold rounded-full transition-all cursor-pointer shadow-xs"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
}
