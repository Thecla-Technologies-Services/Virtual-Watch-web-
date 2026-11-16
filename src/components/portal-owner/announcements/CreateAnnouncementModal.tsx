import { useEffect, useRef, useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { ChevronDown, Upload, Megaphone, X } from "lucide-react";
import type { Announcement, AnnouncementType } from "./types";

interface CreateAnnouncementModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPublish: (announcement: Announcement) => void;
}

const TYPE_BADGE: Record<AnnouncementType, string> = {
  Feature: "bg-[#EBF7FD] text-[#37AADF]",
  Maintenance: "bg-[#FEF7E6] text-[#F59E0B]",
  Compliance: "bg-[#FEF7E6] text-[#F59E0B]",
};

export function CreateAnnouncementModal({
  isOpen,
  onClose,
  onPublish,
}: CreateAnnouncementModalProps) {
  const [step, setStep] = useState<"create" | "preview">("create");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState<AnnouncementType>("Feature");
  const [audience, setAudience] = useState("All companies");
  const [channels, setChannels] = useState("In-app");
  const [scheduleDate, setScheduleDate] = useState("");
  const [attachmentUrl, setAttachmentUrl] = useState<string | undefined>(
    undefined
  );
  const [attachmentName, setAttachmentName] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setStep("create");
      setTitle("");
      setMessage("");
      setType("Feature");
      setAudience("All companies");
      setChannels("In-app");
      setScheduleDate("");
      setAttachmentUrl(undefined);
      setAttachmentName(null);
    }
  }, [isOpen]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAttachmentName(file.name);
    const url = URL.createObjectURL(file);
    setAttachmentUrl(url);
  };

  const handleSend = () => {
    const recipientsMap: Record<string, number> = {
      "All companies": 203,
      "Enterprise plan": 47,
      "Active subscribers": 156,
      "Trial accounts": 18,
    };

    const newItem: Announcement = {
      id: String(Date.now()),
      title: title.trim() || "Untitled announcement",
      message:
        message.trim() ||
        "Your announcement message will appear here. Keep it concise and actionable.",
      type,
      audience,
      channels,
      sentDate: scheduleDate
        ? new Date(scheduleDate).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })
        : new Date().toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          }),
      recipients: recipientsMap[audience] ?? 203,
      attachmentUrl,
    };

    onPublish(newItem);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} width="lg" height="3xl">
      <div className="flex flex-col h-full max-h-[84vh] px-2 pb-1">
        {/* Header */}
        <div className="pb-3 border-b border-slate-100 shrink-0">
          <h2 className="text-[15px] font-bold text-slate-800">
            {step === "create" ? "Create announcement" : "Preview announcement"}
          </h2>
        </div>

        <div className="flex-1 overflow-y-auto pt-4 pb-2">
          {step === "create" ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="space-y-4"
            >
              {/* Title */}
              <div>
                <label className="block text-[12px] font-medium text-slate-600 mb-1.5">
                  Title
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Scheduled Maintenance - July 15"
                  className="w-full h-10 rounded-full border border-slate-200 px-4 text-[13px] text-slate-700 placeholder:text-slate-300 focus:outline-none focus:border-[#37AADF] focus:ring-2 focus:ring-[#37AADF]/15"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-[12px] font-medium text-slate-600 mb-1.5">
                  Message
                </label>
                <textarea
                  rows={3}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Your message to companies..."
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-[13px] text-slate-700 placeholder:text-slate-300 focus:outline-none focus:border-[#37AADF] focus:ring-2 focus:ring-[#37AADF]/15 resize-none"
                />
              </div>

              {/* 2-Column Selects & Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[12px] font-medium text-slate-600 mb-1.5">
                    Type
                  </label>
                  <div className="relative">
                    <select
                      value={type}
                      onChange={(e) =>
                        setType(e.target.value as AnnouncementType)
                      }
                      className="w-full h-10 appearance-none rounded-full border border-slate-200 bg-white px-4 pr-9 text-[13px] text-slate-700 focus:outline-none focus:border-[#37AADF] cursor-pointer"
                    >
                      <option value="Feature">Feature</option>
                      <option value="Maintenance">Maintenance</option>
                      <option value="Compliance">Compliance</option>
                    </select>
                    <ChevronDown
                      size={15}
                      className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[12px] font-medium text-slate-600 mb-1.5">
                    Target audience
                  </label>
                  <div className="relative">
                    <select
                      value={audience}
                      onChange={(e) => setAudience(e.target.value)}
                      className="w-full h-10 appearance-none rounded-full border border-slate-200 bg-white px-4 pr-9 text-[13px] text-slate-700 focus:outline-none focus:border-[#37AADF] cursor-pointer"
                    >
                      <option value="All companies">All companies</option>
                      <option value="Enterprise plan">Enterprise plan</option>
                      <option value="Active subscribers">
                        Active subscribers
                      </option>
                      <option value="Trial accounts">Trial accounts</option>
                    </select>
                    <ChevronDown
                      size={15}
                      className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[12px] font-medium text-slate-600 mb-1.5">
                    Delivery channels
                  </label>
                  <div className="relative">
                    <select
                      value={channels}
                      onChange={(e) => setChannels(e.target.value)}
                      className="w-full h-10 appearance-none rounded-full border border-slate-200 bg-white px-4 pr-9 text-[13px] text-slate-700 focus:outline-none focus:border-[#37AADF] cursor-pointer"
                    >
                      <option value="In-app">In-app</option>
                      <option value="In-app + Email">In-app + Email</option>
                      <option value="In-app + Email + Banner">
                        In-app + Email + Banner
                      </option>
                      <option value="Email">Email</option>
                    </select>
                    <ChevronDown
                      size={15}
                      className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[12px] font-medium text-slate-600 mb-1.5">
                    Schedule{" "}
                    <span className="text-slate-400">
                      (leave blank to send now)
                    </span>
                  </label>
                  <input
                    type="date"
                    value={scheduleDate}
                    onChange={(e) => setScheduleDate(e.target.value)}
                    className="w-full h-10 rounded-full border border-slate-200 px-4 text-[13px] text-slate-600 focus:outline-none focus:border-[#37AADF]"
                  />
                </div>
              </div>

              {/* Attachments */}
              <div className="pt-1">
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-2">
                  ATTACHMENTS{" "}
                  <span className="text-slate-400 font-semibold">
                    (OPTIONAL)
                  </span>
                </p>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/gif"
                  onChange={handleFileChange}
                  className="hidden"
                />

                {attachmentName ? (
                  <div className="rounded-2xl bg-[#F0F9FF] border border-[#BAE6FD] p-3.5 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      {attachmentUrl && (
                        <img
                          src={attachmentUrl}
                          alt="Attachment preview"
                          className="h-10 w-10 rounded-lg object-cover shrink-0"
                        />
                      )}
                      <span className="text-[12.5px] font-medium text-slate-700 truncate">
                        {attachmentName}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setAttachmentName(null);
                        setAttachmentUrl(undefined);
                      }}
                      className="p-1 text-slate-400 hover:text-slate-700 cursor-pointer"
                    >
                      <X size={15} />
                    </button>
                  </div>
                ) : (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="rounded-2xl bg-[#F0F9FF] border border-dashed border-[#BAE6FD] py-7 px-4 text-center cursor-pointer hover:bg-[#E0F2FE]/60 transition-colors"
                  >
                    <div className="h-8 w-8 rounded-lg bg-white text-[#37AADF] flex items-center justify-center mx-auto mb-2 shadow-2xs">
                      <Upload size={16} />
                    </div>
                    <p className="text-[12.5px] text-slate-600 font-medium">
                      Drop file here or{" "}
                      <span className="text-[#37AADF] font-semibold">
                        browse files
                      </span>
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      PNG, JPG, GIF up to 4MB
                    </p>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-end gap-2.5 pt-3">
                <button
                  type="button"
                  onClick={() => setStep("preview")}
                  className="rounded-full bg-[#F4F6F9] hover:bg-slate-200/70 text-slate-700 px-5 py-2.5 text-[13px] font-semibold transition-colors cursor-pointer"
                >
                  Preview
                </button>
                <button
                  type="submit"
                  className="rounded-full bg-[#37AADF] hover:bg-[#2F99CA] text-white px-6 py-2.5 text-[13px] font-semibold transition-colors cursor-pointer"
                >
                  Send now
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
          ) : (
            <div className="space-y-5">
              {/* Preview Card */}
              <div className="rounded-2xl border border-slate-100 p-5 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-lg bg-[#F4F7FA] text-slate-500 flex items-center justify-center shrink-0">
                    <Megaphone size={15} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-[14px] font-bold text-slate-800">
                        {title.trim() || "Your announcement title"}
                      </h3>
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${TYPE_BADGE[type]}`}
                      >
                        {type}
                      </span>
                    </div>
                    <p className="text-[13px] text-slate-600 mt-1.5 leading-relaxed">
                      {message.trim() ||
                        "Your announcement message will appear here. Keep it concise and actionable."}
                    </p>
                    <p className="text-[11.5px] text-slate-400 mt-2">
                      Just now · Nexus platform
                    </p>
                  </div>
                </div>

                {attachmentUrl && (
                  <div className="pt-2">
                    <img
                      src={attachmentUrl}
                      alt="Announcement attachment"
                      className="w-full max-h-72 object-cover rounded-2xl border border-slate-100"
                    />
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={handleSend}
                  className="rounded-full bg-[#37AADF] hover:bg-[#2F99CA] text-white px-6 py-2.5 text-[13px] font-semibold transition-colors cursor-pointer"
                >
                  Send now
                </button>
                <button
                  type="button"
                  onClick={() => setStep("create")}
                  className="rounded-full bg-[#F4F6F9] hover:bg-slate-200/70 text-slate-700 px-6 py-2.5 text-[13px] font-semibold transition-colors cursor-pointer"
                >
                  Edit
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}

