"use client";

import { Bell, Search, ChevronDown, X } from "lucide-react";
import { useState } from "react";
import UseSelect from "@/components/ui/UseSelect";
import UseForm from "@/components/ui/UseForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const TRIALS_DATA = [
  {
    id: "CMP-241",
    name: "Acme Corporation",
    accountType: "Trial",
    accountColor: "bg-blue-50 text-blue-600 border-blue-200",
    status: "Active",
    statusColor: "bg-green-50 text-green-600 border-green-200",
    startEnd: "10 Oct 2026\n10 Jan 2027",
    remaining: "92 days",
    remainingColor: "text-[#1a2642]",
    limits: "Patrols · 25 users",
    usage: "68% onboarding",
    actionText: "View account"
  },
  {
    id: "CMP-186",
    name: "Pro Guard",
    accountType: "Pilot",
    accountColor: "bg-orange-50 text-orange-600 border-orange-200",
    status: "Active",
    statusColor: "bg-green-50 text-green-600 border-green-200",
    startEnd: "15 Jul 2026\n15 Sep 2026",
    remaining: "5 days",
    remainingColor: "text-[#f97316]",
    limits: "All modules · 320 users",
    usage: "94% onboarding",
    actionText: "Manage pilot"
  }
];

export default function TrialsPage() {
  const [activeModal, setActiveModal] = useState<"none" | "trial" | "pilot" | "create">("none");

  return (
    <div className="flex flex-col h-full bg-[#f8f9fa] relative">
      {/* Top Header */}
      <header className="h-[72px] bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0">
        <div>
          <h1 className="text-[#1a2642] text-xl font-bold">Pilot Management</h1>
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
              <h2 className="text-[#1a2642] text-[22px] font-bold mb-1">Trials & Pilots</h2>
              <p className="text-gray-500 text-[14px]">Manage self-service trials and manually activated pilot companies.</p>
            </div>
            <button 
              onClick={() => setActiveModal("create")}
              className="bg-[#f97316] hover:bg-[#e06511] text-white font-medium text-[14px] px-5 py-2.5 rounded-lg transition-colors flex items-center gap-1"
            >
              <span className="text-lg leading-none mb-0.5">+</span> Activate Pilot
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-4 gap-5 mb-8">
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <p className="text-gray-400 text-[11px] font-bold tracking-[0.1em] uppercase mb-2">ACTIVE TRIALS</p>
              <p className="text-[32px] font-bold text-[#1a2642] mb-1">1</p>
              <p className="text-gray-400 text-[12px]">Self-service trial accounts</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <p className="text-gray-400 text-[11px] font-bold tracking-[0.1em] uppercase mb-2">ACTIVE PILOTS</p>
              <p className="text-[32px] font-bold text-[#1a2642] mb-1">1</p>
              <p className="text-gray-400 text-[12px]">Manually granted pilots</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <p className="text-gray-400 text-[11px] font-bold tracking-[0.1em] uppercase mb-2">CONVERSION RATE</p>
              <p className="text-[32px] font-bold text-[#1a2642] mb-1">50%</p>
              <p className="text-gray-400 text-[12px]">Trial/pilot accounts converted</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <p className="text-gray-400 text-[11px] font-bold tracking-[0.1em] uppercase mb-2">EXPIRING SOON</p>
              <p className="text-[32px] font-bold text-[#1a2642] mb-1">1</p>
              <p className="text-gray-400 text-[12px]">Reaching expiry in 7 days</p>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white border border-gray-200 rounded-xl p-3 flex items-center justify-between mb-6 shadow-sm">
            <div className="flex items-center text-gray-400 px-2 w-full max-w-[400px]">
              <Search size={18} className="mr-3" />
              <input 
                type="text" 
                placeholder="Search company..." 
                className="bg-transparent border-none outline-none text-[#1a2642] text-[14px] w-full"
              />
            </div>
            <div className="px-3">
              <button className="flex items-center gap-6 px-4 py-2 border border-gray-200 rounded-lg text-[13px] font-medium text-[#1a2642] hover:bg-gray-50 transition-colors">
                Active
                <ChevronDown size={16} className="text-gray-400" />
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden mb-6">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[14px]">
                <thead>
                  <tr className="bg-[#fcfdfd] border-b border-gray-100 text-gray-400 text-[11px] uppercase tracking-wider font-semibold">
                    <th className="px-6 py-4">Company</th>
                    <th className="px-6 py-4">Account</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Start & End</th>
                    <th className="px-6 py-4">Remaining</th>
                    <th className="px-6 py-4">Assigned Limits</th>
                    <th className="px-6 py-4">Usage</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {TRIALS_DATA.map((item, i) => (
                    <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors last:border-0">
                      <td className="px-6 py-4">
                        <p className="font-medium text-[#1a2642]">{item.name}</p>
                        <p className="text-gray-400 text-[12px]">{item.id}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[12px] font-medium border ${item.accountColor}`}>
                          {item.accountType}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[12px] font-medium border ${item.statusColor}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-500 text-[13px] whitespace-pre-line leading-relaxed">
                        {item.startEnd}
                      </td>
                      <td className={`px-6 py-4 font-medium ${item.remainingColor}`}>
                        {item.remaining}
                      </td>
                      <td className="px-6 py-4 text-gray-500 text-[13px]">
                        {item.limits}
                      </td>
                      <td className="px-6 py-4 text-gray-500 text-[13px]">
                        {item.usage}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button 
                          onClick={() => setActiveModal(item.accountType === "Trial" ? "trial" : "pilot")}
                          className="px-4 py-1.5 border border-gray-200 rounded-lg text-[13px] font-medium text-[#1a2642] hover:bg-gray-50 transition-colors"
                        >
                          {item.actionText}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Warning Banner */}
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-5 text-[14px]">
            <h4 className="text-[#9a4b12] font-semibold mb-1">Post-expiry access control</h4>
            <p className="text-[#a55a22]">Accounts with no selected paid plan transition to Restricted / Read-Only. Their company data is preserved and is not deleted.</p>
          </div>

        </div>
      </main>

      {/* OVERLAYS & MODALS */}
      {activeModal !== "none" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1a2642]/60 p-4">
          
          {/* Trial Management Modal */}
          {activeModal === "trial" && (
            <div className="bg-white rounded-xl shadow-xl w-full max-w-[540px] overflow-hidden">
              <div className="p-8 pb-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <p className="text-[#f97316] font-bold text-[10px] tracking-[0.15em] uppercase mb-1">TRIAL MANAGEMENT</p>
                    <h2 className="text-[#1a2642] text-[22px] font-semibold">Acme Corporation</h2>
                  </div>
                  <button onClick={() => setActiveModal("none")} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-5 mb-6 flex items-start justify-between">
                  <div>
                    <p className="text-gray-500 text-[12px] mb-1">Onboarding</p>
                    <p className="text-[#1a2642] text-[14px] font-medium">68% onboarding</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-[12px] mb-1">Current access</p>
                    <p className="text-[#1a2642] text-[14px] font-medium">Patrols · 25 users</p>
                  </div>
                </div>

                <div className="bg-orange-50 border border-orange-100 rounded-lg p-4 text-[#a55a22] text-[13px] leading-relaxed">
                  This account is in a active state. Existing data remains preserved; access is managed according to its current subscription.
                </div>
              </div>
            </div>
          )}

          {/* Pilot Management Modal */}
          {activeModal === "pilot" && (
            <div className="bg-white rounded-xl shadow-xl w-full max-w-[540px] overflow-hidden">
              <div className="p-8 pb-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <p className="text-[#f97316] font-bold text-[10px] tracking-[0.15em] uppercase mb-1">PILOT MANAGEMENT</p>
                    <h2 className="text-[#1a2642] text-[22px] font-semibold">Pro Guard</h2>
                  </div>
                  <button onClick={() => setActiveModal("none")} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-5 mb-6 flex items-start justify-between">
                  <div>
                    <p className="text-gray-500 text-[12px] mb-1">Onboarding</p>
                    <p className="text-[#1a2642] text-[14px] font-medium">94% onboarding</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-[12px] mb-1">Current access</p>
                    <p className="text-[#1a2642] text-[14px] font-medium">All modules · 320 users</p>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-[#1a2642] text-[13px] font-medium mb-2">Extend pilot</label>
                  <select className="w-full bg-white border border-gray-200 text-[#1a2642] text-[14px] rounded-lg focus:ring-[#f97316] focus:border-[#f97316] block p-2.5 outline-none">
                    <option>1 month</option>
                    <option>2 months</option>
                  </select>
                </div>

                <div className="flex flex-col gap-3">
                  <button className="w-full py-2.5 border border-[#f97316] text-[#f97316] font-medium text-[14px] rounded-lg transition-colors hover:bg-orange-50">
                    Extend Pilot
                  </button>
                  <button className="w-full py-2.5 bg-[#f97316] text-white font-medium text-[14px] rounded-lg transition-colors hover:bg-[#e06511]">
                    Convert to Paid Plan
                  </button>
                  <button className="w-full py-2.5 border border-red-200 text-red-500 font-medium text-[14px] rounded-lg transition-colors hover:bg-red-50">
                    End Pilot Early
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Create Pilot Modal */}
          {activeModal === "create" && (
            <div className="bg-white rounded-xl shadow-xl w-full max-w-[540px] overflow-hidden">
              <div className="p-8 pb-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <p className="text-[#f97316] font-bold text-[10px] tracking-[0.15em] uppercase mb-1">SUPER ADMIN CONTROL</p>
                    <h2 className="text-[#1a2642] text-[22px] font-semibold">Grant / Create Pilot</h2>
                  </div>
                  <button onClick={() => setActiveModal("none")} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-[#1a2642] text-[13px] font-medium mb-2">Select registered company</label>
                    <input type="text" value="Northpoint Security" readOnly className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-[14px] text-[#1a2642] focus:outline-none" />
                  </div>

                  <div>
                    <label className="block text-[#1a2642] text-[13px] font-medium mb-2">Pilot duration</label>
                    <div className="flex gap-2">
                      <button className="px-4 py-2 rounded-lg text-[13px] font-medium bg-[#f97316] text-white border border-[#f97316]">1 month</button>
                      <button className="px-4 py-2 rounded-lg text-[13px] font-medium bg-white text-gray-600 border border-gray-200 hover:bg-gray-50">2 months</button>
                      <button className="px-4 py-2 rounded-lg text-[13px] font-medium bg-white text-gray-600 border border-gray-200 hover:bg-gray-50">3 months</button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[#1a2642] text-[13px] font-medium mb-2">Start date</label>
                      <input type="text" className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-[14px] focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-[#1a2642] text-[13px] font-medium mb-2">End date</label>
                      <input type="text" className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-[14px] focus:outline-none" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[#1a2642] text-[13px] font-medium mb-2">Modules & limits</label>
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      {["Reports", "Tasks", "Patrols", "Attendance"].map(mod => (
                        <label key={mod} className="flex items-center gap-2 p-2.5 border border-gray-200 rounded-lg cursor-pointer">
                          <input type="checkbox" defaultChecked className="w-4 h-4 text-[#f97316] rounded border-gray-300 focus:ring-[#f97316]" />
                          <span className="text-[13px] text-[#1a2642]">{mod}</span>
                        </label>
                      ))}
                    </div>

                    <label className="block text-[#1a2642] text-[13px] font-medium mb-2">User cap</label>
                    <input type="text" defaultValue="50" className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-[14px] text-[#1a2642] focus:outline-none" />
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-8">
                  <button onClick={() => setActiveModal("none")} className="px-4 py-2 border border-gray-200 rounded-lg text-[14px] font-medium text-gray-600 hover:bg-gray-50">
                    Cancel
                  </button>
                  <button className="px-4 py-2 bg-[#f97316] text-white rounded-lg text-[14px] font-medium hover:bg-[#e06511]">
                    Confirm & Grant Pilot
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      )}
    </div>
  );
}
