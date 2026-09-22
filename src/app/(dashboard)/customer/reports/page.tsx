"use client";

import { Bell, ArrowRight, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function CustomerReportsPage() {
  const [activeReport, setActiveReport] = useState<string | null>(null);

  return (
    <div className="flex flex-col h-full bg-[#f8f9fa] relative">
      <header className="h-[72px] bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0">
        <div>
          <p className="text-gray-400 text-[11px] font-medium tracking-wide uppercase mb-0.5">SHIFTPOINT • Customer</p>
          <h1 className="text-[#1a2642] text-[18px] font-bold leading-tight">Reports</h1>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/customer/notifications" className="relative">
            <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors">
              <Bell size={20} />
            </button>
          </Link>
          <Link href="/customer/profile">
            <div className="w-10 h-10 rounded-full bg-[#f97316] hover:bg-[#e06511] cursor-pointer flex items-center justify-center text-white font-bold text-sm transition-colors">
              SA
            </div>
          </Link>
        </div>
      </header>

      <main className="flex-1 overflow-auto p-8">
        <div className="max-w-[1200px] mx-auto space-y-6 mt-4">

          {activeReport === null ? (
            // LIST VIEW
            <div className="animate-in fade-in duration-300">
              <div className="mb-6">
                <h2 className="text-[#1a2642] text-[28px] font-bold mb-1">Reports</h2>
                <p className="text-gray-500 text-[14px]">Access and download reports shared with your customer account.</p>
              </div>

              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-8">
                <div className="flex justify-between items-center mb-6">
                  <div className="w-[300px]">
                    <label className="text-gray-400 text-[11px] font-bold tracking-wide mb-1 block">Search reports</label>
                    <input 
                      type="text" 
                      placeholder="Search by report or location" 
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg text-[13px] focus:outline-none focus:border-[#f97316]"
                    />
                  </div>
                  <div className="mt-4">
                    <select className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-[13px] font-medium text-[#1a2642] focus:outline-none focus:border-[#f97316]">
                      <option>All statuses</option>
                      <option>Approved</option>
                      <option>Available</option>
                    </select>
                  </div>
                </div>

                <table className="w-full text-left text-[13px]">
                  <thead>
                    <tr className="border-b border-gray-100 text-gray-400 text-[10px] font-bold tracking-wider uppercase">
                      <th className="py-4 px-4">Report</th>
                      <th className="py-4 px-4">Location</th>
                      <th className="py-4 px-4">Date</th>
                      <th className="py-4 px-4">Status</th>
                      <th className="py-4 px-4 text-right"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: "Daily Service Report", location: "Westfield Office", date: "10 Sep 2026", status: "Approved", color: "text-emerald-700 bg-emerald-50 border-emerald-100" },
                      { name: "Incident Report", location: "North Campus", date: "09 Sep 2026", status: "Approved", color: "text-emerald-700 bg-emerald-50 border-emerald-100" },
                      { name: "Patrol Report", location: "Central Site", date: "08 Sep 2026", status: "Available", color: "text-amber-700 bg-amber-50 border-amber-100" },
                      { name: "Weekly Operations Summary", location: "Harbour House", date: "05 Sep 2026", status: "Available", color: "text-amber-700 bg-amber-50 border-amber-100" }
                    ].map((report, i) => (
                      <tr key={i} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors cursor-pointer" onClick={() => setActiveReport(report.name)}>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded bg-orange-50 text-[#f97316] flex items-center justify-center shrink-0">
                              <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 1H2C1.44772 1 1 1.44772 1 2V14C1 14.5523 1.44772 15 2 15H12C12.5523 15 13 14.5523 13 14V5L9 1Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M9 1V5H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M4 9H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M4 12H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M4 6H5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </div>
                            <span className="text-[#1a2642] font-medium">{report.name}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-gray-500">{report.location}</td>
                        <td className="py-4 px-4 text-gray-500">{report.date}</td>
                        <td className="py-4 px-4">
                          <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold border ${report.color}`}>
                            {report.status}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <span className="text-[#f97316] text-[12px] font-semibold inline-flex items-center gap-1 group-hover:underline">
                            Open <ArrowRight size={12} />
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            // DETAILS VIEW
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              
              <button 
                onClick={() => setActiveReport(null)}
                className="flex items-center gap-2 text-[#f97316] text-[13px] font-semibold hover:underline mb-4"
              >
                <ArrowLeft size={14} /> Back to Reports
              </button>

              <div className="mb-6">
                <h2 className="text-[#1a2642] text-[28px] font-bold mb-1">{activeReport}</h2>
                <p className="text-gray-500 text-[14px]">Westfield Office · Secure read-only report preview</p>
              </div>

              <div className="bg-blue-50/50 border border-blue-100 rounded-lg p-4 flex gap-3 text-blue-700 text-[13px] mb-8">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
                <p>This report is shared with your customer account for viewing and download only.</p>
              </div>

              <div className="grid grid-cols-3 gap-6">
                
                {/* Main Report Content */}
                <div className="col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
                  <div className="p-8 border-b border-gray-100 flex gap-6 items-start">
                    <div className="w-16 h-16 rounded-xl bg-orange-50 text-[#f97316] flex items-center justify-center shrink-0 border border-orange-100">
                      <svg width="24" height="28" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 1H2C1.44772 1 1 1.44772 1 2V14C1 14.5523 1.44772 15 2 15H12C12.5523 15 13 14.5523 13 14V5L9 1Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M9 1V5H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-[#f97316] text-[10px] font-bold tracking-[0.1em] uppercase mb-1">SHIFTPOINT REPORT</p>
                      <div className="flex justify-between items-start">
                        <h3 className="text-[#1a2642] text-[24px] font-bold mb-1">{activeReport}</h3>
                        <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-[11px] font-semibold rounded-full border border-emerald-100">Available</span>
                      </div>
                      <p className="text-gray-400 text-[13px]">Submitted service record for Westfield Office</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2">
                    <div className="p-6 border-r border-b border-gray-100">
                      <p className="text-gray-400 text-[10px] font-bold tracking-wide uppercase mb-1">ASSIGNED LOCATION</p>
                      <p className="text-[#1a2642] text-[14px]">Westfield Office</p>
                    </div>
                    <div className="p-6 border-b border-gray-100">
                      <p className="text-gray-400 text-[10px] font-bold tracking-wide uppercase mb-1">REPORT DATE</p>
                      <p className="text-[#1a2642] text-[14px]">11 Sep 2026</p>
                    </div>
                    <div className="p-6 border-r border-b border-gray-100">
                      <p className="text-gray-400 text-[10px] font-bold tracking-wide uppercase mb-1">SUBMITTED AT</p>
                      <p className="text-[#1a2642] text-[14px]">10:24</p>
                    </div>
                    <div className="p-6 border-b border-gray-100">
                      <p className="text-gray-400 text-[10px] font-bold tracking-wide uppercase mb-1">REPORT STATUS</p>
                      <p className="text-[#1a2642] text-[14px]">Available to customer</p>
                    </div>
                  </div>

                  <div className="p-8 border-b border-gray-100">
                    <h4 className="text-[#1a2642] text-[15px] font-bold mb-3">Submitted information</h4>
                    <p className="text-gray-600 text-[14px] leading-relaxed">
                      Routine patrol completed. All planned areas were visited; one loading-bay checkpoint remains pending due to a delivery window.
                    </p>
                  </div>

                  <div className="p-8 border-b border-gray-100">
                    <h4 className="text-[#1a2642] text-[15px] font-bold mb-3">Remarks</h4>
                    <p className="text-gray-600 text-[14px] leading-relaxed">
                      Reception visitor log binder was not available at 09:47. This observation was recorded for the location contact.
                    </p>
                  </div>

                  <div className="p-8 pb-4">
                    <h4 className="text-[#1a2642] text-[15px] font-bold mb-4">Photos & attachments</h4>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <div className="aspect-[2/1] bg-gradient-to-tr from-slate-400 to-slate-300 rounded-md mb-2 overflow-hidden relative">
                           <div className="absolute inset-0 bg-[#2a3a5a]/20 transform -rotate-12 scale-150"></div>
                        </div>
                        <p className="text-[#1a2642] text-[11px] font-bold">Site photo</p>
                        <p className="text-gray-400 text-[10px]">10:24</p>
                      </div>
                      <div>
                        <div className="aspect-[2/1] bg-gradient-to-tr from-amber-700/30 to-amber-700/20 rounded-md mb-2 overflow-hidden relative">
                           <div className="absolute inset-0 bg-[#2a3a5a]/20 transform -rotate-12 scale-150"></div>
                        </div>
                        <p className="text-[#1a2642] text-[11px] font-bold">Evidence photo</p>
                        <p className="text-gray-400 text-[10px]">10:24</p>
                      </div>
                      <div>
                        <div className="aspect-[2/1] bg-orange-50 rounded-md mb-2 flex items-center justify-center border border-orange-100 text-[#f97316]">
                          <svg width="20" height="24" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 1H2C1.44772 1 1 1.44772 1 2V14C1 14.5523 1.44772 15 2 15H12C12.5523 15 13 14.5523 13 14V5L9 1Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <p className="text-[#1a2642] text-[11px] font-bold">Report attachment</p>
                        <p className="text-gray-400 text-[10px]">PDF · 184 KB</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-between items-center mt-auto">
                    <p className="text-gray-400 text-[12px]">Read-only customer copy</p>
                    <button className="px-6 py-2.5 bg-[#f97316] hover:bg-[#e06511] text-white rounded-lg text-[13px] font-medium shadow-sm transition-colors flex items-center gap-2">
                      Download report <ArrowRight size={14} />
                    </button>
                  </div>
                </div>

                {/* Right Side Info */}
                <div>
                  <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                    <h3 className="text-[#1a2642] text-[16px] font-bold mb-3">Report access</h3>
                    <p className="text-gray-500 text-[13px] leading-relaxed mb-6">
                      This report belongs to your assigned location and cannot be edited, approved or deleted from the customer portal.
                    </p>

                    <div className="space-y-4">
                      <div className="border-t border-gray-100 pt-4">
                        <p className="text-gray-400 text-[10px] font-bold tracking-wide uppercase mb-1">SHARED WITH</p>
                        <p className="text-[#1a2642] text-[13px]">ARC Security Ltd.</p>
                      </div>
                      <div className="border-t border-gray-100 pt-4">
                        <p className="text-gray-400 text-[10px] font-bold tracking-wide uppercase mb-1">EVIDENCE</p>
                        <p className="text-[#1a2642] text-[13px]">2 photos · 1 attachment</p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

        </div>
      </main>

    </div>
  );
}
