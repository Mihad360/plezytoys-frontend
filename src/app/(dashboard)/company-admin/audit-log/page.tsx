"use client";

import { Bell, ChevronDown, Calendar } from "lucide-react";

export default function AuditLogPage() {
  return (
    <div className="flex flex-col h-full bg-[#f8f9fa]">
      {/* Top Header */}
      <header className="h-[72px] bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0">
        <div>
          <p className="text-gray-400 text-[11px] font-medium tracking-wide uppercase mb-0.5">SHIFTPOINT • Settings • Audit Log</p>
          <h1 className="text-[#1a2642] text-[18px] font-bold leading-tight">Audit Log</h1>
        </div>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-4 py-1.5 bg-orange-50 border border-orange-100 rounded-lg text-[#f97316] text-[13px] font-medium hover:bg-orange-100 transition-colors">
            <span className="text-[16px]">★</span> Subscription
          </button>
          <div className="relative">
            <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors">
              <Bell size={20} />
            </button>
            <div className="absolute top-0 right-0 w-4 h-4 bg-[#b45f06] text-white text-[9px] font-bold flex items-center justify-center rounded-full border-2 border-white">4</div>
          </div>
          <div className="w-10 h-10 rounded-full bg-[#b45f06] flex items-center justify-center text-white font-bold text-sm">
            CA
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-8">
        <div className="max-w-[1200px] mx-auto">
          
          <div className="flex gap-4 mb-6">
            <div className="relative w-[200px]">
              <select className="w-full appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-[14px] text-[#1a2642] focus:outline-none">
                <option>All Users</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            </div>
            <div className="relative w-[200px]">
              <select className="w-full appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-[14px] text-[#1a2642] focus:outline-none">
                <option>All Categories</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            </div>
            <div className="relative w-[200px]">
              <input 
                type="text" 
                placeholder="mm/dd/yyyy" 
                className="w-full px-4 py-2.5 border border-gray-200 bg-white rounded-lg text-[14px] focus:outline-none focus:border-[#f97316]"
              />
              <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <table className="w-full text-left text-[13px]">
              <thead>
                <tr className="bg-gray-50/50 text-gray-400 text-[10px] uppercase tracking-wider font-semibold border-b border-gray-100">
                  <th className="px-6 py-4">USER</th>
                  <th className="px-6 py-4">ACTION</th>
                  <th className="px-6 py-4">CATEGORY</th>
                  <th className="px-6 py-4">DATE</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#1a2642] flex items-center justify-center text-white font-bold text-[11px]">DB</div>
                      <span className="text-[#1a2642] font-medium">David Brown</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">Created NFC checkpoint 'Main Entrance'</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[11px] font-medium">NFC</span>
                  </td>
                  <td className="px-6 py-4 text-gray-500">Sep 3, 2026 10:42 AM</td>
                </tr>
                
                <tr className="border-b border-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#1a2642] flex items-center justify-center text-white font-bold text-[11px]">JS</div>
                      <span className="text-[#1a2642] font-medium">John Smith</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">Submitted Daily Operations Report</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[11px] font-medium">Reports</span>
                  </td>
                  <td className="px-6 py-4 text-gray-500">Sep 3, 2026 10:30 AM</td>
                </tr>

                <tr className="border-b border-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#1a2642] flex items-center justify-center text-white font-bold text-[11px]">CA</div>
                      <span className="text-[#1a2642] font-medium">Company Admin</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">Updated permissions for Manager role</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex px-3 py-1 bg-red-50 text-red-600 rounded-full text-[11px] font-medium">Security</span>
                  </td>
                  <td className="px-6 py-4 text-gray-500">Sep 2, 2026 03:15 PM</td>
                </tr>

                <tr className="border-b border-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#1a2642] flex items-center justify-center text-white font-bold text-[11px]">EC</div>
                      <span className="text-[#1a2642] font-medium">Emily Chen</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">Invited employee Lisa Park</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex px-3 py-1 bg-green-50 text-green-600 rounded-full text-[11px] font-medium">People</span>
                  </td>
                  <td className="px-6 py-4 text-gray-500">Sep 2, 2026 11:00 AM</td>
                </tr>

                <tr className="border-b border-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#1a2642] flex items-center justify-center text-white font-bold text-[11px]">CA</div>
                      <span className="text-[#1a2642] font-medium">Company Admin</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">Changed John Smith's role from Employee to Guard</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex px-3 py-1 bg-red-50 text-red-600 rounded-full text-[11px] font-medium">Security</span>
                  </td>
                  <td className="px-6 py-4 text-gray-500">Sep 1, 2026 09:20 AM</td>
                </tr>

                <tr className="border-b border-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#1a2642] flex items-center justify-center text-white font-bold text-[11px]">DB</div>
                      <span className="text-[#1a2642] font-medium">David Brown</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">Created patrol route 'Night Security Patrol'</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex px-3 py-1 bg-orange-50 text-orange-600 rounded-full text-[11px] font-medium">Operations</span>
                  </td>
                  <td className="px-6 py-4 text-gray-500">Sep 1, 2026 08:55 AM</td>
                </tr>

                <tr>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#1a2642] flex items-center justify-center text-white font-bold text-[11px]">CA</div>
                      <span className="text-[#1a2642] font-medium">Company Admin</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">Updated company branding settings</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-[11px] font-medium">Settings</span>
                  </td>
                  <td className="px-6 py-4 text-gray-500">Aug 31, 2026 04:00 PM</td>
                </tr>

              </tbody>
            </table>
          </div>

        </div>
      </main>
    </div>
  );
}
