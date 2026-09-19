"use client";

import { Bell, ChevronDown, X } from "lucide-react";
import { useState } from "react";

const LOGS = [
  {
    id: 1,
    action: "Company Admin invited",
    userInitials: "SJ",
    user: "Sarah Johnson",
    company: "ABC Security Services",
    time: "Today · 10:42 AM",
    ip: "145.36.18.204",
    device: "Chrome 128 · Windows 11",
    eventId: "evt_01J9SA7A2K4",
    role: "Company Admin",
    details: "Previous: No admin account · New: Invitation sent"
  },
  {
    id: 2,
    action: "Company suspended",
    userInitials: "SA",
    user: "System Admin",
    company: "XYZ Services",
    time: "Today · 09:30 AM",
    ip: "192.168.1.1",
    device: "Safari · macOS",
    eventId: "evt_02J9SA7B3L5",
    role: "Super Admin",
    details: "Account suspended due to non-payment"
  }
];

export default function AuditLogsPage() {
  const [selectedLog, setSelectedLog] = useState<any>(null);

  return (
    <div className="flex flex-col h-full bg-[#f8f9fa] relative">
      {/* Top Header */}
      <header className="h-[72px] bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0">
        <div>
          <h1 className="text-[#1a2642] text-xl font-bold">Audit Logs</h1>
          <p className="text-gray-400 text-xs mt-0.5">SHIFTPOINT • Super Admin</p>
        </div>
        <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors">
          <Bell size={20} />
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-8">
        <div className="flex gap-8 max-w-[1400px] mx-auto h-full">
          
          <div className="flex-1">
            <div className="flex items-start justify-between mb-8">
              <div>
                <h2 className="text-[#1a2642] text-[24px] font-bold mb-1">Platform Audit Logs</h2>
                <p className="text-gray-500 text-[14px]">Immutable record of significant platform activity.</p>
              </div>
              <button className="bg-white border border-gray-200 hover:bg-gray-50 text-[#1a2642] font-medium text-[14px] px-5 py-2.5 rounded-lg transition-colors">
                Export audit log
              </button>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-4 mb-8">
              <div className="flex-1">
                <input 
                  type="text" 
                  placeholder="Search activity..." 
                  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-[14px] text-[#1a2642] focus:outline-none focus:border-[#f97316]"
                />
              </div>
              
              <select className="w-[180px] px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-[14px] text-[#1a2642] focus:outline-none">
                <option>Today</option>
              </select>
              <select className="w-[180px] px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-[14px] text-[#1a2642] focus:outline-none">
                <option>All users</option>
              </select>
              <select className="w-[180px] px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-[14px] text-[#1a2642] focus:outline-none">
                <option>All roles</option>
              </select>
              <select className="w-[180px] px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-[14px] text-[#1a2642] focus:outline-none">
                <option>All actions</option>
              </select>
            </div>

            {/* List */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
              {LOGS.map((log, i) => (
                <div 
                  key={log.id} 
                  className={`p-6 flex items-start justify-between ${i !== LOGS.length - 1 ? 'border-b border-gray-50' : ''}`}
                >
                  <div className="flex gap-4">
                    <div className="w-10 h-10 shrink-0 rounded-full bg-gray-100 flex items-center justify-center text-[#1a2642] font-bold text-[13px]">
                      {log.userInitials}
                    </div>
                    <div>
                      <h3 className="text-[#1a2642] font-semibold text-[15px] mb-1">{log.action}</h3>
                      <p className="text-gray-400 text-[13px]">
                        {log.user} · {log.company}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-400 text-[12px] mb-2">{log.time}</p>
                    <button 
                      onClick={() => setSelectedLog(log)}
                      className="text-[#f97316] font-medium text-[13px] hover:underline"
                    >
                      Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Details Sidebar */}
          {selectedLog && (
            <div className="w-[400px] shrink-0 bg-white rounded-xl border border-gray-100 shadow-sm p-8 self-start">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-[#1a2642] font-bold text-[16px]">Activity Details</h3>
                <button onClick={() => setSelectedLog(null)} className="text-gray-400 hover:text-gray-600">
                  <X size={18} />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <p className="text-gray-400 text-[10px] font-bold tracking-[0.1em] uppercase mb-1">ACTION</p>
                  <p className="text-[#1a2642] text-[14px] font-medium">{selectedLog.action}</p>
                </div>
                
                <hr className="border-gray-50" />
                
                <div>
                  <p className="text-gray-400 text-[10px] font-bold tracking-[0.1em] uppercase mb-1">COMPANY</p>
                  <p className="text-[#1a2642] text-[14px] font-medium">{selectedLog.company}</p>
                </div>

                <hr className="border-gray-50" />

                <div>
                  <p className="text-gray-400 text-[10px] font-bold tracking-[0.1em] uppercase mb-1">AFFECTED USER / RECORD</p>
                  <p className="text-[#1a2642] text-[14px] font-medium">{selectedLog.user}</p>
                </div>

                <hr className="border-gray-50" />

                <div>
                  <p className="text-gray-400 text-[10px] font-bold tracking-[0.1em] uppercase mb-1">PERFORMED BY</p>
                  <p className="text-[#1a2642] text-[14px] font-medium">{selectedLog.user}</p>
                </div>

                <hr className="border-gray-50" />

                <div>
                  <p className="text-gray-400 text-[10px] font-bold tracking-[0.1em] uppercase mb-1">ROLE</p>
                  <p className="text-[#1a2642] text-[14px] font-medium">{selectedLog.role}</p>
                </div>

                <hr className="border-gray-50" />

                <div>
                  <p className="text-gray-400 text-[10px] font-bold tracking-[0.1em] uppercase mb-1">DATE & TIME</p>
                  <p className="text-[#1a2642] text-[14px] font-medium">{selectedLog.time}</p>
                </div>

                <hr className="border-gray-50" />

                <div>
                  <p className="text-gray-400 text-[10px] font-bold tracking-[0.1em] uppercase mb-1">IP ADDRESS</p>
                  <p className="text-[#1a2642] text-[14px] font-medium">{selectedLog.ip}</p>
                </div>

                <hr className="border-gray-50" />

                <div>
                  <p className="text-gray-400 text-[10px] font-bold tracking-[0.1em] uppercase mb-1">DEVICE / BROWSER</p>
                  <p className="text-[#1a2642] text-[14px] font-medium">{selectedLog.device}</p>
                </div>

                <hr className="border-gray-50" />

                <div>
                  <p className="text-gray-400 text-[10px] font-bold tracking-[0.1em] uppercase mb-1">UNIQUE EVENT ID</p>
                  <p className="text-[#1a2642] text-[14px] font-medium">{selectedLog.eventId}</p>
                </div>

                <hr className="border-gray-50" />

                <div>
                  <p className="text-gray-400 text-[10px] font-bold tracking-[0.1em] uppercase mb-1">DETAILS</p>
                  <p className="text-gray-500 text-[13px]">{selectedLog.details}</p>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
