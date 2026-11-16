import { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Dropdown, DropdownItem } from "@/components/ui/Dropdown";
import {
  Search,
  Download,
  Upload,
  Plus,
  Copy,
  MoreVertical,
  CheckCircle2,
} from "lucide-react";
import {
  INITIAL_COMPANIES,
  type Company,
  type CompanyStatus,
  type SubscriptionPlanId,
} from "@/components/portal-owner/companies/types";
import {
  AddCompanyModal,
  type CompanyFormData,
} from "@/components/portal-owner/companies/AddCompanyModal";
import { CompanyCreatedModal } from "@/components/portal-owner/companies/CompanyCreatedModal";
import { CompanyInvoiceModal } from "@/components/portal-owner/companies/CompanyInvoiceModal";
import { ViewCompanyDetailsModal } from "@/components/portal-owner/companies/ViewCompanyDetailsModal";
import { SuspendCompanyModal } from "@/components/portal-owner/companies/SuspendCompanyModal";

const STATUS_TABS: ("All" | CompanyStatus)[] = [
  "All",
  "Active",
  "Trial",
  "Suspended",
  "Expired",
];

const STATUS_DOT: Record<CompanyStatus, string> = {
  Active: "bg-[#22C55E]",
  Trial: "bg-[#7C69EF]",
  Suspended: "bg-[#FFA940]",
  Expired: "bg-[#FF0E0E]",
};

const PLAN_LABEL: Record<SubscriptionPlanId, string> = {
  free_trial: "Free trial",
  starter: "Starter",
  growth: "Professional",
  business: "Business",
  enterprise: "Enterprise",
};

