import { Modal } from "@/components/ui/Modal";
import { Megaphone } from "lucide-react";

type NotificationCategory = "Subscription" | "Update" | "Maintenance" | "Compliance" | "Feature";

interface NotificationDetail {
  id: string;
  title: string;
  category: NotificationCategory;
  sent: string;
  recipients: number;
  channels: string;
  audience: string;
}

interface NotificationDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  notification: NotificationDetail | null;
}

const CATEGORY_BADGE: Record<NotificationCategory, string> = {
  Feature:      "bg-[#EBF7FD] text-[#38BDF8]",
  Subscription: "bg-purple-50 text-purple-500",
  Update:       "bg-[#EBF7FD] text-[#38BDF8]",
  Maintenance:  "bg-amber-50 text-amber-500",
  Compliance:   "bg-orange-50 text-orange-500",
};

export function NotificationDetailsModal({ isOpen, onClose, notification }: NotificationDetailsModalProps) {
  if (!notification) return null;

  const rows = [
    { label: "Sent",       value: notification.sent },
    { label: "Recipients", value: String(notification.recipients) },
    { label: "Channels",   value: notification.channels },
    { label: "Audience",   value: notification.audience },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} width="lg">
      {/* Header */}
      <div className="pb-4 mb-4 border-b border-slate-100">
        <h3 className="text-base font-bold text-slate-800">Notification details</h3>
      </div>

      {/* Notification title row */}
      <div className="flex items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-[#F3F3F9] flex items-center justify-center shrink-0">
            <Megaphone size={16} className="text-slate-500" />
          </div>
          <p className="text-[14px] font-semibold text-slate-800 leading-snug">{notification.title}</p>
        </div>
        <span className={`shrink-0 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${CATEGORY_BADGE[notification.category]}`}>
          {notification.category}
        </span>
      </div>

      {/* Metadata table */}
      <div className="bg-[#FAFAFA] rounded-2xl overflow-hidden mb-6">
        {rows.map(({ label, value }, i) => (
          <div
            key={label}
            className={`flex items-center justify-between px-4 text-[12px]`}
          >
            <span className="text-[#777777] font-normal">{label}</span>
            <span className="text-[#333448] font-normal">{value}</span>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex justify-end pt-3 border-t border-slate-100">
        <button
          onClick={onClose}
          className="px-6 py-2.5 bg-[#FAFAFA] hover:bg-slate-100 border border-[#E7E7E7] text-[14px] font-bold text-slate-700 rounded-full transition-all cursor-pointer"
        >
          Close
        </button>
      </div>
    </Modal>
  );
}
