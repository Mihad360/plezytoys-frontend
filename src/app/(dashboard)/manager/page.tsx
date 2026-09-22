"use client";

import { Bell, ChevronDown, X } from "lucide-react";
import { useState } from "react";

export default function ManagerDashboard() {
  const [activeModal, setActiveModal] = useState<"none" | "create-task">("none");

  return (
    <div className="flex flex-col h-full bg-[#f8f9fa] relative">
      {/* Top Header */}
      <header className="h-[72px] bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0">
        <div>
          <p className="text-gray-400 text-[11px] font-medium tracking-wide uppercase mb-0.5">SHIFTPOINT • MANAGER</p>
          <h1 className="text-[#1a2642] text-[18px] font-bold leading-tight">Manager Dashboard</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="px-4 py-1.5 bg-orange-50 border border-orange-100 text-[#d97706] rounded-full text-[13px] font-medium">
            Location scope: Location A
          </div>
          <div className="relative">
            <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors">
              <Bell size={20} />
            </button>
            <div className="absolute top-0 right-0 w-4 h-4 bg-[#b45f06] text-white text-[9px] font-bold flex items-center justify-center rounded-full border-2 border-white">4</div>
          </div>
          <div className="w-10 h-10 rounded-full bg-[#b45f06] flex items-center justify-center text-white font-bold text-sm">
            SA
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-8">
        <div className="max-w-[1200px] mx-auto">
          
          <div className="flex justify-between items-start mb-8">
            <div>
              <h2 className="text-[#1a2642] text-[28px] font-bold mb-1">Good morning, David</h2>
              <p className="text-gray-500 text-[14px]">Here's your operational overview for today.</p>
            </div>
            <div className="relative w-[250px]">
              <select className="w-full appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-[14px] text-[#1a2642] focus:outline-none shadow-sm">
                <option>Location A</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            </div>
          </div>

          <div className="grid grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <p className="text-gray-400 text-[11px] font-bold tracking-wide uppercase mb-2">ACTIVE EMPLOYEES</p>
              <p className="text-[#1a2642] font-bold text-[32px] leading-none">24</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <p className="text-gray-400 text-[11px] font-bold tracking-wide uppercase mb-2">ACTIVE PATROLS</p>
              <p className="text-[#f97316] font-bold text-[32px] leading-none">3</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <p className="text-gray-400 text-[11px] font-bold tracking-wide uppercase mb-2">TASKS PENDING</p>
              <p className="text-[#d97706] font-bold text-[32px] leading-none">12</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <p className="text-gray-400 text-[11px] font-bold tracking-wide uppercase mb-2">REPORTS TO REVIEW</p>
              <p className="text-purple-600 font-bold text-[32px] leading-none">7</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            
            <div className="col-span-2 space-y-6">
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="text-[#1a2642] font-bold text-[16px] mb-4">Attention required</h3>
                <div className="space-y-3">
                  <div className="p-4 border border-gray-100 rounded-lg flex justify-between items-center bg-gray-50">
                    <div>
                      <p className="text-[#1a2642] font-semibold text-[14px]">GPS Anomaly</p>
                      <p className="text-gray-500 text-[12px] mt-0.5">Employee outside permitted zone</p>
                      <p className="text-orange-500 text-[12px] font-medium mt-1">John Doe · Cleaning Task · Floor 2</p>
                    </div>
                    <button className="px-4 py-2 border border-gray-200 bg-white rounded-lg text-[13px] font-medium text-gray-600 hover:bg-gray-50 shadow-sm">Review</button>
                  </div>
                  <div className="p-4 border border-gray-100 rounded-lg flex justify-between items-center bg-gray-50">
                    <div>
                      <p className="text-[#1a2642] font-semibold text-[14px]">Missed Checkpoint</p>
                      <p className="text-gray-500 text-[12px] mt-0.5">Morning Patrol - Location A</p>
                      <p className="text-red-500 text-[12px] font-medium mt-1">No valid scan received for Storage Area</p>
                    </div>
                    <button className="px-4 py-2 border border-gray-200 bg-white rounded-lg text-[13px] font-medium text-gray-600 hover:bg-gray-50 shadow-sm">Review</button>
                  </div>
                  <div className="p-4 border border-gray-100 rounded-lg flex justify-between items-center bg-gray-50">
                    <div>
                      <p className="text-[#1a2642] font-semibold text-[14px]">Overdue Task</p>
                      <p className="text-gray-500 text-[12px] mt-0.5">Equipment inspection · Location A</p>
                      <p className="text-orange-500 text-[12px] font-medium mt-1">Assigned to: Michael Lee</p>
                    </div>
                    <button className="px-4 py-2 border border-gray-200 bg-white rounded-lg text-[13px] font-medium text-gray-600 hover:bg-gray-50 shadow-sm">Review</button>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-1">
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="text-[#1a2642] font-bold text-[16px] mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button onClick={() => setActiveModal("create-task")} className="w-full py-3 bg-[#b45f06] hover:bg-[#964f05] text-white rounded-lg text-[14px] font-medium transition-colors shadow-sm">
                    Create Task
                  </button>
                  <button className="w-full py-3 bg-gray-50 hover:bg-gray-100 border border-gray-100 text-gray-700 rounded-lg text-[14px] font-medium transition-colors">
                    View Attendance
                  </button>
                  <button className="w-full py-3 bg-gray-50 hover:bg-gray-100 border border-gray-100 text-gray-700 rounded-lg text-[14px] font-medium transition-colors">
                    Monitor Patrols
                  </button>
                  <button className="w-full py-3 bg-gray-50 hover:bg-gray-100 border border-gray-100 text-gray-700 rounded-lg text-[14px] font-medium transition-colors">
                    Review Reports
                  </button>
                </div>
                
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <h3 className="text-[#1a2642] font-bold text-[14px] mb-3">Recent Activity</h3>
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <div className="w-2 h-2 rounded-full bg-orange-500 mt-1.5 shrink-0"></div>
                      <div>
                        <p className="text-[#1a2642] text-[13px] font-medium">GPS anomaly detected</p>
                        <p className="text-gray-400 text-[11px]">10 mins ago</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-2 h-2 rounded-full bg-red-500 mt-1.5 shrink-0"></div>
                      <div>
                        <p className="text-[#1a2642] text-[13px] font-medium">Checkpoint missed</p>
                        <p className="text-gray-400 text-[11px]">15 mins ago</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5 shrink-0"></div>
                      <div>
                        <p className="text-[#1a2642] text-[13px] font-medium">Patrol completed</p>
                        <p className="text-gray-400 text-[11px]">30 mins ago</p>
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
      {activeModal === "create-task" && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-[#1a2642]/60 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-[700px] animate-in fade-in zoom-in-95 duration-200 my-8">
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h3 className="text-[#1a2642] text-[20px] font-bold">Create Task</h3>
              <button onClick={() => setActiveModal("none")} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>
            
            <div className="p-8 space-y-6">
              
              <div>
                <label className="block text-[#1a2642] text-[13px] font-medium mb-2">Task title</label>
                <input 
                  type="text" 
                  placeholder="Enter task name" 
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:border-[#f97316]"
                />
              </div>

              <div>
                <label className="block text-[#1a2642] text-[13px] font-medium mb-2">Description / Instructions</label>
                <textarea 
                  rows={4}
                  placeholder="Describe what needs to be completed..." 
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:border-[#f97316] resize-none"
                ></textarea>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-[#1a2642] text-[13px] font-medium mb-2">Assign to</label>
                  <div className="relative">
                    <select className="w-full appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-[14px] text-[#1a2642] focus:outline-none">
                      <option>Authorised Employee</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  </div>
                </div>
                <div>
                  <label className="block text-[#1a2642] text-[13px] font-medium mb-2">Location</label>
                  <div className="relative">
                    <select className="w-full appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-[14px] text-[#1a2642] focus:outline-none">
                      <option>Location A</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-[#1a2642] text-[13px] font-medium mb-2">Priority</label>
                  <div className="relative">
                    <select className="w-full appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-[14px] text-[#1a2642] focus:outline-none">
                      <option>Medium</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  </div>
                </div>
                <div>
                  <label className="block text-[#1a2642] text-[13px] font-medium mb-2">Due date</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:border-[#f97316]"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded text-[#f97316] border-gray-300 focus:ring-[#f97316]" />
                  <span className="text-gray-600 text-[13px]">Photo</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded text-[#f97316] border-gray-300 focus:ring-[#f97316]" />
                  <span className="text-gray-600 text-[13px]">Video</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded text-[#f97316] border-gray-300 focus:ring-[#f97316]" />
                  <span className="text-gray-600 text-[13px]">File</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded text-[#f97316] border-gray-300 focus:ring-[#f97316]" />
                  <span className="text-gray-600 text-[13px]">Comment</span>
                </label>
              </div>

            </div>

            <div className="p-6 border-t border-gray-100 flex justify-center gap-3 bg-white rounded-b-xl">
              <button onClick={() => setActiveModal("none")} className="px-6 py-2.5 border border-gray-200 rounded-lg text-[14px] font-medium text-gray-600 hover:bg-gray-50">
                Cancel
              </button>
              <button className="px-6 py-2.5 border border-gray-200 rounded-lg text-[14px] font-medium text-[#1a2642] hover:bg-gray-50">
                Save Draft
              </button>
              <button className="px-6 py-2.5 bg-[#f97316] hover:bg-[#e06511] text-white rounded-lg text-[14px] font-medium transition-colors">
                Create & Assign
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
