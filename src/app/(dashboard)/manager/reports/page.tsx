"use client";

import { Bell, Search, Filter, X } from "lucide-react";
import { useState } from "react";

export default function ManagerReportsPage() {
  const [activeModal, setActiveModal] = useState<"none" | "review">("none");

  return (
    <div className="flex flex-col h-full bg-[#f8f9fa] relative">
      <header className="h-[72px] bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0">
        <div>
          <p className="text-gray-400 text-[11px] font-medium tracking-wide uppercase mb-0.5">SHIFTPOINT • MANAGER</p>
          <h1 className="text-[#1a2642] text-[18px] font-bold leading-tight">Reports</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="px-4 py-1.5 bg-orange-50 border border-orange-100 text-[#d97706] rounded-full text-[13px] font-medium">
            Location scope: All
          </div>
          <div className="relative">
            <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors">
              <Bell size={20} />
            </button>
          </div>
          <div className="w-10 h-10 rounded-full bg-[#b45f06] flex items-center justify-center text-white font-bold text-sm">
            SA
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-auto p-8">
        <div className="max-w-[1200px] mx-auto">
          
          <div className="grid grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <p className="text-gray-400 text-[11px] font-bold tracking-wide uppercase mb-2">TOTAL THIS WEEK</p>
              <p className="text-[#1a2642] font-bold text-[32px] leading-none">124</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <p className="text-gray-400 text-[11px] font-bold tracking-wide uppercase mb-2">NEEDS REVIEW</p>
              <p className="text-orange-500 font-bold text-[32px] leading-none">7</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <p className="text-gray-400 text-[11px] font-bold tracking-wide uppercase mb-2">APPROVED</p>
              <p className="text-emerald-500 font-bold text-[32px] leading-none">115</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <p className="text-gray-400 text-[11px] font-bold tracking-wide uppercase mb-2">REJECTED</p>
              <p className="text-red-500 font-bold text-[32px] leading-none">2</p>
            </div>
          </div>

          <div className="flex justify-between items-center mb-6">
            <div className="flex gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input 
                  type="text" 
                  placeholder="Search reports..." 
                  className="pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-[13px] w-[300px] focus:outline-none focus:border-[#f97316] shadow-sm"
                />
              </div>
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 bg-white rounded-lg text-[13px] font-medium text-gray-600 hover:bg-gray-50 shadow-sm">
                <Filter size={16} /> Filters
              </button>
            </div>
            <button className="px-5 py-2 border border-gray-200 bg-white rounded-lg text-[13px] font-medium text-gray-600 hover:bg-gray-50 shadow-sm">
              Export
            </button>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <table className="w-full text-left text-[13px]">
              <thead>
                <tr className="border-b border-gray-100 text-gray-400 text-[11px] font-semibold tracking-wider">
                  <th className="py-4 px-6 font-medium">Report Type</th>
                  <th className="py-4 px-6 font-medium">Employee</th>
                  <th className="py-4 px-6 font-medium">Location</th>
                  <th className="py-4 px-6 font-medium">Date & Time</th>
                  <th className="py-4 px-6 font-medium">Status</th>
                  <th className="py-4 px-6 font-medium text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 cursor-pointer" onClick={() => setActiveModal("review")}>
                  <td className="py-4 px-6 font-semibold text-[#1a2642]">Daily Operations Report</td>
                  <td className="py-4 px-6 text-gray-600">John Doe</td>
                  <td className="py-4 px-6 text-gray-600">Location A</td>
                  <td className="py-4 px-6 text-gray-600">Sep 22, 2026 18:30</td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-orange-50 text-orange-600 rounded-full text-[11px] font-medium border border-orange-100">
                      <span className="w-1.5 h-1.5 rounded-full bg-current"></span> Under Review
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button className="px-4 py-1.5 border border-gray-200 rounded text-[12px] font-medium text-gray-600 hover:bg-gray-50">
                      Review
                    </button>
                  </td>
                </tr>
                <tr className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50">
                  <td className="py-4 px-6 font-semibold text-[#1a2642]">Incident Report</td>
                  <td className="py-4 px-6 text-gray-600">Sarah Smith</td>
                  <td className="py-4 px-6 text-gray-600">Location B</td>
                  <td className="py-4 px-6 text-gray-600">Sep 21, 2026 14:15</td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[11px] font-medium border border-emerald-100">
                      <span className="w-1.5 h-1.5 rounded-full bg-current"></span> Approved
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button className="px-4 py-1.5 border border-gray-200 rounded text-[12px] font-medium text-gray-600 hover:bg-gray-50">
                      View
                    </button>
                  </td>
                </tr>
                <tr className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50">
                  <td className="py-4 px-6 font-semibold text-[#1a2642]">Patrol Report</td>
                  <td className="py-4 px-6 text-gray-600">Michael Lee</td>
                  <td className="py-4 px-6 text-gray-600">Location A</td>
                  <td className="py-4 px-6 text-gray-600">Sep 20, 2026 09:00</td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[11px] font-medium border border-emerald-100">
                      <span className="w-1.5 h-1.5 rounded-full bg-current"></span> Approved
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button className="px-4 py-1.5 border border-gray-200 rounded text-[12px] font-medium text-gray-600 hover:bg-gray-50">
                      View
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>
      </main>

      {/* MODALS */}
      {activeModal === "review" && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-[#1a2642]/60 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-[900px] animate-in fade-in zoom-in-95 duration-200 my-8 flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center p-6 border-b border-gray-100 shrink-0">
              <h3 className="text-[#1a2642] text-[20px] font-bold">Report Review</h3>
              <button onClick={() => setActiveModal("none")} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>
            
            <div className="flex-1 overflow-y-auto flex flex-col md:flex-row">
              {/* Left Side: Report Content */}
              <div className="w-full md:w-2/3 p-6 md:border-r border-gray-100">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h4 className="text-[#1a2642] font-bold text-[18px] mb-1">Daily Operations Report</h4>
                    <p className="text-gray-500 text-[13px]">Location A · Sep 22, 2026 18:30</p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-orange-50 text-orange-600 border border-orange-100">
                    <span className="w-1.5 h-1.5 rounded-full bg-current"></span> Under Review
                  </span>
                </div>

                <div className="mb-6">
                  <p className="text-gray-400 text-[11px] font-bold tracking-wide uppercase mb-3">SUBMITTED INFORMATION</p>
                  <div className="grid grid-cols-[120px_1fr] gap-y-3 text-[13px]">
                    <div className="text-gray-500">Employee</div>
                    <div className="text-[#1a2642] font-medium">John Doe</div>
                    <div className="text-gray-500">Location</div>
                    <div className="text-[#1a2642] font-medium">Location A</div>
                    <div className="text-gray-500">Date</div>
                    <div className="text-[#1a2642] font-medium">Sep 22, 2026 18:30</div>
                  </div>
                </div>

                <div className="bg-gray-50/80 rounded-xl p-5 mb-4 border border-gray-100">
                  <p className="text-gray-400 text-[11px] font-bold tracking-wide uppercase mb-2">REPORT CONTENT</p>
                  <p className="text-[#1a2642] text-[13px] leading-relaxed">
                    All assigned areas were checked during the patrol. Minor issue found at the back gate - hinge appears loose. Recommended maintenance has been logged. No incidents observed during the shift.
                  </p>
                </div>
              </div>

              {/* Right Side: Review Actions */}
              <div className="w-full md:w-1/3 p-6 bg-gray-50/50 flex flex-col">
                <p className="text-[#1a2642] font-semibold text-[14px] mb-3">Review</p>
                <textarea 
                  rows={4} 
                  placeholder="Add review comment..." 
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:border-[#f97316] mb-4 resize-none bg-white"
                ></textarea>
                
                <div className="space-y-3 mb-8">
                  <button onClick={() => setActiveModal("none")} className="w-full py-2.5 bg-[#f97316] hover:bg-[#e06511] text-white font-medium rounded-lg transition-colors flex justify-center items-center gap-2 text-[14px]">
                    Approve
                  </button>
                  <button className="w-full py-2.5 bg-white border border-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors flex justify-center items-center gap-2 text-[14px]">
                    Return to employee
                  </button>
                  <button className="w-full py-2.5 bg-white border border-gray-200 text-[#1a2642] font-medium rounded-lg hover:bg-gray-50 transition-colors flex justify-center items-center gap-2 text-[14px]">
                    Export PDF
                  </button>
                </div>

                <div>
                  <p className="text-gray-400 text-[11px] font-bold tracking-wide uppercase mb-3">REVIEW HISTORY</p>
                  <div className="space-y-3 text-[12px] text-gray-500">
                    <p>Submitted by John Doe · 18:30 PM</p>
                    <p>Assigned to David Brown · 18:31 PM</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
