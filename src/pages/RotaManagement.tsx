import { useMemo, useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import {
  ClipboardCheck,
  ClipboardList,
  Download,
  Edit,
  Eye,
  FileText,
  LayoutGrid,
  List,
  Lock,
  MoreVertical,
  Plus,
  Search,
  Trash2,
  Upload,
} from "lucide-react";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { DataTable } from "@/components/ui/DataTable";
import { Dropdown, DropdownItem } from "@/components/ui/Dropdown";
import { INITIAL_ROTAS, type Rota } from "@/constants/rotas";
import { CreateRotaView } from "@/components/rota-management/CreateRotaView";
import { ViewRotaView } from "@/components/rota-management/ViewRotaView";

const STATUS_BADGE: Record<Rota["status"], string> = {
  Published: "bg-[#EBF6FC] text-[#37AADF]",
  Draft: "bg-[#F4F6F9] text-slate-600",
  Approved: "bg-emerald-50 text-[#16A34A]",
  Locked: "bg-amber-50 text-[#D97706]",
};

export default function RotaManagement() {
  const [rotas, setRotas] = useState<Rota[]>(INITIAL_ROTAS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const [mode, setMode] = useState<"main" | "create" | "view">("main");
  const [activeRota, setActiveRota] = useState<Rota | null>(null);

  const filteredRotas = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return rotas;
    return rotas.filter(
      (rota) =>
        rota.title.toLowerCase().includes(q) ||
        rota.createdBy.toLowerCase().includes(q) ||
        rota.status.toLowerCase().includes(q)
    );
  }, [rotas, searchQuery]);

  const counts = useMemo(() => {
    return {
      approved: rotas.filter((r) => r.status === "Approved").length,
      published: rotas.filter((r) => r.status === "Published").length,
      locked: rotas.filter((r) => r.status === "Locked").length,
      draft: rotas.filter((r) => r.status === "Draft").length,
    };
  }, [rotas]);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(new Set(filteredRotas.map((r) => r.id)));
    } else {
      setSelectedIds(new Set());
    }
  };

  const handleSelectOne = (id: string, checked: boolean) => {
    const next = new Set(selectedIds);
    if (checked) {
      next.add(id);
    } else {
      next.delete(id);
    }
    setSelectedIds(next);
  };

  const isAllVisibleSelected =
    filteredRotas.length > 0 && selectedIds.size === filteredRotas.length;

  const deleteRota = (id: string) => {
    setRotas((prev) => prev.filter((r) => r.id !== id));
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  const handleSaveRota = (saved: Rota) => {
    setRotas((prev) => {
      const exists = prev.some((r) => r.id === saved.id);
      if (exists) {
        return prev.map((r) => (r.id === saved.id ? saved : r));
      }
      return [saved, ...prev];
    });
    setActiveRota(null);
    setMode("main");
  };

  const handleExportCsv = () => {
    const headers = [
      "Title",
      "Period",
      "Staff",
      "Shifts",
      "Coverage",
      "Status",
      "Created by",
    ];
    const rows = filteredRotas.map((r) => [
      r.title,
      r.period,
      String(r.staffCount),
      String(r.shiftsCount),
      `${r.coverage}%`,
      r.status,
      r.createdBy,
    ]);
    const csv = [headers, ...rows].map((row) => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "rotas.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const columns = useMemo<ColumnDef<Rota>[]>(
    () => [
      {
        id: "select",
        header: () => (
          <div className="px-1">
            <input
              type="checkbox"
              className="rounded border-slate-300 text-[#37AADF] focus:ring-[#37AADF]"
              checked={isAllVisibleSelected}
              onChange={(e) => handleSelectAll(e.target.checked)}
            />
          </div>
        ),
        cell: ({ row }) => (
          <div className="px-1">
            <input
              type="checkbox"
              className="rounded border-slate-300 text-[#37AADF] focus:ring-[#37AADF]"
              checked={selectedIds.has(row.original.id)}
              onChange={(e) =>
                handleSelectOne(row.original.id, e.target.checked)
              }
            />
          </div>
        ),
      },
      {
        accessorKey: "title",
        header: "Title",
        cell: ({ row }) => (
          <span className="font-medium text-[#2E3A59]">
            {row.original.title}
          </span>
        ),
      },
      {
        accessorKey: "period",
        header: "Period",
        cell: ({ row }) => (
          <span className="text-slate-600">{row.original.period}</span>
        ),
      },
      {
        accessorKey: "staffCount",
        header: "Staff",
        cell: ({ row }) => (
          <span className="text-slate-600">
            {row.original.staffCount} people
          </span>
        ),
      },
      {
        accessorKey: "shiftsCount",
        header: "Shifts",
        cell: ({ row }) => (
          <span className="text-slate-600">
            {row.original.shiftsCount} shifts
          </span>
        ),
      },
      {
        accessorKey: "coverage",
        header: "Coverage",
        cell: ({ row }) => (
          <span className="font-medium text-[#16A34A]">
            {row.original.coverage}%
          </span>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
          <span
            className={`px-2.5 py-0.5 rounded-full text-[11px] font-medium ${STATUS_BADGE[row.original.status]}`}
          >
            {row.original.status}
          </span>
        ),
      },
      {
        accessorKey: "createdBy",
        header: "Created by",
        cell: ({ row }) => (
          <span className="text-slate-600">{row.original.createdBy}</span>
        ),
      },
      {
        id: "actions",
        header: "",
        cell: ({ row }) => {
          const rota = row.original;
          return (
            <div className="flex justify-end">
              <Dropdown
                align="right"
                trigger={
                  <span className="w-8 h-8 rounded-full bg-[#F4F6F9] hover:bg-slate-200/70 inline-flex items-center justify-center text-slate-500">
                    <MoreVertical className="w-4 h-4" />
                  </span>
                }
              >
                <DropdownItem
                  icon={<Eye className="w-3.5 h-3.5" />}
                  onClick={() => {
                    setActiveRota(rota);
                    setMode("view");
                  }}
                >
                  View
                </DropdownItem>
                {rota.status === "Draft" && (
                  <DropdownItem
                    icon={<Edit className="w-3.5 h-3.5" />}
                    onClick={() => {
                      setActiveRota(rota);
                      setMode("create");
                    }}
                  >
                    Edit
                  </DropdownItem>
                )}
                <DropdownItem
                  icon={<Trash2 className="w-3.5 h-3.5 text-red-500" />}
                  onClick={() => deleteRota(rota.id)}
                  className="text-red-500"
                >
                  Delete
                </DropdownItem>
              </Dropdown>
            </div>
          );
        },
      },
    ],
    [isAllVisibleSelected, selectedIds, filteredRotas]
  );

  if (mode === "create") {
    return (
      <CreateRotaView
        initialRota={activeRota}
        onCancel={() => {
          setActiveRota(null);
          setMode("main");
        }}
        onSave={handleSaveRota}
      />
    );
  }

  if (mode === "view" && activeRota) {
    return (
      <ViewRotaView
        rota={activeRota}
        onBack={() => {
          setActiveRota(null);
          setMode("main");
        }}
      />
    );
  }

  return (
    <div className="space-y-6">
      <Breadcrumb
        pageTitle="ROTA MANAGEMENT"
        subtext="Create, publish, and manage rotas across all regions"
        activePage="Rota management"
      />

      {/* 4 Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-100 flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#16A34A] flex items-center justify-center shrink-0">
            <ClipboardCheck className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[20px] font-bold text-[#2E3A59] leading-tight">
              {counts.approved}
            </p>
            <p className="text-[12px] text-slate-500">Approved</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-100 flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-sky-50 text-[#37AADF] flex items-center justify-center shrink-0">
            <ClipboardList className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[20px] font-bold text-[#2E3A59] leading-tight">
              {counts.published}
            </p>
            <p className="text-[12px] text-slate-500">Published</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-100 flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#F59E0B] flex items-center justify-center shrink-0">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[20px] font-bold text-[#2E3A59] leading-tight">
              {counts.locked}
            </p>
            <p className="text-[12px] text-slate-500">Locked</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-100 flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-500 flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[20px] font-bold text-[#2E3A59] leading-tight">
              {counts.draft}
            </p>
            <p className="text-[12px] text-slate-500">Draft rotas</p>
          </div>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="bg-white rounded-2xl p-6 border border-slate-100 space-y-5">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 flex-1 max-w-md">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-full h-10 pl-10 pr-4 rounded-full bg-[#F4F6F9] text-[13px] text-[#2E3A59] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#37AADF]/30"
              />
            </div>

            <button
              type="button"
              onClick={() => setViewMode("grid")}
              aria-label="Card view"
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                viewMode === "grid"
                  ? "bg-[#37AADF] text-white"
                  : "bg-[#F4F6F9] text-slate-500 hover:text-[#2E3A59]"
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => setViewMode("list")}
              aria-label="List view"
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                viewMode === "list"
                  ? "bg-[#37AADF] text-white"
                  : "bg-[#F4F6F9] text-slate-500 hover:text-[#2E3A59]"
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => {
                setActiveRota(null);
                setMode("create");
              }}
              className="h-10 px-4 rounded-full bg-[#F4F6F9] hover:bg-slate-200/70 text-[#2E3A59] text-[13px] font-medium inline-flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4 text-slate-500" />
              Import
            </button>

            <button
              type="button"
              onClick={handleExportCsv}
              className="h-10 px-4 rounded-full bg-[#F4F6F9] hover:bg-slate-200/70 text-[#2E3A59] text-[13px] font-medium inline-flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Upload className="w-4 h-4 text-slate-500" />
              Export
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveRota(null);
                setMode("create");
              }}
              className="h-10 px-4 rounded-full bg-[#37AADF] hover:bg-[#2F99CA] text-white text-[13px] font-medium inline-flex items-center gap-2 transition-colors cursor-pointer"
            >
              <span className="w-4 h-4 rounded-full bg-white/25 flex items-center justify-center">
                <Plus className="w-3 h-3 text-white" />
              </span>
              Add new
            </button>
          </div>
        </div>

        {/* Content */}
        {viewMode === "grid" ? (
          <div className="space-y-4">
            {filteredRotas.map((rota) => (
              <div
                key={rota.id}
                className="rounded-xl border border-slate-100 p-5 bg-white hover:border-slate-200 transition-colors"
              >
                <div className="flex items-center gap-2.5 mb-3">
                  <h3 className="text-[14px] font-bold text-[#2E3A59]">
                    {rota.title}
                  </h3>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[11px] font-medium ${STATUS_BADGE[rota.status]}`}
                  >
                    {rota.status}
                  </span>
                </div>

                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 flex-1 text-[12px]">
                    <div>
                      <p className="text-slate-400 text-[11px]">Period</p>
                      <p className="font-semibold text-[#2E3A59] mt-0.5">
                        {rota.period}
                      </p>
                    </div>
                    <div>
                      <p className="text-slate-400 text-[11px]">Staff</p>
                      <p className="font-semibold text-[#2E3A59] mt-0.5">
                        {rota.staffCount} people
                      </p>
                    </div>
                    <div>
                      <p className="text-slate-400 text-[11px]">Shifts</p>
                      <p className="font-semibold text-[#2E3A59] mt-0.5">
                        {rota.shiftsCount} shifts
                      </p>
                    </div>
                    <div>
                      <p className="text-slate-400 text-[11px]">Coverage</p>
                      <p className="font-semibold text-[#16A34A] mt-0.5">
                        {rota.coverage}%
                      </p>
                    </div>
                    <div>
                      <p className="text-slate-400 text-[11px]">Created by</p>
                      <p className="font-semibold text-[#2E3A59] mt-0.5">
                        {rota.createdBy}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveRota(rota);
                        setMode("view");
                      }}
                      className="h-9 px-4 rounded-full bg-[#F4F6F9] hover:bg-slate-200/70 text-[#2E3A59] text-[12px] font-medium inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5 text-slate-600" />
                      View
                    </button>

                    {rota.status === "Draft" && (
                      <button
                        type="button"
                        onClick={() => {
                          setActiveRota(rota);
                          setMode("create");
                        }}
                        className="h-9 px-4 rounded-full bg-[#37AADF] hover:bg-[#2F99CA] text-white text-[12px] font-medium inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Edit className="w-3.5 h-3.5" />
                        Edit
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <DataTable columns={columns} data={filteredRotas} />
        )}
      </div>
    </div>
  );
}
