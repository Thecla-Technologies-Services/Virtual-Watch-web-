export interface Rota {
  id: string;
  title: string;
  period: string;
  staffCount: number;
  shiftsCount: number;
  coverage: number; // percentage
  status: "Approved" | "Published" | "Locked" | "Draft";
  createdBy: string;
  // Details
  rotaId?: string;
  region?: string;
  publishedDate?: string;
  uncoveredShifts?: number;
  roleBreakdown?: {
    careWorkers: number;
    supportStaff: number;
    supervisors: number;
  };
  shiftPatterns?: {
    early: { assigned: number; coverage: number };
    late: { assigned: number; coverage: number };
    night: { assigned: number; coverage: number };
  };
}

export const INITIAL_ROTAS: Rota[] = [
  {
    id: "RT-001",
    title: "North Region - Week 1",
    period: "2/12/2024 - 2/18/20...",
    staffCount: 45,
    shiftsCount: 320,
    coverage: 98,
    status: "Published",
    createdBy: "Alice Johnson",
    rotaId: "HJ7789Yijk",
    region: "North",
    publishedDate: "2/10/2024",
    uncoveredShifts: 6,
    roleBreakdown: {
      careWorkers: 30,
      supportStaff: 10,
      supervisors: 5,
    },
    shiftPatterns: {
      early: { assigned: 15, coverage: 100 },
      late: { assigned: 15, coverage: 98 },
      night: { assigned: 15, coverage: 97 },
    }
  },
  {
    id: "RT-002",
    title: "South Region - Week 1",
    period: "2/12/2024 - 2/18/20...",
    staffCount: 38,
    shiftsCount: 280,
    coverage: 85,
    status: "Draft",
    createdBy: "Bob Smith",
  },
  {
    id: "RT-003",
    title: "East Region - Week 1",
    period: "2/12/2024 - 2/18/20...",
    staffCount: 52,
    shiftsCount: 380,
    coverage: 96,
    status: "Approved",
    createdBy: "Alice Johnson",
  },
  {
    id: "RT-004",
    title: "West Region - Week 1",
    period: "2/12/2024 - 2/18/20...",
    staffCount: 41,
    shiftsCount: 310,
    coverage: 99,
    status: "Locked",
    createdBy: "David Wilson",
  },
  {
    id: "RT-005",
    title: "North Region - Week 2",
    period: "2/19/2024 - 2/25/20...",
    staffCount: 46,
    shiftsCount: 325,
    coverage: 88,
    status: "Draft",
    createdBy: "Eve Martinez",
  },
];
