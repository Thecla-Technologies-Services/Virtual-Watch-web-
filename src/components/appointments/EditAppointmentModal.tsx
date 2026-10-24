import React, { useState, useEffect } from "react";
import { Modal } from "@/components/ui/Modal";
import type { Appointment } from "@/constants/appointments";

interface EditAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointment: Appointment | null;
  onSave: (updatedAppointment: Appointment) => void;
}

export function EditAppointmentModal({
  isOpen,
  onClose,
  appointment,
  onSave,
}: EditAppointmentModalProps) {
  const [formData, setFormData] = useState<Partial<Appointment>>({});

  useEffect(() => {
    if (appointment) {
      setFormData({ ...appointment });
    }
  }, [appointment, isOpen]);

  if (!appointment) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.type && formData.serviceUser && formData.date && formData.time) {
      onSave(formData as Appointment);
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Appointment Details"
      width="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4 pt-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-1.5">
              Appointment Type <span className="text-rose-500">*</span>
            </label>
            <select
              name="type"
              value={formData.type || "GP Appointment"}
              onChange={handleChange}
              className="w-full h-11 px-3 bg-[#F9F9FB] border rounded-xl text-sm font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#38BDF8] transition-all cursor-pointer"
            >
              <option value="GP Appointment">GP Appointment</option>
              <option value="Psychiatric">Psychiatric</option>
              <option value="Social worker">Social worker</option>
              <option value="External visitor">External visitor</option>
              <option value="Dental Appointment">Dental Appointment</option>
              <option value="Specialist Appointment">Specialist Appointment</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-1.5">
              Service User <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              name="serviceUser"
              value={formData.serviceUser || ""}
              onChange={handleChange}
              required
              className="w-full h-11 px-3.5 bg-[#F9F9FB] border rounded-xl text-sm font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#38BDF8] transition-all"
              placeholder="e.g. SU-001 – Margaret Thatcher"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-1.5">
              Doctor / Visitor Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              name="doctorVisitor"
              value={formData.doctorVisitor || ""}
              onChange={handleChange}
              required
              className="w-full h-11 px-3.5 bg-[#F9F9FB] border rounded-xl text-sm font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#38BDF8] transition-all"
              placeholder="e.g. Dr. Sarah Jenkins"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-1.5">
              Location / Clinic <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              name="location"
              value={formData.location || ""}
              onChange={handleChange}
              required
              className="w-full h-11 px-3.5 bg-[#F9F9FB] border rounded-xl text-sm font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#38BDF8] transition-all"
              placeholder="e.g. Medstar Clinic / Room 402"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-1.5">
              Date <span className="text-rose-500">*</span>
            </label>
            <input
              type="date"
              name="date"
              value={formData.date || ""}
              onChange={handleChange}
              required
              className="w-full h-11 px-3.5 bg-[#F9F9FB] border rounded-xl text-sm font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#38BDF8] transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-1.5">
              Time <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              name="time"
              value={formData.time || ""}
              onChange={handleChange}
              required
              className="w-full h-11 px-3.5 bg-[#F9F9FB] border rounded-xl text-sm font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#38BDF8] transition-all"
              placeholder="e.g. 10:30"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-1.5">
              Appointment Status
            </label>
            <select
              name="status"
              value={formData.status || "upcoming"}
              onChange={handleChange}
              className="w-full h-11 px-3 bg-[#F9F9FB] border rounded-xl text-sm font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#38BDF8] transition-all cursor-pointer"
            >
              <option value="upcoming">Upcoming</option>
              <option value="booked">Booked</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-1.5">
              Notification Status
            </label>
            <select
              name="notified"
              value={formData.notified || "Sent"}
              onChange={handleChange}
              className="w-full h-11 px-3 bg-[#F9F9FB] border rounded-xl text-sm font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#38BDF8] transition-all cursor-pointer"
            >
              <option value="Sent">Sent</option>
              <option value="Pending">Pending</option>
              <option value="Not Sent">Not Sent</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-1.5">
            Additional Notes
          </label>
          <textarea
            name="additionalNotes"
            value={formData.additionalNotes || ""}
            onChange={handleChange}
            rows={3}
            className="w-full p-3.5 bg-[#F9F9FB] border rounded-xl text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#38BDF8] transition-all resize-none"
            placeholder="Any preparation instructions or clinical notes..."
          />
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
