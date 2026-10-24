import React from "react";
import { ChevronLeft, ChevronRight, Clock } from "lucide-react";

export function WeeklyRota() {
  return (
    <div className="bg-white rounded-2xl p-6 flex flex-col justify-between h-full">
      {/* Header Row */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-[13px] font-bold uppercase tracking-wider text-muted">
          Weekly Rota
        </h3>
        <div className="flex items-center gap-3 text-sm font-bold text-muted cursor-pointer select-none">
          <button className="p-1 hover:bg-slate-100 rounded-full transition-colors">
            <ChevronLeft size={18} />
          </button>
          <span>April 22 - 26</span>
          <button className="p-1 hover:bg-slate-100 rounded-full transition-colors">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Grid Table Container */}
      <div className="flex-1 border rounded-2xl overflow-hidden bg-white">
        {/* Days Header Row */}
        <div className="grid grid-cols-11 border-b text-[13.5px] font-bold text-muted bg-[#FBFBFB]">
          <div className="col-span-2 p-3 border-r flex items-center justify-center text-xs">
            Time
          </div>
          <div className="col-span-2 p-3 border-r text-center">Mon 22</div>
          <div className="col-span-2 p-3 border-r text-center">Tue 23</div>
          <div className="col-span-2 p-3 border-r text-center">Wed 24</div>
          <div className="col-span-2 p-3 border-r text-center">Thur 25</div>
          <div className="col-span-1 p-3 text-center">Fri 26</div>
        </div>

        {/* Row 1 */}
        <div className="grid grid-cols-11 border-b min-h-[82px] items-stretch text-xs">
          {/* Time Column */}
          <div className="col-span-2 border-r p-2 flex items-center justify-center gap-1.5 font-semibold text-muted bg-[#FBFBFB]/40">
            <span>9:30</span>
            <span className="h-2 w-2 rounded-full bg-[#36C328]" />
          </div>

          {/* Mon 22 */}
          <div className="col-span-2 border-r p-1.5 flex flex-col justify-center">
            <div className="bg-[#38BDF8] text-white p-2.5 rounded-xl shadow-2xs hover:opacity-95 transition-opacity cursor-pointer">
              <div className="font-bold text-[12.5px] leading-tight">
                John Smith
              </div>
              <div className="text-[11px] font-medium opacity-90">
                @john.smith
              </div>
            </div>
          </div>

          {/* Tue 23 */}
          <div className="col-span-2 border-r p-1.5 flex flex-col justify-center">
            <div className="bg-[#14B8A6] text-white p-2.5 rounded-xl shadow-2xs hover:opacity-95 transition-opacity cursor-pointer">
              <div className="font-bold text-[12.5px] leading-tight">
                John Smith
              </div>
              <div className="text-[11px] font-medium opacity-90">
                @john.smith
              </div>
            </div>
          </div>

          {/* Wed 24 */}
          <div className="col-span-2 border-r p-1.5 flex flex-col justify-center">
            <div className="bg-[#D946EF] text-white p-2.5 rounded-xl shadow-2xs hover:opacity-95 transition-opacity cursor-pointer">
              <div className="font-bold text-[12.5px] leading-tight">
                John Smith
              </div>
              <div className="text-[11px] font-medium opacity-90">
                @john.smith
              </div>
            </div>
          </div>

          {/* Thur 25 */}
          <div className="col-span-2 border-r p-1.5"></div>

          {/* Fri 26 */}
          <div className="col-span-1 p-1.5"></div>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-11 border-b min-h-[82px] items-stretch text-xs">
          {/* Time Column */}
          <div className="col-span-2 border-r p-2 flex items-center justify-center gap-1.5 font-semibold text-muted bg-[#FBFBFB]/40">
            <span>9:30</span>
            <span className="h-2 w-2 rounded-full bg-[#36C328]" />
          </div>

          {/* Mon 22 */}
          <div className="col-span-2 border-r p-1.5 flex flex-col justify-center">
            <div className="bg-[#FBA725] text-white p-2.5 rounded-xl shadow-2xs hover:opacity-95 transition-opacity cursor-pointer">
              <div className="font-bold text-[12.5px] leading-tight">
                John Smith
              </div>
              <div className="text-[11px] font-medium opacity-90">
                @john.smith
              </div>
            </div>
          </div>

          {/* Tue 23 */}
          <div className="col-span-2 border-r p-1.5"></div>

          {/* Wed 24 */}
          <div className="col-span-2 border-r p-1.5"></div>

          {/* Thur 25 */}
          <div className="col-span-2 border-r p-1.5"></div>

          {/* Fri 26 */}
          <div className="col-span-1 p-1.5"></div>
        </div>

        {/* Row 3 */}
        <div className="grid grid-cols-11 border-b min-h-[82px] items-stretch text-xs">
          {/* Time Column */}
          <div className="col-span-2 border-r p-2 flex items-center justify-center gap-1.5 font-semibold text-muted bg-[#FBFBFB]/40">
            <span>9:30</span>
            <span className="h-2 w-2 rounded-full bg-[#36C328]" />
          </div>

          {/* Mon 22 */}
          <div className="col-span-2 border-r p-1.5"></div>

          {/* Tue 23 */}
          <div className="col-span-2 border-r p-1.5"></div>

          {/* Wed 24 */}
          <div className="col-span-2 border-r p-1.5"></div>

          {/* Thur 25 */}
          <div className="col-span-2 border-r p-1.5 flex flex-col justify-center">
            <div className="bg-[#38BDF8] text-white p-2.5 rounded-xl shadow-2xs hover:opacity-95 transition-opacity cursor-pointer">
              <div className="font-bold text-[12.5px] leading-tight">
                John Smith
              </div>
              <div className="text-[11px] font-medium opacity-90">
                @john.smith
              </div>
            </div>
          </div>

          {/* Fri 26 */}
          <div className="col-span-1 p-1.5"></div>
        </div>

        {/* Row 4 */}
        <div className="grid grid-cols-11 min-h-[82px] items-stretch text-xs">
          {/* Time Column */}
          <div className="col-span-2 border-r p-2 flex items-center justify-center gap-1.5 font-semibold text-muted bg-[#FBFBFB]/40">
            <span>9:30</span>
            <span className="h-2 w-2 rounded-full bg-[#36C328]" />
          </div>

          {/* Mon 22 */}
          <div className="col-span-2 border-r p-1.5"></div>

          {/* Tue 23 */}
          <div className="col-span-2 border-r p-1.5"></div>

          {/* Wed 24 */}
          <div className="col-span-2 border-r p-1.5 flex flex-col justify-center">
            <div className="bg-[#14B8A6] text-white p-2.5 rounded-xl shadow-2xs hover:opacity-95 transition-opacity cursor-pointer">
              <div className="font-bold text-[12.5px] leading-tight">
                John Smith
              </div>
              <div className="text-[11px] font-medium opacity-90">
                @john.smith
              </div>
            </div>
          </div>

          {/* Thur 25 */}
          <div className="col-span-2 border-r p-1.5"></div>

          {/* Fri 26 */}
          <div className="col-span-1 p-1.5"></div>
        </div>
      </div>
    </div>
  );
}
