import { useEffect, useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { ChevronDown } from "lucide-react";

export interface TicketFilters {
  company: string;
  admin: string;
  status: string;
}

interface FilterTicketsModalProps {
  isOpen: boolean;
  onClose: () => void;
  filters: TicketFilters;
  companies: string[];
  onApply: (filters: TicketFilters) => void;
}

export function FilterTicketsModal({
  isOpen,
  onClose,
  filters,
  companies,
  onApply,
}: FilterTicketsModalProps) {
  const [localFilters, setLocalFilters] = useState<TicketFilters>(filters);

  useEffect(() => {
    if (isOpen) {
      setLocalFilters(filters);
    }
  }, [isOpen, filters]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onApply(localFilters);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} width="md" height="2xl">
      <div className="px-2 pb-1">
        {/* Header */}
        <div className="pb-3 border-b border-slate-100">
          <h2 className="text-[15px] font-bold text-slate-800">Filter by</h2>
        </div>

        <form onSubmit={handleSubmit} className="pt-4 space-y-4">
          <div>
            <label className="block text-[12px] font-medium text-slate-600 mb-1.5">
              Company
            </label>
            <div className="relative">
              <select
                value={localFilters.company}
                onChange={(e) =>
                  setLocalFilters((prev) => ({
                    ...prev,
                    company: e.target.value,
                  }))
                }
                className="w-full h-10 appearance-none rounded-full border border-slate-200 bg-white px-4 pr-9 text-[13px] text-slate-700 focus:outline-none focus:border-[#37AADF] cursor-pointer"
              >
                <option value="All">All</option>
                {companies.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={15}
                className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-[12px] font-medium text-slate-600 mb-1.5">
              Support admin
            </label>
            <div className="relative">
              <select
                value={localFilters.admin}
                onChange={(e) =>
                  setLocalFilters((prev) => ({
                    ...prev,
                    admin: e.target.value,
                  }))
                }
                className="w-full h-10 appearance-none rounded-full border border-slate-200 bg-white px-4 pr-9 text-[13px] text-slate-700 focus:outline-none focus:border-[#37AADF] cursor-pointer"
              >
                <option value="All">All</option>
                <option value="Unassigned">Unassigned</option>
                <option value="Maria S.">Maria S.</option>
                <option value="Sarah Adewale">Sarah Adewale</option>
              </select>
              <ChevronDown
                size={15}
                className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-[12px] font-medium text-slate-600 mb-1.5">
              Status
            </label>
            <div className="relative">
              <select
                value={localFilters.status}
                onChange={(e) =>
                  setLocalFilters((prev) => ({
                    ...prev,
                    status: e.target.value,
                  }))
                }
                className="w-full h-10 appearance-none rounded-full border border-slate-200 bg-white px-4 pr-9 text-[13px] text-slate-700 focus:outline-none focus:border-[#37AADF] cursor-pointer"
              >
                <option value="All">All</option>
                <option value="Open">Open</option>
                <option value="In-progress">In-progress</option>
                <option value="Critical">Critical</option>
                <option value="Resolved">Resolved</option>
                <option value="Closed">Closed</option>
                <option value="Assigned">Assigned</option>
              </select>
              <ChevronDown
                size={15}
                className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-2.5 pt-2">
            <button
              type="submit"
              className="rounded-full bg-[#37AADF] hover:bg-[#2F99CA] text-white px-6 py-2.5 text-[13px] font-semibold transition-colors cursor-pointer"
            >
              Apply
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

