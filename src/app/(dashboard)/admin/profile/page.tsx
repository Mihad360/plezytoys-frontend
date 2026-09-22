"use client";

import { useState } from "react";
import { LogOut, CheckCircle2, ShieldCheck, X } from "lucide-react";

export default function SuperAdminProfilePage() {
  const [activeModal, setActiveModal] = useState<"none" | "sign-out">("none");

  return (
    <div className="flex flex-col h-full bg-[#f8f9fa] relative">
      <header className="h-[72px] bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0">
        <div>
          <p className="text-gray-400 text-[11px] font-medium tracking-wide uppercase mb-0.5">SHIFTPOINT • Super Admin</p>
          <h1 className="text-[#1a2642] text-[18px] font-bold leading-tight">My Profile</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-50 transition-colors">
            <ShieldCheck size={20} />
          </div>
          <div className="w-10 h-10 rounded-full bg-[#b45f06] flex items-center justify-center text-white font-bold text-sm">
            SA
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-auto p-8">
        <div className="max-w-[1000px] mx-auto space-y-8 mt-8">
          
          <div className="flex justify-between items-end">
            <div>
              <h2 className="text-[#1a2642] text-[28px] font-bold mb-1">My profile</h2>
              <p className="text-gray-500 text-[14px]">Personal account, authentication and session security</p>
            </div>
            <button className="px-5 py-2 bg-[#b45f06] hover:bg-[#964f05] text-white rounded-lg text-[14px] font-medium transition-colors shadow-sm">
              Save changes
            </button>
          </div>

          <div className="grid grid-cols-2 gap-6">
            
            {/* Account Information */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-6">
              <h3 className="text-[#1a2642] text-[16px] font-bold border-b border-gray-100 pb-4">Account information</h3>
              
              <div>
                <label className="block text-gray-500 text-[12px] font-medium mb-2">Full name</label>
                <input 
                  type="text" 
                  defaultValue="Super Admin"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-[14px] text-gray-700 focus:outline-none focus:border-[#f97316]"
                />
              </div>

              <div>
                <label className="block text-gray-500 text-[12px] font-medium mb-2">Email address</label>
                <input 
                  type="email" 
                  defaultValue="admin@shiftpoint.io"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-[14px] text-gray-700 focus:outline-none focus:border-[#f97316]"
                />
              </div>
            </div>

            {/* Security */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-6">
              <h3 className="text-[#1a2642] text-[16px] font-bold border-b border-gray-100 pb-4">Security</h3>
              
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-[#1a2642] text-[14px] font-medium">Two-factor authentication</p>
                  <p className="text-gray-500 text-[12px] mt-0.5">Authenticator application connected</p>
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-[12px] font-medium border border-emerald-100">
                  Healthy
                </span>
              </div>

              <div className="flex gap-4 pt-2">
                <button className="px-5 py-2 border border-gray-200 bg-gray-50 rounded-lg text-[13px] font-medium text-gray-600 hover:bg-gray-100 shadow-sm">
                  Change password
                </button>
                <button className="text-[#f97316] text-[13px] font-medium hover:underline">
                  View active sessions →
                </button>
              </div>
            </div>

          </div>

        </div>
      </main>

      {/* Persistent Active Sessions Toast (bottom right) */}
      <div className="absolute bottom-8 right-8 z-40 flex items-center justify-between gap-4 px-5 py-3 bg-[#1a2642] text-white rounded-lg shadow-xl min-w-[280px]">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#f97316]"></div>
          <span className="text-[13px] font-medium tracking-wide">Active sessions loaded.</span>
        </div>
        <button className="text-gray-400 hover:text-white transition-colors">
          <X size={16} />
        </button>
      </div>

      {/* Floating Sign Out Button (for triggering modal in dev, normally in sidebar) */}
      <button 
        onClick={() => setActiveModal("sign-out")}
        className="absolute bottom-8 left-8 z-40 flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 rounded-lg shadow-lg text-[14px] font-medium"
      >
        <LogOut size={16} /> Trigger Sign Out
      </button>

      {/* MODALS */}
      {activeModal === "sign-out" && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-[#1a2642]/60 overflow-y-auto backdrop-blur-[1px]">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-[450px] animate-in fade-in zoom-in-95 duration-200 my-8">
            <div className="flex justify-between items-start p-6 pb-2 border-b-0">
              <p className="text-[#f97316] text-[10px] font-bold tracking-[0.1em] uppercase mb-1">SECURE SESSION</p>
              <button onClick={() => setActiveModal("none")} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>
            
            <div className="px-6 pb-6 pt-0 space-y-4">
              <h3 className="text-[#1a2642] text-[24px] font-bold leading-tight">Sign out of ShiftPoint?</h3>
              <p className="text-gray-500 text-[14px] leading-relaxed">
                Your current super-admin session will end securely on this device.
              </p>
            </div>

            <div className="p-6 pt-4 flex justify-end gap-3">
              <button onClick={() => setActiveModal("none")} className="px-6 py-2.5 border border-gray-200 bg-white rounded-lg text-[14px] font-medium text-gray-600 hover:bg-gray-50 shadow-sm">
                Cancel
              </button>
              <button onClick={() => window.location.href = '/login'} className="px-6 py-2.5 bg-[#f97316] hover:bg-[#e06511] text-white rounded-lg text-[14px] font-medium transition-colors shadow-sm">
                Sign out
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
