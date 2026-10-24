import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import type { ColumnDef } from "@tanstack/react-table";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { DataTable } from "@/components/ui/DataTable";
import { Search, Download } from "lucide-react";

interface ReportRow {
  id: string;
  name: string;
  payslip: string;
  avatar?: string;
}

const MOCK_REPORTS: ReportRow[] = [
  { id: "1", name: "Alice Johnson", payslip: "May 2026 payslip" },
  { id: "2", name: "Bob Smith",     payslip: "May 2026 payslip" },
  { id: "3", name: "Carol Davis",   payslip: "May 2026 payslip" },
  { id: "4", name: "David Wilson",  payslip: "May 2026 payslip" },
  { id: "5", name: "Eve Martinez",  payslip: "May 2026 payslip" },
  { id: "6", name: "Bob Smith",     payslip: "May 2026 payslip" },
  { id: "7", name: "Bob Smith",     payslip: "May 2026 payslip" },
  { id: "8", name: "Bob Smith",     payslip: "May 2026 payslip" },
];

export default function PayrollReports() {
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = useMemo(() =>
    MOCK_REPORTS.filter((r) => r.name.toLowerCase().includes(searchQuery.toLowerCase())),
    [searchQuery]
  );

  const columns = useMemo<ColumnDef<ReportRow>[]>(
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
        accessorKey: "payslip",
        header: "Payslip",
        cell: ({ row }) => <span className="text-[#38BDF8] font-medium hover:underline cursor-pointer">{row.original.payslip}</span>,
      },
      {
        id: "download",
        header: "",
        cell: () => (
          <div className="flex justify-end pr-4">
            <button className="flex items-center gap-1.5 text-slate-500 hover:text-slate-700 font-medium text-[13px] transition-colors cursor-pointer">
              <Download size={14} />
              <span>Download</span>
            </button>
          </div>
        ),
      },
    ],
    []
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
          pageTitle="REPORTS"
          subtext="View payslips and payroll reports"
          activePage="Reports"
          breadcrumbs={[{ label: "Payroll management", path: "/payroll" }]}
        />
      </div>

      <div className="bg-white rounded-2xl overflow-hidden flex flex-col">
        {/* Toolbar */}
        <div className="p-5 flex items-center justify-between gap-4 border-b border-slate-50">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative w-72">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Search size={16} className="text-slate-400" />
              </div>
              <input
                type="text"
                placeholder="Search by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-[#FBFBFB] border border-[#E7E7E7] rounded-full text-[13px] focus:outline-none focus:ring-1 focus:ring-[#38BDF8] focus:border-[#38BDF8] transition-all placeholder:text-slate-400"
              />
            </div>
            
            <select className="px-4 py-2 bg-[#FAFAFA] border border-[#E7E7E7] rounded-full text-[13px] text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#38BDF8] focus:border-[#38BDF8] transition-all appearance-none cursor-pointer pr-8 bg-no-repeat bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2394a3b8%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[position:calc(100%-8px)_center] bg-[length:16px]">
              <option>All departments</option>
              <option>Design</option>
              <option>Engineering</option>
            </select>

            <select className="px-4 py-2 bg-[#FAFAFA] border border-[#E7E7E7] rounded-full text-[13px] text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#38BDF8] focus:border-[#38BDF8] transition-all appearance-none cursor-pointer pr-8 bg-no-repeat bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2394a3b8%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[position:calc(100%-8px)_center] bg-[length:16px]">
              <option>May 2026</option>
              <option>April 2026</option>
            </select>
          </div>

          <button className="h-10 px-6 rounded-full bg-[#38BDF8] hover:bg-[#2BA5DF] text-white text-[13px] font-bold transition-all cursor-pointer shadow-sm shrink-0">
            Download all payslips
          </button>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto">
          {filtered.length > 0 ? (
            <DataTable columns={columns} data={filtered} initialPageSize={8} />
          ) : (
            <div className="py-20 text-center text-slate-400 text-sm">No reports found.</div>
          )}
        </div>
      </div>
    </div>
  );
}
