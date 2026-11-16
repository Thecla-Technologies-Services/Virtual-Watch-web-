import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Check,
  Clock,
  ExternalLink,
  Link2,
  MoreVertical,
  X,
} from "lucide-react";

export interface SelectedShiftInfo {
  staffName: string;
  initials: string;
  role: string;
  dayLabel: string;
  shiftCode: "E" | "L" | "N";
  shiftName: string;
  timeRange: string;
}

interface ShiftTask {
  id: string;
  title: string;
  category: string;
  time: string;
  completed: boolean;
}

interface ShiftDetailsDrawerProps {
  shift: SelectedShiftInfo | null;
  onClose: () => void;
}

const INITIAL_LINKED_TASKS: ShiftTask[] = [
  {
    id: "t-1",
    title: "Morning personal care",
    category: "Personal care",
    time: "6:00am - 8:00am",
    completed: true,
  },
  {
    id: "t-2",
    title: "Medical record",
    category: "Medication",
    time: "8:00am - 9:00am",
    completed: true,
  },
  {
    id: "t-3",
    title: "Breakfast support",
    category: "Nutrition",
    time: "9:00am - 10:00am",
    completed: true,
  },
];

const INITIAL_UPCOMING_TASKS: ShiftTask[] = [
  {
    id: "u-1",
    title: "Housekeeping checks",
    category: "Housekeeping",
    time: "10:00am - 11:00am",
    completed: false,
  },
  {
    id: "u-2",
    title: "Documentation & notes",
    category: "Administration",
    time: "11:00am - 12:30pm",
    completed: false,
  },
];

