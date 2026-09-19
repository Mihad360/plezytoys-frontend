"use client";

import Link from "next/link";
import { Bell, Search } from "lucide-react";

export default function SubscriptionPlansPage() {
  return (
    <div className="flex flex-col h-full bg-[#f8f9fa]">
      {/* Top Header */}
      <header className="h-[72px] bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0">
        <div>
          <h1 className="text-[#1a2642] text-xl font-bold">Subscription Plans</h1>
          <p className="text-gray-400 text-xs mt-0.5">SHIFTPOINT • Super Admin</p>
        </div>
        <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors">
          <Bell size={20} />
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-8">
        <div className="max-w-[1200px] mx-auto">
          
          {/* Header area */}
          <div className="flex flex-col items-center justify-center text-center mt-10 mb-12">
            <p className="text-[#f97316] font-bold text-[11px] tracking-[0.15em] uppercase mb-4">
              SUBSCRIPTION PLANS
            </p>
            <h2 className="text-[#1a2642] text-[36px] font-bold mb-4">
              Pricing built around your active workforce.
            </h2>
            <p className="text-gray-500 text-[15px] mb-8">
              Set your own ranges, prices and commercial rules. No platform plan or limit is fixed.
            </p>
            <Link 
              href="/admin/subscription-plans/add"
              className="bg-[#f97316] hover:bg-[#e06511] text-white font-medium text-[15px] px-6 py-2.5 rounded-lg transition-colors flex items-center gap-1"
            >
              <span className="text-lg leading-none mb-0.5">+</span> Add new plan
            </Link>
          </div>

          {/* Search Bar */}
          <div className="bg-white border border-gray-200 rounded-xl p-3 flex items-center justify-between mb-8 shadow-sm">
            <div className="flex items-center text-gray-400 px-2">
              <Search size={18} className="mr-3" />
              <input 
                type="text" 
                placeholder="Search plans..." 
                className="bg-transparent border-none outline-none text-[#1a2642] text-[14px] w-[300px]"
              />
            </div>
            <Link href="/admin/payment-history" className="text-gray-500 text-[13px] hover:text-[#1a2642] px-3">
              View payment history →
            </Link>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Starter Plan */}
            <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <p className="text-gray-400 text-[11px] font-bold tracking-[0.1em] uppercase">ESSENTIALS</p>
                <p className="text-[#1a2642] font-bold text-[14px]">€5.00 <span className="text-gray-400 font-normal text-[11px]">/ basis</span></p>
              </div>
              <h3 className="text-[#1a2642] text-[24px] font-bold mb-2">Starter</h3>
              <p className="text-gray-400 text-[13px] mb-8">For small teams getting started</p>
              
              <Link href="/admin/subscription-plans/1" className="block text-center w-full bg-[#f97316] hover:bg-[#e06511] text-white font-medium text-[14px] py-2.5 rounded-lg transition-colors mb-6">
                Edit plan
              </Link>
              
              <div className="text-[13px] text-gray-500 space-y-3 flex-1 mb-8">
                <p>Custom employee, location, object or NFC range</p>
                <p>Monthly and annual euro billing</p>
                <p className="flex items-center gap-2"><span className="text-[#1a2642]">✓</span> Choose included modules</p>
                <p className="flex items-center gap-2"><span className="text-[#1a2642]">✓</span> Configure trials and grace periods</p>
                <p className="flex items-center gap-2"><span className="text-[#1a2642]">✓</span> Subscription rules</p>
              </div>

              <div className="flex gap-2">
                <div className="border border-gray-200 text-gray-500 text-[11px] px-3 py-1 rounded">46 companies</div>
                <div className="border border-gray-200 text-gray-500 text-[11px] px-3 py-1 rounded">Configure</div>
              </div>
            </div>

            {/* Professional Plan */}
            <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm flex flex-col relative overflow-hidden">
              <div className="flex justify-between items-start mb-4">
                <p className="text-gray-400 text-[11px] font-bold tracking-[0.1em] uppercase">MOST POPULAR</p>
                <p className="text-[#1a2642] font-bold text-[14px]">€4.00 <span className="text-gray-400 font-normal text-[11px]">/ basis</span></p>
              </div>
              <h3 className="text-[#1a2642] text-[24px] font-bold mb-2">Professional</h3>
              <p className="text-gray-400 text-[13px] mb-8">For growing operations teams</p>
              
              <Link href="/admin/subscription-plans/2" className="block text-center w-full bg-[#f97316] hover:bg-[#e06511] text-white font-medium text-[14px] py-2.5 rounded-lg transition-colors mb-6">
                Edit plan
              </Link>
              
              <div className="text-[13px] text-gray-500 space-y-3 flex-1 mb-8">
                <p>Custom employee, location, object or NFC range</p>
                <p>Monthly and annual euro billing</p>
                <p className="flex items-center gap-2"><span className="text-[#1a2642]">✓</span> Choose included modules</p>
                <p className="flex items-center gap-2"><span className="text-[#1a2642]">✓</span> Configure trials and grace periods</p>
                <p className="flex items-center gap-2"><span className="text-[#1a2642]">✓</span> Subscription rules</p>
              </div>

              <div className="flex gap-2">
                <div className="border border-gray-200 text-gray-500 text-[11px] px-3 py-1 rounded">62 companies</div>
                <div className="border border-gray-200 text-gray-500 text-[11px] px-3 py-1 rounded">Configure</div>
              </div>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm flex flex-col overflow-hidden">
              <div className="bg-[#1a2642] p-8 pb-6">
                <div className="flex justify-between items-start mb-4">
                  <p className="text-gray-300 text-[11px] font-bold tracking-[0.1em] uppercase">FULL PLATFORM</p>
                  <p className="text-white font-bold text-[14px]">Custom <span className="text-gray-400 font-normal text-[11px]">pricing</span></p>
                </div>
                <h3 className="text-white text-[24px] font-bold mb-2">Enterprise</h3>
                <p className="text-gray-300 text-[13px] mb-8">For multi-site organisations</p>
                
                <Link href="/admin/subscription-plans/3" className="block text-center w-full bg-[#233355] hover:bg-[#2c4069] border border-[#2c4069] text-white font-medium text-[14px] py-2.5 rounded-lg transition-colors">
                  Edit plan
                </Link>
              </div>
              
              <div className="p-8 flex-1 flex flex-col">
                <div className="text-[13px] text-gray-500 space-y-3 flex-1 mb-8">
                  <p>Custom employee, location, object or NFC range</p>
                  <p>Monthly and annual euro billing</p>
                  <p className="flex items-center gap-2"><span className="text-[#1a2642]">✓</span> Choose included modules</p>
                  <p className="flex items-center gap-2"><span className="text-[#1a2642]">✓</span> Configure trials and grace periods</p>
                  <p className="flex items-center gap-2"><span className="text-[#1a2642]">✓</span> Everything in Professional</p>
                </div>

                <div className="flex gap-2">
                  <div className="border border-gray-200 text-gray-500 text-[11px] px-3 py-1 rounded">20 companies</div>
                  <div className="border border-gray-200 text-gray-500 text-[11px] px-3 py-1 rounded">Configure</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
