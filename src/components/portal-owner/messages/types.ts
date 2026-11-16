export interface ChatContact {
  id: string;
  name: string;
  role: string;
  online: boolean;
  avatarBg: string;
  initials?: string;
}

export interface ChatMessage {
  id: string;
  senderName: string;
  text: string;
  time: string;
  isOwn: boolean;
}

export interface Conversation {
  id: string;
  name: string;
  isGroup: boolean;
  online?: boolean;
  members?: string[];
  avatarBg: string;
  initials?: string;
  lastMessage: string;
  lastTime: string;
  unreadCount: number;
  isTyping?: boolean;
  messages: ChatMessage[];
}

export const CHAT_CONTACTS: ChatContact[] = [
  {
    id: "c1",
    name: "Alice S.",
    role: "Supervisor",
    online: true,
    avatarBg: "bg-gradient-to-br from-lime-400 to-amber-400",
  },
  {
    id: "c2",
    name: "Michael Brown",
    role: "Care worker",
    online: true,
    avatarBg: "bg-gradient-to-br from-sky-500 to-teal-600",
  },
  {
    id: "c3",
    name: "Ocheyi Fagoke",
    role: "Care worker",
    online: true,
    avatarBg: "bg-[#29AAE1]",
    initials: "OF",
  },
  {
    id: "c4",
    name: "Sarah Clarke",
    role: "Care worker",
    online: false,
    avatarBg: "bg-[#29AAE1]",
    initials: "SC",
  },
  {
    id: "c5",
    name: "James Morley",
    role: "Support staff",
    online: true,
    avatarBg: "bg-[#4ADE80]",
    initials: "JM",
  },
  {
    id: "c6",
    name: "Priya Patel",
    role: "Support staff",
    online: false,
    avatarBg: "bg-[#FACC15]",
    initials: "PP",
  },
];

export const INITIAL_CONVERSATIONS: Conversation[] = [
  {
    id: "conv1",
    name: "Alice S.",
    isGroup: false,
    online: true,
    avatarBg: "bg-gradient-to-br from-lime-400 to-amber-400",
    lastMessage: "Can you update the care notes for Margaret?",
    lastTime: "10:32am",
    unreadCount: 2,
    isTyping: true,
    messages: [
      {
        id: "m1",
        senderName: "Alice S.",
        text: "Good morning Emily! How is Margaret doing today?",
        time: "8:15am",
        isOwn: false,
      },
      {
        id: "m2",
        senderName: "Maria",
        text: "Morning! She's in good spirits. Personal care done, medication taken.",
        time: "8:22am",
        isOwn: true,
      },
      {
        id: "m3",
        senderName: "Alice S.",
        text: "Great. Can you update the care notes for Margaret by 3pm? District nurse needs them.",
        time: "10:32am",
        isOwn: false,
      },
    ],
  },
  {
    id: "conv2",
    name: "Michael Brown",
    isGroup: false,
    online: true,
    avatarBg: "bg-gradient-to-br from-sky-500 to-teal-600",
    lastMessage: "Heading to the Fallowfield site now",
    lastTime: "9:45am",
    unreadCount: 0,
    messages: [
      {
        id: "m4",
        senderName: "Michael Brown",
        text: "Heading to the Fallowfield site now",
        time: "9:45am",
        isOwn: false,
      },
    ],
  },
  {
    id: "conv3",
    name: "North region team",
    isGroup: true,
    online: false,
    members: ["Alice S.", "Sarah Clarke", "Ben Giri", "Maria", "Michael Brown", "Priya Patel"],
    avatarBg: "bg-[#29AAE1]",
    initials: "NR",
    lastMessage: "Week 2 rota is now published - please review",
    lastTime: "Yesterday",
    unreadCount: 3,
    isTyping: true,
    messages: [
      {
        id: "m5",
        senderName: "Alice S.",
        text: "Good morning team! Week 2 rota is now published - please check your shifts.",
        time: "Yesterday 9:00am",
        isOwn: false,
      },
      {
        id: "m6",
        senderName: "Sarah Clarke",
        text: "Thanks Alice, checked mine!",
        time: "Yesterday 9:12am",
        isOwn: false,
      },
      {
        id: "m7",
        senderName: "Ben Giri",
        text: "Week 2 rota is now published - please review",
        time: "Yesterday 9:20am",
        isOwn: false,
      },
      {
        id: "m8",
        senderName: "Maria",
        text: "Morning! She's in good spirits. Personal care done, medication taken.",
        time: "Yesterday 9:20am",
        isOwn: true,
      },
    ],
  },
];

