import { useState, useRef, useEffect } from "react";
import { X, Paperclip, Send } from "lucide-react";
import virtualWatchLogo from "@/assets/virtual-watch.png";

interface ChatMessage {
  id: string;
  from: "support" | "user";
  text: string;
}

interface LiveChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName?: string;
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: "1",
    from: "support",
    text: "Hi there! I'm Mariam from the VirtualWatch support team. How can I help you today?",
  },
  {
    id: "2",
    from: "user",
    text: "Hi Mariam, we're having an issue with user permissions not updating in real time after role changes.",
  },
  {
    id: "3",
    from: "support",
    text: "Thanks for reaching out. Can you tell me which role was changed and the username affected?",
  },
  {
    id: "4",
    from: "user",
    text: "We changed Connor Hughes from Manager to Viewer, but he still has Manager-level access.",
  },
  {
    id: "5",
    from: "support",
    text: "Got it - this sounds like a permission cache issue. The cache refreshes every 15 minutes by default. You can force a refresh by toggling the account status, or I can escalate this to tier 2.",
  },
];

export function LiveChatModal({ isOpen, onClose, userName = "Maria Santos" }: LiveChatModalProps) {
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

  if (!isOpen) return null;

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
        <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-3 shrink-0">
          <div className="relative shrink-0">
            <img
              src={virtualWatchLogo}
              alt="VirtualWatch Support"
              className="h-10 w-10 rounded-full object-cover"
            />
            {/* Online dot */}
            <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 border-2 border-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[14px] font-bold text-slate-800">Live chat</p>
            <p className="text-[12px] text-green-500 font-medium">
              You're chatting with VirtualWatch support
            </p>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer shrink-0"
          >
            <X size={16} />
          </button>
        </div>

        {/* Scrollable chat */}
        <div className="flex-1 overflow-y-auto min-h-0 px-5 py-4 space-y-3">
          {messages.map((msg) =>
            msg.from === "support" ? (
              <SupportBubble key={msg.id} text={msg.text} />
            ) : (
              <UserBubble key={msg.id} text={msg.text} name={userName} />
            )
          )}
          {isTyping && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>

        {/* Message input */}
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

function UserBubble({ text, name }: { text: string; name: string }) {
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
    <div className="shrink-0 border-t border-slate-100 bg-[#F7F9FB] rounded-b-3xl px-4 py-3">
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
