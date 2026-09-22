"use client";

import { Bell, X, ChevronDown } from "lucide-react";
import { useState } from "react";

export default function ManagerProfilePage() {
  const [activeModal, setActiveModal] = useState<"none" | "edit-profile">("none");

  return (
    <div className="flex flex-col h-full bg-[#f8f9fa] relative">
      <header className="h-[72px] bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0">
        <div>
          <p className="text-gray-400 text-[11px] font-medium tracking-wide uppercase mb-0.5">SHIFTPOINT • MANAGER</p>
          <h1 className="text-[#1a2642] text-[18px] font-bold leading-tight">Manager Profile</h1>
        </div>
        <div className="flex items-center gap-4">
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
        <div className="max-w-[1000px] mx-auto space-y-4">
          
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden relative mt-8">
            
            {/* Header Banner */}
            <div className="bg-[#233355] h-[160px] p-8 relative overflow-hidden flex justify-between items-start">
              <div className="absolute right-0 top-0 w-96 h-96 bg-[#2a3a5a] rounded-full mix-blend-multiply filter blur-3xl opacity-50 -translate-y-1/3 translate-x-1/3"></div>
              
              <div className="relative z-10">
                <p className="text-[#8e9bb3] text-[10px] font-bold tracking-[0.15em] uppercase mb-1">MANAGER PROFILE</p>
                <h2 className="text-white text-[28px] font-bold mb-1">David Brown</h2>
                <p className="text-[#8e9bb3] text-[14px]">Operations Manager · ABC Security Ltd.</p>
              </div>

              <button onClick={() => setActiveModal("edit-profile")} className="relative z-10 px-5 py-2 border border-white/20 bg-white/10 hover:bg-white/20 text-white rounded-lg text-[13px] font-medium transition-colors">
                Edit profile
              </button>
            </div>

            {/* Profile Avatar */}
            <div className="absolute top-[160px] left-8 -translate-y-1/2">
              <div className="w-24 h-24 rounded-2xl bg-[#f97316] border-4 border-white shadow-md flex items-center justify-center text-white font-bold text-[32px]">
                DB
              </div>
            </div>

            <div className="p-8 pt-16 grid grid-cols-2 gap-x-12 gap-y-8">
              
              <div className="border-b border-gray-100 pb-6">
                <p className="text-gray-400 text-[10px] font-bold tracking-wide uppercase mb-2">WORK EMAIL</p>
                <p className="text-[#1a2642] font-semibold text-[14px]">david@abcsecurity.io</p>
              </div>
              <div className="border-b border-gray-100 pb-6">
                <p className="text-gray-400 text-[10px] font-bold tracking-wide uppercase mb-2">PHONE</p>
                <p className="text-[#1a2642] font-semibold text-[14px]">+31 20 1234567</p>
              </div>
              <div className="border-b border-gray-100 pb-6">
                <p className="text-gray-400 text-[10px] font-bold tracking-wide uppercase mb-2">PRIMARY LOCATION</p>
                <p className="text-[#1a2642] font-semibold text-[14px]">Location A</p>
              </div>
              <div className="border-b border-gray-100 pb-6">
                <p className="text-gray-400 text-[10px] font-bold tracking-wide uppercase mb-2">ACCESS SCOPE</p>
                <p className="text-[#1a2642] font-semibold text-[14px]">2 locations · 24 employees</p>
              </div>

              <div className="col-span-2 flex gap-3 pt-2">
                <span className="px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-[12px] font-medium">Account active</span>
                <span className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-[12px] font-medium">2FA enabled</span>
              </div>

            </div>

          </div>

        </div>
      </main>

      {/* MODALS */}
      {activeModal === "edit-profile" && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-[#1a2642]/60 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-[600px] animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h3 className="text-[#1a2642] text-[20px] font-bold">Edit profile</h3>
              <button onClick={() => setActiveModal("none")} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>
            
            <div className="p-8 space-y-6">
              
              <div className="flex items-center gap-4 mb-2">
                <div className="w-12 h-12 rounded-xl bg-[#f97316] flex items-center justify-center text-white font-bold text-[18px] shrink-0">
                  DB
                </div>
                <div>
                  <h4 className="text-[#1a2642] font-bold text-[14px]">Profile information</h4>
                  <p className="text-gray-500 text-[13px]">Your changes apply to this Manager workspace.</p>
                </div>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-[#1a2642] text-[13px] font-medium mb-2">Full name</label>
                  <input 
                    type="text" 
                    defaultValue="David Brown"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:border-[#f97316]"
                  />
                </div>

                <div>
                  <label className="block text-[#1a2642] text-[13px] font-medium mb-2">Work email</label>
                  <input 
                    type="email" 
                    defaultValue="david@abcsecurity.io"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:border-[#f97316]"
                  />
                </div>

                <div>
                  <label className="block text-[#1a2642] text-[13px] font-medium mb-2">Primary location</label>
                  <div className="relative">
                    <select className="w-full appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-[14px] text-[#1a2642] focus:outline-none">
                      <option>Location A</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  </div>
                </div>
              </div>

            </div>

            <div className="p-6 border-t border-gray-100 flex justify-end gap-3">
              <button onClick={() => setActiveModal("none")} className="px-6 py-2.5 border border-gray-200 bg-white rounded-lg text-[14px] font-medium text-gray-600 hover:bg-gray-50 shadow-sm">
                Cancel
              </button>
              <button className="px-6 py-2.5 bg-[#f97316] hover:bg-[#e06511] text-white rounded-lg text-[14px] font-medium transition-colors shadow-sm">
                Save changes
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
