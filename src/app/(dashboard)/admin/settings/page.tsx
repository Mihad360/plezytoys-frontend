"use client";

import { Bell } from "lucide-react";
import { useState } from "react";

const TABS = ["Platform", "Security", "Authentication", "Notifications", "Data", "Modules"];

export default function SystemSettingsPage() {
  const [activeTab, setActiveTab] = useState("Platform");
  const [showModuleModal, setShowModuleModal] = useState(false);

  // Helper toggle component
  const ToggleRow = ({ label, sublabel = "", checked = false, onToggle = () => {} }: any) => (
    <div className="flex items-center justify-between py-6 border-b border-gray-100 last:border-0">
      <div>
        <p className="text-[#1a2642] text-[14px] font-semibold">{label}</p>
        {sublabel && <p className="text-gray-400 text-[12px] mt-1">{sublabel}</p>}
      </div>
      <button 
        onClick={onToggle}
        className={`relative inline-flex h-[22px] w-10 items-center rounded-full transition-colors shrink-0 ${
          checked ? "bg-[#f97316]" : "bg-gray-200"
        }`}
      >
        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          checked ? "translate-x-[22px]" : "translate-x-[3px]"
        }`} />
      </button>
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-[#f8f9fa] relative">
      {/* Top Header */}
      <header className="h-[72px] bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0">
        <div>
          <h1 className="text-[#1a2642] text-xl font-bold">System Settings</h1>
          <p className="text-gray-400 text-xs mt-0.5">SHIFTPOINT • Super Admin</p>
        </div>
        <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors">
          <Bell size={20} />
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-8">
        <div className="max-w-[800px]">
          
          <div className="mb-6">
            <h2 className="text-[#1a2642] text-[24px] font-bold mb-1">System Settings</h2>
            <p className="text-gray-500 text-[14px]">Configure platform defaults, security controls and governance.</p>
          </div>

          {/* Tabs */}
          <div className="flex items-center p-1 bg-white border border-gray-200 rounded-lg w-fit mb-8">
            {TABS.map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 text-[13px] font-medium rounded-md transition-colors ${
                  activeTab === tab
                    ? "bg-[#1a2642] text-white"
                    : "text-gray-500 hover:text-[#1a2642] hover:bg-gray-50"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content: Platform */}
          {activeTab === "Platform" && (
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
              <div className="grid grid-cols-2 gap-x-6 gap-y-6 mb-6">
                <div>
                  <label className="block text-gray-500 text-[11px] font-bold tracking-[0.1em] uppercase mb-2">PLATFORM NAME</label>
                  <input type="text" defaultValue="SHIFTPOINT" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-[14px] text-[#1a2642] focus:outline-none focus:border-[#f97316]" />
                </div>
                <div>
                  <label className="block text-gray-500 text-[11px] font-bold tracking-[0.1em] uppercase mb-2">SUPPORT EMAIL</label>
                  <input type="text" defaultValue="support@shiftpoint.io" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-[14px] text-[#1a2642] focus:outline-none focus:border-[#f97316]" />
                </div>
                <div>
                  <label className="block text-gray-500 text-[11px] font-bold tracking-[0.1em] uppercase mb-2">TERMS & CONDITIONS URL</label>
                  <input type="text" defaultValue="https://shiftpoint.io/terms" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-[14px] text-[#1a2642] focus:outline-none focus:border-[#f97316]" />
                </div>
                <div>
                  <label className="block text-gray-500 text-[11px] font-bold tracking-[0.1em] uppercase mb-2">PRIVACY POLICY URL</label>
                  <input type="text" defaultValue="https://shiftpoint.io/privacy" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-[14px] text-[#1a2642] focus:outline-none focus:border-[#f97316]" />
                </div>
                <div>
                  <label className="block text-gray-500 text-[11px] font-bold tracking-[0.1em] uppercase mb-2">DEFAULT LANGUAGE</label>
                  <select className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-[14px] text-[#1a2642] focus:outline-none focus:border-[#f97316] bg-white">
                    <option>English</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-500 text-[11px] font-bold tracking-[0.1em] uppercase mb-2">DEFAULT CURRENCY</label>
                  <select className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-[14px] text-[#1a2642] focus:outline-none focus:border-[#f97316] bg-white">
                    <option>EUR (€)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-500 text-[11px] font-bold tracking-[0.1em] uppercase mb-2">TIMEZONE</label>
                  <select className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-[14px] text-[#1a2642] focus:outline-none focus:border-[#f97316] bg-white">
                    <option>Europe/Amsterdam (CET)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-500 text-[11px] font-bold tracking-[0.1em] uppercase mb-2">DATE & TIME FORMAT</label>
                  <select className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-[14px] text-[#1a2642] focus:outline-none focus:border-[#f97316] bg-white">
                    <option>DD/MM/YYYY · 24-hour</option>
                  </select>
                </div>
              </div>

              <div className="border border-dashed border-gray-300 rounded-xl p-6 mb-8 text-center bg-gray-50/50">
                <p className="text-[#1a2642] font-semibold text-[14px] mb-1">Platform logo & favicon</p>
                <p className="text-gray-400 text-[13px] mb-3">SHIFTPOINT Version 2 logo is currently active.</p>
                <button className="text-[#f97316] font-medium text-[13px] hover:underline">Upload replacement</button>
              </div>

              <button className="bg-[#f97316] hover:bg-[#e06511] text-white font-medium text-[14px] px-6 py-2.5 rounded-lg transition-colors">
                Save Changes
              </button>
            </div>
          )}

          {/* Tab Content: Security */}
          {activeTab === "Security" && (
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm px-8 py-2">
              <ToggleRow label="Require 2FA for all admin accounts" checked={true} />
              <ToggleRow label="IP allowlist enforcement" checked={false} />
              <ToggleRow label="Session timeout after inactivity (30 min)" checked={true} />
              <ToggleRow label="Audit logging for all actions" checked={true} />
              <ToggleRow label="Password complexity enforcement" checked={true} />
              
              <div className="py-6">
                <button className="bg-[#f97316] hover:bg-[#e06511] text-white font-medium text-[14px] px-6 py-2.5 rounded-lg transition-colors">
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {/* Tab Content: Authentication */}
          {activeTab === "Authentication" && (
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
              <div className="mb-8">
                <ToggleRow 
                  label="Mandatory administrator 2FA" 
                  sublabel="All Super Admin and administrator accounts must use two-factor authentication." 
                  checked={false} 
                />
                <ToggleRow 
                  label="Employee biometric unlock" 
                  sublabel="After first sign-in, employees can enable Face ID or fingerprint access in the mobile app." 
                  checked={false} 
                />
              </div>

              <div className="space-y-6 mb-8">
                <div>
                  <label className="block text-gray-500 text-[11px] font-bold tracking-[0.1em] uppercase mb-2">SUPPORTED LOGIN & VERIFICATION</label>
                  <select className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-[14px] text-[#1a2642] focus:outline-none focus:border-[#f97316] bg-white">
                    <option>Email address or mobile phone number</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-500 text-[11px] font-bold tracking-[0.1em] uppercase mb-2">TOKEN LIFETIME (MINUTES)</label>
                  <input type="text" defaultValue="1440" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-[14px] text-[#1a2642] focus:outline-none focus:border-[#f97316]" />
                </div>
                <div>
                  <label className="block text-gray-500 text-[11px] font-bold tracking-[0.1em] uppercase mb-2">ADMINISTRATOR INACTIVITY TIMEOUT (MINUTES)</label>
                  <input type="text" defaultValue="30" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-[14px] text-[#1a2642] focus:outline-none focus:border-[#f97316]" />
                </div>
                <div>
                  <label className="block text-gray-500 text-[11px] font-bold tracking-[0.1em] uppercase mb-2">EMPLOYEE MOBILE APP INACTIVITY LOCK (MINUTES)</label>
                  <input type="text" defaultValue="5" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-[14px] text-[#1a2642] focus:outline-none focus:border-[#f97316]" />
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-100 rounded-lg p-5 text-[#1e40af] text-[13px] leading-relaxed mb-8">
                These are independent settings: the 1440-minute token lifetime does not change the 30-minute administrator timeout or the 5-minute employee mobile-app lock period.
              </div>

              <button className="bg-[#f97316] hover:bg-[#e06511] text-white font-medium text-[14px] px-6 py-2.5 rounded-lg transition-colors">
                Save Changes
              </button>
            </div>
          )}

          {/* Tab Content: Notifications */}
          {activeTab === "Notifications" && (
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
              <p className="text-gray-400 text-[13px] mb-6">Enable each notification and choose who receives it.</p>
              
              <div className="space-y-6">
                {[
                  "New company registrations",
                  "Payments received",
                  "Failed payments",
                  "Subscription & pilot expiry",
                  "Support tickets",
                  "Security alerts",
                  "Expiring employee documents",
                  "Missed tasks",
                  "Missed NFC checkpoints"
                ].map((item, idx) => (
                  <div key={idx} className="pb-6 border-b border-gray-50 last:border-0 last:pb-0">
                    <div className="flex justify-between items-center mb-3">
                      <p className="text-[#1a2642] text-[14px] font-semibold">{item}</p>
                      <button className="relative inline-flex h-[22px] w-10 items-center rounded-full bg-gray-200">
                        <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-[3px]" />
                      </button>
                    </div>
                    <select className="w-[300px] px-3 py-2 border border-gray-200 rounded-lg text-[13px] text-gray-600 focus:outline-none bg-white">
                      <option>Recipients: Super Admins</option>
                    </select>
                  </div>
                ))}
              </div>

              <div className="flex gap-6 mt-8 mb-8 border-t border-gray-100 pt-8">
                <label className="flex items-center gap-2 cursor-pointer">
                  <button className="relative inline-flex h-[22px] w-10 items-center rounded-full bg-gray-200"><span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-[3px]" /></button>
                  <span className="text-[13px] text-[#1a2642] font-semibold">In-app notifications</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <button className="relative inline-flex h-[22px] w-10 items-center rounded-full bg-gray-200"><span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-[3px]" /></button>
                  <span className="text-[13px] text-[#1a2642] font-semibold">Push notifications</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <button className="relative inline-flex h-[22px] w-10 items-center rounded-full bg-gray-200"><span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-[3px]" /></button>
                  <span className="text-[13px] text-[#1a2642] font-semibold">Email notifications</span>
                </label>
              </div>

              <button className="bg-[#f97316] hover:bg-[#e06511] text-white font-medium text-[14px] px-6 py-2.5 rounded-lg transition-colors">
                Save Changes
              </button>
            </div>
          )}

          {/* Tab Content: Data */}
          {activeTab === "Data" && (
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-gray-500 text-[11px] font-bold tracking-[0.1em] uppercase mb-2">COMPANY DATA RETENTION</label>
                  <select className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-[14px] text-[#1a2642] focus:outline-none bg-white">
                    <option>7 years</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-500 text-[11px] font-bold tracking-[0.1em] uppercase mb-2">BACKUP RETENTION</label>
                  <select className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-[14px] text-[#1a2642] focus:outline-none bg-white">
                    <option>90 days</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-500 text-[11px] font-bold tracking-[0.1em] uppercase mb-2">EU DATA STORAGE</label>
                  <select className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-[14px] text-[#1a2642] focus:outline-none bg-white">
                    <option>EU only — Amsterdam region</option>
                  </select>
                </div>
                <div className="bg-green-50 rounded-lg border border-green-100 p-4">
                  <p className="text-green-800 text-[12px] font-bold mb-1">Backup status</p>
                  <p className="text-green-700 text-[14px]">Healthy · Last backup 08:30</p>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-[#1a2642] text-[15px] font-bold mb-1">Company data requests</h3>
                <p className="text-gray-400 text-[13px] mb-4">Each request requires confirmation and is recorded in the platform audit log.</p>
                
                <div className="flex gap-4">
                  <button className="px-4 py-2 border border-gray-200 rounded-lg text-[13px] font-medium text-[#1a2642] hover:bg-gray-50 transition-colors">
                    Process data export
                  </button>
                  <button className="px-4 py-2 border border-red-100 bg-red-50 rounded-lg text-[13px] font-medium text-red-600 hover:bg-red-100 transition-colors">
                    Process deletion / anonymisation
                  </button>
                </div>
              </div>

              <button className="bg-[#f97316] hover:bg-[#e06511] text-white font-medium text-[14px] px-6 py-2.5 rounded-lg transition-colors">
                Save Changes
              </button>
            </div>
          )}

          {/* Tab Content: Modules */}
          {activeTab === "Modules" && (
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
              <div className="bg-orange-50 border border-orange-100 rounded-lg p-4 text-[#a55a22] text-[12px] mb-8">
                Disabling a module that is already used by companies requires confirmation and creates an audit-log entry.
              </div>

              <div className="space-y-2 mb-8">
                {[
                  "Employees", "Customers", "Locations", "GPS clock-in/out", "NFC Patrols",
                  "Tasks & Checklists", "Reports & Incidents", "Documents & Certificates",
                  "Notifications", "AI Assistant", "Customer/Guest Portal"
                ].map(mod => (
                  <div key={mod} className="flex items-center justify-between py-4 border-b border-gray-50 last:border-0">
                    <div>
                      <p className="text-[#1a2642] text-[14px] font-semibold">{mod}</p>
                      <p className="text-gray-400 text-[12px] mt-0.5">Assign to sectors and subscription plans</p>
                    </div>
                    <button 
                      onClick={() => setShowModuleModal(true)}
                      className={`relative inline-flex h-[22px] w-10 items-center rounded-full transition-colors shrink-0 ${
                        mod !== "AI Assistant" ? "bg-[#f97316]" : "bg-gray-200"
                      }`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        mod !== "AI Assistant" ? "translate-x-[22px]" : "translate-x-[3px]"
                      }`} />
                    </button>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-6 mb-8 pt-6 border-t border-gray-100">
                <div>
                  <label className="block text-gray-500 text-[11px] font-bold tracking-[0.1em] uppercase mb-2">ASSIGN ENABLED MODULES TO SECTOR</label>
                  <select className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-[14px] text-[#1a2642] focus:outline-none bg-white">
                    <option>All sectors</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-500 text-[11px] font-bold tracking-[0.1em] uppercase mb-2">ASSIGN ENABLED MODULES TO SUBSCRIPTION PLAN</label>
                  <select className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-[14px] text-[#1a2642] focus:outline-none bg-white">
                    <option>All plans</option>
                  </select>
                </div>
              </div>

              <button className="bg-[#f97316] hover:bg-[#e06511] text-white font-medium text-[14px] px-6 py-2.5 rounded-lg transition-colors">
                Save Changes
              </button>
            </div>
          )}

        </div>
      </main>

      {/* Module Disable Modal */}
      {showModuleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1a2642]/60 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-[480px] p-8">
            <h2 className="text-[#1a2642] text-[20px] font-bold mb-3">Disable module in use?</h2>
            <p className="text-gray-500 text-[14px] leading-relaxed mb-8">
              This action will be confirmed, processed and added to the full platform audit log.
            </p>
            
            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setShowModuleModal(false)}
                className="px-5 py-2.5 border border-gray-200 rounded-lg text-[14px] font-medium text-gray-600 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                onClick={() => setShowModuleModal(false)}
                className="px-5 py-2.5 bg-[#f97316] text-white rounded-lg text-[14px] font-medium hover:bg-[#e06511]"
              >
                Confirm & log
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
