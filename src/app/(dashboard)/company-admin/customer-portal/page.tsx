"use client";

import { Bell, ChevronDown, X } from "lucide-react";
import { useState } from "react";

export default function CustomerPortalPage() {
  const [activeModal, setActiveModal] = useState<"none" | "edit-access">("none");

  return (
    <div className="flex flex-col h-full bg-[#f8f9fa] relative">
      {/* Top Header */}
      <header className="h-[72px] bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0">
        <div>
          <p className="text-gray-400 text-[11px] font-medium tracking-wide uppercase mb-0.5">SHIFTPOINT • Settings • Customer Portal</p>
          <h1 className="text-[#1a2642] text-[18px] font-bold leading-tight">Customer Portal Access</h1>
        </div>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-4 py-1.5 bg-orange-50 border border-orange-100 rounded-lg text-[#f97316] text-[13px] font-medium hover:bg-orange-100 transition-colors">
            <span className="text-[16px]">★</span> Subscription
          </button>
          <div className="relative">
            <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors">
              <Bell size={20} />
            </button>
            <div className="absolute top-0 right-0 w-4 h-4 bg-[#b45f06] text-white text-[9px] font-bold flex items-center justify-center rounded-full border-2 border-white">4</div>
          </div>
          <div className="w-10 h-10 rounded-full bg-[#b45f06] flex items-center justify-center text-white font-bold text-sm">
            CA
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-8">
        <div className="max-w-[1000px]">
          
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm mb-6">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <div>
                <h2 className="text-[#1a2642] text-[16px] font-bold mb-1">Portal users & location permissions</h2>
                <p className="text-gray-500 text-[13px]">Modules, actions, and visible report types are scoped by customer location.</p>
              </div>
              <span className="px-3 py-1 bg-orange-50 text-orange-600 rounded-full text-[12px] font-medium border border-orange-100">
                2 enabled users
              </span>
            </div>

            <div className="p-6 border-b border-gray-100 last:border-b-0 space-y-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-[#1a2642] text-[15px] font-semibold flex items-center gap-2">
                    Daan Vermeer <span className="text-gray-400 font-normal">ABC Facilities Ltd.</span>
                    <span className="px-2 py-0.5 bg-green-50 text-green-600 rounded text-[11px] font-medium">Enabled</span>
                  </h3>
                  <p className="text-gray-400 text-[12px] mt-1">daan@abcfacilities.nl · Updated 10 Sep 2026 · 10:48 CEST</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setActiveModal("edit-access")} className="px-4 py-2 border border-gray-200 rounded-lg text-[13px] font-medium text-gray-600 hover:bg-gray-50">
                    Edit location access
                  </button>
                  <button className="px-4 py-2 border border-red-100 bg-red-50 rounded-lg text-[13px] font-medium text-red-600 hover:bg-red-100">
                    Disable
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="border border-gray-100 rounded-lg p-5">
                  <h4 className="text-[#1a2642] text-[14px] font-semibold mb-3">Head Office</h4>
                  <div className="flex gap-2 mb-4">
                    <span className="px-2 py-1 bg-green-50 text-green-600 rounded text-[11px] font-medium flex items-center gap-1">✓ Reports</span>
                    <span className="px-2 py-1 bg-green-50 text-green-600 rounded text-[11px] font-medium flex items-center gap-1">✓ Tasks</span>
                    <span className="px-2 py-1 bg-green-50 text-green-600 rounded text-[11px] font-medium flex items-center gap-1">✓ Announcements</span>
                  </div>
                  <div className="mb-3">
                    <p className="text-gray-400 text-[10px] font-bold tracking-wide uppercase mb-1">ALLOWED ACTIONS</p>
                    <p className="text-gray-600 text-[12px]">View · Download · Comment</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-[10px] font-bold tracking-wide uppercase mb-1">VISIBLE REPORT TYPES</p>
                    <p className="text-gray-600 text-[12px]">Incident · Daily report</p>
                  </div>
                </div>
                <div className="border border-gray-100 rounded-lg p-5">
                  <h4 className="text-[#1a2642] text-[14px] font-semibold mb-3">West Campus</h4>
                  <div className="flex gap-2 mb-4">
                    <span className="px-2 py-1 bg-green-50 text-green-600 rounded text-[11px] font-medium flex items-center gap-1">✓ Reports</span>
                    <span className="px-2 py-1 bg-green-50 text-green-600 rounded text-[11px] font-medium flex items-center gap-1">✓ Attendance</span>
                  </div>
                  <div className="mb-3">
                    <p className="text-gray-400 text-[10px] font-bold tracking-wide uppercase mb-1">ALLOWED ACTIONS</p>
                    <p className="text-gray-600 text-[12px]">View · Download</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-[10px] font-bold tracking-wide uppercase mb-1">VISIBLE REPORT TYPES</p>
                    <p className="text-gray-600 text-[12px]">Incident</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-100 space-y-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-[#1a2642] text-[15px] font-semibold flex items-center gap-2">
                    Mila de Jong <span className="text-gray-400 font-normal">City Mall Ltd.</span>
                    <span className="px-2 py-0.5 bg-green-50 text-green-600 rounded text-[11px] font-medium">Enabled</span>
                  </h3>
                  <p className="text-gray-400 text-[12px] mt-1">mila@citymall.nl · Updated 09 Sep 2026 · 15:20 CEST</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setActiveModal("edit-access")} className="px-4 py-2 border border-gray-200 rounded-lg text-[13px] font-medium text-gray-600 hover:bg-gray-50">
                    Edit location access
                  </button>
                  <button className="px-4 py-2 border border-red-100 bg-red-50 rounded-lg text-[13px] font-medium text-red-600 hover:bg-red-100">
                    Disable
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="border border-gray-100 rounded-lg p-5">
                  <h4 className="text-[#1a2642] text-[14px] font-semibold mb-3">City Mall</h4>
                  <div className="flex gap-2 mb-4">
                    <span className="px-2 py-1 bg-green-50 text-green-600 rounded text-[11px] font-medium flex items-center gap-1">✓ Reports</span>
                    <span className="px-2 py-1 bg-green-50 text-green-600 rounded text-[11px] font-medium flex items-center gap-1">✓ Attendance</span>
                  </div>
                  <div className="mb-3">
                    <p className="text-gray-400 text-[10px] font-bold tracking-wide uppercase mb-1">ALLOWED ACTIONS</p>
                    <p className="text-gray-600 text-[12px]">View · Download</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-[10px] font-bold tracking-wide uppercase mb-1">VISIBLE REPORT TYPES</p>
                    <p className="text-gray-600 text-[12px]">Incident</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-100 space-y-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-[#1a2642] text-[15px] font-semibold flex items-center gap-2">
                    Noah Smit <span className="text-gray-400 font-normal">TechCorp BV</span>
                    <span className="px-2 py-0.5 bg-gray-100 text-gray-500 rounded text-[11px] font-medium">Disabled</span>
                  </h3>
                  <p className="text-gray-400 text-[12px] mt-1">noah@techcorp.nl · Updated 28 Aug 2026 · 09:05 CEST</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setActiveModal("edit-access")} className="px-4 py-2 border border-gray-200 rounded-lg text-[13px] font-medium text-gray-600 hover:bg-gray-50">
                    Edit location access
                  </button>
                  <button className="px-4 py-2 border border-green-100 bg-green-50 rounded-lg text-[13px] font-medium text-green-600 hover:bg-green-100">
                    Enable
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="border border-gray-100 rounded-lg p-5">
                  <h4 className="text-[#1a2642] text-[14px] font-semibold mb-3">Tech Park</h4>
                  <div className="flex gap-2 mb-4">
                    <span className="px-2 py-1 bg-green-50 text-green-600 rounded text-[11px] font-medium flex items-center gap-1">✓ Announcements</span>
                  </div>
                  <div className="mb-3">
                    <p className="text-gray-400 text-[10px] font-bold tracking-wide uppercase mb-1">ALLOWED ACTIONS</p>
                    <p className="text-gray-600 text-[12px]">View</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-[10px] font-bold tracking-wide uppercase mb-1">VISIBLE REPORT TYPES</p>
                    <p className="text-gray-600 text-[12px]">No reports</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-[#1a2642] text-[16px] font-bold mb-1">Permission audit log</h2>
            <p className="text-gray-500 text-[13px] mb-4">Every customer portal permission change is retained with the responsible Company Admin and timestamp.</p>
            <div className="bg-gray-50 rounded-lg p-4 text-[13px] text-gray-600">
              10 Sep 2026 - 10:48 CEST — Company Admin changed Daan Vermeer's West Campus access
            </div>
          </div>

        </div>
      </main>

      {/* MODALS */}
      {activeModal === "edit-access" && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-[#1a2642]/60 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-[700px] animate-in fade-in zoom-in-95 duration-200 my-8">
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <div>
                <p className="text-orange-500 text-[10px] font-bold tracking-wide uppercase mb-1">PER-USER, PER-LOCATION ACCESS</p>
                <h3 className="text-[#1a2642] text-[20px] font-bold mb-1">Daan Vermeer</h3>
                <p className="text-gray-500 text-[13px]">Set a separate permission set for every location this user may access.</p>
              </div>
              <button onClick={() => setActiveModal("none")} className="text-gray-400 hover:text-gray-600 self-start"><X size={20} /></button>
            </div>
            
            <div className="p-8 space-y-6">
              
              <div>
                <label className="block text-[#1a2642] text-[13px] font-medium mb-2">Customer</label>
                <div className="relative">
                  <select className="w-full appearance-none bg-white border border-gray-200 rounded-lg px-4 py-3 text-[14px] text-[#1a2642] focus:outline-none">
                    <option>ABC Facilities Ltd.</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                </div>
              </div>

              <div>
                <label className="block text-[#1a2642] text-[13px] font-medium mb-2">Customer locations this user may access</label>
                <div className="flex gap-2">
                  <label className="px-4 py-2 border border-orange-200 bg-orange-50 rounded-lg flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-[#f97316] border-orange-300 focus:ring-[#f97316]" />
                    <span className="text-[#d97706] text-[13px] font-medium">Head Office</span>
                  </label>
                  <label className="px-4 py-2 border border-gray-200 bg-white hover:bg-gray-50 rounded-lg flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-[#f97316] border-gray-300 focus:ring-[#f97316]" />
                    <span className="text-gray-600 text-[13px] font-medium">West Campus</span>
                  </label>
                </div>
              </div>

              <div className="border border-orange-100 bg-orange-50/30 rounded-xl p-6">
                <div className="flex gap-2 border-b border-orange-100 pb-4 mb-4">
                  <button className="px-4 py-2 bg-[#f97316] text-white rounded-lg text-[13px] font-medium shadow-sm">
                    Head Office
                  </button>
                  <button className="px-4 py-2 bg-white border border-gray-200 text-gray-600 rounded-lg text-[13px] font-medium hover:bg-gray-50">
                    West Campus
                  </button>
                </div>

                <div className="space-y-6">
                  <p className="text-[#1a2642] text-[14px] font-medium">Permissions for Head Office</p>

                  <div>
                    <p className="text-gray-400 text-[10px] font-bold tracking-wide uppercase mb-3">VISIBLE MODULES</p>
                    <div className="flex gap-3">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-[#f97316] border-gray-300 focus:ring-[#f97316]" />
                        <span className="text-[#1a2642] text-[13px] border border-gray-200 bg-white px-3 py-1.5 rounded-lg">Reports</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-[#f97316] border-gray-300 focus:ring-[#f97316]" />
                        <span className="text-[#1a2642] text-[13px] border border-gray-200 bg-white px-3 py-1.5 rounded-lg">Tasks</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 rounded text-[#f97316] border-gray-300 focus:ring-[#f97316]" />
                        <span className="text-[#1a2642] text-[13px] border border-gray-200 bg-white px-3 py-1.5 rounded-lg">Attendance</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-[#f97316] border-gray-300 focus:ring-[#f97316]" />
                        <span className="text-[#1a2642] text-[13px] border border-gray-200 bg-white px-3 py-1.5 rounded-lg">Announcements</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <p className="text-gray-400 text-[10px] font-bold tracking-wide uppercase mb-3">ALLOWED ACTIONS</p>
                    <div className="flex gap-3">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-[#f97316] border-gray-300 focus:ring-[#f97316]" />
                        <span className="text-[#1a2642] text-[13px] border border-gray-200 bg-white px-3 py-1.5 rounded-lg">View</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-[#f97316] border-gray-300 focus:ring-[#f97316]" />
                        <span className="text-[#1a2642] text-[13px] border border-gray-200 bg-white px-3 py-1.5 rounded-lg">Download</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-[#f97316] border-gray-300 focus:ring-[#f97316]" />
                        <span className="text-[#1a2642] text-[13px] border border-gray-200 bg-white px-3 py-1.5 rounded-lg">Comment</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 rounded text-[#f97316] border-gray-300 focus:ring-[#f97316]" />
                        <span className="text-[#1a2642] text-[13px] border border-gray-200 bg-white px-3 py-1.5 rounded-lg">Approve</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 rounded text-[#f97316] border-gray-300 focus:ring-[#f97316]" />
                        <span className="text-[#1a2642] text-[13px] border border-gray-200 bg-white px-3 py-1.5 rounded-lg">Submit</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <p className="text-gray-400 text-[10px] font-bold tracking-wide uppercase mb-3">VISIBLE REPORT TYPES</p>
                    <div className="flex gap-3">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-[#f97316] border-gray-300 focus:ring-[#f97316]" />
                        <span className="text-[#1a2642] text-[13px] border border-gray-200 bg-white px-3 py-1.5 rounded-lg">Incident</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-[#f97316] border-gray-300 focus:ring-[#f97316]" />
                        <span className="text-[#1a2642] text-[13px] border border-gray-200 bg-white px-3 py-1.5 rounded-lg">Daily report</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 rounded text-[#f97316] border-gray-300 focus:ring-[#f97316]" />
                        <span className="text-[#1a2642] text-[13px] border border-gray-200 bg-white px-3 py-1.5 rounded-lg">Maintenance</span>
                      </label>
                    </div>
                  </div>

                  <p className="text-gray-400 text-[11px] mt-4">
                    Tasks, attendance, and announcements are visible only when their matching module is selected for this location. No data outside this customer and selected locations can be shown.
                  </p>
                </div>
              </div>

            </div>

            <div className="p-6 border-t border-gray-100 flex justify-end gap-3 bg-white rounded-b-xl">
              <button onClick={() => setActiveModal("none")} className="px-6 py-2.5 border border-gray-200 rounded-lg text-[14px] font-medium text-gray-600 hover:bg-gray-50">
                Cancel
              </button>
              <button className="px-6 py-2.5 bg-[#f97316] hover:bg-[#e06511] text-white rounded-lg text-[14px] font-medium transition-colors">
                Save & record audit event
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
