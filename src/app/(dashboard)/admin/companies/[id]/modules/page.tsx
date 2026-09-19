"use client";

import Link from "next/link";
import { Bell } from "lucide-react";
import { useState } from "react";

const CORE_MODULES = [
  "Workforce", "Employees", "Customers", "Locations", "Tasks", "Checklists",
  "Reports", "Time Tracking / Clock In & Out", "Patrols & Rounds", "Incident Reports",
  "Certificates & Expiry Alerts", "Notifications", "Client/Guest Portal"
];

const OPTIONAL_MODULES = [
  "NFC Checkpoints", "GPS Verification", "Documents", "Communication", "AI Assistant"
];

export default function ModuleManagementPage() {
  // Mocking state for toggles. In reality, these would come from props/API.
  const [coreToggles, setCoreToggles] = useState<Record<string, boolean>>(
    CORE_MODULES.reduce((acc, curr) => ({ ...acc, [curr]: true }), {})
  );
  
  const [optToggles, setOptToggles] = useState<Record<string, boolean>>({
    "NFC Checkpoints": false,
    "GPS Verification": false,
    "Documents": false,
    "Communication": false,
    "AI Assistant": true,
  });

  const handleCoreToggle = (mod: string) => setCoreToggles(prev => ({...prev, [mod]: !prev[mod]}));
  const handleOptToggle = (mod: string) => setOptToggles(prev => ({...prev, [mod]: !prev[mod]}));

  return (
    <div className="flex flex-col h-full bg-[#f8f9fa]">
      {/* Top Header */}
      <header className="h-[72px] bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0">
        <div>
          <h1 className="text-[#1a2642] text-xl font-bold">Module Management</h1>
          <p className="text-gray-400 text-xs mt-0.5">SHIFTPOINT • Super Admin</p>
        </div>
        <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors">
          <Bell size={20} />
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-8">
        <div className="max-w-[700px]">
          
          <Link href="/admin/companies/1" className="inline-flex items-center text-gray-500 font-medium text-[13px] hover:text-[#1a2642] transition-colors mb-6">
            <span className="mr-2">←</span> Greenfield Services
          </Link>

          <div className="mb-8">
            <h2 className="text-[#1a2642] text-[24px] font-bold mb-1">Module Management</h2>
            <p className="text-gray-500 text-[14px]">Select modules available for Greenfield Services</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
            
            {/* CORE MODULES */}
            <div className="mb-10">
              <h3 className="text-gray-400 text-[11px] font-bold tracking-[0.1em] uppercase mb-6">
                CORE MODULES
              </h3>
              
              <div className="space-y-5">
                {CORE_MODULES.map(module => (
                  <div key={module} className="flex items-center justify-between">
                    <span className="text-[#1a2642] text-[14px] font-semibold">{module}</span>
                    
                    <button 
                      onClick={() => handleCoreToggle(module)}
                      className={`relative inline-flex h-[22px] w-10 items-center rounded-full transition-colors ${
                        coreToggles[module] ? "bg-orange-100" : "bg-gray-200"
                      }`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        coreToggles[module] ? "translate-x-[22px] bg-[#f97316]" : "translate-x-[3px] bg-white"
                      }`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <hr className="border-gray-100 mb-10" />

            {/* OPTIONAL MODULES */}
            <div className="mb-12">
              <h3 className="text-gray-400 text-[11px] font-bold tracking-[0.1em] uppercase mb-6">
                OPTIONAL MODULES
              </h3>
              
              <div className="space-y-5">
                {OPTIONAL_MODULES.map(module => (
                  <div key={module} className="flex items-center justify-between">
                    <span className="text-[#1a2642] text-[14px] font-semibold">{module}</span>
                    
                    <button 
                      onClick={() => handleOptToggle(module)}
                      className={`relative inline-flex h-[22px] w-10 items-center rounded-full transition-colors ${
                        optToggles[module] ? "bg-orange-100" : "bg-gray-200"
                      }`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full transition-transform ${
                        optToggles[module] ? "translate-x-[22px] bg-[#f97316]" : "translate-x-[3px] bg-white"
                      }`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex items-center gap-3">
              <button className="bg-[#f97316] hover:bg-[#e06511] text-white font-medium text-[14px] px-6 py-2.5 rounded-lg transition-colors">
                Save Modules
              </button>
              <Link
                href="/admin/companies/1"
                className="inline-flex bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium text-[14px] px-6 py-2.5 rounded-lg transition-colors"
              >
                Cancel
              </Link>
            </div>

          </div>

        </div>
      </main>
    </div>
  );
}
