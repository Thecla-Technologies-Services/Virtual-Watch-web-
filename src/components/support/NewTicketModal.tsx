import { useState, useRef } from "react";
import { Modal } from "@/components/ui/Modal";
import { CheckCircle, ChevronDown, Upload, Image as ImageIcon, FileText, X, Bug, Lightbulb, HelpCircle } from "lucide-react";

type TicketType = "bug" | "feature" | "help";

interface Attachment {
  name: string;
  fileType: "image" | "pdf" | "other";
}

interface NewTicketModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MODULES = [
  "Dashboard", "Payroll", "Timesheets", "Rota", "Leave",
  "Visit", "Auth", "Billing", "Notifications", "Settings",
];

const PRIORITIES = ["Low", "Medium", "High"] as const;

function getFileType(name: string): "image" | "pdf" | "other" {
  const ext = name.split(".").pop()?.toLowerCase();
  if (["jpg", "jpeg", "png", "gif", "webp", "svg"].includes(ext || "")) return "image";
  if (ext === "pdf") return "pdf";
  return "other";
}

export function NewTicketModal({ isOpen, onClose }: NewTicketModalProps) {
  const [ticketType, setTicketType] = useState<TicketType>("help");
  const [submitted, setSubmitted] = useState(false);

  // Shared fields
  const [priority, setPriority] = useState<string>("Medium");
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Bug fields
  const [bugSubject, setBugSubject] = useState("");
  const [bugModule, setBugModule] = useState("Leave");
  const [bugDevice, setBugDevice] = useState("");
  const [bugDescription, setBugDescription] = useState("");

  // Feature fields
  const [featureTitle, setFeatureTitle] = useState("");
  const [featureDescription, setFeatureDescription] = useState("");

  // Help fields
  const [helpSubject, setHelpSubject] = useState("");
  const [helpModule, setHelpModule] = useState("Leave");
  const [helpDescription, setHelpDescription] = useState("");

  const handleTypeSelect = (type: TicketType) => {
    setTicketType(type);
  };

  const handleFilesAdded = (files: FileList | null) => {
    if (!files) return;
    const newAttachments: Attachment[] = Array.from(files).map((f) => ({
      name: f.name,
      fileType: getFileType(f.name),
    }));
    setAttachments((prev) => [...prev, ...newAttachments]);
  };

  const handleRemoveAttachment = (name: string) => {
    setAttachments((prev) => prev.filter((a) => a.name !== name));
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    handleFilesAdded(e.dataTransfer.files);
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const handleDone = () => {
    // Reset all state
    setSubmitted(false);
    setTicketType("help");
    setPriority("Medium");
    setAttachments([]);
    setBugSubject(""); setBugModule("Leave"); setBugDevice(""); setBugDescription("");
    setFeatureTitle(""); setFeatureDescription("");
    setHelpSubject(""); setHelpModule("Leave"); setHelpDescription("");
    onClose();
  };

  const TYPE_CARDS = [
    {
      id: "bug" as TicketType,
      icon: <Bug size={22} strokeWidth={1.8} />,
      label: "Report a bug",
      sub: "Something isn't working",
    },
    {
      id: "feature" as TicketType,
      icon: <Lightbulb size={22} strokeWidth={1.8} />,
      label: "Feature request",
      sub: "Suggest an improvement",
    },
    {
      id: "help" as TicketType,
      icon: <HelpCircle size={22} strokeWidth={1.8} />,
      label: "Get help",
      sub: "General assistance",
    },
  ];

  const inputClass =
    "w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-[14px] focus:outline-none focus:ring-1 focus:ring-[#38BDF8] focus:border-[#38BDF8] transition-all placeholder:text-slate-400 text-slate-700";
  const selectClass =
    "w-full pl-4 pr-10 py-2.5 bg-white border border-slate-200 rounded-xl text-[14px] appearance-none focus:outline-none focus:ring-1 focus:ring-[#38BDF8] focus:border-[#38BDF8] transition-all text-slate-700 cursor-pointer";
  const labelClass = "block text-[13px] font-medium text-slate-700 mb-1.5";
  const textareaClass =
    "w-full p-4 bg-white border border-slate-200 rounded-xl text-[14px] focus:outline-none focus:ring-1 focus:ring-[#38BDF8] focus:border-[#38BDF8] transition-all placeholder:text-slate-400 text-slate-700 resize-none";

  if (submitted) {
    return (
      <Modal isOpen={isOpen} onClose={handleDone} width="lg">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-6">
          <h3 className="text-base font-bold">Ticket submitted</h3>
        </div>
        <div className="flex flex-col items-start py-5 gap-4">
          <div className="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center">
            <CheckCircle size={30} className="text-white" strokeWidth={2.5} />
          </div>
          <div>
            <h4 className="text-base font-bold text-slate-800 mb-1">Ticket submitted successfully</h4>
            <p className="text-[14px] text-slate-500 font-medium">Our team will respond within 8 hours.</p>
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={handleDone}
            className="px-8 py-2.5 bg-[#38BDF8] hover:bg-[#2BA5DF] text-white text-[14px] font-bold rounded-full transition-all cursor-pointer"
          >
            Done
          </button>
        </div>
      </Modal>
    );
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} width="2xl" height="xl">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-4">
        <h3 className="text-base font-bold">New support ticket</h3>
      </div>

      <div className="space-y-4">
        {/* Ticket Type Selector */}
        <div className="grid grid-cols-3 gap-3">
          {TYPE_CARDS.map((card) => {
            const isActive = ticketType === card.id;
            return (
              <button
                key={card.id}
                type="button"
                onClick={() => handleTypeSelect(card.id)}
                className={`flex flex-col items-start gap-2 p-2 rounded-xl border-2 text-left transition-all cursor-pointer ${
                  isActive
                    ? "border-[#38BDF8] bg-[#EBF7FD]"
                    : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                <span className={isActive ? "text-[#38BDF8]" : "text-[#333448]"}>
                  {card.icon}
                </span>
                <div>
                  <p className="text-[13px] font-bold leading-snug text-[#333448]">
                    {card.label}
                  </p>
                  <p className="text-[12px] text-slate-400 font-medium">{card.sub}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* ── BUG FORM ── */}
        {ticketType === "bug" && (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>Subject</label>
                <input
                  type="text"
                  value={bugSubject}
                  onChange={(e) => setBugSubject(e.target.value)}
                  placeholder="Brief description of the issue"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Priority</label>
                <div className="relative">
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className={selectClass}
                  >
                    {PRIORITIES.map((p) => <option key={p}>{p}</option>)}
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                    <ChevronDown size={16} className="text-slate-500" />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>Affected module</label>
                <div className="relative">
                  <select
                    value={bugModule}
                    onChange={(e) => setBugModule(e.target.value)}
                    className={selectClass}
                  >
                    {MODULES.map((m) => <option key={m}>{m}</option>)}
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                    <ChevronDown size={16} className="text-slate-500" />
                  </div>
                </div>
              </div>
              <div>
                <label className={labelClass}>Device / Browser</label>
                <input
                  type="text"
                  value={bugDevice}
                  onChange={(e) => setBugDevice(e.target.value)}
                  placeholder="Chrome 125 / macOS 14.5"
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>Description</label>
              <textarea
                rows={3}
                value={bugDescription}
                onChange={(e) => setBugDescription(e.target.value)}
                placeholder="Describe what happened, what you expected to happen, and steps to reproduce..."
                className={textareaClass}
              />
            </div>
          </div>
        )}

        {/* ── FEATURE REQUEST FORM ── */}
        {ticketType === "feature" && (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>Feature title</label>
                <input
                  type="text"
                  value={featureTitle}
                  onChange={(e) => setFeatureTitle(e.target.value)}
                  placeholder="Brief description of the request"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Priority</label>
                <div className="relative">
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className={selectClass}
                  >
                    {PRIORITIES.map((p) => <option key={p}>{p}</option>)}
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                    <ChevronDown size={16} className="text-slate-500" />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label className={labelClass}>Description & justification</label>
              <textarea
                rows={4}
                value={featureDescription}
                onChange={(e) => setFeatureDescription(e.target.value)}
                placeholder="Describe the feature and how it will be useful to your team"
                className={textareaClass}
              />
            </div>
          </div>
        )}

        {/* ── GET HELP FORM ── */}
        {ticketType === "help" && (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>Subject</label>
                <input
                  type="text"
                  value={helpSubject}
                  onChange={(e) => setHelpSubject(e.target.value)}
                  placeholder="Brief description of the help"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Priority</label>
                <div className="relative">
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className={selectClass}
                  >
                    {PRIORITIES.map((p) => <option key={p}>{p}</option>)}
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                    <ChevronDown size={16} className="text-slate-500" />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label className={labelClass}>Affected module</label>
              <div className="relative">
                <select
                  value={helpModule}
                  onChange={(e) => setHelpModule(e.target.value)}
                  className={selectClass}
                >
                  {MODULES.map((m) => <option key={m}>{m}</option>)}
                </select>
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                  <ChevronDown size={16} className="text-slate-500" />
                </div>
              </div>
            </div>

            <div>
              <label className={labelClass}>Description & justification</label>
              <textarea
                rows={3}
                value={helpDescription}
                onChange={(e) => setHelpDescription(e.target.value)}
                placeholder="Describe the feature and how it will be useful to your team"
                className={textareaClass}
              />
            </div>
          </div>
        )}

        {/* Attachments — shown for Bug & Help */}
        {ticketType !== "feature" && (
          <div>
            <h4 className="text-[12px] font-bold uppercase tracking-wider text-slate-700 mb-2">
              Attachments
            </h4>

            {/* Drop zone */}
            <div
              onClick={() => fileInputRef.current?.click()}
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              className="bg-[#EBF7FD]/60 hover:bg-[#EBF7FD] border border-transparent rounded-2xl h-[72px] flex flex-col items-center justify-center gap-1.5 cursor-pointer transition-colors"
            >
              <Upload size={18} className="text-[#38BDF8]" />
              <p className="text-[12px] text-slate-500 font-medium">
                Drop screenshots here or{" "}
                <span className="text-[#38BDF8] font-semibold">browse files</span>
              </p>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              className="hidden"
              onChange={(e) => handleFilesAdded(e.target.files)}
            />

            {/* Chips */}
            {attachments.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2.5">
                {attachments.map((att) => (
                  <div
                    key={att.name}
                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#F8F9FA] border border-slate-100 text-slate-700 text-xs font-medium rounded-xl"
                  >
                    {att.fileType === "image" ? (
                      <ImageIcon size={14} className="text-[#38BDF8]" />
                    ) : att.fileType === "pdf" ? (
                      <FileText size={14} className="text-red-500" />
                    ) : (
                      <FileText size={14} className="text-slate-400" />
                    )}
                    <span>{att.name}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveAttachment(att.name)}
                      className="text-slate-400 hover:text-slate-700 transition-colors cursor-pointer ml-1"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={handleSubmit}
            className="px-6 py-2.5 bg-[#38BDF8] hover:bg-[#2BA5DF] text-white text-[14px] font-bold rounded-full transition-all cursor-pointer"
          >
            Submit ticket
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 bg-[#FAFAFA] hover:bg-slate-100 border border-[#E7E7E7] text-[14px] font-bold text-slate-700 rounded-full transition-all cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
}
