import type { Company } from "../companies/types";

interface OverviewTabProps {
  company: Company;
  onSwitchTab: (tab: "Billing" | "Support" | "Emails") => void;
  onChangePlan: () => void;
  onEditCompany?: () => void;
  onResetPassword?: () => void;
}

const OPEN_TICKETS = [
  {
    id: "TKT-0039",
    badge: "FEATURE",
    badgeClass: "bg-[#EFF6FF] text-[#37AADF]",
    title: "Add bulk leave approval feature",
    meta: "TKT-0039 · 3 days ago",
    priority: "High",
    priorityClass: "bg-[#FEF3C7] text-[#D97706]",
  },
  {
    id: "TKT-0041",
    badge: "BUG",
    badgeClass: "bg-[#FEE2E2] text-[#EF4444]",
    title: "Unable to export payroll PDF",
    meta: "TKT-0041 · Today 09:12",
    priority: "Critical",
    priorityClass: "bg-[#FEE2E2] text-[#EF4444]",
  },
  {
    id: "TKT-0040",
    badge: "BUG",
    badgeClass: "bg-[#FEE2E2] text-[#EF4444]",
    title: "Mobile app crashes on shift start",
    meta: "TKT-0040 · Yesterday",
    priority: "Medium",
    priorityClass: "bg-[#FEF3C7] text-[#D97706]",
  },
];

const RECENT_EMAILS = [
  {
    id: "em-1",
    subject: "Subscription renewal reminder - 95 days to go",
    time: "Today 08:00",
    tag: "Billing",
    tagClass: "bg-[#FEF3C7] text-[#D97706]",
  },
  {
    id: "em-2",
    subject: "New feature: Petty Cash module now live",
    time: "2 days ago",
    tag: "Billing",
    tagClass: "bg-[#FEF3C7] text-[#D97706]",
  },
  {
    id: "em-3",
    subject: "Scheduled maintenance - 20 May 2:00am UTC",
    time: "5 days ago",
    tag: "Maintenance",
    tagClass: "bg-[#FEE2E2] text-[#EF4444]",
  },
];

const MONTHS = [
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
];

const GROWTH_POINTS = [12, 16, 15, 24, 21, 27, 25, 31, 30, 35, 39, 44];

