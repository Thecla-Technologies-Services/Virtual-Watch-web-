import { ChevronRight, AlertTriangle, UserCheck } from "lucide-react";

export function TaskReassignmentWidget() {
  return (
    <div className="bg-white rounded-2xl p-6 flex flex-col justify-between h-full">
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-[13px] font-bold uppercase tracking-wider text-muted">
          Task Requiring Reassignment
        </h3>
      </div>

      {/* Reassignment Cards Feed */}
      <div className="space-y-3.5 flex-1 flex flex-col justify-around">
        {/* Card 1: Awaiting Assignment */}
        <div className="bg-[#F9F9FB] p-4 rounded-2xl flex items-center justify-between gap-3 hover:bg-slate-100/70 transition-colors cursor-pointer border border-transparent hover:border-slate-200/50">
          <div className="flex items-center gap-3.5">
            <div className="bg-[#FFF6F5] text-[#FF1100] h-10 w-10 rounded-full flex items-center justify-center shrink-0 shadow-2xs">
              <AlertTriangle size={19} strokeWidth={2.5} />
            </div>
            <div>
              <span className="font-bold text-[14px] block leading-snug">
                Awaiting assignment
              </span>
              <span className="text-muted text-xs font-normal block mt-0.5">
                7:24 AM
              </span>
            </div>
          </div>
          <div className="text-muted pr-1">
            <ChevronRight size={18} />
          </div>
        </div>

        {/* Card 2: John Doe */}
        <div className="bg-[#F9F9FB] p-4 rounded-2xl flex items-center justify-between gap-3 hover:bg-slate-100/70 transition-colors border border-transparent hover:border-slate-200/50">
          <div className="flex items-center gap-3.5">
            <div className="bg-[#EBF7FD] text-[#38BDF8] h-10 w-10 rounded-full flex items-center justify-center shrink-0 shadow-2xs">
              <UserCheck size={19} strokeWidth={2.5} />
            </div>
            <div>
              <span className="font-bold text-[14px] block leading-snug">
                John Doe
              </span>
              <span className="text-muted text-xs font-normal block mt-0.5">
                Today 15:00 PM
              </span>
            </div>
          </div>
          <button className="bg-white border text-muted font-bold text-xs px-4 py-1.5 rounded-full shadow-2xs hover:bg-slate-50 cursor-pointer transition-all shrink-0">
            Reassign
          </button>
        </div>
      </div>
    </div>
  );
}
