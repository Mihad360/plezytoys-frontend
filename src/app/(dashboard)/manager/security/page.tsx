"use client";

import { Bell, RefreshCw, AlertCircle, Shield, KeyRound, Smartphone } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { useGetMyProfileQuery } from "@/redux/api/authApi";
import { useGetUnreadCountQuery } from "@/redux/api/notificationApi";

export default function ManagerSecurityPage() {
  const { data: profileData, isLoading, refetch } = useGetMyProfileQuery(undefined);
  const manager = profileData?.data;

  const { data: unreadNotifData } = useGetUnreadCountQuery(undefined);
  const unreadCount = unreadNotifData?.data?.unreadCount ?? 0;

  const userInitials = manager?.name
    ? manager.name
        .split(" ")
        .map((n: string) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "MG";

  return (
    <div className="flex flex-col h-full bg-[#f8f9fa] relative">
      <header className="h-[72px] bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0">
        <div>
          <p className="text-gray-400 text-[11px] font-medium tracking-wide uppercase mb-0.5">SHIFTPOINT • MANAGER</p>
          <h1 className="text-[#1a2642] text-[18px] font-bold leading-tight">Security & Access</h1>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => refetch()}
            title="Refresh Security Status"
            className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors"
          >
            <RefreshCw size={18} className={isLoading ? "animate-spin" : ""} />
          </button>
          <div className="relative">
            <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors">
              <Bell size={20} />
            </button>
            {unreadCount > 0 && (
              <div className="absolute top-0 right-0 w-4 h-4 bg-[#b45f06] text-white text-[9px] font-bold flex items-center justify-center rounded-full border-2 border-white">
                {unreadCount > 9 ? "9+" : unreadCount}
              </div>
            )}
          </div>
          <Link href="/manager/profile">
            <div className="w-10 h-10 rounded-full bg-[#b45f06] flex items-center justify-center text-white font-bold text-sm cursor-pointer">
              {userInitials}
            </div>
          </Link>
        </div>
      </header>

      <main className="flex-1 overflow-auto p-8">
        <div className="max-w-[1000px] mx-auto space-y-6 mt-4">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-orange-50 text-[#f97316] flex items-center justify-center">
                <Shield size={24} />
              </div>
              <div>
                <h3 className="text-[#1a2642] text-[20px] font-bold">Manager Security Settings</h3>
                <p className="text-gray-500 text-[14px]">Manage your account password, active sessions, and multi-factor authorization.</p>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-gray-100">
              <div className="flex justify-between items-center py-3">
                <div>
                  <p className="font-semibold text-sm text-[#1a2642]">Account Status</p>
                  <p className="text-xs text-gray-400">Authenticated as {manager?.email || "Manager"}</p>
                </div>
                <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full border border-emerald-100">
                  Active
                </span>
              </div>

              <div className="flex justify-between items-center py-3 border-t border-gray-50">
                <div>
                  <p className="font-semibold text-sm text-[#1a2642]">Security PIN Access</p>
                  <p className="text-xs text-gray-400">Configured for rapid mobile & web authentication</p>
                </div>
                <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded-full">
                  {manager?.pin ? "Configured" : "Optional"}
                </span>
              </div>

              <div className="flex justify-between items-center py-3 border-t border-gray-50">
                <div>
                  <p className="font-semibold text-sm text-[#1a2642]">Role Privileges</p>
                  <p className="text-xs text-gray-400">Operational Manager · Multi-location Scope</p>
                </div>
                <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full border border-blue-100">
                  Manager
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
