import { Modal } from "@/components/ui/Modal";
import { Activity } from "lucide-react";

interface ActivityEntry {
  id: string;
  action: string;
  detail: string;
  time: string;
  ip: string;
}

interface UserActivityModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  activities?: ActivityEntry[];
}

const DEFAULT_ACTIVITIES: ActivityEntry[] = [
  { id: "1", action: "Login",           detail: "Chrome 125 / macOS 14",  time: "2 hours ago", ip: "102.88.3.21" },
  { id: "2", action: "Export report",   detail: "Q2 Analytics - PDF",      time: "1 day ago",   ip: "102.88.3.21" },
  { id: "3", action: "Login",           detail: "Chrome 125 / macOS 14",  time: "1 day ago",   ip: "102.88.3.21" },
  { id: "4", action: "Updated profile", detail: "Changed phone number",    time: "3 days ago",  ip: "102.88.3.21" },
  { id: "5", action: "Login",           detail: "Safari 17 / iPhone",     time: "5 days ago",  ip: "102.88.3.21" },
];

export function UserActivityModal({ isOpen, onClose, userName, activities = DEFAULT_ACTIVITIES }: UserActivityModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} width="lg" height="xl">
      <div className="pb-4 mb-2 border-b border-slate-100 shrink-0">
        <h3 className="text-base font-bold text-slate-800">Activity - {userName}</h3>
      </div>

      <div className="divide-y divide-slate-100">
        {activities.map((entry) => (
          <div key={entry.id} className="flex items-start gap-4 py-4">
            {/* Icon */}
            <div className="h-9 w-9 rounded-xl bg-[#EBF7FD] flex items-center justify-center shrink-0 mt-0.5">
              <Activity size={16} className="text-[#38BDF8]" />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <p className="text-[14px] font-semibold text-slate-800 leading-snug">{entry.action}</p>
              <p className="text-[12px] text-slate-400 font-medium mt-0.5">{entry.detail}</p>
            </div>

            {/* Time + IP */}
            <div className="text-right shrink-0">
              <p className="text-[13px] text-slate-500 font-medium">{entry.time}</p>
              <p className="text-[12px] text-slate-400 font-medium mt-0.5">{entry.ip}</p>
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );
}
