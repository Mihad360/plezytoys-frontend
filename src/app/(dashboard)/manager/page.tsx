"use client";

import { Bell, ChevronDown, X, AlertCircle, RefreshCw, CheckCircle2, AlertTriangle, ArrowRight } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import {
  useGetManagerDashboardStatsQuery,
  useGetManagerLocationsQuery,
} from "@/redux/api/managerApi";
import { useGetMyProfileQuery } from "@/redux/api/authApi";
import { useGetUnreadCountQuery } from "@/redux/api/notificationApi";

export default function ManagerDashboard() {
  const [selectedLocationId, setSelectedLocationId] = useState<string>("all");
  const [activeModal, setActiveModal] = useState<"none" | "create-task">("none");

  const { data: profileData } = useGetMyProfileQuery(undefined);
  const manager = profileData?.data;

  const { data: locationsData } = useGetManagerLocationsQuery();
  const locations = locationsData?.data || [];

  const {
    data: statsData,
    isLoading,
    isError,
    refetch,
  } = useGetManagerDashboardStatsQuery({
    locationId: selectedLocationId === "all" ? undefined : selectedLocationId,
  });

  const { data: unreadNotifData } = useGetUnreadCountQuery(undefined);
  const unreadCount = unreadNotifData?.data?.unreadCount ?? 0;

  const stats = statsData?.data;
  const attentionRequired = stats?.attentionRequired || [];
  const recentActivity = stats?.recentActivity || [];

  const managerName = manager?.firstName || manager?.name?.split(" ")[0] || "Manager";
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
      {/* Top Header */}
      <header className="h-[72px] bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0">
        <div>
          <p className="text-gray-400 text-[11px] font-medium tracking-wide uppercase mb-0.5">SHIFTPOINT • MANAGER</p>
          <h1 className="text-[#1a2642] text-[18px] font-bold leading-tight">Manager Dashboard</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="px-4 py-1.5 bg-orange-50 border border-orange-100 text-[#d97706] rounded-full text-[13px] font-medium">
            Location scope:{" "}
            {selectedLocationId === "all"
              ? "All Locations"
              : locations.find((l: any) => l._id === selectedLocationId)?.name || "Selected"}
          </div>
          <button
            onClick={() => refetch()}
            title="Refresh Data"
            className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors"
          >
            <RefreshCw size={18} className={isLoading ? "animate-spin" : ""} />
          </button>
          <Link href="/manager/alerts" className="relative">
            <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors">
              <Bell size={20} />
            </button>
            {unreadCount > 0 && (
              <div className="absolute top-0 right-0 w-4 h-4 bg-[#b45f06] text-white text-[9px] font-bold flex items-center justify-center rounded-full border-2 border-white">
                {unreadCount > 9 ? "9+" : unreadCount}
              </div>
            )}
          </Link>
          <Link href="/manager/profile">
            <div className="w-10 h-10 rounded-full bg-[#b45f06] hover:bg-[#964f05] cursor-pointer flex items-center justify-center text-white font-bold text-sm transition-colors">
              {userInitials}
            </div>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-8">
        <div className="max-w-[1200px] mx-auto">
          {/* Error Banner */}
          {isError && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4 flex items-center justify-between text-red-700">
              <div className="flex items-center gap-3">
                <AlertCircle size={20} className="shrink-0" />
                <p className="text-sm font-medium">Failed to load real-time manager operations data.</p>
              </div>
              <button
                onClick={() => refetch()}
                className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-semibold transition-colors"
              >
                Retry
              </button>
            </div>
          )}

          <div className="flex justify-between items-start mb-8">
            <div>
              <h2 className="text-[#1a2642] text-[28px] font-bold mb-1">Good morning, {managerName}</h2>
              <p className="text-gray-500 text-[14px]">Here&apos;s your operational overview for today.</p>
            </div>
            <div className="relative w-[280px]">
              <select
                value={selectedLocationId}
                onChange={(e) => setSelectedLocationId(e.target.value)}
                className="w-full appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2.5 pr-10 text-[14px] text-[#1a2642] focus:outline-none shadow-sm cursor-pointer"
              >
                <option value="all">All assigned locations</option>
                {locations.map((loc: any) => (
                  <option key={loc._id} value={loc._id}>
                    {loc.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-4 gap-6 mb-8">
            <Link href="/manager/employees">
              <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                <p className="text-gray-400 text-[11px] font-bold tracking-wide uppercase mb-2">ACTIVE EMPLOYEES</p>
                <p className="text-[#1a2642] font-bold text-[32px] leading-none">
                  {isLoading ? "..." : stats?.activeEmployees ?? 0}
                </p>
              </div>
            </Link>
            <Link href="/manager/patrols">
              <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                <p className="text-gray-400 text-[11px] font-bold tracking-wide uppercase mb-2">ACTIVE PATROLS</p>
                <p className="text-[#f97316] font-bold text-[32px] leading-none">
                  {isLoading ? "..." : stats?.activePatrols ?? 0}
                </p>
              </div>
            </Link>
            <Link href="/manager/tasks">
              <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                <p className="text-gray-400 text-[11px] font-bold tracking-wide uppercase mb-2">TASKS PENDING</p>
                <p className="text-[#d97706] font-bold text-[32px] leading-none">
                  {isLoading ? "..." : stats?.tasksPending ?? 0}
                </p>
              </div>
            </Link>
            <Link href="/manager/reports">
              <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                <p className="text-gray-400 text-[11px] font-bold tracking-wide uppercase mb-2">REPORTS TO REVIEW</p>
                <p className="text-purple-600 font-bold text-[32px] leading-none">
                  {isLoading ? "..." : stats?.reportsToReview ?? 0}
                </p>
              </div>
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {/* Attention Required */}
            <div className="col-span-2 space-y-6">
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-[#1a2642] font-bold text-[16px]">Attention required</h3>
                  <Link href="/manager/alerts" className="text-[#f97316] text-[12px] font-semibold hover:underline flex items-center gap-1">
                    View all alerts <ArrowRight size={12} />
                  </Link>
                </div>
                {isLoading ? (
                  <p className="text-gray-400 text-xs py-8 text-center">Loading live alerts...</p>
                ) : attentionRequired.length === 0 ? (
                  <div className="py-8 text-center text-gray-400">
                    <CheckCircle2 size={32} className="mx-auto text-emerald-500 mb-2" />
                    <p className="text-sm font-semibold text-gray-700">All clear!</p>
                    <p className="text-xs text-gray-400 mt-1">No GPS anomalies, missed checkpoints, or overdue tasks detected.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {attentionRequired.map((item: any, idx: number) => {
                      const isCritical = item.severity === "critical";
                      return (
                        <div
                          key={idx}
                          className="p-4 border border-gray-100 rounded-lg flex justify-between items-center bg-gray-50/50 hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex items-start gap-3">
                            <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${isCritical ? "bg-red-500" : "bg-orange-500"}`}></div>
                            <div>
                              <p className="text-[#1a2642] font-semibold text-[14px]">{item.title}</p>
                              <p className="text-gray-500 text-[12px] mt-0.5">{item.description}</p>
                              <p className={`${isCritical ? "text-red-600" : "text-orange-600"} text-[12px] font-medium mt-1`}>
                                {item.detail}
                              </p>
                            </div>
                          </div>
                          <Link href="/manager/alerts">
                            <button className="px-4 py-2 border border-gray-200 bg-white rounded-lg text-[13px] font-medium text-gray-600 hover:bg-gray-50 shadow-sm cursor-pointer">
                              Review
                            </button>
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Quick Actions & Recent Activity */}
            <div className="col-span-1 space-y-6">
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="text-[#1a2642] font-bold text-[16px] mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Link href="/manager/tasks" className="block">
                    <button className="w-full py-3 bg-[#b45f06] hover:bg-[#964f05] text-white rounded-lg text-[14px] font-medium transition-colors shadow-sm cursor-pointer">
                      Manage Tasks
                    </button>
                  </Link>
                  <Link href="/manager/attendance" className="block">
                    <button className="w-full py-3 bg-gray-50 hover:bg-gray-100 border border-gray-100 text-gray-700 rounded-lg text-[14px] font-medium transition-colors cursor-pointer">
                      View Attendance
                    </button>
                  </Link>
                  <Link href="/manager/patrols" className="block">
                    <button className="w-full py-3 bg-gray-50 hover:bg-gray-100 border border-gray-100 text-gray-700 rounded-lg text-[14px] font-medium transition-colors cursor-pointer">
                      Monitor Patrols
                    </button>
                  </Link>
                  <Link href="/manager/reports" className="block">
                    <button className="w-full py-3 bg-gray-50 hover:bg-gray-100 border border-gray-100 text-gray-700 rounded-lg text-[14px] font-medium transition-colors cursor-pointer">
                      Review Reports
                    </button>
                  </Link>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100">
                  <h3 className="text-[#1a2642] font-bold text-[14px] mb-3">Recent Activity</h3>
                  {recentActivity.length === 0 ? (
                    <p className="text-gray-400 text-xs py-2">No recent operations logged.</p>
                  ) : (
                    <div className="space-y-4">
                      {recentActivity.map((act: any, idx: number) => {
                        const dateFormatted = new Date(act.timestamp).toLocaleTimeString("en-GB", {
                          hour: "2-digit",
                          minute: "2-digit",
                        });
                        return (
                          <div key={idx} className="flex gap-3">
                            <div
                              className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                                act.color === "green" || act.color === "emerald"
                                  ? "bg-emerald-500"
                                  : act.color === "purple"
                                  ? "bg-purple-500"
                                  : "bg-orange-500"
                              }`}
                            ></div>
                            <div>
                              <p className="text-[#1a2642] text-[13px] font-medium">{act.title}</p>
                              <p className="text-gray-400 text-[11px]">
                                {act.user} · {dateFormatted}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
