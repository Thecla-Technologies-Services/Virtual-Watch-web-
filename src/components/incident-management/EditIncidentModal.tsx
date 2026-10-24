import React, { useState, useEffect } from "react";
import { Modal } from "@/components/ui/Modal";
import type { CareIncident } from "@/constants/incidents";

interface EditIncidentModalProps {
  isOpen: boolean;
  onClose: () => void;
  incident: CareIncident | null;
  onSave: (updatedIncident: CareIncident) => void;
}

export function EditIncidentModal({
  isOpen,
  onClose,
  incident,
  onSave,
}: EditIncidentModalProps) {
  const [formData, setFormData] = useState<Partial<CareIncident>>({});

  useEffect(() => {
    if (incident) {
      setFormData({ ...incident });
    }
  }, [incident, isOpen]);

  if (!incident) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title && formData.serviceUser) {
      onSave(formData as CareIncident);
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Incident Report"
      width="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4 pt-2">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-1.5">
            Incident Title <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            name="title"
            value={formData.title || ""}
            onChange={handleChange}
            required
            className="w-full h-11 px-3.5 bg-[#F9F9FB] border rounded-xl text-sm font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#38BDF8] transition-all"
            placeholder="e.g. Fall incident - Service user"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              placeholder="e.g. John Smith"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-1.5">
              Reported By
            </label>
            <input
              type="text"
              name="reportedBy"
              value={formData.reportedBy || ""}
              onChange={handleChange}
              className="w-full h-11 px-3.5 bg-[#F9F9FB] border rounded-xl text-sm font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#38BDF8] transition-all"
              placeholder="e.g. Sarah Jones"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-1.5">
              Severity
            </label>
            <select
              name="severity"
              value={formData.severity || "Medium"}
              onChange={handleChange}
              className="w-full h-11 px-3 bg-[#F9F9FB] border rounded-xl text-sm font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#38BDF8] transition-all cursor-pointer"
            >
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-1.5">
              Status
            </label>
            <select
              name="status"
              value={formData.status || "Pending"}
              onChange={handleChange}
              className="w-full h-11 px-3 bg-[#F9F9FB] border rounded-xl text-sm font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#38BDF8] transition-all cursor-pointer"
            >
              <option value="Approved">Approved</option>
              <option value="Pending">Pending</option>
              <option value="Submitted">Submitted</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-1.5">
              Location / Area
            </label>
            <input
              type="text"
              name="location"
              value={formData.location || ""}
              onChange={handleChange}
              className="w-full h-11 px-3.5 bg-[#F9F9FB] border rounded-xl text-sm font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#38BDF8] transition-all"
              placeholder="e.g. Bedroom, Bathroom, Lounge"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-1.5">
              Date
            </label>
            <input
              type="text"
              name="date"
              value={formData.date || ""}
              onChange={handleChange}
              className="w-full h-11 px-3.5 bg-[#F9F9FB] border rounded-xl text-sm font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#38BDF8] transition-all"
              placeholder="e.g. Apr 24, 2024"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-1.5">
              Time
            </label>
            <input
              type="text"
              name="time"
              value={formData.time || ""}
              onChange={handleChange}
              className="w-full h-11 px-3.5 bg-[#F9F9FB] border rounded-xl text-sm font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#38BDF8] transition-all"
              placeholder="e.g. 14:30"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-1.5">
            Description & Action Taken
          </label>
          <textarea
            name="description"
            value={formData.description || ""}
            onChange={handleChange}
            rows={3}
            className="w-full p-3.5 bg-[#F9F9FB] border rounded-xl text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#38BDF8] transition-all resize-none"
            placeholder="Detailed overview of the incident, observations, and immediate interventions taken..."
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
