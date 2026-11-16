import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, Mail, MoreVertical, Plus, Search } from "lucide-react";
import { Dropdown, DropdownItem } from "@/components/ui/Dropdown";
import { Modal } from "@/components/ui/Modal";

interface EmailRecord {
  id: string;
  subject: string;
  type:
    | "Billing"
    | "Product"
    | "Maintenance"
    | "Onboarding"
    | "Invoice"
    | "Trial";
  sent: string;
  recipient: string;
  status: "Delivered";
  body: string;
}

const TABS = [
  "All",
  "Billing",
  "Product",
  "Maintenance",
  "Onboarding",
  "Invoice",
  "Trial",
] as const;

const INITIAL_EMAILS: EmailRecord[] = [
  {
    id: "em-1",
    subject: "Subscription renewal reminder - 95 days to go",
    type: "Billing",
    sent: "Today 08:00",
    recipient: "maria@mycare.co.uk",
    status: "Delivered",
    body: "Your subscription will renew in 95 days. Please ensure your payment method is up to date.",
  },
  {
    id: "em-2",
    subject: "New feature: Petty Cash module now live",
    type: "Product",
    sent: "2 days ago",
    recipient: "All users",
    status: "Delivered",
    body: "The new Petty Cash module is now available in your workspace.",
  },
  {
    id: "em-3",
    subject: "Scheduled maintenance - 20 May 2:00am UTC",
    type: "Maintenance",
    sent: "5 days ago",
    recipient: "maria@mycare.co.uk",
    status: "Delivered",
    body: "Planned maintenance window on 20 May at 2:00am UTC for 30 minutes.",
  },
  {
    id: "em-4",
    subject: "Welcome to VirtualWatch - getting started guide",
    type: "Onboarding",
    sent: "14 Sep 2024",
    recipient: "maria@mycare.co.uk",
    status: "Delivered",
    body: "Welcome to VirtualWatch! Here is your quick-start onboarding guide.",
  },
  {
    id: "em-5",
    subject: "Your invoice INV-2026-005 is ready",
    type: "Invoice",
    sent: "01 May 2026",
    recipient: "maria@mycare.co.uk",
    status: "Delivered",
    body: "Your monthly invoice INV-2026-005 is ready to view in Billing.",
  },
  {
    id: "em-6",
    subject: "Your trial ends in 3 days",
    type: "Trial",
    sent: "11 Sep 2024",
    recipient: "maria@mycare.co.uk",
    status: "Delivered",
    body: "Your trial period ends in 3 days. Choose a plan to continue uninterrupted.",
  },
];

interface EmailsTabProps {
  adminEmail: string;
}

