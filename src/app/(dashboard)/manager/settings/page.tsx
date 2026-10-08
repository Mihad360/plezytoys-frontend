"use client";

import Link from "next/link";
import { Bell, User, Shield, ArrowRight, RefreshCw, AlertCircle, Building, MapPin } from "lucide-react";
import { useGetMyProfileQuery } from "@/redux/api/authApi";
import { useGetManagerLocationsQuery } from "@/redux/api/managerApi";
import { useGetUnreadCountQuery } from "@/redux/api/notificationApi";

export default function ManagerSettingsPage() {
  const {
    data: profileData,
    isLoading,
    isError,
    refetch,
  } = useGetMyProfileQuery(undefined);

  const { data: locationsData } = useGetManagerLocationsQuery();
  const locations = locationsData?.data || [];

  const { data: unreadNotifData } = useGetUnreadCountQuery(undefined);
  const unreadCount = unreadNotifData?.data?.unreadCount ?? 0;

  const manager = profileData?.data;

  const userInitials = manager?.name
    ? manager.name
        .split(" ")
        .map((n: string) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "MG";

  return (
    <div className="flex flex-col h-full bg-[#f8f9fa]">
      {/* Top Header */}
      <header className="h-[72px] bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0">
        <div>
          <p className="text-gray-400 text-[11px] font-medium tracking-wide uppercase mb-0.5">
            SHIFTPOINT • MANAGER
          </p>
          <h1 className="text-[#1a2642] text-[18px] font-bold leading-tight">Settings & Preferences</h1>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => refetch()}
            title="Refresh Settings"
            className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors"
          >
            <RefreshCw size={18} className={isLoading ? "animate-spin" : ""} />
          </button>
          <div className="relative">
            <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors">
              <Bell size={20} />
            </button>
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-[#b45f06] text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </div>
          <Link href="/manager/profile">
            <div className="w-10 h-10 rounded-full bg-[#b45f06] hover:bg-[#964f05] cursor-pointer flex items-center justify-center text-white font-bold text-sm transition-colors">
              {userInitials}
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
                <p className="text-sm font-medium">Failed to retrieve manager settings.</p>
              </div>
              <button
                onClick={() => refetch()}
                className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-semibold"
              >
                Retry
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Profile Settings Card */}
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-orange-50 text-[#b45f06] flex items-center justify-center">
                  <User size={20} />
                </div>
                <div>
                  <h3 className="text-[#1a2642] text-[16px] font-bold">Profile Details</h3>
                  <p className="text-gray-400 text-[12px]">Manage your personal and supervisor information</p>
                </div>
              </div>
              <p className="text-gray-600 text-[13px] mb-4">
                Update your full name, direct phone number, and view your assigned company role.
              </p>
              <Link
                href="/manager/profile"
                className="inline-flex items-center gap-1.5 text-[#b45f06] text-[13px] font-semibold hover:underline"
              >
                View & Edit Profile <ArrowRight size={14} />
              </Link>
            </div>

            {/* Security & Access Card */}
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <Shield size={20} />
                </div>
                <div>
                  <h3 className="text-[#1a2642] text-[16px] font-bold">Security & Authorization</h3>
                  <p className="text-gray-400 text-[12px]">Account credentials and PIN configuration</p>
                </div>
              </div>
              <p className="text-gray-600 text-[13px] mb-4">
                Review your role permissions, device authentication, and security credentials.
              </p>
              <Link
                href="/manager/security"
                className="inline-flex items-center gap-1.5 text-emerald-600 text-[13px] font-semibold hover:underline"
              >
                Security Overview <ArrowRight size={14} />
              </Link>
            </div>

            {/* Facility Supervision Card */}
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Building size={20} />
                </div>
                <div>
                  <h3 className="text-[#1a2642] text-[16px] font-bold">Supervised Facilities ({locations.length})</h3>
                  <p className="text-gray-400 text-[12px]">Sites assigned under your operational supervision</p>
                </div>
              </div>

              {locations.length === 0 ? (
                <p className="text-gray-400 text-xs">Company-wide scope / No specific site restrictions.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-3">
                  {locations.map((loc: any) => (
                    <div key={loc._id} className="p-3 bg-gray-50 rounded-lg border border-gray-100 flex items-center gap-2.5">
                      <MapPin size={16} className="text-[#b45f06] shrink-0" />
                      <div className="min-w-0">
                        <p className="font-semibold text-xs text-[#1a2642] truncate">{loc.name}</p>
                        <p className="text-[11px] text-gray-400 truncate">{loc.address || "Active Site"}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
