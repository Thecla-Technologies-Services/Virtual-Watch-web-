export type AnnouncementType = "Feature" | "Maintenance" | "Compliance";

export interface Announcement {
  id: string;
  title: string;
  message: string;
  type: AnnouncementType;
  audience: string;
  channels: string;
  sentDate: string;
  recipients: number;
  attachmentUrl?: string;
}

export const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: "1",
    title: "v3.4.0 Release - New analytics features",
    message:
      "We have rolled out v3.4.0 featuring enhanced real-time workforce analytics, custom export templates, and improved dashboard performance across all workspaces.",
    type: "Feature",
    audience: "All companies",
    channels: "In-app + Email",
    sentDate: "Jul 1, 2024",
    recipients: 203,
  },
  {
    id: "2",
    title: "Scheduled maintenance - July 10",
    message:
      "Routine infrastructure maintenance is scheduled for July 10 from 02:00 to 03:30 UTC. Brief read-only mode may occur during database indexing.",
    type: "Maintenance",
    audience: "All companies",
    channels: "In-app + Email + Banner",
    sentDate: "Jul 3, 2024",
    recipients: 203,
  },
  {
    id: "3",
    title: "Compliance policy update required",
    message:
      "Please review and acknowledge the updated data retention and safeguarding compliance guidelines before the end of the quarter.",
    type: "Compliance",
    audience: "Enterprise plan",
    channels: "In-app + Email",
    sentDate: "Jun 28, 2024",
    recipients: 47,
  },
  {
    id: "4",
    title: "Referral program now live",
    message:
      "Invite partner organizations to Virtual Watch and earn subscription credits for every qualified workspace that activates.",
    type: "Feature",
    audience: "Active subscribers",
    channels: "In-app",
    sentDate: "Jun 1, 2024",
    recipients: 156,
  },
];

