import { useState } from "react";
import {
  ArrowLeft,
  ChevronDown,
  ChevronRight,
  Copy,
  FileSpreadsheet,
  FileText,
} from "lucide-react";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import type { Rota } from "@/constants/rotas";
import {
  ShiftDetailsDrawer,
  type SelectedShiftInfo,
} from "./ShiftDetailsDrawer";

interface ViewRotaViewProps {
  rota: Rota;
  onBack: () => void;
}

interface StaffScheduleItem {
  id: string;
  name: string;
  initials: string;
  role: "Care workers" | "Support staff" | "Supervisors";
  totalHours: string;
  shifts: { code: "E" | "L" | "N"; time: string; name: string }[];
}

const DAYS = [
  "Mon 12 Feb",
  "Tue 13 Feb",
  "Wed 14 Feb",
  "Thu 15 Feb",
  "Fri 16 Feb",
];

const SCHEDULE_DATA: StaffScheduleItem[] = [
  {
    id: "st-1",
    name: "Emily Johnson",
    initials: "EJ",
    role: "Care workers",
    totalHours: "42h",
    shifts: [
      { code: "E", time: "6:00am - 2:00pm", name: "Early shift" },
      { code: "E", time: "6:00am - 2:00pm", name: "Early shift" },
      { code: "L", time: "6:00am - 2:00pm", name: "Late shift" },
      { code: "E", time: "6:00am - 2:00pm", name: "Early shift" },
      { code: "E", time: "6:00am - 2:00pm", name: "Early shift" },
    ],
  },
  {
    id: "st-2",
    name: "Michael Brown",
    initials: "MB",
    role: "Care workers",
    totalHours: "42h",
    shifts: [
      { code: "E", time: "6:00am - 2:00pm", name: "Early shift" },
      { code: "E", time: "6:00am - 2:00pm", name: "Early shift" },
      { code: "L", time: "6:00am - 2:00pm", name: "Late shift" },
      { code: "E", time: "6:00am - 2:00pm", name: "Early shift" },
      { code: "E", time: "6:00am - 2:00pm", name: "Early shift" },
    ],
  },
  {
    id: "st-3",
    name: "Sarah Oche",
    initials: "SO",
    role: "Care workers",
    totalHours: "42h",
    shifts: [
      { code: "N", time: "6:00am - 2:00pm", name: "Night shift" },
      { code: "N", time: "6:00am - 2:00pm", name: "Night shift" },
      { code: "N", time: "6:00am - 2:00pm", name: "Night shift" },
      { code: "N", time: "6:00am - 2:00pm", name: "Night shift" },
      { code: "N", time: "6:00am - 2:00pm", name: "Night shift" },
    ],
  },
  {
    id: "st-4",
    name: "Ben Zan",
    initials: "BZ",
    role: "Care workers",
    totalHours: "42h",
    shifts: [
      { code: "E", time: "6:00am - 2:00pm", name: "Early shift" },
      { code: "E", time: "6:00am - 2:00pm", name: "Early shift" },
      { code: "L", time: "6:00am - 2:00pm", name: "Late shift" },
      { code: "E", time: "6:00am - 2:00pm", name: "Early shift" },
      { code: "E", time: "6:00am - 2:00pm", name: "Early shift" },
    ],
  },
  {
    id: "st-5",
    name: "David Wilson",
    initials: "DW",
    role: "Support staff",
    totalHours: "40h",
    shifts: [
      { code: "E", time: "6:00am - 2:00pm", name: "Early shift" },
      { code: "E", time: "6:00am - 2:00pm", name: "Early shift" },
      { code: "E", time: "6:00am - 2:00pm", name: "Early shift" },
      { code: "L", time: "2:00pm - 10:00pm", name: "Late shift" },
      { code: "L", time: "2:00pm - 10:00pm", name: "Late shift" },
    ],
  },
  {
    id: "st-6",
    name: "Carol Davis",
    initials: "CD",
    role: "Supervisors",
    totalHours: "40h",
    shifts: [
      { code: "E", time: "6:00am - 2:00pm", name: "Early shift" },
      { code: "E", time: "6:00am - 2:00pm", name: "Early shift" },
      { code: "E", time: "6:00am - 2:00pm", name: "Early shift" },
      { code: "E", time: "6:00am - 2:00pm", name: "Early shift" },
      { code: "E", time: "6:00am - 2:00pm", name: "Early shift" },
    ],
  },
];

