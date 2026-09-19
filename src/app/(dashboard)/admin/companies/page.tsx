"use client";

import Link from "next/link";
import { Bell, Search, ChevronDown } from "lucide-react";

const COMPANIES = [
  { name: "ABC Security Services", sector: "Security", employees: 248, locations: 18, plan: "Professional Plan", since: "Jan 2025", status: "Active", statusColor: "bg-green-50 text-green-600 border-green-200" },
  { name: "Greenfield Services", sector: "Cleaning", employees: 126, locations: 7, plan: "Starter Plan", since: "Aug 2026", status: "Trial", statusColor: "bg-blue-50 text-blue-600 border-blue-200" },
  { name: "CarePlus Healthcare", sector: "Healthcare", employees: 184, locations: 12, plan: "Enterprise Plan", since: "Mar 2025", status: "Active", statusColor: "bg-green-50 text-green-600 border-green-200" },
  { name: "Metro Facilities", sector: "Facility Services", employees: 312, locations: 24, plan: "Enterprise Plan", since: "Oct 2024", status: "Active", statusColor: "bg-green-50 text-green-600 border-green-200" },
  { name: "Swift Hospitality", sector: "Hospitality", employees: 95, locations: 5, plan: "Professional Plan", since: "Jun 2025", status: "Suspended", statusColor: "bg-red-50 text-red-600 border-red-200" },
  { name: "ProGuard Security", sector: "Security", employees: 167, locations: 11, plan: "Professional Plan", since: "Feb 2026", status: "Active", statusColor: "bg-green-50 text-green-600 border-green-200" },
  { name: "BrightClean Co.", sector: "Cleaning", employees: 88, locations: 4, plan: "Starter Plan", since: "Aug 2026", status: "Trial", statusColor: "bg-blue-50 text-blue-600 border-blue-200" },
  { name: "NorthCare Medical", sector: "Healthcare", employees: 210, locations: 9, plan: "Professional Plan", since: "Nov 2024", status: "Active", statusColor: "bg-green-50 text-green-600 border-green-200" },
];

export default function CompaniesPage() {
  return (
    <div className="flex flex-col h-full bg-[#f8f9fa]">
      {/* Top Header */}
      <header className="h-[72px] bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0">
        <div>
          <h1 className="text-[#1a2642] text-xl font-bold">Companies</h1>
          <p className="text-gray-400 text-xs mt-0.5">SHIFTPOINT • Super Admin</p>
        </div>
        <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors">
          <Bell size={20} />
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-8">
        <div className="max-w-[1200px] mx-auto">
          
          <div className="flex items-start justify-between mb-8">
            <div>
              <h2 className="text-[#1a2642] text-[22px] font-bold mb-1">Companies</h2>
              <p className="text-gray-500 text-[14px]">Manage all companies using SHIFTPOINT</p>
            </div>
            <Link 
              href="/admin/companies/create" 
              className="bg-[#f97316] hover:bg-[#e06511] text-white font-medium text-[14px] px-5 py-2.5 rounded-lg transition-colors flex items-center gap-1"
            >
              <span className="text-lg leading-none mb-0.5">+</span> Create Company
            </Link>
          </div>

          {/* Filters */}
          <div className="flex items-center justify-between gap-4 mb-6">
            <div className="relative flex-1 max-w-[480px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search company..." 
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-[14px] text-[#1a2642] focus:outline-none focus:border-[#f97316] focus:ring-1 focus:ring-[#f97316]"
              />
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center p-1 bg-white border border-gray-200 rounded-lg">
                <button className="px-4 py-1.5 text-[13px] font-medium rounded-md bg-[#1a2642] text-white transition-colors">
                  All
                </button>
                <button className="px-4 py-1.5 text-[13px] font-medium rounded-md text-gray-500 hover:text-[#1a2642] hover:bg-gray-50 transition-colors">
                  Active
                </button>
                <button className="px-4 py-1.5 text-[13px] font-medium rounded-md text-gray-500 hover:text-[#1a2642] hover:bg-gray-50 transition-colors">
                  Trial
                </button>
                <button className="px-4 py-1.5 text-[13px] font-medium rounded-md text-gray-500 hover:text-[#1a2642] hover:bg-gray-50 transition-colors">
                  Suspended
                </button>
                <button className="px-4 py-1.5 text-[13px] font-medium rounded-md text-gray-500 hover:text-[#1a2642] hover:bg-gray-50 transition-colors">
                  Cancelled
                </button>
              </div>

              <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-[13px] font-medium text-[#1a2642] hover:bg-gray-50 transition-colors">
                Cleaning
                <ChevronDown size={16} className="text-gray-400" />
              </button>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {COMPANIES.map((company, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm flex flex-col">
                <div className="flex items-start justify-between mb-1">
                  <h3 className="text-[#1a2642] text-[16px] font-bold">{company.name}</h3>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[12px] font-medium border ${company.statusColor}`}>
                    {company.status}
                  </span>
                </div>
                
                <p className="text-gray-400 text-[13px] mb-4">{company.sector}</p>
                
                <div className="flex items-center gap-4 text-[13px] mb-1.5">
                  <p><span className="font-bold text-[#1a2642]">{company.employees}</span> <span className="text-gray-500">Employees</span></p>
                  <p><span className="font-bold text-[#1a2642]">{company.locations}</span> <span className="text-gray-500">Locations</span></p>
                </div>
                
                <p className="text-gray-400 text-[12px] mb-6">
                  {company.plan} · Since {company.since}
                </p>

                <div className="mt-auto pt-2">
                  <Link 
                    href={`/admin/companies/${i}`}
                    className="inline-block px-4 py-1.5 border border-gray-200 rounded-lg text-[13px] font-medium text-[#1a2642] hover:bg-gray-50 hover:border-gray-300 transition-all"
                  >
                    View Company
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </main>
    </div>
  );
}
