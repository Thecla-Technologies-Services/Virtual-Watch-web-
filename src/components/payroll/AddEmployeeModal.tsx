import { useState } from "react";
import { Modal } from "@/components/ui/Modal";

interface AddEmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Tab = "Personal info" | "Salary details" | "Tax info" | "Bank details";
const TABS: Tab[] = ["Personal info", "Salary details", "Tax info", "Bank details"];

export function AddEmployeeModal({ isOpen, onClose }: AddEmployeeModalProps) {
  const [activeTab, setActiveTab] = useState<Tab>("Personal info");

  const inputClass = "w-full px-4 py-2.5 bg-white border border-slate-200 rounded-full text-[14px] focus:outline-none focus:ring-1 focus:ring-[#38BDF8] focus:border-[#38BDF8] transition-all placeholder:text-slate-400 text-slate-700";
  const labelClass = "block text-[13px] font-medium text-slate-700 mb-1.5";
  const selectClass = "w-full px-4 py-2.5 bg-white border border-slate-200 rounded-full text-[14px] appearance-none focus:outline-none focus:ring-1 focus:ring-[#38BDF8] focus:border-[#38BDF8] transition-all text-slate-700 cursor-pointer";

  return (
    <Modal isOpen={isOpen} onClose={onClose} width="xl">
      <div className="pb-4 border-b border-slate-100 flex items-center justify-between">
        <h3 className="text-base font-bold text-slate-800">Add new employee</h3>
      </div>

      <div className="pt-2">
        {/* Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-100 mb-6">
          {TABS.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-[13px] font-medium transition-all cursor-pointer rounded-t-lg ${
                  isActive
                    ? "bg-[#EBF7FD] text-[#38BDF8] font-bold"
                    : "text-slate-400 hover:text-slate-700"
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Form Content */}
        {activeTab === "Personal info" && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Full name</label>
                <input type="text" placeholder="e.g John doe" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Email</label>
                <input type="email" placeholder="e.g johndoe@gmail.com" className={inputClass} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Job title</label>
                <select className={selectClass}>
                  <option>e.g Designer</option>
                  <option>Developer</option>
                  <option>Manager</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Department</label>
                <select className={selectClass}>
                  <option>e.g Design</option>
                  <option>Engineering</option>
                  <option>HR</option>
                </select>
              </div>
            </div>
            <div>
              <label className={labelClass}>Employment type</label>
              <select className={selectClass}>
                <option>e.g Full time</option>
                <option>Part time</option>
                <option>Contract</option>
              </select>
            </div>
          </div>
        )}

        {activeTab === "Salary details" && (
          <div className="py-10 text-center text-slate-400 text-sm">
            Salary configuration form would go here
          </div>
        )}

        {activeTab === "Tax info" && (
          <div className="py-10 text-center text-slate-400 text-sm">
            Tax information form would go here
          </div>
        )}

        {activeTab === "Bank details" && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Bank name</label>
                <select className={selectClass}>
                  <option>e.g enter</option>
                  <option>Chase</option>
                  <option>Bank of America</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Account number</label>
                <input type="text" placeholder="e.g 09847362527" className={inputClass} />
              </div>
            </div>
            <div>
              <label className={labelClass}>Account name</label>
              <input type="text" placeholder="Autoloads" className={inputClass} />
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-end gap-3 pt-6 mt-4 border-t border-slate-100">
        <button
          onClick={() => {
            const currentIndex = TABS.indexOf(activeTab);
            if (currentIndex < TABS.length - 1) {
              setActiveTab(TABS[currentIndex + 1]);
            } else {
              onClose();
            }
          }}
          className="px-6 py-2.5 bg-[#38BDF8] hover:bg-[#2BA5DF] text-white text-[14px] font-bold rounded-full transition-all cursor-pointer"
        >
          {activeTab === "Bank details" ? "Save" : "Next"}
        </button>
        <button
          onClick={onClose}
          className="px-6 py-2.5 bg-[#FAFAFA] hover:bg-slate-100 border border-[#E7E7E7] text-[14px] font-bold text-slate-700 rounded-full transition-all cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
}