function generateTempPassword(): string {
  const chars =
    "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789";
  let result = "";
  for (let i = 0; i < 10; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

function generateCompanyCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ0123456789";
  let result = "VW";
  for (let i = 0; i < 10; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export default function Companies() {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState<Company[]>(INITIAL_COMPANIES);
  const [activeTab, setActiveTab] = useState<"All" | CompanyStatus>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const pageSize = 8;

  // Modal states
  const [isAddEditOpen, setIsAddEditOpen] = useState(false);
  const [editingCompany, setEditingCompany] = useState<Company | null>(null);
  const [createdCompany, setCreatedCompany] = useState<Company | null>(null);
  const [tempPassword, setTempPassword] = useState("Q2m9sS6wYR");
  const [invoiceCompany, setInvoiceCompany] = useState<Company | null>(null);
  const [viewCompany, setViewCompany] = useState<Company | null>(null);
  const [suspendCompany, setSuspendCompany] = useState<Company | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filteredCompanies = useMemo(() => {
    return companies.filter((c) => {
      const matchesTab = activeTab === "All" || c.status === activeTab;
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.workspace.toLowerCase().includes(q) ||
        c.companyCode.toLowerCase().includes(q) ||
        c.plan.toLowerCase().includes(q);
      return matchesTab && matchesSearch;
    });
  }, [companies, activeTab, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredCompanies.length / pageSize));
  const safePage = Math.min(currentPage, totalPages);
  const paginatedCompanies = filteredCompanies.slice(
    (safePage - 1) * pageSize,
    safePage * pageSize
  );

  const startEntry =
    filteredCompanies.length === 0 ? 0 : (safePage - 1) * pageSize + 1;
  const endEntry = Math.min(safePage * pageSize, filteredCompanies.length);

  const allSelected =
    paginatedCompanies.length > 0 &&
    paginatedCompanies.every((c) => selectedIds.includes(c.id));

  const toggleAll = () => {
    if (allSelected) {
      setSelectedIds((prev) =>
        prev.filter((id) => !paginatedCompanies.some((c) => c.id === id))
      );
    } else {
      const next = new Set(selectedIds);
      paginatedCompanies.forEach((c) => next.add(c.id));
      setSelectedIds(Array.from(next));
    }
  };

  const toggleRow = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleCopyId = (code: string) => {
    navigator.clipboard?.writeText(code);
    showToast(`Copied ID ${code} to clipboard`);
  };

  const handleAddOrEditSubmit = (form: CompanyFormData) => {
    if (editingCompany) {
      setCompanies((prev) =>
        prev.map((c) =>
          c.id === editingCompany.id
            ? {
                ...c,
                name: form.name,
                workspace: form.workspace,
                registrationNumber: form.registrationNumber,
                industry: form.industry || c.industry,
                contactEmail: form.contactEmail,
                contactPhone: form.contactPhone,
                address1: form.address1,
                address2: form.address2,
                postcode: form.postcode,
                adminName: form.adminName,
                adminEmail: form.adminEmail,
                adminPhone: form.adminPhone,
                adminRole: form.adminRole || c.adminRole,
                planId: form.planId,
                plan: PLAN_LABEL[form.planId],
              }
            : c
        )
      );
      setIsAddEditOpen(false);
      setEditingCompany(null);
      showToast(`Updated ${form.name}`);
      return;
    }

    const newCompany: Company = {
      id: String(Date.now()),
      companyCode: generateCompanyCode(),
      name: form.name,
      workspace: form.workspace,
      plan: PLAN_LABEL[form.planId],
      planId: form.planId,
      users: 1,
      activeUsers: 1,
      disabledUsers: 0,
      status: form.planId === "free_trial" ? "Trial" : "Active",
      lastLogin: "Just now",
      registered: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      industry: form.industry || "Healthcare",
      registrationNumber: form.registrationNumber || "REG-2024-NEW",
      contactEmail: form.contactEmail,
      contactPhone: form.contactPhone,
      address1: form.address1 || "12 Innovation Drive",
      address2: form.address2,
      postcode: form.postcode,
      adminName: form.adminName,
      adminEmail: form.adminEmail,
      adminPhone: form.adminPhone,
      adminRole: form.adminRole || "Admin",
    };

    setCompanies((prev) => [newCompany, ...prev]);
    setIsAddEditOpen(false);
    setTempPassword(generateTempPassword());
    setCreatedCompany(newCompany);
  };

  const handleConfirmSuspend = (companyId: string) => {
    setCompanies((prev) =>
      prev.map((c) =>
        c.id === companyId ? { ...c, status: "Suspended" } : c
      )
    );
    const target = companies.find((c) => c.id === companyId);
    setSuspendCompany(null);
    if (target) {
      showToast(`${target.name} has been suspended`);
    }
  };

  const handleReinstate = (company: Company) => {
    setCompanies((prev) =>
      prev.map((c) =>
        c.id === company.id ? { ...c, status: "Active" } : c
      )
    );
    showToast(`${company.name} has been reinstated`);
  };

  const handleResetPassword = (company: Company) => {
    showToast(`Password reset link sent to ${company.adminEmail}`);
  };

  const handleExportCsv = () => {
    const headers = [
      "Company",
      "Company ID",
      "Workspace",
      "Plan",
      "Users",
      "Status",
      "Last Login",
      "Registered",
    ];
    const rows = filteredCompanies.map((c) => [
      `"${c.name}"`,
      c.companyCode,
      c.workspace,
      c.plan,
      c.users,
      c.status,
      `"${c.lastLogin}"`,
      `"${c.registered}"`,
    ]);
    const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "companies.csv";
    link.click();
    URL.revokeObjectURL(url);
    showToast("Exported companies.csv");
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      showToast(`Imported ${file.name}`);
      e.target.value = "";
    }
  };

  return (
    <div className="animate-fade-in duration-300 space-y-5 pb-8">
      <Breadcrumb
        pageTitle="COMPANIES"
        subtext="Manage all customer workspaces"
        activePage="Companies"
      />

      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2.5 text-[12.5px] font-semibold text-white shadow-lg">
          <CheckCircle2 size={15} className="text-[#22C55E]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main White Card */}
      <div className="bg-white rounded-2xl p-6  border border-slate-100/80">
        {/* Status Tabs */}
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

        {/* Toolbar: Search + Action Buttons */}
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
              placeholder="Search companies..."
              className="w-full h-10 rounded-full bg-[#F8FAFC] border border-slate-100 pl-10 pr-4 text-[13px] text-slate-700 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-[#37AADF] focus:ring-2 focus:ring-[#37AADF]/15 transition-all"
            />
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv,.json"
              onChange={handleImportFile}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-2 rounded-full bg-[#F4F6F9] hover:bg-slate-200/70 px-4 py-2 text-[13px] font-semibold text-slate-700 transition-colors cursor-pointer"
            >
              <Download size={14} />
              <span>Import</span>
            </button>

            <button
              type="button"
              onClick={handleExportCsv}
              className="inline-flex items-center gap-2 rounded-full bg-[#F4F6F9] hover:bg-slate-200/70 px-4 py-2 text-[13px] font-semibold text-slate-700 transition-colors cursor-pointer"
            >
              <Upload size={14} />
              <span>Export</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setEditingCompany(null);
                setIsAddEditOpen(true);
              }}
              className="inline-flex items-center gap-2 rounded-full bg-[#37AADF] hover:bg-[#2F99CA] px-5 py-2 text-[13px] font-semibold text-white transition-colors shadow-xs cursor-pointer"
            >
              <span className="h-4 w-4 rounded-full bg-white/20 flex items-center justify-center">
                <Plus size={12} strokeWidth={2.5} />
              </span>
              <span>Add company</span>
            </button>
          </div>
        </div>

        {/* Companies Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-[13px] border-collapse">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="py-3.5 pr-4 w-10 text-left">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={toggleAll}
                    aria-label="Select all companies"
                    className="h-4 w-4 rounded border-slate-200 accent-[#37AADF] cursor-pointer"
                  />
                </th>
                <th className="py-3.5 pr-4 text-left font-semibold text-slate-700">
                  Company
                </th>
                <th className="py-3.5 pr-4 text-left font-semibold text-slate-700">
                  Workspace
                </th>
                <th className="py-3.5 pr-4 text-left font-semibold text-slate-700">
                  Plan
                </th>
                <th className="py-3.5 pr-4 text-left font-semibold text-slate-700">
                  Users
                </th>
                <th className="py-3.5 pr-4 text-left font-semibold text-slate-700">
                  Status
                </th>
                <th className="py-3.5 pr-4 text-left font-semibold text-slate-700">
                  Last Login
                </th>
                <th className="py-3.5 pr-4 text-left font-semibold text-slate-700">
                  Registered
                </th>
                <th className="py-3.5 w-12 text-right" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100/80">
              {paginatedCompanies.length === 0 ? (
                <tr>
                  <td
                    colSpan={9}
                    className="py-10 text-center text-slate-400 font-medium"
                  >
                    No companies found matching your filters.
                  </td>
                </tr>
              ) : (
                paginatedCompanies.map((company) => (
                  <tr
                    key={company.id}
                    className="hover:bg-slate-50/60 transition-colors"
                  >
                    <td className="py-4 pr-4">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(company.id)}
                        onChange={() => toggleRow(company.id)}
                        aria-label={`Select ${company.name}`}
                        className="h-4 w-4 rounded border-slate-200 accent-[#37AADF] cursor-pointer"
                      />
                    </td>
                    <td className="py-4 pr-4">
                      <div className="font-semibold text-slate-700">
                        {company.name}
                      </div>
                      <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mt-0.5">
                        <span>ID: {company.companyCode}</span>
                        <button
                          type="button"
                          onClick={() => handleCopyId(company.companyCode)}
                          className="text-[#37AADF] hover:opacity-80 cursor-pointer"
                          title="Copy Company ID"
                        >
                          <Copy size={11} />
                        </button>
                      </div>
                    </td>
                    <td className="py-4 pr-4 text-slate-600">
                      {company.workspace}
                    </td>
                    <td className="py-4 pr-4 text-slate-600">{company.plan}</td>
                    <td className="py-4 pr-4 text-slate-600">
                      {company.users}
                    </td>
                    <td className="py-4 pr-4">
                      <div className="inline-flex items-center gap-2">
                        <span
                          className={`h-2 w-2 rounded-full ${
                            STATUS_DOT[company.status]
                          }`}
                        />
                        <span className="text-slate-600 font-medium">
                          {company.status}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 pr-4 text-slate-500">
                      {company.lastLogin}
                    </td>
                    <td className="py-4 pr-4 text-slate-500">
                      {company.registered}
                    </td>
                    <td className="py-4 text-right">
                      <Dropdown
                        align="right"
                        menuClassName="w-44 shadow-lg border border-slate-100"
                        trigger={
                          <button
                            type="button"
                            className="h-8 w-8 rounded-full bg-[#F4F6F9] hover:bg-slate-200/70 flex items-center justify-center text-slate-500 transition-colors cursor-pointer ml-auto"
                            aria-label={`Actions for ${company.name}`}
                          >
                            <MoreVertical size={15} />
                          </button>
                        }
                      >
                        <DropdownItem
                          onClick={() => {
                            setEditingCompany(company);
                            setIsAddEditOpen(true);
                          }}
                        >
                          Edit
                        </DropdownItem>
                        <DropdownItem
                          onClick={() =>
                            navigate(`/portal-owner/companies/${company.id}`, {
                              state: { company },
                            })
                          }
                        >
                          View details
                        </DropdownItem>
                        {company.status === "Suspended" ||
                        company.status === "Expired" ? (
                          <DropdownItem
                            onClick={() => handleReinstate(company)}
                          >
                            Reinstate
                          </DropdownItem>
                        ) : (
                          <DropdownItem
                            onClick={() => setSuspendCompany(company)}
                          >
                            Suspend
                          </DropdownItem>
                        )}
                        <DropdownItem
                          onClick={() => handleResetPassword(company)}
                        >
                          Reset password
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
            Showing {startEntry} to {endEntry} of {filteredCompanies.length}{" "}
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
      <AddCompanyModal
        isOpen={isAddEditOpen}
        onClose={() => {
          setIsAddEditOpen(false);
          setEditingCompany(null);
        }}
        onSubmit={handleAddOrEditSubmit}
        initialCompany={editingCompany}
      />

      <CompanyCreatedModal
        isOpen={Boolean(createdCompany)}
        onClose={() => setCreatedCompany(null)}
        company={createdCompany}
        tempPassword={tempPassword}
        onSendInvoice={() => {
          const target = createdCompany;
          setCreatedCompany(null);
          setInvoiceCompany(target);
        }}
      />

      <CompanyInvoiceModal
        isOpen={Boolean(invoiceCompany)}
        onClose={() => setInvoiceCompany(null)}
        company={invoiceCompany}
      />

      <ViewCompanyDetailsModal
        isOpen={Boolean(viewCompany)}
        onClose={() => setViewCompany(null)}
        company={viewCompany}
      />

      <SuspendCompanyModal
        isOpen={Boolean(suspendCompany)}
        onClose={() => setSuspendCompany(null)}
        company={suspendCompany}
        onConfirm={handleConfirmSuspend}
      />
    </div>
  );
}

