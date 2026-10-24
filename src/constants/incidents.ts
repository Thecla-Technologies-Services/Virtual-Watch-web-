// Incident Log Interface
export interface IncidentLog {
  id: string;
  status: "Active" | "Pending" | "Resolved";
  area: string;
  timestamp: string;
  agent: string;
  risk: "High" | "Medium" | "Low";
}

// 15 Sample incident logs to test pagination (3 pages of 5 items)
export const mockIncidents: IncidentLog[] = [
  {
    id: "LOG-1024",
    status: "Active",
    area: "North Gate Perimeter",
    risk: "High",
    agent: "Marcus Vance",
    timestamp: "Today, 10:45 AM",
  },
  {
    id: "LOG-1023",
    status: "Pending",
    area: "East Warehouse Exit",
    risk: "Medium",
    agent: "Sarah Jones",
    timestamp: "Today, 10:12 AM",
  },
  {
    id: "LOG-1022",
    status: "Resolved",
    area: "Visitor Parking Lot B",
    risk: "Low",
    agent: "Elena Rostova",
    timestamp: "Today, 09:30 AM",
  },
  {
    id: "LOG-1021",
    status: "Resolved",
    area: "Main Lobby Entrance",
    risk: "Low",
    agent: "Marcus Vance",
    timestamp: "Today, 08:15 AM",
  },
  {
    id: "LOG-1020",
    status: "Active",
    area: "Server Room Annex",
    risk: "High",
    agent: "David Kim",
    timestamp: "Today, 07:48 AM",
  },
  {
    id: "LOG-1019",
    status: "Pending",
    area: "Loading Dock 3",
    risk: "Medium",
    agent: "Elena Rostova",
    timestamp: "Yesterday, 11:24 PM",
  },
  {
    id: "LOG-1018",
    status: "Resolved",
    area: "South fence line",
    risk: "Medium",
    agent: "David Kim",
    timestamp: "Yesterday, 09:10 PM",
  },
  {
    id: "LOG-1017",
    status: "Resolved",
    area: "Executive Suite Corridor",
    risk: "Low",
    agent: "Sarah Jones",
    timestamp: "Yesterday, 04:30 PM",
  },
  {
    id: "LOG-1016",
    status: "Pending",
    area: "West Storage Complex",
    risk: "High",
    agent: "Marcus Vance",
    timestamp: "Yesterday, 02:15 PM",
  },
  {
    id: "LOG-1015",
    status: "Resolved",
    area: "North Gate Perimeter",
    risk: "Low",
    agent: "Elena Rostova",
    timestamp: "Yesterday, 11:05 AM",
  },
  {
    id: "LOG-1014",
    status: "Resolved",
    area: "Visitor Parking Lot A",
    risk: "Medium",
    agent: "Sarah Jones",
    timestamp: "Yesterday, 09:40 AM",
  },
  {
    id: "LOG-1013",
    status: "Resolved",
    area: "Main Lobby Entrance",
    risk: "Low",
    agent: "David Kim",
    timestamp: "Yesterday, 08:00 AM",
  },
  {
    id: "LOG-1012",
    status: "Active",
    area: "Power Substation C",
    risk: "High",
    agent: "Marcus Vance",
    timestamp: "2 days ago, 06:12 PM",
  },
  {
    id: "LOG-1011",
    status: "Resolved",
    area: "Roof Access Stairwell",
    risk: "Medium",
    agent: "Elena Rostova",
    timestamp: "2 days ago, 02:40 PM",
  },
  {
    id: "LOG-1010",
    status: "Resolved",
    area: "East Warehouse Exit",
    risk: "Low",
    agent: "David Kim",
    timestamp: "2 days ago, 11:15 AM",
  },
];

// Care Incident Management Interface and Data
export interface CareIncident {
  id: string;
  incidentId: string;
  title: string;
  serviceUser: string;
  reportedBy: string;
  date: string;
  time: string;
  attachmentsCount: number;
  status: "Approved" | "Pending" | "Submitted" | "Resolved";
  statusDetails?: string;
  severity: "Critical" | "High" | "Medium" | "Low";
  location: string;
  designation: string;
  incidentTypes: string[];
  description: string;
  attachments: { name: string; type: string }[];
}

