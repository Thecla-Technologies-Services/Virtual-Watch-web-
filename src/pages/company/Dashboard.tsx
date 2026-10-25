import { useState } from "react";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Users, AlertTriangle, MoreVertical, Bell } from "lucide-react";

/* ── Types & Mock Data ──────────────────────────────────── */
interface BillingRow {
  id: string;
  invoice: string;
  date: string;
  amount: string;
  status: "Paid" | "Overdue";
}

const BILLING_ROWS: BillingRow[] = [
  { id: "1", invoice: "INV-2024-0072",  date: "Mar 12, 2024", amount: "$890.00", status: "Paid" },
  { id: "2", invoice: "quantum-retail", date: "Apr 5, 2024",  amount: "$890.00", status: "Paid" },
  { id: "3", invoice: "nordtech",       date: "Jun 18, 2024", amount: "$890.00", status: "Overdue" },
  { id: "4", invoice: "apex-logistics", date: "Jan 22, 2024", amount: "$890.00", status: "Overdue" },
  { id: "5", invoice: "bluewave-fin",   date: "Nov 3, 2023",  amount: "$890.00", status: "Paid" },
  { id: "6", invoice: "ironclad-sec",   date: "Sep 8, 2023",  amount: "$890.00", status: "Paid" },
];

interface ActivityEntry {
  id: string;
  name: string;
  action: string;
  time: string;
  initials: string;
  color: string;
}

const RECENT_ACTIVITY: ActivityEntry[] = [
  { id: "1", name: "Maria Nikko",      action: "Updated user role for D. Park",   time: "12M AGO", initials: "S", color: "bg-purple-500" },
  { id: "2", name: "Yuki Nakamura",    action: "Exported Q2 analytics report",    time: "1H AGO",  initials: "Y", color: "bg-amber-500" },
  { id: "3", name: "Roberto Silva",    action: "Added new user account",          time: "2H AGO",  initials: "R", color: "bg-blue-500" },
  { id: "4", name: "Daniel Park",      action: "Changed dashboard view settings", time: "3H AGO",  initials: "D", color: "bg-green-500" },
  { id: "5", name: "Fatima Al-Rashid", action: "Submitted feature request",       time: "5H AGO",  initials: "F", color: "bg-rose-500" },
  { id: "6", name: "Maria Nikko",      action: "Updated user role for D. Park",   time: "12M AGO", initials: "S", color: "bg-purple-500" },
  { id: "7", name: "Yuki Nakamura",    action: "Exported Q2 analytics report",    time: "1H AGO",  initials: "Y", color: "bg-amber-500" },
  { id: "8", name: "Roberto Silva",    action: "Added new user account",          time: "2H AGO",  initials: "R", color: "bg-blue-500" },
];

const ANNOUNCEMENTS = [
  { id: "1", text: "Platform update v3.4.0 released",   time: "1 day ago" },
  { id: "2", text: "Scheduled maintenance - July 10",    time: "2 days ago" },
  { id: "3", text: "Live chat feature is now available", time: "1 week ago" },
];

/* ── Weekly Bar Chart Data ──────────────────────────────── */
const WEEK_DATA = [
  { day: "Mon", logins: 234, actions: 180 },
  { day: "Tue", logins: 65,  actions: 50  },
  { day: "Wed", logins: 220, actions: 170 },
  { day: "Thu", logins: 155, actions: 120 },
  { day: "Fri", logins: 80,  actions: 60  },
  { day: "Sat", logins: 12,  actions: 42  },
  { day: "Sun", logins: 30,  actions: 20  },
];

const MAX_VAL = 250;

/* ── Sub-components ─────────────────────────────────────── */

function StatCard({
  label, value, sub, subColor = "text-green-500", icon, iconBg,
}: {
  label: string; value: string; sub: string; subColor?: string;
  icon: React.ReactNode; iconBg: string;
}) {
  return (
    <div className="bg-white rounded-2xl p-5 flex items-start justify-between">
      <div>
        <p className="text-[12px] text-slate-400 font-medium mb-2">{label}</p>
        <p className="text-3xl font-bold text-slate-800 mb-1">{value}</p>
        <p className={`text-[12px] font-semibold ${subColor}`}>{sub}</p>
      </div>
      <div className={`h-10 w-10 rounded-xl ${iconBg} flex items-center justify-center shrink-0`}>
        {icon}
      </div>
    </div>
  );
}

