"use client";

import { Bell } from "lucide-react";

export default function ManagerSecurityPage() {

  return (
    <div className="flex flex-col h-full bg-[#f8f9fa] relative">
      <header className="h-[72px] bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0">
        <div>
          <p className="text-gray-400 text-[11px] font-medium tracking-wide uppercase mb-0.5">SHIFTPOINT • MANAGER</p>
          <h1 className="text-[#1a2642] text-[18px] font-bold leading-tight">Security Settings</h1>
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
        <div className="max-w-[1000px] mx-auto space-y-4 mt-8">
          
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
            <h3 className="text-[#1a2642] text-[20px] font-bold mb-2">Security Settings</h3>
            <p className="text-gray-500 text-[14px] mb-8">Manage your password and authenticated sessions.</p>

            <div className="flex gap-4">
              <button className="px-6 py-2.5 bg-[#f97316] hover:bg-[#e06511] text-white rounded-lg text-[14px] font-medium transition-colors shadow-sm">
                Reset Password
              </button>
              <button className="px-6 py-2.5 border border-gray-200 bg-white rounded-lg text-[14px] font-medium text-[#1a2642] hover:bg-gray-50 shadow-sm">
                Sign out other sessions
              </button>
            </div>
          </div>

        </div>
      </main>

    </div>
  );
}
