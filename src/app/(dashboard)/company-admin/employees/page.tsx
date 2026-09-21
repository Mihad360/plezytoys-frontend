"use client";

import { Bell, Search, ChevronDown, X, Download } from "lucide-react";
import { useState } from "react";

const EMPLOYEES = [
  {
    id: "EMP-1042",
    initials: "JS",
    name: "John Smith",
    email: "john@abcsecurity.io",
    jobTitle: "Facilities Lead",
    roles: "Site Coordinator · Incident Reporter",
    assignments: "2 customers · 2 locations",
    assignmentDetails: "David Brown · Emily Chen",
    status: "Active",
    statusColor: "bg-green-50 text-green-600 border-green-200",
    access: "Email verified",
    accessStatus: "Registered",
    accessColor: "text-green-600"
  },
  {
    id: "EMP-1088",
    initials: "SJ",
    name: "Sarah Johnson",
    email: "sarah@abcsecurity.io",
    jobTitle: "Operations Associate",
    roles: "Patrol Operator",
    assignments: "1 customer · 1 location",
    assignmentDetails: "Emily Chen",
    status: "Active",
    statusColor: "bg-green-50 text-green-600 border-green-200",
    access: "Email verified",
    accessStatus: "Registered",
    accessColor: "text-green-600"
  },
  {
    id: "EMP-1095",
    initials: "MT",
    name: "Mike Torres",
    email: "mike@abcsecurity.io",
    jobTitle: "Field Technician",
    roles: "Maintenance Technician",
    assignments: "2 customers · 2 locations",
    assignmentDetails: "David Brown",
    status: "Invited",
    statusColor: "bg-blue-50 text-blue-600 border-blue-200",
    access: "Email pending",
    accessStatus: "Pending",
    accessColor: "text-gray-500"
  },
  {
    id: "EMP-1101",
    initials: "LP",
    name: "Lisa Park",
    email: "lisa@abcsecurity.io",
    jobTitle: "Service Coordinator",
    roles: "Customer Liaison",
    assignments: "1 customer · 1 location",
    assignmentDetails: "Emily Chen",
    status: "Inactive",
    statusColor: "bg-gray-100 text-gray-600 border-gray-200",
    access: "Email verified",
    accessStatus: "Not Registered",
    accessColor: "text-green-600"
  },
  {
    id: "EMP-1114",
    initials: "TW",
    name: "Tom Wilson",
    email: "tom@abcsecurity.io",
    jobTitle: "Route Supervisor",
    roles: "Site Coordinator · Patrol Operator",
    assignments: "1 customer · 1 location",
    assignmentDetails: "David Brown",
    status: "Active",
    statusColor: "bg-green-50 text-green-600 border-green-200",
    access: "Email verified",
    accessStatus: "Registered",
    accessColor: "text-green-600"
  }
];

