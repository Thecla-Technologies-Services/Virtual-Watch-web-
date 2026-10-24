import React, { useState, useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/DataTable";
import { Dropdown, DropdownItem } from "@/components/ui/Dropdown";
import {
  INITIAL_REQUESTED_ITEMS,
  type RequestedItem,
} from "@/constants/expenses";
import { AddRequestedItemModal } from "@/components/expenses/AddRequestedItemModal";
import {
  Search,
  ChevronDown,
  Plus,
  Check,
  X,
  MoreVertical,
  FileText,
  PackageCheck,
} from "lucide-react";

export function RequestedItemsTab() {
  const [requestedItems, setRequestedItems] = useState<RequestedItem[]>(
    INITIAL_REQUESTED_ITEMS
  );
  const [requestedSearchQuery, setRequestedSearchQuery] = useState("");
  const [selectedRequestedIds, setSelectedRequestedIds] = useState<Set<string>>(
    new Set()
  );
  const [requestedStatusFilter, setRequestedStatusFilter] = useState<string>("All");
  const [requestedCategoryFilter, setRequestedCategoryFilter] =
    useState<string>("All categories");

  const [isAddRequestedModalOpen, setIsAddRequestedModalOpen] = useState(false);

  // --- Filtering & Selection ---
  const filteredRequestedItems = useMemo(() => {
    return requestedItems.filter((item) => {
      const matchesSearch =
        item.item.toLowerCase().includes(requestedSearchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(requestedSearchQuery.toLowerCase()) ||
        item.requestedBy.toLowerCase().includes(requestedSearchQuery.toLowerCase());

      const matchesStatus =
        requestedStatusFilter === "All"
          ? true
          : requestedStatusFilter === "Pending only" || requestedStatusFilter === "Pending"
          ? item.status === "Pending" || item.status === "Submitted" || item.status === "Status"
          : item.status === requestedStatusFilter;

      const matchesCategory =
        requestedCategoryFilter === "All categories"
          ? true
          : item.category === requestedCategoryFilter;

      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [requestedItems, requestedSearchQuery, requestedStatusFilter, requestedCategoryFilter]);

  const handleSelectAllRequested = (checked: boolean) => {
    if (checked) {
      setSelectedRequestedIds(new Set(filteredRequestedItems.map((i) => i.id)));
    } else {
      setSelectedRequestedIds(new Set());
    }
  };

  const handleSelectOneRequested = (id: string, checked: boolean) => {
    const newSelected = new Set(selectedRequestedIds);
    if (checked) {
      newSelected.add(id);
    } else {
      newSelected.delete(id);
    }
    setSelectedRequestedIds(newSelected);
  };

  const isAllRequestedSelected =
    filteredRequestedItems.length > 0 &&
    selectedRequestedIds.size === filteredRequestedItems.length;

  const handleRequestedApprove = (id: string) => {
    setRequestedItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: "Approved" } : item))
    );
  };

  const handleRequestedReject = (id: string) => {
    setRequestedItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: "Rejected" } : item))
    );
  };

  const handleRequestedInstock = (id: string) => {
    setRequestedItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: "Approved" } : item))
    );
  };

  // --- Columns ---
  const requestedColumns = useMemo<ColumnDef<RequestedItem>[]>(
    () => [
      {
        id: "select",
        header: () => (
          <div className="px-1">
            <input
              type="checkbox"
              className="rounded border-slate-300 text-[#38BDF8] focus:ring-[#38BDF8] cursor-pointer"
              checked={isAllRequestedSelected}
              onChange={(e) => handleSelectAllRequested(e.target.checked)}
            />
          </div>
        ),
        cell: ({ row }) => (
          <div className="px-1">
            <input
              type="checkbox"
              className="rounded border-slate-300 text-[#38BDF8] focus:ring-[#38BDF8] cursor-pointer"
              checked={selectedRequestedIds.has(row.original.id)}
              onChange={(e) =>
                handleSelectOneRequested(row.original.id, e.target.checked)
              }
            />
          </div>
        ),
        enableSorting: false,
      },
      {
        accessorKey: "date",
        header: "Date",
        cell: ({ row }) => <span>{row.original.date}</span>,
      },
      {
        accessorKey: "item",
        header: "Item",
        cell: ({ row }) => (
          <span className="font-semibold">{row.original.item}</span>
        ),
      },
      {
        accessorKey: "category",
        header: "Category",
        cell: ({ row }) => <span>{row.original.category}</span>,
      },
      {
        accessorKey: "qtyOrdered",
        header: "Qty Ord.",
        cell: ({ row }) => <span>{row.original.qtyOrdered}</span>,
      },
      {
        accessorKey: "requestedBy",
        header: "Requested by",
        cell: ({ row }) => <span>{row.original.requestedBy}</span>,
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const status = row.original.status;
          let dotColorClass = "bg-[#36C328]";
          if (status === "Pending" || status === "Submitted" || status === "Status") {
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
                  onClick={() => handleRequestedInstock(item.id)}
                  icon={<PackageCheck size={14} className="text-[#38BDF8]" />}
                >
                  Instock
                </DropdownItem>

                <DropdownItem
                  onClick={() => handleRequestedApprove(item.id)}
                  icon={<Check size={14} className="text-[#36C328]" />}
                >
                  Approve
                </DropdownItem>

                <DropdownItem
                  onClick={() => handleRequestedReject(item.id)}
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
    [isAllRequestedSelected, selectedRequestedIds]
  );

  return (
    <div className="flex-1 flex flex-col min-h-0">
      {/* Toolbar */}
      <div className="p-5 border-b flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 w-full sm:w-auto flex-wrap">
          <div className="relative w-full sm:w-64">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Search size={16} className="text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Search..."
              value={requestedSearchQuery}
              onChange={(e) => setRequestedSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#FBFBFB] border rounded-full text-[13px] focus:outline-none focus:ring-1 focus:ring-[#38BDF8] focus:border-[#38BDF8] transition-all placeholder:text-slate-400"
            />
          </div>

          <Dropdown
            trigger={
              <button className="flex items-center justify-between gap-3 px-4 py-2 bg-[#FBFBFB] border rounded-full text-[13px] font-medium text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer min-w-[110px]">
                <span>
                  {requestedStatusFilter === "Pending only"
                    ? "Pending"
                    : requestedStatusFilter}
                </span>
                <ChevronDown size={14} className="text-slate-500" />
              </button>
            }
          >
            <DropdownItem onClick={() => setRequestedStatusFilter("All")}>
              All
            </DropdownItem>
            <DropdownItem onClick={() => setRequestedStatusFilter("Approved")}>
              Approved
            </DropdownItem>
            <DropdownItem onClick={() => setRequestedStatusFilter("Pending only")}>
              Pending only
            </DropdownItem>
            <DropdownItem onClick={() => setRequestedStatusFilter("Rejected")}>
              Rejected
            </DropdownItem>
          </Dropdown>

          <Dropdown
            trigger={
              <button className="flex items-center justify-between gap-3 px-4 py-2 bg-[#FBFBFB] border rounded-full text-[13px] font-medium text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer min-w-[150px]">
                <span>{requestedCategoryFilter}</span>
                <ChevronDown size={14} className="text-slate-500" />
              </button>
            }
          >
            <DropdownItem
              onClick={() => setRequestedCategoryFilter("All categories")}
            >
              All categories
            </DropdownItem>
            <DropdownItem
              onClick={() => setRequestedCategoryFilter("Vegetables")}
            >
              Vegetables
            </DropdownItem>
            <DropdownItem onClick={() => setRequestedCategoryFilter("Diary")}>
              Diary
            </DropdownItem>
            <DropdownItem onClick={() => setRequestedCategoryFilter("Bakery")}>
              Bakery
            </DropdownItem>
            <DropdownItem onClick={() => setRequestedCategoryFilter("Fruits")}>
              Fruits
            </DropdownItem>
          </Dropdown>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <button
            onClick={() => setIsAddRequestedModalOpen(true)}
            className="flex items-center justify-center gap-1.5 h-10 px-5 rounded-full bg-primary text-white text-xs font-semibold hover:bg-primary/95 transition-all cursor-pointer"
          >
            <Plus size={15} />
            <span>Add entry</span>
          </button>
        </div>
      </div>

      {/* Sub-filter Status Tabs */}
      <div className="px-5 pt-5 border-b flex items-center gap-3 text-xs font-medium text-muted whitespace-nowrap overflow-x-auto no-scrollbar">
        <button
          type="button"
          onClick={() => setRequestedStatusFilter("All")}
          className={`px-3 py-3 rounded-t-lg transition-all cursor-pointer flex items-center gap-1.5 ${
            requestedStatusFilter === "All"
              ? "bg-[#EBF7FD] text-[#38BDF8] font-bold"
              : "text-muted hover:text-slate-700 hover:bg-slate-50 bg-transparent font-medium"
          }`}
        >
          All
        </button>
        <button
          type="button"
          onClick={() => setRequestedStatusFilter("Pending only")}
          className={`px-3 py-3 rounded-t-lg transition-all cursor-pointer flex items-center gap-1.5 ${
            requestedStatusFilter === "Pending only" ||
            requestedStatusFilter === "Pending"
              ? "bg-[#EBF7FD] text-[#38BDF8] font-bold"
              : "text-muted hover:text-slate-700 hover:bg-slate-50 bg-transparent font-medium"
          }`}
        >
          <span className="flex items-center justify-center h-4 w-4 bg-[#FEF5EA] text-[#F19E39] rounded-full font-extrabold text-[10px]">
            !
          </span>
          <span>Pending only</span>
        </button>
        <button
          type="button"
          onClick={() => setRequestedStatusFilter("Approved")}
          className={`px-3 py-3 rounded-t-lg transition-all cursor-pointer flex items-center gap-1.5 ${
            requestedStatusFilter === "Approved"
              ? "bg-[#EBF7FD] text-[#38BDF8] font-bold"
              : "text-muted hover:text-slate-700 hover:bg-slate-50 bg-transparent font-medium"
          }`}
        >
          <span className="flex items-center justify-center h-4 w-4 bg-[#E8F8EE] text-[#36C328] rounded-full font-extrabold text-[10px]">
            ✓
          </span>
          <span>Approved</span>
        </button>
        <button
          type="button"
          onClick={() => setRequestedStatusFilter("Rejected")}
          className={`px-3 py-3 rounded-t-lg transition-all cursor-pointer flex items-center gap-1.5 ${
            requestedStatusFilter === "Rejected"
              ? "bg-[#EBF7FD] text-[#38BDF8] font-bold"
              : "text-muted hover:text-slate-700 hover:bg-slate-50 bg-transparent font-medium"
          }`}
        >
          <span className="flex items-center justify-center h-4 w-4 bg-[#FFF6F5] text-[#FF1100] rounded-full font-extrabold text-[10px]">
            ✕
          </span>
          <span>Rejected</span>
        </button>
      </div>

      {/* Data Table */}
      <div className="flex-1 overflow-auto">
        {filteredRequestedItems.length > 0 ? (
          <DataTable
            columns={requestedColumns}
            data={filteredRequestedItems}
            pageSize={8}
          />
        ) : (
          <div className="py-20 flex flex-col items-center justify-center text-center">
            <div className="bg-slate-50 p-4 rounded-full mb-4">
              <FileText size={24} className="text-slate-400" />
            </div>
            <h3 className="text-sm font-bold mb-1">No items found</h3>
            <p className="text-xs text-muted max-w-sm">
              We couldn't find any requested item records matching your current
              filters.
            </p>
          </div>
        )}
      </div>

      {/* Add Modal */}
      <AddRequestedItemModal
        isOpen={isAddRequestedModalOpen}
        onClose={() => setIsAddRequestedModalOpen(false)}
      />
    </div>
  );
}
