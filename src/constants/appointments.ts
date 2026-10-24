export interface Appointment {
  id: string;
  type:
    | "GP Appointment"
    | "Psychiatric"
    | "Social worker"
    | "External visitor"
    | "Dental Appointment"
    | "Specialist Appointment";
  serviceUser: string;
  doctorVisitor: string;
  date: string;
  time: string;
  location: string;
  status: "upcoming" | "booked" | "Pending" | "Completed" | "Cancelled";
  notified: "Sent" | "Pending" | "Not Sent";
  notificationEmail?: string;
  additionalNotes?: string;
}

export const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: "1",
    type: "GP Appointment",
    serviceUser: "SU-001 – Margaret Thatcher",
    doctorVisitor: "Dr. Mehta",
    date: "2026-04-14",
    time: "10:30",
    location: "Palmers Green Med...",
    status: "upcoming",
    notified: "Sent",
    notificationEmail: "theclaezenwa@gmail.com",
    additionalNotes: "Ensure routine blood pressure check is recorded.",
  },
  {
    id: "2",
    type: "Psychiatric",
    serviceUser: "SU-002 – James Okafor",
    doctorVisitor: "Dr. Abubakar",
    date: "2026-04-16",
    time: "14:00",
    location: "St Ann's Hospital",
    status: "booked",
    notified: "Sent",
    notificationEmail: "theclaezenwa@gmail.com",
    additionalNotes: "Follow-up consultation on monthly medication adjustment.",
  },
  {
    id: "3",
    type: "Social worker",
    serviceUser: "SU-003 – Edna Clarke",
    doctorVisitor: "Emma Johnson SW",
    date: "2026-04-18",
    time: "11:00",
    location: "Office visit",
    status: "Pending",
    notified: "Pending",
    notificationEmail: "emma.johnson@socialservices.gov.uk",
    additionalNotes: "Quarterly wellness assessment and care plan review.",
  },
  {
    id: "4",
    type: "Dental Appointment",
    serviceUser: "SU-004 – Robert Taylor",
    doctorVisitor: "Dr. Henderson",
    date: "2026-04-20",
    time: "09:15",
    location: "Green Lanes Dental...",
    status: "upcoming",
    notified: "Sent",
    notificationEmail: "theclaezenwa@gmail.com",
  },
  {
    id: "5",
    type: "GP Appointment",
    serviceUser: "SU-005 – Patricia Davies",
    doctorVisitor: "Dr. Mehta",
    date: "2026-04-22",
    time: "11:45",
    location: "Palmers Green Med...",
    status: "booked",
    notified: "Sent",
    notificationEmail: "theclaezenwa@gmail.com",
  },
  {
    id: "6",
    type: "Specialist Appointment",
    serviceUser: "SU-001 – Margaret Thatcher",
    doctorVisitor: "Dr. Patel (Cardio)",
    date: "2026-04-25",
    time: "15:30",
    location: "North Middlesex Hosp...",
    status: "upcoming",
    notified: "Sent",
    notificationEmail: "theclaezenwa@gmail.com",
  },
  {
    id: "7",
    type: "Psychiatric",
    serviceUser: "SU-006 – Michael Brown",
    doctorVisitor: "Dr. Abubakar",
    date: "2026-04-28",
    time: "13:00",
    location: "St Ann's Hospital",
    status: "upcoming",
    notified: "Sent",
    notificationEmail: "theclaezenwa@gmail.com",
  },
  {
    id: "8",
    type: "External visitor",
    serviceUser: "SU-007 – Elizabeth Wilson",
    doctorVisitor: "Legal Representative",
    date: "2026-05-02",
    time: "10:00",
    location: "Residence visit",
    status: "Pending",
    notified: "Pending",
    notificationEmail: "legal@wilsonsolicitors.co.uk",
  },
];
