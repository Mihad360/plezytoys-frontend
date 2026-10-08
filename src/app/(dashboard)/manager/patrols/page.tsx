"use client";

import { Bell, RefreshCw, AlertCircle, CheckCircle2, Clock, MapPin, ArrowRight } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { useGetManagerPatrolExecutionsQuery, useGetManagerLocationsQuery } from "@/redux/api/managerApi";
import { useGetMyProfileQuery } from "@/redux/api/authApi";
import { useGetUnreadCountQuery } from "@/redux/api/notificationApi";

export default function ManagerPatrolsPage() {
  const [selectedLocationId, setSelectedLocationId] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedPatrol, setSelectedPatrol] = useState<any | null>(null);

  const { data: profileData } = useGetMyProfileQuery(undefined);
  const manager = profileData?.data;

  const { data: locationsData } = useGetManagerLocationsQuery();
  const locations = locationsData?.data || [];

  const {
    data: patrolsData,
    isLoading,
    isError,
    refetch,
  } = useGetManagerPatrolExecutionsQuery({
    locationId: selectedLocationId === "all" ? undefined : selectedLocationId,
    status: statusFilter === "all" ? undefined : statusFilter,
  });

  const { data: unreadNotifData } = useGetUnreadCountQuery(undefined);
  const unreadCount = unreadNotifData?.data?.unreadCount ?? 0;

  const patrols = patrolsData?.data || [];

  const activeCount = patrols.filter((p: any) => p.status === "in_progress").length;
  const completedCount = patrols.filter((p: any) => p.status === "completed").length;
  const lateCount = patrols.filter((p: any) => p.status === "late").length;
  const missedCount = patrols.filter((p: any) => p.checkpoints?.some((c: any) => c.status === "missed")).length;

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
          <h1 className="text-[#1a2642] text-[18px] font-bold leading-tight">Patrols & Rounds Monitoring</h1>
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
            title="Refresh Patrols"
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
          {/* Metrics */}
          <div className="grid grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <p className="text-gray-400 text-[11px] font-bold tracking-wide uppercase mb-2">ACTIVE</p>
              <p className="text-emerald-500 font-bold text-[32px] leading-none">
                {isLoading ? "..." : activeCount}
              </p>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <p className="text-gray-400 text-[11px] font-bold tracking-wide uppercase mb-2">COMPLETED</p>
              <p className="text-blue-500 font-bold text-[32px] leading-none">
                {isLoading ? "..." : completedCount}
              </p>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <p className="text-gray-400 text-[11px] font-bold tracking-wide uppercase mb-2">LATE / DELAYED</p>
              <p className="text-orange-500 font-bold text-[32px] leading-none">
                {isLoading ? "..." : lateCount}
              </p>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <p className="text-gray-400 text-[11px] font-bold tracking-wide uppercase mb-2">MISSED CHECKPOINTS</p>
              <p className="text-red-500 font-bold text-[32px] leading-none">
                {isLoading ? "..." : missedCount}
              </p>
            </div>
          </div>

          {/* Filters */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex gap-4">
              <div className="relative w-[260px]">
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
              <div className="relative w-[180px]">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2 text-[13px] text-[#1a2642] focus:outline-none shadow-sm cursor-pointer"
                >
                  <option value="all">All patrol statuses</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="missed">Missed</option>
                </select>
              </div>
            </div>
          </div>

          {isError && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4 flex items-center justify-between text-red-700">
              <div className="flex items-center gap-3">
                <AlertCircle size={20} className="shrink-0" />
                <p className="text-sm font-medium">Failed to retrieve patrol operations.</p>
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
                  <th className="py-4 px-6">Route / Patrol</th>
                  <th className="py-4 px-6">Facility Location</th>
                  <th className="py-4 px-6">Assigned Officer</th>
                  <th className="py-4 px-6">Start Time</th>
                  <th className="py-4 px-6">Checkpoints Scanned</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-gray-400">
                      Loading patrol runs...
                    </td>
                  </tr>
                ) : patrols.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-gray-400">
                      No patrol executions recorded for this filter.
                    </td>
                  </tr>
                ) : (
                  patrols.map((patrol: any) => {
                    const routeName = patrol.route?.name || "Standard Perimeter Route";
                    const locName = patrol.location?.name || "Assigned Facility";
                    const officerName =
                      patrol.executedBy?.name ||
                      `${patrol.executedBy?.firstName || ""} ${patrol.executedBy?.lastName || ""}`.trim() ||
                      "Security Staff";

                    const startTimeFormatted = patrol.startTime
                      ? new Date(patrol.startTime).toLocaleTimeString("en-GB", {
                          hour: "2-digit",
                          minute: "2-digit",
                          day: "2-digit",
                          month: "short",
                        })
                      : "—";

                    const checkpoints = patrol.checkpoints || [];
                    const completedCPs = checkpoints.filter(
                      (c: any) => c.status === "scanned" || c.status === "completed"
                    ).length;

                    return (
                      <tr key={patrol._id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50">
                        <td className="py-4 px-6">
                          <p className="font-semibold text-[#1a2642]">{routeName}</p>
                          <p className="text-[11px] text-gray-400 font-mono">ID: {patrol._id.slice(-6)}</p>
                        </td>
                        <td className="py-4 px-6 text-gray-600">{locName}</td>
                        <td className="py-4 px-6 text-gray-600">{officerName}</td>
                        <td className="py-4 px-6 text-gray-600">{startTimeFormatted}</td>
                        <td className="py-4 px-6">
                          <span className="font-semibold text-[#1a2642]">
                            {completedCPs} / {checkpoints.length}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <span
                            className={`px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                              patrol.status === "in_progress"
                                ? "bg-emerald-50 text-emerald-700"
                                : patrol.status === "completed"
                                ? "bg-blue-50 text-blue-700"
                                : "bg-red-50 text-red-700"
                            }`}
                          >
                            {patrol.status === "in_progress" ? "In Progress" : patrol.status || "Completed"}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-right">
                          <button
                            onClick={() => setSelectedPatrol(patrol)}
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

      {/* Patrol Details Modal */}
      {selectedPatrol && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1a2642]/60">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-[600px] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <div>
                <h3 className="text-[#1a2642] font-bold text-base">{selectedPatrol.route?.name || "Patrol Execution"}</h3>
                <p className="text-gray-400 text-xs mt-0.5">{selectedPatrol.location?.name || "Site"}</p>
              </div>
              <button onClick={() => setSelectedPatrol(null)} className="text-gray-400 hover:text-gray-600 text-lg">
                ✕
              </button>
            </div>
            <div className="p-6 space-y-4 text-xs text-gray-700">
              <div className="space-y-2">
                <h4 className="font-semibold text-[#1a2642] uppercase text-[11px]">Checkpoint Check-in Sequence:</h4>
                <div className="space-y-1.5 max-h-[240px] overflow-y-auto">
                  {(selectedPatrol.checkpoints || []).map((cp: any, idx: number) => {
                    const isDone = cp.status === "scanned" || cp.status === "completed";
                    const isMissed = cp.status === "missed";
                    return (
                      <div
                        key={idx}
                        className="p-2.5 rounded-lg border border-gray-100 flex items-center justify-between bg-gray-50/50"
                      >
                        <span className="font-medium text-[#1a2642]">
                          {idx + 1}. {cp.checkpoint?.name || cp.name || `Checkpoint ${idx + 1}`}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            isDone
                              ? "bg-emerald-50 text-emerald-700"
                              : isMissed
                              ? "bg-red-50 text-red-700"
                              : "bg-gray-100 text-gray-500"
                          }`}
                        >
                          {cp.status || "Pending"}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end">
              <button
                onClick={() => setSelectedPatrol(null)}
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
