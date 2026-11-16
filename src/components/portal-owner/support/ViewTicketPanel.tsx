import { useState } from "react";
import {
  ArrowLeft,
  ChevronDown,
  FileText,
  Image as ImageIcon,
  Send,
  X,
} from "lucide-react";
import virtualWatchLogo from "@/assets/virtual-watch.png";
import type { SupportTicket, TicketStatus } from "./types";

interface ViewTicketPanelProps {
  ticket: SupportTicket;
  onBack: () => void;
  onUpdateTicket: (updated: SupportTicket) => void;
}

const STATUS_DOT: Record<TicketStatus, string> = {
  Open: "bg-[#37AADF]",
  "In-progress": "bg-[#F59E0B]",
  Critical: "bg-[#EF4444]",
  Resolved: "bg-[#22C55E]",
  Closed: "bg-slate-400",
  Assigned: "bg-[#A855F7]",
  "Waiting for customer": "bg-[#F59E0B]",
};

export function ViewTicketPanel({
  ticket,
  onBack,
  onUpdateTicket,
}: ViewTicketPanelProps) {
  const [status, setStatus] = useState<TicketStatus>(ticket.status);
  const [assignee, setAssignee] = useState(ticket.assignee);
  const [replyText, setReplyText] = useState("");
  const [attachments, setAttachments] = useState<string[]>(ticket.attachments);

  const handleSendReply = (e?: React.FormEvent) => {
    e?.preventDefault();
    const text = replyText.trim();
    if (!text) return;

    const updated: SupportTicket = {
      ...ticket,
      replies: [
        ...ticket.replies,
        {
          id: String(Date.now()),
          sender: "Virtual watch support",
          text,
          isSupport: true,
        },
      ],
    };
    onUpdateTicket(updated);
    setReplyText("");
  };

  const handleSaveChanges = () => {
    onUpdateTicket({
      ...ticket,
      status,
      assignee,
    });
  };

  const handleMarkResolved = () => {
    setStatus("Resolved");
    onUpdateTicket({
      ...ticket,
      status: "Resolved",
      assignee,
    });
  };

  const handleEscalate = () => {
    setStatus("Critical");
    onUpdateTicket({
      ...ticket,
      status: "Critical",
      priority: "High",
      assignee,
    });
  };

  return (
    <div className="animate-fade-in duration-300 space-y-5 pb-8">
      {/* Top Bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="h-8 w-8 rounded-full bg-white border border-slate-200 hover:bg-slate-50 flex items-center justify-center text-slate-600 transition-colors cursor-pointer"
            aria-label="Back to tickets"
          >
            <ArrowLeft size={15} />
          </button>
          <h1 className="text-base font-extrabold uppercase tracking-tight text-[#333333]">
            VIEW TICKET
          </h1>
        </div>

        <div className="flex items-center gap-2 text-[13px] text-slate-500">
          <span>Dashboard</span>
          <span>/</span>
          <button
            type="button"
            onClick={onBack}
            className="hover:text-[#37AADF] cursor-pointer"
          >
            Support
          </button>
          <span>/</span>
          <span>Tickets</span>
          <span>/</span>
          <span className="text-[#37AADF] font-semibold">
            {ticket.ticketCode}
          </span>
        </div>
      </div>

      {/* Main Split Card */}
      <div className="bg-white rounded-2xl p-6  border border-slate-100/80 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Conversation */}
        <div className="lg:col-span-8 flex flex-col justify-between space-y-6">
          <div>
            {/* Ticket Subject Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-5 border-b border-slate-100">
              <div>
                <h2 className="text-[15px] font-bold text-slate-800">
                  {ticket.fullSubject}
                </h2>
                <div className="flex items-center gap-2 text-[12px] text-slate-400 mt-1">
                  <span>{ticket.company}</span>
                  <span>·</span>
                  <span>{ticket.type}</span>
                  <span>·</span>
                  <span className="inline-flex items-center gap-1.5 text-slate-600 font-medium">
                    <span
                      className={`h-2 w-2 rounded-full ${
                        STATUS_DOT[ticket.status]
                      }`}
                    />
                    {ticket.status}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleMarkResolved}
                className="rounded-full bg-[#22C55E] hover:bg-emerald-600 text-white px-5 py-2 text-[12.5px] font-semibold transition-colors cursor-pointer self-start sm:self-auto"
              >
                Mark resolved
              </button>
            </div>

            {/* Conversation Thread */}
            <div className="pt-6 space-y-5">
              {/* Brand Prompt */}
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-[#EBF7FD] flex items-center justify-center p-1.5 shrink-0">
                  <img
                    src={virtualWatchLogo}
                    alt="Virtual Watch"
                    className="h-6 w-6 object-contain"
                  />
                </div>
                <div>
                  <p className="text-[14px] font-semibold text-slate-800">
                    What do you need help with?
                  </p>
                  <p className="text-[12px] text-slate-400">
                    Get help with your account
                  </p>
                </div>
              </div>

              {/* Support Greeting Card */}
              <div className="rounded-2xl border border-slate-100 overflow-hidden">
                <div className="bg-[#F8FAFC] px-4 py-2.5 flex items-center gap-2 border-b border-slate-100">
                  <span className="h-4 w-4 rounded-full bg-[#37AADF] text-white text-[9px] font-bold flex items-center justify-center">
                    V
                  </span>
                  <span className="text-[12px] font-semibold text-slate-700">
                    Virtual watch support
                  </span>
                </div>
                <div className="p-4 text-[13px] text-slate-600 leading-relaxed">
                  <p>Hi 👋, how can we help?</p>
                  <p className="mt-1">
                    You can describe your issue or select one of the issues
                    below to get started.
                  </p>
                </div>
              </div>

              {/* Customer Message Card */}
              <div className="rounded-2xl border border-slate-100 overflow-hidden">
                <div className="bg-[#F8FAFC] px-4 py-2.5 flex items-center justify-end gap-2 border-b border-slate-100">
                  <span className="h-4 w-4 rounded-full bg-gradient-to-br from-amber-400 to-rose-400 shrink-0" />
                  <span className="text-[12px] font-semibold text-slate-700">
                    {ticket.customerName}
                  </span>
                </div>
                <div className="p-4 space-y-3">
                  <p className="text-[13px] text-slate-600">
                    {ticket.customerMessage}
                  </p>

                  {attachments.length > 0 && (
                    <div className="flex items-center gap-2 flex-wrap">
                      {attachments.map((file) => (
                        <span
                          key={file}
                          className="inline-flex items-center gap-1.5 rounded-full bg-[#F4F6F9] px-3 py-1 text-[11.5px] font-medium text-slate-600"
                        >
                          {file.endsWith(".pdf") ? (
                            <FileText size={12} className="text-[#EF4444]" />
                          ) : (
                            <ImageIcon size={12} className="text-[#37AADF]" />
                          )}
                          <span>{file}</span>
                          <button
                            type="button"
                            onClick={() =>
                              setAttachments((prev) =>
                                prev.filter((f) => f !== file)
                              )
                            }
                            className="text-slate-400 hover:text-slate-700 cursor-pointer"
                          >
                            <X size={11} />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Additional Replies */}
              {ticket.replies.map((rep) => (
                <div
                  key={rep.id}
                  className="rounded-2xl border border-slate-100 overflow-hidden"
                >
                  <div className="bg-[#F8FAFC] px-4 py-2.5 flex items-center gap-2 border-b border-slate-100">
                    <span className="h-4 w-4 rounded-full bg-[#37AADF] text-white text-[9px] font-bold flex items-center justify-center">
                      V
                    </span>
                    <span className="text-[12px] font-semibold text-slate-700">
                      {rep.sender}
                    </span>
                  </div>
                  <div className="p-4 text-[13px] text-slate-600">
                    {rep.text}
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              <div className="inline-flex items-center gap-1.5 rounded-full bg-[#F4F5F7] px-3.5 py-2">
                <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
                <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
              </div>
            </div>
          </div>

          {/* Reply Composer */}
          <form
            onSubmit={handleSendReply}
            className="pt-4 border-t border-slate-100"
          >
            <div className="rounded-2xl bg-[#F4F5F7] p-3.5 flex flex-col justify-between min-h-[82px]">
              <textarea
                rows={2}
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendReply();
                  }
                }}
                placeholder="Reply"
                className="w-full bg-transparent text-[13px] text-slate-700 placeholder:text-slate-400 focus:outline-none resize-none"
              />
              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  className="text-slate-500 hover:text-slate-700 cursor-pointer"
                  title="Attach file"
                >
                  <FileText size={16} />
                </button>
                <button
                  type="submit"
                  className="h-8 w-8 rounded-full bg-[#37AADF] hover:bg-[#2F99CA] text-white flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Send reply"
                >
                  <Send size={14} />
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Right: Ticket Details Sidebar */}
        <div className="lg:col-span-4 lg:border-l lg:border-slate-100 lg:pl-6 space-y-5">
          <div>
            <h3 className="text-[13.5px] font-bold text-slate-800 mb-4">
              Ticket details
            </h3>

            <div className="space-y-3 text-[12.5px]">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">ID</span>
                <span className="font-semibold text-slate-700">
                  {ticket.ticketCode}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Company</span>
                <span className="font-semibold text-slate-700">
                  {ticket.company}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Type</span>
                <span className="font-semibold text-slate-700">
                  {ticket.type}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Priority</span>
                <span className="font-semibold text-slate-700">
                  {ticket.priority}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Created</span>
                <span className="font-semibold text-slate-700">
                  {ticket.created}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Assignee</span>
                <span className="font-semibold text-slate-700">
                  {ticket.assignee}
                </span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 space-y-4">
            <div>
              <label className="block text-[12px] font-medium text-slate-600 mb-1.5">
                Status
              </label>
              <div className="relative">
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as TicketStatus)}
                  className="w-full h-10 appearance-none rounded-full border border-slate-200 bg-white px-4 pr-9 text-[13px] text-slate-700 focus:outline-none focus:border-[#37AADF] cursor-pointer"
                >
                  <option value="Waiting for customer">
                    Waiting for customer
                  </option>
                  <option value="In-progress">In-progress</option>
                  <option value="Open">Open</option>
                  <option value="Assigned">Assigned</option>
                  <option value="Critical">Critical</option>
                  <option value="Resolved">Resolved</option>
                  <option value="Closed">Closed</option>
                </select>
                <ChevronDown
                  size={15}
                  className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-[12px] font-medium text-slate-600 mb-1.5">
                Assign to
              </label>
              <div className="relative">
                <select
                  value={assignee}
                  onChange={(e) => setAssignee(e.target.value)}
                  className="w-full h-10 appearance-none rounded-full border border-slate-200 bg-white px-4 pr-9 text-[13px] text-slate-700 focus:outline-none focus:border-[#37AADF] cursor-pointer"
                >
                  <option value="Unassigned">Unassigned</option>
                  <option value="Maria S.">Maria S.</option>
                  <option value="Sarah Adewale">Sarah Adewale</option>
                  <option value="Inalegwu Ehi">Inalegwu Ehi</option>
                </select>
                <ChevronDown
                  size={15}
                  className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center gap-2.5">
            <button
              type="button"
              onClick={handleSaveChanges}
              className="flex-1 rounded-full bg-[#78C6EB] hover:bg-[#37AADF] text-white py-2.5 px-4 text-[12.5px] font-semibold transition-colors cursor-pointer"
            >
              Save changes
            </button>
            <button
              type="button"
              onClick={handleEscalate}
              className="flex-1 rounded-full bg-[#F4F6F9] hover:bg-slate-200/70 text-slate-700 py-2.5 px-4 text-[12.5px] font-semibold transition-colors cursor-pointer"
            >
              Escalate ticket
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

