"use client";

import { Bell, ChevronDown, X } from "lucide-react";
import { useState } from "react";

export default function KnowledgeSourcesPage() {
  const [activeModal, setActiveModal] = useState<"none" | "add" | "view" | "edit">("none");

  return (
    <div className="flex flex-col h-full bg-[#f8f9fa] relative">
      {/* Top Header */}
      <header className="h-[72px] bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0">
        <div>
          <p className="text-gray-400 text-[11px] font-medium tracking-wide uppercase mb-0.5">SHIFTPOINT • AI Knowledge</p>
          <h1 className="text-[#1a2642] text-[18px] font-bold leading-tight">Knowledge Sources</h1>
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
              <h2 className="text-[#1a2642] text-[24px] font-bold mb-1">Company AI Knowledge</h2>
              <p className="text-gray-500 text-[14px]">Manage the approved information your AI assistant uses to answer questions.</p>
            </div>
            <button 
              onClick={() => setActiveModal("add")}
              className="px-5 py-2.5 bg-[#d97706] hover:bg-[#b45f06] text-white rounded-lg text-[14px] font-medium transition-colors"
            >
              + Add Knowledge Source
            </button>
          </div>

          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
              <p className="text-gray-400 text-[10px] font-bold tracking-[0.05em] uppercase mb-2">APPROVED</p>
              <p className="text-[#1a2642] font-medium text-[28px] leading-none mb-2">1</p>
              <p className="text-gray-500 text-[12px]">Available to AI</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
              <p className="text-gray-400 text-[10px] font-bold tracking-[0.05em] uppercase mb-2">PROCESSING</p>
              <p className="text-[#1a2642] font-medium text-[28px] leading-none mb-2">1</p>
              <p className="text-gray-500 text-[12px]">Not used by AI</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
              <p className="text-gray-400 text-[10px] font-bold tracking-[0.05em] uppercase mb-2">FAILED</p>
              <p className="text-[#1a2642] font-medium text-[28px] leading-none mb-2">1</p>
              <p className="text-gray-500 text-[12px]">Not used by AI</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
              <p className="text-gray-400 text-[10px] font-bold tracking-[0.05em] uppercase mb-2">ARCHIVED</p>
              <p className="text-[#1a2642] font-medium text-[28px] leading-none mb-2">1</p>
              <p className="text-gray-500 text-[12px]">Not used by AI</p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-gray-100 flex justify-between items-center">
              <div>
                <h3 className="text-[#1a2642] font-bold text-[16px] mb-1">Knowledge sources</h3>
                <p className="text-gray-500 text-[13px]">Only the current Approved version is used. Replaced and archived versions are retained in history.</p>
              </div>
              <input 
                type="text" 
                placeholder="Search sources..." 
                className="w-[250px] px-4 py-2 border border-gray-200 rounded-lg text-[13px] focus:outline-none focus:border-[#f97316]"
              />
            </div>
            <table className="w-full text-left text-[13px]">
              <thead>
                <tr className="bg-gray-50/50 text-gray-400 text-[10px] uppercase tracking-wider font-semibold border-b border-gray-100">
                  <th className="px-6 py-4">SOURCE</th>
                  <th className="px-6 py-4">TYPE</th>
                  <th className="px-6 py-4">VERSION</th>
                  <th className="px-6 py-4">UPDATED</th>
                  <th className="px-6 py-4">OWNER</th>
                  <th className="px-6 py-4">STATUS</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-50">
                  <td className="px-6 py-4">
                    <button onClick={() => setActiveModal("view")} className="text-[#1a2642] font-semibold text-[14px] hover:underline text-left block mb-1">
                      Company safety handbook
                    </button>
                    <p className="text-orange-500 text-[11px] font-medium">KS-012 · ABC Security Ltd.</p>
                  </td>
                  <td className="px-6 py-4 text-gray-600">PDF</td>
                  <td className="px-6 py-4 text-gray-600">v3</td>
                  <td className="px-6 py-4 text-gray-600">10 Sep 2026 · 09:42 CEST</td>
                  <td className="px-6 py-4 text-gray-600">Company Admin</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex px-2.5 py-1 bg-green-50 text-green-600 rounded-full text-[11px] font-medium">Approved</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="px-4 py-2 border border-gray-200 rounded-lg text-[12px] font-medium text-gray-600 hover:bg-gray-50 shadow-sm">View</button>
                  </td>
                </tr>
                <tr className="border-b border-gray-50">
                  <td className="px-6 py-4">
                    <button onClick={() => setActiveModal("view")} className="text-[#1a2642] font-semibold text-[14px] hover:underline text-left block mb-1">
                      Rotterdam site procedures
                    </button>
                    <p className="text-orange-500 text-[11px] font-medium">KS-011 · ABC Security Ltd.</p>
                  </td>
                  <td className="px-6 py-4 text-gray-600">Document set</td>
                  <td className="px-6 py-4 text-gray-600">v2</td>
                  <td className="px-6 py-4 text-gray-600">09 Sep 2026 · 16:20 CEST</td>
                  <td className="px-6 py-4 text-gray-600">Maria Janssen</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex px-2.5 py-1 bg-blue-50 text-blue-600 rounded-full text-[11px] font-medium">Processing</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="px-4 py-2 border border-gray-200 rounded-lg text-[12px] font-medium text-gray-600 hover:bg-gray-50 shadow-sm">View</button>
                  </td>
                </tr>
                <tr className="border-b border-gray-50">
                  <td className="px-6 py-4">
                    <button onClick={() => setActiveModal("view")} className="text-[#1a2642] font-semibold text-[14px] hover:underline text-left block mb-1">
                      Emergency contact list
                    </button>
                    <p className="text-orange-500 text-[11px] font-medium">KS-010 · ABC Security Ltd.</p>
                  </td>
                  <td className="px-6 py-4 text-gray-600">Spreadsheet</td>
                  <td className="px-6 py-4 text-gray-600">v1</td>
                  <td className="px-6 py-4 text-gray-600">08 Sep 2026 · 11:05 CEST</td>
                  <td className="px-6 py-4 text-gray-600">Company Admin</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex px-2.5 py-1 bg-red-50 text-red-600 rounded-full text-[11px] font-medium">Failed</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="px-4 py-2 border border-gray-200 rounded-lg text-[12px] font-medium text-gray-600 hover:bg-gray-50 shadow-sm">View</button>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4">
                    <button onClick={() => setActiveModal("view")} className="text-[#1a2642] font-semibold text-[14px] hover:underline text-left block mb-1">
                      Legacy first aid guidance
                    </button>
                    <p className="text-orange-500 text-[11px] font-medium">KS-007 · ABC Security Ltd.</p>
                  </td>
                  <td className="px-6 py-4 text-gray-600">PDF</td>
                  <td className="px-6 py-4 text-gray-600">v1</td>
                  <td className="px-6 py-4 text-gray-600">01 Aug 2026 · 10:00 CEST</td>
                  <td className="px-6 py-4 text-gray-600">Company Admin</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex px-2.5 py-1 bg-gray-100 text-gray-600 rounded-full text-[11px] font-medium">Archived</span>
                  </td>
                  <td className="px-6 py-4 text-right">
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
          
          {/* Add / Edit Knowledge Source Modal */}
          {(activeModal === "add" || activeModal === "edit") && (
            <div className="bg-white rounded-xl shadow-xl w-full max-w-[650px] animate-in fade-in zoom-in-95 duration-200">
              <div className="flex justify-between items-center p-6 border-b border-gray-100">
                <div>
                  <h3 className="text-[#1a2642] text-[20px] font-bold mb-1">
                    {activeModal === "add" ? "Add knowledge source" : "Edit knowledge source"}
                  </h3>
                  <p className="text-gray-500 text-[13px]">
                    This source stays tenant-isolated and enters Processing when saved. It can only be used by AI after successful processing and approval.
                  </p>
                </div>
                <button onClick={() => setActiveModal("none")} className="text-gray-400 hover:text-gray-600 self-start"><X size={20} /></button>
              </div>
              
              <div className="p-8 space-y-6">
                <input 
                  type="text" 
                  placeholder="Source name" 
                  defaultValue={activeModal === "edit" ? "Employee Handbook" : ""}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:border-[#f97316]" 
                />
                
                <div className="border border-dashed border-gray-300 rounded-xl p-8 flex items-center justify-center text-center">
                  <p className="text-gray-500 text-[14px]">Drop approved company material here or browse</p>
                </div>

                <div className="relative">
                  <select className="w-full appearance-none bg-white border border-gray-200 rounded-lg px-4 py-3 text-[14px] text-[#1a2642] focus:outline-none">
                    <option>Specific roles</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                </div>

                <div className="border border-gray-200 rounded-lg p-5 bg-white">
                  <p className="text-gray-400 text-[10px] font-bold tracking-wide uppercase mb-4">SELECT PERMITTED SPECIFIC ROLES</p>
                  <div className="grid grid-cols-2 gap-4">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-[#f97316] border-gray-300 focus:ring-[#f97316]" />
                      <span className="text-[#1a2642] text-[14px]">Managers</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-[#f97316] border-gray-300 focus:ring-[#f97316]" />
                      <span className="text-[#1a2642] text-[14px]">Employees</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-[#f97316] border-gray-300 focus:ring-[#f97316]" />
                      <span className="text-[#1a2642] text-[14px]">Company Admins</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-gray-100 flex justify-between items-center bg-gray-50 rounded-b-xl">
                <p className="text-gray-500 text-[12px] max-w-[250px]">Only permitted users in this company can access an approved source.</p>
                <button className="px-6 py-2.5 bg-[#f97316]/50 text-white rounded-lg text-[14px] font-medium cursor-not-allowed">
                  {activeModal === "add" ? "Add for processing" : "Update processing"}
                </button>
              </div>
            </div>
          )}

          {/* View Details Modal */}
          {activeModal === "view" && (
            <div className="bg-white rounded-xl shadow-xl w-full max-w-[700px] animate-in fade-in zoom-in-95 duration-200">
              <div className="flex justify-between items-center p-6 border-b border-gray-100">
                <div>
                  <p className="text-orange-500 text-[12px] font-bold mb-1">KS-012 · v3</p>
                  <h3 className="text-[#1a2642] text-[24px] font-bold">Company safety handbook</h3>
                </div>
                <button onClick={() => setActiveModal("none")} className="text-gray-400 hover:text-gray-600 self-start"><X size={20} /></button>
              </div>
              
              <div className="p-8 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-5">
                    <p className="text-gray-400 text-[11px] font-bold tracking-wide uppercase mb-1">TENANT</p>
                    <p className="text-[#1a2642] font-medium text-[13px]">ABC Security Ltd. only</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-5">
                    <p className="text-gray-400 text-[11px] font-bold tracking-wide uppercase mb-1">AI AVAILABILITY</p>
                    <p className="text-[#1a2642] font-medium text-[13px]">Approved current version only</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-5">
                    <p className="text-gray-400 text-[11px] font-bold tracking-wide uppercase mb-1">ACCESS LEVEL</p>
                    <p className="text-[#1a2642] font-medium text-[13px]">All company users</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-5">
                    <p className="text-gray-400 text-[11px] font-bold tracking-wide uppercase mb-1">SELECTED RECIPIENTS</p>
                    <p className="text-[#1a2642] font-medium text-[13px]">All ABC Security Ltd. users</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-5">
                    <p className="text-gray-400 text-[11px] font-bold tracking-wide uppercase mb-1">SOURCE VERSION</p>
                    <p className="text-[#1a2642] font-medium text-[13px]">v3</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-5">
                    <p className="text-gray-400 text-[11px] font-bold tracking-wide uppercase mb-1">LAST UPDATE</p>
                    <p className="text-[#1a2642] font-medium text-[13px]">10 Sep 2026 · 09:42 CEST by Company Admin</p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-5 mt-4">
                  <p className="text-gray-400 text-[11px] font-bold tracking-wide uppercase mb-3">VERSION & AUDIT HISTORY</p>
                  <div className="space-y-3 text-[13px] text-gray-600">
                    <p>10 Sep 2026 · 09:42 CEST — Company Admin uploaded v3</p>
                    <p>10 Sep 2026 · 09:46 CEST — Company Admin approved v3 for Company AI</p>
                    <p>10 Sep 2026 · 09:46 CEST — v2 was withdrawn from AI retrieval and retained as replaced</p>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-gray-100 flex justify-end gap-3 bg-white rounded-b-xl">
                <button 
                  onClick={() => setActiveModal("edit")}
                  className="px-5 py-2.5 border border-gray-200 rounded-lg text-[14px] font-medium text-gray-600 hover:bg-gray-50"
                >
                  Edit knowledge
                </button>
                <button className="px-5 py-2.5 border border-gray-200 rounded-lg text-[14px] font-medium text-gray-600 hover:bg-gray-50">
                  Replace source
                </button>
                <button className="px-5 py-2.5 border border-red-200 text-red-600 rounded-lg text-[14px] font-medium hover:bg-red-50">
                  Archive source
                </button>
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
}
