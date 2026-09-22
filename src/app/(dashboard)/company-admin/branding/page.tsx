"use client";

import { Bell, ChevronDown } from "lucide-react";

export default function BrandingLanguagePage() {
  return (
    <div className="flex flex-col h-full bg-[#f8f9fa]">
      {/* Top Header */}
      <header className="h-[72px] bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0">
        <div>
          <p className="text-gray-400 text-[11px] font-medium tracking-wide uppercase mb-0.5">SHIFTPOINT • Settings • Branding</p>
          <h1 className="text-[#1a2642] text-[18px] font-bold leading-tight">Branding & Language</h1>
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
        <div className="max-w-[800px]">
          
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
            <h2 className="text-[#1a2642] text-[16px] font-bold mb-6 pb-6 border-b border-gray-100">
              Branding & Default Company Language
            </h2>
            
            <div className="space-y-6 max-w-[500px]">
              
              <div>
                <label className="block text-[#1a2642] text-[13px] font-medium mb-2">Primary brand color</label>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg border border-gray-200 bg-white"></div>
                  <div className="relative flex-1">
                    <input type="text" defaultValue="#F47B20" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:border-[#f97316]" />
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 rounded bg-[#F47B20]"></div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[#1a2642] text-[13px] font-medium mb-2">Secondary brand color</label>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg border border-gray-200 bg-white"></div>
                  <div className="relative flex-1">
                    <input type="text" defaultValue="#1B2B4B" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:border-[#f97316]" />
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 rounded bg-[#1B2B4B]"></div>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <label className="block text-[#1a2642] text-[13px] font-medium mb-2">Language</label>
                <div className="relative">
                  <select className="w-full appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-[14px] text-[#1a2642] focus:outline-none">
                    <option>🇬🇧 English</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                </div>
              </div>

              <button className="px-6 py-2.5 bg-[#f97316] hover:bg-[#e06511] text-white rounded-lg text-[14px] font-medium transition-colors">
                Save Settings
              </button>

            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
