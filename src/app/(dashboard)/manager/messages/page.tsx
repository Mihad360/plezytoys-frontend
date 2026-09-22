"use client";

import { Bell, Search, Paperclip } from "lucide-react";
import { useState } from "react";

export default function ManagerMessagesPage() {
  const [activeTab, setActiveTab] = useState<"all" | "individual" | "groups">("all");

  return (
    <div className="flex flex-col h-full bg-[#f8f9fa] relative">
      <header className="h-[72px] bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0">
        <div>
          <p className="text-gray-400 text-[11px] font-medium tracking-wide uppercase mb-0.5">SHIFTPOINT • Communication • Chat</p>
          <h1 className="text-[#1a2642] text-[18px] font-bold leading-tight">Chat</h1>
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

      <main className="flex-1 flex overflow-hidden">
        
        {/* Left Sidebar (Conversations) */}
        <div className="w-[320px] bg-white border-r border-gray-100 flex flex-col shrink-0">
          <div className="p-4 border-b border-gray-100">
            <h2 className="text-[#1a2642] text-[18px] font-bold mb-4">Messages</h2>
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input 
                type="text" 
                placeholder="Search conversations..." 
                className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-[13px] focus:outline-none focus:border-[#f97316]"
              />
            </div>
            
            <div className="flex bg-gray-50 p-1 rounded-lg">
              <button 
                onClick={() => setActiveTab("all")}
                className={`flex-1 py-1.5 text-[12px] font-medium rounded-md transition-colors ${activeTab === 'all' ? 'bg-[#1a2642] text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                All
              </button>
              <button 
                onClick={() => setActiveTab("individual")}
                className={`flex-1 py-1.5 text-[12px] font-medium rounded-md transition-colors ${activeTab === 'individual' ? 'bg-[#1a2642] text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                Individual
              </button>
              <button 
                onClick={() => setActiveTab("groups")}
                className={`flex-1 py-1.5 text-[12px] font-medium rounded-md transition-colors ${activeTab === 'groups' ? 'bg-[#1a2642] text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                Groups
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-auto">
            {/* Active Chat Item */}
            <div className="p-4 border-l-2 border-[#f97316] bg-orange-50/50 cursor-pointer flex gap-3 relative">
              <div className="w-10 h-10 rounded-full bg-[#1a2642] flex items-center justify-center text-white font-bold text-[12px] shrink-0 relative">
                DB
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full"></div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="text-[#1a2642] text-[14px] font-bold truncate">David Brown</h4>
                  <span className="text-gray-500 text-[10px] shrink-0">10:32 PM</span>
                </div>
                <p className="text-gray-400 text-[11px] mb-1">Manager</p>
                <p className="text-gray-600 text-[13px] truncate pr-6">Can you confirm the night patrol status?</p>
              </div>
              <div className="absolute right-4 bottom-4 w-5 h-5 bg-[#f97316] rounded-full flex items-center justify-center text-white text-[10px] font-bold">
                2
              </div>
            </div>

            {/* Other Chat Items */}
            <div className="p-4 border-b border-gray-50 hover:bg-gray-50 cursor-pointer flex gap-3">
              <div className="w-10 h-10 rounded-full bg-[#233355] flex items-center justify-center text-white font-bold text-[12px] shrink-0 relative">
                EC
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full"></div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="text-[#1a2642] text-[14px] font-bold truncate">Emily Chen</h4>
                  <span className="text-gray-500 text-[10px] shrink-0">08:15 AM</span>
                </div>
                <p className="text-gray-400 text-[11px] mb-1">Manager</p>
                <p className="text-gray-600 text-[13px] truncate">Report submitted.</p>
              </div>
            </div>

            <div className="p-4 border-b border-gray-50 hover:bg-gray-50 cursor-pointer flex gap-3 relative">
              <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold text-[12px] shrink-0">
                G
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="text-[#1a2642] text-[14px] font-bold truncate">Team ABC HQ</h4>
                  <span className="text-gray-500 text-[10px] shrink-0">Yesterday</span>
                </div>
                <p className="text-gray-400 text-[11px] mb-1">Group</p>
                <p className="text-gray-600 text-[13px] truncate pr-6">John: I'm on site.</p>
              </div>
              <div className="absolute right-4 bottom-4 w-5 h-5 bg-[#f97316] rounded-full flex items-center justify-center text-white text-[10px] font-bold">
                5
              </div>
            </div>

            <div className="p-4 border-b border-gray-50 hover:bg-gray-50 cursor-pointer flex gap-3">
              <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold text-[12px] shrink-0">
                G
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="text-[#1a2642] text-[14px] font-bold truncate">Night Patrol Team</h4>
                  <span className="text-gray-500 text-[10px] shrink-0">Yesterday</span>
                </div>
                <p className="text-gray-400 text-[11px] mb-1">Group</p>
                <p className="text-gray-600 text-[13px] truncate">Sarah: Route completed.</p>
              </div>
            </div>

            <div className="p-4 border-b border-gray-50 hover:bg-gray-50 cursor-pointer flex gap-3">
              <div className="w-10 h-10 rounded-full bg-[#1a2642] flex items-center justify-center text-white font-bold text-[12px] shrink-0">
                TW
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="text-[#1a2642] text-[14px] font-bold truncate">Tom Wilson</h4>
                  <span className="text-gray-500 text-[10px] shrink-0">2d ago</span>
                </div>
                <p className="text-gray-400 text-[11px] mb-1">Employee</p>
                <p className="text-gray-600 text-[13px] truncate">Clock out confirmed.</p>
              </div>
            </div>

          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-white">
          
          {/* Chat Header */}
          <div className="h-[72px] border-b border-gray-100 flex items-center justify-between px-8 shrink-0">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[#1a2642] flex items-center justify-center text-white font-bold text-[12px]">
                DB
              </div>
              <div>
                <h3 className="text-[#1a2642] text-[15px] font-bold">David Brown</h3>
                <p className="text-emerald-500 text-[12px] font-medium">Online</p>
              </div>
            </div>
            <button className="px-4 py-1.5 border border-gray-200 rounded-lg text-[13px] font-medium text-gray-600 hover:bg-gray-50">
              View Profile
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-auto p-8 flex flex-col gap-6">
            
            {/* Incoming Message */}
            <div className="flex flex-col items-start">
              <span className="text-gray-400 text-[11px] mb-1 ml-2">David Brown</span>
              <div className="bg-gray-100 text-[#1a2642] px-5 py-3 rounded-2xl rounded-tl-sm text-[14px] max-w-[70%]">
                Hey, can you confirm the night patrol status?
              </div>
              <span className="text-gray-400 text-[10px] mt-1 ml-2">10:28 PM</span>
            </div>

            {/* Outgoing Message */}
            <div className="flex flex-col items-end">
              <div className="bg-[#1a2642] text-white px-5 py-3 rounded-2xl rounded-tr-sm text-[14px] max-w-[70%]">
                John completed 3 of 5 checkpoints. The emergency exit is showing late.
              </div>
              <span className="text-gray-400 text-[10px] mt-1 mr-2">10:30 PM</span>
            </div>

            {/* Incoming Message */}
            <div className="flex flex-col items-start">
              <span className="text-gray-400 text-[11px] mb-1 ml-2">David Brown</span>
              <div className="bg-gray-100 text-[#1a2642] px-5 py-3 rounded-2xl rounded-tl-sm text-[14px] max-w-[70%]">
                Thanks. I'll send a reminder to John now.
              </div>
              <span className="text-gray-400 text-[10px] mt-1 ml-2">10:31 PM</span>
            </div>

            {/* Incoming Message with Attachment */}
            <div className="flex flex-col items-start">
              <span className="text-gray-400 text-[11px] mb-1 ml-2">David Brown</span>
              <div className="bg-gray-100 text-[#1a2642] p-4 rounded-2xl rounded-tl-sm text-[14px] max-w-[70%]">
                <p className="mb-3">Can you confirm the night patrol status?</p>
                <div className="bg-gray-200/50 rounded-lg p-3 flex items-center gap-3">
                  <Paperclip size={14} className="text-gray-500" />
                  <span className="text-[13px] font-medium">patrol-report.pdf</span>
                </div>
              </div>
              <span className="text-gray-400 text-[10px] mt-1 ml-2">10:32 PM</span>
            </div>

          </div>

          {/* Chat Input */}
          <div className="p-6 border-t border-gray-100 bg-white">
            <div className="flex items-center gap-4">
              <button className="text-gray-400 hover:text-gray-600 transition-colors">
                <Paperclip size={20} />
              </button>
              <input 
                type="text" 
                placeholder="Type a message..." 
                className="flex-1 px-4 py-3 border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:border-[#f97316]"
              />
              <button className="px-6 py-3 bg-[#f97316] hover:bg-[#e06511] text-white rounded-lg text-[14px] font-medium transition-colors shadow-sm">
                Send
              </button>
            </div>
          </div>

        </div>

      </main>
    </div>
  );
}
