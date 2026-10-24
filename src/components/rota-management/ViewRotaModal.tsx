import { Modal } from "@/components/ui/Modal";
import type { Rota } from "@/constants/rotas";
import { 
  Location, 
  User, 
  Calendar, 
  FolderUpload
} from "@duo-icons/react";

interface ViewRotaModalProps {
  isOpen: boolean;
  onClose: () => void;
  rota: Rota | null;
}

export function ViewRotaModal({ isOpen, onClose, rota }: ViewRotaModalProps) {
  if (!rota) return null;

  const renderStatusDot = (status: string) => {
    let dotColorClass = "bg-slate-400";
    if (status === "Approved") dotColorClass = "bg-emerald-500";
    if (status === "Published") dotColorClass = "bg-[#38BDF8]"; // Mockup uses green for published in details modal!
    if (status === "Locked") dotColorClass = "bg-amber-500";
    
    // According to details modal screenshot, Published has a green dot. Let's adjust to match it exactly.
    if (status === "Published") dotColorClass = "bg-emerald-500"; 

    return <div className={`h-2 w-2 rounded-full ${dotColorClass}`}></div>;
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} width="4xl" height="3xl">
      <div className="flex items-center justify-between border-b border-slate-200 pb-2 mb-3">
        <h3 className="text-base font-bold ">View details</h3>
      </div>

      <div className="mb-4">
        <h2 className="text-[16px] font-bold  mb-1">{rota.title}</h2>
        <div className="flex items-center gap-2">
          <span className="text-[14px] font-medium">Rota ID:</span>
          <span className="px-2 py-0.5 bg-primary/8 text-primary text-[12px] font-bold rounded-md tracking-wide">
            {rota.rotaId || "N/A"}
          </span>
        </div>
      </div>

      {/* Top Stats Cards */}
      <div className="grid grid-cols-4 gap-4 mb-4">
        <div className="bg-[#FBFBFB] px-4 py-5 rounded-xl flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-1">
            {renderStatusDot(rota.status)}
            <span className="font-medium  text-[16px]">{rota.status}</span>
          </div>
          <p className="text-[14px] font-normal text-muted">Status</p>
        </div>
        
        <div className="bg-[#FBFBFB] px-4 py-5 rounded-xl flex flex-col justify-center">
          <div className="mb-1">
            <span className="font-medium  text-[16px]">{rota.staffCount}</span>
          </div>
          <p className="text-[14px] font-normal text-muted">Staff assigned</p>
        </div>

        <div className="bg-[#FBFBFB] px-4 py-5 rounded-xl flex flex-col justify-center">
          <div className="mb-1">
            <span className="font-medium  text-[16px]">{rota.shiftsCount}</span>
          </div>
          <p className="text-[14px] font-normal text-muted">Total shifts</p>
        </div>

        <div className="bg-[#FBFBFB] px-4 py-5 rounded-xl flex flex-col justify-center">
          <div className="mb-1">
            <span className="font-medium text-green-500 text-[16px]">{rota.coverage}%</span>
          </div>
          <p className="text-[14px] font-normal text-muted">Coverage</p>
        </div>
      </div>

      {/* Schedule Information */}
      <div className="mb-4">
        <h4 className="text-[13px] font-bold  uppercase tracking-wider mb-4">Schedule Information</h4>
        <div className="grid grid-cols-3 gap-y-6 gap-x-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-primary"><Location size={16} /></span>
              <span className="text-[13px] font-medium text-muted">Region</span>
            </div>
            <p className="text-[14px] font-medium">{rota.region || "N/A"}</p>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-primary"><User size={16} /></span>
              <span className="text-[13px] font-medium text-muted">Created by</span>
            </div>
            <p className="text-[14px] font-medium">{rota.createdBy}</p>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-primary"><Calendar size={16} /></span>
              <span className="text-[13px] font-medium text-muted">Published date</span>
            </div>
            <p className="text-[14px] font-medium">{rota.publishedDate || "N/A"}</p>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-primary"><Calendar size={16} /></span>
              <span className="text-[13px] font-medium text-muted">Period</span>
            </div>
            <p className="text-[14px] font-medium">{rota.period}</p>
          </div>
        </div>
      </div>

      <hr className="border-t border-[#E7E7E7] mb-5"/>

      <div className="grid grid-cols-2 gap-8 mb-8">
        {/* Coverage Status */}
        <div>
          <h4 className="text-[13px] font-bold  uppercase mb-4">Coverage Status</h4>
          <div className="space-y-3">
            <div className="bg-[#F3FCF2] rounded-xl p-4 flex items-center justify-between">
              <span className="text-[13px] font-medium">Overall coverage</span>
              <div className="flex items-center gap-3 w-40 justify-end">
                <div className="h-2.5 flex-1 bg-white rounded-full overflow-hidden">
                  <div className="h-full bg-[#36C328] rounded-full" style={{ width: `${rota.coverage}%` }}></div>
                </div>
                <span className="font-bold  text-[14px]">{rota.coverage}%</span>
              </div>
            </div>
            <div className="bg-primary/6 border  rounded-xl p-4 flex items-center justify-between">
              <span className="text-[14px] font-medium text-slate-700">Staff assigned</span>
              <span className="font-bold  text-[14px]">{rota.staffCount}</span>
            </div>
            <div className="bg-[#FFF6F5] border border-red-100 rounded-xl p-4 flex items-center justify-between">
              <span className="text-[14px] font-medium text-slate-700">Uncovered shifts</span>
              <span className="font-bold text-[#FF1100] text-[14px]">{rota.uncoveredShifts ?? 0}</span>
            </div>
          </div>
        </div>

        {/* Staff Breakdown by Role */}
        <div>
          <h4 className="text-[13px] font-bold  uppercase mb-4">Staff Breakdown by Role</h4>
          <div className="border border-[#E7E7E7] rounded-2xl bg-white p-2">
            <div className="flex items-center justify-between p-3 border-b border-[#E7E7E7]">
              <span className="text-[14px] font-normal">Care workers</span>
              <span className="font-bold  text-[14px]">{rota.roleBreakdown?.careWorkers ?? 0} staff</span>
            </div>
            <div className="flex items-center justify-between p-3 border-b border-[#E7E7E7]">
              <span className="text-[14px] font-normal">Support staff</span>
              <span className="font-bold  text-[14px]">{rota.roleBreakdown?.supportStaff ?? 0} staff</span>
            </div>
            <div className="flex items-center justify-between p-3">
              <span className="text-[14px] font-normal">Supervisors</span>
              <span className="font-bold  text-[14px]">{rota.roleBreakdown?.supervisors ?? 0} staff</span>
            </div>
          </div>
        </div>
      </div>

      <hr className="border-t border-[#E7E7E7] mb-5"/>

      {/* Shift Patterns */}
      <div className="mb-6">
        <h4 className="text-[13px] font-bold  uppercase">Shift Patterns</h4>
        <p className="text-[13px] text-muted font-normal mb-4">Distribution of shifts across times of day</p>
        
        <div className="mt-4 border border-[#E7E7E7] rounded-2xl">
          {/* Early */}
          <div className="flex items-center justify-between border-b p-3">
            <div>
              <p className="text-[14px] font-bold  mb-0.5">Early (6am-2pm)</p>
              <p className="text-[13px] text-muted font-normal">{rota.shiftPatterns?.early?.assigned ?? 0} staff assigned</p>
            </div>
            <span className="px-3 py-1 bg-[#36C328] text-white text-[13px] font-bold rounded-full">
              {rota.shiftPatterns?.early?.coverage ?? 0}%
            </span>
          </div>
          {/* Late */}
          <div className="flex items-center justify-between border-b p-3">
            <div>
              <p className="text-[14px] font-bold  mb-0.5">Late (2pm-10pm)</p>
              <p className="text-[13px] text-muted font-normal">{rota.shiftPatterns?.late?.assigned ?? 0} staff assigned</p>
            </div>
            <span className="px-3 py-1 bg-[#36C328] text-white text-[13px] font-bold rounded-full">
              {rota.shiftPatterns?.late?.coverage ?? 0}%
            </span>
          </div>
          {/* Night */}
          <div className="flex items-center justify-between p-3">
            <div>
              <p className="text-[14px] font-bold  mb-0.5">Night (10pm-6am)</p>
              <p className="text-[13px] text-muted font-normal">{rota.shiftPatterns?.night?.assigned ?? 0} staff assigned</p>
            </div>
            <span className="px-3 py-1 bg-[#36C328] text-white text-[13px] font-bold rounded-full">
              {rota.shiftPatterns?.night?.coverage ?? 0}%
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 mt-8 pt-5 border-t border-slate-50">
        <button 
          onClick={onClose}
          className="px-6 py-2.5 bg-[#38BDF8] hover:bg-[#2BA5DF] text-white text-[14px] font-bold rounded-full transition-all cursor-pointer"
        >
          Back to rota
        </button>
        <button className="flex items-center gap-2 px-6 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 text-[14px] font-bold rounded-full transition-all cursor-pointer">
          <FolderUpload size={16} />
          <span>Download schedule</span>
        </button>
      </div>
    </Modal>
  );
}
