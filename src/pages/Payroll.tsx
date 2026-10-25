import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { ColumnDef } from "@tanstack/react-table";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { DataTable } from "@/components/ui/DataTable";
import { Dropdown, DropdownItem } from "@/components/ui/Dropdown";
import { Search, Download, Upload, MoreVertical, FileText, CheckCircle, Eye, ChevronRight, Calendar, DollarSign, Users, Plus } from "lucide-react";
import { PaymentStatusModal } from "@/components/payroll/PaymentStatusModal";

interface PayrollCycle {
  id: string;
  cycle: string;
  period: string;
  staffCount: string;
  totalAmount: string;
  paymentDate: string;
  status: "Approved" | "Pending" | "Locked";
}

const MOCK_CYCLES: PayrollCycle[] = [
  { id: "1", cycle: "February 2024 - Cycle 1", period: "Feb 1 - Feb 15, 2024", staffCount: "156 people", totalAmount: "$245,320", paymentDate: "2/16/2024", status: "Approved" },
  { id: "2", cycle: "February 2024 - Cycle 2", period: "Feb 16 - Feb 29, 2024", staffCount: "154 people", totalAmount: "$238,450", paymentDate: "3/1/2024", status: "Pending" },
  { id: "3", cycle: "January 2024 - Final", period: "Jan 1 - Jan 31, 2024", staffCount: "158 people", totalAmount: "$252,180", paymentDate: "2/1/2024", status: "Locked" },
  { id: "4", cycle: "December 2023 - Final", period: "Dec 1 - Dec 31, 2023", staffCount: "158 people", totalAmount: "$252,180", paymentDate: "1/1/2024", status: "Approved" },
  { id: "5", cycle: "November 2023 - Final", period: "Nov 1 - Nov 30, 2023", staffCount: "158 people", totalAmount: "$252,180", paymentDate: "12/1/2023", status: "Approved" },
];