export function EmailsTab({ adminEmail }: EmailsTabProps) {
  const navigate = useNavigate();
  const [emails, setEmails] = useState<EmailRecord[]>(() =>
    INITIAL_EMAILS.map((em) =>
      em.recipient === "All users" ? em : { ...em, recipient: adminEmail }
    )
  );
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isSendOpen, setIsSendOpen] = useState(false);
  const [toEmail, setToEmail] = useState(adminEmail);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [viewingEmail, setViewingEmail] = useState<EmailRecord | null>(null);

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return emails.filter((em) => {
      if (activeTab !== "All" && em.type !== activeTab) return false;
      if (q) {
        const hay = `${em.subject} ${em.type} ${em.recipient}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [emails, activeTab, searchQuery]);

  const allSelected =
    filtered.length > 0 && filtered.every((em) => selectedIds.includes(em.id));

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!toEmail.trim() || !subject.trim()) return;
    setEmails((prev) => [
      {
        id: `em-${Date.now()}`,
        subject: subject.trim(),
        type: "Billing",
        sent: "Just now",
        recipient: toEmail.trim(),
        status: "Delivered",
        body: message.trim() || "Manual email sent to company administrator.",
      },
      ...prev,
    ]);
    setSubject("");
    setMessage("");
    setIsSendOpen(false);
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-100/80 ">
      {/* Tabs */}
      <div className="flex flex-wrap items-center gap-1 border-b border-slate-100 pb-4 mb-5">
        {TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-[13px] font-medium transition-colors cursor-pointer ${
              activeTab === tab
                ? "bg-[#F4F6F9] text-[#2E3A59] font-semibold"
                : "text-slate-500 hover:text-[#2E3A59]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
        <div className="relative flex-1 max-w-xs">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
            className="w-full h-10 pl-10 pr-4 rounded-full bg-[#F4F6F9] text-[13px] text-[#2E3A59] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#37AADF]/30"
          />
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              setToEmail(adminEmail);
              setIsSendOpen(true);
            }}
            className="h-10 px-4 rounded-full bg-[#F4F6F9] hover:bg-slate-200/70 text-[#2E3A59] text-[13px] font-medium inline-flex items-center gap-2 transition-colors cursor-pointer"
          >
            <Mail className="w-4 h-4 text-slate-500" />
            <span>Send email</span>
          </button>

          <button
            type="button"
            onClick={() => navigate("/portal-owner/announcements")}
            className="h-10 px-4 rounded-full bg-[#37AADF] hover:bg-[#2F99CA] text-white text-[13px] font-medium inline-flex items-center gap-2 transition-colors cursor-pointer"
          >
            <span className="w-4 h-4 rounded-full bg-white/25 flex items-center justify-center">
              <Plus className="w-3 h-3 text-white" />
            </span>
            <span>Announcement</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100 text-[12px] font-semibold text-[#2E3A59]">
              <th className="py-3.5 pl-3 pr-2 w-10">
                <button
                  type="button"
                  onClick={() =>
                    setSelectedIds(
                      allSelected ? [] : filtered.map((em) => em.id)
                    )
                  }
                  aria-label="Select all emails"
                  className={`w-4 h-4 rounded flex items-center justify-center border ${
                    allSelected
                      ? "bg-[#37AADF] border-[#37AADF] text-white"
                      : "border-slate-300 bg-white"
                  }`}
                >
                  {allSelected && <Check className="w-3 h-3" />}
                </button>
              </th>
              <th className="py-3.5 px-3">Subject</th>
              <th className="py-3.5 px-3">Type</th>
              <th className="py-3.5 px-3">Sent</th>
              <th className="py-3.5 px-3">Recipient</th>
              <th className="py-3.5 px-3">Status</th>
              <th className="py-3.5 pl-2 pr-3 w-12 text-right"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-[13px] text-[#2E3A59]">
            {filtered.map((em) => {
              const isSelected = selectedIds.includes(em.id);
              return (
                <tr key={em.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 pl-3 pr-2">
                    <button
                      type="button"
                      onClick={() =>
                        setSelectedIds((prev) =>
                          prev.includes(em.id)
                            ? prev.filter((id) => id !== em.id)
                            : [...prev, em.id]
                        )
                      }
                      aria-label={`Select ${em.subject}`}
                      className={`w-4 h-4 rounded flex items-center justify-center border ${
                        isSelected
                          ? "bg-[#37AADF] border-[#37AADF] text-white"
                          : "border-slate-300 bg-white"
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3" />}
                    </button>
                  </td>
                  <td className="py-3.5 px-3 font-medium">{em.subject}</td>
                  <td className="py-3.5 px-3 text-slate-600 whitespace-nowrap">
                    {em.type}
                  </td>
                  <td className="py-3.5 px-3 text-slate-600 whitespace-nowrap">
                    {em.sent}
                  </td>
                  <td className="py-3.5 px-3 text-slate-600 whitespace-nowrap">
                    {em.recipient}
                  </td>
                  <td className="py-3.5 px-3 whitespace-nowrap">
                    <span className="inline-flex items-center gap-2 text-slate-600">
                      <span className="w-2 h-2 rounded-full bg-[#22C55E]" />
                      {em.status}
                    </span>
                  </td>
                  <td className="py-3.5 pl-2 pr-3 text-right">
                    <Dropdown
                      align="right"
                      trigger={
                        <span className="w-8 h-8 rounded-full bg-[#F4F6F9] hover:bg-slate-200/70 inline-flex items-center justify-center text-slate-500">
                          <MoreVertical className="w-4 h-4" />
                        </span>
                      }
                    >
                      <DropdownItem onClick={() => setViewingEmail(em)}>
                        View
                      </DropdownItem>
                    </Dropdown>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-5 mt-2 border-t border-slate-100 text-[13px]">
        <p className="text-[#2E3A59] font-medium">
          Showing 1 to {filtered.length} of {filtered.length} entries
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled
            className="px-3.5 py-1.5 rounded-lg bg-[#F4F6F9] text-slate-500 opacity-50 text-[12px] font-medium"
          >
            Next
          </button>
          <button
            type="button"
            className="w-8 h-8 rounded-lg bg-[#37AADF] text-white text-[12px] font-semibold"
          >
            1
          </button>
          <button
            type="button"
            disabled
            className="px-3.5 py-1.5 rounded-lg bg-[#F4F6F9] text-slate-500 opacity-50 text-[12px] font-medium"
          >
            Previous
          </button>
        </div>
      </div>

      {/* Send Email Modal */}
      <Modal
        isOpen={isSendOpen}
        onClose={() => setIsSendOpen(false)}
        title="Send email"
        width="max-w-[520px]"
      >
        <form onSubmit={handleSendEmail} className="space-y-4">
          <p className="text-[13px] text-slate-600">
            Manual email to company administrator
          </p>

          <div>
            <label className="block text-[13px] font-medium text-[#2E3A59] mb-1.5">
              To
            </label>
            <input
              type="email"
              required
              value={toEmail}
              onChange={(e) => setToEmail(e.target.value)}
              placeholder="e.g maria@mycare.co.uk"
              className="w-full h-11 px-4 rounded-xl border border-slate-200 text-[13px] text-[#2E3A59] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#37AADF]/30"
            />
          </div>

          <div>
            <label className="block text-[13px] font-medium text-[#2E3A59] mb-1.5">
              Subject
            </label>
            <input
              type="text"
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Email subject"
              className="w-full h-11 px-4 rounded-xl border border-slate-200 text-[13px] text-[#2E3A59] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#37AADF]/30"
            />
          </div>

          <div>
            <label className="block text-[13px] font-medium text-[#2E3A59] mb-1.5">
              Message
            </label>
            <textarea
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter your message"
              className="w-full p-4 rounded-xl border border-slate-200 text-[13px] text-[#2E3A59] placeholder:text-slate-400 resize-none focus:outline-none focus:ring-2 focus:ring-[#37AADF]/30"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="submit"
              className="h-10 px-6 rounded-full bg-[#37AADF] hover:bg-[#2F99CA] text-white text-[13px] font-medium transition-colors cursor-pointer"
            >
              Send email
            </button>
            <button
              type="button"
              onClick={() => setIsSendOpen(false)}
              className="h-10 px-6 rounded-full bg-[#F4F6F9] hover:bg-slate-200/70 text-[#2E3A59] text-[13px] font-medium transition-colors cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>

      {/* View Email Modal */}
      <Modal
        isOpen={Boolean(viewingEmail)}
        onClose={() => setViewingEmail(null)}
        title="Email details"
        width="max-w-[500px]"
      >
        {viewingEmail && (
          <div className="space-y-4 text-[13px]">
            <div>
              <p className="text-slate-400 text-[12px]">Subject</p>
              <p className="font-semibold text-[#2E3A59] mt-0.5">
                {viewingEmail.subject}
              </p>
            </div>
            <div className="flex items-center justify-between text-[12px] text-slate-500 border-y border-slate-100 py-2.5">
              <span>To: {viewingEmail.recipient}</span>
              <span>{viewingEmail.sent}</span>
            </div>
            <p className="text-slate-600 leading-relaxed">{viewingEmail.body}</p>
            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setViewingEmail(null)}
                className="h-9 px-5 rounded-full bg-[#F4F6F9] text-[#2E3A59] text-[12px] font-medium cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

