"use client";

import { Bell, ArrowRight, Bot } from "lucide-react";
import Link from "next/link";

export default function CustomerAIAssistantPage() {
  return (
    <div className="flex flex-col h-full bg-[#f8f9fa]">
      <header className="h-[72px] bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0">
        <div>
          <p className="text-gray-400 text-[11px] font-medium tracking-wide uppercase mb-0.5">SHIFTPOINT • Customer</p>
          <h1 className="text-[#1a2642] text-[18px] font-bold leading-tight">AI Assistant</h1>
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

      <main className="flex-1 overflow-auto p-8 flex flex-col">
        <div className="max-w-[1000px] mx-auto w-full flex-1 flex flex-col">
          
          <div className="mb-6 shrink-0">
            <h2 className="text-[#1a2642] text-[28px] font-bold mb-1">AI Assistant</h2>
            <p className="text-gray-500 text-[14px]">Ask about your authorised locations, patrol activity and available reports.</p>
          </div>

          <div className="flex-1 bg-white rounded-xl border border-gray-100 shadow-sm flex flex-col items-center justify-center relative p-8">
            
            <div className="text-center max-w-[600px] w-full">
              <div className="relative inline-block mb-6">
                <div className="absolute inset-0 bg-orange-50 rounded-full transform translate-x-2 translate-y-2"></div>
                <div className="w-16 h-16 bg-[#1a2642] rounded-2xl flex items-center justify-center relative z-10 text-white shadow-lg">
                  <Bot size={32} />
                </div>
              </div>
              
              <h3 className="text-[#1a2642] text-[28px] font-bold mb-2">How can I help today?</h3>
              <p className="text-gray-500 text-[14px] mb-10">I can help you find information in your customer portal.</p>

              <div className="flex flex-wrap justify-center gap-3">
                <button className="px-5 py-2.5 bg-white border border-gray-200 rounded-full text-[13px] text-gray-600 hover:border-[#f97316] hover:text-[#f97316] transition-colors flex items-center gap-2 shadow-sm">
                  Show recent reports <ArrowRight size={14} />
                </button>
                <button className="px-5 py-2.5 bg-white border border-gray-200 rounded-full text-[13px] text-gray-600 hover:border-[#f97316] hover:text-[#f97316] transition-colors flex items-center gap-2 shadow-sm">
                  Which patrols are active? <ArrowRight size={14} />
                </button>
                <button className="px-5 py-2.5 bg-white border border-gray-200 rounded-full text-[13px] text-gray-600 hover:border-[#f97316] hover:text-[#f97316] transition-colors flex items-center gap-2 shadow-sm">
                  Find Westfield Office <ArrowRight size={14} />
                </button>
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-6 bg-white border-t border-gray-50 rounded-b-xl">
              <div className="flex gap-4 items-center">
                <input 
                  type="text" 
                  placeholder="Ask about your locations, patrols or reports..."
                  className="flex-1 px-4 py-3 border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:border-[#f97316] shadow-sm"
                />
                <button className="px-6 py-3 bg-[#f97316] hover:bg-[#e06511] text-white rounded-lg text-[14px] font-medium shadow-sm transition-colors flex items-center gap-2">
                  Send <ArrowRight size={14} />
                </button>
              </div>
            </div>

          </div>

        </div>
      </main>

    </div>
  );
}
