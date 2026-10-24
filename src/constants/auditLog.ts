export interface AuditLogEntry {
  id: string;
  timestamp: string;
  user: string;
  resource: string;
  details: string;
  ipAddress: string;
  status: "Created" | "Updated" | "Approved" | "Deleted";
}

export const INITIAL_AUDIT_LOG_ENTRIES: AuditLogEntry[] = [
  {
    id: "1",
    timestamp: "2024-02-13 14:35:22",
    user: "Alice Johnson",
    resource: "Rota - North Region We...",
    details: "Published rota for 45 staff",
    ipAddress: "192.168.1.100",
    status: "Created",
  },
  {
    id: "2",
    timestamp: "2024-02-13 14:20:15",
    user: "Bob Smith",
    resource: "Service user - John Smith",
    details: "Updated risk assessment notes",
    ipAddress: "192.168.1.105",
    status: "Updated",
  },
  {
    id: "3",
    timestamp: "2024-02-13 13:45:08",
    user: "Carol Davis",
    resource: "Leave request - 5 days",
    details: "Approved annual leave for Sarah",
    ipAddress: "192.168.1.110",
    status: "Approved",
  },
  {
    id: "4",
    timestamp: "2024-02-13 13:22:44",
    user: "David Wilson",
    resource: "Task assignment",
    details: "Removed obsolete care plan task",
    ipAddress: "192.168.1.115",
    status: "Deleted",
  },
  {
    id: "5",
    timestamp: "2024-02-13 11:10:30",
    user: "Eve Martinez",
    resource: "Petty cash claim",
    details: "Created petty cash claim £32.75",
    ipAddress: "192.168.1.120",
    status: "Created",
  },
  {
    id: "6",
    timestamp: "2024-02-13 10:45:12",
    user: "Alice Johnson",
    resource: "Incident management",
    details: "Updated medication error report #002",
    ipAddress: "192.168.1.125",
    status: "Updated",
  },
  {
    id: "7",
    timestamp: "2024-02-12 16:50:01",
    user: "Sarah Jones",
    resource: "Timesheet - Ward B",
    details: "Approved timesheets for week 6",
    ipAddress: "192.168.1.130",
    status: "Approved",
  },
  {
    id: "8",
    timestamp: "2024-02-12 14:15:20",
    user: "Inalegwu Ehi",
    resource: "User management",
    details: "Deleted inactive temp account",
    ipAddress: "192.168.1.135",
    status: "Deleted",
  },
];
