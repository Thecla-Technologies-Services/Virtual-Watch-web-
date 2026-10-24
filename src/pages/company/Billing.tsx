import { useState, useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { DataTable } from "@/components/ui/DataTable";
import { Dropdown, DropdownItem } from "@/components/ui/Dropdown";
import { ViewInvoiceModal } from "@/components/billing/ViewInvoiceModal";
import { ChangePlanModal } from "@/components/billing/ChangePlanModal";
import {
  Search,
  MoreVertical,
  Eye,
  Download,
  Upload,
  RefreshCw,
  CreditCard,
} from "lucide-react";

/* ── Types ───────────────────────────────────────────── */
type InvoiceStatus = "Paid" | "Overdue" | "Refund";

interface BillingInvoice {
  id: string;
  invoice: string;
  date: string;
  amount: string;
  status: InvoiceStatus;
}

/* ── Mock data ───────────────────────────────────────── */
const MOCK_INVOICES: BillingInvoice[] = [
  { id: "1", invoice: "INV-2024-0072",  date: "Mar 12, 2024", amount: "$890.00", status: "Paid" },
  { id: "2", invoice: "quantum-retail", date: "Apr 5, 2024",  amount: "$890.00", status: "Refund" },
  { id: "3", invoice: "nordtech",       date: "Jun 18, 2024", amount: "$890.00", status: "Overdue" },
  { id: "4", invoice: "apex-logistics", date: "Jan 22, 2024", amount: "$890.00", status: "Overdue" },
  { id: "5", invoice: "bluewave-fin",   date: "Nov 3, 2023",  amount: "$890.00", status: "Paid" },
  { id: "6", invoice: "ironclad-sec",   date: "Sep 8, 2023",  amount: "$890.00", status: "Paid" },
];

const STATUS_CONFIG: Record<InvoiceStatus, { dot: string }> = {
  Paid:    { dot: "bg-green-500" },
  Overdue: { dot: "bg-amber-400" },
  Refund:  { dot: "bg-red-500" },
};

/* ── Current plan features ───────────────────────────── */
const PLAN_FEATURES = [
  "Unlimited users",
  "Priority support",
  "Advanced analytics",
  "API access",
  "Custom integrations",
];

/* ── Mock invoice detail for "view" ─────────────────── */
const MOCK_INVOICE_DETAIL = {
  invoiceNumber: "INV-2024-0072",
  status: "Paid" as const,
  billedTo: {
    company: "ABC Healthcare",
    address: "12 Innovation Drive, Cape Town, 8001",
    email: "maria@abc-care.co",
  },
  issueDate: "Jul 1, 2024",
  dueDate: "Jul 1, 2024",
  plan: "Enterprise",
  items: [
    { description: "Enterprise Plan Subscription - Monthly", qty: 1, unitPrice: 890, total: 890 },
    { description: "Platform Usage Fee",                     qty: 1, unitPrice: 0,   total: 0   },
  ],
  subtotal: 890,
  tax: 0,
  total: 890,
};

/* ── Page ─────────────────────────────────────────────── */
export default function Billing() {
  const [invoices] = useState<BillingInvoice[]>(MOCK_INVOICES);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [currentPlan, setCurrentPlan] = useState("enterprise");

  const [isViewInvoiceOpen, setIsViewInvoiceOpen] = useState(false);
  const [isChangePlanOpen, setIsChangePlanOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<typeof MOCK_INVOICE_DETAIL | null>(null);

  const filteredInvoices = useMemo(() =>
    invoices.filter((inv) =>
      inv.invoice.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.date.toLowerCase().includes(searchQuery.toLowerCase())
    ),
    [invoices, searchQuery]
  );

  const handleSelectAll = (checked: boolean) => {
    setSelectedIds(checked ? new Set(filteredInvoices.map((i) => i.id)) : new Set());
  };
  const handleSelectOne = (id: string, checked: boolean) => {
    const next = new Set(selectedIds);
    checked ? next.add(id) : next.delete(id);
    setSelectedIds(next);
  };
  const isAllSelected = filteredInvoices.length > 0 && selectedIds.size === filteredInvoices.length;

  const columns = useMemo<ColumnDef<BillingInvoice>[]>(
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
        accessorKey: "invoice",
        header: "Invoice",
        cell: ({ row }) => (
          <span className="font-semibold text-slate-700">{row.original.invoice}</span>
        ),
      },
      {
        accessorKey: "date",
        header: "Date",
        cell: ({ row }) => <span>{row.original.date}</span>,
      },
      {
        accessorKey: "amount",
        header: "Amount",
        cell: ({ row }) => <span className="font-medium">{row.original.amount}</span>,
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const { dot } = STATUS_CONFIG[row.original.status];
          return (
            <div className="flex items-center gap-2">
              <div className={`h-2 w-2 rounded-full ${dot}`} />
              <span className="font-medium">{row.original.status}</span>
            </div>
          );
        },
      },
      {
        id: "actions",
        header: "",
        cell: ({ row }) => {
          const inv = row.original;
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
                    setSelectedInvoice({ ...MOCK_INVOICE_DETAIL, invoiceNumber: inv.invoice });
                    setIsViewInvoiceOpen(true);
                  }}
                  icon={<Eye size={14} />}
                >
                  View invoice
                </DropdownItem>
                <DropdownItem
                  onClick={() => console.log("Download PDF", inv.id)}
                  icon={<Download size={14} />}
                >
                  Download PDF
                </DropdownItem>
              </Dropdown>
            </div>
          );
        },
      },
    ],
    [isAllSelected, selectedIds, filteredInvoices]
  );

  return (
    <div className="animate-fade-in duration-300 space-y-6">
      {/* Header */}
      <Breadcrumb
        pageTitle="BILLING & SUBSCRIPTION"
        subtext="Manage your plan and payment history"
        activePage="Billing & Subscription"
      />

      {/* Top cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Current Plan */}
        <div className="bg-white rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-[12px] font-bold uppercase tracking-wider">Current plan</p>
            <span className="flex items-center gap-1.5 text-[12px] font-semibold">
              <span className="h-2 w-2 rounded-full bg-green-500 inline-block" />
              Active
            </span>
          </div>

          <div className="flex items-baseline justify-between mb-2">
            <h2 className="text-[16px] font-normal text-slate-800">Enterprise</h2>
            <div className="text-right">
              <span className="text-[20px] font-medium text-slate-800">$890.00</span>
              <span className="text-[13px] text-slate-400 font-medium"> /month</span>
            </div>
          </div>

          <ul className="space-y-1 mb-6">
            {PLAN_FEATURES.map((f) => (
              <li key={f} className="flex items-center gap-1 text-[13px] font-normal">
                <span className="h-1.5 w-1.5 rounded-full bg-slate-400 shrink-0" />
                {f}
              </li>
            ))}
          </ul>

          <div className="flex items-center justify-end gap-3">
            <button className="flex items-center gap-2 px-5 py-1.5 bg-[#38BDF8] hover:bg-[#2BA5DF] text-white text-[13px] font-medium rounded-full transition-all cursor-pointer">
              <RefreshCw size={14} />
              Renew
            </button>
            <button
              onClick={() => setIsChangePlanOpen(true)}
              className="px-5 py-1.5 bg-[#FAFAFA] hover:bg-slate-100 border border-[#E7E7E7] text-slate-700 text-[13px] font-medium rounded-full transition-all cursor-pointer"
            >
              Change plan
            </button>
          </div>
        </div>

        {/* Invoice Details */}
        <div className="bg-white rounded-2xl p-6">
          <p className="text-[12px] font-bold uppercase mb-4">Invoice details</p>
          <div className="space-y-2 mt-3">
            {[
              { label: "Subscription status", value: <span className="flex items-center gap-1.5 font-semibold text-[13px]"><span className="h-2 w-2 rounded-full bg-green-500 inline-block" />Active</span> },
              { label: "Current period",      value: "Jun 1 – Jul 1, 2024" },
              { label: "Next renewal",        value: "July 18, 2024" },
              { label: "Days remaining",      value: "14 days" },
              { label: "Payment method",      value: <span className="flex items-center gap-2"><CreditCard size={14} className="text-slate-400" />Visa •••• 4892</span> },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-center justify-between">
                <span className="text-[11px] text-[#777777] font-normal">{label}</span>
                <span className="text-[12px] font-semibold">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Billing History */}
      <div className="bg-white rounded-2xl overflow-hidden flex flex-col">
        {/* Toolbar */}
        <div className="p-5 border-b border-[#E7E7E7] flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <p className="text-[13px] font-bold uppercase tracking-wider text-slate-700">Billing history</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative w-64">
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
            <button className="flex items-center gap-2 px-4 py-2 bg-[#FBFBFB] hover:bg-slate-100 border border-[#E7E7E7] text-slate-700 text-[13px] font-semibold rounded-full transition-all cursor-pointer">
              <Upload size={14} />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto">
          <DataTable columns={columns} data={filteredInvoices} initialPageSize={8} />
        </div>
      </div>

      {/* Modals */}
      <ViewInvoiceModal
        isOpen={isViewInvoiceOpen}
        onClose={() => { setIsViewInvoiceOpen(false); setSelectedInvoice(null); }}
        invoice={selectedInvoice}
      />
      <ChangePlanModal
        isOpen={isChangePlanOpen}
        onClose={() => setIsChangePlanOpen(false)}
        currentPlanId={currentPlan}
        onConfirm={(plan) => setCurrentPlan(plan)}
      />
    </div>
  );
}
