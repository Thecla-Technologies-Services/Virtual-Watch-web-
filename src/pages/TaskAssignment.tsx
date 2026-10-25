import { useState, useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { DataTable } from "@/components/ui/DataTable";
import { Dropdown, DropdownItem } from "@/components/ui/Dropdown";
import { INITIAL_TASKS, type TaskItem } from "@/constants/tasks";
import { AddTaskModal } from "@/components/tasks/AddTaskModal";
import { ViewTaskModal } from "@/components/tasks/ViewTaskModal";
import { EditTaskModal } from "@/components/tasks/EditTaskModal";
import {
  ClipboardList,
  CheckCircle2,
  Clock,
  AlertCircle,
  Search,
  Download,
  Upload,
  Plus,
  MoreVertical,
  Edit,
  Eye,
  Trash2,
  FileText,
} from "lucide-react";

export default function TaskAssignment() {
  const [tasks, setTasks] = useState<TaskItem[]>(INITIAL_TASKS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [activeTab, setActiveTab] = useState<
    "All" | "Pending" | "Approved" | "Draft"
  >("All");

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<TaskItem | null>(null);

  const handleUpdateTask = (updatedTask: TaskItem) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === updatedTask.id ? updatedTask : t))
    );
  };

  // --- Filtering & Selection ---
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.serviceUser.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.assignedTo.some((user) =>
          user.toLowerCase().includes(searchQuery.toLowerCase())
        ) ||
        task.type.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        activeTab === "All" ? true : task.status === activeTab;

      return matchesSearch && matchesStatus;
    });
  }, [tasks, searchQuery, activeTab]);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(new Set(filteredTasks.map((t) => t.id)));
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
    filteredTasks.length > 0 && selectedIds.size === filteredTasks.length;

  const handleDeleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const handleMarkComplete = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: "Approved" } : t))
    );
  };

  // --- Columns ---
  const columns = useMemo<ColumnDef<TaskItem>[]>(
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
        accessorKey: "title",
        header: "Title",
        cell: ({ row }) => (
          <span className="font-semibold text-slate-800">
            {row.original.title}
          </span>
        ),
      },
      {
        accessorKey: "serviceUser",
        header: "Service user",
        cell: ({ row }) => <span>{row.original.serviceUser}</span>,
      },
      {
        accessorKey: "assignedTo",
        header: "Assigned to",
        cell: ({ row }) => <span>{row.original.assignedTo[0]}</span>,
      },
      {
        accessorKey: "dueDate",
        header: "Due date",
        cell: ({ row }) => <span>{row.original.dueDate}</span>,
      },
      {
        accessorKey: "type",
        header: "Type",
        cell: ({ row }) => <span>{row.original.type}</span>,
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const status = row.original.status;
          let dotColorClass = "bg-[#36C328]";
          if (status === "Pending") dotColorClass = "bg-[#F19E39]";
          if (status === "Draft") dotColorClass = "bg-slate-400";

          return (
            <div className="flex items-center gap-2">
              <div className={`h-2 w-2 rounded-full ${dotColorClass}`}></div>
              <span className="font-medium">{status}</span>
            </div>
          );
        },
      },
      {
        accessorKey: "priority",
        header: "Priority",
        cell: ({ row }) => {
          const priority = row.original.priority;
          let dotColorClass = "bg-[#FF1100]";
          if (priority === "Medium") dotColorClass = "bg-[#F19E39]";
          if (priority === "Low") dotColorClass = "bg-[#38BDF8]";

          return (
            <div className="flex items-center gap-2">
              <div className={`h-2 w-2 rounded-full ${dotColorClass}`}></div>
              <span className="font-medium">{priority}</span>
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
                  onClick={() => {
                    setSelectedTask(item);
                    setIsEditModalOpen(true);
                  }}
                  icon={<Edit size={14} className="" />}
                >
                  Edit
                </DropdownItem>
                <DropdownItem
                  onClick={() => {
                    setSelectedTask(item);
                    setIsViewModalOpen(true);
                  }}
                  icon={<Eye size={14} className="text-[#38BDF8]" />}
                >
                  View
                </DropdownItem>
                <DropdownItem
                  onClick={() => handleDeleteTask(item.id)}
                  icon={<Trash2 size={14} className="text-[#FF1100]" />}
                >
                  Delete
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
        pageTitle="TASK ASSIGNMENT"
        subtext="Assign and track care tasks and medical procedures"
        activePage="Task assignment"
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total tasks */}
        <div className="bg-white rounded-2xl p-5 flex items-center gap-4">
          <div className="bg-[#EBF7FD] text-[#38BDF8] p-3.5 rounded-2xl flex items-center justify-center">
            <ClipboardList size={22} strokeWidth={2.5} />
          </div>
          <div>
            <h4 className="text-2xl font-extrabold leading-none mb-1">5</h4>
            <p className="text-[14px] font-normal text-muted">Total tasks</p>
          </div>
        </div>

        {/* Approved */}
        <div className="bg-white rounded-2xl p-5 flex items-center gap-4">
          <div className="bg-[#E8F8EE] text-[#36C328] p-3.5 rounded-2xl flex items-center justify-center">
            <CheckCircle2 size={22} strokeWidth={2.5} className="text-[#36C328]" />
          </div>
          <div>
            <h4 className="text-2xl font-extrabold leading-none mb-1">3</h4>
            <p className="text-[14px] font-normal text-muted">Approved</p>
          </div>
        </div>

        {/* Pending */}
        <div className="bg-white rounded-2xl p-5 flex items-center gap-4">
          <div className="bg-[#FEF5EA] text-[#F19E39] p-3.5 rounded-2xl flex items-center justify-center">
            <Clock size={22} strokeWidth={2.5} />
          </div>
          <div>
            <h4 className="text-2xl font-extrabold leading-none mb-1">1</h4>
            <p className="text-[14px] font-normal text-muted">Pending</p>
          </div>
        </div>

        {/* High priority */}
        <div className="bg-white rounded-2xl p-5 flex items-center gap-4">
          <div className="bg-[#FFF6F5] text-[#FF1100] p-3.5 rounded-2xl flex items-center justify-center">
            <AlertCircle size={22} strokeWidth={2.5} />
          </div>
          <div>
            <h4 className="text-2xl font-extrabold leading-none mb-1">3</h4>
            <p className="text-[14px] font-normal text-muted">High priority</p>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="bg-white rounded-2xl overflow-hidden flex flex-col">
        {/* Toolbar */}
        <div className="p-5 border-b flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Search size={16} className="text-muted" />
              </div>
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-[#FBFBFB] border rounded-full text-[13px] focus:outline-none focus:ring-1 focus:ring-[#38BDF8] focus:border-[#38BDF8] transition-all placeholder:text-muted"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button className="flex items-center gap-2 px-5 py-2 bg-[#FBFBFB] hover:bg-slate-100 border text-slate-700 text-[13px] font-semibold rounded-full transition-all cursor-pointer">
              <Download size={14} />
              <span>Import</span>
            </button>
            <button className="flex items-center gap-2 px-5 py-2 bg-[#FBFBFB] hover:bg-slate-100 border text-slate-700 text-[13px] font-semibold rounded-full transition-all cursor-pointer">
              <Upload size={14} />
              <span>Export</span>
            </button>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center justify-center gap-1.5 h-10 px-5 rounded-full bg-primary text-white text-xs font-semibold hover:bg-primary/95 transition-all cursor-pointer"
            >
              <Plus size={15} />
              <span>Add new</span>
            </button>
          </div>
        </div>

        {/* Sub-filter Status Tabs */}
        <div className="px-5 pt-3 border-b flex items-center gap-2 overflow-x-auto no-scrollbar">
          {(["All", "Pending", "Approved", "Draft"] as const).map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-1.5 rounded-t-xl text-[13px] transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? "bg-[#EBF7FD] text-[#38BDF8] font-bold"
                    : "text-muted hover:text-slate-700 font-medium bg-transparent"
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Data Table */}
        <div className="flex-1 overflow-auto">
          {filteredTasks.length > 0 ? (
            <DataTable columns={columns} data={filteredTasks} initialPageSize={8} />
          ) : (
            <div className="py-20 flex flex-col items-center justify-center text-center">
              <div className="bg-slate-50 p-4 rounded-full mb-4">
                <FileText size={24} className="text-muted" />
              </div>
              <h3 className="text-sm font-bold mb-1">No tasks found</h3>
              <p className="text-xs text-muted max-w-sm">
                We couldn't find any assigned task records matching your current
                search or tab filter.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <AddTaskModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />

      <ViewTaskModal
        isOpen={isViewModalOpen}
        onClose={() => {
          setIsViewModalOpen(false);
          setSelectedTask(null);
        }}
        task={selectedTask}
        onMarkComplete={handleMarkComplete}
      />

      <EditTaskModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedTask(null);
        }}
        task={selectedTask}
        onSave={handleUpdateTask}
      />
    </div>
  );
}
