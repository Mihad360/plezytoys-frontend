"use client";

import { Bell, RefreshCw, AlertCircle, AlertTriangle, ShieldAlert, Clock, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { useGetManagerAlertsQuery, useGetManagerLocationsQuery } from "@/redux/api/managerApi";
import { useGetMyProfileQuery } from "@/redux/api/authApi";
import { useGetUnreadCountQuery } from "@/redux/api/notificationApi";

export default function ManagerAlertsPage() {
  const [selectedLocationId, setSelectedLocationId] = useState<string>("all");
  const [selectedAlert, setSelectedAlert] = useState<any | null>(null);

  const { data: profileData } = useGetMyProfileQuery(undefined);
  const manager = profileData?.data;

  const { data: locationsData } = useGetManagerLocationsQuery();
  const locations = locationsData?.data || [];

  const {
    data: alertsData,
    isLoading,
    isError,
    refetch,
  } = useGetManagerAlertsQuery({
    locationId: selectedLocationId === "all" ? undefined : selectedLocationId,
  });

  const { data: unreadNotifData } = useGetUnreadCountQuery(undefined);
  const unreadCount = unreadNotifData?.data?.unreadCount ?? 0;

  const alerts = alertsData?.data || [];

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
          <h1 className="text-[#1a2642] text-[18px] font-bold leading-tight">Alerts & Attention Required</h1>
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
            title="Refresh Alerts"
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
        <div className="max-w-[1200px] mx-auto space-y-4 mt-2">
          {/* Filter Bar */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-[#1a2642] text-[24px] font-bold mb-1">Operational Alerts</h2>
              <p className="text-gray-500 text-[14px]">Real-time detection of GPS deviations, skipped checkpoints, and overdue tasks.</p>
            </div>
            <div className="relative w-[260px]">
              <select
                value={selectedLocationId}
                onChange={(e) => setSelectedLocationId(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2 text-[14px] text-[#1a2642] focus:outline-none shadow-sm cursor-pointer"
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

          {isError && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center justify-between text-red-700">
              <div className="flex items-center gap-3">
                <AlertCircle size={20} className="shrink-0" />
                <p className="text-sm font-medium">Failed to retrieve manager alerts.</p>
              </div>
              <button
                onClick={() => refetch()}
                className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-semibold"
              >
                Retry
              </button>
            </div>
          )}

          {isLoading ? (
            <div className="bg-white rounded-xl border border-gray-100 p-12 text-center text-gray-400">
              <RefreshCw size={24} className="mx-auto mb-2 animate-spin text-[#f97316]" />
              <p className="text-sm font-medium">Scanning live operational events...</p>
            </div>
          ) : alerts.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-100 p-12 text-center text-gray-400 shadow-sm">
              <CheckCircle2 size={40} className="mx-auto mb-3 text-emerald-500" />
              <h3 className="text-base font-bold text-gray-700">All Operations Running Smoothly</h3>
              <p className="text-xs text-gray-400 mt-1 max-w-sm mx-auto">
                No active GPS anomalies, missed route checkpoints, or overdue task assignments detected across your locations.
              </p>
            </div>
          ) : (
            alerts.map((alert: any, idx: number) => {
              const isCritical = alert.severity === "critical";
              const isHigh = alert.severity === "high";

              return (
                <div
                  key={idx}
                  className="bg-white rounded-xl border border-gray-100 p-6 flex justify-between items-center shadow-sm hover:border-gray-200 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        isCritical
                          ? "bg-red-50 text-red-600"
                          : isHigh
                          ? "bg-orange-50 text-orange-600"
                          : "bg-amber-50 text-amber-600"
                      }`}
                    >
                      {isCritical ? <ShieldAlert size={20} /> : <AlertTriangle size={20} />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-[#1a2642] font-bold text-[15px]">{alert.title}</h3>
                        <span
                          className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                            isCritical
                              ? "bg-red-50 text-red-700"
                              : isHigh
                              ? "bg-orange-50 text-orange-700"
                              : "bg-amber-50 text-amber-700"
                          }`}
                        >
                          {alert.severity}
                        </span>
                      </div>
                      <p className="text-gray-500 text-[13px]">{alert.description}</p>
                      <p className="text-gray-400 text-[12px] font-mono mt-1">
                        {alert.detail} · <span className="text-gray-500">{alert.location || "Facility Site"}</span>
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedAlert(alert)}
                    className="px-5 py-2 border border-gray-200 bg-white rounded-lg text-[13px] font-medium text-gray-700 hover:bg-gray-50 shadow-sm cursor-pointer"
                  >
                    View Details
                  </button>
                </div>
              );
            })
          )}
        </div>
      </main>

      {/* Alert Details Modal */}
      {selectedAlert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1a2642]/60">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-[500px] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-[#1a2642] font-bold text-base">{selectedAlert.title}</h3>
              <button onClick={() => setSelectedAlert(null)} className="text-gray-400 hover:text-gray-600 text-lg">
                ✕
              </button>
            </div>
            <div className="p-6 space-y-4 text-sm text-gray-700">
              <div>
                <p className="text-xs text-gray-400 uppercase font-semibold mb-1">Description</p>
                <p className="font-medium text-[#1a2642]">{selectedAlert.description}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase font-semibold mb-1">Details & Target</p>
                <p className="font-mono text-xs bg-gray-50 p-3 rounded-lg border border-gray-100">
                  {selectedAlert.detail}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div>
                  <p className="text-xs text-gray-400 uppercase font-semibold">Location</p>
                  <p className="font-semibold text-[#1a2642]">{selectedAlert.location || "All Sites"}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase font-semibold">Severity</p>
                  <span className="capitalize font-semibold text-orange-600">{selectedAlert.severity}</span>
                </div>
              </div>
            </div>
            <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end">
              <button
                onClick={() => setSelectedAlert(null)}
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
