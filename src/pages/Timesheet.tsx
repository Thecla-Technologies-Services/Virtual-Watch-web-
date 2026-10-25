import { useState, useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { DataTable } from "@/components/ui/DataTable";
import { Dropdown, DropdownItem } from "@/components/ui/Dropdown";
import { Search, Download, MoreVertical, Eye, ClipboardList, Clock } from "lucide-react";

interface TimesheetRow {
  id: string;
  date: string;
  name: string;
  expectedHours: string;
  totalHours: string;
  task: string;
  totalAmount: string;
  status: "Completed" | "In-progress" | "Not started";
}

const MOCK_DATA: TimesheetRow[] = [
  { id: "1", date: "2/16/2024", name: "February 2024 - Cy...", expectedHours: "30h", totalHours: "156h", task: "----------", totalAmount: "$245,320", status: "Completed" },
  { id: "2", date: "3/1/2024", name: "February 2024 - Cy...", expectedHours: "Feb 16 - Feb 29, 202...", totalHours: "154 people", task: "----------", totalAmount: "$238,450", status: "In-progress" },
  { id: "3", date: "2/1/2024", name: "January 2024 - Final", expectedHours: "Jan 1 - Jan 31, 2024", totalHours: "158 people", task: "----------", totalAmount: "$252,180", status: "Not started" },
];

export default function Timesheet() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"Daily" | "Weekly" | "Monthly">("Daily");

  const filtered = useMemo(() =>
    MOCK_DATA.filter((r) => r.name.toLowerCase().includes(searchQuery.toLowerCase())),
    [searchQuery]
  );

  const columns = useMemo<ColumnDef<TimesheetRow>[]>(
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
        accessorKey: "date",
        header: "Date",
        cell: ({ row }) => <span className="font-medium text-slate-700">{row.original.date}</span>,
      },
      {
        accessorKey: "name",
        header: "Name of staff",
        cell: ({ row }) => <span className="font-semibold text-slate-800">{row.original.name}</span>,
      },
      {
        accessorKey: "expectedHours",
        header: "Expected hours",
        cell: ({ row }) => <span className="text-slate-500">{row.original.expectedHours}</span>,
      },
      {
        accessorKey: "totalHours",
        header: "Total hours",
        cell: ({ row }) => <span className="text-slate-500">{row.original.totalHours}</span>,
      },
      {
        accessorKey: "task",
        header: "Task",
        cell: ({ row }) => <span className="text-slate-400">{row.original.task}</span>,
      },
      {
        accessorKey: "totalAmount",
        header: "Total amount",
        cell: ({ row }) => <span className="font-medium text-slate-700">{row.original.totalAmount}</span>,
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const s = row.original.status;
          let color = "bg-green-500";
          if (s === "In-progress") color = "bg-amber-400";
          if (s === "Not started") color = "bg-slate-400";
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
                <button className="p-1.5 bg-slate-100 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer">
                  <MoreVertical size={16} />
                </button>
              }
            >
              <DropdownItem icon={<Eye size={14} />} onClick={() => navigate("/timesheet/details")}>View details</DropdownItem>
            </Dropdown>
          </div>
        ),
      },
    ],
    [navigate]
  );

  return (
    <div className="animate-fade-in duration-300 space-y-6">
      <Breadcrumb
        pageTitle="TIMESHEET"
        subtext="xxxxxxxxxxxxxxxxxxxxx"
        activePage="Timesheet"
      />

      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white rounded-2xl p-6 flex items-start border border-slate-50">
          <div className="flex gap-4 items-center w-full">
            <div className="h-12 w-12 rounded-[14px] bg-[#E0F2FE] flex items-center justify-center shrink-0">
              <ClipboardList className="text-[#0EA5E9]" size={24} />
            </div>
            <div>
              <p className="text-[22px] font-semibold text-slate-800 leading-none mb-1.5">424</p>
              <p className="text-[13px] text-slate-400 font-medium">Total number of staff</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 flex items-start border border-slate-50">
          <div className="flex gap-4 items-center w-full">
            <div className="h-12 w-12 rounded-[14px] bg-[#DCFCE7] flex items-center justify-center shrink-0">
              <Clock className="text-[#22C55E]" size={24} />
            </div>
            <div>
              <p className="text-[22px] font-semibold text-slate-800 leading-none mb-1.5">30h</p>
              <p className="text-[13px] text-slate-400 font-medium">Expected hours / week</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 flex items-start border border-slate-50">
          <div className="flex gap-4 items-center w-full">
            <div className="h-12 w-12 rounded-[14px] bg-[#FEF3C7] flex items-center justify-center shrink-0">
              <ClipboardList className="text-[#F59E0B]" size={24} />
            </div>
            <div>
              <p className="text-[22px] font-semibold text-slate-800 leading-none mb-1.5">124h</p>
              <p className="text-[13px] text-slate-400 font-medium">total hours worked</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 flex items-start border border-slate-50">
          <div className="flex gap-4 items-center w-full">
            <div className="h-12 w-12 rounded-[14px] bg-[#FCE7F3] flex items-center justify-center shrink-0">
              <ClipboardList className="text-[#EC4899]" size={24} />
            </div>
            <div>
              <p className="text-[22px] font-semibold text-slate-800 leading-none mb-1.5">$2.1M</p>
              <p className="text-[13px] text-slate-400 font-medium">Total base pay</p>
            </div>
          </div>
        </div>
      </div>

     

      <div className="bg-white rounded-2xl overflow-hidden flex flex-col mt-2">
         {/* Toolbar - Outside White Container */}
        <div className="flex items-center justify-between gap-4 pt-2">
          <div className="relative w-72">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search size={16} className="text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-white border-none rounded-full text-[13px] focus:outline-none focus:ring-1 focus:ring-[#38BDF8] transition-all placeholder:text-slate-400"
            />
          </div>
          
          <button className="flex items-center gap-2 h-10 px-5 rounded-full bg-white hover:bg-slate-50 border-none text-slate-700 text-[13px] font-bold transition-all cursor-pointer">
            <Download size={15} className="text-[#38BDF8]" />
            <span>Export</span>
          </button>
        </div>
        {/* Tabs */}
        <div className="pt-4 px-6 border-b border-slate-100 flex items-center gap-8">
          {(["Daily", "Weekly", "Monthly"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 text-[13px] font-bold border-b-2 transition-all cursor-pointer ${
                activeTab === tab
                  ? "border-[#38BDF8] text-[#38BDF8]"
                  : "border-transparent text-slate-400 hover:text-slate-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-auto bg-white pt-2">
          {filtered.length > 0 ? (
            <DataTable columns={columns} data={filtered} initialPageSize={8} />
          ) : (
            <div className="py-20 text-center text-slate-400 text-sm">No timesheets found.</div>
          )}
        </div>
      </div>
    </div>
  );
}
