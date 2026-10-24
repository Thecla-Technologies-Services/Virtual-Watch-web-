import React, { useState, useEffect } from "react";
import { Modal } from "@/components/ui/Modal";
import type { TaskItem, TaskSubtask } from "@/constants/tasks";
import {
  User,
  Calendar,
  Clock,
  CheckCircle2,
  Check,
  Circle,
} from "lucide-react";

interface ViewTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: TaskItem | null;
  onMarkComplete?: (taskId: string) => void;
}

export function ViewTaskModal({
  isOpen,
  onClose,
  task,
  onMarkComplete,
}: ViewTaskModalProps) {
  const [subtasks, setSubtasks] = useState<TaskSubtask[]>([]);

  useEffect(() => {
    if (task) {
      setSubtasks(task.subtasks || []);
    }
  }, [task]);

  if (!task) return null;

  const toggleSubtask = (id: string) => {
    setSubtasks((prev) =>
      prev.map((s) => (s.id === id ? { ...s, completed: !s.completed } : s))
    );
  };

  const status = task.status;
  let statusDotClass = "bg-[#36C328]";
  if (status === "Pending") statusDotClass = "bg-[#F19E39]";
  if (status === "Draft") statusDotClass = "bg-slate-400";

  const priority = task.priority;
  let priorityDotClass = "bg-[#FF1100]";
  if (priority === "Medium") priorityDotClass = "bg-[#F19E39]";
  if (priority === "Low") priorityDotClass = "bg-[#38BDF8]";

  return (
    <Modal isOpen={isOpen} onClose={onClose} width="3xl">
      {/* Modal Title Header */}
      <div className="flex items-center justify-between border-b pb-3 mb-5">
        <h3 className="text-base font-bold">View details</h3>
      </div>

      <div className="space-y-6 max-h-[75vh] overflow-y-auto pr-1 no-scrollbar">
        {/* Top Title Block */}
        <div>
          <h2 className="text-[14px] font-bold ">
            {task.title}
          </h2>
          <div className="flex items-center gap-2 text-[14px] font-normal text-muted">
            <span>Task ID:</span>
            <span className="bg-[#EBF7FD] text-[#38BDF8] px-2 rounded-full font-bold text-[12px]">
              {task.taskId}
            </span>
          </div>
        </div>

        {/* 4 Summary Badge Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-[#FBFBFB] rounded-2xl p-4 flex flex-col justify-between">
            <div className="flex items-center gap-2">
              <div className={`h-2.5 w-2.5 rounded-full ${statusDotClass}`}></div>
              <span className="text-[16px] font-medium ">
                {task.status}
              </span>
            </div>
            <span className="text-[14px] text-muted font-normal">Status</span>
          </div>

          <div className="bg-[#FBFBFB] rounded-2xl p-4 flex flex-col justify-between">
            <div className="flex items-center gap-2">
              <div
                className={`h-2.5 w-2.5 rounded-full ${priorityDotClass}`}
              ></div>
              <span className="text-[16px] font-medium ">
                {task.priority}
              </span>
            </div>
            <span className="text-[14px] text-muted font-normal">Priority</span>
          </div>

          <div className="bg-[#FBFBFB] rounded-2xl p-4 flex flex-col justify-between">
            <div>
              <span className="text-[16px] font-medium ">
                {task.type}
              </span>
            </div>
            <span className="text-[14px] text-muted font-normal">Type</span>
          </div>

          <div className="bg-[#FBFBFB] rounded-2xl p-4 flex flex-col justify-between">
            <div>
              <span className="text-[16px] font-medium ">
                {task.estimatedTime}
              </span>
            </div>
            <span className="text-[14px] text-muted font-normal">
              Estimated time
            </span>
          </div>
        </div>

        {/* Task Information Grid */}
        <div className="space-y-3">
          <h4 className="text-[13px] font-bold uppercase">
            TASK INFORMATION
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-4 gap-x-6">
            <div className="flex items-start gap-2.5">
              <User size={16} className="text-[#38BDF8] mt-0.5 shrink-0" />
              <div>
                <p className="text-[14px] text-muted">Service user</p>
                <p className="text-[14px] font-medium ">
                  {task.serviceUser}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <User size={16} className="text-[#38BDF8] mt-0.5 shrink-0" />
              <div>
                <p className="text-[14px] text-muted">Created by</p>
                <p className="text-[14px] font-medium">
                  {task.createdBy}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Calendar size={16} className="text-[#38BDF8] mt-0.5 shrink-0" />
              <div>
                <p className="text-[14px] text-muted">Start date</p>
                <p className="text-[14px] font-medium">
                  {task.startDate}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Calendar size={16} className="text-[#38BDF8] mt-0.5 shrink-0" />
              <div>
                <p className="text-[14px] text-muted">Due date</p>
                <p className="text-[14px] font-medium">
                  {task.dueDate}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Clock size={16} className="text-[#38BDF8] mt-0.5 shrink-0" />
              <div>
                <p className="text-[14px] text-muted">Start time</p>
                <p className="text-[14px] font-medium">
                  {task.startTime}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Clock size={16} className="text-[#38BDF8] mt-0.5 shrink-0" />
              <div>
                <p className="text-[14px] text-muted">End time</p>
                <p className="text-[14px] font-medium">
                  {task.endTime}
                </p>
              </div>
            </div>
          </div>
        </div>

        <hr className="border-t"/>

        {/* Description & Important Notes */}
        <div className="">
          <h4 className="text-[13px] font-bold uppercase">
            DESCRIPTION
          </h4>
          <p className="text-[13px] font-normal">
            {task.description}
          </p>

          {task.importantNotes && (
            <div className="bg-[#FBFBFB] rounded-2xl p-2 mt-3">
              <p className="text-[12px] font-semibold">
                Important notes
              </p>
              <p className="text-[13px] font-normal">
                {task.importantNotes}
              </p>
            </div>
          )}
        </div>

        <hr className="border-t"/>

        {/* Assigned to Section */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <User size={16} className="text-[#38BDF8]" />
            <h4 className="text-[14px] font-normal">Assigned to</h4>
          </div>

          <div className="border rounded-2xl overflow-hidden flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x bg-white">
            {task.assignedTo.map((assignee, idx) => {
              const firstLetter = assignee.charAt(0).toUpperCase();
              const isFirst = idx === 0;
              return (
                <div
                  key={assignee}
                  className="flex-1 p-3.5 px-4 flex items-center justify-between gap-3 bg-white"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-7 w-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 font-bold text-xs shrink-0">
                      {firstLetter}
                    </div>
                    <span className="text-[13px] font-medium">
                      {assignee}
                    </span>
                  </div>
                  {isFirst && (
                    <CheckCircle2 size={18} className="fill-[#36C328] text-white" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Task Checklist */}
        <div className="space-y-3 pt-2">
          <div>
            <h4 className="text-[13px] font-bold">
              TASK CHECKLIST
            </h4>
            <p className="text-[13px] font-normal text-muted">Track completion of subtasks</p>
          </div>

          <div className="border rounded-2xl p-4.5 space-y-4 bg-white">
            {subtasks.map((sub, idx) => {
              const isLast = idx === subtasks.length - 1;
              return (
                <div
                  key={sub.id}
                  className={`space-y-2 ${
                    !isLast ? "border-b pb-4" : ""
                  }`}
                >
                  <div
                    onClick={() => toggleSubtask(sub.id)}
                    className="flex items-center justify-between gap-3 cursor-pointer select-none group"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`h-5 w-5 rounded flex items-center justify-center transition-colors ${
                          sub.completed
                            ? "bg-[#38BDF8] text-white"
                            : "border-2 border-slate-200 bg-transparent"
                        }`}
                      >
                        {sub.completed && <Check size={14} strokeWidth={3} />}
                      </div>
                      <span
                        className={`text-[13px] font-medium transition-all ${
                          sub.completed
                            ? "line-through text-slate-400"
                            : "text-slate-800 group-hover:text-slate-950"
                        }`}
                      >
                        {sub.title}
                      </span>
                    </div>

                    {sub.completed && (
                      <CheckCircle2 size={18} className="fill-[#36C328] text-white" />
                    )}
                  </div>

                  {sub.note && (
                    <div className="ml-8 bg-[#FBFBFB] border rounded-2xl p-3.5 text-xs ">
                      <p className="font-semibold text-[12px]  mb-1">
                        Note from the carer
                      </p>
                      <p className="text-muted text-[13px] font-normal">{sub.note}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Footer */}
        <div className="flex items-center justify-end gap-3 pt-5 border-t mt-8">
          <button
            type="button"
            onClick={onClose}
            className="px-7 py-2.5 bg-[#38BDF8] hover:bg-[#2BA5DF] text-white text-[14px] font-semibold rounded-full transition-all cursor-pointer"
          >
            Back to task
          </button>
          <button
            type="button"
            onClick={() => {
              if (onMarkComplete) onMarkComplete(task.id);
              onClose();
            }}
            className="px-6 py-2.5 bg-[#FBFBFB] hover:bg-slate-100 border text-[14px] font-semibold rounded-full transition-all cursor-pointer flex items-center gap-2"
          >
            <CheckCircle2 size={18} className="fill-[#36C328] text-white shrink-0" />
            <span>Mark complete</span>
          </button>
        </div>
      </div>
    </Modal>
  );
}
