"use client";

import { useState } from "react";
import { Bell, X } from "lucide-react";
import Link from "next/link";

export default function PatrolRouteDetailsPage() {
  const [activeModal, setActiveModal] = useState<"none" | "deactivate">("none");

  return (
    <div className="flex flex-col h-full bg-[#f8f9fa] relative">
      {/* Top Header */}
      <header className="h-[72px] bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0">
        <div>
          <p className="text-gray-400 text-[11px] font-medium tracking-wide uppercase mb-0.5">SHIFTPOINT • Operations • Night Security Round</p>
          <h1 className="text-[#1a2642] text-[18px] font-bold leading-tight">Night Security Round</h1>
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
            <Link href="/company-admin/patrol-routes" className="text-[#8492a6] hover:text-[#1a2642] text-[13px] flex items-center gap-2 mb-4">
              ← Back to Patrol Routes
            </Link>
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h2 className="text-[#1a2642] text-[24px] font-bold">Night Security Round</h2>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-green-50 text-green-600 border border-green-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-current"></span> Active
                  </span>
                </div>
                <p className="text-gray-500 text-[14px]">ABC Security · Main Office</p>
              </div>
              <div className="flex gap-3">
                <button className="px-5 py-2.5 border border-gray-200 bg-white rounded-lg text-[14px] font-medium text-[#1a2642] hover:bg-gray-50">
                  Edit Route
                </button>
                <button className="px-5 py-2.5 border border-gray-200 bg-white rounded-lg text-[14px] font-medium text-[#1a2642] hover:bg-gray-50">
                  Duplicate
                </button>
                <button 
                  onClick={() => setActiveModal("deactivate")}
                  className="px-5 py-2.5 border border-red-200 bg-red-50 text-red-600 rounded-lg text-[14px] font-medium hover:bg-red-100"
                >
                  Deactivate
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-6">
              {/* Route Information */}
              <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-100">
                  <h3 className="font-semibold text-[#1a2642] text-[14px]">Route Information</h3>
                </div>
                <div className="p-5 grid grid-cols-3 gap-y-4">
                  <div className="col-span-1 text-[#8492a6] text-[13px]">Customer</div>
                  <div className="col-span-2 text-[#1a2642] text-[13px] font-medium">ABC Security</div>
                  
                  <div className="col-span-1 text-[#8492a6] text-[13px]">Location</div>
                  <div className="col-span-2 text-[#1a2642] text-[13px] font-medium">Main Office</div>
                  
                  <div className="col-span-1 text-[#8492a6] text-[13px]">Route type</div>
                  <div className="col-span-2 text-[#1a2642] text-[13px] font-medium">Reusable Patrol Route</div>

                  <div className="col-span-1 text-[#8492a6] text-[13px]">Status</div>
                  <div className="col-span-2 text-[#1a2642] text-[13px] font-medium">Active</div>
                </div>
              </div>

              {/* Schedule */}
              <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-100">
                  <h3 className="font-semibold text-[#1a2642] text-[14px]">Schedule</h3>
                </div>
                <div className="p-5 grid grid-cols-3 gap-y-4">
                  <div className="col-span-1 text-[#8492a6] text-[13px]">Effective period</div>
                  <div className="col-span-2 text-[#1a2642] text-[13px] font-medium">01 Sep 2026 – No end date</div>
                  
                  <div className="col-span-1 text-[#8492a6] text-[13px]">Time</div>
                  <div className="col-span-2 text-[#1a2642] text-[13px] font-medium">23:00 – 01:00 (+1 day)</div>
                  
                  <div className="col-span-1 text-[#8492a6] text-[13px]">Time zone</div>
                  <div className="col-span-2 text-[#1a2642] text-[13px] font-medium">Europe/Amsterdam</div>

                  <div className="col-span-1 text-[#8492a6] text-[13px]">Recurrence</div>
                  <div className="col-span-2 text-[#1a2642] text-[13px] font-medium">Every day</div>
                </div>
              </div>

              {/* Assignment */}
              <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-100">
                  <h3 className="font-semibold text-[#1a2642] text-[14px]">Assignment</h3>
                </div>
                <div className="p-5">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="font-semibold text-[#1a2642] text-[13px] mb-1">Assigned per scheduled occurrence</p>
                    <p className="text-gray-500 text-[13px]">This route template does not permanently assign an employee.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {/* Checkpoints */}
              <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-100">
                  <h3 className="font-semibold text-[#1a2642] text-[14px]">Checkpoints · 12</h3>
                </div>
                <table className="w-full text-left text-[13px]">
                  <thead>
                    <tr className="bg-gray-50/50 text-gray-400 text-[10px] uppercase tracking-wider font-semibold border-b border-gray-100">
                      <th className="px-5 py-3">ORDER</th>
                      <th className="px-5 py-3">CHECKPOINT</th>
                      <th className="px-5 py-3">NFC TAG ID</th>
                      <th className="px-5 py-3">LOCATION</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-50">
                      <td className="px-5 py-3 font-bold text-[#8492a6]">01</td>
                      <td className="px-5 py-3 text-[#1a2642]">Main Entrance</td>
                      <td className="px-5 py-3"><span className="px-2 py-1 bg-gray-100 rounded text-[11px] font-mono">NFC-001284</span></td>
                      <td className="px-5 py-3 text-gray-500">Main Entrance</td>
                    </tr>
                    <tr className="border-b border-gray-50">
                      <td className="px-5 py-3 font-bold text-[#8492a6]">02</td>
                      <td className="px-5 py-3 text-[#1a2642]">Reception</td>
                      <td className="px-5 py-3"><span className="px-2 py-1 bg-gray-100 rounded text-[11px] font-mono">NFC-001285</span></td>
                      <td className="px-5 py-3 text-gray-500">Reception</td>
                    </tr>
                    <tr className="border-b border-gray-50">
                      <td className="px-5 py-3 font-bold text-[#8492a6]">03</td>
                      <td className="px-5 py-3 text-[#1a2642]">Parking Area</td>
                      <td className="px-5 py-3"><span className="px-2 py-1 bg-gray-100 rounded text-[11px] font-mono">NFC-001286</span></td>
                      <td className="px-5 py-3 text-gray-500">Parking Area</td>
                    </tr>
                    <tr>
                      <td className="px-5 py-3 font-bold text-[#8492a6]">04</td>
                      <td className="px-5 py-3 text-[#1a2642]">Warehouse Gate</td>
                      <td className="px-5 py-3"><span className="px-2 py-1 bg-gray-100 rounded text-[11px] font-mono">NFC-001287</span></td>
                      <td className="px-5 py-3 text-gray-500">Warehouse Gate</td>
                    </tr>
                  </tbody>
                </table>
                <div className="px-5 py-3 border-t border-gray-100 text-[#8492a6] text-[12px] font-medium bg-gray-50/50">
                  + 8 more checkpoints
                </div>
              </div>

              {/* Recent Scheduled Patrols */}
              <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-100">
                  <h3 className="font-semibold text-[#1a2642] text-[14px]">Recent Scheduled Patrols</h3>
                </div>
                <table className="w-full text-left text-[13px]">
                  <thead>
                    <tr className="bg-gray-50/50 text-gray-400 text-[10px] uppercase tracking-wider font-semibold border-b border-gray-100">
                      <th className="px-5 py-3">DATE</th>
                      <th className="px-5 py-3">ASSIGNED TO</th>
                      <th className="px-5 py-3">SCHEDULED</th>
                      <th className="px-5 py-3">STATUS</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-50">
                      <td className="px-5 py-4 text-[#1a2642] font-medium">Today</td>
                      <td className="px-5 py-4 text-gray-500">John Smith</td>
                      <td className="px-5 py-4 font-mono font-medium text-[#1a2642]">23:00</td>
                      <td className="px-5 py-4">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-blue-50 text-blue-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-current"></span> Scheduled
                        </span>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-50">
                      <td className="px-5 py-4 text-[#1a2642] font-medium">Tomorrow</td>
                      <td className="px-5 py-4 text-gray-500">Michael Brown</td>
                      <td className="px-5 py-4 font-mono font-medium text-[#1a2642]">23:00</td>
                      <td className="px-5 py-4">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-blue-50 text-blue-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-current"></span> Scheduled
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-5 py-4 text-[#1a2642] font-medium">11 Sep</td>
                      <td className="px-5 py-4 text-gray-500">Sarah Williams</td>
                      <td className="px-5 py-4 font-mono font-medium text-[#1a2642]">23:00</td>
                      <td className="px-5 py-4">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-blue-50 text-blue-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-current"></span> Scheduled
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

            </div>
          </div>
        </div>
      </main>

      {/* OVERLAYS */}
      {activeModal === "deactivate" && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-[#1a2642]/60">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-[500px] animate-in fade-in zoom-in-95 duration-200 p-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-[#1a2642] text-[20px] font-bold">Deactivate patrol route?</h3>
              <button onClick={() => setActiveModal("none")} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>

            <p className="text-gray-600 text-[14px] leading-relaxed mb-4">
              This route will no longer generate new scheduled patrol occurrences. 
              <br/><br/>
              Existing active and completed patrol records will remain available in Patrol History.
            </p>
            
            <div className="bg-gray-50 border border-gray-100 rounded-lg px-4 py-3 mb-8 text-[13px]">
              <span className="text-gray-500">Route: </span>
              <span className="text-[#1a2642] font-medium">Night Security Round</span>
            </div>

            <div className="flex justify-end gap-3">
              <button onClick={() => setActiveModal("none")} className="px-6 py-2.5 border border-gray-200 rounded-lg text-[14px] font-medium text-gray-600 hover:bg-gray-50">
                Cancel
              </button>
              <button className="px-6 py-2.5 bg-red-500 text-white rounded-lg text-[14px] font-medium hover:bg-red-600">
                Deactivate Route
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
