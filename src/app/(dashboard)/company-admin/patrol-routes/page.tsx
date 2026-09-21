"use client";

import { useState } from "react";
import { Bell, ChevronDown, Search } from "lucide-react";
import Link from "next/link";

const ROUTES = [
  { id: 1, name: "Night Security Round", sub: "Main Office", customer: "ABC Security", location: "Main Office", checkpoints: "12", schedule: "Daily · 23:00–01:00", next: "Today · 23:00", status: "Active", statusColor: "bg-green-50 text-green-600" },
  { id: 2, name: "Evening Facility Patrol", sub: "Building A", customer: "CleanPro", location: "Building A", checkpoints: "8", schedule: "Weekdays · 18:00–20:00", next: "Today · 18:00", status: "Active", statusColor: "bg-green-50 text-green-600" },
  { id: 3, name: "Warehouse Patrol", sub: "Warehouse B", customer: "SafeGuard", location: "Warehouse B", checkpoints: "10", schedule: "Weekends · 22:00–00:00", next: "Sat · 22:00", status: "Draft", statusColor: "bg-gray-100 text-gray-500" },
  { id: 4, name: "Morning Rounds", sub: "City Mall", customer: "City Mall Ltd.", location: "City Mall", checkpoints: "6", schedule: "Weekdays · 07:00–08:00", next: "Tomorrow · 07:00", status: "Active", statusColor: "bg-green-50 text-green-600" },
];

const SCHEDULED = [
  { id: "#PAT-10482", route: "Night Security Round", date: "09 Sep", time: "23:00–01:00", assigned: "John Smith", status: "Scheduled", statusColor: "bg-blue-50 text-blue-600" },
  { id: "#PAT-10483", route: "Night Security Round", date: "10 Sep", time: "23:00–01:00", assigned: "Michael Brown", status: "Scheduled", statusColor: "bg-blue-50 text-blue-600" },
  { id: "#PAT-10484", route: "Night Security Round", date: "11 Sep", time: "23:00–01:00", assigned: "Sarah Williams", status: "Scheduled", statusColor: "bg-blue-50 text-blue-600" },
  { id: "#PAT-10481", route: "Evening Facility Patrol", date: "09 Sep", time: "18:00–20:00", assigned: "Tom Wilson", status: "In Progress", statusColor: "bg-orange-50 text-orange-600" },
  { id: "#PAT-10480", route: "Morning Rounds", date: "09 Sep", time: "07:00–08:00", assigned: "Michael Brown", status: "Completed", statusColor: "bg-green-50 text-green-600" },
];

const HISTORY = [
  { id: "#PAT-10482", route: "Night Security Round", date: "09 Sep", employee: "John Smith", checkpoints: "12/12", status: "Completed", statusColor: "bg-green-50 text-green-600" },
  { id: "#PAT-10481", route: "Night Security Round", date: "08 Sep", employee: "Michael Brown", checkpoints: "11/12", status: "Incomplete", statusColor: "bg-orange-50 text-orange-600" },
  { id: "#PAT-10480", route: "Night Security Round", date: "07 Sep", employee: "Sarah Williams", checkpoints: "0/12", status: "Missed", statusColor: "bg-red-50 text-red-600" },
  { id: "#PAT-10479", route: "Evening Facility Patrol", date: "08 Sep", employee: "Tom Wilson", checkpoints: "8/8", status: "Completed", statusColor: "bg-green-50 text-green-600" },
];

type TabType = "all" | "active" | "draft" | "scheduled" | "history";

