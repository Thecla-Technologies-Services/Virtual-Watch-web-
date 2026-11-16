export type CompanyStatus = "Active" | "Trial" | "Suspended" | "Expired";

export type SubscriptionPlanId =
  | "free_trial"
  | "starter"
  | "growth"
  | "business"
  | "enterprise";

export interface Company {
  id: string;
  companyCode: string;
  name: string;
  workspace: string;
  plan: string;
  planId: SubscriptionPlanId;
  users: number;
  activeUsers: number;
  disabledUsers: number;
  status: CompanyStatus;
  lastLogin: string;
  registered: string;
  industry: string;
  registrationNumber: string;
  contactEmail: string;
  contactPhone: string;
  address1: string;
  address2?: string;
  postcode: string;
  adminName: string;
  adminEmail: string;
  adminPhone: string;
  adminRole: string;
}

export const INITIAL_COMPANIES: Company[] = [
  {
    id: "1",
    companyCode: "VWAKHDNG12",
    name: "ABC Homecare",
    workspace: "meridian",
    plan: "Enterprise",
    planId: "enterprise",
    users: 48,
    activeUsers: 41,
    disabledUsers: 7,
    status: "Active",
    lastLogin: "2 hours ago",
    registered: "Mar 12, 2024",
    industry: "Healthcare",
    registrationNumber: "REG-2024-001",
    contactEmail: "maria@abccare.co",
    contactPhone: "+27 21 555 0100",
    address1: "12 Cardy Drive, Vic Town, 8001",
    postcode: "8001",
    adminName: "Maria Oche",
    adminEmail: "maria@mira.co",
    adminPhone: "+27 82 000 0000",
    adminRole: "Admin",
  },
  {
    id: "2",
    companyCode: "VWKlnycms24",
    name: "Quantum Retail Group",
    workspace: "quantum-retail",
    plan: "Professional",
    planId: "growth",
    users: 23,
    activeUsers: 21,
    disabledUsers: 2,
    status: "Active",
    lastLogin: "1 day ago",
    registered: "Apr 5, 2024",
    industry: "Retail",
    registrationNumber: "REG-2024-014",
    contactEmail: "james@quantumretail.co",
    contactPhone: "+27 11 555 0142",
    address1: "45 Sandton City, Johannesburg, 2196",
    postcode: "2196",
    adminName: "James Okafor",
    adminEmail: "james@quantumretail.co",
    adminPhone: "+27 82 441 0091",
    adminRole: "Admin",
  },
  {
    id: "3",
    companyCode: "VWKlnycms24",
    name: "NordTech Solutions",
    workspace: "nordtech",
    plan: "Starter",
    planId: "starter",
    users: 8,
    activeUsers: 8,
    disabledUsers: 0,
    status: "Trial",
    lastLogin: "3 hours ago",
    registered: "Jun 18, 2024",
    industry: "Technology",
    registrationNumber: "REG-2024-089",
    contactEmail: "lena@nordtech.io",
    contactPhone: "+46 8 555 0199",
    address1: "88 Sveavagen, Stockholm",
    postcode: "11350",
    adminName: "Lena Müller",
    adminEmail: "lena@nordtech.io",
    adminPhone: "+46 70 123 4567",
    adminRole: "Admin",
  },
  {
    id: "4",
    companyCode: "VWKlnycms24",
    name: "Apex Logistics",
    workspace: "apex-logistics",
    plan: "Professional",
    planId: "growth",
    users: 31,
    activeUsers: 25,
    disabledUsers: 6,
    status: "Suspended",
    lastLogin: "12 days ago",
    registered: "Jan 22, 2024",
    industry: "Logistics",
    registrationNumber: "REG-2024-004",
    contactEmail: "marcus@apexlogistics.co",
    contactPhone: "+44 20 7946 0192",
    address1: "19 Docklands Way, London",
    postcode: "E14 5AB",
    adminName: "Marcus Webb",
    adminEmail: "marcus@apexlogistics.co",
    adminPhone: "+44 77 0090 0123",
    adminRole: "Admin",
  },
  {
    id: "5",
    companyCode: "VWKlnycms24",
    name: "Bluewave Financial",
    workspace: "bluewave-fin",
    plan: "Enterprise",
    planId: "enterprise",
    users: 112,
    activeUsers: 108,
    disabledUsers: 4,
    status: "Active",
    lastLogin: "5 minutes ago",
    registered: "Nov 3, 2023",
    industry: "Finance",
    registrationNumber: "REG-2023-112",
    contactEmail: "priya@bluewave.fin",
    contactPhone: "+44 20 7946 0881",
    address1: "100 Bishopsgate, London",
    postcode: "EC2N 4AG",
    adminName: "Priya Nair",
    adminEmail: "priya@bluewave.fin",
    adminPhone: "+44 77 0090 0881",
    adminRole: "Admin",
  },
  {
    id: "6",
    companyCode: "VWKlnycms24",
    name: "Cedarwood Health",
    workspace: "cedarwood-h",
    plan: "Starter",
    planId: "starter",
    users: 14,
    activeUsers: 10,
    disabledUsers: 4,
    status: "Expired",
    lastLogin: "5 minutes ago",
    registered: "Feb 14, 2024",
    industry: "Healthcare",
    registrationNumber: "REG-2024-028",
    contactEmail: "tom@cedarwoodhealth.co.uk",
    contactPhone: "+44 161 555 0140",
    address1: "7 Cedarwood Lane, Manchester",
    postcode: "M1 2WD",
    adminName: "Tom Briggs",
    adminEmail: "tom@cedarwoodhealth.co.uk",
    adminPhone: "+44 77 0090 0442",
    adminRole: "Admin",
  },
  {
    id: "7",
    companyCode: "VWKlnycms24",
    name: "Ironclad Security",
    workspace: "ironclad-sec",
    plan: "Enterprise",
    planId: "enterprise",
    users: 67,
    activeUsers: 64,
    disabledUsers: 3,
    status: "Active",
    lastLogin: "5 minutes ago",
    registered: "Sep 8, 2023",
    industry: "Security",
    registrationNumber: "REG-2023-076",
    contactEmail: "aiko@ironcladsec.io",
    contactPhone: "+1 415 555 0134",
    address1: "500 Market St, San Francisco",
    postcode: "94105",
    adminName: "Aiko Tanaka",
    adminEmail: "aiko@ironcladsec.io",
    adminPhone: "+1 415 555 0199",
    adminRole: "Admin",
  },
];

