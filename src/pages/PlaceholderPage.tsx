import { Breadcrumb } from "@/components/layout/Breadcrumb";

interface PlaceholderPageProps {
  name: string;
}

export function PlaceholderPage({ name }: PlaceholderPageProps) {
  return (
    <div className="animate-fade-in duration-300">
      {/* Page Title & Breadcrumb Header */}
      <Breadcrumb
        pageTitle={name}
        subtext={`Management interface and metrics for ${name.toLowerCase()}`}
        activePage={name}
      />

      {/* Main Content Area */}
      <div className="flex flex-col items-center justify-center border border-slate-100 rounded-3xl p-16 bg-white shadow-xl shadow-[#12263F03] text-center min-h-[400px]">
        <div className="rounded-2xl bg-primary/8 p-5 text-primary mb-6 animate-pulse duration-2000">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-12 w-12"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="M3 9h18" />
            <path d="M9 21V9" />
          </svg>
        </div>
        <h2 className="text-xl font-extrabold text-slate-800 tracking-tight m-0">
          {name} Section
        </h2>
        <p className="text-slate-400 text-[14px] max-w-md mt-3 font-medium leading-relaxed">
          The {name.toLowerCase()} page is configured and active. Detailed data modules, database integrations, and operations tables will appear here.
        </p>
        <button className="mt-8 rounded-xl bg-primary px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-primary/25 hover:bg-primary/95 active:scale-95 transition-all cursor-pointer">
          Initialize {name} setup
        </button>
      </div>
    </div>
  );
}

export default PlaceholderPage;
