"use client";

import { Bell, ChevronDown, X } from "lucide-react";
import { useState } from "react";

export default function UnresolvedQuestionsPage() {
  const [activeModal, setActiveModal] = useState<"none" | "resolve" | "approved">("none");

  return (
    <div className="flex flex-col h-full bg-[#f8f9fa] relative">
      {/* Top Header */}
      <header className="h-[72px] bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0">
        <div>
          <p className="text-gray-400 text-[11px] font-medium tracking-wide uppercase mb-0.5">SHIFTPOINT • AI Knowledge • Unresolved</p>
          <h1 className="text-[#1a2642] text-[18px] font-bold leading-tight">Unresolved Questions</h1>
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
        <div className="max-w-[1200px] mx-auto">
          
          <div className="mb-6">
            <h2 className="text-[#1a2642] text-[24px] font-bold mb-1">Unresolved Questions</h2>
            <p className="text-gray-500 text-[14px]">Questions your AI assistant couldn't answer — review and resolve them.</p>
          </div>

          <div className="flex gap-4 mb-6">
            <div className="flex-1 relative">
              <input type="text" placeholder="Search documents..." className="w-full px-4 py-2.5 border border-gray-200 bg-white rounded-lg text-[14px] focus:outline-none focus:border-[#f97316]" />
            </div>
            <div className="relative w-[180px]">
              <select className="w-full appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-[14px] text-[#1a2642] focus:outline-none">
                <option>All customers</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            </div>
            <div className="relative w-[180px]">
              <select className="w-full appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-[14px] text-[#1a2642] focus:outline-none">
                <option>All locations</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            </div>
            <div className="relative w-[150px]">
              <select className="w-full appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-[14px] text-[#1a2642] focus:outline-none">
                <option>Status</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            </div>
            <div className="relative w-[180px]">
              <select className="w-full appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-[14px] text-[#1a2642] focus:outline-none">
                <option>Customer</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            </div>
            <div className="relative w-[150px]">
              <select className="w-full appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-[14px] text-[#1a2642] focus:outline-none">
                <option>Date</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            </div>
          </div>

          <div className="space-y-4">
            
            <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm flex justify-between items-center">
              <div>
                <p className="text-[#1a2642] font-semibold text-[15px] mb-2 flex items-center gap-2">
                  <span className="text-red-500 font-bold">?</span> "What should I do if an emergency exit is blocked?"
                </p>
                <p className="text-gray-400 text-[12px]">Asked by John Smith <span className="ml-4">Sep 3, 2026</span></p>
              </div>
              <div className="flex items-center gap-4">
                <span className="inline-flex px-3 py-1 bg-orange-50 text-orange-600 rounded-full text-[12px] font-medium">Needs Review</span>
                <button 
                  onClick={() => setActiveModal("resolve")}
                  className="px-5 py-2 bg-[#f97316] hover:bg-[#e06511] text-white rounded-lg text-[13px] font-medium transition-colors"
                >
                  Review
                </button>
              </div>
            </div>

            <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm flex justify-between items-center">
              <div>
                <p className="text-[#1a2642] font-semibold text-[15px] mb-2 flex items-center gap-2">
                  <span className="text-red-500 font-bold">?</span> "Who do I call if the NFC reader at main entrance doesn't work?"
                </p>
                <p className="text-gray-400 text-[12px]">Asked by Sarah Johnson <span className="ml-4">Sep 2, 2026</span></p>
              </div>
              <div className="flex items-center gap-4">
                <span className="inline-flex px-3 py-1 bg-orange-50 text-orange-600 rounded-full text-[12px] font-medium">Needs Review</span>
                <button 
                  onClick={() => setActiveModal("resolve")}
                  className="px-5 py-2 bg-[#f97316] hover:bg-[#e06511] text-white rounded-lg text-[13px] font-medium transition-colors"
                >
                  Review
                </button>
              </div>
            </div>

            <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm flex justify-between items-center opacity-80">
              <div>
                <p className="text-[#1a2642] font-semibold text-[15px] mb-2 flex items-center gap-2">
                  <span className="text-red-500 font-bold">?</span> "What is the procedure for reporting a lost keycard?"
                </p>
                <p className="text-gray-400 text-[12px]">Asked by Tom Wilson <span className="ml-4">Sep 1, 2026</span></p>
              </div>
              <div className="flex items-center gap-4">
                <span className="inline-flex px-3 py-1 bg-green-50 text-green-600 rounded-full text-[12px] font-medium">Resolved</span>
                <button 
                  onClick={() => setActiveModal("approved")}
                  className="px-5 py-2 bg-[#f97316] hover:bg-[#e06511] text-white rounded-lg text-[13px] font-medium transition-colors"
                >
                  View
                </button>
              </div>
            </div>

          </div>

        </div>
      </main>

      {/* MODALS */}
      {activeModal !== "none" && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-[#1a2642]/60 overflow-y-auto">
          
          {/* Resolve Question Modal */}
          {activeModal === "resolve" && (
            <div className="bg-white rounded-xl shadow-xl w-full max-w-[600px] animate-in fade-in zoom-in-95 duration-200">
              <div className="flex justify-between items-center p-6 border-b border-gray-100">
                <h3 className="text-[#1a2642] text-[20px] font-bold">Resolve Question</h3>
                <button onClick={() => setActiveModal("none")} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
              </div>
              
              <div className="p-8 space-y-6">
                
                <div className="bg-gray-50 rounded-lg p-5">
                  <p className="text-[#1a2642] font-bold text-[15px] mb-1 flex items-center gap-2">
                    <span className="text-red-500">?</span> What should I do if an emergency exit is blocked?
                  </p>
                  <p className="text-gray-500 text-[13px] ml-4">Asked by John Smith</p>
                </div>

                <div>
                  <label className="block text-[#1a2642] text-[13px] font-medium mb-2">Add answer</label>
                  <textarea 
                    rows={4} 
                    placeholder="When an emergency exit is blocked, immediately report to your manager and call emergency services if necessary..." 
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:border-[#f97316] resize-none"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-[#1a2642] text-[13px] font-medium mb-2">Link to knowledge source</label>
                  <div className="relative">
                    <select className="w-full appearance-none bg-white border border-gray-200 rounded-lg px-4 py-3 text-[14px] text-gray-500 focus:outline-none">
                      <option>Select source (optional)</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  </div>
                </div>

              </div>

              <div className="p-6 border-t border-gray-100 flex justify-end gap-3 bg-white rounded-b-xl">
                <button onClick={() => setActiveModal("none")} className="px-6 py-2.5 border border-gray-200 rounded-lg text-[14px] font-medium text-gray-600 hover:bg-gray-50">
                  Cancel
                </button>
                <button className="px-6 py-2.5 bg-[#f97316] hover:bg-[#e06511] text-white rounded-lg text-[14px] font-medium transition-colors">
                  Resolve Question
                </button>
              </div>
            </div>
          )}

          {/* Approved/Resolved Question Modal */}
          {activeModal === "approved" && (
            <div className="bg-white rounded-xl shadow-xl w-full max-w-[600px] animate-in fade-in zoom-in-95 duration-200">
              <div className="flex justify-between items-center p-6 border-b border-gray-100">
                <h3 className="text-[#1a2642] text-[20px] font-bold">Approved Question</h3>
                <button onClick={() => setActiveModal("none")} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
              </div>
              
              <div className="p-8 space-y-6">
                
                <div className="bg-gray-50 rounded-lg p-5">
                  <p className="text-[#1a2642] font-bold text-[15px] mb-1 flex items-center gap-2">
                    <span className="text-red-500">?</span> What should I do if an emergency exit is blocked?
                  </p>
                  <p className="text-gray-500 text-[13px] ml-4">Asked by John Smith</p>
                </div>

                <div>
                  <label className="block text-[#1a2642] text-[13px] font-medium mb-2">Answer</label>
                  <div className="w-full px-4 py-4 border border-gray-200 rounded-lg text-[14px] text-gray-500">
                    When an emergency exit is blocked, immediately report to your manager and call emergency services if necessary...
                  </div>
                </div>

              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
}
