import { useState, useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { DataTable } from "@/components/ui/DataTable";
import { Dropdown, DropdownItem, DropdownSeparator } from "@/components/ui/Dropdown";
import { NewTicketModal } from "@/components/support/NewTicketModal";
import { ViewTicketModal } from "@/components/support/ViewTicketModal";
import { LiveChatModal } from "@/components/support/LiveChatModal";
import {
  Search,
  MoreVertical,
  Eye,
  Trash2,
  MessageSquare,
  FileText,
  AlertCircle,
  Clock,
  CheckCircle,
  XCircle,
  Plus,
  Headphones,
} from "lucide-react";

type TicketStatus = "Open" | "In-progress" | "Critical" | "Resolved" | "Closed";
type TicketPriority = "High" | "Medium" | "Low";
type TicketType = "Bug" | "Support" | "Features" | "Company chat";

interface SupportTicket {
  id: string;
  ticketId: string;
  module: string;
  subject: string;
  type: TicketType;
  priority: TicketPriority;
  status: TicketStatus;
  created: string;
}

const MOCK_TICKETS: SupportTicket[] = [
  { id: "1", ticketId: "TKT-0481", module: "Payroll", subject: "Permission cache not clearing on logout", type: "Bug", priority: "High", status: "In-progress", created: "Today 09:12" },
  { id: "2", ticketId: "TKT-0482", module: "Visit", subject: "Export to CSV fails for large datasets", type: "Bug", priority: "Medium", status: "Open", created: "Yesterday" },
  { id: "3", ticketId: "TKT-0483", module: "Leave", subject: "Trial conversion discounts not applied", type: "Support", priority: "Low", status: "Closed", created: "3 days ago" },
  { id: "4", ticketId: "TKT-0484", module: "Timesheets", subject: "Two-factor auth session expiry too short", type: "Bug", priority: "High", status: "Critical", created: "5 days ago" },
  { id: "5", ticketId: "TKT-0485", module: "Auth", subject: "Audit log export truncates at 500 rows", type: "Bug", priority: "Medium", status: "Resolved", created: "7 days ago" },
  { id: "6", ticketId: "TKT-0486", module: "Payroll", subject: "Permission cache not clearing on logout", type: "Bug", priority: "High", status: "In-progress", created: "Today 09:12" },
  { id: "7", ticketId: "TKT-0487", module: "Visit", subject: "Export to CSV fails for large datasets", type: "Bug", priority: "Medium", status: "Open", created: "Yesterday" },
  { id: "8", ticketId: "TKT-0488", module: "Leave", subject: "Trial conversion discounts not applied", type: "Support", priority: "Low", status: "Closed", created: "3 days ago" },
  { id: "9", ticketId: "TKT-0489", module: "Timesheets", subject: "Two-factor auth session expiry too short", type: "Bug", priority: "High", status: "Critical", created: "5 days ago" },
];

const TABS = ["All", "Bug", "Support", "Features", "Company chat"] as const;
type Tab = typeof TABS[number];

const STATUS_CONFIG: Record<TicketStatus, { dot: string; label: string }> = {
  "Open":        { dot: "bg-[#38BDF8]", label: "Open" },
  "In-progress": { dot: "bg-amber-400", label: "In-progress" },
  "Critical":    { dot: "bg-red-500",   label: "Critical" },
  "Resolved":    { dot: "bg-green-500", label: "Resolved" },
  "Closed":      { dot: "bg-slate-400", label: "Closed" },
};

const PRIORITY_CONFIG: Record<TicketPriority, { dot: string }> = {
  "High":   { dot: "bg-red-500" },
  "Medium": { dot: "bg-amber-400" },
  "Low":    { dot: "bg-slate-400" },
};

export default function SupportCentre() {
  const [tickets] = useState<SupportTicket[]>(MOCK_TICKETS);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<Tab>("All");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isNewTicketOpen, setIsNewTicketOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isLiveChatOpen, setIsLiveChatOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);

  const filteredTickets = useMemo(() => {
    return tickets.filter((ticket) => {
      const matchesSearch =
        ticket.ticketId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.module.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.subject.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesTab =
        activeTab === "All" ? true : ticket.type === activeTab;

      return matchesSearch && matchesTab;
    });
  }, [tickets, searchQuery, activeTab]);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(new Set(filteredTickets.map((t) => t.id)));
    } else {
      setSelectedIds(new Set());
    }
  };

  const handleSelectOne = (id: string, checked: boolean) => {
    const next = new Set(selectedIds);
    if (checked) next.add(id); else next.delete(id);
    setSelectedIds(next);
  };

  const isAllSelected =
    filteredTickets.length > 0 && selectedIds.size === filteredTickets.length;

  const statCards = [
    { label: "Open",        count: tickets.filter(t => t.status === "Open").length,        icon: <MessageSquare size={20} strokeWidth={2.2} />, bg: "bg-[#EBF7FD]", color: "text-[#38BDF8]" },
    { label: "In progress", count: tickets.filter(t => t.status === "In-progress").length, icon: <Clock size={20} strokeWidth={2.2} />,          bg: "bg-[#FEF5EA]", color: "text-amber-400" },
    { label: "Critical",    count: tickets.filter(t => t.status === "Critical").length,    icon: <AlertCircle size={20} strokeWidth={2.2} />,    bg: "bg-[#FDECEE]", color: "text-red-500" },
    { label: "Resolved",    count: tickets.filter(t => t.status === "Resolved").length,   icon: <CheckCircle size={20} strokeWidth={2.2} />,    bg: "bg-[#E8F8EE]", color: "text-green-500" },
    { label: "Closed",      count: tickets.filter(t => t.status === "Closed").length,     icon: <XCircle size={20} strokeWidth={2.2} />,        bg: "bg-[#F3F4F6]", color: "text-slate-400" },
  ];

  const columns = useMemo<ColumnDef<SupportTicket>[]>(
    () => [
      {
        id: "select",
        header: () => (
          <div className="px-1">
            <input
              type="checkbox"
              className="rounded border-slate-300 text-[#38BDF8] focus:ring-[#38BDF8] cursor-pointer"
              checked={isAllSelected}
              onChange={(e) => handleSelectAll(e.target.checked)}
            />
          </div>
        ),
        cell: ({ row }) => (
          <div className="px-1">
            <input
              type="checkbox"
              className="rounded border-slate-300 text-[#38BDF8] focus:ring-[#38BDF8] cursor-pointer"
              checked={selectedIds.has(row.original.id)}
              onChange={(e) => handleSelectOne(row.original.id, e.target.checked)}
            />
          </div>
        ),
        enableSorting: false,
      },
      {
        accessorKey: "ticketId",
        header: "Ticket",
        cell: ({ row }) => (
          <span className="font-semibold text-slate-700">{row.original.ticketId}</span>
        ),
      },
      {
        accessorKey: "module",
        header: "Module",
        cell: ({ row }) => <span>{row.original.module}</span>,
      },
      {
        accessorKey: "subject",
        header: "Subject",
        cell: ({ row }) => (
          <span className="max-w-[180px] truncate block" title={row.original.subject}>
            {row.original.subject.length > 22
              ? row.original.subject.slice(0, 22) + "..."
              : row.original.subject}
          </span>
        ),
      },
      {
        accessorKey: "type",
        header: "Type",
        cell: ({ row }) => <span>{row.original.type}</span>,
      },
      {
        accessorKey: "priority",
        header: "Priority",
        cell: ({ row }) => {
          const { dot } = PRIORITY_CONFIG[row.original.priority];
          return (
            <div className="flex items-center gap-2">
              <div className={`h-2 w-2 rounded-full ${dot}`} />
              <span className="font-medium">{row.original.priority}</span>
            </div>
          );
        },
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const { dot, label } = STATUS_CONFIG[row.original.status];
          return (
            <div className="flex items-center gap-2">
              <div className={`h-2 w-2 rounded-full ${dot}`} />
              <span className="font-medium">{label}</span>
            </div>
          );
        },
      },
      {
        accessorKey: "created",
        header: "Created",
        cell: ({ row }) => (
          <span className="text-slate-500">{row.original.created}</span>
        ),
      },
      {
        id: "actions",
        header: "",
        cell: ({ row }) => {
          const ticket = row.original;
          return (
            <div className="flex justify-end pr-2">
              <Dropdown
                trigger={
                  <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer">
                    <MoreVertical size={16} />
                  </button>
                }
              >
                <DropdownItem
                  onClick={() => {
                    setSelectedTicket(ticket);
                    setIsViewOpen(true);
                  }}
                  icon={<Eye size={14} />}
                >
                  View
                </DropdownItem>
                <DropdownItem
                  onClick={() => setIsLiveChatOpen(true)}
                  icon={<MessageSquare size={14} />}
                >
                  Reply
                </DropdownItem>
                <DropdownSeparator />
                <DropdownItem
                  onClick={() => console.log("Delete", ticket.id)}
                  className="text-rose-500 hover:bg-rose-500/5 focus:bg-rose-500/5"
                  icon={<Trash2 size={14} className="text-rose-500" />}
                >
                  Delete
                </DropdownItem>
              </Dropdown>
            </div>
          );
        },
      },
    ],
    [isAllSelected, selectedIds, filteredTickets]
  );

  return (
    <div className="animate-fade-in duration-300 space-y-6">
      {/* Header */}
      <Breadcrumb
        pageTitle="SUPPORT CENTRE"
        subtext="Report bugs, request features or get help"
        activePage="Support centre"
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {statCards.map((card) => (
          <div key={card.label} className="bg-white rounded-2xl p-5 flex items-center gap-4">
            <div className={`${card.bg} ${card.color} p-3 rounded-2xl flex items-center justify-center shrink-0`}>
              {card.icon}
            </div>
            <div>
              <h4 className="text-2xl font-extrabold leading-none mb-1">{card.count}</h4>
              <p className="text-[13px] font-medium text-muted">{card.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Table Container */}
      <div className="bg-white rounded-2xl overflow-hidden flex flex-col">

        {/* Toolbar */}
        <div className="p-5 border-b border-[#E7E7E7] flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Search */}
          <div className="relative w-full sm:w-64">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Search size={16} className="text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#FBFBFB] border border-[#E7E7E7] rounded-full text-[13px] focus:outline-none focus:ring-1 focus:ring-[#38BDF8] focus:border-[#38BDF8] transition-all placeholder:text-slate-400"
            />
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              onClick={() => setIsLiveChatOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-[#FBFBFB] hover:bg-slate-100 border border-[#E7E7E7] text-slate-700 text-[13px] font-semibold rounded-full transition-all cursor-pointer">
              <Headphones size={14} />
              <span>Live chat</span>
            </button>
            <button
              onClick={() => setIsNewTicketOpen(true)}
              className="flex items-center justify-center gap-1.5 h-10 px-5 rounded-full bg-primary text-white text-xs font-semibold hover:bg-primary/95 transition-all cursor-pointer"
            >
              <Plus size={15} />
              <span>New ticket</span>
            </button>
          </div>
        </div>

        {/* Type Tabs */}
        <div className="px-5 pt-4 border-b flex items-center gap-2 overflow-x-auto no-scrollbar">
          {TABS.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-1.5 rounded-t-lg text-[13px] transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? "bg-[#EBF7FD] text-[#38BDF8] font-bold"
                    : "text-slate-400 hover:text-slate-700 font-medium bg-transparent"
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Data Table */}
        <div className="flex-1 overflow-auto">
          {filteredTickets.length > 0 ? (
            <DataTable columns={columns} data={filteredTickets} initialPageSize={8} />
          ) : (
            <div className="py-20 flex flex-col items-center justify-center text-center">
              <div className="bg-slate-50 p-4 rounded-full mb-4">
                <FileText size={24} className="text-slate-400" />
              </div>
              <h3 className="text-sm font-bold mb-1">No tickets found</h3>
              <p className="text-xs text-muted max-w-sm">
                We couldn't find any support tickets matching your current search filters.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <NewTicketModal isOpen={isNewTicketOpen} onClose={() => setIsNewTicketOpen(false)} />
      <ViewTicketModal
        isOpen={isViewOpen}
        onClose={() => { setIsViewOpen(false); setSelectedTicket(null); }}
        ticket={selectedTicket ? {
          title: selectedTicket.subject,
          ticketId: selectedTicket.ticketId,
          type: selectedTicket.type,
          priority: selectedTicket.priority,
          status: selectedTicket.status,
        } : null}
      />
      <LiveChatModal isOpen={isLiveChatOpen} onClose={() => setIsLiveChatOpen(false)} />
    </div>
  );
}
