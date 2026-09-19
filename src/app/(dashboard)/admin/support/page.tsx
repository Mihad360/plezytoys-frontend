"use client";

import Link from "next/link";
import { Bell, ChevronDown } from "lucide-react";

const REQUESTS = [
  {
    id: 1,
    title: "Unable to configure NFC checkpoint on Level 3",
    status: "Open",
    statusColor: "bg-orange-50 text-[#f97316] border-orange-200",
    priority: "High",
    priorityColor: "bg-orange-50 text-[#f97316] border-orange-200",
    company: "ABC Security Services",
    category: "Checkpoints",
    agent: "Maya Patel",
    date: "Today · 11:24 AM"
  },
  {
    id: 2,
    title: "Question about company activation process",
    status: "In Progress",
    statusColor: "bg-blue-50 text-blue-600 border-blue-200",
    priority: "Normal",
    priorityColor: "bg-blue-50 text-blue-600 border-blue-200",
    company: "Greenfield Services",
    category: "Subscription",
    agent: "Daniel Reed",
    date: "Today · 09:50 AM"
  },
  {
    id: 3,
    title: "GPS verification radius not updating in mobile app",
    status: "Open",
    statusColor: "bg-orange-50 text-[#f97316] border-orange-200",
    priority: "Urgent",
    priorityColor: "bg-red-50 text-red-500 border-red-200",
    company: "CarePlus Healthcare",
    category: "Mobile app",
    agent: "Unassigned",
    date: "Yesterday · 03:15 PM"
  },
  {
    id: 4,
    title: "Report export not working in Safari",
    status: "Resolved",
    statusColor: "bg-green-50 text-green-600 border-green-200",
    priority: "Low",
    priorityColor: "bg-gray-100 text-gray-600 border-gray-200",
    company: "Metro Facilities",
    category: "Reports",
    agent: "Maya Patel",
    date: "Aug 27 · 10:00 AM"
  }
];

export default function SupportPage() {
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
        <div className="max-w-[1000px] mx-auto">
          
          <div className="mb-8">
            <h2 className="text-[#1a2642] text-[24px] font-bold mb-1">Platform Support</h2>
            <p className="text-gray-500 text-[14px]">Manage customer requests and support conversations across all companies.</p>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 max-w-[300px]">
              <input 
                type="text" 
                placeholder="Search company or request..." 
                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-[14px] text-[#1a2642] focus:outline-none focus:border-[#f97316] focus:ring-1 focus:ring-[#f97316]"
              />
            </div>
            
            <button className="flex items-center justify-between w-[160px] px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-[14px] text-[#1a2642]">
              All statuses <ChevronDown size={16} className="text-gray-400" />
            </button>
            <button className="flex items-center justify-between w-[160px] px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-[14px] text-[#1a2642]">
              All priorities <ChevronDown size={16} className="text-gray-400" />
            </button>
            <button className="flex items-center justify-between w-[160px] px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-[14px] text-[#1a2642]">
              All companies <ChevronDown size={16} className="text-gray-400" />
            </button>
            <button className="flex items-center justify-between w-[160px] px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-[14px] text-[#1a2642]">
              Any date <ChevronDown size={16} className="text-gray-400" />
            </button>
          </div>

          <p className="text-gray-400 text-[11px] font-bold tracking-[0.1em] uppercase mb-4">
            4 SUPPORT REQUESTS
          </p>

          {/* List */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
            {REQUESTS.map((req, i) => (
              <Link 
                key={req.id} 
                href={`/admin/support/${req.id}`}
                className={`p-6 hover:bg-gray-50 transition-colors block ${i !== REQUESTS.length - 1 ? 'border-b border-gray-100' : ''}`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-3">
                    <h3 className="text-[#1a2642] font-semibold text-[15px]">{req.title}</h3>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium border ${req.statusColor}`}>
                      {req.status}
                    </span>
                  </div>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium border ${req.priorityColor}`}>
                    {req.priority}
                  </span>
                </div>
                
                <div className="flex justify-between items-center text-[13px]">
                  <p className="text-gray-500">
                    {req.company} · {req.category} · Assigned to {req.agent}
                  </p>
                  <p className="text-gray-400 text-[12px]">{req.date}</p>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </main>
    </div>
  );
}
