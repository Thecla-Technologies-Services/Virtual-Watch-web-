import { useEffect, useMemo, useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Search, ChevronRight, X } from "lucide-react";
import { CHAT_CONTACTS, type ChatContact } from "./types";

interface NewConversationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartDirectChat: (contact: ChatContact) => void;
  onCreateGroup: (groupName: string, memberNames: string[]) => void;
}

export function NewConversationModal({
  isOpen,
  onClose,
  onStartDirectChat,
  onCreateGroup,
}: NewConversationModalProps) {
  const [mode, setMode] = useState<"dm" | "group">("dm");
  const [searchQuery, setSearchQuery] = useState("");
  const [groupName, setGroupName] = useState("");
  const [selectedContactIds, setSelectedContactIds] = useState<string[]>([]);

  useEffect(() => {
    if (isOpen) {
      setMode("dm");
      setSearchQuery("");
      setGroupName("");
      setSelectedContactIds([]);
    }
  }, [isOpen]);

  const filteredContacts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return CHAT_CONTACTS;
    return CHAT_CONTACTS.filter(
      (c) =>
        c.name.toLowerCase().includes(q) || c.role.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const selectedContacts = useMemo(
    () => CHAT_CONTACTS.filter((c) => selectedContactIds.includes(c.id)),
    [selectedContactIds]
  );

  const toggleMember = (id: string) => {
    setSelectedContactIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleCreateGroup = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedContacts.length === 0) return;
    const finalName = groupName.trim() || "New group chat";
    onCreateGroup(
      finalName,
      selectedContacts.map((c) => c.name)
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} width="lg" height="3xl">
      <div className="flex flex-col h-full max-h-[82vh] px-2 pb-1">
        {/* Header */}
        <div className="pb-3 border-b border-slate-100 shrink-0">
          <h2 className="text-[15px] font-bold text-slate-800">
            New conversation
          </h2>
        </div>

        {/* Mode Toggle */}
        <div className="flex items-center gap-2 pt-4 pb-3 shrink-0">
          <button
            type="button"
            onClick={() => setMode("dm")}
            className={`px-4 py-1.5 rounded-full text-[12.5px] font-semibold transition-colors cursor-pointer ${
              mode === "dm"
                ? "bg-[#2EA6E0] text-white"
                : "bg-[#F4F6F9] text-slate-600 hover:bg-slate-200/60"
            }`}
          >
            Direct message
          </button>
          <button
            type="button"
            onClick={() => setMode("group")}
            className={`px-4 py-1.5 rounded-full text-[12.5px] font-semibold transition-colors cursor-pointer ${
              mode === "group"
                ? "bg-[#2EA6E0] text-white"
                : "bg-[#F4F6F9] text-slate-600 hover:bg-slate-200/60"
            }`}
          >
            Create group
          </button>
        </div>

        {mode === "dm" ? (
          <div className="flex-1 overflow-y-auto space-y-3 pt-1">
            {/* Search */}
            <div className="relative">
              <Search
                size={15}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
              />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search people or groups..."
                className="w-full h-10 rounded-full bg-[#F8FAFC] border border-slate-100 pl-10 pr-4 text-[13px] text-slate-700 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-[#2EA6E0]"
              />
            </div>

            {/* Contacts */}
            <div className="divide-y divide-slate-100/80">
              {filteredContacts.map((contact) => (
                <button
                  key={contact.id}
                  type="button"
                  onClick={() => onStartDirectChat(contact)}
                  className="w-full flex items-center justify-between gap-3 py-3 px-2 rounded-xl hover:bg-slate-50 transition-colors text-left cursor-pointer"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="relative shrink-0">
                      <div
                        className={`h-9 w-9 rounded-full ${contact.avatarBg} flex items-center justify-center text-white text-[12px] font-bold`}
                      >
                        {contact.initials || ""}
                      </div>
                      {contact.online && (
                        <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-[#22C55E] ring-2 ring-white" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="text-[13.5px] font-semibold text-slate-800 truncate">
                        {contact.name}
                      </p>
                      <p className="text-[11.5px] text-slate-400">
                        {contact.role} · {contact.online ? "Online" : "Offline"}
                      </p>
                    </div>
                  </div>

                  <ChevronRight size={15} className="text-slate-400 shrink-0" />
                </button>
              ))}
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleCreateGroup}
            className="flex-1 flex flex-col overflow-hidden pt-1"
          >
            {/* Group Name */}
            <input
              type="text"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder="Group name (e.g. Fallowfield team)"
              className="w-full h-10 rounded-full border border-slate-200 px-4 text-[13px] text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-[#2EA6E0] shrink-0"
            />

            {/* Selected Member Chips */}
            {selectedContacts.length > 0 && (
              <div className="flex items-center gap-1.5 flex-wrap pt-3 shrink-0">
                {selectedContacts.map((c) => (
                  <span
                    key={c.id}
                    className="inline-flex items-center gap-1 rounded-full bg-[#F4F6F9] px-2.5 py-1 text-[11.5px] font-medium text-slate-700"
                  >
                    <span>{c.name.split(" ")[0]}</span>
                    <button
                      type="button"
                      onClick={() => toggleMember(c.id)}
                      className="text-slate-400 hover:text-slate-700 cursor-pointer"
                    >
                      <X size={11} />
                    </button>
                  </span>
                ))}
              </div>
            )}

            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mt-4 mb-1 shrink-0">
              SELECT MEMBERS
            </p>

            {/* Member List */}
            <div className="flex-1 overflow-y-auto divide-y divide-slate-100/80 pr-1">
              {CHAT_CONTACTS.map((contact) => {
                const isChecked = selectedContactIds.includes(contact.id);
                return (
                  <label
                    key={contact.id}
                    className="flex items-center justify-between gap-3 py-2.5 px-1 cursor-pointer hover:bg-slate-50/70 rounded-xl"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="relative shrink-0">
                        <div
                          className={`h-9 w-9 rounded-full ${contact.avatarBg} flex items-center justify-center text-white text-[12px] font-bold`}
                        >
                          {contact.initials || ""}
                        </div>
                        {contact.online && (
                          <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-[#22C55E] ring-2 ring-white" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="text-[13.5px] font-semibold text-slate-800 truncate">
                          {contact.name}
                        </p>
                        <p className="text-[11.5px] text-slate-400">
                          {contact.role}
                        </p>
                      </div>
                    </div>

                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleMember(contact.id)}
                      className="h-4 w-4 rounded border-slate-300 accent-[#2EA6E0] cursor-pointer"
                    />
                  </label>
                );
              })}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-2.5 pt-4 shrink-0">
              <button
                type="submit"
                disabled={selectedContacts.length === 0}
                className={`rounded-full px-6 py-2.5 text-[13px] font-semibold text-white transition-colors ${
                  selectedContacts.length === 0
                    ? "bg-[#9DD8F3] cursor-not-allowed"
                    : "bg-[#2EA6E0] hover:bg-[#2594CA] cursor-pointer"
                }`}
              >
                {selectedContacts.length > 0
                  ? `Create group (${selectedContacts.length} ${
                      selectedContacts.length === 1 ? "member" : "members"
                    })`
                  : "Create group"}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full bg-[#F4F6F9] hover:bg-slate-200/70 text-slate-700 px-6 py-2.5 text-[13px] font-semibold transition-colors cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </Modal>
  );
}

