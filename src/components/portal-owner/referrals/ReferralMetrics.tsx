import { ClipboardList, TrendingUp } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string;
  delta: string;
  subLabel: string;
  iconBg: string;
  iconColor: string;
}

function StatCard({
  label,
  value,
  delta,
  subLabel,
  iconBg,
  iconColor,
}: StatCardProps) {
  return (
    <div className="bg-white rounded-2xl px-5 py-4 flex items-center justify-between gap-3  border border-slate-100/80">
      <div className="min-w-0">
        <span className="text-[12.5px] text-slate-400 font-medium block truncate">
          {label}
        </span>
        <div className="flex items-baseline gap-1.5 mt-1.5 flex-wrap">
          <span className="text-[22px] font-bold text-slate-800 leading-none tracking-tight">
            {value}
          </span>
          <span className="inline-flex items-center gap-0.5 text-[11.5px] font-semibold text-[#22C55E]">
            <TrendingUp size={12} strokeWidth={2.5} />
            <span>{delta}</span>
          </span>
          <span className="text-[11.5px] text-slate-400 font-medium">
            {subLabel}
          </span>
        </div>
      </div>

      <div
        className={`h-9 w-9 rounded-xl ${iconBg} ${iconColor} flex items-center justify-center shrink-0`}
      >
        <ClipboardList size={18} strokeWidth={2.2} />
      </div>
    </div>
  );
}

export function ReferralMetrics() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        label="Total referrals"
        value="47"
        delta="+8"
        subLabel="this quarter"
        iconBg="bg-[#E8F8EE]"
        iconColor="text-[#22C55E]"
      />
      <StatCard
        label="Converted"
        value="31"
        delta="+5"
        subLabel="paid subscribers"
        iconBg="bg-[#FEF7E6]"
        iconColor="text-[#F59E0B]"
      />
      <StatCard
        label="Pending reward"
        value="8"
        delta="+8"
        subLabel="awaiting qualification"
        iconBg="bg-[#EBF7FD]"
        iconColor="text-[#37AADF]"
      />
      <StatCard
        label="Total value"
        value="$12,400"
        delta="+$2,800"
        subLabel="in rewards issued"
        iconBg="bg-[#F3EFFE]"
        iconColor="text-[#A855F7]"
      />
    </div>
  );
}

