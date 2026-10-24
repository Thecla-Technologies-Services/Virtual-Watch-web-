import { Menu, Search, ChevronDown } from "lucide-react";
import inalegwuEhiAvatar from "../../assets/inalegwu_ehi.png";
import {Bell} from '@duo-icons/react'

interface HeaderProps {
  onToggleSidebar: () => void;
}

export function Header({ onToggleSidebar }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-18 w-full items-center justify-between px-6 bg-white shadow-xl shadow-[#12263F08]">
      {/* Left side: Hamburger + Search */}
      <div className="flex items-center gap-4 flex-1 max-w-md">
        {/* Sidebar Toggle Button */}
        <button
          onClick={onToggleSidebar}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-50 active:scale-95 transition-all lg:hidden"
          aria-label="Toggle sidebar"
        >
          <Menu className="h-5.5 w-5.5" />
        </button>

        {/* Search Bar */}
        <div className="relative w-full">
          <span className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="h-4.5 w-4.5" />
          </span>
          <input
            type="search"
            placeholder="Search..."
            className="w-full h-10 rounded-full bg-slate-50/70 border border-slate-100 pl-11 pr-4 text-[14px] text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
          />
        </div>
      </div>

      {/* Right side: Tenant Select + Notifications + User Menu */}
      <div className="flex items-center gap-4 lg:gap-6">
        {/* Corporate Tenant selector pill */}
        <button className="hidden sm:flex items-center gap-2 rounded-full bg-primary/8 px-3 py-2.5 text-xs font-bold text-primary hover:bg-primary/20 transition-colors">
          <span className="h-2 w-2 rounded-full bg-primary" />
          <span>MECA CORP</span>
          <ChevronDown className="h-3.5 w-3.5 opacity-80" />
        </button>

        {/* Notification Bell */}
        <button className="relative flex h-10 w-10 items-center justify-center rounded-full text-slate-600 hover:bg-slate-50 hover:text-slate-900 active:scale-95 transition-all">
          <Bell size={16} />
          <span className="absolute top-1 right-2 flex size-3.5 items-center justify-center rounded-full bg-rose-500 text-[9px] font-bold text-white ring-2 ring-white">
            3
          </span>
        </button>

        {/* Profile Dropdown */}
        <button className="flex items-center gap-3 rounded-xl p-1 text-left hover:bg-slate-50 transition-colors">
          <img
            src={inalegwuEhiAvatar}
            alt="Inalegwu Ehi"
            className="size-7 rounded-full object-cover border border-slate-200 shadow-sm"
          />
          <div className="hidden md:flex flex-col">
            <span className="text-[13px] font-bold leading-tight">
              Inalegwu Ehi
            </span>
            <span className="text-[12px] font-normal text-muted leading-none mt-1">
              Super Admin
            </span>
          </div>
          <ChevronDown className="h-4 w-4 text-slate-400 hidden md:block" />
        </button>
      </div>
    </header>
  );
}
