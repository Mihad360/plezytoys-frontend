"use client";

import { useState } from "react";
import Link from "next/link";
import { Bell, Calendar as CalendarIcon, MapPin, Clock, RefreshCw, AlertCircle, CheckCircle } from "lucide-react";
import { useGetMyShiftsQuery, useGetActiveWorkSessionQuery } from "@/redux/api/employeeApi";
import { useGetUnreadCountQuery } from "@/redux/api/notificationApi";

export default function EmployeeSchedulePage() {
  const [filterPeriod, setFilterPeriod] = useState<"all" | "this-week" | "next-week">("all");

  const {
    data: shiftsData,
    isLoading: isShiftsLoading,
    isError: isShiftsError,
    refetch: refetchShifts,
  } = useGetMyShiftsQuery();

  const {
    data: activeSessionData,
    refetch: refetchActiveSession,
  } = useGetActiveWorkSessionQuery();

  const { data: unreadNotifData } = useGetUnreadCountQuery(undefined);
  const unreadCount = unreadNotifData?.data?.unreadCount ?? 0;

  const rawShifts = shiftsData?.data || [];
  const activeSession = activeSessionData?.data;

  const handleRefresh = () => {
    refetchShifts();
    refetchActiveSession();
  };

  // Filter shifts based on filterPeriod
  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay());
  startOfWeek.setHours(0, 0, 0, 0);

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 7);

  const endOfNextWeek = new Date(endOfWeek);
  endOfNextWeek.setDate(endOfWeek.getDate() + 7);

  const filteredShifts = rawShifts.filter((shift: any) => {
    if (filterPeriod === "all") return true;
    const shiftDate = new Date(shift.date);
    if (filterPeriod === "this-week") {
      return shiftDate >= startOfWeek && shiftDate < endOfWeek;
    }
    if (filterPeriod === "next-week") {
      return shiftDate >= endOfWeek && shiftDate < endOfNextWeek;
    }
    return true;
  });

  // Group shifts by day label (Today, Tomorrow, or formatted date)
  const groupedShifts: { [key: string]: any[] } = {};
  filteredShifts.forEach((shift: any) => {
    const shiftDate = new Date(shift.date);
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    let dayKey = "";
    if (shiftDate.toDateString() === today.toDateString()) {
      dayKey = `Today · ${shiftDate.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}`;
    } else if (shiftDate.toDateString() === tomorrow.toDateString()) {
      dayKey = `Tomorrow · ${shiftDate.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}`;
    } else {
      dayKey = shiftDate.toLocaleDateString("en-GB", {
        weekday: "long",
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    }

    if (!groupedShifts[dayKey]) groupedShifts[dayKey] = [];
    groupedShifts[dayKey].push(shift);
  });

  return (
    <div className="flex flex-col h-full bg-[#f8f9fa]">
      {/* Top Header */}
      <header className="h-[72px] bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0">
        <div>
          <p className="text-gray-400 text-[11px] font-medium tracking-wide uppercase mb-0.5">
            SHIFTPOINT • EMPLOYEE
          </p>
          <h1 className="text-[#1a2642] text-[18px] font-bold leading-tight">Schedule & Shifts</h1>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleRefresh}
            title="Refresh Schedule"
            className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors"
          >
            <RefreshCw size={18} className={isShiftsLoading ? "animate-spin" : ""} />
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
          {/* Active Work Session Banner if clocked in */}
          {activeSession && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 flex items-center justify-between text-emerald-800">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                  <CheckCircle size={22} />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-emerald-900">Active Work Session in Progress</h3>
                  <p className="text-xs text-emerald-700 mt-0.5">
                    Clocked in at {activeSession.location?.name || "Location"} · Started{" "}
                    {new Date(activeSession.clockInTime).toLocaleTimeString("en-GB", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
              <span className="px-3 py-1 bg-emerald-600 text-white text-xs font-semibold rounded-lg">
                On Duty
              </span>
            </div>
          )}

          {/* Error Banner */}
          {isShiftsError && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center justify-between text-red-700">
              <div className="flex items-center gap-3">
                <AlertCircle size={20} className="shrink-0" />
                <p className="text-sm font-medium">Failed to load shifts and schedule from server.</p>
              </div>
              <button
                onClick={handleRefresh}
                className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-semibold transition-colors"
              >
                Retry
              </button>
            </div>
          )}

          {/* Page Header and Filter Buttons */}
          <div className="mb-6 flex justify-between items-end">
            <div>
              <h2 className="text-[#1a2642] text-[28px] font-bold mb-1">Your Schedule</h2>
              <p className="text-gray-500 text-[14px]">View your upcoming shifts, locations, and timings.</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setFilterPeriod("all")}
                className={`px-4 py-2 border rounded-lg text-[13px] font-medium transition-colors cursor-pointer ${
                  filterPeriod === "all"
                    ? "bg-[#1a2642] text-white border-[#1a2642]"
                    : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilterPeriod("this-week")}
                className={`px-4 py-2 border rounded-lg text-[13px] font-medium transition-colors cursor-pointer ${
                  filterPeriod === "this-week"
                    ? "bg-[#1a2642] text-white border-[#1a2642]"
                    : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                }`}
              >
                This Week
              </button>
              <button
                onClick={() => setFilterPeriod("next-week")}
                className={`px-4 py-2 border rounded-lg text-[13px] font-medium transition-colors cursor-pointer ${
                  filterPeriod === "next-week"
                    ? "bg-[#1a2642] text-white border-[#1a2642]"
                    : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                }`}
              >
                Next Week
              </button>
            </div>
          </div>

          {/* Shifts List Grouped by Day */}
          {isShiftsLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-28 bg-white rounded-xl border border-gray-100 shadow-sm animate-pulse p-6"></div>
              ))}
            </div>
          ) : Object.keys(groupedShifts).length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-100 p-12 text-center text-gray-400">
              <CalendarIcon size={40} className="mx-auto mb-3 text-gray-300" />
              <h3 className="text-[#1a2642] font-semibold text-lg mb-1">No Shifts Scheduled</h3>
              <p className="text-sm">You have no upcoming shifts scheduled for this period.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {Object.entries(groupedShifts).map(([dayLabel, shifts]) => (
                <div key={dayLabel}>
                  <h3 className="text-[#1a2642] text-[15px] font-bold mb-3">{dayLabel}</h3>
                  <div className="space-y-3">
                    {shifts.map((shift: any) => {
                      const locName =
                        typeof shift.location === "object" ? shift.location?.name : "Assigned Location";
                      const startTime = shift.startTime || "08:00";
                      const endTime = shift.endTime || "16:00";

                      // Calculate duration
                      const [sh, sm] = startTime.split(":").map(Number);
                      const [eh, em] = endTime.split(":").map(Number);
                      let hours = eh - sh;
                      if (hours < 0) hours += 24;

                      const isCurrentShift =
                        activeSession &&
                        new Date(shift.date).toDateString() === new Date().toDateString();

                      const statusColor = isCurrentShift
                        ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                        : shift.status === "completed"
                        ? "bg-blue-50 text-blue-700 border-blue-100"
                        : "bg-gray-50 text-gray-600 border-gray-200";

                      const statusText = isCurrentShift
                        ? "In Progress"
                        : shift.status
                        ? shift.status.charAt(0).toUpperCase() + shift.status.slice(1)
                        : "Scheduled";

                      return (
                        <div
                          key={shift._id}
                          className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 flex items-center justify-between hover:border-orange-200 transition-colors"
                        >
                          <div className="flex items-center gap-6">
                            <div
                              className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 border ${
                                isCurrentShift
                                  ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                                  : "bg-orange-50 text-[#f97316] border-orange-100"
                              }`}
                            >
                              <CalendarIcon size={20} />
                            </div>
                            <div>
                              <h4 className="text-[#1a2642] text-[16px] font-bold mb-1">
                                {shift.title || `${locName} Shift`}
                              </h4>
                              <div className="flex gap-4 text-gray-500 text-[13px]">
                                <span className="flex items-center gap-1.5">
                                  <Clock size={14} className="text-gray-400" /> {startTime} - {endTime} ({hours}h)
                                </span>
                                <span className="flex items-center gap-1.5">
                                  <MapPin size={14} className="text-gray-400" /> {locName}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div>
                            <span className={`px-3 py-1 text-[12px] font-semibold rounded-full border ${statusColor}`}>
                              {statusText}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
