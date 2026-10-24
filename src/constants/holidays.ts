export interface HolidayRequest {
  id: string;
  requestId: string;
  name: string;
  type: string;
  fromDate: string;
  toDate: string;
  days: string;
  daysCount: number;
  requestedDate: string;
  status: "Approved" | "Under review" | "Pending" | "Rejected";
  reason: string;
  coveringStaff: string;
  notes: string;
  attachment: string;
  balanceBefore: number;
  balanceAfter: number;
}

export const INITIAL_HOLIDAY_REQUESTS: HolidayRequest[] = [
  {
    id: "1",
    requestId: "HJ7789Yijk",
    name: "Alice Johnson",
    type: "Annual leave",
    fromDate: "2/20/2024",
    toDate: "2/23/2024",
    days: "4 days",
    daysCount: 6,
    requestedDate: "2/10/2024",
    status: "Approved",
    reason: "Holiday trip to Spain",
    coveringStaff: "Bob Smith",
    notes: "Will be completely unavailable during this period",
    attachment: "medical-certificate.pdf",
    balanceBefore: 18,
    balanceAfter: 12,
  },
  {
    id: "2",
    requestId: "BS8821Vlmn",
    name: "Bob Smith",
    type: "Sick leave",
    fromDate: "2/13/2024",
    toDate: "2/14/2024",
    days: "2 days",
    daysCount: 2,
    requestedDate: "2/10/2024",
    status: "Approved",
    reason: "Severe fever and flu symptoms",
    coveringStaff: "Carol Davis",
    notes: "Attached doctor prescribed rest note",
    attachment: "doctor-note.pdf",
    balanceBefore: 12,
    balanceAfter: 10,
  },
  {
    id: "3",
    requestId: "CD9943Xqpw",
    name: "Carol Davis",
    type: "Annual leave",
    fromDate: "3/1/2024",
    toDate: "3/10/2024",
    days: "10 days",
    daysCount: 10,
    requestedDate: "2/2/2024",
    status: "Under review",
    reason: "Family wedding and extended vacation",
    coveringStaff: "David Wilson",
    notes: "All shifts have been covered in advance via shift swap",
    attachment: "vacation-itinerary.pdf",
    balanceBefore: 22,
    balanceAfter: 12,
  },
  {
    id: "4",
    requestId: "DW1102Kpoi",
    name: "David Wilson",
    type: "Compassionate leave",
    fromDate: "2/13/2024",
    toDate: "2/13/2024",
    days: "1 day",
    daysCount: 1,
    requestedDate: "2/12/2024",
    status: "Under review",
    reason: "Personal family emergency requiring urgent attention",
    coveringStaff: "Eve Martinez",
    notes: "Available for urgent escalations via text message only",
    attachment: "emergency-leave-form.pdf",
    balanceBefore: 15,
    balanceAfter: 14,
  },
  {
    id: "5",
    requestId: "EM4491Zxcb",
    name: "Eve Martinez",
    type: "Parental leave",
    fromDate: "3/15/2024",
    toDate: "6/15/2024",
    days: "92 days",
    daysCount: 92,
    requestedDate: "2/1/2024",
    status: "Rejected",
    reason: "Maternity leave accommodation and infant care",
    coveringStaff: "Alice Johnson",
    notes: "Requires temporary contractor coverage for the duration",
    attachment: "maternity-documentation.pdf",
    balanceBefore: 120,
    balanceAfter: 28,
  },
];
