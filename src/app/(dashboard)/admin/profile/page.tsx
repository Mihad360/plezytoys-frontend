"use client";

import Link from "next/link";
import { Bell } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="flex flex-col h-full bg-[#f8f9fa]">
      {/* Top Header */}
      <header className="h-[72px] bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0">
        <div>
          <h1 className="text-[#1a2642] text-xl font-bold">My Profile</h1>
          <p className="text-gray-400 text-xs mt-0.5">SHIFTPOINT • Super Admin</p>
        </div>
        <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors">
          <Bell size={20} />
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-8">
        <div className="max-w-[1200px] mx-auto">
          
          <div className="flex justify-between items-start mb-8">
            <div>
              <h2 className="text-[#1a2642] text-[24px] font-bold mb-1">My profile</h2>
              <p className="text-gray-500 text-[14px]">Personal account, authentication and session security</p>
            </div>
            <button className="bg-[#f97316] hover:bg-[#e06511] text-white font-medium text-[14px] px-6 py-2.5 rounded-lg transition-colors">
              Save changes
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            
            {/* Account Info */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
              <h3 className="text-[#1a2642] font-bold text-[16px] mb-6">Account information</h3>
              
              <div className="mb-5">
                <label className="block text-gray-500 text-[12px] mb-2">Full name</label>
                <input type="text" defaultValue="Super Admin" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-[14px] text-[#1a2642] focus:outline-none focus:border-[#f97316]" />
              </div>
              
              <div>
                <label className="block text-gray-500 text-[12px] mb-2">Email address</label>
                <input type="text" defaultValue="admin@shiftpoint.io" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-[14px] text-[#1a2642] focus:outline-none focus:border-[#f97316]" />
              </div>
            </div>

            {/* Password & Security */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
              <h3 className="text-[#1a2642] font-bold text-[16px] mb-6">Password & security</h3>
              
              <div className="flex justify-between items-start mb-6">
                <div>
                  <p className="text-[#1a2642] text-[14px] font-medium mb-1">Two-factor authentication</p>
                  <p className="text-gray-400 text-[13px]">Authenticator application connected</p>
                </div>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-semibold bg-green-50 text-green-600 border border-green-200">
                  Healthy
                </span>
              </div>

              <Link 
                href="/admin/profile/change-password"
                className="inline-block px-4 py-2 border border-gray-200 rounded-lg text-[13px] font-medium text-[#1a2642] hover:bg-gray-50 transition-colors"
              >
                Change password
              </Link>
            </div>
          </div>

          {/* 2FA section */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 mb-6">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h3 className="text-[#1a2642] font-bold text-[16px] mb-1">Two-factor authentication</h3>
                <p className="text-gray-500 text-[14px]">Protect Super Admin access with a second verification factor</p>
              </div>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-semibold bg-green-50 text-green-600 border border-green-200">
                Healthy
              </span>
            </div>

            <hr className="border-gray-50 mb-6" />

            <div className="flex justify-between items-center">
              <div>
                <p className="text-[#1a2642] text-[14px] font-medium mb-1">Authenticator app enabled</p>
                <p className="text-gray-400 text-[13px]">Your authenticator application is required when signing in on a new device.</p>
              </div>
              <div className="flex gap-4">
                <button className="px-4 py-2 border border-gray-200 rounded-lg text-[13px] font-medium text-gray-600 hover:bg-gray-50">
                  Reset 2FA
                </button>
                <button className="text-[#f97316] font-medium text-[13px] hover:underline">
                  Recovery codes
                </button>
              </div>
            </div>
          </div>

          {/* Active Sessions */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-[#1a2642] font-bold text-[16px] mb-1">Active sessions</h3>
                <p className="text-gray-500 text-[14px]">Review devices that currently have access to this Super Admin account</p>
              </div>
              <button className="text-[#f97316] font-medium text-[13px] hover:underline">
                Terminate all others
              </button>
            </div>

            <div className="flex flex-col">
              <div className="flex justify-between items-center py-5 border-t border-gray-50">
                <div className="flex gap-4 items-center">
                  <div className="w-10 h-10 bg-gray-50 border border-gray-100 rounded flex items-center justify-center">
                    <div className="w-4 h-4 rounded-sm bg-[#1a2642]"></div>
                  </div>
                  <div>
                    <div className="flex gap-2 items-center mb-0.5">
                      <p className="text-[#1a2642] text-[14px] font-medium">Chrome on macOS</p>
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-green-50 text-green-600">Current session</span>
                    </div>
                    <p className="text-gray-400 text-[12px]">London, GB · Active now</p>
                  </div>
                </div>
                <span className="text-gray-400 text-[13px]">This device</span>
              </div>

              <div className="flex justify-between items-center py-5 border-t border-gray-50">
                <div className="flex gap-4 items-center">
                  <div className="w-10 h-10 bg-gray-50 border border-gray-100 rounded flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full bg-[#1a2642]"></div>
                  </div>
                  <div>
                    <p className="text-[#1a2642] text-[14px] font-medium mb-0.5">Safari on iPhone</p>
                    <p className="text-gray-400 text-[12px]">London, GB · Today, 08:15</p>
                  </div>
                </div>
                <button className="text-red-500 font-medium text-[13px] hover:underline">Terminate</button>
              </div>

              <div className="flex justify-between items-center py-5 border-t border-gray-50">
                <div className="flex gap-4 items-center">
                  <div className="w-10 h-10 bg-gray-50 border border-gray-100 rounded flex items-center justify-center">
                    <div className="w-4 h-4 rounded-sm bg-[#1a2642]"></div>
                  </div>
                  <div>
                    <p className="text-[#1a2642] text-[14px] font-medium mb-0.5">Edge on Windows</p>
                    <p className="text-gray-400 text-[12px]">Manchester, GB · Yesterday, 17:42</p>
                  </div>
                </div>
                <button className="text-red-500 font-medium text-[13px] hover:underline">Terminate</button>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
