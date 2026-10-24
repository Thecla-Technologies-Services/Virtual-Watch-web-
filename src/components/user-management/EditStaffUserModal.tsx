import React, { useState, useEffect } from "react";
import { Modal } from "@/components/ui/Modal";
import type { StaffUser } from "@/constants/userManagement";

interface EditStaffUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: StaffUser | null;
  onSave: (updatedUser: StaffUser) => void;
}

export function EditStaffUserModal({
  isOpen,
  onClose,
  user,
  onSave,
}: EditStaffUserModalProps) {
  const [formData, setFormData] = useState<Partial<StaffUser>>({});

  useEffect(() => {
    if (user) {
      setFormData({ ...user });
    }
  }, [user, isOpen]);

  if (!user) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email) {
      onSave(formData as StaffUser);
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Staff User"
      width="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4 pt-2">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-1.5">
            Full Name <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name || ""}
            onChange={handleChange}
            required
            className="w-full h-11 px-3.5 bg-[#F9F9FB] border rounded-xl text-sm font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#38BDF8] transition-all"
            placeholder="e.g. Sabrina Marsh"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-1.5">
            Email Address <span className="text-rose-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email || ""}
            onChange={handleChange}
            required
            className="w-full h-11 px-3.5 bg-[#F9F9FB] border rounded-xl text-sm font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#38BDF8] transition-all"
            placeholder="e.g. sabrina.marsh@medstar.co.uk"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-1.5">
              Role
            </label>
            <select
              name="role"
              value={formData.role || "Support Worker"}
              onChange={handleChange}
              className="w-full h-11 px-3 bg-[#F9F9FB] border rounded-xl text-sm font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#38BDF8] transition-all cursor-pointer"
            >
              <option value="Company Admin">Company Admin</option>
              <option value="Support Worker">Support Worker</option>
              <option value="Nurse">Nurse</option>
              <option value="Manager">Manager</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-1.5">
              Department
            </label>
            <input
              type="text"
              name="department"
              value={formData.department || ""}
              onChange={handleChange}
              className="w-full h-11 px-3.5 bg-[#F9F9FB] border rounded-xl text-sm font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#38BDF8] transition-all"
              placeholder="e.g. Health Care"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-1.5">
              Phone Number
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone || ""}
              onChange={handleChange}
              className="w-full h-11 px-3.5 bg-[#F9F9FB] border rounded-xl text-sm font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#38BDF8] transition-all"
              placeholder="e.g. +44 7700 900077"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-1.5">
              Insurance / UTR Number
            </label>
            <input
              type="text"
              name="insuranceNumber"
              value={formData.insuranceNumber || ""}
              onChange={handleChange}
              className="w-full h-11 px-3.5 bg-[#F9F9FB] border rounded-xl text-sm font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#38BDF8] transition-all"
              placeholder="e.g. AB123456C"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-1.5">
            Account Status
          </label>
          <select
            name="status"
            value={formData.status || "Active"}
            onChange={handleChange}
            className="w-full h-11 px-3 bg-[#F9F9FB] border rounded-xl text-sm font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#38BDF8] transition-all cursor-pointer"
          >
            <option value="Active">Active</option>
            <option value="Invited">Invited</option>
            <option value="Inactive">Inactive</option>
          </select>
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
