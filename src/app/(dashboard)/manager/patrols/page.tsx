"use client";

import { Bell, X } from "lucide-react";
import { useState } from "react";

export default function ManagerPatrolsPage() {
  const [activeModal, setActiveModal] = useState<"none" | "view-patrol">("none");

  return (
    <div className="flex flex-col h-full bg-[#f8f9fa] relative">
      <header className="h-[72px] bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0">
        <div>
          <p className="text-gray-400 text-[11px] font-medium tracking-wide uppercase mb-0.5">SHIFTPOINT • MANAGER</p>
          <h1 className="text-[#1a2642] text-[18px] font-bold leading-tight">Patrols</h1>
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
        <div className="max-w-[1200px] mx-auto">
          
          <div className="grid grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <p className="text-gray-400 text-[11px] font-bold tracking-wide uppercase mb-2">ACTIVE</p>
              <p className="text-emerald-500 font-bold text-[32px] leading-none">5</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <p className="text-gray-400 text-[11px] font-bold tracking-wide uppercase mb-2">COMPLETED</p>
              <p className="text-blue-500 font-bold text-[32px] leading-none">12</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <p className="text-gray-400 text-[11px] font-bold tracking-wide uppercase mb-2">LATE</p>
              <p className="text-orange-500 font-bold text-[32px] leading-none">2</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <p className="text-gray-400 text-[11px] font-bold tracking-wide uppercase mb-2">MISSED / ESCALATED</p>
              <p className="text-red-500 font-bold text-[32px] leading-none">1 / 1</p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <table className="w-full text-left text-[13px]">
              <thead>
                <tr className="border-b border-gray-100 text-gray-400 text-[11px] font-semibold tracking-wider">
                  <th className="py-4 px-6 font-medium">Patrol</th>
                  <th className="py-4 px-6 font-medium">Location</th>
                  <th className="py-4 px-6 font-medium">Assigned Employee</th>
                  <th className="py-4 px-6 font-medium">Start</th>
                  <th className="py-4 px-6 font-medium">Progress</th>
                  <th className="py-4 px-6 font-medium">Status</th>
                  <th className="py-4 px-6 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50">
                  <td className="py-4 px-6 font-semibold text-[#1a2642]">Morning Patrol</td>
                  <td className="py-4 px-6 text-gray-600">Location A</td>
                  <td className="py-4 px-6 text-gray-600">John Doe</td>
                  <td className="py-4 px-6 text-gray-600">08:00</td>
                  <td className="py-4 px-6 text-gray-600">4/6</td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-full text-[11px] font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      Active
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <button onClick={() => setActiveModal("view-patrol")} className="px-4 py-1.5 border border-gray-200 rounded text-[12px] font-medium text-gray-600 hover:bg-gray-50">
                      View Patrol
                    </button>
                  </td>
                </tr>
                <tr className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50">
                  <td className="py-4 px-6 font-semibold text-[#1a2642]">Evening Patrol</td>
                  <td className="py-4 px-6 text-gray-600">Location B</td>
                  <td className="py-4 px-6 text-gray-600">Sarah Smith</td>
                  <td className="py-4 px-6 text-gray-600">18:00</td>
                  <td className="py-4 px-6 text-gray-600">0/6</td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 text-blue-700 rounded-full text-[11px] font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                      Scheduled
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <button className="px-4 py-1.5 border border-gray-200 rounded text-[12px] font-medium text-gray-600 hover:bg-gray-50">
                      View Patrol
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>
      </main>

      {/* MODALS */}
      {activeModal === "view-patrol" && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-[#1a2642]/60 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-[700px] animate-in fade-in zoom-in-95 duration-200 my-8">
            <div className="flex justify-between items-center p-6 pb-4">
              <h3 className="text-[#1a2642] text-[20px] font-bold">Patrol Details</h3>
              <button onClick={() => setActiveModal("none")} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>
            
            <div className="p-6 pt-0 space-y-6">
              
              <div className="bg-[#1a2642] rounded-xl p-6 relative overflow-hidden">
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <p className="text-[#f97316] text-[10px] font-bold tracking-[0.1em] uppercase flex items-center gap-2 mb-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span> LIVE PATROL
                      </p>
                      <h4 className="text-white text-[24px] font-bold mb-1">Morning Patrol</h4>
                      <p className="text-[#8e9bb3] text-[13px]">Location A · John Doe · Started 08:00</p>
                    </div>
                    <div className="bg-white/10 px-4 py-1.5 rounded-full flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      <span className="text-white text-[13px] font-medium">Active</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[13px] font-medium mb-3">
                      <span className="text-white">Route completion</span>
                      <span className="text-white">4 / 6 checkpoints</span>
                    </div>
                    <div className="h-2 w-full bg-[#2a3a5a] rounded-full overflow-hidden">
                      <div className="h-full bg-[#f97316] w-[66%] rounded-full"></div>
                    </div>
                  </div>
                </div>
                
                {/* Decorative background curve */}
                <div className="absolute right-0 top-0 w-64 h-64 bg-[#233355] rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="border border-emerald-100 bg-emerald-50 p-4 rounded-lg">
                  <p className="text-emerald-600 font-bold text-[24px] mb-1">3</p>
                  <p className="text-emerald-700 text-[13px] font-medium">Verified</p>
                </div>
                <div className="border border-orange-100 bg-orange-50 p-4 rounded-lg">
                  <p className="text-orange-500 font-bold text-[24px] mb-1">1</p>
                  <p className="text-orange-700 text-[13px] font-medium">Needs attention</p>
                </div>
                <div className="border border-gray-100 bg-gray-50 p-4 rounded-lg">
                  <p className="text-[#1a2642] font-bold text-[24px] mb-1">2</p>
                  <p className="text-gray-600 text-[13px] font-medium">In queue</p>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-end mb-4">
                  <h4 className="text-gray-400 text-[10px] font-bold tracking-wide uppercase">CHECKPOINT STATUS</h4>
                  <span className="text-[#f97316] text-[12px] font-medium">Last update 08:27</span>
                </div>
                
                <div className="space-y-3 relative before:absolute before:inset-0 before:ml-3.5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gray-100">
                  
                  {/* Valid Checkpoints */}
                  {[
                    { id: "01", name: "Main Entrance", time: "08:12" },
                    { id: "02", name: "Reception", time: "08:18" },
                    { id: "03", name: "Floor 1", time: "08:27" },
                  ].map((cp, idx) => (
                    <div key={idx} className="relative flex items-center justify-between p-4 border border-gray-100 rounded-lg bg-white ml-8 shadow-sm">
                      <div className="absolute -left-[37px] w-4 h-4 rounded-full bg-emerald-500 border-4 border-white shadow-sm"></div>
                      <div>
                        <p className="text-[#1a2642] font-medium text-[13px]">{cp.id} · {cp.name}</p>
                        <p className="text-gray-400 text-[12px] mt-0.5">{cp.time}</p>
                      </div>
                      <span className="text-emerald-500 text-[10px] font-bold tracking-wider">VERIFIED</span>
                    </div>
                  ))}

                  {/* Missed Checkpoint */}
                  <div className="relative flex items-center justify-between p-4 border border-orange-200 bg-orange-50 rounded-lg ml-8 shadow-sm">
                    <div className="absolute -left-[37px] w-4 h-4 rounded-full bg-orange-500 border-4 border-white shadow-sm"></div>
                    <div>
                      <p className="text-[#1a2642] font-medium text-[13px]">04 · Storage Area</p>
                      <p className="text-orange-500 text-[12px] mt-0.5 font-medium">No valid NFC scan</p>
                    </div>
                    <span className="text-orange-600 text-[10px] font-bold tracking-wider">MISSED</span>
                  </div>

                  {/* Pending Checkpoints */}
                  <div className="relative flex items-center justify-between p-4 border border-gray-100 rounded-lg bg-white ml-8 opacity-50">
                    <div className="absolute -left-[37px] w-4 h-4 rounded-full bg-white border-2 border-gray-200 shadow-sm"></div>
                    <div>
                      <p className="text-[#1a2642] font-medium text-[13px]">05 · Floor 2</p>
                      <p className="text-gray-400 text-[12px] mt-0.5">Scheduled next</p>
                    </div>
                    <span className="text-gray-400 text-[10px] font-bold tracking-wider">PENDING</span>
                  </div>
                  <div className="relative flex items-center justify-between p-4 border border-gray-100 rounded-lg bg-white ml-8 opacity-50">
                    <div className="absolute -left-[37px] w-4 h-4 rounded-full bg-white border-2 border-gray-200 shadow-sm"></div>
                    <div>
                      <p className="text-[#1a2642] font-medium text-[13px]">06 · Exit</p>
                      <p className="text-gray-400 text-[12px] mt-0.5">Scheduled after Floor 2</p>
                    </div>
                    <span className="text-gray-400 text-[10px] font-bold tracking-wider">PENDING</span>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
