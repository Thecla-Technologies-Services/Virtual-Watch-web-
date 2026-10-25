import { useState, useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { DataTable } from "@/components/ui/DataTable";
import { Dropdown, DropdownItem } from "@/components/ui/Dropdown";
import {
  INITIAL_AUDIT_LOG_ENTRIES,
  type AuditLogEntry,
} from "@/constants/auditLog";
import {
  ClipboardList,
  Activity,
  Calendar,
  FileText,
  Search,
  ChevronDown,
  Filter,
  Download,
  Upload,
} from "lucide-react";

export default function AuditLog() {
  const [entries] = useState<AuditLogEntry[]>(
    INITIAL_AUDIT_LOG_ENTRIES
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [actionFilter, setActionFilter] = useState<string>("All actions");

  // --- Filtering & Selection ---
  const filteredEntries = useMemo(() => {
    return entries.filter((entry) => {
      const matchesSearch =
        entry.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.resource.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.ipAddress.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesAction =
        actionFilter === "All actions" ? true : entry.status === actionFilter;

      return matchesSearch && matchesAction;
    });
  }, [entries, searchQuery, actionFilter]);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(new Set(filteredEntries.map((e) => e.id)));
    } else {
      setSelectedIds(new Set());
    }
  };

  const handleSelectOne = (id: string, checked: boolean) => {
    const newSelected = new Set(selectedIds);
    if (checked) {
      newSelected.add(id);
    } else {
      newSelected.delete(id);
    }
    setSelectedIds(newSelected);
  };

  const isAllSelected =
    filteredEntries.length > 0 && selectedIds.size === filteredEntries.length;

  // --- Columns ---
  const columns = useMemo<ColumnDef<AuditLogEntry>[]>(
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
        accessorKey: "timestamp",
        header: "Timestamp",
        cell: ({ row }) => (
          <span className="text-[13px] font-medium text-slate-700">
            {row.original.timestamp}
          </span>
        ),
      },
      {
        accessorKey: "user",
        header: "User",
        cell: ({ row }) => (
          <span className="font-semibold text-slate-800">
            {row.original.user}
          </span>
        ),
      },
      {
        accessorKey: "resource",
        header: "Resource",
        cell: ({ row }) => <span>{row.original.resource}</span>,
      },
      {
        accessorKey: "details",
        header: "Details",
        cell: ({ row }) => (
          <span className="text-slate-600">{row.original.details}</span>
        ),
      },
      {
        accessorKey: "ipAddress",
        header: "IP address",
        cell: ({ row }) => (
          <span className="text-[13px] text-slate-500 font-mono">
            {row.original.ipAddress}
          </span>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const status = row.original.status;
          let dotColorClass = "bg-[#36C328]";
          if (status === "Updated") {
            dotColorClass = "bg-[#38BDF8]";
          } else if (status === "Deleted") {
            dotColorClass = "bg-[#FF1100]";
          }

          return (
            <div className="flex items-center gap-2">
              <div className={`h-2 w-2 rounded-full ${dotColorClass}`}></div>
              <span className="font-medium">{status}</span>
            </div>
          );
        },
      },
    ],
    [isAllSelected, selectedIds]
  );

  return (
    <div className="animate-fade-in duration-300 space-y-6">
      {/* Header Section */}
      <Breadcrumb
        pageTitle="AUDIT LOG"
        subtext="Complete record of all system activities and changes"
        activePage="Audit log"
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total activities */}
        <div className="bg-white rounded-2xl p-5 border flex items-center gap-4">
          <div className="bg-[#EBF7FD] text-[#38BDF8] p-3.5 rounded-2xl flex items-center justify-center">
            <ClipboardList size={22} strokeWidth={2.5} />
          </div>
          <div>
            <h4 className="text-2xl font-extrabold leading-none mb-1">5</h4>
            <p className="text-[14px] font-normal text-muted">
              Total activities
            </p>
          </div>
        </div>

        {/* Today */}
        <div className="bg-white rounded-2xl p-5 border flex items-center gap-4">
          <div className="bg-[#E8F8EE] text-[#36C328] p-3.5 rounded-2xl flex items-center justify-center">
            <Activity size={22} strokeWidth={2.5} className="text-[#36C328]" />
          </div>
          <div>
            <h4 className="text-2xl font-extrabold leading-none mb-1">5</h4>
            <p className="text-[14px] font-normal text-muted">Today</p>
          </div>
        </div>

        {/* This week */}
        <div className="bg-white rounded-2xl p-5 border flex items-center gap-4">
          <div className="bg-[#FEF5EA] text-[#F19E39] p-3.5 rounded-2xl flex items-center justify-center">
            <Calendar size={22} strokeWidth={2.5} />
          </div>
          <div>
            <h4 className="text-2xl font-extrabold leading-none mb-1">28</h4>
            <p className="text-[14px] font-normal text-muted">This week</p>
          </div>
        </div>

        {/* This month */}
        <div className="bg-white rounded-2xl p-5 border flex items-center gap-4">
          <div className="bg-[#FDE7F3] text-[#D61F69] p-3.5 rounded-2xl flex items-center justify-center">
            <FileText size={22} strokeWidth={2.5} />
          </div>
          <div>
            <h4 className="text-2xl font-extrabold leading-none mb-1">124</h4>
            <p className="text-[14px] font-normal text-muted">This month</p>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="bg-white rounded-2xl border overflow-hidden flex flex-col">
        {/* Toolbar */}
        <div className="p-5 border-b flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 w-full sm:w-auto flex-wrap">
            <div className="relative w-full sm:w-80">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Search size={16} className="text-slate-400" />
              </div>
              <input
                type="text"
                placeholder="Search by users or resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-[#FBFBFB] border rounded-full text-[13px] focus:outline-none focus:ring-1 focus:ring-[#38BDF8] focus:border-[#38BDF8] transition-all placeholder:text-slate-400"
              />
            </div>

            <Dropdown
              trigger={
                <button className="flex items-center justify-between gap-3 px-4 py-2 bg-[#FBFBFB] border rounded-full text-[13px] font-medium text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer min-w-[130px]">
                  <span>{actionFilter}</span>
                  <ChevronDown size={14} className="text-slate-500" />
                </button>
              }
            >
              <DropdownItem onClick={() => setActionFilter("All actions")}>
                All actions
              </DropdownItem>
              <DropdownItem onClick={() => setActionFilter("Created")}>
                Created
              </DropdownItem>
              <DropdownItem onClick={() => setActionFilter("Updated")}>
                Updated
              </DropdownItem>
              <DropdownItem onClick={() => setActionFilter("Approved")}>
                Approved
              </DropdownItem>
              <DropdownItem onClick={() => setActionFilter("Deleted")}>
                Deleted
              </DropdownItem>
            </Dropdown>

            <button
              type="button"
              className="p-2.5 bg-[#FBFBFB] hover:bg-slate-100 border rounded-full text-[#38BDF8] flex items-center justify-center transition-all cursor-pointer"
              title="Filter"
            >
              <Filter size={16} />
            </button>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button className="flex items-center gap-2 px-5 py-2 bg-[#FBFBFB] hover:bg-slate-100 border text-slate-700 text-[13px] font-semibold rounded-full transition-all cursor-pointer">
              <Download size={15} />
              <span>Import</span>
            </button>
            <button className="flex items-center gap-2 px-5 py-2 bg-[#FBFBFB] hover:bg-slate-100 border text-slate-700 text-[13px] font-semibold rounded-full transition-all cursor-pointer">
              <Upload size={15} />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="flex-1 overflow-auto">
          {filteredEntries.length > 0 ? (
            <DataTable columns={columns} data={filteredEntries} initialPageSize={8} />
          ) : (
            <div className="py-20 flex flex-col items-center justify-center text-center">
              <div className="bg-slate-50 p-4 rounded-full mb-4">
                <FileText size={24} className="text-slate-400" />
              </div>
              <h3 className="text-sm font-bold mb-1">No log entries found</h3>
              <p className="text-xs text-muted max-w-sm">
                We couldn't find any audit activity log records matching your
                current search or action filters.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
