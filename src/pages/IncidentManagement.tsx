import React, { useState, useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { DataTable } from "@/components/ui/DataTable";
import { Dropdown, DropdownItem } from "@/components/ui/Dropdown";
import { INITIAL_CARE_INCIDENTS, type CareIncident } from "@/constants/incidents";
import { AddIncidentModal } from "@/components/incident-management/AddIncidentModal";
import { ViewIncidentModal } from "@/components/incident-management/ViewIncidentModal";
import { EditIncidentModal } from "@/components/incident-management/EditIncidentModal";
import {
  ClipboardList,
  AlertCircle,
  Clock,
  AlertTriangle,
  Search,
  Filter,
  Download,
  Upload,
  Plus,
  Edit,
  Eye,
  MessageSquare,
  Trash2,
  MoreVertical,
  FileText
} from "lucide-react";

export default function IncidentManagement() {
  const [incidents, setIncidents] = useState<CareIncident[]>(INITIAL_CARE_INCIDENTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [activeTab, setActiveTab] = useState<"All" | "Critical" | "High" | "Medium" | "Low">("All");

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedIncident, setSelectedIncident] = useState<CareIncident | null>(null);

  const handleUpdateIncident = (updatedIncident: CareIncident) => {
    setIncidents((prev) =>
      prev.map((inc) => (inc.id === updatedIncident.id ? updatedIncident : inc))
    );
  };

  // Filter incidents based on search and tab
  const filteredIncidents = useMemo(() => {
    return incidents.filter((incident) => {
      const matchesSearch =
        incident.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        incident.serviceUser.toLowerCase().includes(searchQuery.toLowerCase()) ||
        incident.reportedBy.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesTab = activeTab === "All" ? true : incident.severity === activeTab;

      return matchesSearch && matchesTab;
    });
  }, [incidents, searchQuery, activeTab]);

  // Selection handlers
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(new Set(filteredIncidents.map((i) => i.id)));
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

  const isAllVisibleSelected = filteredIncidents.length > 0 && selectedIds.size === filteredIncidents.length;

  const deleteIncident = (id: string) => {
    setIncidents((prev) => prev.filter((item) => item.id !== id));
    if (selectedIds.has(id)) {
      const newSelected = new Set(selectedIds);
      newSelected.delete(id);
      setSelectedIds(newSelected);
    }
  };

  // Table columns
  const columns = useMemo<ColumnDef<CareIncident>[]>(
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
        accessorKey: "title",
        header: "Title",
        cell: ({ row }) => <span className="font-semibold">{row.original.title}</span>,
      },
      {
        accessorKey: "serviceUser",
        header: "Service user",
        cell: ({ row }) => <span>{row.original.serviceUser}</span>,
      },
      {
        accessorKey: "reportedBy",
        header: "Reported by",
        cell: ({ row }) => <span>{row.original.reportedBy}</span>,
      },
      {
        accessorKey: "date",
        header: "Date",
        cell: ({ row }) => <span>{row.original.date}</span>,
      },
      {
        accessorKey: "attachmentsCount",
        header: "Attachment(s)",
        cell: ({ row }) => (
          <span className="text-[#38BDF8] font-medium cursor-pointer hover:underline">
            {row.original.attachmentsCount} attachments
          </span>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const status = row.original.status;
          let dotColorClass = "bg-green-500";
          if (status === "Pending" || status === "Submitted") {
            dotColorClass = "bg-amber-500";
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
        accessorKey: "severity",
        header: "Severity",
        cell: ({ row }) => {
          const severity = row.original.severity;
          let dotColorClass = "bg-red-500";
          if (severity === "Medium") dotColorClass = "bg-amber-500";
          if (severity === "Low") dotColorClass = "bg-green-500";

          return (
            <div className="flex items-center gap-2">
              <div className={`h-2 w-2 rounded-full ${dotColorClass}`}></div>
              <span className="font-medium">{severity}</span>
            </div>
          );
        },
      },
      {
        id: "actions",
        header: "",
        cell: ({ row }) => {
          const incident = row.original;
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
                    setSelectedIncident(incident);
                    setIsEditModalOpen(true);
                  }}
                  icon={<Edit size={14} />}
                >
                  Edit
                </DropdownItem>

                <DropdownItem
                  onClick={() => {
                    setSelectedIncident(incident);
                    setIsViewModalOpen(true);
                  }}
                  icon={<Eye size={14} />}
                >
                  View
                </DropdownItem>

                <DropdownItem onClick={() => console.log("Download", incident.id)} icon={<Download size={14} />}>
                  Download
                </DropdownItem>

                <DropdownItem onClick={() => console.log("Export", incident.id)} icon={<Upload size={14} />}>
                  Export
                </DropdownItem>

                <DropdownItem onClick={() => console.log("Comment", incident.id)} icon={<MessageSquare size={14} />}>
                  Comment
                </DropdownItem>

                <div className="h-[1px] bg-slate-100 my-1 mx-2" />

                <DropdownItem
                  onClick={() => deleteIncident(incident.id)}
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
    [isAllVisibleSelected, selectedIds, filteredIncidents]
  );

  return (
    <div className="animate-fade-in duration-300 space-y-6">
      {/* Header Section */}
      <Breadcrumb
        pageTitle="INCIDENT MANAGEMENT"
        subtext="Track, review, and manage care incidents and near-misses"
        activePage="Incident management"
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total */}
        <div className="bg-white rounded-2xl p-5 flex items-center gap-4">
          <div className="bg-[#EBF7FD] text-[#38BDF8] p-3 rounded-2xl flex items-center justify-center">
            <ClipboardList size={22} strokeWidth={2.5} />
          </div>
          <div>
            <h4 className="text-2xl font-extrabold leading-none mb-1">
              {incidents.length}
            </h4>
            <p className="text-[14px] font-medium text-muted">Total</p>
          </div>
        </div>

        {/* Need escalation */}
        <div className="bg-white rounded-2xl p-5 flex items-center gap-4">
          <div className="bg-[#E8F8EE] text-[#24A148] p-3 rounded-2xl flex items-center justify-center">
            <AlertCircle size={22} strokeWidth={2.5} className="text-[#36C328]" />
          </div>
          <div>
            <h4 className="text-2xl font-extrabold leading-none mb-1">
              {incidents.filter((i) => i.severity === "High").length}
            </h4>
            <p className="text-[14px] font-medium text-muted">Need escalation</p>
          </div>
        </div>

        {/* Pending review */}
        <div className="bg-white rounded-2xl p-5  flex items-center gap-4">
          <div className="bg-[#FEF5EA] text-[#F19E39] p-3 rounded-2xl flex items-center justify-center">
            <Clock size={22} strokeWidth={2.5} />
          </div>
          <div>
            <h4 className="text-2xl font-extrabold leading-none mb-1">
              {incidents.filter((i) => i.status === "Pending").length}
            </h4>
            <p className="text-[14px] font-medium text-muted">Pending review</p>
          </div>
        </div>

        {/* Critical */}
        <div className="bg-white rounded-2xl p-5  flex items-center gap-4">
          <div className="bg-[#FDECEE] text-[#EA3D53] p-3 rounded-2xl flex items-center justify-center">
            <AlertTriangle size={22} strokeWidth={2.5} />
          </div>
          <div>
            <h4 className="text-2xl font-extrabold leading-none mb-1">
              {incidents.filter((i) => i.severity === "Critical").length}
            </h4>
            <p className="text-[14px] font-medium text-muted">Critical</p>
          </div>
        </div>
      </div>

      {/* Main Table Container */}
      <div className="bg-white rounded-2xl overflow-hidden flex flex-col">
        {/* Toolbar */}
        <div className="p-5 border-b border-[#E7E7E7] flex flex-col sm:flex-row items-center justify-between gap-4">
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
                className="w-full pl-10 pr-4 py-2 bg-[#FBFBFB] border border-[#E7E7E7] rounded-full text-[13px] focus:outline-none focus:ring-1 focus:ring-[#38BDF8] focus:border-[#38BDF8] transition-all placeholder:text-slate-400"
              />
            </div>

            <button className="p-2 bg-[#FBFBFB] border border-[#E7E7E7] hover:bg-slate-100 rounded-full text-[#38BDF8] transition-colors cursor-pointer">
              <Filter size={16} />
            </button>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button className="hidden sm:flex items-center gap-2 px-4 py-2 bg-[#FBFBFB] hover:bg-slate-100 border border-[#E7E7E7] text-slate-700 text-[13px] font-semibold rounded-full transition-all cursor-pointer">
              <Download size={14} />
              <span>Import</span>
            </button>
            <button className="hidden sm:flex items-center gap-2 px-4 py-2 bg-[#FBFBFB] hover:bg-slate-100 border border-[#E7E7E7] text-slate-700 text-[13px] font-semibold rounded-full transition-all cursor-pointer">
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

        {/* Severity Tabs */}
        <div className="px-5 pt-4 border-b flex items-center gap-2 overflow-x-auto no-scrollbar">
          {(["All", "Critical", "High", "Medium", "Low"] as const).map((tab) => {
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
          {filteredIncidents.length > 0 ? (
            <DataTable columns={columns} data={filteredIncidents} pageSize={8} />
          ) : (
            <div className="py-20 flex flex-col items-center justify-center text-center">
              <div className="bg-slate-50 p-4 rounded-full mb-4">
                <FileText size={24} className="text-slate-400" />
              </div>
              <h3 className="text-sm font-bold  mb-1">No incidents found</h3>
              <p className="text-xs text-muted max-w-sm">
                We couldn't find any care incidents matching your current search filters.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <AddIncidentModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />

      <ViewIncidentModal
        isOpen={isViewModalOpen}
        onClose={() => {
          setIsViewModalOpen(false);
          setSelectedIncident(null);
        }}
        incident={selectedIncident}
      />

      <EditIncidentModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedIncident(null);
        }}
        incident={selectedIncident}
        onSave={handleUpdateIncident}
      />
    </div>
  );
}
