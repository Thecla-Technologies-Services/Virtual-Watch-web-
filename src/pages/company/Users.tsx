import { useState, useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { DataTable } from "@/components/ui/DataTable";
import { Dropdown, DropdownItem, DropdownSeparator } from "@/components/ui/Dropdown";
import { CreateUserModal } from "@/components/company-users/CreateUserModal";
import { EditUserModal, type CompanyUser } from "@/components/company-users/EditUserModal";
import { DisableUserModal } from "@/components/company-users/DisableUserModal";
import { EnableUserModal } from "@/components/company-users/EnableUserModal";
import { ResetPasswordModal } from "@/components/company-users/ResetPasswordModal";
import { UserActivityModal } from "@/components/company-users/UserActivityModal";
import {
  Search,
  MoreVertical,
  Edit,
  Activity,
  UserX,
  UserCheck,
  KeyRound,
  Upload,
  Plus,
  FileText,
} from "lucide-react";

/* ── Mock data ─────────────────────────────────────── */
const MOCK_USERS: CompanyUser[] = [
  { id: "1",  name: "Alice Johnson",  email: "alice@example.com",  username: "@schen",     phone: "+27 82 000 0000", role: "Administrator", status: "Active",   lastLogin: "2 hours ago" },
  { id: "2",  name: "Bob Smith",      email: "bob@example.com",    username: "@dpark",     phone: "+27 83 000 0000", role: "Manager",       status: "Active",   lastLogin: "1 day ago" },
  { id: "3",  name: "Carol Davis",    email: "carol@example.com",  username: "@falrashid", phone: "+27 84 000 0000", role: "Analyst",       status: "Disabled", lastLogin: "1 day ago" },
  { id: "4",  name: "David Wilson",   email: "david@example.com",  username: "@chughes",   phone: "+27 85 000 0000", role: "Viewer",        status: "Active",   lastLogin: "3 days ago" },
  { id: "5",  name: "Eve Martinez",   email: "eve@example.com",    username: "@ynakamura", phone: "+27 86 000 0000", role: "Analyst",       status: "Active",   lastLogin: "2 months ago" },
  { id: "6",  name: "Frank Lee",      email: "frank@example.com",  username: "@rsilva",    phone: "+27 87 000 0000", role: "Manager",       status: "Active",   lastLogin: "2 months ago" },
  { id: "7",  name: "Grace Kim",      email: "grace@example.com",  username: "@schen",     phone: "+27 88 000 0000", role: "Administrator", status: "Active",   lastLogin: "6 hours ago" },
  { id: "8",  name: "Hank Torres",    email: "hank@example.com",   username: "@dpark",     phone: "+27 89 000 0000", role: "Administrator", status: "Active",   lastLogin: "4 hours ago" },
  { id: "9",  name: "Iris Nguyen",    email: "iris@example.com",   username: "@chughes",   phone: "+27 90 000 0000", role: "Administrator", status: "Active",   lastLogin: "1 day ago" },
  { id: "10", name: "Jack Brown",     email: "jack@example.com",   username: "@ynakamura", phone: "+27 91 000 0000", role: "Viewer",        status: "Active",   lastLogin: "5 minutes ago" },
  { id: "11", name: "Karen White",    email: "karen@example.com",  username: "@rsilva",    phone: "+27 92 000 0000", role: "Manager",       status: "Active",   lastLogin: "30 minutes ago" },
];

type Tab = "All" | "Active" | "Disabled";

const AVATAR_COLORS = [
  "bg-green-500", "bg-blue-400", "bg-purple-500", "bg-amber-400",
  "bg-rose-400", "bg-teal-500", "bg-indigo-400", "bg-orange-400",
];

function getAvatarColor(id: string) {
  const idx = parseInt(id, 10) % AVATAR_COLORS.length;
  return AVATAR_COLORS[idx];
}

/* ── Page ──────────────────────────────────────────── */
export default function Users() {
  const [users, setUsers] = useState<CompanyUser[]>(MOCK_USERS);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<Tab>("All");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // Modal states
  const [isCreateOpen, setIsCreateOpen]     = useState(false);
  const [isEditOpen, setIsEditOpen]         = useState(false);
  const [isDisableOpen, setIsDisableOpen]   = useState(false);
  const [isEnableOpen, setIsEnableOpen]     = useState(false);
  const [isResetOpen, setIsResetOpen]       = useState(false);
  const [isActivityOpen, setIsActivityOpen] = useState(false);
  const [selectedUser, setSelectedUser]     = useState<CompanyUser | null>(null);

  const filtered = useMemo(() =>
    users.filter((u) => {
      const matchesSearch =
        u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.username.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTab = activeTab === "All" ? true : u.status === activeTab;
      return matchesSearch && matchesTab;
    }),
    [users, searchQuery, activeTab]
  );

  const handleSelectAll = (checked: boolean) =>
    setSelectedIds(checked ? new Set(filtered.map((u) => u.id)) : new Set());
  const handleSelectOne = (id: string, checked: boolean) => {
    const next = new Set(selectedIds);
    checked ? next.add(id) : next.delete(id);
    setSelectedIds(next);
  };
  const isAllSelected = filtered.length > 0 && selectedIds.size === filtered.length;

  const handleSaveUser = (updated: CompanyUser) => {
    setUsers((prev) => prev.map((u) => u.id === updated.id ? updated : u));
  };

  const handleDisableUser = () => {
    if (!selectedUser) return;
    setUsers((prev) => prev.map((u) => u.id === selectedUser.id ? { ...u, status: "Disabled" } : u));
  };

  const handleEnableUser = () => {
    if (!selectedUser) return;
    setUsers((prev) => prev.map((u) => u.id === selectedUser.id ? { ...u, status: "Active" } : u));
  };

  const openEdit     = (u: CompanyUser) => { setSelectedUser(u); setIsEditOpen(true); };
  const openDisable  = (u: CompanyUser) => { setSelectedUser(u); setIsDisableOpen(true); };
  const openEnable   = (u: CompanyUser) => { setSelectedUser(u); setIsEnableOpen(true); };
  const openReset    = (u: CompanyUser) => { setSelectedUser(u); setIsResetOpen(true); };
  const openActivity = (u: CompanyUser) => { setSelectedUser(u); setIsActivityOpen(true); };

  const columns = useMemo<ColumnDef<CompanyUser>[]>(
    () => [
      {
        id: "select",
        header: () => (
          <div className="px-1">
            <input type="checkbox" className="rounded border-slate-300 text-[#38BDF8] focus:ring-[#38BDF8] cursor-pointer"
              checked={isAllSelected} onChange={(e) => handleSelectAll(e.target.checked)} />
          </div>
        ),
        cell: ({ row }) => (
          <div className="px-1">
            <input type="checkbox" className="rounded border-slate-300 text-[#38BDF8] focus:ring-[#38BDF8] cursor-pointer"
              checked={selectedIds.has(row.original.id)} onChange={(e) => handleSelectOne(row.original.id, e.target.checked)} />
          </div>
        ),
        enableSorting: false,
      },
      {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => {
          const u = row.original;
          return (
            <div className="flex items-center gap-3">
              {u.avatar ? (
                <img src={u.avatar} alt={u.name} className="h-8 w-8 rounded-full object-cover shrink-0" />
              ) : (
                <div className={`h-8 w-8 rounded-full ${getAvatarColor(u.id)} flex items-center justify-center text-white text-[12px] font-bold shrink-0`}>
                  {u.name.charAt(0)}
                </div>
              )}
              <span className="font-semibold text-slate-800">{u.name}</span>
            </div>
          );
        },
      },
      {
        accessorKey: "email",
        header: "Email",
        cell: ({ row }) => <span className="text-slate-500">{row.original.email}</span>,
      },
      {
        accessorKey: "role",
        header: "Role",
        cell: ({ row }) => <span>{row.original.role}</span>,
      },
      {
        accessorKey: "username",
        header: "Username",
        cell: ({ row }) => <span className="text-slate-500">{row.original.username}</span>,
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const isActive = row.original.status === "Active";
          return (
            <div className="flex items-center gap-2">
              <div className={`h-2 w-2 rounded-full ${isActive ? "bg-green-500" : "bg-slate-400"}`} />
              <span className="font-medium">{row.original.status}</span>
            </div>
          );
        },
      },
      {
        accessorKey: "lastLogin",
        header: "Last login",
        cell: ({ row }) => <span className="text-slate-500">{row.original.lastLogin}</span>,
      },
      {
        id: "actions",
        header: "",
        cell: ({ row }) => {
          const u = row.original;
          return (
            <div className="flex justify-end pr-2">
              <Dropdown
                trigger={
                  <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer">
                    <MoreVertical size={16} />
                  </button>
                }
              >
                <DropdownItem onClick={() => openEdit(u)} icon={<Edit size={14} />}>
                  Edit user
                </DropdownItem>
                <DropdownItem onClick={() => openActivity(u)} icon={<Activity size={14} />}>
                  View activity
                </DropdownItem>
                <DropdownSeparator />
                {u.status === "Active" ? (
                  <DropdownItem
                    onClick={() => openDisable(u)}
                    className="text-rose-500 hover:bg-rose-500/5"
                    icon={<UserX size={14} className="text-rose-500" />}
                  >
                    Disable account
                  </DropdownItem>
                ) : (
                  <DropdownItem
                    onClick={() => openEnable(u)}
                    icon={<UserCheck size={14} className="text-green-500" />}
                    className="text-green-600 hover:bg-green-500/5"
                  >
                    Enable account
                  </DropdownItem>
                )}
                <DropdownItem
                  onClick={() => openReset(u)}
                  icon={<KeyRound size={14} />}
                >
                  Reset password
                </DropdownItem>
              </Dropdown>
            </div>
          );
        },
      },
    ],
    [isAllSelected, selectedIds, filtered]
  );

  const TABS: Tab[] = ["All", "Active", "Disabled"];

  return (
    <div className="animate-fade-in duration-300 space-y-6">
      <Breadcrumb
        pageTitle="USER MANAGEMENT"
        subtext={`${users.length} users in ABC Homecare workspace`}
        activePage="User management"
      />

      <div className="bg-white rounded-2xl overflow-hidden flex flex-col">
        {/* Tabs */}
        <div className="px-5 pt-4 border-b border-slate-100 flex items-center gap-1 overflow-x-auto no-scrollbar">
          {TABS.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-1.5 rounded-t-lg text-[13px] transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? "bg-[#EBF7FD] text-[#38BDF8] font-bold"
                    : "text-slate-400 hover:text-slate-700 font-medium"
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Toolbar */}
        <div className="p-5 border-b border-[#E7E7E7] flex items-center justify-between gap-4">
          <div className="relative w-64">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Search size={16} className="text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#FBFBFB] border border-[#E7E7E7] rounded-full text-[13px] focus:outline-none focus:ring-1 focus:ring-[#38BDF8] focus:border-[#38BDF8] transition-all placeholder:text-slate-400"
            />
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-[#FBFBFB] hover:bg-slate-100 border border-[#E7E7E7] text-slate-700 text-[13px] font-semibold rounded-full transition-all cursor-pointer">
              <Upload size={14} />
              <span>Export</span>
            </button>
            <button
              onClick={() => setIsCreateOpen(true)}
              className="flex items-center justify-center gap-1.5 h-10 px-5 rounded-full bg-primary text-white text-xs font-semibold hover:bg-primary/95 transition-all cursor-pointer"
            >
              <Plus size={15} />
              <span>Add user</span>
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto">
          {filtered.length > 0 ? (
            <DataTable columns={columns} data={filtered} initialPageSize={8} />
          ) : (
            <div className="py-20 flex flex-col items-center justify-center text-center">
              <div className="bg-slate-50 p-4 rounded-full mb-4">
                <FileText size={24} className="text-slate-400" />
              </div>
              <h3 className="text-sm font-bold mb-1">No users found</h3>
              <p className="text-xs text-muted max-w-sm">
                We couldn't find any users matching your current search filters.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <CreateUserModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onCreated={(u) => {
          setUsers((prev) => [
            ...prev,
            { id: String(prev.length + 1), ...u, status: "Active", lastLogin: "Just now" },
          ]);
        }}
      />
      <EditUserModal
        isOpen={isEditOpen}
        onClose={() => { setIsEditOpen(false); setSelectedUser(null); }}
        user={selectedUser}
        onSave={handleSaveUser}
      />
      <DisableUserModal
        isOpen={isDisableOpen}
        onClose={() => { setIsDisableOpen(false); setSelectedUser(null); }}
        userName={selectedUser?.name ?? ""}
        onConfirm={handleDisableUser}
      />
      <EnableUserModal
        isOpen={isEnableOpen}
        onClose={() => { setIsEnableOpen(false); setSelectedUser(null); }}
        userName={selectedUser?.name ?? ""}
        onConfirm={handleEnableUser}
      />
      <ResetPasswordModal
        isOpen={isResetOpen}
        onClose={() => { setIsResetOpen(false); setSelectedUser(null); }}
        userEmail={selectedUser?.email ?? ""}
      />
      <UserActivityModal
        isOpen={isActivityOpen}
        onClose={() => { setIsActivityOpen(false); setSelectedUser(null); }}
        userName={selectedUser?.name ?? ""}
      />
    </div>
  );
}
