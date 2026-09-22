"use client";

import { Bell, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CustomerNotificationsPage() {
  return (
    <div className="flex flex-col h-full bg-[#f8f9fa]">
      <header className="h-[72px] bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0">
        <div>
          <p className="text-gray-400 text-[11px] font-medium tracking-wide uppercase mb-0.5">SHIFTPOINT • Customer</p>
          <h1 className="text-[#1a2642] text-[18px] font-bold leading-tight">Notifications</h1>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/customer/notifications" className="relative">
            <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 bg-gray-50 transition-colors">
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
            <h2 className="text-[#1a2642] text-[28px] font-bold mb-1">Notifications</h2>
            <p className="text-gray-500 text-[14px]">Keep up to date with activity and shared customer updates.</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-2">
            
            <Link href="/customer/reports" className="block p-6 border-b border-gray-50 hover:bg-gray-50 transition-colors group">
              <div className="flex justify-between items-start">
                <div className="flex gap-4">
                  <div className="w-2 h-2 rounded-full bg-[#f97316] mt-2 shrink-0"></div>
                  <div>
                    <h3 className="text-[#1a2642] text-[15px] font-bold mb-1 group-hover:text-[#f97316] transition-colors">New report available</h3>
                    <p className="text-gray-500 text-[13px] mb-3">Daily Service Report · Westfield Office</p>
                    <p className="text-gray-400 text-[11px]">Today, 09:14</p>
                  </div>
                </div>
                <span className="text-[#f97316] text-[12px] font-semibold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  View report <ArrowRight size={12} />
                </span>
              </div>
            </Link>

            <Link href="/customer/announcements" className="block p-6 border-b border-gray-50 hover:bg-gray-50 transition-colors group">
              <div className="flex justify-between items-start">
                <div className="flex gap-4">
                  <div className="w-2 h-2 rounded-full bg-[#f97316] mt-2 shrink-0"></div>
                  <div>
                    <h3 className="text-[#1a2642] text-[15px] font-bold mb-1 group-hover:text-[#f97316] transition-colors">New announcement published</h3>
                    <p className="text-gray-500 text-[13px] mb-3">Scheduled maintenance notice</p>
                    <p className="text-gray-400 text-[11px]">Yesterday, 15:30</p>
                  </div>
                </div>
                <span className="text-[#f97316] text-[12px] font-semibold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  View <ArrowRight size={12} />
                </span>
              </div>
            </Link>

            <Link href="/customer/reports" className="block p-6 hover:bg-gray-50 transition-colors group rounded-b-xl">
              <div className="flex justify-between items-start">
                <div className="flex gap-4">
                  <div className="w-2 h-2 rounded-full bg-gray-300 mt-2 shrink-0"></div>
                  <div>
                    <h3 className="text-[#1a2642] text-[15px] font-bold mb-1 group-hover:text-[#f97316] transition-colors">Patrol report available</h3>
                    <p className="text-gray-500 text-[13px] mb-3">Central Site patrol completed</p>
                    <p className="text-gray-400 text-[11px]">08 Sep 2026</p>
                  </div>
                </div>
                <span className="text-[#f97316] text-[12px] font-semibold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  View <ArrowRight size={12} />
                </span>
              </div>
            </Link>

          </div>

        </div>
      </main>

    </div>
  );
}
