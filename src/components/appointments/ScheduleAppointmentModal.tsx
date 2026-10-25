import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { ChevronDown, Calendar, Clock, AlertTriangle } from "lucide-react";
import type { Appointment } from "@/constants/appointments";

interface ScheduleAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSchedule?: (appointmentData: Omit<Appointment, "id" | "status" | "notified">) => void;
}

export function ScheduleAppointmentModal({
  isOpen,
  onClose,
  onSchedule,
}: ScheduleAppointmentModalProps) {
  const [appointmentType, setAppointmentType] = useState("GP Appointment");
  const [serviceUser, setServiceUser] = useState("SU-002 – James Okafor");
  const [doctorVisitor, setDoctorVisitor] = useState("Dr. Smith");
  const [location, setLocation] = useState("St. Ann's Hospital");
  const [date, setDate] = useState("2026-05-07");
  const [time, setTime] = useState("20:22");
  const [notificationEmail, setNotificationEmail] = useState("theclaezenwa@gmail.com");
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSave = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      if (onSchedule) {
        onSchedule({
          type: (appointmentType.includes("Psychiatric")
            ? "Psychiatric"
            : appointmentType.includes("Social")
            ? "Social worker"
            : appointmentType.includes("External")
            ? "External visitor"
            : "GP Appointment") as any,
          serviceUser: serviceUser || "SU-002 – James Okafor",
          doctorVisitor: doctorVisitor || "Dr. Smith",
          location: location || "St. Ann's Hospital",
          date: date || "2026-05-07",
          time: time || "20:22",
          notificationEmail: notificationEmail || "theclaezenwa@gmail.com",
          additionalNotes: additionalNotes,
        });
      }
      onClose();
    }, 400);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} width="2xl">
      {/* Modal Title Header */}
      <div className="flex items-center justify-between border-b pb-3.5 mb-5">
        <h3 className="text-base font-bold">Schedule appointment</h3>
      </div>

      <div className="space-y-5 max-h-[78vh] overflow-y-auto pr-1 no-scrollbar">
        {/* Row 1: Type & Service User */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[13px] font-medium mb-1.5">
              Appointment type
            </label>
            <div className="relative">
              <select
                value={appointmentType}
                onChange={(e) => setAppointmentType(e.target.value)}
                className="w-full px-4 py-3 pr-10 bg-white border rounded-2xl text-[14px] appearance-none focus:outline-none focus:ring-1 focus:ring-[#38BDF8] focus:border-[#38BDF8] transition-all cursor-pointer"
              >
                <option value="GP Appointment">GP Appointment</option>
                <option value="Psychiatric appointment">Psychiatric appointment</option>
                <option value="Social Worker Appointment">Social Worker Appointment</option>
                <option value="External visitor">External visitor</option>
                <option value="Dental Appointment">Dental Appointment</option>
                <option value="Specialist Appointment">Specialist Appointment</option>
              </select>
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                <ChevronDown size={18} />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-[13px] font-medium mb-1.5">
              Service user
            </label>
            <div className="relative">
              <select
                value={serviceUser}
                onChange={(e) => setServiceUser(e.target.value)}
                className="w-full px-4 py-3 pr-10 bg-white border rounded-2xl text-[14px] appearance-none focus:outline-none focus:ring-1 focus:ring-[#38BDF8] focus:border-[#38BDF8] transition-all cursor-pointer"
              >
                <option value="SU-001 – Margaret Thatcher">SU-001 – Margaret Thatcher</option>
                <option value="SU-002 – James Okafor">SU-002 – James Okafor</option>
                <option value="SU-003 – Edna Clarke">SU-003 – Edna Clarke</option>
                <option value="SU-004 – Robert Taylor">SU-004 – Robert Taylor</option>
                <option value="SU-005 – Patricia Davies">SU-005 – Patricia Davies</option>
              </select>
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                <ChevronDown size={18} />
              </div>
            </div>
          </div>
        </div>

        {/* Row 2: Doctor/Visitor name & Location */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[13px] font-medium mb-1.5">
              Doctor / Visitor name
            </label>
            <input
              type="text"
              placeholder="e.g Dr. Smith"
              value={doctorVisitor}
              onChange={(e) => setDoctorVisitor(e.target.value)}
              className="w-full px-4 py-3 bg-white border rounded-2xl text-[14px] focus:outline-none focus:ring-1 focus:ring-[#38BDF8] focus:border-[#38BDF8] transition-all placeholder:text-muted"
            />
          </div>

          <div>
            <label className="block text-[13px] font-medium mb-1.5">
              Location
            </label>
            <input
              type="text"
              placeholder="e.g St. Ann's Hospital"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-4 py-3 bg-white border rounded-2xl text-[14px] focus:outline-none focus:ring-1 focus:ring-[#38BDF8] focus:border-[#38BDF8] transition-all placeholder:text-muted"
            />
          </div>
        </div>

        {/* Row 3: Date & Time */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[13px] font-medium mb-1.5">Date</label>
            <div className="relative">
              <input
                type="text"
                placeholder="dd/mm/yyyy"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-3 pr-11 bg-white border rounded-2xl text-[14px] focus:outline-none focus:ring-1 focus:ring-[#38BDF8] focus:border-[#38BDF8] transition-all placeholder:text-muted"
              />
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                <Calendar size={18} className="text-[#38BDF8]" />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-[13px] font-medium mb-1.5">Time</label>
            <div className="relative">
              <input
                type="text"
                placeholder="-----"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full px-4 py-3 pr-11 bg-white border rounded-2xl text-[14px] focus:outline-none focus:ring-1 focus:ring-[#38BDF8] focus:border-[#38BDF8] transition-all placeholder:text-muted"
              />
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                <Clock size={18} className="text-[#38BDF8]" />
              </div>
            </div>
          </div>
        </div>

        {/* Row 4: Notification Email */}
        <div>
          <label className="block text-[13px] font-medium mb-1.5">
            Notification email
          </label>
          <div className="relative">
            <select
              value={notificationEmail}
              onChange={(e) => setNotificationEmail(e.target.value)}
              className="w-full px-4 py-3 pr-10 bg-white border rounded-2xl text-[14px] appearance-none focus:outline-none focus:ring-1 focus:ring-[#38BDF8] focus:border-[#38BDF8] transition-all cursor-pointer"
            >
              <option value="theclaezenwa@gmail.com">theclaezenwa@gmail.com</option>
              <option value="all-active-workers@medstar.co.uk">all-active-workers@medstar.co.uk</option>
              <option value="team-leads@medstar.co.uk">team-leads@medstar.co.uk</option>
            </select>
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
              <ChevronDown size={18} />
            </div>
          </div>
        </div>

        {/* Row 5: Additional Notes */}
        <div>
          <label className="block text-[13px] font-medium mb-1.5">
            Additional notes
          </label>
          <textarea
            rows={4}
            placeholder="Any note for support workers..."
            value={additionalNotes}
            onChange={(e) => setAdditionalNotes(e.target.value)}
            className="w-full px-4 py-3 bg-white border rounded-2xl text-[14px] focus:outline-none focus:ring-1 focus:ring-[#38BDF8] focus:border-[#38BDF8] transition-all placeholder:text-muted resize-none"
          ></textarea>
        </div>

        {/* Green Notification Alert Banner */}
        <div className="bg-[#36C328] text-white p-4 rounded-2xl flex items-center gap-3.5 text-[13px] font-medium shadow-xs">
          <div className="shrink-0 text-white">
            <AlertTriangle size={22} className="fill-white text-[#36C328]" />
          </div>
          <span className="leading-snug">
            On save, all support workers will be notified and this will appear on their mobile dashboard instantly.
          </span>
        </div>

        {/* Action Footer */}
        <div className="flex items-center justify-end gap-3 pt-5 border-t mt-7">
          <button
            type="button"
            onClick={handleSave}
            disabled={isSubmitting}
            className="px-6 py-2.5 bg-[#38BDF8] hover:bg-[#2BA5DF] text-white text-[14px] font-semibold rounded-full transition-all cursor-pointer min-w-[210px] flex items-center justify-center shadow-xs"
          >
            {isSubmitting ? "Saving..." : "Save & notify all workers"}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 bg-[#FBFBFB] hover:bg-slate-100 border text-[14px] font-semibold rounded-full transition-all cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
}
