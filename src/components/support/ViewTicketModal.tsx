import { useState, useRef, useEffect } from "react";
import { X, Paperclip, Send } from "lucide-react";
import virtualWatchLogo from "@/assets/virtual-watch.png";

interface ChatMessage {
  id: string;
  from: "support" | "user";
  text: string;
}

interface ViewTicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  ticket: {
    title: string;
    ticketId: string;
    type: string;
    priority: string;
    status: string;
    description?: string;
  } | null;
}

const STATUS_COLOR: Record<string, string> = {
  "Open":        "bg-[#38BDF8]",
  "In-progress": "bg-amber-400",
  "Critical":    "bg-red-500",
  "Resolved":    "bg-green-500",
  "Closed":      "bg-slate-400",
};

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: "1",
    from: "support",
    text: "Thank you for raising this ticket. We have assigned it to our technical team and will update you shortly.",
  },
];

export function ViewTicketModal({ isOpen, onClose, ticket }: ViewTicketModalProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleSend = () => {
    const text = inputValue.trim();
    if (!text) return;
    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), from: "user", text },
    ]);
    setInputValue("");
    setIsTyping(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen || !ticket) return null;

  const statusDot = STATUS_COLOR[ticket.status] ?? "bg-slate-400";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg max-h-[85vh] bg-white rounded-3xl z-50 border border-slate-100 animate-scale-up flex flex-col overflow-hidden">

        {/* Header */}
        <div className="px-6 pt-5 pb-4 shrink-0">
          <button
            onClick={onClose}
            type="button"
            className="absolute top-4 right-5 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer z-10"
          >
            <X size={16} />
          </button>
          <h3 className="text-base font-bold text-slate-800 pr-6">View ticket</h3>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto min-h-0 px-6">

          {/* Ticket meta */}
          <div className="mb-5">
            <h4 className="text-[15px] font-bold text-slate-800 mb-1">{ticket.title}</h4>
            <div className="flex items-center gap-1.5 flex-wrap text-[13px] text-slate-500 font-medium">
              <span>{ticket.ticketId}</span>
              <span>·</span>
              <span>{ticket.type}</span>
              <span>·</span>
              <span>{ticket.priority} priority</span>
              <span>·</span>
              <span className="flex items-center gap-1.5">
                <span className={`inline-block h-2 w-2 rounded-full ${statusDot}`} />
                <span className="font-semibold text-slate-700">{ticket.status}</span>
              </span>
            </div>
          </div>

          <hr className="border-slate-100 mb-4" />

          {/* Description */}
          <div className="mb-5">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">Description</p>
            <p className="text-[13px] text-slate-600 leading-relaxed">
              {ticket.description ||
                "This ticket was submitted from your workspace. Our support team has been notified and will respond within the SLA window for your plan (8 hours for Growth Plan)."}
            </p>
          </div>

          <hr className="border-slate-100 mb-4" />

          {/* Chat thread */}
          <div className="space-y-4 pb-4">
            {messages.map((msg) =>
              msg.from === "support" ? (
                <SupportBubble key={msg.id} text={msg.text} />
              ) : (
                <UserBubble key={msg.id} text={msg.text} />
              )
            )}
            {isTyping && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Message input — pinned to bottom */}
        <MessageInput
          value={inputValue}
          onChange={setInputValue}
          onSend={handleSend}
          onKeyDown={handleKeyDown}
          fileInputRef={fileInputRef}
        />
      </div>
    </div>
  );
}

/* ── Sub-components ─────────────────────────────────── */

function SupportBubble({ text }: { text: string }) {
  return (
    <div className="bg-slate-50 rounded-2xl p-4">
      <div className="flex items-center gap-2 mb-2">
        <img src={virtualWatchLogo} alt="VW" className="h-6 w-6 rounded-full object-cover" />
        <span className="text-[12px] font-semibold text-slate-600">Virtual watch support</span>
      </div>
      <p className="text-[13px] text-slate-700 leading-relaxed">{text}</p>
    </div>
  );
}

function UserBubble({ text, name = "You" }: { text: string; name?: string }) {
  return (
    <div className="bg-slate-50 rounded-2xl p-4">
      <div className="flex items-center justify-end gap-2 mb-2">
        <span className="text-[12px] font-semibold text-slate-600">{name}</span>
        <div className="h-6 w-6 rounded-full bg-[#38BDF8] flex items-center justify-center text-white text-[10px] font-bold shrink-0">
          {name.charAt(0)}
        </div>
      </div>
      <p className="text-[13px] text-slate-700 leading-relaxed text-right">{text}</p>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1.5 px-2 py-1">
      <span className="h-2 w-2 rounded-full bg-slate-300 animate-bounce [animation-delay:-0.3s]" />
      <span className="h-2 w-2 rounded-full bg-slate-300 animate-bounce [animation-delay:-0.15s]" />
      <span className="h-2 w-2 rounded-full bg-slate-300 animate-bounce" />
    </div>
  );
}

interface MessageInputProps {
  value: string;
  onChange: (v: string) => void;
  onSend: () => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
}

function MessageInput({ value, onChange, onSend, onKeyDown, fileInputRef }: MessageInputProps) {
  return (
    <div className="shrink-0 border-t border-slate-100 bg-white px-4 py-3">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder="Type a message..."
        rows={2}
        className="w-full resize-none bg-transparent text-[14px] text-slate-700 placeholder:text-slate-400 focus:outline-none"
      />
      <div className="flex items-center justify-between mt-1">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
        >
          <Paperclip size={18} />
        </button>
        <input ref={fileInputRef} type="file" multiple className="hidden" />
        <button
          type="button"
          onClick={onSend}
          disabled={!value.trim()}
          className="w-10 h-10 rounded-full bg-[#38BDF8] hover:bg-[#2BA5DF] disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-colors cursor-pointer"
        >
          <Send size={16} className="text-white" />
        </button>
      </div>
    </div>
  );
}
