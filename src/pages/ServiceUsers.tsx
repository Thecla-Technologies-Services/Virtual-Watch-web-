import { useState, useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { DataTable } from "@/components/ui/DataTable";
import { Dropdown, DropdownItem, DropdownSeparator } from "@/components/ui/Dropdown";
import { ViewUserModal } from "@/components/service-users/ViewUserModal";
import { AddUserModal } from "@/components/service-users/AddUserModal";
import { EditUserModal } from "@/components/service-users/EditUserModal";
import { INITIAL_USERS } from "@/constants/serviceUsers";
import type { ServiceUser } from "@/constants/serviceUsers";
import { 
  Search, 
  ChevronDown, 
  Plus, 
  Upload, 
  Download, 
  MoreVertical, 
  Eye, 
  Edit, 
  Trash2, 
  ShieldAlert, 
  Check, 
  AlertCircle 
} from "lucide-react";
import margaretJohnsonAvatar from "../assets/margaret_johnson.png";

export default function ServiceUsers() {
  const [users, setUsers] = useState<ServiceUser[]>(INITIAL_USERS);
  const [activeTab, setActiveTab] = useState<"Active" | "Deactivated">("Active");
  const [searchQuery, setSearchQuery] = useState("");
  const [riskFilter, setRiskFilter] = useState<string>("All risk levels");

  // Selection State
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<ServiceUser | null>(null);

  // Toast Notification State
  const [toast, setToast] = useState<{ message: string; type: "success" | "info" | "error" } | null>(null);

  const showToast = (message: string, type: "success" | "info" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  // Filter and Search Logic
  const filteredUsers = users.filter((user) => {
    const matchesStatus = user.status === activeTab;
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          user.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          user.primaryCarer.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesRisk = riskFilter === "All risk levels" || user.riskLevel === riskFilter;
    
    return matchesStatus && matchesSearch && matchesRisk;
  });

  // Selection handlers
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const visibleIds = filteredUsers.map((u) => u.id);
      setSelectedIds(new Set([...selectedIds, ...visibleIds]));
    } else {
      const visibleIds = filteredUsers.map((u) => u.id);
      const nextIds = new Set(selectedIds);
      visibleIds.forEach((id) => nextIds.delete(id));
      setSelectedIds(nextIds);
    }
  };

  const handleSelectRow = (id: string, checked: boolean) => {
    const nextIds = new Set(selectedIds);
    if (checked) {
      nextIds.add(id);
    } else {
      nextIds.delete(id);
    }
    setSelectedIds(nextIds);
  };

  const isAllVisibleSelected = 
    filteredUsers.length > 0 && 
    filteredUsers.every((u) => selectedIds.has(u.id));

  // Action handlers
  const handleAddUserSubmit = (formData: Omit<ServiceUser, "id" | "status">) => {
    const newUser: ServiceUser = {
      id: `SU-${Date.now().toString().slice(-3)}`,
      status: "Active",
      ...formData,
    };

    setUsers([newUser, ...users]);
    setIsAddModalOpen(false);
    showToast(`Successfully added service user: ${newUser.name}`);
  };

  const handleEditUserSubmit = (updatedData: Omit<ServiceUser, "id" | "status">) => {
    if (!selectedUser) return;
    setUsers(users.map(u => u.id === selectedUser.id ? { ...u, ...updatedData } : u));
    setIsEditModalOpen(false);
    setSelectedUser(null);
    showToast(`Successfully updated service user: ${updatedData.name}`);
  };

  const toggleUserStatus = (user: ServiceUser) => {
    const nextStatus = user.status === "Active" ? "Deactivated" : "Active";
    setUsers(users.map(u => u.id === user.id ? { ...u, status: nextStatus } : u));
    showToast(`${user.name} has been ${nextStatus === "Active" ? "activated" : "deactivated"}`);
  };

  const bulkDeactivate = () => {
    if (selectedIds.size === 0) return;
    setUsers(users.map(u => selectedIds.has(u.id) ? { ...u, status: activeTab === "Active" ? "Deactivated" : "Active" } : u));
    showToast(`Successfully modified ${selectedIds.size} service users`);
    setSelectedIds(new Set());
  };

  const deleteUser = (id: string) => {
    const deletedName = users.find(u => u.id === id)?.name || "User";
    setUsers(users.filter(u => u.id !== id));
    showToast(`${deletedName} has been deleted`, "info");
  };

  const handleExport = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + ["Name,Age,Address,Primary Carer,Risk Level,Status"].join(",") + "\n"
      + filteredUsers.map(u => `"${u.name}",${u.age},"${u.address}","${u.primaryCarer}",${u.riskLevel},${u.status}`).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `service_users_${activeTab.toLowerCase()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Export completed successfully");
  };

  const handleImport = () => {
    showToast("Import modal triggered. Ready to upload CSV/Excel files.", "info");
  };

  // Define columns for the DataTable component
  const columns = useMemo<ColumnDef<ServiceUser>[]>(() => [
    {
      id: "select",
      header: () => (
        <div className="px-1">
            <input
              type="checkbox"
              className="rounded border-slate-300 text-[#38BDF8] focus:ring-[#38BDF8] cursor-pointer"
              checked={isAllVisibleSelected}
              onChange={(e) => handleSelectAll(e.target.checked)}
            />
          </div>
      ),
      cell: ({ row }) => (
        <div className="px-1">
            <input
              type="checkbox"
              className="rounded border-slate-300 text-[#38BDF8] focus:ring-[#38BDF8] cursor-pointer"
              checked={selectedIds.has(row.original.id)}
              onChange={(e) => handleSelectRow(row.original.id, e.target.checked)}
            />
          </div>
      ),
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => {
        const user = row.original;
        return (
          <div className="flex items-center gap-3 font-semibold text-slate-800">
            {user.name === "Margaret Johnson" ? (
              <img
                src={margaretJohnsonAvatar}
                alt="Margaret Johnson"
                className="h-8 w-8 rounded-full object-cover border border-slate-100"
              />
            ) : (
              <div className="h-8 w-8 rounded-full bg-[#EBF6FC] text-primary flex items-center justify-center text-xs font-bold border border-slate-100">
                {user.name.split(" ").map((n) => n[0]).join("")}
              </div>
            )}
            <span>{user.name}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "age",
      header: "Age",
      cell: ({ row }) => (
        <span className="text-slate-600 font-medium">{row.original.age}</span>
      ),
    },
    {
      accessorKey: "address",
      header: "Address",
      cell: ({ row }) => (
        <span className="text-slate-600 font-medium block max-w-xs truncate">{row.original.address}</span>
      ),
    },
    {
      accessorKey: "primaryCarer",
      header: "Primary carer",
      cell: ({ row }) => (
        <span className="text-slate-600 font-medium">{row.original.primaryCarer}</span>
      ),
    },
    {
      accessorKey: "riskLevel",
      header: "Risk level",
      cell: ({ row }) => {
        const user = row.original;
        return (
          <div className="flex items-center gap-2">
            <span
              className={`h-2.5 w-2.5 rounded-full ${
                user.riskLevel === "High"
                  ? "bg-[#FF3E3E]"
                  : user.riskLevel === "Medium"
                  ? "bg-[#FFC007]"
                  : "bg-[#28A745]"
              }`}
            />
            <span className="text-[13px] font-medium text-slate-700">{user.riskLevel}</span>
          </div>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const user = row.original;
        return (
          <div className="text-center">
            <Dropdown
              align="right"
              menuClassName="w-36"
              trigger={
                <button
                  type="button"
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer text-center flex items-center justify-center mx-auto"
                >
                  <MoreVertical size={16} />
                </button>
              }
            >
              <DropdownItem
                onClick={() => {
                  setSelectedUser(user);
                  setIsViewModalOpen(true);
                }}
                icon={<Eye size={13} />}
              >
                View
              </DropdownItem>

              <DropdownItem
                onClick={() => {
                  setSelectedUser(user);
                  setIsEditModalOpen(true);
                }}
                icon={<Edit size={13} />}
              >
                Edit
              </DropdownItem>

              <DropdownItem
                onClick={() => toggleUserStatus(user)}
                icon={<ShieldAlert size={13} />}
              >
                {user.status === "Active" ? "Deactivate" : "Activate"}
              </DropdownItem>

              <DropdownSeparator />

              <DropdownItem
                onClick={() => deleteUser(user.id)}
                className="text-rose-500 hover:bg-rose-500/5 focus:bg-rose-500/5"
                icon={<Trash2 size={13} className="text-rose-500" />}
              >
                Delete
              </DropdownItem>
            </Dropdown>
          </div>
        );
      },
    },
  ], [isAllVisibleSelected, selectedIds, users, activeTab]);

  return (
    <div className="animate-fade-in duration-300 space-y-6">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-5 right-5 z-[100] flex items-center gap-3 px-4 py-3 rounded-2xl bg-white border border-slate-100 text-slate-800 animate-slide-in-right">
          {toast.type === "success" && <div className="p-1 rounded-lg bg-emerald-500/10 text-emerald-600"><Check size={16} /></div>}
          {toast.type === "info" && <div className="p-1 rounded-lg bg-blue-500/10 text-blue-600"><AlertCircle size={16} /></div>}
          {toast.type === "error" && <div className="p-1 rounded-lg bg-rose-500/10 text-rose-600"><ShieldAlert size={16} /></div>}
          <span className="text-xs font-semibold">{toast.message}</span>
        </div>
      )}

      {/* Header and Breadcrumbs */}
      <Breadcrumb
        pageTitle="SERVICE USER MANAGEMENT"
        subtext="Manage care recipients, their profiles, and risk assessments"
        activePage="Service user management"
      />

      {/* Main Content Card Container */}
      <div className="rounded-2xl border border-slate-100 bg-white">
        
        {/* Row 1: Tabs */}
        <div className="p-5"> 
          <div className="flex border-b border-slate-100 gap-2">
            <button
              onClick={() => {
                setActiveTab("Active");
                setSelectedIds(new Set());
              }}
              className={`px-4 py-2.5 rounded-t-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === "Active"
                  ? "bg-primary/8 text-primary"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              Active service users
            </button>
            <button
              onClick={() => {
                setActiveTab("Deactivated");
                setSelectedIds(new Set());
              }}
              className={`px-4 py-2.5 rounded-t-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === "Deactivated"
                  ? "bg-primary/8 text-primary"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              Deactivated service users
            </button>
          </div>
        </div>

        {/* Row 2: Filters & Actions */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between px-5">
          
          {/* Left section: Search & Dropdown filter */}
          <div className="flex flex-col sm:flex-row gap-3 flex-1 max-w-lg">
            {/* Search */}
            <div className="relative flex-1">
              <span className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-slate-400">
                <Search size={16} />
              </span>
              <input
                type="text"
                placeholder="Search by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 rounded-full bg-slate-50/70 border border-slate-100 pl-11 pr-4 text-[13px] text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>

            {/* Risk filter */}
            <Dropdown
              align="left"
              trigger={
                <button
                  type="button"
                  className="flex items-center justify-between gap-3 h-10 px-4 rounded-full bg-slate-50/70 border border-slate-100 text-[13px] font-semibold text-slate-700 hover:bg-slate-100/50 transition-colors w-full sm:w-[160px] text-left cursor-pointer"
                >
                  <span>{riskFilter}</span>
                  <ChevronDown size={14} className="text-slate-400" />
                </button>
              }
            >
              {["All risk levels", "High", "Medium", "Low"].map((level) => (
                <DropdownItem
                  key={level}
                  onClick={() => setRiskFilter(level)}
                  className={riskFilter === level ? "bg-primary/8 text-primary" : ""}
                >
                  <div className="flex items-center justify-between w-full">
                    <span>{level}</span>
                    {riskFilter === level && <Check size={14} />}
                  </div>
                </DropdownItem>
              ))}
            </Dropdown>
          </div>

          {/* Right section: Action Buttons */}
          <div className="flex items-center gap-3 self-end md:self-auto">
            {selectedIds.size > 0 && (
              <button
                onClick={bulkDeactivate}
                className="flex items-center gap-1.5 h-10 px-4 rounded-full bg-rose-500/10 text-rose-600 text-xs font-semibold border border-rose-500/20 hover:bg-rose-500/20 transition-all cursor-pointer"
              >
                <Trash2 size={13} />
                <span>{activeTab === "Active" ? "Deactivate" : "Activate"} Selected ({selectedIds.size})</span>
              </button>
            )}

            <button
              onClick={handleImport}
              className="flex items-center justify-center gap-1.5 h-10 px-4.5 rounded-full bg-slate-50/70 border border-slate-100 text-xs font-semibold text-slate-700 hover:bg-slate-100/50 transition-all cursor-pointer"
            >
              <Upload size={14} />
              <span>Import</span>
            </button>

            <button
              onClick={handleExport}
              className="flex items-center justify-center gap-1.5 h-10 px-4.5 rounded-full bg-slate-50/70 border border-slate-100 text-xs font-semibold text-slate-700 hover:bg-slate-100/50 transition-all cursor-pointer"
            >
              <Download size={14} />
              <span>Export</span>
            </button>

            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center justify-center gap-1.5 h-10 px-5.5 rounded-full bg-primary text-white text-xs font-semibold hover:bg-primary/95 transition-all cursor-pointer"
            >
              <Plus size={15} />
              <span>Add new</span>
            </button>
          </div>

        </div>

        {/* Row 3: DataTable Component */}
        <div className="overflow-hidden">
          <DataTable
            columns={columns}
            data={filteredUsers}
            initialPageSize={8}
          />
        </div>

      </div>

      {/* Reusable View Details Modal */}
      <ViewUserModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        user={selectedUser}
      />

      {/* Reusable Add User Modal */}
      <AddUserModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddUserSubmit}
      />

      {/* Reusable Edit User Modal */}
      <EditUserModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedUser(null);
        }}
        user={selectedUser}
        onSubmit={handleEditUserSubmit}
      />

    </div>
  );
}
