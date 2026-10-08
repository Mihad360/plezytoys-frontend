"use client";

import { Bell, Clock, RefreshCw, AlertCircle, CheckCircle2, MapPin, Search } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { useGetManagerAttendanceQuery, useGetManagerLocationsQuery } from "@/redux/api/managerApi";
import { useGetMyProfileQuery } from "@/redux/api/authApi";
import { useGetUnreadCountQuery } from "@/redux/api/notificationApi";

export default function ManagerAttendancePage() {
  const [selectedLocationId, setSelectedLocationId] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeModalSession, setActiveModalSession] = useState<any | null>(null);

  const { data: profileData } = useGetMyProfileQuery(undefined);
  const manager = profileData?.data;

  const { data: locationsData } = useGetManagerLocationsQuery();
  const locations = locationsData?.data || [];

  const {
    data: attendanceData,
    isLoading,
    isError,
    refetch,
  } = useGetManagerAttendanceQuery({
    locationId: selectedLocationId === "all" ? undefined : selectedLocationId,
  });

  const { data: unreadNotifData } = useGetUnreadCountQuery(undefined);
  const unreadCount = unreadNotifData?.data?.unreadCount ?? 0;

  const sessions = attendanceData?.data || [];

  const currentlyWorking = sessions.filter((s: any) => s.status === "active").length;
  const completedSessions = sessions.filter((s: any) => s.status === "completed").length;
  const anomalySessions = sessions.filter(
    (s: any) => s.clockInLocation?.isAnomaly || s.lastPingLocation?.isAnomaly
  ).length;

  const filteredSessions = sessions.filter((s: any) => {
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase();
    const userName = (s.user?.name || `${s.user?.firstName || ""} ${s.user?.lastName || ""}`).toLowerCase();
    const empId = (s.user?.employeeId || "").toLowerCase();
    const locName = (s.location?.name || "").toLowerCase();
    return userName.includes(term) || empId.includes(term) || locName.includes(term);
  });

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
          <h1 className="text-[#1a2642] text-[18px] font-bold leading-tight">Live Attendance & Work Sessions</h1>
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
            title="Refresh Attendance"
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
        <div className="max-w-[1200px] mx-auto">
          {/* Quick Metrics */}
          <div className="grid grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <p className="text-gray-400 text-[11px] font-bold tracking-wide uppercase mb-2">CURRENTLY WORKING</p>
              <p className="text-emerald-500 font-bold text-[32px] leading-none">
                {isLoading ? "..." : currentlyWorking}
              </p>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <p className="text-gray-400 text-[11px] font-bold tracking-wide uppercase mb-2">COMPLETED SESSIONS</p>
              <p className="text-blue-500 font-bold text-[32px] leading-none">
                {isLoading ? "..." : completedSessions}
              </p>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <p className="text-gray-400 text-[11px] font-bold tracking-wide uppercase mb-2">GPS ANOMALIES</p>
              <p className="text-red-500 font-bold text-[32px] leading-none">
                {isLoading ? "..." : anomalySessions}
              </p>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <p className="text-gray-400 text-[11px] font-bold tracking-wide uppercase mb-2">TOTAL SESSIONS LOGGED</p>
              <p className="text-[#1a2642] font-bold text-[32px] leading-none">
                {isLoading ? "..." : sessions.length}
              </p>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex gap-4">
              <div className="relative w-[300px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search employee, ID or location..."
                  className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-[13px] focus:outline-none focus:border-[#f97316] shadow-sm"
                />
              </div>
              <div className="relative w-[240px]">
                <select
                  value={selectedLocationId}
                  onChange={(e) => setSelectedLocationId(e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2 text-[13px] text-[#1a2642] focus:outline-none shadow-sm cursor-pointer"
                >
                  <option value="all">All assigned locations</option>
                  {locations.map((loc: any) => (
                    <option key={loc._id} value={loc._id}>
                      {loc.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {isError && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4 flex items-center justify-between text-red-700">
              <div className="flex items-center gap-3">
                <AlertCircle size={20} className="shrink-0" />
                <p className="text-sm font-medium">Failed to retrieve attendance logs.</p>
              </div>
              <button
                onClick={() => refetch()}
                className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-semibold"
              >
                Retry
              </button>
            </div>
          )}

          {/* Table */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <table className="w-full text-left text-[13px]">
              <thead>
                <tr className="border-b border-gray-100 text-gray-400 text-[10px] font-bold tracking-wider uppercase bg-gray-50/50">
                  <th className="py-4 px-6">Employee</th>
                  <th className="py-4 px-6">Location</th>
                  <th className="py-4 px-6">Clock In Time</th>
                  <th className="py-4 px-6">Clock Out Time</th>
                  <th className="py-4 px-6">GPS Status</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-gray-400">
                      Loading attendance records...
                    </td>
                  </tr>
                ) : filteredSessions.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-gray-400">
                      No attendance sessions found.
                    </td>
                  </tr>
                ) : (
                  filteredSessions.map((session: any) => {
                    const empName =
                      session.user?.name ||
                      `${session.user?.firstName || ""} ${session.user?.lastName || ""}`.trim() ||
                      "Employee";
                    const empId = session.user?.employeeId || "—";
                    const locName = session.location?.name || "Assigned Site";

                    const clockInFormatted = session.clockInTime
                      ? new Date(session.clockInTime).toLocaleTimeString("en-GB", {
                          hour: "2-digit",
                          minute: "2-digit",
                          day: "2-digit",
                          month: "short",
                        })
                      : "—";

                    const clockOutFormatted = session.clockOutTime
                      ? new Date(session.clockOutTime).toLocaleTimeString("en-GB", {
                          hour: "2-digit",
                          minute: "2-digit",
                          day: "2-digit",
                          month: "short",
                        })
                      : "In progress";

                    const isAnomaly =
                      session.clockInLocation?.isAnomaly || session.lastPingLocation?.isAnomaly;

                    return (
                      <tr key={session._id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50">
                        <td className="py-4 px-6">
                          <div>
                            <p className="font-semibold text-[#1a2642]">{empName}</p>
                            <p className="text-[11px] text-gray-400 font-mono">{empId}</p>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-gray-600">{locName}</td>
                        <td className="py-4 px-6 text-gray-600">{clockInFormatted}</td>
                        <td className="py-4 px-6 text-gray-600">{clockOutFormatted}</td>
                        <td className="py-4 px-6">
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                              isAnomaly
                                ? "bg-red-50 text-red-700 border border-red-100"
                                : "bg-emerald-50 text-emerald-700 border border-emerald-100"
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${isAnomaly ? "bg-red-500" : "bg-emerald-500"}`}
                            ></span>
                            {isAnomaly ? "Anomaly" : "Verified"}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <span
                            className={`px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                              session.status === "active"
                                ? "bg-emerald-50 text-emerald-700"
                                : "bg-blue-50 text-blue-700"
                            }`}
                          >
                            {session.status === "active" ? "On Duty" : "Completed"}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-right">
                          <button
                            onClick={() => setActiveModalSession(session)}
                            className="px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 hover:bg-gray-50 cursor-pointer"
                          >
                            Details
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Details Modal */}
      {activeModalSession && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1a2642]/60">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-[550px] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <div>
                <h3 className="text-[#1a2642] font-bold text-base">Work Session Details</h3>
                <p className="text-gray-400 text-xs mt-0.5 font-mono">ID: {activeModalSession._id}</p>
              </div>
              <button onClick={() => setActiveModalSession(null)} className="text-gray-400 hover:text-gray-600 text-lg">
                ✕
              </button>
            </div>
            <div className="p-6 space-y-4 text-xs text-gray-700">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-400 font-semibold mb-0.5">Employee</p>
                  <p className="font-bold text-[#1a2642] text-sm">
                    {activeModalSession.user?.name || "Staff Member"}
                  </p>
                  <p className="text-gray-400 font-mono">{activeModalSession.user?.employeeId || "—"}</p>
                </div>
                <div>
                  <p className="text-gray-400 font-semibold mb-0.5">Location</p>
                  <p className="font-bold text-[#1a2642] text-sm">
                    {activeModalSession.location?.name || "Assigned Location"}
                  </p>
                  <p className="text-gray-400">{activeModalSession.location?.address || "—"}</p>
                </div>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-100 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500">Clock In Coordinates:</span>
                  <span className="font-mono">
                    {activeModalSession.clockInLocation?.latitude}, {activeModalSession.clockInLocation?.longitude}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Accuracy:</span>
                  <span className="font-mono">±{activeModalSession.clockInLocation?.accuracy || 5}m</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Device Info:</span>
                  <span className="font-mono">{activeModalSession.deviceInfo || "Mobile Device"}</span>
                </div>
              </div>
              {activeModalSession.notes && (
                <div>
                  <p className="text-gray-400 font-semibold mb-1">Session Notes:</p>
                  <p className="bg-gray-50 p-3 rounded-lg border border-gray-100 font-mono text-[11px]">
                    {activeModalSession.notes}
                  </p>
                </div>
              )}
            </div>
            <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end">
              <button
                onClick={() => setActiveModalSession(null)}
                className="px-5 py-2 bg-[#1a2642] hover:bg-[#233355] text-white rounded-lg text-xs font-semibold cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
