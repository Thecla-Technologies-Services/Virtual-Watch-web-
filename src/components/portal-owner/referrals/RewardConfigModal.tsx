import { useState } from "react";
import { Modal } from "@/components/ui/Modal";

interface RewardConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function RewardConfigModal({ isOpen, onClose }: RewardConfigModalProps) {
  const [config, setConfig] = useState({
    subscriptionCredit: true,
    freeMonth: true,
    discountVoucher: false,
  });

  const items = [
    {
      key: "subscriptionCredit" as const,
      title: "Subscription credit",
      subtitle: "Applied directly to next invoice",
    },
    {
      key: "freeMonth" as const,
      title: "Free subscription month",
      subtitle: "One full billing cycle at no cost",
    },
    {
      key: "discountVoucher" as const,
      title: "Discount voucher",
      subtitle: "10% off next 3 months",
    },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} width="lg" height="2xl">
      <div className="px-2 pb-1">
        {/* Header */}
        <div className="pb-3 border-b border-slate-100">
          <h2 className="text-[15px] font-bold text-slate-800">
            Notification types
          </h2>
        </div>

        <div className="pt-4 space-y-3">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            REWARD CONFIGURATION
          </p>

          <div className="space-y-2.5">
            {items.map((item) => {
              const checked = config[item.key];
              return (
                <div
                  key={item.key}
                  className="rounded-xl bg-[#F8FAFC] px-4 py-3.5 flex items-center justify-between gap-4"
                >
                  <div>
                    <p className="text-[13.5px] font-bold text-slate-800 leading-tight">
                      {item.title}
                    </p>
                    <p className="text-[12px] text-slate-400 mt-0.5">
                      {item.subtitle}
                    </p>
                  </div>

                  <button
                    type="button"
                    role="switch"
                    aria-checked={checked}
                    aria-label={item.title}
                    onClick={() =>
                      setConfig((prev) => ({
                        ...prev,
                        [item.key]: !prev[item.key],
                      }))
                    }
                    className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors cursor-pointer ${
                      checked ? "bg-[#37AADF]" : "bg-slate-300"
                    }`}
                  >
                    <span
                      className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow-xs transition-transform ${
                        checked ? "translate-x-[18px]" : "translate-x-[3px]"
                      }`}
                    />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end pt-5">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-[#F4F6F9] hover:bg-slate-200/70 text-slate-700 px-6 py-2.5 text-[13px] font-semibold transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
}

