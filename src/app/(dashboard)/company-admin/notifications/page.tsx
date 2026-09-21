"use client";

import { Bell } from "lucide-react";
import { useState } from "react";

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState("All");

  return (
    <div className="flex flex-col h-full bg-[#f8f9fa]">
      {/* Top Header */}
      <header className="h-[72px] bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0">
        <div>
          <p className="text-gray-400 text-[11px] font-medium tracking-wide uppercase mb-0.5">SHIFTPOINT • Communication • Notifications</p>
          <h1 className="text-[#1a2642] text-[18px] font-bold leading-tight">Notifications</h1>
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
          
          <div className="mb-8">
            <h2 className="text-[#1a2642] text-[24px] font-bold mb-1">Notifications</h2>
            <p className="text-gray-500 text-[14px]">Stay updated on operational alerts and system events.</p>
          </div>

          <div className="flex gap-2 mb-6">
            {["All", "Attendance", "Patrol", "Task", "Report", "Document", "System"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 text-[13px] font-medium rounded-full border transition-colors ${
                  activeTab === tab
                    ? "bg-[#1a2642] text-white border-[#1a2642]"
                    : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            
            <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow transition-shadow cursor-pointer">
              <div className="flex justify-between items-start mb-1">
                <h4 className="text-[#1a2642] font-semibold text-[15px]">Expired Certificate</h4>
                <span className="text-gray-400 text-[12px]">Just now</span>
              </div>
              <p className="text-gray-500 text-[14px]">John Smith's security certificate expired today.</p>
            </div>

            <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow transition-shadow cursor-pointer">
              <div className="flex justify-between items-start mb-1">
                <h4 className="text-[#1a2642] font-semibold text-[15px]">Patrol Missed</h4>
                <span className="text-gray-400 text-[12px]">23 min ago</span>
              </div>
              <p className="text-gray-500 text-[14px]">Night Patrol at ABC HQ was not completed.</p>
            </div>

            <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow transition-shadow cursor-pointer">
              <div className="flex justify-between items-start mb-1">
                <h4 className="text-[#1a2642] font-semibold text-[15px]">Task Overdue</h4>
                <span className="text-gray-400 text-[12px]">1h ago</span>
              </div>
              <p className="text-gray-500 text-[14px]">Access control audit at Tech Park is 2 days overdue.</p>
            </div>

            <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow transition-shadow cursor-pointer">
              <div className="flex justify-between items-start mb-1">
                <h4 className="text-[#1a2642] font-semibold text-[15px]">Missing Clock-out</h4>
                <span className="text-gray-400 text-[12px]">2h ago</span>
              </div>
              <p className="text-gray-500 text-[14px]">Tom Wilson has not clocked out for 4+ hours.</p>
            </div>

            <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow transition-shadow cursor-pointer">
              <div className="flex justify-between items-start mb-1">
                <h4 className="text-[#1a2642] font-semibold text-[15px]">Report Submitted</h4>
                <span className="text-gray-400 text-[12px]">3h ago</span>
              </div>
              <p className="text-gray-500 text-[14px]">Sarah Johnson submitted Daily Operations Report.</p>
            </div>

            <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow transition-shadow cursor-pointer">
              <div className="flex justify-between items-start mb-1">
                <h4 className="text-[#1a2642] font-semibold text-[15px]">Certificate Expiring Soon</h4>
                <span className="text-gray-400 text-[12px]">5h ago</span>
              </div>
              <p className="text-gray-500 text-[14px]">Tom Wilson's BHV certificate expires in 27 days.</p>
            </div>

            <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow transition-shadow cursor-pointer">
              <div className="flex justify-between items-start mb-1">
                <h4 className="text-[#1a2642] font-semibold text-[15px]">System Update</h4>
                <span className="text-gray-400 text-[12px]">Yesterday</span>
              </div>
              <p className="text-gray-500 text-[14px]">ShiftPoint has been updated to version 3.2.1.</p>
            </div>

          </div>

        </div>
      </main>
    </div>
  );
}
