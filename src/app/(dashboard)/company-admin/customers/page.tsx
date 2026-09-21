"use client";

import { useState } from "react";
import { Bell, X, ChevronDown } from "lucide-react";

export default function CustomersPage() {
  const [activeModal, setActiveModal] = useState<"none" | "add" | "details" | "deactivate" | "employees" | "locations">("none");

  // Add customer modal states
  const [selectedCountry, setSelectedCountry] = useState("Netherlands");

  return (
    <div className="flex flex-col h-full bg-[#f8f9fa] relative">
      {/* Top Header */}
      <header className="h-[72px] bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0">
        <div>
          <p className="text-gray-400 text-[11px] font-medium tracking-wide uppercase mb-0.5">SHIFTPOINT • Customers</p>
          <h1 className="text-[#1a2642] text-[18px] font-bold leading-tight">Customers</h1>
        </div>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-4 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-[#1a2642] text-[13px] font-medium hover:bg-gray-100 transition-colors">
            Subscription Buying
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
          
          <div className="flex justify-between items-start mb-8">
            <div>
              <h2 className="text-[#1a2642] text-[24px] font-bold mb-1">Customers</h2>
              <p className="text-gray-500 text-[14px]">Manage customer data, contacts, service assignments and portal access.</p>
            </div>
            <button 
              onClick={() => setActiveModal("add")}
              className="px-5 py-2.5 bg-[#f97316] hover:bg-[#e06511] text-white rounded-lg text-[14px] font-medium transition-colors"
            >
              + Add customer
            </button>
          </div>

          {/* Stats Boxes */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <div className="flex justify-between items-end mb-2">
                <p className="text-[#1a2642] font-semibold text-[14px]">Location capacity</p>
                <p className="text-gray-500 text-[12px]">15 of 24 locations in use</p>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2 mb-2">
                <div className="bg-[#f97316] h-2 rounded-full" style={{ width: '62%' }}></div>
              </div>
              <p className="text-gray-400 text-[12px]">9 locations remain on the current subscription plan.</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm flex flex-col justify-center">
              <p className="text-gray-400 text-[10px] font-bold tracking-[0.1em] uppercase mb-2">PORTAL ACCESS</p>
              <p className="text-[#1a2642] font-bold text-[24px] mb-1">4 active users</p>
              <p className="text-gray-400 text-[12px]">Across 2 customer organisations</p>
            </div>
          </div>

          {/* Table Area */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-3">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13px]">
                <thead>
                  <tr className="border-b border-gray-100 text-gray-400 text-[10px] uppercase tracking-wider font-semibold">
                    <th className="px-4 py-4 w-[250px]">CUSTOMER</th>
                    <th className="px-4 py-4 w-[250px]">VERIFIED CONTACT</th>
                    <th className="px-4 py-4 text-center">ACTIVE PORTAL USERS</th>
                    <th className="px-4 py-4 w-[120px]">STATUS</th>
                    <th className="px-4 py-4 text-right w-[100px]">ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="px-4 py-4">
                      <p className="font-semibold text-[#1a2642] mb-0.5">ABC Facilities Ltd.</p>
                      <p className="text-gray-400 text-[11px] font-mono">CUS-10018</p>
                    </td>
                    <td className="px-4 py-4">
                      <p className="font-medium text-[#1a2642] mb-0.5 flex items-center gap-1">✓ Operations Manager</p>
                      <p className="text-gray-400 text-[11px]">+31 20 555 0180</p>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <span className="inline-flex px-3 py-1 bg-green-50 text-green-700 rounded-full text-[12px] font-medium">3 active</span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium border border-green-200 bg-green-50 text-green-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-current"></span> Active
                      </span>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <button 
                        onClick={() => setActiveModal("details")}
                        className="px-4 py-1.5 border border-gray-200 rounded-lg text-[12px] font-medium text-[#1a2642] hover:bg-gray-50"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-4 py-4">
                      <p className="font-semibold text-[#1a2642] mb-0.5">City Mall Ltd.</p>
                      <p className="text-gray-400 text-[11px] font-mono">CUS-10021</p>
                    </td>
                    <td className="px-4 py-4">
                      <p className="font-medium text-[#1a2642] mb-0.5 flex items-center gap-1">✓ Lisa Park</p>
                      <p className="text-gray-400 text-[11px]">+31 20 555 0200</p>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <span className="inline-flex px-3 py-1 bg-green-50 text-green-700 rounded-full text-[12px] font-medium">1 active</span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium border border-green-200 bg-green-50 text-green-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-current"></span> Active
                      </span>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <button 
                        onClick={() => setActiveModal("details")}
                        className="px-4 py-1.5 border border-gray-200 rounded-lg text-[12px] font-medium text-[#1a2642] hover:bg-gray-50"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {/* OVERLAYS */}
      {activeModal !== "none" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1a2642]/60 p-4">
          
          {/* Add Customer Modal */}
          {activeModal === "add" && (
            <div className="bg-white rounded-xl shadow-xl w-full max-w-[750px] max-h-[90vh] overflow-y-auto custom-scrollbar relative animate-in fade-in zoom-in-95 duration-200">
              <div className="sticky top-0 bg-white p-6 border-b border-gray-100 flex justify-between items-center z-10">
                <h2 className="text-[#1a2642] text-[20px] font-bold">Add customer</h2>
                <button onClick={() => setActiveModal("none")} className="text-gray-400 hover:text-gray-600"><X size={24} /></button>
              </div>
              
              <div className="p-8 space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[#1a2642] text-[13px] font-medium mb-2">Company name</label>
                    <input type="text" defaultValue="ABC Facilities Ltd." className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:border-[#f97316]" />
                  </div>
                  <div>
                    <label className="block text-[#1a2642] text-[13px] font-medium mb-2">Customer / reference number</label>
                    <input type="text" defaultValue="CUS-10018" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:border-[#f97316]" />
                  </div>
                </div>

                <div>
                  <label className="block text-[#1a2642] text-[13px] font-medium mb-2">Street address</label>
                  <input type="text" defaultValue="Prins Bernhardplein" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:border-[#f97316]" />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[#1a2642] text-[13px] font-medium mb-2">Postal / ZIP code</label>
                    <input type="text" defaultValue="1097 JB" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:border-[#f97316]" />
                  </div>
                  <div>
                    <label className="block text-[#1a2642] text-[13px] font-medium mb-2">City</label>
                    <input type="text" defaultValue="Amsterdam" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:border-[#f97316]" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[#1a2642] text-[13px] font-medium mb-2">Country</label>
                    <div className="relative">
                      <select 
                        value={selectedCountry}
                        onChange={(e) => setSelectedCountry(e.target.value)}
                        className="w-full appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-[14px] text-[#1a2642] focus:outline-none focus:border-[#f97316]"
                      >
                        <option value="Netherlands">Netherlands</option>
                        <option value="UK">United Kingdom</option>
                        <option value="US">United States</option>
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[#1a2642] text-[13px] font-medium mb-2">International phone</label>
                    <input type="text" defaultValue="+31 20 555 0180" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:border-[#f97316]" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[#1a2642] text-[13px] font-medium mb-2">General email</label>
                    <input type="email" defaultValue="operations@abcfacilities.com" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:border-[#f97316]" />
                  </div>
                  <div>
                    <label className="block text-[#1a2642] text-[13px] font-medium mb-2">Business registration number</label>
                    <input type="text" defaultValue="63821094" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:border-[#f97316]" />
                  </div>
                </div>

                <div>
                  <label className="block text-[#1a2642] text-[13px] font-medium mb-2">VAT / tax number</label>
                  <input type="text" defaultValue="NL854821470B01" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:border-[#f97316]" />
                </div>

                <div>
                  <label className="block text-[#1a2642] text-[13px] font-medium mb-2">Internal notes</label>
                  <textarea rows={4} defaultValue="24/7 headquarters coverage." className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:border-[#f97316] resize-none"></textarea>
                </div>
              </div>

              <div className="sticky bottom-0 bg-white p-6 border-t border-gray-100 flex justify-end gap-3 z-10">
                <button onClick={() => setActiveModal("none")} className="px-5 py-2.5 border border-gray-200 rounded-lg text-[14px] font-medium text-gray-600 hover:bg-gray-50">
                  Cancel
                </button>
                <button className="px-6 py-2.5 bg-[#f97316] text-white rounded-lg text-[14px] font-medium hover:bg-[#e06511]">
                  Add customer
                </button>
              </div>
            </div>
          )}

          {/* Customer Details Modal */}
          {activeModal === "details" && (
            <div className="bg-white rounded-xl shadow-xl w-full max-w-[700px] overflow-hidden relative animate-in fade-in zoom-in-95 duration-200 z-10">
              <div className="p-8 pb-6 border-b border-gray-100 flex justify-between items-start">
                <h2 className="text-[#1a2642] text-[22px] font-bold">Customer Details</h2>
                <button onClick={() => setActiveModal("none")} className="text-gray-400 hover:text-gray-600"><X size={24} /></button>
              </div>

              <div className="p-8 pb-6">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 rounded-xl bg-[#1a2642] flex items-center justify-center text-white font-bold text-xl">
                    A
                  </div>
                  <div>
                    <h3 className="text-[#1a2642] text-[20px] font-bold">ABC Facilities Ltd.</h3>
                    <p className="text-gray-500 text-[14px]">CUS-10018 · operations@abcfacilities.com</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="border border-gray-100 rounded-xl p-5 shadow-sm">
                    <p className="text-gray-400 text-[10px] font-bold tracking-[0.1em] uppercase mb-1">LOCATIONS</p>
                    <p className="text-[#1a2642] text-[28px] font-bold mb-1">4</p>
                    <button onClick={() => setActiveModal("locations")} className="text-[#f97316] text-[12px] font-medium hover:underline">View locations list →</button>
                  </div>
                  <div className="border border-gray-100 rounded-xl p-5 shadow-sm">
                    <p className="text-gray-400 text-[10px] font-bold tracking-[0.1em] uppercase mb-1">ASSIGNED EMPLOYEES</p>
                    <p className="text-[#1a2642] text-[28px] font-bold mb-1">12</p>
                    <button onClick={() => setActiveModal("employees")} className="text-[#f97316] text-[12px] font-medium hover:underline">View employees list →</button>
                  </div>
                </div>

                <p className="text-[#1a2642] text-[14px] font-bold mb-3">Customer Portal Access</p>
                <div className="bg-gray-50 rounded-xl p-5 flex items-center justify-between border border-gray-100 mb-2">
                  <div>
                    <p className="text-[#1a2642] font-semibold text-[14px]">Portal Status</p>
                    <p className="text-gray-500 text-[12px]">Allow customer to view reports and tracking data.</p>
                  </div>
                  <span className="px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-[12px] font-bold">Enabled</span>
                </div>
              </div>

              <div className="bg-white p-8 pt-4 flex gap-3 flex-wrap border-t border-gray-100">
                <button className="px-5 py-2.5 bg-[#d97316] text-white rounded-lg text-[14px] font-medium hover:bg-[#c06511] border border-transparent" style={{ backgroundColor: "#b45f06" }}>
                  Edit Customer
                </button>
                <button className="px-4 py-2.5 border border-gray-200 rounded-lg text-[14px] font-medium text-[#1a2642] hover:bg-gray-50">
                  Manage Portal Users
                </button>
                <button className="px-4 py-2.5 border border-gray-200 rounded-lg text-[14px] font-medium text-[#1a2642] hover:bg-gray-50">
                  Add Location
                </button>
                <button onClick={() => setActiveModal("deactivate")} className="px-4 py-2.5 bg-red-50 text-red-600 border border-transparent rounded-lg text-[14px] font-medium hover:bg-red-100 ml-auto">
                  Disable Portal
                </button>
              </div>
            </div>
          )}

          {/* Deactivate Modal */}
          {activeModal === "deactivate" && (
            <div className="absolute inset-0 z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-xl shadow-xl w-full max-w-[500px] animate-in fade-in zoom-in-95 duration-200 p-8 z-20">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-[#1a2642] text-[20px] font-bold">Deactivate customer portal access</h3>
                  <button onClick={() => setActiveModal("details")} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
                </div>

                <p className="text-gray-600 text-[14px] leading-relaxed mb-8">
                  This affects <span className="font-bold text-[#1a2642]">3 portal users</span>. All active portal sessions are revoked immediately and affected users are notified by their preferred email or SMS method. Historical reports, incidents, patrols and documents remain available to Company Admin. This action is recorded in the audit log and access can be enabled later without new accounts.
                </p>

                <div className="flex justify-end gap-3">
                  <button onClick={() => setActiveModal("details")} className="px-6 py-2.5 border border-gray-200 rounded-lg text-[14px] font-medium text-gray-600 hover:bg-gray-50">
                    Cancel
                  </button>
                  <button className="px-6 py-2.5 bg-red-50 text-red-600 rounded-lg text-[14px] font-medium hover:bg-red-100">
                    Revoke access
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Sub-modals for assigned lists */}
          {(activeModal === "employees" || activeModal === "locations") && (
            <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-[#1a2642]/60">
              <div className="bg-white rounded-xl shadow-xl w-full max-w-[500px] animate-in fade-in zoom-in-95 duration-200 p-8 z-20">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-[#1a2642] text-[18px] font-bold">
                    ABC Facilities Ltd. — {activeModal === "employees" ? "Employees" : "Locations"}
                  </h3>
                  <button onClick={() => setActiveModal("details")} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
                </div>

                <div className="space-y-3 mb-2">
                  {activeModal === "employees" && ["John Smith", "Tom Wilson", "Maya Patel", "Samir Khan"].map((item, i) => (
                    <div key={i} className="px-4 py-4 border-b border-gray-100 flex gap-4 items-center last:border-0">
                      <span className="text-[#1a2642] text-[14px] font-semibold">{item}</span>
                    </div>
                  ))}
                  {activeModal === "locations" && ["ABC Headquarters", "West Dock", "Central Depot", "Visitor Centre"].map((item, i) => (
                    <div key={i} className="px-4 py-4 border-b border-gray-100 flex gap-4 items-center last:border-0">
                      <span className="text-[#1a2642] text-[14px] font-semibold">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>
      )}
    </div>
  );
}
