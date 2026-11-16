import { useMemo, useRef, useState } from "react";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import {
  Search,
  Send,
  FileText,
  MessageCircle,
  MessageSquarePlus,
} from "lucide-react";
import {
  INITIAL_CONVERSATIONS,
  type ChatContact,
  type Conversation,
} from "@/components/portal-owner/messages/types";
import { NewConversationModal } from "@/components/portal-owner/messages/NewConversationModal";

export default function Messages() {
  const [conversations, setConversations] = useState<Conversation[]>(
    INITIAL_CONVERSATIONS
  );
  const [activeId, setActiveId] = useState<string | null>(
    INITIAL_CONVERSATIONS[0]?.id ?? null
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [draft, setDraft] = useState("");
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredConversations = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return conversations;
    return conversations.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.lastMessage.toLowerCase().includes(q)
    );
  }, [conversations, searchQuery]);

  const activeConversation = useMemo(
    () => conversations.find((c) => c.id === activeId) ?? null,
    [conversations, activeId]
  );

  const handleSelectConversation = (id: string) => {
    setActiveId(id);
    setConversations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, unreadCount: 0 } : c))
    );
  };

  const handleSendMessage = (e?: React.FormEvent) => {
    e?.preventDefault();
    const text = draft.trim();
    if (!text || !activeConversation) return;

    const now = new Date().toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    });

    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeConversation.id
          ? {
              ...c,
              lastMessage: text,
              lastTime: now,
              messages: [
                ...c.messages,
                {
                  id: String(Date.now()),
                  senderName: "Maria",
                  text,
                  time: now,
                  isOwn: true,
                },
              ],
            }
          : c
      )
    );
    setDraft("");
  };

  const handleAttachFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && activeConversation) {
      setDraft((prev) => (prev ? `${prev} [${file.name}]` : `[${file.name}]`));
      e.target.value = "";
    }
  };

  const handleStartDirectChat = (contact: ChatContact) => {
    const existing = conversations.find(
      (c) => !c.isGroup && c.name === contact.name
    );
    if (existing) {
      handleSelectConversation(existing.id);
      setIsNewModalOpen(false);
      return;
    }

    const newConv: Conversation = {
      id: `conv-${Date.now()}`,
      name: contact.name,
      isGroup: false,
      online: contact.online,
      avatarBg: contact.avatarBg,
      initials: contact.initials,
      lastMessage: "Started a new conversation",
      lastTime: "Just now",
      unreadCount: 0,
      messages: [],
    };
    setConversations((prev) => [newConv, ...prev]);
    setActiveId(newConv.id);
    setIsNewModalOpen(false);
  };

  const handleCreateGroup = (groupName: string, memberNames: string[]) => {
    const initials = groupName
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0].toUpperCase())
      .join("");

    const newConv: Conversation = {
      id: `grp-${Date.now()}`,
      name: groupName,
      isGroup: true,
      online: false,
      members: memberNames,
      avatarBg: "bg-[#29AAE1]",
      initials: initials || "GR",
      lastMessage: "Group created",
      lastTime: "Just now",
      unreadCount: 0,
      messages: [],
    };
    setConversations((prev) => [newConv, ...prev]);
    setActiveId(newConv.id);
    setIsNewModalOpen(false);
  };

  return (
    <div className="animate-fade-in duration-300 space-y-5 pb-4">
      <Breadcrumb
        pageTitle="MESSAGES"
        subtext="Manage your activities, track progress, and get the information you need - all in one place."
        activePage="Messages"
      />

      {/* Main Split Container */}
      <div className="bg-white rounded-2xl  border border-slate-100/80 overflow-hidden flex flex-col md:flex-row h-[calc(100vh-205px)] min-h-[560px]">
        {conversations.length === 0 ? (
          /* Empty State: No conversations yet */
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
            <div className="h-12 w-12 rounded-2xl bg-[#EBF7FD] text-[#5CBCE8] flex items-center justify-center mb-4">
              <MessageCircle size={26} />
            </div>
            <h3 className="text-[16px] font-bold text-slate-800">
              No conversations yet
            </h3>
            <p className="text-[13px] text-slate-400 mt-1.5 max-w-xs">
              Your messages and conversations will appear here once you start a
              chat.
            </p>
            <button
              type="button"
              onClick={() => setIsNewModalOpen(true)}
              className="mt-5 rounded-full bg-[#2EA6E0] hover:bg-[#2594CA] text-white px-7 py-2.5 text-[13px] font-semibold transition-colors cursor-pointer"
            >
              New chat
            </button>
          </div>
        ) : (
          <>
            {/* Left Sidebar: Chats */}
            <div className="w-full md:w-[300px] lg:w-[320px] border-b md:border-b-0 md:border-r border-slate-100 flex flex-col shrink-0">
              <div className="p-4 space-y-3 border-b border-slate-100/70">
                <h2 className="text-[15px] font-bold text-slate-800">Chats</h2>
                <div className="relative">
                  <Search
                    size={15}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                  />
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search conversations..."
                    className="w-full h-9 rounded-xl bg-[#F8FAFC] border border-slate-100 pl-9 pr-3 text-[12.5px] text-slate-700 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-[#2EA6E0]"
                  />
                </div>
              </div>

              {/* Conversation List */}
              <div className="flex-1 overflow-y-auto divide-y divide-slate-100/70">
                {filteredConversations.map((conv) => {
                  const isActive = conv.id === activeId;
                  return (
                    <button
                      key={conv.id}
                      type="button"
                      onClick={() => handleSelectConversation(conv.id)}
                      className={`w-full flex items-start gap-3 px-4 py-3.5 text-left transition-colors cursor-pointer ${
                        isActive ? "bg-[#F4F6F9]" : "hover:bg-slate-50/70"
                      }`}
                    >
                      <div className="relative shrink-0 mt-0.5">
                        <div
                          className={`h-9 w-9 rounded-full ${conv.avatarBg} flex items-center justify-center text-white text-[12px] font-bold`}
                        >
                          {conv.initials || ""}
                        </div>
                        {conv.online && (
                          <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-[#22C55E] ring-2 ring-white" />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[13px] font-bold text-slate-800 truncate">
                            {conv.name}
                          </span>
                          <span className="text-[11px] text-slate-400 shrink-0">
                            {conv.lastTime}
                          </span>
                        </div>
                        <div className="flex items-center justify-between gap-2 mt-1">
                          <p className="text-[12px] text-slate-400 line-clamp-2 leading-snug">
                            {conv.lastMessage}
                          </p>
                          {conv.unreadCount > 0 && (
                            <span className="h-4 min-w-4 px-1 rounded-full bg-[#EF4444] text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                              {conv.unreadCount}
                            </span>
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* New Chat Button */}
              <div className="p-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsNewModalOpen(true)}
                  className="w-full rounded-full bg-[#2EA6E0] hover:bg-[#2594CA] text-white py-2.5 text-[13px] font-semibold transition-colors cursor-pointer"
                >
                  New chat
                </button>
              </div>
            </div>

            {/* Right Panel: Active Thread */}
            <div className="flex-1 flex flex-col min-w-0 bg-white">
              {!activeConversation ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
                  <div className="h-12 w-12 rounded-2xl bg-[#EBF7FD] text-[#5CBCE8] flex items-center justify-center mb-4">
                    <MessageSquarePlus size={24} />
                  </div>
                  <h3 className="text-[16px] font-bold text-slate-800">
                    It&apos;s quiet in here
                  </h3>
                  <p className="text-[13px] text-slate-400 mt-1.5 max-w-xs">
                    Be the first to say something and get the conversation
                    going.
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsNewModalOpen(true)}
                    className="mt-5 rounded-full bg-[#2EA6E0] hover:bg-[#2594CA] text-white px-7 py-2.5 text-[13px] font-semibold transition-colors cursor-pointer"
                  >
                    New chat
                  </button>
                </div>
              ) : (
                <>
                  {/* Thread Header */}
                  <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-3 shrink-0">
                    <div className="relative shrink-0">
                      <div
                        className={`h-10 w-10 rounded-full ${activeConversation.avatarBg} flex items-center justify-center text-white text-[13px] font-bold`}
                      >
                        {activeConversation.initials || ""}
                      </div>
                      {activeConversation.online && (
                        <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-[#22C55E] ring-2 ring-white" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-[14px] font-bold text-slate-800 leading-tight">
                        {activeConversation.name}
                      </h3>
                      <p className="text-[12px] text-slate-400 mt-0.5">
                        {activeConversation.isGroup
                          ? `${activeConversation.members?.length || 0} members`
                          : activeConversation.online
                          ? "Online"
                          : "Offline"}
                      </p>
                    </div>
                  </div>

                  {/* Messages List */}
                  <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
                    {activeConversation.messages.length === 0 ? (
                      <div className="h-full flex flex-col items-center justify-center text-center">
                        <div className="h-12 w-12 rounded-2xl bg-[#EBF7FD] text-[#5CBCE8] flex items-center justify-center mb-3">
                          <MessageSquarePlus size={22} />
                        </div>
                        <h4 className="text-[15px] font-bold text-slate-800">
                          It&apos;s quiet in here
                        </h4>
                        <p className="text-[12.5px] text-slate-400 mt-1 max-w-xs">
                          Be the first to say something and get the conversation
                          going.
                        </p>
                      </div>
                    ) : (
                      <>
                        {activeConversation.messages.map((msg) => (
                          <div
                            key={msg.id}
                            className={`flex flex-col ${
                              msg.isOwn ? "items-end" : "items-start"
                            }`}
                          >
                            {activeConversation.isGroup && (
                              <span className="text-[11.5px] font-bold text-slate-700 mb-1">
                                {msg.senderName}
                              </span>
                            )}
                            <div
                              className={`rounded-2xl px-4 py-3 max-w-md text-[13px] leading-relaxed ${
                                msg.isOwn
                                  ? "bg-[#2EA6E0] text-white rounded-tr-sm"
                                  : "bg-[#F4F5F7] text-slate-700 rounded-tl-sm"
                              }`}
                            >
                              {msg.text}
                            </div>
                            <span className="text-[11px] text-slate-400 mt-1.5">
                              {msg.time}
                            </span>
                          </div>
                        ))}

                        {activeConversation.isTyping && (
                          <div className="flex items-start pt-2">
                            <div className="inline-flex items-center gap-1.5 rounded-full bg-[#F4F5F7] px-3.5 py-2.5">
                              <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
                              <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                              <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>

                  {/* Composer */}
                  <form
                    onSubmit={handleSendMessage}
                    className="px-6 py-4 border-t border-slate-100 shrink-0"
                  >
                    <div className="rounded-2xl bg-[#F4F5F7] p-3.5 flex flex-col justify-between min-h-[82px]">
                      <textarea
                        rows={2}
                        value={draft}
                        onChange={(e) => setDraft(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage();
                          }
                        }}
                        placeholder="Type a message..."
                        className="w-full bg-transparent text-[13px] text-slate-700 placeholder:text-slate-400 focus:outline-none resize-none"
                      />

                      <div className="flex items-center justify-between pt-2">
                        <div>
                          <input
                            ref={fileInputRef}
                            type="file"
                            onChange={handleAttachFile}
                            className="hidden"
                          />
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="text-slate-500 hover:text-slate-700 transition-colors cursor-pointer"
                            title="Attach file"
                          >
                            <FileText size={16} />
                          </button>
                        </div>

                        <button
                          type="submit"
                          className="h-8 w-8 rounded-full bg-[#2EA6E0] hover:bg-[#2594CA] text-white flex items-center justify-center transition-colors cursor-pointer"
                          aria-label="Send message"
                        >
                          <Send size={14} />
                        </button>
                      </div>
                    </div>
                  </form>
                </>
              )}
            </div>
          </>
        )}
      </div>

      {/* New Conversation Modal */}
      <NewConversationModal
        isOpen={isNewModalOpen}
        onClose={() => setIsNewModalOpen(false)}
        onStartDirectChat={handleStartDirectChat}
        onCreateGroup={handleCreateGroup}
      />
    </div>
  );
}

