import { Users, ClipboardList, AlertTriangle, TrendingUp } from "lucide-react";

interface MetricCardProps {
  label: string;
  value: string;
  delta: string;
  deltaLabel: string;
  icon: React.ReactNode;
  iconWrapperClass: string;
}

function MetricCard({
  label,
  value,
  delta,
  deltaLabel,
  icon,
  iconWrapperClass,
}: MetricCardProps) {
  return (
    <div className="bg-white rounded-2xl px-6 py-5 flex items-center justify-between gap-4  border border-slate-100/80">
      <div>
        <span className="text-[13px] text-slate-400 font-medium block">
          {label}
        </span>
        <div className="flex items-baseline gap-2 mt-1.5 flex-wrap">
          <span className="text-[26px] font-bold text-slate-800 leading-none tracking-tight">
            {value}
          </span>
          <span className="inline-flex items-center gap-1 text-[12px] font-semibold text-[#22C55E]">
            <TrendingUp size={13} strokeWidth={2.5} />
            <span>{delta}</span>
          </span>
          <span className="text-[12px] text-slate-400 font-medium">
            {deltaLabel}
          </span>
        </div>
      </div>
      <div
        className={`h-11 w-11 rounded-xl flex items-center justify-center shrink-0 ${iconWrapperClass}`}
      >
        {icon}
      </div>
    </div>
  );
}

export function PortalMetrics() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      <MetricCard
        label="Total Companies"
        value="203"
        delta="+12"
        deltaLabel="this month"
        iconWrapperClass="bg-[#E8F8EE] text-[#22C55E]"
        icon={<Users size={22} strokeWidth={2.2} />}
      />
      <MetricCard
        label="Monthly Revenue"
        value="$72,300"
        delta="+6.5%"
        deltaLabel="vs last month"
        iconWrapperClass="bg-[#FEF7E6] text-[#F59E0B]"
        icon={<ClipboardList size={22} strokeWidth={2.2} />}
      />
      <MetricCard
        label="Active Users"
        value="4,821"
        delta="+8.2%"
        deltaLabel="MAU"
        iconWrapperClass="bg-[#FEF2F2] text-[#F87171]"
        icon={<AlertTriangle size={22} strokeWidth={2.2} />}
      />
    </div>
  );
}

