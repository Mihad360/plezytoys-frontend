"use client";

import { useState } from "react";
import { Bell, X, ChevronDown } from "lucide-react";

const CHECKPOINTS = [
  { id: 1, name: "Main Entrance", scans: 2, employee: "ABC Facilities Ltd.", location: "ABC Headquarters", tag: "NFC-00124", validation: "10m radius", status: "Active" },
  { id: 2, name: "Parking Gate", scans: 0, employee: "ABC Facilities Ltd.", location: "ABC Headquarters", tag: "NFC-00125", validation: "10m radius", status: "Active" },
  { id: 3, name: "Mall Entrance", scans: 0, employee: "City Mall Ltd.", location: "City Mall Main", tag: "NFC-00201", validation: "15m radius", status: "Active" },
];

export default function NfcCheckpointsPage() {
  const [activeModal, setActiveModal] = useState<"none" | "add" | "edit" | "history" | "deactivate">("none");

  return (
    <div className="flex flex-col h-full bg-[#f8f9fa] relative">
      {/* Top Header */}
      <header className="h-[72px] bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0">
        <div>
          <p className="text-gray-400 text-[11px] font-medium tracking-wide uppercase mb-0.5">SHIFTPOINT • Operations • NFC Checkpoints</p>
          <h1 className="text-[#1a2642] text-[18px] font-bold leading-tight">NFC Checkpoints</h1>
        </div>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-4 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-[#1a2642] text-[13px] font-medium hover:bg-gray-100 transition-colors">
            <span className="text-[#f97316] text-[16px]">♛</span> Subscription Buying
          </button>
          <div className="relative">
            <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors">
              <Bell size={20} />
            </button>
            <div className="absolute top-0 right-0 w-4 h-4 bg-[#f97316] text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white">4</div>
          </div>
          <div className="w-10 h-10 rounded-full bg-[#f97316] flex items-center justify-center text-white font-bold text-sm">
            CA
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-8">
        <div className="max-w-[1400px] mx-auto">
          
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-[#1a2642] text-[24px] font-bold mb-1">NFC Checkpoints</h2>
              <p className="text-gray-500 text-[14px]">NFC scans verify checkpoints during an active shift; they do not clock employees in or out.</p>
            </div>
            <button 
              onClick={() => setActiveModal("add")}
              className="px-5 py-2.5 bg-[#f97316] hover:bg-[#e06511] text-white rounded-lg text-[14px] font-medium transition-colors"
            >
              + Add checkpoint
            </button>
          </div>

          <div className="bg-blue-50 text-blue-800 text-[13px] p-4 rounded-lg border border-blue-100 mb-8">
            Attendance clock-in/out and NFC verification are separate connected events. GPS supports validation; scans with missing, inaccurate, out-of-radius or wrong-assignment GPS are retained and flagged for review.
          </div>

          {/* Table Area */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-3">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13px]">
                <thead>
                  <tr className="border-b border-gray-100 text-gray-400 text-[10px] uppercase tracking-wider font-semibold">
                    <th className="px-6 py-4">CHECKPOINT</th>
                    <th className="px-4 py-4">EMPLOYEE</th>
                    <th className="px-4 py-4">LOCATION</th>
                    <th className="px-4 py-4">TAG ID</th>
                    <th className="px-4 py-4">VALIDATION</th>
                    <th className="px-4 py-4">STATUS</th>
                    <th className="px-6 py-4 text-right">ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {CHECKPOINTS.map((cp) => (
                    <tr key={cp.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors last:border-0">
                      <td className="px-6 py-4">
                        <p className="font-semibold text-[#1a2642] mb-0.5">{cp.name}</p>
                        <p className="text-gray-400 text-[11px]">{cp.scans} recorded scans</p>
                      </td>
                      <td className="px-4 py-4 text-[#1a2642]">{cp.employee}</td>
                      <td className="px-4 py-4 text-[#1a2642]">{cp.location}</td>
                      <td className="px-4 py-4">
                        <span className="px-2 py-1 bg-purple-50 text-purple-700 rounded text-[11px] font-mono font-bold">
                          {cp.tag}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-[#1a2642]">{cp.validation}</td>
                      <td className="px-4 py-4">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-green-50 text-green-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-current"></span> Active
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button 
                          onClick={() => setActiveModal("history")}
                          className="px-4 py-1.5 border border-gray-200 rounded-lg text-[12px] font-medium text-[#1a2642] hover:bg-gray-50"
                        >
                          View history
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {/* OVERLAYS */}
      {activeModal !== "none" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1a2642]/60 p-4">
          
          {/* Add / Edit Checkpoint Modal */}
          {(activeModal === "add" || activeModal === "edit") && (
            <div className="bg-white rounded-xl shadow-xl w-full max-w-[700px] max-h-[90vh] overflow-y-auto custom-scrollbar relative animate-in fade-in zoom-in-95 duration-200">
              <div className="sticky top-0 bg-white p-6 border-b border-gray-100 flex justify-between items-center z-10">
                <h2 className="text-[#1a2642] text-[20px] font-bold">
                  {activeModal === "edit" ? "Edit NFC checkpoint" : "Add NFC checkpoint"}
                </h2>
                <button onClick={() => setActiveModal("none")} className="text-gray-400 hover:text-gray-600"><X size={24} /></button>
              </div>
              
              <div className="p-8 space-y-6 pb-2">
                <div>
                  <label className="block text-[#1a2642] text-[13px] font-medium mb-2">Checkpoint name</label>
                  <input type="text" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:border-[#f97316]" />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[#1a2642] text-[13px] font-medium mb-2">Customer</label>
                    <div className="relative">
                      <select className="w-full appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-[14px] text-[#1a2642] focus:outline-none focus:border-[#f97316]">
                        <option>Select customer</option>
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[#1a2642] text-[13px] font-medium mb-2">Location</label>
                    <div className="relative">
                      <select className="w-full appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-[14px] text-[#1a2642] focus:outline-none focus:border-[#f97316]">
                        <option>Select location</option>
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[#1a2642] text-[13px] font-medium mb-2">NFC Tag ID</label>
                  <input type="text" placeholder="Enter the unique physical Tag ID" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:border-[#f97316]" />
                  <p className="text-gray-400 text-[11px] mt-2 mb-3">Manual Tag ID entry is supported and validated against every active checkpoint.</p>
                  <button className="px-4 py-1.5 border border-gray-200 rounded-lg text-[12px] font-medium text-[#1a2642] hover:bg-gray-50">
                    Register by mobile-app scan
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[#1a2642] text-[13px] font-medium mb-2">Latitude</label>
                    <input type="text" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:border-[#f97316]" />
                  </div>
                  <div>
                    <label className="block text-[#1a2642] text-[13px] font-medium mb-2">Longitude</label>
                    <input type="text" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:border-[#f97316]" />
                  </div>
                </div>

                <div>
                  <label className="block text-[#1a2642] text-[13px] font-medium mb-2">Validation radius (m)</label>
                  <input type="text" defaultValue="10" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:border-[#f97316]" />
                </div>

                <div>
                  <label className="block text-[#1a2642] text-[13px] font-medium mb-2">Instructions</label>
                  <textarea rows={4} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:border-[#f97316] resize-none"></textarea>
                </div>
              </div>

              <div className="sticky bottom-0 bg-white p-6 border-t border-gray-100 flex justify-end gap-3 z-10">
                <button onClick={() => setActiveModal("none")} className="px-5 py-2.5 border border-gray-200 rounded-lg text-[14px] font-medium text-gray-600 hover:bg-gray-50">
                  Cancel
                </button>
                <button className="px-6 py-2.5 bg-[#f97316] text-white rounded-lg text-[14px] font-medium hover:bg-[#e06511]">
                  {activeModal === "edit" ? "Update checkpoint" : "Add checkpoint"}
                </button>
              </div>
            </div>
          )}

          {/* History Modal */}
          {activeModal === "history" && (
            <div className="bg-white rounded-xl shadow-xl w-full max-w-[800px] overflow-hidden relative animate-in fade-in zoom-in-95 duration-200 z-10">
              <div className="p-8 pb-6 border-b border-gray-100 flex justify-between items-start">
                <h2 className="text-[#1a2642] text-[20px] font-bold">Checkpoint & scan history</h2>
                <button onClick={() => setActiveModal("none")} className="text-gray-400 hover:text-gray-600"><X size={24} /></button>
              </div>

              <div className="p-8 pb-4">
                <div className="bg-[#1a2642] rounded-xl p-6 text-white mb-8 flex justify-between items-start">
                  <div>
                    <p className="text-[#f97316] text-[11px] font-bold tracking-wide font-mono mb-2">NFC-00124</p>
                    <h3 className="text-[20px] font-bold mb-1">Main Entrance</h3>
                    <p className="text-gray-300 text-[13px]">ABC Facilities Ltd. · ABC Headquarters · GPS 52.3676, 4.9041</p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-medium bg-green-100 text-green-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-current"></span> Active
                  </span>
                </div>

                <div className="flex justify-between items-end mb-4">
                  <h4 className="text-[#1a2642] text-[14px] font-bold">Complete scan history</h4>
                  <p className="text-gray-400 text-[12px]">All scan exceptions are retained for review</p>
                </div>

                <div className="space-y-3">
                  {/* Scan 1 */}
                  <div className="border border-gray-100 rounded-xl p-4 flex items-center justify-between shadow-sm">
                    <div className="w-[180px]">
                      <p className="text-[#1a2642] font-semibold text-[13px] mb-0.5">John Smith</p>
                      <p className="text-gray-400 text-[12px]">05 Sep 2026 · 08:12</p>
                    </div>
                    <div className="w-[180px]">
                      <p className="text-gray-400 text-[11px] uppercase mb-0.5">GPS</p>
                      <p className="text-[#1a2642] text-[12px]">52.36761, 4.90403 · ±8m</p>
                    </div>
                    <div className="w-[100px]">
                      <p className="text-gray-400 text-[11px] uppercase mb-0.5">Device</p>
                      <p className="text-[#1a2642] text-[12px]">iPhone 15</p>
                    </div>
                    <div className="w-[80px]">
                      <p className="text-gray-400 text-[11px] uppercase mb-0.5">Sync</p>
                      <p className="text-green-500 text-[12px]">Synced</p>
                    </div>
                    <div className="w-[100px] text-right">
                      <span className="inline-flex px-3 py-1 bg-green-50 text-green-700 rounded-full text-[11px] font-bold">Verified</span>
                    </div>
                  </div>

                  {/* Scan 2 */}
                  <div className="border border-gray-100 rounded-xl p-4 flex items-center justify-between shadow-sm">
                    <div className="w-[180px]">
                      <p className="text-[#1a2642] font-semibold text-[13px] mb-0.5">Mike Torres</p>
                      <p className="text-gray-400 text-[12px]">04 Sep 2026 · 22:08</p>
                    </div>
                    <div className="w-[180px]">
                      <p className="text-gray-400 text-[11px] uppercase mb-0.5">GPS</p>
                      <p className="text-red-500 text-[12px]">Missing · —</p>
                    </div>
                    <div className="w-[100px]">
                      <p className="text-gray-400 text-[11px] uppercase mb-0.5">Device</p>
                      <p className="text-[#1a2642] text-[12px]">Android</p>
                    </div>
                    <div className="w-[80px]">
                      <p className="text-gray-400 text-[11px] uppercase mb-0.5">Sync</p>
                      <p className="text-green-500 text-[12px]">Synced</p>
                    </div>
                    <div className="w-[100px] text-right">
                      <span className="inline-flex px-3 py-1 bg-red-50 text-red-600 rounded-full text-[11px] font-bold text-center leading-tight">No GPS · Outside<br/>active shift</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 pt-4 flex gap-3 justify-end border-t border-gray-100">
                <button 
                  onClick={() => setActiveModal("edit")}
                  className="px-5 py-2.5 border border-gray-200 rounded-lg text-[14px] font-medium text-[#1a2642] hover:bg-gray-50"
                >
                  Edit / replace tag
                </button>
                <button 
                  onClick={() => setActiveModal("deactivate")}
                  className="px-5 py-2.5 bg-red-50 text-red-600 border border-transparent rounded-lg text-[14px] font-medium hover:bg-red-100"
                >
                  Deactivate tag
                </button>
              </div>
            </div>
          )}

          {/* Deactivate Modal */}
          {activeModal === "deactivate" && (
            <div className="absolute inset-0 z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-xl shadow-xl w-full max-w-[500px] animate-in fade-in zoom-in-95 duration-200 p-8 z-20">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-[#1a2642] text-[20px] font-bold">Deactivate NFC tag</h3>
                  <button onClick={() => setActiveModal("history")} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
                </div>

                <p className="text-gray-600 text-[14px] leading-relaxed mb-8">
                  This stops new scans for <span className="font-bold text-[#1a2642]">NFC-00124</span>. All historical scans remain available for review and the tag deactivation is recorded in the audit log.
                </p>

                <div className="flex justify-end gap-3">
                  <button onClick={() => setActiveModal("history")} className="px-6 py-2.5 border border-gray-200 rounded-lg text-[14px] font-medium text-gray-600 hover:bg-gray-50">
                    Cancel
                  </button>
                  <button className="px-6 py-2.5 bg-red-50 text-red-600 rounded-lg text-[14px] font-medium hover:bg-red-100">
                    Deactivate tag
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
