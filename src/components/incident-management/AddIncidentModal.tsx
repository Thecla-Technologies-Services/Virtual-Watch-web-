import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Calendar, Clock, ChevronDown, Upload, Image as ImageIcon, FileText, X } from "lucide-react";

interface AddIncidentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddIncidentModal({ isOpen, onClose }: AddIncidentModalProps) {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([
    "Injury / assault",
    "Damage / abuse"
  ]);

  const [attachments, setAttachments] = useState<Array<{ name: string; type: "image" | "pdf" }>>([
    { name: "incident-photo.jpg", type: "image" },
    { name: "incident-report.pdf", type: "pdf" }
  ]);

  const handleRemoveType = (typeToRemove: string) => {
    setSelectedTypes(selectedTypes.filter(type => type !== typeToRemove));
  };

  const handleRemoveAttachment = (nameToRemove: string) => {
    setAttachments(attachments.filter(att => att.name !== nameToRemove));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} height="xl" width="2xl">
      <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-4">
        <h3 className="text-base font-bold">Add new</h3>
      </div>

      <div className="space-y-3 max-h-[72vh] overflow-y-auto pr-1 no-scrollbar">
        {/* Title */}
        <div>
          <label className="block text-[13px] font-medium mb-1">Title</label>
          <input
            type="text"
            placeholder="e.g Morning care for Mr. Smith"
            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-2xl text-[14px] focus:outline-none focus:ring-1 focus:ring-[#38BDF8] focus:border-[#38BDF8] transition-all placeholder:text-slate-400 text-slate-700"
          />
        </div>

        {/* 2-Column Form Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-[13px] font-medium mb-1">Incident date</label>
            <div className="relative">
              <input
                type="text"
                placeholder="e.g 2/13/2024"
                className="w-full pl-4 pr-10 py-3 bg-white border border-slate-200 rounded-2xl text-[14px] focus:outline-none focus:ring-1 focus:ring-[#38BDF8] focus:border-[#38BDF8] transition-all placeholder:text-slate-400 text-slate-700"
              />
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                <Calendar size={16} className="text-[#38BDF8]" />
              </div>
            </div>
          </div>
          
          <div>
            <label className="block text-[13px] font-medium mb-1">Incident time</label>
            <div className="relative">
              <input
                type="text"
                placeholder="e.g 09:00 PM"
                className="w-full pl-4 pr-10 py-3 bg-white border border-slate-200 rounded-2xl text-[14px] focus:outline-none focus:ring-1 focus:ring-[#38BDF8] focus:border-[#38BDF8] transition-all placeholder:text-slate-400 text-slate-700"
              />
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                <Clock size={16} className="text-[#38BDF8]" />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-[13px] font-medium mb-1">Location</label>
            <input
              type="text"
              placeholder="Enter"
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-2xl text-[14px] focus:outline-none focus:ring-1 focus:ring-[#38BDF8] focus:border-[#38BDF8] transition-all placeholder:text-slate-400 text-slate-700"
            />
          </div>

          <div>
            <label className="block text-[13px] font-medium mb-1">Staff name</label>
            <input
              type="text"
              readOnly
              defaultValue="Alice Johnson"
              className="w-full px-4 py-3 bg-[#FBFBFB] border border-slate-100 rounded-2xl text-[14px] text-slate-500 focus:outline-none cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-[13px] font-medium mb-1">Designation</label>
            <input
              type="text"
              readOnly
              defaultValue="xxxxxxxxxxxx"
              className="w-full px-4 py-3 bg-[#FBFBFB] border border-slate-100 rounded-2xl text-[14px] text-slate-400 focus:outline-none cursor-not-allowed tracking-widest"
            />
          </div>

          <div>
            <label className="block text-[13px] font-medium mb-1">Status</label>
            <div className="relative">
              <select 
                className="w-full pl-4 pr-10 py-3 bg-white border border-slate-200 rounded-2xl text-[14px] appearance-none focus:outline-none focus:ring-1 focus:ring-[#38BDF8] focus:border-[#38BDF8] transition-all text-slate-700 cursor-pointer"
                defaultValue=""
              >
                <option value="" disabled hidden className="text-slate-400">e.g Submitted</option>
                <option value="Submitted">Submitted</option>
                <option value="Approved">Approved</option>
                <option value="Pending review">Pending review</option>
                <option value="Need escalation">Need escalation</option>
              </select>
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                <ChevronDown size={18} className="text-slate-700" />
              </div>
            </div>
          </div>
        </div>

        {/* Type of Incident */}
        <div>
          <label className="block text-[13px] font-medium mb-1">
            Type of incident <span className="text-muted font-normal">(Select all that applies)</span>
          </label>
          <div className="relative mb-2.5">
            <select 
              className="w-full pl-4 pr-10 py-3 bg-white border border-slate-200 rounded-2xl text-[14px] appearance-none focus:outline-none focus:ring-1 focus:ring-[#38BDF8] focus:border-[#38BDF8] transition-all text-slate-700 cursor-pointer"
              defaultValue=""
              onChange={(e) => {
                const val = e.target.value;
                if (val && !selectedTypes.includes(val)) {
                  setSelectedTypes([...selectedTypes, val]);
                }
              }}
            >
              <option value="" disabled hidden className="text-slate-400">e.g Near miss</option>
              <option value="Near miss">Near miss</option>
              <option value="Injury / assault">Injury / assault</option>
              <option value="Damage / abuse">Damage / abuse</option>
              <option value="Injury to staff">Injury to staff</option>
              <option value="Physical assault on service user">Physical assault on service user</option>
              <option value="Verbal abuse">Verbal abuse</option>
              <option value="First aid required">First aid required</option>
              <option value="Medical / emergency">Medical / emergency</option>
              <option value="Medical history">Medical history</option>
            </select>
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
              <ChevronDown size={18} className="text-slate-700" />
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {selectedTypes.map((type) => (
              <div
                key={type}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#F5F5F5] text-slate-700 text-xs font-semibold rounded-full"
              >
                <span>{type}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveType(type)}
                  className="text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                >
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <hr className="border-t border-[#E7E7E7] my-5" />

        {/* What Happened */}
        <div>
          <h4 className="text-[13px] font-bold uppercase tracking-wider mb-2">WHAT HAPPENED?</h4>
          <label className="block text-[13px] font-medium mb-1.5 text-slate-700">Incident description</label>
          <textarea
            placeholder="Submit incident report"
            rows={3}
            className="w-full p-4 bg-white border border-slate-200 rounded-2xl text-[14px] focus:outline-none focus:ring-1 focus:ring-[#38BDF8] focus:border-[#38BDF8] transition-all placeholder:text-slate-400 text-slate-700 resize-none"
          ></textarea>
        </div>

        <hr className="border-t border-[#E7E7E7] my-5" />

        {/* Attachments */}
        <div>
          <h4 className="text-[13px] font-bold uppercase tracking-wider mb-3">ATTACHMENTS</h4>
          
          {/* Dropzone */}
          <div className="bg-[#EBF7FD]/60 hover:bg-[#EBF7FD] border border-transparent rounded-2xl h-24 flex items-center justify-center cursor-pointer transition-colors mb-3.5">
            <div className="p-2.5 bg-[#38BDF8]/10 rounded-full">
              <Upload size={20} className="text-[#38BDF8]" />
            </div>
          </div>

          {/* Attachment Chips */}
          <div className="flex flex-wrap gap-2">
            {attachments.map((att) => (
              <div
                key={att.name}
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#F8F9FA] border border-slate-100 text-slate-700 text-xs font-medium rounded-xl"
              >
                {att.type === "image" ? (
                  <ImageIcon size={14} className="text-[#38BDF8]" />
                ) : (
                  <FileText size={14} className="text-red-500" />
                )}
                <span>{att.name}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveAttachment(att.name)}
                  className="text-slate-400 hover:text-slate-700 transition-colors cursor-pointer ml-1"
                >
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 mt-6">
          <button className="px-6 py-2.5 bg-[#38BDF8] hover:bg-[#2BA5DF] text-white text-[14px] font-bold rounded-full transition-all cursor-pointer">
            Create incident
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 bg-[#FAFAFA] hover:bg-slate-100 border border-[#E7E7E7] text-[14px] font-bold text-slate-700 rounded-full transition-all cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
}