export function OverviewTab({
  company,
  onSwitchTab,
  onChangePlan,
  onEditCompany,
  onResetPassword,
}: OverviewTabProps) {
  const initials = company.adminName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const maxVal = 48;
  const chartW = 520;
  const chartH = 90;
  const coords = GROWTH_POINTS.map((val, idx) => {
    const x = (idx / (GROWTH_POINTS.length - 1)) * chartW;
    const y = chartH - (val / maxVal) * (chartH - 16) - 8;
    return { x, y };
  });
  const linePath = coords
    .map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`)
    .join(" ");
  const areaPath = `${linePath} L${chartW},${chartH} L0,${chartH} Z`;

  return (
    <div className="space-y-5">
      {/* Top 6 KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-4">
        <div className="bg-white rounded-2xl p-4 border border-slate-100/80">
          <p className="text-[11px] font-semibold uppercase text-slate-400">
            Total users
          </p>
          <p className="text-[22px] font-bold text-[#2E3A59] mt-1">
            {company.users}
          </p>
          <p className="text-[11px] text-slate-400">
            {company.activeUsers} active
          </p>
          <p className="text-[11px] leading-2.5 font-medium text-[#16A34A]">
            ↑ 8% vs last month
          </p>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-100/80 ">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
            Active users
          </p>
          <p className="text-[22px] font-bold text-[#16A34A] mt-1">
            {company.activeUsers}
          </p>
          <p className="text-[11px] text-slate-400 mt-0.5">Last 30 days</p>
          <p className="text-[11px] leading-2.5  font-medium text-[#16A34A]">
            ↑ 5% vs last month
          </p>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-100/80 ">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
            DAU
          </p>
          <p className="text-[22px] font-bold text-[#37AADF] mt-1">24</p>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Daily active users
          </p>
          <p className="text-[11px] leading-2.5  font-medium text-[#16A34A]">
            ↑ 12% vs last month
          </p>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-100/80 ">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
              Plan
            </p>
            <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-[#16A34A] text-[10px] leading-2.5 font-semibold">
              {company.status}
            </span>
          </div>
          <p className="text-[20px] font-bold text-[#A855F7] mt-1">
            {company.plan}
          </p>
          <p className="text-[11px] text-slate-400 mt-1">£249/mo</p>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-100/80 ">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
            CSAT score
          </p>
          <p className="text-[22px] font-bold text-[#F59E0B] mt-1">4.3/5</p>
          <p className="text-[11px] text-slate-400 mt-1">NPS 72</p>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-100/80 ">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
            Lifetime revenue
          </p>
          <p className="text-[22px] font-bold text-[#16A34A] mt-1">£3,486</p>
          <p className="text-[11px] text-slate-400 mt-1">9 invoices</p>
        </div>
      </div>

      {/* Main 2-column grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column */}
        <div className="lg:col-span-7 space-y-5">
          {/* Company Information */}
          <div className="bg-white rounded-2xl p-5 border border-slate-100/80 ">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[12px] font-bold uppercase tracking-wide text-[#2E3A59]">
                Company information
              </h3>
              <button
                type="button"
                onClick={onEditCompany}
                className="px-3.5 py-1 rounded-full bg-[#16A34A] hover:bg-[#15803D] text-white text-[11px] font-semibold transition-colors cursor-pointer"
              >
                Edit
              </button>
            </div>

            <div className="bg-[#F8FAFC] rounded-xl p-4 space-y-2.5 text-[12px]">
              {[
                { label: "Company ID", value: company.companyCode },
                {
                  label: "Workspace",
                  value: `app.virtualwatch.co.uk/${company.workspace}`,
                },
                { label: "Industry", value: company.industry },
                { label: "Reg. number", value: company.registrationNumber },
                {
                  label: "Address",
                  value: `${company.address1}${company.postcode ? `, ${company.postcode}` : ""}`,
                },
                { label: "Phone", value: company.contactPhone },
                {
                  label: "Website",
                  value: `www.${company.workspace.replace(/[^a-z0-9]/gi, "")}.co.uk`,
                },
                { label: "Joined", value: company.registered },
              ].map((row) => (
                <div
                  key={row.label}
                  className="flex items-center justify-between gap-4"
                >
                  <span className="text-slate-400">{row.label}</span>
                  <span className="font-medium text-[#2E3A59] text-right">
                    {row.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Company Administrator */}
          <div className="bg-white rounded-2xl p-5 border border-slate-100/80 ">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[12px] font-bold uppercase tracking-wide text-[#2E3A59]">
                Company administrator
              </h3>
              <button
                type="button"
                onClick={onResetPassword}
                className="px-3.5 py-1 rounded-full bg-[#FDE68A] hover:bg-[#FCD34D] text-[#92400E] text-[11px] font-semibold transition-colors cursor-pointer"
              >
                Reset password
              </button>
            </div>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#EBF6FC] text-[#37AADF] font-bold text-[13px] flex items-center justify-center shrink-0">
                {initials}
              </div>
              <div>
                <p className="text-[13px] font-bold text-[#2E3A59]">
                  {company.adminName}
                </p>
                <p className="text-[11px] text-slate-400">
                  {company.adminRole}
                </p>
              </div>
            </div>

            <div className="bg-[#F8FAFC] rounded-xl p-4 space-y-2.5 text-[12px]">
              <div className="flex items-center justify-between gap-4">
                <span className="text-slate-400">Email</span>
                <span className="font-medium text-[#2E3A59]">
                  {company.adminEmail}
                </span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-slate-400">Phone</span>
                <span className="font-medium text-[#2E3A59]">
                  {company.adminPhone}
                </span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-slate-400">Last login</span>
                <span className="font-medium text-[#2E3A59]">
                  {company.lastLogin}
                </span>
              </div>
            </div>
          </div>

          {/* User Growth */}
          <div className="bg-white rounded-2xl p-5 border border-slate-100/80 ">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[12px] font-bold uppercase tracking-wide text-[#2E3A59]">
                User growth (12 months)
              </h3>
              <span className="text-[12px] font-semibold text-[#16A34A]">
                +68% YoY
              </span>
            </div>

            <div className="w-full">
              <svg
                viewBox={`0 0 ${chartW} ${chartH}`}
                className="w-full h-28 overflow-visible"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient
                    id="userGrowthGrad"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#22C55E" stopOpacity="0.22" />
                    <stop offset="100%" stopColor="#22C55E" stopOpacity="0.02" />
                  </linearGradient>
                </defs>
                <path d={areaPath} fill="url(#userGrowthGrad)" />
                <path
                  d={linePath}
                  fill="none"
                  stroke="#22C55E"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1">
                {MONTHS.map((m) => (
                  <span key={m}>{m}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-5 space-y-5">
          {/* Subscription */}
          <div className="bg-white rounded-2xl p-5 border border-slate-100/80 ">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-[12px] font-bold uppercase tracking-wide text-[#2E3A59]">
                Subscription
              </h3>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-[#16A34A] text-[11px] font-semibold">
                {company.status}
              </span>
            </div>

            <p className="text-[16px] font-bold text-[#2E3A59]">
              {company.plan} plan
            </p>
            <p className="text-[12px] text-slate-400 mt-0.5 mb-3">
              £249/mo · Up to 100 users
            </p>

            <div className="bg-[#F8FAFC] rounded-xl p-3.5 space-y-2 text-[12px] mb-4">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Renewal date</span>
                <span className="font-medium text-[#2E3A59]">14 Aug 2026</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Next invoice</span>
                <span className="font-medium text-[#2E3A59]">
                  £249 on 01 Jun 2026
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Payment method</span>
                <span className="font-medium text-[#2E3A59]">Visa ···· 4821</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => onSwitchTab("Billing")}
                className="h-9 rounded-full bg-[#37AADF] hover:bg-[#2F99CA] text-white text-[12px] font-medium transition-colors cursor-pointer"
              >
                View billing
              </button>
              <button
                type="button"
                onClick={onChangePlan}
                className="h-9 rounded-full bg-[#F4F6F9] hover:bg-slate-200/70 text-[#2E3A59] text-[12px] font-medium transition-colors cursor-pointer"
              >
                Change plan
              </button>
            </div>
          </div>

          {/* User Breakdown */}
          <div className="bg-white rounded-2xl p-5 border border-slate-100/80 ">
            <h3 className="text-[12px] font-bold uppercase tracking-wide text-[#2E3A59] mb-4">
              User breakdown
            </h3>

            <div className="flex items-center gap-6">
              <div className="relative w-16 h-16 shrink-0">
                <svg viewBox="0 0 36 36" className="w-16 h-16 -rotate-90">
                  <circle
                    cx="18"
                    cy="18"
                    r="15"
                    fill="none"
                    stroke="#F1F5F9"
                    strokeWidth="4"
                  />
                  <circle
                    cx="18"
                    cy="18"
                    r="15"
                    fill="none"
                    stroke="#22C55E"
                    strokeWidth="4"
                    strokeDasharray="76 100"
                    strokeLinecap="round"
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-[12px] font-bold text-[#2E3A59]">
                  81%
                </span>
              </div>

              <div className="flex-1 space-y-1.5 text-[12px]">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-slate-500">
                    <span className="w-2 h-2 rounded-full bg-[#22C55E]" />
                    Active
                  </span>
                  <span className="font-semibold text-[#2E3A59]">
                    {company.activeUsers}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-slate-500">
                    <span className="w-2 h-2 rounded-full bg-[#EF4444]" />
                    Disabled
                  </span>
                  <span className="font-semibold text-[#2E3A59]">
                    {company.disabledUsers}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-slate-500">
                    <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
                    Invited
                  </span>
                  <span className="font-semibold text-[#2E3A59]">3</span>
                </div>
              </div>
            </div>
          </div>

          {/* Storage */}
          <div className="bg-white rounded-2xl p-5 border border-slate-100/80 ">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[12px] font-bold uppercase tracking-wide text-[#2E3A59]">
                Storage
              </h3>
              <span className="text-[12px] font-medium text-slate-500">
                62/100 GB
              </span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
              <div className="h-full w-[62%] rounded-full bg-[#22C55E]" />
            </div>
            <p className="text-[11px] text-slate-400 mt-2">
              62% used · 38 GB remaining
            </p>
          </div>

          {/* Open Support Tickets */}
          <div className="bg-white rounded-2xl p-5 border border-slate-100/80 ">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[12px] font-bold uppercase tracking-wide text-[#2E3A59]">
                Open support tickets
              </h3>
              <button
                type="button"
                onClick={() => onSwitchTab("Support")}
                className="text-[12px] font-semibold text-[#16A34A] hover:underline cursor-pointer"
              >
                View all
              </button>
            </div>

            <div className="space-y-3">
              {OPEN_TICKETS.map((t) => (
                <div
                  key={t.id}
                  className="flex items-start justify-between gap-3 py-1.5 border-b border-slate-50 last:border-0"
                >
                  <div className="flex items-start gap-2.5 min-w-0">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold shrink-0 mt-0.5 ${t.badgeClass}`}
                    >
                      {t.badge}
                    </span>
                    <div className="min-w-0">
                      <p className="text-[12px] font-medium text-[#2E3A59] truncate">
                        {t.title}
                      </p>
                      <p className="text-[11px] text-slate-400">{t.meta}</p>
                    </div>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-semibold shrink-0 ${t.priorityClass}`}
                  >
                    {t.priority}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Emails */}
          <div className="bg-white rounded-2xl p-5 border border-slate-100/80 ">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[12px] font-bold uppercase tracking-wide text-[#2E3A59]">
                Recent emails
              </h3>
              <button
                type="button"
                onClick={() => onSwitchTab("Emails")}
                className="text-[12px] font-semibold text-[#16A34A] hover:underline cursor-pointer"
              >
                View all
              </button>
            </div>

            <div className="space-y-3">
              {RECENT_EMAILS.map((em) => (
                <div
                  key={em.id}
                  className="flex items-start justify-between gap-3 py-1.5 border-b border-slate-50 last:border-0"
                >
                  <div className="min-w-0">
                    <p className="text-[12px] font-medium text-[#2E3A59] truncate">
                      {em.subject}
                    </p>
                    <p className="text-[11px] text-slate-400">{em.time}</p>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-semibold shrink-0 ${em.tagClass}`}
                  >
                    {em.tag}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}