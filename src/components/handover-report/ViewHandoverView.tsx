import { AlertCircle, ArrowLeft, Check } from "lucide-react";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { BodyMapSvg } from "./BodyMapSvg";
import type { HandoverReportItem, MarkerSeverity } from "./types";

interface ViewHandoverViewProps {
  report: HandoverReportItem;
  onBack: () => void;
  onConfirm: (id: string) => void;
  onToggleTask: (reportId: string, taskId: string) => void;
}

const SEVERITY_BADGE: Record<MarkerSeverity, string> = {
  Mild: "bg-sky-50 text-[#0284C7]",
  Moderate: "bg-amber-50 text-[#D97706]",
  Severe: "bg-red-50 text-[#EF4444]",
};

export function ViewHandoverView({
  report,
  onBack,
  onConfirm,
  onToggleTask,
}: ViewHandoverViewProps) {
  const isConfirmed = report.status === "Confirmed";

  const priorityPillClass =
    report.priority === "High"
      ? "bg-amber-50 text-[#D97706]"
      : report.priority === "Urgent"
        ? "bg-red-50 text-[#EF4444]"
        : "bg-emerald-50 text-[#16A34A]";

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            aria-label="Back to handover reports"
            className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center text-[#2E3A59] hover:bg-slate-50 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <h1 className="text-[18px] font-bold text-[#2E3A59] tracking-tight">
            VIEW HANDOVER DETAILS
          </h1>
        </div>

        <div className="hidden sm:block">
          <Breadcrumb
            pageTitle=""
            subtext=""
            activePage="View handover details"
            breadcrumbs={[
              { label: "Dashboard", path: "/dashboard" },
              { label: "Handover reports", path: "/handover-report" },
            ]}
          />
        </div>
      </div>

      {/* Main Details Card */}
      <div className="bg-white rounded-2xl p-6 border border-slate-100 space-y-5">
        {/* Banner Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
          <div>
            <h2 className="text-[16px] font-bold text-[#2E3A59]">
              Handover report
            </h2>
            <div className="flex flex-wrap items-center gap-2 mt-1 text-[12px] text-slate-400">
              <span>{report.date} ·</span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#EBF6FC] text-[#37AADF] font-medium text-[11px]">
                {report.from} → {report.to}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <span
              className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase ${priorityPillClass}`}
            >
              {report.priority} priority
            </span>

            {!isConfirmed ? (
              <button
                type="button"
                onClick={() => onConfirm(report.id)}
                className="h-9 px-4 rounded-full bg-[#16A34A] hover:bg-[#15803D] text-white text-[12px] font-semibold transition-colors cursor-pointer"
              >
                Confirm receipt
              </button>
            ) : (
              <span className="h-9 px-4 rounded-full bg-emerald-50 text-[#16A34A] text-[12px] font-semibold inline-flex items-center">
                Confirmed
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* Left Column */}
          <div className="lg:col-span-6 space-y-5">
            {/* Handover Details */}
            <div className="rounded-2xl p-5 border border-slate-100 space-y-3 text-[12px]">
              <h3 className="text-[12px] font-bold uppercase tracking-wide text-[#2E3A59]">
                Handover details
              </h3>

              <div className="divide-y divide-slate-100">
                {[
                  { label: "Service user", value: report.serviceUser },
                  { label: "From", value: report.from },
                  { label: "To", value: report.to },
                  { label: "Shift", value: report.shift },
                  { label: "Date", value: report.date },
                ].map((row) => (
                  <div
                    key={row.label}
                    className="py-2.5 flex items-center justify-between gap-4"
                  >
                    <span className="text-slate-400">{row.label}</span>
                    <span className="font-semibold text-[#2E3A59] text-right">
                      {row.value}
                    </span>
                  </div>
                ))}

                <div className="py-2.5 flex items-center justify-between gap-4">
                  <span className="text-slate-400">Status</span>
                  <span
                    className={`font-semibold ${
                      isConfirmed ? "text-[#16A34A]" : "text-[#F59E0B]"
                    }`}
                  >
                    {report.status}
                  </span>
                </div>
              </div>

              <div className="pt-1">
                <p className="text-slate-400 mb-1">Handover notes</p>
                <p className="text-[#2E3A59] leading-relaxed font-medium">
                  {report.notes}
                </p>
              </div>
            </div>

            {/* Risk Flags */}
            <div className="rounded-2xl p-5 border border-slate-100 space-y-3">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-[#EF4444]" />
                <h3 className="text-[12px] font-bold uppercase tracking-wide text-[#2E3A59]">
                  Risk flags
                </h3>
              </div>

              {report.riskFlags.length === 0 ? (
                <p className="text-[12px] text-slate-400">
                  No risk flags recorded.
                </p>
              ) : (
                <div className="divide-y divide-slate-100 text-[12px]">
                  {report.riskFlags.map((risk, idx) => (
                    <div key={idx} className="py-2.5 flex items-center gap-2.5">
                      <span className="w-2 h-2 rounded-full bg-[#EF4444] shrink-0" />
                      <span className="text-[#2E3A59]">{risk}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Pending Tasks */}
            <div className="rounded-2xl p-5 border border-slate-100 space-y-3">
              <h3 className="text-[12px] font-bold uppercase tracking-wide text-[#2E3A59]">
                Pending tasks
              </h3>

              <div className="divide-y divide-slate-100 text-[12px]">
                {report.pendingTasks.map((task) => (
                  <div
                    key={task.id}
                    className="py-2.5 flex items-center justify-between gap-3"
                  >
                    <button
                      type="button"
                      onClick={() => onToggleTask(report.id, task.id)}
                      className="flex items-center gap-2.5 text-left cursor-pointer"
                    >
                      <span
                        className={`w-4 h-4 rounded flex items-center justify-center border transition-colors ${
                          task.completed
                            ? "bg-[#37AADF] border-[#37AADF] text-white"
                            : "border-slate-200 bg-slate-50"
                        }`}
                      >
                        {task.completed && <Check className="w-3 h-3" />}
                      </span>
                      <span
                        className={
                          task.completed
                            ? "line-through text-slate-400"
                            : "text-[#2E3A59]"
                        }
                      >
                        {task.label}
                      </span>
                    </button>

                    {!task.completed && (
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[#2E3A59]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />
                        Pending
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-6 space-y-5">
            {/* Body Injury / Concern Map */}
            <div className="rounded-2xl p-5 border border-slate-100 space-y-4">
              <h3 className="text-[12px] font-bold uppercase tracking-wide text-[#2E3A59]">
                Body injury / Concern map
              </h3>

              <div className="rounded-xl bg-[#F4F7FA] p-5">
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                  <div className="sm:col-span-5">
                    <BodyMapSvg
                      markers={report.bodyMarkers}
                      highlightLeftArm={report.bodyMarkers.length > 0}
                    />
                  </div>

                  <div className="sm:col-span-7 space-y-2.5">
                    {report.bodyMarkers.length === 0 ? (
                      <p className="text-[12px] text-slate-400">
                        No body markers recorded.
                      </p>
                    ) : (
                      report.bodyMarkers.map((m, idx) => (
                        <div
                          key={m.id}
                          className="bg-white rounded-xl p-3.5 border border-slate-100 flex items-start gap-2.5"
                        >
                          <span className="w-5 h-5 rounded-full bg-[#EF4444] text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                            {idx + 1}
                          </span>
                          <div className="space-y-1">
                            <p className="text-[12px] font-bold text-[#2E3A59]">
                              {m.type}
                            </p>
                            <p className="text-[11px] text-slate-400">
                              {m.notes}
                            </p>
                            <span
                              className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold ${SEVERITY_BADGE[m.severity]}`}
                            >
                              {m.severity}
                            </span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Confirmation Required */}
            {!isConfirmed && (
              <div className="rounded-2xl p-5 border border-slate-100 space-y-3">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-[#F59E0B]" />
                  <h3 className="text-[13px] font-bold text-[#2E3A59]">
                    Confirmation required
                  </h3>
                </div>
                <p className="text-[12px] text-slate-500">
                  {report.to} must confirm they have received and read this
                  handover before starting their shift.
                </p>
                <div className="pt-1 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => onConfirm(report.id)}
                    className="mt-3 h-9 px-5 rounded-full bg-[#FACC15] hover:bg-[#EAB308] text-[#2E3A59] text-[12px] font-semibold transition-colors cursor-pointer"
                  >
                    Confirm I&apos;ve read this handover
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

