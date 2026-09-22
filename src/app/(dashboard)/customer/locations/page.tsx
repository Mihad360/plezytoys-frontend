"use client";

import { Bell, MapPin, ArrowRight, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function CustomerLocationsPage() {
  const [activeLocation, setActiveLocation] = useState<string | null>(null);

  return (
    <div className="flex flex-col h-full bg-[#f8f9fa] relative">
      <header className="h-[72px] bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0">
        <div>
          <p className="text-gray-400 text-[11px] font-medium tracking-wide uppercase mb-0.5">SHIFTPOINT • Customer</p>
          <h1 className="text-[#1a2642] text-[18px] font-bold leading-tight">Locations</h1>
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

          {activeLocation === null ? (
            // LIST VIEW
            <div className="animate-in fade-in duration-300">
              <div className="mb-6">
                <p className="text-[#f97316] text-[11px] font-bold tracking-[0.1em] uppercase mb-1">CUSTOMER PORTAL / LOCATIONS</p>
                <h2 className="text-[#1a2642] text-[28px] font-bold mb-1">Locations</h2>
                <p className="text-gray-500 text-[14px]">View operational coverage for your authorised service locations.</p>
              </div>

              <div className="bg-blue-50/50 border border-blue-100 rounded-lg p-4 flex gap-3 text-blue-700 text-[13px] mb-8">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
                <p>Customer read-only access - only locations assigned to ARC Security Ltd. are shown.</p>
              </div>

              <div className="grid grid-cols-4 gap-6">
                
                {/* Location Card 1 */}
                <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between min-h-[220px]">
                  <div>
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center text-[#f97316] shrink-0">
                        <MapPin size={20} />
                      </div>
                      <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-[11px] font-semibold rounded-full">Active</span>
                    </div>
                    <h4 className="text-[#1a2642] font-bold text-[15px] mb-1">Westfield Office</h4>
                    <p className="text-gray-400 text-[12px] mb-6">Amsterdam</p>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-end mb-4">
                      <div>
                        <p className="text-gray-400 text-[11px] mb-0.5">Service status</p>
                        <p className="text-[#1a2642] text-[13px] font-semibold">2 active patrols</p>
                      </div>
                      <p className="text-emerald-500 text-[10px] font-medium text-right">Live patrol currently on site</p>
                    </div>
                    <button onClick={() => setActiveLocation("Westfield Office")} className="w-full py-2.5 border border-gray-200 rounded-lg text-[13px] font-medium text-gray-600 hover:bg-gray-50 flex items-center justify-center gap-2 transition-colors">
                      View location <ArrowRight size={14} />
                    </button>
                  </div>
                </div>

                {/* Location Card 2 */}
                <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between min-h-[220px]">
                  <div>
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center text-[#f97316] shrink-0">
                        <MapPin size={20} />
                      </div>
                      <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-[11px] font-semibold rounded-full">Active</span>
                    </div>
                    <h4 className="text-[#1a2642] font-bold text-[15px] mb-1">North Campus</h4>
                    <p className="text-gray-400 text-[12px] mb-6">Utrecht</p>
                  </div>
                  
                  <div>
                    <div className="mb-4">
                      <p className="text-gray-400 text-[11px] mb-0.5">Service status</p>
                      <p className="text-[#1a2642] text-[13px] font-semibold">1 scheduled patrol</p>
                    </div>
                    <button onClick={() => setActiveLocation("North Campus")} className="w-full py-2.5 border border-gray-200 rounded-lg text-[13px] font-medium text-gray-600 hover:bg-gray-50 flex items-center justify-center gap-2 transition-colors">
                      View location <ArrowRight size={14} />
                    </button>
                  </div>
                </div>

                {/* Location Card 3 */}
                <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between min-h-[220px]">
                  <div>
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center text-[#f97316] shrink-0">
                        <MapPin size={20} />
                      </div>
                      <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-[11px] font-semibold rounded-full">Active</span>
                    </div>
                    <h4 className="text-[#1a2642] font-bold text-[15px] mb-1">Central Site</h4>
                    <p className="text-gray-400 text-[12px] mb-6">Rotterdam</p>
                  </div>
                  
                  <div>
                    <div className="mb-4">
                      <p className="text-gray-400 text-[11px] mb-0.5">Service status</p>
                      <p className="text-[#1a2642] text-[13px] font-semibold">Coverage confirmed</p>
                    </div>
                    <button className="w-full py-2.5 border border-gray-200 rounded-lg text-[13px] font-medium text-gray-600 hover:bg-gray-50 flex items-center justify-center gap-2 transition-colors">
                      View location <ArrowRight size={14} />
                    </button>
                  </div>
                </div>

                {/* Location Card 4 */}
                <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between min-h-[220px]">
                  <div>
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center text-[#f97316] shrink-0">
                        <MapPin size={20} />
                      </div>
                      <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-[11px] font-semibold rounded-full">Active</span>
                    </div>
                    <h4 className="text-[#1a2642] font-bold text-[15px] mb-1">Harbour House</h4>
                    <p className="text-gray-400 text-[12px] mb-6">Amsterdam</p>
                  </div>
                  
                  <div>
                    <div className="mb-4">
                      <p className="text-gray-400 text-[11px] mb-0.5">Service status</p>
                      <p className="text-[#1a2642] text-[13px] font-semibold">Next visit 14:30</p>
                    </div>
                    <button className="w-full py-2.5 border border-gray-200 rounded-lg text-[13px] font-medium text-gray-600 hover:bg-gray-50 flex items-center justify-center gap-2 transition-colors">
                      View location <ArrowRight size={14} />
                    </button>
                  </div>
                </div>

              </div>
            </div>
          ) : (
            // DETAILS VIEW
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              
              <button 
                onClick={() => setActiveLocation(null)}
                className="flex items-center gap-2 text-[#f97316] text-[13px] font-semibold hover:underline mb-4"
              >
                <ArrowLeft size={14} /> Back to Locations
              </button>

              <div className="mb-6">
                <h2 className="text-[#1a2642] text-[28px] font-bold mb-1">{activeLocation}</h2>
                <p className="text-gray-500 text-[14px]">Amsterdam · Authorised customer location</p>
              </div>

              <div className="bg-blue-50/50 border border-blue-100 rounded-lg p-4 flex gap-3 text-blue-700 text-[13px] mb-8">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
                <p>Read-only operational record - only evidence and activity assigned to this location is shown.</p>
              </div>

              <div className="grid grid-cols-3 gap-6">
                
                {/* Main Patrol Record */}
                <div className="col-span-2 space-y-6">
                  
                  <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
                    <div className="flex justify-between items-start mb-8">
                      <div>
                        <h3 className="text-[#1a2642] text-[16px] font-bold mb-1">Most recent patrol</h3>
                        <p className="text-gray-400 text-[12px]">Completed route · Westfield Office</p>
                      </div>
                      <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-[11px] font-semibold rounded-full">Completed</span>
                    </div>

                    <div className="flex gap-16 mb-8 border-b border-gray-100 pb-8">
                      <div>
                        <p className="text-gray-400 text-[11px] mb-1">Patrol date</p>
                        <p className="text-[#1a2642] text-[14px] font-semibold">11 Sep 2026</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-[11px] mb-1">Started</p>
                        <p className="text-[#1a2642] text-[14px] font-semibold">09:42</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-[11px] mb-1">Completed</p>
                        <p className="text-[#1a2642] text-[14px] font-semibold">10:18</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-[11px] mb-1">Duration</p>
                        <p className="text-[#1a2642] text-[14px] font-semibold">36 min</p>
                      </div>
                    </div>

                    <div className="relative mb-8 pb-4">
                      {/* Timeline UI mock */}
                      <div className="flex items-center justify-between relative z-10 text-[11px] text-gray-400">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-4 border-2 border-[#f97316] rounded-[4px] shrink-0"></div>
                          <span className="text-[#f97316]">Main entrance</span>
                        </div>
                        <span>Reception</span>
                        <span>Floor 3</span>
                        <span>Loading bay</span>
                      </div>
                      <div className="absolute left-[80px] right-[60px] top-2 h-px bg-gray-200"></div>
                    </div>

                    <button className="px-5 py-2 border border-gray-200 rounded-lg text-[13px] font-medium text-gray-600 hover:bg-gray-50 flex items-center justify-center gap-2">
                      View patrol details <ArrowRight size={14} />
                    </button>
                  </div>

                  {/* Checkpoint exceptions */}
                  <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                    <h3 className="text-[#1a2642] text-[16px] font-bold mb-1">Checkpoint exceptions</h3>
                    <p className="text-gray-400 text-[12px] mb-6">Items requiring visibility</p>

                    <div className="space-y-4">
                      <div className="flex gap-4 p-4 border-b border-gray-50">
                        <div className="w-6 h-6 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-[12px] shrink-0">!</div>
                        <div>
                          <p className="text-[#1a2642] text-[13px] font-semibold mb-0.5">Loading bay checkpoint missed</p>
                          <p className="text-gray-400 text-[12px]">09:42 · Access obstructed during service window</p>
                        </div>
                      </div>
                      <div className="flex gap-4 p-4">
                        <div className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-[12px] shrink-0">i</div>
                        <div>
                          <p className="text-[#1a2642] text-[13px] font-semibold mb-0.5">Reception observation recorded</p>
                          <p className="text-gray-400 text-[12px]">10:18 · Observation included in the completed patrol record</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Recent reports & issues */}
                  <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h3 className="text-[#1a2642] text-[16px] font-bold mb-1">Recent reports & issues</h3>
                        <p className="text-gray-400 text-[12px]">Records shared for Westfield Office</p>
                      </div>
                      <button className="text-[#f97316] text-[12px] font-semibold hover:underline flex items-center gap-1">
                        View all <ArrowRight size={12} />
                      </button>
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-4 border border-gray-100 rounded-lg hover:bg-gray-50">
                        <div className="flex gap-4">
                          <div className="w-8 h-8 rounded bg-orange-50 text-[#f97316] flex items-center justify-center shrink-0">
                            <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M9 1H2C1.44772 1 1 1.44772 1 2V14C1 14.5523 1.44772 15 2 15H12C12.5523 15 13 14.5523 13 14V5L9 1Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M9 1V5H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                          <div>
                            <p className="text-[#1a2642] text-[13px] font-semibold mb-0.5">Daily Service Report</p>
                            <p className="text-gray-400 text-[11px]">11 Sep 2026 · Approved</p>
                          </div>
                        </div>
                        <button className="text-[#f97316] text-[12px] font-semibold hover:underline flex items-center gap-1">
                          View report <ArrowRight size={12} />
                        </button>
                      </div>

                      <div className="flex justify-between items-center p-4 border border-gray-100 rounded-lg hover:bg-gray-50">
                        <div className="flex gap-4">
                          <div className="w-8 h-8 rounded bg-amber-50 text-amber-500 flex items-center justify-center shrink-0 font-bold">!</div>
                          <div>
                            <p className="text-[#1a2642] text-[13px] font-semibold mb-0.5">Reported issue: Visitor log binder</p>
                            <p className="text-gray-400 text-[11px]">11 Sep 2026 · Observation recorded</p>
                          </div>
                        </div>
                        <button className="text-[#f97316] text-[12px] font-semibold hover:underline flex items-center gap-1">
                          View issue <ArrowRight size={12} />
                        </button>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Right Side Info */}
                <div className="space-y-6">
                  
                  {/* Checkpoint Progress Card */}
                  <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-[#1a2642] text-[15px] font-bold">Checkpoint progress</h3>
                      <span className="text-[#1a2642] text-[18px] font-bold">7 / 8</span>
                    </div>
                    <p className="text-gray-400 text-[12px] mb-6">Most recent patrol route</p>

                    <div className="flex gap-1 h-2 mb-6">
                      <div className="h-full bg-[#f97316] rounded-full" style={{ width: '87.5%' }}></div>
                      <div className="h-full bg-gray-100 rounded-full" style={{ width: '12.5%' }}></div>
                    </div>

                    <div className="space-y-3 text-[12px]">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2 text-gray-500"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> Completed</div>
                        <span className="font-semibold text-gray-700">7</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2 text-gray-500"><div className="w-2 h-2 rounded-full bg-amber-500"></div> Missed</div>
                        <span className="font-semibold text-gray-700">1</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2 text-gray-500"><div className="w-2 h-2 rounded-full bg-purple-500"></div> Exceptions</div>
                        <span className="font-semibold text-gray-700">1</span>
                      </div>
                    </div>

                    <button className="w-full mt-6 text-[#f97316] text-[12px] font-semibold hover:underline flex items-center justify-center gap-1">
                      View checkpoint activity <ArrowRight size={12} />
                    </button>
                  </div>

                  {/* Evidence Available Card */}
                  <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                    <h3 className="text-[#1a2642] text-[15px] font-bold mb-1">Evidence available</h3>
                    <p className="text-gray-400 text-[12px] mb-4">Attached to Westfield Office service records</p>

                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <div className="aspect-[4/3] bg-gradient-to-tr from-slate-300 to-slate-200 rounded-md mb-2 overflow-hidden border border-gray-100 relative">
                           <div className="absolute inset-0 bg-[#2a3a5a]/20 transform -rotate-12 scale-150"></div>
                        </div>
                        <p className="text-[#1a2642] text-[10px] font-bold">Entrance photo</p>
                        <p className="text-gray-400 text-[9px]">09:42</p>
                      </div>
                      <div>
                        <div className="aspect-[4/3] bg-gradient-to-tr from-amber-700/20 to-amber-700/10 rounded-md mb-2 overflow-hidden border border-gray-100 relative">
                           <div className="absolute inset-0 bg-[#2a3a5a]/20 transform -rotate-12 scale-150"></div>
                        </div>
                        <p className="text-[#1a2642] text-[10px] font-bold">Route photo</p>
                        <p className="text-gray-400 text-[9px]">10:18</p>
                      </div>
                      <div>
                        <div className="aspect-[4/3] bg-orange-50 rounded-md mb-2 flex items-center justify-center border border-orange-100">
                          <svg width="18" height="20" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#f97316]">
                            <path d="M9 1H2C1.44772 1 1 1.44772 1 2V14C1 14.5523 1.44772 15 2 15H12C12.5523 15 13 14.5523 13 14V5L9 1Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <p className="text-[#1a2642] text-[10px] font-bold">Patrol note</p>
                        <p className="text-gray-400 text-[9px]">PDF - 142 KB</p>
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