export default function EmployeesPage() {
  const [activeModal, setActiveModal] = useState<"none" | "invite" | "details" | "roles">("none");
  const [activeTab, setActiveTab] = useState<"Overview" | "Documents" | "Operational History">("Overview");
  
  // Form states for Invite Modal
  const [selectedRoles, setSelectedRoles] = useState<string[]>(["Site Coordinator", "Customer Liaison"]);
  const [selectedManagers, setSelectedManagers] = useState<string[]>(["David Brown"]);
  const [selectedCustomers, setSelectedCustomers] = useState<string[]>(["ABC Facilities"]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);

  const toggleSelection = (setter: React.Dispatch<React.SetStateAction<string[]>>, item: string) => {
    setter(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]);
  };
  
  return (
    <div className="flex flex-col h-full bg-[#f8f9fa] relative">
      {/* Top Header */}
      <header className="h-[72px] bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0">
        <div>
          <p className="text-gray-400 text-[11px] font-medium tracking-wide uppercase mb-0.5">SHIFTPOINT • People • Employees</p>
          <h1 className="text-[#1a2642] text-[18px] font-bold leading-tight">Employees</h1>
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
              <h2 className="text-[#1a2642] text-[24px] font-bold mb-1">Employees</h2>
              <p className="text-gray-500 text-[14px]">Manage a flexible workforce across customers, locations, managers and business functions.</p>
            </div>
            <div className="flex gap-3">
              <button className="px-5 py-2.5 border border-gray-200 bg-white rounded-lg text-[14px] font-medium text-[#1a2642] hover:bg-gray-50 transition-colors">
                Bulk import
              </button>
              <button 
                onClick={() => setActiveModal("invite")}
                className="px-5 py-2.5 bg-[#f97316] hover:bg-[#e06511] text-white rounded-lg text-[14px] font-medium transition-colors"
              >
                + Invite employee
              </button>
            </div>
          </div>

          {/* Stats Boxes */}
          <div className="grid grid-cols-12 gap-6 mb-8">
            <div className="col-span-8 bg-white rounded-xl border border-gray-100 p-6 shadow-sm flex items-center gap-6">
              <div className="w-12 h-12 rounded-lg bg-[#1a2642] flex items-center justify-center text-white font-bold text-xl shrink-0">
                48
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-end mb-2">
                  <p className="text-[#1a2642] font-semibold text-[14px]">Employee capacity</p>
                  <p className="text-gray-500 text-[12px]">48 of 60 active seats</p>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2 mb-2">
                  <div className="bg-[#f97316] h-2 rounded-full" style={{ width: '80%' }}></div>
                </div>
                <p className="text-gray-400 text-[12px]">12 employee seats remain on your Growth subscription.</p>
              </div>
            </div>
            <div className="col-span-4 bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <p className="text-gray-400 text-[10px] font-bold tracking-[0.1em] uppercase mb-2">COMPANY ROLE CATALOG</p>
              <p className="text-[#1a2642] font-bold text-[18px] mb-2">5 configurable roles</p>
              <button onClick={() => setActiveModal("roles")} className="text-[#f97316] font-medium text-[13px] hover:underline">Manage roles and permissions →</button>
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
                  placeholder="Search employee, email or customer..." 
                  className="w-full py-2.5 bg-transparent text-[13px] text-[#1a2642] focus:outline-none"
                />
              </div>
              <button className="flex items-center justify-between w-[160px] px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-lg text-[13px] text-[#1a2642]">
                All managers <ChevronDown size={16} className="text-gray-400" />
              </button>
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
                    <th className="px-4 py-4">Employee</th>
                    <th className="px-4 py-4">Job Title & Roles</th>
                    <th className="px-4 py-4">Assignments</th>
                    <th className="px-4 py-4">Status</th>
                    <th className="px-4 py-4">Access</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {EMPLOYEES.map((emp) => (
                    <tr key={emp.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors last:border-0">
                      <td className="px-6 py-4"><input type="checkbox" className="rounded border-gray-300" /></td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded bg-[#1a2642] flex items-center justify-center text-white font-bold text-[13px] shrink-0">
                            {emp.initials}
                          </div>
                          <div>
                            <p className="font-semibold text-[#1a2642]">{emp.name}</p>
                            <p className="text-gray-400 text-[11px] font-mono mt-0.5">{emp.id} · {emp.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <p className="font-semibold text-[#1a2642] mb-0.5">{emp.jobTitle}</p>
                        <p className="text-gray-500 text-[12px]">{emp.roles}</p>
                      </td>
                      <td className="px-4 py-4">
                        <p className="font-semibold text-[#1a2642] mb-0.5">{emp.assignments}</p>
                        <p className="text-gray-400 text-[12px]">{emp.assignmentDetails}</p>
                      </td>
                      <td className="px-4 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${emp.statusColor}`}>
                          <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                          {emp.status}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <p className={`font-semibold mb-0.5 flex items-center gap-1 ${emp.accessColor}`}>
                          {emp.access === "Email verified" && <span>✓</span>} {emp.access}
                        </p>
                        <p className="text-gray-400 text-[11px]">{emp.accessStatus}</p>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button 
                          onClick={() => { setActiveModal("details"); setActiveTab("Overview"); }}
                          className="px-4 py-1.5 border border-gray-200 rounded-lg text-[12px] font-medium text-[#1a2642] hover:bg-gray-50"
                        >
                          View details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="p-4 border-t border-gray-100 flex items-center justify-between text-gray-500 text-[13px]">
                <span>Showing 1–4 of 48 employees</span>
                <div className="flex gap-2">
                  <button className="px-3 py-1.5 rounded border border-gray-200 hover:bg-gray-50">Previous</button>
                  <button className="w-8 h-8 rounded bg-[#1a2642] text-white flex items-center justify-center font-medium">1</button>
                  <button className="w-8 h-8 rounded hover:bg-gray-50 flex items-center justify-center font-medium">2</button>
                  <button className="w-8 h-8 rounded hover:bg-gray-50 flex items-center justify-center font-medium">3</button>
                  <span className="flex items-end pb-2">...</span>
                  <button className="w-8 h-8 rounded hover:bg-gray-50 flex items-center justify-center font-medium">12</button>
                  <button className="px-3 py-1.5 rounded border border-gray-200 hover:bg-gray-50">Next</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* OVERLAYS */}
      {activeModal !== "none" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1a2642]/60 p-4">
          
          {/* Invite Modal */}
          {activeModal === "invite" && (
            <div className="bg-white rounded-xl shadow-xl w-full max-w-[700px] max-h-[90vh] overflow-y-auto custom-scrollbar relative animate-in fade-in zoom-in-95 duration-200">
              <div className="sticky top-0 bg-white p-8 pb-6 border-b border-gray-100 z-10">
                <div className="flex justify-between items-start">
                  <h2 className="text-[#1a2642] text-[22px] font-bold">Invite employee by email</h2>
                  <button onClick={() => setActiveModal("none")} className="text-gray-400 hover:text-gray-600"><X size={24} /></button>
                </div>
              </div>
              
              <div className="p-8 space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[#1a2642] text-[13px] font-medium mb-2">First name</label>
                    <input type="text" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:border-[#f97316]" />
                  </div>
                  <div>
                    <label className="block text-[#1a2642] text-[13px] font-medium mb-2">Last name</label>
                    <input type="text" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:border-[#f97316]" />
                  </div>
                </div>

                <div>
                  <label className="block text-[#1a2642] text-[13px] font-medium mb-2">Work email</label>
                  <input type="email" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:border-[#f97316]" />
                </div>

                <div>
                  <label className="block text-[#1a2642] text-[13px] font-medium mb-2">Job title</label>
                  <input type="text" placeholder="e.g. Security Officer, Area Supervisor" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:border-[#f97316]" />
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
                  <label className="block text-[#1a2642] text-[13px] font-medium mb-3">Managers (select all that apply)</label>
                  <div className="flex flex-wrap gap-2">
                    {["David Brown", "Emily Chen", "Carlos Rivera", "Priya Shah"].map(mgr => {
                      const isSelected = selectedManagers.includes(mgr);
                      return (
                        <button 
                          key={mgr} 
                          onClick={() => toggleSelection(setSelectedManagers, mgr)}
                          className={`px-4 py-1.5 rounded-full border text-[13px] font-medium flex items-center gap-1.5 transition-colors ${
                            isSelected ? "border-[#f97316] text-[#1a2642]" : "border-gray-200 text-[#1a2642] hover:bg-gray-50"
                          }`}
                        >
                          {isSelected && <span className="text-[#f97316]">✓</span>}
                          {mgr}
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
                  Send email invitation
                </button>
              </div>
            </div>
          )}

          {/* Details Modal */}
          {activeModal === "details" && (
            <div className="bg-white rounded-xl shadow-xl w-full max-w-[800px] overflow-hidden relative animate-in fade-in zoom-in-95 duration-200">
              <button onClick={() => setActiveModal("none")} className="absolute top-4 right-4 text-white hover:text-gray-200 z-10"><X size={24} /></button>
              
              <div className="bg-[#1a2642] p-8 pt-10 pb-16 relative">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-5">
                    <div className="w-[72px] h-[72px] rounded-2xl bg-[#f97316] flex items-center justify-center text-white font-bold text-3xl">
                      JS
                    </div>
                    <div>
                      <h2 className="text-white text-[28px] font-bold leading-tight mb-1">John Smith</h2>
                      <p className="text-[#8e9bb3] text-[14px] font-mono">EMP-1042 · Facilities Lead</p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[13px] font-semibold bg-green-50 text-green-600">
                    <span className="w-2 h-2 rounded-full bg-current"></span>
                    Active
                  </span>
                </div>
              </div>

              <div className="px-8 flex gap-8 border-b border-gray-100 bg-white relative -mt-10 pt-10 rounded-t-[32px]">
                {["Overview", "Documents", "Operational History"].map(tab => (
                  <button 
                    key={tab}
                    onClick={() => setActiveTab(tab as any)}
                    className={`pb-4 text-[14px] font-semibold transition-colors border-b-2 ${activeTab === tab ? "border-[#f97316] text-[#1a2642]" : "border-transparent text-gray-500 hover:text-[#1a2642]"}`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="p-8 bg-white min-h-[300px]">
                
                {activeTab === "Overview" && (
                  <div className="grid grid-cols-12 gap-8">
                    <div className="col-span-7 space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-4 rounded-xl">
                          <p className="text-gray-400 text-[10px] font-bold tracking-[0.1em] uppercase mb-1">EMPLOYEE ID</p>
                          <p className="text-[#1a2642] font-semibold text-[14px]">EMP-1042</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-xl">
                          <p className="text-gray-400 text-[10px] font-bold tracking-[0.1em] uppercase mb-1">JOB TITLE</p>
                          <p className="text-[#1a2642] font-semibold text-[14px]">Facilities Lead</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-4 rounded-xl">
                          <p className="text-gray-400 text-[10px] font-bold tracking-[0.1em] uppercase mb-1">VERIFIED EMAIL</p>
                          <p className="text-[#1a2642] font-semibold text-[13px]">✓ john@abcsecurity.io</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-xl">
                          <p className="text-gray-400 text-[10px] font-bold tracking-[0.1em] uppercase mb-1">VERIFIED MOBILE</p>
                          <p className="text-[#1a2642] font-semibold text-[13px]">✓ +31 6 1234 5678</p>
                        </div>
                      </div>

                      <div className="pt-4">
                        <p className="text-gray-400 text-[10px] font-bold tracking-[0.1em] uppercase mb-3">ASSIGNED ROLE & PERMISSIONS</p>
                        <div className="flex flex-wrap gap-2">
                          <span className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-full text-[12px] font-medium">Site Coordinator</span>
                          <span className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-full text-[12px] font-medium">Incident Reporter</span>
                          <span className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-full text-[12px] font-medium">View assigned records</span>
                          <span className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-full text-[12px] font-medium">Submit operational reports</span>
                        </div>
                      </div>
                    </div>

                    <div className="col-span-5">
                      <div className="border border-gray-100 rounded-xl p-5">
                        <p className="text-gray-400 text-[10px] font-bold tracking-[0.1em] uppercase mb-4">MULTI-ASSIGNMENT</p>
                        
                        <div className="mb-4">
                          <p className="text-gray-400 text-[11px] mb-1">Customers</p>
                          <p className="text-[#1a2642] font-semibold text-[13px]">ABC Facilities · LogiCo</p>
                        </div>
                        <div className="mb-4">
                          <p className="text-gray-400 text-[11px] mb-1">Locations</p>
                          <p className="text-[#1a2642] font-semibold text-[13px]">ABC HQ · Warehouse</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-[11px] mb-1">Managers</p>
                          <p className="text-[#1a2642] font-semibold text-[13px]">David Brown · Emily Chen</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "Documents" && (
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-[#1a2642] font-bold text-[15px]">Documents & certificates</h3>
                      <button className="px-4 py-2 border border-gray-200 rounded-lg text-[13px] font-medium text-gray-600 hover:bg-gray-50">
                        Upload document
                      </button>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-4 border border-gray-100 rounded-xl">
                        <div>
                          <p className="text-[#1a2642] font-semibold text-[14px]">First Aid Certificate</p>
                          <p className="text-[#f97316] text-[12px] mt-0.5">Expires 18 Oct 2026</p>
                        </div>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-medium bg-amber-50 text-amber-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-current"></span> Expiring
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center p-4 border border-gray-100 rounded-xl">
                        <div>
                          <p className="text-[#1a2642] font-semibold text-[14px]">Right to Work</p>
                          <p className="text-gray-400 text-[12px] mt-0.5">Expires 12 Mar 2028</p>
                        </div>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-medium bg-green-50 text-green-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-current"></span> Valid
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "Operational History" && (
                  <div className="grid grid-cols-3 gap-6">
                    <div className="p-6 border border-gray-100 rounded-xl bg-gray-50/50">
                      <p className="text-[#f97316] font-bold text-[28px] mb-2">18</p>
                      <p className="text-[#1a2642] font-semibold text-[14px] mb-1">Completed tasks</p>
                      <button className="text-gray-400 text-[12px] hover:text-[#f97316] transition-colors">Open detailed records →</button>
                    </div>
                    <div className="p-6 border border-gray-100 rounded-xl bg-gray-50/50">
                      <p className="text-[#f97316] font-bold text-[28px] mb-2">7</p>
                      <p className="text-[#1a2642] font-semibold text-[14px] mb-1">Patrols completed</p>
                      <button className="text-gray-400 text-[12px] hover:text-[#f97316] transition-colors">Open detailed records →</button>
                    </div>
                    <div className="p-6 border border-gray-100 rounded-xl bg-gray-50/50">
                      <p className="text-[#f97316] font-bold text-[28px] mb-2">12</p>
                      <p className="text-[#1a2642] font-semibold text-[14px] mb-1">Reports submitted</p>
                      <button className="text-gray-400 text-[12px] hover:text-[#f97316] transition-colors">Open detailed records →</button>
                    </div>
                  </div>
                )}

              </div>

              <div className="bg-white p-6 border-t border-gray-100 flex justify-end gap-3 rounded-b-xl">
                <button className="px-5 py-2.5 border border-gray-200 rounded-lg text-[14px] font-medium text-[#1a2642] hover:bg-gray-50">
                  Reset access
                </button>
                <button className="px-5 py-2.5 bg-red-50 text-red-600 rounded-lg text-[14px] font-medium hover:bg-red-100">
                  Deactivate employee
                </button>
              </div>

            </div>
          )}

          {/* Role Catalog Modal */}
          {activeModal === "roles" && (
            <div className="bg-white rounded-xl shadow-xl w-full max-w-[600px] overflow-hidden relative animate-in fade-in zoom-in-95 duration-200">
              <div className="p-8 pb-6 border-b border-gray-100">
                <div className="flex justify-between items-start mb-3">
                  <h2 className="text-[#1a2642] text-[22px] font-bold">Company role catalog</h2>
                  <button onClick={() => setActiveModal("none")} className="text-gray-400 hover:text-gray-600"><X size={24} /></button>
                </div>
                <p className="text-gray-500 text-[14px] leading-relaxed">
                  Roles and job titles are company-configurable. They can reflect your sector and are not limited to security operations.
                </p>
              </div>
              
              <div className="p-8">
                <div className="flex gap-3 mb-8">
                  <input type="text" placeholder="Add a role, e.g. Retail Supervisor" className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:border-[#f97316]" />
                  <button className="bg-[#f97316] hover:bg-[#e06511] text-white font-medium text-[14px] px-6 py-2.5 rounded-lg transition-colors">
                    Add role
                  </button>
                </div>

                <div className="space-y-0 border-b border-t border-gray-100 -mx-8 px-8">
                  {["Site Coordinator", "Incident Reporter", "Patrol Operator", "Maintenance Technician", "Customer Liaison"].map((role, idx) => (
                    <div key={role} className={`flex justify-between items-center py-4 ${idx !== 4 ? 'border-b border-gray-100' : ''}`}>
                      <span className="text-[#1a2642] text-[14px] font-semibold">{role}</span>
                      <button className="text-red-500 text-[13px] font-medium hover:underline">Remove</button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-8 pt-4 flex justify-end">
                <button onClick={() => setActiveModal("none")} className="bg-[#f97316] text-white rounded-lg text-[14px] font-medium px-8 py-2.5 hover:bg-[#e06511]">
                  Done
                </button>
              </div>
            </div>
          )}

        </div>
      )}
    </div>
  );
}
