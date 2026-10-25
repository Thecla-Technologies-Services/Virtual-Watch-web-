import { useState } from "react";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { RequestedItemsTab } from "@/components/expenses/RequestedItemsTab";
import { ItemsInstockTab } from "@/components/expenses/ItemsInstockTab";
import { PettyCashTab } from "@/components/expenses/PettyCashTab";
import {
  ClipboardList,
  CheckCircle2,
  Clock,
  Calendar as CalendarIcon,
  Receipt,
  Wallet,
} from "lucide-react";

export default function Expenses() {
  const [activeTab, setActiveTab] = useState<
    "Requested items" | "Items Instock" | "Petty cash"
  >("Items Instock");

  return (
    <div className="animate-fade-in duration-300 space-y-6">
      {/* Header Section */}
      <Breadcrumb
        pageTitle="EXPENSES & PETTY CASH"
        subtext="Manage staff expense claims and petty cash withdrawals"
        activePage={
          activeTab === "Petty cash" ? "Expenses & petty cash" : "Petty cash book"
        }
      />

      {/* Summary Cards */}
      {activeTab === "Requested items" || activeTab === "Items Instock" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Total entries */}
          <div className="bg-white rounded-2xl p-5 flex items-center gap-4">
            <div className="bg-[#EBF7FD] text-[#38BDF8] p-3.5 rounded-2xl flex items-center justify-center">
              <ClipboardList size={22} strokeWidth={2.5} />
            </div>
            <div>
              <h4 className="text-2xl font-extrabold leading-none mb-1">6</h4>
              <p className="text-[14px] font-normal text-muted">Total entries</p>
            </div>
          </div>

          {/* Grand total */}
          <div className="bg-white rounded-2xl p-5 flex items-center gap-4">
            <div className="bg-[#E8F8EE] text-[#36C328] p-3.5 rounded-2xl flex items-center justify-center">
              <CheckCircle2 size={22} strokeWidth={2.5} className="text-[#36C328]" />
            </div>
            <div>
              <h4 className="text-2xl font-extrabold leading-none mb-1">£25.39</h4>
              <p className="text-[14px] font-normal text-muted">Grand total</p>
            </div>
          </div>

          {/* Pending approval */}
          <div className="bg-white rounded-2xl p-5 flex items-center gap-4">
            <div className="bg-[#FEF5EA] text-[#F19E39] p-3.5 rounded-2xl flex items-center justify-center">
              <Clock size={22} strokeWidth={2.5} />
            </div>
            <div>
              <h4 className="text-2xl font-extrabold leading-none mb-1">6</h4>
              <p className="text-[14px] font-normal text-muted">
                Pending approval
              </p>
            </div>
          </div>

          {/* This month */}
          <div className="bg-white rounded-2xl p-5 flex items-center gap-4">
            <div className="bg-[#FFF6F5] text-[#FF1100] p-3.5 rounded-2xl flex items-center justify-center">
              <CalendarIcon size={22} strokeWidth={2.5} />
            </div>
            <div>
              <h4 className="text-2xl font-extrabold leading-none mb-1">£0.00</h4>
              <p className="text-[14px] font-normal text-muted">This month</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Total this month */}
          <div className="bg-white rounded-2xl p-5 flex items-center gap-4">
            <div className="bg-[#EBF7FD] text-[#38BDF8] p-3.5 rounded-2xl flex items-center justify-center">
              <Receipt size={22} strokeWidth={2.5} />
            </div>
            <div>
              <h4 className="text-2xl font-extrabold leading-none mb-1">
                £633.85
              </h4>
              <p className="text-[14px] font-normal text-muted">
                Total this month
              </p>
            </div>
          </div>

          {/* Approved today */}
          <div className="bg-white rounded-2xl p-5 flex items-center gap-4">
            <div className="bg-[#E8F8EE] text-[#36C328] p-3.5 rounded-2xl flex items-center justify-center">
              <CheckCircle2
                size={22}
                strokeWidth={2.5}
                className="text-[#36C328]"
              />
            </div>
            <div>
              <h4 className="text-2xl font-extrabold leading-none mb-1">
                £370.00
              </h4>
              <p className="text-[14px] font-normal text-muted">Approved today</p>
            </div>
          </div>

          {/* Pending */}
          <div className="bg-white rounded-2xl p-5 flex items-center gap-4">
            <div className="bg-[#FEF5EA] text-[#F19E39] p-3.5 rounded-2xl flex items-center justify-center">
              <Clock size={22} strokeWidth={2.5} />
            </div>
            <div className="flex-1">
              <div className="flex items-baseline justify-between">
                <h4 className="text-2xl font-extrabold leading-none mb-1">
                  £231.10
                </h4>
                <span className="text-[13px] font-normal text-muted">
                  2 claims
                </span>
              </div>
              <p className="text-[14px] font-normal text-muted">Pending</p>
            </div>
          </div>

          {/* Budget used */}
          <div className="bg-white rounded-2xl p-5   flex items-center gap-4">
            <div className="bg-[#F3EAFF] text-[#A65BFF] p-3.5 rounded-2xl flex items-center justify-center">
              <Wallet size={22} strokeWidth={2.5} />
            </div>
            <div>
              <h4 className="text-2xl font-extrabold leading-none mb-1">42%</h4>
              <p className="text-[14px] font-normal text-muted">Budget used</p>
            </div>
          </div>
        </div>
      )}

      {/* Main Container */}
      <div className="bg-white rounded-2xl  overflow-hidden flex flex-col">
        {/* Top Switcher Tabs */}
        <div className="p-5 pb-0 flex items-center gap-2 border-b">
          <button
            type="button"
            onClick={() => setActiveTab("Requested items")}
            className={`px-5 py-2 rounded-t-xl text-[13px] transition-all cursor-pointer ${
              activeTab === "Requested items"
                ? "bg-[#EBF7FD] text-[#38BDF8] font-bold"
                : "text-muted hover:text-slate-700 font-medium bg-transparent"
            }`}
          >
            Requested items
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("Items Instock")}
            className={`px-5 py-2 rounded-t-xl text-[13px] transition-all cursor-pointer ${
              activeTab === "Items Instock"
                ? "bg-[#EBF7FD] text-[#38BDF8] font-bold"
                : "text-muted hover:text-slate-700 font-medium bg-transparent"
            }`}
          >
            Items Instock
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("Petty cash")}
            className={`px-5 py-2 rounded-t-xl text-[13px] transition-all cursor-pointer ${
              activeTab === "Petty cash"
                ? "bg-[#EBF7FD] text-[#38BDF8] font-bold"
                : "text-muted hover:text-slate-700 font-medium bg-transparent"
            }`}
          >
            Petty cash
          </button>
        </div>

        {/* Tab Content Components */}
        {activeTab === "Requested items" && <RequestedItemsTab />}
        {activeTab === "Items Instock" && <ItemsInstockTab />}
        {activeTab === "Petty cash" && <PettyCashTab />}
      </div>
    </div>
  );
}
