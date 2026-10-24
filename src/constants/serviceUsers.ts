// Service User Interface
export interface ServiceUser {
  id: string;
  name: string;
  age: number;
  address: string;
  primaryCarer: string;
  riskLevel: "High" | "Medium" | "Low";
  status: "Active" | "Deactivated";
  assignedStaff?: { id: number; name: string }[];
  incidents?: { id: number; title: string; date: string }[];
  auditHistory?: { createdBy: string; createdAt: string };
  // New optional fields
  phone?: string;
  email?: string;
  emergencyContact?: { name: string; relation: string; phone: string; };
  medicalInfo?: {
    conditions?: string[];
    allergies?: string[];
    medications?: string[];
    notes?: string;
    riskFlags?: string[];
  };
  careTeam?: {
    primary: string;
    secondary?: string;
  };
}

// Initial Mock Data
export const INITIAL_USERS: ServiceUser[] = [
  {
    id: "SU-001",
    name: "Margaret Johnson",
    age: 78,
    address: "123 Care Lane, London",
    primaryCarer: "Alice Johnson",
    riskLevel: "High",
    status: "Active",
    assignedStaff: [
      { id: 1, name: "John Doe" },
      { id: 2, name: "Alice Johnson" },
      { id: 3, name: "Bob Smith" },
    ],
    incidents: [
      { id: 1, title: "Fall incident - Bathroom", date: "2025-02-11" },
      { id: 2, title: "Fall incident - Bathroom", date: "2025-02-10" },
    ],
    auditHistory: {
      createdBy: "manager@healthcare.uk",
      createdAt: "1/10/2023, 10:00:00 AM",
    },
    phone: "+44 20 1234 5678",
    email: "margaret.johnson@example.com",
    emergencyContact: {
      name: "Sarah Thompson",
      relation: "Daughter",
      phone: "+44 7700 999888"
    },
    medicalInfo: {
      conditions: ["Hypertension", "Osteoarthritis", "Type 2 diabetes"],
      allergies: ["Allergy 1", "Allergy 2", "Allergy 3"],
      medications: ["Lisinopril 10mg daily", "Ibuprofen as needed"],
      notes: "Requires assistance with mobility.",
      riskFlags: ["Fall risk", "Memory loss", "Medication management"]
    },
    careTeam: {
      primary: "John Doe",
      secondary: "Alice Johnson"
    }
  },
  {
    id: "SU-002",
    name: "Margaret Johnson",
    age: 78,
    address: "123 Care Lane, London",
    primaryCarer: "Alice Johnson",
    riskLevel: "Medium",
    status: "Active",
    assignedStaff: [
      { id: 1, name: "John Doe" },
    ],
    incidents: [],
    auditHistory: {
      createdBy: "admin@healthcare.uk",
      createdAt: "5/12/2023, 09:30:00 AM",
    },
    phone: "+44 20 7946 0999",
    email: "margaret2.johnson@example.com",
    emergencyContact: {
      name: "John Smith",
      relation: "Son",
      phone: "+44 7700 111222"
    },
    medicalInfo: {
      conditions: [],
      allergies: [],
      medications: [],
      notes: "",
      riskFlags: []
    },
    careTeam: {
      primary: "John Doe"
    }
  },
  {
    id: "SU-003",
    name: "Margaret Johnson",
    age: 78,
    address: "123 Care Lane, London",
    primaryCarer: "Alice Johnson",
    riskLevel: "Low",
    status: "Active",
    assignedStaff: [
      { id: 2, name: "Alice Johnson" },
      { id: 3, name: "Bob Smith" },
    ],
    incidents: [
      { id: 3, title: "Medication missed", date: "2025-01-15" },
    ],
    auditHistory: {
      createdBy: "supervisor@healthcare.uk",
      createdAt: "2/15/2024, 14:20:00 PM",
    },
    phone: "+44 20 7946 0111",
    email: "margaret3.johnson@example.com",
    emergencyContact: {
      name: "Emma Davis",
      relation: "Sister",
      phone: "+44 7700 333444"
    },
    medicalInfo: {
      conditions: ["Diabetes"],
      allergies: ["None"],
      medications: ["Metformin 500mg twice a day"],
      notes: "Monitor blood sugar levels daily.",
      riskFlags: ["Medication management"]
    },
    careTeam: {
      primary: "Alice Johnson",
      secondary: "Bob Smith"
    }
  },
  {
    id: "SU-004",
    name: "Margaret Johnson",
    age: 78,
    address: "123 Care Lane, London",
    primaryCarer: "Alice Johnson",
    riskLevel: "High",
    status: "Active"
  },
  {
    id: "SU-005",
    name: "Margaret Johnson",
    age: 78,
    address: "123 Care Lane, London",
    primaryCarer: "Alice Johnson",
    riskLevel: "High",
    status: "Active"
  },
  {
    id: "SU-006",
    name: "Margaret Johnson",
    age: 78,
    address: "123 Care Lane, London",
    primaryCarer: "Alice Johnson",
    riskLevel: "High",
    status: "Active"
  },
  {
    id: "SU-007",
    name: "Margaret Johnson",
    age: 78,
    address: "123 Care Lane, London",
    primaryCarer: "Alice Johnson",
    riskLevel: "High",
    status: "Active"
  },
  {
    id: "SU-008",
    name: "Margaret Johnson",
    age: 78,
    address: "123 Care Lane, London",
    primaryCarer: "Alice Johnson",
    riskLevel: "High",
    status: "Active"
  },
  {
    id: "SU-009",
    name: "Albert Einstein",
    age: 85,
    address: "112 Princeton Ave, New Jersey",
    primaryCarer: "Sarah Jones",
    riskLevel: "Low",
    status: "Deactivated"
  },
  {
    id: "SU-010",
    name: "Arthur Pendragon",
    age: 65,
    address: "Camelot Castle, Cornwall",
    primaryCarer: "Marcus Vance",
    riskLevel: "Medium",
    status: "Deactivated"
  }
];