export const INITIAL_CARE_INCIDENTS: CareIncident[] = [
  {
    id: "INC-001",
    incidentId: "HJ7789Yijk",
    title: "Fall incident - Service user",
    serviceUser: "John Smith",
    reportedBy: "Alice Johnson",
    date: "2/13/2024",
    time: "2/13/2024 at 10:30 AM",
    attachmentsCount: 2,
    status: "Approved",
    statusDetails: "Submitted",
    severity: "High",
    location: "Bathroom",
    designation: "Alice Johnson",
    incidentTypes: [
      "Injury / assault",
      "Damage / abuse",
      "Injury to staff",
      "Physical assault on service user",
      "Verbal abuse",
      "First aid required",
      "Medical / emergency",
      "Medical history",
      "Near miss",
    ],
    description: "Service user fell in bathroom, minor bruising on left arm. Fall mat was not deployed.\nMinor bruising on left arm\nService user was assisted to sit down, ice pack applied, no hospital visit required.",
    attachments: [
      { name: "incident-photo.jpg", type: "image" },
      { name: "incident-report.pdf", type: "pdf" },
    ],
  },
  {
    id: "INC-002",
    incidentId: "MK8891Pqrs",
    title: "Medication administration error",
    serviceUser: "Margaret Johnson",
    reportedBy: "Bob Smith",
    date: "2/14/2024",
    time: "2/14/2024 at 08:15 AM",
    attachmentsCount: 2,
    status: "Pending",
    statusDetails: "Pending review",
    severity: "Critical",
    location: "Bedroom",
    designation: "Bob Smith",
    incidentTypes: ["Medical / emergency", "Near miss"],
    description: "Dosage delayed by 45 minutes due to shift handover discrepancy. Service user monitored, no adverse effects observed.",
    attachments: [
      { name: "med-log.jpg", type: "image" },
      { name: "handover-report.pdf", type: "pdf" },
    ],
  },
  {
    id: "INC-003",
    incidentId: "EQ4452Wxyz",
    title: "Equipment malfunction - Hoist",
    serviceUser: "Patricia Davis",
    reportedBy: "Carol Davis",
    date: "2/13/2024",
    time: "2/13/2024 at 02:20 PM",
    attachmentsCount: 2,
    status: "Approved",
    statusDetails: "Resolved",
    severity: "Medium",
    location: "Lounge",
    designation: "Carol Davis",
    incidentTypes: ["Damage / abuse", "Near miss"],
    description: "Battery failed on portable transfer hoist during transfer. Backup battery installed immediately. No injury occurred.",
    attachments: [
      { name: "hoist-photo.jpg", type: "image" },
      { name: "maintenance-ticket.pdf", type: "pdf" },
    ],
  },
  {
    id: "INC-004",
    incidentId: "BH9910Lmnk",
    title: "Behavioral incident",
    serviceUser: "George Wilson",
    reportedBy: "David Wilson",
    date: "2/15/2024",
    time: "2/15/2024 at 12:40 PM",
    attachmentsCount: 2,
    status: "Approved",
    statusDetails: "Approved",
    severity: "Medium",
    location: "Dining Hall",
    designation: "David Wilson",
    incidentTypes: ["Verbal abuse", "Physical assault on service user"],
    description: "Service user became agitated during lunchtime, knocking over tableware. De-escalation techniques successfully applied by care workers.",
    attachments: [
      { name: "incident-summary.pdf", type: "pdf" },
      { name: "witness-statement.docx", type: "doc" },
    ],
  },
  {
    id: "INC-005",
    incidentId: "EM3319Xuvw",
    title: "Emergency call response",
    serviceUser: "John Smith",
    reportedBy: "Eve Martinez",
    date: "2/13/2024",
    time: "2/13/2024 at 11:50 PM",
    attachmentsCount: 2,
    status: "Approved",
    statusDetails: "Approved",
    severity: "High",
    location: "Bedroom",
    designation: "Eve Martinez",
    incidentTypes: ["Medical / emergency", "First aid required"],
    description: "Pendant alarm pressed at night. Care worker responded within 2 minutes. Service user experienced mild vertigo; assisted back to bed and monitored.",
    attachments: [
      { name: "vital-signs.jpg", type: "image" },
      { name: "incident-report.pdf", type: "pdf" },
    ],
  },
];

