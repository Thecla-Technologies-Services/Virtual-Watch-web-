import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { ColumnDef } from "@tanstack/react-table";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { DataTable } from "@/components/ui/DataTable";
import { Dropdown, DropdownItem } from "@/components/ui/Dropdown";
import { MoreVertical, Edit } from "lucide-react";
import { ApprovePayrollModal } from "@/components/payroll/ApprovePayrollModal";
import { PaymentSuccessModal } from "@/components/payroll/PaymentSuccessModal";

interface ReviewRow {
  id: string;
  name: string;
  grossPay: string;
  deductions: string;
  netPay: string;
  avatar?: string;
}

const MOCK_REVIEW: ReviewRow[] = [
  { id: "1", name: "Alice Johnson", grossPay: "£4,000.00", deductions: "£4,000.00", netPay: "£4,000.00" },
  { id: "2", name: "Bob Smith",     grossPay: "South region", deductions: "South region", netPay: "South region" },
  { id: "3", name: "Carol Davis",   grossPay: "£3,200.00", deductions: "£3,200.00", netPay: "£3,200.00" },
  { id: "4", name: "David Wilson",  grossPay: "£5,500.00", deductions: "£5,500.00", netPay: "£5,500.00" },
  { id: "5", name: "Eve Martinez",  grossPay: "£3,000.00", deductions: "£3,000.00", netPay: "£3,000.00" },
  { id: "6", name: "Bob Smith",     grossPay: "£2,600.00", deductions: "£2,600.00", netPay: "£2,600.00" },
  { id: "7", name: "Bob Smith",     grossPay: "£4,000.00", deductions: "£4,000.00", netPay: "£4,000.00" },
  { id: "8", name: "Bob Smith",     grossPay: "£4,000.00", deductions: "£4,000.00", netPay: "£4,000.00" },
  { id: "9", name: "Bob Smith",     grossPay: "£4,000.00", deductions: "£4,000.00", netPay: "£4,000.00" },
];

export default function ReviewPayroll() {
  const navigate = useNavigate();
  const [isApproveOpen, setIsApproveOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  const handleApproveConfirm = () => {
    setIsApproveOpen(false);
    setTimeout(() => setIsSuccessOpen(true), 150); // slight delay for smooth transition
  };

  const handleSuccessSubmit = () => {
    setIsSuccessOpen(false);
    navigate("/payroll");
  };

  const columns = useMemo<ColumnDef<ReviewRow>[]>(
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
        accessorKey: "grossPay",
        header: "Gross pay",
        cell: ({ row }) => <span className="font-medium text-slate-700">{row.original.grossPay}</span>,
      },
      {
        accessorKey: "deductions",
        header: "Deductions",
        cell: ({ row }) => <span className="font-medium text-slate-700">{row.original.deductions}</span>,
      },
      {
        accessorKey: "netPay",
        header: "Net pay",
        cell: ({ row }) => <span className="font-medium text-slate-700">{row.original.netPay}</span>,
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
            </Dropdown>
          </div>
        ),
      },
    ],
    []
  );

  return (
    <div className="animate-fade-in duration-300 space-y-6 pb-20 relative">
      <div className="flex items-center gap-4">
        <Link to="/payroll" className="h-8 w-8 rounded-full bg-white flex items-center justify-center text-slate-700 hover:bg-slate-50 shadow-sm shrink-0">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-4 w-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <Breadcrumb
          pageTitle="REVIEW PAYROLL"
          subtext="Review, check errors and make any adjustments"
          activePage="Review payroll"
          breadcrumbs={[{ label: "Payroll management", path: "/payroll" }]}
        />
      </div>

      <div className="bg-white rounded-2xl overflow-hidden flex flex-col relative">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-[15px] font-bold text-slate-800">May 2026 payroll</h3>
            <p className="text-[13px] text-slate-500 font-medium">Payroll generated for May 2026</p>
          </div>
          <button 
            onClick={() => setIsApproveOpen(true)}
            className="px-6 py-2 bg-[#38BDF8] hover:bg-[#2BA5DF] text-white text-[13px] font-bold rounded-full transition-all cursor-pointer shadow-sm"
          >
            Approve payroll
          </button>
        </div>

        <div className="flex-1 overflow-auto">
          <DataTable columns={columns} data={MOCK_REVIEW} initialPageSize={10} />
        </div>

        {/* Footer totals row */}
        <div className="border-t border-slate-100 bg-white p-4 grid grid-cols-5 px-6 items-center">
          <div className="col-span-2 flex items-center gap-4 pl-[42px]">
            <span className="font-bold text-slate-800">Total</span>
          </div>
          <div className="font-bold text-slate-800 pl-4">£4,000.000</div>
          <div className="font-bold text-slate-800 pl-4">£4,000.000</div>
          <div className="font-bold text-slate-800 pl-4">£4,000.000</div>
        </div>
      </div>

      <ApprovePayrollModal 
        isOpen={isApproveOpen} 
        onClose={() => setIsApproveOpen(false)} 
        onConfirm={handleApproveConfirm} 
      />
      <PaymentSuccessModal 
        isOpen={isSuccessOpen} 
        onClose={() => setIsSuccessOpen(false)} 
        onSubmit={handleSuccessSubmit} 
      />
    </div>
  );
}
