import { useState } from "react";
import {
  Calendar,
  Check,
  ChevronDown,
  ChevronRight,
  Clock,
  Plus,
  Trash2,
} from "lucide-react";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import type { Rota } from "@/constants/rotas";

interface ShiftPatternItem {
  id: string;
  code: "E" | "L" | "N";
  label: string;
  badgeColor: string;
  startTime: string;
  endTime: string;
  requiredStaff: number;
}

interface StaffScheduleRow {
  id: string;
  name: string;
  role: "Care workers" | "Support staff" | "Supervisors";
  days: ("E" | "L" | "N" | null)[];
}

const DAYS = [
  "Mon 12 Feb",
  "Tue 13 Feb",
  "Wed 14 Feb",
  "Thu 15 Feb",
  "Fri 16 Feb",
  "Sat 17 Feb",
  "Sun 18 Feb",
];

const INITIAL_PATTERNS: ShiftPatternItem[] = [
  {
    id: "p-early",
    code: "E",
    label: "Early (6am - 2pm)",
    badgeColor: "bg-emerald-100 text-[#16A34A]",
    startTime: "",
    endTime: "",
    requiredStaff: 15,
  },
  {
    id: "p-late",
    code: "L",
    label: "Late (2pm - 10pm)",
    badgeColor: "bg-amber-100 text-[#D97706]",
    startTime: "",
    endTime: "",
    requiredStaff: 15,
  },
  {
    id: "p-night",
    code: "N",
    label: "Night (10pm - 6am)",
    badgeColor: "bg-sky-100 text-[#0284C7]",
    startTime: "",
    endTime: "",
    requiredStaff: 15,
  },
];

const INITIAL_STAFF: StaffScheduleRow[] = [
  {
    id: "s-1",
    name: "Emily Johnson",
    role: "Care workers",
    days: [null, null, null, null, null, null, null],
  },
  {
    id: "s-2",
    name: "Michael Brown",
    role: "Care workers",
    days: [null, null, null, null, null, null, null],
  },
  {
    id: "s-3",
    name: "Sarah Oche",
    role: "Care workers",
    days: [null, null, null, null, null, null, null],
  },
  {
    id: "s-4",
    name: "David Wilson",
    role: "Support staff",
    days: [null, null, null, null, null, null, null],
  },
  {
    id: "s-5",
    name: "Carol Davis",
    role: "Supervisors",
    days: [null, null, null, null, null, null, null],
  },
];

interface CreateRotaViewProps {
  initialRota?: Rota | null;
  onCancel: () => void;
  onSave: (rota: Rota) => void;
}

