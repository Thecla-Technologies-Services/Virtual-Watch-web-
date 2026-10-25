import { Modal } from "@/components/ui/Modal";
import type { CareIncident } from "@/constants/incidents";
import { Location, User, Calendar, FolderUpload } from "@duo-icons/react";
import { Download, Image as ImageIcon, FileText } from "lucide-react";

interface ViewIncidentModalProps {
  isOpen: boolean;
  onClose: () => void;
  incident: CareIncident | null;
}

export function ViewIncidentModal({ isOpen, onClose, incident }: ViewIncidentModalProps) {
  if (!incident) return null;

  const renderStatusDot = (status: string) => {
    let bg = "bg-green-500";
    if (status === "Pending" || status === "Pending review") bg = "bg-amber-500";
    if (status === "Need escalation" || status === "Critical") bg = "bg-red-500";
    return <span className={`h-2.5 w-2.5 rounded-full ${bg} inline-block ml-2`}></span>;
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} width="4xl" height="xl">
      <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-4">
        <h3 className="text-base font-bold">View details</h3>
      </div>

      <div className="max-h-[74vh] overflow-y-auto pr-1 no-scrollbar">
        {/* Title and ID Badge */}
        <div className="mb-6">
          <h2 className="text-[17px] font-bold">{incident.title}</h2>
          <div className="flex items-center gap-2">
            <span className="text-[14px] font-medium text-muted">Incident ID:</span>
            <span className="px-2.5 py-0.5 bg-primary/8 text-primary text-[12px] font-bold rounded-md tracking-wide">
              {incident.incidentId || "N/A"}
            </span>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-6 gap-x-6 mb-6">
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-primary"><User size={16} /></span>
                <span className="text-[13px] font-medium text-muted">Staff name</span>
              </div>
              <p className="text-[14px] font-semibold">{incident.serviceUser}</p>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-primary"><User size={16} /></span>
                <span className="text-[13px] font-medium text-muted">Designation</span>
              </div>
              <p className="text-[14px] font-semibold">{incident.designation || incident.reportedBy}</p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-primary"><Calendar size={16} /></span>
                <span className="text-[13px] font-medium text-muted">Date & Time</span>
              </div>
              <p className="text-[14px] font-semibold">{incident.time || incident.date}</p>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-primary"><User size={16} /></span>
                <span className="text-[13px] font-medium text-muted">Status</span>
              </div>
              <div className="flex items-center">
                <span className="text-[14px] font-semibold">{incident.statusDetails || incident.status}</span>
                {renderStatusDot(incident.statusDetails || incident.status)}
              </div>
            </div>
          </div>

          <div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-primary"><Location size={16} /></span>
                <span className="text-[13px] font-medium text-muted">Location</span>
              </div>
              <p className="text-[14px] font-semibold">{incident.location || "N/A"}</p>
            </div>
          </div>
        </div>

        <hr className="border-t border-[#E7E7E7] my-5" />

        {/* Type of incident */}
        <div className="mb-6">
          <p className="text-[14px] font-medium text-muted mb-3">Type of incident</p>
          <div className="flex flex-wrap gap-2 mt-2">
            {incident.incidentTypes?.map((type, index) => (
              <span
                key={index}
                className="px-2 bg-[#F5F5F5] text-slate-700 text-[11px] font-medium rounded-full"
              >
                {type}
              </span>
            ))}
          </div>
        </div>

        <hr className="border-t border-[#E7E7E7] my-5" />

        {/* What Happened */}
        <div className="mb-6">
          <h4 className="text-[13px] font-bold uppercase tracking-wider mb-3">WHAT HAPPENED?</h4>
          <div className="bg-[#FBFBFB] border rounded-xl p-4">
            <p className="text-[13px] font-semibold mb-2 ">Incident description</p>
            <div className="text-[13px]  space-y-2 ">
              {incident.description.split("\n").map((line, idx) => (
                <p key={idx}>{line}</p>
              ))}
            </div>
          </div>
        </div>

        <hr className="border-t border-[#E7E7E7] my-5" />

        {/* Attachments */}
        <div className="mb-6">
          <h4 className="text-[13px] font-bold uppercase tracking-wider mb-3">ATTACHMENTS</h4>
          <div className="border border-[#E7E7E7] rounded-2xl bg-white">
            {incident.attachments?.map((att, idx) => (
              <div
                key={idx}
                className={`flex items-center gap-3 p-4 ${
                  idx !== incident.attachments.length - 1 ? "border-b border-[#E7E7E7]" : ""
                }`}
              >
                <div className="p-2 bg-[#38BDF8]/10 text-[#38BDF8] rounded-xl flex items-center justify-center">
                  {att.type === "image" ? (
                    <ImageIcon size={18} className="text-[#38BDF8]" />
                  ) : (
                    <FileText size={18} className="text-[#38BDF8]" />
                  )}
                </div>
                <span className="text-[12px] font-medium">{att.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 pt-5 border-t border-slate-100 mt-8">
          <button className="flex items-center gap-2 px-6 py-2.5 bg-[#FAFAFA] hover:bg-slate-100 border border-[#E7E7E7] text-[14px] font-bold rounded-full transition-all cursor-pointer text-slate-700">
            <Download size={16} className="text-slate-700" />
            <span>Download</span>
          </button>
          <button className="flex items-center gap-2 px-6 py-2.5 bg-[#FAFAFA] hover:bg-slate-100 border border-[#E7E7E7] text-[14px] font-bold rounded-full transition-all cursor-pointer text-slate-700">
            <FolderUpload size={16} />
            <span>Export</span>
          </button>
        </div>
      </div>
    </Modal>
  );
}
