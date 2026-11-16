import { useMemo, useState } from "react";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Search, Plus, Megaphone, CheckCircle2 } from "lucide-react";
import {
  INITIAL_ANNOUNCEMENTS,
  type Announcement,
  type AnnouncementType,
} from "@/components/portal-owner/announcements/types";
import { CreateAnnouncementModal } from "@/components/portal-owner/announcements/CreateAnnouncementModal";
import { AnnouncementDetailsModal } from "@/components/portal-owner/announcements/AnnouncementDetailsModal";

const TYPE_BADGE: Record<AnnouncementType, string> = {
  Feature: "bg-[#EBF7FD] text-[#37AADF]",
  Maintenance: "bg-[#FEF7E6] text-[#F59E0B]",
  Compliance: "bg-[#FEF7E6] text-[#F59E0B]",
};

export default function Announcements() {
  const [announcements, setAnnouncements] = useState<Announcement[]>(
    INITIAL_ANNOUNCEMENTS
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] =
    useState<Announcement | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filteredAnnouncements = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return announcements;
    return announcements.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.type.toLowerCase().includes(q) ||
        a.audience.toLowerCase().includes(q)
    );
  }, [announcements, searchQuery]);

  const handlePublish = (newAnnouncement: Announcement) => {
    setAnnouncements((prev) => [newAnnouncement, ...prev]);
    setIsCreateOpen(false);
    showToast(`Announcement "${newAnnouncement.title}" sent`);
  };

  return (
    <div className="animate-fade-in duration-300 space-y-5 pb-8">
      <Breadcrumb
        pageTitle="ANNOUNCEMENTS"
        subtext="Send notifications and announcements to companies"
        activePage="Announcements"
      />

      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2.5 text-[12.5px] font-semibold text-white shadow-lg">
          <CheckCircle2 size={15} className="text-[#22C55E]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main White Card */}
      <div className="bg-white rounded-2xl p-6  border border-slate-100/80 space-y-5">
        {/* Toolbar */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-[230px]">
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="w-full h-10 rounded-full bg-[#F8FAFC] border border-slate-100 pl-10 pr-4 text-[13px] text-slate-700 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-[#37AADF] focus:ring-2 focus:ring-[#37AADF]/15 transition-all"
            />
          </div>

          <button
            type="button"
            onClick={() => setIsCreateOpen(true)}
            className="inline-flex items-center gap-2 rounded-full bg-[#37AADF] hover:bg-[#2F99CA] px-5 py-2.5 text-[13px] font-semibold text-white transition-colors shadow-xs cursor-pointer self-start sm:self-auto"
          >
            <span className="h-4 w-4 rounded-full bg-white/20 flex items-center justify-center">
              <Plus size={12} strokeWidth={2.5} />
            </span>
            <span>Create announcement</span>
          </button>
        </div>

        {/* Announcements List */}
        <div className="space-y-3">
          {filteredAnnouncements.length === 0 ? (
            <div className="py-10 text-center text-[13px] text-slate-400 font-medium">
              No announcements found.
            </div>
          ) : (
            filteredAnnouncements.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedAnnouncement(item)}
                className="rounded-2xl border border-slate-100 hover:border-slate-200 hover:bg-slate-50/50 px-5 py-4 flex items-center justify-between gap-4 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="h-9 w-9 rounded-xl bg-[#F4F7FA] text-[#37AADF] flex items-center justify-center shrink-0">
                    <Megaphone size={16} />
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <span className="text-[13.5px] font-bold text-slate-800 truncate">
                        {item.title}
                      </span>
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                          TYPE_BADGE[item.type]
                        }`}
                      >
                        {item.type}
                      </span>
                    </div>
                    <p className="text-[12px] text-slate-400 mt-1">
                      Sent {item.sentDate} · {item.recipients} recipients ·{" "}
                      {item.channels}
                    </p>
                  </div>
                </div>

                <span className="text-[12.5px] font-medium text-slate-500 shrink-0 hidden sm:inline">
                  {item.audience}
                </span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modals */}
      <CreateAnnouncementModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onPublish={handlePublish}
      />

      <AnnouncementDetailsModal
        isOpen={Boolean(selectedAnnouncement)}
        onClose={() => setSelectedAnnouncement(null)}
        announcement={selectedAnnouncement}
      />
    </div>
  );
}

