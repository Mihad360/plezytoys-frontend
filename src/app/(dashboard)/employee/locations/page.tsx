"use client";

import { useState } from "react";
import Link from "next/link";
import { Bell, MapPin, ArrowRight, ArrowLeft, RefreshCw, AlertCircle } from "lucide-react";
import {
  useGetEmployeeLocationsQuery,
  useGetPatrolExecutionsQuery,
  useGetReportsQuery,
  useGetNfcCheckpointsQuery,
} from "@/redux/api/employeeApi";
import { useGetUnreadCountQuery } from "@/redux/api/notificationApi";

export default function EmployeeLocationsPage() {
  const [selectedLocation, setSelectedLocation] = useState<any | null>(null);

  const {
    data: locationsData,
    isLoading: isLocationsLoading,
    isError: isLocationsError,
    refetch: refetchLocations,
  } = useGetEmployeeLocationsQuery();

  const { data: unreadNotifData } = useGetUnreadCountQuery(undefined);
  const unreadCount = unreadNotifData?.data?.unreadCount ?? 0;

  const locations = locationsData?.data || [];

  // When a location is selected, fetch its patrols, reports, and checkpoints
  const locationId = selectedLocation?._id;
  const {
    data: executionsData,
    isLoading: isExecutionsLoading,
    refetch: refetchExecutions,
  } = useGetPatrolExecutionsQuery(locationId ? { locationId } : undefined, {
    skip: !locationId,
  });

  const {
    data: reportsData,
    isLoading: isReportsLoading,
    refetch: refetchReports,
  } = useGetReportsQuery(locationId ? { locationId } : undefined, {
    skip: !locationId,
  });

  const {
    data: checkpointsData,
  } = useGetNfcCheckpointsQuery(locationId ? { locationId } : undefined, {
    skip: !locationId,
  });

  const locationExecutions = executionsData?.data || [];
  const mostRecentExecution = locationExecutions[0]; // first one is most recent
  const locationReports = reportsData?.data || [];
  const checkpoints = checkpointsData?.data || [];

  const handleRefresh = () => {
    refetchLocations();
    if (locationId) {
      refetchExecutions();
      refetchReports();
    }
  };

  // Calculate checkpoint progress for most recent execution
  const executionCheckpoints = mostRecentExecution?.checkpoints || [];
  const completedCount = executionCheckpoints.filter((c: any) => c.status === "scanned" || c.status === "completed").length;
  const missedCount = executionCheckpoints.filter((c: any) => c.status === "missed").length;
  const totalCheckpointsCount = executionCheckpoints.length || (mostRecentExecution?.route?.checkpoints?.length ?? 0);
  const progressPercent = totalCheckpointsCount > 0 ? Math.round((completedCount / totalCheckpointsCount) * 100) : 0;

  // Filter exceptions (missed checkpoints)
  const exceptions = executionCheckpoints.filter((c: any) => c.status === "missed" || c.missedReason);

  // Customer organization name
  const customerName = selectedLocation?.customer?.companyName || "Assigned Organization";

  return (
    <div className="flex flex-col h-full bg-[#f8f9fa] relative">
      {/* Top Header */}
      <header className="h-[72px] bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0">
        <div>
          <p className="text-gray-400 text-[11px] font-medium tracking-wide uppercase mb-0.5">
            SHIFTPOINT • EMPLOYEE
          </p>
          <h1 className="text-[#1a2642] text-[18px] font-bold leading-tight">Locations</h1>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleRefresh}
            title="Refresh Data"
            className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors"
          >
            <RefreshCw size={18} className={isLocationsLoading ? "animate-spin" : ""} />
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
        <div className="max-w-[1200px] mx-auto space-y-6 mt-4">
          {/* Error Banner */}
          {isLocationsError && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center justify-between text-red-700 mb-4">
              <div className="flex items-center gap-3">
                <AlertCircle size={20} className="shrink-0" />
                <p className="text-sm font-medium">Failed to load authorised locations from server.</p>
              </div>
              <button
                onClick={handleRefresh}
                className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-semibold transition-colors"
              >
                Retry
              </button>
            </div>
          )}

          {selectedLocation === null ? (
            // LIST VIEW
            <div className="animate-in fade-in duration-300">
              <div className="mb-6">
                <p className="text-[#f97316] text-[11px] font-bold tracking-[0.1em] uppercase mb-1">
                  EMPLOYEE PORTAL / LOCATIONS
                </p>
                <h2 className="text-[#1a2642] text-[28px] font-bold mb-1">Locations</h2>
                <p className="text-gray-500 text-[14px]">
                  View operational coverage for your authorised service locations.
                </p>
              </div>

              <div className="bg-blue-50/50 border border-blue-100 rounded-lg p-4 flex gap-3 text-blue-700 text-[13px] mb-8">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="shrink-0 mt-0.5"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                <p>Employee read-only access - only authorised and assigned locations are shown.</p>
              </div>

              {isLocationsLoading ? (
                <div className="grid grid-cols-4 gap-6">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm min-h-[220px] animate-pulse flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="w-10 h-10 rounded-lg bg-gray-100"></div>
                        <div className="h-4 bg-gray-100 rounded w-3/4"></div>
                        <div className="h-3 bg-gray-100 rounded w-1/2"></div>
                      </div>
                      <div className="h-9 bg-gray-100 rounded"></div>
                    </div>
                  ))}
                </div>
              ) : locations.length === 0 ? (
                <div className="bg-white border border-gray-100 rounded-xl p-12 text-center text-gray-400">
                  <MapPin size={40} className="mx-auto mb-3 text-gray-300" />
                  <h3 className="text-[#1a2642] font-semibold text-lg mb-1">No Locations Assigned</h3>
                  <p className="text-sm">You do not currently have any assigned operational locations.</p>
                </div>
              ) : (
                <div className="grid grid-cols-4 gap-6">
                  {locations.map((loc: any) => {
                    const orgName = loc.customer?.companyName || loc.address || "Main Site";

                    return (
                      <div
                        key={loc._id}
                        className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between min-h-[220px]"
                      >
                        <div>
                          <div className="flex justify-between items-start mb-6">
                            <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center text-[#f97316] shrink-0">
                              <MapPin size={20} />
                            </div>
                            <span
                              className={`px-2.5 py-1 text-[11px] font-semibold rounded-full ${
                                loc.isActive
                                  ? "bg-emerald-50 text-emerald-700"
                                  : "bg-gray-100 text-gray-500"
                              }`}
                            >
                              {loc.isActive ? "Active" : "Inactive"}
                            </span>
                          </div>
                          <h4 className="text-[#1a2642] font-bold text-[15px] mb-1">{loc.name}</h4>
                          <p className="text-gray-400 text-[12px] mb-6 line-clamp-1">{orgName}</p>
                        </div>

                        <div>
                          <div className="flex justify-between items-end mb-4">
                            <div>
                              <p className="text-gray-400 text-[11px] mb-0.5">Service status</p>
                              <p className="text-[#1a2642] text-[13px] font-semibold">
                                {loc.radius ? `${loc.radius}m Geofence` : "Coverage active"}
                              </p>
                            </div>
                            <p className="text-emerald-500 text-[10px] font-medium text-right">
                              Assigned location
                            </p>
                          </div>
                          <button
                            onClick={() => setSelectedLocation(loc)}
                            className="w-full py-2.5 border border-gray-200 rounded-lg text-[13px] font-medium text-gray-600 hover:bg-gray-50 flex items-center justify-center gap-2 transition-colors cursor-pointer"
                          >
                            View location <ArrowRight size={14} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ) : (
            // DETAILS VIEW
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              <button
                onClick={() => setSelectedLocation(null)}
                className="flex items-center gap-2 text-[#f97316] text-[13px] font-semibold hover:underline mb-4 cursor-pointer"
              >
                <ArrowLeft size={14} /> Back to Locations
              </button>

              <div className="mb-6 flex justify-between items-end">
                <div>
                  <h2 className="text-[#1a2642] text-[28px] font-bold mb-1">{selectedLocation.name}</h2>
                  <p className="text-gray-500 text-[14px]">
                    {selectedLocation.address || "Address unspecified"} · {customerName} · Authorised Employee location
                  </p>
                </div>
                {selectedLocation.coordinates?.latitude && (
                  <div className="text-right text-xs text-gray-400">
                    <p>
                      GPS: {selectedLocation.coordinates.latitude.toFixed(4)},{" "}
                      {selectedLocation.coordinates.longitude.toFixed(4)}
                    </p>
                    <p>Radius: {selectedLocation.radius || 50}m</p>
                  </div>
                )}
              </div>

              <div className="bg-blue-50/50 border border-blue-100 rounded-lg p-4 flex gap-3 text-blue-700 text-[13px] mb-8">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="shrink-0 mt-0.5"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                <p>Read-only operational record - only evidence and activity assigned to this location is shown.</p>
              </div>

              <div className="grid grid-cols-3 gap-6">
                {/* Main Patrol Record */}
                <div className="col-span-2 space-y-6">
                  <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h3 className="text-[#1a2642] text-[16px] font-bold mb-1">Most recent patrol</h3>
                        <p className="text-gray-400 text-[12px]">
                          {mostRecentExecution?.route?.name || "Standard Route"} · {selectedLocation.name}
                        </p>
                      </div>
                      <span
                        className={`px-2.5 py-1 text-[11px] font-semibold rounded-full ${
                          mostRecentExecution?.status === "completed"
                            ? "bg-emerald-50 text-emerald-700"
                            : mostRecentExecution?.status === "in_progress"
                            ? "bg-blue-50 text-blue-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {mostRecentExecution?.status
                          ? mostRecentExecution.status.charAt(0).toUpperCase() +
                            mostRecentExecution.status.slice(1).replace("_", " ")
                          : "No Patrol Recorded"}
                      </span>
                    </div>

                    {isExecutionsLoading ? (
                      <div className="p-8 text-center text-gray-400 animate-pulse">Loading patrol history...</div>
                    ) : mostRecentExecution ? (
                      <>
                        <div className="flex gap-12 mb-6 border-b border-gray-100 pb-6 text-sm">
                          <div>
                            <p className="text-gray-400 text-[11px] mb-1">Patrol date</p>
                            <p className="text-[#1a2642] font-semibold">
                              {new Date(mostRecentExecution.startTime || mostRecentExecution.createdAt).toLocaleDateString(
                                "en-GB",
                                { day: "2-digit", month: "short", year: "numeric" }
                              )}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-400 text-[11px] mb-1">Started</p>
                            <p className="text-[#1a2642] font-semibold">
                              {new Date(mostRecentExecution.startTime || mostRecentExecution.createdAt).toLocaleTimeString(
                                "en-GB",
                                { hour: "2-digit", minute: "2-digit" }
                              )}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-400 text-[11px] mb-1">Completed</p>
                            <p className="text-[#1a2642] font-semibold">
                              {mostRecentExecution.endTime
                                ? new Date(mostRecentExecution.endTime).toLocaleTimeString("en-GB", {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })
                                : "In Progress"}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-400 text-[11px] mb-1">Duration</p>
                            <p className="text-[#1a2642] font-semibold">
                              {mostRecentExecution.endTime
                                ? `${Math.round(
                                    (new Date(mostRecentExecution.endTime).getTime() -
                                      new Date(mostRecentExecution.startTime).getTime()) /
                                      60000
                                  )} min`
                                : mostRecentExecution.route?.estimatedDurationMinutes
                                ? `~${mostRecentExecution.route.estimatedDurationMinutes} min`
                                : "—"}
                            </p>
                          </div>
                        </div>

                        {/* Checkpoints in Execution */}
                        {executionCheckpoints.length > 0 && (
                          <div className="mb-6">
                            <p className="text-gray-400 text-[11px] font-bold uppercase mb-3">Checkpoints visited</p>
                            <div className="flex flex-wrap gap-2">
                              {executionCheckpoints.map((cp: any, idx: number) => {
                                const cpName =
                                  typeof cp.checkpoint === "object" ? cp.checkpoint?.name : `Checkpoint ${idx + 1}`;
                                const isDone = cp.status === "scanned" || cp.status === "completed";
                                const isMissed = cp.status === "missed";

                                return (
                                  <span
                                    key={idx}
                                    className={`px-3 py-1 rounded-lg text-xs font-medium border flex items-center gap-1.5 ${
                                      isDone
                                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                        : isMissed
                                        ? "bg-amber-50 text-amber-700 border-amber-200"
                                        : "bg-gray-50 text-gray-600 border-gray-200"
                                    }`}
                                  >
                                    <span
                                      className={`w-1.5 h-1.5 rounded-full ${
                                        isDone ? "bg-emerald-500" : isMissed ? "bg-amber-500" : "bg-gray-400"
                                      }`}
                                    ></span>
                                    {cpName}
                                  </span>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        <Link
                          href="/employee/patrols"
                          className="px-5 py-2 border border-gray-200 rounded-lg text-[13px] font-medium text-gray-600 hover:bg-gray-50 inline-flex items-center gap-2"
                        >
                          View patrol details <ArrowRight size={14} />
                        </Link>
                      </>
                    ) : (
                      <p className="text-gray-400 text-sm py-4">No patrol execution recorded for this location yet.</p>
                    )}
                  </div>

                  {/* Checkpoint exceptions */}
                  <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                    <h3 className="text-[#1a2642] text-[16px] font-bold mb-1">Checkpoint exceptions</h3>
                    <p className="text-gray-400 text-[12px] mb-6">Items requiring visibility</p>

                    {exceptions.length === 0 ? (
                      <p className="text-gray-400 text-xs py-2">No checkpoint exceptions recorded for this location.</p>
                    ) : (
                      <div className="space-y-4">
                        {exceptions.map((exc: any, idx: number) => {
                          const cpName = typeof exc.checkpoint === "object" ? exc.checkpoint?.name : "Checkpoint";
                          return (
                            <div key={idx} className="flex gap-4 p-4 border-b border-gray-50 last:border-0">
                              <div className="w-6 h-6 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-[12px] shrink-0">
                                !
                              </div>
                              <div>
                                <p className="text-[#1a2642] text-[13px] font-semibold mb-0.5">
                                  {cpName} missed or flagged
                                </p>
                                <p className="text-gray-400 text-[12px]">
                                  {exc.missedReason || "Access obstructed during service window"}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* Recent reports & issues */}
                  <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h3 className="text-[#1a2642] text-[16px] font-bold mb-1">Recent reports & issues</h3>
                        <p className="text-gray-400 text-[12px]">Records shared for {selectedLocation.name}</p>
                      </div>
                      <Link
                        href="/employee/reports"
                        className="text-[#f97316] text-[12px] font-semibold hover:underline flex items-center gap-1"
                      >
                        View all <ArrowRight size={12} />
                      </Link>
                    </div>

                    {isReportsLoading ? (
                      <p className="text-gray-400 text-xs py-4">Loading reports...</p>
                    ) : locationReports.length === 0 ? (
                      <p className="text-gray-400 text-xs py-4">No reports recorded for this location yet.</p>
                    ) : (
                      <div className="space-y-4">
                        {locationReports.slice(0, 3).map((rep: any) => {
                          const repDate = new Date(rep.createdAt).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          });

                          return (
                            <div
                              key={rep._id}
                              className="flex justify-between items-center p-4 border border-gray-100 rounded-lg hover:bg-gray-50"
                            >
                              <div className="flex gap-4">
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
                                  </svg>
                                </div>
                                <div>
                                  <p className="text-[#1a2642] text-[13px] font-semibold mb-0.5">{rep.title}</p>
                                  <p className="text-gray-400 text-[11px]">
                                    {repDate} · {rep.status || "Approved"}
                                  </p>
                                </div>
                              </div>
                              <Link
                                href="/employee/reports"
                                className="text-[#f97316] text-[12px] font-semibold hover:underline flex items-center gap-1"
                              >
                                View report <ArrowRight size={12} />
                              </Link>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Side Info */}
                <div className="space-y-6">
                  {/* Checkpoint Progress Card */}
                  <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-[#1a2642] text-[15px] font-bold">Checkpoint progress</h3>
                      <span className="text-[#1a2642] text-[18px] font-bold">
                        {completedCount} / {totalCheckpointsCount || 1}
                      </span>
                    </div>
                    <p className="text-gray-400 text-[12px] mb-6">Most recent patrol route</p>

                    <div className="flex gap-1 h-2 mb-6 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#f97316] rounded-full transition-all duration-300"
                        style={{ width: `${progressPercent}%` }}
                      ></div>
                    </div>

                    <div className="space-y-3 text-[12px]">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2 text-gray-500">
                          <div className="w-2 h-2 rounded-full bg-emerald-500"></div> Completed
                        </div>
                        <span className="font-semibold text-gray-700">{completedCount}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2 text-gray-500">
                          <div className="w-2 h-2 rounded-full bg-amber-500"></div> Missed
                        </div>
                        <span className="font-semibold text-gray-700">{missedCount}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2 text-gray-500">
                          <div className="w-2 h-2 rounded-full bg-purple-500"></div> Total Registered Tags
                        </div>
                        <span className="font-semibold text-gray-700">{checkpoints.length}</span>
                      </div>
                    </div>

                    <Link
                      href="/employee/patrols"
                      className="w-full mt-6 text-[#f97316] text-[12px] font-semibold hover:underline flex items-center justify-center gap-1"
                    >
                      View checkpoint activity <ArrowRight size={12} />
                    </Link>
                  </div>

                  {/* Registered NFC Checkpoints */}
                  <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                    <h3 className="text-[#1a2642] text-[15px] font-bold mb-1">Registered Checkpoints</h3>
                    <p className="text-gray-400 text-[12px] mb-4">Installed at {selectedLocation.name}</p>

                    {checkpoints.length === 0 ? (
                      <p className="text-gray-400 text-xs py-2">No checkpoints recorded for this site.</p>
                    ) : (
                      <div className="space-y-2">
                        {checkpoints.slice(0, 5).map((cp: any) => (
                          <div
                            key={cp._id}
                            className="p-3 bg-gray-50/70 rounded-lg flex items-center justify-between text-xs"
                          >
                            <div>
                              <p className="font-semibold text-[#1a2642]">{cp.name}</p>
                              <p className="text-gray-400 text-[11px]">{cp.placementDescription || cp.code}</p>
                            </div>
                            <span className="text-[10px] bg-white border border-gray-200 px-2 py-0.5 rounded text-gray-600 uppercase font-semibold">
                              {cp.type || "NFC"}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
