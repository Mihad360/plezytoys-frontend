"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";

export default function EditTaskPage() {
  return (
    <div className="flex flex-col h-full bg-[#f8f9fa]">
      {/* Top Header */}
      <header className="h-[72px] bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0">
        <div>
          <p className="text-gray-400 text-[11px] font-medium tracking-wide uppercase mb-0.5">SHIFTPOINT • Operations • Tasks & Checklists</p>
          <h1 className="text-[#1a2642] text-[18px] font-bold leading-tight">Tasks & Checklists</h1>
        </div>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-4 py-1.5 bg-orange-50 border border-orange-100 rounded-lg text-[#f97316] text-[13px] font-medium hover:bg-orange-100 transition-colors">
            <span className="text-[16px]">★</span> Subscription
          </button>
          <div className="w-10 h-10 rounded-full bg-[#f97316] flex items-center justify-center text-white font-bold text-sm">
            CA
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-8">
        <div className="max-w-[1000px] mx-auto">
          
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-[#1a2642] text-[24px] font-bold mb-1">Edit task</h2>
              <p className="text-gray-500 text-[14px]">Assignment, approval and evidence are stored on each task occurrence.</p>
            </div>
            <Link href="/company-admin/tasks/details" className="text-gray-500 hover:text-[#1a2642] text-[14px] font-medium">
              Cancel
            </Link>
          </div>

          <div className="space-y-6">
            
            {/* Task details */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 bg-gray-50/50 border-b border-gray-100">
                <h3 className="font-semibold text-[#1a2642] text-[13px]">Task details</h3>
              </div>
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[#1a2642] text-[13px] font-medium mb-2">Task name</label>
                    <input type="text" defaultValue="Opening safety inspection" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:border-[#f97316]" />
                  </div>
                  <div>
                    <label className="block text-[#1a2642] text-[13px] font-medium mb-2">Customer</label>
                    <div className="relative">
                      <select className="w-full appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-[14px] text-[#1a2642] focus:outline-none">
                        <option>CleanPro</option>
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[#1a2642] text-[13px] font-medium mb-2">Location</label>
                    <div className="relative">
                      <select className="w-full appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-[14px] text-[#1a2642] focus:outline-none">
                        <option>Building A</option>
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[#1a2642] text-[13px] font-medium mb-2">Deadline date</label>
                    <input type="date" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:border-[#f97316]" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[#1a2642] text-[13px] font-medium mb-2">Deadline time</label>
                    <input type="time" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:border-[#f97316]" />
                  </div>
                  <div>
                    <label className="block text-[#1a2642] text-[13px] font-medium mb-2">Company / location time zone</label>
                    <div className="relative">
                      <select className="w-full appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-[14px] text-[#1a2642] focus:outline-none">
                        <option>Europe/Amsterdam (CEST)</option>
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[#1a2642] text-[13px] font-medium mb-2">Recurrence</label>
                    <div className="relative">
                      <select className="w-full appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-[14px] text-[#1a2642] focus:outline-none">
                        <option>Weekdays</option>
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[#1a2642] text-[13px] font-medium mb-2">Effective date range</label>
                    <input type="text" defaultValue="10 Sep 2026 — No end date" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:border-[#f97316]" />
                  </div>
                </div>
                <p className="text-gray-400 text-[11px]">For recurring tasks, every occurrence retains its own assignee, status, completion evidence and history.</p>
              </div>
            </div>

            {/* Assignment */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 bg-gray-50/50 border-b border-gray-100">
                <h3 className="font-semibold text-[#1a2642] text-[13px]">Assignment</h3>
              </div>
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[#1a2642] text-[13px] font-medium mb-2">Assign to</label>
                    <div className="relative">
                      <select className="w-full appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-[14px] text-[#1a2642] focus:outline-none">
                        <option>One employee</option>
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[#1a2642] text-[13px] font-medium mb-2">Select actual assignee</label>
                    <div className="relative">
                      <select className="w-full appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-[14px] text-[#1a2642] focus:outline-none">
                        <option>Select assignee</option>
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 border border-gray-100 rounded-lg p-3 text-[11px] text-gray-500">
                  Only users, managers, teams and roles with access to CleanPro · Building A are available.
                </div>
              </div>
            </div>

            {/* Evidence, approval & notifications */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 bg-gray-50/50 border-b border-gray-100">
                <h3 className="font-semibold text-[#1a2642] text-[13px]">Evidence, approval & notifications</h3>
              </div>
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[#1a2642] text-[13px] font-medium mb-2">Photo required</label>
                    <div className="relative">
                      <select className="w-full appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-[14px] text-[#1a2642] focus:outline-none">
                        <option>Yes</option>
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[#1a2642] text-[13px] font-medium mb-2">Comment required</label>
                    <div className="relative">
                      <select className="w-full appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-[14px] text-[#1a2642] focus:outline-none">
                        <option>Yes</option>
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[#1a2642] text-[13px] font-medium mb-2">Approval required</label>
                    <div className="relative">
                      <select className="w-full appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-[14px] text-[#1a2642] focus:outline-none">
                        <option>Yes</option>
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[#1a2642] text-[13px] font-medium mb-2">Select Manager or Company Admin</label>
                    <div className="relative">
                      <select className="w-full appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-[14px] text-[#1a2642] focus:outline-none">
                        <option>Maria Janssen · Company Admin</option>
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[#1a2642] text-[13px] font-medium mb-2">Attachments / reference documents</label>
                    <input type="text" defaultValue="building-safety-plan.pdf" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:border-[#f97316]" />
                  </div>
                  <div>
                    <label className="block text-[#1a2642] text-[13px] font-medium mb-2">Reminder</label>
                    <input type="text" defaultValue="30 minutes before deadline" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:border-[#f97316]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Checklist & instructions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 bg-gray-50/50 border-b border-gray-100">
                <h3 className="font-semibold text-[#1a2642] text-[13px]">Checklist & instructions</h3>
              </div>
              <div className="p-6">
                <textarea rows={4} defaultValue="Inspect all safety points. Attach a photo for each issue and comment on any deviation." className="w-full p-4 border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:border-[#f97316] mb-4 resize-none"></textarea>
                <div className="bg-gray-50 border border-gray-100 rounded-lg p-4 text-[13px] text-gray-500">
                  1. Inspect fire exits — photo required · 2. Check emergency lighting — comment required · 3. Confirm access points
                </div>
              </div>
            </div>

          </div>

          <div className="mt-8 flex justify-end gap-4">
            <button className="px-6 py-2.5 border border-gray-200 rounded-lg text-[14px] font-medium text-gray-600 hover:bg-gray-50">
              Save draft
            </button>
            <button className="px-6 py-2.5 bg-[#f97316] hover:bg-[#e06511] text-white rounded-lg text-[14px] font-medium">
              Update Task
            </button>
          </div>

        </div>
      </main>
    </div>
  );
}
