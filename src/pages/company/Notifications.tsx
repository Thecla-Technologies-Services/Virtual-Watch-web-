import { useState } from "react";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { NotificationDetailsModal } from "@/components/notifications/NotificationDetailsModal";
import { ChevronRight, CreditCard, Zap, Settings, Shield, MessageSquare } from "lucide-react";

/* ── Types ─────────────────────────────────────────── */
type NotificationCategory = "Subscription" | "Update" | "Maintenance" | "Compliance" | "Feature";
type Tab = "All" | "Unread" | NotificationCategory;

interface Notification {
  id: string;
  title: string;
  time: string;
  description: string;
  category: NotificationCategory;
  isNew: boolean;
  // Detail modal fields
  sent: string;
  recipients: number;
  channels: string;
  audience: string;
}

/* ── Mock data ─────────────────────────────────────── */
const NOTIFICATIONS: Notification[] = [
  {
    id: "1",
    title: "Subscription renews in 14 days",
    time: "2 hours ago",
    description: "Your Enterprise plan renews on July 18, 2024. Ensure your billing details are up to date.",
    category: "Subscription",
    isNew: true,
    sent: "Jul 1, 2024",
    recipients: 203,
    channels: "In-app + Email",
    audience: "All companies",
  },
  {
    id: "2",
    title: "Platform update v3.4.0 released",
    time: "1 day ago",
    description: "New features: advanced analytics export, bulk user import, and improved notification filtering.",
    category: "Update",
    isNew: false,
    sent: "Jul 1, 2024",
    recipients: 203,
    channels: "In-app + Email",
    audience: "All companies",
  },
  {
    id: "3",
    title: "Scheduled maintenance - July 10",
    time: "2 days ago",
    description: "The platform will undergo maintenance from 02:00–04:00 UTC on July 10, 2024. Expect brief downtime.",
    category: "Maintenance",
    isNew: false,
    sent: "Jul 8, 2024",
    recipients: 203,
    channels: "In-app + Email",
    audience: "All companies",
  },
  {
    id: "4",
    title: "Security policy update required",
    time: "5 days ago",
    description: "Your workspace security policy hasn't been reviewed in 90 days. Please review and confirm.",
    category: "Compliance",
    isNew: true,
    sent: "Jun 27, 2024",
    recipients: 1,
    channels: "In-app",
    audience: "Company admins",
  },
  {
    id: "5",
    title: "Live chat feature is now available",
    time: "1 week ago",
    description: "Direct support chat is now enabled for your workspace. Access it from the left navigation.",
    category: "Feature",
    isNew: false,
    sent: "Jun 24, 2024",
    recipients: 203,
    channels: "In-app",
    audience: "All companies",
  },
];

const TABS: Tab[] = ["All", "Unread", "Subscription", "Update", "Maintenance", "Compliance"];

/* ── Icon map ───────────────────────────────────────── */
const CATEGORY_ICON: Record<NotificationCategory, React.ReactNode> = {
  Subscription: <CreditCard size={16} />,
  Update:       <Zap size={16} />,
  Maintenance:  <Settings size={16} />,
  Compliance:   <Shield size={16} />,
  Feature:      <MessageSquare size={16} />,
};

const CATEGORY_ICON_BG: Record<NotificationCategory, string> = {
  Subscription: "bg-purple-100 text-purple-500",
  Update:       "bg-[#EBF7FD] text-[#38BDF8]",
  Maintenance:  "bg-amber-50 text-amber-500",
  Compliance:   "bg-orange-50 text-orange-500",
  Feature:      "bg-[#EBF7FD] text-[#38BDF8]",
};

/* ── Page ──────────────────────────────────────────── */
export default function Notifications() {
  const [activeTab, setActiveTab] = useState<Tab>("All");
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);

  const unreadCount = NOTIFICATIONS.filter((n) => n.isNew).length;

  const filtered = NOTIFICATIONS.filter((n) => {
    if (activeTab === "All")    return true;
    if (activeTab === "Unread") return n.isNew;
    return n.category === activeTab;
  });

  const handleRowClick = (n: Notification) => {
    setSelectedNotification(n);
    setIsDetailOpen(true);
  };

  return (
    <div className="animate-fade-in duration-300 space-y-6">
      <Breadcrumb
        pageTitle="NOTIFICATION CENTRE"
        subtext={`${unreadCount} unread · ${NOTIFICATIONS.length} total`}
        activePage="Notification centre"
      />

      <div className="bg-white rounded-2xl overflow-hidden">
        {/* Tabs */}
        <div className="px-5 pt-4 border-b border-slate-100 flex items-center gap-1 overflow-x-auto no-scrollbar">
          {TABS.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 rounded-t-lg text-[13px] transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? "bg-[#EBF7FD] text-[#38BDF8] font-bold"
                    : "text-slate-400 hover:text-slate-700 font-medium"
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Notification list */}
        <div className="space-y-2 p-4">
          {filtered.length === 0 ? (
            <div className="py-16 text-center text-slate-400 text-[13px] font-medium">
              No notifications in this category.
            </div>
          ) : (
            filtered.map((n) => (
              <button
                key={n.id}
                type="button"
                onClick={() => handleRowClick(n)}
                className="w-full flex items-start gap-4 px-5 py-4 hover:bg-slate-50/60 transition-colors cursor-pointer text-left border rounded-xl border-slate-200"
              >
                {/* Icon */}
                <div className={`h-9 w-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${CATEGORY_ICON_BG[n.category]}`}>
                  {CATEGORY_ICON[n.category]}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                    <span className={`text-[14px] font-semibold text-slate-800 ${n.isNew ? "font-bold" : ""}`}>
                      {n.title}
                    </span>
                    <span className="text-slate-300">·</span>
                    <span className="text-[12px] text-slate-400 font-medium">{n.time}</span>
                    {n.isNew && (
                      <span className="ml-1 px-2 py-0.5 bg-[#EBF7FD] text-[#38BDF8] text-[10px] font-bold rounded-full">
                        New
                      </span>
                    )}
                  </div>
                  <p className="text-[13px] text-slate-500 font-medium leading-relaxed truncate">
                    {n.description}
                  </p>
                </div>

                {/* Chevron */}
                <ChevronRight size={18} className="text-slate-300 shrink-0 mt-1" />
              </button>
            ))
          )}
        </div>
      </div>

      {/* Detail modal */}
      <NotificationDetailsModal
        isOpen={isDetailOpen}
        onClose={() => { setIsDetailOpen(false); setSelectedNotification(null); }}
        notification={selectedNotification}
      />
    </div>
  );
}
