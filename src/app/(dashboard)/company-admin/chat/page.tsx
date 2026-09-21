"use client";

import { Bell, Search, Phone, X, Paperclip } from "lucide-react";
import { useState } from "react";

export default function ChatPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [showProfile, setShowProfile] = useState(false);

  return (
    <div className="flex flex-col h-full bg-[#f8f9fa] relative">
      {/* Top Header */}
      <header className="h-[72px] bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0">
        <div>
          <p className="text-gray-400 text-[11px] font-medium tracking-wide uppercase mb-0.5">SHIFTPOINT • Communication • Chat</p>
          <h1 className="text-[#1a2642] text-[18px] font-bold leading-tight">Chat</h1>
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
      <main className="flex-1 flex overflow-hidden">
        
        {/* Sidebar */}
        <div className="w-[380px] bg-white border-r border-gray-100 flex flex-col h-full shrink-0">
          <div className="p-6 pb-4">
            <h2 className="text-[#1a2642] text-[20px] font-bold mb-4">Messages</h2>
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input 
                type="text" 
                placeholder="Search conversations..." 
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:border-[#f97316]"
              />
            </div>
            <div className="flex gap-1 border-b border-gray-100 pb-2">
              {["All", "Individual", "Groups"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-1.5 text-[13px] font-medium rounded-lg transition-colors flex-1 ${
                    activeTab === tab
                      ? "bg-[#1a2642] text-white"
                      : "text-gray-500 hover:bg-gray-50 hover:text-[#1a2642]"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {/* Conversation Items */}
            <div className="p-4 border-l-4 border-[#f97316] bg-orange-50/30 hover:bg-orange-50/50 cursor-pointer border-b border-gray-50">
              <div className="flex justify-between items-start mb-1">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#1a2642] flex items-center justify-center text-white font-bold text-[13px] relative">
                    DB
                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></div>
                  </div>
                  <div>
                    <p className="text-[#1a2642] font-semibold text-[14px] leading-tight">David Brown</p>
                    <p className="text-gray-400 text-[12px]">Manager</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-gray-400 text-[11px] mb-1">10:32 PM</p>
                  <div className="inline-flex w-5 h-5 bg-[#f97316] text-white text-[10px] font-bold items-center justify-center rounded-full">2</div>
                </div>
              </div>
              <p className="text-[#1a2642] text-[13px] font-medium truncate mt-2">Can you confirm the night patrol status?</p>
            </div>

            <div className="p-4 border-l-4 border-transparent hover:bg-gray-50 cursor-pointer border-b border-gray-50">
              <div className="flex justify-between items-start mb-1">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#1a2642] flex items-center justify-center text-white font-bold text-[13px] relative">
                    EC
                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></div>
                  </div>
                  <div>
                    <p className="text-[#1a2642] font-semibold text-[14px] leading-tight">Emily Chen</p>
                    <p className="text-gray-400 text-[12px]">Manager</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-gray-400 text-[11px] mb-1">08:15 AM</p>
                </div>
              </div>
              <p className="text-gray-500 text-[13px] truncate mt-2">Report submitted.</p>
            </div>

            <div className="p-4 border-l-4 border-transparent hover:bg-gray-50 cursor-pointer border-b border-gray-50">
              <div className="flex justify-between items-start mb-1">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold text-[13px]">
                    G
                  </div>
                  <div>
                    <p className="text-[#1a2642] font-semibold text-[14px] leading-tight">Team ABC HQ</p>
                    <p className="text-gray-400 text-[12px]">Group</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-gray-400 text-[11px] mb-1">Yesterday</p>
                  <div className="inline-flex w-5 h-5 bg-[#f97316] text-white text-[10px] font-bold items-center justify-center rounded-full">5</div>
                </div>
              </div>
              <p className="text-gray-500 text-[13px] truncate mt-2">John: I'm on site.</p>
            </div>

            <div className="p-4 border-l-4 border-transparent hover:bg-gray-50 cursor-pointer border-b border-gray-50">
              <div className="flex justify-between items-start mb-1">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold text-[13px]">
                    G
                  </div>
                  <div>
                    <p className="text-[#1a2642] font-semibold text-[14px] leading-tight">Night Patrol Team</p>
                    <p className="text-gray-400 text-[12px]">Group</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-gray-400 text-[11px] mb-1">Yesterday</p>
                </div>
              </div>
              <p className="text-gray-500 text-[13px] truncate mt-2">Sarah: Route completed.</p>
            </div>

            <div className="p-4 border-l-4 border-transparent hover:bg-gray-50 cursor-pointer">
              <div className="flex justify-between items-start mb-1">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#1a2642] flex items-center justify-center text-white font-bold text-[13px]">
                    TW
                  </div>
                  <div>
                    <p className="text-[#1a2642] font-semibold text-[14px] leading-tight">Tom Wilson</p>
                    <p className="text-gray-400 text-[12px]">Employee</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-gray-400 text-[11px] mb-1">2d ago</p>
                </div>
              </div>
              <p className="text-gray-500 text-[13px] truncate mt-2">Clock out confirmed.</p>
            </div>

          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-white">
          {/* Chat Header */}
          <div className="h-[80px] border-b border-gray-100 flex items-center justify-between px-8 shrink-0">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[#1a2642] flex items-center justify-center text-white font-bold text-[13px] relative">
                DB
              </div>
              <div>
                <h3 className="text-[#1a2642] font-bold text-[16px] leading-tight">David Brown</h3>
                <p className="text-green-500 text-[13px] font-medium">Online</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="px-4 py-2 border border-gray-200 rounded-lg text-[13px] font-medium text-gray-600 hover:bg-gray-50 flex items-center gap-2">
                Call
              </button>
              <button 
                onClick={() => setShowProfile(true)}
                className="px-4 py-2 border border-gray-200 rounded-lg text-[13px] font-medium text-gray-600 hover:bg-gray-50"
              >
                View Profile
              </button>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-8 flex flex-col">
            
            <div className="mb-6 max-w-[70%]">
              <p className="text-gray-400 text-[11px] mb-1">David Brown</p>
              <div className="bg-gray-100 rounded-2xl rounded-tl-sm px-5 py-3 text-[14px] text-[#1a2642] inline-block">
                Hey, can you confirm the night patrol status?
              </div>
              <p className="text-gray-400 text-[11px] mt-1">10:28 PM</p>
            </div>

            <div className="mb-6 max-w-[70%] self-end flex flex-col items-end">
              <div className="bg-[#1a2642] rounded-2xl rounded-tr-sm px-5 py-3 text-[14px] text-white inline-block">
                John completed 3 of 5 checkpoints. The emergency exit is showing late.
              </div>
              <p className="text-gray-400 text-[11px] mt-1">10:30 PM</p>
            </div>

            <div className="mb-6 max-w-[70%]">
              <p className="text-gray-400 text-[11px] mb-1">David Brown</p>
              <div className="bg-gray-100 rounded-2xl rounded-tl-sm px-5 py-3 text-[14px] text-[#1a2642] inline-block">
                Thanks. I'll send a reminder to John now.
              </div>
              <p className="text-gray-400 text-[11px] mt-1">10:31 PM</p>
            </div>

            <div className="mb-6 max-w-[70%]">
              <p className="text-gray-400 text-[11px] mb-1">David Brown</p>
              <div className="bg-gray-100 rounded-2xl rounded-tl-sm p-4 text-[#1a2642] inline-block">
                <p className="text-[14px] mb-3">Can you confirm the night patrol status?</p>
                <div className="bg-gray-200/50 rounded-lg p-3 flex items-center gap-3">
                  <Paperclip size={16} className="text-gray-500" />
                  <span className="text-[13px] font-medium">patrol-report.pdf</span>
                </div>
              </div>
              <p className="text-gray-400 text-[11px] mt-1">10:32 PM</p>
            </div>

          </div>

          {/* Chat Input */}
          <div className="p-6 border-t border-gray-100 flex items-center gap-4 bg-white">
            <button className="text-gray-400 hover:text-gray-600 p-2">
              <Paperclip size={20} />
            </button>
            <input 
              type="text" 
              placeholder="Type a message..." 
              className="flex-1 px-4 py-3 border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:border-[#f97316]"
            />
            <button className="px-8 py-3 bg-[#d97706] hover:bg-[#b45f06] text-white rounded-lg text-[14px] font-medium transition-colors">
              Send →
            </button>
          </div>
        </div>
      </main>

      {/* Profile Details Modal Overlay */}
      {showProfile && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-[#1a2642]/60">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-[500px] animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h3 className="text-[#1a2642] text-[20px] font-bold">Profile Details</h3>
              <button onClick={() => setShowProfile(false)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>
            <div className="p-8">
              
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-full bg-[#1a2642] flex items-center justify-center text-white font-bold text-[20px]">
                  DB
                </div>
                <div>
                  <h4 className="text-[#1a2642] font-bold text-[20px] leading-tight mb-1">David Brown</h4>
                  <p className="text-green-500 text-[14px] font-medium">Online now</p>
                </div>
              </div>

              <div className="space-y-4 text-[14px] border-b border-gray-100 pb-8 mb-8">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Role</span>
                  <span className="text-[#1a2642] font-medium">Manager</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Work email</span>
                  <span className="text-[#1a2642] font-medium">david.brown@abcsecurity.io</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Primary location</span>
                  <span className="text-[#1a2642] font-medium">ABC Headquarters</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Customer access</span>
                  <span className="text-[#1a2642] font-medium">ABC Facilities Ltd., LogiCo</span>
                </div>
              </div>

              <button 
                onClick={() => setShowProfile(false)}
                className="w-full py-3 border border-gray-200 rounded-lg text-[14px] font-medium text-[#1a2642] hover:bg-gray-50 transition-colors"
              >
                Close Details
              </button>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
