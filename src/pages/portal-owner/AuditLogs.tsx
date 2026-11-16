import { Fragment, useMemo, useState } from "react";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import {
  Search,
  Upload,
  ChevronDown,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";

interface AuditLogEntry {
  id: string;
  timestamp: string;
  action: string;
  entity: string;
  performedBy: string;
  ip: string;
  before: { label: string; value: string }[];
  after: { label: string; value: string }[];
}

const INITIAL_AUDIT_LOGS: AuditLogEntry[] = [
  {
    id: "1",
    timestamp: "2024-07-04 14:32:11",
    action: "Company suspended",
    entity: "Apex logistics",
    performedBy: "Admin User",
    ip: "196.25.1.10",
    before: [{ label: "Status", value: "Active" }],
    after: [
      { label: "Status", value: "Suspended" },
      { label: "Reason", value: "Payment Failure" },
    ],
  },
  {
    id: "2",
    timestamp: "2024-07-04 14:32:11",
    action: "User created",
    entity: "Yuki Nakamura (ABC Homec...",
    performedBy: "Sarah Adewale",
    ip: "102.88.3.21",
    before: [{ label: "Account", value: "None" }],
    after: [
      { label: "Role", value: "Manager" },
      { label: "Status", value: "Active" },
    ],
  },
  {
    id: "3",
    timestamp: "2024-07-04 14:32:11",
    action: "Password reset",
    entity: "Connor Hughes (ABC Homec...",
    performedBy: "Sarah Adewale",
    ip: "102.88.3.21",
    before: [{ label: "Token", value: "None" }],
    after: [{ label: "Action", value: "Reset link emailed" }],
  },
  {
    id: "4",
    timestamp: "2024-07-04 14:32:11",
    action: "Subscription upgraded",
    entity: "Ironclad Security",
    performedBy: "Platform Admin",
    ip: "102.88.3.21",
    before: [{ label: "Plan", value: "Growth" }],
    after: [{ label: "Plan", value: "Enterprise" }],
  },
  {
    id: "5",
    timestamp: "2024-07-04 14:32:11",
    action: "User disabled",
    entity: "Connor Hughes (ABC Homec...",
    performedBy: "System",
    ip: "102.88.3.21",
    before: [{ label: "Status", value: "Active" }],
    after: [{ label: "Status", value: "Disabled" }],
  },
  {
    id: "6",
    timestamp: "2024-07-04 14:32:11",
    action: "User disabled",
    entity: "Connor Hughes (ABC Homec...",
    performedBy: "System",
    ip: "102.88.3.21",
    before: [{ label: "Status", value: "Active" }],
    after: [{ label: "Status", value: "Disabled" }],
  },
  {
    id: "7",
    timestamp: "2024-07-04 14:32:11",
    action: "User disabled",
    entity: "Connor Hughes (ABC Homec...",
    performedBy: "System",
    ip: "102.88.3.21",
    before: [{ label: "Status", value: "Active" }],
    after: [{ label: "Status", value: "Disabled" }],
  },
  {
    id: "8",
    timestamp: "2024-07-04 14:32:11",
    action: "User disabled",
    entity: "Connor Hughes (ABC Homec...",
    performedBy: "System",
    ip: "102.88.3.21",
    before: [{ label: "Status", value: "Active" }],
    after: [{ label: "Status", value: "Disabled" }],
  },
  {
    id: "9",
    timestamp: "2024-07-04 14:32:11",
    action: "User disabled",
    entity: "Connor Hughes (ABC Homec...",
    performedBy: "System",
    ip: "102.88.3.21",
    before: [{ label: "Status", value: "Active" }],
    after: [{ label: "Status", value: "Disabled" }],
  },
];

export default function AuditLogs() {
  const [searchQuery, setSearchQuery] = useState("");
  const [actionFilter, setActionFilter] = useState("All");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [expandedIds, setExpandedIds] = useState<string[]>(["1"]);
  const [currentPage, setCurrentPage] = useState(1);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const pageSize = 9;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const uniqueActions = useMemo(
    () => Array.from(new Set(INITIAL_AUDIT_LOGS.map((l) => l.action))),
    []
  );

  const filteredLogs = useMemo(() => {
    return INITIAL_AUDIT_LOGS.filter((log) => {
      const matchesAction =
        actionFilter === "All" || log.action === actionFilter;
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        log.action.toLowerCase().includes(q) ||
        log.entity.toLowerCase().includes(q) ||
        log.performedBy.toLowerCase().includes(q) ||
        log.ip.toLowerCase().includes(q);
      return matchesAction && matchesSearch;
    });
  }, [actionFilter, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredLogs.length / pageSize));
  const safePage = Math.min(currentPage, totalPages);
  const paginatedLogs = filteredLogs.slice(
    (safePage - 1) * pageSize,
    safePage * pageSize
  );

  const startEntry =
    filteredLogs.length === 0 ? 0 : (safePage - 1) * pageSize + 1;
  const endEntry = Math.min(safePage * pageSize, filteredLogs.length);

  const allSelected =
    paginatedLogs.length > 0 &&
    paginatedLogs.every((l) => selectedIds.includes(l.id));

  const toggleAll = () => {
    if (allSelected) {
      setSelectedIds((prev) =>
        prev.filter((id) => !paginatedLogs.some((l) => l.id === id))
      );
    } else {
      const next = new Set(selectedIds);
      paginatedLogs.forEach((l) => next.add(l.id));
      setSelectedIds(Array.from(next));
    }
  };

  const toggleRow = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleExportCsv = () => {
    const headers = ["Timestamp", "Action", "Entity", "Performed By", "IP"];
    const rows = filteredLogs.map((l) => [
      `"${l.timestamp}"`,
      `"${l.action}"`,
      `"${l.entity}"`,
      `"${l.performedBy}"`,
      l.ip,
    ]);
    const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "audit-logs.csv";
    link.click();
    URL.revokeObjectURL(url);
    showToast("Exported audit-logs.csv");
  };

  return (
    <div className="animate-fade-in duration-300 space-y-5 pb-8">
      <Breadcrumb
        pageTitle="AUDIT LOGS"
        subtext="Immutable record of all administrative actions"
        activePage="Audit logs"
      />

      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2.5 text-[12.5px] font-semibold text-white shadow-lg">
          <CheckCircle2 size={15} className="text-[#22C55E]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main White Card */}
      <div className="bg-white rounded-2xl p-6  border border-slate-100/80">
        {/* Toolbar */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-6">
          <div className="flex items-center gap-3 flex-wrap flex-1">
            <div className="relative w-full sm:max-w-[230px]">
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

            <div className="relative">
              <select
                value={actionFilter}
                onChange={(e) => {
                  setActionFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="h-10 appearance-none rounded-full bg-[#F8FAFC] border border-slate-100 pl-4 pr-9 text-[13px] font-medium text-slate-600 focus:outline-none focus:border-[#37AADF] cursor-pointer"
              >
                <option value="All">All</option>
                {uniqueActions.map((act) => (
                  <option key={act} value={act}>
                    {act}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={14}
                className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={handleExportCsv}
            className="inline-flex items-center gap-2 rounded-full bg-[#F4F6F9] hover:bg-slate-200/70 px-4 py-2 text-[13px] font-semibold text-slate-700 transition-colors cursor-pointer self-start sm:self-auto"
          >
            <Upload size={14} />
            <span>Export</span>
          </button>
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
                    aria-label="Select all audit logs"
                    className="h-4 w-4 rounded border-slate-200 accent-[#37AADF] cursor-pointer"
                  />
                </th>
                <th className="py-3.5 pr-4 text-left font-semibold text-slate-700">
                  Timestamp
                </th>
                <th className="py-3.5 pr-4 text-left font-semibold text-slate-700">
                  Action
                </th>
                <th className="py-3.5 pr-4 text-left font-semibold text-slate-700">
                  Entity
                </th>
                <th className="py-3.5 pr-4 text-left font-semibold text-slate-700">
                  Performed By
                </th>
                <th className="py-3.5 pr-4 text-left font-semibold text-slate-700">
                  IP
                </th>
                <th className="py-3.5 w-10 text-right" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100/80">
              {paginatedLogs.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="py-10 text-center text-slate-400 font-medium"
                  >
                    No audit logs found matching your filters.
                  </td>
                </tr>
              ) : (
                paginatedLogs.map((log) => {
                  const isExpanded = expandedIds.includes(log.id);
                  return (
                    <Fragment key={log.id}>
                      <tr
                        onClick={() => toggleExpand(log.id)}
                        className={`transition-colors cursor-pointer ${
                          isExpanded ? "bg-[#F8FAFC]" : "hover:bg-slate-50/60"
                        }`}
                      >
                        <td
                          className="py-4 pr-4"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {!isExpanded && (
                            <input
                              type="checkbox"
                              checked={selectedIds.includes(log.id)}
                              onChange={() => toggleRow(log.id)}
                              aria-label={`Select log ${log.id}`}
                              className="h-4 w-4 rounded border-slate-200 accent-[#37AADF] cursor-pointer"
                            />
                          )}
                        </td>
                        <td className="py-4 pr-4 text-slate-600 whitespace-nowrap">
                          {log.timestamp}
                        </td>
                        <td className="py-4 pr-4 font-medium text-slate-700">
                          {log.action}
                        </td>
                        <td className="py-4 pr-4 text-slate-600">
                          {log.entity}
                        </td>
                        <td className="py-4 pr-4 text-slate-600">
                          {log.performedBy}
                        </td>
                        <td className="py-4 pr-4 text-slate-500">{log.ip}</td>
                        <td className="py-4 text-right text-slate-500">
                          {isExpanded ? (
                            <ChevronDown size={15} className="ml-auto" />
                          ) : (
                            <ChevronRight size={15} className="ml-auto" />
                          )}
                        </td>
                      </tr>

                      {isExpanded && (
                        <tr className="bg-[#F8FAFC]">
                          <td />
                          <td className="pb-4 pt-1 pr-4 align-top">
                            <p className="text-[11.5px] text-slate-400">
                              Before
                            </p>
                            <p className="text-[12.5px] text-slate-500 mt-0.5">
                              {log.before.map((b, i) => (
                                <span key={b.label}>
                                  {i > 0 && ", "}
                                  {b.label}:{" "}
                                  <span className="font-bold text-slate-700">
                                    {b.value}
                                  </span>
                                </span>
                              ))}
                            </p>
                          </td>
                          <td colSpan={5} className="pb-4 pt-1 pr-4 align-top">
                            <p className="text-[11.5px] text-slate-400">
                              After
                            </p>
                            <p className="text-[12.5px] text-slate-500 mt-0.5">
                              {log.after.map((a, i) => (
                                <span key={a.label}>
                                  {i > 0 && ", "}
                                  {a.label}:{" "}
                                  <span className="font-bold text-slate-700">
                                    {a.value}
                                  </span>
                                </span>
                              ))}
                            </p>
                          </td>
                        </tr>
                      )}
                    </Fragment>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Footer / Pagination */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-5 mt-2 border-t border-slate-100/80 text-[12.5px]">
          <p className="font-semibold text-slate-600">
            Showing {startEntry} to {endEntry} of {filteredLogs.length} entries
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
    </div>
  );
}

