import { useState, useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { DataTable } from "@/components/ui/DataTable";
import { Dropdown, DropdownItem } from "@/components/ui/Dropdown";
import { INITIAL_ROTAS, type Rota } from "@/constants/rotas";
import { AddRotaModal } from "@/components/rota-management/AddRotaModal";
import { ViewRotaModal } from "@/components/rota-management/ViewRotaModal";
import { EditRotaModal } from "@/components/rota-management/EditRotaModal";
import { 
  ClipboardCheck, 
  ClipboardList, 
  Lock, 
  FileText, 
  Search, 
  LayoutGrid, 
  List, 
  Download, 
  Upload, 
  Plus,
  Edit,
  Eye,
  Trash2,
  MoreVertical
} from "lucide-react";

export default function RotaManagement() {
  const [rotas, setRotas] = useState<Rota[]>(INITIAL_ROTAS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  
  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedRota, setSelectedRota] = useState<Rota | null>(null);

  const handleUpdateRota = (updatedRota: Rota) => {
    setRotas((prev) =>
      prev.map((r) => (r.id === updatedRota.id ? updatedRota : r))
    );
  };

  // Filter rotas based on search
  const filteredRotas = useMemo(() => {
    return rotas.filter(rota => 
      rota.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rota.createdBy.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [rotas, searchQuery]);

  // Handle selection
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(new Set(filteredRotas.map(r => r.id)));
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

  const isAllVisibleSelected = filteredRotas.length > 0 && selectedIds.size === filteredRotas.length;

  const deleteRota = (id: string) => {
    setRotas(prev => prev.filter(r => r.id !== id));
    if (selectedIds.has(id)) {
      const newSelected = new Set(selectedIds);
      newSelected.delete(id);
      setSelectedIds(newSelected);
    }
  };

  // Define table columns
  const columns = useMemo<ColumnDef<Rota>[]>(() => [
    {
      id: "select",
      header: () => (
        <div className="px-1">
          <input
            type="checkbox"
            className="rounded border-slate-300 text-[#38BDF8] focus:ring-[#38BDF8]"
            checked={isAllVisibleSelected}
            onChange={(e) => handleSelectAll(e.target.checked)}
          />
        </div>
      ),
      cell: ({ row }) => (
        <div className="px-1">
          <input
            type="checkbox"
            className="rounded border-slate-300 text-[#38BDF8] focus:ring-[#38BDF8]"
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
      cell: ({ row }) => <span className="font-medium text-slate-800">{row.original.title}</span>,
    },
    {
      accessorKey: "period",
      header: "Period",
      cell: ({ row }) => <span className="text-slate-600">{row.original.period}</span>,
    },
    {
      accessorKey: "staffCount",
      header: "Staff",
      cell: ({ row }) => <span className="text-slate-600">{row.original.staffCount} people</span>,
    },
    {
      accessorKey: "shiftsCount",
      header: "Shifts",
      cell: ({ row }) => <span className="text-slate-600">{row.original.shiftsCount} shifts...</span>,
    },
    {
      accessorKey: "coverage",
      header: "Coverage",
      cell: ({ row }) => {
        const coverage = row.original.coverage;
        let colorClass = "bg-emerald-500";
        if (coverage < 90) colorClass = "bg-emerald-500"; // Based on mockup, 85% is still green/emerald, 88% green
        // Actually, maybe we can just make it emerald always for the design, or amber if lower. 
        // Mockup shows all green.

        return (
          <div className="flex items-center gap-3">
            <div className="h-2 w-20 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className={`h-full ${colorClass} rounded-full`}
                style={{ width: `${coverage}%` }}
              />
            </div>
            <span className="text-[13px] font-medium text-slate-600">{coverage}%</span>
          </div>
        );
      }
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status;
        let dotColorClass = "bg-slate-400";
        if (status === "Approved") dotColorClass = "bg-emerald-500";
        if (status === "Published") dotColorClass = "bg-[#38BDF8]";
        if (status === "Locked") dotColorClass = "bg-amber-500";

        return (
          <div className="flex items-center gap-2">
            <div className={`h-2 w-2 rounded-full ${dotColorClass}`}></div>
            <span className="font-medium text-slate-800 text-[13px]">{status}</span>
          </div>
        );
      }
    },
    {
      accessorKey: "createdBy",
      header: "Created by",
      cell: ({ row }) => <span className="text-slate-600">{row.original.createdBy}</span>,
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => {
        const rota = row.original;
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
                  setSelectedRota(rota);
                  setIsEditModalOpen(true);
                }}
                icon={<Edit size={13} />}
              >
                Edit
              </DropdownItem>
              
              <DropdownItem
                onClick={() => {
                  setSelectedRota(rota);
                  setIsViewModalOpen(true);
                }}
                icon={<Eye size={13} />}
              >
                View
              </DropdownItem>
              
              <div className="h-[1px] bg-slate-100 my-1 mx-2" />

              <DropdownItem
                onClick={() => deleteRota(rota.id)}
                className="text-rose-500 hover:bg-rose-500/5 focus:bg-rose-500/5"
                icon={<Trash2 size={13} className="text-rose-500" />}
              >
                Delete
              </DropdownItem>
            </Dropdown>
          </div>
        );
      },
    }
  ], [isAllVisibleSelected, selectedIds, filteredRotas]);

  return (
    <div className="animate-fade-in duration-300 space-y-6">
      {/* Header Section */}
      <Breadcrumb
        pageTitle="ROTA MANAGEMENT"
        subtext="Create, publish, and manage rotas across all regions"
        activePage="Rota management"
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Approved */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100/60 flex items-center gap-4">
          <div className="bg-emerald-50 text-emerald-500 p-3 rounded-xl flex items-center justify-center">
            <ClipboardCheck size={22} strokeWidth={2.5} />
          </div>
          <div>
            <h4 className="text-2xl font-extrabold text-slate-800 leading-none mb-1">
              {rotas.filter(r => r.status === "Approved").length}
            </h4>
            <p className="text-[13px] font-semibold text-slate-500">Approved</p>
          </div>
        </div>

        {/* Published */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100/60 flex items-center gap-4">
          <div className="bg-sky-50 text-[#38BDF8] p-3 rounded-xl flex items-center justify-center">
            <ClipboardList size={22} strokeWidth={2.5} />
          </div>
          <div>
            <h4 className="text-2xl font-extrabold text-slate-800 leading-none mb-1">
              {rotas.filter(r => r.status === "Published").length}
            </h4>
            <p className="text-[13px] font-semibold text-slate-500">Published</p>
          </div>
        </div>

        {/* Locked */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100/60 flex items-center gap-4">
          <div className="bg-amber-50 text-amber-500 p-3 rounded-xl flex items-center justify-center">
            <Lock size={22} strokeWidth={2.5} />
          </div>
          <div>
            <h4 className="text-2xl font-extrabold text-slate-800 leading-none mb-1">
              {rotas.filter(r => r.status === "Locked").length}
            </h4>
            <p className="text-[13px] font-semibold text-slate-500">Locked</p>
          </div>
        </div>

        {/* Draft rotas */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100/60 flex items-center gap-4">
          <div className="bg-slate-100 text-slate-400 p-3 rounded-xl flex items-center justify-center">
            <FileText size={22} strokeWidth={2.5} />
          </div>
          <div>
            <h4 className="text-2xl font-extrabold text-slate-800 leading-none mb-1">
              {rotas.filter(r => r.status === "Draft").length}
            </h4>
            <p className="text-[13px] font-semibold text-slate-500">Draft rotas</p>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-white rounded-2xl border border-slate-100/60 overflow-hidden flex flex-col">
        {/* Toolbar */}
        <div className="p-5 border-b border-slate-100/80 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/50 backdrop-blur-sm">
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
                className="w-full pl-10 pr-4 py-2 bg-slate-50/50 border border-slate-200 rounded-xl text-[13px] focus:outline-none focus:ring-2 focus:ring-[#38BDF8]/20 focus:border-[#38BDF8] transition-all placeholder:text-slate-400 text-slate-700"
              />
            </div>
            
            <div className="hidden md:flex items-center p-1 bg-slate-50/80 rounded-xl border border-slate-200/60">
              <button 
                onClick={() => setViewMode("grid")}
                className={`p-1.5 rounded-lg transition-colors ${viewMode === "grid" ? "bg-white text-slate-800 shadow-sm" : "text-slate-400 hover:text-slate-600"}`}
              >
                <LayoutGrid size={16} />
              </button>
              <button 
                onClick={() => setViewMode("list")}
                className={`p-1.5 rounded-lg transition-colors ${viewMode === "list" ? "bg-[#38BDF8] text-white shadow-sm" : "text-slate-400 hover:text-slate-600"}`}
              >
                <List size={16} />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button className="hidden sm:flex items-center gap-2 px-4 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 text-[13px] font-semibold rounded-xl transition-all cursor-pointer">
              <Download size={14} />
              <span>Import</span>
            </button>
            <button className="hidden sm:flex items-center gap-2 px-4 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 text-[13px] font-semibold rounded-xl transition-all cursor-pointer">
              <Upload size={14} />
              <span>Export</span>
            </button>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center justify-center gap-1.5 h-10 px-5.5 rounded-full bg-primary text-white text-xs font-semibold hover:bg-primary/95 transition-all cursor-pointer"
            >
              <Plus size={15} />
              <span>Add new</span>
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="flex-1 overflow-auto">
          {filteredRotas.length > 0 ? (
            <DataTable 
              columns={columns} 
              data={filteredRotas} 
              pageSize={8}
            />
          ) : (
            <div className="py-20 flex flex-col items-center justify-center text-center">
              <div className="bg-slate-50 p-4 rounded-full mb-4">
                <Search size={24} className="text-slate-400" />
              </div>
              <h3 className="text-sm font-bold text-slate-800 mb-1">No rotas found</h3>
              <p className="text-xs text-slate-500 max-w-sm">
                We couldn't find any rotas matching your current search filters.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <AddRotaModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
      />
      
      <ViewRotaModal 
        isOpen={isViewModalOpen} 
        onClose={() => {
          setIsViewModalOpen(false);
          setSelectedRota(null);
        }} 
        rota={selectedRota} 
      />

      <EditRotaModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedRota(null);
        }}
        rota={selectedRota}
        onSave={handleUpdateRota}
      />
    </div>
  );
}
