"use client";

import { Bell, ChevronDown, X } from "lucide-react";
import { useState } from "react";

export default function ManagerEmployeesPage() {
  const [activeModal, setActiveModal] = useState<"none" | "view-employee">("none");

  return (
    <div className="flex flex-col h-full bg-[#f8f9fa] relative">
      <header className="h-[72px] bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0">
        <div>
          <p className="text-gray-400 text-[11px] font-medium tracking-wide uppercase mb-0.5">SHIFTPOINT • MANAGER</p>
          <h1 className="text-[#1a2642] text-[18px] font-bold leading-tight">Employees</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="px-4 py-1.5 bg-orange-50 border border-orange-100 text-[#d97706] rounded-full text-[13px] font-medium">
            Location scope: Location A
          </div>
          <div className="relative">
            <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors">
              <Bell size={20} />
            </button>
          </div>
          <div className="w-10 h-10 rounded-full bg-[#b45f06] flex items-center justify-center text-white font-bold text-sm">
            SA
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-auto p-8">
        <div className="max-w-[1200px] mx-auto">
          
          <div className="mb-6">
            <p className="text-gray-500 text-[14px]">Monitor employees assigned to your authorised locations and operations.</p>
          </div>

          <div className="flex gap-4 mb-6">
            <input 
              type="text" 
              placeholder="Search by name, employee ID..." 
              className="w-[300px] px-4 py-2 bg-white border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:border-[#f97316]"
            />
            <div className="relative w-[200px]">
              <select className="w-full appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 text-[14px] text-[#1a2642] focus:outline-none">
                <option>All assigned locations</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            </div>
            <div className="relative w-[150px]">
              <select className="w-full appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 text-[14px] text-[#1a2642] focus:outline-none">
                <option>All statuses</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <table className="w-full text-left text-[13px]">
              <thead>
                <tr className="border-b border-gray-100 text-gray-400 text-[11px] font-semibold tracking-wider">
                  <th className="py-4 px-6 font-medium">Employee</th>
                  <th className="py-4 px-6 font-medium">Location</th>
                  <th className="py-4 px-6 font-medium">Status</th>
                  <th className="py-4 px-6 font-medium">Clock In</th>
                  <th className="py-4 px-6 font-medium">Current Activity</th>
                  <th className="py-4 px-6 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50">
                  <td className="py-4 px-6">
                    <p className="font-semibold text-[#1a2642]">John Doe</p>
                    <p className="text-gray-400 text-[11px]">EMP-1042</p>
                  </td>
                  <td className="py-4 px-6 text-gray-600">Location A</td>
                  <td className="py-4 px-6">
                    <span className="px-2.5 py-1 bg-green-100 text-green-700 rounded-full text-[11px] font-medium">Working</span>
                  </td>
                  <td className="py-4 px-6 text-gray-600">08:02</td>
                  <td className="py-4 px-6 text-gray-600">Cleaning Task — Floor 2</td>
                  <td className="py-4 px-6">
                    <button onClick={() => setActiveModal("view-employee")} className="px-4 py-1.5 border border-gray-200 rounded text-[12px] font-medium text-gray-600 hover:bg-gray-50">
                      View
                    </button>
                  </td>
                </tr>
                <tr className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50">
                  <td className="py-4 px-6">
                    <p className="font-semibold text-[#1a2642]">Sarah Smith</p>
                    <p className="text-gray-400 text-[11px]">EMP-1088</p>
                  </td>
                  <td className="py-4 px-6 text-gray-600">Location B</td>
                  <td className="py-4 px-6">
                    <span className="px-2.5 py-1 bg-green-100 text-green-700 rounded-full text-[11px] font-medium">Working</span>
                  </td>
                  <td className="py-4 px-6 text-gray-600">08:15</td>
                  <td className="py-4 px-6 text-gray-600">Morning Patrol</td>
                  <td className="py-4 px-6">
                    <button className="px-4 py-1.5 border border-gray-200 rounded text-[12px] font-medium text-gray-600 hover:bg-gray-50">
                      View
                    </button>
                  </td>
                </tr>
                <tr className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50">
                  <td className="py-4 px-6">
                    <p className="font-semibold text-[#1a2642]">Michael Lee</p>
                    <p className="text-gray-400 text-[11px]">EMP-1116</p>
                  </td>
                  <td className="py-4 px-6 text-gray-600">Location A</td>
                  <td className="py-4 px-6">
                    <span className="px-2.5 py-1 bg-red-100 text-red-700 rounded-full text-[11px] font-medium">Issue</span>
                  </td>
                  <td className="py-4 px-6 text-gray-600">08:20</td>
                  <td className="py-4 px-6 text-gray-600">GPS Anomaly</td>
                  <td className="py-4 px-6">
                    <button className="px-4 py-1.5 border border-gray-200 rounded text-[12px] font-medium text-gray-600 hover:bg-gray-50">
                      View
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>
      </main>

      {/* MODALS */}
      {activeModal === "view-employee" && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-[#1a2642]/60 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-[500px] animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-6 pb-2">
              <h3 className="text-[#1a2642] text-[18px] font-bold">Employee Activity</h3>
              <button onClick={() => setActiveModal("none")} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>
            
            <div className="p-6 pt-2">
              <h4 className="text-[#1a2642] text-[16px] mb-4">John Doe</h4>
              
              <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-[13px] text-gray-600">
                <p>Employee ID: <span className="font-medium text-[#1a2642]">EMP-1042</span></p>
                <p>Location: <span className="font-medium text-[#1a2642]">Location A</span></p>
                <p>Status: <span className="font-medium text-[#1a2642]">Currently working</span></p>
                <p>Current activity: <span className="font-medium text-[#1a2642]">Cleaning Task — Floor 2</span></p>
                <p>GPS: <span className="font-medium text-[#1a2642]">Validated</span></p>
              </div>

            </div>

            <div className="p-6 border-t border-gray-100">
              <button onClick={() => setActiveModal("none")} className="px-6 py-2 border border-gray-200 rounded-lg text-[14px] font-medium text-gray-600 hover:bg-gray-50">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
