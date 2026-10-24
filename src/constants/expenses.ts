export interface PettyCashItem {
  id: string;
  reference: string;
  description: string;
  type: "Petty cash" | "Reimbursement";
  amount: string;
  numericAmount: number;
  submittedBy: string;
  date: string;
  expenseDate: string;
  status: "Approved" | "Pending" | "Rejected";
  attachmentsCount: number;
  attachmentName: string;
  quantity: number;
  category: "Supplies" | "Travel" | "Equipment" | "Training" | "Other";
  notes: string;
}

export const INITIAL_PETTY_CASH_ITEMS: PettyCashItem[] = [
  {
    id: "1",
    reference: "INV-2024-001234",
    description: "Office supplies - printer paper",
    type: "Petty cash",
    amount: "£45.60",
    numericAmount: 45.60,
    submittedBy: "Alice Johnson",
    date: "2/13/2024",
    expenseDate: "2/13/2024",
    status: "Approved",
    attachmentsCount: 1,
    attachmentName: "receipt-printer-paper.pdf",
    quantity: 4,
    category: "Supplies",
    notes: "Purchased 5 reams of A4 80gsm white paper for office use",
  },
  {
    id: "2",
    reference: "INV-2024-001872",
    description: "Staff training - fuel mileage",
    type: "Reimbursement",
    amount: "£120.00",
    numericAmount: 120.00,
    submittedBy: "Bob Smith",
    date: "3/1/2024",
    expenseDate: "2/28/2024",
    status: "Pending",
    attachmentsCount: 1,
    attachmentName: "fuel-receipt-travel.pdf",
    quantity: 1,
    category: "Travel",
    notes: "Round trip fuel expenses for mandatory health safety workshop in Birmingham",
  },
  {
    id: "3",
    reference: "INV-2024-002011",
    description: "Care equipment - sanitary items",
    type: "Petty cash",
    amount: "£185.50",
    numericAmount: 185.50,
    submittedBy: "Carol Davis",
    date: "2/13/2024",
    expenseDate: "2/11/2024",
    status: "Pending",
    attachmentsCount: 1,
    attachmentName: "sanitary-supplies-invoice.pdf",
    quantity: 12,
    category: "Equipment",
    notes: "Emergency restock of sanitary gloves and sterilization equipment for Ward B",
  },
  {
    id: "4",
    reference: "INV-2024-000951",
    description: "Staff certification courses",
    type: "Reimbursement",
    amount: "£250.00",
    numericAmount: 250.00,
    submittedBy: "David Wilson",
    date: "2/10/2024",
    expenseDate: "2/05/2024",
    status: "Approved",
    attachmentsCount: 1,
    attachmentName: "course-registration-fee.pdf",
    quantity: 1,
    category: "Training",
    notes: "Advanced first-aid and CPR annual renewal certification fee",
  },
  {
    id: "5",
    reference: "INV-2024-001103",
    description: "Personal coffee - night shift",
    type: "Petty cash",
    amount: "£32.75",
    numericAmount: 32.75,
    submittedBy: "Eve Martinez",
    date: "2/13/2024",
    expenseDate: "2/12/2024",
    status: "Rejected",
    attachmentsCount: 1,
    attachmentName: "coffee-shop-receipt.pdf",
    quantity: 3,
    category: "Other",
    notes: "Coffee and snacks purchased during emergency overnight staff coverage",
  },
];

export interface RequestedItem {
  id: string;
  date: string;
  item: string;
  category: string;
  qtyOrdered: number;
  qtyDelivered?: number;
  requestedBy: string;
  status: "Approved" | "Pending" | "Rejected" | "Submitted" | "Status";
}

export const INITIAL_REQUESTED_ITEMS: RequestedItem[] = [
  {
    id: "1",
    date: "2026-04-10",
    item: "Lettuce",
    category: "Vegetables",
    qtyOrdered: 3,
    requestedBy: "Alice Johnson",
    status: "Approved",
  },
  {
    id: "2",
    date: "2026-04-10",
    item: "Milk",
    category: "Diary",
    qtyOrdered: 4,
    requestedBy: "Alice Johnson",
    status: "Pending",
  },
  {
    id: "3",
    date: "2026-04-11",
    item: "Bread",
    category: "Bakery",
    qtyOrdered: 2,
    requestedBy: "Alice Johnson",
    status: "Pending",
  },
  {
    id: "4",
    date: "2026-04-11",
    item: "Avocado",
    category: "Fruits",
    qtyOrdered: 5,
    requestedBy: "Alice Johnson",
    status: "Approved",
  },
  {
    id: "5",
    date: "2026-04-12",
    item: "Bleach",
    category: "Cleaning product",
    qtyOrdered: 2,
    requestedBy: "Alice Johnson",
    status: "Rejected",
  },
  {
    id: "6",
    date: "2026-04-12",
    item: "Toilet rolls",
    category: "Household items",
    qtyOrdered: 1,
    requestedBy: "Alice Johnson",
    status: "Submitted",
  },
];

export interface InstockItem {
  id: string;
  date: string;
  item: string;
  category: string;
  qtyOrdered: number;
  qtyDelivered: number;
  useBefore: string;
  unitPrice: string;
  total: string;
  requestedBy: string;
}

export const INITIAL_INSTOCK_ITEMS: InstockItem[] = [
  {
    id: "1",
    date: "2026-04-10",
    item: "Lettuce",
    category: "Vegetables",
    qtyOrdered: 3,
    qtyDelivered: 3,
    useBefore: "2026-04-14",
    unitPrice: "£1.20",
    total: "£3.60",
    requestedBy: "Alice Johnson",
  },
  {
    id: "2",
    date: "2026-04-10",
    item: "Milk",
    category: "Diary",
    qtyOrdered: 4,
    qtyDelivered: 4,
    useBefore: "2026-04-15",
    unitPrice: "£1.10",
    total: "£4.40",
    requestedBy: "Alice Johnson",
  },
  {
    id: "3",
    date: "2026-04-11",
    item: "Bread",
    category: "Bakery",
    qtyOrdered: 2,
    qtyDelivered: 2,
    useBefore: "2026-04-14",
    unitPrice: "£1.50",
    total: "£3.00",
    requestedBy: "Alice Johnson",
  },
  {
    id: "4",
    date: "2026-04-11",
    item: "Avocado",
    category: "Fruits",
    qtyOrdered: 5,
    qtyDelivered: 4,
    useBefore: "2026-04-16",
    unitPrice: "£0.90",
    total: "£3.60",
    requestedBy: "Alice Johnson",
  },
  {
    id: "5",
    date: "2026-04-12",
    item: "Bleach",
    category: "Cleaning product",
    qtyOrdered: 2,
    qtyDelivered: 2,
    useBefore: "----",
    unitPrice: "£2.40",
    total: "£4.80",
    requestedBy: "Alice Johnson",
  },
  {
    id: "6",
    date: "2026-04-12",
    item: "Toilet rolls",
    category: "Household items",
    qtyOrdered: 1,
    qtyDelivered: 1,
    useBefore: "----",
    unitPrice: "£5.99",
    total: "£5.99",
    requestedBy: "Alice Johnson",
  },
];
