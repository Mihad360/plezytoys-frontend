"use client";

import { Bell, X } from "lucide-react";
import { useState } from "react";

export default function ManagerAnnouncementsPage() {
  const [activeModal, setActiveModal] = useState<"none" | "view-announcement">("none");

  return (
    <div className="flex flex-col h-full bg-[#f8f9fa] relative">
      <header className="h-[72px] bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0">
        <div>
          <p className="text-gray-400 text-[11px] font-medium tracking-wide uppercase mb-0.5">SHIFTPOINT • MANAGER</p>
          <h1 className="text-[#1a2642] text-[18px] font-bold leading-tight">Announcements</h1>
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
        <div className="max-w-[1200px] mx-auto space-y-6 mt-4">
          
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-500 text-[14px]">Share authorised operational updates with your team.</p>
            <button className="px-5 py-2.5 bg-[#b45f06] hover:bg-[#964f05] text-white rounded-lg text-[13px] font-medium transition-colors shadow-sm">
              + Create Announcement
            </button>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
            <h3 className="text-[#1a2642] font-bold text-[16px] mb-2">Shift handover reminder</h3>
            <p className="text-gray-500 text-[14px] mb-4">All teams must complete handover notes before 18:00 today.</p>
            <button onClick={() => setActiveModal("view-announcement")} className="px-4 py-2 border border-gray-200 bg-white rounded-lg text-[13px] font-medium text-gray-600 hover:bg-gray-50 shadow-sm">
              View details
            </button>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
            <h3 className="text-[#1a2642] font-bold text-[16px] mb-2">Weekly project update</h3>
            <p className="text-gray-500 text-[14px] mb-4">Join the meeting this Friday to discuss progress and challenges.</p>
            <button className="px-4 py-2 border border-gray-200 bg-white rounded-lg text-[13px] font-medium text-gray-600 hover:bg-gray-50 shadow-sm">
              View details
            </button>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
            <h3 className="text-[#1a2642] font-bold text-[16px] mb-2">Team morale activity</h3>
            <p className="text-gray-500 text-[14px] mb-4">Participate in the team-building exercise next Wednesday at 3 PM.</p>
            <button className="px-4 py-2 border border-gray-200 bg-white rounded-lg text-[13px] font-medium text-gray-600 hover:bg-gray-50 shadow-sm">
              View details
            </button>
          </div>

        </div>
      </main>

      {/* MODALS */}
      {activeModal === "view-announcement" && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-[#1a2642]/60 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-[600px] animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-6 pb-2 border-b-0">
              <h3 className="text-[#1a2642] text-[18px] font-bold">Announcement Details</h3>
              <button onClick={() => setActiveModal("none")} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>
            
            <div className="p-6 pt-4 space-y-4">
              <h4 className="text-[#1a2642] text-[16px] font-medium">Shift handover reminder</h4>
              
              <div className="bg-gray-50 border border-gray-100 rounded-lg p-5">
                <p className="text-gray-600 text-[14px] leading-relaxed">
                  Authorised operational information for this record is displayed here.
                </p>
              </div>
            </div>

            <div className="p-6 pt-2">
              <button onClick={() => setActiveModal("none")} className="px-6 py-2 border border-gray-200 rounded-lg text-[14px] font-medium text-gray-600 hover:bg-gray-50">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
