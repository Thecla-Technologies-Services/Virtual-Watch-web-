export interface StaffUser {
  id: string;
  name: string;
  email: string;
  role: "Company Admin" | "Support Worker" | "Nurse" | "Manager";
  department: string;
  status: "Active" | "Invited" | "Inactive";
  phone?: string;
  insuranceNumber?: string;
  image?: string;
  bankName?: string;
  accountNumber?: string;
  accountName?: string;
}

export const INITIAL_STAFF_USERS: StaffUser[] = [
  {
    id: "1",
    name: "Sabrina Marsh",
    email: "sabrina.marsh@medstar.co.uk",
    role: "Company Admin",
    department: "Executive Management",
    status: "Active",
    bankName: "Barclays Bank UK",
    accountNumber: "09847362527",
    accountName: "Sabrina Marsh",
  },
  {
    id: "2",
    name: "Maria Adeyemi",
    email: "maria.adey@gmail.com",
    role: "Support Worker",
    department: "Domiciliary Care",
    status: "Invited",
  },
  {
    id: "3",
    name: "Alice Johnson",
    email: "alice.johnson@medstar.co.uk",
    role: "Support Worker",
    department: "North Region Ward",
    status: "Active",
    bankName: "Lloyds Bank",
    accountNumber: "11223344556",
    accountName: "Alice Johnson",
  },
  {
    id: "4",
    name: "Bob Smith",
    email: "bob.smith@medstar.co.uk",
    role: "Nurse",
    department: "Clinical Services",
    status: "Active",
    bankName: "HSBC UK",
    accountNumber: "99887766554",
    accountName: "Robert Smith",
  },
  {
    id: "5",
    name: "Carol Davis",
    email: "carol.davis@medstar.co.uk",
    role: "Support Worker",
    department: "Community Health",
    status: "Active",
    bankName: "NatWest Bank",
    accountNumber: "44556677889",
    accountName: "Carol Davis",
  },
  {
    id: "6",
    name: "David Wilson",
    email: "david.w@gmail.com",
    role: "Support Worker",
    department: "Night Care Shift",
    status: "Invited",
  },
  {
    id: "7",
    name: "Eve Martinez",
    email: "eve.m@medstar.co.uk",
    role: "Manager",
    department: "Operations",
    status: "Active",
    bankName: "Santander UK",
    accountNumber: "33445566778",
    accountName: "Eve Martinez",
  },
  {
    id: "8",
    name: "Inalegwu Ehi",
    email: "i.ehi@medstar.co.uk",
    role: "Support Worker",
    department: "Temporary Relief",
    status: "Inactive",
    bankName: "Monzo Bank",
    accountNumber: "55667788990",
    accountName: "Inalegwu Ehi",
  },
];