export default function Payroll() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"Payroll cycles" | "Employee payroll info">("Payroll cycles");
  const [isStatusOpen, setIsStatusOpen] = useState(false);

  const filtered = useMemo(() =>
    MOCK_CYCLES.filter((c) =>
      c.cycle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.period.toLowerCase().includes(searchQuery.toLowerCase())
    ),
    [searchQuery]
  );

  const columns = useMemo<ColumnDef<PayrollCycle>[]>(
    () => [
      {
        id: "select",
        header: () => (
          <div className="px-1">
            <input type="checkbox" className="rounded border-slate-300 text-[#38BDF8] focus:ring-[#38BDF8] cursor-pointer" />
          </div>
        ),
        cell: () => (
          <div className="px-1">
            <input type="checkbox" className="rounded border-slate-300 text-[#38BDF8] focus:ring-[#38BDF8] cursor-pointer" />
          </div>
        ),
        enableSorting: false,
      },
      {
        accessorKey: "cycle",
        header: "Cycle",
        cell: ({ row }) => <span className="font-semibold text-slate-800">{row.original.cycle}</span>,
      },
      {
        accessorKey: "period",
        header: "Period",
        cell: ({ row }) => <span className="text-slate-500 font-medium">{row.original.period}</span>,
      },
      {
        accessorKey: "staffCount",
        header: "Staff count",
        cell: ({ row }) => <span className="text-slate-500">{row.original.staffCount}</span>,
      },
      {
        accessorKey: "totalAmount",
        header: "Total amount",
        cell: ({ row }) => <span className="font-medium text-slate-700">{row.original.totalAmount}</span>,
      },
      {
        accessorKey: "paymentDate",
        header: "Payment date",
        cell: ({ row }) => <span className="text-slate-500">{row.original.paymentDate}</span>,
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const s = row.original.status;
          let color = "bg-green-500";
          if (s === "Pending") color = "bg-amber-400";
          if (s === "Locked") color = "bg-slate-300";
          return (
            <div className="flex items-center gap-2">
              <div className={`h-2 w-2 rounded-full ${color}`} />
              <span className="font-medium text-slate-700">{s}</span>
            </div>
          );
        },
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
              <DropdownItem icon={<Eye size={14} />} onClick={() => setIsStatusOpen(true)}>View details</DropdownItem>
              <DropdownItem icon={<FileText size={14} />} onClick={() => navigate("/payroll/reports")}>Report</DropdownItem>
              <DropdownItem icon={<CheckCircle size={14} />}>Approve</DropdownItem>
            </Dropdown>
          </div>
        ),
      },
    ],
    []
  );

  return (
    <div className="animate-fade-in duration-300 space-y-6">
      <Breadcrumb
        pageTitle="PAYROLL MANAGEMENT"
        subtext="Manage payroll cycles, generate reports, and process payments"
        activePage="Payroll management"
      />

      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="bg-white rounded-2xl p-5 flex items-start justify-between">
          <div className="flex gap-3 items-center">
            <div className="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
              <Calendar className="text-blue-500" size={20} />
            </div>
            <div>
              <p className="text-xl font-bold text-slate-800 leading-none mb-1.5">30 May, 2026</p>
              <p className="text-[12px] text-slate-400 font-medium">Next payroll date</p>
            </div>
          </div>
          <span className="text-[13px] font-bold text-blue-500 mt-1">
            8 days left
          </span>
        </div>
        
        <div className="bg-white rounded-2xl p-5 flex items-start justify-between">
          <div className="flex gap-3 items-center">
            <div className="h-10 w-10 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
              <DollarSign className="text-green-500" size={20} />
            </div>
            <div>
              <p className="text-xl font-bold text-slate-800 leading-none mb-1.5">$52,430.00</p>
              <p className="text-[12px] text-slate-400 font-medium">Total payroll (May)</p>
            </div>
          </div>
          <span className="text-[13px] font-bold text-green-500 mt-1">
            Total net pay
          </span>
        </div>
        
        <div className="bg-white rounded-2xl p-5 flex items-start justify-between">
          <div className="flex gap-3 items-center">
            <div className="h-10 w-10 rounded-xl bg-amber-50 flex items-center justify-center shrink-0">
              <Users className="text-amber-500" size={20} />
            </div>
            <div>
              <p className="text-xl font-bold text-slate-800 leading-none mb-1.5">25</p>
              <p className="text-[12px] text-slate-400 font-medium">Active employees</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl overflow-hidden flex flex-col">
        {/* Alert Banner */}
        <div className="px-4 pt-4">
          <div className="bg-[#FFF8E1] rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-5 w-5 rounded-full bg-amber-400 flex items-center justify-center shrink-0">
                <span className="text-white font-bold text-[11px]">!</span>
              </div>
              <p className="text-[13px] font-medium text-slate-700">2 employees are missing bank details</p>
            </div>
            <Link to="/payroll/employees" className="flex items-center gap-1 text-[13px] font-bold text-slate-800 hover:text-black transition-colors cursor-pointer">
              View employees
              <ChevronRight size={14} />
            </Link>
          </div> 
        </div>
        {/* Toolbar */}
        <div className="p-5 flex items-center justify-between gap-4">
          <div className="relative w-72">
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
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-1.5 h-10 px-5 rounded-full bg-[#FAFAFA] hover:bg-slate-100 border border-[#E7E7E7] text-slate-700 text-xs font-bold transition-all cursor-pointer">
              <Upload size={14} />
              <span>Import</span>
            </button>
            <button className="flex items-center gap-1.5 h-10 px-5 rounded-full bg-[#FAFAFA] hover:bg-slate-100 border border-[#E7E7E7] text-slate-700 text-xs font-bold transition-all cursor-pointer">
              <Download size={14} />
              <span>Export</span>
            </button>
            <button 
              onClick={() => navigate('/payroll/review')}
              className="flex items-center gap-1.5 h-10 px-5 rounded-full bg-[#38BDF8] hover:bg-[#2BA5DF] text-white text-xs font-bold transition-all cursor-pointer shadow-sm"
            >
              <Plus size={15} />
              <span>Run payroll</span>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="px-5 border-b border-slate-100 flex items-center gap-6">
          {(["Payroll cycles", "Employee payroll info"] as const).map((tab) => (
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
            <div className="py-20 text-center text-slate-400 text-sm">No payroll cycles found.</div>
          )}
        </div>
      </div>

      <PaymentStatusModal 
        isOpen={isStatusOpen} 
        onClose={() => setIsStatusOpen(false)} 
      />
    </div>
  );
}