export function CreateRotaView({
  initialRota,
  onCancel,
  onSave,
}: CreateRotaViewProps) {
  const [rotaName, setRotaName] = useState(initialRota?.title ?? "");
  const [region, setRegion] = useState(initialRota?.region ?? "");
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");

  const [patterns, setPatterns] =
    useState<ShiftPatternItem[]>(INITIAL_PATTERNS);
  const [rolesEnabled, setRolesEnabled] = useState({
    careWorkers: true,
    supportStaff: true,
    supervisors: true,
  });
  const [roleCounts, setRoleCounts] = useState({
    careWorkers: 30,
    supportStaff: 30,
    supervisors: 30,
  });

  const [autoAssign, setAutoAssign] = useState(true);
  const [allowOvertime, setAllowOvertime] = useState(true);
  const [minRestHours, setMinRestHours] = useState("11");
  const [publishAfterCreation, setPublishAfterCreation] = useState(false);

  const [staffRows, setStaffRows] = useState<StaffScheduleRow[]>(INITIAL_STAFF);
  const [expandedRoles, setExpandedRoles] = useState<Record<string, boolean>>({
    "Care workers": true,
    "Support staff": false,
    Supervisors: false,
  });

  const cycleShift = (staffId: string, dayIdx: number) => {
    const order: ("E" | "L" | "N" | null)[] = [null, "E", "L", "N"];
    setStaffRows((prev) =>
      prev.map((row) => {
        if (row.id !== staffId) return row;
        const nextDays = [...row.days];
        const current = nextDays[dayIdx];
        const nextVal = order[(order.indexOf(current) + 1) % order.length];
        nextDays[dayIdx] = nextVal;
        return { ...row, days: nextDays };
      })
    );
  };

  const handleAddPattern = () => {
    setPatterns((prev) => [
      ...prev,
      {
        id: `p-${Date.now()}`,
        code: "E",
        label: "Custom shift",
        badgeColor: "bg-emerald-100 text-[#16A34A]",
        startTime: "",
        endTime: "",
        requiredStaff: 10,
      },
    ]);
  };

  const handleSave = (asDraft: boolean) => {
    const totalAssignedShifts = staffRows.reduce(
      (acc, r) => acc + r.days.filter(Boolean).length,
      0
    );
    const totalStaff =
      (rolesEnabled.careWorkers ? roleCounts.careWorkers : 0) +
      (rolesEnabled.supportStaff ? roleCounts.supportStaff : 0) +
      (rolesEnabled.supervisors ? roleCounts.supervisors : 0);

    const newRota: Rota = {
      id: initialRota?.id ?? `RT-${Math.floor(100 + Math.random() * 900)}`,
      title: rotaName.trim() || "North Region - Week 1",
      period:
        startDate && endDate
          ? `${startDate} - ${endDate}`
          : initialRota?.period ?? "2/12/2024 - 2/18/2024",
      staffCount: totalStaff || 45,
      shiftsCount: totalAssignedShifts > 0 ? totalAssignedShifts * 10 : 320,
      coverage: asDraft ? 85 : 98,
      status: asDraft ? "Draft" : publishAfterCreation ? "Published" : "Approved",
      createdBy: initialRota?.createdBy ?? "Alice Johnson",
      rotaId: initialRota?.rotaId ?? "CMP-0041",
      region: region || "North",
      publishedDate: "2/10/2026",
      uncoveredShifts: 6,
      roleBreakdown: {
        careWorkers: roleCounts.careWorkers,
        supportStaff: roleCounts.supportStaff,
        supervisors: roleCounts.supervisors,
      },
      shiftPatterns: {
        early: { assigned: 15, coverage: 100 },
        late: { assigned: 15, coverage: 98 },
        night: { assigned: 15, coverage: 97 },
      },
    };
    onSave(newRota);
  };

  const roleSections: {
    name: "Care workers" | "Support staff" | "Supervisors";
    subtitle: string;
  }[] = [
    { name: "Care workers", subtitle: "Care workers (0/...)" },
    { name: "Support staff", subtitle: "Support staff (0/10)" },
    { name: "Supervisors", subtitle: "Supervisors (0/5)" },
  ];

  return (
    <div className="space-y-5">
      <Breadcrumb
        pageTitle={initialRota ? "EDIT ROTA" : "CREATE ROTA"}
        subtext="Set up the rota details, shift patterns and assign staff"
        activePage={initialRota ? "Edit rota" : "Create rota"}
        breadcrumbs={[
          { label: "Dashboard", path: "/dashboard" },
          { label: "Rota management", path: "/rota-management" },
        ]}
      />

      {/* Top 3-Column Configuration */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Add new */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-5 border border-slate-100 space-y-3.5">
          <h3 className="text-[14px] font-bold text-[#2E3A59]">Add new</h3>

          <div>
            <label className="block text-[12px] font-medium text-[#2E3A59] mb-1">
              Rota name
            </label>
            <input
              type="text"
              value={rotaName}
              onChange={(e) => setRotaName(e.target.value)}
              placeholder="e.g North region - Week 1"
              className="w-full h-10 px-3.5 rounded-full border border-slate-200 text-[12px] text-[#2E3A59] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#37AADF]/30"
            />
          </div>

          <div>
            <label className="block text-[12px] font-medium text-[#2E3A59] mb-1">
              Region
            </label>
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="w-full h-10 px-3.5 rounded-full border border-slate-200 text-[12px] text-[#2E3A59] bg-white focus:outline-none focus:ring-2 focus:ring-[#37AADF]/30"
            >
              <option value="">Select region</option>
              <option value="North">North</option>
              <option value="South">South</option>
              <option value="East">East</option>
              <option value="West">West</option>
            </select>
          </div>

          <div>
            <label className="block text-[12px] font-medium text-[#2E3A59] mb-1">
              Location
            </label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full h-10 px-3.5 rounded-full border border-slate-200 text-[12px] text-[#2E3A59] bg-white focus:outline-none focus:ring-2 focus:ring-[#37AADF]/30"
            >
              <option value="">Select region</option>
              <option value="North Care Home">North Care Home</option>
              <option value="Central Clinic">Central Clinic</option>
              <option value="Westminster Hub">Westminster Hub</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[12px] font-medium text-[#2E3A59] mb-1">
                Start date
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  placeholder="e.g 2/12/2024"
                  className="w-full h-10 pl-3.5 pr-8 rounded-full border border-slate-200 text-[12px] text-[#2E3A59] placeholder:text-slate-400"
                />
                <Calendar className="w-3.5 h-3.5 text-[#37AADF] absolute right-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <label className="block text-[12px] font-medium text-[#2E3A59] mb-1">
                End date
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  placeholder="e.g 2/18/2024"
                  className="w-full h-10 pl-3.5 pr-8 rounded-full border border-slate-200 text-[12px] text-[#2E3A59] placeholder:text-slate-400"
                />
                <Calendar className="w-3.5 h-3.5 text-[#37AADF] absolute right-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-[12px] font-medium text-[#2E3A59] mb-1">
              Description <span className="text-slate-400">(Optional)</span>
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Weekly rota for North Care Home"
              className="w-full p-3.5 rounded-xl border border-slate-200 text-[12px] text-[#2E3A59] placeholder:text-slate-400 resize-none focus:outline-none focus:ring-2 focus:ring-[#37AADF]/30"
            />
          </div>
        </div>

        {/* Middle: Shift patterns */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-5 border border-slate-100 flex flex-col justify-between">
          <div className="space-y-4">
            <div>
              <h3 className="text-[14px] font-bold text-[#2E3A59]">
                Shift patterns
              </h3>
              <p className="text-[11px] text-slate-400">
                Define the shift times and required staff
              </p>
            </div>

            <div className="space-y-4">
              {patterns.map((pattern) => (
                <div
                  key={pattern.id}
                  className="space-y-2 pb-3 border-b border-slate-100 last:border-0"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center ${pattern.badgeColor}`}
                    >
                      {pattern.code}
                    </span>
                    <span className="text-[12px] font-semibold text-[#2E3A59]">
                      {pattern.label}
                    </span>
                  </div>

                  <div className="grid grid-cols-12 gap-2 items-end">
                    <div className="col-span-4">
                      <label className="block text-[11px] text-slate-500 mb-1">
                        Start time
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={pattern.startTime}
                          onChange={(e) =>
                            setPatterns((prev) =>
                              prev.map((p) =>
                                p.id === pattern.id
                                  ? { ...p, startTime: e.target.value }
                                  : p
                              )
                            )
                          }
                          placeholder="--/--"
                          className="w-full h-9 pl-3 pr-7 rounded-full border border-slate-200 text-[11px] text-[#2E3A59]"
                        />
                        <Clock className="w-3 h-3 text-[#37AADF] absolute right-2.5 top-1/2 -translate-y-1/2" />
                      </div>
                    </div>

                    <div className="col-span-4">
                      <label className="block text-[11px] text-slate-500 mb-1">
                        End time
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={pattern.endTime}
                          onChange={(e) =>
                            setPatterns((prev) =>
                              prev.map((p) =>
                                p.id === pattern.id
                                  ? { ...p, endTime: e.target.value }
                                  : p
                              )
                            )
                          }
                          placeholder="--/--"
                          className="w-full h-9 pl-3 pr-7 rounded-full border border-slate-200 text-[11px] text-[#2E3A59]"
                        />
                        <Clock className="w-3 h-3 text-[#37AADF] absolute right-2.5 top-1/2 -translate-y-1/2" />
                      </div>
                    </div>

                    <div className="col-span-3">
                      <label className="block text-[11px] text-slate-500 mb-1">
                        Required staff
                      </label>
                      <input
                        type="number"
                        value={pattern.requiredStaff}
                        onChange={(e) =>
                          setPatterns((prev) =>
                            prev.map((p) =>
                              p.id === pattern.id
                                ? {
                                    ...p,
                                    requiredStaff: Number(e.target.value) || 0,
                                  }
                                : p
                            )
                          )
                        }
                        className="w-full h-9 px-3 rounded-full border border-slate-200 text-[11px] text-[#2E3A59]"
                      />
                    </div>

                    <div className="col-span-1 flex justify-end pb-2">
                      <button
                        type="button"
                        onClick={() =>
                          setPatterns((prev) =>
                            prev.filter((p) => p.id !== pattern.id)
                          )
                        }
                        aria-label="Remove pattern"
                        className="text-red-500 hover:text-red-600 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end pt-3">
            <button
              type="button"
              onClick={handleAddPattern}
              className="h-9 px-4 rounded-full bg-[#F4F6F9] hover:bg-slate-200/70 text-[#2E3A59] text-[12px] font-medium transition-colors cursor-pointer"
            >
              Add shift pattern
            </button>
          </div>
        </div>

        {/* Right: Default roles + Rota settings */}
        <div className="lg:col-span-4 space-y-5">
          <div className="bg-white rounded-2xl p-5 border border-slate-100 space-y-3.5">
            <div>
              <h3 className="text-[14px] font-bold text-[#2E3A59]">
                Default roles
              </h3>
              <p className="text-[11px] text-slate-400">
                Select the default roles that will be included in this rota
              </p>
            </div>

            <div className="space-y-2.5 text-[12px]">
              {[
                { key: "careWorkers" as const, label: "Care workers" },
                { key: "supportStaff" as const, label: "Support staff" },
                { key: "supervisors" as const, label: "Supervisors" },
              ].map((item) => {
                const checked = rolesEnabled[item.key];
                return (
                  <div
                    key={item.key}
                    className="flex items-center justify-between py-1"
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setRolesEnabled((prev) => ({
                          ...prev,
                          [item.key]: !prev[item.key],
                        }))
                      }
                      className="flex items-center gap-2.5 text-[#2E3A59] font-medium cursor-pointer"
                    >
                      <span
                        className={`w-4 h-4 rounded flex items-center justify-center border ${
                          checked
                            ? "bg-[#37AADF] border-[#37AADF] text-white"
                            : "border-slate-300 bg-white"
                        }`}
                      >
                        {checked && <Check className="w-3 h-3" />}
                      </span>
                      {item.label}
                    </button>

                    <input
                      type="number"
                      value={roleCounts[item.key]}
                      onChange={(e) =>
                        setRoleCounts((prev) => ({
                          ...prev,
                          [item.key]: Number(e.target.value) || 0,
                        }))
                      }
                      className="w-12 h-7 px-2 rounded-md border border-slate-200 text-center text-[11px] text-slate-600"
                    />
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-100 space-y-3.5">
            <div>
              <h3 className="text-[14px] font-bold text-[#2E3A59]">
                Rota settings
              </h3>
              <p className="text-[11px] text-slate-400">
                Configure scheduling rules and publishing behaviour
              </p>
            </div>

            <div className="space-y-3 text-[12px]">
              <div className="flex items-center justify-between">
                <span className="text-[#2E3A59]">
                  Auto assign based on availability
                </span>
                <button
                  type="button"
                  onClick={() => setAutoAssign((v) => !v)}
                  className={`w-10 h-5 rounded-full transition-colors p-0.5 cursor-pointer ${
                    autoAssign ? "bg-[#37AADF]" : "bg-slate-200"
                  }`}
                >
                  <span
                    className={`block w-4 h-4 rounded-full bg-white transition-transform ${
                      autoAssign ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[#2E3A59]">Allow overtime</span>
                <button
                  type="button"
                  onClick={() => setAllowOvertime((v) => !v)}
                  className={`w-10 h-5 rounded-full transition-colors p-0.5 cursor-pointer ${
                    allowOvertime ? "bg-[#37AADF]" : "bg-slate-200"
                  }`}
                >
                  <span
                    className={`block w-4 h-4 rounded-full bg-white transition-transform ${
                      allowOvertime ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[#2E3A59]">
                  Minimum rest between shifts (hours)
                </span>
                <select
                  value={minRestHours}
                  onChange={(e) => setMinRestHours(e.target.value)}
                  className="h-8 px-2.5 rounded-lg border border-slate-200 text-[12px] text-[#2E3A59] bg-white"
                >
                  <option value="8">8</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                </select>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[#2E3A59]">
                  Publish rota after creation
                </span>
                <button
                  type="button"
                  onClick={() => setPublishAfterCreation((v) => !v)}
                  className={`w-10 h-5 rounded-full transition-colors p-0.5 cursor-pointer ${
                    publishAfterCreation ? "bg-[#37AADF]" : "bg-slate-200"
                  }`}
                >
                  <span
                    className={`block w-4 h-4 rounded-full bg-white transition-transform ${
                      publishAfterCreation ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom: Weekly schedule */}
      <div className="bg-white rounded-2xl p-6 border border-slate-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
          <div>
            <h3 className="text-[14px] font-bold text-[#2E3A59]">
              Weekly schedule
            </h3>
            <p className="text-[11px] text-slate-400">
              Assign shifts to staff members
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 text-[12px]">
            <select className="h-9 px-3.5 rounded-full bg-[#F4F6F9] text-[#2E3A59] font-medium">
              <option>All roles</option>
              <option>Care workers</option>
              <option>Support staff</option>
              <option>Supervisors</option>
            </select>
            <select className="h-9 px-3.5 rounded-full bg-[#F4F6F9] text-[#2E3A59] font-medium">
              <option>All locations</option>
            </select>
            <select className="h-9 px-3.5 rounded-full bg-[#F4F6F9] text-[#2E3A59] font-medium">
              <option>Today</option>
              <option>This week</option>
            </select>
            <span className="h-9 px-3.5 rounded-full bg-[#F4F6F9] text-[#2E3A59] font-medium inline-flex items-center gap-2">
              2/12/2024 - 2/18/2024
              <Calendar className="w-3.5 h-3.5 text-[#37AADF]" />
            </span>
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
              {roleSections.map((section) => {
                const isExpanded = expandedRoles[section.name];
                const members = staffRows.filter(
                  (s) => s.role === section.name
                );
                const roleHours = members.reduce(
                  (sum, m) => sum + m.days.filter(Boolean).length * 8,
                  0
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
                          {section.subtitle}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-center font-semibold text-[#2E3A59]">
                        {roleHours}h
                      </td>
                      <td colSpan={7} />
                    </tr>

                    {isExpanded &&
                      members.map((member) => {
                        const hours = member.days.filter(Boolean).length * 8;
                        return (
                          <tr key={member.id}>
                            <td className="py-3 px-3 pl-8">
                              <div className="flex items-center gap-2.5">
                                <span className="w-6 h-6 rounded-full bg-gradient-to-br from-[#37AADF] to-[#0E7490] text-white text-[10px] font-bold flex items-center justify-center">
                                  {member.name
                                    .split(" ")
                                    .map((p) => p[0])
                                    .join("")}
                                </span>
                                <span className="font-medium text-[#2E3A59]">
                                  {member.name}
                                </span>
                              </div>
                            </td>
                            <td className="py-3 px-3 text-center text-slate-500">
                              {hours}h
                            </td>
                            {member.days.map((code, idx) => (
                              <td key={idx} className="py-2.5 px-2 text-center">
                                <button
                                  type="button"
                                  onClick={() => cycleShift(member.id, idx)}
                                  className={`w-full h-8 rounded-lg border text-[11px] font-semibold transition-colors cursor-pointer flex items-center justify-center ${
                                    code === "E"
                                      ? "bg-emerald-50 border-emerald-200 text-[#16A34A]"
                                      : code === "L"
                                        ? "bg-amber-50 border-amber-200 text-[#D97706]"
                                        : code === "N"
                                          ? "bg-sky-50 border-sky-200 text-[#0284C7]"
                                          : "border-slate-200 text-slate-400 hover:border-[#37AADF] hover:text-[#37AADF]"
                                  }`}
                                >
                                  {code ?? <Plus className="w-3.5 h-3.5" />}
                                </button>
                              </td>
                            ))}
                          </tr>
                        );
                      })}

                    {isExpanded && (
                      <tr key={`${section.name}-add`}>
                        <td colSpan={9} className="py-2.5 px-8">
                          <button
                            type="button"
                            onClick={() =>
                              setStaffRows((prev) => [
                                ...prev,
                                {
                                  id: `s-${Date.now()}`,
                                  name: `New Staff ${prev.length + 1}`,
                                  role: section.name,
                                  days: [
                                    null,
                                    null,
                                    null,
                                    null,
                                    null,
                                    null,
                                    null,
                                  ],
                                },
                              ])
                            }
                            className="inline-flex items-center gap-1.5 text-[12px] font-medium text-[#2E3A59] hover:text-[#37AADF] cursor-pointer"
                          >
                            <span className="w-4 h-4 rounded-full bg-[#EBF6FC] text-[#37AADF] flex items-center justify-center">
                              <Plus className="w-3 h-3" />
                            </span>
                            Add staff
                          </button>
                        </td>
                      </tr>
                    )}
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer Legend & Actions */}
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

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="h-10 px-5 rounded-full bg-white border border-slate-200 text-[#2E3A59] text-[13px] font-medium hover:bg-slate-50 cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => handleSave(true)}
            className="h-10 px-5 rounded-full bg-[#F4F6F9] hover:bg-slate-200/70 text-[#2E3A59] text-[13px] font-medium cursor-pointer"
          >
            Save as draft
          </button>
          <button
            type="button"
            onClick={() => handleSave(false)}
            className="h-10 px-6 rounded-full bg-[#37AADF] hover:bg-[#2F99CA] text-white text-[13px] font-medium cursor-pointer"
          >
            {initialRota ? "Save changes" : "Create rota"}
          </button>
        </div>
      </div>
    </div>
  );
}

