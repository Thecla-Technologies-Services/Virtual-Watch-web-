import { IdCard } from '@duo-icons/react';
import { Link, useLocation } from 'react-router-dom';

import virtualWatchLogo from "../../assets/virtual-watch.png";
import { useAuth } from "../../contexts/AuthContext";
import { menuItems, generalItems } from "../../config/menu";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { pathname } = useLocation();
  const { user, hasAnyRole, logout } = useAuth();

  const getPath = (item: { name: string; path?: string }) => {
    if (item.path) return item.path;
    if (item.name === "Dashboard") return "/";
    return "/" + item.name.toLowerCase().replace(/\s+/g, "-");
  };

  const filteredMenuItems = menuItems.filter(item => 
    item.roles === undefined || hasAnyRole(item.roles)
  );

  const filteredGeneralItems = generalItems.filter(item => 
    item.roles === undefined || hasAnyRole(item.roles)
  );

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm lg:hidden transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 flex w-72 flex-col bg-linear-to-b from-[#42A5E2] to-[#2972D0] text-white shadow-xl transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo Section */}
        <div className="flex items-center gap-3 px-6 py-6 border-b border-white/10">
          <img src={virtualWatchLogo} alt="virtual watch logo" className="h-10 w-auto"/>
        </div>

        {/* Scrollable Navigation Menu */}
        <div className="flex-1 overflow-y-auto py-4 space-y-6 scrollbar-thin scrollbar-thumb-white/20">
          {/* MENU Section */}
          <div className="space-y-1">
            <h3 className="px-6 text-xs font-bold uppercase tracking-wider text-white/50">
              Menu
            </h3>
            <ul className="space-y-1 mt-2">
              {filteredMenuItems.map((item) => {
                const itemPath = getPath(item);
                const isActive = pathname === itemPath;
                const Icon = item.icon;
                return (
                  <li key={item.name}>
                    <Link
                      to={itemPath}
                      onClick={() => {
                        if (window.innerWidth < 1024) onClose();
                      }}
                      className={`flex w-full items-center gap-3.5 px-6 py-2 text-[13px] font-medium transition-all duration-200 outline-none cursor-pointer ${
                        isActive
                          ? "bg-white/8 text-white font-semibold"
                          : "text-white/80 hover:text-white"
                      }`}
                    >
                      <span className={`inline-flex shrink-0 ${isActive ? "text-white" : "text-white/80"}`}>
                        <Icon size={18} />
                      </span>
                      <span>{item.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* GENERAL Section */}
          <div className="space-y-1">
            <h3 className="px-6 text-xs font-semibold uppercase tracking-wider text-white/50">
              General
            </h3>
            <ul className="space-y-1 mt-2">
              {filteredGeneralItems.map((item) => {
                const itemPath = getPath(item);
                const isActive = pathname === itemPath;
                const Icon = item.icon;
                return (
                  <li key={item.name}>
                    <Link
                      to={itemPath}
                      onClick={() => {
                        if (window.innerWidth < 1024) onClose();
                      }}
                      className={`flex w-full items-center gap-3.5 rounded-lg px-6 py-2 text-[14px] font-medium transition-all duration-200 outline-none hover:bg-white/10 ${
                        isActive
                          ? "bg-white/20 text-white shadow-inner font-semibold"
                          : "text-white/80 hover:text-white"
                      }`}
                    >
                      <span className={`inline-flex shrink-0 ${isActive ? "text-white" : "text-white/80"}`}>
                        <Icon size={18} />
                      </span>
                      <span>{item.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* User Card & Logout Section */}
        <div className="p-4 border-t border-white/10">
          <div className="rounded-xl bg-[#C6E2F7] p-3 text-slate-800 shadow-sm flex flex-col gap-3">
            <div className="flex items-center gap-3">
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="h-10 w-10 rounded-full object-cover border-2 border-white/65 shadow-sm"
                />
              ) : (
                <div className="h-10 w-10 rounded-full bg-slate-300 border-2 border-white/65 shadow-sm flex items-center justify-center text-slate-600 font-bold">
                  {user?.name?.charAt(0) || '?'}
                </div>
              )}
              <div className="flex flex-col">
                <span className="font-sans text-[14px] font-bold text-slate-900 leading-tight">{user?.name || 'Guest'}</span>
                <span className="font-sans text-[11px] font-semibold text-slate-600 leading-none mt-0.5">{user?.jobTitle || 'Role'}</span>
              </div>
            </div>
            
            <button
              onClick={() => logout()}
              className="flex w-full items-center justify-between rounded-lg bg-white/40 hover:bg-white/60 transition-colors px-3 py-1.5 text-xs font-bold text-slate-800 hover:text-slate-950"
            >
              <span>Logout</span>
              <IdCard size={14} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
