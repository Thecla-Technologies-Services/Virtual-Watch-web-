import { Modal } from "@/components/ui/Modal";
import { Calendar, ChevronDown, Upload } from "lucide-react";

interface AddHolidayModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (data: any) => void;
}

export function AddHolidayModal({ isOpen, onClose }: AddHolidayModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} height="xl" width="2xl">
      <div className="flex items-center justify-between border-b pb-3 mb-4">
        <h3 className="text-base font-bold">Add new</h3>
      </div>

      <div className="space-y-4 max-h-[72vh] overflow-y-auto pr-1 no-scrollbar">
        {/* Top Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-[13px] font-medium mb-1">Name</label>
            <input
              type="text"
              placeholder="e.g John Smith"
              className="w-full px-4 py-3 bg-white border rounded-2xl text-[14px] focus:outline-none focus:ring-1 focus:ring-[#38BDF8] focus:border-[#38BDF8] transition-all placeholder:text-slate-400"
            />
          </div>

          <div>
            <label className="block text-[13px] font-medium mb-1">Leave type</label>
            <div className="relative">
              <select
                className="w-full pl-4 pr-10 py-3 bg-white border rounded-2xl text-[14px] appearance-none focus:outline-none focus:ring-1 focus:ring-[#38BDF8] focus:border-[#38BDF8] transition-all cursor-pointer"
                defaultValue=""
              >
                <option value="" disabled hidden className="text-slate-400">
                  e.g Annual leave
                </option>
                <option value="Annual leave">Annual leave</option>
                <option value="Sick leave">Sick leave</option>
                <option value="Compassionate leave">Compassionate leave</option>
                <option value="Parental leave">Parental leave</option>
              </select>
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                <ChevronDown size={18} className="text-slate-700" />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-[13px] font-medium mb-1">Start date</label>
            <div className="relative">
              <input
                type="text"
                placeholder="e.g 2/13/2024"
                className="w-full pl-4 pr-10 py-3 bg-white border rounded-2xl text-[14px] focus:outline-none focus:ring-1 focus:ring-[#38BDF8] focus:border-[#38BDF8] transition-all placeholder:text-slate-400"
              />
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                <Calendar size={16} className="text-[#38BDF8]" />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-[13px] font-medium mb-1">End date</label>
            <div className="relative">
              <input
                type="text"
                placeholder="e.g 2/13/2024"
                className="w-full pl-4 pr-10 py-3 bg-white border rounded-2xl text-[14px] focus:outline-none focus:ring-1 focus:ring-[#38BDF8] focus:border-[#38BDF8] transition-all placeholder:text-slate-400"
              />
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                <Calendar size={16} className="text-[#38BDF8]" />
              </div>
            </div>
          </div>
        </div>

        {/* Status */}
        <div>
          <label className="block text-[13px] font-medium mb-1">Status</label>
          <div className="relative">
            <select
              className="w-full pl-4 pr-10 py-3 bg-white border rounded-2xl text-[14px] appearance-none focus:outline-none focus:ring-1 focus:ring-[#38BDF8] focus:border-[#38BDF8] transition-all cursor-pointer"
              defaultValue=""
            >
              <option value="" disabled hidden className="text-slate-400">
                e.g Approved
              </option>
              <option value="Approved">Approved</option>
              <option value="Under review">Under review</option>
              <option value="Pending">Pending</option>
              <option value="Rejected">Rejected</option>
            </select>
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
              <ChevronDown size={18} className="text-slate-700" />
            </div>
          </div>
        </div>

        {/* Reason */}
        <div>
          <label className="block text-[13px] font-medium mb-1">Reason</label>
          <textarea
            rows={3}
            placeholder="e.g Morning care for Mr. Smith"
            className="w-full p-4 bg-white border rounded-2xl text-[14px] focus:outline-none focus:ring-1 focus:ring-[#38BDF8] focus:border-[#38BDF8] transition-all placeholder:text-slate-400 resize-none"
          ></textarea>
        </div>

        <hr className="border-t my-5" />

        {/* Additional Information */}
        <div>
          <h4 className="text-[13px] font-bold uppercase tracking-wider mb-3">
            ADDITIONAL INFORMATION
          </h4>

          <div className="space-y-4">
            <div>
              <label className="block text-[13px] font-medium mb-1">
                Covering staff member
              </label>
              <div className="relative">
                <select
                  className="w-full pl-4 pr-10 py-3 bg-white border rounded-2xl text-[14px] appearance-none focus:outline-none focus:ring-1 focus:ring-[#38BDF8] focus:border-[#38BDF8] transition-all cursor-pointer"
                  defaultValue=""
                >
                  <option value="" disabled hidden className="text-slate-400">
                    e.g Carol Davis
                  </option>
                  <option value="Bob Smith">Bob Smith</option>
                  <option value="Carol Davis">Carol Davis</option>
                  <option value="David Wilson">David Wilson</option>
                  <option value="Eve Martinez">Eve Martinez</option>
                  <option value="Alice Johnson">Alice Johnson</option>
                </select>
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                  <ChevronDown size={18} className="text-slate-700" />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[13px] font-medium mb-1">Notes</label>
              <textarea
                rows={3}
                placeholder="e.g Morning care for Mr. Smith"
                className="w-full p-4 bg-white border rounded-2xl text-[14px] focus:outline-none focus:ring-1 focus:ring-[#38BDF8] focus:border-[#38BDF8] transition-all placeholder:text-slate-400 resize-none"
              ></textarea>
            </div>

            <div>
              <label className="block text-[13px] font-medium mb-1.5">
                Attachments
              </label>
              <div className="bg-[#EBF7FD]/60 hover:bg-[#EBF7FD] border border-transparent rounded-2xl h-20 flex items-center justify-center cursor-pointer transition-colors mb-2">
                <div className="p-2.5 bg-[#38BDF8]/10 rounded-full">
                  <Upload size={20} className="text-[#38BDF8]" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Footer */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 bg-[#38BDF8] hover:bg-[#2BA5DF] text-white text-[14px] font-bold rounded-full transition-all cursor-pointer"
          >
            Create leave
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 bg-[#FAFAFA] hover:bg-slate-100 border text-[14px] font-bold text-slate-700 rounded-full transition-all cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
}
