import React, { useState, useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/DataTable";
import { Dropdown, DropdownItem } from "@/components/ui/Dropdown";
import {
  INITIAL_PETTY_CASH_ITEMS,
  type PettyCashItem,
} from "@/constants/expenses";
import { AddPettyCashModal } from "@/components/expenses/AddPettyCashModal";
import { ViewPettyCashModal } from "@/components/expenses/ViewPettyCashModal";
import {
  Search,
  ChevronDown,
  Download,
  Upload,
  Plus,
  Eye,
  Check,
  X,
  MoreVertical,
  FileText,
} from "lucide-react";

export function PettyCashTab() {
  const [pettyCashItems, setPettyCashItems] = useState<PettyCashItem[]>(
    INITIAL_PETTY_CASH_ITEMS
  );
  const [pettySearchQuery, setPettySearchQuery] = useState("");
  const [selectedPettyIds, setSelectedPettyIds] = useState<Set<string>>(
    new Set()
  );
  const [activePettyCategory, setActivePettyCategory] = useState<
    "All" | "Supplies" | "Travel" | "Equipment" | "Training" | "Other"
  >("All");
  const [pettyStatusFilter, setPettyStatusFilter] =
    useState<string>("All statuses");

  const [isAddPettyModalOpen, setIsAddPettyModalOpen] = useState(false);
  const [isViewPettyModalOpen, setIsViewPettyModalOpen] = useState(false);
  const [selectedPettyItem, setSelectedPettyItem] =
    useState<PettyCashItem | null>(null);

  // --- Filtering & Selection ---
  const filteredPettyItems = useMemo(() => {
    return pettyCashItems.filter((item) => {
      const matchesSearch =
        item.description.toLowerCase().includes(pettySearchQuery.toLowerCase()) ||
        item.submittedBy.toLowerCase().includes(pettySearchQuery.toLowerCase()) ||
        item.type.toLowerCase().includes(pettySearchQuery.toLowerCase()) ||
        item.amount.toLowerCase().includes(pettySearchQuery.toLowerCase());

      const matchesCategory =
        activePettyCategory === "All"
          ? true
          : item.category === activePettyCategory;

      const matchesStatus =
        pettyStatusFilter === "All statuses"
          ? true
          : item.status === pettyStatusFilter;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [pettyCashItems, pettySearchQuery, activePettyCategory, pettyStatusFilter]);

  const handleSelectAllPetty = (checked: boolean) => {
    if (checked) {
      setSelectedPettyIds(new Set(filteredPettyItems.map((i) => i.id)));
    } else {
      setSelectedPettyIds(new Set());
    }
  };

  const handleSelectOnePetty = (id: string, checked: boolean) => {
    const newSelected = new Set(selectedPettyIds);
    if (checked) {
      newSelected.add(id);
    } else {
      newSelected.delete(id);
    }
    setSelectedPettyIds(newSelected);
  };

  const isAllPettySelected =
    filteredPettyItems.length > 0 &&
    selectedPettyIds.size === filteredPettyItems.length;

  const handlePettyApprove = (id: string) => {
    setPettyCashItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: "Approved" } : item
      )
    );
  };

  const handlePettyReject = (id: string) => {
    setPettyCashItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: "Rejected" } : item
      )
    );
  };

  // --- Columns ---
  const pettyColumns = useMemo<ColumnDef<PettyCashItem>[]>(
    () => [
      {
        id: "select",
        header: () => (
          <div className="px-1">
            <input
              type="checkbox"
              className="rounded border-slate-300 text-[#38BDF8] focus:ring-[#38BDF8] cursor-pointer"
              checked={isAllPettySelected}
              onChange={(e) => handleSelectAllPetty(e.target.checked)}
            />
          </div>
        ),
        cell: ({ row }) => (
          <div className="px-1">
            <input
              type="checkbox"
              className="rounded border-slate-300 text-[#38BDF8] focus:ring-[#38BDF8] cursor-pointer"
              checked={selectedPettyIds.has(row.original.id)}
              onChange={(e) =>
                handleSelectOnePetty(row.original.id, e.target.checked)
              }
            />
          </div>
        ),
        enableSorting: false,
      },
      {
        accessorKey: "description",
        header: "Description",
        cell: ({ row }) => (
          <span className="font-semibold">{row.original.description}</span>
        ),
      },
      {
        accessorKey: "type",
        header: "Type",
        cell: ({ row }) => <span>{row.original.type}</span>,
      },
      {
        accessorKey: "amount",
        header: "Amount",
        cell: ({ row }) => (
          <span className="font-medium">{row.original.amount}</span>
        ),
      },
      {
        accessorKey: "submittedBy",
        header: "Submitted by",
        cell: ({ row }) => <span>{row.original.submittedBy}</span>,
      },
      {
        accessorKey: "date",
        header: "Date",
        cell: ({ row }) => <span>{row.original.date}</span>,
      },
      {
        accessorKey: "attachments",
        header: "Attachments",
        cell: ({ row }) => (
          <button
            onClick={() => {
              setSelectedPettyItem(row.original);
              setIsViewPettyModalOpen(true);
            }}
            className="text-[#38BDF8] font-medium hover:underline transition-all cursor-pointer"
          >
            View ({row.original.attachmentsCount || 1} file)
          </button>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const status = row.original.status;
          let dotColorClass = "bg-[#36C328]";
          if (status === "Pending") {
            dotColorClass = "bg-[#F19E39]";
          } else if (status === "Rejected") {
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
      {
        id: "actions",
        header: "",
        cell: ({ row }) => {
          const item = row.original;
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
                    setSelectedPettyItem(item);
                    setIsViewPettyModalOpen(true);
                  }}
                  icon={<Eye size={14} />}
                >
                  View details
                </DropdownItem>

                <DropdownItem
                  onClick={() => handlePettyApprove(item.id)}
                  icon={<Check size={14} className="text-[#36C328]" />}
                >
                  Approve
                </DropdownItem>

                <DropdownItem
                  onClick={() => handlePettyReject(item.id)}
                  icon={<X size={14} className="text-[#FF1100]" />}
                >
                  Reject
                </DropdownItem>
              </Dropdown>
            </div>
          );
        },
      },
    ],
    [isAllPettySelected, selectedPettyIds]
  );

  return (
    <div className="flex-1 flex flex-col min-h-0">
      {/* Toolbar */}
      <div className="p-5 border-b flex flex-col sm:flex-row items-center justify-between gap-4 mt-2">
        <div className="flex items-center gap-3 w-full sm:w-auto flex-wrap">
          <div className="relative w-full sm:w-64">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Search size={16} className="text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Search..."
              value={pettySearchQuery}
              onChange={(e) => setPettySearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#FBFBFB] border rounded-full text-[13px] focus:outline-none focus:ring-1 focus:ring-[#38BDF8] focus:border-[#38BDF8] transition-all placeholder:text-slate-400"
            />
          </div>

          <Dropdown
            trigger={
              <button className="flex items-center justify-between gap-3 px-4 py-2 bg-[#FBFBFB] border rounded-full text-[13px] font-medium text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer min-w-[130px]">
                <span>{pettyStatusFilter}</span>
                <ChevronDown size={14} className="text-slate-500" />
              </button>
            }
          >
            <DropdownItem onClick={() => setPettyStatusFilter("All statuses")}>
              All statuses
            </DropdownItem>
            <DropdownItem onClick={() => setPettyStatusFilter("Approved")}>
              Approved
            </DropdownItem>
            <DropdownItem onClick={() => setPettyStatusFilter("Pending")}>
              Pending
            </DropdownItem>
            <DropdownItem onClick={() => setPettyStatusFilter("Rejected")}>
              Rejected
            </DropdownItem>
          </Dropdown>
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
            onClick={() => setIsAddPettyModalOpen(true)}
            className="flex items-center justify-center gap-1.5 h-10 px-5 rounded-full bg-primary text-white text-xs font-semibold hover:bg-primary/95 transition-all cursor-pointer"
          >
            <Plus size={15} />
            <span>Add new</span>
          </button>
        </div>
      </div>

      {/* Sub-filter Category Tabs & Status Badges */}
      <div className="px-5 pt-4 border-b flex items-center justify-between overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-2">
          {(
            [
              "All",
              "Supplies",
              "Travel",
              "Equipment",
              "Training",
              "Other",
            ] as const
          ).map((cat) => {
            const isActive = activePettyCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActivePettyCategory(cat)}
                className={`px-6 py-1.5 rounded-t-lg text-[13px] transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? "bg-[#EBF7FD] text-[#38BDF8] font-bold"
                    : "text-slate-400 hover:text-slate-700 font-medium bg-transparent"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        <div className="hidden xl:flex items-center gap-5 text-xs font-medium text-muted mb-1 pr-2 whitespace-nowrap">
          <span className="px-3 py-1 rounded-lg bg-[#EBF7FD] text-[#38BDF8] font-bold">
            All
          </span>
          <div className="flex items-center gap-1.5">
            <span className="flex items-center justify-center h-4 w-4 bg-[#FEF5EA] text-[#F19E39] rounded-full font-extrabold text-[10px]">
              !
            </span>
            <span>Pending only</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="flex items-center justify-center h-4 w-4 bg-[#E8F8EE] text-[#36C328] rounded-full font-extrabold text-[10px]">
              ✓
            </span>
            <span>Approved</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="flex items-center justify-center h-4 w-4 bg-[#FFF6F5] text-[#FF1100] rounded-full font-extrabold text-[10px]">
              ✕
            </span>
            <span>Rejected</span>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="flex-1 overflow-auto">
        {filteredPettyItems.length > 0 ? (
          <DataTable
            columns={pettyColumns}
            data={filteredPettyItems}
            pageSize={8}
          />
        ) : (
          <div className="py-20 flex flex-col items-center justify-center text-center">
            <div className="bg-slate-50 p-4 rounded-full mb-4">
              <FileText size={24} className="text-slate-400" />
            </div>
            <h3 className="text-sm font-bold mb-1">No items found</h3>
            <p className="text-xs text-muted max-w-sm">
              We couldn't find any petty cash records matching your current
              search filters.
            </p>
          </div>
        )}
      </div>

      {/* Modals */}
      <AddPettyCashModal
        isOpen={isAddPettyModalOpen}
        onClose={() => setIsAddPettyModalOpen(false)}
      />

      <ViewPettyCashModal
        isOpen={isViewPettyModalOpen}
        onClose={() => {
          setIsViewPettyModalOpen(false);
          setSelectedPettyItem(null);
        }}
        item={selectedPettyItem}
        onApprove={handlePettyApprove}
        onReject={handlePettyReject}
      />
    </div>
  );
}
