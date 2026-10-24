import React from "react";
import { Modal } from "@/components/ui/Modal";
import { Calendar, ChevronDown, Upload } from "lucide-react";

interface AddPettyCashModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (data: any) => void;
}

export function AddPettyCashModal({ isOpen, onClose }: AddPettyCashModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} height="xl" width="2xl">
      <div className="flex items-center justify-between border-b pb-3 mb-4">
        <h3 className="text-base font-bold">Add new</h3>
      </div>

      <div className="space-y-4 max-h-[72vh] overflow-y-auto pr-1 no-scrollbar">
        {/* Top Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[13px] font-medium mb-1">Item</label>
            <div className="relative">
              <select
                className="w-full pl-4 pr-10 py-3 bg-white border rounded-2xl text-[14px] appearance-none focus:outline-none focus:ring-1 focus:ring-[#38BDF8] focus:border-[#38BDF8] transition-all cursor-pointer"
                defaultValue=""
              >
                <option value="" disabled hidden className="text-slate-400">
                  Select
                </option>
                <option value="Office supplies - printer paper">Office supplies - printer paper</option>
                <option value="Staff training - fuel mileage">Staff training - fuel mileage</option>
                <option value="Care equipment - sanitary items">Care equipment - sanitary items</option>
                <option value="Staff certification courses">Staff certification courses</option>
                <option value="Personal coffee - night shift">Personal coffee - night shift</option>
              </select>
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                <ChevronDown size={18} className="text-slate-700" />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-[13px] font-medium mb-1">Qty</label>
            <input
              type="text"
              placeholder="0"
              className="w-full px-4 py-3 bg-white border rounded-2xl text-[14px] focus:outline-none focus:ring-1 focus:ring-[#38BDF8] focus:border-[#38BDF8] transition-all placeholder:text-slate-400"
            />
          </div>

          <div>
            <label className="block text-[13px] font-medium mb-1">Type</label>
            <div className="relative">
              <select
                className="w-full pl-4 pr-10 py-3 bg-white border rounded-2xl text-[14px] appearance-none focus:outline-none focus:ring-1 focus:ring-[#38BDF8] focus:border-[#38BDF8] transition-all cursor-pointer"
                defaultValue=""
              >
                <option value="" disabled hidden className="text-slate-400">
                  e.g Petty cash
                </option>
                <option value="Petty cash">Petty cash</option>
                <option value="Reimbursement">Reimbursement</option>
              </select>
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                <ChevronDown size={18} className="text-slate-700" />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-[13px] font-medium mb-1">Amount</label>
            <input
              type="text"
              placeholder="e.g £45.60"
              className="w-full px-4 py-3 bg-white border rounded-2xl text-[14px] focus:outline-none focus:ring-1 focus:ring-[#38BDF8] focus:border-[#38BDF8] transition-all placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-[13px] font-medium mb-1">Description</label>
          <textarea
            rows={3}
            placeholder="e.g Purchased 5 reams of A4 80gsm white paper for office use"
            className="w-full p-4 bg-white border rounded-2xl text-[14px] focus:outline-none focus:ring-1 focus:ring-[#38BDF8] focus:border-[#38BDF8] transition-all placeholder:text-slate-400 resize-none"
          ></textarea>
        </div>

        <hr className="border-t my-5" />

        {/* Submission Details */}
        <div>
          <h4 className="text-[13px] font-bold uppercase mb-3">
            SUBMISSION DETAILS
          </h4>

          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[13px] font-medium mb-1">
                  Submitted by
                </label>
                <input
                  type="text"
                  readOnly
                  value="e.g Alice Johnson (autoloaded)"
                  className="w-full px-4 py-3 bg-[#FBFBFB] border border-slate-200 rounded-2xl text-[14px] text-slate-500 focus:outline-none cursor-default"
                />
              </div>

              <div>
                <label className="block text-[13px] font-medium mb-1">Date</label>
                <div className="relative">
                  <input
                    type="text"
                    readOnly
                    value="e.g 2/13/2024 (autoloaded)"
                    className="w-full pl-4 pr-10 py-3 bg-[#FBFBFB] border border-slate-200 rounded-2xl text-[14px] text-slate-500 focus:outline-none cursor-default"
                  />
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                    <Calendar size={16} className="text-[#38BDF8]" />
                  </div>
                </div>
              </div>
            </div>

            <div className="sm:w-1/2 sm:pr-2">
              <label className="block text-[13px] font-medium mb-1">
                Expenses date
              </label>
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
        </div>

        <hr className="border-t my-5" />

        {/* Attachments */}
        <div>
          <h4 className="text-[13px] font-bold uppercase mb-3">
            ATTACHMENTS
          </h4>
          <div className="bg-[#EBF7FD]/60 hover:bg-[#EBF7FD] border border-transparent rounded-2xl h-20 flex items-center justify-center cursor-pointer transition-colors mb-2">
            <div className="p-2.5 bg-[#38BDF8]/10 rounded-full">
              <Upload size={20} className="text-[#38BDF8]" />
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
            Create
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
