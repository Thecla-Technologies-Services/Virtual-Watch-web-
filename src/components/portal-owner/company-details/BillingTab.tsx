import { useMemo, useState } from "react";
import { Check, MoreVertical, Search, Upload } from "lucide-react";
import { Dropdown, DropdownItem } from "@/components/ui/Dropdown";
import {
  INITIAL_FINANCE_INVOICES,
  type FinanceInvoice,
} from "../finance/types";
import { ViewFinanceInvoiceModal } from "../finance/ViewFinanceInvoiceModal";
import { DownloadInvoicePdfModal } from "../finance/DownloadInvoicePdfModal";
import type { Company } from "../companies/types";

interface BillingTabProps {
  company: Company;
  onChangePlan: () => void;
}

export function BillingTab({ company, onChangePlan }: BillingTabProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [viewInvoice, setViewInvoice] = useState<FinanceInvoice | null>(null);
  const [downloadInvoice, setDownloadInvoice] = useState<FinanceInvoice | null>(
    null
  );
  const [renewedBanner, setRenewedBanner] = useState(false);

  const invoices = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const list = INITIAL_FINANCE_INVOICES.slice(0, 6).map((inv) => ({
      ...inv,
      company: company.name,
      companyCode: company.companyCode,
      email: company.contactEmail,
    }));
    if (!q) return list;
    return list.filter((i) =>
      `${i.invoiceNumber} ${i.date} ${i.status}`.toLowerCase().includes(q)
    );
  }, [company, searchQuery]);

  const allSelected =
    invoices.length > 0 && invoices.every((i) => selectedIds.includes(i.id));

  const toggleAll = () => {
    if (allSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(invoices.map((i) => i.id));
    }
  };

  const toggleOne = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleExport = () => {
    const csv = [
      ["Invoice", "Date", "Amount", "Status"],
      ...invoices.map((i) => [i.invoiceNumber, i.date, i.amount, i.status]),
    ]
      .map((r) => r.join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${company.workspace}-billing-history.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-5">
      {renewedBanner && (
        <div className="rounded-xl bg-emerald-50 border border-emerald-200 px-4 py-2.5 text-[13px] text-emerald-700 font-medium">
          Subscription renewed for {company.name}.
        </div>
      )}

      {/* Top 2 Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="bg-white rounded-2xl p-5 border border-slate-100/80  flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[12px] font-bold uppercase tracking-wide text-[#2E3A59]">
                Current subscription
              </h3>
              <span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-[#16A34A]">
                <span className="w-2 h-2 rounded-full bg-[#22C55E]" />
                {company.status}
              </span>
            </div>

            <div className="flex items-baseline justify-between mb-3">
              <span className="text-[15px] font-semibold text-[#2E3A59]">
                {company.plan}
              </span>
              <div>
                <span className="text-[20px] font-bold text-[#2E3A59]">
                  $890.00
                </span>
                <span className="text-[12px] text-slate-400"> /month</span>
              </div>
            </div>

            <ul className="space-y-1.5 text-[12px] text-slate-500 mb-4">
              {[
                "Unlimited users",
                "Priority support",
                "Advanced analytics",
                "API access",
                "Custom integrations",
              ].map((feat) => (
                <li key={feat} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                  {feat}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-2">
            <button
              type="button"
              onClick={() => setRenewedBanner(true)}
              className="h-9 px-5 rounded-full bg-[#37AADF] hover:bg-[#2F99CA] text-white text-[12px] font-medium transition-colors cursor-pointer"
            >
              Renew
            </button>
            <button
              type="button"
              onClick={onChangePlan}
              className="h-9 px-5 rounded-full bg-[#F4F6F9] hover:bg-slate-200/70 text-[#2E3A59] text-[12px] font-medium transition-colors cursor-pointer"
            >
              Change plan
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-100/80 ">
          <h3 className="text-[12px] font-bold uppercase tracking-wide text-[#2E3A59] mb-4">
            Invoice details
          </h3>
          <div className="space-y-3 text-[12px]">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Subscription status</span>
              <span className="inline-flex items-center gap-1.5 font-medium text-[#2E3A59]">
                <span className="w-2 h-2 rounded-full bg-[#22C55E]" />
                {company.status}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Current period</span>
              <span className="font-medium text-[#2E3A59]">
                Jun 1 – Jul 1, 2024
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Next renewal</span>
              <span className="font-medium text-[#2E3A59]">July 18, 2024</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Days remaining</span>
              <span className="font-medium text-[#2E3A59]">14 days</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Payment method</span>
              <span className="font-medium text-[#2E3A59]">Visa ···· 4892</span>
            </div>
          </div>
        </div>
      </div>

      {/* Billing History */}
      <div className="bg-white rounded-2xl p-6 border border-slate-100/80 ">
        <h3 className="text-[12px] font-bold uppercase tracking-wide text-[#2E3A59] mb-4">
          Billing history
        </h3>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
          <div className="relative flex-1 max-w-xs">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="w-full h-10 pl-10 pr-4 rounded-full bg-[#F4F6F9] text-[13px] text-[#2E3A59] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#37AADF]/30"
            />
          </div>

          <button
            type="button"
            onClick={handleExport}
            className="h-10 px-4 rounded-full bg-[#F4F6F9] hover:bg-slate-200/70 text-[#2E3A59] text-[13px] font-medium inline-flex items-center gap-2 transition-colors cursor-pointer self-start sm:self-auto"
          >
            <Upload className="w-4 h-4 text-slate-500" />
            <span>Export</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-[12px] font-semibold text-[#2E3A59]">
                <th className="py-3.5 pl-3 pr-2 w-10">
                  <button
                    type="button"
                    onClick={toggleAll}
                    aria-label="Select all invoices"
                    className={`w-4 h-4 rounded flex items-center justify-center border transition-colors ${
                      allSelected
                        ? "bg-[#37AADF] border-[#37AADF] text-white"
                        : "border-slate-300 bg-white"
                    }`}
                  >
                    {allSelected && <Check className="w-3 h-3" />}
                  </button>
                </th>
                <th className="py-3.5 px-3">Invoice</th>
                <th className="py-3.5 px-3">Date</th>
                <th className="py-3.5 px-3">Amount</th>
                <th className="py-3.5 px-3">Status</th>
                <th className="py-3.5 pl-2 pr-3 w-12 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-[13px] text-[#2E3A59]">
              {invoices.map((inv) => {
                const isSelected = selectedIds.includes(inv.id);
                return (
                  <tr
                    key={inv.id}
                    className="hover:bg-slate-50/70 transition-colors"
                  >
                    <td className="py-3.5 pl-3 pr-2">
                      <button
                        type="button"
                        onClick={() => toggleOne(inv.id)}
                        aria-label={`Select ${inv.invoiceNumber}`}
                        className={`w-4 h-4 rounded flex items-center justify-center border transition-colors ${
                          isSelected
                            ? "bg-[#37AADF] border-[#37AADF] text-white"
                            : "border-slate-300 bg-white"
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3" />}
                      </button>
                    </td>
                    <td className="py-3.5 px-3 font-medium whitespace-nowrap">
                      {inv.invoiceNumber}
                    </td>
                    <td className="py-3.5 px-3 text-slate-600 whitespace-nowrap">
                      {inv.date}
                    </td>
                    <td className="py-3.5 px-3 text-slate-600 whitespace-nowrap">
                      {inv.amount}
                    </td>
                    <td className="py-3.5 px-3 whitespace-nowrap">
                      <span className="inline-flex items-center gap-2 text-slate-600">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            inv.status === "Paid"
                              ? "bg-[#22C55E]"
                              : "bg-[#F59E0B]"
                          }`}
                        />
                        {inv.status}
                      </span>
                    </td>
                    <td className="py-3.5 pl-2 pr-3 text-right">
                      <Dropdown
                        align="right"
                        trigger={
                          <span className="w-8 h-8 rounded-full bg-[#F4F6F9] hover:bg-slate-200/70 inline-flex items-center justify-center text-slate-500">
                            <MoreVertical className="w-4 h-4" />
                          </span>
                        }
                      >
                        <DropdownItem onClick={() => setViewInvoice(inv)}>
                          View invoice
                        </DropdownItem>
                        <DropdownItem onClick={() => setDownloadInvoice(inv)}>
                          Download PDF
                        </DropdownItem>
                      </Dropdown>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-5 mt-2 border-t border-slate-100 text-[13px]">
          <p className="text-[#2E3A59] font-medium">
            Showing 1 to {invoices.length} of {invoices.length} entries
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled
              className="px-3.5 py-1.5 rounded-lg bg-[#F4F6F9] text-slate-500 opacity-50 text-[12px] font-medium"
            >
              Next
            </button>
            <button
              type="button"
              className="w-8 h-8 rounded-lg bg-[#37AADF] text-white text-[12px] font-semibold"
            >
              1
            </button>
            <button
              type="button"
              disabled
              className="px-3.5 py-1.5 rounded-lg bg-[#F4F6F9] text-slate-500 opacity-50 text-[12px] font-medium"
            >
              Previous
            </button>
          </div>
        </div>
      </div>

      <ViewFinanceInvoiceModal
        isOpen={Boolean(viewInvoice)}
        onClose={() => setViewInvoice(null)}
        invoice={viewInvoice}
        onDownloadPdf={() => {
          setDownloadInvoice(viewInvoice);
          setViewInvoice(null);
        }}
      />

      <DownloadInvoicePdfModal
        isOpen={Boolean(downloadInvoice)}
        onClose={() => setDownloadInvoice(null)}
        invoice={downloadInvoice}
        onDownload={() => {}}
      />
    </div>
  );
}
