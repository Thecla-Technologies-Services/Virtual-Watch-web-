export type InvoiceStatus = "Paid" | "Overdue" | "Refund";

export interface FinanceInvoice {
  id: string;
  invoiceNumber: string;
  company: string;
  companyCode: string;
  address: string;
  email: string;
  plan: "Enterprise" | "Professional" | "Starter";
  date: string;
  dueDate: string;
  amount: string;
  numericAmount: number;
  status: InvoiceStatus;
}

export const INITIAL_FINANCE_INVOICES: FinanceInvoice[] = [
  {
    id: "1",
    invoiceNumber: "INV-2024-0072",
    company: "ABC Homecare",
    companyCode: "VWKNGUX12",
    address: "12 Innovation Drive, Cape Town, 8001",
    email: "maria@abc-care.co",
    plan: "Enterprise",
    date: "Mar 12, 2024",
    dueDate: "Jul 1, 2024",
    amount: "$890.00",
    numericAmount: 890,
    status: "Paid",
  },
  {
    id: "2",
    invoiceNumber: "INV-2024-0071",
    company: "Quantum Retail Group",
    companyCode: "VWKNGUX12",
    address: "45 Sandton City, Johannesburg, 2196",
    email: "james@quantumretail.co",
    plan: "Professional",
    date: "Apr 5, 2024",
    dueDate: "Apr 5, 2024",
    amount: "$890.00",
    numericAmount: 890,
    status: "Paid",
  },
  {
    id: "3",
    invoiceNumber: "INV-2024-0070",
    company: "NordTech Solutions",
    companyCode: "VWKNGUX12",
    address: "88 Sveavagen, Stockholm",
    email: "lena@nordtech.io",
    plan: "Starter",
    date: "Jun 18, 2024",
    dueDate: "Jun 18, 2024",
    amount: "$890.00",
    numericAmount: 890,
    status: "Overdue",
  },
  {
    id: "4",
    invoiceNumber: "INV-2024-0069",
    company: "Apex Logistics",
    companyCode: "VWKNGUX12",
    address: "19 Docklands Way, London",
    email: "marcus@apexlogistics.co",
    plan: "Professional",
    date: "Jan 22, 2024",
    dueDate: "Jan 22, 2024",
    amount: "$890.00",
    numericAmount: 890,
    status: "Overdue",
  },
  {
    id: "5",
    invoiceNumber: "INV-2024-0068",
    company: "Bluewave Financial",
    companyCode: "VWKNGUX12",
    address: "100 Bishopsgate, London",
    email: "priya@bluewave.fin",
    plan: "Enterprise",
    date: "Nov 3, 2023",
    dueDate: "Nov 3, 2023",
    amount: "$890.00",
    numericAmount: 890,
    status: "Refund",
  },
  {
    id: "6",
    invoiceNumber: "INV-2024-0067",
    company: "Bluewave Financial",
    companyCode: "VWKNGUX12",
    address: "100 Bishopsgate, London",
    email: "tom@cedarwoodhealth.co.uk",
    plan: "Starter",
    date: "Feb 14, 2024",
    dueDate: "Feb 14, 2024",
    amount: "$890.00",
    numericAmount: 890,
    status: "Overdue",
  },
  {
    id: "7",
    invoiceNumber: "INV-2024-0066",
    company: "Bluewave Financial",
    companyCode: "VWKNGUX12",
    address: "500 Market St, San Francisco",
    email: "aiko@ironcladsec.io",
    plan: "Enterprise",
    date: "Sep 8, 2023",
    dueDate: "Sep 8, 2023",
    amount: "$890.00",
    numericAmount: 890,
    status: "Paid",
  },
];

