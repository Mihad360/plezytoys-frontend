"use client";

import { Bell, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const REPORTS_DATA = [
  { 
    name: "Daily Operations Report", submitter: "John Smith", customer: "ABC Facilities Ltd.", 
    location: "ABC HQ", date: "Sep 3, 2026 10:30 PM", status: "Under Review", 
    statusColor: "bg-orange-50 text-orange-600", reviewer: "David Brown"
  },
  { 
    name: "Night Patrol Report", submitter: "Sarah Johnson", customer: "City Mall Ltd.", 
    location: "City Mall Main", date: "Sep 3, 2026 08:15 AM", status: "Approved", 
    statusColor: "bg-green-50 text-green-600", reviewer: "Emily Chen"
  },
  { 
    name: "Incident Report", submitter: "Tom Wilson", customer: "LogiCo Warehousing", 
    location: "Warehouse Zone A", date: "Sep 2, 2026 11:45 PM", status: "Returned", 
    statusColor: "bg-yellow-50 text-yellow-700", reviewer: "David Brown"
  },
  { 
    name: "Site Inspection Report", submitter: "Lisa Park", customer: "MedCenter NL", 
    location: "MedCenter Main", date: "Sep 2, 2026 06:00 PM", status: "Submitted", 
    statusColor: "bg-blue-50 text-blue-600", reviewer: "—"
  },
  { 
    name: "Weekly Security Summary", submitter: "Mike Torres", customer: "TechCorp BV", 
    location: "Tech Park Campus", date: "Sep 1, 2026 09:00 AM", status: "Draft", 
    statusColor: "bg-gray-100 text-gray-600", reviewer: "—"
  }
];

export default function ReportsPage() {
  const [activeModal, setActiveModal] = useState<"none" | "create_type" | "templates" | "review">("none");

  return (
    <div className="flex flex-col h-full bg-[#f8f9fa] relative">
      {/* Top Header */}
      <header className="h-[72px] bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0">
        <div>
          <p className="text-gray-400 text-[11px] font-medium tracking-wide uppercase mb-0.5">SHIFTPOINT • Operations • Reports</p>
          <h1 className="text-[#1a2642] text-[18px] font-bold leading-tight">Reports</h1>
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
              <h2 className="text-[#1a2642] text-[24px] font-bold mb-1">Reports</h2>
              <p className="text-gray-500 text-[14px]">Review, approve and manage operational reports from your team.</p>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => setActiveModal("templates")}
                className="px-5 py-2.5 border border-gray-200 bg-white rounded-lg text-[14px] font-medium text-[#1a2642] hover:bg-gray-50"
              >
                Report Templates
              </button>
              <button 
                onClick={() => setActiveModal("create_type")}
                className="px-5 py-2.5 bg-[#d97706] hover:bg-[#b45f06] text-white rounded-lg text-[14px] font-medium transition-colors"
              >
                + Create Report Type
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            {/* Tabs */}
            <div className="px-2 pt-2 border-b border-gray-100 flex gap-1">
              {["All", "Draft", "Submitted", "Under Review", "Approved", "Returned", "Rejected"].map((tab, i) => (
                <button 
                  key={i}
                  className={`px-4 py-2.5 text-[14px] font-medium rounded-t-lg transition-colors ${
                    i === 0 
                      ? "bg-[#1a2642] text-white" 
                      : "text-gray-500 hover:bg-gray-50 hover:text-[#1a2642]"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13px]">
                <thead>
                  <tr className="bg-gray-50/50 text-gray-400 text-[10px] uppercase tracking-wider font-semibold border-b border-gray-100">
                    <th className="px-6 py-4">REPORT</th>
                    <th className="px-6 py-4">SUBMITTED BY</th>
                    <th className="px-6 py-4">CUSTOMER</th>
                    <th className="px-6 py-4">LOCATION</th>
                    <th className="px-6 py-4">DATE</th>
                    <th className="px-6 py-4">STATUS</th>
                    <th className="px-6 py-4">REVIEWER</th>
                    <th className="px-6 py-4">ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {REPORTS_DATA.map((row, idx) => (
                    <tr key={idx} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4 text-[#1a2642] font-medium flex items-center gap-2">
                        <span className="text-gray-400">📋</span> {row.name}
                      </td>
                      <td className="px-6 py-4 text-gray-600">{row.submitter}</td>
                      <td className="px-6 py-4 text-gray-600">{row.customer}</td>
                      <td className="px-6 py-4 text-gray-600">{row.location}</td>
                      <td className="px-6 py-4 text-gray-600">{row.date}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium ${row.statusColor}`}>
                          <span className="w-1.5 h-1.5 rounded-full bg-current"></span> {row.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{row.reviewer}</td>
                      <td className="px-6 py-4">
                        <button 
                          onClick={() => setActiveModal("review")}
                          className="px-3 py-1.5 border border-gray-200 rounded text-[12px] font-medium text-gray-600 hover:bg-white shadow-sm"
                        >
                          Review
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
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-[#1a2642]/60">
          
          {/* Create Report Type Modal */}
          {activeModal === "create_type" && (
            <div className="bg-white rounded-xl shadow-xl w-full max-w-[600px] animate-in fade-in zoom-in-95 duration-200">
              <div className="flex justify-between items-center p-6 border-b border-gray-100">
                <h3 className="text-[#1a2642] text-[20px] font-bold">Create Report Type</h3>
                <button onClick={() => setActiveModal("none")} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <label className="block text-[#1a2642] text-[13px] font-medium mb-2">Report Name</label>
                  <input type="text" placeholder="Daily Operations Report" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:border-[#f97316]" />
                </div>
                <div>
                  <label className="block text-[#1a2642] text-[13px] font-medium mb-2">Description</label>
                  <textarea rows={3} placeholder="Daily summary of operational activities." className="w-full px-4 py-3 border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:border-[#f97316] resize-none"></textarea>
                </div>
                <div>
                  <label className="block text-[#1a2642] text-[13px] font-medium mb-1">Fields</label>
                  <p className="text-gray-500 text-[12px] mb-3">Select field types to include in this report template.</p>
                  <div className="grid grid-cols-2 gap-y-3">
                    {["Text", "Number", "Date", "Dropdown", "Checkbox", "Photo", "Signature", "Attachment"].map((field, i) => (
                      <label key={i} className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#f97316] focus:ring-[#f97316]" />
                        <span className="text-[14px] text-[#1a2642]">{field}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              <div className="p-6 border-t border-gray-100 flex justify-end gap-3 bg-gray-50 rounded-b-xl">
                <button onClick={() => setActiveModal("none")} className="px-6 py-2.5 border border-gray-200 bg-white rounded-lg text-[14px] font-medium text-gray-600 hover:bg-gray-50">
                  Cancel
                </button>
                <button className="px-6 py-2.5 bg-[#f97316] hover:bg-[#e06511] text-white rounded-lg text-[14px] font-medium">
                  Create Report Type
                </button>
              </div>
            </div>
          )}

          {/* Report Templates Modal */}
          {activeModal === "templates" && (
            <div className="bg-white rounded-xl shadow-xl w-full max-w-[800px] animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[85vh]">
              <div className="flex justify-between items-center p-6 border-b border-gray-100 shrink-0">
                <h3 className="text-[#1a2642] text-[20px] font-bold">Report Templates</h3>
                <button onClick={() => setActiveModal("none")} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
              </div>
              <div className="p-6 overflow-y-auto space-y-4 bg-gray-50">
                
                {[
                  { title: "Daily Operations Report", fields: "Incident description, Location, Date, Officers present, Notes, Photos", count: "24" },
                  { title: "Incident Report", fields: "Incident type, Time, Persons involved, Actions taken, Photos, Signature", count: "8" },
                  { title: "Patrol Report", fields: "Route completed, Checkpoints scanned, Issues found, Photos", count: "18" },
                  { title: "Site Inspection Report", fields: "Inspection type, Findings, Risk level, Recommendations, Photos", count: "6" }
                ].map((tpl, i) => (
                  <div key={i} className="bg-white border border-gray-100 rounded-xl p-5 flex justify-between items-center shadow-sm">
                    <div>
                      <h4 className="text-[#1a2642] font-semibold text-[15px] mb-1">{tpl.title}</h4>
                      <p className="text-gray-500 text-[13px] mb-1">Fields: {tpl.fields}</p>
                      <p className="text-gray-400 text-[12px]">{tpl.count} reports submitted</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-4 py-2 border border-gray-200 rounded-lg text-[13px] font-medium text-gray-600 hover:bg-gray-50">Edit</button>
                      <button className="px-4 py-2 border border-gray-200 rounded-lg text-[13px] font-medium text-[#1a2642] hover:bg-gray-50">View Reports</button>
                    </div>
                  </div>
                ))}
                
              </div>
            </div>
          )}

          {/* Report Review Modal */}
          {activeModal === "review" && (
            <div className="bg-white rounded-xl shadow-xl w-full max-w-[900px] animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
              <div className="flex justify-between items-center p-6 border-b border-gray-100 shrink-0">
                <h3 className="text-[#1a2642] text-[20px] font-bold">Report Review</h3>
                <button onClick={() => setActiveModal("none")} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
              </div>
              
              <div className="flex-1 overflow-y-auto flex">
                {/* Left Side: Report Content */}
                <div className="w-2/3 p-6 border-r border-gray-100">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h4 className="text-[#1a2642] font-bold text-[18px] mb-1">Daily Operations Report</h4>
                      <p className="text-gray-500 text-[13px]">ABC Facilities Ltd. · ABC HQ · Sep 3, 2026 10:30 PM</p>
                    </div>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-orange-50 text-orange-600 border border-orange-100">
                      <span className="w-1.5 h-1.5 rounded-full bg-current"></span> Under Review
                    </span>
                  </div>

                  <div className="mb-6">
                    <p className="text-gray-400 text-[11px] font-bold tracking-wide uppercase mb-3">SUBMITTED INFORMATION</p>
                    <div className="grid grid-cols-[120px_1fr] gap-y-3 text-[13px]">
                      <div className="text-gray-500">Employee</div>
                      <div className="text-[#1a2642] font-medium">John Smith</div>
                      <div className="text-gray-500">Customer</div>
                      <div className="text-[#1a2642] font-medium">ABC Facilities Ltd.</div>
                      <div className="text-gray-500">Location</div>
                      <div className="text-[#1a2642] font-medium">ABC HQ</div>
                      <div className="text-gray-500">Date</div>
                      <div className="text-[#1a2642] font-medium">Sep 3, 2026 10:30 PM</div>
                    </div>
                  </div>

                  <div className="bg-gray-50/80 rounded-xl p-5 mb-4 border border-gray-100">
                    <p className="text-gray-400 text-[11px] font-bold tracking-wide uppercase mb-2">REPORT CONTENT</p>
                    <p className="text-[#1a2642] text-[13px] leading-relaxed">
                      All assigned areas were checked during the patrol. Minor issue found at the back gate — hinge appears loose. Recommended maintenance has been logged. No incidents observed during the shift.
                    </p>
                  </div>

                  <div className="border border-blue-100 bg-blue-50/30 rounded-xl p-4 flex items-center gap-3 text-blue-600 text-[13px] font-medium">
                    <span>🖼️</span> 4 photos attached
                  </div>
                </div>

                {/* Right Side: Review Actions */}
                <div className="w-1/3 p-6 bg-gray-50/50 flex flex-col">
                  <p className="text-[#1a2642] font-semibold text-[14px] mb-3">Review</p>
                  <textarea 
                    rows={4} 
                    placeholder="Add review comment..." 
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:border-[#f97316] mb-4 resize-none bg-white"
                  ></textarea>
                  
                  <div className="space-y-3 mb-8">
                    <button className="w-full py-2.5 bg-[#f97316] hover:bg-[#e06511] text-white font-medium rounded-lg transition-colors flex justify-center items-center gap-2">
                      ✓ Approve
                    </button>
                    <button className="w-full py-2.5 bg-white border border-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors flex justify-center items-center gap-2">
                      ↩ Return
                    </button>
                    <button className="w-full py-2.5 bg-red-50 text-red-600 font-medium rounded-lg hover:bg-red-100 transition-colors flex justify-center items-center gap-2">
                      ✕ Reject
                    </button>
                    <button className="w-full py-2.5 bg-white border border-gray-200 text-[#1a2642] font-medium rounded-lg hover:bg-gray-50 transition-colors flex justify-center items-center gap-2">
                      📥 Export PDF
                    </button>
                  </div>

                  <div>
                    <p className="text-gray-400 text-[11px] font-bold tracking-wide uppercase mb-3">REVIEW HISTORY</p>
                    <div className="space-y-3 text-[12px] text-gray-500">
                      <p>Submitted by John Smith · 10:30 PM</p>
                      <p>Assigned to David Brown · 10:32 PM</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          )}

        </div>
      )}

    </div>
  );
}
