"use client";

import { Bell } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function CustomerProfilePage() {
  const [notifications, setNotifications] = useState({
    reports: true,
    patrolActivity: true,
    announcements: true
  });

  const toggleToggle = (key: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="flex flex-col h-full bg-[#f8f9fa]">
      <header className="h-[72px] bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0">
        <div>
          <p className="text-gray-400 text-[11px] font-medium tracking-wide uppercase mb-0.5">SHIFTPOINT • Customer</p>
          <h1 className="text-[#1a2642] text-[18px] font-bold leading-tight">Customer Profile</h1>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/customer/notifications" className="relative">
            <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors">
              <Bell size={20} />
            </button>
          </Link>
          <Link href="/customer/profile">
            <div className="w-10 h-10 rounded-full bg-[#f97316] hover:bg-[#e06511] cursor-pointer flex items-center justify-center text-white font-bold text-sm transition-colors">
              SA
            </div>
          </Link>
        </div>
      </header>

      <main className="flex-1 overflow-auto p-8">
        <div className="max-w-[1200px] mx-auto space-y-6 mt-4">

          <div className="mb-6">
            <p className="text-[#f97316] text-[11px] font-bold tracking-[0.1em] uppercase mb-1">CUSTOMER PORTAL / PROFILE</p>
            <h2 className="text-[#1a2642] text-[28px] font-bold mb-1">Profile</h2>
            <p className="text-gray-500 text-[14px]">Update your personal portal settings. Organisation, access, location and billing details are managed separately.</p>
          </div>

          <div className="bg-blue-50/50 border border-blue-100 rounded-lg p-4 flex gap-3 text-blue-700 text-[13px] mb-8">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
            <p>You can edit only your own profile, language, password and notification preferences.</p>
          </div>

          <div className="grid grid-cols-3 gap-6">
            
            {/* Left Col: Avatar */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 flex flex-col items-center justify-center h-fit">
              <div className="w-24 h-24 rounded-full bg-[#f97316] text-white flex items-center justify-center text-[28px] font-bold mb-4 shadow-sm">
                SA
              </div>
              <h3 className="text-[#1a2642] text-[18px] font-bold mb-1">Sarah Ahmed</h3>
              <p className="text-gray-400 text-[13px] mb-6">sarah@arc-security.nl</p>
              
              <button className="px-5 py-2 bg-white border border-gray-200 rounded-lg text-[13px] font-medium text-gray-600 hover:bg-gray-50 transition-colors shadow-sm mb-8">
                Change profile picture
              </button>
              
              <p className="text-gray-400 text-[11px] text-center max-w-[200px]">Your contact email is managed by your organisation.</p>
            </div>

            {/* Right Col: Forms */}
            <div className="col-span-2 space-y-6">
              
              {/* Personal Details */}
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="text-[#1a2642] text-[16px] font-bold mb-1">Personal details</h3>
                <p className="text-gray-400 text-[12px] mb-6">Only information visible on your own customer portal profile</p>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-500 text-[12px] font-semibold mb-2">Full name</label>
                    <input 
                      type="text" 
                      defaultValue="Sarah Ahmed"
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-[13px] text-gray-700 focus:outline-none focus:border-[#f97316] shadow-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-500 text-[12px] font-semibold mb-2">Phone number</label>
                    <input 
                      type="text" 
                      defaultValue="+31 6 1234 5678"
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-[13px] text-gray-700 focus:outline-none focus:border-[#f97316] shadow-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-500 text-[12px] font-semibold mb-2">Language preference</label>
                    <select className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-[13px] text-gray-700 focus:outline-none focus:border-[#f97316] shadow-sm appearance-none bg-white">
                      <option>English</option>
                      <option>Dutch</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-500 text-[12px] font-semibold mb-2">Customer organisation</label>
                    <div className="w-full px-4 py-2 bg-gray-50 border border-gray-200 border-dashed rounded-lg">
                      <p className="text-[#1a2642] text-[13px] font-bold">ARC Security Ltd.</p>
                      <p className="text-gray-400 text-[11px]">Managed by Company Admin</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Change Password */}
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="text-[#1a2642] text-[16px] font-bold mb-1">Change password</h3>
                <p className="text-gray-400 text-[12px] mb-6">Use a strong password you do not use elsewhere</p>

                <div className="grid grid-cols-2 gap-6 mb-2">
                  <div>
                    <label className="block text-gray-500 text-[12px] font-semibold mb-2">Current password</label>
                    <input 
                      type="password" 
                      placeholder="Enter current password"
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-[13px] focus:outline-none focus:border-[#f97316] shadow-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-500 text-[12px] font-semibold mb-2">New password</label>
                    <input 
                      type="password" 
                      placeholder="Create a new password"
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-[13px] focus:outline-none focus:border-[#f97316] shadow-sm"
                    />
                  </div>
                </div>
                <p className="text-gray-400 text-[11px]">Password must contain at least 10 characters.</p>
              </div>

              {/* Notification Preferences */}
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="text-[#1a2642] text-[16px] font-bold mb-1">Personal notification preferences</h3>
                <p className="text-gray-400 text-[12px] mb-6">Choose which personal portal updates you receive</p>

                <div className="space-y-0">
                  <div className="flex justify-between items-center py-4 border-t border-gray-100">
                    <span className="text-gray-600 text-[13px]">New reports</span>
                    <button 
                      onClick={() => toggleToggle('reports')}
                      className={`w-10 h-5 rounded-full relative transition-colors ${notifications.reports ? 'bg-[#f97316]' : 'bg-gray-200'}`}
                    >
                      <div className={`w-3.5 h-3.5 rounded-full bg-white absolute top-[3px] transition-transform ${notifications.reports ? 'translate-x-[22px]' : 'translate-x-1'}`}></div>
                    </button>
                  </div>
                  <div className="flex justify-between items-center py-4 border-t border-gray-100">
                    <span className="text-gray-600 text-[13px]">Patrol activity</span>
                    <button 
                      onClick={() => toggleToggle('patrolActivity')}
                      className={`w-10 h-5 rounded-full relative transition-colors ${notifications.patrolActivity ? 'bg-[#f97316]' : 'bg-gray-200'}`}
                    >
                      <div className={`w-3.5 h-3.5 rounded-full bg-white absolute top-[3px] transition-transform ${notifications.patrolActivity ? 'translate-x-[22px]' : 'translate-x-1'}`}></div>
                    </button>
                  </div>
                  <div className="flex justify-between items-center py-4 border-t border-gray-100">
                    <span className="text-gray-600 text-[13px]">Announcements</span>
                    <button 
                      onClick={() => toggleToggle('announcements')}
                      className={`w-10 h-5 rounded-full relative transition-colors ${notifications.announcements ? 'bg-[#f97316]' : 'bg-gray-200'}`}
                    >
                      <div className={`w-3.5 h-3.5 rounded-full bg-white absolute top-[3px] transition-transform ${notifications.announcements ? 'translate-x-[22px]' : 'translate-x-1'}`}></div>
                    </button>
                  </div>
                </div>
              </div>

            </div>

          </div>

          <div className="flex justify-between items-center mt-8 pt-4 pb-12">
            <p className="text-gray-400 text-[12px]">Changes apply only to your personal customer portal profile.</p>
            <button className="px-6 py-2.5 bg-[#f97316] hover:bg-[#e06511] text-white rounded-lg text-[14px] font-medium transition-colors shadow-sm">
              Save personal settings
            </button>
          </div>

        </div>
      </main>

    </div>
  );
}
