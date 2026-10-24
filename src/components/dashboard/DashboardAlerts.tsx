import React from "react";
import { ChevronRight, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

export function DashboardAlerts() {
  const alerts = [
    {
      id: "1",
      title: "Missed medication",
      time: "15 minutes ago",
      type: "red",
      iconText: "1",
    },
    {
      id: "2",
      title: "Missed medication",
      time: "15 minutes ago",
      type: "amber",
    },
    {
      id: "3",
      title: "Missed medication",
      time: "15 minutes ago",
      type: "red",
      iconText: "1",
    },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 flex flex-col justify-between h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-[13px] font-bold uppercase tracking-wider text-muted">
          Alerts
        </h3>
        <Link
          to="/incident-management"
          className="text-[#38BDF8] font-bold text-xs uppercase tracking-wider hover:underline cursor-pointer"
        >
          View all
        </Link>
      </div>

      {/* Alerts Feed */}
      <div className="space-y-4 flex-1 flex flex-col justify-around">
        {alerts.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between gap-3 py-2 hover:bg-slate-50/50 rounded-xl transition-colors cursor-pointer pr-1"
          >
            <div className="flex items-center gap-3.5">
              {item.type === "red" ? (
                <div className="bg-[#FF1100] text-white h-10 w-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0 shadow-2xs">
                  {item.iconText}
                </div>
              ) : (
                <div className="bg-[#FEF5EA] text-[#F19E39] h-10 w-10 rounded-full flex items-center justify-center shrink-0 shadow-2xs">
                  <AlertTriangle size={20} strokeWidth={2.5} />
                </div>
              )}

              <div>
                <span className="font-bold text-[14px] block leading-snug">
                  {item.title}
                </span>
                <span className="text-muted text-xs font-normal block mt-0.5">
                  {item.time}
                </span>
              </div>
            </div>

            <div className="text-muted">
              <ChevronRight size={17} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
