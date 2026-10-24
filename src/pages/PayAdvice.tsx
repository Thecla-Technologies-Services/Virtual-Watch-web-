import { Link } from "react-router-dom";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Star } from "lucide-react";

export default function PayAdvice() {
  return (
    <div className="">
      <div className="flex items-center gap-4">
        <Link to="/timesheet" className="h-8 w-8 mb-5 rounded-full bg-white flex items-center justify-center text-slate-700 hover:bg-slate-50 shadow-sm shrink-0">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-4 w-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <div className="flex-1">
        <Breadcrumb
          pageTitle="PAY ADVICE"
          subtext="View payslips and payroll reports"
          activePage="Reports"
          breadcrumbs={[{ label: "Payroll management", path: "/payroll" }]}
        />
        </div>
      </div>

      <div className="bg-white rounded-[24px] shadow-sm p-10 relative overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-start mb-16">
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">PAY ADVICE</h1>
          <div className="text-right">
            <div className="flex justify-end mb-2">
              <div className="h-12 w-12 bg-orange-100 rounded-full flex items-center justify-center">
                <Star className="text-orange-400 fill-orange-400" size={24} />
              </div>
            </div>
            <h2 className="text-[#38BDF8] font-bold text-[15px] mb-1">MEDSTAR</h2>
            <p className="text-slate-500 text-[13px] leading-relaxed">
              Business address<br />
              City, State, IN - 000 000<br />
              TAX ID 00XXXXX1234X0XX
            </p>
          </div>
        </div>

        {/* Employee Info */}
        <div className="mb-10">
          <p className="text-[11px] font-bold text-slate-400 mb-1">NAME</p>
          <p className="text-[16px] font-semibold text-slate-800">Chinenye Ezenwa</p>
        </div>

        {/* Invoice Meta & Grid */}
        <div className="flex gap-8 mb-8">
          <div className="w-32 shrink-0 space-y-6">
            <div>
              <p className="text-[12px] font-bold text-slate-800 mb-1">Invoice #</p>
              <p className="text-[13px] text-slate-500">T00646</p>
            </div>
            <div>
              <p className="text-[12px] font-bold text-slate-800 mb-1">Invoice date</p>
              <p className="text-[13px] text-slate-500">20/10/25</p>
            </div>
          </div>

          <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Pay Details Panel */}
            <div className="col-span-2 border border-slate-200 rounded-xl overflow-hidden flex flex-col">
              <div className="flex items-center justify-between p-4 border-b border-slate-200 bg-slate-50/50">
                <span className="text-[11px] font-bold text-slate-800">PAY DETAILS</span>
                <div className="flex gap-6">
                  <span className="text-[11px] font-bold text-slate-800">HOURS</span>
                  <span className="text-[11px] font-bold text-slate-800">RATE</span>
                  <span className="text-[11px] font-bold text-slate-800">TOTAL</span>
                </div>
              </div>
              <div className="p-4 flex-1">
                <div className="flex justify-between items-start text-[13px]">
                  <span className="text-slate-600">A3047 - 26/10/25</span>
                  <div className="flex gap-6 text-slate-700">
                    <span className="w-10 text-right">11.00</span>
                    <span className="w-10 text-right">20.87</span>
                    <span className="w-10 text-right font-medium">229.57</span>
                  </div>
                </div>
              </div>
              <div className="p-4 border-t border-slate-200 flex justify-between items-center bg-slate-50/50 mt-auto">
                <span className="text-[12px] font-bold text-slate-800">TOTAL GROSS PAY</span>
                <span className="text-[14px] font-bold text-slate-800">229.57</span>
              </div>
            </div>

            {/* Deductions Panel */}
            <div className="border border-slate-200 rounded-xl overflow-hidden flex flex-col">
              <div className="p-4 border-b border-slate-200 bg-slate-50/50">
                <span className="text-[11px] font-bold text-slate-800">DEDUCTIONS</span>
              </div>
              <div className="p-4 flex-1">
                {/* Empty deductions */}
              </div>
              <div className="p-4 border-t border-slate-200 flex justify-between items-center bg-slate-50/50 mt-auto">
                <span className="text-[12px] font-bold text-slate-800">TOTAL DEDUCTIONS</span>
                <span className="text-[14px] font-bold text-slate-800">0.00</span>
              </div>
            </div>

            {/* Net Pay Panel */}
            <div className="border border-slate-200 rounded-xl overflow-hidden flex flex-col">
              <div className="p-4 border-b border-slate-200 bg-slate-50/50">
                <span className="text-[11px] font-bold text-slate-800">NET PAY</span>
              </div>
              <div className="p-4 flex-1 space-y-3">
                <div className="flex justify-between items-center text-[13px]">
                  <span className="text-slate-600">Total gross</span>
                  <span className="text-slate-800 font-medium">229.57</span>
                </div>
                <div className="flex justify-between items-center text-[13px]">
                  <span className="text-slate-600">Deductions</span>
                  <span className="text-slate-800 font-medium">0.00</span>
                </div>
              </div>
              <div className="p-4 border-t border-slate-200 flex justify-between items-center bg-slate-50/50 mt-auto">
                <span className="text-[12px] font-bold text-slate-800">TOTAL NET PAY</span>
                <span className="text-[14px] font-bold text-slate-800">229.57</span>
              </div>
            </div>
          </div>
        </div>

        {/* Lower Grid */}
        <div className="grid grid-cols-5 border border-slate-200 rounded-xl overflow-hidden mb-6">
          <div className="p-4 border-r border-b border-slate-200 text-center">
            <p className="text-[10px] font-bold text-slate-400 mb-2">TAX DISTRICT</p>
            <p className="text-[18px] font-bold text-slate-800">475</p>
          </div>
          <div className="p-4 border-r border-b border-slate-200 text-center">
            <p className="text-[10px] font-bold text-slate-400 mb-2">PAYE REFERENCE</p>
            <p className="text-[18px] font-bold text-slate-800">aa56658</p>
          </div>
          <div className="p-4 border-r border-b border-slate-200 text-center">
            <p className="text-[10px] font-bold text-slate-400 mb-2">TAX CODE</p>
            <p className="text-[18px] font-bold text-slate-800">wk30</p>
          </div>
          <div className="p-4 border-r border-b border-slate-200 text-center">
            <p className="text-[10px] font-bold text-slate-400 mb-2">GROSS PAY TO DATE</p>
            <p className="text-[18px] font-bold text-slate-800">3552.62</p>
          </div>
          <div className="p-4 border-r border-b border-slate-200 text-center">
            <p className="text-[10px] font-bold text-slate-400 mb-2">TAXABLE PAY 30 DAYS</p>
            <p className="text-[18px] font-bold text-slate-800">0.00</p>
          </div>
          
          <div className="p-4 border-r border-slate-200 text-center">
            <p className="text-[10px] font-bold text-slate-400 mb-2">TAXABLE PAY 30 DAYS</p>
            <p className="text-[18px] font-bold text-slate-800">0.00</p>
          </div>
          <div className="p-4 border-r border-slate-200 text-center">
            <p className="text-[10px] font-bold text-slate-400 mb-2">TAXABLE PAY 30 DAYS</p>
            <p className="text-[18px] font-bold text-slate-800">0.00</p>
          </div>
          <div className="p-4 border-r border-slate-200 text-center">
            <p className="text-[10px] font-bold text-slate-400 mb-2">TAXABLE PAY 30 DAYS</p>
            <p className="text-[18px] font-bold text-slate-800">0.00</p>
          </div>
          <div className="p-4 border-r border-slate-200 text-center">
            <p className="text-[10px] font-bold text-slate-400 mb-2">TAXABLE PAY 30 DAYS</p>
            <p className="text-[18px] font-bold text-slate-800">0.00</p>
          </div>
          <div className="p-4 text-center">
            <p className="text-[10px] font-bold text-slate-400 mb-2">TAXABLE PAY 30 DAYS</p>
            <p className="text-[18px] font-bold text-slate-800">0.00</p>
          </div>
        </div>

        {/* Footer info */}
        <div className="flex justify-between items-center text-[12px] text-slate-500 font-medium px-4 mb-4">
          <span>www.panda.inc</span>
          <span>+91 00000 00000</span>
          <span>hello@email.com</span>
        </div>
        <div className="text-center text-[11px] text-slate-400 font-medium bg-slate-50 py-3 rounded-xl mx-4">
          <span className="inline-block mr-1">ℹ️</span> Please pay within 15 days of receiving this invoice.
        </div>
      </div>
    </div>
  );
}
