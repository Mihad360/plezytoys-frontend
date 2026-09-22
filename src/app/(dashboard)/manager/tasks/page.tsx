"use client";

import { Bell } from "lucide-react";
import { useState } from "react";

export default function ManagerTasksPage() {

  return (
    <div className="flex flex-col h-full bg-[#f8f9fa] relative">
      <header className="h-[72px] bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0">
        <div>
          <p className="text-gray-400 text-[11px] font-medium tracking-wide uppercase mb-0.5">SHIFTPOINT • MANAGER</p>
          <h1 className="text-[#1a2642] text-[18px] font-bold leading-tight">Tasks & Checklists</h1>
        </div>
        <div className="flex items-center gap-4">
          <button className="px-5 py-2 bg-[#f97316] hover:bg-[#e06511] text-white rounded-lg text-[13px] font-medium transition-colors shadow-sm">
            + Create Task
          </button>
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
              <p className="text-gray-400 text-[11px] font-bold tracking-wide uppercase mb-2">TOTAL</p>
              <p className="text-[#1a2642] font-bold text-[32px] leading-none">42</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <p className="text-gray-400 text-[11px] font-bold tracking-wide uppercase mb-2">PENDING</p>
              <p className="text-orange-500 font-bold text-[32px] leading-none">18</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <p className="text-gray-400 text-[11px] font-bold tracking-wide uppercase mb-2">COMPLETED</p>
              <p className="text-emerald-500 font-bold text-[32px] leading-none">16</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <p className="text-gray-400 text-[11px] font-bold tracking-wide uppercase mb-2">OVERDUE</p>
              <p className="text-red-500 font-bold text-[32px] leading-none">4</p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <table className="w-full text-left text-[13px]">
              <thead>
                <tr className="border-b border-gray-100 text-gray-400 text-[11px] font-semibold tracking-wider">
                  <th className="py-4 px-6 font-medium">Task</th>
                  <th className="py-4 px-6 font-medium">Assignee</th>
                  <th className="py-4 px-6 font-medium">Location</th>
                  <th className="py-4 px-6 font-medium">Priority</th>
                  <th className="py-4 px-6 font-medium">Due Date</th>
                  <th className="py-4 px-6 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50">
                  <td className="py-4 px-6 font-semibold text-[#1a2642]">Floor Inspection</td>
                  <td className="py-4 px-6 text-gray-600">John Doe</td>
                  <td className="py-4 px-6 text-gray-600">Location A</td>
                  <td className="py-4 px-6 text-gray-600">High</td>
                  <td className="py-4 px-6 text-gray-600">Today 11:00</td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-[11px] font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                      Pending
                    </span>
                  </td>
                </tr>
                <tr className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50">
                  <td className="py-4 px-6 font-semibold text-[#1a2642]">Equipment Check</td>
                  <td className="py-4 px-6 text-gray-600">Sarah Smith</td>
                  <td className="py-4 px-6 text-gray-600">Location B</td>
                  <td className="py-4 px-6 text-gray-600">Medium</td>
                  <td className="py-4 px-6 text-gray-600">Today 12:00</td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-[11px] font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      Completed
                    </span>
                  </td>
                </tr>
                <tr className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50">
                  <td className="py-4 px-6 font-semibold text-[#1a2642]">Safety Inspection</td>
                  <td className="py-4 px-6 text-gray-600">Michael Lee</td>
                  <td className="py-4 px-6 text-gray-600">Location A</td>
                  <td className="py-4 px-6 text-gray-600">High</td>
                  <td className="py-4 px-6 text-gray-600">Yesterday</td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-[11px] font-medium">
                      overdue
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>
      </main>

    </div>
  );
}
