import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Check,
  MessageSquare,
  MoreVertical,
  Plus,
  Search,
} from "lucide-react";
import { Dropdown, DropdownItem } from "@/components/ui/Dropdown";
import { SupportMetrics } from "../support/SupportMetrics";
import { ViewTicketPanel } from "../support/ViewTicketPanel";
import {
  INITIAL_TICKETS,
  type SupportTicket,
  type TicketPriority,
  type TicketStatus,
} from "../support/types";

interface SupportTabProps {
  companyName: string;
}

type TabFilter = "All" | "Bug" | "Support" | "Features";

const TABS: TabFilter[] = ["All", "Bug", "Support", "Features"];

const PRIORITY_DOT: Record<TicketPriority, string> = {
  High: "bg-[#EF4444]",
  Medium: "bg-[#F59E0B]",
  Low: "bg-[#37AADF]",
};

const STATUS_DOT: Record<TicketStatus, string> = {
  Open: "bg-[#37AADF]",
  "In-progress": "bg-[#F59E0B]",
  Assigned: "bg-[#F59E0B]",
  "Waiting for customer": "bg-[#A855F7]",
  Critical: "bg-[#EF4444]",
  Resolved: "bg-[#22C55E]",
  Closed: "bg-[#94A3B8]",
};

export function SupportTab({ companyName }: SupportTabProps) {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState<SupportTicket[]>(() =>
    INITIAL_TICKETS.map((t) => ({ ...t, company: companyName }))
  );
  const [activeTab, setActiveTab] = useState<TabFilter>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [viewingTicketId, setViewingTicketId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return tickets.filter((t) => {
      if (activeTab !== "All" && t.type !== activeTab) return false;
      if (q) {
        const hay = `${t.ticketCode} ${t.module} ${t.subject} ${t.status}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [tickets, activeTab, searchQuery]);

  const viewingTicket = useMemo(
    () => tickets.find((t) => t.id === viewingTicketId) ?? null,
    [tickets, viewingTicketId]
  );

  if (viewingTicket) {
    return (
      <ViewTicketPanel
        ticket={viewingTicket}
        onBack={() => setViewingTicketId(null)}
        onUpdateTicket={(updated) =>
          setTickets((prev) =>
            prev.map((t) => (t.id === updated.id ? updated : t))
          )
        }
      />
    );
  }

  const allSelected =
    filtered.length > 0 && filtered.every((t) => selectedIds.includes(t.id));

  return (
    <div className="space-y-5">
      <SupportMetrics />

      <div className="bg-white rounded-2xl p-6 border border-slate-100/80 ">
        <div className="flex items-center gap-1 border-b border-slate-100 pb-4 mb-5">
          {TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-[13px] font-medium transition-colors cursor-pointer ${
                activeTab === tab
                  ? "bg-[#F4F6F9] text-[#2E3A59] font-semibold"
                  : "text-slate-500 hover:text-[#2E3A59]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
          <div className="relative flex-1 max-w-xs">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="w-full h-10 pl-10 pr-4 rounded-full bg-[#F4F6F9] text-[13px] text-[#2E3A59] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#37AADF]/30"
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate("/portal-owner/messages")}
              className="h-10 px-4 rounded-full bg-[#F4F6F9] hover:bg-slate-200/70 text-[#2E3A59] text-[13px] font-medium inline-flex items-center gap-2 transition-colors cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 text-slate-500" />
              <span>Live chat</span>
            </button>

            <button
              type="button"
              onClick={() => navigate("/portal-owner/support")}
              className="h-10 px-4 rounded-full bg-[#37AADF] hover:bg-[#2F99CA] text-white text-[13px] font-medium inline-flex items-center gap-2 transition-colors cursor-pointer"
            >
              <span className="w-4 h-4 rounded-full bg-white/25 flex items-center justify-center">
                <Plus className="w-3 h-3 text-white" />
              </span>
              <span>New ticket</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-[12px] font-semibold text-[#2E3A59]">
                <th className="py-3.5 pl-3 pr-2 w-10">
                  <button
                    type="button"
                    onClick={() =>
                      setSelectedIds(
                        allSelected ? [] : filtered.map((t) => t.id)
                      )
                    }
                    aria-label="Select all tickets"
                    className={`w-4 h-4 rounded flex items-center justify-center border ${
                      allSelected
                        ? "bg-[#37AADF] border-[#37AADF] text-white"
                        : "border-slate-300 bg-white"
                    }`}
                  >
                    {allSelected && <Check className="w-3 h-3" />}
                  </button>
                </th>
                <th className="py-3.5 px-3">Ticket</th>
                <th className="py-3.5 px-3">Module</th>
                <th className="py-3.5 px-3">Subject</th>
                <th className="py-3.5 px-3">Type</th>
                <th className="py-3.5 px-3">Priority</th>
                <th className="py-3.5 px-3">Status</th>
                <th className="py-3.5 px-3">Created</th>
                <th className="py-3.5 pl-2 pr-3 w-12 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-[13px] text-[#2E3A59]">
              {filtered.map((t) => {
                const isSelected = selectedIds.includes(t.id);
                return (
                  <tr
                    key={t.id}
                    className="hover:bg-slate-50/70 transition-colors"
                  >
                    <td className="py-3.5 pl-3 pr-2">
                      <button
                        type="button"
                        onClick={() =>
                          setSelectedIds((prev) =>
                            prev.includes(t.id)
                              ? prev.filter((id) => id !== t.id)
                              : [...prev, t.id]
                          )
                        }
                        aria-label={`Select ${t.ticketCode}`}
                        className={`w-4 h-4 rounded flex items-center justify-center border ${
                          isSelected
                            ? "bg-[#37AADF] border-[#37AADF] text-white"
                            : "border-slate-300 bg-white"
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3" />}
                      </button>
                    </td>
                    <td className="py-3.5 px-3 font-medium whitespace-nowrap">
                      {t.ticketCode}
                    </td>
                    <td className="py-3.5 px-3 text-slate-600 whitespace-nowrap">
                      {t.module}
                    </td>
                    <td className="py-3.5 px-3 text-slate-600 max-w-[200px] truncate">
                      {t.subject}
                    </td>
                    <td className="py-3.5 px-3 text-slate-600 whitespace-nowrap">
                      {t.type}
                    </td>
                    <td className="py-3.5 px-3 whitespace-nowrap">
                      <span className="inline-flex items-center gap-2 text-slate-600">
                        <span
                          className={`w-2 h-2 rounded-full ${PRIORITY_DOT[t.priority]}`}
                        />
                        {t.priority}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 whitespace-nowrap">
                      <span className="inline-flex items-center gap-2 text-slate-600">
                        <span
                          className={`w-2 h-2 rounded-full ${STATUS_DOT[t.status]}`}
                        />
                        {t.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-slate-600 whitespace-nowrap">
                      {t.created}
                    </td>
                    <td className="py-3.5 pl-2 pr-3 text-right">
                      <Dropdown
                        align="right"
                        trigger={
                          <span className="w-8 h-8 rounded-full bg-[#F4F6F9] hover:bg-slate-200/70 inline-flex items-center justify-center text-slate-500">
                            <MoreVertical className="w-4 h-4" />
                          </span>
                        }
                      >
                        <DropdownItem onClick={() => setViewingTicketId(t.id)}>
                          View
                        </DropdownItem>
                      </Dropdown>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-5 mt-2 border-t border-slate-100 text-[13px]">
          <p className="text-[#2E3A59] font-medium">
            Showing 1 to {filtered.length} of {filtered.length} entries
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled
              className="px-3.5 py-1.5 rounded-lg bg-[#F4F6F9] text-slate-500 opacity-50 text-[12px] font-medium"
            >
              Next
            </button>
            <button
              type="button"
              className="w-8 h-8 rounded-lg bg-[#37AADF] text-white text-[12px] font-semibold"
            >
              1
            </button>
            <button
              type="button"
              disabled
              className="px-3.5 py-1.5 rounded-lg bg-[#F4F6F9] text-slate-500 opacity-50 text-[12px] font-medium"
            >
              Previous
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

