"use client";

import Link from "next/link";
import { Bell, User, Shield, Globe, ArrowRight, RefreshCw, AlertCircle } from "lucide-react";
import { useGetMyProfileQuery } from "@/redux/api/authApi";
import { useGetUnreadCountQuery } from "@/redux/api/notificationApi";

export default function EmployeeSettingsPage() {
  const {
    data: profileData,
    isLoading,
    isError,
    refetch,
  } = useGetMyProfileQuery(undefined);

  const { data: unreadNotifData } = useGetUnreadCountQuery(undefined);
  const unreadCount = unreadNotifData?.data?.unreadCount ?? 0;

  const user = profileData?.data;

  return (
    <div className="flex flex-col h-full bg-[#f8f9fa]">
      {/* Top Header */}
      <header className="h-[72px] bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0">
        <div>
          <p className="text-gray-400 text-[11px] font-medium tracking-wide uppercase mb-0.5">
            SHIFTPOINT • EMPLOYEE
          </p>
          <h1 className="text-[#1a2642] text-[18px] font-bold leading-tight">Settings</h1>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => refetch()}
            title="Refresh Settings"
            className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors"
          >
            <RefreshCw size={18} className={isLoading ? "animate-spin" : ""} />
          </button>
          <Link href="/employee/notifications" className="relative">
            <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors">
              <Bell size={20} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-[#f97316] text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1">
                  {unreadCount > 99 ? "99+" : unreadCount}
                </span>
              )}
            </button>
          </Link>
          <Link href="/employee/profile">
            <div className="w-10 h-10 rounded-full bg-[#f97316] hover:bg-[#e06511] cursor-pointer flex items-center justify-center text-white font-bold text-sm transition-colors">
              EM
            </div>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-8">
        <div className="max-w-[1000px] mx-auto space-y-6 mt-4">
          {isError && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center justify-between text-red-700">
              <div className="flex items-center gap-3">
                <AlertCircle size={20} className="shrink-0" />
                <p className="text-sm font-medium">Failed to retrieve current user configuration.</p>
              </div>
              <button
                onClick={() => refetch()}
                className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-semibold transition-colors"
              >
                Retry
              </button>
            </div>
          )}

          <div>
            <h2 className="text-[#1a2642] text-[28px] font-bold mb-1">Account & Preferences</h2>
            <p className="text-gray-500 text-[14px]">
              Manage your personal settings, language, notifications, and security.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {/* Profile Overview */}
            <Link
              href="/employee/profile"
              className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm hover:border-gray-200 transition-colors flex items-center justify-between group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-orange-50 text-[#f97316] flex items-center justify-center shrink-0">
                  <User size={22} />
                </div>
                <div>
                  <h3 className="text-[#1a2642] font-bold text-[16px] group-hover:text-[#f97316] transition-colors">
                    Personal Profile
                  </h3>
                  <p className="text-gray-400 text-[13px] mt-0.5">
                    {user?.name || user?.email || "Update your name, contact phone number, and avatar"}
                  </p>
                </div>
              </div>
              <ArrowRight size={18} className="text-gray-300 group-hover:text-[#f97316] transition-colors" />
            </Link>

            {/* Notifications */}
            <Link
              href="/employee/profile"
              className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm hover:border-gray-200 transition-colors flex items-center justify-between group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Bell size={22} />
                </div>
                <div>
                  <h3 className="text-[#1a2642] font-bold text-[16px] group-hover:text-blue-600 transition-colors">
                    Notification Preferences
                  </h3>
                  <p className="text-gray-400 text-[13px] mt-0.5">
                    Configure alert settings for new reports, patrol activity, and announcements
                  </p>
                </div>
              </div>
              <ArrowRight size={18} className="text-gray-300 group-hover:text-blue-600 transition-colors" />
            </Link>

            {/* Security */}
            <Link
              href="/employee/profile"
              className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm hover:border-gray-200 transition-colors flex items-center justify-between group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                  <Shield size={22} />
                </div>
                <div>
                  <h3 className="text-[#1a2642] font-bold text-[16px] group-hover:text-purple-600 transition-colors">
                    Security & Credentials
                  </h3>
                  <p className="text-gray-400 text-[13px] mt-0.5">
                    Change your password and review account security status
                  </p>
                </div>
              </div>
              <ArrowRight size={18} className="text-gray-300 group-hover:text-purple-600 transition-colors" />
            </Link>

            {/* Language & System */}
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <Globe size={22} />
                </div>
                <div>
                  <h3 className="text-[#1a2642] font-bold text-[16px]">Language & Regional</h3>
                  <p className="text-gray-400 text-[13px] mt-0.5">
                    System timezone: Europe/Amsterdam · Interface language: English
                  </p>
                </div>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 bg-gray-100 text-gray-600 rounded">
                Default
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
