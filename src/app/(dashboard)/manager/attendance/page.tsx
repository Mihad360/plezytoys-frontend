"use client";

import { Bell, ChevronDown, X, Clock } from "lucide-react";
import { useState } from "react";

export default function ManagerAttendancePage() {
  const [activeModal, setActiveModal] = useState<"none" | "view-details">("none");

  return (
    <div className="flex flex-col h-full bg-[#f8f9fa] relative">
      <header className="h-[72px] bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0">
        <div>
          <p className="text-gray-400 text-[11px] font-medium tracking-wide uppercase mb-0.5">SHIFTPOINT • MANAGER</p>
          <h1 className="text-[#1a2642] text-[18px] font-bold leading-tight">Attendance</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="px-4 py-1.5 bg-orange-50 border border-orange-100 text-[#d97706] rounded-full text-[13px] font-medium">
            Location scope: Location A
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
              <p className="text-gray-400 text-[11px] font-bold tracking-wide uppercase mb-2">CURRENTLY WORKING</p>
              <p className="text-emerald-500 font-bold text-[32px] leading-none">21</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <p className="text-gray-400 text-[11px] font-bold tracking-wide uppercase mb-2">NOT CLOCKED IN</p>
              <p className="text-gray-500 font-bold text-[32px] leading-none">5</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <p className="text-gray-400 text-[11px] font-bold tracking-wide uppercase mb-2">ATTENDANCE ISSUES</p>
              <p className="text-red-500 font-bold text-[32px] leading-none">3</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <p className="text-gray-400 text-[11px] font-bold tracking-wide uppercase mb-2">COMPLETED SESSIONS</p>
              <p className="text-blue-500 font-bold text-[32px] leading-none">18</p>
            </div>
          </div>

          <div className="flex justify-between items-center mb-6">
            <div className="flex gap-4">
              <div className="relative w-[180px]">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <Clock size={16} />
                </div>
                <select className="w-full appearance-none bg-white border border-gray-200 rounded-lg pl-10 pr-4 py-2 text-[14px] text-[#1a2642] focus:outline-none shadow-sm">
                  <option>Week 2, 2026</option>
                </select>
              </div>
              <div className="relative w-[180px]">
                <select className="w-full appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 text-[14px] text-[#1a2642] focus:outline-none shadow-sm">
                  <option>All locations</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              </div>
            </div>
            <button className="px-5 py-2 border border-gray-200 bg-white rounded-lg text-[13px] font-medium text-gray-600 hover:bg-gray-50 shadow-sm">
              Export
            </button>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <table className="w-full text-left text-[13px]">
              <thead>
                <tr className="border-b border-gray-100 text-gray-400 text-[11px] font-semibold tracking-wider">
                  <th className="py-4 px-6 font-medium">Employee</th>
                  <th className="py-4 px-6 font-medium">Location</th>
                  <th className="py-4 px-6 font-medium">Clock In</th>
                  <th className="py-4 px-6 font-medium">Clock Out</th>
                  <th className="py-4 px-6 font-medium">Working Time</th>
                  <th className="py-4 px-6 font-medium">GPS</th>
                  <th className="py-4 px-6 font-medium">Status</th>
                  <th className="py-4 px-6 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50">
                  <td className="py-4 px-6 font-semibold text-[#1a2642]">John Doe</td>
                  <td className="py-4 px-6 text-gray-600">Location A</td>
                  <td className="py-4 px-6 text-gray-600">08:02</td>
                  <td className="py-4 px-6 text-gray-400">—</td>
                  <td className="py-4 px-6 text-gray-600">1h 42m</td>
                  <td className="py-4 px-6">
                    <span className="px-2.5 py-1 bg-green-100 text-green-700 rounded-full text-[11px] font-medium">Valid</span>
                  </td>
                  <td className="py-4 px-6 text-gray-600">Working</td>
                  <td className="py-4 px-6">
                    <button onClick={() => setActiveModal("view-details")} className="px-4 py-1.5 border border-gray-200 rounded text-[12px] font-medium text-gray-600 hover:bg-gray-50">
                      View
                    </button>
                  </td>
                </tr>
                <tr className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50">
                  <td className="py-4 px-6 font-semibold text-[#1a2642]">Sarah Smith</td>
                  <td className="py-4 px-6 text-gray-600">Location B</td>
                  <td className="py-4 px-6 text-gray-600">08:15</td>
                  <td className="py-4 px-6 text-gray-400">—</td>
                  <td className="py-4 px-6 text-gray-600">1h 42m</td>
                  <td className="py-4 px-6">
                    <span className="px-2.5 py-1 bg-green-100 text-green-700 rounded-full text-[11px] font-medium">Valid</span>
                  </td>
                  <td className="py-4 px-6 text-gray-600">Working</td>
                  <td className="py-4 px-6">
                    <button className="px-4 py-1.5 border border-gray-200 rounded text-[12px] font-medium text-gray-600 hover:bg-gray-50">
                      View
                    </button>
                  </td>
                </tr>
                <tr className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50">
                  <td className="py-4 px-6 font-semibold text-[#1a2642]">Michael Lee</td>
                  <td className="py-4 px-6 text-gray-600">Location A</td>
                  <td className="py-4 px-6 text-gray-600">08:20</td>
                  <td className="py-4 px-6 text-gray-400">—</td>
                  <td className="py-4 px-6 text-gray-600">1h 42m</td>
                  <td className="py-4 px-6">
                    <span className="px-2.5 py-1 bg-red-100 text-red-700 rounded-full text-[11px] font-medium">Outside radius</span>
                  </td>
                  <td className="py-4 px-6 text-gray-600">Issue</td>
                  <td className="py-4 px-6">
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
      {activeModal === "view-details" && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-[#1a2642]/60 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-[650px] animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-[#1a2642] flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11 25.5C9.5 25.5 8.5 24 9.5 22.5L14 16.5C14.8 15.5 16 15 17.2 15H24" stroke="#f97316" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M29 14.5C30.5 14.5 31.5 16 30.5 17.5L26 23.5C25.2 24.5 24 25 22.8 25H16" stroke="#f97316" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <p className="text-[#f97316] text-[10px] font-bold tracking-[0.1em] uppercase leading-none mb-1">MANAGER VIEW • LOCATION A ONLY</p>
                  <h3 className="text-[#1a2642] text-[18px] font-bold leading-none">Attendance Details</h3>
                </div>
              </div>
              <button onClick={() => setActiveModal("none")} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>
            
            <div className="p-8 space-y-6">
              
              <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-lg">
                <p className="text-emerald-700 font-medium text-[14px]">Scope enforced: Location A</p>
                <p className="text-emerald-600 text-[13px] mt-1 leading-relaxed">
                  This Manager can only access employees, attendance records and patrols assigned to Location A. Information from Location B or any other location is not visible.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-400 text-[10px] font-bold tracking-wide uppercase mb-1">EMPLOYEE</p>
                  <p className="text-[#1a2642] text-[14px] font-medium">Alex Morgan</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-400 text-[10px] font-bold tracking-wide uppercase mb-1">ASSIGNED LOCATION</p>
                  <p className="text-[#1a2642] text-[14px] font-medium">Location A</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-400 text-[10px] font-bold tracking-wide uppercase mb-1">CLOCK-IN</p>
                  <p className="text-[#1a2642] text-[14px] font-medium">10 Sep 2026 · 08:02 CEST</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-400 text-[10px] font-bold tracking-wide uppercase mb-1">CLOCK-OUT</p>
                  <p className="text-[#1a2642] text-[14px] font-medium">10 Sep 2026 · 16:11 CEST</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-400 text-[10px] font-bold tracking-wide uppercase mb-1">GPS VALIDATION</p>
                  <p className="text-[#1a2642] text-[14px] font-medium">Valid at clock-in and clock-out</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-400 text-[10px] font-bold tracking-wide uppercase mb-1">MOST RECENT AUTHORISED EVENT</p>
                  <p className="text-[#1a2642] text-[14px] font-medium">Operational check-in · 09:42 CEST</p>
                </div>
              </div>

              <div className="border border-gray-100 rounded-lg p-5">
                <h4 className="text-[#1a2642] text-[14px] font-medium mb-2">Authorised event location</h4>
                <p className="text-gray-500 text-[13px] leading-relaxed">
                  "Most recent authorised event" refers to the last location data submitted during an approved attendance or operational event. It does not represent continuous background or live GPS tracking.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-5">
                <h4 className="text-gray-400 text-[10px] font-bold tracking-wide uppercase mb-3">ATTENDANCE EVENT HISTORY</h4>
                <div className="space-y-3">
                  <p className="text-gray-600 text-[13px]">08:02 CEST — Clock-in validated at Location A</p>
                  <p className="text-gray-600 text-[13px]">09:42 CEST — Operational check-in authorised at Location A</p>
                  <p className="text-gray-600 text-[13px]">16:11 CEST — Clock-out validated at Location A</p>
                </div>
              </div>

            </div>

            <div className="p-6 border-t border-gray-100 flex justify-end">
              <button onClick={() => setActiveModal("none")} className="px-6 py-2.5 bg-[#f97316] hover:bg-[#e06511] text-white rounded-lg text-[14px] font-medium transition-colors shadow-sm">
                Close details
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
