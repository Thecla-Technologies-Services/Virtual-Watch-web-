import { useMemo, useState } from "react";
import {
  AlertCircle,
  Calendar,
  CheckCircle2,
  ClipboardCheck,
  ClipboardList,
  Clock,
  Download,
  FileWarning,
  Plus,
  Search,
  Upload,
  User,
  X,
} from "lucide-react";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import {
  INITIAL_HANDOVERS,
  type HandoverPriority,
  type HandoverReportItem,
} from "@/components/handover-report/types";
import { NewHandoverView } from "@/components/handover-report/NewHandoverView";
import { ViewHandoverView } from "@/components/handover-report/ViewHandoverView";

const PRIORITY_BADGE: Record<HandoverPriority, string> = {
  Normal: "bg-emerald-50 text-[#16A34A]",
  High: "bg-amber-50 text-[#D97706]",
  Urgent: "bg-red-50 text-[#EF4444]",
};

export default function HandoverReport() {
  const [reports, setReports] =
    useState<HandoverReportItem[]>(INITIAL_HANDOVERS);
  const [searchQuery, setSearchQuery] = useState("");
  const [mode, setMode] = useState<"list" | "new" | "view">("list");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const filteredReports = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return reports;
    return reports.filter((r) =>
      `${r.serviceUser} ${r.from} ${r.to} ${r.notes} ${r.priority} ${r.status}`
        .toLowerCase()
        .includes(q)
    );
  }, [reports, searchQuery]);

  const counts = useMemo(() => {
    return {
      total: reports.length,
      confirmed: reports.filter((r) => r.status === "Confirmed").length,
      awaiting: reports.filter((r) => r.status === "Awaiting confirmation")
        .length,
      highUrgent: reports.filter(
        (r) => r.priority === "High" || r.priority === "Urgent"
      ).length,
    };
  }, [reports]);

  const handleConfirm = (id: string) => {
    setReports((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "Confirmed" } : r))
    );
    setToastMessage("Handover confirmed");
  };

  const handleToggleTask = (reportId: string, taskId: string) => {
    setReports((prev) =>
      prev.map((r) =>
        r.id === reportId
          ? {
              ...r,
              pendingTasks: r.pendingTasks.map((t) =>
                t.id === taskId ? { ...t, completed: !t.completed } : t
              ),
            }
          : r
      )
    );
  };

  const handleExportCsv = () => {
    const headers = [
      "Service User",
      "Date",
      "From",
      "To",
      "Shift",
      "Priority",
      "Status",
    ];
    const rows = filteredReports.map((r) => [
      r.serviceUser,
      r.date,
      r.from,
      r.to,
      r.shift,
      r.priority,
      r.status,
    ]);
    const csv = [headers, ...rows]
      .map((row) =>
        row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")
      )
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "handover-reports.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const selectedReport = useMemo(
    () => reports.find((r) => r.id === selectedId) ?? null,
    [reports, selectedId]
  );

  if (mode === "new") {
    return (
      <NewHandoverView
        onCancel={() => setMode("list")}
        onSubmit={(newReport, openNewAfter) => {
          setReports((prev) => [newReport, ...prev]);
          if (!openNewAfter) {
            setMode("list");
          }
        }}
      />
    );
  }

  if (mode === "view" && selectedReport) {
    return (
      <ViewHandoverView
        report={selectedReport}
        onBack={() => {
          setSelectedId(null);
          setMode("list");
        }}
        onConfirm={handleConfirm}
        onToggleTask={handleToggleTask}
      />
    );
  }

  return (
    <div className="space-y-6">
      {toastMessage && (
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-200 text-[#16A34A] text-[13px] font-medium">
            <CheckCircle2 className="w-4 h-4" />
            <span>{toastMessage}</span>
            <button
              type="button"
              onClick={() => setToastMessage(null)}
              aria-label="Dismiss notification"
              className="text-emerald-600 hover:text-emerald-800 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      <Breadcrumb
        pageTitle="HANDOVER REPORTS"
        subtext="End of shift handover management · All shifts tracked and confirmed"
        activePage="Handover reports"
      />

      {/* 4 Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-100 flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-sky-50 text-[#37AADF] flex items-center justify-center shrink-0">
            <ClipboardList className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[20px] font-bold text-[#2E3A59] leading-tight">
              {counts.total}
            </p>
            <p className="text-[12px] text-slate-500">Total</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-100 flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#16A34A] flex items-center justify-center shrink-0">
            <ClipboardCheck className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[20px] font-bold text-[#2E3A59] leading-tight">
              {counts.confirmed}
            </p>
            <p className="text-[12px] text-slate-500">Confirmed</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-100 flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#F59E0B] flex items-center justify-center shrink-0">
            <ClipboardList className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[20px] font-bold text-[#2E3A59] leading-tight">
              {counts.awaiting}
            </p>
            <p className="text-[12px] text-slate-500">Awaiting</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-100 flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-red-50 text-[#EF4444] flex items-center justify-center shrink-0">
            <FileWarning className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[20px] font-bold text-[#2E3A59] leading-tight">
              {counts.highUrgent}
            </p>
            <p className="text-[12px] text-slate-500">High/Urgent</p>
          </div>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="bg-white rounded-2xl p-6 border border-slate-100 space-y-5">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
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

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => setMode("new")}
              className="h-10 px-4 rounded-full bg-[#F4F6F9] hover:bg-slate-200/70 text-[#2E3A59] text-[13px] font-medium inline-flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4 text-slate-500" />
              Import
            </button>

            <button
              type="button"
              onClick={handleExportCsv}
              className="h-10 px-4 rounded-full bg-[#F4F6F9] hover:bg-slate-200/70 text-[#2E3A59] text-[13px] font-medium inline-flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Upload className="w-4 h-4 text-slate-500" />
              Export
            </button>

            <button
              type="button"
              onClick={() => setMode("new")}
              className="h-10 px-4 rounded-full bg-[#37AADF] hover:bg-[#2F99CA] text-white text-[13px] font-medium inline-flex items-center gap-2 transition-colors cursor-pointer"
            >
              <span className="w-4 h-4 rounded-full bg-white/25 flex items-center justify-center">
                <Plus className="w-3 h-3 text-white" />
              </span>
              New handover
            </button>
          </div>
        </div>

        {/* Handover Cards */}
        <div className="space-y-4">
          {filteredReports.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-[13px]">
              No handover reports found.
            </div>
          ) : (
            filteredReports.map((report) => (
              <div
                key={report.id}
                className="rounded-xl border border-slate-100 p-5 bg-white hover:border-slate-200 transition-colors space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h3 className="text-[14px] font-bold text-[#2E3A59]">
                    {report.serviceUser}
                  </h3>

                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase ${PRIORITY_BADGE[report.priority]}`}
                    >
                      {report.priority}
                    </span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[11px] font-medium ${
                        report.status === "Confirmed"
                          ? "bg-emerald-50 text-[#16A34A]"
                          : "bg-amber-50 text-[#D97706]"
                      }`}
                    >
                      {report.status}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-[12px] text-slate-500">
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#37AADF]" />
                    {report.date}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#37AADF]" />
                    {report.from} → {report.to}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#37AADF]" />
                    {report.shift}
                  </span>
                  {report.bodyMarkers.length > 0 && (
                    <span className="inline-flex items-center gap-1.5 text-slate-600">
                      <AlertCircle className="w-3.5 h-3.5 text-[#EF4444]" />
                      {report.bodyMarkers.length} body marker
                      {report.bodyMarkers.length > 1 ? "s" : ""}
                    </span>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
                  <p className="text-[13px] text-slate-600 line-clamp-2 max-w-2xl">
                    {report.notes}
                  </p>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedId(report.id);
                        setMode("view");
                      }}
                      className="h-9 px-4 rounded-full bg-[#F4F6F9] hover:bg-slate-200/70 text-[#2E3A59] text-[12px] font-medium transition-colors cursor-pointer"
                    >
                      View details
                    </button>

                    {report.status === "Awaiting confirmation" && (
                      <button
                        type="button"
                        onClick={() => handleConfirm(report.id)}
                        className="h-9 px-4 rounded-full bg-[#16A34A] hover:bg-[#15803D] text-white text-[12px] font-semibold transition-colors cursor-pointer"
                      >
                        Confirm
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

