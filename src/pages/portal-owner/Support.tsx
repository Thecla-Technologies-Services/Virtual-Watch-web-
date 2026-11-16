import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Check,
  Filter,
  MessageSquare,
  MoreVertical,
  Plus,
  Search,
} from "lucide-react";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Dropdown, DropdownItem } from "@/components/ui/Dropdown";
import { SupportMetrics } from "@/components/portal-owner/support/SupportMetrics";
import { AssignTicketModal } from "@/components/portal-owner/support/AssignTicketModal";
import {
  FilterTicketsModal,
  type TicketFilters,
} from "@/components/portal-owner/support/FilterTicketsModal";
import { ViewTicketPanel } from "@/components/portal-owner/support/ViewTicketPanel";
import {
  INITIAL_TICKETS,
  type SupportTicket,
  type TicketPriority,
  type TicketStatus,
} from "@/components/portal-owner/support/types";

type TicketTab = "All" | "Bug" | "Support" | "Features";

const TABS: TicketTab[] = ["All", "Bug", "Support", "Features"];

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

const PAGE_SIZE = 9;

export default function Support() {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState<SupportTicket[]>(INITIAL_TICKETS);
  const [activeTab, setActiveTab] = useState<TicketTab>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [isAssignOpen, setIsAssignOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<TicketFilters>({
    company: "All",
    admin: "All",
    status: "All",
  });

  const [viewingTicketId, setViewingTicketId] = useState<string | null>(null);

  const companies = useMemo(() => {
    const unique = new Set(tickets.map((t) => t.company));
    return Array.from(unique);
  }, [tickets]);

  const filteredTickets = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return tickets.filter((ticket) => {
      if (activeTab !== "All") {
        const normalizedType = String(ticket.type).toLowerCase();
        const normalizedTab = activeTab.toLowerCase();
        if (
          normalizedType !== normalizedTab &&
          !(normalizedTab === "features" && normalizedType === "feature")
        ) {
          return false;
        }
      }

      if (filters.company !== "All" && ticket.company !== filters.company) {
        return false;
      }
      if (filters.admin !== "All" && ticket.assignee !== filters.admin) {
        return false;
      }
      if (filters.status !== "All" && ticket.status !== filters.status) {
        return false;
      }

      if (q) {
        const hay = `${ticket.ticketCode} ${ticket.module} ${ticket.subject} ${ticket.company} ${ticket.type} ${ticket.status}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }

      return true;
    });
  }, [tickets, activeTab, filters, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredTickets.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const paginatedTickets = useMemo(() => {
    const start = (safePage - 1) * PAGE_SIZE;
    return filteredTickets.slice(start, start + PAGE_SIZE);
  }, [filteredTickets, safePage]);

  const allVisibleSelected =
    paginatedTickets.length > 0 &&
    paginatedTickets.every((t) => selectedIds.includes(t.id));

  const toggleSelectAll = () => {
    if (allVisibleSelected) {
      const visibleSet = new Set(paginatedTickets.map((t) => t.id));
      setSelectedIds((prev) => prev.filter((id) => !visibleSet.has(id)));
    } else {
      const merged = new Set([
        ...selectedIds,
        ...paginatedTickets.map((t) => t.id),
      ]);
      setSelectedIds(Array.from(merged));
    }
  };

  const toggleSelectOne = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleAssign = (assignee: string) => {
    const targetIds =
      selectedIds.length > 0
        ? new Set(selectedIds)
        : new Set(paginatedTickets[0] ? [paginatedTickets[0].id] : []);

    setTickets((prev) =>
      prev.map((ticket) =>
        targetIds.has(ticket.id)
          ? {
              ...ticket,
              assignee,
              status:
                assignee === "Unassigned"
                  ? "Open"
                  : ticket.status === "Open"
                    ? "In-progress"
                    : ticket.status,
            }
          : ticket
      )
    );
    setSelectedIds([]);
  };

  const handleUpdateTicket = (updated: SupportTicket) => {
    setTickets((prev) =>
      prev.map((ticket) => (ticket.id === updated.id ? updated : ticket))
    );
  };

  const viewingTicket = useMemo(
    () => tickets.find((t) => t.id === viewingTicketId) ?? null,
    [tickets, viewingTicketId]
  );

  if (viewingTicket) {
    return (
      <ViewTicketPanel
        ticket={viewingTicket}
        onBack={() => setViewingTicketId(null)}
        onUpdateTicket={handleUpdateTicket}
      />
    );
  }

  const startEntry =
    filteredTickets.length === 0 ? 0 : (safePage - 1) * PAGE_SIZE + 1;
  const endEntry = Math.min(safePage * PAGE_SIZE, filteredTickets.length);

  return (
    <div className="space-y-6">
      <Breadcrumb
        pageTitle="SUPPORT TICKETS"
        subtext="Manage all incoming customer requests"
        activePage="Support tickets"
      />

      <SupportMetrics />

      <div className="bg-white rounded-2xl p-6  border border-slate-100/80">
        {/* Tabs */}
        <div className="flex items-center gap-1 border-b border-slate-100 pb-4 mb-5">
          {TABS.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => {
                  setActiveTab(tab);
                  setCurrentPage(1);
                }}
                className={`px-4 py-2 rounded-lg text-[13px] font-medium transition-colors ${
                  isActive
                    ? "bg-[#F4F6F9] text-[#2E3A59] font-semibold"
                    : "text-slate-500 hover:text-[#2E3A59] hover:bg-slate-50"
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
          <div className="flex items-center gap-3 flex-1 max-w-md">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search..."
                className="w-full h-10 pl-10 pr-4 rounded-full bg-[#F4F6F9] text-[13px] text-[#2E3A59] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#37AADF]/30"
              />
            </div>

            <button
              type="button"
              onClick={() => setIsFilterOpen(true)}
              aria-label="Filter tickets"
              className="w-10 h-10 rounded-full bg-[#37AADF] hover:bg-[#2F99CA] text-white flex items-center justify-center shrink-0 transition-colors cursor-pointer"
            >
              <Filter className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate("/portal-owner/messages")}
              className="h-10 px-4 rounded-full bg-[#F4F6F9] hover:bg-slate-200/70 text-[#2E3A59] text-[13px] font-medium flex items-center gap-2 transition-colors cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 text-slate-500" />
              <span>Live chat</span>
            </button>

            <button
              type="button"
              onClick={() => setIsAssignOpen(true)}
              className="h-10 px-4 rounded-full bg-[#37AADF] hover:bg-[#2F99CA] text-white text-[13px] font-medium flex items-center gap-2 transition-colors cursor-pointer"
            >
              <span className="w-4 h-4 rounded-full bg-white/25 flex items-center justify-center">
                <Plus className="w-3 h-3 text-white" />
              </span>
              <span>Assign ticket</span>
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-[12px] font-semibold text-[#2E3A59]">
                <th className="py-3.5 pl-3 pr-2 w-10">
                  <button
                    type="button"
                    onClick={toggleSelectAll}
                    aria-label="Select all tickets"
                    className={`w-4 h-4 rounded flex items-center justify-center border transition-colors ${
                      allVisibleSelected
                        ? "bg-[#37AADF] border-[#37AADF] text-white"
                        : "border-slate-300 bg-white"
                    }`}
                  >
                    {allVisibleSelected && <Check className="w-3 h-3" />}
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
              {paginatedTickets.length === 0 ? (
                <tr>
                  <td
                    colSpan={9}
                    className="py-10 text-center text-slate-400 text-[13px]"
                  >
                    No support tickets found.
                  </td>
                </tr>
              ) : (
                paginatedTickets.map((ticket) => {
                  const isSelected = selectedIds.includes(ticket.id);
                  return (
                    <tr
                      key={ticket.id}
                      className="hover:bg-slate-50/70 transition-colors"
                    >
                      <td className="py-3.5 pl-3 pr-2">
                        <button
                          type="button"
                          onClick={() => toggleSelectOne(ticket.id)}
                          aria-label={`Select ${ticket.ticketCode}`}
                          className={`w-4 h-4 rounded flex items-center justify-center border transition-colors ${
                            isSelected
                              ? "bg-[#37AADF] border-[#37AADF] text-white"
                              : "border-slate-300 bg-white"
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3" />}
                        </button>
                      </td>
                      <td className="py-3.5 px-3 font-medium whitespace-nowrap">
                        {ticket.ticketCode}
                      </td>
                      <td className="py-3.5 px-3 text-slate-600 whitespace-nowrap">
                        {ticket.module}
                      </td>
                      <td className="py-3.5 px-3 text-slate-600 max-w-[220px] truncate">
                        {ticket.subject}
                      </td>
                      <td className="py-3.5 px-3 text-slate-600 whitespace-nowrap">
                        {ticket.type}
                      </td>
                      <td className="py-3.5 px-3 whitespace-nowrap">
                        <span className="inline-flex items-center gap-2 text-slate-600">
                          <span
                            className={`w-2 h-2 rounded-full ${PRIORITY_DOT[ticket.priority]}`}
                          />
                          {ticket.priority}
                        </span>
                      </td>
                      <td className="py-3.5 px-3 whitespace-nowrap">
                        <span className="inline-flex items-center gap-2 text-slate-600">
                          <span
                            className={`w-2 h-2 rounded-full ${STATUS_DOT[ticket.status]}`}
                          />
                          {ticket.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-3 text-slate-600 whitespace-nowrap">
                        {ticket.created}
                      </td>
                      <td className="py-3.5 pl-2 pr-3 text-right">
                        <Dropdown
                          align="right"
                          trigger={
                            <span className="w-8 h-8 rounded-full bg-[#F4F6F9] hover:bg-slate-200/70 inline-flex items-center justify-center text-slate-500 transition-colors">
                              <MoreVertical className="w-4 h-4" />
                            </span>
                          }
                        >
                          <DropdownItem
                            onClick={() => setViewingTicketId(ticket.id)}
                          >
                            View
                          </DropdownItem>
                        </Dropdown>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-5 mt-2 border-t border-slate-100 text-[13px]">
          <p className="text-[#2E3A59] font-medium">
            Showing {startEntry} to {endEntry} of {filteredTickets.length} entries
          </p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={safePage >= totalPages}
              className="px-3.5 py-1.5 rounded-lg bg-[#F4F6F9] text-slate-500 hover:text-[#2E3A59] disabled:opacity-50 text-[12px] font-medium transition-colors"
            >
              Next
            </button>

            {Array.from({ length: totalPages }, (_, idx) => idx + 1).map(
              (page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 rounded-lg text-[12px] font-semibold transition-colors ${
                    page === safePage
                      ? "bg-[#37AADF] text-white"
                      : "bg-[#F4F6F9] text-slate-600 hover:text-[#2E3A59]"
                  }`}
                >
                  {page}
                </button>
              )
            )}

            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={safePage <= 1}
              className="px-3.5 py-1.5 rounded-lg bg-[#F4F6F9] text-slate-500 hover:text-[#2E3A59] disabled:opacity-50 text-[12px] font-medium transition-colors"
            >
              Previous
            </button>
          </div>
        </div>
      </div>

      <AssignTicketModal
        isOpen={isAssignOpen}
        onClose={() => setIsAssignOpen(false)}
        onAssign={handleAssign}
      />

      <FilterTicketsModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        filters={filters}
        companies={companies}
        onApply={(nextFilters) => {
          setFilters(nextFilters);
          setCurrentPage(1);
        }}
      />
    </div>
  );
}
