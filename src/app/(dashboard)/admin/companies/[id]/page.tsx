"use client";

import Link from "next/link";
import { Bell, ChevronDown, Check, Circle } from "lucide-react";

export default function CompanyDetailPage() {
  return (
    <div className="flex flex-col h-full bg-[#f8f9fa]">
      {/* Top Header */}
      <header className="h-[72px] bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0">
        <div>
          <h1 className="text-[#1a2642] text-xl font-bold">Company Detail</h1>
          <p className="text-gray-400 text-xs mt-0.5">SHIFTPOINT • Super Admin</p>
        </div>
        <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors">
          <Bell size={20} />
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-8">
        <div className="max-w-[1200px] mx-auto">
          
          <Link href="/admin/companies" className="inline-flex items-center text-gray-500 font-medium text-[13px] hover:text-[#1a2642] transition-colors mb-6">
            <span className="mr-2">←</span> Companies
          </Link>

          {/* Title Row */}
          <div className="flex items-start justify-between mb-8">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h2 className="text-[#1a2642] text-[24px] font-bold">ABC Security Services</h2>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[12px] font-medium border bg-green-50 text-green-600 border-green-200">
                  Active
                </span>
              </div>
              <p className="text-gray-500 text-[14px]">Security · Professional Plan · Since Jan 2025</p>
            </div>
            
            <div className="flex items-center gap-3">
              <button className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium text-[14px] px-4 py-2 rounded-lg transition-colors">
                Edit Company
              </button>
              <button className="flex items-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium text-[14px] px-4 py-2 rounded-lg transition-colors">
                Change Status
                <ChevronDown size={16} className="text-gray-400" />
              </button>
              <Link 
                href="/admin/companies/1/modules"
                className="bg-[#f97316] hover:bg-[#e06511] text-white font-medium text-[14px] px-4 py-2 rounded-lg transition-colors"
              >
                Manage Modules
              </Link>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-5 mb-8">
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <p className="text-gray-400 text-[11px] font-bold tracking-[0.1em] uppercase mb-2">
                EMPLOYEES
              </p>
              <p className="text-[32px] font-bold text-[#1a2642]">
                248
              </p>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <p className="text-gray-400 text-[11px] font-bold tracking-[0.1em] uppercase mb-2">
                CUSTOMERS
              </p>
              <p className="text-[32px] font-bold text-[#1a2642]">
                42
              </p>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <p className="text-gray-400 text-[11px] font-bold tracking-[0.1em] uppercase mb-2">
                LOCATIONS
              </p>
              <p className="text-[32px] font-bold text-[#1a2642]">
                18
              </p>
            </div>
          </div>

          {/* Bottom Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            
            {/* Subscription Box */}
            <div className="lg:col-span-5 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
              <h3 className="text-[#1a2642] font-bold text-[16px] mb-8">Subscription</h3>
              
              <div className="space-y-6 mb-10 text-[14px]">
                <div className="flex justify-between">
                  <span className="text-gray-400 font-medium">Plan</span>
                  <span className="font-bold text-[#1a2642]">Professional</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 font-medium">Status</span>
                  <span className="font-bold text-[#1a2642]">Active</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 font-medium">Since</span>
                  <span className="font-bold text-[#1a2642]">Jan 2025</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 font-medium">Employees Limit</span>
                  <span className="font-bold text-[#1a2642]">Unlimited</span>
                </div>
              </div>

              <div className="text-center">
                <button className="text-[#f97316] font-semibold text-[14px] hover:underline">
                  Change Subscription →
                </button>
              </div>
            </div>

            {/* Assigned Modules Box */}
            <div className="lg:col-span-7 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-[#1a2642] font-bold text-[16px]">Assigned Modules</h3>
                <Link 
                  href="/admin/companies/1/modules"
                  className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-600 font-medium text-[13px] px-4 py-1.5 rounded-lg transition-colors"
                >
                  Manage All
                </Link>
              </div>

              {/* CORE */}
              <div className="mb-8">
                <p className="text-gray-400 text-[11px] font-bold tracking-[0.1em] uppercase mb-4">
                  CORE
                </p>
                <div className="flex flex-wrap gap-3">
                  {[
                    "Workforce", "Employees", "Customers", "Locations", "Tasks", "Checklists",
                    "Reports", "Clock In/Out & Time Tracking", "Patrols/Rounds", "Incident Reporting"
                  ].map(module => (
                    <div key={module} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-50 border border-green-200 rounded-full text-[13px] font-medium text-green-700">
                      <Check size={14} className="text-green-600" />
                      {module}
                    </div>
                  ))}
                </div>
              </div>

              {/* OPTIONAL */}
              <div>
                <p className="text-gray-400 text-[11px] font-bold tracking-[0.1em] uppercase mb-4">
                  OPTIONAL
                </p>
                <div className="flex flex-wrap gap-3">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-50 border border-green-200 rounded-full text-[13px] font-medium text-green-700">
                    <Check size={14} className="text-green-600" />
                    NFC Checkpoints
                  </div>

                  {[
                    "GPS Verification", "Documents", "Communication", "AI Assistant"
                  ].map(module => (
                    <div key={module} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-full text-[13px] font-medium text-gray-400">
                      <Circle size={14} />
                      {module}
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </div>
      </main>
    </div>
  );
}
