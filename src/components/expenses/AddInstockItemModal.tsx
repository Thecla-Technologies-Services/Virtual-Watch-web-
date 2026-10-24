import React from "react";
import { Modal } from "@/components/ui/Modal";
import { Calendar, ChevronDown } from "lucide-react";

interface AddInstockItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (data: any) => void;
}

export function AddInstockItemModal({
  isOpen,
  onClose,
  onSave,
}: AddInstockItemModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} width="2xl">
      <div className="flex items-center justify-between border-b pb-3 mb-5">
        <h3 className="text-base font-bold">Add entry</h3>
      </div>

      <div className="space-y-5 max-h-[72vh] overflow-y-auto pr-1 no-scrollbar">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-4">
          {/* Date */}
          <div>
            <label className="block text-[13px] font-medium mb-1.5">Date</label>
            <div className="relative">
              <input
                type="text"
                placeholder="e.g 2/13/2024"
                className="w-full pl-4 pr-10 py-3 bg-white border rounded-2xl text-[14px] focus:outline-none focus:ring-1 focus:ring-[#38BDF8] focus:border-[#38BDF8] transition-all placeholder:text-slate-400"
              />
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                <Calendar size={18} className="text-[#38BDF8]" />
              </div>
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-[13px] font-medium mb-1.5">Category</label>
            <div className="relative">
              <select
                className="w-full pl-4 pr-10 py-3 bg-white border rounded-2xl text-[14px] appearance-none focus:outline-none focus:ring-1 focus:ring-[#38BDF8] focus:border-[#38BDF8] transition-all cursor-pointer"
                defaultValue=""
              >
                <option value="" disabled hidden className="text-slate-400">
                  Select
                </option>
                <option value="Vegetables">Vegetables</option>
                <option value="Diary">Diary</option>
                <option value="Bakery">Bakery</option>
                <option value="Fruits">Fruits</option>
                <option value="Cleaning product">Cleaning product</option>
                <option value="Household items">Household items</option>
              </select>
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                <ChevronDown size={18} className="text-slate-700" />
              </div>
            </div>
          </div>

          {/* Item */}
          <div>
            <label className="block text-[13px] font-medium mb-1.5">Item</label>
            <div className="relative">
              <select
                className="w-full pl-4 pr-10 py-3 bg-white border rounded-2xl text-[14px] appearance-none focus:outline-none focus:ring-1 focus:ring-[#38BDF8] focus:border-[#38BDF8] transition-all cursor-pointer"
                defaultValue=""
              >
                <option value="" disabled hidden className="text-slate-400">
                  Select
                </option>
                <option value="Lettuce">Lettuce</option>
                <option value="Milk">Milk</option>
                <option value="Bread">Bread</option>
                <option value="Avocado">Avocado</option>
                <option value="Bleach">Bleach</option>
                <option value="Toilet rolls">Toilet rolls</option>
              </select>
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                <ChevronDown size={18} className="text-slate-700" />
              </div>
            </div>
          </div>

          {/* Use before / Expiry */}
          <div>
            <label className="block text-[13px] font-medium mb-1.5">
              Use before / Expiry
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="e.g 2/13/2024"
                className="w-full pl-4 pr-10 py-3 bg-white border rounded-2xl text-[14px] focus:outline-none focus:ring-1 focus:ring-[#38BDF8] focus:border-[#38BDF8] transition-all placeholder:text-slate-400"
              />
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                <Calendar size={18} className="text-[#38BDF8]" />
              </div>
            </div>
          </div>

          {/* Qty Ordered */}
          <div>
            <label className="block text-[13px] font-medium mb-1.5">
              Qty Ordered
            </label>
            <input
              type="text"
              placeholder="0"
              className="w-full px-4 py-3 bg-white border rounded-2xl text-[14px] focus:outline-none focus:ring-1 focus:ring-[#38BDF8] focus:border-[#38BDF8] transition-all placeholder:text-slate-400"
            />
          </div>

          {/* Qty delivered */}
          <div>
            <label className="block text-[13px] font-medium mb-1.5">
              Qty delivered
            </label>
            <input
              type="text"
              placeholder="0"
              className="w-full px-4 py-3 bg-white border rounded-2xl text-[14px] focus:outline-none focus:ring-1 focus:ring-[#38BDF8] focus:border-[#38BDF8] transition-all placeholder:text-slate-400"
            />
          </div>

          {/* Unit Price (£) */}
          <div>
            <label className="block text-[13px] font-medium mb-1.5">
              Unit Price (£)
            </label>
            <input
              type="text"
              placeholder="0.00"
              className="w-full px-4 py-3 bg-white border rounded-2xl text-[14px] focus:outline-none focus:ring-1 focus:ring-[#38BDF8] focus:border-[#38BDF8] transition-all placeholder:text-slate-400"
            />
          </div>

          {/* Total cost */}
          <div>
            <label className="block text-[13px] font-medium mb-1.5">
              Total cost
            </label>
            <input
              type="text"
              placeholder="£0.00"
              className="w-full px-4 py-3 bg-white border rounded-2xl text-[14px] focus:outline-none focus:ring-1 focus:ring-[#38BDF8] focus:border-[#38BDF8] transition-all placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Instock Checkbox */}
        <div className="pt-2">
          <label className="inline-flex items-center gap-2.5 text-[14px] font-medium text-slate-700 cursor-pointer select-none">
            <input
              type="checkbox"
              className="rounded border-slate-300 text-[#38BDF8] focus:ring-[#38BDF8] h-4 w-4 cursor-pointer"
              defaultChecked
            />
            <span>Instock</span>
          </label>
        </div>

        {/* Action Footer */}
        <div className="flex items-center justify-end gap-3 pt-5 border-t mt-8">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 bg-[#38BDF8] hover:bg-[#2BA5DF] text-white text-[14px] font-bold rounded-full transition-all cursor-pointer"
          >
            Save
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
