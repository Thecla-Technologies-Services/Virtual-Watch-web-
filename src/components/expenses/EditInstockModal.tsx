import React, { useState, useEffect } from "react";
import { Modal } from "@/components/ui/Modal";
import type { InstockItem } from "@/constants/expenses";

interface EditInstockModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: InstockItem | null;
  onSave: (updatedItem: InstockItem) => void;
}

export function EditInstockModal({
  isOpen,
  onClose,
  item,
  onSave,
}: EditInstockModalProps) {
  const [formData, setFormData] = useState<Partial<InstockItem>>({});

  useEffect(() => {
    if (item) {
      setFormData({ ...item });
    }
  }, [item, isOpen]);

  if (!item) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.item && formData.category) {
      onSave(formData as InstockItem);
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Inventory Item"
      width="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4 pt-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-1.5">
              Item Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              name="item"
              value={formData.item || ""}
              onChange={handleChange}
              required
              className="w-full h-11 px-3.5 bg-[#F9F9FB] border rounded-xl text-sm font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#38BDF8] transition-all"
              placeholder="e.g. Lettuce"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-1.5">
              Category <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              name="category"
              value={formData.category || ""}
              onChange={handleChange}
              required
              className="w-full h-11 px-3.5 bg-[#F9F9FB] border rounded-xl text-sm font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#38BDF8] transition-all"
              placeholder="e.g. Vegetables, Medical Supplies"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-1.5">
              Qty Ordered
            </label>
            <input
              type="number"
              name="qtyOrdered"
              value={formData.qtyOrdered !== undefined ? formData.qtyOrdered : ""}
              onChange={handleChange}
              className="w-full h-11 px-3.5 bg-[#F9F9FB] border rounded-xl text-sm font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#38BDF8] transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-1.5">
              Qty Delivered
            </label>
            <input
              type="number"
              name="qtyDelivered"
              value={formData.qtyDelivered !== undefined ? formData.qtyDelivered : ""}
              onChange={handleChange}
              className="w-full h-11 px-3.5 bg-[#F9F9FB] border rounded-xl text-sm font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#38BDF8] transition-all"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-1.5">
              Unit Price
            </label>
            <input
              type="text"
              name="unitPrice"
              value={formData.unitPrice || ""}
              onChange={handleChange}
              className="w-full h-11 px-3.5 bg-[#F9F9FB] border rounded-xl text-sm font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#38BDF8] transition-all"
              placeholder="e.g. £1.20"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-1.5">
              Total Cost
            </label>
            <input
              type="text"
              name="total"
              value={formData.total || ""}
              onChange={handleChange}
              className="w-full h-11 px-3.5 bg-[#F9F9FB] border rounded-xl text-sm font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#38BDF8] transition-all"
              placeholder="e.g. £3.60"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-1.5">
              Use Before Date
            </label>
            <input
              type="date"
              name="useBefore"
              value={formData.useBefore || ""}
              onChange={handleChange}
              className="w-full h-11 px-3.5 bg-[#F9F9FB] border rounded-xl text-sm font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#38BDF8] transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-1.5">
              Requested By
            </label>
            <input
              type="text"
              name="requestedBy"
              value={formData.requestedBy || ""}
              onChange={handleChange}
              className="w-full h-11 px-3.5 bg-[#F9F9FB] border rounded-xl text-sm font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#38BDF8] transition-all"
              placeholder="e.g. Alice Johnson"
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl border text-sm font-bold hover:bg-slate-50 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-[#38BDF8] text-white text-sm font-bold hover:bg-[#32B1EC] transition-colors cursor-pointer shadow-2xs"
          >
            Save Changes
          </button>
        </div>
      </form>
    </Modal>
  );
}
