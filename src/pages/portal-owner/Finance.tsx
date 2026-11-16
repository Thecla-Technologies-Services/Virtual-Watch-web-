import { useMemo, useState } from "react";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Dropdown, DropdownItem } from "@/components/ui/Dropdown";
import {
  Search,
  Upload,
  Plus,
  Copy,
  MoreVertical,
  CheckCircle2,
} from "lucide-react";
import { FinanceMetrics } from "@/components/portal-owner/finance/FinanceMetrics";
import {
  INITIAL_FINANCE_INVOICES,
  type FinanceInvoice,
  type InvoiceStatus,
} from "@/components/portal-owner/finance/types";
import { ViewFinanceInvoiceModal } from "@/components/portal-owner/finance/ViewFinanceInvoiceModal";
import { DownloadInvoicePdfModal } from "@/components/portal-owner/finance/DownloadInvoicePdfModal";
import { ProcessRefundModal } from "@/components/portal-owner/finance/ProcessRefundModal";
import { ReissueInvoiceModal } from "@/components/portal-owner/finance/ReissueInvoiceModal";
import { SendReminderModal } from "@/components/portal-owner/finance/SendReminderModal";

const STATUS_TABS: ("All" | InvoiceStatus)[] = [
  "All",
  "Paid",
  "Overdue",
  "Refund",
];

const STATUS_DOT: Record<InvoiceStatus, string> = {
  Paid: "bg-[#22C55E]",
  Overdue: "bg-[#FFA940]",
  Refund: "bg-[#FF0E0E]",
};

