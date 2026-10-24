import { useState } from "react";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { ChevronDown, ChevronRight } from "lucide-react";

/* ── Types ─────────────────────────────────────────── */
type ReleaseType = "Feature" | "Bug fix" | "Hot fix";

interface ReleaseSection {
  heading: string;
  items: string[];
}

interface ReleaseNote {
  id: string;
  version: string;
  type: ReleaseType;
  date: string;
  sections: ReleaseSection[];
}

/* ── Mock data ─────────────────────────────────────── */
const RELEASE_NOTES: ReleaseNote[] = [
  {
    id: "1",
    version: "v3.4.0",
    type: "Feature",
    date: "Jul 1, 2024",
    sections: [
      {
        heading: "NEW FEATURES",
        items: [
          "Advanced analytics export to PDF/Excel/CSV",
          "Bulk user import via CSV template",
          "Notification filtering by category and date",
          "Improved dashboard load performance (40% faster)",
        ],
      },
      {
        heading: "BUG FIXES",
        items: [
          "Permission cache not refreshing after role change (#DEV-892)",
          "Audit log export row limit removed",
          "Billing date display inconsistency resolved",
          "Improved dashboard load performance (40% faster)",
        ],
      },
    ],
  },
  {
    id: "2",
    version: "v3.3.2",
    type: "Bug fix",
    date: "Jun 14, 2024",
    sections: [
      {
        heading: "BUG FIXES",
        items: [
          "Fixed session timeout not logging out inactive users",
          "Resolved rota conflict detection false positives",
          "Fixed CSV export encoding issue for special characters",
        ],
      },
    ],
  },
  {
    id: "3",
    version: "v3.3.0",
    type: "Feature",
    date: "Jun 1, 2024",
    sections: [
      {
        heading: "NEW FEATURES",
        items: [
          "Live chat support widget now available in all plans",
          "Company profile page for admin users",
          "Release notes page added to portal",
        ],
      },
    ],
  },
  {
    id: "4",
    version: "v3.2.1",
    type: "Hot fix",
    date: "May 20, 2024",
    sections: [
      {
        heading: "HOT FIX",
        items: [
          "Critical: Fixed login loop for SAML SSO users",
          "Fixed broken notification links on mobile",
        ],
      },
    ],
  },
  {
    id: "5",
    version: "v3.2.0",
    type: "Feature",
    date: "May 1, 2024",
    sections: [
      {
        heading: "NEW FEATURES",
        items: [
          "Multi-company support for portal owners",
          "Audit log now includes IP address tracking",
          "Dark mode support (beta)",
        ],
      },
    ],
  },
];

const TYPE_BADGE: Record<ReleaseType, string> = {
  "Feature": "bg-[#EBF7FD] text-[#38BDF8]",
  "Bug fix": "bg-red-50 text-red-500",
  "Hot fix": "bg-orange-50 text-orange-500",
};

/* ── Page ──────────────────────────────────────────── */
export default function ReleaseNote() {
  const [openId, setOpenId] = useState<string>(RELEASE_NOTES[0].id);

  const toggle = (id: string) => setOpenId((prev) => (prev === id ? "" : id));

  return (
    <div className="animate-fade-in duration-300 space-y-6">
      <Breadcrumb
        pageTitle="RELEASE NOTES"
        subtext="Platform changelog and feature updates"
        activePage="Release notes"
      />

      {/* Accordion list */}
      <div className="bg-white rounded-2xl overflow-hidden p-4 space-y-3">
        {RELEASE_NOTES.map((note) => {
          const isOpen = openId === note.id;
          return (
            <div key={note.id} className="border rounded-xl">
              {/* Row header */}
              <button
                type="button"
                onClick={() => toggle(note.id)}
                className="w-full flex items-center justify-between px-6 py-4 hover:bg-slate-50/60 transition-colors cursor-pointer text-left"
              >
                <div className="flex items-center gap-3">
                  <span className="text-[14px] font-bold text-slate-800">{note.version}</span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${TYPE_BADGE[note.type]}`}>
                    {note.type}
                  </span>
                  <span className="text-[13px] text-slate-400 font-medium">{note.date}</span>
                </div>
                <span className="text-slate-400 shrink-0 ml-3">
                  {isOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                </span>
              </button>

              {/* Expanded content */}
              {isOpen && (
                <div className="px-6 pb-6 space-y-5">
                  {note.sections.map((section) => (
                    <div key={section.heading}>
                      <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-3">
                        {section.heading}
                      </p>
                      <ul className="space-y-2">
                        {section.items.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-[13px] text-slate-600 font-medium">
                            <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-slate-400 shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
