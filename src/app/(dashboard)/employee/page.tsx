"use client";

import { useState } from "react";
import Link from "next/link";
import { Bell, MapPin, ArrowRight, RefreshCw, AlertCircle } from "lucide-react";
import { useGetEmployeeHomeSummaryQuery, useGetAnnouncementsQuery } from "@/redux/api/employeeApi";
import { useGetUnreadCountQuery } from "@/redux/api/notificationApi";

export default function EmployeeDashboard() {
  const [selectedLocationId, setSelectedLocationId] = useState<string>("all");

  const {
    data: summaryData,
    isLoading: isSummaryLoading,
    isError: isSummaryError,
    refetch: refetchSummary,
  } = useGetEmployeeHomeSummaryQuery();

  const {
    data: announcementsData,
    isLoading: isAnnouncementsLoading,
    refetch: refetchAnnouncements,
  } = useGetAnnouncementsQuery();

  const {
    data: unreadNotificationData,
  } = useGetUnreadCountQuery(undefined);

  const summary = summaryData?.data;
  const employee = summary?.employee;
  const counts = summary?.counts;
  const assignedLocations = summary?.assignedLocations || [];
  const recentReports = summary?.recentReports || [];
  const announcements = announcementsData?.data || [];

  const unreadCount = unreadNotificationData?.data?.unreadCount ?? counts?.unreadNotificationsCount ?? 0;

  const isLoading = isSummaryLoading;
  const isError = isSummaryError;

  const handleRefresh = () => {
    refetchSummary();
    refetchAnnouncements();
  };

  // Determine greeting
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  // Formatted date
  const todayFormatted = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const employeeName = employee?.firstName || employee?.name?.split(" ")[0] || "there";
  const userInitials =
    employee?.initials ||
    `${employee?.firstName?.[0] || ""}${employee?.lastName?.[0] || ""}`.toUpperCase() ||
    "EM";

  // Filter locations if user selected one
  const filteredLocations =
    selectedLocationId === "all"
      ? assignedLocations
      : assignedLocations.filter((loc: any) => loc._id === selectedLocationId);

  return (
    <div className="flex flex-col h-full bg-[#f8f9fa]">
      {/* Top Header */}
      <header className="h-[72px] bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0">
        <div>
          <p className="text-gray-400 text-[11px] font-medium tracking-wide uppercase mb-0.5">
            SHIFTPOINT • EMPLOYEE
          </p>
          <h1 className="text-[#1a2642] text-[18px] font-bold leading-tight">Employee Dashboard</h1>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleRefresh}
            title="Refresh Data"
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
            <div className="w-10 h-10 rounded-full bg-[#f97316] hover:bg-[#e06511] cursor-pointer flex items-center justify-center text-white font-bold text-sm transition-colors overflow-hidden">
              {employee?.avatar ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={employee.avatar} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                userInitials
              )}
            </div>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-8">
        <div className="max-w-[1200px] mx-auto space-y-8 mt-2">
          {/* Error Banner */}
          {isError && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center justify-between text-red-700">
              <div className="flex items-center gap-3">
                <AlertCircle size={20} className="shrink-0" />
                <p className="text-sm font-medium">Failed to load real-time operational dashboard data.</p>
              </div>
              <button
                onClick={handleRefresh}
                className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-semibold transition-colors"
              >
                Retry
              </button>
            </div>
          )}

          {/* Greeting & Quick Stats */}
          <div>
            <div className="flex justify-between items-end mb-6">
              <div>
                <h2 className="text-[#1a2642] text-[28px] font-bold mb-1">
                  {isLoading ? (
                    <div className="h-8 w-64 bg-gray-200 animate-pulse rounded"></div>
                  ) : (
                    `${greeting}, ${employeeName}`
                  )}
                </h2>
                <p className="text-gray-500 text-[14px]">
                  Here&apos;s your authorised operational overview for today · {todayFormatted}
                </p>
              </div>
              <div className="relative">
                <select
                  value={selectedLocationId}
                  onChange={(e) => setSelectedLocationId(e.target.value)}
                  className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 pr-10 text-[13px] text-gray-700 focus:outline-none focus:border-[#f97316] shadow-sm"
                >
                  <option value="all">All assigned locations</option>
                  {assignedLocations.map((loc: any) => (
                    <option key={loc._id} value={loc._id}>
                      {loc.name}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M1 1L5 5L9 1"
                      stroke="#8e9bb3"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-4 gap-4">
              <Link href="/employee/locations">
                <div className="bg-white rounded-xl border border-gray-100 p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow cursor-pointer h-full">
                  <p className="text-gray-400 text-[11px] font-bold tracking-wide uppercase mb-3">
                    ASSIGNED LOCATIONS
                  </p>
                  <div className="flex justify-between items-end">
                    {isLoading ? (
                      <div className="h-9 w-12 bg-gray-100 animate-pulse rounded"></div>
                    ) : (
                      <p className="text-[#1a2642] font-bold text-[36px] leading-none">
                        {counts?.assignedLocationsCount ?? assignedLocations.length ?? 0}
                      </p>
                    )}
                    <ArrowRight size={18} className="text-gray-300" />
                  </div>
                </div>
              </Link>

              <Link href="/employee/patrols">
                <div className="bg-white rounded-xl border border-gray-100 p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow cursor-pointer h-full">
                  <p className="text-gray-400 text-[11px] font-bold tracking-wide uppercase mb-3">
                    ACTIVE PATROLS
                  </p>
                  <div className="flex justify-between items-end">
                    {isLoading ? (
                      <div className="h-9 w-12 bg-gray-100 animate-pulse rounded"></div>
                    ) : (
                      <p className="text-emerald-500 font-bold text-[36px] leading-none">
                        {counts?.activePatrolsCount ?? 0}
                      </p>
                    )}
                    <ArrowRight size={18} className="text-gray-300" />
                  </div>
                </div>
              </Link>

              <Link href="/employee/reports">
                <div className="bg-white rounded-xl border border-gray-100 p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow cursor-pointer h-full">
                  <p className="text-gray-400 text-[11px] font-bold tracking-wide uppercase mb-3">
                    AVAILABLE REPORTS
                  </p>
                  <div className="flex justify-between items-end">
                    {isLoading ? (
                      <div className="h-9 w-12 bg-gray-100 animate-pulse rounded"></div>
                    ) : (
                      <p className="text-[#f97316] font-bold text-[36px] leading-none">
                        {counts?.reportsCount ?? recentReports.length ?? 0}
                      </p>
                    )}
                    <ArrowRight size={18} className="text-gray-300" />
                  </div>
                </div>
              </Link>

              <Link href="/employee/announcements">
                <div className="bg-white rounded-xl border border-gray-100 p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow cursor-pointer h-full">
                  <p className="text-gray-400 text-[11px] font-bold tracking-wide uppercase mb-3">
                    UNREAD ANNOUNCEMENTS
                  </p>
                  <div className="flex justify-between items-end">
                    {isLoading ? (
                      <div className="h-9 w-12 bg-gray-100 animate-pulse rounded"></div>
                    ) : (
                      <p className="text-purple-500 font-bold text-[36px] leading-none">
                        {counts?.unreadAnnouncementsCount ?? 0}
                      </p>
                    )}
                    <ArrowRight size={18} className="text-gray-300" />
                  </div>
                </div>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {/* Left Col: Locations */}
            <div className="col-span-2 space-y-4">
              <div className="flex justify-between items-end mb-2">
                <div>
                  <h3 className="text-[#1a2642] font-bold text-[16px]">Your locations</h3>
                  <p className="text-gray-500 text-[13px]">Authorised service locations</p>
                </div>
                <Link
                  href="/employee/locations"
                  className="text-[#f97316] text-[13px] font-semibold hover:underline flex items-center gap-1"
                >
                  View all <ArrowRight size={14} />
                </Link>
              </div>

              {isLoading ? (
                <div className="grid grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm animate-pulse space-y-3"
                    >
                      <div className="flex gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gray-100"></div>
                        <div className="flex-1 space-y-2">
                          <div className="h-4 bg-gray-100 rounded w-3/4"></div>
                          <div className="h-3 bg-gray-100 rounded w-1/2"></div>
                        </div>
                      </div>
                      <div className="h-3 bg-gray-100 rounded w-1/3"></div>
                    </div>
                  ))}
                </div>
              ) : filteredLocations.length === 0 ? (
                <div className="bg-white border border-gray-100 rounded-xl p-8 text-center text-gray-400">
                  <MapPin size={32} className="mx-auto mb-2 text-gray-300" />
                  <p className="font-semibold text-gray-600">No authorised locations assigned</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Your manager will assign you to service locations soon.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  {filteredLocations.slice(0, 4).map((loc: any) => (
                    <div
                      key={loc._id}
                      className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:border-gray-200 transition-colors"
                    >
                      <div className="flex justify-between items-start mb-6">
                        <div className="flex gap-3">
                          <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center text-[#f97316] shrink-0">
                            <MapPin size={20} />
                          </div>
                          <div>
                            <h4 className="text-[#1a2642] font-bold text-[14px]">{loc.name}</h4>
                            <p className="text-gray-400 text-[12px]">
                              {loc.address || "Main Site"} ·{" "}
                              <span className="text-emerald-500 font-medium">
                                {loc.isActive ? "Active" : "Inactive"}
                              </span>
                            </p>
                          </div>
                        </div>
                        <Link
                          href="/employee/locations"
                          className="text-[#f97316] text-[12px] font-semibold hover:underline flex items-center gap-1"
                        >
                          View <ArrowRight size={12} />
                        </Link>
                      </div>
                      <p className="text-gray-400 text-[11px]">
                        {loc.activePatrolsCount > 0
                          ? `${loc.activePatrolsCount} active ${
                              loc.activePatrolsCount === 1 ? "patrol" : "patrols"
                            }`
                          : "Coverage active"}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right Col: Announcements */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm flex flex-col">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center shrink-0">
                <div>
                  <h3 className="text-[#1a2642] font-bold text-[16px]">Latest announcements</h3>
                  <p className="text-gray-500 text-[13px]">Important updates from your provider</p>
                </div>
                <Link
                  href="/employee/announcements"
                  className="text-[#f97316] text-[13px] font-semibold hover:underline flex items-center gap-1 shrink-0"
                >
                  View all <ArrowRight size={14} />
                </Link>
              </div>

              <div className="flex-1 overflow-auto p-2">
                {isAnnouncementsLoading ? (
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-gray-100 animate-pulse rounded"></div>
                    <div className="h-3 bg-gray-100 animate-pulse rounded w-3/4"></div>
                  </div>
                ) : announcements.length === 0 ? (
                  <div className="p-8 text-center text-gray-400 text-xs">
                    No active announcements at this time.
                  </div>
                ) : (
                  announcements.slice(0, 3).map((item: any) => {
                    const dateFormatted = new Date(item.publishedAt || item.createdAt).toLocaleDateString(
                      "en-GB",
                      { day: "2-digit", month: "short", year: "numeric" }
                    );

                    return (
                      <Link
                        key={item._id}
                        href="/employee/announcements"
                        className="block p-4 hover:bg-gray-50 rounded-lg border-b border-gray-50 last:border-0 transition-colors relative group"
                      >
                        <div className="absolute left-4 top-5 w-1.5 h-1.5 rounded-full bg-[#f97316]"></div>
                        <div className="pl-4">
                          <h4 className="text-[#1a2642] font-bold text-[13px] mb-1 group-hover:text-[#f97316] transition-colors">
                            {item.title}
                          </h4>
                          <p className="text-gray-500 text-[12px] mb-2 leading-relaxed line-clamp-2">
                            {item.content}
                          </p>
                          <p className="text-gray-400 text-[11px]">{dateFormatted}</p>
                        </div>
                        <ArrowRight
                          size={14}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity"
                        />
                      </Link>
                    );
                  })
                )}
              </div>
            </div>
          </div>

          {/* Recent Reports List */}
          <div className="mt-8">
            <div className="flex justify-between items-end mb-4">
              <div>
                <h3 className="text-[#1a2642] font-bold text-[16px]">Recent reports</h3>
                <p className="text-gray-500 text-[13px]">Reports available to your Employee account</p>
              </div>
              <Link
                href="/employee/reports"
                className="text-[#f97316] text-[13px] font-semibold hover:underline flex items-center gap-1"
              >
                View all reports <ArrowRight size={14} />
              </Link>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <table className="w-full text-left text-[13px]">
                <thead>
                  <tr className="bg-gray-50/50 border-b border-gray-100 text-gray-400 text-[10px] font-bold tracking-wider uppercase">
                    <th className="py-4 px-6">Report</th>
                    <th className="py-4 px-6">Location</th>
                    <th className="py-4 px-6">Date</th>
                    <th className="py-4 px-6">Status</th>
                    <th className="py-4 px-6 text-right"></th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-gray-400">
                        Loading reports...
                      </td>
                    </tr>
                  ) : recentReports.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-gray-400">
                        No reports available yet.
                      </td>
                    </tr>
                  ) : (
                    recentReports.slice(0, 5).map((report: any) => {
                      const dateStr = new Date(report.createdAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      });
                      const locationName =
                        typeof report.location === "object"
                          ? report.location?.name
                          : report.locationName || "Assigned Site";

                      const statusColor =
                        report.status === "approved" || report.status === "resolved"
                          ? "text-emerald-700 bg-emerald-50 border-emerald-100"
                          : report.status === "under_review" || report.status === "submitted"
                          ? "text-blue-700 bg-blue-50 border-blue-100"
                          : report.status === "rejected"
                          ? "text-red-700 bg-red-50 border-red-100"
                          : "text-amber-700 bg-amber-50 border-amber-100";

                      const statusLabel =
                        report.status
                          ? report.status.charAt(0).toUpperCase() + report.status.slice(1).replace("_", " ")
                          : "Available";

                      return (
                        <tr
                          key={report._id}
                          className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors"
                        >
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded bg-orange-50 text-[#f97316] flex items-center justify-center shrink-0">
                                <svg
                                  width="14"
                                  height="16"
                                  viewBox="0 0 14 16"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M9 1H2C1.44772 1 1 1.44772 1 2V14C1 14.5523 1.44772 15 2 15H12C12.5523 15 13 14.5523 13 14V5L9 1Z"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M9 1V5H13"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M4 9H10"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M4 12H10"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M4 6H5"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </div>
                              <span className="text-[#1a2642] font-medium">{report.title}</span>
                            </div>
                          </td>
                          <td className="py-4 px-6 text-gray-500">{locationName}</td>
                          <td className="py-4 px-6 text-gray-500">{dateStr}</td>
                          <td className="py-4 px-6">
                            <span
                              className={`px-2.5 py-1 rounded-full text-[11px] font-semibold border ${statusColor}`}
                            >
                              {statusLabel}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-right">
                            <Link
                              href="/employee/reports"
                              className="text-[#f97316] text-[12px] font-semibold hover:underline inline-flex items-center gap-1"
                            >
                              View <ArrowRight size={12} />
                            </Link>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
