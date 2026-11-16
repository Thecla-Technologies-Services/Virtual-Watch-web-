import { useEffect, useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { ChevronDown } from "lucide-react";

interface AssignTicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAssign: (assignee: string) => void;
}

export function AssignTicketModal({
  isOpen,
  onClose,
  onAssign,
}: AssignTicketModalProps) {
  const [assignee, setAssignee] = useState("Unassigned");

  useEffect(() => {
    if (isOpen) {
      setAssignee("Unassigned");
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAssign(assignee);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} width="md" height="lg">
      <div className="px-2 pb-1">
        {/* Header */}
        <div className="pb-3 border-b border-slate-100">
          <h2 className="text-[15px] font-bold text-slate-800">
            Assign ticket
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="pt-4 space-y-5">
          <div>
            <label className="block text-[12px] font-medium text-slate-600 mb-1.5">
              Assign to
            </label>
            <div className="relative">
              <select
                value={assignee}
                onChange={(e) => setAssignee(e.target.value)}
                className="w-full h-10 appearance-none rounded-full border border-slate-200 bg-white px-4 pr-9 text-[13px] text-slate-700 focus:outline-none focus:border-[#37AADF] focus:ring-2 focus:ring-[#37AADF]/15 cursor-pointer"
              >
                <option value="Unassigned">Unassigned</option>
                <option value="Maria S.">Maria S.</option>
                <option value="Sarah Adewale">Sarah Adewale</option>
                <option value="Inalegwu Ehi">Inalegwu Ehi</option>
                <option value="Support Team">Support Team</option>
              </select>
              <ChevronDown
                size={15}
                className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-2.5 pt-1">
            <button
              type="submit"
              className="rounded-full bg-[#37AADF] hover:bg-[#2F99CA] text-white px-6 py-2.5 text-[13px] font-semibold transition-colors cursor-pointer"
            >
              Assign
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
      </div>
    </Modal>
  );
}

