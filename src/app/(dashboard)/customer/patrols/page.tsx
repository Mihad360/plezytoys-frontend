"use client";

import { Bell, ArrowRight, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function CustomerPatrolsPage() {
  const [activePatrol, setActivePatrol] = useState<string | null>(null);

  return (
    <div className="flex flex-col h-full bg-[#f8f9fa] relative">
      <header className="h-[72px] bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0">
        <div>
          <p className="text-gray-400 text-[11px] font-medium tracking-wide uppercase mb-0.5">SHIFTPOINT • Customer</p>
          <h1 className="text-[#1a2642] text-[18px] font-bold leading-tight">Patrols & Checkpoints</h1>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/customer/notifications" className="relative">
            <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors">
              <Bell size={20} />
            </button>
          </Link>
          <Link href="/customer/profile">
            <div className="w-10 h-10 rounded-full bg-[#f97316] hover:bg-[#e06511] cursor-pointer flex items-center justify-center text-white font-bold text-sm transition-colors">
              SA
            </div>
          </Link>
        </div>
      </header>

      <main className="flex-1 overflow-auto p-8">
        <div className="max-w-[1200px] mx-auto space-y-6 mt-4">

          {activePatrol === null ? (
            // LIST VIEW
            <div className="animate-in fade-in duration-300">
              <div className="flex justify-between items-end mb-6">
                <div>
                  <h2 className="text-[#1a2642] text-[28px] font-bold mb-1">Patrols & Checkpoints</h2>
                  <p className="text-gray-500 text-[14px]">Monitor current and completed patrol activity at your approved locations.</p>
                </div>
                <button className="px-5 py-2.5 bg-[#f97316] hover:bg-[#e06511] text-white rounded-lg text-[13px] font-medium shadow-sm transition-colors">
                  Refresh activity
                </button>
              </div>

              <div className="bg-blue-50/50 border border-blue-100 rounded-lg p-4 flex gap-3 text-blue-700 text-[13px] mb-8">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
                <p>Read-only patrol information - only routes assigned to ARC Security Ltd. are visible.</p>
              </div>

              <div className="grid grid-cols-3 gap-6">
                
                {/* Left Col: Current Patrol Activity */}
                <div className="col-span-2">
                  <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white">
                      <div>
                        <h3 className="text-[#1a2642] text-[16px] font-bold mb-1">Current patrol activity</h3>
                        <p className="text-gray-400 text-[12px]">Latest updates from active routes</p>
                      </div>
                      <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-[11px] font-bold tracking-wider rounded-full flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> 1 LIVE
                      </span>
                    </div>

                    <div className="p-2">
                      <div className="flex items-center p-4 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer group" onClick={() => setActivePatrol("Westfield Office patrol")}>
                        <div className="w-3 h-3 rounded-full bg-emerald-500 mr-4 shrink-0 shadow-[0_0_0_4px_rgba(16,185,129,0.1)]"></div>
                        <div className="flex-1">
                          <h4 className="text-[#1a2642] font-bold text-[14px]">Westfield Office</h4>
                          <p className="text-gray-400 text-[12px] flex items-center gap-2">Main entrance <ArrowRight size={10} /> Floor 3</p>
                        </div>
                        <div className="text-right mr-4">
                          <p className="text-emerald-500 text-[12px] font-medium">Patrol in progress</p>
                          <p className="text-gray-400 text-[11px]">Started 09:42 · 5/8 checkpoints</p>
                        </div>
                        <div className="text-[#f97316] text-[12px] font-semibold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          Details <ArrowRight size={14} />
                        </div>
                      </div>

                      <div className="flex items-center p-4 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer group">
                        <div className="w-3 h-3 rounded-full bg-amber-500 mr-4 shrink-0 shadow-[0_0_0_4px_rgba(245,158,11,0.1)]"></div>
                        <div className="flex-1">
                          <h4 className="text-[#1a2642] font-bold text-[14px]">North Campus</h4>
                          <p className="text-gray-400 text-[12px]">Perimeter route</p>
                        </div>
                        <div className="text-right mr-4">
                          <p className="text-emerald-500 text-[12px] font-medium">Scheduled patrol</p>
                          <p className="text-gray-400 text-[11px]">Starts 11:30 · 0/6 checkpoints</p>
                        </div>
                        <div className="text-[#f97316] text-[12px] font-semibold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          Details <ArrowRight size={14} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Col: Checkpoint completion */}
                <div>
                  <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                    <h3 className="text-[#1a2642] text-[16px] font-bold mb-1">Checkpoint completion</h3>
                    <p className="text-gray-400 text-[12px] mb-8">Current assigned patrol coverage</p>

                    <div className="text-center mb-6">
                      <p className="text-[#1a2642] text-[42px] font-bold leading-none mb-2">36%</p>
                      <p className="text-gray-400 text-[12px]">5 of 14 checkpoints completed</p>
                    </div>

                    <div className="h-2 w-full bg-gray-100 rounded-full mb-8 overflow-hidden">
                      <div className="h-full bg-[#f97316] rounded-full" style={{ width: '36%' }}></div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between items-center pb-4 border-b border-gray-50">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                          <span className="text-[12px] text-gray-500 font-medium">Westfield Office</span>
                        </div>
                        <span className="text-[13px] font-semibold text-gray-700">5 / 8</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full border border-gray-300"></div>
                          <span className="text-[12px] text-gray-500 font-medium">North Campus</span>
                        </div>
                        <span className="text-[13px] font-semibold text-gray-700">0 / 6</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          ) : (
            // DETAILS VIEW
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              
              <button 
                onClick={() => setActivePatrol(null)}
                className="flex items-center gap-2 text-[#f97316] text-[13px] font-semibold hover:underline mb-4"
              >
                <ArrowLeft size={14} /> Back to Patrols & Checkpoints
              </button>

              <div className="mb-6">
                <h2 className="text-[#1a2642] text-[28px] font-bold mb-1">{activePatrol}</h2>
                <p className="text-gray-500 text-[14px]">Westfield Office · Customer-assigned patrol record</p>
              </div>

              <div className="bg-blue-50/50 border border-blue-100 rounded-lg p-4 flex gap-3 text-blue-700 text-[13px] mb-8">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
                <p>Read-only patrol view - only checkpoint activity and evidence for Westfield Office is available.</p>
              </div>

              <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm mb-8 flex justify-between items-center">
                <div>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-700 text-[10px] font-bold tracking-wider rounded-full mb-3 uppercase">
                    Live
                  </span>
                  <h3 className="text-[#1a2642] text-[20px] font-bold mb-1">Patrol in progress</h3>
                  <p className="text-gray-400 text-[12px]">Started at 09:42 · completion pending</p>
                </div>
                <div className="text-right">
                  <p className="text-[#1a2642] text-[36px] font-bold leading-none mb-1">5 / 8</p>
                  <p className="text-gray-400 text-[12px]">checkpoints completed</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6">
                
                {/* Checkpoint Activity List */}
                <div className="col-span-2">
                  <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h3 className="text-[#1a2642] text-[15px] font-bold mb-1">Checkpoint activity</h3>
                        <p className="text-gray-400 text-[12px]">5 completed of 8 total checkpoints</p>
                      </div>
                      <span className="px-2.5 py-1 bg-orange-50 text-orange-700 text-[11px] font-semibold rounded">Read-only</span>
                    </div>

                    <div className="h-2 w-full bg-gray-100 rounded-full mb-8 overflow-hidden">
                      <div className="h-full bg-[#f97316] rounded-full" style={{ width: '62.5%' }}></div>
                    </div>

                    <div className="space-y-0">
                      {[
                        { name: "Main entrance", status: "Scanned", time: "09:44", color: "text-emerald-500", icon: "✓" },
                        { name: "Reception", status: "Scanned", time: "09:47", color: "text-emerald-500", icon: "✓" },
                        { name: "Floor 1", status: "Scanned", time: "09:52", color: "text-emerald-500", icon: "✓" },
                        { name: "Floor 2", status: "Scanned", time: "09:57", color: "text-emerald-500", icon: "✓" },
                        { name: "Floor 3", status: "Scanned", time: "10:03", color: "text-emerald-500", icon: "✓" },
                        { name: "Loading bay", status: "Due", time: "—", color: "text-gray-300", icon: "○" },
                        { name: "Rear exit", status: "Due", time: "—", color: "text-gray-300", icon: "○" },
                        { name: "Car park", status: "Due", time: "—", color: "text-gray-300", icon: "○" }
                      ].map((chk, i) => (
                        <div key={i} className="flex justify-between items-center py-4 border-b border-gray-50 last:border-0">
                          <div className="flex items-center gap-4">
                            <div className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] ${chk.icon === '✓' ? 'bg-emerald-50 text-emerald-600' : 'border border-gray-200 text-transparent'}`}>
                              {chk.icon}
                            </div>
                            <span className="text-[#1a2642] text-[13px] font-semibold">{chk.name}</span>
                          </div>
                          <div className="flex items-center gap-8 w-[120px] justify-between">
                            <span className="text-gray-500 text-[13px]">{chk.status}</span>
                            <span className="text-gray-400 text-[13px]">{chk.time}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Side: Exceptions & Evidence */}
                <div className="space-y-6">
                  
                  {/* Exceptions & remarks */}
                  <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                    <h3 className="text-[#1a2642] text-[15px] font-bold mb-1">Exceptions & remarks</h3>
                    <p className="text-gray-400 text-[12px] mb-6">Recorded for this patrol</p>

                    <div className="space-y-4">
                      <div className="flex gap-3 pb-4 border-b border-gray-50">
                        <div className="w-5 h-5 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">i</div>
                        <div>
                          <p className="text-[#1a2642] text-[13px] font-semibold mb-0.5">Route progressing as planned</p>
                          <p className="text-gray-400 text-[11px]">10:03 · Floor 3 checkpoint scanned</p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <div className="w-5 h-5 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">!</div>
                        <div>
                          <p className="text-[#1a2642] text-[13px] font-semibold mb-0.5">Loading bay checkpoint pending</p>
                          <p className="text-gray-400 text-[11px]">Due after delivery access clears</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Patrol evidence */}
                  <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                    <h3 className="text-[#1a2642] text-[15px] font-bold mb-1">Patrol evidence</h3>
                    <p className="text-gray-400 text-[12px] mb-4">Files attached to this patrol</p>

                    <div className="space-y-3">
                      <div className="flex gap-4 items-center">
                        <div className="w-12 h-8 bg-gradient-to-tr from-slate-300 to-slate-200 rounded-md overflow-hidden relative shrink-0">
                           <div className="absolute inset-0 bg-[#2a3a5a]/20 transform -rotate-12 scale-150"></div>
                        </div>
                        <div>
                          <p className="text-[#1a2642] text-[11px] font-bold">Entry photo · 09:44</p>
                        </div>
                      </div>
                      <div className="flex gap-4 items-center">
                        <div className="w-12 h-10 bg-orange-50 text-[#f97316] rounded-md flex items-center justify-center shrink-0 border border-orange-100">
                          <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 1H2C1.44772 1 1 1.44772 1 2V14C1 14.5523 1.44772 15 2 15H12C12.5523 15 13 14.5523 13 14V5L9 1Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <div>
                          <p className="text-[#1a2642] text-[11px] font-bold">Patrol remark · PDF</p>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

              </div>

            </div>
          )}

        </div>
      </main>

    </div>
  );
}
