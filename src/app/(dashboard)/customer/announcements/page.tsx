"use client";

import { Bell, ArrowRight, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function CustomerAnnouncementsPage() {
  const [activeModal, setActiveModal] = useState<"none" | "view-announcement">("none");

  return (
    <div className="flex flex-col h-full bg-[#f8f9fa] relative">
      <header className="h-[72px] bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0">
        <div>
          <p className="text-gray-400 text-[11px] font-medium tracking-wide uppercase mb-0.5">SHIFTPOINT • Customer</p>
          <h1 className="text-[#1a2642] text-[18px] font-bold leading-tight">Announcements</h1>
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

          <div className="mb-6">
            <h2 className="text-[#1a2642] text-[28px] font-bold mb-1">Announcements</h2>
            <p className="text-gray-500 text-[14px]">Service notices and operational updates shared with your organisation.</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-2">
            
            <div 
              onClick={() => setActiveModal("view-announcement")}
              className="p-6 border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer group flex justify-between items-start"
            >
              <div className="flex gap-4">
                <span className="px-2.5 py-1 bg-amber-50 text-amber-700 text-[10px] font-bold rounded-full h-fit shrink-0">Important</span>
                <div>
                  <h3 className="text-[#1a2642] text-[15px] font-bold mb-1 group-hover:text-[#f97316] transition-colors">Scheduled maintenance notice</h3>
                  <p className="text-gray-500 text-[13px] mb-3">Portal maintenance is planned for 14 September between 22:00 and 23:00. Reports remain available after service is restored.</p>
                  <p className="text-gray-400 text-[11px]">10 Sep 2026</p>
                </div>
              </div>
              <span className="text-[#f97316] text-[12px] font-semibold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Details <ArrowRight size={12} />
              </span>
            </div>

            <div className="p-6 border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer group flex justify-between items-start">
              <div className="flex gap-4">
                <span className="px-2.5 py-1 bg-orange-50 text-[#f97316] text-[10px] font-bold rounded-full h-fit shrink-0">Update</span>
                <div>
                  <h3 className="text-[#1a2642] text-[15px] font-bold mb-1 group-hover:text-[#f97316] transition-colors">Service update</h3>
                  <p className="text-gray-500 text-[13px] mb-3">A refreshed patrol-report format is now available. Your existing report history is unchanged.</p>
                  <p className="text-gray-400 text-[11px]">08 Sep 2026</p>
                </div>
              </div>
              <span className="text-[#f97316] text-[12px] font-semibold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Details <ArrowRight size={12} />
              </span>
            </div>

            <div className="p-6 hover:bg-gray-50 transition-colors cursor-pointer group flex justify-between items-start rounded-b-xl">
              <div className="flex gap-4">
                <span className="px-2.5 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold rounded-full h-fit shrink-0">Welcome</span>
                <div>
                  <h3 className="text-[#1a2642] text-[15px] font-bold mb-1 group-hover:text-[#f97316] transition-colors">Welcome to the customer portal</h3>
                  <p className="text-gray-500 text-[13px] mb-3">You can now review authorised locations, patrols and reports from one secure place.</p>
                  <p className="text-gray-400 text-[11px]">01 Sep 2026</p>
                </div>
              </div>
              <span className="text-[#f97316] text-[12px] font-semibold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Details <ArrowRight size={12} />
              </span>
            </div>

          </div>

        </div>
      </main>

      {/* MODALS */}
      {activeModal === "view-announcement" && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-[#1a2642]/60 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-[700px] animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-start p-8 pb-4 border-b-0">
              <div>
                <p className="text-[#f97316] text-[11px] font-bold tracking-[0.1em] uppercase mb-2">ANN-104</p>
                <h3 className="text-[#1a2642] text-[24px] font-bold">Updated Safety Procedure</h3>
              </div>
              <button onClick={() => setActiveModal("none")} className="text-gray-400 hover:text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-full p-2 transition-colors">
                <X size={16} />
              </button>
            </div>
            
            <div className="px-8 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-5 border border-gray-100">
                  <p className="text-gray-400 text-[10px] font-bold tracking-wide uppercase mb-1">STATUS</p>
                  <p className="text-[#1a2642] text-[14px]">Published</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-5 border border-gray-100">
                  <p className="text-gray-400 text-[10px] font-bold tracking-wide uppercase mb-1">AUDIENCE</p>
                  <p className="text-[#1a2642] text-[14px]">All employees</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-5 border border-gray-100">
                  <p className="text-gray-400 text-[10px] font-bold tracking-wide uppercase mb-1">PUBLISHED / SAVED</p>
                  <p className="text-[#1a2642] text-[14px]">10 Sep 2026 · 08:00 CEST</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-5 border border-gray-100">
                  <p className="text-gray-400 text-[10px] font-bold tracking-wide uppercase mb-1">DELIVERY</p>
                  <p className="text-[#1a2642] text-[14px]">48 authorised recipients</p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-5 border border-gray-100">
                <p className="text-gray-400 text-[10px] font-bold tracking-wide uppercase mb-2">MESSAGE</p>
                <p className="text-[#1a2642] text-[14px] leading-relaxed">
                  Please review the updated emergency response procedure before your next shift.
                </p>
              </div>

              <div className="pt-2">
                <p className="text-[#1a2642] text-[14px] font-medium mb-1">Read activity</p>
                <p className="text-gray-500 text-[13px] leading-relaxed">
                  Read by 38 of 48 authorised recipients. Recipient visibility is limited to the selected company scope.
                </p>
              </div>
            </div>

            <div className="p-8 pt-6 flex justify-end">
              <button onClick={() => setActiveModal("none")} className="px-6 py-2.5 bg-[#f97316] hover:bg-[#e06511] text-white rounded-lg text-[14px] font-medium transition-colors shadow-sm">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
