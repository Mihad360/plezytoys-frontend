"use client";

import Link from "next/link";
import { Bell, ChevronDown, Paperclip } from "lucide-react";

export default function SupportDetailPage() {
  return (
    <div className="flex flex-col h-full bg-[#f8f9fa]">
      {/* Top Header */}
      <header className="h-[72px] bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0">
        <div>
          <h1 className="text-[#1a2642] text-xl font-bold">Support</h1>
          <p className="text-gray-400 text-xs mt-0.5">SHIFTPOINT • Super Admin</p>
        </div>
        <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors">
          <Bell size={20} />
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-8">
        <div className="max-w-[1100px] mx-auto">
          
          <Link href="/admin/support" className="inline-flex items-center text-gray-500 font-medium text-[13px] hover:text-[#1a2642] transition-colors mb-6">
            <span className="mr-2">←</span> All support requests
          </Link>

          {/* Title Row */}
          <div className="flex items-start justify-between mb-8">
            <div>
              <div className="flex gap-2 mb-3">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium border bg-orange-50 text-[#f97316] border-orange-200">
                  Open
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium border bg-orange-50 text-[#f97316] border-orange-200">
                  High priority
                </span>
              </div>
              <h2 className="text-[#1a2642] text-[24px] font-bold mb-1">Unable to configure NFC checkpoint on Level 3</h2>
              <p className="text-gray-500 text-[14px]">ABC Security Services · Ticket #0001</p>
            </div>
            
            <div className="flex items-center gap-3 mt-4">
              <button className="flex items-center justify-between w-[100px] px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-[14px] text-[#1a2642]">
                Open <ChevronDown size={16} className="text-gray-400" />
              </button>
              <button className="bg-[#f97316] hover:bg-[#e06511] text-white font-medium text-[14px] px-4 py-2.5 rounded-lg transition-colors">
                Resolve ticket
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* LEFT COLUMN */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Request */}
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <p className="text-gray-400 text-[11px] font-bold tracking-[0.1em] uppercase mb-4">
                  REQUEST
                </p>
                <p className="text-[#1a2642] text-[14px] leading-relaxed">
                  The NFC checkpoint configuration screen is showing an error when trying to set GPS radius above 100m.
                </p>
              </div>

              {/* Conversation History */}
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <p className="text-gray-400 text-[11px] font-bold tracking-[0.1em] uppercase mb-5">
                  CONVERSATION HISTORY
                </p>
                
                <div className="mb-2 flex justify-between items-end">
                  <p className="text-[14px]">
                    <span className="font-bold text-[#1a2642]">Sarah Johnson</span> <span className="text-gray-400">· Company Admin</span>
                  </p>
                  <p className="text-gray-400 text-[11px]">Today · 11:24 AM</p>
                </div>
                <p className="text-gray-600 text-[14px] leading-relaxed">
                  We cannot complete setup for the Level 3 checkpoint.
                </p>
              </div>

              {/* Reply */}
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <div className="flex justify-between items-center mb-5">
                  <p className="text-gray-400 text-[11px] font-bold tracking-[0.1em] uppercase">
                    REPLY TO CUSTOMER
                  </p>
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-green-50 text-green-600">
                    Customer notified on send
                  </span>
                </div>
                
                <textarea 
                  rows={4}
                  placeholder="Write a helpful reply..."
                  className="w-full p-4 border border-gray-200 rounded-lg text-[14px] text-[#1a2642] focus:outline-none focus:border-[#f97316] mb-4 resize-none"
                ></textarea>

                <div className="flex gap-3">
                  <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-[13px] font-medium text-gray-600 hover:bg-gray-50 transition-colors">
                    <span className="text-lg leading-none mb-0.5">+</span> Add attachment
                  </button>
                  <button className="bg-[#f97316] hover:bg-[#e06511] text-white font-medium text-[13px] px-5 py-2 rounded-lg transition-colors">
                    Send reply
                  </button>
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Ticket Details */}
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <p className="text-gray-400 text-[11px] font-bold tracking-[0.1em] uppercase mb-5">
                  TICKET DETAILS
                </p>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-500 text-[12px] mb-1.5">Priority</label>
                    <select className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-[13px] text-[#1a2642] focus:outline-none focus:border-[#f97316]">
                      <option>High</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-500 text-[12px] mb-1.5">Category</label>
                    <select className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-[13px] text-[#1a2642] focus:outline-none focus:border-[#f97316]">
                      <option>Checkpoints</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-500 text-[12px] mb-1.5">Assigned support agent</label>
                    <select className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-[13px] text-[#1a2642] focus:outline-none focus:border-[#f97316]">
                      <option>Maya Patel</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Attachments */}
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <p className="text-gray-400 text-[11px] font-bold tracking-[0.1em] uppercase mb-4">
                  ATTACHMENTS
                </p>
                <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg text-[13px] text-gray-600 cursor-pointer hover:bg-gray-100 transition-colors w-fit">
                  <Paperclip size={14} className="text-gray-400" />
                  checkpoint-error.png
                </div>
              </div>

              {/* Internal Notes */}
              <div className="bg-amber-50 rounded-xl border border-amber-200 shadow-sm p-6">
                <p className="text-[#d97706] text-[11px] font-bold tracking-[0.1em] uppercase mb-4">
                  INTERNAL NOTES
                </p>
                <p className="text-[#b45309] text-[13px] leading-relaxed mb-4">
                  Reproduced on the company account.<br />
                  Escalated to mobile engineering.
                </p>
                
                <textarea 
                  rows={2}
                  placeholder="Visible to support only..."
                  className="w-full p-3 border border-amber-200 rounded-lg text-[13px] text-[#92400e] bg-white focus:outline-none focus:border-[#d97706] mb-4 resize-none placeholder-amber-300"
                ></textarea>

                <button className="text-[#d97706] font-semibold text-[13px] hover:underline">
                  Add internal note
                </button>
              </div>

            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
