import React, { useState, useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { DataTable } from "@/components/ui/DataTable";
import { Dropdown, DropdownItem } from "@/components/ui/Dropdown";
import { INITIAL_HOLIDAY_REQUESTS, type HolidayRequest } from "@/constants/holidays";
import { AddHolidayModal } from "@/components/holiday/AddHolidayModal";
import { ViewHolidayModal } from "@/components/holiday/ViewHolidayModal";
import { RejectHolidayModal } from "@/components/holiday/RejectHolidayModal";
import {
  ClipboardList,
  CheckCircle2,
  Clock,
  CalendarDays,
  Search,
  Download,
  Upload,
  Plus,
  Check,
  X,
  Eye,
  Trash2,
  MoreVertical,
  FileText
} from "lucide-react";

export default function Holiday() {
  const [requests, setRequests] = useState<HolidayRequest[]>(INITIAL_HOLIDAY_REQUESTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [activeTab, setActiveTab] = useState<
    "All" | "Annual leave" | "Sick leave" | "Compassionate leave" | "Parental leave"
  >("All");

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<HolidayRequest | null>(null);

  // Filter requests
  const filteredRequests = useMemo(() => {
    return requests.filter((req) => {
      const matchesSearch =
        req.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        req.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        req.coveringStaff.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesTab = activeTab === "All" ? true : req.type === activeTab;

      return matchesSearch && matchesTab;
    });
  }, [requests, searchQuery, activeTab]);

  // Selection handlers
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(new Set(filteredRequests.map((i) => i.id)));
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

  const isAllVisibleSelected =
    filteredRequests.length > 0 && selectedIds.size === filteredRequests.length;

  // Actions
  const handleApprove = (id: string) => {
    setRequests((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: "Approved" } : item))
    );
  };

  const handleRejectConfirm = (reason: string) => {
    if (selectedRequest) {
      setRequests((prev) =>
        prev.map((item) =>
          item.id === selectedRequest.id
            ? { ...item, status: "Rejected", reason: reason || item.reason }
            : item
        )
      );
    }
  };

  const deleteRequest = (id: string) => {
    setRequests((prev) => prev.filter((item) => item.id !== id));
    if (selectedIds.has(id)) {
      const newSelected = new Set(selectedIds);
      newSelected.delete(id);
      setSelectedIds(newSelected);
    }
  };

  // Table columns
  const columns = useMemo<ColumnDef<HolidayRequest>[]>(
    () => [
      {
        id: "select",
        header: () => (
          <div className="px-1">
            <input
              type="checkbox"
              className="rounded border-slate-300 text-[#38BDF8] focus:ring-[#38BDF8] cursor-pointer"
              checked={isAllVisibleSelected}
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
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => <span className="font-semibold">{row.original.name}</span>,
      },
      {
        accessorKey: "type",
        header: "Type",
        cell: ({ row }) => <span>{row.original.type}</span>,
      },
      {
        accessorKey: "fromDate",
        header: "From",
        cell: ({ row }) => <span>{row.original.fromDate}</span>,
      },
      {
        accessorKey: "toDate",
        header: "To",
        cell: ({ row }) => <span>{row.original.toDate}</span>,
      },
      {
        accessorKey: "days",
        header: "Days",
        cell: ({ row }) => <span className="font-medium">{row.original.days}</span>,
      },
      {
        accessorKey: "requestedDate",
        header: "Requested",
        cell: ({ row }) => <span>{row.original.requestedDate}</span>,
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const status = row.original.status;
          let dotColorClass = "bg-green-500";
          if (status === "Under review" || status === "Pending") {
            dotColorClass = "bg-amber-500";
          } else if (status === "Rejected") {
            dotColorClass = "bg-red-500";
          }

          return (
            <div className="flex items-center gap-2">
              <div className={`h-2 w-2 rounded-full ${dotColorClass}`}></div>
              <span className="font-medium">{status}</span>
            </div>
          );
        },
      },
      {
        id: "actions",
        header: "",
        cell: ({ row }) => {
          const req = row.original;
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
                  onClick={() => handleApprove(req.id)}
                  icon={<Check size={14} className="text-green-600" />}
                >
                  Approve
                </DropdownItem>

                <DropdownItem
                  onClick={() => {
                    setSelectedRequest(req);
                    setIsRejectModalOpen(true);
                  }}
                  icon={<X size={14} className="text-red-500" />}
                >
                  Reject
                </DropdownItem>

                <DropdownItem
                  onClick={() => {
                    setSelectedRequest(req);
                    setIsViewModalOpen(true);
                  }}
                  icon={<Eye size={14} />}
                >
                  View
                </DropdownItem>

                <div className="h-[1px] bg-slate-100 my-1 mx-2" />

                <DropdownItem
                  onClick={() => deleteRequest(req.id)}
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
    [isAllVisibleSelected, selectedIds, filteredRequests]
  );

  return (
    <div className="animate-fade-in duration-300 space-y-6">
      {/* Header Section */}
      <Breadcrumb
        pageTitle="HOLIDAY"
        subtext="Manage staff leave requests and track leave balance"
        activePage="Holiday"
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total requests */}
        <div className="bg-white rounded-2xl p-5 flex items-center gap-4">
          <div className="bg-[#EBF7FD] text-[#38BDF8] p-3.5 rounded-2xl flex items-center justify-center">
            <ClipboardList size={22} strokeWidth={2.5} />
          </div>
          <div>
            <h4 className="text-2xl font-extrabold leading-none mb-1">
              {requests.length}
            </h4>
            <p className="text-[14px] font-medium text-muted">Total requests</p>
          </div>
        </div>

        {/* Approved */}
        <div className="bg-white rounded-2xl p-5 flex items-center gap-4">
          <div className="bg-[#E8F8EE] text-[#24A148] p-3.5 rounded-2xl flex items-center justify-center">
            <CheckCircle2 size={22} strokeWidth={2.5} className="text-[#24A148]" />
          </div>
          <div>
            <h4 className="text-2xl font-extrabold leading-none mb-1">
              {requests.filter((i) => i.status === "Approved").length}
            </h4>
            <p className="text-[14px] font-medium text-muted">Approved</p>
          </div>
        </div>

        {/* Pending */}
        <div className="bg-white rounded-2xl p-5 flex items-center gap-4">
          <div className="bg-[#FEF5EA] text-[#F19E39] p-3.5 rounded-2xl flex items-center justify-center">
            <Clock size={22} strokeWidth={2.5} />
          </div>
          <div>
            <h4 className="text-2xl font-extrabold leading-none mb-1">
              {requests.filter((i) => i.status === "Under review" || i.status === "Pending").length}
            </h4>
            <p className="text-[14px] font-medium text-muted">Pending</p>
          </div>
        </div>

        {/* Days allocated */}
        <div className="bg-white rounded-2xl p-5 flex items-center gap-4">
          <div className="bg-[#F3EAFF] text-[#A65BFF] p-3.5 rounded-2xl flex items-center justify-center">
            <CalendarDays size={22} strokeWidth={2.5} />
          </div>
          <div>
            <h4 className="text-2xl font-extrabold leading-none mb-1">
              1,240 days
            </h4>
            <p className="text-[14px] font-medium text-muted">Days allocated</p>
          </div>
        </div>
      </div>

      {/* Main Table Container */}
      <div className="bg-white rounded-2xl overflow-hidden flex flex-col">
        {/* Toolbar */}
        <div className="p-5 border-b flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Search size={16} className="text-slate-400" />
              </div>
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-[#FBFBFB] border rounded-full text-[13px] focus:outline-none focus:ring-1 focus:ring-[#38BDF8] focus:border-[#38BDF8] transition-all placeholder:text-slate-400"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button className="hidden sm:flex items-center gap-2 px-4 py-2 bg-[#FBFBFB] hover:bg-slate-100 border text-slate-700 text-[13px] font-semibold rounded-full transition-all cursor-pointer">
              <Download size={14} />
              <span>Import</span>
            </button>
            <button className="hidden sm:flex items-center gap-2 px-4 py-2 bg-[#FBFBFB] hover:bg-slate-100 border text-slate-700 text-[13px] font-semibold rounded-full transition-all cursor-pointer">
              <Upload size={14} />
              <span>Export</span>
            </button>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center justify-center gap-1.5 h-10 px-5 rounded-full bg-primary text-white text-xs font-semibold hover:bg-primary/95 transition-all cursor-pointer"
            >
              <Plus size={15} />
              <span>Add new</span>
            </button>
          </div>
        </div>

        {/* Tabs and Under Review badge */}
        <div className="px-5 pt-4 border-b flex items-center justify-between overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-2">
            {(["All", "Annual leave", "Sick leave", "Compassionate leave", "Parental leave"] as const).map(
              (tab) => {
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
              }
            )}
          </div>

          <div className="hidden lg:flex items-center gap-2 text-xs font-medium text-muted mb-1 pr-2 whitespace-nowrap">
            <span className="flex items-center justify-center h-4 w-4 bg-[#FEF5EA] text-[#F19E39] rounded-full font-extrabold text-[11px]">
              !
            </span>
            <span>Under review only</span>
          </div>
        </div>

        {/* Data Table */}
        <div className="flex-1 overflow-auto">
          {filteredRequests.length > 0 ? (
            <DataTable columns={columns} data={filteredRequests} pageSize={8} />
          ) : (
            <div className="py-20 flex flex-col items-center justify-center text-center">
              <div className="bg-slate-50 p-4 rounded-full mb-4">
                <FileText size={24} className="text-slate-400" />
              </div>
              <h3 className="text-sm font-bold mb-1">No requests found</h3>
              <p className="text-xs text-muted max-w-sm">
                We couldn't find any leave requests matching your current search filters.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <AddHolidayModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />

      <ViewHolidayModal
        isOpen={isViewModalOpen}
        onClose={() => {
          setIsViewModalOpen(false);
          setSelectedRequest(null);
        }}
        request={selectedRequest}
        onApprove={handleApprove}
        onRejectClick={(req) => {
          setSelectedRequest(req);
          setIsRejectModalOpen(true);
        }}
      />

      <RejectHolidayModal
        isOpen={isRejectModalOpen}
        onClose={() => {
          setIsRejectModalOpen(false);
          setSelectedRequest(null);
        }}
        onConfirm={handleRejectConfirm}
      />
    </div>
  );
}