function WeeklyChart() {
  const [tooltip, setTooltip] = useState<{ day: string; logins: number; actions: number; x: number } | null>(null);

  const chartH = 200;
  const barW = 28;
  const gap = 48;
  const paddingLeft = 40;
  const totalW = paddingLeft + WEEK_DATA.length * (barW + gap) + gap;

  return (
    <div className="bg-white rounded-2xl p-5">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-[13px] font-bold uppercase tracking-wider text-slate-700">Weekly activity</p>
          <p className="text-[12px] text-slate-400 font-medium mt-0.5">Logins and actions this week</p>
        </div>
        <span className="flex items-center gap-1.5 text-[12px] font-bold text-green-500 bg-green-50 px-3 py-1 rounded-full">
          <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
          +72% YTD
        </span>
      </div>

      <div className="relative overflow-x-auto">
        <svg
          width={totalW}
          height={chartH + 40}
          className="min-w-full"
          onMouseLeave={() => setTooltip(null)}
        >
          {/* Y-axis gridlines + labels */}
          {[0, 50, 100, 150, 200, 250].map((tick) => {
            const y = chartH - (tick / MAX_VAL) * chartH;
            return (
              <g key={tick}>
                <line x1={paddingLeft} y1={y} x2={totalW} y2={y} stroke="#f1f5f9" strokeWidth="1" />
                <text x={paddingLeft - 6} y={y + 4} textAnchor="end" fontSize="10" fill="#94a3b8">
                  {tick}
                </text>
              </g>
            );
          })}

          {/* Bars */}
          {WEEK_DATA.map((d, i) => {
            const x = paddingLeft + gap / 2 + i * (barW + gap);
            const h = Math.max(4, (Math.max(d.logins, d.actions) / MAX_VAL) * chartH);
            const y = chartH - h;
            const isHovered = tooltip?.day === d.day;

            return (
              <g
                key={d.day}
                onMouseEnter={() => setTooltip({ day: d.day, logins: d.logins, actions: d.actions, x })}
              >
                <rect
                  x={x}
                  y={y}
                  width={barW}
                  height={h}
                  rx={6}
                  fill={isHovered ? "#0EA5E9" : "#38BDF8"}
                  style={{ transition: "fill 0.15s" }}
                />
                {/* Day label */}
                <text
                  x={x + barW / 2}
                  y={chartH + 20}
                  textAnchor="middle"
                  fontSize="11"
                  fill="#94a3b8"
                  fontWeight="500"
                >
                  {d.day}
                </text>
              </g>
            );
          })}

          {/* Tooltip */}
          {tooltip && (() => {
            const tx = Math.min(tooltip.x, totalW - 110);
            const ty = chartH - (Math.max(tooltip.logins, tooltip.actions) / MAX_VAL) * chartH - 70;
            return (
              <g>
                <rect x={tx} y={Math.max(4, ty)} width={100} height={58} rx={8} fill="#1e293b" />
                <text x={tx + 10} y={Math.max(4, ty) + 18} fontSize="11" fill="white" fontWeight="700">{tooltip.day}</text>
                <text x={tx + 10} y={Math.max(4, ty) + 34} fontSize="10" fill="#94a3b8">Logins: <tspan fill="white">{tooltip.logins}</tspan></text>
                <text x={tx + 10} y={Math.max(4, ty) + 50} fontSize="10" fill="#94a3b8">Actions: <tspan fill="white">{tooltip.actions}</tspan></text>
              </g>
            );
          })()}
        </svg>
      </div>
    </div>
  );
}

