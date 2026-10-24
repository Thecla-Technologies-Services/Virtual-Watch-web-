import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { ChevronDown } from "lucide-react";

const ADMIN_ROLES = ["Administrator", "Manager", "Analyst", "Viewer"];

interface CreateUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreated?: (user: { name: string; email: string; username: string; phone: string; role: string }) => void;
}

export function CreateUserModal({ isOpen, onClose, onCreated }: CreateUserModalProps) {
  const [name, setName]       = useState("");
  const [email, setEmail]     = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone]     = useState("");
  const [role, setRole]       = useState("");

  const handleSubmit = () => {
    onCreated?.({ name, email, username, phone, role });
    setName(""); setEmail(""); setUsername(""); setPhone(""); setRole("");
    onClose();
  };

  const inputClass = "w-full px-4 py-2.5 bg-white border border-slate-200 rounded-full text-[14px] focus:outline-none focus:ring-1 focus:ring-[#38BDF8] focus:border-[#38BDF8] transition-all placeholder:text-slate-400 text-slate-700";
  const labelClass = "block text-[13px] font-medium text-slate-700 mb-1.5";

  return (
    <Modal isOpen={isOpen} onClose={onClose} width="xl">
      <div className="pb-4 mb-5 border-b border-slate-100">
        <h3 className="text-base font-bold text-slate-800">Create new user</h3>
      </div>

      <div className="space-y-4">
        {/* Row 1: Full name + Email */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Full name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Email address</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter" className={inputClass} />
          </div>
        </div>

        {/* Row 2: Username + Phone */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Username</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Phone</label>
            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Enter" className={inputClass} />
          </div>
        </div>

        {/* Row 3: Admin role + Temp password */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Admin role</label>
            <div className="relative">
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full pl-4 pr-10 py-2.5 bg-white border border-slate-200 rounded-full text-[14px] appearance-none focus:outline-none focus:ring-1 focus:ring-[#38BDF8] focus:border-[#38BDF8] transition-all text-slate-700 cursor-pointer"
              >
                <option value="" disabled>Select</option>
                {ADMIN_ROLES.map((r) => <option key={r}>{r}</option>)}
              </select>
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                <ChevronDown size={16} className="text-slate-500" />
              </div>
            </div>
          </div>
          <div>
            <label className={labelClass}>Temporary password</label>
            <input
              type="text"
              readOnly
              placeholder="Auto-generated"
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-full text-[14px] text-slate-400 placeholder:text-slate-400 cursor-not-allowed focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-end gap-3 pt-5 mt-5 border-t border-slate-100">
        <button
          onClick={handleSubmit}
          className="px-6 py-2.5 bg-[#38BDF8] hover:bg-[#2BA5DF] text-white text-[14px] font-bold rounded-full transition-all cursor-pointer"
        >
          Create user
        </button>
        <button
          onClick={onClose}
          className="px-6 py-2.5 bg-[#FAFAFA] hover:bg-slate-100 border border-[#E7E7E7] text-[14px] font-bold text-slate-700 rounded-full transition-all cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
}
