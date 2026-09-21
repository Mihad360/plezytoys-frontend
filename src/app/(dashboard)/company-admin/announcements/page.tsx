"use client";

import { Bell, X } from "lucide-react";
import { useState } from "react";

export default function AnnouncementsPage() {
  const [activeModal, setActiveModal] = useState<"none" | "create" | "view" | "edit">("none");

  return (
    <div className="flex flex-col h-full bg-[#f8f9fa] relative">
      {/* Top Header */}
      <header className="h-[72px] bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0">
        <div>
          <p className="text-gray-400 text-[11px] font-medium tracking-wide uppercase mb-0.5">SHIFTPOINT • Communication • Announcements</p>
          <h1 className="text-[#1a2642] text-[18px] font-bold leading-tight">News & Announcements</h1>
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
        <div className="max-w-[1200px] mx-auto">
          
          <div className="flex justify-between items-start mb-8">
            <div>
              <h2 className="text-[#1a2642] text-[24px] font-bold mb-1">News & Announcements</h2>
              <p className="text-gray-500 text-[14px]">Communicate important updates to your team.</p>
            </div>
            <button 
              onClick={() => setActiveModal("create")}
              className="px-5 py-2.5 bg-[#d97706] hover:bg-[#b45f06] text-white rounded-lg text-[14px] font-medium transition-colors"
            >
              + Create Announcement
            </button>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <table className="w-full text-left text-[13px]">
              <thead>
                <tr className="bg-gray-50/50 text-gray-400 text-[10px] uppercase tracking-wider font-semibold border-b border-gray-100">
                  <th className="px-6 py-4">ANNOUNCEMENT</th>
                  <th className="px-6 py-4">AUDIENCE</th>
                  <th className="px-6 py-4">STATUS</th>
                  <th className="px-6 py-4">PUBLISHED / SAVED</th>
                  <th className="px-6 py-4">READS</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-50">
                  <td className="px-6 py-5">
                    <button onClick={() => setActiveModal("view")} className="text-[#1a2642] font-semibold text-[14px] hover:underline text-left block mb-1">
                      📢 Updated Safety Procedure
                    </button>
                    <p className="text-orange-500 text-[11px] font-medium">ANN-104</p>
                  </td>
                  <td className="px-6 py-5 text-gray-600">All employees</td>
                  <td className="px-6 py-5">
                    <span className="inline-flex px-2.5 py-1 bg-green-50 text-green-600 rounded-full text-[11px] font-medium">Published</span>
                  </td>
                  <td className="px-6 py-5 text-gray-600">10 Sep 2026 · 08:00 CEST</td>
                  <td className="px-6 py-5 text-gray-600">38 / 48</td>
                  <td className="px-6 py-5 text-right space-x-2">
                    <button className="px-4 py-2 border border-gray-200 rounded-lg text-[12px] font-medium text-gray-600 hover:bg-gray-50 shadow-sm">View</button>
                  </td>
                </tr>
                <tr className="border-b border-gray-50">
                  <td className="px-6 py-5">
                    <button onClick={() => setActiveModal("view")} className="text-[#1a2642] font-semibold text-[14px] hover:underline text-left block mb-1">
                      📢 October team briefing
                    </button>
                    <p className="text-orange-500 text-[11px] font-medium">ANN-103</p>
                  </td>
                  <td className="px-6 py-5 text-gray-600">Managers</td>
                  <td className="px-6 py-5">
                    <span className="inline-flex px-2.5 py-1 bg-gray-100 text-gray-600 rounded-full text-[11px] font-medium">Draft</span>
                  </td>
                  <td className="px-6 py-5 text-gray-600">Saved 09 Sep 2026</td>
                  <td className="px-6 py-5 text-gray-400">—</td>
                  <td className="px-6 py-5 text-right space-x-2">
                    <button className="px-4 py-2 border border-gray-200 rounded-lg text-[12px] font-medium text-gray-600 hover:bg-gray-50 shadow-sm">View</button>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-5">
                    <button onClick={() => setActiveModal("view")} className="text-[#1a2642] font-semibold text-[14px] hover:underline text-left block mb-1">
                      📢 Rotterdam access update
                    </button>
                    <p className="text-orange-500 text-[11px] font-medium">ANN-102</p>
                  </td>
                  <td className="px-6 py-5 text-gray-600">Rotterdam Office</td>
                  <td className="px-6 py-5">
                    <span className="inline-flex px-2.5 py-1 bg-green-50 text-green-600 rounded-full text-[11px] font-medium">Published</span>
                  </td>
                  <td className="px-6 py-5 text-gray-600">08 Sep 2026 · 13:30 CEST</td>
                  <td className="px-6 py-5 text-gray-600">8 / 9</td>
                  <td className="px-6 py-5 text-right space-x-2">
                    <button className="px-4 py-2 border border-gray-200 rounded-lg text-[12px] font-medium text-gray-600 hover:bg-gray-50 shadow-sm">View</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>
      </main>

      {/* MODALS */}
      {activeModal !== "none" && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-[#1a2642]/60 overflow-y-auto">
          
          {/* Create Announcement Modal */}
          {activeModal === "create" && (
            <div className="bg-white rounded-xl shadow-xl w-full max-w-[750px] animate-in fade-in zoom-in-95 duration-200 my-8">
              <div className="flex justify-between items-center p-6 border-b border-gray-100">
                <div>
                  <h3 className="text-[#1a2642] text-[20px] font-bold mb-1">Create Announcement</h3>
                  <p className="text-gray-500 text-[13px]">Only authorised company recipients can receive and view this announcement.</p>
                </div>
                <button onClick={() => setActiveModal("none")} className="text-gray-400 hover:text-gray-600 self-start"><X size={20} /></button>
              </div>
              
              <div className="p-8 space-y-6">
                <div>
                  <label className="block text-[#1a2642] text-[13px] font-medium mb-2">Title</label>
                  <input type="text" placeholder="Updated Safety Procedure" className="w-full px-4 py-3 border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:border-[#f97316]" />
                </div>
                
                <div>
                  <label className="block text-[#1a2642] text-[13px] font-medium mb-2">Message</label>
                  <textarea rows={4} placeholder="Please review the updated emergency response procedure before your next shift." className="w-full px-4 py-3 border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:border-[#f97316] resize-none"></textarea>
                </div>

                <div>
                  <label className="block text-[#1a2642] text-[13px] font-medium mb-2">Recipients</label>
                  <p className="text-gray-500 text-[13px] mb-4">Choose one targeting method, then select the authorised recipient group or people.</p>
                  
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <button className="px-4 py-3 text-left border border-orange-200 bg-orange-50 text-[#d97706] rounded-lg text-[14px] font-medium">Entire company</button>
                    <button className="px-4 py-3 text-left border border-gray-200 text-gray-600 hover:bg-gray-50 rounded-lg text-[14px]">Specific roles</button>
                    <button className="px-4 py-3 text-left border border-gray-200 text-gray-600 hover:bg-gray-50 rounded-lg text-[14px]">One or more teams</button>
                    <button className="px-4 py-3 text-left border border-gray-200 text-gray-600 hover:bg-gray-50 rounded-lg text-[14px]">Customer assignment</button>
                    <button className="px-4 py-3 text-left border border-gray-200 text-gray-600 hover:bg-gray-50 rounded-lg text-[14px]">Location assignment</button>
                    <button className="px-4 py-3 text-left border border-gray-200 text-gray-600 hover:bg-gray-50 rounded-lg text-[14px]">Selected users</button>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-5 bg-gray-50/50">
                    <p className="text-gray-400 text-[10px] font-bold tracking-wide uppercase mb-3">SELECT AUTHORISED ENTIRE COMPANY</p>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="radio" name="company" defaultChecked className="w-4 h-4 text-[#f97316] border-gray-300 focus:ring-[#f97316]" />
                      <span className="text-[#1a2642] text-[14px]">All 54 authorised company members</span>
                    </label>
                  </div>
                  <p className="text-gray-400 text-[12px] mt-3">Selected: No recipients selected</p>
                </div>
              </div>

              <div className="p-6 border-t border-gray-100 flex justify-end gap-3 bg-gray-50 rounded-b-xl">
                <button onClick={() => setActiveModal("none")} className="px-6 py-2.5 border border-gray-200 bg-white rounded-lg text-[14px] font-medium text-gray-600 hover:bg-gray-50">
                  Cancel
                </button>
                <button className="px-6 py-2.5 border border-gray-200 bg-white rounded-lg text-[14px] font-medium text-gray-600 hover:bg-gray-50">
                  Save as Draft
                </button>
                <button className="px-6 py-2.5 bg-[#f97316]/40 text-white rounded-lg text-[14px] font-medium cursor-not-allowed">
                  Publish Announcement
                </button>
              </div>
            </div>
          )}

          {/* Edit Announcement Modal */}
          {activeModal === "edit" && (
            <div className="bg-white rounded-xl shadow-xl w-full max-w-[750px] animate-in fade-in zoom-in-95 duration-200 my-8">
              <div className="flex justify-between items-center p-6 border-b border-gray-100">
                <div>
                  <h3 className="text-[#1a2642] text-[20px] font-bold mb-1">Edit Announcement</h3>
                  <p className="text-gray-500 text-[13px]">Only authorised company recipients can receive and view this announcement.</p>
                </div>
                <button onClick={() => setActiveModal("none")} className="text-gray-400 hover:text-gray-600 self-start"><X size={20} /></button>
              </div>
              
              <div className="p-8 space-y-6">
                <div>
                  <label className="block text-[#1a2642] text-[13px] font-medium mb-2">Title</label>
                  <input type="text" defaultValue="Updated Safety Procedure" className="w-full px-4 py-3 border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:border-[#f97316]" />
                </div>
                
                <div>
                  <label className="block text-[#1a2642] text-[13px] font-medium mb-2">Message</label>
                  <textarea rows={4} defaultValue="Please review the updated emergency response procedure before your next shift." className="w-full px-4 py-3 border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:border-[#f97316] resize-none"></textarea>
                </div>

                <div>
                  <label className="block text-[#1a2642] text-[13px] font-medium mb-2">Recipients</label>
                  <p className="text-gray-500 text-[13px] mb-4">Choose one targeting method, then select the authorised recipient group or people.</p>
                  
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <button className="px-4 py-3 text-left border border-orange-200 bg-orange-50 text-[#d97706] rounded-lg text-[14px] font-medium">Entire company</button>
                    <button className="px-4 py-3 text-left border border-gray-200 text-gray-600 hover:bg-gray-50 rounded-lg text-[14px]">Specific roles</button>
                    <button className="px-4 py-3 text-left border border-gray-200 text-gray-600 hover:bg-gray-50 rounded-lg text-[14px]">One or more teams</button>
                    <button className="px-4 py-3 text-left border border-gray-200 text-gray-600 hover:bg-gray-50 rounded-lg text-[14px]">Customer assignment</button>
                    <button className="px-4 py-3 text-left border border-gray-200 text-gray-600 hover:bg-gray-50 rounded-lg text-[14px]">Location assignment</button>
                    <button className="px-4 py-3 text-left border border-gray-200 text-gray-600 hover:bg-gray-50 rounded-lg text-[14px]">Selected users</button>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-5 bg-gray-50/50">
                    <p className="text-gray-400 text-[10px] font-bold tracking-wide uppercase mb-3">SELECT AUTHORISED ENTIRE COMPANY</p>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="radio" name="company" defaultChecked className="w-4 h-4 text-[#f97316] border-gray-300 focus:ring-[#f97316]" />
                      <span className="text-[#1a2642] text-[14px]">All 54 authorised company members</span>
                    </label>
                  </div>
                  <p className="text-gray-400 text-[12px] mt-3">Selected: No recipients selected</p>
                </div>
              </div>

              <div className="p-6 border-t border-gray-100 flex justify-end gap-3 bg-gray-50 rounded-b-xl">
                <button onClick={() => setActiveModal("none")} className="px-6 py-2.5 border border-gray-200 bg-white rounded-lg text-[14px] font-medium text-gray-600 hover:bg-gray-50">
                  Cancel
                </button>
                <button className="px-6 py-2.5 border border-gray-200 bg-white rounded-lg text-[14px] font-medium text-gray-600 hover:bg-gray-50">
                  Save as Draft
                </button>
                <button className="px-6 py-2.5 bg-[#f97316] hover:bg-[#e06511] text-white rounded-lg text-[14px] font-medium transition-colors">
                  Update Announcement
                </button>
              </div>
            </div>
          )}

          {/* View Announcement Modal */}
          {activeModal === "view" && (
            <div className="bg-white rounded-xl shadow-xl w-full max-w-[750px] animate-in fade-in zoom-in-95 duration-200 my-8">
              <div className="flex justify-between items-center p-6 border-b border-gray-100">
                <div>
                  <p className="text-orange-500 text-[12px] font-bold mb-1">ANN-104</p>
                  <h3 className="text-[#1a2642] text-[24px] font-bold">Updated Safety Procedure</h3>
                </div>
                <button onClick={() => setActiveModal("none")} className="text-gray-400 hover:text-gray-600 self-start"><X size={20} /></button>
              </div>
              
              <div className="p-8 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-5">
                    <p className="text-gray-400 text-[11px] font-bold tracking-wide uppercase mb-1">STATUS</p>
                    <p className="text-[#1a2642] font-medium">Published</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-5">
                    <p className="text-gray-400 text-[11px] font-bold tracking-wide uppercase mb-1">AUDIENCE</p>
                    <p className="text-[#1a2642] font-medium">All employees</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-5">
                    <p className="text-gray-400 text-[11px] font-bold tracking-wide uppercase mb-1">PUBLISHED / SAVED</p>
                    <p className="text-[#1a2642] font-medium">10 Sep 2026 · 08:00 CEST</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-5">
                    <p className="text-gray-400 text-[11px] font-bold tracking-wide uppercase mb-1">DELIVERY</p>
                    <p className="text-[#1a2642] font-medium">48 authorised recipients</p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <p className="text-gray-400 text-[11px] font-bold tracking-wide uppercase mb-2">MESSAGE</p>
                  <p className="text-[#1a2642] text-[14px] leading-relaxed">
                    Please review the updated emergency response procedure before your next shift.
                  </p>
                </div>

                <div>
                  <p className="text-[#1a2642] text-[14px] font-medium mb-1">Read activity</p>
                  <p className="text-gray-500 text-[13px]">Read by 38 of 48 authorised recipients. Recipient visibility is limited to the selected company scope.</p>
                </div>
              </div>

              <div className="p-6 border-t border-gray-100 flex justify-end bg-gray-50 rounded-b-xl">
                <button onClick={() => setActiveModal("none")} className="px-8 py-2.5 bg-[#f97316] hover:bg-[#e06511] text-white rounded-lg text-[14px] font-medium transition-colors">
                  Close
                </button>
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
}