export default function Finance() {
  const [invoices, setInvoices] = useState<FinanceInvoice[]>(
    INITIAL_FINANCE_INVOICES
  );
  const [activeTab, setActiveTab] = useState<"All" | InvoiceStatus>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const pageSize = 8;

  // Modals
  const [viewInvoice, setViewInvoice] = useState<FinanceInvoice | null>(null);
  const [downloadInvoice, setDownloadInvoice] = useState<FinanceInvoice | null>(
    null
  );
  const [refundInvoice, setRefundInvoice] = useState<FinanceInvoice | null>(
    null
  );
  const [reissueInvoice, setReissueInvoice] = useState<FinanceInvoice | null>(
    null
  );
  const [reminderInvoice, setReminderInvoice] = useState<FinanceInvoice | null>(
    null
  );

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filteredInvoices = useMemo(() => {
    return invoices.filter((inv) => {
      const matchesTab = activeTab === "All" || inv.status === activeTab;
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        inv.invoiceNumber.toLowerCase().includes(q) ||
        inv.company.toLowerCase().includes(q) ||
        inv.companyCode.toLowerCase().includes(q) ||
        inv.plan.toLowerCase().includes(q);
      return matchesTab && matchesSearch;
    });
  }, [invoices, activeTab, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredInvoices.length / pageSize));
  const safePage = Math.min(currentPage, totalPages);
  const paginatedInvoices = filteredInvoices.slice(
    (safePage - 1) * pageSize,
    safePage * pageSize
  );

  const startEntry =
    filteredInvoices.length === 0 ? 0 : (safePage - 1) * pageSize + 1;
  const endEntry = Math.min(safePage * pageSize, filteredInvoices.length);

  const allSelected =
    paginatedInvoices.length > 0 &&
    paginatedInvoices.every((inv) => selectedIds.includes(inv.id));

  const toggleAll = () => {
    if (allSelected) {
      setSelectedIds((prev) =>
        prev.filter((id) => !paginatedInvoices.some((inv) => inv.id === id))
      );
    } else {
      const next = new Set(selectedIds);
      paginatedInvoices.forEach((inv) => next.add(inv.id));
      setSelectedIds(Array.from(next));
    }
  };

  const toggleRow = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard?.writeText(code);
    showToast(`Copied ${code} to clipboard`);
  };

  const exportCsv = (filename: string) => {
    const headers = ["Invoice", "Company", "Plan", "Date", "Amount", "Status"];
    const rows = filteredInvoices.map((inv) => [
      inv.invoiceNumber,
      `"${inv.company}"`,
      inv.plan,
      `"${inv.date}"`,
      inv.amount,
      inv.status,
    ]);
    const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
    showToast(`Generated ${filename}`);
  };

  const handleDownloadPdf = (invoice: FinanceInvoice) => {
    setDownloadInvoice(null);
    showToast(`Downloaded ${invoice.invoiceNumber}.pdf`);
  };

  const handleRefundComplete = (invoiceId: string) => {
    setInvoices((prev) =>
      prev.map((inv) =>
        inv.id === invoiceId ? { ...inv, status: "Refund" } : inv
      )
    );
  };

  const handleReissueSubmit = (invoice: FinanceInvoice) => {
    setReissueInvoice(null);
    showToast(`Reissued ${invoice.invoiceNumber} to ${invoice.email}`);
  };

  const handleReminderSubmit = (invoice: FinanceInvoice) => {
    setReminderInvoice(null);
    showToast(`Reminder sent to ${invoice.email}`);
  };

  return (
    <div className="animate-fade-in duration-300 space-y-5 pb-8">
      <Breadcrumb
        pageTitle="FINANCE & BILLING"
        subtext="Revenue tracking, invoices, and payment management"
        activePage="Finance & Billing"
      />

      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2.5 text-[12.5px] font-semibold text-white shadow-lg">
          <CheckCircle2 size={15} className="text-[#22C55E]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Row 1: 4 Stat Cards */}
      <FinanceMetrics />

      {/* Main White Table Card */}
      <div className="bg-white rounded-2xl p-6  border border-slate-100/80">
        {/* Tabs */}
        <div className="flex items-center gap-1 border-b border-slate-100 pb-0 mb-5 overflow-x-auto">
          {STATUS_TABS.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => {
                  setActiveTab(tab);
                  setCurrentPage(1);
                }}
                className={`px-5 py-2.5 text-[13px] font-semibold rounded-t-xl transition-colors cursor-pointer whitespace-nowrap ${
                  isActive
                    ? "bg-[#F4F7FA] text-[#37AADF] border border-b-0 border-slate-100"
                    : "text-slate-400 hover:text-slate-700"
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Toolbar */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-6">
          <div className="relative w-full sm:max-w-xs">
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search..."
              className="w-full h-10 rounded-full bg-[#F8FAFC] border border-slate-100 pl-10 pr-4 text-[13px] text-slate-700 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-[#37AADF] focus:ring-2 focus:ring-[#37AADF]/15 transition-all"
            />
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              type="button"
              onClick={() => exportCsv("finance-invoices.csv")}
              className="inline-flex items-center gap-2 rounded-full bg-[#F4F6F9] hover:bg-slate-200/70 px-4 py-2 text-[13px] font-semibold text-slate-700 transition-colors cursor-pointer"
            >
              <Upload size={14} />
              <span>Export</span>
            </button>

            <button
              type="button"
              onClick={() => exportCsv("finance-report.csv")}
              className="inline-flex items-center gap-2 rounded-full bg-[#37AADF] hover:bg-[#2F99CA] px-5 py-2 text-[13px] font-semibold text-white transition-colors shadow-xs cursor-pointer"
            >
              <span className="h-4 w-4 rounded-full bg-white/20 flex items-center justify-center">
                <Plus size={12} strokeWidth={2.5} />
              </span>
              <span>Generate report</span>
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-[13px] border-collapse">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="py-3.5 pr-4 w-10 text-left">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={toggleAll}
                    aria-label="Select all invoices"
                    className="h-4 w-4 rounded border-slate-200 accent-[#37AADF] cursor-pointer"
                  />
                </th>
                <th className="py-3.5 pr-4 text-left font-semibold text-slate-700">
                  Invoice
                </th>
                <th className="py-3.5 pr-4 text-left font-semibold text-slate-700">
                  Company
                </th>
                <th className="py-3.5 pr-4 text-left font-semibold text-slate-700">
                  Plan
                </th>
                <th className="py-3.5 pr-4 text-left font-semibold text-slate-700">
                  Date
                </th>
                <th className="py-3.5 pr-4 text-left font-semibold text-slate-700">
                  Amount
                </th>
                <th className="py-3.5 pr-4 text-left font-semibold text-slate-700">
                  Status
                </th>
                <th className="py-3.5 w-12 text-right" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100/80">
              {paginatedInvoices.length === 0 ? (
                <tr>
                  <td
                    colSpan={8}
                    className="py-10 text-center text-slate-400 font-medium"
                  >
                    No invoices found matching your filters.
                  </td>
                </tr>
              ) : (
                paginatedInvoices.map((inv) => (
                  <tr
                    key={inv.id}
                    className="hover:bg-slate-50/60 transition-colors"
                  >
                    <td className="py-4 pr-4">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(inv.id)}
                        onChange={() => toggleRow(inv.id)}
                        aria-label={`Select ${inv.invoiceNumber}`}
                        className="h-4 w-4 rounded border-slate-200 accent-[#37AADF] cursor-pointer"
                      />
                    </td>
                    <td className="py-4 pr-4 font-medium text-slate-700">
                      {inv.invoiceNumber}
                    </td>
                    <td className="py-4 pr-4">
                      <div className="font-semibold text-slate-700">
                        {inv.company}
                      </div>
                      <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mt-0.5">
                        <span>{inv.companyCode}</span>
                        <button
                          type="button"
                          onClick={() => handleCopyCode(inv.companyCode)}
                          className="text-[#37AADF] hover:opacity-80 cursor-pointer"
                          title="Copy Company Code"
                        >
                          <Copy size={11} />
                        </button>
                      </div>
                    </td>
                    <td className="py-4 pr-4 text-slate-600">{inv.plan}</td>
                    <td className="py-4 pr-4 text-slate-500">{inv.date}</td>
                    <td className="py-4 pr-4 font-medium text-slate-700">
                      {inv.amount}
                    </td>
                    <td className="py-4 pr-4">
                      <div className="inline-flex items-center gap-2">
                        <span
                          className={`h-2 w-2 rounded-full ${
                            STATUS_DOT[inv.status]
                          }`}
                        />
                        <span className="text-slate-600 font-medium">
                          {inv.status}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 text-right">
                      <Dropdown
                        align="right"
                        menuClassName="w-44 shadow-lg border border-slate-100"
                        trigger={
                          <button
                            type="button"
                            className="h-8 w-8 rounded-full bg-[#F4F6F9] hover:bg-slate-200/70 flex items-center justify-center text-slate-500 transition-colors cursor-pointer ml-auto"
                            aria-label={`Actions for ${inv.invoiceNumber}`}
                          >
                            <MoreVertical size={15} />
                          </button>
                        }
                      >
                        <DropdownItem onClick={() => setViewInvoice(inv)}>
                          View invoice
                        </DropdownItem>
                        <DropdownItem onClick={() => setDownloadInvoice(inv)}>
                          Download PDF
                        </DropdownItem>
                        <DropdownItem onClick={() => setRefundInvoice(inv)}>
                          Process refund
                        </DropdownItem>
                        <DropdownItem onClick={() => setReminderInvoice(inv)}>
                          Send reminder
                        </DropdownItem>
                        <DropdownItem onClick={() => setReissueInvoice(inv)}>
                          Reissue invoice
                        </DropdownItem>
                      </Dropdown>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer / Pagination */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-5 mt-2 border-t border-slate-100/80 text-[12.5px]">
          <p className="font-semibold text-slate-600">
            Showing {startEntry} to {endEntry} of {filteredInvoices.length}{" "}
            entries
          </p>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              disabled={safePage >= totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="px-3.5 py-1.5 rounded-lg bg-[#F4F6F9] text-slate-600 font-semibold text-[12px] hover:bg-slate-200/70 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              Next
            </button>

            {Array.from({ length: totalPages }, (_, idx) => idx + 1).map(
              (page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => setCurrentPage(page)}
                  className={`h-8 w-8 rounded-lg font-bold text-[12px] transition-colors cursor-pointer ${
                    page === safePage
                      ? "bg-[#37AADF] text-white"
                      : "bg-[#F4F6F9] text-slate-600 hover:bg-slate-200/70"
                  }`}
                >
                  {page}
                </button>
              )
            )}

            <button
              type="button"
              disabled={safePage <= 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="px-3.5 py-1.5 rounded-lg bg-[#F4F6F9] text-slate-600 font-semibold text-[12px] hover:bg-slate-200/70 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              Previous
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <ViewFinanceInvoiceModal
        isOpen={Boolean(viewInvoice)}
        onClose={() => setViewInvoice(null)}
        invoice={viewInvoice}
        onDownloadPdf={(inv) => {
          setViewInvoice(null);
          setDownloadInvoice(inv);
        }}
      />

      <DownloadInvoicePdfModal
        isOpen={Boolean(downloadInvoice)}
        onClose={() => setDownloadInvoice(null)}
        invoice={downloadInvoice}
        onDownload={handleDownloadPdf}
      />

      <ProcessRefundModal
        isOpen={Boolean(refundInvoice)}
        onClose={() => setRefundInvoice(null)}
        invoice={refundInvoice}
        onComplete={handleRefundComplete}
      />

      <ReissueInvoiceModal
        isOpen={Boolean(reissueInvoice)}
        onClose={() => setReissueInvoice(null)}
        invoice={reissueInvoice}
        onReissue={handleReissueSubmit}
      />

      <SendReminderModal
        isOpen={Boolean(reminderInvoice)}
        onClose={() => setReminderInvoice(null)}
        invoice={reminderInvoice}
        onSend={handleReminderSubmit}
      />
    </div>
  );
}

