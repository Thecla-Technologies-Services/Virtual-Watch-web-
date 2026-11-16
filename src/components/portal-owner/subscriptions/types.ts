export type SubscriptionStatus = "Active" | "Trial" | "Suspended" | "Expired";

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  userLimit: string;
  features: string[];
  companiesCount: number;
}

export interface CompanySubscription {
  id: string;
  company: string;
  workspace: string;
  currentPlan: string;
  startDate: string;
  amount: string;
  nextRenewal: string;
  status: SubscriptionStatus;
}

export const INITIAL_PLANS: SubscriptionPlan[] = [
  {
    id: "starter",
    name: "Starter",
    price: 49,
    userLimit: "Up to 5 users",
    features: [
      "Core dashboard",
      "Basic reports",
      "Email support",
      "1 admin user",
    ],
    companiesCount: 38,
  },
  {
    id: "growth",
    name: "Growth",
    price: 149,
    userLimit: "Up to 20 users",
    features: [
      "Everything in Starter",
      "Advanced reports",
      "Priority email support",
      "5 admin users",
    ],
    companiesCount: 62,
  },
  {
    id: "business",
    name: "Business",
    price: 349,
    userLimit: "Up to 100 users",
    features: [
      "Everything in Growth",
      "API access",
      "Live chat support",
      "Custom integrations",
    ],
    companiesCount: 56,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 890,
    userLimit: "Unlimited users",
    features: [
      "Everything in Business",
      "Dedicated support",
      "SLA guarantees",
      "Custom onboarding",
    ],
    companiesCount: 47,
  },
];

export const INITIAL_SUBSCRIPTIONS: CompanySubscription[] = [
  {
    id: "sub-1",
    company: "ABC Homecare",
    workspace: "meridian",
    currentPlan: "Enterprise",
    startDate: "Mar 12, 2024",
    amount: "$890.00",
    nextRenewal: "Aug 1, 2024",
    status: "Active",
  },
  {
    id: "sub-2",
    company: "Quantum Retail Group",
    workspace: "quantum-retail",
    currentPlan: "Growth",
    startDate: "Apr 5, 2024",
    amount: "$149.00",
    nextRenewal: "Aug 1, 2024",
    status: "Active",
  },
  {
    id: "sub-3",
    company: "NordTech Solutions",
    workspace: "nordtech",
    currentPlan: "Starter",
    startDate: "Jun 18, 2024",
    amount: "$49.00",
    nextRenewal: "Aug 1, 2024",
    status: "Trial",
  },
  {
    id: "sub-4",
    company: "Apex Logistics",
    workspace: "apex-logistics",
    currentPlan: "Business",
    startDate: "Jan 22, 2024",
    amount: "$349.00",
    nextRenewal: "Aug 1, 2024",
    status: "Suspended",
  },
  {
    id: "sub-5",
    company: "Bluewave Financial",
    workspace: "bluewave-fin",
    currentPlan: "Enterprise",
    startDate: "Nov 3, 2023",
    amount: "$890.00",
    nextRenewal: "Aug 1, 2024",
    status: "Active",
  },
  {
    id: "sub-6",
    company: "Cedarwood Health",
    workspace: "cedarwood-h",
    currentPlan: "Starter",
    startDate: "Feb 14, 2024",
    amount: "$49.00",
    nextRenewal: "Aug 1, 2024",
    status: "Expired",
  },
  {
    id: "sub-7",
    company: "Ironclad Security",
    workspace: "ironclad-sec",
    currentPlan: "Enterprise",
    startDate: "Sep 8, 2023",
    amount: "$890.00",
    nextRenewal: "Aug 1, 2024",
    status: "Active",
  },
  {
    id: "sub-8",
    company: "Silverline Care",
    workspace: "silverline-c",
    currentPlan: "Business",
    startDate: "May 2, 2024",
    amount: "$349.00",
    nextRenewal: "Aug 1, 2024",
    status: "Active",
  },
];

