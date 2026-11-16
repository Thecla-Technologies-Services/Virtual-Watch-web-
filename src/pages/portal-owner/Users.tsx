import { useMemo, useRef, useState } from "react";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Dropdown, DropdownItem } from "@/components/ui/Dropdown";
import {
  Search,
  Download,
  Upload,
  ChevronDown,
  MoreVertical,
  CheckCircle2,
} from "lucide-react";
import {
  INITIAL_PLATFORM_USERS,
  type PlatformUser,
} from "@/components/portal-owner/users/types";
import { EditUserModal } from "@/components/portal-owner/users/EditUserModal";
import { DisableAccountModal } from "@/components/portal-owner/users/DisableAccountModal";
import { ResetPasswordModal } from "@/components/portal-owner/users/ResetPasswordModal";

export default function PortalOwnerUsers() {
  const [users, setUsers] = useState<PlatformUser[]>(INITIAL_PLATFORM_USERS);
  const [searchQuery, setSearchQuery] = useState("");
  const [companyFilter, setCompanyFilter] = useState("All companies");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const pageSize = 11;

  // Modals
  const [editingUser, setEditingUser] = useState<PlatformUser | null>(null);
  const [disablingUser, setDisablingUser] = useState<PlatformUser | null>(null);
  const [resetUser, setResetUser] = useState<PlatformUser | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const uniqueCompanies = useMemo(() => {
    return Array.from(new Set(users.map((u) => u.company)));
  }, [users]);

  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const matchesCompany =
        companyFilter === "All companies" || u.company === companyFilter;
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.role.toLowerCase().includes(q) ||
        u.company.toLowerCase().includes(q);
      return matchesCompany && matchesSearch;
    });
  }, [users, companyFilter, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / pageSize));
  const safePage = Math.min(currentPage, totalPages);
  const paginatedUsers = filteredUsers.slice(
    (safePage - 1) * pageSize,
    safePage * pageSize
  );

  const startEntry =
    filteredUsers.length === 0 ? 0 : (safePage - 1) * pageSize + 1;
  const endEntry = Math.min(safePage * pageSize, filteredUsers.length);

  const allSelected =
    paginatedUsers.length > 0 &&
    paginatedUsers.every((u) => selectedIds.includes(u.id));

  const toggleAll = () => {
    if (allSelected) {
      setSelectedIds((prev) =>
        prev.filter((id) => !paginatedUsers.some((u) => u.id === id))
      );
    } else {
      const next = new Set(selectedIds);
      paginatedUsers.forEach((u) => next.add(u.id));
      setSelectedIds(Array.from(next));
    }
  };

  const toggleRow = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSaveUser = (updated: PlatformUser) => {
    setUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)));
    setEditingUser(null);
    showToast(`Updated ${updated.name}`);
  };

  const handleConfirmDisable = (userId: string) => {
    const target = users.find((u) => u.id === userId);
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, status: "Disabled" } : u))
    );
    setDisablingUser(null);
    if (target) {
      showToast(`Disabled account for ${target.name}`);
    }
  };

  const handleEnableAccount = (user: PlatformUser) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === user.id ? { ...u, status: "Active" } : u))
    );
    showToast(`Enabled account for ${user.name}`);
  };

  const handleExportCsv = () => {
    const headers = ["Name", "Email", "Role", "Company", "Status", "Last login"];
    const rows = filteredUsers.map((u) => [
      `"${u.name}"`,
      u.email,
      u.role,
      `"${u.company}"`,
      u.status,
      `"${u.lastLogin}"`,
    ]);
    const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "platform-users.csv";
    link.click();
    URL.revokeObjectURL(url);
    showToast("Exported platform-users.csv");
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      showToast(`Imported ${file.name}`);
      e.target.value = "";
    }
  };

  return (
    <div className="animate-fade-in duration-300 space-y-5 pb-8">
      <Breadcrumb
        pageTitle="PLATFORM USERS"
        subtext={`All users across ${uniqueCompanies.length} companies`}
        activePage="Platform Users"
      />

      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2.5 text-[12.5px] font-semibold text-white shadow-lg">
          <CheckCircle2 size={15} className="text-[#22C55E]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main White Card */}
      <div className="bg-white rounded-2xl p-6  border border-slate-100/80">
        {/* Toolbar */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-6">
          <div className="flex items-center gap-3 flex-wrap flex-1">
            {/* Search */}
            <div className="relative w-full sm:max-w-[230px]">
              <Search
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
              />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search by users..."
                className="w-full h-10 rounded-full bg-[#F8FAFC] border border-slate-100 pl-10 pr-4 text-[13px] text-slate-700 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-[#37AADF] focus:ring-2 focus:ring-[#37AADF]/15 transition-all"
              />
            </div>

            {/* Company Filter Dropdown */}
            <div className="relative">
              <select
                value={companyFilter}
                onChange={(e) => {
                  setCompanyFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="h-10 appearance-none rounded-full bg-[#F8FAFC] border border-slate-100 pl-4 pr-9 text-[13px] font-medium text-slate-600 focus:outline-none focus:border-[#37AADF] cursor-pointer"
              >
                <option value="All companies">All companies</option>
                {uniqueCompanies.map((comp) => (
                  <option key={comp} value={comp}>
                    {comp}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={14}
                className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv,.json"
              onChange={handleImportFile}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-2 rounded-full bg-[#F4F6F9] hover:bg-slate-200/70 px-4 py-2 text-[13px] font-semibold text-slate-700 transition-colors cursor-pointer"
            >
              <Download size={14} />
              <span>Import</span>
            </button>

            <button
              type="button"
              onClick={handleExportCsv}
              className="inline-flex items-center gap-2 rounded-full bg-[#F4F6F9] hover:bg-slate-200/70 px-4 py-2 text-[13px] font-semibold text-slate-700 transition-colors cursor-pointer"
            >
              <Upload size={14} />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Users Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-[13px] border-collapse">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="py-3.5 pr-4 w-10 text-left">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={toggleAll}
                    aria-label="Select all users"
                    className="h-4 w-4 rounded border-slate-200 accent-[#37AADF] cursor-pointer"
                  />
                </th>
                <th className="py-3.5 pr-4 text-left font-semibold text-slate-700">
                  Name
                </th>
                <th className="py-3.5 pr-4 text-left font-semibold text-slate-700">
                  Email
                </th>
                <th className="py-3.5 pr-4 text-left font-semibold text-slate-700">
                  Role
                </th>
                <th className="py-3.5 pr-4 text-left font-semibold text-slate-700">
                  Company
                </th>
                <th className="py-3.5 pr-4 text-left font-semibold text-slate-700">
                  Status
                </th>
                <th className="py-3.5 pr-4 text-left font-semibold text-slate-700">
                  Last login
                </th>
                <th className="py-3.5 w-12 text-right" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100/80">
              {paginatedUsers.length === 0 ? (
                <tr>
                  <td
                    colSpan={8}
                    className="py-10 text-center text-slate-400 font-medium"
                  >
                    No users found matching your filters.
                  </td>
                </tr>
              ) : (
                paginatedUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-slate-50/60 transition-colors"
                  >
                    <td className="py-3.5 pr-4">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(user.id)}
                        onChange={() => toggleRow(user.id)}
                        aria-label={`Select ${user.name}`}
                        className="h-4 w-4 rounded border-slate-200 accent-[#37AADF] cursor-pointer"
                      />
                    </td>
                    <td className="py-3.5 pr-4">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="h-7 w-7 rounded-full object-cover border border-slate-200 shrink-0"
                        />
                        <span className="font-medium text-slate-700">
                          {user.name}
                        </span>
                      </div>
                    </td>
                    <td className="py-3.5 pr-4 text-slate-600">{user.email}</td>
                    <td className="py-3.5 pr-4 text-slate-600">{user.role}</td>
                    <td className="py-3.5 pr-4 text-slate-600">
                      {user.company}
                    </td>
                    <td className="py-3.5 pr-4">
                      <div className="inline-flex items-center gap-2">
                        <span
                          className={`h-2 w-2 rounded-full ${
                            user.status === "Active"
                              ? "bg-[#22C55E]"
                              : "bg-slate-300"
                          }`}
                        />
                        <span className="text-slate-600 font-medium">
                          {user.status}
                        </span>
                      </div>
                    </td>
                    <td className="py-3.5 pr-4 text-slate-500">
                      {user.lastLogin}
                    </td>
                    <td className="py-3.5 text-right">
                      <Dropdown
                        align="right"
                        menuClassName="w-44 shadow-lg border border-slate-100"
                        trigger={
                          <button
                            type="button"
                            className="h-8 w-8 rounded-full bg-[#F4F6F9] hover:bg-slate-200/70 flex items-center justify-center text-slate-500 transition-colors cursor-pointer ml-auto"
                            aria-label={`Actions for ${user.name}`}
                          >
                            <MoreVertical size={15} />
                          </button>
                        }
                      >
                        <DropdownItem onClick={() => setEditingUser(user)}>
                          Edit user
                        </DropdownItem>
                        {user.status === "Active" ? (
                          <DropdownItem onClick={() => setDisablingUser(user)}>
                            Disable account
                          </DropdownItem>
                        ) : (
                          <DropdownItem
                            onClick={() => handleEnableAccount(user)}
                          >
                            Enable account
                          </DropdownItem>
                        )}
                        <DropdownItem onClick={() => setResetUser(user)}>
                          Reset password
                        </DropdownItem>
                      </Dropdown>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer / Pagination */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-5 mt-2 border-t border-slate-100/80 text-[12.5px]">
          <p className="font-semibold text-slate-600">
            Showing {startEntry} to {endEntry} of {filteredUsers.length} entries
          </p>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              disabled={safePage >= totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="px-3.5 py-1.5 rounded-lg bg-[#F4F6F9] text-slate-600 font-semibold text-[12px] hover:bg-slate-200/70 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              Next
            </button>

            {Array.from({ length: totalPages }, (_, idx) => idx + 1).map(
              (page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => setCurrentPage(page)}
                  className={`h-8 w-8 rounded-lg font-bold text-[12px] transition-colors cursor-pointer ${
                    page === safePage
                      ? "bg-[#37AADF] text-white"
                      : "bg-[#F4F6F9] text-slate-600 hover:bg-slate-200/70"
                  }`}
                >
                  {page}
                </button>
              )
            )}

            <button
              type="button"
              disabled={safePage <= 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="px-3.5 py-1.5 rounded-lg bg-[#F4F6F9] text-slate-600 font-semibold text-[12px] hover:bg-slate-200/70 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              Previous
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <EditUserModal
        isOpen={Boolean(editingUser)}
        onClose={() => setEditingUser(null)}
        user={editingUser}
        onSave={handleSaveUser}
      />

      <DisableAccountModal
        isOpen={Boolean(disablingUser)}
        onClose={() => setDisablingUser(null)}
        user={disablingUser}
        onConfirm={handleConfirmDisable}
      />

      <ResetPasswordModal
        isOpen={Boolean(resetUser)}
        onClose={() => setResetUser(null)}
        user={resetUser}
      />
    </div>
  );
}

