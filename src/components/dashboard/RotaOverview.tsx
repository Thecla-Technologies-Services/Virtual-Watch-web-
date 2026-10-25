import { useState } from "react";
import { ChevronDown, ChevronLeft } from "lucide-react";

export function RotaOverview() {
  const [activeFilter, setActiveFilter] = useState("All");

  const rows = [
    {
      id: "1",
      patient: "Emma Wilson",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
      status: "Green",
      statusColor: "bg-[#36C328]",
      statusText: "text-[#36C328]",
      time: "9:00 AM",
      worker: "Sarah Jones",
    },
    {
      id: "2",
      patient: "Emma Wilson",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
      status: "Amber",
      statusColor: "bg-[#F19E39]",
      statusText: "text-[#F19E39]",
      time: "11:00 AM",
      worker: "Mike Adams",
    },
    {
      id: "3",
      patient: "Emma Wilson",
      avatar:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80",
      status: "Missed",
      statusColor: "bg-[#FF1100]",
      statusText: "text-[#FF1100]",
      time: "2:30 PM",
      worker: "John Smith",
    },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 flex flex-col justify-between h-full">
      {/* Title Header */}
      <div>
        <h3 className="text-[13px] font-bold uppercase tracking-wider text-muted mb-4">
          Rota Overview
        </h3>

        {/* Filter & Alerts Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-2">
          {/* Tabs Pill Box */}
          <div className="flex items-center flex-wrap gap-1 border rounded-2xl p-1 bg-[#F9F9FB] text-[13px] font-medium text-muted">
            <button
              onClick={() => setActiveFilter("All")}
              className={`px-5 py-1.5 rounded-xl transition-all cursor-pointer ${
                activeFilter === "All"
                  ? "bg-white shadow-2xs text-[#38BDF8] font-bold"
                  : "hover:text-slate-800"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setActiveFilter("Green")}
              className={`px-4 py-1.5 rounded-xl transition-all cursor-pointer ${
                activeFilter === "Green"
                  ? "bg-white shadow-2xs text-[#38BDF8] font-bold"
                  : "hover:text-slate-800"
              }`}
            >
              Green
            </button>
            <button
              onClick={() => setActiveFilter("Amber")}
              className={`px-4 py-1.5 rounded-xl transition-all cursor-pointer ${
                activeFilter === "Amber"
                  ? "bg-white shadow-2xs text-[#38BDF8] font-bold"
                  : "hover:text-slate-800"
              }`}
            >
              Amber
            </button>
            <button
              onClick={() => setActiveFilter("Missed")}
              className={`px-4 py-1.5 rounded-xl transition-all cursor-pointer ${
                activeFilter === "Missed"
                  ? "bg-white shadow-2xs text-[#38BDF8] font-bold"
                  : "hover:text-slate-800"
              }`}
            >
              Missed
            </button>
            <div className="px-1 text-muted pointer-events-none">
              <ChevronDown size={15} />
            </div>
          </div>

          {/* Alerts Indicator */}
          <div className="flex items-center gap-2 text-xs font-bold text-muted cursor-pointer hover:opacity-80 transition-opacity">
            <span className="h-5 w-5 rounded-full bg-[#FEF5EA] text-[#F19E39] flex items-center justify-center text-xs font-black">
              !
            </span>
            <span>Alerts</span>
          </div>
        </div>

        {/* Table Column Headers */}
        <div className="grid grid-cols-12 text-xs font-bold text-muted border-b py-3.5 mt-2">
          <div className="col-span-5 pl-1">Patient</div>
          <div className="col-span-3 text-center">Scheduled time</div>
          <div className="col-span-2 text-center">Care worker</div>
          <div className="col-span-2 text-right pr-2">Actions</div>
        </div>

        {/* Rota Rows */}
        <div className="divide-y">
          {rows
            .filter((r) => activeFilter === "All" || r.status === activeFilter)
            .map((row) => (
              <div
                key={row.id}
                className="grid grid-cols-12 items-center py-4 hover:bg-slate-50/50 transition-colors"
              >
                {/* Patient */}
                <div className="col-span-5 flex items-center gap-3 pl-1">
                  <img
                    src={row.avatar}
                    alt={row.patient}
                    className="h-10 w-10 rounded-full object-cover shrink-0 border border-slate-100 shadow-2xs"
                  />
                  <div>
                    <span className="text-[14px] font-semibold block leading-tight">
                      {row.patient}
                    </span>
                    <div className="flex items-center gap-1.5 mt-1">
                      <span
                        className={`h-2 w-2 rounded-full ${row.statusColor}`}
                      />
                      <span
                        className={`text-xs font-semibold ${row.statusText}`}
                      >
                        {row.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Scheduled Time */}
                <div className="col-span-3 text-center text-[13.5px] font-medium text-muted">
                  {row.time}
                </div>

                {/* Care Worker */}
                <div className="col-span-2 text-center text-[13.5px] font-medium">
                  {row.worker}
                </div>

                {/* Actions */}
                <div className="col-span-2 text-right pr-2">
                  <button className="text-[#38BDF8] font-bold text-xs uppercase tracking-wider hover:underline cursor-pointer">
                    View
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Special Bottom Reassignment Row */}
      <div className="pt-4 border-t mt-4 flex items-center justify-between">
        <div className="flex items-center gap-3 pl-1">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
            alt="Unassigned user"
            className="h-10 w-10 rounded-full object-cover shrink-0 border border-slate-100 shadow-2xs opacity-80"
          />
          <span className="text-[14px] font-semibold text-muted">
            Awaiting assignment
          </span>
        </div>

        <button className="flex items-center gap-1 px-4 py-1.5 border rounded-full text-xs font-bold text-muted hover:bg-slate-50 transition-colors cursor-pointer shadow-2xs">
          <ChevronLeft size={15} strokeWidth={2.5} />
          <span>Reassign</span>
        </button>
      </div>
    </div>
  );
}
