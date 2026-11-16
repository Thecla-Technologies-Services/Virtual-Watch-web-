export type ReferralStatus = "Converted" | "Pending" | "Expired";

export interface ReferralEntry {
  id: string;
  codeId: string;
  referrer: string;
  referredCompany: string;
  referralCode: string;
  date: string;
  status: ReferralStatus;
  reward: string;
}

export const INITIAL_REFERRALS: ReferralEntry[] = [
  {
    id: "1",
    codeId: "REF-001",
    referrer: "Ironclad Security",
    referredCompany: "ABC Homecare",
    referralCode: "IRON-4X2K",
    date: "Mar 12, 2024",
    status: "Converted",
    reward: "1 Month Free",
  },
  {
    id: "2",
    codeId: "REF-002",
    referrer: "Bluewave Financial",
    referredCompany: "Quantum Retail Group",
    referralCode: "IRON-4X2K",
    date: "Apr 5, 2024",
    status: "Converted",
    reward: "Subscription Credit",
  },
  {
    id: "3",
    codeId: "REF-003",
    referrer: "Ironclad Security",
    referredCompany: "NordTech Solutions",
    referralCode: "IRON-4X2K",
    date: "Jun 18, 2024",
    status: "Pending",
    reward: "—",
  },
  {
    id: "4",
    codeId: "REF-004",
    referrer: "ABC Homecare",
    referredCompany: "Cedarwood Health",
    referralCode: "IRON-4X2K",
    date: "Jan 22, 2024",
    status: "Expired",
    reward: "—",
  },
  {
    id: "5",
    codeId: "REF-005",
    referrer: "Bluewave Financial",
    referredCompany: "Apex Logistics",
    referralCode: "IRON-4X2K",
    date: "Nov 3, 2023",
    status: "Converted",
    reward: "Discount Voucher",
  },
];

