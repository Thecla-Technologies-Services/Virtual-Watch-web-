import React, { useState, useEffect } from "react";
import { Modal } from "@/components/ui/Modal";
import type { Rota } from "@/constants/rotas";

interface EditRotaModalProps {
  isOpen: boolean;
  onClose: () => void;
  rota: Rota | null;
  onSave: (updatedRota: Rota) => void;
}

export function EditRotaModal({
  isOpen,
  onClose,
  rota,
  onSave,
}: EditRotaModalProps) {
  const [formData, setFormData] = useState<Partial<Rota>>({});

  useEffect(() => {
    if (rota) {
      setFormData({ ...rota });
    }
  }, [rota, isOpen]);

  if (!rota) return null;

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
    if (formData.title && formData.period) {
      onSave(formData as Rota);
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Rota Assignment"
      width="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4 pt-2">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-1.5">
            Rota Title <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            name="title"
            value={formData.title || ""}
            onChange={handleChange}
            required
            className="w-full h-11 px-3.5 bg-[#F9F9FB] border rounded-xl text-sm font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#38BDF8] transition-all"
            placeholder="e.g. North Region - Week 1"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-1.5">
              Schedule Period <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              name="period"
              value={formData.period || ""}
              onChange={handleChange}
              required
              className="w-full h-11 px-3.5 bg-[#F9F9FB] border rounded-xl text-sm font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#38BDF8] transition-all"
              placeholder="e.g. Apr 22 - Apr 28"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-1.5">
              Region / Area
            </label>
            <input
              type="text"
              name="region"
              value={formData.region || ""}
              onChange={handleChange}
              className="w-full h-11 px-3.5 bg-[#F9F9FB] border rounded-xl text-sm font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#38BDF8] transition-all"
              placeholder="e.g. North Region"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-1.5">
              Staff Count
            </label>
            <input
              type="number"
              name="staffCount"
              value={formData.staffCount !== undefined ? formData.staffCount : ""}
              onChange={handleChange}
              className="w-full h-11 px-3.5 bg-[#F9F9FB] border rounded-xl text-sm font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#38BDF8] transition-all"
              placeholder="e.g. 24"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-1.5">
              Shifts Count
            </label>
            <input
              type="number"
              name="shiftsCount"
              value={formData.shiftsCount !== undefined ? formData.shiftsCount : ""}
              onChange={handleChange}
              className="w-full h-11 px-3.5 bg-[#F9F9FB] border rounded-xl text-sm font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#38BDF8] transition-all"
              placeholder="e.g. 148"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-1.5">
              Coverage (%)
            </label>
            <input
              type="number"
              name="coverage"
              value={formData.coverage !== undefined ? formData.coverage : ""}
              onChange={handleChange}
              className="w-full h-11 px-3.5 bg-[#F9F9FB] border rounded-xl text-sm font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#38BDF8] transition-all"
              placeholder="e.g. 98"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-1.5">
              Status
            </label>
            <select
              name="status"
              value={formData.status || "Published"}
              onChange={handleChange}
              className="w-full h-11 px-3 bg-[#F9F9FB] border rounded-xl text-sm font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#38BDF8] transition-all cursor-pointer"
            >
              <option value="Approved">Approved</option>
              <option value="Published">Published</option>
              <option value="Locked">Locked</option>
              <option value="Draft">Draft</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-1.5">
              Created By
            </label>
            <input
              type="text"
              name="createdBy"
              value={formData.createdBy || ""}
              onChange={handleChange}
              className="w-full h-11 px-3.5 bg-[#F9F9FB] border rounded-xl text-sm font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#38BDF8] transition-all"
              placeholder="e.g. Sarah Jones"
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
