"use client";

import { Bell, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function TaskDetailsPage() {
  const [activeModal, setActiveModal] = useState<"none" | "approve">("none");

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
        <div className="max-w-[1400px] mx-auto">
          
          <div className="mb-6">
            <Link href="/company-admin/tasks" className="text-[#8492a6] hover:text-[#1a2642] text-[13px] flex items-center gap-2 mb-4">
              ← Back to tasks
            </Link>
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h2 className="text-[#1a2642] text-[24px] font-bold">Opening safety inspection</h2>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-orange-50 text-orange-600">
                    In Progress
                  </span>
                </div>
                <p className="text-gray-500 text-[14px]">TSK-2018 · ABC Security · Main Office</p>
              </div>
              <div className="flex gap-3">
                <Link href="/company-admin/tasks/edit" className="px-5 py-2.5 border border-gray-200 bg-white rounded-lg text-[14px] font-medium text-[#1a2642] hover:bg-gray-50">
                  Edit task
                </Link>
                <button className="px-5 py-2.5 border border-red-200 bg-red-50 text-red-600 rounded-lg text-[14px] font-medium hover:bg-red-100">
                  Cancel / Archive
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6 mb-6">
            {/* Task assignment */}
            <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden h-full flex flex-col">
              <div className="px-5 py-4 border-b border-gray-100 shrink-0">
                <h3 className="font-semibold text-[#1a2642] text-[14px]">Task assignment</h3>
              </div>
              <div className="p-5 flex flex-col justify-between flex-1 gap-4">
                <div>
                  <p className="text-[#8492a6] text-[13px] mb-1">Assigned to</p>
                  <p className="text-[#1a2642] text-[13px] font-medium">John Smith (Employee)</p>
                </div>
                <div>
                  <p className="text-[#8492a6] text-[13px] mb-1">Deadline</p>
                  <p className="text-[#1a2642] text-[13px] font-medium">Today · 09:30 CEST</p>
                </div>
                <div>
                  <p className="text-[#8492a6] text-[13px] mb-1">Recurrence</p>
                  <p className="text-[#1a2642] text-[13px] font-medium">Weekdays · occurrence history preserved</p>
                </div>
                <div>
                  <p className="text-[#8492a6] text-[13px] mb-1">Approver</p>
                  <p className="text-[#1a2642] text-[13px] font-medium">Maria Janssen · Company Admin</p>
                </div>
              </div>
            </div>

            {/* Completion rules */}
            <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden h-full">
              <div className="px-5 py-4 border-b border-gray-100">
                <h3 className="font-semibold text-[#1a2642] text-[14px]">Completion rules</h3>
              </div>
              <div className="p-5">
                <p className="text-[#1a2642] text-[13px] leading-relaxed mb-4">
                  Mandatory checklist items, photos and comments must be supplied before completion.
                </p>
                <p className="text-purple-600 text-[13px] font-medium">
                  Submit for Approval required
                </p>
              </div>
            </div>

            {/* Instructions */}
            <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden h-full">
              <div className="px-5 py-4 border-b border-gray-100">
                <h3 className="font-semibold text-[#1a2642] text-[14px]">Instructions</h3>
              </div>
              <div className="p-5">
                <p className="text-[#1a2642] text-[13px] leading-relaxed">
                  Inspect the assigned area, record any deviations, attach required evidence and leave a clear handover note for the next team.
                </p>
              </div>
            </div>
          </div>

          {/* Checklist & completion evidence */}
          <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden mb-6">
            <div className="px-5 py-4 border-b border-gray-100">
              <h3 className="font-semibold text-[#1a2642] text-[14px]">Checklist & completion evidence</h3>
            </div>
            <table className="w-full text-left text-[13px]">
              <tbody>
                <tr className="border-b border-gray-50">
                  <td className="px-5 py-4 text-[#1a2642] font-medium w-1/3">Inspect fire exits</td>
                  <td className="px-5 py-4 text-gray-500 w-1/6">John Smith</td>
                  <td className="px-5 py-4 text-gray-500 w-1/4">09 Sep 2026 · 08:43</td>
                  <td className="px-5 py-4 text-gray-500">Photo attached · Online</td>
                </tr>
                <tr className="border-b border-gray-50">
                  <td className="px-5 py-4 text-[#1a2642] font-medium">Check emergency lighting</td>
                  <td className="px-5 py-4 text-gray-500">John Smith</td>
                  <td className="px-5 py-4 text-gray-500">09 Sep 2026 · 08:49</td>
                  <td className="px-5 py-4 text-gray-500">Comment attached · Synced from offline</td>
                </tr>
                <tr>
                  <td className="px-5 py-4 text-[#1a2642] font-medium">Confirm access points</td>
                  <td className="px-5 py-4 text-gray-400">—</td>
                  <td className="px-5 py-4 text-gray-400">Not completed</td>
                  <td className="px-5 py-4 text-gray-400">Photo required</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* Comments & attachments */}
            <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100">
                <h3 className="font-semibold text-[#1a2642] text-[14px]">Comments & attachments</h3>
              </div>
              <div className="p-5 space-y-4 text-[13px] text-gray-600">
                <p>Photo: north-exit.jpg · Comment: "Exit clear; door closer adjusted."</p>
                <p>Reference document: building-safety-plan.pdf</p>
              </div>
            </div>

            {/* Approval & audit trail */}
            <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100">
                <h3 className="font-semibold text-[#1a2642] text-[14px]">Approval & audit trail</h3>
              </div>
              <div className="p-5 space-y-4 text-[13px] text-gray-600">
                <p>09 Sep · 08:32 — Assigned by Maria Janssen</p>
                <p>09 Sep · 08:49 — Checklist item synchronised from offline</p>
                <p>Audit changes are immutable. Manager corrections require a mandatory reason.</p>
                <button 
                  onClick={() => setActiveModal("approve")}
                  className="mt-2 px-5 py-2.5 bg-[#f97316] hover:bg-[#e06511] text-white rounded-lg font-medium transition-colors"
                >
                  Approve / Reject with comment
                </button>
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* Approve Modal Overlay (Placeholder to be functional) */}
      {activeModal === "approve" && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-[#1a2642]/60">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-[500px] animate-in fade-in zoom-in-95 duration-200 p-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-[#1a2642] text-[20px] font-bold">Review Task</h3>
              <button onClick={() => setActiveModal("none")} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>
            <textarea 
              rows={4} 
              placeholder="Add review comment..." 
              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:border-[#f97316] mb-6 resize-none"
            ></textarea>
            <div className="flex flex-col gap-3">
              <button className="w-full py-3 bg-[#f97316] text-white font-medium rounded-lg hover:bg-[#e06511] flex items-center justify-center gap-2">
                ✓ Approve
              </button>
              <button className="w-full py-3 bg-white border border-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2">
                ↩ Return
              </button>
              <button className="w-full py-3 bg-red-50 text-red-600 font-medium rounded-lg hover:bg-red-100 flex items-center justify-center gap-2">
                ✕ Reject
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
