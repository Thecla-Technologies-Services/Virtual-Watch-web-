import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import type { ColumnDef } from "@tanstack/react-table";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { DataTable } from "@/components/ui/DataTable";
import { Dropdown, DropdownItem } from "@/components/ui/Dropdown";
import { AddEmployeeModal } from "@/components/payroll/AddEmployeeModal";
import { Search, Plus, MoreVertical, Edit, Eye, Archive } from "lucide-react";

interface Employee {
  id: string;
  name: string;
  email: string;
  role: string;
  salary: string;
  bankStatus: "Active" | "Inactive" | "Fix";
  joinDate: string;
  avatar?: string;
}

const MOCK_EMPLOYEES: Employee[] = [
  { id: "1", name: "Alice Johnson", email: "alice@example.com", role: "Manager", salary: "£4,000.00", bankStatus: "Active", joinDate: "1/15/2023" },
  { id: "2", name: "Bob Smith", email: "bob@example.com", role: "Staff", salary: "South region", bankStatus: "Active", joinDate: "2/20/2023" },
  { id: "3", name: "Carol Davis", email: "carol@example.com", role: "Supervisor", salary: "£3,200.00", bankStatus: "Inactive", joinDate: "11/10/2022" },
  { id: "4", name: "David Wilson", email: "david@example.com", role: "Staff", salary: "£5,500.00", bankStatus: "Active", joinDate: "3/5/2023" },
  { id: "5", name: "Eve Martinez", email: "eve@example.com", role: "Manager", salary: "£3,000.00", bankStatus: "Fix", joinDate: "12/1/2022" },
  { id: "6", name: "Bob Smith", email: "bob@example.com", role: "HR", salary: "£2,600.00", bankStatus: "Active", joinDate: "2/20/2023" },
  { id: "7", name: "Bob Smith", email: "bob@example.com", role: "Designer", salary: "£4,000.00", bankStatus: "Active", joinDate: "2/20/2023" },
  { id: "8", name: "Bob Smith", email: "bob@example.com", role: "Developer", salary: "£4,000.00", bankStatus: "Active", joinDate: "2/20/2023" },
];

export default function PayrollEmployees() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"All" | "Archive">("All");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const filtered = useMemo(() =>
    MOCK_EMPLOYEES.filter((e) =>
      e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.email.toLowerCase().includes(searchQuery.toLowerCase())
    ),
    [searchQuery]
  );

  const isAllSelected = filtered.length > 0 && selectedIds.size === filtered.length;

  const handleSelectAll = (checked: boolean) =>
    setSelectedIds(checked ? new Set(filtered.map((u) => u.id)) : new Set());
  const handleSelectOne = (id: string, checked: boolean) => {
    const next = new Set(selectedIds);
    checked ? next.add(id) : next.delete(id);
    setSelectedIds(next);
  };

  const columns = useMemo<ColumnDef<Employee>[]>(
    () => [
      {
        id: "select",
        header: () => (
          <div className="px-1">
            <input type="checkbox" className="rounded border-slate-300 text-[#38BDF8] focus:ring-[#38BDF8] cursor-pointer"
              checked={isAllSelected} onChange={(e) => handleSelectAll(e.target.checked)} />
          </div>
        ),
        cell: ({ row }) => (
          <div className="px-1">
            <input type="checkbox" className="rounded border-slate-300 text-[#38BDF8] focus:ring-[#38BDF8] cursor-pointer"
              checked={selectedIds.has(row.original.id)} onChange={(e) => handleSelectOne(row.original.id, e.target.checked)} />
          </div>
        ),
        enableSorting: false,
      },
      {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center text-[12px] font-bold text-slate-500 shrink-0">
              {row.original.name.charAt(0)}
            </div>
            <span className="font-semibold text-slate-800">{row.original.name}</span>
          </div>
        ),
      },
      {
        accessorKey: "email",
        header: "Email",
        cell: ({ row }) => <span className="text-slate-500">{row.original.email}</span>,
      },
      {
        accessorKey: "role",
        header: "Role",
        cell: ({ row }) => <span>{row.original.role}</span>,
      },
      {
        accessorKey: "salary",
        header: "Salary",
        cell: ({ row }) => <span className="font-medium text-slate-700">{row.original.salary}</span>,
      },
      {
        accessorKey: "bankStatus",
        header: "Bank status",
        cell: ({ row }) => {
          const s = row.original.bankStatus;
          let color = "bg-green-500";
          if (s === "Inactive") color = "bg-slate-300";
          if (s === "Fix") color = "bg-red-500";
          return (
            <div className="flex items-center gap-2">
              <div className={`h-2 w-2 rounded-full ${color}`} />
              <span className="font-medium text-slate-700">{s}</span>
            </div>
          );
        },
      },
      {
        accessorKey: "joinDate",
        header: "Join date",
        cell: ({ row }) => <span className="text-slate-500">{row.original.joinDate}</span>,
      },
      {
        id: "actions",
        header: "",
        cell: () => (
          <div className="flex justify-end pr-2">
            <Dropdown
              trigger={
                <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer">
                  <MoreVertical size={16} />
                </button>
              }
            >
              <DropdownItem icon={<Edit size={14} />}>Edit</DropdownItem>
              <DropdownItem icon={<Eye size={14} />}>View</DropdownItem>
              <DropdownItem icon={<Archive size={14} />}>Archive</DropdownItem>
            </Dropdown>
          </div>
        ),
      },
    ],
    [isAllSelected, selectedIds, filtered]
  );

  return (
    <div className="animate-fade-in duration-300 space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/payroll" className="h-8 w-8 rounded-full bg-white flex items-center justify-center text-slate-700 hover:bg-slate-50 shadow-sm shrink-0">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-4 w-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <Breadcrumb
          pageTitle="EMPLOYEES"
          subtext="Manage employees information and bank details"
          activePage="Employees"
          breadcrumbs={[{ label: "Payroll management", path: "/payroll" }]}
        />
      </div>

      <div className="bg-white rounded-2xl overflow-hidden flex flex-col">
        {/* Toolbar */}
        <div className="p-5 flex items-center justify-between gap-4">
          <div className="relative w-72">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Search size={16} className="text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#FBFBFB] border border-[#E7E7E7] rounded-full text-[13px] focus:outline-none focus:ring-1 focus:ring-[#38BDF8] focus:border-[#38BDF8] transition-all placeholder:text-slate-400"
            />
          </div>
          <button
            onClick={() => setIsAddOpen(true)}
            className="flex items-center gap-1.5 h-10 px-5 rounded-full bg-[#38BDF8] hover:bg-[#2BA5DF] text-white text-xs font-semibold transition-all cursor-pointer shadow-sm"
          >
            <Plus size={15} />
            <span>Add employee</span>
          </button>
        </div>

        {/* Tabs */}
        <div className="px-5 border-b border-slate-100 flex items-center gap-6">
          {(["All", "Archive"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-[13px] transition-all cursor-pointer border-b-2 ${
                activeTab === tab
                  ? "border-[#38BDF8] text-[#38BDF8] font-bold"
                  : "border-transparent text-slate-400 hover:text-slate-700 font-medium"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto">
          {filtered.length > 0 ? (
            <DataTable columns={columns} data={filtered} initialPageSize={8} />
          ) : (
            <div className="py-20 text-center text-slate-400 text-sm">No employees found.</div>
          )}
        </div>
      </div>

      <AddEmployeeModal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} />
    </div>
  );
}
