"use client";

import { Bell, ChevronDown, X } from "lucide-react";
import { useState } from "react";

export default function DocumentsPage() {
  const [activeTab, setActiveTab] = useState("Documents");
  const [activeModal, setActiveModal] = useState<"none" | "upload" | "create_type">("none");

  const renderTabContent = () => {
    switch (activeTab) {
      case "Documents":
        return (
          <>
            {/* Stats */}
            <div className="grid grid-cols-6 gap-4 mb-6">
              <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
                <p className="text-gray-400 text-[10px] font-bold tracking-[0.05em] uppercase mb-2">TOTAL DOCUMENTS</p>
                <p className="text-[#1a2642] font-medium text-[28px] leading-none">238</p>
              </div>
              <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
                <p className="text-gray-400 text-[10px] font-bold tracking-[0.05em] uppercase mb-2">VALID</p>
                <p className="text-[#1a2642] font-medium text-[28px] leading-none">181</p>
              </div>
              <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
                <p className="text-gray-400 text-[10px] font-bold tracking-[0.05em] uppercase mb-2">AWAITING VERIFICATION</p>
                <p className="text-[#1a2642] font-medium text-[28px] leading-none">12</p>
              </div>
              <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
                <p className="text-gray-400 text-[10px] font-bold tracking-[0.05em] uppercase mb-2">EXPIRING SOON</p>
                <p className="text-[#1a2642] font-medium text-[28px] leading-none">19</p>
              </div>
              <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
                <p className="text-gray-400 text-[10px] font-bold tracking-[0.05em] uppercase mb-2">MISSING</p>
                <p className="text-[#1a2642] font-medium text-[28px] leading-none">14</p>
              </div>
              <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
                <p className="text-gray-400 text-[10px] font-bold tracking-[0.05em] uppercase mb-2">EXPIRED</p>
                <p className="text-[#1a2642] font-medium text-[28px] leading-none">6</p>
              </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex gap-4 mb-6">
              <div className="flex-1 relative">
                <input type="text" placeholder="Search documents..." className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:border-[#f97316]" />
              </div>
              <div className="relative w-[180px]">
                <select className="w-full appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-[14px] text-[#1a2642] focus:outline-none">
                  <option>All customers</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              </div>
              <div className="relative w-[180px]">
                <select className="w-full appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-[14px] text-[#1a2642] focus:outline-none">
                  <option>All locations</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              </div>
              <div className="relative w-[150px]">
                <select className="w-full appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-[14px] text-[#1a2642] focus:outline-none">
                  <option>Status</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              </div>
              <div className="relative w-[180px]">
                <select className="w-full appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-[14px] text-[#1a2642] focus:outline-none">
                  <option>Document type</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              </div>
              <button className="px-4 py-2.5 border border-gray-200 rounded-lg text-[14px] font-medium text-gray-600 hover:bg-gray-50 bg-white">
                Expiry date
              </button>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <table className="w-full text-left text-[13px]">
                <thead>
                  <tr className="bg-gray-50/50 text-gray-400 text-[10px] uppercase tracking-wider font-semibold border-b border-gray-100">
                    <th className="px-6 py-4">EMPLOYEE</th>
                    <th className="px-6 py-4">DOCUMENT / CERTIFICATE</th>
                    <th className="px-6 py-4">CATEGORY</th>
                    <th className="px-6 py-4">CUSTOMER / LOCATION</th>
                    <th className="px-6 py-4">ISSUE</th>
                    <th className="px-6 py-4">EXPIRY</th>
                    <th className="px-6 py-4">STATUS</th>
                    <th className="px-6 py-4">VERIFIED BY</th>
                    <th className="px-6 py-4"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-50">
                    <td className="px-6 py-4 text-[#1a2642] font-medium">John Smith</td>
                    <td className="px-6 py-4 text-gray-600">Driving Licence</td>
                    <td className="px-6 py-4 text-gray-500">Qualification</td>
                    <td className="px-6 py-4 text-gray-600">
                      <div>ABC Facilities</div>
                      <div className="text-gray-400 text-[11px] mt-0.5">Rotterdam Office</div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">10 Jan 2026</td>
                    <td className="px-6 py-4 text-gray-600">10 Jan 2027</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex px-2 py-0.5 bg-green-50 text-green-600 rounded text-[11px] font-medium">Valid</span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">Sarah Wilson</td>
                    <td className="px-6 py-4">
                      <button className="px-3 py-1.5 border border-gray-200 rounded text-[12px] font-medium text-gray-600 hover:bg-gray-50 shadow-sm">View</button>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-50">
                    <td className="px-6 py-4 text-[#1a2642] font-medium">Emma Brown</td>
                    <td className="px-6 py-4 text-gray-600">First Aid Certificate</td>
                    <td className="px-6 py-4 text-gray-500">Certification</td>
                    <td className="px-6 py-4 text-gray-600">
                      <div>City Care</div>
                      <div className="text-gray-400 text-[11px] mt-0.5">Central Clinic</div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">05 Mar 2025</td>
                    <td className="px-6 py-4 text-gray-600">05 Mar 2027</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex px-2 py-0.5 bg-orange-50 text-orange-600 rounded text-[11px] font-medium">Expiring Soon</span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">Mark Lee</td>
                    <td className="px-6 py-4">
                      <button className="px-3 py-1.5 border border-gray-200 rounded text-[12px] font-medium text-gray-600 hover:bg-gray-50 shadow-sm">View</button>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-[#1a2642] font-medium">Daniel Jones</td>
                    <td className="px-6 py-4 text-gray-600">Security Certificate</td>
                    <td className="px-6 py-4 text-gray-500">Compliance</td>
                    <td className="px-6 py-4 text-gray-600">
                      <div>SecureCo</div>
                      <div className="text-gray-400 text-[11px] mt-0.5">Main Site</div>
                    </td>
                    <td className="px-6 py-4 text-gray-400">—</td>
                    <td className="px-6 py-4 text-gray-400">—</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex px-2 py-0.5 bg-gray-100 text-gray-500 rounded text-[11px] font-medium">Missing</span>
                    </td>
                    <td className="px-6 py-4 text-gray-400">—</td>
                    <td className="px-6 py-4">
                      <button className="px-3 py-1.5 border border-gray-200 rounded text-[12px] font-medium text-gray-600 hover:bg-gray-50 shadow-sm">View</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </>
        );

      case "Document Types":
        return (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-6 py-5 flex justify-between items-center border-b border-gray-100">
              <div>
                <h3 className="text-[#1a2642] font-bold text-[16px] mb-1">Document & Certificate Types</h3>
                <p className="text-gray-500 text-[13px]">Configurable requirements across roles, customers, locations and sectors.</p>
              </div>
              <button 
                onClick={() => setActiveModal("create_type")}
                className="px-5 py-2.5 bg-[#f97316] hover:bg-[#e06511] text-white rounded-lg text-[14px] font-medium transition-colors"
              >
                + Create Document Type
              </button>
            </div>
            <table className="w-full text-left text-[13px]">
              <tbody>
                <tr className="border-b border-gray-50">
                  <td className="px-6 py-4 text-[#1a2642] font-medium">Driving Licence</td>
                  <td className="px-6 py-4 text-gray-600">Qualification</td>
                  <td className="px-6 py-4 text-gray-600">Driver</td>
                  <td className="px-6 py-4 text-gray-600">Yes</td>
                  <td className="px-6 py-4 text-gray-600">Company Admin</td>
                  <td className="px-6 py-4 text-gray-600">Active</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-[#f97316] font-medium hover:underline">Edit</button>
                  </td>
                </tr>
                <tr className="border-b border-gray-50">
                  <td className="px-6 py-4 text-[#1a2642] font-medium">First Aid Certificate</td>
                  <td className="px-6 py-4 text-gray-600">Certification</td>
                  <td className="px-6 py-4 text-gray-600">Selected Roles</td>
                  <td className="px-6 py-4 text-gray-600">Yes</td>
                  <td className="px-6 py-4 text-gray-600">Manager</td>
                  <td className="px-6 py-4 text-gray-600">Active</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-[#f97316] font-medium hover:underline">Edit</button>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-[#1a2642] font-medium">Security Certificate</td>
                  <td className="px-6 py-4 text-gray-600">Compliance</td>
                  <td className="px-6 py-4 text-gray-600">Security Sector</td>
                  <td className="px-6 py-4 text-gray-600">Yes</td>
                  <td className="px-6 py-4 text-gray-600">Company Admin</td>
                  <td className="px-6 py-4 text-gray-600">Active</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-[#f97316] font-medium hover:underline">Edit</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        );

      case "Training & Qualifications":
        return (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden p-6">
            <h3 className="text-[#1a2642] font-bold text-[16px] mb-1">Training & Qualifications</h3>
            <p className="text-gray-500 text-[13px] mb-6">Basic training records, validity, evidence uploads and expiry alerts—without an e-learning platform.</p>
            
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-gray-50 rounded-lg p-5">
                <p className="text-gray-400 text-[11px] font-bold tracking-[0.05em] mb-1">Total Qualifications</p>
                <p className="text-[#1a2642] text-[24px] font-medium">46</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-5">
                <p className="text-gray-400 text-[11px] font-bold tracking-[0.05em] mb-1">Valid</p>
                <p className="text-[#1a2642] text-[24px] font-medium">38</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-5">
                <p className="text-gray-400 text-[11px] font-bold tracking-[0.05em] mb-1">Expiring Soon</p>
                <p className="text-[#1a2642] text-[24px] font-medium">4</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-5">
                <p className="text-gray-400 text-[11px] font-bold tracking-[0.05em] mb-1">Expired</p>
                <p className="text-[#1a2642] text-[24px] font-medium">1</p>
              </div>
            </div>
          </div>
        );

      case "Expiry Alerts":
        return (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden p-6">
            <h3 className="text-[#1a2642] font-bold text-[16px] mb-1">Expiry Alerts</h3>
            <p className="text-gray-500 text-[13px] mb-6">Configured warning periods: 90, 60, 30, 14, 7 days and on expiry. Recipients: employee, assigned manager, Company Admin.</p>
            
            <div className="bg-orange-50/50 border border-orange-100 rounded-lg p-5">
              <h4 className="text-[#1a2642] font-medium text-[15px] mb-1">Driving Licence expires in 30 days</h4>
              <p className="text-[#1a2642] text-[13px] mb-3">John Smith's Driving Licence will expire on 10 Oct 2026.</p>
              <button className="text-[#f97316] text-[13px] font-medium hover:underline">View Document</button>
            </div>
          </div>
        );

      case "Audit History":
        return (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-100">
              <h3 className="text-[#1a2642] font-medium text-[15px]">Document Activity</h3>
            </div>
            <table className="w-full text-left text-[13px]">
              <tbody>
                <tr className="border-b border-gray-50">
                  <td className="px-6 py-4 text-gray-500">10 Sep 2026, 09:42</td>
                  <td className="px-6 py-4 text-[#1a2642]">John Smith</td>
                  <td className="px-6 py-4 text-gray-600">Uploaded</td>
                  <td className="px-6 py-4 text-gray-600">Driving Licence</td>
                  <td className="px-6 py-4 text-gray-600">Version 2</td>
                </tr>
                <tr className="border-b border-gray-50">
                  <td className="px-6 py-4 text-gray-500">10 Sep 2026, 10:15</td>
                  <td className="px-6 py-4 text-[#1a2642]">Sarah Wilson</td>
                  <td className="px-6 py-4 text-gray-600">Viewed</td>
                  <td className="px-6 py-4 text-gray-600">Driving Licence</td>
                  <td className="px-6 py-4 text-gray-400">—</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-gray-500">10 Sep 2026, 10:18</td>
                  <td className="px-6 py-4 text-[#1a2642]">Sarah Wilson</td>
                  <td className="px-6 py-4 text-gray-600">Approved</td>
                  <td className="px-6 py-4 text-gray-600">Driving Licence</td>
                  <td className="px-6 py-4 text-gray-600">Status changed to Valid</td>
                </tr>
              </tbody>
            </table>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#f8f9fa] relative">
      {/* Top Header */}
      <header className="h-[72px] bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0">
        <div>
          <p className="text-gray-400 text-[11px] font-medium tracking-wide uppercase mb-0.5">SHIFTPOINT • Documents</p>
          <h1 className="text-[#1a2642] text-[18px] font-bold leading-tight">Documents & Certificates</h1>
        </div>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-4 py-1.5 bg-orange-50 border border-orange-100 rounded-lg text-[#f97316] text-[13px] font-medium hover:bg-orange-100 transition-colors">
            <span className="text-[16px]">★</span> Subscription
          </button>
          <div className="relative">
            <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors">
              <Bell size={20} />
            </button>
          </div>
          <div className="w-10 h-10 rounded-full bg-[#f97316] flex items-center justify-center text-white font-bold text-sm">
            SA
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="bg-white border-b border-gray-100 pt-6 px-8 mb-6 shadow-sm">
          <div className="max-w-[1400px] mx-auto flex justify-end gap-3 mb-6">
            <button className="px-5 py-2.5 border border-gray-200 bg-white rounded-lg text-[14px] font-medium text-[#1a2642] hover:bg-gray-50">
              Configure Document Types
            </button>
            <button 
              onClick={() => setActiveModal("upload")}
              className="px-5 py-2.5 bg-[#f97316] hover:bg-[#e06511] text-white rounded-lg text-[14px] font-medium transition-colors"
            >
              Upload Document
            </button>
          </div>
          <div className="max-w-[1400px] mx-auto flex gap-6">
            {["Overview", "Documents", "Document Types", "Training & Qualifications", "Expiry Alerts", "Audit History"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 text-[14px] font-medium border-b-2 transition-colors ${
                  activeTab === tab
                    ? "border-[#f97316] text-[#f97316]"
                    : "border-transparent text-gray-500 hover:text-[#1a2642]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="px-8 pb-8">
          <div className="max-w-[1400px] mx-auto">
            {renderTabContent()}
          </div>
        </div>
      </main>

      {/* MODALS */}
      {activeModal !== "none" && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-[#1a2642]/60">
          
          {/* Create Document Type Modal */}
          {activeModal === "create_type" && (
            <div className="bg-white rounded-xl shadow-xl w-full max-w-[650px] animate-in fade-in zoom-in-95 duration-200">
              <div className="flex justify-between items-center p-6 border-b border-gray-100">
                <h3 className="text-[#1a2642] text-[20px] font-bold">Create Document Type</h3>
                <button onClick={() => setActiveModal("none")} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
              </div>
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[#1a2642] text-[13px] font-medium mb-2">Document or Certificate Name</label>
                    <input type="text" defaultValue="Driving Licence" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:border-[#f97316]" />
                  </div>
                  <div>
                    <label className="block text-transparent text-[13px] font-medium mb-2">&nbsp;</label>
                    <div className="relative">
                      <select className="w-full appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-[14px] text-[#1a2642] focus:outline-none">
                        <option>Qualification</option>
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[#1a2642] text-[13px] font-medium mb-2">Description</label>
                    <input type="text" defaultValue="Explain what this document is used for." className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:border-[#f97316]" />
                  </div>
                  <div>
                    <label className="block text-[#1a2642] text-[13px] font-medium mb-2">Upload Instructions</label>
                    <input type="text" defaultValue="Provide instructions for employees when uploading." className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:border-[#f97316]" />
                  </div>
                </div>

                <div>
                  <label className="block text-[#1a2642] text-[13px] font-medium mb-1">Requirement & expiry</label>
                  <p className="text-gray-500 text-[12px] mb-3">Mandatory or optional · all employees or selected roles/customers/locations/sectors.</p>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="relative">
                      <select className="w-full appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-[14px] text-[#1a2642] focus:outline-none">
                        <option>Yes</option>
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    </div>
                    <div className="relative">
                      <select className="w-full appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-[14px] text-[#1a2642] focus:outline-none">
                        <option>Company Admin or Manager</option>
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[#1a2642] text-[13px] font-medium mb-2">Allowed file types</label>
                    <input type="text" defaultValue="PDF, JPG, PNG" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:border-[#f97316]" />
                  </div>
                  <div>
                    <label className="block text-[#1a2642] text-[13px] font-medium mb-2">Maximum file size</label>
                    <input type="text" defaultValue="10 MB" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:border-[#f97316]" />
                  </div>
                </div>

                <div className="pt-2">
                  <button className="px-6 py-2.5 bg-[#f97316] hover:bg-[#e06511] text-white rounded-lg text-[14px] font-medium">
                    Save Document Type
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Upload Document Modal */}
          {activeModal === "upload" && (
            <div className="bg-white rounded-xl shadow-xl w-full max-w-[650px] animate-in fade-in zoom-in-95 duration-200">
              <div className="flex justify-between items-center p-6 border-b border-gray-100">
                <h3 className="text-[#1a2642] text-[20px] font-bold">Upload Document</h3>
                <button onClick={() => setActiveModal("none")} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
              </div>
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="relative">
                    <select className="w-full appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-[14px] text-[#1a2642] focus:outline-none">
                      <option>John Smith</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  </div>
                  <div className="relative">
                    <select className="w-full appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-[14px] text-[#1a2642] focus:outline-none">
                      <option>Driving Licence</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[#1a2642] text-[13px] font-medium mb-2">Issue Date</label>
                    <input type="text" defaultValue="10/01/2026" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:border-[#f97316]" />
                  </div>
                  <div>
                    <label className="block text-[#1a2642] text-[13px] font-medium mb-2">Expiry Date</label>
                    <input type="text" defaultValue="10/01/2027" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:border-[#f97316]" />
                  </div>
                </div>

                <div className="border border-dashed border-gray-300 rounded-xl p-8 flex items-center justify-center text-center">
                  <p className="text-gray-500 text-[14px]">Drag & drop or browse · PDF, JPG, PNG · max 10 MB</p>
                </div>

                <div className="pt-2">
                  <button className="px-6 py-2.5 bg-[#f97316] hover:bg-[#e06511] text-white rounded-lg text-[14px] font-medium">
                    Upload Document
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
