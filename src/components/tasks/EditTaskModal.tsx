import React, { useState, useEffect } from "react";
import { Modal } from "@/components/ui/Modal";
import type { TaskItem } from "@/constants/tasks";

interface EditTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: TaskItem | null;
  onSave: (updatedTask: TaskItem) => void;
}

export function EditTaskModal({
  isOpen,
  onClose,
  task,
  onSave,
}: EditTaskModalProps) {
  const [formData, setFormData] = useState<Partial<TaskItem>>({});

  useEffect(() => {
    if (task) {
      setFormData({ ...task });
    }
  }, [task, isOpen]);

  if (!task) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title && formData.serviceUser) {
      onSave(formData as TaskItem);
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Assigned Task"
      width="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4 pt-2">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-1.5">
            Task Title <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            name="title"
            value={formData.title || ""}
            onChange={handleChange}
            required
            className="w-full h-11 px-3.5 bg-[#F9F9FB] border rounded-xl text-sm font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#38BDF8] transition-all"
            placeholder="e.g. Administer Morning Medication"
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
              placeholder="e.g. Margaret Evans"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-1.5">
              Task Category
            </label>
            <input
              type="text"
              name="type"
              value={formData.type || ""}
              onChange={handleChange}
              className="w-full h-11 px-3.5 bg-[#F9F9FB] border rounded-xl text-sm font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#38BDF8] transition-all"
              placeholder="e.g. Clinical, Personal Care, Medication"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-1.5">
              Priority
            </label>
            <select
              name="priority"
              value={formData.priority || "Medium"}
              onChange={handleChange}
              className="w-full h-11 px-3 bg-[#F9F9FB] border rounded-xl text-sm font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#38BDF8] transition-all cursor-pointer"
            >
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
              <option value="Draft">Draft</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-1.5">
              Estimated Time
            </label>
            <input
              type="text"
              name="estimatedTime"
              value={formData.estimatedTime || ""}
              onChange={handleChange}
              className="w-full h-11 px-3.5 bg-[#F9F9FB] border rounded-xl text-sm font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#38BDF8] transition-all"
              placeholder="e.g. 45m"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-1.5">
            Due Date / Schedule
          </label>
          <input
            type="text"
            name="dueDate"
            value={formData.dueDate || ""}
            onChange={handleChange}
            className="w-full h-11 px-3.5 bg-[#F9F9FB] border rounded-xl text-sm font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#38BDF8] transition-all"
            placeholder="e.g. Today, 09:00 AM"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-1.5">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description || ""}
            onChange={handleChange}
            rows={3}
            className="w-full p-3.5 bg-[#F9F9FB] border rounded-xl text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#38BDF8] transition-all resize-none"
            placeholder="Provide task details and instructions for assigned carers..."
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
