import { useState } from "react";
import { AlertCircle, ArrowLeft, Check, Plus, X } from "lucide-react";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Modal } from "@/components/ui/Modal";
import { BodyMapSvg } from "./BodyMapSvg";
import type {
  BodyMarker,
  HandoverPriority,
  HandoverReportItem,
  MarkerSeverity,
} from "./types";

interface NewHandoverViewProps {
  onCancel: () => void;
  onSubmit: (report: HandoverReportItem, openNewAfter?: boolean) => void;
}

const SEVERITY_BADGE: Record<MarkerSeverity, string> = {
  Mild: "bg-sky-50 text-[#0284C7]",
  Moderate: "bg-amber-50 text-[#D97706]",
  Severe: "bg-red-50 text-[#EF4444]",
};

export function NewHandoverView({ onCancel, onSubmit }: NewHandoverViewProps) {
  const [serviceUser, setServiceUser] = useState("SU-001 – Margaret Thompson");
  const [handOverTo, setHandOverTo] = useState("Daniel Adeyemi");
  const [shift, setShift] = useState("Morning → Afternoon");
  const [priority, setPriority] = useState<HandoverPriority>("Normal");
  const [notes, setNotes] = useState("");

  const [riskFlags, setRiskFlags] = useState<string[]>(["", ""]);
  const [pendingTasks, setPendingTasks] = useState<string[]>([""]);

  const [markers, setMarkers] = useState<BodyMarker[]>([]);
  const [pendingPoint, setPendingPoint] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [markerType, setMarkerType] = useState("");
  const [markerSeverity, setMarkerSeverity] =
    useState<MarkerSeverity>("Moderate");
  const [markerNotes, setMarkerNotes] = useState("");

  const [submittedItem, setSubmittedItem] =
    useState<HandoverReportItem | null>(null);

  const handleAddMarker = () => {
    if (!pendingPoint) return;
    setMarkers((prev) => [
      ...prev,
      {
        id: `bm-${Date.now()}`,
        x: pendingPoint.x,
        y: pendingPoint.y,
        type: markerType || "Left forearm bruise",
        severity: markerSeverity,
        notes: markerNotes.trim() || "Dark purple, ~3cm",
      },
    ]);
    setPendingPoint(null);
    setMarkerType("");
    setMarkerNotes("");
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newItem: HandoverReportItem = {
      id: `ho-${Date.now()}`,
      serviceUser,
      from: "Sarah Collins",
      to: handOverTo,
      shift,
      date: new Date().toISOString().slice(0, 10),
      priority,
      status: "Awaiting confirmation",
      notes:
        notes.trim() ||
        "Service user stable. Medications administered on schedule.",
      riskFlags: riskFlags.map((r) => r.trim()).filter(Boolean),
      pendingTasks: pendingTasks
        .map((t) => t.trim())
        .filter(Boolean)
        .map((label, idx) => ({
          id: `pt-${Date.now()}-${idx}`,
          label,
          completed: false,
        })),
      bodyMarkers: markers,
    };
    setSubmittedItem(newItem);
  };

  const resetForm = () => {
    setNotes("");
    setRiskFlags(["", ""]);
    setPendingTasks([""]);
    setMarkers([]);
    setPendingPoint(null);
    setSubmittedItem(null);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onCancel}
            aria-label="Back to handover reports"
            className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center text-[#2E3A59] hover:bg-slate-50 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <h1 className="text-[18px] font-bold text-[#2E3A59] tracking-tight">
            NEW HANDOVER REPORT
          </h1>
        </div>

        <div className="hidden sm:block">
          <Breadcrumb
            pageTitle=""
            subtext=""
            activePage="New handover report"
            breadcrumbs={[
              { label: "Dashboard", path: "/dashboard" },
              { label: "Handover reports", path: "/handover-report" },
            ]}
          />
        </div>
      </div>

      <form onSubmit={handleFormSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* Left Column */}
          <div className="lg:col-span-6 space-y-5">
            {/* Handover Details */}
            <div className="bg-white rounded-2xl p-5 border border-slate-100 space-y-4">
              <h3 className="text-[12px] font-bold uppercase tracking-wide text-[#2E3A59]">
                Handover details
              </h3>

              <div>
                <label className="block text-[12px] font-medium text-[#2E3A59] mb-1.5">
                  Service user
                </label>
                <select
                  value={serviceUser}
                  onChange={(e) => setServiceUser(e.target.value)}
                  className="w-full h-10 px-4 rounded-full border border-slate-200 text-[12px] text-[#2E3A59] bg-white focus:outline-none focus:ring-2 focus:ring-[#37AADF]/30"
                >
                  <option value="SU-001 – Margaret Thompson">
                    SU-001 – Margaret Thompson
                  </option>
                  <option value="SU-002 – James Okafor">
                    SU-002 – James Okafor
                  </option>
                  <option value="SU-003 – Eleanor Vance">
                    SU-003 – Eleanor Vance
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-[12px] font-medium text-[#2E3A59] mb-1.5">
                  Hand over to
                </label>
                <select
                  value={handOverTo}
                  onChange={(e) => setHandOverTo(e.target.value)}
                  className="w-full h-10 px-4 rounded-full border border-slate-200 text-[12px] text-[#2E3A59] bg-white focus:outline-none focus:ring-2 focus:ring-[#37AADF]/30"
                >
                  <option value="Daniel Adeyemi">Daniel Adeyemi</option>
                  <option value="Priya Sharma">Priya Sharma</option>
                  <option value="Sarah Collins">Sarah Collins</option>
                </select>
              </div>

              <div>
                <label className="block text-[12px] font-medium text-[#2E3A59] mb-1.5">
                  Shift
                </label>
                <select
                  value={shift}
                  onChange={(e) => setShift(e.target.value)}
                  className="w-full h-10 px-4 rounded-full border border-slate-200 text-[12px] text-[#2E3A59] bg-white focus:outline-none focus:ring-2 focus:ring-[#37AADF]/30"
                >
                  <option value="Morning → Afternoon">
                    Morning → Afternoon
                  </option>
                  <option value="Afternoon → Night">Afternoon → Night</option>
                  <option value="Night → Morning">Night → Morning</option>
                </select>
              </div>

              <div>
                <label className="block text-[12px] font-medium text-[#2E3A59] mb-1.5">
                  Priority
                </label>
                <div className="flex items-center gap-2">
                  {(["Normal", "High", "Urgent"] as HandoverPriority[]).map(
                    (p) => {
                      const active = priority === p;
                      const activeClass =
                        p === "Normal"
                          ? "bg-[#16A34A] border-[#16A34A] text-white"
                          : p === "High"
                            ? "bg-[#F59E0B] border-[#F59E0B] text-white"
                            : "bg-[#EF4444] border-[#EF4444] text-white";
                      return (
                        <button
                          key={p}
                          type="button"
                          onClick={() => setPriority(p)}
                          className={`h-8 px-4 rounded-full border text-[12px] font-medium transition-colors cursor-pointer ${
                            active
                              ? activeClass
                              : "border-slate-200 text-[#2E3A59] bg-white hover:bg-slate-50"
                          }`}
                        >
                          {p}
                        </button>
                      );
                    }
                  )}
                </div>
              </div>

              <div>
                <label className="block text-[12px] font-medium text-[#2E3A59] mb-1.5">
                  Handover notes
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Patient status, mood, medication given, anything the next worker needs to know..."
                  className="w-full p-3.5 rounded-xl border border-slate-200 text-[12px] text-[#2E3A59] placeholder:text-slate-400 resize-none focus:outline-none focus:ring-2 focus:ring-[#37AADF]/30"
                />
              </div>
            </div>

            {/* Risk Flags */}
            <div className="bg-white rounded-2xl p-5 border border-slate-100 space-y-3">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-[#EF4444]" />
                <h3 className="text-[12px] font-bold uppercase tracking-wide text-[#2E3A59]">
                  Risk flags
                </h3>
              </div>

              <div className="space-y-2.5">
                {riskFlags.map((risk, idx) => (
                  <div key={idx} className="flex items-center gap-2.5">
                    <input
                      type="text"
                      value={risk}
                      onChange={(e) =>
                        setRiskFlags((prev) =>
                          prev.map((item, i) =>
                            i === idx ? e.target.value : item
                          )
                        )
                      }
                      placeholder={`Risks ${idx + 1}...`}
                      className="flex-1 h-10 px-4 rounded-full border border-slate-200 text-[12px] text-[#2E3A59] placeholder:text-slate-400"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setRiskFlags((prev) => prev.filter((_, i) => i !== idx))
                      }
                      aria-label="Remove risk"
                      className="text-red-500 hover:text-red-600 p-1 cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setRiskFlags((prev) => [...prev, ""])}
                className="h-8 px-3.5 rounded-full bg-[#F4F6F9] hover:bg-slate-200/70 text-[#2E3A59] text-[12px] font-medium inline-flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                Add risks
              </button>
            </div>

            {/* Pending Tasks */}
            <div className="bg-white rounded-2xl p-5 border border-slate-100 space-y-3">
              <h3 className="text-[12px] font-bold uppercase tracking-wide text-[#2E3A59]">
                Pending tasks
              </h3>

              <div className="space-y-2.5">
                {pendingTasks.map((task, idx) => (
                  <div key={idx} className="flex items-center gap-2.5">
                    <input
                      type="text"
                      value={task}
                      onChange={(e) =>
                        setPendingTasks((prev) =>
                          prev.map((item, i) =>
                            i === idx ? e.target.value : item
                          )
                        )
                      }
                      placeholder={`Tasks ${idx + 1}...`}
                      className="flex-1 h-10 px-4 rounded-full border border-slate-200 text-[12px] text-[#2E3A59] placeholder:text-slate-400"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setPendingTasks((prev) =>
                          prev.filter((_, i) => i !== idx)
                        )
                      }
                      aria-label="Remove task"
                      className="text-red-500 hover:text-red-600 p-1 cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setPendingTasks((prev) => [...prev, ""])}
                className="h-8 px-3.5 rounded-full bg-[#F4F6F9] hover:bg-slate-200/70 text-[#2E3A59] text-[12px] font-medium inline-flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                Add tasks
              </button>
            </div>
          </div>

          {/* Right Column: Body Injury / Concern Map */}
          <div className="lg:col-span-6 bg-white rounded-2xl p-5 border border-slate-100 space-y-4">
            <h3 className="text-[12px] font-bold uppercase tracking-wide text-[#2E3A59]">
              Body injury / Concern map
            </h3>

            <div className="rounded-xl bg-[#F4F7FA] p-5 space-y-4">
              <div>
                <p className="text-[12px] font-semibold text-[#2E3A59]">
                  Click on the body diagram to mark injury or concern locations.
                </p>
                {markers.length === 0 && !pendingPoint && (
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    No markers added yet. Click diagram to mark.
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                <div
                  className={
                    pendingPoint || markers.length > 0
                      ? "sm:col-span-5"
                      : "sm:col-span-12 py-4"
                  }
                >
                  <BodyMapSvg
                    markers={markers}
                    pendingPoint={pendingPoint}
                    interactive
                    onMapClick={(x, y) => setPendingPoint({ x, y })}
                  />
                </div>

                {pendingPoint ? (
                  <div className="sm:col-span-7 bg-white rounded-xl p-4 border border-slate-100 space-y-3">
                    <h4 className="text-[12px] font-bold uppercase text-[#2E3A59]">
                      Add marker detail
                    </h4>

                    <div>
                      <label className="block text-[11px] font-medium text-[#2E3A59] mb-1">
                        Type
                      </label>
                      <select
                        value={markerType}
                        onChange={(e) => setMarkerType(e.target.value)}
                        className="w-full h-9 px-3 rounded-full border border-slate-200 text-[12px] text-[#2E3A59] bg-white"
                      >
                        <option value="">Select...</option>
                        <option value="Left forearm bruise">
                          Left forearm bruise
                        </option>
                        <option value="Leg swelling">Leg swelling</option>
                        <option value="Eyes redness">Eyes redness</option>
                        <option value="Cut / Abrasion">Cut / Abrasion</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-[#2E3A59] mb-1">
                        Severity
                      </label>
                      <select
                        value={markerSeverity}
                        onChange={(e) =>
                          setMarkerSeverity(e.target.value as MarkerSeverity)
                        }
                        className="w-full h-9 px-3 rounded-full border border-slate-200 text-[12px] text-[#2E3A59] bg-white"
                      >
                        <option value="Mild">Mild</option>
                        <option value="Moderate">Moderate</option>
                        <option value="Severe">Severe</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-[#2E3A59] mb-1">
                        Notes
                      </label>
                      <textarea
                        rows={2}
                        value={markerNotes}
                        onChange={(e) => setMarkerNotes(e.target.value)}
                        placeholder="Enter..."
                        className="w-full p-2.5 rounded-xl border border-slate-200 text-[12px] text-[#2E3A59] resize-none"
                      />
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-1">
                      <button
                        type="button"
                        onClick={handleAddMarker}
                        className="h-8 px-4 rounded-full bg-[#37AADF] hover:bg-[#2F99CA] text-white text-[12px] font-medium cursor-pointer"
                      >
                        Add
                      </button>
                      <button
                        type="button"
                        onClick={() => setPendingPoint(null)}
                        className="h-8 px-4 rounded-full bg-[#F4F6F9] text-[#2E3A59] text-[12px] font-medium cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : markers.length > 0 ? (
                  <div className="sm:col-span-7 space-y-2.5">
                    {markers.map((m, idx) => (
                      <div
                        key={m.id}
                        className="bg-white rounded-xl p-3.5 border border-slate-100 flex items-start justify-between gap-3"
                      >
                        <div className="flex items-start gap-2.5">
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

                        <button
                          type="button"
                          onClick={() =>
                            setMarkers((prev) =>
                              prev.filter((item) => item.id !== m.id)
                            )
                          }
                          aria-label="Remove marker"
                          className="text-red-500 hover:text-red-600 cursor-pointer"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-100">
          <button
            type="submit"
            className="h-10 px-6 rounded-full bg-[#37AADF] hover:bg-[#2F99CA] text-white text-[13px] font-medium transition-colors cursor-pointer"
          >
            Submit handover
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="h-10 px-6 rounded-full bg-[#F4F6F9] hover:bg-slate-200/70 text-[#2E3A59] text-[13px] font-medium transition-colors cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </form>

      {/* Handover Submitted Modal */}
      <Modal
        isOpen={Boolean(submittedItem)}
        onClose={() => {
          if (submittedItem) onSubmit(submittedItem, false);
        }}
        title="Handover submitted"
        width="max-w-[480px]"
      >
        {submittedItem && (
          <div className="space-y-5">
            <div className="w-9 h-9 rounded-full bg-[#16A34A] text-white flex items-center justify-center">
              <Check className="w-5 h-5" />
            </div>

            <p className="text-[13px] text-slate-600">
              {submittedItem.to} has been notified and must confirm receipt.
              This handover is flagged as {submittedItem.priority.toLowerCase()}{" "}
              priority.
            </p>

            <div className="space-y-2.5 text-[13px] border-t border-slate-100 pt-4">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Handed over to</span>
                <span className="font-semibold text-[#2E3A59]">
                  {submittedItem.to}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Service user</span>
                <span className="font-semibold text-[#2E3A59]">
                  {submittedItem.serviceUser}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Priority</span>
                <span
                  className={`font-bold uppercase ${
                    submittedItem.priority === "High"
                      ? "text-[#F59E0B]"
                      : submittedItem.priority === "Urgent"
                        ? "text-[#EF4444]"
                        : "text-[#16A34A]"
                  }`}
                >
                  {submittedItem.priority}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Notification</span>
                <span className="font-semibold text-[#2E3A59]">
                  Sent to {submittedItem.to}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Confirmation required</span>
                <span className="font-semibold text-[#2E3A59]">
                  Yes – must read &amp; confirm
                </span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  onSubmit(submittedItem, true);
                  resetForm();
                }}
                className="h-10 px-5 rounded-full bg-[#16A34A] hover:bg-[#15803D] text-white text-[13px] font-medium cursor-pointer"
              >
                New handover
              </button>
              <button
                type="button"
                onClick={() => onSubmit(submittedItem, false)}
                className="h-10 px-5 rounded-full bg-[#F4F6F9] hover:bg-slate-200/70 text-[#2E3A59] text-[13px] font-medium cursor-pointer"
              >
                View all
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

