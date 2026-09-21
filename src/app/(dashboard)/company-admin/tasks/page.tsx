"use client";

import { Bell, ChevronDown } from "lucide-react";
import Link from "next/link";

const TASKS = [
  { 
    id: "TSK-2018", title: "Opening safety inspection", status: "In Progress", statusColor: "bg-orange-50 text-orange-600",
    customer: "ABC Security", location: "Main Office", assigned: "John Smith", deadline: "Today · 09:30 CEST",
    checklist: "5 / 8", recurrence: "Weekdays", approval: "Approval required", approvalColor: "text-purple-600"
  },
  { 
    id: "TSK-2017", title: "Fire exit compliance check", status: "Assigned", statusColor: "bg-blue-50 text-blue-600",
    customer: "ABC Security", location: "West Campus", assigned: "Night Security Team", deadline: "Today · 12:00 CEST",
    checklist: "0 / 6", recurrence: "Monthly"
  },
  { 
    id: "TSK-2014", title: "End-of-day facility lockup", status: "Awaiting Approval", statusColor: "bg-purple-50 text-purple-600",
    customer: "CleanPro", location: "Building A", assigned: "Facilities Manager", deadline: "Today · 18:00 CEST",
    checklist: "9 / 9", recurrence: "Weekdays", approval: "Approval required", approvalColor: "text-purple-600"
  },
  { 
    id: "TSK-2011", title: "Warehouse refrigeration check", status: "Overdue", statusColor: "bg-red-50 text-red-600",
    customer: "SafeGuard", location: "Warehouse B", assigned: "Sarah Williams, Tom Wilson", deadline: "Yesterday · 17:00 CEST",
    checklist: "3 / 5", recurrence: "Daily"
  }
];

export default function TasksPage() {
  return (
    <div className="flex flex-col h-full bg-[#f8f9fa] relative">
      {/* Top Header */}
      <header className="h-[72px] bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0">
        <div>
          <p className="text-gray-400 text-[11px] font-medium tracking-wide uppercase mb-0.5">SHIFTPOINT • Operations • Tasks</p>
          <h1 className="text-[#1a2642] text-[18px] font-bold leading-tight">Tasks & Checklists</h1>
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
        <div className="max-w-[1400px] mx-auto space-y-8">
          
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-[#1a2642] text-[24px] font-bold mb-1">Task operations</h2>
              <p className="text-gray-500 text-[14px]">Manage assigned work, checklist evidence and approval queues.</p>
            </div>
            <Link 
              href="/company-admin/tasks/create"
              className="px-5 py-2.5 bg-[#f97316] hover:bg-[#e06511] text-white rounded-lg text-[14px] font-medium transition-colors"
            >
              + Create task
            </Link>
          </div>

          {/* Stats Boxes */}
          <div className="grid grid-cols-4 gap-6">
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <p className="text-gray-400 text-[11px] font-bold tracking-[0.05em] uppercase mb-2">ASSIGNED</p>
              <p className="text-blue-600 font-bold text-[36px] leading-none">12</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <p className="text-gray-400 text-[11px] font-bold tracking-[0.05em] uppercase mb-2">IN PROGRESS</p>
              <p className="text-[#f97316] font-bold text-[36px] leading-none">7</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <p className="text-gray-400 text-[11px] font-bold tracking-[0.05em] uppercase mb-2">AWAITING APPROVAL</p>
              <p className="text-purple-600 font-bold text-[36px] leading-none">3</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <p className="text-gray-400 text-[11px] font-bold tracking-[0.05em] uppercase mb-2">OVERDUE</p>
              <p className="text-red-600 font-bold text-[36px] leading-none">1</p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex justify-between items-center">
            <div className="flex gap-3">
              <div className="relative w-[180px]">
                <select className="w-full appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-[14px] text-[#1a2642] focus:outline-none">
                  <option>All customers</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              </div>
              <div className="relative w-[180px]">
                <select className="w-full appearance-none bg-gray-50 text-gray-400 border border-gray-200 rounded-lg px-4 py-2.5 text-[14px] focus:outline-none" disabled>
                  <option>All locations</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300" size={16} />
              </div>
              <div className="relative w-[180px]">
                <select className="w-full appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-[14px] text-[#1a2642] focus:outline-none">
                  <option>All statuses</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              </div>
            </div>
            <p className="text-gray-400 text-[12px]">Manager access is scoped to assigned employees, customers and locations.</p>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-2 gap-6">
            {TASKS.map((task, idx) => (
              <Link href="/company-admin/tasks/details" key={idx} className="block group">
                <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:border-[#f97316] transition-colors h-full flex flex-col">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <p className="text-[#f97316] text-[11px] font-bold tracking-wide uppercase mb-1">{task.id}</p>
                      <h3 className="text-[#1a2642] text-[18px] font-semibold">{task.title}</h3>
                    </div>
                    <span className={`inline-flex px-3 py-1 rounded-full text-[11px] font-medium ${task.statusColor}`}>
                      {task.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-y-4 gap-x-8 mb-6 flex-1">
                    <div>
                      <p className="text-gray-400 text-[11px] uppercase mb-1">Customer</p>
                      <p className="text-[#1a2642] text-[13px]">{task.customer}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-[11px] uppercase mb-1">Location</p>
                      <p className="text-[#1a2642] text-[13px]">{task.location}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-[11px] uppercase mb-1">Assigned to</p>
                      <p className="text-[#1a2642] text-[13px]">{task.assigned}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-[11px] uppercase mb-1">Deadline</p>
                      <p className="text-[#1a2642] text-[13px]">{task.deadline}</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-50 flex justify-between items-center text-[12px]">
                    <div className="text-gray-500">
                      Checklist <span className="font-semibold text-[#1a2642] ml-1">{task.checklist}</span> <span className="ml-2 text-gray-400">{task.recurrence}</span>
                    </div>
                    {task.approval && (
                      <div className={task.approvalColor}>{task.approval}</div>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Workflow legend */}
          <div className="bg-white border border-gray-100 rounded-xl p-6 flex items-center justify-between shadow-sm">
            <div>
              <h4 className="text-[#1a2642] font-bold text-[14px] mb-2">Task status workflow</h4>
              <div className="flex items-center gap-3 text-[12px]">
                <span className="px-2 py-1 bg-gray-50 text-gray-600 rounded">Draft</span>
                <span className="text-gray-300">→</span>
                <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded">Assigned</span>
                <span className="text-gray-300">→</span>
                <span className="px-2 py-1 bg-orange-50 text-orange-600 rounded">In Progress</span>
                <span className="text-gray-300">→</span>
                <span className="px-2 py-1 bg-purple-50 text-purple-600 rounded">Awaiting Approval</span>
                <span className="text-gray-300">→</span>
                <span className="px-2 py-1 bg-green-50 text-green-600 rounded">Completed</span>
              </div>
            </div>
            <p className="text-gray-400 text-[12px] max-w-sm text-right">
              Overdue is an automatic deadline state; Cancelled preserves all history.
            </p>
          </div>

        </div>
      </main>
    </div>
  );
}
