import { ClipboardList } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string;
  iconBg: string;
  iconColor: string;
}

function StatCard({ label, value, iconBg, iconColor }: StatCardProps) {
  return (
    <div className="bg-white rounded-2xl px-5 py-4 flex items-center justify-between gap-3  border border-slate-100/80">
      <div>
        <span className="text-[12.5px] text-slate-400 font-medium block">
          {label}
        </span>
        <span className="text-[22px] font-bold text-slate-800 leading-none tracking-tight mt-2 block">
          {value}
        </span>
      </div>

      <div
        className={`h-8 w-8 rounded-lg ${iconBg} ${iconColor} flex items-center justify-center shrink-0`}
      >
        <ClipboardList size={16} strokeWidth={2.2} />
      </div>
    </div>
  );
}

export function SupportMetrics() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
      <StatCard
        label="Open"
        value="23"
        iconBg="bg-[#EBF7FD]"
        iconColor="text-[#37AADF]"
      />
      <StatCard
        label="In progress"
        value="11"
        iconBg="bg-[#FEF7E6]"
        iconColor="text-[#F59E0B]"
      />
      <StatCard
        label="Critical"
        value="1"
        iconBg="bg-[#FEF2F2]"
        iconColor="text-[#EF4444]"
      />
      <StatCard
        label="Resolved"
        value="14"
        iconBg="bg-[#E8F8EE]"
        iconColor="text-[#22C55E]"
      />
      <StatCard
        label="Closed"
        value="1"
        iconBg="bg-slate-100"
        iconColor="text-slate-500"
      />
    </div>
  );
}

