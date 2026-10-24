import React from "react";
import { CheckCircle2, ClipboardList, AlertTriangle, Clock } from "lucide-react";

export function DashboardMetrics() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {/* Task completed */}
      <div className="bg-white rounded-2xl p-5 flex items-center justify-between gap-3">
        <div>
          <span className="text-[13.5px] text-muted font-normal block">
            Task completed
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-extrabold">56</span>
            <span className="text-[13px] font-medium text-[#36C328]">
              Completed
            </span>
          </div>
        </div>
        <div className="bg-[#E8F8EE] text-[#36C328] p-3 rounded-2xl flex items-center justify-center shrink-0">
          <CheckCircle2 size={24} strokeWidth={2.5} />
        </div>
      </div>

      {/* Incidents this week */}
      <div className="bg-white rounded-2xl p-5 flex items-center justify-between gap-3">
        <div>
          <span className="text-[13.5px] text-muted font-normal block">
            Incidents this week
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-extrabold">7</span>
            <span className="text-[13px] font-medium text-[#FF1100]">
              missed
            </span>
          </div>
        </div>
        <div className="bg-[#EBF7FD] text-[#38BDF8] h-12 w-12 rounded-2xl flex items-center justify-center font-bold text-lg shrink-0 select-none">
          i
        </div>
      </div>

      {/* Safeguarding flags */}
      <div className="bg-white rounded-2xl p-5 flex items-center justify-between gap-3">
        <div>
          <span className="text-[13.5px] text-muted font-normal block">
            Safeguarding flags
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-extrabold">3</span>
            <span className="text-[13px] font-medium text-[#36C328]">
              This month
            </span>
          </div>
        </div>
        <div className="bg-[#FEF5EA] text-[#F19E39] p-3 rounded-2xl flex items-center justify-center shrink-0">
          <ClipboardList size={24} strokeWidth={2.5} />
        </div>
      </div>

      {/* High risk patients */}
      <div className="bg-white rounded-2xl p-5 flex items-center justify-between gap-3">
        <div>
          <span className="text-[13.5px] text-muted font-normal block">
            High risk patients
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-extrabold">11</span>
            <span className="text-[13px] font-medium text-[#FF1100]">
              This month
            </span>
          </div>
        </div>
        <div className="bg-[#FFF6F5] text-[#FF1100] p-3 rounded-2xl flex items-center justify-center shrink-0">
          <AlertTriangle size={24} strokeWidth={2.5} />
        </div>
      </div>

      {/* Hours worked */}
      <div className="bg-white rounded-2xl p-5 flex items-center justify-between gap-3">
        <div>
          <span className="text-[13.5px] text-muted font-normal block">
            Hours worked
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-extrabold">156</span>
            <span className="text-[13px] font-medium text-[#36C328]">
              Today
            </span>
          </div>
        </div>
        <div className="bg-[#FEF5EA] text-[#F19E39] p-3 rounded-2xl flex items-center justify-center shrink-0">
          <Clock size={24} strokeWidth={2.5} />
        </div>
      </div>
    </div>
  );
}
