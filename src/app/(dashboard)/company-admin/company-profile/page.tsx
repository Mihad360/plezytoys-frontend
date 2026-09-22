"use client";

import { Bell, ChevronDown } from "lucide-react";

export default function CompanyProfilePage() {
  return (
    <div className="flex flex-col h-full bg-[#f8f9fa]">
      {/* Top Header */}
      <header className="h-[72px] bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0">
        <div>
          <p className="text-gray-400 text-[11px] font-medium tracking-wide uppercase mb-0.5">SHIFTPOINT • Settings • Company Profile</p>
          <h1 className="text-[#1a2642] text-[18px] font-bold leading-tight">Company Profile</h1>
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
            <h2 className="text-[#1a2642] text-[18px] font-semibold mb-6">Company Profile</h2>
            
            <p className="text-gray-500 text-[13px] mb-8 pb-8 border-b border-gray-100">
              Only authorized Company Admins can edit these details. Saved changes are recorded in the company audit log. Billing information is managed in Subscription & Payment.
            </p>

            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-[#1a2642] text-[13px] font-medium mb-2">Legal company name</label>
                <input type="text" defaultValue="ABC Security Ltd." className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:border-[#f97316]" />
              </div>
              <div>
                <label className="block text-[#1a2642] text-[13px] font-medium mb-2">Trading name</label>
                <input type="text" defaultValue="ShiftPoint Security" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:border-[#f97316]" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-[#1a2642] text-[13px] font-medium mb-2">Company registration number</label>
                <input type="text" defaultValue="78453921" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:border-[#f97316]" />
              </div>
              <div>
                <label className="block text-[#1a2642] text-[13px] font-medium mb-2">VAT / tax identification number</label>
                <input type="text" defaultValue="NL861234567B01" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:border-[#f97316]" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-[#1a2642] text-[13px] font-medium mb-2">Country</label>
                <div className="relative">
                  <select className="w-full appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-[14px] text-[#1a2642] focus:outline-none">
                    <option>Netherlands</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                </div>
              </div>
              <div>
                <label className="block text-[#1a2642] text-[13px] font-medium mb-2">Company time zone</label>
                <div className="relative">
                  <select className="w-full appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-[14px] text-[#1a2642] focus:outline-none">
                    <option>Europe/Amsterdam (CEST)</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-[#1a2642] text-[13px] font-medium mb-2">Street</label>
                <input type="text" defaultValue="Amstelplein" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:border-[#f97316]" />
              </div>
              <div>
                <label className="block text-[#1a2642] text-[13px] font-medium mb-2">House number</label>
                <input type="text" defaultValue="1" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:border-[#f97316]" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-[#1a2642] text-[13px] font-medium mb-2">Postal code</label>
                <input type="text" defaultValue="1096 HA" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:border-[#f97316]" />
              </div>
              <div>
                <label className="block text-[#1a2642] text-[13px] font-medium mb-2">City</label>
                <input type="text" defaultValue="Amsterdam" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:border-[#f97316]" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-[#1a2642] text-[13px] font-medium mb-2">State / province</label>
                <input type="text" defaultValue="North Holland" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:border-[#f97316]" />
              </div>
              <div>
                <label className="block text-[#1a2642] text-[13px] font-medium mb-2">General contact email</label>
                <input type="text" defaultValue="admin@abcsecurity.io" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:border-[#f97316]" />
              </div>
            </div>

            <div className="bg-orange-50/50 rounded-lg p-4 mb-8">
              <p className="text-[#d97706] text-[13px] font-medium">
                Time zone control: Europe/Amsterdam is applied consistently to attendance, patrols, tasks, reports and notifications.
              </p>
            </div>

            <button className="px-6 py-2.5 bg-[#f97316] hover:bg-[#e06511] text-white rounded-lg text-[14px] font-medium transition-colors">
              Save Changes
            </button>
          </div>

        </div>
      </main>
    </div>
  );
}
