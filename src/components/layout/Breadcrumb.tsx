import { Link } from "react-router-dom";

interface BreadcrumbProps {
  pageTitle: string;
  subtext: string;
  activePage: string;
  breadcrumbs?: { label: string; path: string }[];
}

export function Breadcrumb({ pageTitle, subtext, activePage, breadcrumbs = [] }: BreadcrumbProps) {
    return(
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-5 border-b border-slate-100">
        <div>
          <h1 className="text-base font-extrabold uppercase tracking-tight text-[#333333] m-0 leading-none">
            {pageTitle}
          </h1>
          <p className="text-muted text-[13px] mt-2 font-medium">
            {subtext}
          </p>
        </div>
        <div className="flex items-center gap-2 text-[13px]">
          <span className="cursor-pointer transition-colors">
            Dashboard
          </span>
          {breadcrumbs.map(({ label, path }) => (
            <span key={path} className="flex items-center gap-2">
              <span>/</span>
              <Link to={path} className="transition-colors hover:text-primary">
                {label}
              </Link>
            </span>
          ))}
          <span className="">/</span>
          <span className="text-primary font-semibold">
            {activePage}
          </span>
        </div>
      </div>
    )
}