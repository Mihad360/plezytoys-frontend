"use client";

import { Bell, Search, ChevronDown, X } from "lucide-react";
import { useState } from "react";

const MANAGERS = [
  {
    id: "DB",
    name: "David Brown",
    email: "david@abcsecurity.io",
    employees: "12",
    customers: "ABC Facilities, LogiCo",
    locations: "4",
    status: "Active",
    statusColor: "bg-green-50 text-green-600"
  },
  {
    id: "EC",
    name: "Emily Chen",
    email: "emily@abcsecurity.io",
    employees: "9",
    customers: "City Mall Ltd., MedCenter",
    locations: "3",
    status: "Active",
    statusColor: "bg-green-50 text-green-600"
  }
];

export default function ManagersPage() {
  const [activeModal, setActiveModal] = useState<"none" | "invite" | "profile" | "assigned-employees" | "assigned-locations" | "assigned-customers" | "edit" | "deactivate">("none");
  
  // Form states for Invite/Edit Modal
  const [selectedRoles, setSelectedRoles] = useState<string[]>(["Site Coordinator", "Customer Liaison"]);
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>(["David Brown"]);
  const [selectedCustomers, setSelectedCustomers] = useState<string[]>(["ABC Facilities"]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);

  // Form states for Deactivate Modal
  const [deactivateAction, setDeactivateAction] = useState<"reassign" | "unassigned">("reassign");

  const toggleSelection = (setter: React.Dispatch<React.SetStateAction<string[]>>, item: string) => {
    setter(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]);
  };

  return (
    <div className="flex flex-col h-full bg-[#f8f9fa] relative">
      {/* Top Header */}
      <header className="h-[72px] bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0">
        <div>
          <p className="text-gray-400 text-[11px] font-medium tracking-wide uppercase mb-0.5">SHIFTPOINT • People • Managers</p>
          <h1 className="text-[#1a2642] text-[18px] font-bold leading-tight">Managers</h1>
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
              <h2 className="text-[#1a2642] text-[24px] font-bold mb-1">Managers</h2>
              <p className="text-gray-500 text-[14px]">Manage operational managers and their team assignments.</p>
            </div>
            <button 
              onClick={() => setActiveModal("invite")}
              className="px-5 py-2.5 bg-[#f97316] hover:bg-[#e06511] text-white rounded-lg text-[14px] font-medium transition-colors"
            >
              + Invite Manager
            </button>
          </div>

          {/* Stats Boxes */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <p className="text-gray-400 text-[11px] font-bold tracking-[0.05em] uppercase mb-2">TOTAL MANAGERS</p>
              <p className="text-[#1a2642] font-bold text-[32px] mb-1">6</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <p className="text-gray-400 text-[11px] font-bold tracking-[0.05em] uppercase mb-2">ACTIVE</p>
              <p className="text-[#1a2642] font-bold text-[32px] mb-1">5</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <p className="text-gray-400 text-[11px] font-bold tracking-[0.05em] uppercase mb-2">TOTAL EMPLOYEES MANAGED</p>
              <p className="text-[#1a2642] font-bold text-[32px] mb-1">33</p>
            </div>
          </div>

          {/* Table Area */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-3">
            
            {/* Filters */}
            <div className="flex items-center gap-3 mb-4 px-3 pt-3">
              <div className="flex-1 flex items-center border border-gray-200 rounded-lg px-3 bg-gray-50/50">
                <Search size={16} className="text-gray-400 mr-2" />
                <input 
                  type="text" 
                  placeholder="Search manager, email or customer..." 
                  className="w-full py-2.5 bg-transparent text-[13px] text-[#1a2642] focus:outline-none"
                />
              </div>
              <button className="flex items-center justify-between w-[160px] px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-lg text-[13px] text-[#1a2642]">
                All statuses <ChevronDown size={16} className="text-gray-400" />
              </button>
              <button className="flex items-center justify-between w-[160px] px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-lg text-[13px] text-[#1a2642]">
                All customers <ChevronDown size={16} className="text-gray-400" />
              </button>
              <button className="px-5 py-2.5 bg-gray-50/50 border border-gray-200 rounded-lg text-[13px] font-medium text-[#1a2642]">
                Clear
              </button>
              <button className="px-5 py-2.5 bg-gray-50/50 border border-gray-200 rounded-lg text-[13px] font-medium text-[#1a2642]">
                Export CSV
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13px]">
                <thead>
                  <tr className="border-b border-gray-100 text-gray-400 text-[10px] uppercase tracking-wider font-semibold">
                    <th className="px-6 py-4 w-12"><input type="checkbox" className="rounded border-gray-300" /></th>
                    <th className="px-4 py-4">Manager</th>
                    <th className="px-4 py-4">Employees</th>
                    <th className="px-4 py-4">Customers</th>
                    <th className="px-4 py-4 text-center">Locations</th>
                    <th className="px-4 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {MANAGERS.map((mgr, i) => (
                    <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors last:border-0">
                      <td className="px-6 py-4"><input type="checkbox" className="rounded border-gray-300" /></td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-[#1a2642] flex items-center justify-center text-white font-bold text-[13px] shrink-0">
                            {mgr.id}
                          </div>
                          <div>
                            <p className="font-semibold text-[#1a2642] mb-0.5">{mgr.name}</p>
                            <p className="text-gray-400 text-[11px] font-mono">{mgr.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-[#1a2642] font-semibold">{mgr.employees}</td>
                      <td className="px-4 py-4 text-gray-500">{mgr.customers}</td>
                      <td className="px-4 py-4 text-center text-gray-500">{mgr.locations}</td>
                      <td className="px-4 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium border border-green-200 ${mgr.statusColor}`}>
                          <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                          {mgr.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button 
                          onClick={() => setActiveModal("profile")}
                          className="px-4 py-1.5 border border-gray-200 rounded-lg text-[12px] font-medium text-[#1a2642] hover:bg-gray-50"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="p-4 border-t border-gray-100 flex items-center justify-between text-gray-500 text-[13px]">
                <span>Showing 1–2 of 4 managers</span>
                <div className="flex gap-2">
                  <button className="px-3 py-1.5 rounded border border-gray-200 hover:bg-gray-50">Previous</button>
                  <button className="w-8 h-8 rounded bg-[#1a2642] text-white flex items-center justify-center font-medium">1</button>
                  <button className="w-8 h-8 rounded hover:bg-gray-50 flex items-center justify-center font-medium">2</button>
                  <button className="px-3 py-1.5 rounded border border-gray-200 hover:bg-gray-50">Next</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Invite Modal / Edit Modal */}
      {(activeModal === "invite" || activeModal === "edit") && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1a2642]/60 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-[700px] max-h-[90vh] overflow-y-auto custom-scrollbar relative animate-in fade-in zoom-in-95 duration-200">
            <div className="sticky top-0 bg-white p-8 pb-6 border-b border-gray-100 z-10">
              <div className="flex justify-between items-start">
                <h2 className="text-[#1a2642] text-[22px] font-bold">
                  {activeModal === "edit" ? "Edit Manager by email" : "Invite Manager by email"}
                </h2>
                <button onClick={() => setActiveModal("none")} className="text-gray-400 hover:text-gray-600"><X size={24} /></button>
              </div>
            </div>
            
            <div className="p-8 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-[#1a2642] text-[13px] font-medium mb-2">First name</label>
                  <input type="text" defaultValue={activeModal === "edit" ? "David" : ""} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:border-[#f97316]" />
                </div>
                <div>
                  <label className="block text-[#1a2642] text-[13px] font-medium mb-2">Last name</label>
                  <input type="text" defaultValue={activeModal === "edit" ? "Brown" : ""} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:border-[#f97316]" />
                </div>
              </div>

              <div>
                <label className="block text-[#1a2642] text-[13px] font-medium mb-2">Work email</label>
                <input type="email" defaultValue={activeModal === "edit" ? "david@abcsecurity.io" : ""} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:border-[#f97316]" />
              </div>

              <div>
                <label className="block text-[#1a2642] text-[13px] font-medium mb-2">Job title</label>
                <input type="text" defaultValue={activeModal === "edit" ? "Operations Manager" : ""} placeholder="e.g. Facilities Coordinator, Retail Associate" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:border-[#f97316]" />
              </div>

              <div>
                <label className="block text-[#1a2642] text-[13px] font-medium mb-3">Roles (select all that apply)</label>
                <div className="flex flex-wrap gap-2">
                  {["Site Coordinator", "Incident Reporter", "Patrol Operator", "Maintenance Technician", "Customer Liaison"].map(role => {
                    const isSelected = selectedRoles.includes(role);
                    return (
                      <button 
                        key={role} 
                        onClick={() => toggleSelection(setSelectedRoles, role)}
                        className={`px-4 py-1.5 rounded-full border text-[13px] font-medium flex items-center gap-1.5 transition-colors ${
                          isSelected ? "border-[#f97316] text-[#1a2642]" : "border-gray-200 text-[#1a2642] hover:bg-gray-50"
                        }`}
                      >
                        {isSelected && <span className="text-[#f97316]">✓</span>}
                        {role}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-[#1a2642] text-[13px] font-medium mb-3">Employee (select all that apply)</label>
                <div className="flex flex-wrap gap-2">
                  {["David Brown", "Emily Chen", "Carlos Rivera", "Priya Shah"].map(emp => {
                    const isSelected = selectedEmployees.includes(emp);
                    return (
                      <button 
                        key={emp} 
                        onClick={() => toggleSelection(setSelectedEmployees, emp)}
                        className={`px-4 py-1.5 rounded-full border text-[13px] font-medium flex items-center gap-1.5 transition-colors ${
                          isSelected ? "border-[#f97316] text-[#1a2642]" : "border-gray-200 text-[#1a2642] hover:bg-gray-50"
                        }`}
                      >
                        {isSelected && <span className="text-[#f97316]">✓</span>}
                        {emp}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-[#1a2642] text-[13px] font-medium mb-3">Customers (select all that apply)</label>
                <div className="flex flex-wrap gap-2">
                  {["ABC Facilities", "City Mall Ltd.", "TechCorp", "LogiCo"].map(cust => {
                    const isSelected = selectedCustomers.includes(cust);
                    return (
                      <button 
                        key={cust} 
                        onClick={() => toggleSelection(setSelectedCustomers, cust)}
                        className={`px-4 py-1.5 rounded-full border text-[13px] font-medium flex items-center gap-1.5 transition-colors ${
                          isSelected ? "border-[#f97316] text-[#1a2642]" : "border-gray-200 text-[#1a2642] hover:bg-gray-50"
                        }`}
                      >
                        {isSelected && <span className="text-[#f97316]">✓</span>}
                        {cust}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-[#1a2642] text-[13px] font-medium mb-3">Locations (select all that apply)</label>
                <div className="flex flex-wrap gap-2">
                  {["ABC HQ", "City Mall", "Tech Park", "Warehouse"].map(loc => {
                    const isSelected = selectedLocations.includes(loc);
                    return (
                      <button 
                        key={loc} 
                        onClick={() => toggleSelection(setSelectedLocations, loc)}
                        className={`px-4 py-1.5 rounded-full border text-[13px] font-medium flex items-center gap-1.5 transition-colors ${
                          isSelected ? "border-[#f97316] text-[#1a2642]" : "border-gray-200 text-[#1a2642] hover:bg-gray-50"
                        }`}
                      >
                        {isSelected && <span className="text-[#f97316]">✓</span>}
                        {loc}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="sticky bottom-0 bg-white p-8 pt-4 border-t border-gray-100 flex justify-end gap-3 z-10">
              <button onClick={() => setActiveModal("none")} className="px-5 py-2.5 border border-gray-200 rounded-lg text-[14px] font-medium text-gray-600 hover:bg-gray-50">
                Cancel
              </button>
              <button className="px-5 py-2.5 bg-[#f97316] text-white rounded-lg text-[14px] font-medium hover:bg-[#e06511]">
                {activeModal === "edit" ? "Update invitation" : "Send email invitation"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Manager Profile Modal (and sub-modals) */}
      {(activeModal === "profile" || activeModal === "assigned-employees" || activeModal === "assigned-locations" || activeModal === "assigned-customers" || activeModal === "deactivate") && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1a2642]/60 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-[800px] overflow-hidden relative animate-in fade-in zoom-in-95 duration-200">
            <div className="p-8 pb-6 border-b border-gray-100 flex justify-between items-start">
              <h2 className="text-[#1a2642] text-[22px] font-bold">Manager Profile</h2>
              <button onClick={() => setActiveModal("none")} className="text-gray-400 hover:text-gray-600"><X size={24} /></button>
            </div>

            <div className="p-8">
              {/* Header Box */}
              <div className="bg-[#1a2642] p-8 rounded-xl flex justify-between items-start mb-6">
                <div className="flex items-center gap-5">
                  <div className="w-[64px] h-[64px] rounded-2xl bg-[#f97316] flex items-center justify-center text-white font-bold text-[24px]">
                    DB
                  </div>
                  <div>
                    <h2 className="text-white text-[24px] font-bold leading-tight mb-1">David Brown</h2>
                    <p className="text-[#8e9bb3] text-[13px] font-medium mb-1">✓ Verified email · david@abcsecurity.io</p>
                    <p className="text-[#8e9bb3] text-[13px]">Operations Manager · Full operational access</p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-semibold bg-green-50 text-green-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-current"></span> Active
                </span>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-6 mb-6">
                <div className="p-6 border border-gray-100 rounded-xl shadow-sm">
                  <p className="text-gray-400 text-[10px] font-bold tracking-[0.1em] uppercase mb-1">EMPLOYEES</p>
                  <p className="text-[#1a2642] text-[32px] font-bold mb-2">12</p>
                  <button onClick={() => setActiveModal("assigned-employees")} className="text-[#f97316] text-[12px] font-medium hover:underline">View assigned list →</button>
                </div>
                <div className="p-6 border border-gray-100 rounded-xl shadow-sm">
                  <p className="text-gray-400 text-[10px] font-bold tracking-[0.1em] uppercase mb-1">LOCATIONS</p>
                  <p className="text-[#1a2642] text-[32px] font-bold mb-2">4</p>
                  <button onClick={() => setActiveModal("assigned-locations")} className="text-[#f97316] text-[12px] font-medium hover:underline">View assigned list →</button>
                </div>
                <div className="p-6 border border-gray-100 rounded-xl shadow-sm">
                  <p className="text-gray-400 text-[10px] font-bold tracking-[0.1em] uppercase mb-1">CUSTOMERS</p>
                  <p className="text-[#1a2642] text-[32px] font-bold mb-2">2</p>
                  <button onClick={() => setActiveModal("assigned-customers")} className="text-[#f97316] text-[12px] font-medium hover:underline">View assigned list →</button>
                </div>
              </div>

              {/* Info grid */}
              <div className="grid grid-cols-2 gap-6">
                <div className="p-5 bg-gray-50 rounded-xl border border-gray-100">
                  <p className="text-gray-400 text-[10px] font-bold tracking-[0.1em] uppercase mb-2">ASSIGNED CUSTOMERS</p>
                  <p className="text-[#1a2642] font-semibold text-[13px]">ABC Facilities · LogiCo</p>
                </div>
                <div className="p-5 bg-gray-50 rounded-xl border border-gray-100">
                  <p className="text-gray-400 text-[10px] font-bold tracking-[0.1em] uppercase mb-2">ASSIGNED LOCATIONS</p>
                  <p className="text-[#1a2642] font-semibold text-[13px]">ABC HQ · West Dock · LogiCo Warehouse · Central Depot</p>
                </div>
                <div className="p-5 bg-gray-50 rounded-xl border border-gray-100">
                  <p className="text-gray-400 text-[10px] font-bold tracking-[0.1em] uppercase mb-2">ASSIGNED TEAMS</p>
                  <p className="text-[#1a2642] font-semibold text-[13px]">HQ Operations · Warehouse Team</p>
                </div>
                <div className="p-5 bg-gray-50 rounded-xl border border-gray-100">
                  <p className="text-gray-400 text-[10px] font-bold tracking-[0.1em] uppercase mb-2">ROLE & PERMISSION LEVEL</p>
                  <p className="text-[#1a2642] font-semibold text-[13px]">Operations Manager · Full operational access</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 pt-4 flex gap-3 flex-wrap">
              <button onClick={() => setActiveModal("edit")} className="px-5 py-2.5 bg-[#f97316] text-white rounded-lg text-[14px] font-medium hover:bg-[#e06511]">
                Edit Manager
              </button>
              <button className="px-4 py-2.5 border border-gray-200 rounded-lg text-[14px] font-medium text-[#1a2642] hover:bg-gray-50">
                Resend activation
              </button>
              <button className="px-4 py-2.5 border border-gray-200 rounded-lg text-[14px] font-medium text-[#1a2642] hover:bg-gray-50">
                Reset 2FA
              </button>
              <button className="px-4 py-2.5 border border-gray-200 rounded-lg text-[14px] font-medium text-[#1a2642] hover:bg-gray-50">
                Revoke sessions
              </button>
              <button className="px-4 py-2.5 border border-gray-200 rounded-lg text-[14px] font-medium text-[#1a2642] hover:bg-gray-50">
                Reset password
              </button>
              <button onClick={() => setActiveModal("deactivate")} className="px-5 py-2.5 bg-red-50 text-red-600 rounded-lg text-[14px] font-medium hover:bg-red-100 ml-auto">
                Deactivate
              </button>
            </div>
            
            {/* Overlay Sub-modals for assigned lists */}
            {(activeModal === "assigned-employees" || activeModal === "assigned-locations" || activeModal === "assigned-customers") && (
              <div className="absolute inset-0 bg-[#1a2642]/60 flex items-center justify-center p-4 z-20">
                <div className="bg-white rounded-xl shadow-xl w-full max-w-[500px] animate-in fade-in zoom-in-95 duration-200 p-8">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-[#1a2642] text-[18px] font-bold">
                      David Brown — {activeModal === "assigned-employees" ? "Assigned Employees" : activeModal === "assigned-locations" ? "Assigned Locations" : "Assigned Customers"}
                    </h3>
                    <button onClick={() => setActiveModal("profile")} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
                  </div>

                  <div className="space-y-3 mb-8">
                    {activeModal === "assigned-employees" && ["John Smith", "Tom Wilson", "Maya Patel", "Samir Khan"].map((item, i) => (
                      <div key={i} className="px-4 py-3 border border-gray-100 rounded-lg flex gap-4 items-center">
                        <span className="text-gray-400 text-[11px] font-mono font-medium">0{i+1}</span>
                        <span className="text-[#1a2642] text-[14px] font-semibold">{item}</span>
                      </div>
                    ))}
                    {activeModal === "assigned-locations" && ["ABC HQ", "West Dock", "LogiCo Warehouse", "Central Depot"].map((item, i) => (
                      <div key={i} className="px-4 py-3 border border-gray-100 rounded-lg flex gap-4 items-center">
                        <span className="text-gray-400 text-[11px] font-mono font-medium">0{i+1}</span>
                        <span className="text-[#1a2642] text-[14px] font-semibold">{item}</span>
                      </div>
                    ))}
                    {activeModal === "assigned-customers" && ["ABC Facilities", "LogiCo"].map((item, i) => (
                      <div key={i} className="px-4 py-3 border border-gray-100 rounded-lg flex gap-4 items-center">
                        <span className="text-gray-400 text-[11px] font-mono font-medium">0{i+1}</span>
                        <span className="text-[#1a2642] text-[14px] font-semibold">{item}</span>
                      </div>
                    ))}
                  </div>

                  <button onClick={() => setActiveModal("profile")} className="px-5 py-2.5 border border-gray-200 rounded-lg text-[14px] font-medium text-[#1a2642] hover:bg-gray-50">
                    Close
                  </button>
                </div>
              </div>
            )}
            
            {/* Deactivate Manager Sub-modal */}
            {activeModal === "deactivate" && (
              <div className="absolute inset-0 bg-[#1a2642]/60 flex items-center justify-center p-4 z-20">
                <div className="bg-white rounded-xl shadow-xl w-full max-w-[600px] animate-in fade-in zoom-in-95 duration-200">
                  <div className="flex justify-between items-center p-8 pb-6 border-b border-gray-100">
                    <h3 className="text-[#1a2642] text-[20px] font-bold">Deactivate Manager</h3>
                    <button onClick={() => setActiveModal("profile")} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
                  </div>
                  
                  <div className="p-8 pb-4">
                    <div className="bg-red-50 border border-red-100 rounded-lg p-4 mb-8 flex gap-3 text-red-600 text-[13px] font-medium leading-relaxed">
                      <span className="font-bold text-[16px] leading-none mt-0.5">!</span>
                      <p>Deactivating <span className="font-bold">David Brown</span> immediately revokes sign-in access and all active sessions. Historical records remain preserved.</p>
                    </div>

                    <p className="text-gray-400 text-[10px] font-bold tracking-[0.1em] uppercase mb-4">RESPONSIBILITIES TO RESOLVE</p>
                    <div className="grid grid-cols-5 gap-3 mb-8 text-center">
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-[#1a2642] text-[20px] font-bold">12</p>
                        <p className="text-gray-500 text-[10px]">Employees</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-[#1a2642] text-[20px] font-bold">2</p>
                        <p className="text-gray-500 text-[10px]">Customers</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-[#1a2642] text-[20px] font-bold">4</p>
                        <p className="text-gray-500 text-[10px]">Locations</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-[#1a2642] text-[20px] font-bold">4</p>
                        <p className="text-gray-500 text-[10px]">Open tasks</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-[#1a2642] text-[20px] font-bold">3</p>
                        <p className="text-gray-500 text-[10px]">Open reports</p>
                      </div>
                    </div>

                    <p className="text-[#1a2642] text-[14px] font-bold mb-4">Choose how to handle these assignments</p>
                    
                    <div className="space-y-4 mb-8">
                      <div 
                        className={`border rounded-xl p-5 relative cursor-pointer transition-colors ${deactivateAction === "reassign" ? "border-[#f97316] bg-white" : "border-gray-200 hover:bg-gray-50"}`}
                        onClick={() => setDeactivateAction("reassign")}
                      >
                        <div className="flex items-start gap-3">
                          <input type="radio" checked={deactivateAction === "reassign"} readOnly className="mt-1 w-4 h-4 text-[#f97316] focus:ring-[#f97316]" />
                          <div className="w-full">
                            <p className="text-[#1a2642] text-[14px] font-bold mb-1">Reassign all responsibilities</p>
                            <p className="text-gray-500 text-[13px] mb-4">Transfer employees, customers, locations, tasks and reports to another active manager.</p>
                            <div className={`relative ${deactivateAction !== "reassign" ? "opacity-50 pointer-events-none" : ""}`}>
                              <select className="w-full appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-[14px] text-[#1a2642] focus:outline-none focus:border-[#f97316]">
                                <option>Emily Chen · Regional Manager</option>
                              </select>
                              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div 
                        className={`border rounded-xl p-5 cursor-pointer transition-colors ${deactivateAction === "unassigned" ? "border-[#f97316] bg-white" : "border-gray-200 hover:bg-gray-50"}`}
                        onClick={() => setDeactivateAction("unassigned")}
                      >
                        <div className="flex items-start gap-3">
                          <input type="radio" checked={deactivateAction === "unassigned"} readOnly className="mt-1 w-4 h-4 text-[#f97316] focus:ring-[#f97316]" />
                          <div>
                            <p className="text-[#1a2642] text-[14px] font-bold mb-1">Leave responsibilities unassigned</p>
                            <p className="text-gray-500 text-[13px]">Assignments stay in place without a manager until reassigned later.</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-400 text-[12px]">This deactivation and the selected responsibility handling will be recorded in the audit log.</p>
                  </div>

                  <div className="p-8 pt-4 flex justify-center gap-3">
                    <button onClick={() => setActiveModal("profile")} className="px-6 py-2.5 border border-gray-200 rounded-lg text-[14px] font-medium text-gray-600 hover:bg-gray-50">
                      Keep Active
                    </button>
                    <button className="px-6 py-2.5 bg-red-50 text-red-600 rounded-lg text-[14px] font-medium hover:bg-red-100">
                      Deactivate and revoke access
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
