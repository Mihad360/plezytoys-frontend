"use client";

import { Bell, ChevronDown, X } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function RolesPermissionsPage() {
  const [activeModal, setActiveModal] = useState<"none" | "create">("none");

  return (
    <div className="flex flex-col h-full bg-[#f8f9fa] relative">
      {/* Top Header */}
      <header className="h-[72px] bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0">
        <div>
          <p className="text-gray-400 text-[11px] font-medium tracking-wide uppercase mb-0.5">SHIFTPOINT • People • Roles & Permissions</p>
          <h1 className="text-[#1a2642] text-[18px] font-bold leading-tight">Roles & Permissions</h1>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/company-admin/subscription" className="flex items-center gap-2 px-4 py-1.5 border border-orange-200 bg-orange-50 rounded-full text-[#f97316] text-[13px] font-semibold hover:bg-orange-100 transition-colors">
            <span className="text-[16px]">★</span> Subscription
          </Link>
          <div className="relative">
            <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors">
              <Bell size={20} />
            </button>
          </div>
          <div className="w-10 h-10 rounded-full bg-[#b45f06] flex items-center justify-center text-white font-bold text-sm">
            CA
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-8">
        <div className="max-w-[1300px] mx-auto">
          
          <div className="flex justify-between items-start mb-8">
            <div>
              <h2 className="text-[#1a2642] text-[24px] font-bold mb-1">Roles & Permissions</h2>
              <p className="text-gray-500 text-[14px]">Control what people can do and which company data they can access.</p>
            </div>
            <button 
              onClick={() => setActiveModal("create")}
              className="px-5 py-2.5 bg-[#f97316] hover:bg-[#e06511] text-white rounded-lg text-[14px] font-medium transition-colors"
            >
              + Create role
            </button>
          </div>

          <div className="flex gap-6 items-start">
            
            {/* Left Panel: Roles Catalog */}
            <div className="w-[300px] shrink-0 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="flex justify-between items-center p-5 border-b border-gray-100">
                <h3 className="text-gray-400 text-[10px] font-bold tracking-wide uppercase">ROLE CATALOG</h3>
                <span className="text-gray-400 text-[12px]">6 active</span>
              </div>
              
              <div className="p-2 space-y-1">
                <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 flex justify-between items-center group">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                    <div>
                      <p className="text-[#1a2642] font-semibold text-[14px] leading-tight">Company Admin</p>
                      <p className="text-gray-400 text-[11px]">2 assigned users</p>
                    </div>
                  </div>
                  <span className="text-gray-400 text-[9px] font-bold tracking-wider">SYSTEM</span>
                </button>
                
                <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 flex justify-between items-center group">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <div>
                      <p className="text-[#1a2642] font-semibold text-[14px] leading-tight">Manager</p>
                      <p className="text-gray-400 text-[11px]">6 assigned users</p>
                    </div>
                  </div>
                  <span className="text-gray-400 text-[9px] font-bold tracking-wider">SYSTEM</span>
                </button>

                <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 flex justify-between items-center group">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                    <div>
                      <p className="text-[#1a2642] font-semibold text-[14px] leading-tight">Employee</p>
                      <p className="text-gray-400 text-[11px]">48 assigned users</p>
                    </div>
                  </div>
                  <span className="text-gray-400 text-[9px] font-bold tracking-wider">SYSTEM</span>
                </button>

                <div className="my-2 border-t border-gray-50"></div>

                <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 flex justify-between items-center group">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                    <div>
                      <p className="text-[#1a2642] font-semibold text-[14px] leading-tight">Untitled role</p>
                      <p className="text-gray-400 text-[11px]">0 assigned users</p>
                    </div>
                  </div>
                  <span className="text-purple-600 text-[9px] font-bold tracking-wider">CUSTOM</span>
                </button>

                <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 flex justify-between items-center group">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                    <div>
                      <p className="text-[#1a2642] font-semibold text-[14px] leading-tight">Admin</p>
                      <p className="text-gray-400 text-[11px]">0 assigned users</p>
                    </div>
                  </div>
                  <span className="text-purple-600 text-[9px] font-bold tracking-wider">CUSTOM</span>
                </button>

                <button className="w-full text-left p-3 rounded-lg bg-orange-50/50 border border-orange-100 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                    <div>
                      <p className="text-[#1a2642] font-semibold text-[14px] leading-tight">Admin copy</p>
                      <p className="text-gray-500 text-[11px]">0 assigned users</p>
                    </div>
                  </div>
                  <span className="text-purple-700 text-[9px] font-bold tracking-wider">CUSTOM</span>
                </button>
              </div>
            </div>

            {/* Right Panel: Role Details */}
            <div className="flex-1 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
              
              <div className="flex justify-between items-start border-b border-gray-100 pb-6 mb-8">
                <div>
                  <h3 className="text-[#1a2642] text-[24px] font-bold mb-1">Admin copy</h3>
                  <p className="text-gray-500 text-[13px]">0 users assigned · 31 permissions granted</p>
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-1.5 border border-gray-200 rounded-lg text-[13px] font-medium text-gray-600 hover:bg-gray-50">Duplicate</button>
                  <button className="px-4 py-1.5 border border-gray-200 rounded-lg text-[13px] font-medium text-gray-600 hover:bg-gray-50">Rename</button>
                  <button className="px-4 py-1.5 bg-red-50 text-red-600 border border-red-100 rounded-lg text-[13px] font-medium hover:bg-red-100">Archive</button>
                </div>
              </div>

              <div className="grid grid-cols-12 gap-12">
                
                {/* Meta Column */}
                <div className="col-span-4 space-y-8">
                  <div>
                    <p className="text-gray-400 text-[10px] font-bold tracking-wide uppercase mb-3">DATA SCOPE</p>
                    <div className="relative mb-3">
                      <select className="w-full appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-[14px] text-[#1a2642] focus:outline-none">
                        <option>Assigned customers only</option>
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    </div>
                    <p className="text-gray-400 text-[12px] leading-relaxed">
                      Scope applies to every granted action, so roles can work across your company or only their assigned records.
                    </p>
                  </div>

                  <div className="pt-8 border-t border-gray-100">
                    <p className="text-gray-400 text-[10px] font-bold tracking-wide uppercase mb-3">ASSIGNMENT SAFETY</p>
                    <p className="text-gray-600 text-[13px] leading-relaxed">
                      No users yet. Configure this role before assigning it.
                    </p>
                  </div>
                </div>

                {/* Permissions Column */}
                <div className="col-span-8">
                  <div className="flex justify-between items-center mb-6">
                    <p className="text-gray-400 text-[10px] font-bold tracking-wide uppercase">ALLOWED ACTIONS</p>
                    <button className="px-5 py-2 bg-[#f97316] hover:bg-[#e06511] text-white rounded-lg text-[13px] font-medium transition-colors">
                      Save changes
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-x-8 gap-y-10">
                    
                    {/* People */}
                    <div>
                      <h4 className="text-[#1a2642] text-[14px] font-medium mb-4 pb-2 border-b border-gray-50">People</h4>
                      <div className="space-y-3">
                        {["View employees", "Create & invite employees", "Edit employees", "Deactivate employees"].map(p => (
                          <label key={p} className="flex items-center gap-3 cursor-pointer">
                            <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-[#f97316] border-gray-300 focus:ring-[#f97316]" />
                            <span className="text-gray-600 text-[13px]">{p}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Customers */}
                    <div>
                      <h4 className="text-[#1a2642] text-[14px] font-medium mb-4 pb-2 border-b border-gray-50">Customers</h4>
                      <div className="space-y-3">
                        {["View customers", "Create customers", "Edit customers", "Archive customers"].map(p => (
                          <label key={p} className="flex items-center gap-3 cursor-pointer">
                            <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-[#f97316] border-gray-300 focus:ring-[#f97316]" />
                            <span className="text-gray-600 text-[13px]">{p}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Locations */}
                    <div>
                      <h4 className="text-[#1a2642] text-[14px] font-medium mb-4 pb-2 border-b border-gray-50">Locations</h4>
                      <div className="space-y-3">
                        {["View locations", "Create locations", "Edit locations", "Archive locations"].map(p => (
                          <label key={p} className="flex items-center gap-3 cursor-pointer">
                            <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-[#f97316] border-gray-300 focus:ring-[#f97316]" />
                            <span className="text-gray-600 text-[13px]">{p}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Customer Portal Users */}
                    <div>
                      <h4 className="text-[#1a2642] text-[14px] font-medium mb-4 pb-2 border-b border-gray-50">Customer Portal Users</h4>
                      <div className="space-y-3">
                        {["View portal users", "Invite portal users", "Edit portal access", "Revoke portal access"].map(p => (
                          <label key={p} className="flex items-center gap-3 cursor-pointer">
                            <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-[#f97316] border-gray-300 focus:ring-[#f97316]" />
                            <span className="text-gray-600 text-[13px]">{p}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Operations */}
                    <div>
                      <h4 className="text-[#1a2642] text-[14px] font-medium mb-4 pb-2 border-b border-gray-50">Operations</h4>
                      <div className="space-y-3">
                        {["View attendance & GPS", "View patrols & checkpoints", "Create & manage tasks", "Review & approve reports"].map(p => (
                          <label key={p} className="flex items-center gap-3 cursor-pointer">
                            <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-[#f97316] border-gray-300 focus:ring-[#f97316]" />
                            <span className="text-gray-600 text-[13px]">{p}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Announcements & Chat */}
                    <div>
                      <h4 className="text-[#1a2642] text-[14px] font-medium mb-4 pb-2 border-b border-gray-50">Announcements & Chat</h4>
                      <div className="space-y-3">
                        {["View conversations", "Send chat messages", "Create announcements", "Manage announcements"].map(p => (
                          <label key={p} className="flex items-center gap-3 cursor-pointer">
                            <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-[#f97316] border-gray-300 focus:ring-[#f97316]" />
                            <span className="text-gray-600 text-[13px]">{p}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Notifications */}
                    <div>
                      <h4 className="text-[#1a2642] text-[14px] font-medium mb-4 pb-2 border-b border-gray-50">Notifications</h4>
                      <div className="space-y-3">
                        {["View notifications", "Manage notification rules"].map(p => (
                          <label key={p} className="flex items-center gap-3 cursor-pointer">
                            <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-[#f97316] border-gray-300 focus:ring-[#f97316]" />
                            <span className="text-gray-600 text-[13px]">{p}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* AI Assistant */}
                    <div>
                      <h4 className="text-[#1a2642] text-[14px] font-medium mb-4 pb-2 border-b border-gray-50">AI Assistant</h4>
                      <div className="space-y-3">
                        {["Use AI Assistant", "Manage knowledge sources", "Review unresolved questions"].map(p => (
                          <label key={p} className="flex items-center gap-3 cursor-pointer">
                            <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-[#f97316] border-gray-300 focus:ring-[#f97316]" />
                            <span className="text-gray-600 text-[13px]">{p}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Audit Log */}
                    <div>
                      <h4 className="text-[#1a2642] text-[14px] font-medium mb-4 pb-2 border-b border-gray-50">Audit Log</h4>
                      <div className="space-y-3">
                        {["View audit log", "Export audit log"].map(p => (
                          <label key={p} className="flex items-center gap-3 cursor-pointer">
                            <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-[#f97316] border-gray-300 focus:ring-[#f97316]" />
                            <span className="text-gray-600 text-[13px]">{p}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </main>

      {/* MODALS */}
      {activeModal === "create" && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-[#1a2642]/60 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-[500px] animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h3 className="text-[#1a2642] text-[20px] font-bold">Create custom role</h3>
              <button onClick={() => setActiveModal("none")} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>
            
            <div className="p-8 space-y-6">
              
              <div>
                <label className="block text-[#1a2642] text-[13px] font-medium mb-2">Role name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Facilities Supervisor" 
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:border-[#f97316]"
                />
              </div>

              <div>
                <label className="block text-[#1a2642] text-[13px] font-medium mb-2">Based on (optional)</label>
                <div className="relative">
                  <select className="w-full appearance-none bg-white border border-gray-200 rounded-lg px-4 py-3 text-[14px] text-[#1a2642] focus:outline-none">
                    <option>Start with no permissions</option>
                    <option>Company Admin</option>
                    <option>Manager</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                </div>
              </div>

              <p className="text-gray-500 text-[13px] pt-4">
                After creation, you'll be taken straight to the complete permissions configuration before users can be assigned.
              </p>

            </div>

            <div className="p-6 border-t border-gray-100 flex justify-end gap-3 bg-gray-50 rounded-b-xl">
              <button onClick={() => setActiveModal("none")} className="px-6 py-2.5 border border-gray-200 rounded-lg text-[14px] font-medium text-gray-600 hover:bg-gray-50 bg-white">
                Cancel
              </button>
              <button className="px-6 py-2.5 bg-[#f97316] hover:bg-[#e06511] text-white rounded-lg text-[14px] font-medium transition-colors">
                Create & configure
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
