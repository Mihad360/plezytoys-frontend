"use client";
import Link from "next/link";

import { Bell, Crown } from "lucide-react";

const STATS = [
  { label: "ACTIVE EMPLOYEES", value: "48", badge: "EMP", badgeColor: "bg-blue-50 text-blue-500", valueColor: "text-blue-500" },
  { label: "ACTIVE MANAGERS", value: "6", badge: "MGR", badgeColor: "bg-purple-50 text-purple-500", valueColor: "text-purple-500" },
  { label: "ACTIVE CUSTOMERS", value: "12", badge: "CUS", badgeColor: "bg-emerald-50 text-emerald-500", valueColor: "text-emerald-500" },
  { label: "CONFIGURED LOCATIONS", value: "24", badge: "LOC", badgeColor: "bg-orange-50 text-orange-500", valueColor: "text-[#f97316]" },
  { label: "CURRENTLY CLOCKED IN", value: "31", badge: "LIVE", badgeColor: "bg-emerald-50 text-emerald-500", valueColor: "text-emerald-500" },
  { label: "OPEN TASKS", value: "9", badge: "TASK", badgeColor: "bg-orange-50 text-orange-500", valueColor: "text-[#f97316]" },
  { label: "PENDING REPORTS", value: "4", badge: "RPT", badgeColor: "bg-blue-50 text-blue-500", valueColor: "text-blue-500" },
  { label: "EXPIRING DOCUMENTS", value: "3", badge: "DOC", badgeColor: "bg-red-50 text-red-500", valueColor: "text-red-500" },
];

const ACTIVITY = [
  { initials: "JS", name: "John Smith", action: "Submitted patrol report", time: "10 min ago", type: "Submitted", typeColor: "bg-blue-50 text-blue-600" },
  { initials: "SJ", name: "Sarah Johnson", action: "Clocked in at ABC HQ", time: "23 min ago", type: "Active", typeColor: "bg-green-50 text-green-600", dot: true },
  { initials: "DB", name: "David Brown", action: "Created NFC checkpoint", time: "1h ago", type: "Active", typeColor: "bg-green-50 text-green-600", dot: true },
  { initials: "EC", name: "Emily Chen", action: "Completed task: Equipment Check", time: "2h ago", type: "Active", typeColor: "bg-green-50 text-green-600", dot: true },
  { initials: "MT", name: "Mike Torres", action: "Missed patrol: Night Route B", time: "3h ago", type: "Missed", typeColor: "bg-red-50 text-red-600", dot: true },
];

const ALERTS = [
  { text: "3 employees have expired documents.", type: "red" },
  { text: "2 patrols were missed today.", type: "yellow" },
  { text: "4 tasks are overdue.", type: "yellow" },
  { text: "1 checkpoint validation failed.", type: "red" }
];

