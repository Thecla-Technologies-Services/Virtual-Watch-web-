import React, { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { X } from "lucide-react";

interface RejectHolidayModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: (reason: string) => void;
}

export function RejectHolidayModal({ isOpen, onClose, onConfirm }: RejectHolidayModalProps) {
  const [reason, setReason] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onConfirm) {
      onConfirm(reason);
    }
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} width="xl">
      <div className="flex items-center justify-between border-b pb-3 mb-4">
        <h3 className="text-base font-bold">Reject request</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-[13px] font-medium mb-1.5">Reason</label>
          <textarea
            rows={5}
            placeholder="e.g Morning care for Mr. Smith"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full p-4 bg-white border rounded-2xl text-[14px] focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all placeholder:text-slate-400 resize-none"
            required
          ></textarea>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t mt-6">
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-2.5 bg-[#FF1100] hover:bg-red-600 text-white text-[14px] font-bold rounded-full transition-all cursor-pointer"
          >
            <X size={16} strokeWidth={3} className="text-white" />
            <span>Reject request</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 bg-[#FAFAFA] hover:bg-slate-100 border text-[14px] font-bold text-slate-700 rounded-full transition-all cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
}
