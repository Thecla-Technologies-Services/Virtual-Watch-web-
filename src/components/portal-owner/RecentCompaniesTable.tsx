import { useState } from "react";
import { Link } from "react-router-dom";

export interface CompanyRow {
  id: string;
  company: string;
  plan: "Enterprise" | "Professional" | "Starter";
  users: number;
  status: "Active" | "Trial" | "Suspended" | "Expired";
  lastLogin: string;
}

const RECENT_COMPANIES: CompanyRow[] = [
  {
    id: "1",
    company: "ABC Homecare",
    plan: "Enterprise",
    users: 48,
    status: "Active",
    lastLogin: "2 hours ago",
  },
  {
    id: "2",
    company: "Quantum Retail Group",
    plan: "Professional",
    users: 23,
    status: "Active",
    lastLogin: "1 day ago",
  },
  {
    id: "3",
    company: "NordTech Solutions",
    plan: "Starter",
    users: 8,
    status: "Trial",
    lastLogin: "3 hours ago",
  },
  {
    id: "4",
    company: "Apex Logistics",
    plan: "Professional",
    users: 31,
    status: "Suspended",
    lastLogin: "12 days ago",
  },
  {
    id: "5",
    company: "Bluewave Financial",
    plan: "Enterprise",
    users: 112,
    status: "Active",
    lastLogin: "5 minutes ago",
  },
];

const STATUS_DOT_COLOR: Record<CompanyRow["status"], string> = {
  Active: "bg-[#22C55E]",
  Trial: "bg-[#7C69EF]",
  Suspended: "bg-[#FFA940]",
  Expired: "bg-[#FF0E0E]",
};

export function RecentCompaniesTable() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const allSelected =
    RECENT_COMPANIES.length > 0 &&
    selectedIds.length === RECENT_COMPANIES.length;

  const toggleAll = () => {
    setSelectedIds(allSelected ? [] : RECENT_COMPANIES.map((c) => c.id));
  };

  const toggleRow = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="bg-white rounded-2xl p-6  border border-slate-100/80">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[13px] font-bold uppercase tracking-wider text-slate-800">
          RECENT COMPANIES
        </h3>
        <Link
          to="/portal-owner/companies"
          className="text-[12px] font-bold uppercase text-[#37AADF] hover:underline"
        >
          VIEW ALL
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-[13px] border-collapse">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="py-3.5 pr-4 w-10 text-left">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={toggleAll}
                  aria-label="Select all companies"
                  className="h-4 w-4 rounded border-slate-200 accent-[#37AADF] cursor-pointer"
                />
              </th>
              <th className="py-3.5 pr-4 text-left font-semibold text-slate-700">
                Company
              </th>
              <th className="py-3.5 pr-4 text-left font-semibold text-slate-700">
                Plan
              </th>
              <th className="py-3.5 pr-4 text-left font-semibold text-slate-700">
                Users
              </th>
              <th className="py-3.5 pr-4 text-left font-semibold text-slate-700">
                Status
              </th>
              <th className="py-3.5 text-left font-semibold text-slate-700">
                Last Login
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100/80">
            {RECENT_COMPANIES.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-slate-50/60 transition-colors"
              >
                <td className="py-4 pr-4">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(row.id)}
                    onChange={() => toggleRow(row.id)}
                    aria-label={`Select ${row.company}`}
                    className="h-4 w-4 rounded border-slate-200 accent-[#37AADF] cursor-pointer"
                  />
                </td>
                <td className="py-4 pr-4 font-medium text-slate-600">
                  {row.company}
                </td>
                <td className="py-4 pr-4 text-slate-600">{row.plan}</td>
                <td className="py-4 pr-4 text-slate-600">{row.users}</td>
                <td className="py-4 pr-4">
                  <div className="inline-flex items-center gap-2">
                    <span
                      className={`h-2 w-2 rounded-full ${STATUS_DOT_COLOR[row.status]}`}
                    />
                    <span className="text-slate-600 font-medium">
                      {row.status}
                    </span>
                  </div>
                </td>
                <td className="py-4 text-slate-500">{row.lastLogin}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

