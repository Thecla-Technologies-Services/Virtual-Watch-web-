import { Modal } from "@/components/ui/Modal";
import { Megaphone } from "lucide-react";
import type { Announcement, AnnouncementType } from "./types";

interface AnnouncementDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  announcement: Announcement | null;
}

const TYPE_BADGE: Record<AnnouncementType, string> = {
  Feature: "bg-[#EBF7FD] text-[#37AADF]",
  Maintenance: "bg-[#FEF7E6] text-[#F59E0B]",
  Compliance: "bg-[#FEF7E6] text-[#F59E0B]",
};

export function AnnouncementDetailsModal({
  isOpen,
  onClose,
  announcement,
}: AnnouncementDetailsModalProps) {
  if (!announcement) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} width="lg" height="3xl">
      <div className="flex flex-col h-full max-h-[84vh] px-2 pb-1">
        {/* Header */}
        <div className="pb-3 border-b border-slate-100 shrink-0">
          <h2 className="text-[15px] font-bold text-slate-800">
            Announcement details
          </h2>
        </div>

        <div className="flex-1 overflow-y-auto pt-4 pb-2 space-y-4">
          {/* Preview Card */}
          <div className="rounded-2xl border border-slate-100 p-5 space-y-3">
            <div className="flex items-start gap-3">
              <div className="h-8 w-8 rounded-lg bg-[#F4F7FA] text-slate-500 flex items-center justify-center shrink-0">
                <Megaphone size={15} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-[14px] font-bold text-slate-800">
                    {announcement.title}
                  </h3>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                      TYPE_BADGE[announcement.type]
                    }`}
                  >
                    {announcement.type}
                  </span>
                </div>
                <p className="text-[13px] text-slate-600 mt-1.5 leading-relaxed">
                  {announcement.message}
                </p>
                <p className="text-[11.5px] text-slate-400 mt-2">
                  {announcement.sentDate} · Nexus platform
                </p>
              </div>
            </div>

            {announcement.attachmentUrl && (
              <div className="pt-2">
                <img
                  src={announcement.attachmentUrl}
                  alt={announcement.title}
                  className="w-full max-h-72 object-cover rounded-2xl border border-slate-100"
                />
              </div>
            )}
          </div>

          {/* Metadata Summary */}
          <div className="rounded-2xl bg-[#F8FAFC] p-4 space-y-2.5 text-[12.5px]">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Sent</span>
              <span className="font-medium text-slate-700">
                {announcement.sentDate}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Recipients</span>
              <span className="font-medium text-slate-700">
                {announcement.recipients}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Channels</span>
              <span className="font-medium text-slate-700">
                {announcement.channels}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Audience</span>
              <span className="font-medium text-slate-700">
                {announcement.audience}
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end pt-3 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-[#F4F6F9] hover:bg-slate-200/70 text-slate-700 px-6 py-2.5 text-[13px] font-semibold transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
}

