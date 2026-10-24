import { Modal } from "@/components/ui/Modal";
import { Calendar, Percent, ChevronDown } from "lucide-react";

interface AddRotaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddRotaModal({ isOpen, onClose }: AddRotaModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} height="xl" width="2xl">
      <div className="flex items-center justify-between border-b border-slate-50 pb-2 mb-4">
        <h3 className="text-base font-bold">Add new</h3>
      </div>

      <div className="space-y-2">
        <div>
          <label className="block text-[13px] font-medium  mb-1">Title</label>
          <input
            type="text"
            placeholder="e.g North region - Week 1"
            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-3xl text-[14px] focus:outline-none focus:ring-2 focus:ring-[#38BDF8]/20 focus:border-[#38BDF8] transition-all placeholder:text-slate-400 text-slate-700"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div>
            <label className="block text-[13px] font-medium  mb-1">Period</label>
            <div className="relative">
              <input
                type="text"
                placeholder="e.g 2/12/2024 - 2/18/2024"
                className="w-full pl-4 pr-10 py-3 bg-white border border-slate-200 rounded-3xl text-[14px] focus:outline-none focus:ring-2 focus:ring-[#38BDF8]/20 focus:border-[#38BDF8] transition-all placeholder:text-slate-400 text-slate-700"
              />
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                <Calendar size={16} className="text-[#38BDF8]" />
              </div>
            </div>
          </div>
          
          <div>
            <label className="block text-[13px] font-medium  mb-1">Staff</label>
            <input
              type="text"
              placeholder="e.g 45"
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-3xl text-[14px] focus:outline-none focus:ring-2 focus:ring-[#38BDF8]/20 focus:border-[#38BDF8] transition-all placeholder:text-slate-400 text-slate-700"
            />
          </div>

          <div>
            <label className="block text-[13px] font-medium  mb-1">Shifts</label>
            <input
              type="text"
              placeholder="e.g 320 shifts"
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-3xl text-[14px] focus:outline-none focus:ring-2 focus:ring-[#38BDF8]/20 focus:border-[#38BDF8] transition-all placeholder:text-slate-400 text-slate-700"
            />
          </div>

          <div>
            <label className="block text-[13px] font-medium  mb-1">Coverage</label>
            <div className="relative">
              <input
                type="text"
                placeholder="e.g 98"
                className="w-full pl-4 pr-10 py-3 bg-white border border-slate-200 rounded-3xl text-[14px] focus:outline-none focus:ring-2 focus:ring-[#38BDF8]/20 focus:border-[#38BDF8] transition-all placeholder:text-slate-400 text-slate-700"
              />
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                <Percent size={14} className="text-slate-700 font-extrabold" strokeWidth={3} />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-[13px] font-medium  mb-1">Created by</label>
            <div className="relative">
              <select 
                className="w-full pl-4 pr-10 py-3 bg-white border border-slate-200 rounded-3xl text-[14px] appearance-none focus:outline-none focus:ring-2 focus:ring-[#38BDF8]/20 focus:border-[#38BDF8] transition-all text-slate-700 cursor-pointer"
                defaultValue=""
              >
                <option value="" disabled hidden className="text-slate-400">e.g Alice Johnson</option>
                <option value="Alice Johnson">Alice Johnson</option>
                <option value="Bob Smith">Bob Smith</option>
              </select>
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                <ChevronDown size={18} className="text-slate-700" />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-[13px] font-medium  mb-1">Status</label>
            <div className="relative">
              <select 
                className="w-full pl-4 pr-10 py-3 bg-white border border-slate-200 rounded-3xl text-[14px] appearance-none focus:outline-none focus:ring-2 focus:ring-[#38BDF8]/20 focus:border-[#38BDF8] transition-all text-slate-700 cursor-pointer"
                defaultValue=""
              >
                <option value="" disabled hidden className="text-slate-400">e.g Approved</option>
                <option value="Approved">Approved</option>
                <option value="Published">Published</option>
                <option value="Locked">Locked</option>
                <option value="Draft">Draft</option>
              </select>
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                <ChevronDown size={18} className="text-slate-700" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 mt-8 pt-5 border-t border-slate-50">
        <button className="px-8 py-2.5 bg-[#38BDF8] hover:bg-[#2BA5DF] text-white text-[14px] font-bold rounded-full shadow-[0_4px_12px_-4px_rgba(56,189,248,0.5)] hover:shadow-[0_6px_16px_-4px_rgba(56,189,248,0.6)] transition-all cursor-pointer">
          Create
        </button>
        <button className="px-6 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 text-[14px] font-bold rounded-full transition-all cursor-pointer">
          Save as draft
        </button>
        <button 
          onClick={onClose}
          className="px-6 py-2.5 text-[14px] font-bold text-slate-700 hover:text-slate-900 transition-colors cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
}
