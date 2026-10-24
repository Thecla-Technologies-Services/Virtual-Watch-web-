export interface TaskSubtask {
  id: string;
  title: string;
  completed: boolean;
  note?: string;
}

export interface TaskItem {
  id: string;
  taskId: string;
  title: string;
  serviceUser: string;
  assignedTo: string[];
  dueDate: string;
  type: string;
  status: "Approved" | "Pending" | "Draft";
  priority: "High" | "Medium" | "Low";
  estimatedTime: string;
  createdBy: string;
  startDate: string;
  startTime: string;
  endTime: string;
  description: string;
  importantNotes?: string;
  subtasks: TaskSubtask[];
}

export const INITIAL_TASKS: TaskItem[] = [
  {
    id: "1",
    taskId: "HJ7789Yijk",
    title: "Morning care for Mr. Smith",
    serviceUser: "John Smith",
    assignedTo: ["Alice Johnson", "Bob Smith", "Carol Davis"],
    dueDate: "2/13/2024",
    type: "Care Task",
    status: "Approved",
    priority: "High",
    estimatedTime: "45 minutes",
    createdBy: "Bob Smith",
    startDate: "2/10/2024",
    startTime: "09:00 AM",
    endTime: "09:00 AM",
    description:
      "Provide morning care routine including washing, dressing, and breakfast preparation for Mr. Smith.",
    importantNotes:
      "Mr. Smith may have difficulty with left arm mobility. Provide extra assistance if needed.",
    subtasks: [
      {
        id: "s1",
        title: "Morning wash and hygiene",
        completed: true,
        note: "Note from the carer: Mr. Smith may have difficulty with left arm mobility. Provide extra assistance if needed.",
      },
      {
        id: "s2",
        title: "Assist with dressing",
        completed: true,
      },
      {
        id: "s3",
        title: "Prepare and serve breakfast",
        completed: true,
      },
      {
        id: "s4",
        title: "Medication administration",
        completed: false,
      },
      {
        id: "s5",
        title: "Initial health check",
        completed: false,
      },
    ],
  },
  {
    id: "2",
    taskId: "MK9021Xxyz",
    title: "Medication review",
    serviceUser: "Margaret Johnson",
    assignedTo: ["Bob Smith", "Eve Martinez"],
    dueDate: "2/14/2024",
    type: "Medical",
    status: "Pending",
    priority: "High",
    estimatedTime: "30 minutes",
    createdBy: "Sarah Jones",
    startDate: "2/14/2024",
    startTime: "11:00 AM",
    endTime: "11:30 AM",
    description:
      "Conduct a weekly medication dosage review and log updated vital records in the system.",
    importantNotes:
      "Check blood pressure before administering the second dose.",
    subtasks: [
      {
        id: "s1",
        title: "Check vitals and blood pressure",
        completed: true,
      },
      {
        id: "s2",
        title: "Verify pill count with inventory",
        completed: false,
      },
      {
        id: "s3",
        title: "Log adjustments in clinical chart",
        completed: false,
      },
    ],
  },
  {
    id: "3",
    taskId: "WC4451Aabc",
    title: "Wellness check",
    serviceUser: "Patricia Davis",
    assignedTo: ["Carol Davis"],
    dueDate: "2/13/2024",
    type: "Check-in",
    status: "Approved",
    priority: "Medium",
    estimatedTime: "20 minutes",
    createdBy: "Bob Smith",
    startDate: "2/13/2024",
    startTime: "02:00 PM",
    endTime: "02:20 PM",
    description: "Afternoon wellness check and brief conversation with client.",
    subtasks: [
      {
        id: "s1",
        title: "Confirm comfort and hydration levels",
        completed: true,
      },
      {
        id: "s2",
        title: "Review daily schedule with client",
        completed: true,
      },
    ],
  },
  {
    id: "4",
    taskId: "DU8812Lopq",
    title: "Document update",
    serviceUser: "George Wilson",
    assignedTo: ["David Wilson"],
    dueDate: "2/15/2024",
    type: "Admin",
    status: "Draft",
    priority: "Low",
    estimatedTime: "60 minutes",
    createdBy: "Sarah Jones",
    startDate: "2/15/2024",
    startTime: "10:00 AM",
    endTime: "11:00 AM",
    description:
      "Update quarterly care documentation and risk assessment paperwork.",
    subtasks: [
      {
        id: "s1",
        title: "Draft revised care plan",
        completed: false,
      },
      {
        id: "s2",
        title: "Obtain supervisor signature",
        completed: false,
      },
    ],
  },
  {
    id: "5",
    taskId: "EM3390Vzxy",
    title: "Emergency call response",
    serviceUser: "John Smith",
    assignedTo: ["Eve Martinez", "Alice Johnson"],
    dueDate: "2/13/2024",
    type: "Emergency",
    status: "Approved",
    priority: "High",
    estimatedTime: "15 minutes",
    createdBy: "System Alarm",
    startDate: "2/13/2024",
    startTime: "03:15 AM",
    endTime: "03:30 AM",
    description:
      "Respond to bedroom pendant alarm triggered during early morning hours.",
    importantNotes: "False alarm - client accidentally pushed pendant in sleep.",
    subtasks: [
      {
        id: "s1",
        title: "Arrive on site and verify patient safety",
        completed: true,
      },
      {
        id: "s2",
        title: "Reset pendant system and log incident",
        completed: true,
      },
    ],
  },
  {
    id: "6",
    taskId: "ES1192Kmno",
    title: "Evening mobility support",
    serviceUser: "Margaret Johnson",
    assignedTo: ["Alice Johnson"],
    dueDate: "2/16/2024",
    type: "Care Task",
    status: "Pending",
    priority: "Medium",
    estimatedTime: "40 minutes",
    createdBy: "Bob Smith",
    startDate: "2/16/2024",
    startTime: "07:30 PM",
    endTime: "08:10 PM",
    description: "Assist client from evening lounge chair into bed.",
    subtasks: [
      {
        id: "s1",
        title: "Prepare bedroom and hoist equipment",
        completed: false,
      },
      {
        id: "s2",
        title: "Assist transfer into bed",
        completed: false,
      },
    ],
  },
  {
    id: "7",
    taskId: "WV7781Nnmm",
    title: "Weekly vital signs check",
    serviceUser: "Patricia Davis",
    assignedTo: ["Bob Smith"],
    dueDate: "2/17/2024",
    type: "Medical",
    status: "Approved",
    priority: "Low",
    estimatedTime: "25 minutes",
    createdBy: "Sarah Jones",
    startDate: "2/17/2024",
    startTime: "09:30 AM",
    endTime: "09:55 AM",
    description: "Record weekly routine temperature, pulse, and oxygen saturation.",
    subtasks: [
      {
        id: "s1",
        title: "Measure vitals",
        completed: false,
      },
      {
        id: "s2",
        title: "Upload data to system portal",
        completed: false,
      },
    ],
  },
  {
    id: "8",
    taskId: "CA9901Zpol",
    title: "Care plan audit",
    serviceUser: "George Wilson",
    assignedTo: ["Sarah Jones", "David Wilson"],
    dueDate: "2/18/2024",
    type: "Admin",
    status: "Draft",
    priority: "Medium",
    estimatedTime: "90 minutes",
    createdBy: "Inalegwu Ehi",
    startDate: "2/18/2024",
    startTime: "01:00 PM",
    endTime: "02:30 PM",
    description: "Annual comprehensive care plan audit and compliance inspection.",
    subtasks: [
      {
        id: "s1",
        title: "Audit file records against guidelines",
        completed: false,
      },
    ],
  },
];
