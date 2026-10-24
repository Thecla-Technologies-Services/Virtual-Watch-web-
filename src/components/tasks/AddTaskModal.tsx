import React, { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Calendar, ChevronDown, X } from "lucide-react";

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (task: any) => void;
  onSaveDraft?: (task: any) => void;
}

export function AddTaskModal({
  isOpen,
  onClose,
  onSave,
  onSaveDraft,
}: AddTaskModalProps) {
  const [assignedUsers, setAssignedUsers] = useState<string[]>([
    "Alice Johnson",
    "Bob Smith",
    "Carol Davis",
  ]);
  const [newAssignee, setNewAssignee] = useState("");

  const removeUser = (user: string) => {
    setAssignedUsers(assignedUsers.filter((u) => u !== user));
  };

  const handleAddUser = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && newAssignee.trim()) {
      e.preventDefault();
      if (!assignedUsers.includes(newAssignee.trim())) {
        setAssignedUsers([...assignedUsers, newAssignee.trim()]);
      }
      setNewAssignee("");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} width="2xl">
      <div className="flex items-center justify-between border-b pb-3 mb-5">
        <h3 className="text-base font-bold">Add new</h3>
      </div>

      <div className="space-y-5 max-h-[72vh] overflow-y-auto pr-1 no-scrollbar ">
        {/* Title */}
        <div>
          <label className="block text-[13px] font-medium mb-1.5">Title</label>
          <input
            type="text"
            placeholder="e.g Morning care for Mr. Smith"
            className="w-full px-4 py-3 bg-white border rounded-2xl text-[14px] focus:outline-none focus:ring-1 focus:ring-[#38BDF8] focus:border-[#38BDF8] transition-all placeholder:text-muted"
          />
        </div>

        {/* Service user */}
        <div>
          <label className="block text-[13px] font-medium mb-1.5">
            Service user
          </label>
          <input
            type="text"
            placeholder="e.g John Smith"
            className="w-full px-4 py-3 bg-white border rounded-2xl text-[14px] focus:outline-none focus:ring-1 focus:ring-[#38BDF8] focus:border-[#38BDF8] transition-all placeholder:text-muted"
          />
        </div>

        {/* Due date & Type row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-[13px] font-medium mb-1.5">
              Due date
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="e.g 2/13/2024"
                className="w-full pl-4 pr-10 py-3 bg-white border rounded-2xl text-[14px] focus:outline-none focus:ring-1 focus:ring-[#38BDF8] focus:border-[#38BDF8] transition-all placeholder:text-muted"
              />
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                <Calendar size={18} className="text-[#38BDF8]" />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-[13px] font-medium mb-1.5">Type</label>
            <div className="relative">
              <select
                className="w-full pl-4 pr-10 py-3 bg-white border rounded-2xl text-[14px] appearance-none focus:outline-none focus:ring-1 focus:ring-[#38BDF8] focus:border-[#38BDF8] transition-all cursor-pointer "
                defaultValue="Care task"
              >
                <option value="Care task">Care task</option>
                <option value="Medical">Medical</option>
                <option value="Check-in">Check-in</option>
                <option value="Admin">Admin</option>
                <option value="Emergency">Emergency</option>
              </select>
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                <ChevronDown size={18} className="" />
              </div>
            </div>
          </div>
        </div>

        {/* Status & Priority row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-[13px] font-medium mb-1.5">
              Status
            </label>
            <div className="relative">
              <select
                className="w-full pl-4 pr-10 py-3 bg-white border rounded-2xl text-[14px] appearance-none focus:outline-none focus:ring-1 focus:ring-[#38BDF8] focus:border-[#38BDF8] transition-all cursor-pointer "
                defaultValue="Approved"
              >
                <option value="Approved">Approved</option>
                <option value="Pending">Pending</option>
                <option value="Draft">Draft</option>
              </select>
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                <ChevronDown size={18} className="" />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-[13px] font-medium mb-1.5">
              Priority
            </label>
            <div className="relative">
              <select
                className="w-full pl-4 pr-10 py-3 bg-white border rounded-2xl text-[14px] appearance-none focus:outline-none focus:ring-1 focus:ring-[#38BDF8] focus:border-[#38BDF8] transition-all cursor-pointer "
                defaultValue="High"
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                <ChevronDown size={18} className="" />
              </div>
            </div>
          </div>
        </div>

        {/* Assigned to with chips */}
        <div>
          <label className="block text-[13px] font-medium mb-1.5">
            Assigned to
          </label>
          <input
            type="text"
            value={newAssignee}
            onChange={(e) => setNewAssignee(e.target.value)}
            onKeyDown={handleAddUser}
            placeholder="e.g Alice Johnson (press Enter to add)"
            className="w-full px-4 py-3 bg-white border rounded-2xl text-[14px] focus:outline-none focus:ring-1 focus:ring-[#38BDF8] focus:border-[#38BDF8] transition-all placeholder:text-muted mb-3"
          />

          <div className="flex flex-wrap gap-2.5">
            {assignedUsers.map((user) => (
              <span
                key={user}
                className="inline-flex items-center gap-2 px-2 bg-[#f9f9f9] rounded-full text-[13px] font-medium select-none"
              >
                <span>{user}</span>
                <button
                  type="button"
                  onClick={() => removeUser(user)}
                  className="text-muted hover: transition-colors cursor-pointer"
                >
                  <X size={13} strokeWidth={2.5} />
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-[13px] font-medium mb-1.5">
            Description
          </label>
          <textarea
            rows={4}
            placeholder="e.g Morning care for Mr. Smith"
            className="w-full px-4 py-3 bg-white border rounded-2xl text-[14px] focus:outline-none focus:ring-1 focus:ring-[#38BDF8] focus:border-[#38BDF8] transition-all placeholder:text-muted resize-none"
          ></textarea>
        </div>

        {/* Action Footer */}
        <div className="flex items-center justify-center sm:justify-end gap-3 pt-5 border-t mt-8 flex-wrap">
          <button
            type="button"
            onClick={() => {
              if (onSave) onSave({});
              onClose();
            }}
            className="px-7 py-2.5 bg-[#38BDF8] hover:bg-[#2BA5DF] text-white text-[14px] font-bold rounded-full transition-all cursor-pointer"
          >
            Create task
          </button>
          <button
            type="button"
            onClick={() => {
              if (onSaveDraft) onSaveDraft({});
              onClose();
            }}
            className="px-7 py-2.5 bg-[#FBFBFB] hover:bg-slate-100 border text-[14px] font-bold text-slate-800 rounded-full transition-all cursor-pointer"
          >
            Save as draft
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 text-[14px] font-bold text-slate-800 hover:text-slate-600 rounded-full transition-all cursor-pointer bg-transparent"
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
}
