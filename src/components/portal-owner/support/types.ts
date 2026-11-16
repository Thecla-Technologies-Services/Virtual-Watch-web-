export type TicketType = "Bug" | "Support" | "Features";
export type TicketPriority = "High" | "Medium" | "Low";
export type TicketStatus =
  | "Open"
  | "In-progress"
  | "Critical"
  | "Resolved"
  | "Closed"
  | "Assigned"
  | "Waiting for customer";

export interface SupportTicket {
  id: string;
  ticketCode: string;
  module: string;
  subject: string;
  fullSubject: string;
  company: string;
  type: TicketType;
  priority: TicketPriority;
  status: TicketStatus;
  assignee: string;
  created: string;
  customerName: string;
  customerMessage: string;
  attachments: string[];
  replies: { id: string; sender: string; text: string; isSupport: boolean }[];
}

export const INITIAL_TICKETS: SupportTicket[] = [
  {
    id: "1",
    ticketCode: "TKT-0481",
    module: "Payroll",
    subject: "Permission cache...",
    fullSubject: "Unable to export payroll PDF",
    company: "NordTech Solutions",
    type: "Bug",
    priority: "High",
    status: "In-progress",
    assignee: "Maria S.",
    created: "Today 09:12",
    customerName: "Maria Santos",
    customerMessage: "I'm having trouble withdrawing funds",
    attachments: ["incident-photo.jpg", "incident-report.pdf"],
    replies: [],
  },
  {
    id: "2",
    ticketCode: "TKT-0482",
    module: "Visit",
    subject: "Export to CSV fails...",
    fullSubject: "Export to CSV fails on large datasets",
    company: "ABC Homecare",
    type: "Bug",
    priority: "Medium",
    status: "Open",
    assignee: "Unassigned",
    created: "Yesterday",
    customerName: "Maria Oche",
    customerMessage: "Exporting visits for Q2 times out after 30 seconds.",
    attachments: [],
    replies: [],
  },
  {
    id: "3",
    ticketCode: "TKT-0483",
    module: "Leave",
    subject: "Trial conversion dis...",
    fullSubject: "Trial conversion discount not applied",
    company: "Quantum Retail Group",
    type: "Support",
    priority: "Low",
    status: "Closed",
    assignee: "Sarah Adewale",
    created: "3 days ago",
    customerName: "James Okafor",
    customerMessage: "Our annual discount code didn't apply on upgrade.",
    attachments: [],
    replies: [],
  },
  {
    id: "4",
    ticketCode: "TKT-0484",
    module: "Timesheets",
    subject: "Two-factor auth se...",
    fullSubject: "Two-factor auth setup error on mobile",
    company: "Bluewave Financial",
    type: "Bug",
    priority: "High",
    status: "Critical",
    assignee: "Maria S.",
    created: "5 days ago",
    customerName: "Priya Nair",
    customerMessage: "Staff members are unable to scan the 2FA QR code.",
    attachments: [],
    replies: [],
  },
  {
    id: "5",
    ticketCode: "TKT-0485",
    module: "Auth",
    subject: "Audit log export tr...",
    fullSubject: "Audit log export truncation issue",
    company: "ABC Homecare",
    type: "Bug",
    priority: "Medium",
    status: "Resolved",
    assignee: "Sarah Adewale",
    created: "7 days ago",
    customerName: "Maria Oche",
    customerMessage: "Audit logs over 10,000 rows are truncated in CSV.",
    attachments: [],
    replies: [],
  },
  {
    id: "6",
    ticketCode: "TKT-0486",
    module: "Payroll",
    subject: "Permission cache...",
    fullSubject: "Permission cache refresh delay",
    company: "NordTech Solutions",
    type: "Bug",
    priority: "High",
    status: "In-progress",
    assignee: "Maria S.",
    created: "Today 09:12",
    customerName: "Lena Müller",
    customerMessage: "Role updates take 10 minutes to reflect.",
    attachments: [],
    replies: [],
  },
  {
    id: "7",
    ticketCode: "TKT-0487",
    module: "Visit",
    subject: "Export to CSV fails...",
    fullSubject: "Custom report builder request",
    company: "Quantum Retail Group",
    type: "Features",
    priority: "Medium",
    status: "Assigned",
    assignee: "Maria S.",
    created: "Yesterday",
    customerName: "James Okafor",
    customerMessage: "Would love to schedule weekly PDF exports.",
    attachments: [],
    replies: [],
  },
  {
    id: "8",
    ticketCode: "TKT-0488",
    module: "Leave",
    subject: "Trial conversion dis...",
    fullSubject: "Leave balance carryover question",
    company: "Bluewave Financial",
    type: "Support",
    priority: "Low",
    status: "Closed",
    assignee: "Unassigned",
    created: "3 days ago",
    customerName: "Priya Nair",
    customerMessage: "How do we configure annual leave carryover?",
    attachments: [],
    replies: [],
  },
];

