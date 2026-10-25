import { useState, useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { DataTable } from "@/components/ui/DataTable";
import { Dropdown, DropdownItem } from "@/components/ui/Dropdown";
import {
  INITIAL_STAFF_USERS,
  type StaffUser,
} from "@/constants/userManagement";
import { CreateUserModal } from "@/components/user-management/CreateUserModal";
import { InviteSupportWorkerModal } from "@/components/user-management/InviteSupportWorkerModal";
import { InvitationSentModal } from "@/components/user-management/InvitationSentModal";
import { DeleteUserModal } from "@/components/user-management/DeleteUserModal";
import { EditStaffUserModal } from "@/components/user-management/EditStaffUserModal";
import {
  Search,
  Download,
  Upload,
  Plus,
  MoreVertical,
  Send,
  Edit,
  Trash2,
  FileText,
} from "lucide-react";

export default function UserManagement() {
  const [users, setUsers] = useState<StaffUser[]>(INITIAL_STAFF_USERS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [roleFilter] = useState<string>("All roles");
  const [statusFilter] = useState<string>("All status");

  // Modal states
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [isSentModalOpen, setIsSentModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [targetUser, setTargetUser] = useState<StaffUser | null>(null);
  const [sentEmail, setSentEmail] = useState<string>("");

  const handleUpdateUser = (updatedUser: StaffUser) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === updatedUser.id ? updatedUser : u))
    );
  };

  // --- Filtering & Selection ---
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.department.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesRole =
        roleFilter === "All roles" ? true : user.role === roleFilter;

      const matchesStatus =
        statusFilter === "All status" ? true : user.status === statusFilter;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, searchQuery, roleFilter, statusFilter]);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(new Set(filteredUsers.map((u) => u.id)));
    } else {
      setSelectedIds(new Set());
    }
  };

  const handleSelectOne = (id: string, checked: boolean) => {
    const newSelected = new Set(selectedIds);
    if (checked) {
      newSelected.add(id);
    } else {
      newSelected.delete(id);
    }
    setSelectedIds(newSelected);
  };

  const isAllSelected =
    filteredUsers.length > 0 && selectedIds.size === filteredUsers.length;

  const handleCreateUser = (newUserData: any) => {
    const createdUser: StaffUser = {
      id: String(Date.now()),
      name: newUserData.name,
      email: newUserData.email,
      role: newUserData.role as any,
      department: newUserData.department || "General Care",
      status: "Active",
      phone: newUserData.phone,
      insuranceNumber: newUserData.insuranceNumber,
      image: newUserData.image,
      bankName: newUserData.bankName,
      accountNumber: newUserData.accountNumber,
      accountName: newUserData.accountName,
    };
    setUsers([createdUser, ...users]);
  };

  const handleSendInvitation = (email: string) => {
    setSentEmail(email);
    setIsSentModalOpen(true);
    // Add invited user if not existing
    if (!users.some((u) => u.email === email)) {
      const invitedUser: StaffUser = {
        id: String(Date.now()),
        name: email.split("@")[0].replace(".", " "),
        email: email,
        role: "Support Worker",
        department: "Domiciliary Care",
        status: "Invited",
      };
      setUsers([invitedUser, ...users]);
    }
  };

  const handleDeleteConfirmed = () => {
    if (targetUser) {
      setUsers((prev) => prev.filter((u) => u.id !== targetUser.id));
      setTargetUser(null);
    }
  };

  // --- Columns ---
  const columns = useMemo<ColumnDef<StaffUser>[]>(
    () => [
      {
        id: "select",
        header: () => (
          <div className="px-1">
            <input
              type="checkbox"
              className="rounded border-slate-300 text-[#38BDF8] focus:ring-[#38BDF8] cursor-pointer"
              checked={isAllSelected}
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
              onChange={(e) => handleSelectOne(row.original.id, e.target.checked)}
            />
          </div>
        ),
        enableSorting: false,
      },
      {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => (
          <span className="font-bold text-slate-900">
            {row.original.name}
          </span>
        ),
      },
      {
        accessorKey: "email",
        header: "Email",
        cell: ({ row }) => (
          <span className="text-slate-600 text-[13.5px]">
            {row.original.email}
          </span>
        ),
      },
      {
        accessorKey: "role",
        header: "Role",
        cell: ({ row }) => (
          <span className="font-semibold text-[13px] px-3 py-1 bg-slate-100/80 rounded-full ">
            {row.original.role}
          </span>
        ),
      },
      {
        accessorKey: "department",
        header: "Department",
        cell: ({ row }) => <span>{row.original.department}</span>,
      },
      // {
      //   accessorKey: "bankDetails",
      //   header: "Bank details",
      //   cell: ({ row }) => {
      //     const u = row.original;
      //     if (u.accountNumber) {
      //       return (
      //         <span className="font-mono  font-medium">
      //           ••••{u.accountNumber.slice(-4)} ({u.bankName})
      //         </span>
      //       );
      //     }
      //     return <span className="text-muted font-medium">Not added</span>;
      //   },
      // },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const status = row.original.status;
          let dotColorClass = "bg-[#36C328]";
          if (status === "Invited") dotColorClass = "bg-[#F19E39]";
          if (status === "Inactive") dotColorClass = "bg-[#FF1100]";

          return (
            <div className="flex items-center gap-2">
              <div className={`h-2.5 w-2.5 rounded-full ${dotColorClass}`}></div>
              <span className="font-medium">{status}</span>
            </div>
          );
        },
      },
      {
        id: "actions",
        header: "",
        cell: ({ row }) => {
          const item = row.original;
          return (
            <div className="flex justify-end pr-2">
              <Dropdown
                trigger={
                  <button className="p-1.5 text-muted hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer">
                    <MoreVertical size={16} />
                  </button>
                }
              >
                <DropdownItem
                  onClick={() => handleSendInvitation(item.email)}
                  icon={<Send size={14} className="text-[#38BDF8]" />}
                >
                  Resend invitation
                </DropdownItem>
                <DropdownItem
                  onClick={() => {
                    setTargetUser(item);
                    setIsEditModalOpen(true);
                  }}
                  icon={<Edit size={14} className="text-slate-600" />}
                >
                  Edit user
                </DropdownItem>
                <DropdownItem
                  onClick={() => {
                    setTargetUser(item);
                    setIsDeleteModalOpen(true);
                  }}
                  icon={<Trash2 size={14} className="text-[#FF1100]" />}
                >
                  Delete user
                </DropdownItem>
              </Dropdown>
            </div>
          );
        },
      },
    ],
    [isAllSelected, selectedIds]
  );

  return (
    <div className="animate-fade-in duration-300 space-y-6">
      {/* Header Section */}
      <Breadcrumb
        pageTitle="USER MANAGEMENT"
        subtext="Manage staff accounts, roles, and system access"
        activePage="User management"
      />

      {/* Main Container */}
      <div className="bg-white rounded-2xl overflow-hidden flex flex-col">
        {/* Toolbar */} 
        <div className="p-5 border-b flex flex-col xl:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 w-full xl:w-auto flex-wrap">
            <div className="relative w-full sm:w-72">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Search size={16} className="text-muted" />
              </div>
              <input
                type="text"
                placeholder="Search by name, email or role..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-[#FBFBFB] border rounded-full text-[13px] focus:outline-none focus:ring-1 focus:ring-[#38BDF8] focus:border-[#38BDF8] transition-all placeholder:text-muted"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 w-full xl:w-auto justify-end flex-wrap">
            <button className="flex items-center gap-2 px-4 py-2 bg-[#FBFBFB] hover:bg-slate-100 border  text-[13px] font-semibold rounded-full transition-all cursor-pointer">
              <Download size={14} />
              <span>Import</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-[#FBFBFB] hover:bg-slate-100 border  text-[13px] font-semibold rounded-full transition-all cursor-pointer">
              <Upload size={14} />
              <span>Export</span>
            </button>

            {/* <button
              onClick={() => setIsInviteModalOpen(true)}
              className="flex items-center justify-center gap-2 px-5 py-2 rounded-full bg-[#EBF7FD] text-[#38BDF8] text-xs font-extrabold hover:bg-[#D9F0FC] transition-all cursor-pointer shadow-2xs"
            >
              <UserPlus size={15} />
              <span>Invite support worker</span>
            </button> */}

            <button
              onClick={() => {
                setTargetUser(null);
                setIsCreateModalOpen(true);
              }}
              className="flex items-center justify-center gap-1.5 px-5 py-2 rounded-full bg-[#38BDF8] text-white text-xs font-bold hover:bg-[#2BA5DF] transition-all cursor-pointer shadow-xs"
            >
              <Plus size={15} strokeWidth={3} />
              <span>Add new</span>
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="flex-1 overflow-auto">
          {filteredUsers.length > 0 ? (
            <DataTable columns={columns} data={filteredUsers} initialPageSize={8} />
          ) : (
            <div className="py-20 flex flex-col items-center justify-center text-center">
              <div className="bg-slate-50 p-4 rounded-full mb-4">
                <FileText size={24} className="text-muted" />
              </div>
              <h3 className="text-sm font-bold mb-1">No users found</h3>
              <p className="text-xs text-muted max-w-sm">
                We couldn't find any staff records matching your current search
                or filter selection.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <CreateUserModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSendInvitation={handleSendInvitation}
        onCreateUser={handleCreateUser}
      />

      <InviteSupportWorkerModal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
        onSendInvitation={handleSendInvitation}
      />

      <InvitationSentModal
        isOpen={isSentModalOpen}
        onClose={() => setIsSentModalOpen(false)}
        email={sentEmail}
      />

      <DeleteUserModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setTargetUser(null);
        }}
        onConfirm={handleDeleteConfirmed}
        userName={targetUser?.name}
      />

      <EditStaffUserModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setTargetUser(null);
        }}
        user={targetUser}
        onSave={handleUpdateUser}
      />
    </div>
  );
}
