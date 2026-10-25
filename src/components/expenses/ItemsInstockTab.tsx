import { useState, useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/DataTable";
import { Dropdown, DropdownItem } from "@/components/ui/Dropdown";
import {
  INITIAL_INSTOCK_ITEMS,
  type InstockItem,
} from "@/constants/expenses";
import { AddInstockItemModal } from "@/components/expenses/AddInstockItemModal";
import { EditInstockModal } from "@/components/expenses/EditInstockModal";
import {
  Search,
  ChevronDown,
  Plus,
  MoreVertical,
  FileText,
  Edit,
  PackageCheck,
} from "lucide-react";

export function ItemsInstockTab() {
  const [instockItems, setInstockItems] = useState<InstockItem[]>(
    INITIAL_INSTOCK_ITEMS
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [categoryFilter, setCategoryFilter] = useState<string>("All categories");

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<InstockItem | null>(null);

  const handleUpdateItem = (updatedItem: InstockItem) => {
    setInstockItems((prev) =>
      prev.map((i) => (i.id === updatedItem.id ? updatedItem : i))
    );
  };

  // --- Filtering & Selection ---
  const filteredItems = useMemo(() => {
    return instockItems.filter((item) => {
      const matchesSearch =
        item.item.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.requestedBy.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        categoryFilter === "All categories"
          ? true
          : item.category === categoryFilter;

      return matchesSearch && matchesCategory;
    });
  }, [instockItems, searchQuery, categoryFilter]);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(new Set(filteredItems.map((i) => i.id)));
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
    filteredItems.length > 0 && selectedIds.size === filteredItems.length;

  // --- Columns ---
  const columns = useMemo<ColumnDef<InstockItem>[]>(
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
        accessorKey: "qtyDelivered",
        header: "Qty Del.",
        cell: ({ row }) => {
          const ordered = row.original.qtyOrdered;
          const delivered = row.original.qtyDelivered;
          const isDeficit = delivered < ordered;
          return (
            <span
              className={`font-semibold ${
                isDeficit ? "text-[#FF1100]" : "text-[#36C328]"
              }`}
            >
              {delivered}
            </span>
          );
        },
      },
      {
        accessorKey: "useBefore",
        header: "Use before",
        cell: ({ row }) => {
          const dateStr = row.original.useBefore;
          const isNone = dateStr === "----" || dateStr === "-";
          return (
            <span
              className={`${
                isNone ? "text-slate-400 font-normal" : "text-[#FF1100] font-medium"
              }`}
            >
              {dateStr}
            </span>
          );
        },
      },
      {
        accessorKey: "unitPrice",
        header: "Unit price",
        cell: ({ row }) => <span>{row.original.unitPrice}</span>,
      },
      {
        accessorKey: "total",
        header: "Total",
        cell: ({ row }) => (
          <span className="font-semibold text-[#36C328]">
            {row.original.total}
          </span>
        ),
      },
      {
        accessorKey: "requestedBy",
        header: "Requested by",
        cell: ({ row }) => <span>{row.original.requestedBy}</span>,
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
                    setSelectedItem(item);
                    setIsEditModalOpen(true);
                  }}
                  icon={<Edit size={14} className="text-slate-600" />}
                >
                  Edit
                </DropdownItem>
                <DropdownItem
                  onClick={() => {}}
                  icon={<PackageCheck size={14} className="text-[#38BDF8]" />}
                >
                  Instock
                </DropdownItem>
              </Dropdown>
            </div>
          );
        },
      },
    ],
    [isAllSelected, selectedIds]
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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#FBFBFB] border rounded-full text-[13px] focus:outline-none focus:ring-1 focus:ring-[#38BDF8] focus:border-[#38BDF8] transition-all placeholder:text-slate-400"
            />
          </div>

          <Dropdown
            trigger={
              <button className="flex items-center justify-between gap-3 px-4 py-2 bg-[#FBFBFB] border rounded-full text-[13px] font-medium text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer min-w-[90px]">
                <span>{statusFilter}</span>
                <ChevronDown size={14} className="text-slate-500" />
              </button>
            }
          >
            <DropdownItem onClick={() => setStatusFilter("All")}>
              All
            </DropdownItem>
            <DropdownItem onClick={() => setStatusFilter("Instock")}>
              Instock
            </DropdownItem>
            <DropdownItem onClick={() => setStatusFilter("Low stock")}>
              Low stock
            </DropdownItem>
          </Dropdown>

          <Dropdown
            trigger={
              <button className="flex items-center justify-between gap-3 px-4 py-2 bg-[#FBFBFB] border rounded-full text-[13px] font-medium text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer min-w-[150px]">
                <span>{categoryFilter}</span>
                <ChevronDown size={14} className="text-slate-500" />
              </button>
            }
          >
            <DropdownItem onClick={() => setCategoryFilter("All categories")}>
              All categories
            </DropdownItem>
            <DropdownItem onClick={() => setCategoryFilter("Vegetables")}>
              Vegetables
            </DropdownItem>
            <DropdownItem onClick={() => setCategoryFilter("Diary")}>
              Diary
            </DropdownItem>
            <DropdownItem onClick={() => setCategoryFilter("Bakery")}>
              Bakery
            </DropdownItem>
            <DropdownItem onClick={() => setCategoryFilter("Fruits")}>
              Fruits
            </DropdownItem>
            <DropdownItem
              onClick={() => setCategoryFilter("Cleaning product")}
            >
              Cleaning product
            </DropdownItem>
            <DropdownItem
              onClick={() => setCategoryFilter("Household items")}
            >
              Household items
            </DropdownItem>
          </Dropdown>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center justify-center gap-1.5 h-10 px-5 rounded-full bg-primary text-white text-xs font-semibold hover:bg-primary/95 transition-all cursor-pointer"
          >
            <Plus size={15} />
            <span>Add entry</span>
          </button>
        </div>
      </div>

      {/* Data Table */}
      <div className="flex-1 overflow-auto">
        {filteredItems.length > 0 ? (
          <>
            <DataTable columns={columns} data={filteredItems} initialPageSize={8} />
            {/* Grand total summary footer matching design */}
            <div className="px-6 py-4.5 border-t flex items-center justify-between text-sm font-extrabold bg-white text-slate-900">
              <span>Grand total</span>
              <div className="sm:pr-36 md:pr-44 lg:pr-56">
                <span className="text-[#36C328] font-extrabold text-sm">
                  £25.39
                </span>
              </div>
            </div>
          </>
        ) : (
          <div className="py-20 flex flex-col items-center justify-center text-center">
            <div className="bg-slate-50 p-4 rounded-full mb-4">
              <FileText size={24} className="text-slate-400" />
            </div>
            <h3 className="text-sm font-bold mb-1">No items found</h3>
            <p className="text-xs text-muted max-w-sm">
              We couldn't find any instock items matching your current filters.
            </p>
          </div>
        )}
      </div>

      {/* Add / Edit Modal */}
      <AddInstockItemModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />

      <EditInstockModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedItem(null);
        }}
        item={selectedItem}
        onSave={handleUpdateItem}
      />
    </div>
  );
}
