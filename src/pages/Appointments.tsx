import React, { useState, useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { DataTable } from "@/components/ui/DataTable";
import { Dropdown, DropdownItem } from "@/components/ui/Dropdown";
import {
  INITIAL_APPOINTMENTS,
  type Appointment,
} from "@/constants/appointments";
import { ScheduleAppointmentModal } from "@/components/appointments/ScheduleAppointmentModal";
import { AppointmentSuccessModal } from "@/components/appointments/AppointmentSuccessModal";
import { EditAppointmentModal } from "@/components/appointments/EditAppointmentModal";
import {
  ClipboardList,
  Search,
  ChevronDown,
  Plus,
  MoreVertical,
  Send,
  Edit,
  Trash2,
  FileText,
} from "lucide-react";

export default function Appointments() {
  const [appointments, setAppointments] = useState<Appointment[]>(
    INITIAL_APPOINTMENTS
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("All type");

  // Modal states
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [newlyScheduled, setNewlyScheduled] = useState<Partial<Appointment> | null>(
    null
  );

  const handleUpdateAppointment = (updatedAppointment: Appointment) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === updatedAppointment.id ? updatedAppointment : a))
    );
  };

  // --- Filtering ---
  const filteredAppointments = useMemo(() => {
    return appointments.filter((item) => {
      const matchesSearch =
        item.serviceUser.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.doctorVisitor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.location.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesType =
        typeFilter === "All type"
          ? true
          : item.type.toLowerCase().includes(typeFilter.toLowerCase());

      return matchesSearch && matchesType;
    });
  }, [appointments, searchQuery, typeFilter]);

  // --- Summary Counts ---
  const gpCount = useMemo(
    () => appointments.filter((a) => a.type === "GP Appointment").length,
    [appointments]
  );
  const psychCount = useMemo(
    () => appointments.filter((a) => a.type === "Psychiatric").length,
    [appointments]
  );
  const socialCount = useMemo(
    () => appointments.filter((a) => a.type === "Social worker").length,
    [appointments]
  );
  const visitorCount = useMemo(
    () => appointments.filter((a) => a.type === "External visitor").length,
    [appointments]
  );

  const handleScheduleAppointment = (
    newApp: Omit<Appointment, "id" | "status" | "notified">
  ) => {
    const fullApp: Appointment = {
      ...newApp,
      id: String(Date.now()),
      status: "upcoming",
      notified: "Sent",
    };
    setAppointments([fullApp, ...appointments]);
    setNewlyScheduled(fullApp);
    setIsSuccessModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setAppointments((prev) => prev.filter((a) => a.id !== id));
  };

  const handleResend = (id: string) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, notified: "Sent" as const } : a))
    );
  };

  // --- Columns ---
  const columns = useMemo<ColumnDef<Appointment>[]>(
    () => [
      {
        accessorKey: "type",
        header: "Type",
        cell: ({ row }) => (
          <span className="font-semibold text-[13.5px]">
            {row.original.type}
          </span>
        ),
      },
      {
        accessorKey: "serviceUser",
        header: "Service user",
        cell: ({ row }) => (
          <span className="text-[13.5px] font-normal">
            {row.original.serviceUser}
          </span>
        ),
      },
      {
        accessorKey: "doctorVisitor",
        header: "Doctor / Visitor",
        cell: ({ row }) => (
          <span className="text-[13.5px] font-normal">
            {row.original.doctorVisitor}
          </span>
        ),
      },
      {
        accessorKey: "date",
        header: "Date & Time",
        cell: ({ row }) => {
          const { date, time } = row.original;
          return (
            <div className="flex flex-col">
              <span className="text-[13px] font-medium">{date}</span>
              <span className="text-xs font-semibold text-[#38BDF8]">
                {time}
              </span>
            </div>
          );
        },
      },
      {
        accessorKey: "location",
        header: "Location",
        cell: ({ row }) => (
          <span className="text-[13.5px] font-normal">
            {row.original.location}
          </span>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const status = row.original.status;
          let badgeClass = "bg-[#EBF7FD] text-[#38BDF8]";
          if (status === "booked") badgeClass = "bg-[#F5E8FF] text-[#C084FC]";
          if (status === "Pending") badgeClass = "bg-[#FEF5EA] text-[#F19E39]";
          if (status === "Completed") badgeClass = "bg-[#E8F8EE] text-[#36C328]";
          if (status === "Cancelled") badgeClass = "bg-[#FFF6F5] text-[#FF1100]";

          return (
            <span
              className={`inline-flex px-3.5 py-1 rounded-full font-semibold text-[12px] capitalize ${badgeClass}`}
            >
              {status}
            </span>
          );
        },
      },
      {
        accessorKey: "notified",
        header: "Notified",
        cell: ({ row }) => {
          const notif = row.original.notified;
          const badgeClass =
            notif === "Sent"
              ? "bg-[#E8F8EE] text-[#36C328]"
              : "bg-[#FEF5EA] text-[#F19E39]";

          return (
            <span
              className={`inline-flex px-3 py-1 rounded-full font-semibold text-[12px] ${badgeClass}`}
            >
              {notif}
            </span>
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
                  onClick={() => handleResend(item.id)}
                  icon={<Send size={14} className="text-[#38BDF8]" />}
                >
                  Resend
                </DropdownItem>
                <DropdownItem
                  onClick={() => {
                    setSelectedAppointment(item);
                    setIsEditModalOpen(true);
                  }}
                  icon={<Edit size={14} className="" />}
                >
                  Edit
                </DropdownItem>
                <DropdownItem
                  onClick={() => handleDelete(item.id)}
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
    []
  );

  return (
    <div className="animate-fade-in duration-300 space-y-6">
      {/* Header Section */}
      <Breadcrumb
        pageTitle="APPOINTMENTS"
        subtext="Manage all service user appointments • Auto-notifies all support workers"
        activePage="Appointments"
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* GP Appointment */}
        <div className="bg-white rounded-2xl p-5 flex items-center gap-3.5">
          <div className="bg-[#EBF7FD] text-[#38BDF8] p-3 rounded-2xl flex items-center justify-center shrink-0">
            <ClipboardList size={22} strokeWidth={2.5} />
          </div>
          <div>
            <h4 className="text-xl font-extrabold leading-tight mb-0.5">
              {gpCount}
            </h4>
            <p className="text-[13px] font-normal text-muted leading-tight">
              GP Appointment
            </p>
          </div>
        </div>

        {/* Psychiatric appointment */}
        <div className="bg-white rounded-2xl p-5 flex items-center gap-3.5">
          <div className="bg-[#F5E8FF] text-[#C084FC] p-3 rounded-2xl flex items-center justify-center shrink-0">
            <ClipboardList size={22} strokeWidth={2.5} />
          </div>
          <div>
            <h4 className="text-xl font-extrabold leading-tight mb-0.5">
              {psychCount}
            </h4>
            <p className="text-[13px] font-normal text-muted leading-tight">
              Psychiatric appointment
            </p>
          </div>
        </div>

        {/* Social Worker Appointment */}
        <div className="bg-white rounded-2xl p-5 flex items-center gap-3.5">
          <div className="bg-[#FEF5EA] text-[#F19E39] p-3 rounded-2xl flex items-center justify-center shrink-0">
            <ClipboardList size={22} strokeWidth={2.5} />
          </div>
          <div>
            <h4 className="text-xl font-extrabold leading-tight mb-0.5">
              {socialCount}
            </h4>
            <p className="text-[13px] font-normal text-muted leading-tight">
              Social Worker Appointment
            </p>
          </div>
        </div>

        {/* External visitor */}
        <div className="bg-white rounded-2xl p-5 flex items-center gap-3.5">
          <div className="bg-[#E8F8EE] text-[#36C328] p-3 rounded-2xl flex items-center justify-center shrink-0">
            <ClipboardList size={22} strokeWidth={2.5} />
          </div>
          <div>
            <h4 className="text-xl font-extrabold leading-tight mb-0.5">
              {visitorCount}
            </h4>
            <p className="text-[13px] font-normal text-muted leading-tight">
              External visitor
            </p>
          </div>
        </div>

        {/* Total */}
        <div className="bg-white rounded-2xl p-5 flex items-center gap-3.5">
          <div className="bg-[#E8F8EE] text-[#36C328] p-3 rounded-2xl flex items-center justify-center shrink-0">
            <ClipboardList size={22} strokeWidth={2.5} />
          </div>
          <div>
            <h4 className="text-xl font-extrabold leading-tight mb-0.5">
              {appointments.length}
            </h4>
            <p className="text-[13px] font-normal text-muted leading-tight">
              Total
            </p>
          </div>
        </div>
      </div>

      {/* Main Table Container */}
      <div className="bg-white rounded-2xl overflow-hidden flex flex-col">
        {/* Toolbar */}
        <div className="p-5 border-b flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 w-full sm:w-auto flex-wrap">
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

            <Dropdown
              trigger={
                <button className="flex items-center justify-between gap-3 px-4 py-2 bg-[#FBFBFB] border rounded-full text-[13px] font-medium hover:bg-slate-50 transition-colors cursor-pointer min-w-[125px]">
                  <span>{typeFilter}</span>
                  <ChevronDown size={14} className="text-muted" />
                </button>
              }
            >
              <DropdownItem onClick={() => setTypeFilter("All type")}>
                All type
              </DropdownItem>
              <DropdownItem onClick={() => setTypeFilter("GP Appointment")}>
                GP Appointment
              </DropdownItem>
              <DropdownItem onClick={() => setTypeFilter("Psychiatric")}>
                Psychiatric
              </DropdownItem>
              <DropdownItem onClick={() => setTypeFilter("Social worker")}>
                Social worker
              </DropdownItem>
              <DropdownItem onClick={() => setTypeFilter("External visitor")}>
                External visitor
              </DropdownItem>
            </Dropdown>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              onClick={() => setIsScheduleModalOpen(true)}
              className="flex items-center justify-center gap-2 px-5 py-2 rounded-full bg-[#38BDF8] text-white text-xs font-bold hover:bg-[#2BA5DF] transition-all cursor-pointer shadow-xs whitespace-nowrap"
            >
              <Plus size={15} strokeWidth={3} />
              <span>Schedule appointment</span>
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="flex-1 overflow-auto">
          {filteredAppointments.length > 0 ? (
            <DataTable
              columns={columns}
              data={filteredAppointments}
              pageSize={8}
            />
          ) : (
            <div className="py-20 flex flex-col items-center justify-center text-center">
              <div className="bg-slate-50 p-4 rounded-full mb-4">
                <FileText size={24} className="text-muted" />
              </div>
              <h3 className="text-sm font-bold mb-1">No appointments found</h3>
              <p className="text-xs text-muted max-w-sm">
                We couldn't find any appointments matching your current search
                or filter selection.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <ScheduleAppointmentModal
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
        onSchedule={handleScheduleAppointment}
      />

      <AppointmentSuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        appointment={newlyScheduled}
        onAddAnother={() => {
          setIsSuccessModalOpen(false);
          setIsScheduleModalOpen(true);
        }}
      />

      <EditAppointmentModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedAppointment(null);
        }}
        appointment={selectedAppointment}
        onSave={handleUpdateAppointment}
      />
    </div>
  );
}
