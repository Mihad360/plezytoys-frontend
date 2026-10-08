"use client";

import { useState } from "react";
import Link from "next/link";
import { Bell, ArrowRight, ArrowLeft, RefreshCw, AlertCircle } from "lucide-react";
import {
  useGetPatrolExecutionsQuery,
  useGetMyActiveExecutionQuery,
  useGetPatrolRoutesQuery,
  useGetPatrolExecutionByIdQuery,
} from "@/redux/api/employeeApi";
import { useGetUnreadCountQuery } from "@/redux/api/notificationApi";

export default function EmployeePatrolsPage() {
  const [selectedExecutionId, setSelectedExecutionId] = useState<string | null>(null);

  const {
    data: executionsData,
    isLoading: isExecutionsLoading,
    isError: isExecutionsError,
    refetch: refetchExecutions,
  } = useGetPatrolExecutionsQuery();

  const {
    data: activeExecutionData,
    isLoading: isActiveLoading,
    refetch: refetchActive,
  } = useGetMyActiveExecutionQuery();

  const {
    data: routesData,
    isLoading: isRoutesLoading,
    refetch: refetchRoutes,
  } = useGetPatrolRoutesQuery();

  const {
    data: singleExecutionData,
    isLoading: isSingleLoading,
  } = useGetPatrolExecutionByIdQuery(selectedExecutionId || "", {
    skip: !selectedExecutionId,
  });

  const { data: unreadNotifData } = useGetUnreadCountQuery(undefined);
  const unreadCount = unreadNotifData?.data?.unreadCount ?? 0;

  const executions = executionsData?.data || [];
  const activeExecution = activeExecutionData?.data;
  const routes = routesData?.data || [];
  const selectedExecution = singleExecutionData?.data || executions.find((e: any) => e._id === selectedExecutionId);

  const isLoading = isExecutionsLoading || isActiveLoading || isRoutesLoading;
  const isError = isExecutionsError;

  const handleRefresh = () => {
    refetchExecutions();
    refetchActive();
    refetchRoutes();
  };

  // Separate active/in_progress from completed executions
  const liveExecutions = executions.filter((e: any) => e.status === "in_progress");
  const completedExecutions = executions.filter((e: any) => e.status !== "in_progress");

  // Calculate checkpoint completion across active/live patrols
  let totalLiveCheckpoints = 0;
  let totalLiveScanned = 0;
  liveExecutions.forEach((exec: any) => {
    const cps = exec.checkpoints || [];
    totalLiveCheckpoints += cps.length;
    totalLiveScanned += cps.filter((c: any) => c.status === "scanned" || c.status === "completed").length;
  });

  const overallPercent = totalLiveCheckpoints > 0 ? Math.round((totalLiveScanned / totalLiveCheckpoints) * 100) : 0;

  // Selected execution detail helpers
  const selectedCheckpoints = selectedExecution?.checkpoints || [];
  const selectedCompletedCount = selectedCheckpoints.filter(
    (c: any) => c.status === "scanned" || c.status === "completed"
  ).length;
  const selectedTotalCount = selectedCheckpoints.length || 1;
  const selectedProgressPercent = Math.round((selectedCompletedCount / selectedTotalCount) * 100);

  const selectedExceptions = selectedCheckpoints.filter(
    (c: any) => c.status === "missed" || c.missedReason
  );

  return (
    <div className="flex flex-col h-full bg-[#f8f9fa] relative">
      {/* Top Header */}
      <header className="h-[72px] bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0">
        <div>
          <p className="text-gray-400 text-[11px] font-medium tracking-wide uppercase mb-0.5">
            SHIFTPOINT • EMPLOYEE
          </p>
          <h1 className="text-[#1a2642] text-[18px] font-bold leading-tight">Patrols & Checkpoints</h1>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleRefresh}
            title="Refresh Activity"
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
        <div className="max-w-[1200px] mx-auto space-y-6 mt-4">
          {/* Error Banner */}
          {isError && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center justify-between text-red-700">
              <div className="flex items-center gap-3">
                <AlertCircle size={20} className="shrink-0" />
                <p className="text-sm font-medium">Failed to load live patrol operations data.</p>
              </div>
              <button
                onClick={handleRefresh}
                className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-semibold transition-colors"
              >
                Retry
              </button>
            </div>
          )}

          {selectedExecutionId === null ? (
            // LIST VIEW
            <div className="animate-in fade-in duration-300">
              <div className="flex justify-between items-end mb-6">
                <div>
                  <h2 className="text-[#1a2642] text-[28px] font-bold mb-1">Patrols & Checkpoints</h2>
                  <p className="text-gray-500 text-[14px]">
                    Monitor current and completed patrol activity at your approved locations.
                  </p>
                </div>
                <button
                  onClick={handleRefresh}
                  className="px-5 py-2.5 bg-[#f97316] hover:bg-[#e06511] text-white rounded-lg text-[13px] font-medium shadow-sm transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <RefreshCw size={14} className={isLoading ? "animate-spin" : ""} />
                  Refresh activity
                </button>
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
                <p>Read-only patrol information - only authorized routes and records are visible.</p>
              </div>

              <div className="grid grid-cols-3 gap-6">
                {/* Left Col: Current Patrol Activity */}
                <div className="col-span-2 space-y-6">
                  {/* Live / Active Patrols Card */}
                  <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white">
                      <div>
                        <h3 className="text-[#1a2642] text-[16px] font-bold mb-1">Current patrol activity</h3>
                        <p className="text-gray-400 text-[12px]">Latest updates from active routes</p>
                      </div>
                      {liveExecutions.length > 0 ? (
                        <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-[11px] font-bold tracking-wider rounded-full flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>{" "}
                          {liveExecutions.length} LIVE
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 bg-gray-50 text-gray-500 text-[11px] font-medium rounded-full">
                          0 LIVE
                        </span>
                      )}
                    </div>

                    <div className="p-2">
                      {isLoading ? (
                        <div className="p-6 space-y-4">
                          {[1, 2].map((i) => (
                            <div key={i} className="h-16 bg-gray-50 animate-pulse rounded-lg"></div>
                          ))}
                        </div>
                      ) : liveExecutions.length === 0 ? (
                        <div className="p-8 text-center text-gray-400 text-sm">
                          No patrol execution currently in progress.
                        </div>
                      ) : (
                        liveExecutions.map((exec: any) => {
                          const routeName = exec.route?.name || "Standard Patrol";
                          const locName = exec.location?.name || "Assigned Site";
                          const cps = exec.checkpoints || [];
                          const doneCount = cps.filter(
                            (c: any) => c.status === "scanned" || c.status === "completed"
                          ).length;
                          const startTimeStr = new Date(exec.startTime || exec.createdAt).toLocaleTimeString(
                            "en-GB",
                            { hour: "2-digit", minute: "2-digit" }
                          );

                          return (
                            <div
                              key={exec._id}
                              onClick={() => setSelectedExecutionId(exec._id)}
                              className="flex items-center p-4 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer group"
                            >
                              <div className="w-3 h-3 rounded-full bg-emerald-500 mr-4 shrink-0 shadow-[0_0_0_4px_rgba(16,185,129,0.1)]"></div>
                              <div className="flex-1">
                                <h4 className="text-[#1a2642] font-bold text-[14px]">{locName}</h4>
                                <p className="text-gray-400 text-[12px] flex items-center gap-2">
                                  {routeName}
                                </p>
                              </div>
                              <div className="text-right mr-4">
                                <p className="text-emerald-500 text-[12px] font-medium">Patrol in progress</p>
                                <p className="text-gray-400 text-[11px]">
                                  Started {startTimeStr} · {doneCount}/{cps.length || 0} checkpoints
                                </p>
                              </div>
                              <div className="text-[#f97316] text-[12px] font-semibold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                Details <ArrowRight size={14} />
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>

                  {/* Scheduled / Available Routes Card */}
                  <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white">
                      <div>
                        <h3 className="text-[#1a2642] text-[16px] font-bold mb-1">Configured Patrol Routes</h3>
                        <p className="text-gray-400 text-[12px]">Approved patrol routes for your company</p>
                      </div>
                      <span className="text-xs text-gray-400">{routes.length} Available</span>
                    </div>

                    <div className="p-2">
                      {routes.length === 0 ? (
                        <div className="p-8 text-center text-gray-400 text-sm">
                          No patrol routes configured yet.
                        </div>
                      ) : (
                        routes.slice(0, 5).map((route: any) => (
                          <div
                            key={route._id}
                            className="flex items-center p-4 hover:bg-gray-50 rounded-lg transition-colors"
                          >
                            <div className="w-3 h-3 rounded-full bg-[#f97316] mr-4 shrink-0"></div>
                            <div className="flex-1">
                              <h4 className="text-[#1a2642] font-bold text-[14px]">{route.name}</h4>
                              <p className="text-gray-400 text-[12px]">{route.location?.name || "Assigned Location"}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-[#1a2642] text-[12px] font-semibold">
                                {route.checkpoints?.length || 0} checkpoints
                              </p>
                              <p className="text-gray-400 text-[11px]">
                                Est. {route.estimatedDurationMinutes || 30} mins
                              </p>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  {/* Recent Completed Patrols Table */}
                  <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white">
                      <div>
                        <h3 className="text-[#1a2642] text-[16px] font-bold mb-1">Completed Patrols</h3>
                        <p className="text-gray-400 text-[12px]">Recent completed security rounds</p>
                      </div>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-[13px]">
                        <thead>
                          <tr className="bg-gray-50/50 border-b border-gray-100 text-gray-400 text-[10px] font-bold tracking-wider uppercase">
                            <th className="py-3 px-6">Route</th>
                            <th className="py-3 px-6">Location</th>
                            <th className="py-3 px-6">Date</th>
                            <th className="py-3 px-6">Status</th>
                            <th className="py-3 px-6 text-right"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {completedExecutions.length === 0 ? (
                            <tr>
                              <td colSpan={5} className="py-8 text-center text-gray-400">
                                No completed patrols recorded yet.
                              </td>
                            </tr>
                          ) : (
                            completedExecutions.slice(0, 5).map((exec: any) => {
                              const execDate = new Date(exec.createdAt).toLocaleDateString("en-GB", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              });
                              const routeTitle = exec.route?.name || "Patrol Run";
                              const locTitle = exec.location?.name || "Site";

                              return (
                                <tr
                                  key={exec._id}
                                  onClick={() => setSelectedExecutionId(exec._id)}
                                  className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors cursor-pointer"
                                >
                                  <td className="py-3.5 px-6 font-medium text-[#1a2642]">{routeTitle}</td>
                                  <td className="py-3.5 px-6 text-gray-500">{locTitle}</td>
                                  <td className="py-3.5 px-6 text-gray-500">{execDate}</td>
                                  <td className="py-3.5 px-6">
                                    <span
                                      className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${
                                        exec.status === "completed"
                                          ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                                          : "bg-amber-50 text-amber-700 border-amber-100"
                                      }`}
                                    >
                                      {exec.status ? exec.status.charAt(0).toUpperCase() + exec.status.slice(1) : "Done"}
                                    </span>
                                  </td>
                                  <td className="py-3.5 px-6 text-right">
                                    <span className="text-[#f97316] text-[12px] font-semibold hover:underline inline-flex items-center gap-1">
                                      View <ArrowRight size={12} />
                                    </span>
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

                {/* Right Col: Checkpoint completion summary */}
                <div>
                  <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 sticky top-6">
                    <h3 className="text-[#1a2642] text-[16px] font-bold mb-1">Checkpoint completion</h3>
                    <p className="text-gray-400 text-[12px] mb-8">Active assigned patrol coverage</p>

                    <div className="text-center mb-6">
                      <p className="text-[#1a2642] text-[42px] font-bold leading-none mb-2">
                        {totalLiveCheckpoints > 0 ? `${overallPercent}%` : "100%"}
                      </p>
                      <p className="text-gray-400 text-[12px]">
                        {totalLiveScanned} of {totalLiveCheckpoints || 0} checkpoints completed
                      </p>
                    </div>

                    <div className="h-2 w-full bg-gray-100 rounded-full mb-8 overflow-hidden">
                      <div
                        className="h-full bg-[#f97316] rounded-full transition-all duration-300"
                        style={{ width: `${totalLiveCheckpoints > 0 ? overallPercent : 100}%` }}
                      ></div>
                    </div>

                    <div className="space-y-4">
                      {liveExecutions.map((exec: any) => {
                        const locName = exec.location?.name || "Assigned Location";
                        const cps = exec.checkpoints || [];
                        const scanned = cps.filter(
                          (c: any) => c.status === "scanned" || c.status === "completed"
                        ).length;

                        return (
                          <div
                            key={exec._id}
                            className="flex justify-between items-center pb-4 border-b border-gray-50 last:border-0"
                          >
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                              <span className="text-[12px] text-gray-500 font-medium">{locName}</span>
                            </div>
                            <span className="text-[13px] font-semibold text-gray-700">
                              {scanned} / {cps.length}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // DETAILS VIEW
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              <button
                onClick={() => setSelectedExecutionId(null)}
                className="flex items-center gap-2 text-[#f97316] text-[13px] font-semibold hover:underline mb-4 cursor-pointer"
              >
                <ArrowLeft size={14} /> Back to Patrols & Checkpoints
              </button>

              <div className="mb-6">
                <h2 className="text-[#1a2642] text-[28px] font-bold mb-1">
                  {selectedExecution?.route?.name || "Patrol Execution"}
                </h2>
                <p className="text-gray-500 text-[14px]">
                  {selectedExecution?.location?.name || "Assigned Site"} · EMPLOYEE-assigned patrol record
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
                <p>Read-only patrol view - only checkpoint activity and evidence for this route is available.</p>
              </div>

              <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm mb-8 flex justify-between items-center">
                <div>
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-bold tracking-wider rounded-full mb-3 uppercase ${
                      selectedExecution?.status === "in_progress"
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-blue-50 text-blue-700"
                    }`}
                  >
                    {selectedExecution?.status === "in_progress" && (
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    )}
                    {selectedExecution?.status ? selectedExecution.status.replace("_", " ") : "Execution"}
                  </span>
                  <h3 className="text-[#1a2642] text-[20px] font-bold mb-1">
                    {selectedExecution?.status === "in_progress" ? "Patrol in progress" : "Patrol Completed"}
                  </h3>
                  <p className="text-gray-400 text-[12px]">
                    Started at{" "}
                    {new Date(selectedExecution?.startTime || selectedExecution?.createdAt).toLocaleTimeString("en-GB", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                    {selectedExecution?.endTime &&
                      ` · Ended at ${new Date(selectedExecution.endTime).toLocaleTimeString("en-GB", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}`}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[#1a2642] text-[36px] font-bold leading-none mb-1">
                    {selectedCompletedCount} / {selectedTotalCount}
                  </p>
                  <p className="text-gray-400 text-[12px]">checkpoints completed</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6">
                {/* Checkpoint Activity List */}
                <div className="col-span-2 space-y-6">
                  <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h3 className="text-[#1a2642] text-[15px] font-bold mb-1">Checkpoint activity</h3>
                        <p className="text-gray-400 text-[12px]">
                          {selectedCompletedCount} completed of {selectedTotalCount} total checkpoints
                        </p>
                      </div>
                      <span className="px-2.5 py-1 bg-orange-50 text-orange-700 text-[11px] font-semibold rounded">
                        Read-only
                      </span>
                    </div>

                    <div className="h-2 w-full bg-gray-100 rounded-full mb-8 overflow-hidden">
                      <div
                        className="h-full bg-[#f97316] rounded-full transition-all duration-300"
                        style={{ width: `${selectedProgressPercent}%` }}
                      ></div>
                    </div>

                    <div className="space-y-0">
                      {isSingleLoading ? (
                        <p className="text-gray-400 text-xs py-4">Loading checkpoint sequence...</p>
                      ) : selectedCheckpoints.length === 0 ? (
                        <p className="text-gray-400 text-xs py-4">No checkpoints recorded for this patrol run.</p>
                      ) : (
                        selectedCheckpoints.map((cp: any, idx: number) => {
                          const cpName =
                            typeof cp.checkpoint === "object"
                              ? cp.checkpoint?.name || cp.checkpoint?.placementDescription
                              : `Checkpoint #${idx + 1}`;
                          const isDone = cp.status === "scanned" || cp.status === "completed";
                          const isMissed = cp.status === "missed";
                          const scanTime = cp.scannedAt
                            ? new Date(cp.scannedAt).toLocaleTimeString("en-GB", {
                                hour: "2-digit",
                                minute: "2-digit",
                              })
                            : "—";

                          return (
                            <div
                              key={idx}
                              className="flex items-center justify-between py-4 border-b border-gray-50 last:border-0"
                            >
                              <div className="flex items-center gap-3">
                                <div
                                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold ${
                                    isDone
                                      ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                                      : isMissed
                                      ? "bg-amber-50 text-amber-600 border border-amber-200"
                                      : "bg-gray-100 text-gray-400"
                                  }`}
                                >
                                  {isDone ? "✓" : isMissed ? "!" : "○"}
                                </div>
                                <div>
                                  <p className="text-[#1a2642] font-semibold text-[13px]">{cpName}</p>
                                  {cp.missedReason && (
                                    <p className="text-amber-600 text-[11px]">{cp.missedReason}</p>
                                  )}
                                </div>
                              </div>
                              <div className="text-right">
                                <span
                                  className={`text-[12px] font-medium ${
                                    isDone ? "text-emerald-600" : isMissed ? "text-amber-600" : "text-gray-400"
                                  }`}
                                >
                                  {isDone ? "Scanned" : isMissed ? "Missed" : "Due"}
                                </span>
                                <p className="text-gray-400 text-[11px]">{scanTime}</p>
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>
                </div>

                {/* Right Side: Exceptions & Guard info */}
                <div className="space-y-6">
                  {/* Guard & Site Metadata */}
                  <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                    <h3 className="text-[#1a2642] text-[15px] font-bold mb-4">Patrol Metadata</h3>
                    <div className="space-y-3 text-xs">
                      <div>
                        <p className="text-gray-400 mb-0.5">Executed By</p>
                        <p className="font-semibold text-[#1a2642]">
                          {selectedExecution?.executedBy?.firstName || "Assigned Officer"}{" "}
                          {selectedExecution?.executedBy?.lastName || ""}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-400 mb-0.5">Location</p>
                        <p className="font-semibold text-[#1a2642]">
                          {selectedExecution?.location?.name || "Assigned Location"}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-400 mb-0.5">Route Plan</p>
                        <p className="font-semibold text-[#1a2642]">
                          {selectedExecution?.route?.name || "Standard Route"}
                        </p>
                      </div>
                      {selectedExecution?.notes && (
                        <div>
                          <p className="text-gray-400 mb-0.5">Patrol Notes</p>
                          <p className="text-gray-600 bg-gray-50 p-2 rounded">{selectedExecution.notes}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Exceptions Card */}
                  <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                    <h3 className="text-[#1a2642] text-[15px] font-bold mb-1">Route Exceptions</h3>
                    <p className="text-gray-400 text-[12px] mb-4">Anomalies recorded on this run</p>

                    {selectedExceptions.length === 0 ? (
                      <p className="text-gray-400 text-xs py-2">No exceptions recorded. All clear.</p>
                    ) : (
                      <div className="space-y-3">
                        {selectedExceptions.map((exc: any, i: number) => {
                          const cpName =
                            typeof exc.checkpoint === "object" ? exc.checkpoint?.name : "Checkpoint";

                          return (
                            <div key={i} className="p-3 bg-amber-50/60 border border-amber-100 rounded-lg">
                              <p className="text-xs font-semibold text-amber-800">{cpName} missed</p>
                              <p className="text-[11px] text-amber-700 mt-0.5">
                                {exc.missedReason || "Obstruction during window"}
                              </p>
                            </div>
                          );
                        })}
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