export function ShiftDetailsDrawer({
  shift,
  onClose,
}: ShiftDetailsDrawerProps) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"Tasks" | "Shift details">(
    "Tasks"
  );
  const [linkedTasks, setLinkedTasks] =
    useState<ShiftTask[]>(INITIAL_LINKED_TASKS);
  const [upcomingTasks, setUpcomingTasks] = useState<ShiftTask[]>(
    INITIAL_UPCOMING_TASKS
  );
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskCategory, setNewTaskCategory] = useState("Personal care");

  if (!shift) return null;

  const completedCount = linkedTasks.filter((t) => t.completed).length;
  const totalLinked = linkedTasks.length || 1;
  const progressPct = Math.round((completedCount / totalLinked) * 100);

  const toggleLinkedTask = (id: string) => {
    setLinkedTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const toggleUpcomingTask = (id: string) => {
    setUpcomingTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    setLinkedTasks((prev) => [
      ...prev,
      {
        id: `t-${Date.now()}`,
        title: newTaskTitle.trim(),
        category: newTaskCategory,
        time: shift.timeRange,
        completed: false,
      },
    ]);
    setNewTaskTitle("");
    setIsAddingTask(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/25 backdrop-blur-[1px]">
      <div className="w-full max-w-[420px] bg-white h-full flex flex-col border-l border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="text-[16px] font-bold text-[#2E3A59]">
            Shift details
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close shift details"
            className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-500 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-5">
          <button
            type="button"
            onClick={() => {
              onClose();
              navigate("/task-assignment");
            }}
            className="inline-flex items-center gap-1.5 text-[12px] font-medium text-slate-500 hover:text-[#37AADF] cursor-pointer"
          >
            <span>Go to all tasks</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#37AADF]" />
          </button>

          {/* Staff Summary Card */}
          <div className="rounded-xl bg-[#F8FAFC] border border-slate-100 p-4 space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#37AADF] to-[#0E7490] text-white font-bold text-[13px] flex items-center justify-center shrink-0">
                {shift.initials}
              </div>
              <div className="min-w-0">
                <p className="text-[14px] font-bold text-[#2E3A59]">
                  {shift.staffName}
                </p>
                <p className="text-[12px] text-slate-500">
                  {shift.dayLabel} · {shift.timeRange}
                </p>
                <span className="inline-block mt-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-[#16A34A] text-[11px] font-medium">
                  {shift.shiftName}
                </span>
              </div>
            </div>

            <div>
              <p className="text-[11px] font-semibold text-[#2E3A59] mb-1.5">
                {completedCount} of {linkedTasks.length} tasks completed
              </p>
              <div className="w-full h-1.5 rounded-full bg-slate-200 overflow-hidden">
                <div
                  className="h-full bg-[#22C55E] rounded-full transition-all"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-2 border-b border-slate-100">
            {(["Tasks", "Shift details"] as const).map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-t-lg text-[12px] font-semibold transition-colors cursor-pointer ${
                    isActive
                      ? "bg-[#EBF6FC] text-[#37AADF]"
                      : "text-slate-500 hover:text-[#2E3A59]"
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          {activeTab === "Tasks" ? (
            <div className="space-y-5">
              {/* Linked tasks */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-[13px] font-bold text-[#2E3A59]">
                    Linked tasks
                  </h3>
                  <button
                    type="button"
                    onClick={() => setIsAddingTask((prev) => !prev)}
                    className="h-8 px-4 rounded-full bg-[#37AADF] hover:bg-[#2F99CA] text-white text-[12px] font-medium transition-colors cursor-pointer"
                  >
                    Add task
                  </button>
                </div>

                {isAddingTask && (
                  <form
                    onSubmit={handleAddTask}
                    className="rounded-xl border border-slate-200 p-3 space-y-2.5 bg-[#F8FAFC]"
                  >
                    <input
                      type="text"
                      value={newTaskTitle}
                      onChange={(e) => setNewTaskTitle(e.target.value)}
                      placeholder="Task title..."
                      className="w-full h-9 px-3 rounded-lg border border-slate-200 bg-white text-[12px] text-[#2E3A59] focus:outline-none focus:ring-2 focus:ring-[#37AADF]/30"
                    />
                    <div className="flex items-center justify-between gap-2">
                      <select
                        value={newTaskCategory}
                        onChange={(e) => setNewTaskCategory(e.target.value)}
                        className="h-9 px-2.5 rounded-lg border border-slate-200 bg-white text-[12px] text-[#2E3A59]"
                      >
                        <option value="Personal care">Personal care</option>
                        <option value="Medication">Medication</option>
                        <option value="Nutrition">Nutrition</option>
                        <option value="Housekeeping">Housekeeping</option>
                      </select>
                      <button
                        type="submit"
                        className="h-9 px-4 rounded-full bg-[#37AADF] text-white text-[12px] font-medium cursor-pointer"
                      >
                        Save
                      </button>
                    </div>
                  </form>
                )}

                <div className="space-y-2.5">
                  {linkedTasks.map((task) => (
                    <div
                      key={task.id}
                      className="rounded-xl border border-slate-100 bg-white p-3.5 flex items-start justify-between gap-3"
                    >
                      <div className="flex items-start gap-3">
                        <button
                          type="button"
                          onClick={() => toggleLinkedTask(task.id)}
                          aria-label={`Toggle ${task.title}`}
                          className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center border transition-colors cursor-pointer ${
                            task.completed
                              ? "bg-[#22C55E] border-[#22C55E] text-white"
                              : "border-slate-300 bg-white"
                          }`}
                        >
                          {task.completed && <Check className="w-3 h-3" />}
                        </button>
                        <div>
                          <p className="text-[13px] font-semibold text-[#2E3A59]">
                            {task.title}
                          </p>
                          <p className="text-[11px] text-slate-400">
                            {task.category}
                          </p>
                          <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-1">
                            <Clock className="w-3 h-3 text-slate-400" />
                            {task.time}
                          </p>
                          <p
                            className={`text-[11px] font-medium flex items-center gap-1.5 mt-1 ${
                              task.completed
                                ? "text-[#16A34A]"
                                : "text-[#F59E0B]"
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                task.completed ? "bg-[#22C55E]" : "bg-[#F59E0B]"
                              }`}
                            />
                            {task.completed ? "Completed" : "Pending"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <span className="w-6 h-6 rounded-full bg-[#F4F6F9] text-[10px] font-bold text-[#2E3A59] flex items-center justify-center">
                          {shift.initials}
                        </span>
                        <span className="w-6 h-6 rounded-full bg-[#F4F6F9] text-slate-400 flex items-center justify-center">
                          <MoreVertical className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Upcoming tasks */}
              <div className="space-y-2.5">
                <h3 className="text-[13px] font-bold text-[#2E3A59]">
                  Upcoming tasks
                </h3>
                <div className="space-y-2.5">
                  {upcomingTasks.map((task) => (
                    <div
                      key={task.id}
                      className="rounded-xl border border-slate-100 bg-white p-3.5 flex items-start justify-between gap-3"
                    >
                      <div className="flex items-start gap-3">
                        <button
                          type="button"
                          onClick={() => toggleUpcomingTask(task.id)}
                          aria-label={`Toggle ${task.title}`}
                          className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center border transition-colors cursor-pointer ${
                            task.completed
                              ? "bg-[#22C55E] border-[#22C55E] text-white"
                              : "border-slate-300 bg-white"
                          }`}
                        >
                          {task.completed && <Check className="w-3 h-3" />}
                        </button>
                        <div>
                          <p className="text-[13px] font-semibold text-[#2E3A59]">
                            {task.title}
                          </p>
                          <p className="text-[11px] text-slate-400">
                            {task.category}
                          </p>
                          <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-1">
                            <Clock className="w-3 h-3 text-slate-400" />
                            {task.time}
                          </p>
                          <p
                            className={`text-[11px] font-medium flex items-center gap-1.5 mt-1 ${
                              task.completed
                                ? "text-[#16A34A]"
                                : "text-[#F59E0B]"
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                task.completed ? "bg-[#22C55E]" : "bg-[#F59E0B]"
                              }`}
                            />
                            {task.completed ? "Completed" : "Pending"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <span className="w-6 h-6 rounded-full bg-[#F4F6F9] text-[10px] font-bold text-[#2E3A59] flex items-center justify-center">
                          {shift.initials}
                        </span>
                        <span className="w-6 h-6 rounded-full bg-[#F4F6F9] text-slate-400 flex items-center justify-center">
                          <MoreVertical className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  navigate("/task-assignment");
                }}
                className="w-full h-10 rounded-full border border-[#37AADF] text-[#37AADF] hover:bg-[#EBF6FC] text-[12px] font-semibold transition-colors cursor-pointer"
              >
                View all shift tasks
              </button>
            </div>
          ) : (
            <div className="rounded-xl bg-[#F8FAFC] border border-slate-100 p-4 space-y-3 text-[12px]">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Staff member</span>
                <span className="font-semibold text-[#2E3A59]">
                  {shift.staffName}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Role</span>
                <span className="font-medium text-[#2E3A59]">{shift.role}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Shift pattern</span>
                <span className="font-medium text-[#2E3A59]">
                  {shift.shiftName}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Day</span>
                <span className="font-medium text-[#2E3A59]">
                  {shift.dayLabel}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Hours</span>
                <span className="font-medium text-[#2E3A59]">
                  {shift.timeRange} (8h)
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 bg-[#F8FAFC] flex items-start gap-2.5">
          <Link2 className="w-4 h-4 text-[#37AADF] shrink-0 mt-0.5" />
          <div>
            <p className="text-[12px] font-semibold text-[#2E3A59]">
              Tasks are linked to this shift
            </p>
            <p className="text-[11px] text-slate-400">
              Changes will only affect this shift
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

