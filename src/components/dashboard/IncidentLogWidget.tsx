import React from "react";
import { Link } from "react-router-dom";

export function IncidentLogWidget() {
  const incidents = [
    {
      id: "1",
      date: "Today",
      time: "9:00 AM",
      patient: "Sarah Jones",
      status: "Completed",
      statusColor: "bg-[#36C328]",
      statusText: "text-[#36C328]",
    },
    {
      id: "2",
      date: "Yesterday",
      time: "11:00 AM",
      patient: "Mike Adams",
      status: "Missed",
      statusColor: "bg-[#FF1100]",
      statusText: "text-[#FF1100]",
    },
    {
      id: "3",
      date: "April 21",
      time: "2:30 PM",
      patient: "John Smith",
      status: "Pending",
      statusColor: "bg-[#F19E39]",
      statusText: "text-[#F19E39]",
    },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 flex flex-col justify-between h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[13px] font-bold uppercase tracking-wider text-muted">
          Incident Log
        </h3>
      </div>

      {/* Table Column Headers */}
      <div className="grid grid-cols-12 text-xs font-bold text-muted border-b py-3">
        <div className="col-span-3 pl-1">Date</div>
        <div className="col-span-2 text-center">Time</div>
        <div className="col-span-3 text-center">Patient</div>
        <div className="col-span-2 text-center">Status</div>
        <div className="col-span-2 text-right pr-2">Actions</div>
      </div>

      {/* Rows */}
      <div className="divide-y flex-1">
        {incidents.map((item) => (
          <div
            key={item.id}
            className="grid grid-cols-12 items-center py-4.5 hover:bg-slate-50/50 transition-colors"
          >
            {/* Date */}
            <div className="col-span-3 text-[13.5px] font-semibold pl-1">
              {item.date}
            </div>

            {/* Time */}
            <div className="col-span-2 text-center text-[13px] font-medium text-muted">
              {item.time}
            </div>

            {/* Patient */}
            <div className="col-span-3 text-center text-[13.5px] font-semibold">
              {item.patient}
            </div>

            {/* Status */}
            <div className="col-span-2 flex items-center justify-center gap-1.5">
              <span className={`h-2 w-2 rounded-full ${item.statusColor}`} />
              <span className={`text-xs font-bold ${item.statusText}`}>
                {item.status}
              </span>
            </div>

            {/* Actions */}
            <div className="col-span-2 text-right pr-2">
              <Link
                to="/incident-management"
                className="text-[#38BDF8] font-bold text-xs uppercase tracking-wider hover:underline cursor-pointer inline-block"
              >
                View
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
