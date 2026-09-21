"use client";

import { Bell, ChevronDown, Clock } from "lucide-react";

const WORKING_TIME = [
  { id: 1, name: "John Smith", mon: "8h 02m", tue: "7h 58m", wed: "8h 10m", thu: "8h 05m", fri: "7h 55m", total: "40h 10m", wedColor: "text-gray-500" },
  { id: 2, name: "Sarah Johnson", mon: "7h 50m", tue: "8h 00m", wed: "8h 00m", thu: "8h 02m", fri: "8h 00m", total: "39h 52m", wedColor: "text-gray-500" },
  { id: 3, name: "Tom Wilson", mon: "8h 30m", tue: "8h 15m", wed: "—", thu: "8h 20m", fri: "8h 00m", total: "33h 05m", wedColor: "text-red-500" },
];

export default function WorkingTimePage() {
  return (
    <div className="flex flex-col h-full bg-[#f8f9fa] relative">
      {/* Top Header */}
      <header className="h-[72px] bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0">
        <div>
          <p className="text-gray-400 text-[11px] font-medium tracking-wide uppercase mb-0.5">SHIFTPOINT • Attendance • Working Time</p>
          <h1 className="text-[#1a2642] text-[18px] font-bold leading-tight">Working Time</h1>
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
            <h2 className="text-[#1a2642] text-[24px] font-bold mb-1">Working Time</h2>
            <p className="text-gray-500 text-[14px]">Weekly working hours per employee.</p>
          </div>

          {/* Filters */}
          <div className="flex gap-3 mb-6">
            <div className="flex items-center justify-between w-[200px] px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-[13px] text-[#1a2642]">
              Week 2, 2026 <Clock size={16} className="text-[#1a2642]" />
            </div>
            <button className="flex items-center justify-between w-[200px] px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-[13px] text-[#1a2642]">
              All Employees <ChevronDown size={16} className="text-gray-400" />
            </button>
            <button className="flex items-center justify-between w-[200px] px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-[13px] text-[#1a2642]">
              All Customers <ChevronDown size={16} className="text-gray-400" />
            </button>
          </div>

          {/* Table Area */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-3">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13px]">
                <thead>
                  <tr className="border-b border-gray-100 text-gray-400 text-[10px] uppercase tracking-wider font-semibold">
                    <th className="px-6 py-4">EMPLOYEE</th>
                    <th className="px-4 py-4">MON</th>
                    <th className="px-4 py-4">TUE</th>
                    <th className="px-4 py-4">WED</th>
                    <th className="px-4 py-4">THU</th>
                    <th className="px-4 py-4">FRI</th>
                    <th className="px-6 py-4">TOTAL</th>
                  </tr>
                </thead>
                <tbody>
                  {WORKING_TIME.map((row) => (
                    <tr key={row.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors last:border-0">
                      <td className="px-6 py-4">
                        <p className="font-semibold text-[#1a2642]">{row.name}</p>
                      </td>
                      <td className="px-4 py-4 text-gray-500">{row.mon}</td>
                      <td className="px-4 py-4 text-gray-500">{row.tue}</td>
                      <td className={`px-4 py-4 ${row.wedColor}`}>{row.wed}</td>
                      <td className="px-4 py-4 text-gray-500">{row.thu}</td>
                      <td className="px-4 py-4 text-gray-500">{row.fri}</td>
                      <td className="px-6 py-4 font-bold text-[#1a2642]">{row.total}</td>
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