export function ViewRotaView({ rota, onBack }: ViewRotaViewProps) {
  const [roleFilter, setRoleFilter] = useState("All roles");
  const [expandedRoles, setExpandedRoles] = useState<Record<string, boolean>>({
    "Care workers": true,
    "Support staff": false,
    Supervisors: false,
  });
  const [selectedShift, setSelectedShift] =
    useState<SelectedShiftInfo | null>(null);

  const handleDownloadExcel = () => {
    const csv = [
      ["Staff", "Role", "Total Hours", ...DAYS],
      ...SCHEDULE_DATA.map((s) => [
        s.name,
        s.role,
        s.totalHours,
        ...s.shifts.map((sh) => `${sh.code} ${sh.time}`),
      ]),
    ]
      .map((r) => r.join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${rota.title.toLowerCase().replace(/\s+/g, "-")}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadPdf = () => {
    window.print();
  };

  const rolesMeta: {
    name: "Care workers" | "Support staff" | "Supervisors";
    countLabel: string;
    hours: string;
  }[] = [
    { name: "Care workers", countLabel: "Care workers (30)", hours: "840h" },
    { name: "Support staff", countLabel: "Support staff (31)", hours: "280h" },
    { name: "Supervisors", countLabel: "Supervisors (5)", hours: "140h" },
  ];

  const badgeStyle = (code: "E" | "L" | "N") =>
    code === "E"
      ? "bg-emerald-100 text-[#16A34A]"
      : code === "L"
        ? "bg-amber-100 text-[#D97706]"
        : "bg-sky-100 text-[#0284C7]";

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            aria-label="Back to rotas"
            className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center text-[#2E3A59] hover:bg-slate-50 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="text-[18px] font-bold text-[#2E3A59] tracking-tight">
              ROTA MANAGEMENT
            </h1>
            <p className="text-[12px] text-slate-500">
              Create, publish, and manage rotas across all regions
            </p>
          </div>
        </div>

        <div className="hidden sm:block">
          <Breadcrumb
            pageTitle=""
            subtext=""
            activePage="View rota"
            breadcrumbs={[
              { label: "Dashboard", path: "/dashboard" },
              { label: "Rota management", path: "/rota-management" },
            ]}
          />
        </div>
      </div>

      {/* Top Banner */}
      <div className="bg-white rounded-2xl p-5 border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2 text-[11px]">
            <span className="font-semibold text-[#37AADF] inline-flex items-center gap-1.5">
              Rota ID: {rota.rotaId ?? "CMP-0041"}
              <button
                type="button"
                onClick={() =>
                  navigator.clipboard
                    ?.writeText(rota.rotaId ?? "CMP-0041")
                    .catch(() => {})
                }
                aria-label="Copy rota ID"
                className="text-slate-400 hover:text-[#37AADF] cursor-pointer"
              >
                <Copy className="w-3 h-3" />
              </button>
            </span>

            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-[#16A34A] font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
              {rota.status}
            </span>
          </div>

          <h2 className="text-[17px] font-bold text-[#2E3A59]">{rota.title}</h2>
          <p className="text-[12px] text-slate-400">
            Period:{" "}
            <span className="text-[#37AADF] font-medium">{rota.period}</span>
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={handleDownloadExcel}
            className="h-9 px-4 rounded-full bg-[#F4F6F9] hover:bg-slate-200/70 text-[#2E3A59] text-[12px] font-medium inline-flex items-center gap-2 cursor-pointer"
          >
            <FileSpreadsheet className="w-4 h-4 text-[#16A34A]" />
            Download excel
          </button>
          <button
            type="button"
            onClick={handleDownloadPdf}
            className="h-9 px-4 rounded-full bg-[#F4F6F9] hover:bg-slate-200/70 text-[#2E3A59] text-[12px] font-medium inline-flex items-center gap-2 cursor-pointer"
          >
            <FileText className="w-4 h-4 text-[#EF4444]" />
            Download PDF
          </button>
        </div>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-7 gap-3">
        {[
          { label: "Staff assigned", value: String(rota.staffCount), color: "text-[#2E3A59]" },
          { label: "Published", value: String(rota.shiftsCount), color: "text-[#A855F7]" },
          { label: "Locked", value: `${rota.coverage}%`, color: "text-[#16A34A]" },
          { label: "Status", value: rota.status, color: "text-[#16A34A]" },
          { label: "Region", value: rota.region ?? "North", color: "text-[#2E3A59]" },
          { label: "Created by", value: rota.createdBy, color: "text-[#2E3A59]" },
          { label: "Published date", value: rota.publishedDate ?? "2/10/2026", color: "text-[#2E3A59]" },
        ].map((kpi) => (
          <div
            key={kpi.label}
            className="bg-white rounded-2xl p-4 border border-slate-100"
          >
            <p className={`text-[17px] font-bold ${kpi.color}`}>{kpi.value}</p>
            <p className="text-[11px] text-slate-400 mt-0.5">{kpi.label}</p>
          </div>
        ))}
      </div>

      {/* Analytics Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Coverage Overview */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-5 border border-slate-100">
          <h3 className="text-[12px] font-bold uppercase tracking-wide text-[#2E3A59] mb-4">
            Coverage overview
          </h3>
          <div className="flex items-center gap-6">
            <div className="text-center shrink-0">
              <div className="relative w-20 h-20">
                <svg viewBox="0 0 36 36" className="w-20 h-20 -rotate-90">
                  <circle
                    cx="18"
                    cy="18"
                    r="15"
                    fill="none"
                    stroke="#F1F5F9"
                    strokeWidth="3.5"
                  />
                  <circle
                    cx="18"
                    cy="18"
                    r="15"
                    fill="none"
                    stroke="#22C55E"
                    strokeWidth="3.5"
                    strokeDasharray={`${rota.coverage}, 100`}
                    strokeLinecap="round"
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-[13px] font-bold text-[#16A34A]">
                  {rota.coverage}%
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1.5">
                Overall coverage
              </p>
            </div>

            <div className="flex-1 space-y-2 text-[12px]">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-slate-500">
                  <span className="w-2 h-2 rounded-full bg-[#22C55E]" />
                  Staff assigned
                </span>
                <span className="font-semibold text-[#16A34A]">
                  {rota.staffCount}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-slate-500">
                  <span className="w-2 h-2 rounded-full bg-[#EF4444]" />
                  Uncovered shifts
                </span>
                <span className="font-semibold text-[#EF4444]">
                  {rota.uncoveredShifts ?? 6}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-slate-500">
                  <span className="w-2 h-2 rounded-full bg-[#2E3A59]" />
                  Total shifts
                </span>
                <span className="font-semibold text-[#2E3A59]">
                  {rota.shiftsCount}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Staff Breakdown By Role */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-5 border border-slate-100">
          <h3 className="text-[12px] font-bold uppercase tracking-wide text-[#2E3A59] mb-4">
            Staff breakdown by role
          </h3>
          <div className="flex items-center gap-5">
            <div className="relative w-20 h-20 shrink-0">
              <svg viewBox="0 0 36 36" className="w-20 h-20 -rotate-90">
                <circle
                  cx="18"
                  cy="18"
                  r="13"
                  fill="none"
                  stroke="#E2E8F0"
                  strokeWidth="7"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="13"
                  fill="none"
                  stroke="#7C69EF"
                  strokeWidth="7"
                  strokeDasharray="67 100"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="13"
                  fill="none"
                  stroke="#C4B5FD"
                  strokeWidth="7"
                  strokeDasharray="22 100"
                  strokeDashoffset="-67"
                />
              </svg>
            </div>

            <div className="flex-1 space-y-2 text-[11px]">
              <div className="flex items-center justify-between gap-2">
                <span className="flex items-center gap-1.5 text-slate-500">
                  <span className="w-2 h-2 rounded-full bg-[#7C69EF]" />
                  Care workers
                </span>
                <span className="font-medium text-[#2E3A59]">
                  {rota.roleBreakdown?.careWorkers ?? 30} staff{" "}
                  <span className="text-slate-400">66.7%</span>
                </span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <span className="flex items-center gap-1.5 text-slate-500">
                  <span className="w-2 h-2 rounded-full bg-[#A78BFA]" />
                  Support staff
                </span>
                <span className="font-medium text-[#2E3A59]">
                  {rota.roleBreakdown?.supportStaff ?? 10} staff{" "}
                  <span className="text-slate-400">22.2%</span>
                </span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <span className="flex items-center gap-1.5 text-slate-500">
                  <span className="w-2 h-2 rounded-full bg-[#C4B5FD]" />
                  Supervisors
                </span>
                <span className="font-medium text-[#2E3A59]">
                  {rota.roleBreakdown?.supervisors ?? 5} staff{" "}
                  <span className="text-slate-400">11.1%</span>
                </span>
              </div>
              <div className="flex items-center justify-between pt-1 border-t border-slate-100 font-semibold text-[#2E3A59]">
                <span>Total</span>
                <span>{rota.staffCount} staff</span>
              </div>
            </div>
          </div>
        </div>

        {/* Shift Patterns */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-5 border border-slate-100">
          <h3 className="text-[12px] font-bold uppercase tracking-wide text-[#2E3A59]">
            Shift patterns
          </h3>
          <p className="text-[11px] text-slate-400 mb-3">
            Distribution of shifts across times of day
          </p>

          <div className="space-y-3 text-[11px]">
            {[
              {
                label: "Early (6am-2pm)",
                pct: rota.shiftPatterns?.early.coverage ?? 100,
                assigned: rota.shiftPatterns?.early.assigned ?? 15,
              },
              {
                label: "Late (2pm-10pm)",
                pct: rota.shiftPatterns?.late.coverage ?? 98,
                assigned: rota.shiftPatterns?.late.assigned ?? 15,
              },
              {
                label: "Night (10pm-6am)",
                pct: rota.shiftPatterns?.night.coverage ?? 97,
                assigned: rota.shiftPatterns?.night.assigned ?? 15,
              },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[#2E3A59] font-medium">
                    {item.label}
                  </span>
                  <span className="font-semibold text-[#2E3A59]">
                    {item.pct}%
                  </span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[#22C55E]"
                    style={{ width: `${item.pct}%` }}
                  />
                </div>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  {item.assigned} staff assigned
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Weekly Schedule Overview */}
      <div className="bg-white rounded-2xl p-6 border border-slate-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
          <h3 className="text-[14px] font-bold text-[#2E3A59]">
            Weekly schedule overview
          </h3>
          <div className="flex flex-wrap items-center gap-2.5 text-[12px]">
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="h-9 px-3.5 rounded-full bg-[#F4F6F9] text-[#2E3A59] font-medium"
            >
              <option>All roles</option>
              <option>Care workers</option>
              <option>Support staff</option>
              <option>Supervisors</option>
            </select>
            <select className="h-9 px-3.5 rounded-full bg-[#F4F6F9] text-[#2E3A59] font-medium">
              <option>All locations</option>
            </select>
            <select className="h-9 px-3.5 rounded-full bg-[#F4F6F9] text-[#2E3A59] font-medium">
              <option>All shifts</option>
              <option>Early</option>
              <option>Late</option>
              <option>Night</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[820px]">
            <thead>
              <tr className="border-b border-slate-100 text-[12px] font-semibold text-[#2E3A59]">
                <th className="py-3 px-3">Staff / Role</th>
                <th className="py-3 px-3 text-center">Total hours</th>
                {DAYS.map((day) => (
                  <th key={day} className="py-3 px-2 text-center">
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-[12px]">
              {rolesMeta
                .filter((r) => roleFilter === "All roles" || r.name === roleFilter)
                .map((section) => {
                  const isExpanded = expandedRoles[section.name];
                  const members = SCHEDULE_DATA.filter(
                    (m) => m.role === section.name
                  );

                  return (
                    <>
                      <tr
                        key={section.name}
                        onClick={() =>
                          setExpandedRoles((prev) => ({
                            ...prev,
                            [section.name]: !prev[section.name],
                          }))
                        }
                        className="bg-[#F8FAFC] cursor-pointer hover:bg-slate-100/70"
                      >
                        <td className="py-3 px-3 font-semibold text-[#2E3A59]">
                          <span className="inline-flex items-center gap-2">
                            {isExpanded ? (
                              <ChevronDown className="w-4 h-4 text-slate-400" />
                            ) : (
                              <ChevronRight className="w-4 h-4 text-slate-400" />
                            )}
                            {section.countLabel}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-center font-semibold text-[#2E3A59]">
                          {section.hours}
                        </td>
                        <td colSpan={5} />
                      </tr>

                      {isExpanded &&
                        members.map((member) => (
                          <tr key={member.id} className="hover:bg-slate-50/50">
                            <td className="py-3 px-3 pl-8 whitespace-nowrap">
                              <div className="flex items-center gap-2.5">
                                <span className="w-6 h-6 rounded-full bg-gradient-to-br from-[#37AADF] to-[#0E7490] text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                                  {member.initials}
                                </span>
                                <span className="font-medium text-[#2E3A59]">
                                  {member.name}
                                </span>
                              </div>
                            </td>
                            <td className="py-3 px-3 text-center text-slate-500">
                              {member.totalHours}
                            </td>
                            {member.shifts.map((sh, idx) => (
                              <td
                                key={idx}
                                className="py-2.5 px-2 text-center whitespace-nowrap"
                              >
                                <button
                                  type="button"
                                  onClick={() =>
                                    setSelectedShift({
                                      staffName: member.name,
                                      initials: member.initials,
                                      role: member.role,
                                      dayLabel: DAYS[idx],
                                      shiftCode: sh.code,
                                      shiftName: sh.name,
                                      timeRange: sh.time,
                                    })
                                  }
                                  className="inline-flex items-center gap-1.5 px-2 py-1 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                                >
                                  <span
                                    className={`w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center ${badgeStyle(sh.code)}`}
                                  >
                                    {sh.code}
                                  </span>
                                  <span className="text-[11px] text-slate-600">
                                    {sh.time}
                                  </span>
                                </button>
                              </td>
                            ))}
                          </tr>
                        ))}
                    </>
                  );
                })}

              {/* Daily coverage summary */}
              <tr className="bg-[#F8FAFC] font-semibold">
                <td className="py-3 px-3 text-[#2E3A59]">
                  <p>Daily coverage summary</p>
                  <p className="text-[10px] font-normal text-slate-400">
                    (Assigned/Required)
                  </p>
                </td>
                <td />
                {DAYS.map((d) => (
                  <td key={d} className="py-3 px-2 text-center">
                    <p className="text-[#2E3A59]">46/47</p>
                    <p className="text-[11px] text-[#16A34A]">98%</p>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer Legend & Exports */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-1">
        <div className="flex flex-wrap items-center gap-5 text-[11px] text-slate-500">
          <span className="inline-flex items-center gap-1.5">
            <span className="w-5 h-5 rounded-full bg-emerald-100 text-[#16A34A] font-bold flex items-center justify-center text-[10px]">
              E
            </span>
            Early (6am - 2pm)
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-5 h-5 rounded-full bg-amber-100 text-[#D97706] font-bold flex items-center justify-center text-[10px]">
              L
            </span>
            Late (2pm - 10pm)
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-5 h-5 rounded-full bg-sky-100 text-[#0284C7] font-bold flex items-center justify-center text-[10px]">
              N
            </span>
            Night (10pm - 6am)
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-500 font-bold flex items-center justify-center text-[10px]">
              -
            </span>
            Day off / Unassigned
          </span>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={handleDownloadExcel}
            className="h-9 px-4 rounded-full bg-white border border-slate-200 hover:bg-slate-50 text-[#2E3A59] text-[12px] font-medium inline-flex items-center gap-2 cursor-pointer"
          >
            <FileSpreadsheet className="w-4 h-4 text-[#16A34A]" />
            Download excel
          </button>
          <button
            type="button"
            onClick={handleDownloadPdf}
            className="h-9 px-4 rounded-full bg-white border border-slate-200 hover:bg-slate-50 text-[#2E3A59] text-[12px] font-medium inline-flex items-center gap-2 cursor-pointer"
          >
            <FileText className="w-4 h-4 text-[#EF4444]" />
            Download PDF
          </button>
        </div>
      </div>

      <ShiftDetailsDrawer
        shift={selectedShift}
        onClose={() => setSelectedShift(null)}
      />
    </div>
  );
}

