import { useEffect, useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { ChevronDown } from "lucide-react";
import type { PlatformUser, PlatformUserRole } from "./types";

interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: PlatformUser | null;
  onSave: (updated: PlatformUser) => void;
}

export function EditUserModal({
  isOpen,
  onClose,
  user,
  onSave,
}: EditUserModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState<PlatformUserRole>("Administrator");
  const [company, setCompany] = useState("");

  useEffect(() => {
    if (isOpen && user) {
      setName(user.name);
      setEmail(user.email);
      setUsername(user.username);
      setPhone(user.phone);
      setRole(user.role);
      setCompany(user.company);
    }
  }, [isOpen, user]);

  if (!user) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...user,
      name,
      email,
      username,
      phone,
      role,
      company,
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} width="lg" height="2xl">
      <div className="px-2 pb-1">
        {/* Header */}
        <div className="pb-3 border-b border-slate-100">
          <h2 className="text-[15px] font-bold text-slate-800">Edit user</h2>
        </div>

        <form onSubmit={handleSubmit} className="pt-4 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-medium text-slate-600 mb-1.5">
                Full name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-10 rounded-full border border-slate-200 px-4 text-[13px] text-slate-700 focus:outline-none focus:border-[#37AADF] focus:ring-2 focus:ring-[#37AADF]/15"
              />
            </div>

            <div>
              <label className="block text-[12px] font-medium text-slate-600 mb-1.5">
                Email address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-10 rounded-full border border-slate-200 px-4 text-[13px] text-slate-700 focus:outline-none focus:border-[#37AADF] focus:ring-2 focus:ring-[#37AADF]/15"
              />
            </div>

            <div>
              <label className="block text-[12px] font-medium text-slate-600 mb-1.5">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full h-10 rounded-full border border-slate-200 px-4 text-[13px] text-slate-700 focus:outline-none focus:border-[#37AADF] focus:ring-2 focus:ring-[#37AADF]/15"
              />
            </div>

            <div>
              <label className="block text-[12px] font-medium text-slate-600 mb-1.5">
                Phone
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full h-10 rounded-full border border-slate-200 px-4 text-[13px] text-slate-700 focus:outline-none focus:border-[#37AADF] focus:ring-2 focus:ring-[#37AADF]/15"
              />
            </div>

            <div>
              <label className="block text-[12px] font-medium text-slate-600 mb-1.5">
                Admin role
              </label>
              <div className="relative">
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as PlatformUserRole)}
                  className="w-full h-10 appearance-none rounded-full border border-slate-200 bg-white px-4 pr-9 text-[13px] text-slate-700 focus:outline-none focus:border-[#37AADF] focus:ring-2 focus:ring-[#37AADF]/15 cursor-pointer"
                >
                  <option value="Administrator">Administrator</option>
                  <option value="Manager">Manager</option>
                  <option value="Analyst">Analyst</option>
                  <option value="Viewer">Viewer</option>
                </select>
                <ChevronDown
                  size={15}
                  className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-[12px] font-medium text-slate-600 mb-1.5">
                Company
              </label>
              <input
                type="text"
                required
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full h-10 rounded-full border border-slate-200 px-4 text-[13px] text-slate-700 focus:outline-none focus:border-[#37AADF] focus:ring-2 focus:ring-[#37AADF]/15"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 pt-4">
            <button
              type="submit"
              className="rounded-full bg-[#37AADF] hover:bg-[#2F99CA] text-white px-6 py-2.5 text-[13px] font-semibold transition-colors cursor-pointer"
            >
              Save changes
            </button>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full bg-[#F4F6F9] hover:bg-slate-200/70 text-slate-700 px-6 py-2.5 text-[13px] font-semibold transition-colors cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