export default function PatrolRoutesPage() {
  const [activeTab, setActiveTab] = useState<TabType>("all");

  return (
    <div className="flex flex-col h-full bg-[#f8f9fa]">
      {/* Top Header */}
      <header className="h-[72px] bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0">
        <div>
          <p className="text-gray-400 text-[11px] font-medium tracking-wide uppercase mb-0.5">SHIFTPOINT • Operations • Patrol Routes</p>
          <h1 className="text-[#1a2642] text-[18px] font-bold leading-tight">Patrol Routes</h1>
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
          
          <div className="flex justify-between items-start mb-8">
            <div>
              <h2 className="text-[#1a2642] text-[24px] font-bold mb-1">
                {activeTab === 'history' ? 'Patrol History' : activeTab === 'scheduled' ? 'Scheduled Patrols' : 'Patrol Routes'}
              </h2>
              <p className="text-gray-500 text-[14px]">
                {activeTab === 'history' 
                  ? 'Historical executions are retained as immutable operational records.' 
                  : activeTab === 'scheduled'
                  ? 'View individual patrol occurrences generated from your route templates.'
                  : 'Create and manage reusable patrol route templates for your customers and locations.'}
              </p>
            </div>
            {activeTab !== 'history' && activeTab !== 'scheduled' && (
              <Link 
                href="/company-admin/patrol-routes/create"
                className="px-5 py-2.5 bg-[#f97316] hover:bg-[#e06511] text-white rounded-lg text-[14px] font-medium transition-colors"
              >
                + Create Patrol Route
              </Link>
            )}
          </div>

          {/* Stats Boxes (Only for Routes views) */}
          {(activeTab === 'all' || activeTab === 'active' || activeTab === 'draft') && (
            <div className="grid grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
                <p className="text-gray-400 text-[11px] font-bold tracking-[0.05em] uppercase mb-2">ACTIVE ROUTES</p>
                <p className="text-[#059669] font-bold text-[36px] leading-none">24</p>
              </div>
              <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
                <p className="text-gray-400 text-[11px] font-bold tracking-[0.05em] uppercase mb-2">DRAFT ROUTES</p>
                <p className="text-[#1a2642] font-bold text-[36px] leading-none">6</p>
              </div>
              <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
                <p className="text-gray-400 text-[11px] font-bold tracking-[0.05em] uppercase mb-2">SCHEDULED PATROLS</p>
                <p className="text-[#f97316] font-bold text-[36px] leading-none">18</p>
              </div>
              <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
                <p className="text-gray-400 text-[11px] font-bold tracking-[0.05em] uppercase mb-2">NEEDS ATTENTION</p>
                <p className="text-[#ef4444] font-bold text-[36px] leading-none">4</p>
              </div>
            </div>
          )}

          {/* Table Container */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            
            {/* Tabs */}
            <div className="flex border-b border-gray-100 px-2">
              <button 
                onClick={() => setActiveTab("all")}
                className={`px-6 py-4 text-[14px] font-medium border-b-2 transition-colors ${activeTab === "all" ? "border-[#f97316] text-[#f97316]" : "border-transparent text-gray-500 hover:text-[#1a2642]"}`}
              >
                All Routes
              </button>
              <button 
                onClick={() => setActiveTab("active")}
                className={`px-6 py-4 text-[14px] font-medium border-b-2 transition-colors ${activeTab === "active" ? "border-[#f97316] text-[#f97316]" : "border-transparent text-gray-500 hover:text-[#1a2642]"}`}
              >
                Active Routes
              </button>
              <button 
                onClick={() => setActiveTab("draft")}
                className={`px-6 py-4 text-[14px] font-medium border-b-2 transition-colors ${activeTab === "draft" ? "border-[#f97316] text-[#f97316]" : "border-transparent text-gray-500 hover:text-[#1a2642]"}`}
              >
                Draft Routes
              </button>
              <button 
                onClick={() => setActiveTab("scheduled")}
                className={`px-6 py-4 text-[14px] font-medium border-b-2 transition-colors ${activeTab === "scheduled" ? "border-[#f97316] text-[#f97316]" : "border-transparent text-gray-500 hover:text-[#1a2642]"}`}
              >
                Scheduled Patrols
              </button>
              <button 
                onClick={() => setActiveTab("history")}
                className={`px-6 py-4 text-[14px] font-medium border-b-2 transition-colors ${activeTab === "history" ? "border-[#f97316] text-[#f97316]" : "border-transparent text-gray-500 hover:text-[#1a2642]"}`}
              >
                Patrol History
              </button>
            </div>

            {/* Filters Toolbar */}
            <div className="p-4 border-b border-gray-100 flex gap-3 flex-wrap">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input 
                  type="text" 
                  placeholder={activeTab === 'history' ? "Search route, employee or patrol ID..." : "Search routes..."}
                  className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-[13px] w-[260px] focus:outline-none focus:border-[#f97316]"
                />
              </div>

              {activeTab === 'scheduled' ? (
                <>
                  <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-[13px] text-[#1a2642] bg-white">
                    Date <ChevronDown size={14} className="text-gray-400" />
                  </button>
                  <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-[13px] text-[#1a2642] bg-white">
                    Route <ChevronDown size={14} className="text-gray-400" />
                  </button>
                  <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-[13px] text-[#1a2642] bg-white">
                    Customer <ChevronDown size={14} className="text-gray-400" />
                  </button>
                  <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-[13px] text-[#1a2642] bg-white">
                    Location <ChevronDown size={14} className="text-gray-400" />
                  </button>
                  <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-[13px] text-[#1a2642] bg-white">
                    Employee <ChevronDown size={14} className="text-gray-400" />
                  </button>
                  <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-[13px] text-[#1a2642] bg-white">
                    Team <ChevronDown size={14} className="text-gray-400" />
                  </button>
                  <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-[13px] text-[#1a2642] bg-white">
                    Status <ChevronDown size={14} className="text-gray-400" />
                  </button>
                </>
              ) : activeTab === 'history' ? (
                <>
                  <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-[13px] text-[#1a2642] bg-white">
                    Date <ChevronDown size={14} className="text-gray-400" />
                  </button>
                  <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-[13px] text-[#1a2642] bg-white">
                    Route <ChevronDown size={14} className="text-gray-400" />
                  </button>
                  <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-[13px] text-[#1a2642] bg-white">
                    Status <ChevronDown size={14} className="text-gray-400" />
                  </button>
                  <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-[13px] text-[#1a2642] bg-white">
                    NFC status <ChevronDown size={14} className="text-gray-400" />
                  </button>
                  <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-[13px] text-[#1a2642] bg-white">
                    GPS status <ChevronDown size={14} className="text-gray-400" />
                  </button>
                </>
              ) : (
                <>
                  <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-[13px] text-[#1a2642] bg-white">
                    Customer <ChevronDown size={14} className="text-gray-400" />
                  </button>
                  <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-[13px] text-[#1a2642] bg-white">
                    Status <ChevronDown size={14} className="text-gray-400" />
                  </button>
                  <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-[13px] text-[#1a2642] bg-white">
                    Recurrence <ChevronDown size={14} className="text-gray-400" />
                  </button>
                  <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-[13px] text-[#1a2642] bg-white">
                    Created by <ChevronDown size={14} className="text-gray-400" />
                  </button>
                  <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-[13px] text-[#1a2642] bg-white">
                    Date range
                  </button>
                  <button className="px-3 py-2 border border-gray-200 rounded-lg text-[13px] text-[#1a2642] bg-white">
                    Reset
                  </button>
                  <button className="px-3 py-2 border border-gray-200 rounded-lg text-[13px] text-[#1a2642] bg-white">
                    Export
                  </button>
                </>
              )}
            </div>

            {/* Table */}
            <div className="overflow-x-auto p-2">
              <table className="w-full text-left text-[13px]">
                <thead>
                  {activeTab === 'scheduled' ? (
                    <tr className="border-b border-gray-100 text-gray-400 text-[10px] uppercase tracking-wider font-semibold">
                      <th className="px-4 py-4">PATROL</th>
                      <th className="px-4 py-4">ROUTE</th>
                      <th className="px-4 py-4">DATE</th>
                      <th className="px-4 py-4">TIME</th>
                      <th className="px-4 py-4">ASSIGNED TO</th>
                      <th className="px-4 py-4">STATUS</th>
                      <th className="px-4 py-4 text-right">ACTIONS</th>
                    </tr>
                  ) : activeTab === 'history' ? (
                    <tr className="border-b border-gray-100 text-gray-400 text-[10px] uppercase tracking-wider font-semibold">
                      <th className="px-4 py-4">PATROL ID</th>
                      <th className="px-4 py-4">ROUTE</th>
                      <th className="px-4 py-4">DATE</th>
                      <th className="px-4 py-4">EMPLOYEE</th>
                      <th className="px-4 py-4">CHECKPOINTS</th>
                      <th className="px-4 py-4">STATUS</th>
                      <th className="px-4 py-4 text-right">ACTIONS</th>
                    </tr>
                  ) : (
                    <tr className="border-b border-gray-100 text-gray-400 text-[10px] uppercase tracking-wider font-semibold">
                      <th className="px-4 py-4">ROUTE NAME</th>
                      <th className="px-4 py-4">CUSTOMER</th>
                      <th className="px-4 py-4">LOCATION</th>
                      <th className="px-4 py-4">CHECKPOINTS</th>
                      <th className="px-4 py-4">SCHEDULE</th>
                      <th className="px-4 py-4">NEXT PATROL</th>
                      <th className="px-4 py-4">STATUS</th>
                      <th className="px-4 py-4 text-right">ACTIONS</th>
                    </tr>
                  )}
                </thead>
                <tbody>
                  {activeTab === 'scheduled' && SCHEDULED.map((row, i) => (
                    <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors last:border-0">
                      <td className="px-4 py-4 font-bold text-[#f97316]">{row.id}</td>
                      <td className="px-4 py-4 text-[#1a2642]">{row.route}</td>
                      <td className="px-4 py-4 text-gray-500">{row.date}</td>
                      <td className="px-4 py-4 font-mono font-medium text-[#1a2642]">{row.time}</td>
                      <td className="px-4 py-4 text-gray-500">{row.assigned}</td>
                      <td className="px-4 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium ${row.statusColor}`}>
                          <span className="w-1.5 h-1.5 rounded-full bg-current"></span> {row.status}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-right">
                        <Link href="/company-admin/patrol-routes/execution" className="inline-flex px-4 py-1.5 border border-gray-200 rounded-lg text-[12px] font-medium text-[#1a2642] hover:bg-gray-50">
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}

                  {activeTab === 'history' && HISTORY.map((row, i) => (
                    <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors last:border-0">
                      <td className="px-4 py-4 font-bold text-[#f97316]">{row.id}</td>
                      <td className="px-4 py-4 text-[#1a2642]">{row.route}</td>
                      <td className="px-4 py-4 text-gray-500">{row.date}</td>
                      <td className="px-4 py-4 text-gray-500">{row.employee}</td>
                      <td className="px-4 py-4 font-bold text-[#1a2642]">{row.checkpoints}</td>
                      <td className="px-4 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium ${row.statusColor}`}>
                          <span className="w-1.5 h-1.5 rounded-full bg-current"></span> {row.status}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-right">
                        <Link href="/company-admin/patrol-routes/execution" className="inline-flex px-4 py-1.5 border border-gray-200 rounded-lg text-[12px] font-medium text-[#1a2642] hover:bg-gray-50">
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}

                  {(activeTab === 'all' || activeTab === 'active' || activeTab === 'draft') && ROUTES.filter(r => activeTab === 'all' || r.status.toLowerCase() === activeTab).map((row) => (
                    <tr key={row.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors last:border-0">
                      <td className="px-4 py-4">
                        <p className="font-semibold text-[#1a2642] mb-0.5">{row.name}</p>
                        <p className="text-gray-400 text-[11px]">{row.sub}</p>
                      </td>
                      <td className="px-4 py-4 text-gray-500">{row.customer}</td>
                      <td className="px-4 py-4 text-gray-500">{row.location}</td>
                      <td className="px-4 py-4 font-medium text-[#1a2642]">{row.checkpoints}</td>
                      <td className="px-4 py-4 text-gray-500">{row.schedule}</td>
                      <td className="px-4 py-4 text-gray-500">{row.next}</td>
                      <td className="px-4 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium ${row.statusColor}`}>
                          <span className="w-1.5 h-1.5 rounded-full bg-current"></span> {row.status}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-right">
                        <Link href="/company-admin/patrol-routes/details" className="inline-flex px-4 py-1.5 border border-gray-200 rounded-lg text-[12px] font-medium text-[#1a2642] hover:bg-gray-50">
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
