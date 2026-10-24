import { useState } from "react";
import { Modal } from "@/components/ui/Modal";

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: {
    name: string;
    age: number;
    address: string;
    primaryCarer: string;
    riskLevel: "High" | "Medium" | "Low";
  }) => void;
}

export function AddUserModal({ isOpen, onClose, onSubmit }: AddUserModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    age: 78,
    address: "",
    primaryCarer: "",
    riskLevel: "Low" as "High" | "Medium" | "Low",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    // Reset form values
    setFormData({
      name: "",
      age: 78,
      address: "",
      primaryCarer: "",
      riskLevel: "Low",
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add New Service User"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Full Name</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g. Margaret Johnson"
            className="w-full h-10 px-3.5 rounded-xl border border-slate-200 bg-transparent text-xs text-slate-800 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Age</label>
            <input
              type="number"
              required
              min={1}
              max={120}
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) || 0 })}
              className="w-full h-10 px-3.5 rounded-xl border border-slate-200 bg-transparent text-xs text-slate-800 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Risk Level</label>
            <select
              value={formData.riskLevel}
              onChange={(e) => setFormData({ ...formData, riskLevel: e.target.value as "High" | "Medium" | "Low" })}
              className="w-full h-10 px-3.5 rounded-xl border border-slate-200 bg-white text-xs text-slate-800 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer"
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Address</label>
          <input
            type="text"
            required
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            placeholder="e.g. 123 Care Lane, London"
            className="w-full h-10 px-3.5 rounded-xl border border-slate-200 bg-transparent text-xs text-slate-800 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Primary Carer</label>
          <input
            type="text"
            required
            value={formData.primaryCarer}
            onChange={(e) => setFormData({ ...formData, primaryCarer: e.target.value })}
            placeholder="e.g. Alice Johnson"
            className="w-full h-10 px-3.5 rounded-xl border border-slate-200 bg-transparent text-xs text-slate-800 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>

        <div className="flex justify-end gap-3 pt-3 border-t border-slate-50">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-bold transition-all cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5.5 py-2.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary/95 transition-all cursor-pointer"
          >
            Create User
          </button>
        </div>
      </form>
    </Modal>
  );
}
