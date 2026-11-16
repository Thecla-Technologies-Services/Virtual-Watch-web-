import { Activity, Copy } from "lucide-react";

const TODAY_LOGS = [
  {
    id: "act-1",
    actor: "Maria Marsh",
    action: "Logged in",
    time: "09:14",
    module: "Auth",
    ip: "86.12.44.1",
  },
  {
    id: "act-2",
    actor: "Iffy Johnson",
    action: "Started shift (James Okafor)",
    time: "09:22",
    module: "Visits",
    ip: "82.30.11.7",
  },
  {
    id: "act-3",
    actor: "Sarah Collins",
    action: "Submitted timesheet",
    time: "09:31",
    module: "Timesheets",
    ip: "80.5.22.4",
  },
  {
    id: "act-4",
    actor: "Gavin Armstrong",
    action: "Approved leave request",
    time: "09:45",
    module: "Leave",
    ip: "86.12.44.3",
  },
  {
    id: "act-5",
    actor: "Iffy Johnson",
    action: "Raised incident report",
    time: "10:02",
    module: "Incidents",
    ip: "82.30.11.7",
  },
  {
    id: "act-6",
    actor: "Sabrina Marsh",
    action: "Updated company settings",
    time: "10:14",
    module: "Settings",
    ip: "86.12.44.1",
  },
  {
    id: "act-7",
    actor: "Daniel Adeyemi",
    action: "Completed handover",
    time: "10:22",
    module: "Handover",
    ip: "77.8.10.2",
  },
  {
    id: "act-8",
    actor: "Priya Sharma",
    action: "Downloaded payslip PDF",
    time: "10:35",
    module: "Payroll",
    ip: "81.4.9.3",
  },
];

export function ActivityTab() {
  const handleCopyIp = (ip: string) => {
    navigator.clipboard?.writeText(ip).catch(() => {});
  };

  return (
    <div className="space-y-5">
      {/* Top 3 KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-100/80 ">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
            Avg session
          </p>
          <p className="text-[22px] font-bold text-[#37AADF] mt-1">18m</p>
          <p className="text-[11px] text-slate-400 mt-0.5">Per active user</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-100/80 ">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
            MAU
          </p>
          <p className="text-[22px] font-bold text-[#16A34A] mt-1">38</p>
          <div className="flex items-center justify-between text-[11px] mt-0.5">
            <span className="text-slate-400">Monthly active users</span>
            <span className="text-[#16A34A] font-medium">↑ 8% vs last month</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-100/80 ">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
            DAU/MAU ratio
          </p>
          <p className="text-[22px] font-bold text-[#A855F7] mt-1">63%</p>
          <p className="text-[11px] text-slate-400 mt-0.5">Engagement rate</p>
        </div>
      </div>

      {/* Activity Log */}
      <div className="bg-white rounded-2xl p-6 border border-slate-100/80 ">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <h3 className="text-[12px] font-bold uppercase tracking-wide text-[#2E3A59]">
            Today&apos;s activity log
          </h3>
          <span className="text-[12px] text-slate-400">
            Wednesday, 12 August 2026
          </span>
        </div>

        <div className="divide-y divide-slate-100">
          {TODAY_LOGS.map((item) => (
            <div
              key={item.id}
              className="py-3.5 flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-8 h-8 rounded-full bg-[#EBF6FC] text-[#37AADF] flex items-center justify-center shrink-0">
                  <Activity className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-[13px] font-medium text-[#2E3A59] truncate">
                    {item.actor} - {item.action}
                  </p>
                  <p className="text-[11px] text-slate-400">{item.time}</p>
                </div>
              </div>

              <div className="text-right shrink-0">
                <p className="text-[12px] font-medium text-[#2E3A59]">
                  {item.module}
                </p>
                <div className="flex items-center justify-end gap-1.5 text-[11px] text-slate-400">
                  <span>{item.ip}</span>
                  <button
                    type="button"
                    onClick={() => handleCopyIp(item.ip)}
                    aria-label={`Copy IP ${item.ip}`}
                    className="text-[#37AADF] hover:text-[#2F99CA] cursor-pointer"
                  >
                    <Copy className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

