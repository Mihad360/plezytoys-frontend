"use client";

import { Bell, ChevronDown, X } from "lucide-react";
import { useState } from "react";

export default function TrainingRecordsPage() {
  const [activeModal, setActiveModal] = useState<"none" | "add" | "details">("none");

  return (
    <div className="flex flex-col h-full bg-[#f8f9fa] relative">
      {/* Top Header */}
      <header className="h-[72px] bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0">
        <div>
          <p className="text-gray-400 text-[11px] font-medium tracking-wide uppercase mb-0.5">SHIFTPOINT • Documents • Training</p>
          <h1 className="text-[#1a2642] text-[18px] font-bold leading-tight">Training Records</h1>
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
        <div className="max-w-[1400px] mx-auto">
          
          <div className="flex justify-between items-start mb-8">
            <div>
              <h2 className="text-[#1a2642] text-[24px] font-bold mb-1">Training Records</h2>
              <p className="text-gray-500 text-[14px]">Track employee training completions and certifications.</p>
            </div>
            <button 
              onClick={() => setActiveModal("add")}
              className="px-5 py-2.5 bg-[#f97316] hover:bg-[#e06511] text-white rounded-lg text-[14px] font-medium transition-colors"
            >
              + Add Training Record
            </button>
          </div>

          {/* Table */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13px]">
                <thead>
                  <tr className="bg-gray-50/50 text-gray-400 text-[10px] uppercase tracking-wider font-semibold border-b border-gray-100">
                    <th className="px-6 py-4">EMPLOYEE</th>
                    <th className="px-6 py-4">COURSE</th>
                    <th className="px-6 py-4">PROVIDER</th>
                    <th className="px-6 py-4">COMPLETED</th>
                    <th className="px-6 py-4">EXPIRY</th>
                    <th className="px-6 py-4">STATUS</th>
                    <th className="px-6 py-4">ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-50">
                    <td className="px-6 py-4 text-[#1a2642] font-medium">John Smith</td>
                    <td className="px-6 py-4 text-[#1a2642] flex items-center gap-2"><span className="text-gray-400">🎓</span> Security Guard Basic Training</td>
                    <td className="px-6 py-4 text-gray-500">Security Academy NL</td>
                    <td className="px-6 py-4 text-gray-600">2025-03-15</td>
                    <td className="px-6 py-4 text-gray-600">2027-03-15</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex px-2.5 py-0.5 bg-green-50 text-green-600 rounded-full text-[11px] font-medium items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-current"></span> Valid</span>
                    </td>
                    <td className="px-6 py-4">
                      <button onClick={() => setActiveModal("details")} className="px-3 py-1.5 border border-gray-200 rounded text-[12px] font-medium text-gray-600 hover:bg-gray-50 shadow-sm">View</button>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-50">
                    <td className="px-6 py-4 text-[#1a2642] font-medium">Sarah Johnson</td>
                    <td className="px-6 py-4 text-[#1a2642] flex items-center gap-2"><span className="text-gray-400">🎓</span> First Aid Level 3</td>
                    <td className="px-6 py-4 text-gray-500">Red Cross</td>
                    <td className="px-6 py-4 text-gray-600">2024-06-01</td>
                    <td className="px-6 py-4 text-red-600 font-medium">2026-06-01</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex px-2.5 py-0.5 bg-red-50 text-red-600 rounded-full text-[11px] font-medium items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-current"></span> Expired</span>
                    </td>
                    <td className="px-6 py-4">
                      <button onClick={() => setActiveModal("details")} className="px-3 py-1.5 border border-gray-200 rounded text-[12px] font-medium text-gray-600 hover:bg-gray-50 shadow-sm">View</button>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-50">
                    <td className="px-6 py-4 text-[#1a2642] font-medium">Tom Wilson</td>
                    <td className="px-6 py-4 text-[#1a2642] flex items-center gap-2"><span className="text-gray-400">🎓</span> Fire Safety & Prevention</td>
                    <td className="px-6 py-4 text-gray-500">VeiligheidNL</td>
                    <td className="px-6 py-4 text-gray-600">2025-11-20</td>
                    <td className="px-6 py-4 text-gray-600">2026-11-20</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex px-2.5 py-0.5 bg-green-50 text-green-600 rounded-full text-[11px] font-medium items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-current"></span> Valid</span>
                    </td>
                    <td className="px-6 py-4">
                      <button onClick={() => setActiveModal("details")} className="px-3 py-1.5 border border-gray-200 rounded text-[12px] font-medium text-gray-600 hover:bg-gray-50 shadow-sm">View</button>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-[#1a2642] font-medium">Mike Torres</td>
                    <td className="px-6 py-4 text-[#1a2642] flex items-center gap-2"><span className="text-gray-400">🎓</span> BHV – Bedrijfshulpverlening</td>
                    <td className="px-6 py-4 text-gray-500">BHV Centrum</td>
                    <td className="px-6 py-4 text-gray-600">2025-01-10</td>
                    <td className="px-6 py-4 text-orange-600 font-medium">2026-09-30</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex px-2.5 py-0.5 bg-orange-50 text-orange-600 rounded-full text-[11px] font-medium items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-current"></span> Expiring</span>
                    </td>
                    <td className="px-6 py-4">
                      <button onClick={() => setActiveModal("details")} className="px-3 py-1.5 border border-gray-200 rounded text-[12px] font-medium text-gray-600 hover:bg-gray-50 shadow-sm">View</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </main>

      {/* MODALS */}
      {activeModal !== "none" && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-[#1a2642]/60">
          
          {/* Add Training Record Modal */}
          {activeModal === "add" && (
            <div className="bg-white rounded-xl shadow-xl w-full max-w-[650px] animate-in fade-in zoom-in-95 duration-200">
              <div className="flex justify-between items-center p-6 border-b border-gray-100">
                <h3 className="text-[#1a2642] text-[20px] font-bold">Add Training Record</h3>
                <button onClick={() => setActiveModal("none")} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
              </div>
              <div className="p-6 space-y-6">
                
                <div>
                  <label className="block text-[#1a2642] text-[13px] font-medium mb-2">Employee</label>
                  <div className="relative">
                    <select className="w-full appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-[14px] text-[#1a2642] focus:outline-none">
                      <option>Select employee</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  </div>
                </div>

                <div>
                  <label className="block text-[#1a2642] text-[13px] font-medium mb-2">Course name</label>
                  <input type="text" placeholder="Security Guard Basic Training" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:border-[#f97316]" />
                </div>

                <div>
                  <label className="block text-[#1a2642] text-[13px] font-medium mb-2">Training provider</label>
                  <input type="text" placeholder="Security Academy NL" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:border-[#f97316]" />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[#1a2642] text-[13px] font-medium mb-2">Completion date</label>
                    <input type="date" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:border-[#f97316]" />
                  </div>
                  <div>
                    <label className="block text-[#1a2642] text-[13px] font-medium mb-2">Expiry date</label>
                    <input type="date" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:border-[#f97316]" />
                  </div>
                </div>

                <div className="pt-2 flex gap-3 justify-end">
                  <button onClick={() => setActiveModal("none")} className="px-6 py-2.5 border border-gray-200 bg-white rounded-lg text-[14px] font-medium text-gray-600 hover:bg-gray-50">
                    Cancel
                  </button>
                  <button className="px-6 py-2.5 bg-[#f97316] hover:bg-[#e06511] text-white rounded-lg text-[14px] font-medium">
                    Save Record
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Training Record Details Modal */}
          {activeModal === "details" && (
            <div className="bg-white rounded-xl shadow-xl w-full max-w-[650px] animate-in fade-in zoom-in-95 duration-200">
              <div className="flex justify-between items-center p-6 border-b border-gray-100">
                <h3 className="text-[#1a2642] text-[20px] font-bold">Training Record Details</h3>
                <button onClick={() => setActiveModal("none")} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
              </div>
              <div className="p-6">
                
                <div className="mb-6">
                  <h4 className="text-[#1a2642] text-[18px] font-bold mb-1">Security Guard Basic Training</h4>
                  <p className="text-gray-500 text-[14px]">John Smith</p>
                </div>

                <div className="space-y-4 text-[14px] border-b border-gray-100 pb-6 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Training provider</span>
                    <span className="text-[#1a2642] font-medium">Security Academy NL</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Completed</span>
                    <span className="text-[#1a2642] font-medium">2025-03-15</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Certificate expiry</span>
                    <span className="text-[#1a2642] font-medium">2027-03-15</span>
                  </div>
                </div>

                <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 flex justify-between items-center mb-6">
                  <span className="text-gray-500 text-[11px] font-bold tracking-wide uppercase">RECORD STATUS</span>
                  <span className="inline-flex px-2.5 py-1 bg-green-50 text-green-600 rounded-full text-[12px] font-medium items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-current"></span> Valid</span>
                </div>

                <button className="w-full py-2.5 border border-gray-200 rounded-lg text-[14px] font-medium text-[#1a2642] hover:bg-gray-50 transition-colors">
                  View Certificate
                </button>

              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
}
