import { Modal } from "@/components/ui/Modal";
import { CheckCircle2 } from "lucide-react";
import type { Appointment } from "@/constants/appointments";

interface AppointmentSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddAnother?: () => void;
  appointment?: Partial<Appointment> | null;
}

export function AppointmentSuccessModal({
  isOpen,
  onClose,
  onAddAnother,
  appointment,
}: AppointmentSuccessModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} width="lg">
      {/* Modal Title Header */}
      <div className="flex items-center justify-between border-b pb-3.5 mb-6">
        <h3 className="text-base font-bold">Appointment scheduled!</h3>
      </div>

      <div className="space-y-6">
        {/* Prominent Green Circular Checkmark */}
        <div className="flex items-center">
          <CheckCircle2 size={58} className="fill-[#36C328] text-white" />
        </div>

        {/* Confirmation Description */}
        <p className="text-[14px] text-muted font-normal leading-relaxed">
          All support workers have been notified. The appointment will appear on
          their mobile dashboards immediately.
        </p>

        <hr className="border-t my-4" />

        {/* Summary Details List */}
        <div className="space-y-3.5 text-[14.5px]">
          <div className="flex items-center justify-between gap-4">
            <span className="text-muted text-[13px] font-normal">Appointment type</span>
            <span className="font-semibold text-[14px]">
              {appointment?.type || "GP Appointment"}
            </span>
          </div>

          <div className="flex items-center justify-between gap-4">
            <span className="text-muted text-[13px] font-normal">Service user</span>
            <span className="font-semibold text-[14px]">
              {appointment?.serviceUser || "SU-002 – James Okafor"}
            </span>
          </div>

          <div className="flex items-center justify-between gap-4">
            <span className="text-muted text-[13px] font-normal">Doctor / Visitor</span>
            <span className="font-semibold text-[14px]">
              {appointment?.doctorVisitor || "Dr. Smith"}
            </span>
          </div>

          <div className="flex items-center justify-between gap-4">
            <span className="text-muted text-[13px] font-normal">Date</span>
            <span className="font-semibold text-[14px]">
              {appointment?.date || "2026-05-07"}
            </span>
          </div>

          <div className="flex items-center justify-between gap-4">
            <span className="text-muted text-[13px] font-normal">Time</span>
            <span className="font-semibold text-[14px]">
              {appointment?.time || "20:22"}
            </span>
          </div>

          <div className="flex items-center justify-between gap-4">
            <span className="text-muted text-[13px] font-normal">Email confirmation</span>
            <span className="font-semibold text-[14px]">
              {appointment?.notificationEmail || "thecleezenwa@gmail.com"}
            </span>
          </div>

          <div className="flex items-center justify-between gap-4">
            <span className="text-muted text-[13px] font-normal">Workers notified</span>
            <span className="font-semibold text-[14px]">All active support workers</span>
          </div>
        </div>

        {/* Action Footer */}
        <div className="flex items-center justify-end gap-3.5 pt-5 border-t mt-8">
          <button
            type="button"
            onClick={() => {
              onClose();
              if (onAddAnother) onAddAnother();
            }}
            className="px-7 py-2.5 bg-[#38BDF8] hover:bg-[#2BA5DF] text-white text-[14px] font-semibold rounded-full transition-all cursor-pointer shadow-xs"
          >
            Add another
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-7 py-2.5 bg-[#F9F9F9] hover:bg-slate-100 border text-[14px] font-semibold rounded-full transition-all cursor-pointer"
          >
            View all
          </button>
        </div>
      </div>
    </Modal>
  );
}
