"use client";

import { Bell } from "lucide-react";
import Link from "next/link";

export default function PatrolExecutionPage() {
  return (
    <div className="flex flex-col h-full bg-[#f8f9fa]">
      {/* Top Header */}
      <header className="h-[72px] bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0">
        <div>
          <p className="text-gray-400 text-[11px] font-medium tracking-wide uppercase mb-0.5">SHIFTPOINT • Operations • Patrol #PAT-10482</p>
          <h1 className="text-[#1a2642] text-[18px] font-bold leading-tight">Patrol #PAT-10482</h1>
        </div>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-4 py-1.5 bg-orange-50 border border-orange-100 rounded-lg text-[#f97316] text-[13px] font-medium hover:bg-orange-100 transition-colors">
            <span className="text-[16px]">★</span> Subscription
          </button>
          <div className="relative">
            <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors">
              <Bell size={20} />
            </button>
          </div>
          <div className="w-10 h-10 rounded-full bg-[#f97316] flex items-center justify-center text-white font-bold text-sm">
            SA
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-8">
        <div className="max-w-[1400px] mx-auto">
          
          <div className="mb-6">
            <Link href="/company-admin/patrol-routes" className="text-[#8492a6] hover:text-[#1a2642] text-[13px] flex items-center gap-2 mb-4">
              ← Back to Scheduled Patrols
            </Link>

            <div className="bg-orange-50/50 border border-orange-200 rounded-xl p-5 mb-8">
              <h4 className="text-[#b45f06] text-[14px] font-medium mb-1">Historical patrol record</h4>
              <p className="text-[#b45f06] text-[13px]">This patrol execution is immutable. Later changes to the route template do not modify this patrol or its historical checkpoint data.</p>
            </div>

            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-[#1a2642] text-[24px] font-bold">Patrol #PAT-10482</h2>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-blue-50 text-blue-600 border border-blue-200">
                <span className="w-1.5 h-1.5 rounded-full bg-current"></span> In Progress
              </span>
            </div>
            
            <div className="flex gap-6 text-[14px] text-[#1a2642]">
              <div><span className="text-gray-500 mr-2">Route:</span>Night Security Round</div>
              <div><span className="text-gray-500 mr-2">Customer:</span>ABC Security</div>
              <div><span className="text-gray-500 mr-2">Location:</span>Main Office</div>
              <div><span className="text-gray-500 mr-2">Employee:</span>John Smith</div>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-6">
            
            {/* Patrol Timeline (Left Column) */}
            <div className="col-span-4 bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden h-fit">
              <div className="px-5 py-4 border-b border-gray-100">
                <h3 className="font-semibold text-[#1a2642] text-[14px]">Patrol Timeline</h3>
              </div>
              <div className="p-6">
                <div className="relative pl-6 space-y-6 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-gray-100">
                  
                  <div className="relative">
                    <div className="absolute -left-[29px] top-0 w-6 h-6 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-[10px] z-10">⏱</div>
                    <p className="text-[#f97316] font-bold text-[12px] mb-0.5 font-mono">22:55</p>
                    <p className="text-[#1a2642] text-[13px]">Clocked in</p>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-[29px] top-0 w-6 h-6 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 text-[10px] z-10">i</div>
                    <p className="text-[#f97316] font-bold text-[12px] mb-0.5 font-mono">23:00</p>
                    <p className="text-[#1a2642] text-[13px]">Patrol available</p>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-[29px] top-0 w-6 h-6 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 text-[10px] z-10">▶</div>
                    <p className="text-[#f97316] font-bold text-[12px] mb-0.5 font-mono">23:02</p>
                    <p className="text-[#1a2642] text-[13px]">Patrol started</p>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-[29px] top-0 w-6 h-6 rounded-full bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600 text-[10px] z-10">NFC</div>
                    <p className="text-[#f97316] font-bold text-[12px] mb-0.5 font-mono">23:08</p>
                    <p className="text-[#1a2642] text-[13px]">Main Entrance — NFC scan</p>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-[29px] top-0 w-6 h-6 rounded-full bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600 text-[10px] z-10">NFC</div>
                    <p className="text-[#f97316] font-bold text-[12px] mb-0.5 font-mono">23:15</p>
                    <p className="text-[#1a2642] text-[13px]">Reception — NFC scan</p>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-[29px] top-0 w-6 h-6 rounded-full bg-green-50 border border-green-200 flex items-center justify-center text-green-600 text-[10px] z-10">✓</div>
                    <p className="text-[#f97316] font-bold text-[12px] mb-0.5 font-mono">23:31</p>
                    <p className="text-[#1a2642] text-[13px]">Task completed</p>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-[29px] top-0 w-6 h-6 rounded-full bg-yellow-50 border border-yellow-200 flex items-center justify-center text-yellow-600 text-[10px] z-10">⚠️</div>
                    <p className="text-[#f97316] font-bold text-[12px] mb-0.5 font-mono">23:42</p>
                    <p className="text-[#1a2642] text-[13px]">Incident report submitted</p>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-[29px] top-0 w-6 h-6 rounded-full bg-green-50 border border-green-200 flex items-center justify-center text-green-600 text-[10px] z-10">🏁</div>
                    <p className="text-[#f97316] font-bold text-[12px] mb-0.5 font-mono">00:58</p>
                    <p className="text-[#1a2642] text-[13px]">Patrol completed</p>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-[29px] top-0 w-6 h-6 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-[10px] z-10">⏱</div>
                    <p className="text-[#f97316] font-bold text-[12px] mb-0.5 font-mono">01:01</p>
                    <p className="text-[#1a2642] text-[13px]">Clocked out</p>
                  </div>

                </div>
              </div>
            </div>

            <div className="col-span-8 space-y-6">
              
              {/* Checkpoint Activity */}
              <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-100">
                  <h3 className="font-semibold text-[#1a2642] text-[14px]">Checkpoint Activity</h3>
                </div>
                <table className="w-full text-left text-[13px]">
                  <thead>
                    <tr className="bg-gray-50/50 text-gray-400 text-[10px] uppercase tracking-wider font-semibold border-b border-gray-100">
                      <th className="px-5 py-3">#</th>
                      <th className="px-4 py-3">CHECKPOINT</th>
                      <th className="px-4 py-3">PLANNED</th>
                      <th className="px-4 py-3">ACTUAL SCAN</th>
                      <th className="px-4 py-3">NFC</th>
                      <th className="px-4 py-3">GPS</th>
                      <th className="px-4 py-3">SYNC</th>
                      <th className="px-4 py-3">DEVIATION</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-50">
                      <td className="px-5 py-4 font-bold text-[#8492a6] font-mono">01</td>
                      <td className="px-4 py-4 font-medium text-[#1a2642]">Main Entrance</td>
                      <td className="px-4 py-4 text-gray-500 font-mono text-[12px]">23:08</td>
                      <td className="px-4 py-4 text-[#1a2642] font-mono text-[12px]">23:08</td>
                      <td className="px-4 py-4 text-green-500">Valid</td>
                      <td className="px-4 py-4 text-gray-500">Valid · 8m</td>
                      <td className="px-4 py-4 text-green-500">Synced</td>
                      <td className="px-4 py-4">
                        <span className="inline-flex px-2 py-0.5 bg-green-50 text-green-700 rounded text-[11px] font-medium">On time</span>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-50">
                      <td className="px-5 py-4 font-bold text-[#8492a6] font-mono">02</td>
                      <td className="px-4 py-4 font-medium text-[#1a2642]">Reception</td>
                      <td className="px-4 py-4 text-gray-500 font-mono text-[12px]">23:15</td>
                      <td className="px-4 py-4 text-[#1a2642] font-mono text-[12px]">23:15</td>
                      <td className="px-4 py-4 text-green-500">Valid</td>
                      <td className="px-4 py-4 text-gray-500">Valid · 12m</td>
                      <td className="px-4 py-4 text-green-500">Synced</td>
                      <td className="px-4 py-4">
                        <span className="inline-flex px-2 py-0.5 bg-green-50 text-green-700 rounded text-[11px] font-medium">On time</span>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-50">
                      <td className="px-5 py-4 font-bold text-[#8492a6] font-mono">03</td>
                      <td className="px-4 py-4 font-medium text-[#1a2642]">Parking Area</td>
                      <td className="px-4 py-4 text-gray-500 font-mono text-[12px]">23:25–23:30</td>
                      <td className="px-4 py-4 text-[#1a2642] font-mono text-[12px]">23:34</td>
                      <td className="px-4 py-4 text-green-500">Valid</td>
                      <td className="px-4 py-4 text-gray-500">Valid · 16m</td>
                      <td className="px-4 py-4 text-green-500">Synced</td>
                      <td className="px-4 py-4">
                        <span className="inline-flex px-2 py-0.5 bg-orange-50 text-orange-600 rounded text-[11px] font-medium">Late</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-5 py-4 font-bold text-[#8492a6] font-mono">04</td>
                      <td className="px-4 py-4 font-medium text-[#1a2642]">Warehouse Gate</td>
                      <td className="px-4 py-4 text-gray-500 font-mono text-[12px]">23:40</td>
                      <td className="px-4 py-4 text-gray-400 font-mono text-[12px]">—</td>
                      <td className="px-4 py-4 text-gray-400">—</td>
                      <td className="px-4 py-4 text-gray-400">—</td>
                      <td className="px-4 py-4 text-gray-400">—</td>
                      <td className="px-4 py-4">
                        <span className="inline-flex px-2 py-0.5 bg-red-50 text-red-600 rounded text-[11px] font-medium border border-red-100">Missed</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Original Route Configuration */}
              <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-100">
                  <h3 className="font-semibold text-[#1a2642] text-[14px]">Original Route Configuration</h3>
                </div>
                <div className="p-5 grid grid-cols-4 gap-y-4 text-[13px]">
                  <div className="col-span-1 text-blue-400">Employee</div>
                  <div className="col-span-1 text-[#1a2642] font-medium">John Smith</div>
                  <div className="col-span-1 text-blue-400">Customer</div>
                  <div className="col-span-1 text-[#1a2642] font-medium">ABC Security</div>

                  <div className="col-span-1 text-blue-400">Location</div>
                  <div className="col-span-1 text-[#1a2642] font-medium">Main Office</div>
                  <div className="col-span-1 text-blue-400">Schedule</div>
                  <div className="col-span-1 text-[#1a2642] font-medium">Daily · 23:00–01:00</div>

                  <div className="col-span-1 text-blue-400">Checkpoint order</div>
                  <div className="col-span-1 text-[#1a2642] font-medium">Configured order</div>
                  <div className="col-span-1 text-blue-400">Reminder</div>
                  <div className="col-span-1 text-[#1a2642] font-medium">15 min before start</div>

                  <div className="col-span-1 text-blue-400">Escalation</div>
                  <div className="col-span-1 text-[#1a2642] font-medium">Enabled</div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>

    </div>
  );
}