function BillingHistory() {
  return (
    <div className="bg-white rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4">
        <p className="text-[13px] font-bold uppercase tracking-wider text-slate-700">Billing history</p>
        <button className="text-[12px] font-bold text-[#38BDF8] hover:underline cursor-pointer">VIEW ALL</button>
      </div>

      <table className="w-full text-[13px]">
        <thead>
          <tr className="border-b border-slate-100">
            {["Invoice", "Date", "Amount", "Status", ""].map((h) => (
              <th key={h} className="text-left pb-3 font-semibold text-slate-500 text-[11px] uppercase tracking-wider pr-4 last:pr-0">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {BILLING_ROWS.map((row) => (
            <tr key={row.id} className="border-b last:border-0 border-slate-50 hover:bg-slate-50/50 transition-colors">
              <td className="py-3 pr-4 font-medium text-slate-700">{row.invoice}</td>
              <td className="py-3 pr-4 text-slate-500">{row.date}</td>
              <td className="py-3 pr-4 font-medium text-slate-700">{row.amount}</td>
              <td className="py-3 pr-4">
                <div className="flex items-center gap-2">
                  <div className={`h-2 w-2 rounded-full ${row.status === "Paid" ? "bg-green-500" : "bg-amber-400"}`} />
                  <span className="font-medium">{row.status}</span>
                </div>
              </td>
              <td className="py-3 text-right">
                <button className="p-1 text-slate-300 hover:text-slate-500 transition-colors cursor-pointer">
                  <MoreVertical size={14} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function RenewalCard() {
  return (
    <div className="bg-white rounded-2xl p-5 flex items-start justify-between">
      <div>
        <p className="text-[12px] text-slate-400 font-medium mb-2">Renewal date</p>
        <p className="text-3xl font-bold text-slate-800 mb-1">Jul 18</p>
        <p className="text-[12px] text-slate-400 font-medium">14 days remaining</p>
      </div>
      <div className="h-10 w-10 rounded-xl bg-amber-50 flex items-center justify-center text-xl shrink-0">
        🗓️
      </div>
    </div>
  );
}

function RecentActivity() {
  return (
    <div className="bg-white rounded-2xl p-5 flex-1">
      <p className="text-[13px] font-bold uppercase tracking-wider text-slate-700 mb-3">Recent activity</p>
      <div className="space-y-0 divide-y divide-slate-50">
        {RECENT_ACTIVITY.map((a) => (
          <div key={a.id} className="flex items-start gap-3 py-2.5">
            <div className={`h-7 w-7 rounded-full ${a.color} flex items-center justify-center text-white text-[10px] font-bold shrink-0 mt-0.5`}>
              {a.initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[12px] font-semibold text-slate-700 leading-snug">{a.name}</p>
              <p className="text-[11px] text-slate-400 truncate">{a.action}</p>
            </div>
            <span className="text-[10px] text-slate-400 font-medium whitespace-nowrap shrink-0">{a.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function RenewalBanner() {
  return (
    <div className="bg-green-500 rounded-2xl p-4 flex items-start justify-between gap-3">
      <div className="flex items-start gap-3">
        <div className="h-6 w-6 rounded-full bg-white/20 flex items-center justify-center shrink-0 mt-0.5">
          <Bell size={12} className="text-white" />
        </div>
        <div>
          <p className="text-[13px] font-bold text-white mb-0.5">Subscription renewing soon</p>
          <p className="text-[11px] text-green-100 leading-snug">Your Enterprise plan renews on July 18, 2024. Ensure billing details are current.</p>
        </div>
      </div>
      <button className="shrink-0 px-3 py-1.5 bg-white text-green-600 text-[12px] font-bold rounded-full hover:bg-green-50 transition-colors cursor-pointer">
        Review
      </button>
    </div>
  );
}

function RecentAnnouncements() {
  return (
    <div className="bg-white rounded-2xl p-5">
      <div className="flex items-center justify-between mb-3">
        <p className="text-[13px] font-bold uppercase tracking-wider text-slate-700">Recent announcements</p>
        <button className="text-[12px] font-bold text-[#38BDF8] hover:underline cursor-pointer">VIEW ALL</button>
      </div>
      <div className="space-y-3">
        {ANNOUNCEMENTS.map((a) => (
          <div key={a.id} className="flex items-start gap-2.5">
            <div className="h-1.5 w-1.5 rounded-full bg-slate-400 shrink-0 mt-1.5" />
            <div>
              <p className="text-[13px] font-medium text-slate-700 leading-snug">{a.text}</p>
              <p className="text-[11px] text-slate-400 mt-0.5">{a.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Page ───────────────────────────────────────────────── */
export default function CompanyDashboard() {
  return (
    <div className="animate-fade-in duration-300 space-y-5 pb-8">
      <Breadcrumb
        pageTitle="WORKSPACE OVERVIEW"
        subtext="ABC Homecare - Enterprise plan"
        activePage="Dashboard"
      />

      {/* ── Row 1: Stat cards ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <StatCard
          label="Total users"
          value="48"
          sub="⬆ +3 this month"
          subColor="text-green-500"
          iconBg="bg-green-50"
          icon={<Users size={20} className="text-green-500" />}
        />
        <StatCard
          label="Active users"
          value="41"
          sub="⬆ +5.2% vs last week"
          subColor="text-orange-400"
          iconBg="bg-orange-50"
          icon={<AlertTriangle size={20} className="text-orange-400" />}
        />
        <RenewalCard />
      </div>

      {/* ── Row 2: Chart + Right column ── */}
      <div className="grid grid-cols-6 gap-5 items-start">
        {/* Left: chart + billing */}
        <div className="space-y-5 col-span-4">
          <WeeklyChart />
          <BillingHistory />
        </div>

        {/* Right: activity + banner + announcements */}
        <div className="space-y-4 col-span-2">
          <RecentActivity />
          <RenewalBanner />
          <RecentAnnouncements />
        </div>
      </div>
    </div>
  );
}
