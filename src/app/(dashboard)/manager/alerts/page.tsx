"use client";

import { Bell, X } from "lucide-react";
import { useState } from "react";

export default function ManagerAlertsPage() {
  const [activeModal, setActiveModal] = useState<"none" | "view-alert">("none");

  return (
    <div className="flex flex-col h-full bg-[#f8f9fa] relative">
      <header className="h-[72px] bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0">
        <div>
          <p className="text-gray-400 text-[11px] font-medium tracking-wide uppercase mb-0.5">SHIFTPOINT • MANAGER</p>
          <h1 className="text-[#1a2642] text-[18px] font-bold leading-tight">Alerts & Notifications</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="px-4 py-1.5 bg-orange-50 border border-orange-100 text-[#d97706] rounded-full text-[13px] font-medium">
            Location scope: All
          </div>
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
        <div className="max-w-[1200px] mx-auto space-y-4 mt-4">

          <div className="bg-white rounded-xl border border-gray-100 p-6 flex justify-between items-center shadow-sm">
            <div>
              <h3 className="text-[#1a2642] font-bold text-[15px] mb-1">GPS anomaly detected</h3>
              <p className="text-gray-500 text-[13px]">John Doe is outside the permitted Location A radius.</p>
            </div>
            <button onClick={() => setActiveModal("view-alert")} className="px-5 py-2 border border-gray-200 bg-white rounded-lg text-[13px] font-medium text-gray-600 hover:bg-gray-50 shadow-sm">
              View
            </button>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 p-6 flex justify-between items-center shadow-sm">
            <div>
              <h3 className="text-[#1a2642] font-bold text-[15px] mb-1">Checkpoint missed</h3>
              <p className="text-gray-500 text-[13px]">Morning Patrol checkpoint 04 did not receive a valid scan.</p>
            </div>
            <button className="px-5 py-2 border border-gray-200 bg-white rounded-lg text-[13px] font-medium text-gray-600 hover:bg-gray-50 shadow-sm">
              View
            </button>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 p-6 flex justify-between items-center shadow-sm">
            <div>
              <h3 className="text-[#1a2642] font-bold text-[15px] mb-1">Task overdue</h3>
              <p className="text-gray-500 text-[13px]">Safety Inspection is past its due date.</p>
            </div>
            <button className="px-5 py-2 border border-gray-200 bg-white rounded-lg text-[13px] font-medium text-gray-600 hover:bg-gray-50 shadow-sm">
              View
            </button>
          </div>

        </div>
      </main>

      {/* MODALS */}
      {activeModal === "view-alert" && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-[#1a2642]/60 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-[650px] animate-in fade-in zoom-in-95 duration-200 my-8">
            <div className="flex justify-between items-center p-6 pb-4 border-b-0">
              <h3 className="text-[#1a2642] text-[18px] font-bold">Attendance Details</h3>
              <button onClick={() => setActiveModal("none")} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>
            
            <div className="px-6 space-y-6">
              
              <div className="bg-[#1a2642] rounded-xl p-6 relative overflow-hidden">
                <div className="relative z-10 flex justify-between items-start mb-6">
                  <div>
                    <p className="text-[#8e9bb3] text-[10px] font-bold tracking-[0.15em] uppercase mb-1">LIVE ATTENDANCE</p>
                    <h4 className="text-white text-[24px] font-bold mb-1">John Doe</h4>
                    <p className="text-[#8e9bb3] text-[13px]">EMP-1042 · Location A</p>
                  </div>
                  <div className="px-3 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full text-[10px] font-bold tracking-wider">
                    ON SHIFT
                  </div>
                </div>

                <div className="relative z-10 flex gap-12">
                  <div>
                    <p className="text-[#8e9bb3] text-[10px] font-bold tracking-wider mb-1 uppercase">CLOCKED IN</p>
                    <p className="text-white text-[15px] font-bold">08:02 AM</p>
                  </div>
                  <div>
                    <p className="text-[#8e9bb3] text-[10px] font-bold tracking-wider mb-1 uppercase">WORKING TIME</p>
                    <p className="text-white text-[15px] font-bold">1h 40m</p>
                  </div>
                  <div>
                    <p className="text-[#8e9bb3] text-[10px] font-bold tracking-wider mb-1 uppercase">LAST PING</p>
                    <p className="text-white text-[15px] font-bold">09:42 AM</p>
                  </div>
                </div>
                
                {/* Decorative background circles */}
                <div className="absolute right-0 bottom-0 w-32 h-32 bg-blue-500/10 border-[16px] border-blue-500/10 rounded-full translate-x-1/4 translate-y-1/4"></div>
              </div>

              <div className="flex gap-4">
                <div className="flex-1 border border-emerald-100 bg-emerald-50 rounded-lg p-4">
                  <p className="text-emerald-700 text-[10px] font-bold tracking-wide uppercase flex items-center gap-1.5 mb-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> GPS CONFIRMED
                  </p>
                  <p className="text-emerald-800 font-bold text-[14px]">Inside approved work zone</p>
                  <p className="text-emerald-600 text-[11px] mt-1">Accuracy ± 8 m · Validated 1 min ago</p>
                </div>
                <div className="flex-[0.8] border border-gray-100 bg-white rounded-lg p-4 shadow-sm">
                  <p className="text-gray-400 text-[10px] font-bold tracking-wide uppercase mb-1.5">CURRENT TASK</p>
                  <p className="text-[#1a2642] font-bold text-[13px]">Cleaning Task</p>
                  <p className="text-[#1a2642] font-bold text-[13px]">Floor 2</p>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-end mb-4">
                  <h4 className="text-gray-400 text-[10px] font-bold tracking-wide uppercase">TODAY'S ACTIVITY</h4>
                  <button className="text-[#f97316] text-[12px] font-medium hover:underline">View location history</button>
                </div>
                
                <div className="space-y-0 relative before:absolute before:inset-0 before:ml-[11px] before:h-full before:w-0.5 before:bg-gray-100">
                  
                  <div className="relative flex justify-between items-start pb-6">
                    <div className="absolute left-0 w-6 h-6 rounded-full bg-white border-2 border-emerald-500 flex items-center justify-center z-10 shadow-sm">
                      <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                    </div>
                    <div className="pl-10">
                      <p className="text-[#1a2642] font-semibold text-[13px]">Location verified</p>
                      <p className="text-gray-400 text-[12px] mt-0.5">GPS ping received within Location A boundary</p>
                    </div>
                    <span className="text-gray-400 text-[11px]">09:42</span>
                  </div>

                  <div className="relative flex justify-between items-start pb-6">
                    <div className="absolute left-0 w-6 h-6 rounded-full bg-white border-2 border-blue-500 flex items-center justify-center z-10 shadow-sm">
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    </div>
                    <div className="pl-10">
                      <p className="text-[#1a2642] font-semibold text-[13px]">Task started</p>
                      <p className="text-gray-400 text-[12px] mt-0.5">Cleaning Task — Floor 2</p>
                    </div>
                    <span className="text-gray-400 text-[11px]">08:35</span>
                  </div>

                  <div className="relative flex justify-between items-start pb-2">
                    <div className="absolute left-0 w-6 h-6 rounded-full bg-white border-2 border-emerald-500 flex items-center justify-center z-10 shadow-sm">
                      <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                    </div>
                    <div className="pl-10">
                      <p className="text-[#1a2642] font-semibold text-[13px]">Shift started</p>
                      <p className="text-gray-400 text-[12px] mt-0.5">Clock-in accepted from approved device</p>
                    </div>
                    <span className="text-gray-400 text-[11px]">08:02</span>
                  </div>

                </div>
              </div>

            </div>

            <div className="p-6 pt-4 flex justify-end gap-3 border-t border-gray-100 mt-6">
              <button onClick={() => setActiveModal("none")} className="px-6 py-2.5 border border-gray-200 bg-white rounded-lg text-[14px] font-medium text-gray-600 hover:bg-gray-50 shadow-sm">
                Close
              </button>
              <button className="px-6 py-2.5 bg-[#f97316] hover:bg-[#e06511] text-white rounded-lg text-[14px] font-medium transition-colors shadow-sm">
                Request check-in
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
