import sarahJonesAvatar from "@/assets/sarah_jones.png";
import margaretJohnsonAvatar from "@/assets/margaret_johnson.png";

export type PlatformUserStatus = "Active" | "Disabled";

export type PlatformUserRole =
  | "Administrator"
  | "Manager"
  | "Analyst"
  | "Viewer";

export interface PlatformUser {
  id: string;
  name: string;
  username: string;
  email: string;
  phone: string;
  role: PlatformUserRole;
  company: string;
  status: PlatformUserStatus;
  lastLogin: string;
  avatar: string;
}

export const INITIAL_PLATFORM_USERS: PlatformUser[] = [
  {
    id: "1",
    name: "Alice Johnson",
    username: "@alicejohnson",
    email: "alice@example.com",
    phone: "+27 82 000 0001",
    role: "Administrator",
    company: "ABC Homecare",
    status: "Active",
    lastLogin: "2 hours ago",
    avatar: sarahJonesAvatar,
  },
  {
    id: "2",
    name: "Bob Smith",
    username: "@bobsmith",
    email: "bob@example.com",
    phone: "+27 82 000 0002",
    role: "Manager",
    company: "ABC Homecare",
    status: "Active",
    lastLogin: "1 day ago",
    avatar: margaretJohnsonAvatar,
  },
  {
    id: "3",
    name: "Carol Davis",
    username: "@caroldavis",
    email: "carol@example.com",
    phone: "+27 82 000 0003",
    role: "Analyst",
    company: "ABC Homecare",
    status: "Disabled",
    lastLogin: "1 day ago",
    avatar: sarahJonesAvatar,
  },
  {
    id: "4",
    name: "David Wilson",
    username: "@davidwilson",
    email: "david@example.com",
    phone: "+27 82 000 0004",
    role: "Viewer",
    company: "ABC Homecare",
    status: "Active",
    lastLogin: "3 day ago",
    avatar: margaretJohnsonAvatar,
  },
  {
    id: "5",
    name: "Eve Martinez",
    username: "@evemartinez",
    email: "eve@example.com",
    phone: "+27 82 000 0005",
    role: "Analyst",
    company: "ABC Homecare",
    status: "Active",
    lastLogin: "2 months ago",
    avatar: sarahJonesAvatar,
  },
  {
    id: "6",
    name: "Bob Smith",
    username: "@bobsmith2",
    email: "bob@example.com",
    phone: "+27 82 000 0006",
    role: "Manager",
    company: "ABC Homecare",
    status: "Active",
    lastLogin: "2 months ago",
    avatar: margaretJohnsonAvatar,
  },
  {
    id: "7",
    name: "Bob Smith",
    username: "@bobsmith3",
    email: "bob@example.com",
    phone: "+27 82 000 0007",
    role: "Administrator",
    company: "ABC Homecare",
    status: "Active",
    lastLogin: "6 hours ago",
    avatar: sarahJonesAvatar,
  },
  {
    id: "8",
    name: "Bob Smith",
    username: "@bobsmith4",
    email: "bob@example.com",
    phone: "+27 82 000 0008",
    role: "Administrator",
    company: "Quantum Retail Group",
    status: "Active",
    lastLogin: "4 hours ago",
    avatar: margaretJohnsonAvatar,
  },
  {
    id: "9",
    name: "Bob Smith",
    username: "@bobsmith5",
    email: "bob@example.com",
    phone: "+27 82 000 0009",
    role: "Administrator",
    company: "Bluewave Financial",
    status: "Active",
    lastLogin: "1 day ago",
    avatar: sarahJonesAvatar,
  },
  {
    id: "10",
    name: "Bob Smith",
    username: "@bobsmith6",
    email: "bob@example.com",
    phone: "+27 82 000 0010",
    role: "Viewer",
    company: "Bluewave Financial",
    status: "Active",
    lastLogin: "5 minutes ago",
    avatar: margaretJohnsonAvatar,
  },
  {
    id: "11",
    name: "Alice Johnson",
    username: "@alicej2",
    email: "alice@example.com",
    phone: "+27 82 000 0011",
    role: "Manager",
    company: "Quantum Retail Group",
    status: "Active",
    lastLogin: "30 minutes ago",
    avatar: sarahJonesAvatar,
  },
];

