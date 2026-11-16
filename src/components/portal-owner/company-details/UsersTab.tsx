import { useMemo, useState } from "react";
import { Check, MoreVertical, Plus, Search } from "lucide-react";
import { Dropdown, DropdownItem } from "@/components/ui/Dropdown";
import { Modal } from "@/components/ui/Modal";
import { INITIAL_PLATFORM_USERS, type PlatformUser } from "../users/types";
import { EditUserModal } from "../users/EditUserModal";
import { DisableAccountModal } from "../users/DisableAccountModal";
import { ResetPasswordModal } from "../users/ResetPasswordModal";

interface UsersTabProps {
  companyName: string;
  onViewActivity: () => void;
}

const PAGE_SIZE = 10;

export function UsersTab({ companyName, onViewActivity }: UsersTabProps) {
  const [users, setUsers] = useState<PlatformUser[]>(() =>
    INITIAL_PLATFORM_USERS.map((u) => ({ ...u, company: companyName }))
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newRole, setNewRole] = useState<PlatformUser["role"]>("Administrator");

  const [editingUser, setEditingUser] = useState<PlatformUser | null>(null);
  const [disablingUser, setDisablingUser] = useState<PlatformUser | null>(null);
  const [resetUser, setResetUser] = useState<PlatformUser | null>(null);

  const filteredUsers = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return users;
    return users.filter((u) =>
      `${u.name} ${u.email} ${u.role} ${u.username}`.toLowerCase().includes(q)
    );
  }, [users, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const paginatedUsers = useMemo(() => {
    const start = (safePage - 1) * PAGE_SIZE;
    return filteredUsers.slice(start, start + PAGE_SIZE);
  }, [filteredUsers, safePage]);

  const allVisibleSelected =
    paginatedUsers.length > 0 &&
    paginatedUsers.every((u) => selectedIds.includes(u.id));

  const toggleSelectAll = () => {
    if (allVisibleSelected) {
      const visible = new Set(paginatedUsers.map((u) => u.id));
      setSelectedIds((prev) => prev.filter((id) => !visible.has(id)));
    } else {
      setSelectedIds(
        Array.from(new Set([...selectedIds, ...paginatedUsers.map((u) => u.id)]))
      );
    }
  };

  const toggleSelectOne = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSendInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail.trim()) return;
    setUsers((prev) => [
      {
        id: `usr-${Date.now()}`,
        name: inviteEmail.split("@")[0],
        email: inviteEmail.trim(),
        role: "Viewer",
        username: inviteEmail.split("@")[0].toLowerCase(),
        company: companyName,
        phone: "",
        avatar: "",
        status: "Active",
        lastLogin: "Invited just now",
      },
      ...prev,
    ]);
    setInviteEmail("");
    setIsInviteOpen(false);
  };

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newEmail.trim()) return;
    setUsers((prev) => [
      {
        id: `usr-${Date.now()}`,
        name: newName.trim(),
        email: newEmail.trim(),
        role: newRole,
        username: newEmail.split("@")[0].toLowerCase(),
        company: companyName,
        phone: "",
        avatar: "",
        status: "Active",
        lastLogin: "Just now",
      },
      ...prev,
    ]);
    setNewName("");
    setNewEmail("");
    setNewRole("Administrator");
    setIsAddUserOpen(false);
  };

  const startEntry = filteredUsers.length === 0 ? 0 : (safePage - 1) * PAGE_SIZE + 1;
  const endEntry = Math.min(safePage * PAGE_SIZE, filteredUsers.length);

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-100/80 ">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
        <div className="relative flex-1 max-w-xs">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search..."
            className="w-full h-10 pl-10 pr-4 rounded-full bg-[#F4F6F9] text-[13px] text-[#2E3A59] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#37AADF]/30"
          />
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsInviteOpen(true)}
            className="h-10 px-4 rounded-full bg-[#F4F6F9] hover:bg-slate-200/70 text-[#2E3A59] text-[13px] font-medium transition-colors cursor-pointer"
          >
            Invite user
          </button>

          <button
            type="button"
            onClick={() => setIsAddUserOpen(true)}
            className="h-10 px-4 rounded-full bg-[#37AADF] hover:bg-[#2F99CA] text-white text-[13px] font-medium inline-flex items-center gap-2 transition-colors cursor-pointer"
          >
            <span className="w-4 h-4 rounded-full bg-white/25 flex items-center justify-center">
              <Plus className="w-3 h-3 text-white" />
            </span>
            <span>Add user</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100 text-[12px] font-semibold text-[#2E3A59]">
              <th className="py-3.5 pl-3 pr-2 w-10">
                <button
                  type="button"
                  onClick={toggleSelectAll}
                  aria-label="Select all users"
                  className={`w-4 h-4 rounded flex items-center justify-center border transition-colors ${
                    allVisibleSelected
                      ? "bg-[#37AADF] border-[#37AADF] text-white"
                      : "border-slate-300 bg-white"
                  }`}
                >
                  {allVisibleSelected && <Check className="w-3 h-3" />}
                </button>
              </th>
              <th className="py-3.5 px-3">Name</th>
              <th className="py-3.5 px-3">Email</th>
              <th className="py-3.5 px-3">Role</th>
              <th className="py-3.5 px-3">Username</th>
              <th className="py-3.5 px-3">Status</th>
              <th className="py-3.5 px-3">Last login</th>
              <th className="py-3.5 pl-2 pr-3 w-12 text-right"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-[13px] text-[#2E3A59]">
            {paginatedUsers.map((user) => {
              const isSelected = selectedIds.includes(user.id);
              return (
                <tr key={user.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 pl-3 pr-2">
                    <button
                      type="button"
                      onClick={() => toggleSelectOne(user.id)}
                      aria-label={`Select ${user.name}`}
                      className={`w-4 h-4 rounded flex items-center justify-center border transition-colors ${
                        isSelected
                          ? "bg-[#37AADF] border-[#37AADF] text-white"
                          : "border-slate-300 bg-white"
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3" />}
                    </button>
                  </td>
                  <td className="py-3.5 px-3 whitespace-nowrap">
                    <div className="flex items-center gap-2.5">
                      <span className="w-7 h-7 rounded-full bg-gradient-to-br from-[#37AADF] to-[#16A34A] text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                        {user.name
                          .split(" ")
                          .map((p) => p[0])
                          .join("")
                          .slice(0, 2)
                          .toUpperCase()}
                      </span>
                      <span className="font-medium">{user.name}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-3 text-slate-600 whitespace-nowrap">
                    {user.email}
                  </td>
                  <td className="py-3.5 px-3 text-slate-600 whitespace-nowrap">
                    {user.role}
                  </td>
                  <td className="py-3.5 px-3 text-slate-600 whitespace-nowrap">
                    {user.username}
                  </td>
                  <td className="py-3.5 px-3 whitespace-nowrap">
                    <span className="inline-flex items-center gap-2 text-slate-600">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          user.status === "Active"
                            ? "bg-[#22C55E]"
                            : "bg-slate-400"
                        }`}
                      />
                      {user.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-slate-600 whitespace-nowrap">
                    {user.lastLogin}
                  </td>
                  <td className="py-3.5 pl-2 pr-3 text-right">
                    <Dropdown
                      align="right"
                      trigger={
                        <span className="w-8 h-8 rounded-full bg-[#F4F6F9] hover:bg-slate-200/70 inline-flex items-center justify-center text-slate-500 transition-colors">
                          <MoreVertical className="w-4 h-4" />
                        </span>
                      }
                    >
                      <DropdownItem onClick={() => setEditingUser(user)}>
                        Edit user
                      </DropdownItem>
                      <DropdownItem onClick={onViewActivity}>
                        View activity
                      </DropdownItem>
                      <DropdownItem onClick={() => setDisablingUser(user)}>
                        Disable account
                      </DropdownItem>
                      <DropdownItem onClick={() => setResetUser(user)}>
                        Reset password
                      </DropdownItem>
                    </Dropdown>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-5 mt-2 border-t border-slate-100 text-[13px]">
        <p className="text-[#2E3A59] font-medium">
          Showing {startEntry} to {endEntry} of {filteredUsers.length} entries
        </p>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={safePage >= totalPages}
            className="px-3.5 py-1.5 rounded-lg bg-[#F4F6F9] text-slate-500 hover:text-[#2E3A59] disabled:opacity-50 text-[12px] font-medium"
          >
            Next
          </button>
          {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setCurrentPage(p)}
              className={`w-8 h-8 rounded-lg text-[12px] font-semibold ${
                p === safePage
                  ? "bg-[#37AADF] text-white"
                  : "bg-[#F4F6F9] text-slate-600"
              }`}
            >
              {p}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={safePage <= 1}
            className="px-3.5 py-1.5 rounded-lg bg-[#F4F6F9] text-slate-500 hover:text-[#2E3A59] disabled:opacity-50 text-[12px] font-medium"
          >
            Previous
          </button>
        </div>
      </div>

      {/* Invite User Modal */}
      <Modal
        isOpen={isInviteOpen}
        onClose={() => setIsInviteOpen(false)}
        title="Invite user"
        width="max-w-[500px]"
      >
        <form onSubmit={handleSendInvite} className="space-y-4">
          <p className="text-[13px] text-slate-600">
            Worker receives invitation email to self-register
          </p>

          <div>
            <label className="block text-[13px] font-medium text-[#2E3A59] mb-1.5">
              Email address
            </label>
            <input
              type="email"
              required
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              placeholder="e.g admin@mira.co"
              className="w-full h-11 px-4 rounded-xl border border-slate-200 text-[13px] text-[#2E3A59] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#37AADF]/30 focus:border-[#37AADF]"
            />
          </div>

          <p className="text-[12px] text-slate-500">
            An invitation email will be sent. The worker completes their own
            profile.
          </p>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="submit"
              className="h-10 px-6 rounded-full bg-[#37AADF] hover:bg-[#2F99CA] text-white text-[13px] font-medium transition-colors cursor-pointer"
            >
              Send invitation
            </button>
            <button
              type="button"
              onClick={() => setIsInviteOpen(false)}
              className="h-10 px-6 rounded-full bg-[#F4F6F9] hover:bg-slate-200/70 text-[#2E3A59] text-[13px] font-medium transition-colors cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>

      {/* Add User Modal */}
      <Modal
        isOpen={isAddUserOpen}
        onClose={() => setIsAddUserOpen(false)}
        title="Add user"
        width="max-w-[500px]"
      >
        <form onSubmit={handleAddUser} className="space-y-4">
          <div>
            <label className="block text-[13px] font-medium text-[#2E3A59] mb-1.5">
              Full name
            </label>
            <input
              type="text"
              required
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="e.g Alice Johnson"
              className="w-full h-11 px-4 rounded-xl border border-slate-200 text-[13px] text-[#2E3A59]"
            />
          </div>
          <div>
            <label className="block text-[13px] font-medium text-[#2E3A59] mb-1.5">
              Email address
            </label>
            <input
              type="email"
              required
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              placeholder="e.g alice@example.com"
              className="w-full h-11 px-4 rounded-xl border border-slate-200 text-[13px] text-[#2E3A59]"
            />
          </div>
          <div>
            <label className="block text-[13px] font-medium text-[#2E3A59] mb-1.5">
              Role
            </label>
            <select
              value={newRole}
              onChange={(e) => setNewRole(e.target.value as PlatformUser["role"])}
              className="w-full h-11 px-4 rounded-xl border border-slate-200 text-[13px] text-[#2E3A59] bg-white"
            >
              <option value="Administrator">Administrator</option>
              <option value="Manager">Manager</option>
              <option value="Analyst">Analyst</option>
              <option value="Viewer">Viewer</option>
            </select>
          </div>
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="submit"
              className="h-10 px-6 rounded-full bg-[#37AADF] hover:bg-[#2F99CA] text-white text-[13px] font-medium cursor-pointer"
            >
              Add user
            </button>
            <button
              type="button"
              onClick={() => setIsAddUserOpen(false)}
              className="h-10 px-6 rounded-full bg-[#F4F6F9] text-[#2E3A59] text-[13px] font-medium cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>

      <EditUserModal
        isOpen={Boolean(editingUser)}
        onClose={() => setEditingUser(null)}
        user={editingUser}
        onSave={(updated) => {
          setUsers((prev) =>
            prev.map((u) => (u.id === updated.id ? updated : u))
          );
        }}
      />

      <DisableAccountModal
        isOpen={Boolean(disablingUser)}
        onClose={() => setDisablingUser(null)}
        user={disablingUser}
        onConfirm={(id) => {
          setUsers((prev) =>
            prev.map((u) => (u.id === id ? { ...u, status: "Disabled" } : u))
          );
        }}
      />

      <ResetPasswordModal
        isOpen={Boolean(resetUser)}
        onClose={() => setResetUser(null)}
        user={resetUser}
      />
    </div>
  );
}
