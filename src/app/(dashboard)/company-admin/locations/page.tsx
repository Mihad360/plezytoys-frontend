"use client";

import { useState } from "react";
import { Bell, X, ChevronDown, MapPin } from "lucide-react";

const LOCATIONS = [
  { id: 1, name: "ABC Headquarters", customer: "ABC Facilities Ltd.", address: "Prins Bernhardplein 200, Amsterdam", radius: "50m", employees: 8 },
  { id: 2, name: "City Mall Main", customer: "City Mall Ltd.", address: "Kalverstraat 20, Amsterdam", radius: "75m", employees: 6 },
  { id: 3, name: "Tech Park Campus", customer: "TechCorp BV", address: "Science Park 1, Amsterdam", radius: "100m", employees: 4 },
  { id: 4, name: "MedCenter Main", customer: "MedCenter NL", address: "Meibergdreef 9, Amsterdam", radius: "50m", employees: 7 },
  { id: 5, name: "Warehouse Zone A", customer: "LogiCo Warehousing", address: "Westpoort 40, Amsterdam", radius: "150m", employees: 3 },
];

export default function LocationsPage() {
  const [activeModal, setActiveModal] = useState<"none" | "add" | "edit">("none");

  return (
    <div className="flex flex-col h-full bg-[#f8f9fa] relative">
      {/* Top Header */}
      <header className="h-[72px] bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0">
        <div>
          <p className="text-gray-400 text-[11px] font-medium tracking-wide uppercase mb-0.5">SHIFTPOINT • Customers • Locations</p>
          <h1 className="text-[#1a2642] text-[18px] font-bold leading-tight">Locations</h1>
        </div>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-4 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-[#1a2642] text-[13px] font-medium hover:bg-gray-100 transition-colors">
            <span className="text-[#f97316] text-[16px]">♛</span> Subscription
          </button>
          <div className="relative">
            <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors">
              <Bell size={20} />
            </button>
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
              <h2 className="text-[#1a2642] text-[24px] font-bold mb-1">Locations</h2>
              <p className="text-gray-500 text-[14px]">Configure service locations with GPS validation and radius settings.</p>
            </div>
            <button 
              onClick={() => setActiveModal("add")}
              className="px-5 py-2.5 bg-[#f97316] hover:bg-[#e06511] text-white rounded-lg text-[14px] font-medium transition-colors"
            >
              + Add Location
            </button>
          </div>

          {/* Table Area */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-3">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13px]">
                <thead>
                  <tr className="border-b border-gray-100 text-gray-400 text-[10px] uppercase tracking-wider font-semibold">
                    <th className="px-6 py-4">LOCATION</th>
                    <th className="px-4 py-4">CUSTOMER</th>
                    <th className="px-4 py-4 w-[300px]">ADDRESS</th>
                    <th className="px-4 py-4">RADIUS</th>
                    <th className="px-4 py-4">EMPLOYEES</th>
                    <th className="px-4 py-4">STATUS</th>
                    <th className="px-4 py-4 text-center">LIVE</th>
                    <th className="px-6 py-4 text-right">ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {LOCATIONS.map((loc) => (
                    <tr key={loc.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors last:border-0">
                      <td className="px-6 py-4">
                        <p className="font-semibold text-[#1a2642]">{loc.name}</p>
                      </td>
                      <td className="px-4 py-4 text-gray-500">{loc.customer}</td>
                      <td className="px-4 py-4 text-gray-500 pr-8">{loc.address}</td>
                      <td className="px-4 py-4 font-semibold text-[#1a2642]">{loc.radius}</td>
                      <td className="px-4 py-4 font-semibold text-[#1a2642]">{loc.employees}</td>
                      <td className="px-4 py-4">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-green-50 text-green-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-current"></span> Active
                        </span>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <button className="px-4 py-1.5 border border-gray-200 rounded-lg text-[12px] font-medium text-[#1a2642] hover:bg-gray-50">
                          View
                        </button>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button 
                          onClick={() => setActiveModal("edit")}
                          className="px-4 py-1.5 border border-gray-200 rounded-lg text-[12px] font-medium text-[#1a2642] hover:bg-gray-50"
                        >
                          Edit
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
      {(activeModal === "add" || activeModal === "edit") && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1a2642]/60 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-[600px] max-h-[90vh] overflow-y-auto custom-scrollbar relative animate-in fade-in zoom-in-95 duration-200">
            <div className="sticky top-0 bg-white p-6 border-b border-gray-100 flex justify-between items-center z-10">
              <h2 className="text-[#1a2642] text-[20px] font-bold">
                {activeModal === "edit" ? "Edit Location" : "Add Location"}
              </h2>
              <button onClick={() => setActiveModal("none")} className="text-gray-400 hover:text-gray-600"><X size={24} /></button>
            </div>
            
            <div className="p-8 space-y-6 pb-2">
              <div>
                <label className="block text-[#1a2642] text-[13px] font-medium mb-2">Location Name</label>
                <input type="text" defaultValue={activeModal === "edit" ? "ABC Headquarters" : ""} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:border-[#f97316]" />
              </div>

              <div>
                <label className="block text-[#1a2642] text-[13px] font-medium mb-2">Customer</label>
                <div className="relative">
                  <select className="w-full appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-[14px] text-[#1a2642] focus:outline-none focus:border-[#f97316]">
                    <option>ABC Facilities Ltd.</option>
                    <option>City Mall Ltd.</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                </div>
              </div>

              <div>
                <label className="block text-[#1a2642] text-[13px] font-medium mb-2">Address</label>
                <input type="text" defaultValue={activeModal === "edit" ? "Prins Bernhardplein 200, Amsterdam" : ""} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:border-[#f97316]" />
              </div>

              {activeModal === "edit" && (
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[#1a2642] text-[13px] font-medium mb-2">Latitude</label>
                    <input type="text" defaultValue="52.3676" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:border-[#f97316]" />
                  </div>
                  <div>
                    <label className="block text-[#1a2642] text-[13px] font-medium mb-2">Longitude</label>
                    <input type="text" defaultValue="4.9041" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:border-[#f97316]" />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-[#1a2642] text-[13px] font-medium mb-2">Validation Radius (meters)</label>
                <input type="text" defaultValue="50" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:border-[#f97316]" />
              </div>
              
              <div className="flex items-start gap-1.5 text-gray-400 text-[11px] pb-4">
                <MapPin size={12} className="text-red-500 mt-0.5 shrink-0 fill-red-500" />
                <p>GPS validation determines whether an employee is physically within the permitted area.</p>
              </div>
            </div>

            <div className="sticky bottom-0 bg-white p-6 border-t border-gray-100 flex justify-end gap-3 z-10">
              <button onClick={() => setActiveModal("none")} className="px-5 py-2.5 border border-gray-200 rounded-lg text-[14px] font-medium text-gray-600 hover:bg-gray-50">
                Cancel
              </button>
              <button className="px-6 py-2.5 bg-[#f97316] text-white rounded-lg text-[14px] font-medium hover:bg-[#e06511]">
                {activeModal === "edit" ? "Update Location" : "Save Location"}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
