export type HandoverPriority = "Normal" | "High" | "Urgent";
export type HandoverStatus = "Awaiting confirmation" | "Confirmed";
export type MarkerSeverity = "Mild" | "Moderate" | "Severe";

export interface BodyMarker {
  id: string;
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  type: string;
  severity: MarkerSeverity;
  notes: string;
}

export interface PendingTaskItem {
  id: string;
  label: string;
  completed: boolean;
}

export interface HandoverReportItem {
  id: string;
  serviceUser: string;
  from: string;
  to: string;
  shift: string;
  date: string;
  priority: HandoverPriority;
  status: HandoverStatus;
  notes: string;
  riskFlags: string[];
  pendingTasks: PendingTaskItem[];
  bodyMarkers: BodyMarker[];
}

export const INITIAL_HANDOVERS: HandoverReportItem[] = [
  {
    id: "ho-1",
    serviceUser: "SU-001 – Margaret Thompson",
    from: "Sarah Collins",
    to: "Daniel Adeyemi",
    shift: "Morning → Afternoon",
    date: "2026-04-11",
    priority: "High",
    status: "Awaiting confirmation",
    notes:
      "Service user had a fall this morning. Left forearm bruised. Mood low. All medications given at 8am. Please monitor throughout shift.",
    riskFlags: [
      "Fall risk – use frame at all times",
      "Low mood – companionship needed",
    ],
    pendingTasks: [
      { id: "pt-1", label: "Afternoon medication", completed: false },
      { id: "pt-2", label: "Evening meal prep", completed: false },
      { id: "pt-3", label: "Change bedding", completed: true },
    ],
    bodyMarkers: [
      {
        id: "bm-1",
        x: 28,
        y: 44,
        type: "Left forearm bruise",
        severity: "Moderate",
        notes: "Dark purple, ~3cm",
      },
      {
        id: "bm-2",
        x: 62,
        y: 72,
        type: "Leg swelling",
        severity: "Severe",
        notes: "Dark purple, ~3cm",
      },
      {
        id: "bm-3",
        x: 56,
        y: 16,
        type: "Eyes redness",
        severity: "Mild",
        notes: "Dark purple, ~3cm",
      },
    ],
  },
  {
    id: "ho-2",
    serviceUser: "SU-002 – James Okafor",
    from: "Daniel Adeyemi",
    to: "Priya Sharma",
    shift: "Afternoon → Night",
    date: "2026-04-10",
    priority: "Normal",
    status: "Confirmed",
    notes:
      "All tasks completed. Medication given on time. Good mood today.",
    riskFlags: [],
    pendingTasks: [
      { id: "pt-4", label: "Night fluid check", completed: true },
    ],
    bodyMarkers: [],
  },
];