export default function CompanyAdminDashboard() {
  return (
    <div className="flex flex-col h-full bg-[#f8f9fa] relative">
      {/* Top Header */}
      <header className="h-[72px] bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0">
        <div>
          <p className="text-gray-400 text-[11px] font-medium tracking-wide uppercase mb-0.5">SHIFTPOINT • Dashboard</p>
          <h1 className="text-[#1a2642] text-[18px] font-bold leading-tight">Company Operations Overview</h1>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/company-admin/subscription" className="flex items-center gap-2 px-4 py-1.5 border border-orange-200 bg-orange-50 rounded-full text-[#f97316] text-[13px] font-semibold hover:bg-orange-100 transition-colors">
            <span className="text-[16px] text-[#f97316]">?</span> Subscription
          </Link>
          <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors">
            <Bell size={20} />
          </button>
          <div className="w-10 h-10 rounded-full bg-[#f97316] flex items-center justify-center text-white font-bold text-sm">
            CA
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-8">
        <div className="max-w-[1400px] mx-auto">
          
          <div className="mb-8">
            <h2 className="text-[#1a2642] text-[24px] font-bold mb-1">Company Operations Overview</h2>
            <p className="text-gray-500 text-[14px]">Monitor your people, locations, attendance and daily operations.</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-5 gap-5 mb-8">
            {STATS.map((stat, idx) => (
              <div key={idx} className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm flex flex-col justify-between">
                <div className="flex justify-between items-start mb-4">
                  <p className="text-gray-400 text-[10px] font-bold tracking-[0.05em]">{stat.label}</p>
                  <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${stat.badgeColor}`}>
                    {stat.badge}
                  </span>
                </div>
                <p className={`text-[32px] font-bold ${stat.valueColor}`}>{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-12 gap-6">
            
            {/* Left Column (8/12) */}
            <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">
              
              {/* Recent Activity */}
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="text-[#1a2642] font-bold text-[16px] mb-4">Recent Activity</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-[13px]">
                    <thead>
                      <tr className="border-b border-gray-100 text-gray-400 text-[10px] uppercase tracking-wider font-semibold">
                        <th className="py-3 px-2">Employee</th>
                        <th className="py-3 px-2">Action</th>
                        <th className="py-3 px-2">Time</th>
                        <th className="py-3 px-2">Type</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ACTIVITY.map((act, i) => (
                        <tr key={i} className="border-b border-gray-50 last:border-0">
                          <td className="py-4 px-2">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-[#1a2642] text-white flex items-center justify-center text-[11px] font-bold shrink-0">
                                {act.initials}
                              </div>
                              <span className="font-semibold text-[#1a2642]">{act.name}</span>
                            </div>
                          </td>
                          <td className="py-4 px-2 text-gray-500">{act.action}</td>
                          <td className="py-4 px-2 text-gray-400 text-[12px]">{act.time}</td>
                          <td className="py-4 px-2">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium ${act.typeColor}`}>
                              {act.dot && <span className="w-1.5 h-1.5 rounded-full bg-current"></span>}
                              {act.type}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Operational Alerts */}
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <div className="flex justify-between items-center mb-5">
                  <h3 className="text-[#1a2642] font-bold text-[16px]">Operational Alerts</h3>
                  <button className="bg-[#f97316] hover:bg-[#e06511] text-white font-medium text-[12px] px-4 py-2 rounded-lg transition-colors">
                    View all alerts
                  </button>
                </div>
                <div className="flex flex-col gap-3">
                  {ALERTS.map((alert, i) => (
                    <div 
                      key={i} 
                      className={`p-4 rounded-lg border text-[13px] font-medium text-[#1a2642] ${
                        alert.type === "red" 
                          ? "bg-red-50 border-red-100" 
                          : "bg-amber-50 border-amber-100"
                      }`}
                    >
                      {alert.text}
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column (4/12) */}
            <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
              
              {/* Setup Box */}
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="text-[#1a2642] font-bold text-[16px] mb-1">Complete your company setup</h3>
                
                <div className="flex justify-between items-end mb-2 mt-4">
                  <span className="text-gray-500 text-[12px]">6 of 9 completed</span>
                  <span className="text-[#f97316] font-bold text-[12px]">67%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1.5 mb-6">
                  <div className="bg-[#f97316] h-1.5 rounded-full" style={{ width: '67%' }}></div>
                </div>

                <div className="space-y-3 mb-8">
                  {[
                    "Company profile", "Customers", "Locations", "Employees", "Roles & permissions", "NFC checkpoints"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="text-emerald-500 font-bold">✓</span>
                      <span className="text-[#1a2642] text-[13px] font-medium">{item}</span>
                    </div>
                  ))}
                  {[
                    "Patrol routes", "Tasks & checklists", "Report templates"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="text-gray-300 font-bold">—</span>
                      <span className="text-gray-400 text-[13px]">{item}</span>
                    </div>
                  ))}
                </div>

                <button className="w-full bg-[#f97316] hover:bg-[#e06511] text-white font-medium text-[14px] px-4 py-2.5 rounded-lg transition-colors">
                  Continue Setup →
                </button>
              </div>

            </div>

          </div>

        </div>
      </main>
    </div>
  );
}


