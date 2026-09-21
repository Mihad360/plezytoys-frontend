"use client";

import { Bell, ChevronDown, Clock } from "lucide-react";

const ATTENDANCE = [
  { id: 1, initials: "JS", name: "John Smith", clockIn: "08:02 AM", clockOut: "04:05 PM", hours: "8h 03m", location: "ABC HQ", gps: "✓ Verified", gpsStatus: "verified", status: "Active", statusColor: "bg-green-50 text-green-600" },
  { id: 2, initials: "SJ", name: "Sarah Johnson", clockIn: "07:55 AM", clockOut: "03:58 PM", hours: "8h 03m", location: "City Mall Main", gps: "✓ Verified", gpsStatus: "verified", status: "Active", statusColor: "bg-green-50 text-green-600" },
  { id: 3, initials: "TW", name: "Tom Wilson", clockIn: "09:15 AM", clockOut: "—", hours: "—", location: "Warehouse A", gps: "✗ No GPS", gpsStatus: "missing", status: "Late", statusColor: "bg-orange-50 text-orange-600" },
  { id: 4, initials: "LP", name: "Lisa Park", clockIn: "—", clockOut: "—", hours: "—", location: "MedCenter Main", gps: "✗ No GPS", gpsStatus: "missing", status: "Missing", statusColor: "bg-gray-100 text-gray-500" },
  { id: 5, initials: "MT", name: "Mike Torres", clockIn: "08:00 AM", clockOut: "—", hours: "—", location: "Tech Park", gps: "✓ Verified", gpsStatus: "verified", status: "Active", statusColor: "bg-green-50 text-green-600" },
];

export default function AttendancePage() {
  return (
    <div className="flex flex-col h-full bg-[#f8f9fa] relative">
      {/* Top Header */}
      <header className="h-[72px] bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0">
        <div>
          <p className="text-gray-400 text-[11px] font-medium tracking-wide uppercase mb-0.5">SHIFTPOINT • Attendance</p>
          <h1 className="text-[#1a2642] text-[18px] font-bold leading-tight">Attendance Overview</h1>
        </div>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-4 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-[#1a2642] text-[13px] font-medium hover:bg-gray-100 transition-colors">
            <span className="text-[#f97316] text-[16px]">♛</span> Subscription
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
          
          <div className="mb-8">
            <h2 className="text-[#1a2642] text-[24px] font-bold mb-1">Attendance Overview</h2>
            <p className="text-gray-500 text-[14px]">Monitor real-time attendance across all locations.</p>
          </div>

          {/* Stats Boxes */}
          <div className="grid grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <p className="text-gray-400 text-[11px] font-bold tracking-[0.05em] uppercase mb-2">CURRENTLY CLOCKED IN</p>
              <p className="text-[#059669] font-bold text-[36px] leading-none">31</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <p className="text-gray-400 text-[11px] font-bold tracking-[0.05em] uppercase mb-2">CLOCKED OUT</p>
              <p className="text-[#3b82f6] font-bold text-[36px] leading-none">14</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <p className="text-gray-400 text-[11px] font-bold tracking-[0.05em] uppercase mb-2">LATE</p>
              <p className="text-[#f59e0b] font-bold text-[36px] leading-none">3</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <p className="text-gray-400 text-[11px] font-bold tracking-[0.05em] uppercase mb-2">MISSING CLOCK-OUT</p>
              <p className="text-[#ef4444] font-bold text-[36px] leading-none">2</p>
            </div>
          </div>

          {/* Filters */}
          <div className="flex gap-3 mb-6">
            <div className="flex items-center justify-between w-[180px] px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-[13px] text-[#1a2642]">
              09/03/26 <Clock size={16} className="text-[#1a2642]" />
            </div>
            <button className="flex items-center justify-between w-[180px] px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-[13px] text-[#1a2642]">
              All Employees <ChevronDown size={16} className="text-gray-400" />
            </button>
            <button className="flex items-center justify-between w-[180px] px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-[13px] text-[#1a2642]">
              All Customers <ChevronDown size={16} className="text-gray-400" />
            </button>
            <button className="flex items-center justify-between w-[180px] px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-[13px] text-[#1a2642]">
              All Locations <ChevronDown size={16} className="text-gray-400" />
            </button>
            <button className="flex items-center justify-between w-[180px] px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-[13px] text-[#1a2642]">
              All Status <ChevronDown size={16} className="text-gray-400" />
            </button>
          </div>

          {/* Table Area */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-3">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13px]">
                <thead>
                  <tr className="border-b border-gray-100 text-gray-400 text-[10px] uppercase tracking-wider font-semibold">
                    <th className="px-6 py-4">EMPLOYEE</th>
                    <th className="px-4 py-4">CLOCK IN</th>
                    <th className="px-4 py-4">CLOCK OUT</th>
                    <th className="px-4 py-4">HOURS</th>
                    <th className="px-4 py-4">LOCATION</th>
                    <th className="px-4 py-4">GPS</th>
                    <th className="px-6 py-4">STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  {ATTENDANCE.map((att) => (
                    <tr key={att.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors last:border-0">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#1a2642] flex items-center justify-center text-white font-bold text-[11px] shrink-0">
                            {att.initials}
                          </div>
                          <p className="font-semibold text-[#1a2642]">{att.name}</p>
                        </div>
                      </td>
                      <td className="px-4 py-4 font-semibold text-[#1a2642]">{att.clockIn}</td>
                      <td className="px-4 py-4 text-gray-500">{att.clockOut}</td>
                      <td className="px-4 py-4 font-semibold text-[#1a2642]">{att.hours}</td>
                      <td className="px-4 py-4 text-gray-500">{att.location}</td>
                      <td className="px-4 py-4">
                        <span className={`inline-flex px-2.5 py-1 rounded-full text-[11px] font-bold ${
                          att.gpsStatus === "verified" ? "bg-green-100 text-green-700" : "bg-red-50 text-red-600"
                        }`}>
                          {att.gps}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium ${
                          att.status === 'Missing' ? '' : 'border'
                        } ${att.statusColor}`}>
                          <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                          {att.status}
                        </span>
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
