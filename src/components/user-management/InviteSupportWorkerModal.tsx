import React, { useState } from "react";
import { Modal } from "@/components/ui/Modal";

interface InviteSupportWorkerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSendInvitation?: (email: string) => void;
}

export function InviteSupportWorkerModal({
  isOpen,
  onClose,
  onSendInvitation,
}: InviteSupportWorkerModalProps) {
  const [email, setEmail] = useState("");

  const handleSend = () => {
    if (onSendInvitation) {
      onSendInvitation(email || "maria.adeyemi@example.com");
    }
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} width="lg">
      {/* Modal Title Header */}
      <div className="flex items-center justify-between border-b pb-3.5 mb-5">
        <h3 className="text-lg font-bold text-slate-900">
          Invite support worker
        </h3>
      </div>

      <div className="space-y-5 text-slate-800">
        <p className="text-base font-normal text-slate-700 -mt-1">
          Step 1 of 8
        </p>

        {/* Green Notice Banner */}
        <div className="bg-[#36C328] text-white p-3.5 px-4 rounded-xl flex items-center gap-3 text-xs font-medium shadow-sm">
          <div className="bg-white text-[#36C328] p-0.5 rounded flex items-center justify-center shrink-0 font-black text-[11px] w-5 h-5">
            !
          </div>
          <span>
            You're signed in as{" "}
            <strong className="font-extrabold">Sabrina Marsh</strong>, Company
            Admin for <strong className="font-extrabold">MedStar Domiciliary</strong>
          </span>
        </div>

        {/* Email input */}
        <div>
          <label className="block text-[14px] font-medium mb-1.5 text-slate-800">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="e.g maria.adeyemi@example.com"
            className="w-full px-4 py-3 bg-white border rounded-2xl text-[14px] focus:outline-none focus:ring-1 focus:ring-[#38BDF8] focus:border-[#38BDF8] transition-all placeholder:text-slate-400"
          />
          <p className="text-[12px] text-slate-400 mt-2.5 font-medium leading-relaxed">
            Only an email address is needed - they'll complete the rest of their
            profile themselves
          </p>
        </div>

        {/* Action Footer */}
        <div className="flex items-center justify-end gap-3 pt-5 border-t mt-8">
          <button
            type="button"
            onClick={handleSend}
            className="px-7 py-2.5 bg-[#38BDF8] hover:bg-[#2BA5DF] text-white text-[14px] font-bold rounded-full transition-all cursor-pointer shadow-xs"
          >
            Send invitation
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 bg-[#FBFBFB] hover:bg-slate-100 border text-slate-800 text-[14px] font-bold rounded-full transition-all cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
}
